"use client";

import { motion } from "framer-motion";
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
  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] text-2xl font-semibold text-[var(--accent)] shadow-inner">
          {initials(profile.name)}
        </div>
        <div className="min-w-0 space-y-3">
          <div>
            <h2 className="font-mono text-2xl font-semibold text-[var(--accent)]">{profile.name}</h2>
            <p className="mt-1 max-w-3xl text-sm leading-6 text-[var(--text-secondary)]">{profile.tagline}</p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs text-[var(--text-secondary)]">
            {[profile.location, profile.role, profile.status].map((fact) => (
              <span
                key={fact}
                className="rounded-md border border-[var(--border)] bg-[var(--bg-panel)] px-2.5 py-1"
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
