import React from "react";
import { AboutOutput } from "@/components/outputs/AboutOutput";
import { ContactOutput } from "@/components/outputs/ContactOutput";
import { EducationOutput } from "@/components/outputs/EducationOutput";
import { ExperienceOutput } from "@/components/outputs/ExperienceOutput";
import { HelpOutput } from "@/components/outputs/HelpOutput";
import { OpenProjectOutput, ProjectsOutput } from "@/components/outputs/ProjectsOutput";
import { ResumeOutput } from "@/components/outputs/ResumeOutput";
import { SkillsOutput } from "@/components/outputs/SkillsOutput";
import { SystemOutput } from "@/components/outputs/SystemOutput";
import { UnknownOutput } from "@/components/outputs/UnknownOutput";
import { profile } from "@/lib/profileData";
import type { CommandDefinition } from "@/types";

type CommandSpec = {
  name: string;
  description: string;
  activeModule?: string | null;
};

const commandSpecs = [
  { name: "help", description: "Show all available commands with descriptions", activeModule: "help" },
  { name: "about", description: "Display bio, identity, and quick facts", activeModule: "about" },
  { name: "experience", description: "Show work history and impact notes", activeModule: "experience" },
  { name: "education", description: "Show academic background", activeModule: "education" },
  { name: "skills", description: "Show grouped technical stack", activeModule: "skills" },
  { name: "projects", description: "Show all projects", activeModule: "projects" },
  { name: "open [project-id]", description: "Open a detailed project view", activeModule: "projects" },
  { name: "contact", description: "Show links and email", activeModule: "contact" },
  { name: "resume", description: "Open the resume URL", activeModule: "resume" },
  { name: "system", description: "Run interface diagnostics", activeModule: "system" },
  { name: "clear", description: "Clear the output log", activeModule: null }
] satisfies CommandSpec[];

const helpCommands = commandSpecs.map((command) => ({
  name: command.name,
  description: command.description,
  activeModule: command.activeModule ?? undefined,
  handler: () => null
}));

export const moduleSections = [
  {
    title: "SYSTEM",
    items: [
      { command: "about", description: "Personal info" },
      { command: "system", description: "Runtime diagnostics" }
    ]
  },
  {
    title: "WORK",
    items: [
      { command: "experience", description: "Work history" },
      { command: "education", description: "Academic background" }
    ]
  },
  {
    title: "BUILD",
    items: [
      { command: "projects", description: "All projects" },
      { command: "skills", description: "Technical stack" }
    ]
  },
  {
    title: "CONNECT",
    items: [
      { command: "contact", description: "Links and email" },
      { command: "resume", description: "Download CV" }
    ]
  }
] as const;

const loadedModules = moduleSections.flatMap((section) => section.items.map((item) => item.command));

function defineCommand(spec: CommandSpec, handler: CommandDefinition["handler"]): CommandDefinition {
  return {
    name: spec.name,
    description: spec.description,
    activeModule: spec.activeModule ?? undefined,
    handler
  };
}

export const commandRegistry: Record<string, CommandDefinition> = {
  help: defineCommand(commandSpecs[0], () => React.createElement(HelpOutput, { commands: helpCommands })),
  about: defineCommand(commandSpecs[1], () => React.createElement(AboutOutput)),
  experience: defineCommand(commandSpecs[2], () => React.createElement(ExperienceOutput)),
  education: defineCommand(commandSpecs[3], () => React.createElement(EducationOutput)),
  skills: defineCommand(commandSpecs[4], () => React.createElement(SkillsOutput)),
  projects: defineCommand(commandSpecs[5], () => React.createElement(ProjectsOutput)),
  open: defineCommand(commandSpecs[6], (args) => React.createElement(OpenProjectOutput, { projectId: args[0] ?? "" })),
  contact: defineCommand(commandSpecs[7], () => React.createElement(ContactOutput)),
  resume: defineCommand(commandSpecs[8], () => React.createElement(ResumeOutput)),
  system: defineCommand(commandSpecs[9], () => React.createElement(SystemOutput, { modules: loadedModules })),
  clear: defineCommand(commandSpecs[10], () => null)
};

export function splitCommand(input: string) {
  const normalized = input.trim().replace(/\s+/g, " ");
  const [base = "", ...args] = normalized.split(" ");

  return {
    normalized,
    base: base.toLowerCase(),
    args
  };
}

export function parseCommand(input: string) {
  const { normalized, base, args } = splitCommand(input);
  const command = commandRegistry[base];

  if (!command) {
    return {
      command: normalized,
      base,
      output: React.createElement(UnknownOutput, { command: normalized || input }),
      activeModule: null
    };
  }

  return {
    command: normalized,
    base,
    output: command.handler(args, normalized),
    activeModule: command.activeModule ?? null
  };
}

export function isResumeCommand(input: string) {
  return splitCommand(input).base === "resume";
}

export function autocompleteCommand(input: string) {
  const leadingSpace = input.match(/^\s*/)?.[0] ?? "";
  const normalized = input.trimStart();
  const lower = normalized.toLowerCase();

  if (!lower) {
    return input;
  }

  if (lower.startsWith("open ")) {
    const projectQuery = lower.slice(5);
    const match = profile.projects.find((project) => project.id.toLowerCase().startsWith(projectQuery));
    return match ? `${leadingSpace}open ${match.id}` : input;
  }

  const commandNames = Object.keys(commandRegistry);
  const match = commandNames.find((command) => command.startsWith(lower));

  if (match === "open" && !lower.includes(" ")) {
    return `${leadingSpace}open `;
  }

  return match ? `${leadingSpace}${match}` : input;
}
