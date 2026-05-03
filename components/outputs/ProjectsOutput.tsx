"use client";

import { useState } from "react";
import { profile } from "@/lib/profileData";
import type { ProjectItem } from "@/types";

/**
 * Mapping project IDs to their specific image assets.
 * Ensure the keys here match the 'id' field in your profileData.
 */
const PROJECT_ASSETS: Record<string, string[]> = {
  "portfolio": [
    "/assets/portfolio_pic1.png",
    "/assets/portfolio_pic2.png"
  ],
  "vent.ai": [
    "/assets/vent.ai_pic1.png",
    "/assets/vent.ai_pic2.png"
  ]
};

function ProjectLinks({ project }: { project: ProjectItem }) {
  const links = [
    ["GitHub", project.links.github],
    ["Live", project.links.live]
  ].filter((entry): entry is [string, string] => Boolean(entry[1]));

  if (links.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 flex flex-wrap justify-end gap-2 text-xs">
      {links.map(([label, href]) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-[var(--border)] px-2.5 py-1 text-[var(--link)] transition hover:border-[var(--bright-orange)] hover:bg-[var(--orange-soft)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          aria-label={`Open ${label} for ${project.name}`}
        >
          {label}
        </a>
      ))}
    </div>
  );
}

export function ProjectsOutput() {
  const [previewProjectIds, setPreviewProjectIds] = useState<string[]>([]);

  function toggleProjectPreview(projectId: string) {
    setPreviewProjectIds((current) =>
      current.includes(projectId)
        ? current.filter((id) => id !== projectId)
        : [...current, projectId]
    );
  }

  return (
    <div className="space-y-6">
      {profile.projects.map((project) => {
        // Dynamically fetch shots for the specific project
        const currentShots = PROJECT_ASSETS[project.id.toLowerCase()] || [];

        return (
          <article key={project.id} className="rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] p-5">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <h3 className="font-mono text-lg font-semibold text-[var(--text-primary)]">{project.name}</h3>
              {project.featured ? (
                <span className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--accent)]">featured</span>
              ) : null}
            </div>

            <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{project.summary}</p>
            <p className="mt-3 font-mono text-sm text-[var(--accent-green)]">{project.techStack.join(" / ")}</p>
            <ul className="mt-4 space-y-1 text-sm leading-6 text-[var(--text-secondary)]">
              <li>- {project.technicalSummary}</li>
              <li>- {project.problem}</li>
              <li>- Add a project achievement here.</li>
            </ul>

            {/* Only render button if images exist for this project */}
            {currentShots.length > 0 && (
              <button
                type="button"
                onClick={() => toggleProjectPreview(project.id)}
                className="mt-4 rounded-full border border-[var(--border)] px-3 py-1.5 font-mono text-xs text-[var(--bright-orange)] transition hover:border-[var(--bright-orange)] hover:bg-[var(--orange-soft)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              >
                {previewProjectIds.includes(project.id) ? "hide screenshots" : "view screenshots"}
              </button>
            )}

            {previewProjectIds.includes(project.id) && currentShots.length > 0 ? (
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {currentShots.map((shot, index) => (
                  <figure key={shot} className="rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] p-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={shot} 
                      alt={`${project.name} screenshot ${index + 1}`} 
                      className="aspect-video w-full rounded border border-[var(--border)] bg-white object-contain p-4" 
                    />
                    <figcaption className="mt-2 font-mono text-xs text-[var(--text-muted)]">
                      {project.name} preview {index + 1}
                    </figcaption>
                  </figure>
                ))}
              </div>
            ) : null}

            <ProjectLinks project={project} />
          </article>
        );
      })}
    </div>
  );
}

export function OpenProjectOutput({ projectId }: { projectId: string }) {
  const project = profile.projects.find((item) => item.id.toLowerCase() === projectId.toLowerCase());

  if (!project) {
    return (
      <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] p-4 text-sm text-[var(--text-secondary)]">
        <p className="text-[var(--accent-red)]">Project not found: {projectId || "missing id"}</p>
        <p className="mt-3">Available project ids: {profile.projects.map((item) => item.id).join(", ")}</p>
      </div>
    );
  }

  return (
    <article className="rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] p-5">
      <p className="font-mono text-sm text-[var(--accent-green)]">$ open {project.id}</p>
      <h3 className="mt-3 font-mono text-xl font-semibold text-[var(--text-primary)]">{project.name}</h3>
      <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{project.technicalSummary}</p>
      <p className="mt-4 text-sm text-[var(--accent-green)]">{project.techStack.join(" / ")}</p>
      <ul className="mt-4 space-y-1 text-sm leading-6 text-[var(--text-secondary)]">
        <li>- {project.problem}</li>
        <li>- Add a project achievement here.</li>
      </ul>
      <ProjectLinks project={project} />
    </article>
  );
}