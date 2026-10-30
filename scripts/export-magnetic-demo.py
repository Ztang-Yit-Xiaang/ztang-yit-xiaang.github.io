"""Export the original local solver replay and checkpoint, without changing research files."""
import argparse, ast, contextlib, hashlib, importlib.util, io, json, os, sys
from types import SimpleNamespace
from scipy.spatial.transform import Rotation as R
from pathlib import Path
sys.dont_write_bytecode = True
os.environ.setdefault('MPLBACKEND', 'Agg')
import numpy as np
import torch
from scipy.interpolate import make_interp_spline
from scipy.optimize import least_squares
from unittest.mock import patch

def digest(path): return hashlib.sha256(Path(path).read_bytes()).hexdigest()
def load_module(name,path):
    spec=importlib.util.spec_from_file_location(name,path);module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module);return module

def main():
    parser=argparse.ArgumentParser();parser.add_argument('--pose-root',type=Path,required=True);parser.add_argument('--inverse-root',type=Path,required=True);parser.add_argument('--out',type=Path,default=Path('public/data/magnetic'));parser.add_argument('--evidence',type=Path,required=True);args=parser.parse_args()
    args.out.mkdir(parents=True,exist_ok=True);args.evidence.mkdir(parents=True,exist_ok=True);torch.set_num_threads(1)
    model_path=args.inverse_root/'model/MLP_Att.py';checkpoint=args.inverse_root/'results/model.pt'
    module=load_module('portfolio_frozen_mlp',model_path);model=module.MLPWithAttention(10,20,1);model.load_state_dict(torch.load(checkpoint,map_location='cpu',weights_only=True));model.eval()
    for parameter in model.parameters(): parameter.requires_grad_(False)
    weights={name:value.tolist() for name,value in model.state_dict().items() if not name.startswith('attention.')}
    blob=checkpoint.read_bytes();blob_sha=hashlib.sha1(b'blob '+str(len(blob)).encode()+b'\0'+blob).hexdigest();assert blob_sha=='3c2fe68852e9019c2e879459d6edb9cdcc3411e3'
    config={'weights':weights,'checkpointBlob':blob_sha,'sourceCommit':'f022bc003749e06b71b1a1fec48454bd4606bd60','activeForward':'sigmoid branches (mt,E,L,cs) -> concatenate -> sigmoid fc -> sigmoid fc_out','inactiveForwardModules':['attention'],'ranges':{'cs':model.cs_range,'E':model.E_range,'L':model.L_range,'mt':model.mT_range},'initial':[1,15,10,7.5,10,10,10],'adam':{'lr':.01,'betas':[.9,.999],'eps':1e-8,'iterations':3000}}
    (args.out/'inverse-model.json').write_text(json.dumps(config,separators=(',',':'))+'\n')
    def predict(p,mt):
        return model({'cs':p[0:1],'E':[p[1:2],p[2:3],p[3:4]],'L':[p[4:5],p[5:6],p[6:7]],'mt':torch.tensor([mt],dtype=torch.float32)}).squeeze()
    fixtures=[]
    for mt in [10,60,120]:
        for values in [config['initial'],[.8,10,15,20,10,10,10],[1.33,8,12,16,20,5,5]]:
            p=torch.tensor(values,dtype=torch.float32,requires_grad=True);prediction=predict(p,mt);gradient=torch.autograd.grad(prediction,p)[0];fixtures.append({'mt':mt,'parameters':values,'prediction':prediction.item(),'gradient':gradient.tolist()})
    p=torch.tensor(config['initial'],dtype=torch.float32,requires_grad=True);optimizer=torch.optim.Adam([p],lr=.01);adam=[]
    for step in range(61):
        prediction=predict(p,60)
        if step in [0,1,2,5,10,20,40,60]: adam.append({'step':step,'parameters':p.detach().tolist(),'prediction':prediction.item()})
        optimizer.zero_grad();torch.abs(prediction-.00235).backward();optimizer.step()
        with torch.no_grad():p[0].clamp_(.5,2);p[1:4].clamp_(5,50);p[4:7].clamp_(0,30)
    rng=np.random.default_rng(17);spline_fixtures=[]
    for n in [4,5,7]:
        points=rng.normal(size=(n,3));t=np.linspace(0,1,n);curve=make_interp_spline(t,points,k=3)(np.linspace(0,1,41));spline_fixtures.append({'points':points.tolist(),'curve':curve.tolist()})
    (args.out/'parity-fixtures.json').write_text(json.dumps({'neural':fixtures,'adam':adam,'spline':spline_fixtures},separators=(',',':'))+'\n')
    print('Exported frozen checkpoint, PyTorch gradients/Adam references, and SciPy spline references.',flush=True)
    # Load the exact numeric function bodies; the training-only data loader imports torchvision,
    # which is unrelated to pose inference and is not needed for this replay.
    def source_functions(path,names,namespace):
        tree=ast.parse(path.read_text(encoding='utf-8-sig'));nodes=[n for n in tree.body if isinstance(n,(ast.FunctionDef,ast.ClassDef)) and n.name in names]
        assert {n.name for n in nodes}==set(names)
        exec(compile(ast.Module(body=nodes,type_ignores=[]),str(path),'exec'),namespace)
        return namespace
    pose_context={'np':np,'R':R,'os':os}
    source_functions(args.pose_root/'simulation/ring_array_model.py',['get_linear_flexible_array_pose'],pose_context)
    source_functions(args.pose_root/'simulation/pose_estimate_improved.py',['ring_array_pos_ext','ring_array_neg_ext','get_array_pose','calc_dipole_field','fun_dipole_model','estimate_bending_from_captured_data'],pose_context)
    pose=SimpleNamespace(**pose_context)
    visual_context={'np':np,'least_squares':least_squares,'fun_dipole_model':pose.fun_dipole_model}
    source_functions(args.pose_root/'visualize_estimated_pose_sequence_finalonly.py',['ArgsCfg','args_cfg','estimate_one_frame'],visual_context)
    visual=SimpleNamespace(**visual_context)
    capture=args.pose_root/'dataset/captured_20250815_093351.npy';data=np.load(capture,allow_pickle=False)
    cfg=visual.args_cfg();cfg.dataset_dir=str(args.pose_root/'dataset');cfg.key_word=capture.name
    for name in ['simulation/pose_estimate_improved.py','simulation/ring_array_model.py','visualize_estimated_pose_sequence_finalonly.py']:
        target=args.evidence/Path(name).name;target.write_bytes((args.pose_root/name).read_bytes())
    beta1=np.array([65,90,120,160,180])+np.array([0,2,-3,1,-2]);beta2=np.array([-50,-90,-125,-150,-180])+np.array([1,-1,2,-3,0]);betas=np.concatenate([beta1,beta2])
    initial=np.concatenate([np.array([.02,-.01,-.04,.10,-.30,.10,0,5e-6,5e-6,5e-6]),betas]);frames=[]
    original_load=np.load;cache={str(capture):data}
    def cached_load(file,*a,**kw):
        name=str(file)
        return cache[name] if name in cache else original_load(file,*a,**kw)
    for frame in [200,201]:
        sensor=data[frame].reshape(85,3)[:75];trace=[];last_result={}
        def snapshot(parameters):
            pred,positions,orientations,centers,directions=pose.fun_dipole_model(parameters,sensor,frame,cfg,True)
            residual=pose.fun_dipole_model(parameters,sensor,frame,cfg)
            return {'parameters':np.asarray(parameters).tolist(),'dipoles':centers.tolist(),'directions':directions.tolist(),'sensors':positions.tolist(),'fields':pred.tolist(),'residual':float(np.linalg.norm(residual))}
        def recorded_fit(*fit_args,**fit_kwargs):
            trace.append(snapshot(fit_args[1]))
            def callback(intermediate_result):
                trace.append(snapshot(intermediate_result.x))
            result=least_squares(*fit_args,**fit_kwargs,callback=callback);last_result.update({'success':bool(result.success),'status':int(result.status),'message':str(result.message),'nfev':int(result.nfev),'cost':float(result.cost)})
            return result
        with contextlib.redirect_stdout(io.StringIO()),patch.object(np,'load',cached_load),patch.dict(visual_context,{'least_squares':recorded_fit}):
            # Confirm that caching file reads does not change the original residual.
            cached=pose.fun_dipole_model(initial,sensor,frame,cfg)
        with contextlib.redirect_stdout(io.StringIO()): direct=pose.fun_dipole_model(initial,sensor,frame,cfg)
        assert np.array_equal(cached,direct)
        with contextlib.redirect_stdout(io.StringIO()),patch.object(np,'load',cached_load),patch.dict(visual_context,{'least_squares':recorded_fit}):
            result=visual.estimate_one_frame(sensor,initial,betas,frame,cfg);final=snapshot(result[0]);trace.append(final)
        frames.append({'frame':frame,'trace':trace,'solver':last_result,'measurement':sensor.tolist(),'final':final});initial=np.asarray(result[0]).copy()
        print(f'Frame {frame}: {len(trace)} replay states; nfev={last_result["nfev"]}; status={last_result["status"]}; residual={trace[0]["residual"]:.6g} -> {final["residual"]:.6g}',flush=True)
        (args.out/'pose-replay.json').write_text(json.dumps({'capture':capture.name,'frames':frames,'sourceMethod':'Original estimate_one_frame / least_squares(trf), max_nfev=400, original bounds and postprocessing','curve':'scipy.make_interp_spline, k=3, not-a-knot, through dipole centers'},separators=(',',':'))+'\n')
    provenance={'sourceRoot':str(args.pose_root),'captureSha256':digest(capture),'captureShape':list(data.shape),'sources':{name:digest(args.pose_root/name) for name in ['simulation/pose_estimate_improved.py','simulation/ring_array_model.py','visualize_estimated_pose_sequence_finalonly.py']},'checkpoint':{'sha256':digest(checkpoint),'gitBlob':blob_sha},'modelSourceSha256':digest(model_path),'execution':'CPU; original research files unchanged; checkpoint weights frozen; source least-squares replay, not browser re-optimization'}
    (args.evidence/'provenance.json').write_text(json.dumps(provenance,indent=2)+'\n');print('Export complete.',flush=True)
if __name__=='__main__': main()
