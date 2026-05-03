"use client";

import { useState } from "react";
import { profile } from "@/lib/profileData";

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const aboutBullets = [
  "Born in Hong Kong, but lived in Australia for 15 years before moving to Canada back in late 2021.",
  "Into machine learning and NLP, and also creating stupid Naruto OpenCV filters for fun.",
  "I love to play every racket sport (tennis, badminton, table tennis) but I have a soft spot for tennis since I played competitively for many years.",
  "I have also played the trumpet and the violin, and was part of my school orchestra",
  "I'm currently learning Chinese, around HSK 3 level.",
  "Always down to connect and chat about anything, so feel free to reach out through email or socials!"
];

export function AboutOutput() {
  const [currentMissing, setCurrentMissing] = useState(false);

  return (
    <div className="space-y-6 font-mono">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <div className="relative flex h-32 w-32 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-[var(--bright-orange)] bg-[var(--bg-elevated)] text-2xl font-semibold text-[var(--accent)] shadow-inner">
          {!currentMissing ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={profile.assets.profileCurrent}
              alt={profile.name}
              className="absolute inset-0 h-full w-full object-cover object-[56%_50%]"
              onError={() => setCurrentMissing(true)}
            />
          ) : null}
          {currentMissing ? initials(profile.name) : null}
        </div>
        <div className="min-w-0">
          <h2 className="text-2xl font-bold text-[var(--bright-orange)]">{profile.name}</h2>
          <p className="mt-1 text-lg font-semibold text-[var(--text-secondary)]">Profile Picture</p>
        </div>
      </div>

      <p className="max-w-5xl text-base leading-7 text-[var(--text-primary)]">
        I am a third-year <span className="text-[var(--accent-green)] underline underline-offset-4">Computer Engineering student</span> at {" "}
        <span className="text-[var(--accent-green)] underline underline-offset-4">UBC</span> studying something that is between the oasis of software and the desert of hardware.
       
      </p>

      <section className="space-y-4">
        <h3 className="text-xl font text-[var(--bright-orange)]">A little bit about me:</h3>
        <ul className="space-y-3 text-base leading-7 text-[var(--text-primary)]">
          {aboutBullets.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="shrink-0 text-[var(--text-primary)]">▸</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <p className="text-xl text-[var(--accent-green)]">$</p>
    </div>
  );
}
