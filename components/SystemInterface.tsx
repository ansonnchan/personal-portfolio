"use client";

import { useEffect, useRef, useState } from "react";
import { ControlPanel } from "@/components/ControlPanel";
import { OutputWindow } from "@/components/OutputWindow";
import { profile } from "@/lib/profileData";
import { useTerminal } from "@/lib/useTerminal";

type Theme = "dark" | "light";

function formatClock(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  }).format(date);
}

export function SystemInterface() {
  const terminal = useTerminal();
  const { setCurrentInput } = terminal;
  const inputRef = useRef<HTMLInputElement>(null);
  const [theme, setTheme] = useState<Theme>("dark");
  const [clock, setClock] = useState("--:--:--");

  useEffect(() => {
    setClock(formatClock(new Date()));
    const timer = window.setInterval(() => setClock(formatClock(new Date())), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    function handleGlobalKeyDown(event: KeyboardEvent) {
      const target = event.target;
      const isTyping =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement;

      if (event.key === "/" && !isTyping) {
        event.preventDefault();
        inputRef.current?.focus();
      }

      if (event.key === "Escape" && isTyping) {
        setCurrentInput("");
      }
    }

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [setCurrentInput]);

  return (
    <div data-theme={theme} className="system-shell min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)]">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <header className="rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] px-4 py-3 shadow-panel">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="font-sans text-sm font-semibold uppercase tracking-[0.16em] text-[var(--text-primary)]">
                {profile.name} <span className="text-[var(--text-muted)]">{"// System Interface"}</span>
              </h1>
              <p className="mt-1 max-w-3xl text-sm text-[var(--text-secondary)]">{profile.tagline}</p>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs text-[var(--text-secondary)]">
              <time className="rounded-md border border-[var(--border)] bg-[var(--bg-elevated)] px-2.5 py-1.5">
                {clock}
              </time>
              <button
                type="button"
                onClick={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
                className="rounded-md border border-[var(--border)] bg-[var(--bg-elevated)] px-2.5 py-1.5 text-[var(--text-primary)] transition hover:bg-[var(--bg-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              >
                {theme === "dark" ? "Light" : "Dark"}
              </button>
            </div>
          </div>
        </header>

        <main className="grid min-h-0 flex-1 gap-4 lg:grid-cols-[minmax(17rem,28%)_1fr]">
          <ControlPanel activeModule={terminal.activeModule} onCommand={terminal.runCommand} />
          <OutputWindow
            history={terminal.history}
            currentInput={terminal.currentInput}
            setCurrentInput={terminal.setCurrentInput}
            runCommand={terminal.runCommand}
            navigateHistory={terminal.navigateHistory}
            completeInput={terminal.completeInput}
            inputRef={inputRef}
          />
        </main>
      </div>
    </div>
  );
}
