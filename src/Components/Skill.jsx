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

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10 items-stretch">
          {skillGroups.map((group) => (
            <div
              key={group.title}
              className="bg-[#0a0a0c] border border-blue-400/25 rounded-2xl p-6
                shadow-[0_0_28px_rgba(11,94,215,0.12),0_0_36px_rgba(59,130,246,0.12),inset_0_1px_0_rgba(11,94,215,0.06)]"
            >
              <h2 className="text-xl font-semibold text-white [text-shadow:_0_0_14px_rgba(11,94,215,0.4)]">
                {group.title}
              </h2>
              <div className="flex flex-wrap gap-2 mt-4">
                {group.items.map((item, i) => (
                  <span
                    key={item}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-shadow duration-200
                      hover:shadow-[0_0_18px_rgba(99,102,241,0.3)]
                      ${
                        i % 2 === 0
                          ? "bg-blue-950/50 border-blue-400/55 text-blue-100 [text-shadow:_0_0_10px_rgba(11,94,215,0.5)]"
                          : "bg-indigo-950/40 border-indigo-400/50 text-indigo-100 [text-shadow:_0_0_10px_rgba(99,102,241,0.5)]"
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
