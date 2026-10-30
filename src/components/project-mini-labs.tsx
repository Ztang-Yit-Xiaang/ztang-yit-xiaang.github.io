"use client";

import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { FacialEvidenceLab, MagneticEvidenceLab } from "@/components/project-evidence-labs";
import { descentTrajectory, lookupDictionary, prepareDictionary, psdWitness, quadratic, quadraticGradient, rateWitness, type DictionaryCandidate, type DictionaryData, type Point } from "@/lib/mini-lab-models";

export function hasMiniLab(slug: string) {
  return ["wenzhounese-input-method", "mathproof-skill", "osqp-method-in-torch", "facial-expression-recognition", "magnetic-pose-estimation"].includes(slug);
}
export function ProjectMiniLab({ slug, zh }: { slug: string; zh: boolean }) {
  if (slug === "wenzhounese-input-method") return <DictionaryLab zh={zh} />;
  if (slug === "mathproof-skill") return <ProofLab zh={zh} />;
  if (slug === "facial-expression-recognition") return <FacialEvidenceLab zh={zh} />;
  if (slug === "magnetic-pose-estimation") return <MagneticEvidenceLab zh={zh} />;
  return <DescentLab zh={zh} />;
}
const number = (value: number) => Math.abs(value) >= 10000 || (Math.abs(value) > 0 && Math.abs(value) < .001) ? value.toExponential(2) : value.toFixed(3);

