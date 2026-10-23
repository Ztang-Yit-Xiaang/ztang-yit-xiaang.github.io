"use client";

import { t, type Locale } from "@/lib/i18n";


import { useEffect, useId, useRef, useState } from "react";
import styles from "./field-atlas.module.css";

type Point = { x: number; y: number };
type Simulation = {
  points: Point[];
  running: boolean;
  complete: boolean;
  message: string;
};

const levels = [0.12, 0.3, 0.62, 1.1, 1.8, 2.8, 4.2, 6, 8.3, 11.2, 14.7];
const eigenvalues = [(5 + Math.sqrt(13)) / 2, (5 - Math.sqrt(13)) / 2];
const angle = Math.atan2(2, 3) / 2;
const project = ({ x, y }: Point) => ({ x: 260 + 72 * x, y: 195 - 54 * y });
const objective = ({ x, y }: Point) => (4 * x * x + 2 * x * y + y * y) / 2;

function contour(level: number) {
  const a = Math.sqrt(2 * level / eigenvalues[0]);
  const b = Math.sqrt(2 * level / eigenvalues[1]);
  return Array.from({ length: 73 }, (_, i) => {
    const t = i * Math.PI / 36;
    const p = project({
      x: a * Math.cos(t) * Math.cos(angle) - b * Math.sin(t) * Math.sin(angle),
      y: a * Math.cos(t) * Math.sin(angle) + b * Math.sin(t) * Math.cos(angle),
    });
    return `${p.x},${p.y}`;
  }).join(" ");
}

function advance(state: Simulation, alpha: number): Simulation {
  if (state.complete) return state;
  const current = state.points[state.points.length - 1];
  const next = {
    x: current.x - alpha * (4 * current.x + current.y),
    y: current.y - alpha * (current.x + current.y),
  };
  const points = [...state.points, next];
  const outside = Math.abs(next.x) > 3 || Math.abs(next.y) > 3;
  const converged = Math.hypot(4 * next.x + next.y, next.x + next.y) < 0.0001;
  const complete = outside || converged || points.length > 40;
  const message = outside
    ? "Stopped: the path left the displayed domain. Try a smaller step size."
    : converged
      ? "The gradient is near zero on this illustrative quadratic."
      : points.length > 40
        ? "Completed 40 steps. Reset or change the settings to explore another path."
        : `Step ${points.length - 1}. Objective ${objective(next).toPrecision(5)}.`;
  return { points, complete, running: state.running && !complete, message };
}

function startingPoint(x: string, y: string): Point | null {
  if (!x.trim() || !y.trim()) return null;
  const point = { x: Number(x), y: Number(y) };
  return Number.isFinite(point.x) && Number.isFinite(point.y) &&
    Math.abs(point.x) <= 3 && Math.abs(point.y) <= 3 ? point : null;
}

