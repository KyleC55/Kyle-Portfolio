import React from "react";
import { ReactTyped } from "react-typed";

const Hero = () => {
    return (
        <div className="relative overflow-hidden bg-black">
            <div className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#e0aaff] opacity-20 blur-[140px] transition-opacity duration-500 group-hover:opacity-35" />
            <div className="max-w-[900px] w-full h-screen mx-auto text-center flex flex-col -mt-20 items-center justify-center relative group">
                <div className="absolute inset-0 rounded-3xl border border-[#2a2a2a] opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_60px_rgba(224,170,255,0.15)]" />
                <h1 className="text-[#e0aaff] md:text-7xl sm:text-6xl font-bold font-primary flex item-center gap-4 transition-all duration-300 group-hover:text-[#f3d6ff] group-hover:tracking-wider [text-shadow:_0_0_25px_rgba(224,170,255,0.35)]">
                    <span>Kyle</span>
                    <span> Chen's </span>
                </h1>
                <h2 className="text-gray-200 md:text-6xl sm:text-5xl font-bold font-secondary mt-4 transition-colors duration-300 group-hover:text-white">
                    <ReactTyped
                        strings = {['Webpage']}
                        typeSpeed={120}
                        backSpeed={140}
                        loop={true} />
                </h2>
            </div>
        </div>
    )
}

export default Hero;