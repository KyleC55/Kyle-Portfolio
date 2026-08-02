import { experiences } from "@/data/experience";
import { ui } from "@/theme/ui";

const CARD_THEMES = {
  default: {
    card: "bg-[#111] border-[#2a2a2a] border-l-purple-500/60 shadow-[0_0_20px_rgba(168,85,247,0.12)]",
    role: "text-white",
    dates: "text-gray-400",
  },
  philips: {
    card: "bg-gradient-to-br from-[#0a1a33] to-[#0b1220] border-[#1c3a5e] border-l-[#0B5ED7] shadow-[0_0_24px_rgba(11,94,215,0.28)]",
    role: "text-[#5eb3f5]",
    dates: "text-[#7fb2e0]",
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
                className={`border rounded-2xl p-6 border-l-2 ${theme.card}`}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div className="flex items-center gap-4">
                    {exp.logo && (
                      <img
                        src={exp.logo}
                        alt={`${exp.company} logo`}
                        className="h-20 w-20 rounded-lg bg-white/95 object-contain p-2 shrink-0"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    )}
                    <div>
                      <h2 className={`text-xl font-semibold ${theme.role}`}>{exp.role}</h2>
                      <p className="text-gray-300">
                        {exp.company} · {exp.location}
                      </p>
                    </div>
                  </div>
                  <time className={`text-sm ${theme.dates}`}>{exp.dates}</time>
                </div>
                {bullets.length > 0 && (
                  <ul className="list-disc list-inside mt-4 text-gray-200 space-y-2">
                    {bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
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
