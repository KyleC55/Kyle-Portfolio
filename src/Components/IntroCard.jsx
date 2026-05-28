import { ReactTyped } from "react-typed";

import { ASSETS, PROFILE } from "@/constants/site";

export default function IntroCard() {
  return (
    <div className="max-w-4xl w-full min-h-screen -mt-20 mx-auto flex flex-col md:flex-row items-center justify-center px-6 text-white gap-10 group">
      <img
        src={ASSETS.publicPhoto}
        alt={PROFILE.displayName}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = ASSETS.photoFallback;
        }}
        className="w-44 sm:w-52 shrink-0 aspect-[3/4] object-cover object-top rounded-xl shadow-[0_0_24px_rgba(34,211,238,0.15)] transition-transform duration-300 group-hover:scale-105"
      />
      <div className="flex flex-col justify-center text-left w-full max-w-md">
        <h1
          className="text-white font-bold text-2xl sm:text-3xl font-tertiary
            [text-shadow:_0_0_2px_#d8b4fe,_0_0_8px_#a855f7,_0_0_20px_rgba(168,85,247,0.5)]"
        >
          This Is {PROFILE.displayName}
        </h1>
        <p className="text-base sm:text-lg font-bold font-cursive mt-2 mb-5 text-cyan-100">
          <ReactTyped
            strings={[
              "A passionate Computer Science Major @ NYU",
              "A die-hard New York Knicks fan!",
            ]}
            typeSpeed={50}
          />
        </p>
        <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
          Kyle Chen is a rising Senior majoring in Computer Science at New York University (Expected 2027).
          He has hands-on experience building full-stack web applications, having interned at Guavo Ai where
          he shipped an admin dashboard and event-planning platform using React, TypeScript, GraphQL, and NestJS.
        </p>
        <p className="text-sm sm:text-base text-gray-300 leading-relaxed mt-3">
          Kyle is passionate about building practical software at the intersection of machine learning and full-stack engineering.
        </p>
      </div>
    </div>
  );
}
