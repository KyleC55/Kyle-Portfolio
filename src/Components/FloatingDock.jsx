import {
  AiFillGithub,
  AiFillLinkedin,
  AiOutlineHome,
} from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { PiReadCvLogo } from "react-icons/pi";

import { DOCK_EXTERNAL_LINKS, DOCK_LINK_KINDS, SECTION } from "@/constants/site";

const ICONS = {
  [DOCK_LINK_KINDS.home]: AiOutlineHome,
  [DOCK_LINK_KINDS.linkedin]: AiFillLinkedin,
  [DOCK_LINK_KINDS.github]: AiFillGithub,
  [DOCK_LINK_KINDS.email]: MdEmail,
  [DOCK_LINK_KINDS.resume]: PiReadCvLogo,
};

const pillIconClass =
  "p-3 rounded-full text-gray-100 border border-cyan-400/55 bg-black transition-all duration-200 " +
  "hover:border-cyan-300 hover:text-cyan-50 " +
  "hover:shadow-[0_0_0_1px_rgba(34,211,238,0.65),0_0_14px_rgba(56,189,248,0.35)] " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400";

function DockLink({ href, label, Icon, external }) {
  return (
    <a
      href={href}
      className={pillIconClass}
      aria-label={label}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <Icon className="text-2xl opacity-95" />
    </a>
  );
}

export default function FloatingDock() {
  const homeHref = `#${SECTION.about}`;

  return (
    <div className="fixed bottom-4 left-0 right-0 z-40 flex justify-center pointer-events-none px-4">
      <div
        className="pointer-events-auto max-w-[calc(100vw-2rem)] overflow-x-auto py-8 px-3 flex justify-center
          [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="navigation"
        aria-label="Quick links — fixed dock"
      >
        <div className="p-4 inline-flex shrink-0">
          <div
            className="inline-flex min-w-max items-center gap-2 pl-2.5 pr-3.5 py-2 rounded-full bg-black
              border border-cyan-400/75 shadow-[0_12px_40px_rgba(0,0,0,0.85)]"
          >
            <DockLink
              href={homeHref}
              label="Back to about"
              Icon={ICONS[DOCK_LINK_KINDS.home]}
              external={false}
            />
            <span className="w-px h-7 mx-0.5 shrink-0 bg-cyan-500/50" aria-hidden />

            {DOCK_EXTERNAL_LINKS.map((item) => (
              <DockLink
                key={item.kind}
                href={item.href}
                label={item.label}
                Icon={ICONS[item.kind]}
                external={item.external}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
