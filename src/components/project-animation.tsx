"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import Image from "next/image";
import catalog from "@/data/project-evidence.json";
import { ProjectTeaser } from "@/components/project-teaser";
import { ParticlePlayground } from "@/components/particle-playground";
import type { Locale } from "@/lib/i18n";

type Figure = { src: string; label: string; labelZh: string; width: number; height: number; source: string };
type Entry = { kind: string; title: string; titleZh: string; caption: string; captionZh: string; source: string; images?: Figure[]; frameCount?: number; video?: string; embed?: string; poster?: string; table?: Record<string,string>[]; columns?: string[]; group?: string; matrix?: { accuracy: Record<string,string>[]; trash: Record<string,string>[] }; documents?: { label: string; text: string; source: string }[] };

function OriginalFigures({ entry, zh }: { entry: Entry; zh: boolean }) {
  const [index,setIndex] = useState(0);
  const panel = useRef<HTMLDivElement>(null), lens = useRef<HTMLDivElement>(null), dialog = useRef<HTMLDialogElement>(null);
  const point = useRef({x:.5,y:.5});
  const images = entry.images ?? [], image = images[index];
  if (!image) return null;
  const inspect = (x: number,y: number) => {
    const root=panel.current, detail=lens.current;
    if(!root||!detail)return;
    point.current={x,y};
    const width=root.clientWidth,height=root.clientHeight,scale=Math.min(width/image.width,height/image.height),cw=image.width*scale,ch=image.height*scale;
    detail.style.backgroundImage=`url("${image.src}")`;
    detail.style.backgroundSize=`${cw*2.8}px ${ch*2.8}px`;
    detail.style.backgroundPosition=`${detail.clientWidth/2-x*cw*2.8}px ${detail.clientHeight/2-y*ch*2.8}px`;
    root.dataset.inspecting="true";
  };
  const pointer = (event: PointerEvent<HTMLDivElement>) => {
    const box=event.currentTarget.getBoundingClientRect();
    const x=Math.max(0,Math.min(.999,(event.clientX-box.left)/box.width));
    if(entry.frameCount&&index<entry.frameCount){setIndex(Math.min(entry.frameCount-1,Math.floor(x*entry.frameCount)));return;}
    const scale=Math.min(box.width/image.width,box.height/image.height),cw=image.width*scale,ch=image.height*scale;
    const ix=(event.clientX-box.left-(box.width-cw)/2)/cw,iy=(event.clientY-box.top-(box.height-ch)/2)/ch;
    if(ix<0||ix>1||iy<0||iy>1){if(panel.current)panel.current.dataset.inspecting="false";return;}inspect(ix,iy);
  };
  return <div className="evidence-figures">
    <div className="evidence-figure-tabs demo-controls" aria-label={zh?"原始圖表":"Original figures"}>{images.map((item,i)=><button type="button" key={item.src} aria-pressed={index===i} onClick={()=>{setIndex(i);if(panel.current)panel.current.dataset.inspecting="false";}}>{zh?item.labelZh:item.label}</button>)}</div>
    <div ref={panel} className="evidence-image" tabIndex={0} role="group" aria-label={zh?"方向鍵檢視原圖細節；磁場影格可用下方滑桿切換。":"Arrow keys inspect original image details. Magnetic frames can also be selected below."} onPointerMove={pointer} onPointerDown={pointer} onPointerLeave={()=>{if(panel.current)panel.current.dataset.inspecting="false";}} onKeyDown={event=>{const delta:Record<string,[number,number]>={ArrowLeft:[-.08,0],ArrowRight:[.08,0],ArrowUp:[0,-.08],ArrowDown:[0,.08]};if(delta[event.key]){event.preventDefault();const [x,y]=delta[event.key];inspect(Math.max(0,Math.min(1,point.current.x+x)),Math.max(0,Math.min(1,point.current.y+y)));}if(event.key==="Escape"&&panel.current)panel.current.dataset.inspecting="false";}}>
      <Image src={image.src} alt={zh?image.labelZh:image.label} fill sizes="(max-width:700px) 95vw, 650px" style={{objectFit:"contain"}} />
      <div ref={lens} className="evidence-lens" aria-hidden="true" />
    </div>
    {entry.frameCount&&<label className="evidence-frame-control demo-controls">{zh?"原始影格":"Saved frame"}: {index<entry.frameCount?(zh?image.labelZh:image.label):(zh?"其他圖表":"Other figure")}<input aria-label={zh?"原始磁場影格":"Saved magnetic frame"} type="range" min="0" max={entry.frameCount-1} step="1" value={Math.min(index,entry.frameCount-1)} onChange={event=>setIndex(Number(event.target.value))}/></label>}
    <div className="evidence-figure-foot"><span>{entry.frameCount&&index<entry.frameCount?(zh?"移動滑鼠切換原始影格":"Move across the image to scrub saved frames"):(zh?"移動滑鼠或使用方向鍵檢視細節":"Hover or use arrow keys to inspect details")}</span><button className="demo-controls" type="button" onClick={()=>dialog.current?.showModal()}>{zh?"放大原圖":"Open full figure"}</button><a href={image.source} target="_blank" rel="noreferrer">{zh?"原始產物 ↗":"Original artifact ↗"}</a></div>
    <dialog ref={dialog} className="evidence-dialog" aria-label={zh?image.labelZh:image.label}><button type="button" className="evidence-dialog-close" onClick={()=>dialog.current?.close()}>{zh?"關閉":"Close"} ×</button><Image src={image.src} alt={zh?image.labelZh:image.label} width={image.width} height={image.height} sizes="95vw" style={{width:"100%",height:"auto"}}/></dialog>
  </div>;
}

