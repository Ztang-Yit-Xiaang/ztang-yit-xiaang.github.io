"use client";

import { getResumeData, t, type Locale } from "@/lib/i18n";


import { useRef, useState } from "react";
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


function PhotoCard({
  photo,
  index,
  onOpen,
  featured = false,
  aspectClass = "aspect-[4/5]",
  imageSizes,
  locale = "en",
}: {
  photo: PhotographyItem;
  index: number;
  onOpen: (index: number, trigger: HTMLButtonElement) => void;
  featured?: boolean;
  aspectClass?: string;
  imageSizes?: string;
  locale?: Locale;
}) {
  const alt = photo.alt ?? photo.title;

  return (
    <button
      type="button"
      onClick={(event) => onOpen(index, event.currentTarget)}
      aria-label={t(locale,`Open ${photo.title} in the photography lightbox`)}
      className={`group relative block w-full overflow-hidden rounded-[1.6rem] bg-zinc-200 text-left shadow-xs outline-hidden ring-offset-2 transition duration-500 hover:-translate-y-1 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-cinnabar dark:bg-slate-900 motion-reduce:transform-none ${
        featured ? "h-full min-h-[58vh] lg:min-h-0" : aspectClass
      }`}
    >
      <Image
        src={photo.thumbnail}
        alt={t(locale,alt)}
        fill
        sizes={
          imageSizes ??
          (featured
            ? "(max-width: 1023px) 100vw, 54vw"
            : "(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 23vw")
        }
        style={{ objectPosition: photo.objectPosition ?? "center" }}
        className="object-cover transition duration-700 group-hover:scale-[1.025] motion-reduce:transform-none"
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

export function EditorialPhotography({ preview = false, locale = "en" }: { preview?: boolean; locale?: Locale }) {
const photographs=getResumeData(locale).photography as PhotographyItem[];
  const [activeCategory, setActiveCategory] = useState<"all" | "places" | "portraits">("all");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const openingTrigger = useRef<HTMLButtonElement | null>(null);

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

  const selectedPhoto = selectedIndex === null ? null : photographs[selectedIndex];

  const openPhoto = (index: number, trigger: HTMLButtonElement) => {
    openingTrigger.current = trigger;
    setSelectedIndex(index);
  };

  function moveLightbox(direction: -1 | 1) {
    const categoryIndexes = photographs.map((_, index) => index).filter(index => activeCategory === "all" || (photographs[index].category ?? "places") === activeCategory);
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
      {/* Grid Display */}
      {activeCategory === "all" ? (
        <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)]">
          <div className={preview ? "lg:h-[34rem]" : "lg:sticky lg:top-28 lg:h-[calc(100dvh-9rem)]"}>
            <PhotoCard locale={locale}
              photo={photographs[featuredIndex]}
              index={featuredIndex}
              onOpen={openPhoto}
              featured
            />
          </div>

          <div className={preview ? "columns-1 gap-4 sm:columns-2" : "columns-1 gap-4 sm:columns-2 lg:columns-1 xl:columns-2"}>
            {filteredIndexes
              .filter((idx) => idx !== featuredIndex)
              .slice(0, preview ? 4 : undefined)
              .map((photoIndex, index) => {
                const photo = photographs[photoIndex];
                const aspectClass =
                  index % 5 === 0
                    ? "aspect-[3/4]"
                    : index % 3 === 0
                      ? "aspect-square"
                      : "aspect-[4/5]";

                return (
                  <div key={photo.image} className="mb-4 break-inside-avoid">
                    <PhotoCard locale={locale}
                      photo={photo}
                      index={photoIndex}
                      onOpen={openPhoto}
                      aspectClass={aspectClass}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredIndexes.slice(0, preview ? 6 : undefined).map((photoIndex) => {
            const photo = photographs[photoIndex];
            return (
              <PhotoCard locale={locale}
                key={photo.image}
                photo={photo}
                index={photoIndex}
                onOpen={openPhoto}
                aspectClass="aspect-[4/5]"
              />
            );
          })}
        </div>
      )}

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
            className="max-h-[90svh] overflow-y-auto border-0 bg-black p-0 text-white sm:max-w-5xl">
            <div className="relative min-h-[48vh] w-full bg-black sm:min-h-[68vh]">
              <Image
                key={selectedPhoto.image}
                src={selectedPhoto.image}
                alt={t(locale,selectedPhoto.alt ?? selectedPhoto.title)}
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-contain"
              />
              <button
                type="button"
                onClick={() => moveLightbox(-1)}
                aria-label={t(locale,"View previous photograph")}
                className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white outline-hidden backdrop-blur-xs transition hover:bg-white hover:text-black focus-visible:ring-2 focus-visible:ring-white motion-reduce:transition-none sm:left-5"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => moveLightbox(1)}
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
