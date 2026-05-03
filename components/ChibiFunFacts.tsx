"use client";

import { useMemo, useState } from "react";
import { profile } from "@/lib/profileData";

export function ChibiFunFacts() {
  const facts = useMemo(() => profile.funFacts, []);
  const [factIndex, setFactIndex] = useState<number | null>(null);
  const [isHidden, setIsHidden] = useState(false);
  const imageSources = [profile.assets.chibi, profile.assets.profileKid, profile.assets.profileCurrent];
  const [imageIndex, setImageIndex] = useState(0);
  const imageSrc = imageSources[imageIndex];

  if (isHidden) {
    return (
      <button
        type="button"
        onClick={() => setIsHidden(false)}
        className="group flex items-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] p-3 text-left shadow-panel transition hover:border-[var(--bright-orange)] hover:bg-[var(--orange-soft)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
        aria-label="Bring Little Anson back"
      >
        <span className="relative flex h-14 w-14 shrink-0 items-end justify-center overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/mischevious.png" alt="" className="h-full w-full object-cover transition group-hover:translate-y-1" />
          <span className="absolute bottom-0 h-4 w-full bg-[var(--bg-panel)]/90" aria-hidden="true" />
        </span>
        <span className="font-mono text-xs leading-5 text-[var(--text-secondary)]">
          ohoho... so you <span className="text-[var(--bright-orange)]">do</span> want to know more about me?
        </span>
      </button>
    );
  }

  return (
    <aside className="grid gap-3 rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] p-3 shadow-panel md:grid-cols-[5rem_1fr]">
      <div className="space-y-1">
        <div className="relative flex h-20 w-20 items-end justify-center overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)]">
          {imageSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageSrc}
              alt="Little Anson"
              className="h-full w-full object-cover"
              onError={() => setImageIndex((current) => current + 1)}
            />
          ) : (
            <div className="flex h-full w-full items-end justify-center bg-[radial-gradient(circle_at_50%_35%,#f6d7b0_0_22%,transparent_23%),linear-gradient(180deg,#f7eadb,#d9c6ad)]">
              <span className="mb-2 h-8 w-12 rounded-t-full bg-[var(--accent-dim)]" aria-hidden="true" />
            </div>
          )}
        </div>
        <p className="w-20 text-center font-mono text-[10px] text-[var(--text-muted)]">Little Anson</p>
      </div>

      <div className="relative rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] p-3 font-mono text-xs leading-5 text-[var(--text-primary)]">
        <span className="absolute left-[-7px] top-5 h-3 w-3 rotate-45 border-b border-l border-[var(--border)] bg-[var(--bg-elevated)]" />
        {factIndex === null ? (
          <>
            <p className="text-[var(--text-secondary)]">
              Hi, I&apos;m Anson! Click below if you want to know a fun fact about me.
            </p>
            <div className="mt-3 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setFactIndex(0)}
                className="rounded-full border border-[var(--bright-orange)] px-3 py-1 text-[var(--bright-orange)] transition hover:bg-[var(--orange-soft)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                aria-label="Reveal a fun fact"
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => setIsHidden(true)}
                className="rounded-full border border-[var(--border)] px-3 py-1 text-[var(--text-muted)] transition hover:border-[var(--bright-orange)] hover:text-[var(--bright-orange)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                aria-label="Hide Little Anson"
              >
                Hide
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="-mt-1">
              <span className="font-bold text-[var(--bright-orange)]">Fun Fact</span>
            </div>
            <p className="mt-1 text-[var(--text-secondary)]">{facts[factIndex]}</p>
            <div className="mt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setFactIndex((current) => (current === null ? 0 : (current + 1) % facts.length))}
                  className="rounded-full border border-[var(--bright-orange)] px-2.5 py-1 text-[var(--bright-orange)] transition hover:bg-[var(--orange-soft)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                  aria-label="Show another fun fact"
                >
                  Refresh
                </button>
                <button
                  type="button"
                  onClick={() => setIsHidden(true)}
                  className="rounded-full border border-[var(--border)] px-2.5 py-1 text-[var(--text-muted)] transition hover:border-[var(--bright-orange)] hover:text-[var(--bright-orange)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                  aria-label="Hide Little Anson"
                >
                  Hide
                </button>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
