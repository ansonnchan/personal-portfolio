"use client";

import { profile } from "@/lib/profileData";
import type { ExperienceItem } from "@/types";

type ArchivedExperienceItem = {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  highlights: string[];
};

const experienceHighlightPhrases = [
  "streamlined the CI/CD pipeline",
  "computational modeling research",
  "emergent behavior in cellular automata"
];

const archivedExperiences: ArchivedExperienceItem[] = [
  {
    id: "gap",
    role: "Sales Associate",
    company: "Gap",
    location: "Richmond, BC",
    period: "June 2022 - April 2025",
    highlights: ["just smile and wave boys", "would you like a bag for 25¢?"]
  },
  {
    id: "kumon",
    role: "Center Assistant",
    company: "Kumon",
    location: "Richmond, BC",
    period: "May 2022 - August 2024",
    highlights: ["teaching math, reading, and life lessons.", "also passing down intergenerational trauma"]
  },
  {
    id: "mcdonalds",
    role: "Crew Member",
    company: "McDonald's",
    location: "Vancouver, BC",
    period: "January 2022 - April 2022",
    highlights: ["Y'all, I really didn't last long here but I put the fries in the bag"]
  }
];

const archivedHighlightPhrases = [
  "just smile and wave",
  "boys",
  "life lessons",
  "intergenerational trauma",
  "put the fries in the bag"
];

function organizationIcon(company: string) {
  if (company === "Borrow'd") {
    return "/assets/borrowd_org_logo.jpeg";
  }

  return "/assets/unisa-logo.svg";
}

function HighlightText({ text, phrases }: { text: string; phrases: string[] }) {
  const escapedPhrases = phrases.map((phrase) => phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const highlighted = escapedPhrases.length > 0
    ? text.replace(new RegExp(`(${escapedPhrases.join("|")})`, "gi"), "§$1§")
    : text;

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
          <li key={highlight}>- <HighlightText text={highlight} phrases={experienceHighlightPhrases} /></li>
        ))}
      </ul>
      <p className="mt-4 text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">signals</p>
      <ul className="mt-2 space-y-1 text-sm text-[var(--text-secondary)]">
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
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--bright-orange)]" />
                <span><HighlightText text={highlight} phrases={experienceHighlightPhrases} /></span>
              </li>
            ))}
          </ul>
        </article>
      ))}
      <div className="rounded-lg border border-dashed border-[var(--accent)] bg-[var(--bg-elevated)] p-4">
        <p className="font-mono text-sm font-semibold text-[var(--bright-orange)]">More Experiences Available</p>
        <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
          Check out my{" "}
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("terminal:command", { detail: "cat archives/old_experience.txt" }))}
            className="font-mono text-[var(--link)] underline decoration-[var(--link)]/50 underline-offset-4 transition hover:text-[var(--bright-orange)] hover:decoration-[var(--bright-orange)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          >
            archived experiences
          </button>{" "}
          for additional work history and non-internship roles.
        </p>
      </div>
    </div>
  );
}

export function ArchivedExperienceOutput() {
  return (
    <div className="space-y-3">
      <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] p-4">
        <h3 className="font-mono text-lg font-semibold text-[var(--bright-orange)]">📁 Archived Experiences</h3>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">Non-internship experiences</p>
      </div>

      {archivedExperiences.map((job) => (
        <article
          key={job.id}
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
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--bright-orange)]" />
                <span><HighlightText text={highlight} phrases={archivedHighlightPhrases} /></span>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
