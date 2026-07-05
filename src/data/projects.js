export const projects = [
  {
    title: "ProfAI",
    subtitle: "Full Stack Web AI Application · May 2026 - Present",
    description: "A full stack coursera like platform, that allows students to track progress, and learn from an AI professor, it allows student to take courses that are there, or upload and learn from their own slides.",
    highlights: [
      "Designed and built the web application interface in Figma, integrating the DeepSeek and OpenAI APIs to deliver AI-driven instruction from course material.",
      "Implemented a database and user authentication system to support account management and progress tracking.",
    ],
    links: [{ label: "Github", href: "https://github.com/KyleC55/ProfAi", type: "github"}],

  },
  {
    title: "Better Albert",
    subtitle: "Software Engineering Project · Apr 2026 - May 2026",
    description:
      "A full-stack course-planning platform that streamlines academic planning through course scraping, degree requirement tracking, calendar export, and AI-powered schedule recommendations.",
    highlights: [
      "Built a scraper to aggregate course listings, major requirements, and graduation requirements.",
      "Enabled students to compare classes and plan schedules more efficiently.",
    ],
    links: [{ label: "GitHub", href: "https://github.com/KyleC55/Better-Albert", type: "github" }],
  },
  {
    title: "Classification of Mathematical Problems",
    subtitle: "NLP Research Project · Oct 2025 - Dec 2025",
    description:
      "Built a system that tags math problems by type, topic, method, and difficulty to support tailored LLM prompt routing, using a purpose-built corpus of 1,000 annotated problems.",
    highlights: [
      "Curated and annotated a 1,000-problem multi-task dataset spanning secondary to early-undergraduate mathematics.",
      "Developed a symbol-aware character-level CNN that outperformed a fine-tuned BERT baseline on method classification (56.5% vs. 45.5% accuracy).",
      "Showed through ablation that much of the predictive signal comes from coarse task metadata rather than symbolic features, surfacing limits of the method taxonomy.",
    ],
    links: [{ label: "Paper", href: "/NLP_Math_Classifcation_Task.pdf", type: "pdf" }],
  },
  {
    title: "Visualization Traceroute",
    subtitle: "Computer Networking Project · Mar 2025 - May 2025",
    description:
      "Built a network visualization tool with Python, JavaScript, and HTML to map traceroute hops on an interactive world map.",
    highlights: [
      "Integrated Google Earth 3D mapping for route and latency visualization.",
      "Focused on networking insights and geographic path transparency.",
    ],
    links: [{ label: "GitHub", href: "https://github.com/KyleC55", type: "github" }],
  },
  {
    title: "Responsive Portfolio Website",
    subtitle: "Personal Project · Ongoing",
    description:
      "Implemented a personal website with React and Tailwind CSS for a clean, responsive experience.",
    highlights: [
      "Designed smooth section navigation and mobile-friendly layout.",
      "Refined UI content to highlight skills, projects, and experience.",
    ],
    links: [{ label: "GitHub", href: "https://github.com/KyleC55/Kyle-Portfolio", type: "github" }],
  },
  {
    title: "Chat System",
    subtitle: "ICDS Project · Oct 2024 - Dec 2024",
    description:
      "Developed a real-time chat app using Python and Socket.IO with multi-user support and authentication.",
    highlights: [
      "Implemented low-latency messaging flows for multiple concurrent users.",
      "Embedded a tic-tac-toe mini-game inside chat sessions.",
    ],
    links: [{ label: "GitHub", href: "https://github.com/KyleC55/Chat-System", type: "github" }],
  },
];
