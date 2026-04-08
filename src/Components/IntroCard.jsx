import { ReactTyped } from "react-typed";

import { ASSETS, PROFILE } from "@/constants/site";

export default function IntroCard() {
  return (
    <div className="max-w-[1000px] w-full min-h-screen -mt-20 mx-auto flex flex-col md:flex-row items-center justify-center px-6 text-white gap-8 group">
      <img
        src={ASSETS.publicPhoto}
        alt={PROFILE.displayName}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = ASSETS.photoFallback;
        }}
        className="w-32 sm:w-40 aspect-[3/4] object-cover object-top rounded-md transition-transform duration-300 group-hover:scale-105"
      />
      <div className="flex flex-col justify-center text-left max-w-xl">
        <h1
          className="text-white font-bold text-5xl sm:text-3xl font-tertiary stroke-white
            [text-shadow:_0_0_2px_#0ff,_0_0_4px_#22d3ee,_0_0_14px_rgba(34,211,238,0.45)] transition-transform duration-300 group-hover:scale-105"
        >
          This Is {PROFILE.displayName}
        </h1>
        <p className="text-2xl sm:text-xl font-bold font-cursive mb-2 whitespace-nowrap transition-transform duration-300 group-hover:scale-105">
          <ReactTyped
            strings={[
              "A passionate Computer Science Major @ New York University",
              "A die hearted New York Knicks fan!",
            ]}
            typeSpeed={50}
          />
        </p>
        <p className="text-lg max-w-2xl text-left leading-relaxed transition-transform duration-300 group-hover:scale-[1.02]">
          {PROFILE.givenName} Chen is currently a junior majoring in Computer Science at New York University. He
          primarily works with Python, and his research interests include applying machine learning in business
          contexts and exploring network optimization techniques.
        </p>
      </div>
    </div>
  );
}
