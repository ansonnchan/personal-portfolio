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
  resume: "/resume.pdf",
  resumeFileName: "Anson_Chan_Resume.pdf",
  assets: {
    favicon: "/assets/favicon.png",
    profileCurrent: "/assets/adult_pfp-modified.png",
    profileKid: "/assets/kid_pfp-modified.png",
    chibi: "/assets/chibi.png",
    resumeIcon: "/assets/resume-icon.svg"
  },
  funFacts: [
  "I lived in Australia for 15 years.",
  "I made provincials in tennis (we got absolutely clapped, but still counts).",
  "I’ve been playing trumpet and violin for 10+ years.",
  "I was in the school orchestra and jazz band (principal trumpet at one point).",
  "I’m learning Chinese — around HSK 3 level right now.",
  "I main Ahri and Shen in League of Legends.",
  "I peaked Platinum in League… it’s been downhill ever since.",
  "I’m currently reading The Three-Body Problem (三体) by Liu Cixin — highly recommend if you like sci-fi + dystopian themes.",
  "My favorite movie is Interstellar.",
  "My favorite series so far is either Black Mirror or Inside Job.",
  "Recently got into C-dramas — currently watching When I Fly Towards You (WIFTY).",
  "All-time favorite tennis player: Novak Djokovic. Right now: Jannik Sinner.",
  "My GOAT is Lebron James.",
  "I want to visit Switzerland and Rome someday.",
  "I love listening to classical msusic while working (Beethoven's counterpoint are unmatched).",
  "I’m trying to learn how to cook something beyond eggs and instant noodles.",
  "I want to watch an NBA game live someday.",
  "Back in high school, I wanted to be a mechanical engineer.",
  "I hate hardware with a burning passion.",
  "I’ve been on the local news before.",
  "I speak English, Cantonese, Mandarin, and some Japanese.",
  "I used to have two dogs called Dong Dong and Ji Ji.",
  ],
  system: {
    uptime: "15 days, 4 hours, 12 minutes", // This will be dynamically calculated in the SystemOutput component
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
       "Delivered new features and performance improvements for a consumer lending platform, enhancing internal tooling for operations teams and resolving user-facing issues for end users.",
       "Streamlined the CI/CD pipeline by integrating automated testing and deployment workflows.",
       "Collaborated with product and operations stakeholders to debug real user workflows and ship practical fixes.",
      ]
    },
    {
      id: "unisa-research",
      role: "Undergraduate Research Assistant",
      company: "University of South Australia",
      location: "Adelaide, Australia",
      period: "June 2025 - August 2025",
      techStack: ["MATLAB", "Simulation", "Cellular automata", "Deterministic modeling"],
      metrics: ["large-scale analysis", "emergent behavior", "research tooling"],
      highlights: [
        "LLM systems research under Dr. Terence Chan",
        "Designed and implemented modular DAG-based pipelines for LLM inference",
        "Optimized RAG chunking and retrieval workflows for large document processing",
        "Reduced query latency with async retrieval and caching"
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
      name: "Personal Portfolio",
      summary: "A terminal OS-inspired portfolio.",
      technicalSummary: "Built a live command system to navigate projects, experience, and personal content",
      techStack: ["TypeScript", "React", "Next.js", "Tailwind CSS", "Framer Motion"],
      metrics: ["live command system", "responsive UI", "typed content model"],
      links: {
        github: "https://github.com/ansonnchan/personal-portfolio",
        live: "https://ansonnchan.dev"
      },
      built: [
        "ARCHIVED_PHOTOS.zip - childhood photo collection",
        "BGM_03: Fly Me to the Moon (Lo-fi Remix)",
        "birthday.exe"
      ],
      problem: "FUN_FACTS.log - explore what makes me, me",
      callout:  "Had a lot of fun making this. Hope you enjoy exploring every last secret this portfolio offers.",
      featured: true
    },
    {
      id:"pear-programming",
      name: "Pear Programming",
      summary: "A browser-based collaborative code editor with real-time execution and AI-assisted coding features.",
      technicalSummary: "Supports multi-user code editing, shared workspaces, live code execution, and context-aware AI assistance.",
      "techStack": ["TypeScript", "Next.js", "Yjs", "WebSockets", "Monaco Editor", "Groq SDK"],
      metrics: ["real-time collaboration", "AI-assisted coding", "multi-language support"],
      links: {
        github: "https://github.com/ansonnchan/PearProgramming",
        live: "https://pear-programming.vercel.app",
      },
      built: [//no need for third bullet point
      ],
      problem: "Resilient synchronization and recovery mechanisms including realtime fallback syncing, room state persistence, stale-session cleanup, and cross-instance fanout.",
      callout: "We're two pears in a pod, programming together.",
      featured: true
    },
      
    {
      id: "vent.ai",
      name: "vent.ai",
      summary: "An AI-powered venting app. Talk to 5 different AI personalities. Crash out to your heart's content.",
      technicalSummary: "Supports five AI personalities with different response styles, from chill and casual to more direct and critical.",
      techStack: ["TypeScript", "React", "Next.js", "Groq SDK", "Upstash Redis"],
      metrics: ["40+ users", "5 AI personalities", "rate-limited AI inputs"],
      links: {
        github: "https://github.com/ansonnchan/vent.ai",
        live: "https://ventai-web.vercel.app"
      },
      built: [
        "Implemented Upstash Redis rate limiting to control usage and prevent abuse under concurrent requests",
      ],
      problem:         "Integrated Groq API with streamed responses for low-latency, real-time feedback",
      callout: "If you wanna crash out, crash out here.",
      featured: true
    },
    
  ]
} satisfies Profile;
