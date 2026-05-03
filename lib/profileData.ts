import type { Profile } from "@/types";

export const profile = {
  name: "Anson Chan",
  handle: "ansonnchan",
  role: "Software Engineer",
  status: "Open to selective opportunities",
  tagline: "Building reliable, human-centered software across product, systems, and AI workflows.",
  location: "Vancouver, Canada",
  bio: `I am a software engineer who likes making complex systems feel calm, legible, and useful. My work sits at the intersection of product engineering, backend architecture, and thoughtful developer experience.

I care about crisp interfaces, resilient services, and tools that give people more leverage without making them feel like they are operating machinery from another century.`,
  socials: {
    github: "https://github.com/ansonnchan",
    linkedin: "https://linkedin.com/in/ansonnchan",
    email: "ananryry180@gmail.com"
  },
  resume: "https://example.com/sohail_sarkar_resume.pdf",
  resumeFileName: "anson_chan_resume.pdf",
  system: {
    uptime: "3 years in software",
    build: "v1.0.0",
    lastUpdated: "May 2026"
  },
  education: [
    {
      school: "University of British Columbia",
      degree: "Bachelor of Applied Science - Computer Engineering",
      years: "Expected May 2029",
      notes: "Dean's List 2024W, 2025W",
    }
  ],
  experience: [
    {
      role: "Software Developer Intern",
      company: "Borrow'd",
      period: "January 2026 - April 2026",
      highlights: [
       "Shipped new features and performance improvements for a consumer lending platform for internal and external users.",
       "Streamlined the CI/CD pipeline by integrating automated testing and deployment workflows, reducing release times by 30%.",
      ]
    },
    {
      role: "Undergraduate Student Researcher",
      company: "University of South Australia",
  
      period: "June 2025 - August 2025",
      highlights: [
        "Computational modeling research under Dr. Terence Chan",
        "Developed a deterministic Conway's Game of Life engine for large-scale analysis of emergent behaviors in cellular automata.",
        "Matlab stuff."
      ]
    }
  ],
  skills: {
    languages: ["TypeScript", "Python", "Rust", "SQL"],
    frameworks: ["Next.js", "React", "FastAPI", "Node.js"],
    tools: ["Docker", "Git", "PostgreSQL", "Redis", "Vercel"],
    concepts: ["Systems Design", "ML Workflows", "Distributed Systems", "Observability"]
  },
  projects: [
    {
      id: "atlas",
      name: "Atlas Ops Console",
      description: "A command-driven operations dashboard for inspecting service health, deployment events, and incident timelines.",
      stack: ["Next.js", "TypeScript", "PostgreSQL", "Framer Motion"],
      github: "https://github.com/sohailsarkar/atlas",
      live: "https://atlas.example.com",
      featured: true
    },
    {
      id: "forge",
      name: "Forge Review Engine",
      description: "A lightweight code review assistant that turns repository signals into focused engineering checklists.",
      stack: ["Python", "FastAPI", "React", "Redis"],
      github: "https://github.com/sohailsarkar/forge",
      live: "https://forge.example.com",
      featured: true
    },
    {
      id: "signal",
      name: "Signal Notebook",
      description: "A research notebook for collecting experiments, comparing model runs, and preserving decision context.",
      stack: ["React", "TypeScript", "SQLite"],
      github: "https://github.com/sohailsarkar/signal",
      live: "https://signal.example.com",
      featured: false
    },
    {
      id: "pulse",
      name: "Pulse Habit Loop",
      description: "A privacy-first habit tracker that emphasizes momentum, reflection, and weekly planning rituals.",
      stack: ["Next.js", "TypeScript", "Tailwind CSS"],
      github: "https://github.com/sohailsarkar/pulse",
      live: "https://pulse.example.com",
      featured: false
    }
  ]
} satisfies Profile;
