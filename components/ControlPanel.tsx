"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { moduleSections } from "@/lib/commands";

type ControlPanelProps = {
  activeModule: string | null;
  onCommand: (command: string) => void;
  children?: ReactNode;
};

function ChromeDots() {
  function playDisabledClick() {
    const AudioContextClass =
      window.AudioContext ||
      (window as Window & typeof globalThis & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

    if (!AudioContextClass) {
      return;
    }

    const context = new AudioContextClass();
    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(660, context.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(990, context.currentTime + 0.08);
    gain.gain.setValueAtTime(0.0001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.12, context.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.13);

    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.14);
    oscillator.onended = () => void context.close();
  }

  return (
    <div className="flex items-center gap-1.5">
      <button
        type="button"
        onClick={playDisabledClick}
        className="h-2.5 w-2.5 rounded-full bg-[var(--accent-red)]"
        aria-label="Close commands panel disabled"
      />
      <button
        type="button"
        onClick={playDisabledClick}
        className="h-2.5 w-2.5 rounded-full bg-[var(--accent-yellow)]"
        aria-label="Minimize commands panel disabled"
      />
      <button
        type="button"
        onClick={playDisabledClick}
        className="h-2.5 w-2.5 rounded-full bg-[var(--accent-green)]"
        aria-label="Maximize commands panel disabled"
      />
    </div>
  );
}

function moduleKey(command: string) {
  if (command.startsWith("cat ")) {
    return command.replace("cat ", "").replace(".txt", "");
  }

  if (command === "cd projects") {
    return "projects";
  }

  if (command === "ls ./skills/") {
    return "skills";
  }

  if (command === "whereis socials") {
    return "whereis";
  }

  if (command === "open nostalgia") {
    return "nostalgia";
  }

  if (command.startsWith("wget ")) {
    return "resume";
  }

  return command;
}

export function ControlPanel({ activeModule, onCommand, children }: ControlPanelProps) {
  return (
    <aside className="flex h-full min-h-0 flex-col overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] shadow-panel">
      <div className="flex h-10 items-center justify-between border-b border-[var(--border)] bg-[var(--bg-elevated)] px-3">
        <ChromeDots />
        <span className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
          Commands
        </span>
      </div>

      <nav
        className="flex min-h-0 flex-1 gap-4 overflow-auto p-3 lg:block lg:space-y-4 lg:p-4"
        aria-label="Portfolio command modules"
      >
        <h2 className="mb-3 min-w-[14rem] shrink-0 text-center font-sans text-sm font-medium text-[var(--bright-orange)] lg:min-w-0">
          Try These Commands
        </h2>
        {moduleSections.map((section) => (
          <section key={section.title} className="min-w-[14rem] shrink-0 lg:min-w-0">
            <h2 className="mb-1.5 border-b border-[var(--border)] pb-1.5 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
              {section.title}
            </h2>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = activeModule === moduleKey(item.command);

                return (
                  <button
                    key={item.command}
                    type="button"
                    onClick={() => onCommand(item.command)}
                    className={[
                      "group relative w-full rounded-md border-l-2 px-3 py-1.5 text-left transition",
                      "hover:border-[var(--bright-orange)] hover:bg-[var(--orange-soft)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]",
                      isActive
                        ? "border-[var(--bright-orange)] bg-[var(--orange-soft)]"
                        : "border-transparent bg-transparent"
                    ].join(" ")}
                    aria-pressed={isActive}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="active-module"
                        className="absolute inset-y-1 left-0 w-1 rounded-full bg-[var(--bright-orange)]"
                        transition={{ duration: 0.2 }}
                      />
                    ) : null}
                    <span className="block font-mono text-sm text-[var(--command)]">{item.command}</span>
                    <span className="mt-0.5 block font-sans text-xs text-[var(--text-secondary)]">{item.description}</span>
                  </button>
                );
              })}
            </div>
          </section>
        ))}
      </nav>
      {children ? <div className="flex-none border-t border-[var(--border)] p-3">{children}</div> : null}
    </aside>
  );
}