function DictionaryLab({ zh }: { zh: boolean }) {
  const [data, setData] = useState<{ source: DictionaryData; index: DictionaryCandidate[] } | null>(null);
  const [query, setQuery] = useState("ssang");
  const [page, setPage] = useState(0);
  const [phrase, setPhrase] = useState("");
  const [selected, setSelected] = useState<DictionaryCandidate | null>(null);
  const [failed, setFailed] = useState(false);
  const inputId = useId(), outputId = useId();
  useEffect(() => {
    const controller = new AbortController();
    fetch("/data/ruianese/dictionary.json", { signal: controller.signal }).then(response => {
      if (!response.ok) throw new Error("dictionary unavailable");
      return response.json() as Promise<DictionaryData>;
    }).then(source => setData({ source, index: prepareDictionary(source.entries) })).catch(() => { if (!controller.signal.aborted) setFailed(true); });
    return () => controller.abort();
  }, []);
  const candidates = useMemo(() => data ? lookupDictionary(data.index, query) : [], [data, query]);
  const change = (value: string) => { setQuery(value); setPage(0); };
  const pick = (entry: DictionaryCandidate) => { setSelected(entry); setPhrase(previous => previous + entry.word); };
  const shown = candidates.slice(page * 6, page * 6 + 6);
  return <div className="mini-lab dictionary-lab" data-lab="dictionary">
    <noscript><p className="mini-help">{zh ? "啟用 JavaScript 以查字，或開啟原始字典專案。" : "Enable JavaScript for lookup, or open the original dictionary project."} <a href="https://ztang-yit-xiaang.github.io/Ruianese_Typing_Method/">{zh ? "開啟專案 ↗" : "Open project ↗"}</a></p></noscript>
    <header className="mini-lab-header"><h3>{zh ? "瑞安話字典・試打" : "Ruianese dictionary · try typing"}</h3><span className="mini-live-mark" aria-hidden="true" /></header>
    <label className="mini-label" htmlFor={inputId}>{zh ? "輸入讀音或漢字" : "Reading or Chinese characters"}</label>
    <input id={inputId} className="dictionary-query" disabled={!data} aria-label={zh ? "搜尋瑞安話字典" : "Search Ruianese dictionary"} value={query} onChange={event => change(event.target.value)} onKeyDown={event => { if (event.key === "Enter" && !event.nativeEvent.isComposing && shown[0]) { event.preventDefault(); pick(shown[0]); } }} maxLength={64} autoComplete="off" autoCapitalize="off" spellCheck={false} placeholder="ssang · so · va · 人" />
    <div className="dictionary-examples mini-lab-controls">{["ssang", "so", "va", "ng6", "人"].map(example => <button key={example} type="button" onClick={() => change(example)}>{example}</button>)}</div>
    <p className="mini-help">{zh ? "聲調可省略；加 1–8 可篩選聲調。也可用漢字反查讀音。" : "Tones are optional; add 1–8 to filter. Search a character to see its readings."}</p>
    <p className="dictionary-count" aria-live="polite">{data ? `${data.source.entries.length.toLocaleString()} ${zh ? "條原始字詞" : "source entries"} · ${candidates.length} ${zh ? "項符合" : "matches"}` : failed ? (zh ? "字典暫時無法載入；可開啟完整專案。" : "Dictionary unavailable; open the full project below.") : (zh ? "載入原始字典中…" : "Loading the source dictionaries…")}</p>
    <div className="dictionary-candidates mini-lab-controls" aria-label={zh ? "字典候選" : "Dictionary candidates"}>{shown.map(entry => <button type="button" key={entry.word + entry.code} className="dictionary-candidate" onClick={() => pick(entry)} aria-label={`${zh ? "選擇" : "Choose"} ${entry.word}, ${entry.code}`}><strong>{entry.word}</strong><span>{entry.code.replace(/[1-8]/g, digit => "⁰¹²³⁴⁵⁶⁷⁸"[Number(digit)])}</span></button>)}{data && !shown.length && <p className="mini-help">{query.trim() ? (zh ? "沒有符合項目；試試 so、ssang 或漢字。" : "No matches. Try so, ssang, or a Chinese character.") : (zh ? "輸入讀音開始查詢。" : "Enter a reading to start.")}</p>}</div>
    {candidates.length > 6 && <nav className="dictionary-pages mini-lab-controls" aria-label={zh ? "候選分頁" : "Candidate pages"}><button type="button" disabled={page === 0} onClick={() => setPage(value => value - 1)} aria-label={zh ? "上一頁候選" : "Previous candidates"}>←</button><span>{page + 1} / {Math.ceil(candidates.length / 6)}</span><button type="button" disabled={(page + 1) * 6 >= candidates.length} onClick={() => setPage(value => value + 1)} aria-label={zh ? "下一頁候選" : "Next candidates"}>→</button></nav>}
    <label className="mini-label" htmlFor={outputId}>{zh ? "組合文字" : "Your phrase"}</label><textarea id={outputId} disabled={!data} aria-label={zh ? "組合文字" : "Your phrase"} value={phrase} onChange={event => setPhrase(event.target.value)} placeholder={zh ? "點候選字，組合自己的句子…" : "Choose candidates to build your own phrase…"} rows={2} />
    <div className="mini-lab-controls dictionary-footer"><button type="button" onClick={() => { setPhrase(""); setSelected(null); }}>{zh ? "清空文字" : "Clear phrase"}</button><a href="https://ztang-yit-xiaang.github.io/Ruianese_Typing_Method/" target="_blank" rel="noreferrer">{zh ? "完整鍵盤 ↗" : "Full keyboard ↗"}</a></div>
    {selected && data && <output className="mini-help dictionary-source" aria-live="polite">{selected.word} · {selected.code} · {data.source.sources[selected.source].label}{selected.source === 1 && <span>{zh ? "（溫州詞彙補充，瑞安用法或有不同）" : " (regional wordlist; Rui'an usage can differ)"}</span>}</output>}
  </div>;
}

