"use client";

import { motion } from "framer-motion";
import { profile } from "@/lib/profileData";
import type { ProjectItem } from "@/types";

function ProjectLinks({ project }: { project: ProjectItem }) {
  return (
    <div className="mt-4 flex flex-wrap gap-2 text-xs">
      <a
        href={project.github}
        target="_blank"
        rel="noreferrer"
        className="rounded-md border border-[var(--border)] px-2.5 py-1.5 text-[var(--link)] hover:bg-[var(--bg-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
        aria-label={`Open GitHub repository for ${project.name}`}
      >
        GitHub <span aria-hidden="true">-&gt;</span>
      </a>
      <a
        href={project.live}
        target="_blank"
        rel="noreferrer"
        className="rounded-md border border-[var(--border)] px-2.5 py-1.5 text-[var(--link)] hover:bg-[var(--bg-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
        aria-label={`Open live site for ${project.name}`}
      >
        Live <span aria-hidden="true">-&gt;</span>
      </a>
    </div>
  );
}

export function ProjectsOutput() {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {profile.projects.map((project) => (
        <motion.article
          key={project.id}
          className={[
            "rounded-lg border bg-[var(--bg-panel)] p-4 shadow-sm",
            project.featured ? "border-[var(--accent)]/80" : "border-[var(--border)]"
          ].join(" ")}
          whileHover={{ y: -2 }}
          transition={{ duration: 0.18 }}
        >
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-mono text-base font-semibold text-[var(--text-primary)]">{project.name}</h3>
            {project.featured ? (
              <span className="rounded-md bg-[var(--accent-dim)] px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-white">
                Featured
              </span>
            ) : null}
          </div>
          <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{project.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.stack.slice(0, 4).map((tag) => (
              <span key={tag} className="rounded-md bg-[var(--bg-elevated)] px-2 py-1 text-xs text-[var(--text-secondary)]">
                {tag}
              </span>
            ))}
          </div>
          <ProjectLinks project={project} />
          <p className="mt-4 text-xs text-[var(--text-muted)]">Open detail: open {project.id}</p>
        </motion.article>
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
    <motion.article
      className="rounded-lg border border-[var(--accent)]/80 bg-[var(--bg-panel)] p-5 shadow-sm"
      initial={{ opacity: 0.98 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.18 }}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">Project detail</p>
          <h3 className="mt-2 font-mono text-xl font-semibold text-[var(--accent)]">{project.name}</h3>
        </div>
        {project.featured ? (
          <span className="w-fit rounded-md bg-[var(--accent-dim)] px-2.5 py-1 text-xs text-white">Featured</span>
        ) : null}
      </div>
      <p className="mt-4 max-w-3xl text-sm leading-6 text-[var(--text-primary)]">{project.description}</p>
      <div className="mt-5">
        <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">Stack</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {project.stack.map((tag) => (
            <span key={tag} className="rounded-md border border-[var(--border)] bg-[var(--bg-elevated)] px-2.5 py-1.5 text-xs text-[var(--text-secondary)]">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <ProjectLinks project={project} />
    </motion.article>
  );
}
