"use client";

import { motion } from "framer-motion";
import { moduleSections } from "@/lib/commands";

type ControlPanelProps = {
  activeModule: string | null;
  onCommand: (command: string) => void;
};

function ChromeDots() {
  return (
    <div className="flex items-center gap-1.5" aria-hidden="true">
      <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent-red)]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent-yellow)]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent-green)]" />
    </div>
  );
}

export function ControlPanel({ activeModule, onCommand }: ControlPanelProps) {
  return (
    <aside className="overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] shadow-panel">
      <div className="flex h-10 items-center justify-between border-b border-[var(--border)] bg-[var(--bg-elevated)] px-3">
        <ChromeDots />
        <span className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
          Control Panel
        </span>
      </div>

      <nav
        className="flex gap-4 overflow-x-auto p-3 lg:block lg:space-y-6 lg:overflow-x-visible lg:p-4"
        aria-label="Portfolio command modules"
      >
        {moduleSections.map((section) => (
          <section key={section.title} className="min-w-[14rem] shrink-0 lg:min-w-0">
            <h2 className="mb-2 border-b border-[var(--border)] pb-2 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
              {section.title}
            </h2>
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = activeModule === item.command;

                return (
                  <button
                    key={item.command}
                    type="button"
                    onClick={() => onCommand(item.command)}
                    className={[
                      "group relative w-full rounded-md border-l-2 px-3 py-2.5 text-left transition",
                      "hover:bg-[var(--bg-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]",
                      isActive
                        ? "border-[var(--accent)] bg-[var(--bg-hover)]"
                        : "border-transparent bg-transparent"
                    ].join(" ")}
                    aria-pressed={isActive}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="active-module"
                        className="absolute inset-y-1 left-0 w-1 rounded-full bg-[var(--accent)]"
                        transition={{ duration: 0.2 }}
                      />
                    ) : null}
                    <span className="block font-mono text-sm text-[var(--text-primary)]">{item.command}</span>
                    <span className="mt-0.5 block font-sans text-xs text-[var(--text-secondary)]">{item.description}</span>
                  </button>
                );
              })}
            </div>
          </section>
        ))}
      </nav>
    </aside>
  );
}
