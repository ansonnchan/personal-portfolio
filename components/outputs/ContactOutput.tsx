"use client";

import { profile } from "@/lib/profileData";
import type { SocialKey } from "@/types";

const labels: Record<SocialKey, string> = {
  github: "GitHub",
  linkedin: "LinkedIn",
  email: "Email"
};

function displayValue(key: SocialKey, value: string) {
  if (key === "email") {
    return value;
  }

  try {
    const url = new URL(value);
    return url.host + url.pathname.replace(/\/$/, "");
  } catch {
    return value;
  }
}

export function ContactOutput() {
  return (
    <div className="space-y-2">
      {(Object.entries(profile.socials) as [SocialKey, string][]).map(([key, value]) => {
        const href = key === "email" ? `mailto:${value}` : value;

        return (
          <a
            key={key}
            href={href}
            target={key === "email" ? undefined : "_blank"}
            rel={key === "email" ? undefined : "noreferrer"}
            className="group flex items-center justify-between gap-4 rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] px-4 py-3 text-sm text-[var(--text-primary)] transition hover:bg-[var(--bg-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
            aria-label={`Open ${labels[key]} contact link`}
          >
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
              {labels[key]}
            </span>
            <span className="min-w-0 truncate text-right text-[var(--link)]">
              {displayValue(key, value)}
            </span>
          </a>
        );
      })}
    </div>
  );
}