export function OptimizationLandscape({locale="en"}:{locale?:Locale}) {
  const id = useId();
  const container = useRef<HTMLElement>(null);
  const [startX, setStartX] = useState("2");
  const [startY, setStartY] = useState("1");
  const [stepSize, setStepSize] = useState(0.15);
  const [simulation, setSimulation] = useState<Simulation>({
    points: [{ x: 2, y: 1 }],
    running: false,
    complete: false,
    message: "Ready. Change the starting point or take a step.",
  });
  const start = startingPoint(startX, startY);
  const current = simulation.points[simulation.points.length - 1];
  const initial = project(simulation.points[0]);

  function reset(point = start) {
    if (!point) return;
    setSimulation({
      points: [point], running: false, complete: false,
      message: "Ready. Change the starting point or take a step.",
    });
  }

  function changeStart(axis: "x" | "y", value: string) {
    if (axis === "x") setStartX(value);
    else setStartY(value);
    const point = startingPoint(axis === "x" ? value : startX, axis === "y" ? value : startY);
    if (point) reset(point);
    else setSimulation(state => ({ ...state, running: false }));
  }

  function run() {
    if (!start || simulation.complete) return;
    if (simulation.running) {
      setSimulation(state => ({ ...state, running: false, message: "Paused. Take a step or resume the path." }));
    } else if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setSimulation(state => {
        let next = { ...state, running: false };
        while (!next.complete) next = advance(next, stepSize);
        return next;
      });
    } else {
      setSimulation(state => ({ ...state, running: true }));
    }
  }

  useEffect(() => {
    if (!simulation.running) return;
    const timer = window.setInterval(() => {
      setSimulation(state => state.running ? advance(state, stepSize) : state);
    }, 220);
    const pause = () => setSimulation(state => ({
      ...state, running: false, message: "Paused. Resume when you are ready.",
    }));
    const onVisibility = () => { if (document.hidden) pause(); };
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotionChange = () => { if (motion.matches) pause(); };
    const observer = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) pause();
    });
    if (container.current) observer.observe(container.current);
    document.addEventListener("visibilitychange", onVisibility);
    motion.addEventListener("change", onMotionChange);
    return () => {
      clearInterval(timer);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      motion.removeEventListener("change", onMotionChange);
    };
  }, [simulation.running, stepSize]);

  return (
    <section className={styles.landscape} ref={container} aria-labelledby={`${id}-title`}>
      <div className={styles.figureLabel}>
        <span>{t(locale,"Fig. 01 / A small experiment")}</span><span>{t(locale,"Optimization")}</span>
      </div>
      <svg viewBox="0 0 520 390" role="img" aria-labelledby={`${id}-svg-title ${id}-description`}>
        <title id={`${id}-svg-title`}>{t(locale,"A path across a quadratic objective")}</title>
        <desc id={`${id}-description`}>{t(locale,"Contours show equal objective values on the domain minus three to three in both coordinates. A cinnabar line connects gradient-descent steps to the minimum at zero, zero. Use the labeled controls below to explore.")}</desc>
        <defs><clipPath id={`${id}-clip`}><rect x="44" y="33" width="432" height="324" /></clipPath></defs>
        <g clipPath={`url(#${id}-clip)`} aria-hidden="true">
          {levels.map(level => <polyline key={level} points={contour(level)} className={styles.contour} />)}
          <path d="M44 195H476M260 33V357" className={styles.axes} />
          <polyline points={simulation.points.map(point => {
            const p = project(point);
            return `${p.x},${p.y}`;
          }).join(" ")} className={styles.trajectory} />
          {simulation.points.slice(1).map((point, i) => {
            const p = project(point);
            return <circle key={i} cx={p.x} cy={p.y} r="2.5" className={styles.stepDot} />;
          })}
          <circle cx={initial.x} cy={initial.y} r="5" className={styles.initialDot} />
          <path d="M256 191L264 199M256 199L264 191" className={styles.minimum} />
        </g>
        <g className={styles.plotLabels} aria-hidden="true">
          <text x="482" y="190">{t(locale,"x")}</text><text x="269" y="30">{t(locale,"y")}</text>
          <text x="44" y="375">−3</text><text x="470" y="375">3</text>
          <text x="25" y="38">3</text><text x="19" y="357">−3</text>
          <text x="270" y="214">{t(locale,"minimum")}</text>
        </g>
      </svg>
      <div className={styles.figureTitle}>
        <h2 id={`${id}-title`}>{t(locale,"Finding a direction.")}</h2>
        <span className={styles.equation} aria-label={t(locale,"f of x y equals one half of four x squared plus two x y plus y squared")}>{t(locale,"f(x, y) = ½(4x² + 2xy + y²)")}</span>
      </div>
      <div className={styles.startControls}>
        <span>{t(locale,"Start at")}</span>
        <label htmlFor={`${id}-x`}>{t(locale,"x")}<input id={`${id}-x`} type="number" min="-3" max="3" step="0.1" value={startX} onChange={e => changeStart("x", e.target.value)} aria-invalid={!start} aria-describedby={!start ? `${id}-error` : undefined} /></label>
        <label htmlFor={`${id}-y`}>{t(locale,"y")}<input id={`${id}-y`} type="number" min="-3" max="3" step="0.1" value={startY} onChange={e => changeStart("y", e.target.value)} aria-invalid={!start} aria-describedby={!start ? `${id}-error` : undefined} /></label>
      </div>
      <div className={styles.runControls}>
        <label className={styles.stepSize} htmlFor={`${id}-alpha`}>{t(locale,"Step size")}<output aria-live="off">{stepSize.toFixed(2)}</output>
          <input id={`${id}-alpha`} type="range" min="0.05" max="0.55" step="0.05" value={stepSize} onChange={e => { setStepSize(Number(e.target.value)); reset(); }} />
        </label>
        <div className={styles.runButtons}>
          <button type="button" disabled={!start || simulation.complete || simulation.running} onClick={() => setSimulation(state => advance(state, stepSize))}>{t(locale,"Step")}</button>
          <button type="button" className={styles.runButton} disabled={!start || simulation.complete} onClick={run}>{t(locale,simulation.running ? "Pause" : "Run")}</button>
          <button type="button" disabled={!start} onClick={() => reset()}>{t(locale,"Reset")}</button>
        </div>
      </div>
      {!start && <p id={`${id}-error`} className={styles.validation} role="alert">{t(locale,"Enter starting coordinates between −3 and 3.")}</p>}
      <div className={styles.readout}>
        <span>{t(locale,"Iteration")}<output aria-label={t(locale,"Iteration")} aria-live="off">{simulation.points.length - 1}</output></span>
        <span>{t(locale,"f(x, y)")}<output aria-label={t(locale,"Objective value")} aria-live="off">{objective(current).toPrecision(5)}</output></span>
      </div>
      <p className={styles.simulationStatus} role="status">{t(locale,simulation.running ? "Running. Use Pause to inspect the current path." : simulation.message)}</p>
      <p className={styles.figureNote}>{t(locale,"Illustrative gradient descent, not the PyGRANSO solver or a research benchmark. With reduced motion, Run shows the completed path without animation.")}</p>
    </section>
  );
}
