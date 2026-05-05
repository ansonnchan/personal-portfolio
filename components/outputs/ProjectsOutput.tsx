"use client";

import { useEffect, useState } from "react";
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

function projectIcon(projectId: string) {
  if (projectId.toLowerCase() === "portfolio") {
    return "/assets/terminal_logo.png";
  }

  if (projectId.toLowerCase() === "vent.ai") {
    return "/assets/vent.ai_logo.png";
  }
  
  return null; // Return null if no specific icon is found for the project
}

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
  const [selectedScreenshot, setSelectedScreenshot] = useState<{ projectId: string; index: number } | null>(null);
  const selectedProject = selectedScreenshot
    ? profile.projects.find((project) => project.id === selectedScreenshot.projectId) ?? null
    : null;
  const selectedShots = selectedScreenshot ? PROJECT_ASSETS[selectedScreenshot.projectId.toLowerCase()] ?? [] : [];
  const selectedShot = selectedScreenshot ? selectedShots[selectedScreenshot.index] : null;

  function toggleProjectPreview(projectId: string) {
    setPreviewProjectIds((current) =>
      current.includes(projectId)
        ? current.filter((id) => id !== projectId)
        : [...current, projectId]
    );
  }

  function showPreviousScreenshot() {
    setSelectedScreenshot((current) => {
      if (!current) {
        return null;
      }

      const shots = PROJECT_ASSETS[current.projectId.toLowerCase()] ?? [];
      return {
        projectId: current.projectId,
        index: (current.index + shots.length - 1) % shots.length
      };
    });
  }

  function showNextScreenshot() {
    setSelectedScreenshot((current) => {
      if (!current) {
        return null;
      }

      const shots = PROJECT_ASSETS[current.projectId.toLowerCase()] ?? [];
      return {
        projectId: current.projectId,
        index: (current.index + 1) % shots.length
      };
    });
  }

  useEffect(() => {
    if (!selectedScreenshot) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        showPreviousScreenshot();
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        showNextScreenshot();
      }

      if (event.key === "Escape") {
        setSelectedScreenshot(null);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedScreenshot]);

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
              {project.built.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
            {project.callout ? (
              <p className="mt-4 rounded-md border border-[var(--accent-green)]/40 bg-[var(--bg-elevated)] px-3 py-2 font-mono text-sm text-[var(--accent-green)]">
                {project.callout}
              </p>
            ) : null}

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
                  <button
                    key={shot}
                    type="button"
                    onClick={() => setSelectedScreenshot({ projectId: project.id, index })}
                    className="group rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] p-3 text-left transition hover:border-[var(--bright-orange)] hover:shadow-lift focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={shot} 
                      alt={`${project.name} screenshot ${index + 1}`} 
                      className="aspect-video w-full rounded border border-[var(--border)] bg-white object-contain p-4 transition duration-200 group-hover:scale-[1.01]" 
                    />
                    <span className="mt-2 block font-mono text-xs text-[var(--text-muted)]">
                      {project.name} preview {index + 1}
                    </span>
                  </button>
                ))}
              </div>
            ) : null}

            <ProjectLinks project={project} />
          </article>
        );
      })}

      {selectedShot && selectedProject ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedScreenshot(null)}
        >
          <div className="flex w-full max-w-6xl items-center justify-center gap-3 sm:gap-5">
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showPreviousScreenshot();
              }}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-[var(--bright-orange)] bg-[var(--bg-panel)]/95 font-mono text-4xl leading-none text-[var(--bright-orange)] shadow-lift transition hover:bg-[var(--orange-soft)]"
              aria-label="Previous screenshot"
            >
              ‹
            </button>
            <figure
              className="relative w-full max-w-5xl overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] shadow-lift"
              onClick={(event) => event.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedShot}
                alt={`${selectedProject.name} screenshot ${(selectedScreenshot?.index ?? 0) + 1}`}
                className="aspect-video max-h-[78vh] w-full bg-white object-contain p-4"
              />
              <figcaption className="flex items-center justify-between gap-3 px-4 py-3 font-mono text-xs text-[var(--bright-orange)]">
                <span>
                  {selectedProject.name} screenshot {(selectedScreenshot?.index ?? 0) + 1} / {selectedShots.length}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedScreenshot(null)}
                  className="rounded-full border border-[var(--border)] px-3 py-1 text-[var(--text-secondary)] hover:border-[var(--bright-orange)] hover:text-[var(--bright-orange)]"
                >
                  close
                </button>
              </figcaption>
            </figure>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showNextScreenshot();
              }}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-[var(--bright-orange)] bg-[var(--bg-panel)]/95 font-mono text-4xl leading-none text-[var(--bright-orange)] shadow-lift transition hover:bg-[var(--orange-soft)]"
              aria-label="Next screenshot"
            >
              ›
            </button>
          </div>
        </div>
      ) : null}
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
        {project.built.map((item) => (
          <li key={item}>- {item}</li>
        ))}
      </ul>
      {project.callout ? (
        <p className="mt-4 rounded-md border border-[var(--accent-green)]/40 bg-[var(--bg-elevated)] px-3 py-2 font-mono text-sm text-[var(--accent-green)]">
          {project.callout}
        </p>
      ) : null}
      <ProjectLinks project={project} />
    </article>
  );
}
