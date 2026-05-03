"use client";

import { useEffect, useRef, type KeyboardEvent, type RefObject } from "react";
import { motion } from "framer-motion";
import { profile } from "@/lib/profileData";
import type { CommandBlock } from "@/types";

type OutputWindowProps = {
  history: CommandBlock[];
  currentInput: string;
  setCurrentInput: (value: string) => void;
  runCommand: (command: string) => void;
  navigateHistory: (direction: "up" | "down") => void;
  completeInput: () => void;
  inputRef: RefObject<HTMLInputElement>;
};

const welcomeLines = [
  "> Initializing interface...",
  "> Loading modules...",
  "> System ready. All modules nominal.",
  "",
  `${profile.name} System Interface v1.0`,
  "Type 'help' or select a module from the control panel.",
  "",
  `visitor@${profile.handle} ~ %`
];

function ChromeDots() {
  return (
    <div className="flex items-center gap-1.5" aria-hidden="true">
      <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent-red)]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent-yellow)]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent-green)]" />
    </div>
  );
}

function PromptLine({ command }: { command: string }) {
  return (
    <div className="font-mono text-sm text-[var(--text-secondary)]">
      <span className="text-[var(--accent-green)]">visitor@{profile.handle}</span>
      <span> ~ % </span>
      <span className="text-[var(--text-primary)]">{command}</span>
    </div>
  );
}

function WelcomeState() {
  return (
    <div className="space-y-1 p-5 font-mono text-sm leading-6 text-[var(--text-secondary)]">
      {welcomeLines.map((line, index) => (
        <motion.p
          key={`${line}-${index}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.055, duration: 0.18 }}
          className={line === `${profile.name} System Interface v1.0` ? "pt-2 text-[var(--accent)]" : undefined}
        >
          {line || "\u00a0"}
        </motion.p>
      ))}
    </div>
  );
}

function CommandBlockView({ block }: { block: CommandBlock }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="space-y-3 border-b border-[var(--border)] p-5 last:border-b-0"
    >
      <PromptLine command={block.command} />
      <div className="font-mono text-sm text-[var(--text-primary)]">{block.output}</div>
    </motion.article>
  );
}

export function OutputWindow({
  history,
  currentInput,
  setCurrentInput,
  runCommand,
  navigateHistory,
  completeInput,
  inputRef
}: OutputWindowProps) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [history.length]);

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      runCommand(currentInput);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      navigateHistory("up");
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      navigateHistory("down");
      return;
    }

    if (event.key === "Tab") {
      event.preventDefault();
      completeInput();
    }
  }

  return (
    <section className="flex min-h-[34rem] overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] shadow-panel lg:min-h-0">
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-10 items-center justify-between border-b border-[var(--border)] bg-[var(--bg-elevated)] px-3">
          <ChromeDots />
          <span className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
            Output
          </span>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto bg-[linear-gradient(180deg,var(--bg-panel),var(--bg-base))]">
          {history.length === 0 ? <WelcomeState /> : history.map((block) => <CommandBlockView key={block.id} block={block} />)}
          <div ref={endRef} />
        </div>

        <label
          className="flex items-center gap-2 border-t border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-3 font-mono text-sm focus-within:bg-[var(--bg-hover)]"
          aria-label="Terminal command input"
        >
          <span className="shrink-0 text-[var(--accent-green)]">visitor@{profile.handle}</span>
          <span className="shrink-0 text-[var(--text-secondary)]">~ %</span>
          <input
            ref={inputRef}
            value={currentInput}
            onChange={(event) => setCurrentInput(event.target.value)}
            onKeyDown={handleKeyDown}
            className="min-w-0 flex-1 bg-transparent text-[var(--text-primary)] caret-[var(--accent)] outline-none placeholder:text-[var(--text-muted)]"
            placeholder="help"
            autoComplete="off"
            spellCheck={false}
          />
        </label>
      </div>
    </section>
  );
}
