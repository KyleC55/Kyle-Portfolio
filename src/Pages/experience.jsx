import { experiences } from "@/data/experience";
import { ui } from "@/theme/ui";

const CARD_THEMES = {
  default: {
    card: "bg-[#111] border-[#2a2a2a] border-l-indigo-500/60 shadow-[0_0_20px_rgba(99,102,241,0.12)]",
    role: "text-white",
    dates: "text-gray-400",
    bullet: "bg-indigo-400",
  },
  philips: {
    card: "bg-gradient-to-br from-[#0a1a33] to-[#0b1220] border-[#1c3a5e] border-l-[#0B5ED7] shadow-[0_0_24px_rgba(11,94,215,0.28)]",
    role: "text-[#5eb3f5]",
    dates: "text-[#7fb2e0]",
    bullet: "bg-[#5eb3f5]",
  },
  guavo: {
    card: "bg-gradient-to-br from-[#111f0a] to-[#0b1207] border-[#2c4a1c] border-l-[#5a9e1f] shadow-[0_0_24px_rgba(90,158,31,0.26)]",
    role: "text-[#8fce3f]",
    dates: "text-[#a7c47a]",
    bullet: "bg-[#8fce3f]",
  },
};

export default function Experience() {
  return (
    <section className={ui.sectionScreen}>
      <div className={ui.pageContainer}>
        <h1 className={ui.sectionHeading}>Experience</h1>
        <p className={ui.sectionIntro}>
          Hands-on work building products and internal tools across web, auth, and payments.
        </p>

        <div className="flex flex-col gap-6 mt-10">
          {experiences.map((exp) => {
            const theme = CARD_THEMES[exp.theme] || CARD_THEMES.default;
            const bullets = exp.bullets.filter(Boolean);
            return (
              <article
                key={`${exp.company}-${exp.role}`}
                className={`border rounded-2xl p-6 md:p-7 border-l-2 transition-transform duration-300 hover:-translate-y-1 ${theme.card}`}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                  <div className="flex items-center gap-4">
                    {exp.logo && (
                      <img
                        src={exp.logo}
                        alt={`${exp.company} logo`}
                        className="h-16 w-16 object-contain shrink-0 drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    )}
                    <div>
                      <h2 className={`text-xl font-semibold ${theme.role}`}>{exp.role}</h2>
                      <p className="mt-0.5 text-sm text-gray-400">
                        <span className="font-medium text-gray-200">{exp.company}</span>
                        {" · "}
                        {exp.location}
                      </p>
                    </div>
                  </div>
                  <time className={`text-sm font-medium whitespace-nowrap ${theme.dates}`}>
                    {exp.dates}
                  </time>
                </div>
                {bullets.length > 0 && (
                  <ul className="mt-5 space-y-2.5">
                    {bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3 text-gray-200 leading-relaxed">
                        <span
                          className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${theme.bullet}`}
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
