"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Calendar, ChevronLeft, ChevronRight, Expand, MapPin } from "lucide-react";
import { resumeData } from "@/data/resume";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type PhotographyItem = {
  title: string;
  image: string;
  thumbnail: string;
  location: string;
  date: string;
  description: string;
  category?: "places" | "portraits";
  alt?: string;
  featured?: boolean;
  overlayLabel?: string;
  objectPosition?: string;
};

const photographs = resumeData.photography as PhotographyItem[];

function PhotoCard({
  photo,
  index,
  onOpen,
  featured = false,
  aspectClass = "aspect-[4/5]",
  imageSizes,
}: {
  photo: PhotographyItem;
  index: number;
  onOpen: (index: number, trigger: HTMLButtonElement) => void;
  featured?: boolean;
  aspectClass?: string;
  imageSizes?: string;
}) {
  const alt = photo.alt ?? photo.title;

  return (
    <button
      type="button"
      onClick={(event) => onOpen(index, event.currentTarget)}
      aria-label={`Open ${photo.title} in the photography lightbox`}
      className={`group relative block w-full overflow-hidden rounded-[1.6rem] bg-zinc-200 text-left shadow-sm outline-none ring-offset-2 transition duration-500 hover:-translate-y-1 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-cinnabar dark:bg-slate-900 motion-reduce:transform-none ${
        featured ? "h-full min-h-[58vh] lg:min-h-0" : aspectClass
      }`}
    >
      <Image
        src={photo.thumbnail}
        alt={alt}
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
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-black/10" />

      {photo.overlayLabel && (
        <span className="font-handwritten absolute left-6 top-4 -rotate-3 text-6xl leading-none text-white drop-shadow-lg sm:left-8 sm:top-6 sm:text-7xl lg:text-8xl">
          {photo.overlayLabel}
        </span>
      )}

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white sm:p-7">
        <div className="min-w-0 space-y-1">
          <p className="text-lg font-semibold tracking-tight sm:text-xl">
            {photo.title}
          </p>
          <p className="flex items-center gap-1.5 text-xs text-white/75">
            <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span className="truncate">{photo.location}</span>
          </p>
        </div>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/30 bg-black/20 backdrop-blur-sm transition group-hover:bg-white group-hover:text-black">
          <Expand className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>
    </button>
  );
}

export function EditorialPhotography() {
  const featuredIndex = Math.max(
    photographs.findIndex((photograph) => photograph.featured),
    0,
  );
  const placeIndexes = photographs
    .map((_, index) => index)
    .filter(
      (index) =>
        index !== featuredIndex &&
        (photographs[index].category ?? "places") === "places",
    );
  const portraitIndexes = photographs
    .map((_, index) => index)
    .filter((index) => photographs[index].category === "portraits");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const openingTrigger = useRef<HTMLButtonElement | null>(null);
  const selectedPhoto =
    selectedIndex === null ? null : photographs[selectedIndex];

  const openPhoto = (index: number, trigger: HTMLButtonElement) => {
    openingTrigger.current = trigger;
    setSelectedIndex(index);
  };

  const moveLightbox = (direction: -1 | 1) => {
    setSelectedIndex((current) => {
      if (current === null) return null;
      return (current + direction + photographs.length) % photographs.length;
    });
  };

  const handleOpenChange = (open: boolean) => {
    if (open) return;

    setSelectedIndex(null);
    window.requestAnimationFrame(() => openingTrigger.current?.focus());
  };

  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        moveLightbox(event.key === "ArrowLeft" ? -1 : 1);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  return (
    <section aria-labelledby="photography-heading" className="space-y-8">
      <div className="flex flex-col gap-4 border-b border-zinc-200 pb-6 dark:border-slate-800 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cinnabar">
            Travel journal
          </p>
          <h2
            id="photography-heading"
            className="text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Places, people, and quiet distances.
          </h2>
        </div>
        <p className="max-w-md text-sm leading-relaxed text-zinc-500 dark:text-slate-400">
          A visual record of journeys through China, Minnesota, and the Blue
          Ridge—edited as small stories rather than a catalogue of destinations.
        </p>
      </div>

      <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)]">
        <div className="lg:sticky lg:top-28 lg:h-[calc(100vh-9rem)]">
          <PhotoCard
            photo={photographs[featuredIndex]}
            index={featuredIndex}
            onOpen={openPhoto}
            featured
          />
        </div>

        <div className="columns-1 gap-4 sm:columns-2 lg:columns-1 xl:columns-2">
          {placeIndexes.map((photoIndex, index) => {
            const photo = photographs[photoIndex];
            const aspectClass =
              index % 5 === 0
                ? "aspect-[3/4]"
                : index % 3 === 0
                  ? "aspect-square"
                  : "aspect-[4/5]";

            return (
              <div key={photo.image} className="mb-4 break-inside-avoid">
                <PhotoCard
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

      {portraitIndexes.length > 0 && (
        <section
          aria-labelledby="portraits-heading"
          className="space-y-6 border-t border-zinc-200 pt-10 dark:border-slate-800"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cinnabar">
                Portrait studies / 人像
              </p>
              <h3
                id="portraits-heading"
                className="text-2xl font-semibold tracking-tight sm:text-3xl"
              >
                People, held in place and light.
              </h3>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-zinc-500 dark:text-slate-400">
              A smaller series for expressions, friendships, and the gestures that
              make a journey personal.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {portraitIndexes.map((photoIndex) => {
              const photo = photographs[photoIndex];
              return (
                <PhotoCard
                  key={photo.image}
                  photo={photo}
                  index={photoIndex}
                  onOpen={openPhoto}
                  aspectClass="aspect-[3/4]"
                  imageSizes="(max-width: 639px) 100vw, 45vw"
                />
              );
            })}
          </div>
        </section>
      )}

      <Dialog open={selectedIndex !== null} onOpenChange={handleOpenChange}>
        {selectedPhoto && (
          <DialogContent className="max-w-5xl overflow-hidden border-0 bg-black p-0 text-white">
            <div className="relative min-h-[48vh] w-full bg-black sm:min-h-[68vh]">
              <Image
                key={selectedPhoto.image}
                src={selectedPhoto.image}
                alt={selectedPhoto.alt ?? selectedPhoto.title}
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-contain"
              />
              <button
                type="button"
                onClick={() => moveLightbox(-1)}
                aria-label="View previous photograph"
                className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white outline-none backdrop-blur-sm transition hover:bg-white hover:text-black focus-visible:ring-2 focus-visible:ring-white motion-reduce:transition-none sm:left-5"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => moveLightbox(1)}
                aria-label="View next photograph"
                className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white outline-none backdrop-blur-sm transition hover:bg-white hover:text-black focus-visible:ring-2 focus-visible:ring-white motion-reduce:transition-none sm:right-5"
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
                  <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                  {selectedPhoto.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
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
