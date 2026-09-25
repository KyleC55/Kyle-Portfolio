/**
 * Reusable Tailwind class bundles for layout + neon styling.
 * Keeps section chrome consistent and makes theme tweaks one place.
 */

export const ui = {
  sectionScreen: "w-full text-white",

  /** max-width content column used on Skills, Experience, Contact */
  pageContainer: "max-w-4xl mx-auto px-6 md:px-10 py-20",

  /** Section heading — white text with an indigo neon glow (Projects-style) */
  sectionHeading:
    "text-white text-3xl md:text-4xl font-bold font-cursive [text-shadow:_0_0_4px_#a5b4fc,_0_0_14px_rgba(99,102,241,0.55),_0_0_28px_rgba(99,102,241,0.32)]",

  sectionIntro: "text-gray-300 mt-3 max-w-2xl",

  introReadable: "text-gray-200 mt-3 max-w-2xl",

  neonHeadingContact: `font-bold font-cursive text-3xl md:text-4xl text-white
    [text-shadow:_0_0_4px_#a5b4fc,_0_0_14px_rgba(99,102,241,0.55),_0_0_28px_rgba(99,102,241,0.32)]`,

  formPanel:
    "mt-10 bg-[#111] border border-[#2a2a2a] rounded-2xl p-6 md:p-8 shadow-[0_0_20px_rgba(11,94,215,0.12)]",

  contactField: `w-full bg-black rounded-lg px-4 py-3 text-white placeholder:text-gray-500
    border border-blue-500/35 transition-[border-color,box-shadow] duration-200
    outline-none ring-0 focus:ring-0 focus-visible:outline-none focus-visible:ring-0
    focus:border-blue-400
    focus:shadow-[0_0_0_1px_rgba(11,94,215,0.9),0_0_18px_rgba(11,94,215,0.55),0_0_36px_rgba(59,130,246,0.35)]`,
};
