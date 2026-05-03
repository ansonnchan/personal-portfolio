"use client";

import { useEffect, useRef, useState } from "react";
import { ChibiFunFacts } from "@/components/ChibiFunFacts";
import { ControlPanel } from "@/components/ControlPanel";
import { MusicPlayer } from "@/components/MusicPlayer";
import { OutputWindow } from "@/components/OutputWindow";
import { profile } from "@/lib/profileData";
import { useTerminal } from "@/lib/useTerminal";

type Theme = "dark" | "light";

function formatHeaderTime(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZoneName: "short"
  }).format(date);
}

function formatHeaderDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric"
  }).format(date);
}

export function SystemInterface() {
  const terminal = useTerminal();
  const { setCurrentInput } = terminal;
  const inputRef = useRef<HTMLInputElement>(null);
  const [theme, setTheme] = useState<Theme>("light");
  const [clock, setClock] = useState("--:--:-- PDT");
  const [dateLabel, setDateLabel] = useState("Saturday, May 2");

  useEffect(() => {
    function syncDateTime() {
      const now = new Date();
      setClock(formatHeaderTime(now));
      setDateLabel(formatHeaderDate(now));
    }

    syncDateTime();
    const timer = window.setInterval(syncDateTime, 1000);
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

  useEffect(() => {
    function handleTerminalCommand(event: Event) {
      const command = (event as CustomEvent<string>).detail;
      if (typeof command === "string") {
        terminal.runCommand(command);
      }
    }

    window.addEventListener("terminal:command", handleTerminalCommand);
    return () => window.removeEventListener("terminal:command", handleTerminalCommand);
  }, [terminal]);

  return (
    <div data-theme={theme} className="system-shell h-screen overflow-hidden bg-[var(--bg-base)] text-[var(--text-primary)]">
      <div className="flex h-full w-full flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <header className="terminal-scan flex-none rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] px-4 py-3 shadow-panel">
          <div className="grid gap-3 lg:grid-cols-[12rem_1fr_12rem] lg:items-start">
            <div className="space-y-3">
              <MusicPlayer />
            </div>
            <div className="min-w-0 text-center">
              <p className="font-mono text-sm text-[var(--text-secondary)]">
                <span className="text-[var(--accent-green)]">visitor@{profile.handle}</span> ~ % welcome friend
              </p>
              <h1 className="mt-1 font-mono text-3xl font-black tracking-normal text-[var(--text-primary)] sm:text-4xl">
                Anson&apos;s Terminal
                <span className="terminal-cursor ml-2 inline-block h-8 w-3 translate-y-1 bg-[var(--accent)]" />
              </h1>
              <p className="mt-1 text-sm font-semibold text-[var(--text-primary)]">Anson Chan &bull; CPEN @ UBC &bull; 陳雋希</p>
            </div>
            <div className="flex items-start justify-center gap-2 font-mono text-xs text-[var(--text-secondary)] lg:justify-end">
              <button
                type="button"
                onClick={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
                className="mt-1 p-1 opacity-80 transition hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={theme === "dark" ? "/assets/light_mode_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg" : "/assets/dark_mode_24dp_1F1F1F_FILL1_wght400_GRAD0_opsz24.svg"}
                  alt=""
                  className="h-5 w-5"
                />
              </button>
              <div className="flex flex-col items-stretch gap-2">
                <div className="rounded-md border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-2 text-right">
                  <time className="block text-[var(--text-primary)]">{clock}</time>
                  <span className="mt-1 block text-[var(--text-secondary)]">{dateLabel}</span>
                </div>
                <a
                  href={profile.resume}
                  download={profile.resumeFileName}
                  className="rounded-md border border-[var(--accent)] bg-[var(--accent)] px-2.5 py-1.5 text-center font-semibold text-white transition hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                >
                  Download resume
                </a>
              </div>
            </div>
          </div>
        </header>

        <main className="relative grid min-h-0 flex-1 gap-4 lg:grid-cols-[20rem_minmax(0,1fr)]">
          <div className="min-h-0">
            <ControlPanel
              activeModule={terminal.activeModule}
              onCommand={terminal.runCommand}
            >
              <ChibiFunFacts />
            </ControlPanel>
          </div>
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