function SavedTable({ entry, zh }: {entry:Entry;zh:boolean}) {
  const rows=entry.table??[],columns=entry.columns??[];
  const groups=entry.group?[...new Set(rows.map(row=>row[entry.group!]))]:[];
  const [group,setGroup]=useState(groups[0]??""),[rowIndex,setRowIndex]=useState(0);
  const filtered=entry.group?rows.filter(row=>row[entry.group!]===group):rows;
  const selected=filtered[Math.min(rowIndex,filtered.length-1)];
  return <div className="saved-table">
    {entry.group&&<label className="demo-controls">{zh?"資料集":"Dataset"}<select aria-label={zh?"已存資料集":"Saved dataset"} value={group} onChange={event=>{setGroup(event.target.value);setRowIndex(0);}}>{groups.map(value=><option key={value}>{value}</option>)}</select></label>}
    <p className="evidence-note">{zh?"指向或選擇資料列，檢視原始數值。":"Hover or select a row to inspect its recorded values."}</p>
    <div className="evidence-table-scroll"><table><thead><tr>{columns.map(column=><th key={column} scope="col">{column.replaceAll("_"," ")}</th>)}</tr></thead><tbody>{filtered.map((row,i)=><tr key={i} data-selected={i===rowIndex} onPointerEnter={()=>setRowIndex(i)}>{columns.map((column,j)=><td key={column}>{j===0?<button type="button" className="table-row-select" onFocus={()=>setRowIndex(i)} onClick={()=>setRowIndex(i)} aria-pressed={i===rowIndex}>{row[column]}</button>:row[column]}</td>)}</tr>)}</tbody></table></div>
    {selected&&<output className="evidence-value" aria-live="polite">{columns.map(column=>`${column.replaceAll("_"," ")}: ${selected[column]}`).join(" · ")}</output>}
  </div>;
}

function SavedMatrix({ matrix, zh }: {matrix:NonNullable<Entry["matrix"]>;zh:boolean}) {
  const labels=Object.keys(matrix.accuracy[0]).filter(key=>key!=="");
  const [selected,setSelected]=useState({row:0,col:0});
  const acc=matrix.accuracy[selected.row],trash=matrix.trash[selected.row];
  return <div className="saved-matrix"><p className="evidence-note">{zh?"訓練表記 ↓ ／ 測試表記 →":"Train dialect ↓ / Test dialect →"}</p><div className="evidence-table-scroll"><table><thead><tr><th scope="col">T5</th>{labels.map(label=><th key={label} scope="col">{label}</th>)}</tr></thead><tbody>{matrix.accuracy.map((row,i)=><tr key={row[""]}><th scope="row">{row[""]}</th>{labels.map((label,j)=><td key={label}><button type="button" className="matrix-cell" aria-pressed={selected.row===i&&selected.col===j} style={{backgroundColor:`rgba(165,66,48,${.06+Number(row[label])/100*.55})`}} onPointerEnter={()=>setSelected({row:i,col:j})} onFocus={()=>setSelected({row:i,col:j})} onClick={()=>setSelected({row:i,col:j})}>{row[label]}%</button></td>)}</tr>)}</tbody></table></div><output className="evidence-value" aria-live="polite">{acc[""]} → {labels[selected.col]} · {zh?"已存準確率":"saved accuracy"}: {acc[labels[selected.col]]}% · {zh?"已存 Trash 指標":"saved trash metric"}: {trash[labels[selected.col]]}%</output></div>;
}