function DescentLab({ zh }: { zh: boolean }) {
  const host = useRef<HTMLDivElement>(null);
  const dragging = useRef(false), current = useRef(0);
  const [seed, setSeed] = useState<Point>([-2.2, 1.6]);
  const [alpha, setAlpha] = useState(.8);
  const [index, setIndex] = useState(0);
  const trajectory = useMemo(() => descentTrajectory(seed, alpha), [seed, alpha]);
  const clipId = useId().replace(/:/g, "");
  const restart = (point: Point) => { current.current = 0; setIndex(0); setSeed(point); };
  const changeRate = (value: number) => { current.current = 0; setIndex(0); setAlpha(value); };
  useEffect(() => {
    const root = host.current?.closest<HTMLElement>(".project-teaser");
    let timer: ReturnType<typeof setInterval> | undefined;
    const stop = () => { clearInterval(timer); timer = undefined; };
    const sync = () => {
      stop();
      if (root?.dataset.playing !== "true" || current.current >= trajectory.path.length - 1) return;
      timer = setInterval(() => {
        if (dragging.current) return;
        current.current = Math.min(current.current + 1, trajectory.path.length - 1);
        setIndex(current.current);
        if (current.current === trajectory.path.length - 1) stop();
      }, 240);
    };
    const observer = new MutationObserver(sync);
    if (root) observer.observe(root, { attributes: true, attributeFilter: ["data-playing"] });
    sync();
    return () => { stop(); observer.disconnect(); };
  }, [trajectory]);
  const locate = (event: PointerEvent<SVGSVGElement>) => {
    const matrix = event.currentTarget.getScreenCTM();
    if (!matrix) return;
    const point = new DOMPoint(event.clientX, event.clientY).matrixTransform(matrix.inverse());
    restart([Math.max(-3.5, Math.min(3.5, (point.x - 260) / 60)), Math.max(-2.3, Math.min(2.3, (180 - point.y) / 60))]);
  };
  const keyboard = (event: KeyboardEvent<SVGGElement>) => {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) return;
    event.preventDefault();
    restart([Math.max(-3.5, Math.min(3.5, seed[0] + (event.key === "ArrowLeft" ? -.2 : event.key === "ArrowRight" ? .2 : 0))), Math.max(-2.3, Math.min(2.3, seed[1] + (event.key === "ArrowDown" ? -.2 : event.key === "ArrowUp" ? .2 : 0)))]);
  };
  const point = trajectory.path[Math.min(index, trajectory.path.length - 1)];
  const position = (p: Point) => `${260 + p[0] * 60} ${180 - p[1] * 60}`;
  const done = index === trajectory.path.length - 1;
  return <div ref={host} className="mini-lab descent-lab" data-lab="descent" data-iteration={index} data-start-x={seed[0]} data-start-y={seed[1]}>
    <header className="mini-lab-header"><h3>{zh ? "從你選的位置，開始下降" : "Choose where descent begins"}</h3><span className="mini-live-mark" aria-hidden="true" /></header>
    <div className="descent-layout"><svg viewBox="0 0 520 360" role="group" aria-label={zh ? "梯度下降等高線圖" : "Gradient descent contour plot"} onPointerDown={event => { if (event.button !== 0) return; event.preventDefault(); dragging.current = true; event.currentTarget.setPointerCapture(event.pointerId); locate(event); }} onPointerMove={event => { if (dragging.current) locate(event); }} onPointerUp={() => { dragging.current = false; }} onPointerCancel={() => { dragging.current = false; }}>
      <defs><clipPath id={clipId}><rect x="25" y="25" width="470" height="310" rx="5" /></clipPath></defs>
      <rect x="25" y="25" width="470" height="310" rx="5" fill="var(--wash)" />
      <path d="M50 180H470M260 45V315" stroke="var(--line)" strokeWidth="1" />
      <g clipPath={`url(#${clipId})`}>{[.5, 1, 1.5, 2, 2.5, 3.2].map(radius => <ellipse key={radius} cx="260" cy="180" rx={radius * 60} ry={radius * 30} transform="rotate(20 260 180)" fill="none" stroke="var(--line)" strokeWidth="1.5" />)}<path data-descent-path="true" d={trajectory.path.slice(0, index + 1).map((p, i) => `${i ? "L" : "M"}${position(p)}`).join("")} fill="none" stroke="var(--red)" strokeWidth="2.5" /><circle cx="260" cy="180" r="4" fill="var(--sage)" /><g data-descent-point="true" className="descent-point" style={{ transform: `translate(${260 + point[0] * 60}px,${180 - point[1] * 60}px)` }}><circle r="7" fill="var(--red)" stroke="var(--paper)" strokeWidth="2" /></g></g>
      <g transform={`translate(${position(seed)})`} tabIndex={0} role="slider" aria-label={zh ? "下降起點" : "Descent starting point"} aria-valuemin={-3.5} aria-valuemax={3.5} aria-valuenow={seed[0]} aria-valuetext={`x ${seed[0].toFixed(2)}, y ${seed[1].toFixed(2)}`} onKeyDown={keyboard} className="descent-seed"><circle r="20" fill="transparent" /><circle r="12" fill="none" stroke="var(--red)" strokeWidth="2" strokeDasharray="3 3" /><path d="M-5 0H5M0-5V5" stroke="var(--red)" /></g>
      <text x="40" y="350" fontSize="12" fill="var(--muted)">{zh ? "點選任何位置設定 x₀" : "Click anywhere to set x₀"}</text>
    </svg><dl className="descent-metrics"><div><dt>{zh ? "起點 x₀" : "Start x₀"}</dt><dd data-descent-origin="true">({seed[0].toFixed(2)}, {seed[1].toFixed(2)})</dd></div><div><dt>{zh ? "步數 k" : "Iteration k"}</dt><dd>{index}</dd></div><div><dt>f(xₖ)</dt><dd data-descent-value="true">{number(quadratic(point))}</dd></div><div><dt>‖∇f(xₖ)‖</dt><dd>{number(Math.hypot(...quadraticGradient(point)))}</dd></div></dl></div>
    <div className="mini-lab-controls"><label className="mini-range">{zh ? "步長 α / L" : "Step size α / L"}<input type="range" aria-label={zh ? "下降步長" : "Descent step size"} min="0.1" max="2.3" step="0.1" value={alpha} onChange={event => changeRate(Number(event.target.value))} /><span>α = {alpha.toFixed(1)} · η = {(alpha / 4).toFixed(3)}</span></label><button type="button" onClick={() => restart([...seed])}>{zh ? "從此起點重跑" : "Restart from this start"}</button><button type="button" disabled={done} onClick={() => { current.current = Math.min(current.current + 1, trajectory.path.length - 1); setIndex(current.current); }}>{zh ? "走一步" : "Step once"}</button></div>
    <output className="mini-help" aria-live="polite">{done ? trajectory.reason === "converged" ? (zh ? "已到達最小值附近；選另一個起點再試。" : "Settled near the minimum. Pick another start to run again.") : trajectory.reason === "outside" ? (zh ? "迭代已離開視野；降低步長再試。" : "The trajectory left the view. Reduce the step size and try again.") : (zh ? "已達 200 步上限。" : "Reached the 200-step limit.") : alpha >= 2 ? (zh ? "此步長可能使迭代震盪或發散。" : "This step size can cause oscillation or divergence.") : (zh ? "xₖ₊₁ = xₖ − η∇f(xₖ) · Hessian 特徵值為 1、4。" : "xₖ₊₁ = xₖ − η∇f(xₖ) · Hessian eigenvalues: 1 and 4.")}</output>
  </div>;
}

