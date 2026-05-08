"use client";

import { useEffect, useMemo, useState } from "react";
import { profile } from "@/lib/profileData";

export function ResumeOutput() {
  const lines = useMemo(
    () => [
      "Resolving portfolio...",
      "Connecting to portfolio...",
      "HTTP request sent, awaiting response... 200 OK",
      "Length: 208KB [application/pdf]",
      `Saving to: '${profile.resumeFileName}'`,
      "100%[========================================] 208KB in 0.1s",
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
          className="mt-4 inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border)] bg-[var(--icon-bubble)] px-3 py-1.5 transition hover:border-[var(--bright-orange)] hover:bg-[var(--icon-bubble-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          aria-label={`Download ${profile.resumeFileName}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/download.png" alt="Download" className="h-5 w-5 object-contain" />
          <span className="font-mono text-xs text-[var(--link)]">Resume</span>
        </a>
      ) : (
        <p className="mt-3 text-[var(--text-muted)]">download in progress...</p>
      )}
    </div>
  );
}
