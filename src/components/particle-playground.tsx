"use client";

import { useEffect, useId, useRef, useState } from "react";
import { collide, FIXED_STEP, GROUND_Y, SCENE_WIDTH, seedParticles, stepParticles, type Obstacle, type Particle } from "@/lib/particle-physics";
import type { Locale } from "@/lib/i18n";

type Tool = "move" | "add" | "erase" | "launch";
const initialObstacles = (): Obstacle[] => [{ x: .43, y: .43, radius: .12 }, { x: 1.35, y: .62, radius: .095 }, { x: .9, y: .52, radius: .11 }];

export function ParticlePlayground({ locale = "en", compact = false }: { locale?: Locale; compact?: boolean }) {
  const zh = locale === "zh-Hant", id = useId();
  const canvas = useRef<HTMLCanvasElement>(null);
  const count = useRef<HTMLOutputElement>(null);
  const [paused, setPaused] = useState(false);
  const [tool, setTool] = useState<Tool>("move");
  const [gravity, setGravity] = useState(9.8);
  const [bounce, setBounce] = useState(.75);
  const settings = useRef({ tool: "move" as Tool, gravity: 9.8, bounce: .75 });
  const worldState = useRef({ particles: seedParticles(), obstacles: initialObstacles(), tilt: 0 });
  const action = useRef<(name: "rain" | "less" | "reset" | "clear" | "step" | "draw") => void>(() => {});

  useEffect(() => {
    const element = canvas.current, context = element?.getContext("2d");
    const world = element?.closest<HTMLElement>(".world");
    if (!element || !context || !world) return;
    const physics = worldState.current, reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false, animation = 0, previous = 0, accumulator = 0;
    let dragged: Obstacle | null = null;
    let aim: { x: number; y: number; toX: number; toY: number } | null = null;
    let selected = 2;
    const draw = () => {
      const width = element.clientWidth, height = element.clientHeight;
      if (!width || !height) return;
      const ratio = Math.min(devicePixelRatio || 1, 2);
      if (element.width !== Math.round(width * ratio) || element.height !== Math.round(height * ratio)) { element.width = Math.round(width * ratio); element.height = Math.round(height * ratio); }
      context.setTransform(element.width / SCENE_WIDTH, 0, 0, element.height, 0, 0);
      context.clearRect(0, 0, SCENE_WIDTH, 1);
      const colors = getComputedStyle(world), ink = colors.getPropertyValue("--ink").trim(), red = colors.getPropertyValue("--red").trim(), sage = colors.getPropertyValue("--sage").trim();
      context.strokeStyle = colors.getPropertyValue("--line").trim(); context.lineWidth = .0015;
      for (let x = .1; x < SCENE_WIDTH; x += .1) for (let y = .1; y < 1; y += .1) { context.beginPath(); context.arc(x, y, .0016, 0, Math.PI * 2); context.stroke(); }
      physics.obstacles.forEach((obstacle, index) => {
        context.beginPath(); context.arc(obstacle.x, obstacle.y, obstacle.radius, 0, Math.PI * 2);
        context.fillStyle = colors.getPropertyValue("--wash").trim(); context.fill();
        context.lineWidth = index === selected ? .005 : .0025; context.strokeStyle = index === selected ? red : sage; context.stroke();
        context.beginPath(); context.moveTo(obstacle.x-.018,obstacle.y); context.lineTo(obstacle.x+.018,obstacle.y); context.moveTo(obstacle.x,obstacle.y-.018); context.lineTo(obstacle.x,obstacle.y+.018); context.stroke();
      });
      physics.particles.forEach((particle, index) => { context.beginPath(); context.arc(particle.x, particle.y, particle.radius, 0, Math.PI*2); context.fillStyle = index%4 === 0 ? red : index%3 === 0 ? ink : sage; context.fill(); });
      context.strokeStyle = ink; context.lineWidth = .003; context.beginPath(); context.moveTo(.04,GROUND_Y); context.lineTo(SCENE_WIDTH-.04,GROUND_Y); context.stroke();
      if (aim) { context.strokeStyle = red; context.lineWidth = .005; context.setLineDash([.02,.014]); context.beginPath(); context.moveTo(aim.x,aim.y); context.lineTo(aim.toX,aim.toY); context.stroke(); context.setLineDash([]); context.beginPath(); context.arc(aim.x,aim.y,.022,0,Math.PI*2); context.fillStyle=red; context.fill(); }
      element.dataset.ready = "true"; element.dataset.particles = String(physics.particles.length); element.dataset.obstacles = String(physics.obstacles.length); element.dataset.obstacle = physics.obstacles.map(o=>`${o.x.toFixed(3)},${o.y.toFixed(3)}`).join(";");
      element.dataset.gravity=String(settings.current.gravity); element.dataset.bounce=String(settings.current.bounce);
      if (count.current) count.current.textContent = zh ? `${physics.particles.length} 個粒子 · ${physics.obstacles.length} 個障礙物` : `${physics.particles.length} particles · ${physics.obstacles.length} obstacles`;
    };
    const advance = () => stepParticles(physics.particles,physics.obstacles,physics.tilt,settings.current.gravity,settings.current.bounce);
    const allowed = () => visible && !paused && !reduced.matches && !document.hidden && world.dataset.motion !== "paused";
    const tick = (now: number) => { if (!allowed()) return; accumulator+=Math.min((now-previous)/1000,.04); previous=now; while(accumulator>=FIXED_STEP){advance();accumulator-=FIXED_STEP;} draw(); animation=requestAnimationFrame(tick); };
    const sync = () => { cancelAnimationFrame(animation); previous=performance.now();accumulator=0;element.dataset.running=String(allowed());draw();if(allowed())animation=requestAnimationFrame(tick); };
    const clamp = (x: number,y: number) => ({x:Math.max(.04,Math.min(SCENE_WIDTH-.04,x)),y:Math.max(.04,Math.min(.9,y))});
    const position = (event: PointerEvent) => { const box=element.getBoundingClientRect();return clamp((event.clientX-box.left)/box.width*SCENE_WIDTH,(event.clientY-box.top)/box.height); };
    const hit = (x: number,y: number) => physics.obstacles.findIndex(o=>Math.hypot(o.x-x,o.y-y)<=o.radius+.035);
    const relocate = (obstacle: Obstacle,x: number,y: number) => { obstacle.x=Math.max(obstacle.radius,Math.min(SCENE_WIDTH-obstacle.radius,x));obstacle.y=Math.max(obstacle.radius,Math.min(.92-obstacle.radius,y));for(const particle of physics.particles)collide(particle,obstacle,settings.current.bounce);draw(); };
    const down = (event: PointerEvent) => {
      element.focus({preventScroll:true});element.setPointerCapture(event.pointerId);const p=position(event);const index=hit(p.x,p.y);
      if(event.button===2 || settings.current.tool==="erase"){if(index>=0)physics.obstacles.splice(index,1);selected=Math.max(0,Math.min(selected,physics.obstacles.length-1));draw();return;}
      if(settings.current.tool==="add"){if(physics.obstacles.length<12){physics.obstacles.push({...p,radius:.11});selected=physics.obstacles.length-1;}draw();return;}
      if(settings.current.tool==="launch"){aim={...p,toX:p.x,toY:p.y};draw();return;}
      selected=index>=0?index:Math.min(selected,physics.obstacles.length-1);dragged=physics.obstacles[selected]??null;if(dragged)relocate(dragged,p.x,p.y);
    };
    const move = (event: PointerEvent) => {
      const p=position(event);
      if(aim){aim.toX=p.x;aim.toY=p.y;draw();return;}
      if(dragged){relocate(dragged,p.x,p.y);return;}
      // Hover changes collisions inside the scene; the canvas itself never translates.
      if(event.pointerType==="mouse"&&settings.current.tool==="move"&&physics.obstacles[selected]&&!reduced.matches)relocate(physics.obstacles[selected],p.x,p.y);
    };
    const up = () => { if(aim&&physics.particles.length<180){const particle:Particle={x:aim.x,y:aim.y,vx:(aim.x-aim.toX)*5,vy:(aim.y-aim.toY)*5,radius:.018};physics.particles.push(particle);}aim=null;dragged=null;draw(); };
    const cancel = () => {aim=null;dragged=null;draw();};
    action.current = name => { if(name==="rain"){const added=seedParticles(24);physics.particles.push(...added.slice(0,Math.max(0,180-physics.particles.length)));}if(name==="less")physics.particles.splice(-24);if(name==="reset"){physics.particles=seedParticles();physics.obstacles=initialObstacles();selected=2;}if(name==="clear")physics.obstacles=[];if(name==="step")advance();draw(); };
    const key = (event: KeyboardEvent) => { const offsets:Record<string,[number,number]>={ArrowLeft:[-.05,0],ArrowRight:[.05,0],ArrowUp:[0,-.05],ArrowDown:[0,.05]};const delta=offsets[event.key],obstacle=physics.obstacles[selected];if(delta&&obstacle){event.preventDefault();relocate(obstacle,obstacle.x+delta[0],obstacle.y+delta[1]);}if(event.key==="+"||event.key==="="){event.preventDefault();action.current("rain");}if(event.key==="-"){event.preventDefault();action.current("less");}if(event.key==="Delete"&&obstacle){event.preventDefault();physics.obstacles.splice(selected,1);selected=Math.max(0,Math.min(selected,physics.obstacles.length-1));draw();}if(event.key==="Enter"&&settings.current.tool==="add"&&physics.obstacles.length<12){event.preventDefault();physics.obstacles.push({x:.9,y:.5,radius:.11});selected=physics.obstacles.length-1;draw();}if(event.code==="Space"&&settings.current.tool==="launch"&&physics.particles.length<180){event.preventDefault();physics.particles.push({x:.9,y:.7,vx:.5,vy:-2,radius:.018});draw();} };
    const contextMenu = (event: Event) => event.preventDefault();
    const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;sync();},{threshold:.08});observer.observe(element);
    const resize=new ResizeObserver(sync);resize.observe(element);
    const theme=new MutationObserver(sync);theme.observe(document.documentElement,{attributes:true,attributeFilter:["class"]});
    const motion=new MutationObserver(sync);motion.observe(world,{attributes:true,attributeFilter:["data-motion"]});
    element.addEventListener("pointerdown",down);element.addEventListener("pointermove",move);element.addEventListener("pointerup",up);element.addEventListener("pointercancel",cancel);element.addEventListener("keydown",key);element.addEventListener("contextmenu",contextMenu);document.addEventListener("visibilitychange",sync);reduced.addEventListener("change",sync);sync();
    return()=>{cancelAnimationFrame(animation);observer.disconnect();resize.disconnect();theme.disconnect();motion.disconnect();element.removeEventListener("pointerdown",down);element.removeEventListener("pointermove",move);element.removeEventListener("pointerup",up);element.removeEventListener("pointercancel",cancel);element.removeEventListener("keydown",key);element.removeEventListener("contextmenu",contextMenu);document.removeEventListener("visibilitychange",sync);reduced.removeEventListener("change",sync);action.current=()=>{};};
  },[paused,zh]);

  const tools: [Tool,string,string][]=[["move","Deflect / drag","撥動／拖曳"],["add","Add obstacle","新增障礙物"],["erase","Erase obstacle","刪除障礙物"],["launch","Launch","發射"]];
  const instructions: Record<Tool,string>=zh?{move:"移動滑鼠撥動粒子，或拖曳圓形障礙物。方向鍵也能移動選中的障礙物。",add:"點擊空白處放置障礙物；聚焦畫布後，Enter 也能放置圓形。",erase:"點擊障礙物將其移除；滑鼠右鍵也可以刪除。",launch:"按住畫布、向後拉，再放開以發射粒子。空白鍵可從中央發射。"}:{move:"Move your mouse to deflect the particles, or drag a circle. Arrow keys move the selected obstacle.",add:"Click empty space to build an obstacle course. With the canvas focused, Enter places a circle.",erase:"Click a circle to remove it. Right-click also removes obstacles.",launch:"Press on the canvas, pull back, and release to launch a particle. Space launches from the center."};
  return <section className={`particle-playground${compact?" particle-compact":" world-wrap"}`} aria-labelledby={id} data-project="particle-obstacle-collision">
    <div className="particle-story"><h2 id={id}>{zh?"自己搭一座粒子遊樂場。":"Build your own particle playground."}</h2><p>{zh?"依原始 Processing 專案的新增／刪除互動改寫。搭建障礙、發射粒子，再試試重力與彈性。":"Adapted from the original Processing project's add/remove controls. Build a course, launch particles, and experiment with gravity and bounce."}</p><a className="text-link" href="https://github.com/Ztang-Yit-Xiaang/Particle-Obstacle-Collision-Animation-SimulationProjects/blob/main/HW2/HomeworkSketch/HomeworkSketch/HomeworkSketch.pde" target="_blank" rel="noreferrer">{zh?"原始互動程式碼 ↗":"Original interaction code ↗"}</a></div>
    <div className="particle-stage">
      <div className="particle-tools" aria-label={zh?"遊樂場工具":"Playground tools"}>{tools.map(([value,en,cn])=><button key={value} type="button" aria-pressed={tool===value} onClick={()=>{setTool(value);settings.current.tool=value;}}>{zh?cn:en}</button>)}</div>
      <p className="particle-instructions" aria-live="polite">{instructions[tool]}</p>
      <div className="particle-surface"><svg className="particle-poster" viewBox="0 0 900 500" role="img" aria-label={zh?"粒子與圓形障礙物":"Particles and circular obstacles"}><g className="particle-poster-obstacles">{initialObstacles().map((o,i)=><circle key={i} cx={o.x*500} cy={o.y*500} r={o.radius*500}/>)}</g><g className="particle-poster-points">{seedParticles().map((p,i)=><circle key={i} cx={p.x*500} cy={p.y*500} r={p.radius*500}/>)}</g></svg><canvas ref={canvas} width={900} height={500} tabIndex={0} role="img" aria-label={zh?"互動粒子遊樂場；方向鍵移動障礙物，加減鍵改變粒子數。":"Interactive particle playground. Arrow keys move an obstacle; plus and minus change particle count."}/></div>
      <div className="particle-tuning"><label>{zh?"重力":"Gravity"} <output>{gravity.toFixed(1)}</output><input aria-label={zh?"重力":"Gravity"} type="range" min="0" max="16" step=".2" value={gravity} onChange={event=>{const v=Number(event.target.value);setGravity(v);settings.current.gravity=v;action.current("draw");}}/></label><label>{zh?"彈性":"Bounce"} <output>{Math.round(bounce*100)}%</output><input aria-label={zh?"彈性":"Bounce"} type="range" min=".1" max="1" step=".05" value={bounce} onChange={event=>{const v=Number(event.target.value);setBounce(v);settings.current.bounce=v;action.current("draw");}}/></label></div>
      <div className="particle-controls"><output ref={count} aria-live="polite">{zh?"28 個粒子 · 3 個障礙物":"28 particles · 3 obstacles"}</output><div><button type="button" onClick={()=>action.current("rain")}>{zh?"+24 粒子":"+24 particles"}</button><button type="button" onClick={()=>action.current("less")}>{zh?"−24 粒子":"−24 particles"}</button><button type="button" onClick={()=>action.current("clear")}>{zh?"清空障礙物":"Clear obstacles"}</button><button type="button" onClick={()=>action.current("reset")}>{zh?"重設場景":"Reset scene"}</button><button type="button" onClick={()=>{setPaused(true);action.current("step");}}>{zh?"單步":"Step"}</button><button type="button" aria-pressed={paused} onClick={()=>setPaused(!paused)}>{zh?(paused?"播放":"暫停"):(paused?"Play sketch":"Pause sketch")}</button></div></div>
      <p className="particle-caption">{zh?"瀏覽器改寫；新增拖曳、發射與可調參數。離開畫面、隱藏分頁或偏好減少動態時暫停。":"Browser adaptation with added dragging, launching, and tunable parameters. Pauses offscreen, in hidden tabs, and for reduced motion."}</p>
    </div>
  </section>;
}
