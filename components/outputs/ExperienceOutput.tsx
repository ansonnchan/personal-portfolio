"use client";

import { motion } from "framer-motion";
import { profile } from "@/lib/profileData";

export function ExperienceOutput() {
  return (
    <div className="space-y-3">
      {profile.experience.map((job) => (
        <motion.article
          key={`${job.company}-${job.role}`}
          className="rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] p-4 shadow-sm"
          whileHover={{ y: -2 }}
          transition={{ duration: 0.18 }}
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3 className="font-mono text-base font-semibold text-[var(--text-primary)]">{job.role}</h3>
              <a
                className="mt-1 inline-flex text-sm text-[var(--link)] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                href={job.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${job.company}`}
              >
                {job.company} <span aria-hidden="true" className="ml-1">-&gt;</span>
              </a>
            </div>
            <span className="w-fit rounded-md border border-[var(--border)] bg-[var(--bg-elevated)] px-2 py-1 text-xs text-[var(--text-secondary)]">
              {job.period}
            </span>
          </div>
          <ul className="mt-4 space-y-2 text-sm leading-6 text-[var(--text-secondary)]">
            {job.highlights.map((highlight) => (
              <li key={highlight} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-green)]" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </motion.article>
      ))}
    </div>
  );
}
