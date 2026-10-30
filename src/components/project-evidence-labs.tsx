"use client";

import { useEffect, useId, useMemo, useRef, useState, type PointerEvent, type RefObject } from "react";
import faces from "@/data/facial-examples.json";
import { initialInverse, magneticAdam, magneticForward, magneticSpline, projectMagnetic, reconstructedFields, sourceRoundedParameters, type FrozenMagnetModel, type InverseState, type PoseFrame, type PoseReplay, type Vec3 } from "@/lib/magnetic-models";

type Crop = { src: string; width: number; height: number; crop: number[] };
// The shared figure already owns visibility, global/local pause, and reduced-motion policy.
function usePreviewInterval(host: RefObject<HTMLElement | null>, callback: () => void, delay: number) {
  const latest = useRef(callback);
  useEffect(() => { latest.current = callback; }, [callback]);
  useEffect(() => {
    const root = host.current?.closest<HTMLElement>(".project-teaser");
    let timer: ReturnType<typeof setInterval> | undefined;
    const sync = () => { clearInterval(timer); if (root?.dataset.playing === "true") timer = setInterval(() => latest.current(), delay); };
    const observer = new MutationObserver(sync);
    if (root) observer.observe(root, { attributes: true, attributeFilter: ["data-playing"] });
    sync();
    return () => { clearInterval(timer); observer.disconnect(); };
  }, [host, delay]);
}
function FaceCrop({ image }: { image: Crop }) { return <svg viewBox={image.crop.join(" ")} aria-hidden="true" preserveAspectRatio="xMidYMid meet"><image href={image.src} width={image.width} height={image.height} /></svg>; }
export function FacialEvidenceLab({ zh }: { zh: boolean }) {
  const host = useRef<HTMLDivElement>(null), position = useRef(25), direction = useRef(1);
  const [group, setGroup] = useState("classes"), [selected, setSelected] = useState(0), [reveal, setReveal] = useState(25);
  const examples = group === "classes" ? faces.examples.slice(0, 7) : faces.examples.slice(7);
  const sample = examples[selected];
  const move = (value: number) => { const next = Math.max(0, Math.min(100, value)); position.current = next; setReveal(next); };
  usePreviewInterval(host, () => { if (position.current >= 100) direction.current = -1; if (position.current <= 0) direction.current = 1; move(position.current + direction.current * 1.5); }, 60);
  const pointer = (event: PointerEvent<HTMLDivElement>) => { if (event.pointerType !== "mouse" && !event.buttons) return; const box = event.currentTarget.getBoundingClientRect(); move((event.clientX - box.left) / box.width * 100); };
  return <div ref={host} className="mini-lab facial-evidence-lab" data-lab="faces" data-sample={sample.id} data-reveal={reveal.toFixed(1)}>
    <header className="mini-lab-header"><h3>{zh ? "真實樣本・已存 Grad-CAM" : "Real samples · saved Grad-CAM"}</h3><span className="mini-live-mark" aria-hidden="true" /></header>
    <div className="mini-lab-controls facial-groups"><button type="button" aria-pressed={group === "classes"} onClick={() => { setGroup("classes"); setSelected(0); }}>{zh ? "七種標籤" : "Seven saved classes"}</button><button type="button" aria-pressed={group === "errors"} onClick={() => { setGroup("errors"); setSelected(0); }}>{zh ? "錯誤與平坦熱圖" : "Errors & flat maps"}</button></div>
    <label className="mini-select mini-lab-controls">{zh ? "筆記本樣本" : "Notebook sample"}<select aria-label={zh ? "臉部樣本" : "Saved facial example"} value={selected} onChange={event => setSelected(Number(event.target.value))}>{examples.map((item, i) => <option key={item.id} value={i}>{i + 1}. {item.label} → {item.prediction}</option>)}</select></label>
    <div className="facial-compare" role="group" aria-label={zh ? "拖曳比較同一樣本的原圖與 Grad-CAM" : "Drag to compare the same original and saved Grad-CAM"} onPointerDown={event => { event.currentTarget.setPointerCapture(event.pointerId); pointer(event); }} onPointerMove={pointer}>
      <FaceCrop image={sample.original} /><div className="facial-overlay" style={{ clipPath: `inset(0 ${100 - reveal}% 0 0)` }}><FaceCrop image={sample.overlay} /></div><span className="facial-divider" style={{ transform: `translateX(${reveal}%)` }} /><span className="facial-tag left">Grad-CAM</span><span className="facial-tag right">{zh ? "原圖" : "Original"}</span>
    </div>
    <div className="mini-lab-controls"><label className="mini-range">{zh ? "揭開已存熱圖" : "Reveal saved overlay"}<input type="range" aria-label={zh ? "熱圖揭露程度" : "Face overlay reveal"} min="0" max="100" step="1" value={Math.round(reveal)} onChange={event => move(Number(event.target.value))} /></label><button type="button" onClick={() => setSelected(value => (value + 1) % examples.length)}>{zh ? "下一個樣本" : "Next saved sample"}</button></div>
    <div className="facial-results"><div><span>{zh ? "資料集標籤" : "Dataset label"}</span><strong>{sample.label}</strong></div><div><span>{zh ? "已存預測" : "Saved prediction"}</span><strong data-face-prediction="true">{sample.prediction}</strong></div><div><span>{zh ? "已存 softmax" : "Saved softmax"}</span><strong>{(sample.score * 100).toFixed(1)}%</strong></div></div>
    <p className="mini-help" data-face-note="true">{sample.flat ? (zh ? "原始熱圖是平坦的；此處保留該結果。" : "The original heatmap is flat; that result is preserved.") : sample.label !== sample.prediction ? (zh ? "此為筆記本中已存的錯誤預測。" : "This is a saved incorrect prediction from the notebook.") : (zh ? "此為筆記本選出的正確預測範例。" : "A selected correct example from the saved notebook.")}</p>
    <a className="mini-source-link" href={faces.source} target="_blank" rel="noreferrer">{zh ? "查看原始筆記本 ↗" : "Inspect original notebook ↗"}</a>
  </div>;
}

