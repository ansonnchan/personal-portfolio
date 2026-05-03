"use client";

import { profile } from "@/lib/profileData";

export function ResumeOutput() {
  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] p-4 text-sm leading-7 text-[var(--text-primary)]">
      <p>
        <span className="text-[var(--accent-green)]">&gt;</span> Fetching resume...
      </p>
      <p>
        <span className="text-[var(--accent-green)]">&gt;</span> Opening {profile.resumeFileName} in new tab.
      </p>
      <a
        href={profile.resume}
        target="_blank"
        rel="noreferrer"
        className="mt-3 inline-flex rounded-md border border-[var(--border)] px-2.5 py-1.5 text-xs text-[var(--link)] hover:bg-[var(--bg-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
        aria-label={`Open ${profile.resumeFileName}`}
      >
        Manual open <span aria-hidden="true" className="ml-1">-&gt;</span>
      </a>
    </div>
  );
}
