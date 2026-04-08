import { AiFillGithub } from "react-icons/ai";

import { PROFILE } from "@/constants/site";
import ProjectTabs from "@/Components/ProjectTabs.jsx";

export default function ProjectPage() {
  return (
    <div className="max-w-[1000px] w-full min-h-screen mx-auto flex flex-col items-center justify-start px-6 pt-28 text-white gap-6">
      <h1
        className="text-5xl sm:text-6xl font-cursive font-bold text-center text-white
          [text-shadow:_0_0_4px_#22d3ee,_0_0_12px_rgba(34,211,238,0.55),_0_0_24px_rgba(56,189,248,0.28)]"
      >
        Projects
      </h1>
      <p className="text-gray-300 text-center max-w-2xl">
        Featured projects from my resume with direct links and concise highlights.
      </p>
      <div className="flex items-center gap-3 text-gray-200">
        <span className="text-lg font-semibold">More on GitHub</span>
        <a
          href={PROFILE.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub projects"
          className="text-3xl hover:text-cyan-300 transition-colors"
        >
          <AiFillGithub />
        </a>
      </div>
      <ProjectTabs />
    </div>
  );
}
