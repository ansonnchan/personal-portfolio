"use client";

import { useMemo, useState } from "react";
import { profile } from "@/lib/profileData";

export function ChibiFunFacts() {
  const facts = useMemo(() => profile.funFacts, []);
  const [factIndex, setFactIndex] = useState<number | null>(null);
  const imageSources = [profile.assets.chibi, profile.assets.profileKid, profile.assets.profileCurrent];
  const [imageIndex, setImageIndex] = useState(0);
  const imageSrc = imageSources[imageIndex];

  return (
    <aside className="grid gap-3 rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] p-3 shadow-panel md:grid-cols-[5rem_1fr]">
      <div className="relative flex h-20 w-20 items-end justify-center overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)]">
        {imageSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageSrc}
            alt="Small profile portrait of Anson"
            className="h-full w-full object-cover"
            onError={() => setImageIndex((current) => current + 1)}
          />
        ) : (
          <div className="flex h-full w-full items-end justify-center bg-[radial-gradient(circle_at_50%_35%,#f6d7b0_0_22%,transparent_23%),linear-gradient(180deg,#f7eadb,#d9c6ad)]">
            <span className="mb-2 h-8 w-12 rounded-t-full bg-[var(--accent-dim)]" aria-hidden="true" />
          </div>
        )}
      </div>

      <div className="relative rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] p-3 font-mono text-xs leading-5 text-[var(--text-primary)]">
        <span className="absolute left-[-7px] top-5 h-3 w-3 rotate-45 border-b border-l border-[var(--border)] bg-[var(--bg-elevated)]" />
        <div className="flex items-center justify-between gap-3">
          <span className="font-bold text-[var(--bright-orange)]">Fun Fact</span>
          <button
            type="button"
            onClick={() => setFactIndex((current) => (current === null ? 0 : (current + 1) % facts.length))}
            className="rounded-full border border-[var(--bright-orange)] px-2.5 py-1 text-[var(--bright-orange)] transition hover:bg-[var(--orange-soft)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
            aria-label="Show another fun fact"
          >
            Refresh
          </button>
        </div>
        <p className="mt-2 text-[var(--text-secondary)]">
          {factIndex === null ? "Hi! I'm Anson, click below to know a fun fact about me." : facts[factIndex]}
        </p>
      </div>
    </aside>
  );
}
