import { skillGroups } from "@/data/skills";
import { ui } from "@/theme/ui";

export default function Skill() {
  return (
    <section className={ui.sectionScreen}>
      <div className={ui.pageContainer}>
        <h1 className={ui.sectionHeading}>Skills</h1>
        <p className={ui.sectionIntro}>
          A quick overview of the languages, tools, and technologies I use in production and project work.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mt-10">
          {skillGroups.map((group) => (
            <div
              key={group.title}
              className="bg-[#0a0a0c] border border-cyan-400/25 rounded-2xl p-6
                shadow-[0_0_28px_rgba(34,211,238,0.12),0_0_36px_rgba(56,189,248,0.12),inset_0_1px_0_rgba(34,211,238,0.06)]"
            >
              <h2 className="text-xl font-semibold text-white [text-shadow:_0_0_14px_rgba(34,211,238,0.4)]">
                {group.title}
              </h2>
              <div className="flex flex-wrap gap-2 mt-4">
                {group.items.map((item, i) => (
                  <span
                    key={item}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-shadow duration-200
                      hover:shadow-[0_0_18px_rgba(34,211,238,0.35)]
                      ${
                        i % 2 === 0
                          ? "bg-cyan-950/50 border-cyan-400/55 text-cyan-100 [text-shadow:_0_0_10px_rgba(34,211,238,0.5)]"
                          : "bg-sky-950/40 border-sky-400/50 text-sky-100 [text-shadow:_0_0_10px_rgba(56,189,248,0.48)]"
                      }`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
