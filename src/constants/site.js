/** Single source of truth for URLs, anchors, and identity (edit here when updating links). */

export const PROFILE = {
  displayName: "Kyle Chen",
  givenName: "Kyle",
  email: "kc5371@nyu.edu",
  github: "https://github.com/KyleC55",
  linkedin: "https://www.linkedin.com/in/kyle-chen-aa27b72b7/",
  /** File in /public */
  resumeFilename: "Kyle Resume Spring 2026.pdf",
};

export const ASSETS = {
  publicPhoto: "/kc-logo.jpg",
  photoFallback: "/profile-placeholder.svg",
};

/** In-page sections (#ids) — keep in sync with `App.jsx` section ids */
export const SECTION = {
  about: "about",
  projects: "projects",
  experience: "experience",
  skills: "skills",
  contact: "contact",
};

export const NAV_LINKS = [
  { href: `#${SECTION.about}`, label: "About Me" },
  { href: `#${SECTION.projects}`, label: "Projects" },
  { href: `#${SECTION.experience}`, label: "Experience" },
  { href: `#${SECTION.skills}`, label: "Skills" },
  { href: `#${SECTION.contact}`, label: "Contact" },
];

/**
 * Floating dock items after the home + divider group.
 * `kind` is resolved to an icon inside `FloatingDock.jsx`.
 */
export const DOCK_LINK_KINDS = {
  home: "home",
  linkedin: "linkedin",
  github: "github",
  email: "email",
  resume: "resume",
};

export const DOCK_EXTERNAL_LINKS = [
  {
    kind: DOCK_LINK_KINDS.linkedin,
    href: PROFILE.linkedin,
    label: "LinkedIn",
    external: true,
  },
  {
    kind: DOCK_LINK_KINDS.github,
    href: PROFILE.github,
    label: "GitHub",
    external: true,
  },
  {
    kind: DOCK_LINK_KINDS.email,
    href: `mailto:${PROFILE.email}`,
    label: "Email",
    external: false,
  },
  {
    kind: DOCK_LINK_KINDS.resume,
    href: `/${PROFILE.resumeFilename}`,
    label: "Resume PDF",
    external: true,
  },
];
