"use client";

import { profile } from "@/lib/profileData";

const groups = [
  ["LANGUAGES", profile.skills.languages],
  ["FRAMEWORKS", profile.skills.frameworks],
  ["TOOLS", profile.skills.tools],
  ["CONCEPTS", profile.skills.concepts]
] as const;

export function SkillsOutput() {
  return (
    <div className="space-y-4">
      {groups.map(([label, skills]) => (
        <section key={label} className="grid gap-3 rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] p-4 sm:grid-cols-[8.5rem_1fr]">
          <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">{label}</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-md border border-[var(--border)] bg-[var(--bg-elevated)] px-2.5 py-1.5 text-xs text-[var(--text-primary)]"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
