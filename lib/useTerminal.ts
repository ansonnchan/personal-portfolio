"use client";

import { useCallback, useState } from "react";
import { autocompleteCommand, parseCommand, splitCommand } from "@/lib/commands";
import type { CommandBlock } from "@/types";

type HistoryDirection = "up" | "down";

function makeId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function useTerminal() {
  const [history, setHistory] = useState<CommandBlock[]>([]);
  const [inputHistory, setInputHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [currentInput, setCurrentInput] = useState("");
  const [activeModule, setActiveModule] = useState<string | null>(null);

  const clearHistory = useCallback(() => {
    setHistory([]);
    setActiveModule(null);
    setCurrentInput("");
    setHistoryIndex(-1);
  }, []);

  const runCommand = useCallback((rawInput: string) => {
    const commandText = rawInput.trim();

    if (!commandText) {
      setCurrentInput("");
      return;
    }

    setInputHistory((previous) => [...previous, commandText]);
    setHistoryIndex(-1);

    const { base } = splitCommand(commandText);

    if (base === "clear") { //clear terminal histor y if user types 'clear'
      clearHistory();
      return;
    }

    const parsed = parseCommand(commandText);

    setHistory((previous) => [
      ...previous,
      {
        id: makeId(),
        command: parsed.command,
        output: parsed.output,
        createdAt: Date.now()
      }
    ]);
    setActiveModule(parsed.activeModule);
    setCurrentInput("");

  }, [clearHistory]);

  const navigateHistory = useCallback((direction: HistoryDirection) => {
    if (inputHistory.length === 0) {
      return;
    }

    if (direction === "up") {
      const nextIndex = historyIndex === -1 ? inputHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setCurrentInput(inputHistory[nextIndex] ?? "");
      return;
    }

    const nextIndex = historyIndex === -1 ? -1 : historyIndex + 1;

    if (nextIndex >= inputHistory.length || nextIndex === -1) {
      setHistoryIndex(-1);
      setCurrentInput("");
      return;
    }

    setHistoryIndex(nextIndex);
    setCurrentInput(inputHistory[nextIndex] ?? "");
  }, [historyIndex, inputHistory]);

  const completeInput = useCallback(() => {
    setCurrentInput((value) => autocompleteCommand(value));
  }, []);

  return {
    history,
    inputHistory,
    historyIndex,
    currentInput,
    activeModule,
    setCurrentInput,
    runCommand,
    clearHistory,
    navigateHistory,
    completeInput
  };
}
