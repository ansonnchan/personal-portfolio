"use client";

import { useEffect, useMemo, useState } from "react";
import { profile } from "@/lib/profileData";

export function ResumeOutput() {
  const lines = useMemo(
    () => [
      "Resolving portfolio...",
      "Connecting to portfolio...",
      "HTTP request sent, awaiting response... 200 OK",
      "Length: 892KB [application/pdf]",
      `Saving to: '${profile.resumeFileName}'`,
      "100%[========================================] 892KB in 0.1s",
      `'${profile.resumeFileName}' saved`
    ],
    []
  );
  const [visibleLines, setVisibleLines] = useState(1);

  useEffect(() => {
    if (visibleLines >= lines.length) {
      return;
    }

    const timer = window.setTimeout(() => setVisibleLines((current) => current + 1), 420);
    return () => window.clearTimeout(timer);
  }, [lines.length, visibleLines]);

  const complete = visibleLines >= lines.length;

  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] p-4 text-sm leading-7 text-[var(--text-primary)]">
      {lines.slice(0, visibleLines).map((line, index) => (
        <p key={line} className={index === lines.length - 1 ? "text-[var(--accent-green)]" : undefined}>
          <span className="text-[var(--accent-green)]">&gt;</span> {line}
        </p>
      ))}

      {complete ? (
        <a
          href={profile.resume}
          download={profile.resumeFileName}
          className="mt-4 inline-flex rounded-md border border-[var(--accent)] bg-[var(--accent)] px-3 py-2 text-xs font-semibold text-white hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          aria-label={`Download ${profile.resumeFileName}`}
        >
          Download {profile.resumeFileName}
        </a>
      ) : (
        <p className="mt-3 text-[var(--text-muted)]">download in progress...</p>
      )}
    </div>
  );
}
