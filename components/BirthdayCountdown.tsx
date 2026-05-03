"use client";

import { useEffect, useState } from "react";

const birthday = new Date("2026-05-09T00:00:00-07:00").getTime();

function getRemaining() {
  const remaining = Math.max(0, birthday - Date.now());
  const seconds = Math.floor(remaining / 1000);

  return {
    days: Math.floor(seconds / 86400),
    hours: Math.floor((seconds % 86400) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60
  };
}

export function BirthdayCountdown() {
  const [remaining, setRemaining] = useState(getRemaining);

  useEffect(() => {
    const timer = window.setInterval(() => setRemaining(getRemaining()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] p-3 shadow-panel">
      <div className="flex items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/birthday.png"
          alt=""
          className="h-14 w-14 shrink-0 rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] object-cover"
        />
        <div className="min-w-0">
          <p className="font-mono text-xs font-semibold text-[var(--bright-orange)]">till my birthday</p>
          <div className="mt-1 grid grid-cols-4 gap-1 font-mono text-[10px] text-[var(--text-secondary)]">
            {[
              ["d", remaining.days],
              ["h", remaining.hours],
              ["m", remaining.minutes],
              ["s", remaining.seconds]
            ].map(([label, value]) => (
              <span key={label} className="rounded border border-[var(--border)] bg-[var(--bg-elevated)] px-1.5 py-1 text-center">
                <strong className="block text-sm text-[var(--text-primary)]">{String(value).padStart(2, "0")}</strong>
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
