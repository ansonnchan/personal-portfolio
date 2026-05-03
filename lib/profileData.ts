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
    build: "v1.0.1",
    lastUpdated: "May 2026"
  },
  education: [
    {
      school: "University of British Columbia",
      degree: "Bachelor of Applied Science - Computer Engineering",
      years: "Expected May 2029",
      coursework: ["CPSC 221 - Data Structures and Algorithms", "CPEN 221 - Software Construction I", 
        "CPEN 211 - Computer Architecture", "CPSC 212 - Operating Systems", "CPSC 330 - Applied Machine Learning"
      ],
      notes: "Dean's List 2024W, 2025W"
    }
  ],
  experience: [
    {
      role: "Software Developer Intern",
      company: "Borrow'd",
      period: "January 2026 - April 2026",
      highlights: [
       "Delivered new features and performance improvements for a consumer lending platform, enhancing internal tooling for operations teams and resolving user-facing issues for end users",
       "Streamlined the CI/CD pipeline by integrating automated testing and deployment workflows, reducing release times by 30%.",
       "Talked to real humans and touched grass",
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
    languages: ["Python", "Java", "JavaScript/TypeScript", "C/C++", "SQL", "Assembly"],
    frameworks: ["React", "Spring Boot", "Next.js", "FastAPI", "Flask", "three.js"],
    devops: ["AWS", "Docker", "Kubernetes", "Git"],
    machine_learning: ["PyTorch", "TensorFlow", "LangChain", "OpenCV", "Keras", "Hugging Face"]
  },
  projects: [
    {
      id: "portfolio",
      name: "Portfolio",
      description: "This website :)",
      stack: ["TypeScript", "React", "Next.js"],
      github: "https://github.com/ansonnchan/personal-portfolio",
      live: "https://ansonnchan.dev",
      featured: true
    },
    {
      id: "vent.ai",
      name: "vent.ai",
      description: "an AI-powered reflection app that lets users explore their thoughts through different personality-driven perspectives. ",
      stack: ["TypeScript", "React", "Next.js", "Groq SDK"],
      github: "https://github.com/ansonnchan/vent.ai",
      live: "https://ventai-web.vercel.app",
      featured: true
    },
    
  ]
} satisfies Profile;
