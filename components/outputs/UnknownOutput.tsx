"use client";

export function UnknownOutput({ command }: { command: string }) {
  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] p-4 text-sm leading-6">
      <p className="text-[var(--accent-red)]">Command not recognized: {command}</p>
      <p className="mt-2 text-[var(--text-secondary)]">Type &apos;help&apos; or select a command from the left.</p>
    </div>
  );
}
