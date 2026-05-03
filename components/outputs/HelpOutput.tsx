"use client";

import type { CommandDefinition } from "@/types";

export function HelpOutput({ commands }: { commands: CommandDefinition[] }) {
  return (
    <div className="overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--bg-panel)]">
      <div className="grid grid-cols-[minmax(7rem,0.8fr)_1.5fr] border-b border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-2 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
        <span>Command</span>
        <span>Description</span>
      </div>
      {commands.map((command) => (
        <div
          key={command.name}
          className="grid grid-cols-[minmax(7rem,0.8fr)_1.5fr] gap-3 border-b border-[var(--border)] px-4 py-3 text-sm last:border-b-0"
        >
          <code className="font-mono text-[var(--accent)]">{command.name}</code>
          <span className="text-[var(--text-secondary)]">{command.description}</span>
        </div>
      ))}
    </div>
  );
}
