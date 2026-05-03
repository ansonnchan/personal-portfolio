"use client";

import { profile } from "@/lib/profileData";
import type { ExperienceItem } from "@/types";

function organizationIcon(company: string) {
  if (company === "Borrow'd") {
    return "/assets/borrowd_org_logo.jpeg";
  }

  return "/assets/unisa-logo.svg";
}

function HighlightText({ text }: { text: string }) {
  const highlighted = text.replace(/(30%|large-scale|deterministic|consumer lending|MATLAB|CI\/CD|automated testing)/gi, "§$1§");
  return (
    <>
      {highlighted.split("§").map((part, index) =>
        index % 2 === 1 ? (
          <span key={`${part}-${index}`} className="text-[var(--accent-green)]">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  );
}

function ExperienceDetail({ job }: { job: ExperienceItem }) {
  return (
    <div className="rounded-lg border border-[var(--accent)] bg-[var(--bg-elevated)] p-4">
      <p className="text-[var(--accent-green)]">$ cat experience.txt {job.id}</p>
      <div className="mt-3 grid gap-2 text-sm sm:grid-cols-[8rem_1fr]">
        <span className="text-[var(--text-muted)]">role</span>
        <span>{job.role}</span>
        <span className="text-[var(--text-muted)]">company</span>
        <span className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={organizationIcon(job.company)}
            alt=""
            className="h-7 w-7 shrink-0 rounded border border-[var(--border)] bg-white object-contain p-1"
          />
          {job.company}
        </span>
        <span className="text-[var(--text-muted)]">dates</span>
        <span>{job.period}</span>
      </div>
      <ul className="mt-4 space-y-2 text-sm leading-6 text-[var(--text-secondary)]">
        {job.highlights.map((highlight) => (
          <li key={highlight}>- <HighlightText text={highlight} /></li>
        ))}
      </ul>
      <p className="mt-4 text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">signals</p>
      <ul className="mt-2 space-y-1 text-sm text-[var(--accent-green)]">
        {job.metrics.map((metric) => (
          <li key={metric}>- {metric}</li>
        ))}
      </ul>
    </div>
  );
}

export function ExperienceOutput({ detailId = "" }: { detailId?: string }) {
  const detailJob = detailId ? profile.experience.find((job) => job.id === detailId) : null;

  if (detailId && !detailJob) {
    return (
      <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] p-4 text-sm text-[var(--text-secondary)]">
        <p className="text-[var(--accent-red)]">Experience not found: {detailId}</p>
        <p className="mt-3">Available ids: {profile.experience.map((job) => job.id).join(", ")}</p>
      </div>
    );
  }

  if (detailJob) {
    return <ExperienceDetail job={detailJob} />;
  }

  return (
    <div className="space-y-3">
      {profile.experience.map((job) => (
        <article
          key={`${job.company}-${job.role}`}
          className="rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] p-4 shadow-sm"
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex min-w-0 items-start gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={organizationIcon(job.company)}
                alt=""
                className="mt-0.5 h-11 w-11 shrink-0 rounded-md border border-[var(--border)] bg-white object-contain p-1.5"
              />
              <div className="min-w-0">
                <h3 className="font-mono text-base font-semibold text-[var(--text-primary)]">{job.role}</h3>
                <p className="mt-1 text-sm text-[var(--link)]">{job.company}</p>
              </div>
            </div>
            <div className="text-left sm:text-right">
              <span className="block text-xs text-[var(--text-secondary)]">{job.period}</span>
              <span className="mt-1 block text-xs text-[var(--text-muted)]">{job.location}</span>
            </div>
          </div>
          <ul className="mt-4 space-y-2 text-sm leading-6 text-[var(--text-secondary)]">
            {job.highlights.map((highlight) => (
              <li key={highlight} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-green)]" />
                <span><HighlightText text={highlight} /></span>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
