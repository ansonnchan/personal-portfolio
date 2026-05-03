import { profile } from "@/lib/profileData";

const groups = [
  ["languages/", profile.skills.languages],
  ["frameworks/", profile.skills.frameworks],
  ["cloud_devops/", profile.skills.devops],
  ["ai_ml/", profile.skills.machine_learning]
] as const;

export function SkillsOutput() {
  return (
    <div className="space-y-4">
      {groups.map(([label, skills]) => (
        <section key={label} className="grid gap-3 rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] p-4 sm:grid-cols-[10.5rem_1fr]">
          <h3 className="font-mono text-sm font-semibold text-[var(--bright-orange)]">{label}</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] px-2.5 py-1 font-mono text-xs text-[var(--text-primary)] transition hover:border-[var(--bright-orange)] hover:bg-[var(--orange-soft)] hover:text-[var(--bright-orange)]"
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
