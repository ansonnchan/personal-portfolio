import { profile } from "@/lib/profileData";

export function EducationOutput() {
  return (
    <div className="space-y-3">
      {profile.education.map((item) => (
        <article
          key={`${item.school}-${item.degree}`}
          className="rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] p-4"
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3 className="font-mono text-base font-semibold text-[var(--text-primary)]">{item.school}</h3>
              <p className="mt-1 text-sm text-[var(--accent)]">{item.degree}</p>
            </div>
            <div className="text-left sm:text-right">
              <span className="block font-mono text-xs font-normal text-[var(--text-secondary)]">{item.years}</span>
              {item.location ? <span className="mt-1 block text-xs text-[var(--text-muted)]">{item.location}</span> : null}
            </div>
          </div>

          <div className="mt-5">
            <section>
              <h4 className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
                Achievements
              </h4>
              <p className="mt-2 text-sm leading-6 text-[var(--accent-green)]">{item.notes}</p>
            </section>
          </div>
        </article>
      ))}
    </div>
  );
}
