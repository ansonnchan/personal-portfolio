"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type RefObject } from "react";
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
  "Resolving portfolio...",
  "Connecting to user-friendly interface...",
  "HTTP request sent, awaiting response... 200 OK",
  "",
  `${profile.name} terminal ready.`,
  "Type 'help', 'ls', or select a command from the left.",
  "",
  `visitor@${profile.handle} ~ %`
];

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

function ChromeDots({ onMinimize, onMaximize }: { onMinimize: () => void; onMaximize: () => void }) {
  return (
    <div className="flex items-center gap-1.5">
      <button
        type="button"
        onClick={playDisabledClick}
        className="h-2.5 w-2.5 rounded-full bg-[var(--accent-red)]"
        aria-label="Close output terminal disabled"
      />
      <button
        type="button"
        onClick={onMinimize}
        className="h-2.5 w-2.5 rounded-full bg-[var(--accent-yellow)]"
        aria-label="Minimize output terminal"
      />
      <button
        type="button"
        onClick={onMaximize}
        className="h-2.5 w-2.5 rounded-full bg-[var(--accent-green)]"
        aria-label="Maximize output terminal"
      />
    </div>
  );
}

function PromptLine({ command }: { command: string }) {
  return (
    <div className="font-mono text-sm text-[var(--text-secondary)]">
      <span className="text-[var(--accent-green)]">visitor@{profile.handle}</span>
      <span> ~ % </span>
      <span className="text-[var(--command)]">{command}</span>
    </div>
  );
}

function WelcomeState() {
  return (
    <div className="space-y-1 p-5 font-mono text-sm leading-6 text-[var(--text-secondary)]">
      {welcomeLines.map((line, index) => (
        <p
          key={`${line}-${index}`}
          className={line === `${profile.name} terminal ready.` ? "pt-2 text-[var(--accent)]" : undefined}
        >
          {line || "\u00a0"}
        </p>
      ))}
    </div>
  );
}

function CommandBlockView({ block }: { block: CommandBlock }) {
  const blockRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (block.command === "cd projects" || block.command === "open nostalgia") {
      blockRef.current?.scrollIntoView({ block: "start" });
    }
  }, [block.command]);

  return (
    <article ref={blockRef} className="space-y-3 border-b border-[var(--border)] p-5 last:border-b-0">
      <PromptLine command={block.command} />
      <div className="font-mono text-sm text-[var(--text-primary)]">{block.output}</div>
    </article>
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
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const lastCommand = history[history.length - 1]?.command;

  useEffect(() => {
    if (lastCommand === "cd projects" || lastCommand === "open nostalgia") {
      return;
    }

    endRef.current?.scrollIntoView({ block: "end" });
  }, [history.length, lastCommand]);

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

  const inputLine = (
    <label
      className="flex items-center gap-2 px-5 py-4 font-mono text-sm"
      aria-label="Terminal command input"
    >
      <span className="shrink-0 text-[var(--accent-green)]">visitor@{profile.handle}</span>
      <span className="shrink-0 text-[var(--text-secondary)]">~ %</span>
      <input
        ref={inputRef}
        value={currentInput}
        onChange={(event) => setCurrentInput(event.target.value)}
        onKeyDown={handleKeyDown}
        className="min-w-0 flex-1 bg-transparent text-[var(--command)] caret-[var(--accent)] outline-none placeholder:text-[var(--text-muted)]"
        placeholder="help"
        autoComplete="off"
        spellCheck={false}
      />
    </label>
  );

  return (
    <section
      className={[
        "terminal-scan output-terminal flex overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] shadow-panel",
        isMaximized ? "terminal--maximized" : isMinimized ? "terminal--minimized" : "h-full min-h-0"
      ].join(" ")}
    >
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-10 items-center gap-3 border-b border-[var(--border)] bg-[var(--bg-elevated)] px-3">
          <ChromeDots
            onMinimize={() => {
              if (isMaximized) {
                setIsMaximized(false);
                setIsMinimized(false);
                return;
              }

              setIsMinimized(true);
            }}
            onMaximize={() => {
              if (isMinimized) {
                setIsMinimized(false);
                setIsMaximized(false);
                return;
              }

              if (!isMaximized) {
                setIsMaximized(true);
              }
            }}
          />
          <span className="font-mono text-xs font-semibold text-[var(--text-muted)]">
            visitor@{profile.handle} ~ %
          </span>
          <span className="ml-auto font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
            TERMINAL
          </span>
        </div>

        <div className={["min-h-0 flex-1 overflow-y-auto bg-[linear-gradient(180deg,var(--bg-panel),var(--bg-base))]", isMinimized ? "hidden" : ""].join(" ")}>
          <WelcomeState />
          {history.map((block) => <CommandBlockView key={block.id} block={block} />)}
          {inputLine}
          <div ref={endRef} />
        </div>
      </div>
    </section>
  );
}
