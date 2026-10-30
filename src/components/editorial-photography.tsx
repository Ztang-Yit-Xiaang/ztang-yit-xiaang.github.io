"use client";

import { getResumeData, t, type Locale } from "@/lib/i18n";


import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { Calendar, ChevronLeft, ChevronRight, Expand, MapPin } from "lucide-react";
import type { PhotographyItem } from "@/data/resume";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";


// Keep the last loaded photograph beneath the incoming image; slow loads never flash black.
function LightboxImage({ photo, animate }: { photo: PhotographyItem; animate: boolean }) {
  const [displayed, setDisplayed] = useState<PhotographyItem | null>(null);
  const current = useRef<HTMLImageElement>(null);
  const fade = useRef<Animation | null>(null);
  const previous = displayed && displayed.image !== photo.image ? displayed : null;

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finish = () => { if (preference.matches) fade.current?.finish(); };
    preference.addEventListener("change", finish);
    return () => {
      preference.removeEventListener("change", finish);
      fade.current?.cancel();
    };
  }, []);

  // Stable keys preserve the loaded image node, even when the browser cache is disabled.
  return (previous ? [previous, photo] : [photo]).map(item => {
    const incoming = item.image === photo.image;
    return <Image key={item.image} ref={incoming ? current : undefined} src={item.image}
      alt={incoming ? item.alt ?? item.title : ""} aria-hidden={incoming ? undefined : true} fill
      sizes="(max-width: 1024px) 100vw, 1024px"
      className={`object-contain ${incoming && previous ? "lightbox-incoming" : ""}`}
      onLoad={event => {
        const image = event.currentTarget;
        if (!incoming || current.current !== image) return;
        fade.current?.cancel();
        if (!previous || !animate || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          setDisplayed(photo);
          return;
        }
        const animation = image.animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: 180, easing: getComputedStyle(image).getPropertyValue("--motion-settle").trim(), fill: "forwards",
        });
        fade.current = animation;
        animation.finished.then(() => {
          if (current.current === image && image.isConnected) setDisplayed(photo);
        }, () => { /* Navigation or a rapid image change cancels the old transition. */ });
      }}
    />;
  });
}

