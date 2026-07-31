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
  { label: "Focus", href: "#focus" },
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
