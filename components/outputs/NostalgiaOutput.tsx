"use client";

import { useEffect, useState } from "react";

const photos = [
  "/assets/IMG_0192.JPG",
  "/assets/IMG_0668.JPG",
  "/assets/IMG_0734.JPG",
  "/assets/IMG_0916.JPG",
  "/assets/IMG_1953.JPG",
  "/assets/IMG_2256.JPG",
  "/assets/swollen.JPG"
];

const captions = [
  "Y'all, I really wore alphabet pajamas. Adelaide, Australia 2013",
  "I was really using lines on my violin LOL. Adelaide, Australia 2013",
  "I promise I don't hold chopsticks like that anymore. Sydney, Australia 2013",
  "Superman + apple juice + pachinko. Fukuoka, Japan 2011",
  "Universal Studios. I wish I was a wizard. Orlando, Florida 2016",
  "Book series was 'Unfortunate Series of Events'. Adelaide, Australia, 2016",
  "Why was my left ear hella swollen in this photo?? Adelaide, Australia 2012"

];

export function NostalgiaOutput() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selectedPhoto = selectedIndex === null ? null : photos[selectedIndex];
  const selectedCaption = selectedIndex === null ? "" : captions[selectedIndex];

  function showPrevious() {
    setSelectedIndex((current) => (current === null ? photos.length - 1 : (current + photos.length - 1) % photos.length));
  }

  function showNext() {
    setSelectedIndex((current) => (current === null ? 0 : (current + 1) % photos.length));
  }

  useEffect(() => {
    if (selectedIndex === null) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        showPrevious();
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        showNext();
      }

      if (event.key === "Escape") {
        setSelectedIndex(null);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] p-5">
        <p className="text-sm leading-6 text-[var(--text-secondary)]">
          I hope you enjoy these old photos of mine. I was doing some digging and spent a lot of time laughing,
          reminiscing, and feeling grateful for the old days. I found this quote online and loved the reminder:
          you only get one chance to live this life, so take a little time to look back at the moments that made you.
        </p>

        <figure className="mt-5 border-l-4 border-[var(--bright-orange)] bg-[var(--orange-soft)] px-4 py-4">
          <blockquote className="font-mono text-base leading-7 text-[var(--text-primary)]">
            “One day, you&apos;re 17 and you&apos;re planning for someday. And then quietly, without you ever really noticing,
            someday is today. And then someday is yesterday. And this is your life.”
          </blockquote>
          <figcaption className="mt-3 text-sm font-semibold text-[var(--bright-orange)]">– John Green</figcaption>
        </figure>

        <p className="mt-4 rounded-md border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-2 font-mono text-xs text-[var(--text-secondary)]">
          💡 Pro tip: Click a photo, then use your arrow keys to browse the gallery.
        </p>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((photo, index) => (
          <button
            key={photo}
            type="button"
            onClick={() => setSelectedIndex(index)}
            className="group overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] text-left transition hover:border-[var(--bright-orange)] hover:shadow-lift focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo}
              alt=""
              className="aspect-[4/3] w-full object-cover transition duration-200 group-hover:scale-[1.02]"
            />
            <span className="block px-3 py-2 font-mono text-xs text-[var(--bright-orange)]">{captions[index]}</span>
          </button>
        ))}
      </section>

      {selectedPhoto ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedIndex(null)}
        >
          <div className="flex w-full max-w-6xl items-center justify-center gap-3 sm:gap-5">
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showPrevious();
              }}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-[var(--bright-orange)] bg-[var(--bg-panel)]/95 font-mono text-4xl leading-none text-[var(--bright-orange)] shadow-lift transition hover:bg-[var(--orange-soft)]"
              aria-label="Previous photo"
            >
              ‹
            </button>
          <figure
            className="relative w-full max-w-4xl overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] shadow-lift"
            onClick={(event) => event.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={selectedPhoto}
              alt=""
              className="aspect-[4/3] max-h-[78vh] w-full bg-black/5 object-contain"
            />
            <figcaption className="flex items-center justify-between gap-3 px-4 py-3 font-mono text-xs text-[var(--bright-orange)]">
              <span>{selectedCaption}</span>
              <button
                type="button"
                onClick={() => setSelectedIndex(null)}
                className="rounded-full border border-[var(--border)] px-3 py-1 text-[var(--text-secondary)] hover:border-[var(--bright-orange)] hover:text-[var(--bright-orange)]"
              >
                close
              </button>
            </figcaption>
          </figure>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showNext();
              }}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-[var(--bright-orange)] bg-[var(--bg-panel)]/95 font-mono text-4xl leading-none text-[var(--bright-orange)] shadow-lift transition hover:bg-[var(--orange-soft)]"
              aria-label="Next photo"
            >
              ›
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