function PhotoCard({
  photo,
  index,
  onOpen,
  locale = "en",
}: {
  photo: PhotographyItem;
  index: number;
  onOpen: (index: number, trigger: HTMLButtonElement) => void;
  locale?: Locale;
}) {
  const alt = photo.alt ?? photo.title;

  return (
    <button
      type="button"
      onClick={(event) => onOpen(index, event.currentTarget)}
      aria-label={t(locale,`Open ${photo.title} in the photography lightbox`)}
      className="photo-gallery-card group relative block w-full overflow-hidden rounded-[1.6rem] bg-zinc-200 text-left shadow-xs outline-hidden ring-offset-2 focus-visible:ring-2 focus-visible:ring-cinnabar dark:bg-slate-900 aspect-[4/5]"
    >
      <Image
        src={photo.thumbnail}
        draggable={false}
        alt={t(locale,alt)}
        fill
        sizes="(max-width: 700px) 80vw, 460px"
        style={{ objectPosition: photo.objectPosition ?? "center" }}
        className="photo-gallery-image object-cover"
      />
      <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 ${photo.overlayLabel ? "to-black/45" : "to-black/10"}`} />

      {photo.overlayLabel && (
        <span className="font-handwritten absolute left-6 top-4 -rotate-3 text-6xl leading-none text-white drop-shadow-lg sm:left-8 sm:top-6 sm:text-7xl lg:text-8xl">
          {photo.overlayLabel}
        </span>
      )}

      <div className="gallery-caption absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white sm:p-7">
        <div className="min-w-0 space-y-1">
          <p className="text-lg font-semibold tracking-tight sm:text-xl">
            {photo.title}
          </p>
          <p className="flex items-center gap-1.5 text-xs text-white/80">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-cinnabar" aria-hidden="true" />
            <span className="truncate">{photo.location}</span>
          </p>
        </div>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/30 bg-black/20 backdrop-blur-xs transition group-hover:bg-white group-hover:text-black">
          <Expand className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>
    </button>
  );
}

function PhotoReel({ children, count, locale }: { children: ReactNode; count: number; locale: Locale }) {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const gesture = useRef({ startX: 0, startScroll: 0, down: false, dragged: false });

  useEffect(() => {
    const element = track.current;
    if (!element) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let pending = 0;
    const update = () => {
      const center = element.scrollLeft + element.clientWidth / 2;
      let nearest = 0;
      let distance = Infinity;
      Array.from(element.children).forEach((child, index) => {
        const card = child as HTMLElement;
        const offset = card.offsetLeft + card.offsetWidth / 2 - center;
        const progress = Math.max(-1.5, Math.min(1.5, offset / (card.offsetWidth + 24)));
        card.style.transform = preference.matches ? "" : `perspective(1000px) rotateY(${-progress * 14}deg) translateY(${Math.abs(progress) * 10}px) scale(${1 - Math.abs(progress) * .08})`;
        if (Math.abs(offset) < distance) { distance = Math.abs(offset); nearest = index; }
      });
      setActive(nearest);
    };
    const schedule = () => { cancelAnimationFrame(pending); pending = requestAnimationFrame(update); };
    const resize = new ResizeObserver(schedule);
    resize.observe(element);
    element.addEventListener("scroll", schedule, { passive: true });
    preference.addEventListener("change", schedule);
    schedule();
    return () => {
      cancelAnimationFrame(pending);
      resize.disconnect();
      element.removeEventListener("scroll", schedule);
      preference.removeEventListener("change", schedule);
    };
  }, [count]);

  function roll(direction: -1 | 1, smooth: boolean) {
    const element = track.current;
    if (!element) return;
    const index = (active + direction + count) % count;
    const card = element.children[index] as HTMLElement;
    const wrapped = Math.abs(index - active) > 1;
    element.scrollTo({ left: card.offsetLeft - (element.clientWidth - card.offsetWidth) / 2,
      behavior: smooth && !wrapped && !window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "smooth" : "instant" });
  }

  return <div className="photo-reel">
    <div className="photo-reel-tools"><p>{t(locale,"Drag or swipe to roll through the photographs.")}</p><div>
      <span aria-live="polite" aria-atomic="true">{active + 1} / {count}</span>
      <button type="button" aria-label={t(locale,"Roll to previous photograph")} onClick={event => roll(-1, event.detail > 0)}><ChevronLeft size={18} aria-hidden="true" /></button>
      <button type="button" aria-label={t(locale,"Roll to next photograph")} onClick={event => roll(1, event.detail > 0)}><ChevronRight size={18} aria-hidden="true" /></button>
    </div></div>
    <div className="photo-reel-track" ref={track} tabIndex={0} role="region" aria-roledescription="carousel" aria-label={t(locale,"Rolling photography gallery")}
      onKeyDown={event => {
        if (event.target !== event.currentTarget || !["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
        event.preventDefault();
        if (event.key === "Home" || event.key === "End") {
          const card = event.currentTarget.children[event.key === "Home" ? 0 : count - 1] as HTMLElement;
          event.currentTarget.scrollTo({left: card.offsetLeft - (event.currentTarget.clientWidth - card.offsetWidth) / 2, behavior: "instant"});
        } else roll(event.key === "ArrowLeft" ? -1 : 1, false);
      }}
      onFocusCapture={event => {
        const card = (event.target as HTMLElement).closest<HTMLElement>(".photo-reel-item");
        if (card && track.current && (event.target as HTMLElement).matches(":focus-visible")) track.current.scrollTo({left: card.offsetLeft - (track.current.clientWidth - card.offsetWidth) / 2, behavior: "instant"});
      }}
      onPointerDown={event => {
        if (event.pointerType !== "mouse" || event.button !== 0) return;
        gesture.current = {startX: event.clientX, startScroll: event.currentTarget.scrollLeft, down: true, dragged: false};
      }}
      onPointerMove={event => {
        const drag = gesture.current;
        if (event.buttons !== 1) { drag.down = false; return; }
        if (!drag.down || event.pointerType !== "mouse") return;
        const delta = event.clientX - drag.startX;
        if (!drag.dragged && Math.abs(delta) < 6) return;
        drag.dragged = true;
        event.currentTarget.dataset.dragging = "true";
        event.currentTarget.setPointerCapture(event.pointerId);
        event.currentTarget.scrollLeft = drag.startScroll - delta;
      }}
      onPointerUp={event => {
        gesture.current.down = false;
        delete event.currentTarget.dataset.dragging;
        if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
      }}
      onPointerCancel={event => { gesture.current.down = false; delete event.currentTarget.dataset.dragging; }}
      onClickCapture={event => {
        if (gesture.current.dragged) { event.preventDefault(); event.stopPropagation(); gesture.current.dragged = false; }
      }}
    >{children}</div>
  </div>;
}

export function EditorialPhotography({ preview = false, locale = "en" }: { preview?: boolean; locale?: Locale }) {
const photographs=getResumeData(locale).photography as PhotographyItem[];
  const [activeCategory, setActiveCategory] = useState<"all" | "places" | "portraits">("all");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const openingTrigger = useRef<HTMLButtonElement | null>(null);
  const [animatePhoto, setAnimatePhoto] = useState(false);

  const featuredIndex = Math.max(
    photographs.findIndex((photograph) => photograph.featured),
    0
  );

  const filteredIndexes = photographs
    .map((_, index) => index)
    .filter((index) => {
      if (activeCategory === "all") return true;
      const cat = photographs[index].category ?? "places";
      return cat === activeCategory;
    });

  const categoryIndexes = activeCategory === "all" ? [featuredIndex, ...filteredIndexes.filter(index => index !== featuredIndex)] : filteredIndexes;
  const reelIndexes = categoryIndexes.slice(0, preview ? 5 : undefined);
  const selectedPhoto = selectedIndex === null ? null : photographs[selectedIndex];

  const openPhoto = (index: number, trigger: HTMLButtonElement) => {
    openingTrigger.current = trigger;
    setSelectedIndex(index);
  };

  function moveLightbox(direction: -1 | 1, animate = false) {
    setAnimatePhoto(animate);
    setSelectedIndex((current) => {
      if (current === null) return null;
      const currentPosition = categoryIndexes.indexOf(current);
      return categoryIndexes[(currentPosition + direction + categoryIndexes.length) % categoryIndexes.length];
    });
  }

  const handleOpenChange = (open: boolean) => {
    if (open) return;
    setSelectedIndex(null);
    window.requestAnimationFrame(() => openingTrigger.current?.focus());
  };


  return (
    <section aria-labelledby="photography-heading" className="space-y-8">

      {/* Header & Category Tabs */}
      <div className="flex flex-col gap-6 border-b border-zinc-200 pb-6 dark:border-slate-800 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cinnabar">
            {t(locale,"Visual journal / 攝影日誌")}</p>
          <h2
            id="photography-heading"
            className="text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            {t(locale,"Places, people, and quiet distances.")}</h2>
          <p className="max-w-xl text-sm leading-relaxed text-zinc-500 dark:text-slate-400">
            {t(locale,"Photographs from China and the United States: coastlines, canyon light, city passages, and the small details that make a place memorable.")}</p>
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap gap-2">
          <button
            aria-pressed={activeCategory === "all"}
            onClick={() => setActiveCategory("all")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-colors ${
              activeCategory === "all"
                ? "bg-cinnabar text-white shadow-xs"
                : "bg-zinc-100 hover:bg-zinc-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-zinc-700 dark:text-slate-300"
            }`}
          >
            {t(locale,"All Photos")} {locale==="en"?"(":"（"}{photographs.length}{locale==="en"?")":"）"}
          </button>
          <button
            aria-pressed={activeCategory === "places"}
            onClick={() => setActiveCategory("places")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-colors ${
              activeCategory === "places"
                ? "bg-cinnabar text-white shadow-xs"
                : "bg-zinc-100 hover:bg-zinc-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-zinc-700 dark:text-slate-300"
            }`}
          >
            {t(locale,"Places")} {locale==="en"?"(":"（"}{photographs.filter((p) => (p.category ?? "places") === "places").length}{locale==="en"?")":"）"}
          </button>
          <button
            aria-pressed={activeCategory === "portraits"}
            onClick={() => setActiveCategory("portraits")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-colors ${
              activeCategory === "portraits"
                ? "bg-cinnabar text-white shadow-xs"
                : "bg-zinc-100 hover:bg-zinc-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-zinc-700 dark:text-slate-300"
            }`}
          >
            {t(locale,"Portraits")} {locale==="en"?"(":"（"}{photographs.filter((p) => p.category === "portraits").length}{locale==="en"?")":"）"}
          </button>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">{locale==="en" ? filteredIndexes.length+" photographs in "+activeCategory+"." : "共 "+filteredIndexes.length+" 張照片。"}</p>
      <PhotoReel key={activeCategory} count={reelIndexes.length} locale={locale}>
        {reelIndexes.map(index => <div className="photo-reel-item" key={photographs[index].image}>
          <PhotoCard locale={locale} photo={photographs[index]} index={index} onOpen={openPhoto} />
        </div>)}
      </PhotoReel>

      {/* Lightbox Dialog */}
      <Dialog open={selectedIndex !== null} onOpenChange={handleOpenChange}>
        {selectedPhoto && (
          <DialogContent closeLabel={t(locale,"Close")}
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                event.preventDefault();
                moveLightbox(event.key === "ArrowLeft" ? -1 : 1);
              }
            }}
            className="photo-lightbox max-h-[90svh] overflow-y-auto border-0 bg-black p-0 text-white sm:max-w-5xl">
            <div className="relative min-h-[48vh] w-full bg-black sm:min-h-[68vh]">
              <LightboxImage photo={{ ...selectedPhoto, alt: t(locale,selectedPhoto.alt ?? selectedPhoto.title) }} animate={animatePhoto} />
              <button
                type="button"
                onClick={event => moveLightbox(-1, event.detail > 0)}
                aria-label={t(locale,"View previous photograph")}
                className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white outline-hidden backdrop-blur-xs transition hover:bg-white hover:text-black focus-visible:ring-2 focus-visible:ring-white motion-reduce:transition-none sm:left-5"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={event => moveLightbox(1, event.detail > 0)}
                aria-label={t(locale,"View next photograph")}
                className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white outline-hidden backdrop-blur-xs transition hover:bg-white hover:text-black focus-visible:ring-2 focus-visible:ring-white motion-reduce:transition-none sm:right-5"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <DialogHeader
              aria-live="polite"
              className="space-y-3 bg-black px-6 pb-6 text-left sm:px-8"
            >
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-cinnabar" aria-hidden="true" />
                  {selectedPhoto.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-cinnabar" aria-hidden="true" />
                  {selectedPhoto.date}
                </span>
              </div>
              <DialogTitle className="text-2xl font-semibold text-white">
                {selectedPhoto.title}
              </DialogTitle>
              <DialogDescription className="max-w-3xl leading-relaxed text-zinc-300">
                {selectedPhoto.description}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
}
