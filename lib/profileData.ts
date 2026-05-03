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
  resume: "/anson_chan_resume.pdf",
  resumeFileName: "anson_chan_resume.pdf",
  assets: {
    favicon: "/assets/favicon.png",
    profileCurrent: "/assets/adult_pfp-modified.png",
    profileKid: "/assets/kid_pfp-modified.png",
    chibi: "/assets/chibi.png",
    resumeIcon: "/assets/resume-icon.svg"
  },
  funFacts: [
    "I lived in Australia for 15 years.",
    "I played competitive tennis.",
    "I made Tennis BC provincials.",
    "I played trumpet.",
    "I was in school orchestra and jazz band.",
    "I am learning Chinese, around HSK 3 level.",
    "My League of Legends mains are Ahri and Shen.",
    "I peaked Platinum in League of Legends."
  ],
  system: {
    uptime: "3 years in software",
    build: "v1.0.1",
    lastUpdated: "May 2026"
  },
  education: [
    {
      school: "University of British Columbia",
      degree: "Bachelor of Applied Science - Computer Engineering",
      years: "Expected May 2029",
      location: "Vancouver, BC",
      coursework: ["CPSC 221 - Data Structures and Algorithms", "CPEN 221 - Software Construction I", 
        "CPEN 211 - Computer Architecture", "CPSC 212 - Operating Systems", "CPSC 330 - Applied Machine Learning"
      ],
      notes: "Dean's List 2024W, 2025W"
    }
  ],
  experience: [
    {
      id: "borrowd",
      role: "Software Developer Intern",
      company: "Borrow'd",
      location: "Vancouver, BC",
      period: "January 2026 - April 2026",
      techStack: ["TypeScript", "React", "Node.js", "CI/CD", "Automated testing"],
      metrics: ["30% faster releases", "consumer lending", "ops tooling"],
      highlights: [
       "Delivered new features and performance improvements for a consumer lending platform, enhancing internal tooling for operations teams and resolving user-facing issues for end users",
       "Streamlined the CI/CD pipeline by integrating automated testing and deployment workflows, reducing release times by 30%.",
       "Collaborated with product and operations stakeholders to debug real user workflows and ship practical fixes.",
      ]
    },
    {
      id: "unisa-research",
      role: "Undergraduate Student Researcher",
      company: "University of South Australia",
      location: "Adelaide, Australia",
      period: "June 2025 - August 2025",
      techStack: ["MATLAB", "Simulation", "Cellular automata", "Deterministic modeling"],
      metrics: ["large-scale analysis", "emergent behavior", "research tooling"],
      highlights: [
        "Computational modeling research under Dr. Terence Chan",
        "Developed a deterministic Conway's Game of Life engine for large-scale analysis of emergent behaviors in cellular automata.",
        "Built reproducible MATLAB workflows for experimenting with state transitions and visualizing model behavior."
      ]
    }
  ],
  skills: {
    languages: ["Python", "Java", "JavaScript/TypeScript", "C/C++", "SQL", "Assembly"],
    frameworks: ["React", "Spring Boot", "Next.js", "FastAPI", "Flask", "three.js"],
    devops: ["AWS", "Docker", "Kubernetes", "Git"],
    machine_learning: ["PyTorch", "TensorFlow", "LangChain", "OpenCV", "Keras", "Hugging Face"]
  },
  projects: [
    {
      id: "portfolio",
      name: "Portfolio",
      summary: "A terminal OS-inspired portfolio built for fast recruiter scanning and playful exploration.",
      technicalSummary: "A Next.js command interface with typed portfolio data, command history, live prompt metadata, expandable CLI outputs, and responsive terminal-inspired UI states.",
      techStack: ["TypeScript", "React", "Next.js", "Tailwind CSS", "Framer Motion"],
      metrics: ["live command system", "responsive UI", "typed content model"],
      links: {
        github: "https://github.com/ansonnchan/personal-portfolio",
        live: "https://ansonnchan.dev"
      },
      built: [
        "Terminal command parser and history renderer",
        "Recruiter-friendly output modules",
        "Responsive light-terminal visual system"
      ],
      problem: "Makes a software portfolio memorable without slowing down the reader who just wants evidence of skills and impact.",
      featured: true
    },
    {
      id: "vent.ai",
      name: "vent.ai",
      summary: "An AI-powered reflection app for exploring thoughts through personality-driven perspectives.",
      technicalSummary: "A Next.js app integrating Groq-powered AI responses with a focused writing experience, perspective selection, and structured conversational output for self-reflection.",
      techStack: ["TypeScript", "React", "Next.js", "Groq SDK"],
      metrics: ["AI reflection flows", "multi-perspective prompts", "deployed web app"],
      links: {
        github: "https://github.com/ansonnchan/vent.ai",
        live: "https://ventai-web.vercel.app"
      },
      built: [
        "Prompt-driven reflection experience",
        "Personality perspective switching",
        "Clean web interface for journaling-style interaction"
      ],
      problem: "Helps users reframe messy thoughts into clearer perspectives without feeling like they are using a clinical productivity tool.",
      featured: true
    },
    
  ]
} satisfies Profile;
