import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

import { NAV_LINKS, PROFILE } from "@/constants/site";

const linkClass =
  "flex items-center p-4 rounded-lg text-white transition-all duration-200 " +
  "hover:scale-105 hover:text-cyan-200 hover:[text-shadow:_0_0_12px_rgba(34,211,238,0.75),0_0_22px_rgba(56,189,248,0.35)]";

export default function Navbar() {
  const [navOpen, setNavOpen] = useState(false);
  const closeNav = () => setNavOpen(false);

  return (
    <header
      className="fixed top-0 left-0 z-50 w-full flex items-center justify-between h-16 px-6
        bg-black text-gray-100 border-b border-cyan-500/35
        shadow-[0_1px_0_rgba(34,211,238,0.15),0_8px_32px_rgba(0,0,0,0.85)]"
    >
      <h1
        className="text-2xl sm:text-3xl font-bold text-white tracking-tight shrink-0
          [text-shadow:_0_0_14px_rgba(34,211,238,0.45)]"
      >
        {PROFILE.displayName}
      </h1>

      <nav aria-label="Primary">
        <ul className="hidden lg:flex gap-1 font-bold">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className={linkClass}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <button
        type="button"
        onClick={() => setNavOpen((open) => !open)}
        className="block lg:hidden p-2 rounded-lg text-white border border-cyan-500/35 hover:border-cyan-400/70
          hover:text-cyan-100 hover:shadow-[0_0_14px_rgba(34,211,238,0.3)] transition-all"
        aria-expanded={navOpen}
        aria-label="Toggle navigation menu"
      >
        {!navOpen ? (
          <AiOutlineMenu size={22} />
        ) : (
          <AiOutlineClose size={22} className="text-cyan-100" />
        )}
      </button>

      {navOpen && (
        <div
          className="fixed top-0 left-0 h-screen w-[min(100vw,280px)] bg-black border-r border-cyan-500/30 z-50
            shadow-[4px_0_32px_rgba(0,0,0,0.9),0_0_40px_rgba(34,211,238,0.08)]"
        >
          <div className="p-6 border-b border-cyan-500/25">
            <p className="text-xl font-bold text-white [text-shadow:_0_0_12px_rgba(34,211,238,0.4)]">
              {PROFILE.displayName}
            </p>
          </div>
          <ul className="font-bold pt-2">
            {NAV_LINKS.map((link) => (
              <li key={`mobile-${link.href}`}>
                <a
                  href={link.href}
                  onClick={closeNav}
                  className="block px-6 py-4 border-b border-white/5 text-white hover:text-cyan-200 hover:bg-cyan-500/10 transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
