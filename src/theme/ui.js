/**
 * Reusable Tailwind class bundles for layout + neon styling.
 * Keeps section chrome consistent and makes theme tweaks one place.
 */

export const ui = {
  sectionScreen: "w-full min-h-screen bg-black text-white",

  /** max-width content column used on Skills, Experience, Contact */
  pageContainer: "max-w-5xl mx-auto px-6 py-20",

  /** Pixel heading style (Press Start 2P) */
  sectionHeading:
    "text-cyan-300 text-4xl md:text-5xl font-bold font-primary [text-shadow:_0_0_20px_rgba(34,211,238,0.35)]",

  sectionIntro: "text-gray-300 mt-3 max-w-2xl",

  introReadable: "text-gray-200 mt-3 max-w-2xl",

  neonHeadingContact: `font-bold font-primary text-4xl md:text-5xl
    [text-shadow:_0_0_2px_#22d3ee,_0_0_14px_rgba(34,211,238,0.5)] text-white`,

  formPanel:
    "mt-10 bg-[#111] border border-[#2a2a2a] rounded-2xl p-6 md:p-8 shadow-[0_0_20px_rgba(34,211,238,0.12)]",

  contactField: `w-full bg-black rounded-lg px-4 py-3 text-white placeholder:text-gray-500
    border border-cyan-500/35 transition-[border-color,box-shadow] duration-200
    outline-none ring-0 focus:ring-0 focus-visible:outline-none focus-visible:ring-0
    focus:border-cyan-400
    focus:shadow-[0_0_0_1px_rgba(34,211,238,0.9),0_0_18px_rgba(34,211,238,0.55),0_0_36px_rgba(56,189,248,0.35)]`,
};
