import { experiences } from "@/data/experience";
import { ui } from "@/theme/ui";

export default function Experience() {
  return (
    <section className={ui.sectionScreen}>
      <div className={ui.pageContainer}>
        <h1 className={ui.sectionHeading}>Experience</h1>
        <p className={ui.sectionIntro}>
          Hands-on work building products and internal tools across web, auth, and payments.
        </p>

        <div className="flex flex-col gap-6 mt-10">
          {experiences.map((exp) => (
            <article
              key={`${exp.company}-${exp.role}`}
              className="bg-[#111] border border-[#2a2a2a] rounded-2xl p-6 shadow-[0_0_20px_rgba(34,211,238,0.1)]"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div>
                  <h2 className="text-xl font-semibold text-white">{exp.role}</h2>
                  <p className="text-gray-300">
                    {exp.company} · {exp.location}
                  </p>
                </div>
                <time className="text-sm text-gray-400">{exp.dates}</time>
              </div>
              <ul className="list-disc list-inside mt-4 text-gray-200 space-y-2">
                {exp.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
