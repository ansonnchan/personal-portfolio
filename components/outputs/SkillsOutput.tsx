const skillGroups = [
  {
    title: "Languages",
    skills: ["TypeScript", "JavaScript", "Python", "Java", "C++", "SQL", "HTML/CSS"]
  },
  {
    title: "Frontend & Libraries",
    skills: ["React", "Next.js", "Tailwind CSS", "three.js", "Angular", "Vue.js"]
  },
  {
    title: "Backend & Frameworks",
    skills: ["Node.js", "Django", "Spring Boot", "FastAPI", "GraphQL"]
  },
  {
    title: "Cloud & DevOps",
    skills: ["AWS", "Docker", "Kubernetes", "Git", "CI/CD"]
  },
  {
    title: "Databases",
    skills: ["PostgreSQL", "Redis"]
  },
  {
    title: "AI & ML",
    skills: ["LangGraph", "LangChain", "PyTorch", "TensorFlow", "OpenCV"]
  }
];

export function SkillsOutput() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {skillGroups.map((group, index) => (
        <section
          key={group.title}
          className={[
            "rounded-xl border bg-[var(--bg-panel)] p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[var(--accent-green)] hover:shadow-[0_0_0_2px_var(--accent-green),0_0_24px_rgba(36,122,82,0.38)]",
            index === 1
              ? "border-[var(--text-muted)] shadow-panel"
              : "border-[var(--border)]"
          ].join(" ")}
        >
          <h3 className="font-sans text-lg font-bold text-[var(--text-primary)]">{group.title}</h3>
          <div className="mt-3 h-0.5 w-full bg-[var(--text-muted)]" />
          <div className="mt-4 flex flex-wrap gap-2">
            {group.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-md bg-[var(--bg-elevated)] px-3 py-1.5 font-sans text-sm font-medium text-[var(--text-secondary)] transition hover:bg-[var(--orange-soft)] hover:text-[var(--bright-orange)]"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
