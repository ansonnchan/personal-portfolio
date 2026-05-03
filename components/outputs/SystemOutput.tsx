"use client";

import { profile } from "@/lib/profileData";

export function SystemOutput({ modules }: { modules: string[] }) {
  const rows = [
    ["Operator", profile.name],
    ["Uptime", profile.system.uptime],
    ["Build", profile.system.build],
    ["Status", "All systems nominal"],
    ["Modules loaded", modules.join(", ")],
    ["Last updated", profile.system.lastUpdated]
  ];

  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] p-4">
      <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-green)]">
        System diagnostics
      </h3>
      <div className="mt-3 h-px bg-[var(--border)]" />
      <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-[10rem_1fr]">
        {rows.map(([label, value]) => (
          <div key={label} className="contents">
            <dt className="font-sans text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">{label}</dt>
            <dd className="min-w-0 text-[var(--text-primary)]">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
