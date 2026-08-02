export const profile = {
  name: "Jashan Singla",
  role: "AI Automation & Intelligent Solutions Intern",
  org: "CSRBOX",
  location: "Sirsa, Haryana, India",
  email: "jashansingla30@gmail.com",
  linkedin: "https://www.linkedin.com/in/singlajashan/",
  linkedinHandle: "in/singlajashan",
};

export const navLinks = [
  { label: "Home", href: "#top" },
  { label: "Focus", href: "#focus" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
];

export type FocusArea = {
  tag: string;
  title: string;
  summary: string;
  chips: string[];
};

export const focusAreas: FocusArea[] = [
  {
    tag: "Offense & Forensics",
    title: "Breaking things on purpose",
    summary:
      "Hands-on experience identifying and mitigating vulnerabilities across web applications, plus OSINT work tracing digital footprints and online threats.",
    chips: [
      "SQL Injection",
      "XSS",
      "CSRF",
      "Broken Access Control",
      "Broken Authentication",
      "IDOR",
      "Binary Exploitation",
      "OSINT",
    ],
  },
  {
    tag: "Automation & AI",
    title: "Building smarter systems",
    summary:
      "Working on AI automation, intelligent workflow orchestration, and fine-tuning large language models for domain-specific applications.",
    chips: ["Workflow Management", "LLMOps", "Agentic AI Development"],
  },
];

export const throughline =
  "The goal underneath both: strengthen security systems ethically, protect sensitive data, and contribute to a safer digital environment, whether that means filing a vulnerability report or shipping an agent that catches the next one automatically.";

export type WorkItem = {
  id: string;
  name: string;
  wordmark: string;
  background: string;
  href: string;
  ariaLabel: string;
  context: string;
  summary: string;
  tags: string[];
  highlights: string[];
};

export const work: WorkItem[] = [
  {
    id: "tavrynewallpapers",
    name: "Tavryne Wallpapers",
    wordmark: "tavryne.wallpapers",
    background: "linear-gradient(160deg, #050505, #0a0f0c 55%, #040404)",
    href: "https://tavrynewallpapers.vercel.app/",
    ariaLabel: "Visit Tavryne Wallpapers",
    context: "Independent project",
    summary:
      "A wallpaper gallery with a near-black, mint-and-red visual identity. Browse curated collections across Abstract, Anime, Cars, Movies, and 4K categories, with a clean card-based grid and quick download flow.",
    tags: ["Next.js", "Tailwind CSS", "Vercel"],
    highlights: [
      "Curated collections split across five categories with a strong mint-and-red art direction.",
      "Responsive card grid tuned for browsing on both desktop and mobile.",
      "Fast static rendering for instant image loads and snappy page transitions.",
    ],
  },
  {
    id: "tavryneai",
    name: "Tavryne AI",
    wordmark: "tavryne.ai",
    background: "linear-gradient(160deg, #0a0a0a, #16102a 55%, #080808)",
    href: "https://tavryneai.vercel.app/",
    ariaLabel: "Visit Tavryne AI",
    context: "Independent project",
    summary:
      "A vibe-coding platform that turns a plain-language idea into a working website or app. Typed prompts get routed to code-generation models, with an editor-and-preview layout and model picker behind the scenes.",
    tags: ["Next.js", "AI Code Generation", "OpenRouter", "NVIDIA NIM"],
    highlights: [
      "Prompt-to-app pipeline with a live editor and preview pane.",
      "Model routing across multiple generation backends.",
      "Violet-on-black interface built for fast, focus-forward iteration.",
    ],
  },
  {
    id: "vyaparai",
    name: "VyaparAI",
    wordmark: "vyapar.ai",
    background: "linear-gradient(160deg, #0e0b05, #1c1608 55%, #0a0906)",
    href: "https://vyaparai.vercel.app/",
    ariaLabel: "Visit VyaparAI",
    context: "CSRBOX · IBM SkillsBuild internship",
    summary:
      "An AI-driven business platform for Indian MSMEs, handling invoice OCR, inventory tracking, and expense management. Built during the CSRBOX / IBM SkillsBuild internship with an amber-and-black, editorial feel.",
    tags: ["Next.js", "Firebase", "Gemini 2.5 Flash", "Tesseract.js"],
    highlights: [
      "Invoice OCR pipeline that pulls structured line items straight out of scanned bills and receipts.",
      "Inventory tracking with live stock counts and low-stock visibility for small shop owners.",
      "Expense management that groups spending into categories owners actually think in.",
      "Amber-on-black editorial design with a classic serif voice.",
    ],
  },
  {
    id: "qrigo",
    name: "Qrigo",
    wordmark: "qrigo",
    background: "linear-gradient(160deg, #150b2e, #30102e 50%, #1c1208)",
    href: "https://qrigo.vercel.app/",
    ariaLabel: "Visit Qrigo",
    context: "Independent project",
    summary:
      "A free QR code and barcode generator with a signature purple-to-pink-to-amber gradient. Generate QR codes and barcodes with custom themes entirely in the browser — nothing uploaded to a server.",
    tags: ["Next.js", "Tailwind CSS", "Client-side"],
    highlights: [
      "QR and barcode generation that runs fully in the browser.",
      "Custom theme options that echo the site's signature gradient.",
      "Light, fast interface with copy-and-download in one click.",
    ],
  },
  {
    id: "jashan3d",
    name: "Jashan 3D",
    wordmark: "jashan.3d",
    background: "linear-gradient(160deg, #100a1d, #0d0718 55%, #090510)",
    href: "https://jashan3d.vercel.app/",
    ariaLabel: "Visit Jashan 3D",
    context: "Independent project",
    summary:
      "A portfolio site with a real WebGL canvas, framed by the line \"I build intelligent systems where security meets innovation.\" Deep violet-black atmosphere with violet-and-teal wireframe accents.",
    tags: ["Next.js", "Three.js", "WebGL"],
    highlights: [
      "Live WebGL scene rendered behind the hero copy.",
      "Violet-black art direction with teal highlights and a mixed serif display.",
      "Slow, deliberate motion language matching the security-meets-innovation thesis.",
    ],
  },
];

export type ExperienceItem = {
  role: string;
  org: string;
  period: string;
  current?: boolean;
  bullets: string[];
  tools?: string;
};

export const experience: ExperienceItem[] = [
  {
    role: "AI Automation & Intelligent Solutions Intern",
    org: "CSRBOX, Haryana, India",
    period: "2026 — Now",
    current: true,
    bullets: [
      "Selected for the IBM SkillsBuild Academic Internship 2026, run by BharatCares (CSRBOX Group) with AICTE.",
      "Working on AI automation, workflow orchestration, and AI-powered project development.",
      "Fine-tuning large language models for domain-specific applications.",
    ],
  },
  {
    role: "OSINT Intern",
    org: "Cyber Secured India, Remote",
    period: "Sep 2025",
    bullets: [
      "Completed the four-week \"CTRL. ALT. ACT.\" OSINT internship with MKITOS.",
      "Ran image and metadata analysis, and investigated fake news networks, phishing sites, and malicious domains.",
      "Learned ethical reporting, data verification, and safe submission of intelligence findings.",
      "Awarded the Achievers Certificate on completion.",
    ],
    tools: "Google Lens · TinEye · Yandex · Google Earth",
  },
  {
    role: "Cybersecurity and Forensics Intern",
    org: "Cyber Secured India, Haryana, India",
    period: "Apr – Jul 2025",
    bullets: [
      "Identified, analyzed, and mitigated common security vulnerabilities in simulated environments.",
      "Researched emerging threats and proposed security practices for networks, applications, and cloud environments.",
      "Documented findings, remediation strategies, and preventive measures in technical reports.",
    ],
    tools: "Wireshark · Nmap · Burp Suite · Metasploit",
  },
];

export const education = {
  degree: "Bachelor of Technology, Artificial Intelligence",
  school: "Jan Nayak Ch. Devi Lal Vidyapeeth, Sirsa",
  period: "Aug 2025 – Aug 2029",
};

export const skills = [
  "Python",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "LangChain",
  "LangGraph",
  "RAG",
  "LLMOps",
  "Prompt Engineering",
  "n8n",
  "Make",
  "OpenAI",
  "Docker",
  "Git",
  "PostgreSQL",
  "Linux",
  "Burp Suite",
  "Wireshark",
  "Nmap",
  "Metasploit",
  "OSINT",
];

export const about = {
  heading: "From security research to agentic AI.",
  paragraphs: [
    "I build automation that holds up under real constraints: cost-aware LLM pipelines, workflows that handle failure gracefully, and tooling the people operating it actually want to use. My base in cybersecurity means I design with abuse and failure in mind, not just success.",
    "Right now I spend most of my time on agentic AI systems at CSRBOX, a nonprofit network running social-impact programs. Everything on this page is a mix of intern work, independent research, and experiments that made it to production.",
  ],
  stats: [
    { label: "Based in", value: "Sirsa, Haryana" },
    { label: "Studying", value: "B.Tech AI, 2025-2029" },
    { label: "Focus", value: "Security · LLMOps · agents" },
  ],
};
