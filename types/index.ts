import type { ReactNode } from "react";

export type SocialKey = "github" | "linkedin" | "email";

export type EducationItem = {
  school: string;
  degree: string;
  years: string;
  coursework: string[];
  notes: string;
  
};

export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  highlights: string[];
};

export type SkillGroups = {
  languages: string[];
  frameworks: string[];
  devops: string[];
  machine_learning: string[];
};

export type ProjectItem = {
  id: string;
  name: string;
  description: string;
  stack: string[];
  github: string;
  live: string;
  featured: boolean;
};

export type Profile = {
  name: string;
  handle: string;
  role: string;
  status: string;
  tagline: string;
  location: string;
  bio: string;
  socials: Record<SocialKey, string>;
  resume: string;
  resumeFileName: string;
  system: {
    uptime: string;
    build: string;
    lastUpdated: string;
  };
  education: EducationItem[];
  experience: ExperienceItem[];
  skills: SkillGroups;
  projects: ProjectItem[];
};

export type CommandBlock = {
  id: string;
  command: string;
  output: ReactNode;
  createdAt: number;
};

export type CommandHandler = (args: string[], rawInput: string) => ReactNode;

export type CommandDefinition = {
  name: string;
  description: string;
  activeModule?: string;
  handler: CommandHandler;
};
