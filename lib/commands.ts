import React from "react";
import { AboutOutput } from "@/components/outputs/AboutOutput";
import { ContactOutput } from "@/components/outputs/ContactOutput";
import { EducationOutput } from "@/components/outputs/EducationOutput";
import { ArchivedExperienceOutput, ExperienceOutput } from "@/components/outputs/ExperienceOutput";
import { HelpOutput } from "@/components/outputs/HelpOutput";
import { NostalgiaOutput } from "@/components/outputs/NostalgiaOutput";
import { ProjectsOutput } from "@/components/outputs/ProjectsOutput";
import { ResumeOutput } from "@/components/outputs/ResumeOutput";
import { SkillsOutput } from "@/components/outputs/SkillsOutput";
import { SystemOutput } from "@/components/outputs/SystemOutput";
import { UnknownOutput } from "@/components/outputs/UnknownOutput";
import type { CommandDefinition } from "@/types";

type CommandSpec = {
  name: string;
  description: string;
  activeModule?: string | null;
};

const portfolioFiles = ["about.txt", "education.txt", "experience.txt", "archives/old_experience.txt", "projects/", "skills/", "resume.pdf"];

const commandSpecs = [
  { name: "help", 
    description: "Show all available commands with descriptions", 
    activeModule: "help" },
  { name: "ls", 
    description: "List portfolio files", 
    activeModule: 
    "system" },
  { name: "cat about.txt", 
    description: "Display bio, identity, and quick facts", 
    activeModule: "about" },
  { name: "cat education.txt", 
    description: "Show academic background", 
    activeModule: "education" },
  { name: "cat experience.txt", 
    description: "Show work history and impact notes", 
    activeModule: "experience" },
  { name: "cd projects", 
    description: "View all projects", 
    activeModule: "projects" },
  { name: "ls ./skills/", 
    description: "Show tech stack", 
    activeModule: "skills" },
  // { name: "open [project-id]", 
  //   description: "Print detailed CLI output for a project", 
  //   activeModule: "projects" },
  { name: "open nostalgia", 
    description: "Open old-photo gallery", 
    activeModule: "nostalgia" },
  { name: "cat experience.txt [id]", 
    description: "Print detailed CLI output for an experience", 
    activeModule: "experience" },
  { name: "whereis socials", 
    description: "Show links and email", 
    activeModule: "whereis" },
  { name: "wget resume.pdf", 
    description: "Download resume with terminal progress", 
    activeModule: "resume" },
  { name: "system", 
    description: "Run interface diagnostics", 
    activeModule: "system" },
  { name: "clear", 
    description: "Clear the output log", 
    activeModule: null }
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
      { command: "cat about.txt", description: "About Me" },
      { command: "system", description: "Runtime diagnostics" }
    ]
  },
  {
    title: "WORK",
    items: [
      { command: "cat experience.txt", description: "Work history" },
      { command: "cat education.txt", description: "Academic background" }
    ]
  },
  {
    title: "BUILD",
    items: [
      { command: "cd projects", description: "All projects" },
      { command: "ls ./skills/", description: "Technical stack" },
      { command: "open nostalgia", description: "Old photos" }
    ]
  },
  {
    title: "CONNECT",
    items: [
      { command: "whereis socials", description: "Links and email" },
      { command: "wget resume.pdf", description: "Download CV" }
    ]
  }
] as const;

const loadedModules = moduleSections.flatMap((section) => section.items.map((item) => item.command));

const activeModuleByCatFile: Record<string, string> = {
  "about.txt": "about",
  "education.txt": "education",
  "experience.txt": "experience",
  "archives/old_experience.txt": "experience",
  "projects.txt": "projects",
  "skills.txt": "skills"
};

function defineCommand(spec: CommandSpec, handler: CommandDefinition["handler"]): CommandDefinition {
  return {
    name: spec.name,
    description: spec.description,
    activeModule: spec.activeModule ?? undefined,
    handler
  };
}

function PortfolioTreeOutput() {
  const tree = [
    { path: "app/", note: "routes, layout, globals" },
    { path: "components/", note: "terminal windows + output views" },
    { path: "lib/", note: "profile data + commands" },
    { path: "projects/", note: "> portfolio, vent.ai, borrow'd, contact card" },
    { path: "skills/", note: "languages, frameworks, cloud_devops, ai_ml" },
    { path: "public/assets/", note: "icons, photos, resume, audio" }
  ];

  return React.createElement(
    "div",
    { className: "space-y-2 font-mono text-sm leading-6" },
    React.createElement(
      "p",
      { className: "text-[var(--text-secondary)]" },
      React.createElement("span", { className: "text-[var(--accent-green)]" }, "personal-portfolio/"),
      " architecture"
    ),
    React.createElement(
      "div",
      { className: "rounded-md border border-[var(--border)] bg-[var(--bg-elevated)] p-3" },
      tree.map((item, index) =>
        React.createElement(
          "p",
          { key: item.path, className: "flex flex-wrap gap-x-2" },
          React.createElement("span", { className: "text-[var(--text-muted)]" }, index === tree.length - 1 ? "`--" : "|--"),
          React.createElement("span", { className: "text-[var(--accent-green)]" }, item.path),
          React.createElement("span", { className: "text-[var(--text-secondary)]" }, item.note)
        )
      )
    )
  );
}

