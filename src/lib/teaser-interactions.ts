import { collide, type Particle } from "@/lib/particle-physics";

export type MiniControl = { label: string; min: number; max: number; step: number; value: number };
export type MiniSpec = { hint: string; action?: string; control?: MiniControl; options?: string[] };
export type MiniScene = { action?: () => void; adjust?: (value: number) => void; dispose: () => void };
const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

export function miniSpec(slug: string, zh: boolean): MiniSpec {
  const text = (en: string, cn: string) => zh ? cn : en;
  const slider = (label: string, min: number, max: number, value: number, step = 1) => ({ label, min, max, value, step });
  switch (slug) {
    case "osqp-method-in-torch": return { hint: text("Click the contour plot to choose a starting point; adjust the step size to explore descent.","點選等高線圖設定起點；調整步長，探索下降過程。") };
    case "context-aware-travel-itinerary-optimization": return { hint: text("Drag the changed stop to reshape the route.","拖曳變更的停靠點，重新塑造路線。"), action: text("Try a disruption","換個干擾位置") };
    case "matrix-vector-trace-estimation": return { hint: text("Drag either divider to redistribute the example budget.","拖曳分隔點，重新分配示例預算。"), control: slider(text("Pilot queries","先導查詢數"),6,60,18), action: text("Try another allocation","換個分配") };
    case "multi-task-optimizer": return { hint: text("Drag task A’s arrow or change its influence.","拖曳任務 A 的箭頭，或調整影響力。"), control: slider(text("Task A influence (%)","任務 A 影響力（%）"),0,100,50), action: text("Flip task A","反轉任務 A") };
    case "randomized-sketching": return { hint: text("Click matrix rows to change the smaller sketch.","點選矩陣資料列，改變右側縮圖。"), control: slider(text("Sampling anchor row","抽樣起始列"),1,9,2), action: text("Sample different rows","換一組資料列") };
    case "wenzhounese-input-method": return { hint: text("Search readings or characters, then choose candidates to build a phrase.","搜尋讀音或漢字，再點選候選字，組合自己的句子。") };
    case "magnetic-pose-estimation": return { hint: text("Switch between the original pose reconstruction and inverse neural model. Drag dipoles or adjust the target curve.","切換原始姿態重建與逆向神經模型；拖曳偶極子，或調整目標曲線。") };
    case "sparse-pca-gene-expression": return { hint: text("Move the threshold to retain or remove illustrated loadings.","移動門檻，保留或移除示意負載。"), control: slider(text("Illustrative threshold","示意門檻"),0,150,110), action: text("Try another threshold","換個門檻") };
    case "facial-expression-recognition": return { hint: text("Choose a real saved sample, then move across it to reveal its Grad-CAM.","選擇真實已存樣本，再移動滑鼠，揭開對應的 Grad-CAM。") };
    case "pdebench-lang": return { hint: text("Click an encoding to rewrite the same equation.","點選編碼方式，改寫同一個方程式。"), options: ["Postfix","Raw LaTeX","Prefix",text("Natural language","自然語言")], action: text("Next encoding","下一種編碼") };
    case "mathproof-skill": return { hint: text("Inspect each proof step, change an assumption, and find or repair a counterexample.","逐步檢視證明、改動假設，再尋找反例或修補條件。") };
    case "dwts-vote-reconstruction": return { hint: text("Drag a fan-share bar or change the illustrative voting weight.","拖曳粉絲比例長條，或改變示意投票權重。"), control: slider(text("Fan weight (%)","粉絲權重（%）"),0,100,50), action: text("Swap fan preferences","交換粉絲偏好") };
    case "vital-lens": return { hint: text("Drag the sample card through review into the journal.","將範例卡片拖過檢視區，再放進日誌。"), action: text("Review / save sample","檢視／儲存範例") };
    default: return { hint: text("Drag the red obstacle. Click empty space to drop particles.","拖曳紅色障礙物；點擊空白處投放粒子。"), action: text("Drop 5 particles","投放 5 個粒子") };
  }
}

