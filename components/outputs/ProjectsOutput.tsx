"use client";

import { profile } from "@/lib/profileData";
import type { ProjectItem } from "@/types";

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
  return (
    <div className="space-y-6">
      {profile.projects.map((project) => (
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

          <ProjectLinks project={project} />
        </article>
      ))}
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