export const commandRegistry: Record<string, CommandDefinition> = {
  help: defineCommand(commandSpecs[0], () => React.createElement(HelpOutput, { commands: helpCommands })),
  cat: defineCommand(commandSpecs[2], (args) => {
    const file = args[0]?.toLowerCase();
    const detailId = args[1] ?? "";

    if (file === "about.txt") return React.createElement(AboutOutput);
    if (file === "education.txt") return React.createElement(EducationOutput);
    if (file === "experience.txt") return React.createElement(ExperienceOutput, { detailId });
    if (file === "archives/old_experience.txt") return React.createElement(ArchivedExperienceOutput);
    if (file === "projects.txt") return React.createElement(ProjectsOutput);
    if (file === "skills.txt") return React.createElement(SkillsOutput);

    return React.createElement(UnknownOutput, { command: `cat ${args.join(" ")}` });
  }),
  about: defineCommand(commandSpecs[2], () => React.createElement(AboutOutput)),
  education: defineCommand(commandSpecs[3], () => React.createElement(EducationOutput)),
  experience: defineCommand(commandSpecs[4], () => React.createElement(ExperienceOutput)),
  projects: defineCommand(commandSpecs[5], () => React.createElement(ProjectsOutput)),
  skills: defineCommand(commandSpecs[6], () => React.createElement(SkillsOutput)),
  cd: defineCommand(commandSpecs[5], (args) =>
    args[0]?.toLowerCase() === "projects"
      ? React.createElement(ProjectsOutput)
      : React.createElement(UnknownOutput, { command: `cd ${args.join(" ")}` })
  ),
  ls: defineCommand(commandSpecs[1], (args) => {
    const target = args[0]?.toLowerCase();

    if (target === "./skills/" || target === "./skills" || target === "skills/" || target === "skills") {
      return React.createElement(SkillsOutput);
    }

    if (!target) {
      return React.createElement(PortfolioTreeOutput);
    }

    return React.createElement(UnknownOutput, { command: `ls ${args.join(" ")}` });
  }),
  open: defineCommand(commandSpecs[7], (args) =>
    args[0]?.toLowerCase() === "nostalgia"
      ? React.createElement(NostalgiaOutput)
      : React.createElement(UnknownOutput, { command: `open ${args.join(" ")}` })
  ),
  whereis: defineCommand(commandSpecs[9], (args) =>
    args[0]?.toLowerCase() === "socials"
      ? React.createElement(ContactOutput)
      : React.createElement(UnknownOutput, { command: `whereis ${args.join(" ")}` })
  ),
  wget: defineCommand(commandSpecs[10], (args) =>
    args[0]?.toLowerCase() === "resume.pdf"
      ? React.createElement(ResumeOutput)
      : React.createElement(UnknownOutput, { command: `wget ${args.join(" ")}` })
  ),
  resume: defineCommand(commandSpecs[10], () => React.createElement(ResumeOutput)),
  system: defineCommand(commandSpecs[11], () => React.createElement(SystemOutput, { modules: loadedModules })),
  clear: defineCommand(commandSpecs[12], () => null)
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
    activeModule:
      base === "cat"
        ? activeModuleByCatFile[args[0]?.toLowerCase() ?? ""] ?? null
        : base === "cd" && args[0]?.toLowerCase() === "projects"
          ? "projects"
        : base === "ls" && args[0]?.toLowerCase().startsWith("./skills")
          ? "skills"
          : base === "open" && args[0]?.toLowerCase() === "nostalgia"
            ? "nostalgia"
            : command.activeModule ?? null
  };
}

export function isResumeCommand(input: string) {
  const { base, args } = splitCommand(input);
  return base === "resume" || (base === "wget" && args[0]?.toLowerCase() === "resume.pdf");
}

export function autocompleteCommand(input: string) {
  const leadingSpace = input.match(/^\s*/)?.[0] ?? "";
  const normalized = input.trimStart();
  const lower = normalized.toLowerCase();

  if (!lower) {
    return input;
  }

  if (lower.startsWith("cat ")) {
    const fileQuery = lower.slice(4);
    const match = portfolioFiles.find((file) => file.startsWith(fileQuery));
    return match ? `${leadingSpace}cat ${match}` : input;
  }

  if (lower.startsWith("cd ")) {
    return "projects".startsWith(lower.slice(3)) ? `${leadingSpace}cd projects` : input;
  }

  if (lower.startsWith("whereis ")) {
    return "socials".startsWith(lower.slice(8)) ? `${leadingSpace}whereis socials` : input;
  }

  if (lower.startsWith("ls ")) {
    const target = "./skills/";
    return target.startsWith(lower.slice(3)) ? `${leadingSpace}ls ./skills/` : input;
  }

  if (lower.startsWith("wget ")) {
    return "resume.pdf".startsWith(lower.slice(5)) ? `${leadingSpace}wget resume.pdf` : input;
  }

  if (lower.startsWith("open ")) {
    const targetQuery = lower.slice(5);
    if ("nostalgia".startsWith(targetQuery)) {
      return `${leadingSpace}open nostalgia`;
    }
    return input;
  }

  const commandNames = Object.keys(commandRegistry);
  const match = commandNames.find((command) => command.startsWith(lower));

  if (match === "open" && !lower.includes(" ")) {
    return `${leadingSpace}open `;
  }

  if (match === "cat" && !lower.includes(" ")) {
    return `${leadingSpace}cat `;
  }

  if (match === "wget" && !lower.includes(" ")) {
    return `${leadingSpace}wget `;
  }

  if (match === "whereis" && !lower.includes(" ")) {
    return `${leadingSpace}whereis `;
  }

  if (match === "cd" && !lower.includes(" ")) {
    return `${leadingSpace}cd `;
  }

  return match ? `${leadingSpace}${match}` : input;
}