/** Direct manipulation of the existing miniature illustrations, not project execution. */
export function mountMiniScene(svg: SVGSVGElement, slug: string, options: {
  zh: boolean; report: (text: string) => void; control: (value: number) => void;
}): MiniScene {
  const { zh, report, control } = options;
  const text = (en: string, cn: string) => zh ? cn : en;
  const root = svg.closest<HTMLElement>(".project-teaser")!;
  const body = svg.querySelector<SVGGElement>(".pointer-layer")!;
  const q = <T extends SVGElement>(selector: string) => body.querySelector<T>(selector)!;
  const all = <T extends SVGElement>(selector: string) => Array.from(body.querySelectorAll<T>(selector));
  const attr = (node: SVGElement, values: Record<string, number | string>) => Object.entries(values).forEach(([key,value]) => node.setAttribute(key,String(value)));
  const freeze = (node: SVGElement) => { node.style.animation = "none"; node.style.opacity = "1"; if (node instanceof SVGPathElement) node.style.strokeDashoffset = "0"; };
  const add = <K extends keyof SVGElementTagNameMap>(tag: K, values: Record<string,number|string>, parent: SVGElement = body) => { const node=document.createElementNS("http://www.w3.org/2000/svg",tag);attr(node,values);parent.append(node);return node; };
  const overlay = add("g", { "data-mini-controls":"true" });
  const disposers: (()=>void)[] = [];
  let action: (()=>void)|undefined, adjust: ((value:number)=>void)|undefined;
  let active: { id:number; move:(p:{x:number;y:number})=>void; end?:()=>void }|null=null;
  svg.setAttribute("role","group");
  const scenePoint = (event: PointerEvent) => { const matrix=svg.getScreenCTM();return matrix?new DOMPoint(event.clientX,event.clientY).matrixTransform(matrix.inverse()):new DOMPoint(); };
  const listen = (node: SVGElement, event: string, callback: EventListener) => {node.addEventListener(event,callback);disposers.push(()=>node.removeEventListener(event,callback));};
  const drag = (label:string,x:number,y:number,move:(p:{x:number;y:number})=>void,keys:(key:string)=>void,end?:()=>void) => {
    const group=add("g",{class:"teaser-handle",tabindex:0,role:"slider","aria-label":label,"aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":50},overlay);
    add("circle",{r:56,fill:"transparent",class:"teaser-hit"},group);
    add("circle",{r:16,fill:"var(--art-paper)",stroke:"var(--art-red)","stroke-width":3,class:"teaser-handle-ring"},group);
    add("circle",{r:5,fill:"var(--art-red)"},group);
    const place=(px:number,py:number,value?:number)=>{group.setAttribute("transform",`translate(${px} ${py})`);group.setAttribute("aria-valuetext",`${Math.round(px)}, ${Math.round(py)}`);if(value!==undefined)group.setAttribute("aria-valuenow",String(Math.round(value)));};place(x,y);
    listen(group,"pointerdown",((event:PointerEvent)=>{if(event.button!==0)return;event.preventDefault();event.stopPropagation();group.focus({preventScroll:true});group.setPointerCapture(event.pointerId);active={id:event.pointerId,move,end};move(scenePoint(event));}) as EventListener);
    listen(group,"keydown",((event:KeyboardEvent)=>{if(["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"].includes(event.key)){event.preventDefault();keys(event.key);}}) as EventListener);
    return {place,group};
  };
  const click = (node:SVGElement,label:string,callback:()=>void) => {
    attr(node,{role:"button",tabindex:0,"aria-label":label,class:(node.getAttribute("class")??"")+" teaser-click-target"});
    listen(node,"click",(()=>{callback();}) as EventListener);
    listen(node,"keydown",((e:KeyboardEvent)=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();callback();}}) as EventListener);
  };
  const move = (event:PointerEvent)=>{if(active?.id===event.pointerId)active.move(scenePoint(event));};
  const up = (event:PointerEvent)=>{if(active?.id===event.pointerId){active.end?.();active=null;}};
  listen(svg,"pointermove",move as EventListener);listen(svg,"pointerup",up as EventListener);listen(svg,"pointercancel",up as EventListener);
  const keyStep = (key:string,step=10)=>key==="ArrowLeft"||key==="ArrowDown"?-step:step;
  const arrow = (x:number,y:number,tx:number,ty:number)=>{const a=Math.atan2(ty-y,tx-x),h=14;return `M${x} ${y}L${tx} ${ty}M${tx-h*Math.cos(a-.5)} ${ty-h*Math.sin(a-.5)}L${tx} ${ty}L${tx-h*Math.cos(a+.5)} ${ty-h*Math.sin(a+.5)}`;};

  if(slug==="context-aware-travel-itinerary-optimization") {
    const route=q<SVGPathElement>('path.draw'),stop=q<SVGCircleElement>('circle[cx="260"][r="13"]'),traveler=q<SVGCircleElement>('circle.bob');let x=260,y=315,toggle=false;
    const paint=()=>{attr(route,{d:`M78 285Q${(78+x)/2} ${y+25} ${x} ${y}Q${(x+505)/2} ${y} 505 265Q630 185 805 165`});attr(stop,{cx:x,cy:y});attr(traveler,{cx:x,cy:y});handle.place(x,y);report(text(`Changed stop (${Math.round(x)}, ${Math.round(y)}) · endpoints kept`,`變更停靠點（${Math.round(x)}，${Math.round(y)}）・保留起終點`));};
    const update=(p:{x:number;y:number})=>{x=clamp(p.x,145,420);y=clamp(p.y,165,335);paint();};
    const handle=drag(text("Changed route stop","變更的停靠點"),x,y,update,key=>update({x:x+(key==="ArrowLeft"?-12:key==="ArrowRight"?12:0),y:y+(key==="ArrowUp"?-12:key==="ArrowDown"?12:0)}));
    action=()=>{toggle=!toggle;update(toggle?{x:360,y:190}:{x:260,y:315});};
  } else if(slug==="matrix-vector-trace-estimation") {
    const boxes=all<SVGRectElement>('rect[y="180"]'),labels=all<SVGTextElement>('text[y="246"]'),equation=q<SVGTextElement>('text[y="350"]'),highlights=all<SVGRectElement>('rect.highlight');let pilot=18,rank=27;
    const paint=()=>{const values=[pilot,rank,90-pilot-rank];let x=335;values.forEach((v,i)=>{const width=v/90*482;attr(boxes[i],{x,width:Math.max(12,width-8)});attr(highlights[i],{x:x-4,width:Math.max(20,width)});attr(labels[i],{x:x+width/2,"font-size":17});labels[i].textContent=v<15?["q","r","ℓ"][i]+v:[text("Pilot","先導"),text("Low rank","低秩"),text("Residual","殘差")][i]+` ${v}`;x+=width;});equation.textContent=`${pilot} + ${rank} + ${90-pilot-rank} = 90`;first.place(335+pilot/90*482,307,pilot/90*100);second.place(335+(pilot+rank)/90*482,307,(pilot+rank)/90*100);control(pilot);report(text("Example budget conserved: 90 queries","示例總預算維持 90 次查詢"));};
    adjust=value=>{pilot=Math.round(clamp(value,6,60));rank=Math.min(rank,84-pilot);paint();};
    const first=drag(text("Pilot allocation divider","先導預算分隔點"),455,307,p=>adjust!((p.x-335)/482*90),key=>adjust!(pilot+keyStep(key,3)));
    const second=drag(text("Low-rank allocation divider","低秩預算分隔點"),639,307,p=>{rank=Math.round(clamp((p.x-335)/482*90-pilot,6,84-pilot));paint();},key=>{rank=clamp(rank+keyStep(key,3),6,84-pilot);paint();});
    action=()=>adjust!(pilot>=45?12:pilot+12);paint();
  } else if(slug==="multi-task-optimizer") {
    const taskA=q<SVGPathElement>('path[d^="M270 280L145"]'),shared=q<SVGPathElement>('path[d^="M270 280L280"]');let x=145,y=170,weight=.5;
    const paint=()=>{attr(taskA,{d:arrow(270,280,x,y)});attr(shared,{d:arrow(270,280,270+(x-270)*weight+140*(1-weight),280+(y-280)*weight-110*(1-weight))});handle.place(x,y);control(Math.round(weight*100));report(text(`Illustrative blend: A ${Math.round(weight*100)}% / B ${Math.round((1-weight)*100)}%`,`示意混合：A ${Math.round(weight*100)}%／B ${Math.round((1-weight)*100)}%`));};
    const update=(p:{x:number;y:number})=>{x=clamp(p.x,100,435);y=clamp(p.y,125,340);paint();};
    const handle=drag(text("Task A gradient tip","任務 A 梯度箭頭"),x,y,update,key=>update({x:x+(key==="ArrowLeft"?-12:key==="ArrowRight"?12:0),y:y+(key==="ArrowUp"?-12:key==="ArrowDown"?12:0)}));
    adjust=value=>{weight=value/100;paint();};action=()=>{x=540-x;y=560-y;update({x,y});};
  } else if(slug==="randomized-sketching") {
    const cells=all<SVGRectElement>('rect[width="21"]'),small=all<SVGRectElement>('rect[width="34"]');const originalFills=cells.map(n=>n.getAttribute("fill")!);small.forEach(n=>n.remove());const sketch=add("g",{"data-selected-rows":"1,4,6"});let selected=new Set([1,4,6]),anchor=1;
    const paint=()=>{cells.forEach((n,i)=>attr(n,{fill:originalFills[i],stroke:selected.has(Math.floor(i/5))?"var(--art-red)":"none","stroke-width":2}));sketch.replaceChildren();const rows=[...selected].sort((a,b)=>a-b),size=Math.min(30,150/Math.max(1,rows.length));rows.forEach((row,i)=>{for(let col=0;col<5;col++)add("rect",{x:510+col*43,y:145+i*(size+3),width:34,height:size,rx:3,class:"art-animate pulse"+(i%3===1?" later":i%3===2?" latest":""),fill:originalFills[row*5+col]},sketch);});sketch.setAttribute("data-selected-rows",rows.join(","));report(text(`${rows.length} of 9 rows selected · conceptual sketch`,`已選 ${rows.length}／9 列・概念縮圖`));};
    for(let row=0;row<9;row++){const hit=add("rect",{x:99,y:111+row*27,width:142,height:26,fill:"transparent"},overlay);click(hit,text(`Toggle matrix row ${row+1}`,`切換矩陣第 ${row+1} 列`),()=>{if(selected.has(row))selected.delete(row);else selected.add(row);paint();});}
    adjust=value=>{anchor=Math.round(value)-1;selected=new Set([anchor,(anchor+2)%9,(anchor+4)%9]);paint();};action=()=>{anchor=(anchor+1)%9;control(anchor+1);adjust!(anchor+1);};paint();
  } else if(slug==="sparse-pca-gene-expression") {
    const left=all<SVGRectElement>('rect[width="20"]').filter(n=>Number(n.getAttribute("x"))<400),right=all<SVGRectElement>('rect[width="20"]').filter(n=>Number(n.getAttribute("x"))>500),heights=left.map(n=>Number(n.getAttribute("height")));let threshold=110;
    const line=add("path",{d:"M80 210H340",stroke:"var(--art-red)","stroke-dasharray":"5 5",fill:"none"});
    const paint=()=>{let kept=0;right.forEach((n,i)=>{const keep=heights[i]>=threshold;kept+=Number(keep);attr(n,{y:keep?320-heights[i]:316,height:keep?heights[i]:4,fill:keep?"var(--art-red)":"var(--art-line)"});});attr(line,{d:`M80 ${320-threshold}H340`});handle.place(350,320-threshold,threshold/1.5);control(threshold);report(text(`${kept} of 8 illustrative loadings retained`,`保留 ${kept}／8 個示意負載`));};
    adjust=value=>{threshold=Math.round(clamp(value,0,150));paint();};const handle=drag(text("Sparsity threshold","稀疏門檻"),350,210,p=>adjust!(320-p.y),key=>adjust!(threshold+keyStep(key,10)));action=()=>adjust!(threshold>100?60:135);paint();
  } else if(slug==="pdebench-lang") {
    const equation=q<SVGTextElement>('text[x="707"]'),boxes=all<SVGRectElement>('rect[y="295"]'),highlights=all<SVGRectElement>('rect.highlight');const encodings=[['u t d α u x x d d * ='],['u_t = α u_{xx}'],['= d(u,t) * α d(d(u,x),x)'],['Time derivative of u','= α · second x derivative']];let index=1;
    adjust=value=>{index=Math.round(value);equation.replaceChildren();attr(equation,{"font-size":index===3?14:17});encodings[index].forEach((line,i)=>{const span=add("tspan",{x:707,y:180+i*23},equation);span.textContent=line;});highlights.forEach((n,i)=>{freeze(n);n.style.opacity=i===index?"1":"0";attr(boxes[i],{"aria-pressed":String(i===index)});});control(index);report(text(`Equivalent encoding: ${["Postfix","Raw LaTeX","Prefix","Natural language"][index]}`,`等價編碼：${["後序","原始 LaTeX","前序","自然語言"][index]}`));};boxes.forEach((node,i)=>click(node,text(`Use ${["Postfix","Raw LaTeX","Prefix","Natural language"][i]}`,`使用第 ${i+1} 種編碼`),()=>adjust!(i)));all<SVGTextElement>('text[y="331"]').forEach(n=>{n.style.pointerEvents="none";});action=()=>adjust!((index+1)%4);
  } else if(slug==="dwts-vote-reconstruction") {
    const fans=all<SVGRectElement>('rect[x="360"]'),result=q<SVGTextElement>('text[y="241"]');let shares=[180/425,90/425,155/425],weight=.5;
    const paint=()=>{fans.forEach((n,i)=>{attr(n,{width:shares[i]*300});handles[i].place(360+shares[i]*300,156+i*76,shares[i]*100);});const judge=[110/445,190/445,145/445],combined=shares.map((s,i)=>weight*s+(1-weight)*judge[i]),lowest=combined.indexOf(Math.min(...combined));result.textContent=text(`Lowest: ${"ABC"[lowest]}`,`最低：${"ABC"[lowest]}`);attr(result,{"font-size":20});control(weight*100);report(text(`Illustrative blend · fan weight ${Math.round(weight*100)}% · not CHER`,`示意混合・粉絲權重 ${Math.round(weight*100)}%・並非 CHER`));};
    const update=(i:number,value:number)=>{const next=clamp(value,.05,.8),rest=1-shares[i];shares=shares.map((v,j)=>j===i?next:v/rest*(1-next));paint();};
    const handles=fans.map((_,i)=>drag(text(`Fan share ${"ABC"[i]}`,`粉絲比例 ${"ABC"[i]}`),360+shares[i]*300,156+i*76,p=>update(i,(p.x-360)/300),key=>update(i,shares[i]+keyStep(key,.03))));adjust=value=>{weight=value/100;paint();};action=()=>{[shares[0],shares[1]]=[shares[1],shares[0]];paint();};paint();
  } else if(slug==="vital-lens") {
    const card=q<SVGRectElement>('rect[x="98"]'),label=q<SVGTextElement>('text[x="175"][y="202"]'),review=q<SVGTextElement>('text[y="206"]');const group=add("g",{"data-sample-card":"true"});group.append(card,label);let stage=0,x=175,y=196;
    const paint=()=>{group.setAttribute("transform",`translate(${x} ${y}) scale(.65) translate(-175 -196)`);label.textContent=[text("Sample meal","範例餐點"),text("Reviewed","已檢視"),text("Saved sample","已存範例")][stage];review.style.opacity=stage===1?"0":"1";attr(card,{stroke:stage===2?"var(--art-sage)":"var(--art-red)","stroke-width":3});handle.place(x,y,stage*50);report([text("Draft sample","範例草稿"),text("Sample reviewed; drag into the journal.","範例已檢視；拖入日誌。"),text("Sample saved in the illustrated journal; no personal record created.","範例已放入示意日誌；未建立個人紀錄。")][stage]);};
    const snap=()=>{x=[175,487,760][stage];y=[196,200,210][stage];paint();};
    const update=(p:{x:number;y:number})=>{x=clamp(p.x,140,785);y=clamp(p.y,150,320);if(x>330)stage=Math.max(stage,1);if(x>650)stage=2;paint();};const handle=drag(text("Sample meal card","範例餐點卡片"),x,y,update,key=>{stage=clamp(stage+keyStep(key,1),0,2);snap();},snap);action=()=>{stage=(stage+1)%3;snap();};
  } else if(slug==="particle-obstacle-collision") {
    const circles=all<SVGCircleElement>('circle.bounce');const balls: {node:SVGCircleElement;particle:Particle}[]=circles.map((node,i)=>{freeze(node);node.style.pointerEvents="none";return {node,particle:{x:Number(node.getAttribute("cx")),y:Number(node.getAttribute("cy")),vx:(i%3-1)*28,vy:0,radius:Number(node.getAttribute("r"))}};});
    const obstacle=q<SVGCircleElement>('circle[r="38"]'),cross=q<SVGPathElement>('path[d^="M450"]');let ox=470,oy=205,frame=0,last=0,accumulator=0;
    const draw=()=>{balls.forEach(({node,particle:p})=>attr(node,{cx:p.x,cy:p.y}));};
    const update=(p:{x:number;y:number})=>{ox=clamp(p.x,130,770);oy=clamp(p.y,150,315);attr(obstacle,{cx:ox,cy:oy});attr(cross,{d:`M${ox-20} ${oy}h40m-20-20v40`});handle.place(ox,oy);};
    const handle=drag(text("Particle deflector","粒子偏轉障礙物"),ox,oy,update,key=>update({x:ox+(key==="ArrowLeft"?-12:key==="ArrowRight"?12:0),y:oy+(key==="ArrowUp"?-12:key==="ArrowDown"?12:0)}));
    const spawn=(x:number,y:number)=>{if(balls.length>=60)return;const node=add("circle",{cx:x,cy:y,r:7,fill:"var(--art-red)"});node.style.pointerEvents="none";balls.push({node,particle:{x,y,vx:(balls.length%5-2)*30,vy:-20,radius:7}});report(text(`${balls.length} particles · drag the red obstacle`,`${balls.length} 個粒子・拖曳紅色障礙物`));};
    listen(svg,"click",((e:MouseEvent)=>{if((e.target as Element).closest('.teaser-handle'))return;const p=scenePoint(e as PointerEvent);if(p.x>75&&p.x<825&&p.y>110&&p.y<365){spawn(p.x,p.y);}}) as EventListener);
    action=()=>{for(let i=0;i<5;i++)spawn(180+i*110,120);};
    const tick=(now:number)=>{accumulator+=Math.min((now-last)/1000,.04);last=now;const obstacles=[{x:310,y:250,radius:54},{x:620,y:285,radius:47},{x:ox,y:oy,radius:38}];while(accumulator>=.01){const dt=.01;for(const {particle:p} of balls){p.vy+=420*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;for(const obstacle of obstacles)collide(p,obstacle,.78);if(p.x<75+p.radius||p.x>825-p.radius){p.x=clamp(p.x,75+p.radius,825-p.radius);p.vx*=-.8;}if(p.y>365-p.radius){p.y=365-p.radius;p.vy=-Math.abs(p.vy)*.72;if(Math.abs(p.vy)<35){p.y=115;p.vy=0;}}}accumulator-=dt;}draw();frame=requestAnimationFrame(tick);};
    const sync=()=>{cancelAnimationFrame(frame);if(root.dataset.playing==="true"&&!document.hidden&&!matchMedia('(prefers-reduced-motion: reduce)').matches){last=performance.now();accumulator=0;frame=requestAnimationFrame(tick);}};
    const observer=new MutationObserver(sync);observer.observe(root,{attributes:true,attributeFilter:['data-playing']});disposers.push(()=>{observer.disconnect();cancelAnimationFrame(frame);});sync();
  }
  body.append(overlay);
  return {action,adjust,dispose:()=>{active=null;disposers.forEach(dispose=>dispose());overlay.remove();}};
}