export function MagneticEvidenceLab({ zh }: { zh: boolean }) {
  const [tab, setTab] = useState("pose"), [data, setData] = useState<{ pose: PoseReplay; model: FrozenMagnetModel } | null>(null), [failed, setFailed] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    const read = (name: string) => fetch(`/data/magnetic/${name}`, { signal: controller.signal }).then(response => { if (!response.ok) throw new Error("source data unavailable"); return response.json(); });
    Promise.all([read("pose-replay.json"), read("inverse-model.json")]).then(([pose, model]) => setData({ pose, model })).catch(() => { if (!controller.signal.aborted) setFailed(true); });
    return () => controller.abort();
  }, []);
  return <div className="mini-lab magnetic-evidence-lab" data-lab="magnetic">
    <header className="mini-lab-header"><h3>{zh ? "兩個原始實作" : "Two original implementations"}</h3><span className="mini-live-mark" aria-hidden="true" /></header>
    <div className="mini-lab-controls magnetic-projects"><button type="button" aria-pressed={tab === "pose"} onClick={() => setTab("pose")}>{zh ? "多偶極子・姿態重建" : "Dipoles · pose reconstruction"}</button><button type="button" aria-pressed={tab === "inverse"} onClick={() => setTab("inverse")}>{zh ? "逆向神經模型" : "Inverse neural model"}</button></div>
    {data ? tab === "pose" ? <PoseReconstruction frames={data.pose.frames} zh={zh} /> : <InverseMagnetic model={data.model} zh={zh} /> : <p className="mini-help">{failed ? (zh ? "無法載入原始實作資料。" : "Could not load the original implementation data.") : (zh ? "載入原始回歸與模型資料…" : "Loading the original regression and model…")}</p>}
    <noscript><p className="mini-help">{zh ? "啟用 JavaScript 操作原始實作。" : "Enable JavaScript to interact with the original implementations."}</p></noscript>
  </div>;
}
function PoseReconstruction({ frames, zh }: { frames: PoseFrame[]; zh: boolean }) {
  const host = useRef<HTMLDivElement>(null), ticks = useRef(0);
  const [frameIndex, setFrameIndex] = useState(0), [step, setStep] = useState(0), [phase, setPhase] = useState(0), [angle, setAngle] = useState(-.7), [showFields, setShowFields] = useState(false);
  const [edited, setEdited] = useState<Vec3[] | null>(null), [selectedPole, setSelectedPole] = useState(0);
  const dragging = useRef<{ index: number; point: [number, number]; original: Vec3[] } | null>(null);
  const frame = frames[frameIndex], state = frame.trace[step], centers = edited ?? state.dipoles;
  const curve = useMemo(() => magneticSpline(centers), [centers]);
  const fields = useMemo(() => edited ? reconstructedFields(state, edited) : state.fields, [state, edited]);
  const projected = (point: Vec3) => projectMagnetic(point, angle);
  usePreviewInterval(host, () => { setPhase(value => (value + 2) % 200); ticks.current++; if (!edited && !dragging.current && ticks.current % 2 === 0) setStep(value => Math.min(value + 1, frame.trace.length - 1)); }, 90);
  const scenePoint = (event: PointerEvent<SVGElement>): [number, number] => { const svg = event.currentTarget instanceof SVGSVGElement ? event.currentTarget : event.currentTarget.ownerSVGElement; const matrix = svg?.getScreenCTM(); if (!matrix) return [0, 0]; const p = new DOMPoint(event.clientX, event.clientY).matrixTransform(matrix.inverse()); return [p.x, p.y]; };
  const updatePole = (index: number, dx: number, dz: number, original = centers) => { const copy = original.map(point => [...point] as Vec3); copy[index][0] += dx * Math.cos(angle); copy[index][1] -= dx * Math.sin(angle); copy[index][2] = Math.max(-.15, Math.min(.25, copy[index][2] + dz)); setEdited(copy); setSelectedPole(index); };
  const marker = projected(curve[phase]);
  return <div ref={host} className="pose-reconstruction" data-magnetic-mode="pose" data-fit-step={step} data-curve-edited={String(!!edited)}>
    <p className="mini-help">{zh ? "75 個感測器 → 多偶極子最小平方回歸 → 三次樣條中心線。" : "75 sensors → distributed-dipole least squares → cubic-spline centerline."}</p>
    <svg className="pose-plot" viewBox="0 0 520 390" role="group" aria-label={zh ? "原始多偶極子重建" : "Original distributed-dipole reconstruction"} onPointerMove={event => { const drag = dragging.current; if (!drag) return; const p = scenePoint(event); updatePole(drag.index, (p[0] - drag.point[0]) / 650, -(p[1] - drag.point[1]) / 650, drag.original); }} onPointerUp={() => { dragging.current = null; }} onPointerCancel={() => { dragging.current = null; }}>
      <rect width="520" height="390" fill="var(--wash)" rx="5" />
      {state.sensors.map((point, i) => { const p = projected(point); return <circle key={i} cx={p[0]} cy={p[1]} r="2" fill="var(--sage)" opacity=".45" />; })}
      {showFields && fields.map((field, i) => { const norm = Math.hypot(...field) || 1; const start = state.sensors[i], end = start.map((value, axis) => value + field[axis] / norm * .025) as Vec3, a = projected(start), b = projected(end); return <path key={i} d={`M${a.join(" ")}L${b.join(" ")}`} stroke="var(--sage)" opacity=".6" strokeWidth="1.2" />; })}
      <path data-magnet-curve="true" d={curve.map((point, i) => `${i ? "L" : "M"}${projected(point).join(" ")}`).join("")} fill="none" stroke="var(--red)" strokeWidth="2.4" />
      <circle className="pose-curve-tracer" cx={marker[0]} cy={marker[1]} r="4" fill="var(--ink)" />
      {centers.map((_, i) => i).sort((a, b) => Number(a === selectedPole) - Number(b === selectedPole)).map(i => { const point = centers[i], center = projected(point), direction = state.directions[i], a = projected(point.map((value, axis) => value - direction[axis] * .018) as Vec3), b = projected(point.map((value, axis) => value + direction[axis] * .018) as Vec3); return <g key={i} className="magnet-pole" role="slider" tabIndex={0} aria-label={`${zh ? "偶極子" : "Dipole"} ${i + 1}`} aria-valuemin={-150} aria-valuemax={250} aria-valuenow={point[2] * 1000} aria-valuetext={point.map(value => `${(value * 1000).toFixed(1)} mm`).join(", ")} onPointerDown={event => { event.preventDefault(); event.stopPropagation(); event.currentTarget.ownerSVGElement?.setPointerCapture(event.pointerId); setSelectedPole(i); dragging.current = { index: i, point: scenePoint(event), original: centers.map(value => [...value] as Vec3) }; setEdited(centers.map(value => [...value] as Vec3)); }} onKeyDown={event => { if (event.key.startsWith("Arrow")) { event.preventDefault(); updatePole(i, event.key === "ArrowLeft" ? -.004 : event.key === "ArrowRight" ? .004 : 0, event.key === "ArrowUp" ? .004 : event.key === "ArrowDown" ? -.004 : 0); } }}><circle cx={center[0]} cy={center[1]} r="22" fill="transparent" /><path d={`M${a.join(" ")}L${center.join(" ")}`} stroke="var(--sage)" strokeWidth="6" strokeLinecap="round" /><path d={`M${center.join(" ")}L${b.join(" ")}`} stroke="var(--red)" strokeWidth="6" strokeLinecap="round" /><circle cx={center[0]} cy={center[1]} r="4" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1" /><text x={center[0] + 9} y={center[1] - 9} fontSize="12" fill="var(--ink)">{i + 1}</text></g>; })}
      <text x="20" y="370" fontSize="12" fill="var(--muted)">{zh ? "拖曳偶極子，重新擬合中心線" : "Drag a dipole to refit the centerline"}</text>
    </svg>
    <div className="mini-lab-controls dipole-picker" aria-label={zh ? "選擇偶極子" : "Choose a dipole"}>{centers.map((_, i) => <button type="button" key={i} aria-label={`${zh ? "選擇偶極子" : "Select dipole"} ${i + 1}`} aria-pressed={selectedPole === i} onClick={() => setSelectedPole(i)}>{i + 1}</button>)}</div>
    <div className="magnetic-fit-readout"><span>{zh ? "原始影格" : "Capture frame"} {frame.frame}</span><span>{zh ? "已存回歸步驟" : "Recorded fit step"} {step} / {frame.trace.length - 1}</span><span>{edited ? (zh ? "手動調整中心線" : "Edited centerline") : `‖r‖ = ${state.residual.toFixed(3)}`}</span></div>
    <div className="mini-lab-controls"><label className="mini-select">{zh ? "原始影格" : "Original frame"}<select aria-label={zh ? "重建影格" : "Reconstruction frame"} value={frameIndex} onChange={event => { setFrameIndex(Number(event.target.value)); setStep(0); setEdited(null); }}>{frames.map((item, i) => <option key={item.frame} value={i}>{item.frame}</option>)}</select></label><button type="button" onClick={() => { setEdited(null); setStep(0); }}>{zh ? "重播原始回歸" : "Replay original fit"}</button><label className="magnetic-checkbox"><input type="checkbox" checked={showFields} onChange={event => setShowFields(event.target.checked)} />{zh ? "顯示磁場向量" : "Show field vectors"}</label><label className="mini-range">{zh ? "回歸步驟" : "Regression step"}<input type="range" aria-label={zh ? "回歸步驟" : "Regression step"} min="0" max={frame.trace.length - 1} step="1" value={step} onChange={event => { setEdited(null); setStep(Number(event.target.value)); }} /></label><label className="mini-range">{zh ? "已選偶極子高度（mm）" : "Selected dipole height (mm)"}<input type="range" aria-label={zh ? "偶極子高度" : "Dipole height"} min="-150" max="250" step="1" value={centers[selectedPole][2] * 1000} onChange={event => updatePole(selectedPole, 0, Number(event.target.value) / 1000 - centers[selectedPole][2])} /></label><label className="mini-range">{zh ? "旋轉視角" : "Rotate the view"}<input type="range" aria-label={zh ? "重建視角" : "Reconstruction view"} min="-180" max="180" value={angle / Math.PI * 180} onChange={event => setAngle(Number(event.target.value) / 180 * Math.PI)} /></label></div>
    <p className="mini-help">{zh ? "回放來自原始 Python 最小平方程式。拖曳只會重算相同的三次樣條，不會重新執行整個姿態求解器。" : "Playback uses your original Python least-squares run. Dragging recomputes the same cubic spline; it does not rerun the full pose solver."}</p>
    <output className="mini-help">{zh ? "已選偶極子" : "Selected dipole"} {selectedPole + 1}: ({centers[selectedPole].map(value => (value * 1000).toFixed(1)).join(", ")}) mm</output>
  </div>;
}
function InverseMagnetic({ model, zh }: { model: FrozenMagnetModel; zh: boolean }) {
  const host = useRef<HTMLDivElement>(null), latest = useRef<InverseState>(initialInverse(model));
  const [run, setRun] = useState<InverseState>(() => initialInverse(model)), [target, setTarget] = useState(.00235), [mt, setMt] = useState(10);
  const clip = useId().replace(/:/g, "");
  const reset = () => { const value = initialInverse(model); latest.current = value; setRun(value); };
  const advance = (count: number) => { let value = latest.current; for (let i = 0; i < count && value.step < 3000; i++) value = magneticAdam(model, value, target, mt); latest.current = value; setRun(value); };
  usePreviewInterval(host, () => advance(10), 80);
  const output = useMemo(() => magneticForward(model, run.parameters, mt), [model, run.parameters, mt]);
  const changeTarget = (value: number) => { setTarget(Math.max(.002, Math.min(.003, value))); reset(); };
  const curve = (coefficient: number) => Array.from({ length: 81 }, (_, i) => { const x = i / 2; return `${i ? "L" : "M"}${45 + x / 40 * 410} ${255 - coefficient * x * x / 6 * 215}`; }).join("");
  const dragging = useRef(false);
  const pointerTarget = (event: PointerEvent<SVGSVGElement>) => { const matrix = event.currentTarget.getScreenCTM(); if (!matrix) return; const point = new DOMPoint(event.clientX, event.clientY).matrixTransform(matrix.inverse()); changeTarget((255 - point.y) / 215 * 6 / 1600); };
  const loss = Math.abs(output.prediction - target), p = run.parameters;
  return <div ref={host} className="inverse-magnetic" data-magnetic-mode="inverse" data-inverse-step={run.step} data-inverse-prediction={output.prediction} data-inverse-target={target} data-checkpoint={model.checkpointBlob}>
    <p className="mini-help">{zh ? "固定已訓練權重，使用 Adam 調整 cs、E、L，使 â 接近目標；mT 固定。" : "Freeze the trained weights; Adam adjusts cs, E, and L to match the target â. mT stays fixed."}</p>
    <svg className="inverse-flow" viewBox="0 0 520 102" role="img" aria-label={zh ? "原始神經模型的有效前向與逆向路徑" : "Active forward and reverse paths of the original neural model"}>
      {["mT", "E₁ E₂ E₃", "L₁ L₂ L₃", "cs"].map((label, i) => <g key={label}><rect x="12" y={8 + i * 22} width="95" height="18" rx="3" fill="var(--wash)" stroke="var(--line)" /><text x="59" y={21 + i * 22} textAnchor="middle" fontSize="11" fill="var(--ink)">{label}</text><path d={`M108 ${17 + i * 22}L175 48`} stroke="var(--sage)" strokeDasharray="4 6" className="mini-lab-flow" fill="none" /></g>)}
      <rect x="175" y="25" width="116" height="45" rx="4" fill="var(--wash)" stroke="var(--line)" /><text x="233" y="44" textAnchor="middle" fontSize="12" fill="var(--ink)">4 × sigmoid(20)</text><text x="233" y="60" textAnchor="middle" fontSize="11" fill="var(--muted)">concat(80)</text><path d="M292 48H329" stroke="var(--sage)" strokeDasharray="4 6" className="mini-lab-flow" /><rect x="330" y="25" width="105" height="45" rx="4" fill="var(--wash)" stroke="var(--line)" /><text x="382" y="44" textAnchor="middle" fontSize="12" fill="var(--ink)">sigmoid(20)</text><text x="382" y="60" textAnchor="middle" fontSize="11" fill="var(--muted)">frozen MLP</text><path d="M436 48H477" stroke="var(--sage)" strokeDasharray="4 6" className="mini-lab-flow" /><text x="493" y="53" textAnchor="middle" fontSize="19" fill="var(--red)">â</text><path d="M474 80H121" stroke="var(--red)" strokeDasharray="4 7" className="mini-lab-flow inverse-gradient-flow" /><text x="295" y="99" textAnchor="middle" fontSize="11" fill="var(--red)">{zh ? "L1 誤差 → 輸入梯度 → 有界 Adam 更新" : "L1 error → input gradients → bounded Adam updates"}</text>
    </svg>
    <svg className="inverse-curve-plot" viewBox="0 0 520 290" role="group" aria-label={zh ? "目標與神經模型預測的二次曲線" : "Target and neural-predicted quadratic curves"} onPointerDown={event => { if (event.button !== 0) return; event.preventDefault(); dragging.current = true; event.currentTarget.setPointerCapture(event.pointerId); pointerTarget(event); }} onPointerMove={event => { if (dragging.current) pointerTarget(event); }} onPointerUp={() => { dragging.current = false; }} onPointerCancel={() => { dragging.current = false; }}>
      <defs><clipPath id={clip}><rect x="44" y="30" width="414" height="226" /></clipPath></defs><path d="M45 30V255H465" stroke="var(--line)" fill="none" /><text x="18" y="35" fontSize="11" fill="var(--muted)">z</text><text x="470" y="270" fontSize="11" fill="var(--muted)">x</text><text x="21" y="43" fontSize="10" fill="var(--muted)">6</text><text x="42" y="274" fontSize="10" fill="var(--muted)">0</text><text x="444" y="274" fontSize="10" fill="var(--muted)">40</text>
      <g clipPath={`url(#${clip})`}><path data-target-curve="true" d={curve(target)} fill="none" stroke="var(--sage)" strokeWidth="2.5" strokeDasharray="5 5" /><path data-inverse-curve="true" d={curve(output.prediction)} fill="none" stroke="var(--red)" strokeWidth="2.5" /></g><circle cx="455" cy={255 - target * 1600 / 6 * 215} r="9" fill="var(--paper)" stroke="var(--sage)" strokeWidth="2" />
      {output.prediction * 1600 > 6 && <text x="68" y="27" fontSize="11" fill="var(--red)">{zh ? "預測曲線超出圖示範圍；數值如下" : "Predicted curve exceeds plot range; value below"}</text>}
    </svg>
    <p className="mini-help proof-legend"><span>{zh ? "紅線：已訓練模型預測" : "Red: trained-model prediction"}</span><span>{zh ? "綠線：目標 z = a·x²" : "Green: target z = a·x²"}</span></p>
    <div className="inverse-values"><div><span>{zh ? "目標 a" : "Target a"}</span><strong>{target.toFixed(6)}</strong></div><div><span>{zh ? "模型 â" : "Model â"}</span><strong data-neural-value="true">{output.prediction.toFixed(6)}</strong></div><div><span>{zh ? "絕對誤差" : "Absolute error"}</span><strong>{loss.toExponential(2)}</strong></div></div>
    <div className="mini-lab-controls"><label className="mini-range">{zh ? "目標曲率係數" : "Target curve coefficient"}<input type="range" aria-label={zh ? "逆向模型目標" : "Inverse model target"} min="0.002" max="0.003" step="0.00001" value={target} onChange={event => changeTarget(Number(event.target.value))} /></label><label className="mini-range">{zh ? "固定磁場（mT）" : "Fixed field (mT)"}<input type="range" aria-label={zh ? "固定磁場" : "Fixed magnetic field"} min="10" max="120" step="10" value={mt} onChange={event => { setMt(Number(event.target.value)); reset(); }} /><span>{mt} mT</span></label><button type="button" onClick={reset}>{zh ? "重新逆向求解" : "Restart inverse fit"}</button><button type="button" disabled={run.step >= 3000} onClick={() => advance(10)}>{zh ? "更新 10 步" : "Take 10 updates"}</button></div>
    <div className="inverse-parameters"><span>cs = {p[0].toFixed(3)}</span><span>E = ({p.slice(1, 4).map(v => v.toFixed(2)).join(", ")})</span><span>L = ({p.slice(4, 7).map(v => v.toFixed(2)).join(", ")})</span></div>
    {run.step >= 3000 && <output className="mini-help" data-source-rounded="true">{zh ? "原程式 5% 吸附後的回傳參數" : "Source returned parameters after the 5% snap"}: {sourceRoundedParameters(p).map(value => value.toFixed(3)).join(", ")}</output>}
    <p className="mini-help">Adam: {run.step} / 3000 · lr = 0.01 · {zh ? "參數界限與原程式一致；模型權重固定。" : "Source parameter bounds; model weights stay fixed."}</p>
    <a className="mini-source-link" href="https://github.com/Ztang-Yit-Xiaang/NeuroMagIK-Reverse-Neural-Modeling-3D-Magnetic-Pose-Reconstruction/blob/f022bc003749e06b71b1a1fec48454bd4606bd60/Reverse%20Neural%20Network%20Calculation/megnet_robot_traj/inverse_optimize.py" target="_blank" rel="noreferrer">{zh ? "查看原始逆向實作 ↗" : "Inspect original inverse implementation ↗"}</a>
  </div>;
}
