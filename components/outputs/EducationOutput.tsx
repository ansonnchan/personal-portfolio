"use client";

import { motion } from "framer-motion";
import { profile } from "@/lib/profileData";

export function EducationOutput() {
  return (
    <div className="space-y-3">
      {profile.education.map((item) => (
        <motion.article
          key={`${item.school}-${item.degree}`}
          className="rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] p-4"
          whileHover={{ y: -2 }}
          transition={{ duration: 0.18 }}
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3 className="font-mono text-base font-semibold text-[var(--text-primary)]">{item.school}</h3>
              <p className="mt-1 text-sm text-[var(--accent)]">{item.degree}</p>
            </div>
            <span className="w-fit rounded-md border border-[var(--border)] bg-[var(--bg-elevated)] px-2 py-1 text-xs text-[var(--text-secondary)]">
              {item.years}
            </span>
          </div>
          <p className="mt-4 text-sm leading-6 text-[var(--text-secondary)]">{item.notes}</p>
        </motion.article>
      ))}
    </div>
  );
}
