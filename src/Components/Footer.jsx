import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { NAV_LINKS, PROFILE } from "@/constants/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 text-white relative z-10">
      <div className="max-w-4xl mx-auto px-6 md:px-10 py-12 flex flex-col gap-10">

        {/* Top row: name left, sitemap + socials right */}
        <div className="flex flex-col sm:flex-row sm:justify-between gap-10">

          {/* Name */}
          <p className="text-2xl font-bold font-tertiary
            [text-shadow:_0_0_8px_rgba(255,255,255,0.8),_0_0_20px_rgba(255,255,255,0.4)]">
            {PROFILE.displayName}
          </p>

          {/* Sitemap + socials */}
          <div className="flex gap-16">
            <div>
              <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-4">Sitemap</p>
              <ul className="flex flex-col gap-2">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-cyan-300 transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3 pt-8">
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2 rounded-lg border border-white/15 text-gray-300 hover:text-cyan-300 hover:border-cyan-400/50 transition-all"
              >
                <AiFillLinkedin size={20} />
              </a>
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-2 rounded-lg border border-white/15 text-gray-300 hover:text-cyan-300 hover:border-cyan-400/50 transition-all"
              >
                <AiFillGithub size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom: copyright */}
        <p className="text-xs text-gray-500 border-t border-white/10 pt-6">
          © {year} {PROFILE.displayName}
        </p>
      </div>
    </footer>
  );
}
