"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import { t, type Locale } from "@/lib/i18n";

// One homepage-only controller keeps content server-rendered and reading routes still.
export function MotionPortrait({ children, locale }: { children: ReactNode; locale: Locale }) {
  const portrait = useRef<HTMLElement>(null);
  const replay = useRef<() => void>(() => {});
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const root = portrait.current?.closest<HTMLElement>(".world");
    if (!root) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => { root.dataset.motion = paused || preference.matches || document.hidden ? "paused" : "running"; };
    sync();
    preference.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      preference.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      delete root.dataset.motion;
    };
  }, [paused]);

  useEffect(() => {
    const figure = portrait.current;
    const root = figure?.closest<HTMLElement>(".world");
    const frame = figure?.querySelector<HTMLElement>(".portrait-frame");
    const scene = figure?.querySelector<HTMLElement>(".portrait-parallax");
    if (!figure || !root || !frame || !scene) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const opening = new Set<Animation>();
    const finish = () => { for (const animation of opening) animation.finish(); };
    const playOpening = () => {
      for (const animation of opening) animation.cancel();
      opening.clear();
      if (preference.matches) return;
      const easing = getComputedStyle(root).getPropertyValue("--motion-settle").trim();
      const track = (animation: Animation) => {
        opening.add(animation);
        animation.finished.then(() => opening.delete(animation), () => opening.delete(animation));
      };
      root.querySelectorAll("#person-name > span").forEach((line, index) => {
        track(line.animate([
          { opacity: 0.15, transform: "translateY(40px) rotate(2deg)", clipPath: "inset(0 0 100% 0)" },
          { opacity: 1, transform: "translateY(0) rotate(0)", clipPath: "inset(0 0 0 0)" },
        ], { duration: 1000, delay: index * 140, easing, fill: "backwards" }));
      });
      track(frame.animate([
        { opacity: 0.65, transform: "translateY(32px) rotate(-2deg)", clipPath: "inset(16% 0 16% 0)" },
        { opacity: 1, transform: "translateY(0) rotate(0)", clipPath: "inset(0 0 0 0)" },
      ], { duration: 1100, delay: 180, easing, fill: "backwards" }));
    };
    replay.current = playOpening;
    playOpening();
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) (entry.target as HTMLElement).dataset.motionVisible = String(entry.isIntersecting);
    }, { threshold: 0.08 });
    root.querySelectorAll(".motion-portrait, .project-diagram, .photo-spread").forEach(target => observer.observe(target));
    let pendingFrame = 0;
    let pointerX = 0;
    let pointerY = 0;
    let scrollDepth = 0;
    const renderDepth = () => {
      if (preference.matches || root.dataset.motion !== "running") {
        frame.style.transform = "";
        scene.style.transform = "";
        return;
      }
      frame.style.transform = pointerX || pointerY ? `perspective(900px) rotateX(${-pointerY * 3}deg) rotateY(${pointerX * 4}deg)` : "";
      scene.style.transform = `translate3d(${pointerX * 12}px, ${pointerY * 8 + scrollDepth * 22}px, 0)`;
    };
    const onScroll = () => {
      if (preference.matches || root.dataset.motion !== "running" || figure.dataset.motionVisible === "false") return;
      cancelAnimationFrame(pendingFrame);
      pendingFrame = requestAnimationFrame(() => {
        const bounds = frame.getBoundingClientRect();
        scrollDepth = Math.max(-1, Math.min(1, (window.innerHeight / 2 - bounds.top - bounds.height / 2) / window.innerHeight));
        renderDepth();
      });
    };
    const reset = () => {
      cancelAnimationFrame(pendingFrame);
      pointerX = pointerY = 0;
      renderDepth();
    };
    const move = (event: PointerEvent) => {
      if (!pointer.matches || preference.matches || root.dataset.motion !== "running") return;
      const bounds = frame.getBoundingClientRect();
      const x = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1));
      const y = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1));
      cancelAnimationFrame(pendingFrame);
      pendingFrame = requestAnimationFrame(() => {
        finish();
        pointerX = x;
        pointerY = y;
        renderDepth();
      });
    };
    const onPreference = () => { if (preference.matches) { finish(); reset(); } };
    const onVisibility = () => { if (document.hidden) reset(); };
    window.addEventListener("scroll", onScroll, { passive: true });
    frame.addEventListener("pointermove", move);
    frame.addEventListener("pointerleave", reset);
    root.addEventListener("focusin", finish);
    preference.addEventListener("change", onPreference);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      reset();
      for (const animation of opening) animation.cancel();
      window.removeEventListener("scroll", onScroll);
      scene.style.transform = "";
      frame.removeEventListener("pointermove", move);
      frame.removeEventListener("pointerleave", reset);
      root.removeEventListener("focusin", finish);
      preference.removeEventListener("change", onPreference);
      document.removeEventListener("visibilitychange", onVisibility);
      replay.current = () => {};
    };
  }, []);

  return <figure className="portrait motion-portrait" ref={portrait}>
    <div className="portrait-frame"><div className="portrait-parallax">{children}</div></div>
    <figcaption>
      <span>{t(locale,"A person with questions. And a camera.")}</span>
      <div className="home-motion-controls">
        <button type="button" onClick={() => replay.current()} aria-label={t(locale,"Replay opening")} title={t(locale,"Replay opening")}><RotateCcw size={13} aria-hidden="true" /></button>
        <button type="button" aria-pressed={paused} onClick={() => {
          setPaused(value => !value);
          if (portrait.current) portrait.current.querySelector<HTMLElement>(".portrait-frame")!.style.transform = "";
        }}>{paused ? <Play size={12} aria-hidden="true" /> : <Pause size={12} aria-hidden="true" />}{t(locale,paused ? "Play motion" : "Pause motion")}</button>
      </div>
    </figcaption>
  </figure>;
}
