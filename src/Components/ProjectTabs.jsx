import { useState } from "react";
import { AiFillGithub, AiOutlineLink } from "react-icons/ai";

import { projects } from "@/data/projects";

export default function ProjectTabs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = projects[activeIndex];

  return (
    <div className="flex flex-col items-center text-white gap-6 w-full">
      <div className="flex gap-3 flex-wrap justify-center">
        {projects.map((project, index) => (
          <button
            key={project.title}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`px-5 py-2 rounded-full text-sm sm:text-base font-semibold border transition duration-200 ${
              activeIndex === index
                ? "bg-cyan-400 text-black border-cyan-300"
                : "bg-black border-[#666] text-white hover:border-cyan-400 hover:text-cyan-300"
            }`}
          >
            {project.title}
          </button>
        ))}
      </div>

      <div
        className="w-full max-w-4xl px-6 py-6 rounded-2xl text-left leading-relaxed mt-2 bg-[#0a0a0c] border border-cyan-400/30
          shadow-[0_0_32px_rgba(34,211,238,0.14),0_0_48px_rgba(56,189,248,0.12),inset_0_1px_0_rgba(34,211,238,0.08)]"
      >
        <h2 className="text-2xl font-bold text-white [text-shadow:_0_0_14px_rgba(34,211,238,0.4)]">
          {activeProject.title}
        </h2>
        <p className="text-sm text-cyan-100/80 mt-1 [text-shadow:_0_0_10px_rgba(56,189,248,0.35)]">
          {activeProject.subtitle}
        </p>
        <p className="text-gray-200 mt-4">{activeProject.description}</p>

        <ul className="mt-5 space-y-3 list-none">
          {activeProject.highlights.map((item, i) => (
            <li
              key={item}
              className={`relative pl-4 py-2.5 rounded-lg border bg-black/40 backdrop-blur-sm
                ${
                  i % 2 === 0
                    ? "border-cyan-400/50 text-cyan-50 [text-shadow:_0_0_14px_rgba(34,211,238,0.55),0_0_24px_rgba(56,189,248,0.2)] shadow-[0_0_20px_rgba(34,211,238,0.14)]"
                    : "border-sky-400/45 text-sky-50 [text-shadow:_0_0_14px_rgba(56,189,248,0.5),0_0_24px_rgba(34,211,238,0.15)] shadow-[0_0_20px_rgba(14,165,233,0.12)]"
                }`}
            >
              <span
                className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-[70%] rounded-full ${
                  i % 2 === 0 ? "bg-cyan-400 shadow-[0_0_12px_#22d3ee]" : "bg-sky-400 shadow-[0_0_12px_#38bdf8]"
                }`}
                aria-hidden
              />
              <span className="pl-2 block">{item}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-3 mt-5">
          {activeProject.links.map((link) => (
            <a
              key={`${activeProject.title}-${link.label}`}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#3a3a3a] hover:border-cyan-400 hover:text-cyan-300 transition-colors"
            >
              {link.type === "github" ? <AiFillGithub /> : <AiOutlineLink />}
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