function ProofLab({ zh }: { zh: boolean }) {
  const [example, setExample] = useState("rate");
  const [alpha, setAlpha] = useState(1), [k, setK] = useState(10);
  const [mu, setMu] = useState(-1), [theta, setTheta] = useState(Math.PI / 2);
  const [selectedStep, setSelectedStep] = useState(1);
  const dragging = useRef(false);
  const isRate = example === "rate";
  const witness = rateWitness(alpha, k), direction = psdWitness(mu, theta);
  const covered = isRate ? witness.covered : direction.psd;
  const firstBad = covered ? -1 : isRate ? 1 : 2;
  const text = (en: string, cn: string) => zh ? cn : en;
  const steps = isRate ? [
    { title: text("Convex + L-smooth", "凸且 L-光滑"), detail: text("The Hessian diag(1, 4) is PSD; its largest eigenvalue gives L = 4.", "Hessian 為 diag(1, 4)，為半正定矩陣；最大特徵值給出 L = 4。") },
    { title: "η = 1 / L", detail: text("The worked proof substitutes exactly 1/L in its sufficient-decrease and one-step lemmas. Changing η requires a corresponding proof change.", "原證明在充分下降與單步進展引理中，代入的步長恰為 1/L。改動 η，必須相應修改證明。") },
    { title: text("One-step → telescoping", "單步進展 → 望遠鏡求和"), detail: text("Combine convexity and sufficient decrease: f(xₖ₊₁) − f* ≤ (L/2)(‖xₖ − x*‖² − ‖xₖ₊₁ − x*‖²). The squared distances telescope.", "結合凸性與充分下降：f(xₖ₊₁) − f* ≤ (L/2)(‖xₖ − x*‖² − ‖xₖ₊₁ − x*‖²)，平方距離可望遠鏡消去。") },
    { title: text("Last-iterate O(1/k)", "最後迭代的 O(1/k) 界"), detail: text("Monotonicity converts the summed bound into a last-iterate bound. Here x* = 0 and ‖x₀‖² = 5, so the bound is 10/k, for k ≥ 1.", "利用單調性，將求和界轉為最後迭代的界。此處 x* = 0、‖x₀‖² = 5，故 k ≥ 1 時，界為 10/k。") },
  ] : [
    { title: text("A is symmetric", "A 為對稱矩陣"), detail: text("A = diag(1, μ) is real and symmetric for every value of μ in this experiment.", "此實驗中，任意 μ 所對應的 A = diag(1, μ) 都是實對稱矩陣。") },
    { title: text("Eigenvalues are real", "特徵值為實數"), detail: text("Symmetry guarantees real eigenvalues and an orthonormal eigenbasis. Here the eigenvalues are 1 and μ.", "對稱性保證實特徵值與正交特徵向量基底；此處特徵值為 1 與 μ。") },
    { title: text("All eigenvalues ≥ 0?", "所有特徵值皆 ≥ 0？"), detail: text("This is the missing implication: real does not mean nonnegative. If μ < 0, e₂ = (0, 1) gives xᵀAx = μ < 0.", "這是缺失的一步：實數不代表非負。若 μ < 0，取 e₂ = (0, 1)，即得 xᵀAx = μ < 0。") },
    { title: text("Therefore f is convex?", "因此 f 為凸函數？"), detail: text("For f(x) = ½xᵀAx, the Hessian is A. The exact repair is A ≽ 0. One positive test direction cannot establish this condition for every x.", "對 f(x) = ½xᵀAx，Hessian 正是 A。精確的修補條件是 A ≽ 0；單一正值方向無法證明所有 x 均滿足條件。") },
  ];
  const plot = Array.from({ length: k }, (_, i) => rateWitness(alpha, i + 1));
  const scale = Math.max(1, ...plot.flatMap(value => [value.gap, value.bound]));
  const line = (key: "gap" | "bound") => plot.map((value, i) => `${i ? "L" : "M"}${35 + i / Math.max(1, k - 1) * 370} ${135 - value[key] / scale * 115}`).join("");
  const selectDirection = (event: PointerEvent<SVGSVGElement>) => {
    const matrix = event.currentTarget.getScreenCTM();
    if (!matrix) return;
    const p = new DOMPoint(event.clientX, event.clientY).matrixTransform(matrix.inverse());
    setTheta(Math.atan2(100 - p.y, p.x - 100));
  };
  return <div className="mini-lab proof-lab" data-lab="proof" data-first-unsupported={firstBad < 0 ? "none" : firstBad + 1}>
    <header className="mini-lab-header"><h3>{text("Follow the proof. Test its assumptions.", "跟著證明走，檢驗它的假設。")}</h3><span className="mini-live-mark" aria-hidden="true" /></header>
    <label className="mini-select mini-lab-controls">{text("Worked audit", "證明審查示例")}<select aria-label={text("Proof example", "證明示例")} value={example} onChange={event => { setExample(event.target.value); setSelectedStep(event.target.value === "rate" ? 1 : 2); }}><option value="rate">{text("Gradient descent · O(1/k)", "梯度下降・O(1/k)")}</option><option value="psd">{text("Symmetry → convexity?", "對稱性 → 凸性？")}</option></select></label>
    {isRate ? <>
      <p className="proof-equation">f(x) = ½(x₁² + 4x₂²), L = 4, x₀ = (2, 1)</p>
      <div className="mini-lab-controls proof-tuning"><label className="mini-range">{text("Step size α / L", "步長 α / L")}<input type="range" aria-label={text("Proof step size", "證明步長")} min="0.25" max="2.25" step="0.05" value={alpha} onChange={event => { setAlpha(Number(event.target.value)); setSelectedStep(1); }} /><span>α = {alpha.toFixed(2)}</span></label><label className="mini-range">{text("Iteration k", "迭代次數 k")}<input type="range" aria-label={text("Proof iteration", "證明迭代次數")} min="1" max="25" step="1" value={k} onChange={event => setK(Number(event.target.value))} /><span>{k}</span></label></div>
      <div className="proof-values"><div><span>f(xₖ) − f*</span><strong data-proof-gap="true">{number(witness.gap)}</strong></div><div><span>{text("Claimed bound · 10/k", "聲稱的上界・10/k")}</span><strong data-proof-bound="true">{number(witness.bound)}</strong></div></div>
      <svg className="rate-plot" viewBox="0 0 440 160" role="img" aria-label={text("Computed objective gap and the claimed convergence bound", "計算所得的目標差距與聲稱的收斂上界")}><path d="M30 15V140H415" stroke="var(--line)" fill="none" /><path d={line("gap")} stroke="var(--red)" strokeWidth="2.5" fill="none" /><path d={line("bound")} stroke="var(--sage)" strokeWidth="2.5" strokeDasharray="5 5" className="mini-lab-flow" fill="none" /><text x="35" y="157" fontSize="11" fill="var(--muted)">k = 1</text><text x="385" y="157" fontSize="11" fill="var(--muted)">{k}</text></svg>
      <p className="mini-help proof-legend"><span>{text("Red: computed gap", "紅線：計算差距")}</span><span>{text("Green: 10/k bound", "綠線：10/k 上界")}</span></p>
    </> : <>
      <div className="psd-layout"><div><p className="proof-equation">A = diag(1, μ)<br />f(x) = ½xᵀAx<br />‖x‖ = 1</p><label className="mini-range mini-lab-controls">{text("Second eigenvalue μ", "第二個特徵值 μ")}<input type="range" aria-label={text("Matrix eigenvalue", "矩陣特徵值")} min="-2" max="2" step="0.1" value={mu} onChange={event => { setMu(Number(event.target.value)); setSelectedStep(2); }} /><span>μ = {mu.toFixed(1)}</span></label></div>
      <svg viewBox="0 0 200 200" role="group" aria-label={text("Test a unit-vector direction", "測試單位向量方向")} onPointerDown={event => { if (event.button !== 0) return; event.preventDefault(); dragging.current = true; event.currentTarget.setPointerCapture(event.pointerId); selectDirection(event); }} onPointerMove={event => { if (dragging.current) selectDirection(event); }} onPointerUp={() => { dragging.current = false; }} onPointerCancel={() => { dragging.current = false; }}><path d="M15 100H185M100 15V185" stroke="var(--line)" /><circle cx="100" cy="100" r="70" fill="none" stroke="var(--sage)" strokeDasharray="4 6" className="mini-lab-flow" /><path d={`M100 100L${100 + direction.x * 70} ${100 - direction.y * 70}`} stroke="var(--red)" strokeWidth="2" /><g transform={`translate(${100 + direction.x * 70} ${100 - direction.y * 70})`} tabIndex={0} role="slider" aria-label={text("Witness direction", "反例方向")} aria-valuemin={-180} aria-valuemax={180} aria-valuenow={theta / Math.PI * 180} aria-valuetext={`${(theta / Math.PI * 180).toFixed(0)}°`} onKeyDown={event => { if (event.key.startsWith("Arrow")) { event.preventDefault(); const next = theta + (event.key === "ArrowLeft" || event.key === "ArrowDown" ? -1 : 1) * Math.PI / 18; setTheta(Math.atan2(Math.sin(next), Math.cos(next))); } }} className="proof-direction"><circle r="20" fill="transparent" /><circle r="9" fill="var(--paper)" stroke="var(--red)" strokeWidth="2" /></g></svg></div>
      <output className="proof-witness" data-proof-quadratic="true">x = ({direction.x.toFixed(2)}, {direction.y.toFixed(2)}) · xᵀAx = {number(direction.value)}</output>
    </>}
    <ol className="proof-steps mini-lab-controls">{steps.map((step, index) => <li key={step.title} data-status={firstBad < 0 || index < firstBad ? "supported" : index === firstBad ? "unsupported" : "blocked"}><button type="button" aria-pressed={selectedStep === index} onClick={() => setSelectedStep(index)}><span>{index + 1}</span><span>{step.title}</span><span aria-hidden="true">{firstBad < 0 || index < firstBad ? "✓" : index === firstBad ? "?" : "·"}</span></button></li>)}</ol>
    <p className="proof-explanation">{steps[selectedStep].detail}</p>
    <output className="proof-verdict" aria-live="polite" data-verdict={covered ? "covered" : "unsupported"}>{isRate ? witness.covered ? text("The assumptions match this proof. The computed sample is below the bound.", "假設符合此證明；此數值示例低於上界。") : witness.gap > witness.bound ? text("Counterexample to the claimed bound after changing the step size. The original theorem is unchanged.", "改動步長後，此數值示例反駁聲稱的上界；原定理並未被反駁。") : text("This sample stays below the bound, but η ≠ 1/L: the displayed proof does not justify this changed setting.", "此示例雖低於上界，但 η ≠ 1/L；目前證明無法支持改動後的設定。") : direction.psd ? text("This matrix satisfies the added PSD assumption. Symmetry alone is still insufficient.", "此矩陣符合新增的半正定假設；僅有對稱性仍不足。") : direction.value < -1e-8 ? text("Negative quadratic form found. The missing PSD assumption breaks the convexity conclusion.", "已找到負的二次型；缺少半正定假設，凸性結論不成立。") : text("This direction is nonnegative; it does not prove PSD. Try the negative eigenvector.", "此方向非負，仍無法證明半正定；試試負特徵值對應的向量。")}</output>
    <div className="mini-lab-controls proof-actions"><button type="button" onClick={() => { if (isRate) { setAlpha(2.25); setK(10); setSelectedStep(1); } else { setMu(-1); setTheta(Math.PI / 2); setSelectedStep(2); } }}>{text("Find a counterexample", "找一個反例")}</button><button type="button" onClick={() => { if (isRate) setAlpha(1); else setMu(1); }}>{isRate ? text("Repair: η = 1/L", "修補：η = 1/L") : text("Repair: A ≽ 0", "修補：A ≽ 0")}</button></div>
    <a className="mini-source-link" href={`https://github.com/Ztang-Yit-Xiaang/mathproof-skill/blob/bef93cf9aa0b992c2984db1ba4082d0abc789c18/examples/${isRate ? "06-gradient-descent-rate.md" : "02-missing-psd-assumption.md"}`} target="_blank" rel="noreferrer">{text("Read the worked proof ↗", "閱讀原始證明審查 ↗")}</a>
  </div>;
}
