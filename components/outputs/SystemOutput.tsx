"use client";

import { useEffect, useState } from "react";
import { profile } from "@/lib/profileData";

const birthDate = new Date("2006-05-09T00:00:00-07:00");

function formatAgeUptime(now: Date) {
  let years = now.getFullYear() - birthDate.getFullYear();
  const birthdayThisYear = new Date(now.getFullYear(), birthDate.getMonth(), birthDate.getDate());

  if (now < birthdayThisYear) {
    years -= 1;
  }

  const lastBirthday = new Date(now.getFullYear() - (now < birthdayThisYear ? 1 : 0), birthDate.getMonth(), birthDate.getDate());
  const elapsed = Math.max(0, now.getTime() - lastBirthday.getTime());
  const totalSeconds = Math.floor(elapsed / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${years} years, ${hours.toLocaleString()} hours, ${minutes} minutes, ${seconds} seconds`;
}

export function SystemOutput({ modules }: { modules: string[] }) {
  const [uptime, setUptime] = useState(() => formatAgeUptime(new Date()));

  useEffect(() => {
    const timer = window.setInterval(() => setUptime(formatAgeUptime(new Date())), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const rows = [
    ["Operator", profile.name],
    ["Uptime", uptime],
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