function SourceExplorer({ entry, zh }: {entry:Entry;zh:boolean}) {
  const [index,setIndex]=useState(0);const documents=entry.documents??[],doc=documents[index];
  if(!doc)return null;
  return <div className="source-explorer"><label className="demo-controls">{zh?"原始測試函式":"Original test function"}<select aria-label={zh?"求解器測試":"Solver test"} value={index} onChange={event=>setIndex(Number(event.target.value))}>{documents.map((item,i)=><option key={item.label} value={i}>{item.label}</option>)}</select></label><pre tabIndex={0}><code>{doc.text}</code></pre><a href={doc.source} target="_blank" rel="noreferrer">{zh?"查看原始程式行 ↗":"Inspect original source lines ↗"}</a></div>;
}

function EmbeddedProject({ entry, zh }: {entry:Entry;zh:boolean}) {
  const [active,setActive]=useState(false),[expanded,setExpanded]=useState(false);
  const dialog=useRef<HTMLDialogElement>(null);
  const title=zh?entry.titleZh:entry.title;
  const frame=()=> <iframe src={entry.embed} title={title} loading="lazy" sandbox={entry.embed?.includes("/project-evidence/vital/")?"allow-scripts allow-forms":"allow-scripts allow-same-origin allow-forms"} allow="fullscreen"/>;
  return <div className="embedded-project">
    {active?frame():<div className="evidence-poster"><Image src={entry.poster!} alt={title} fill sizes="(max-width:700px) 95vw, 650px" style={{objectFit:"contain"}}/></div>}
    <div className="evidence-embed-controls demo-controls"><button type="button" onClick={()=>setActive(!active)}>{active?(zh?"關閉展示":"Close demo"):(zh?"操作原始介面":"Use actual interface")}</button><button type="button" onClick={()=>{setExpanded(true);dialog.current?.showModal();}}>{zh?"開啟大型展示":"Open larger demo"}</button></div>
    <a href={entry.embed} target="_blank" rel="noreferrer">{zh?"另開原始展示 ↗":"Open original demo ↗"}</a>
    <dialog ref={dialog} className="evidence-dialog evidence-app-dialog" aria-label={title} onClose={()=>setExpanded(false)}><button type="button" className="evidence-dialog-close" onClick={()=>dialog.current?.close()}>{zh?"關閉":"Close"} ×</button>{expanded&&frame()}</dialog>
  </div>;
}

/** Each interaction operates on original project media, saved results, or an actual interface. */
export function ProjectAnimation({slug,locale="en",compact=false}:{slug:string;locale?:Locale;compact?:boolean}) {
  const entry=(catalog as Record<string,Entry>)[slug];
  const host=useRef<HTMLElement>(null);const zh=locale==="zh-Hant";
  useEffect(()=>{if(host.current)host.current.dataset.ready="true";},[]);
  if(!entry)return null;
  if(entry.kind==="particles")return <ParticlePlayground locale={locale} compact={compact}/>;
  if(slug==="facial-expression-recognition"||slug==="magnetic-pose-estimation")return <div className="project-source-lab-detail">
    <ProjectTeaser slug={slug} locale={locale} compact={compact}/>
    <details className="evidence-more"><summary>{zh?"檢視完整原始圖表":"Inspect complete original figures"}</summary><OriginalFigures entry={entry} zh={zh}/><p className="evidence-note">{zh?entry.captionZh:entry.caption}</p></details>
    {entry.video&&<details className="evidence-more"><summary>{zh?"AnySkin：獨立子系統的原始影片":"AnySkin: original footage of the separate subsystem"}</summary><video src={entry.video} controls playsInline preload="none" muted/></details>}
  </div>;
  return <figure ref={host} className={`project-demo${compact?" compact":""}`} data-project={slug}>
    <header className="project-demo-heading"><span>{zh?"原始專案互動":"FROM THE PROJECT"}</span><h3>{zh?entry.titleZh:entry.title}</h3></header>
    {entry.kind==="embed"&&<EmbeddedProject entry={entry} zh={zh}/>}
    {entry.matrix&&<><OriginalFigures entry={entry} zh={zh}/><SavedMatrix matrix={entry.matrix} zh={zh}/></>}
    {(entry.kind==="figures"||entry.kind==="frames")&&<OriginalFigures entry={entry} zh={zh}/>}
    {entry.kind==="source"&&<SourceExplorer entry={entry} zh={zh}/>}
    {entry.table&&<SavedTable entry={entry} zh={zh}/>}
    {entry.video&&<details className="evidence-more"><summary>{zh?"AnySkin：原始硬體展示（獨立子系統）":"AnySkin: original hardware footage (separate subsystem)"}</summary><video src={entry.video} controls playsInline preload="none" muted/></details>}
    <figcaption>{zh?entry.captionZh:entry.caption}</figcaption><a className="evidence-source" href={entry.source} target="_blank" rel="noreferrer">{zh?"檢視專案原始資料 ↗":"Inspect project source ↗"}</a>
  </figure>;
}
