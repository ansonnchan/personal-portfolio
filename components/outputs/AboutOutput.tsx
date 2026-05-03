"use client";

import { motion } from "framer-motion";
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

export function AboutOutput() {
  const [currentMissing, setCurrentMissing] = useState(false);
  const [kidMissing, setKidMissing] = useState(false);

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        <div className="group relative flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[var(--accent)] bg-[var(--bg-elevated)] text-2xl font-semibold text-[var(--accent)] shadow-inner">
          {!currentMissing ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={profile.assets.profileCurrent}
              alt={profile.name}
              className={[
                "absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105",
                kidMissing ? "" : "group-hover:opacity-0"
              ].join(" ")}
              onError={() => setCurrentMissing(true)}
            />
          ) : null}
          {!kidMissing ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={profile.assets.profileKid}
              alt={`${profile.name} childhood photo`}
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
              onError={() => setKidMissing(true)}
            />
          ) : null}
          {currentMissing && kidMissing ? initials(profile.name) : null}
        </div>
        <div className="min-w-0 space-y-3">
          <div>
            <h2 className="font-mono text-2xl font-semibold text-[var(--accent)]">{profile.name}</h2>
            <p className="mt-1 max-w-3xl text-sm leading-6 text-[var(--text-secondary)]">
              {profile.role} based in {profile.location}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs text-[var(--text-secondary)]">
            {[profile.location, profile.role, profile.status].map((fact) => (
              <span
                key={fact}
                className="rounded-md border border-[var(--border)] bg-[var(--bg-panel)] px-2.5 py-1 text-[var(--accent-green)]"
              >
                {fact}
              </span>
            ))}
          </div>
        </div>
      </div>

      <motion.div
        className="rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] p-4 text-sm leading-6 text-[var(--text-primary)]"
        whileHover={{ y: -2 }}
        transition={{ duration: 0.18 }}
      >
        {profile.bio.split("\n\n").map((paragraph) => (
          <p key={paragraph} className="mb-3 last:mb-0">
            {paragraph}
          </p>
        ))}
      </motion.div>
    </div>
  );
}
