"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import catalog from "@/data/project-teasers.json";
import { miniSpec, mountMiniScene, type MiniScene } from "@/lib/teaser-interactions";
import { hasMiniLab, ProjectMiniLab } from "@/components/project-mini-labs";
import type { Locale } from "@/lib/i18n";

// Small, directly manipulable illustrations; full project interfaces remain on the case-study pages.
export function ProjectTeaser({ slug, locale = "en", compact = false }: { slug: string; locale?: Locale; compact?: boolean }) {
  const entry = catalog.find(item => item.slug === slug);
  const host = useRef<HTMLElement>(null);
  const status = useRef<HTMLOutputElement>(null);
  const control = useRef<HTMLInputElement | HTMLSelectElement | null>(null);
  const scene = useRef<MiniScene | null>(null);
  const [mode, setMode] = useState<"auto" | "paused">("auto");
  const [generation, setGeneration] = useState(0);
  const zh = locale === "zh-Hant";
  const spec = miniSpec(slug, zh);
  const lab = hasMiniLab(slug);
  const artwork = useMemo(() => ({ __html: entry ? (zh ? entry.svgZh : entry.svg) : "" }), [entry, zh]);

  useEffect(() => {
    const root = host.current;
    if (!root || !entry) return;
    root.dataset.ready = "true";
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const world = root.closest(".world");
    let visible = false;
    const sync = () => { root.dataset.playing = String(visible && !document.hidden && !reduced.matches && world?.getAttribute("data-motion") !== "paused" && mode === "auto"); };
    const observer = new IntersectionObserver(([event]) => { visible = event.isIntersecting; sync(); }, { threshold: .05 });
    observer.observe(root);
    const globalMotion = new MutationObserver(sync);
    if (world) globalMotion.observe(world, { attributes: true, attributeFilter: ["data-motion"] });
    document.addEventListener("visibilitychange", sync);
    reduced.addEventListener("change", sync);
    sync();
    return () => {
      observer.disconnect(); globalMotion.disconnect();
      document.removeEventListener("visibilitychange", sync); reduced.removeEventListener("change", sync);
      root.dataset.playing = "false";
    };
  }, [mode, entry]);

  useEffect(() => {
    const root = host.current, svg = root?.querySelector("svg");
    if (!root || !svg || !entry || lab) return;
    if (status.current) status.current.textContent = "";
    const mounted = mountMiniScene(svg, slug, {
      zh,
      report: message => {
        root.dataset.miniResult = message;
        if (status.current && status.current.textContent !== message) status.current.textContent = message;
      },
      control: value => { if (control.current) control.current.value = String(value); },
    });
    scene.current = mounted;
    return () => { mounted.dispose(); scene.current = null; };
  }, [entry, generation, slug, zh, lab]);

  if (!entry) return null;
  return <figure id={`preview-${slug}`} ref={host} className={`project-teaser${compact ? " compact" : ""}`} data-project={slug} data-mode={mode} data-playing="false">
    <div key={generation} className="project-teaser-art">{lab ? <ProjectMiniLab slug={slug} zh={zh} /> : <div dangerouslySetInnerHTML={artwork} />}</div>
    <p className="teaser-play-hint">{spec.hint}</p>
    <div className="project-teaser-controls" aria-label={zh ? "互動預覽控制" : "Interactive preview controls"}>
      <button type="button" className="project-teaser-play" aria-pressed={mode === "auto"} onClick={() => setMode(mode === "auto" ? "paused" : "auto")}>{mode === "auto" ? (zh ? "暫停" : "Pause") : (zh ? "播放" : "Play")}</button>
      <button type="button" onClick={() => { setGeneration(value => value + 1); setMode("auto"); }}>{zh ? "重設" : "Reset"}</button>
      {!lab && spec.action && <button type="button" className="teaser-action" onClick={() => scene.current?.action?.()}>{spec.action}</button>}
      {!lab && <div key={generation} className="teaser-domain-control">
        {spec.control && <label>{spec.control.label}<input ref={node => { control.current = node; }} type="range" aria-label={spec.control.label} min={spec.control.min} max={spec.control.max} step={spec.control.step} defaultValue={spec.control.value} onChange={event => scene.current?.adjust?.(Number(event.target.value))} /></label>}
        {spec.options && <label>{zh ? "編碼方式" : "Encoding"}<select ref={node => { control.current = node; }} aria-label={zh ? "編碼方式" : "Encoding"} defaultValue="1" onChange={event => scene.current?.adjust?.(Number(event.target.value))}>{spec.options.map((label,index) => <option key={label} value={index}>{label}</option>)}</select></label>}
      </div>}
    </div>
    {!lab && <output ref={status} className="teaser-result" aria-live="polite" />}
    <figcaption>{zh ? entry.captionZh : entry.caption}</figcaption>
  </figure>;
}
