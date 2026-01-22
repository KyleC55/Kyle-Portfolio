import React from "react";
import { ReactTyped } from "react-typed";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { PiReadCvLogo } from "react-icons/pi";


const IntroCard = () => {
    return (
        <div className="max-w-[1000px] w-full min-h-screen -mt-20 mx-auto flex flex-col md:flex-row items-center justify-center px-6 text-white gap-8 group">
            <img src="/src/assets/Kyle.jpg"
                 alt="Kyle"
                 className="w-32 sm:w-40 h-auto rounded-md transition-transform duration-300 group-hover:scale-105"
            />
                <div className="flex flex-col justify-center text-left max-w-xl">
                    <h1 className="text-white font-bold text-5xl sm:text-3xl font-tertiary stroke-white [text-shadow:_0_0_2px_#0ff,_0_0_4px_#0ff] transition-transform duration-300 group-hover:scale-105">
                        This Is Kyle Chen
                    </h1>
                    <p className="text-2xl sm:text-xl font-bold font-cursive mb-2 whitespace-nowrap transition-transform duration-300 group-hover:scale-105">
                        <ReactTyped
                            strings = {['A passionate Computer Science Major @ New York University',
                            'A die hearted New York Knicks fan!']}
                            typeSpeed={50}/>
                    </p>
                    <p className="text-lg max-w-2xl text-left leading-relaxed transition-transform duration-300 group-hover:scale-[1.02]">
                        Kyle Chen is currently a junior majoring in Computer Science at New York University. He primarily works with Python, and his research interests include applying machine learning in business contexts and exploring network optimization techniques.
                    </p>
                    <p className="text-lg max-w-2xl text-left font-bold leading-relaxed mt-2 transition-transform duration-300 group-hover:scale-[1.03]">
                        Social Media
                    </p>
                    <div className="flex flex-row items-center space-x-2 mt-auto text-2xl">
                        <a href="https://github.com/KyleC55" target="_blank" aria-label="Github" rel="noopener noreferrer">
                            <AiFillGithub className="text-4xl sm:text-2xl transition-transform duration-200 hover:scale-110"/>
                        </a>
                        <a href="https://www.linkedin.com/in/kyle-chen-aa27b72b7/" target="_blank" aria-label="Linkedin" rel="noopener noreferrer">
                            <AiFillLinkedin className="text-4xl sm:text-2xl transition-transform duration-200 hover:scale-110"/>
                        </a>
                        <a href="mailto:kc5371@nyu.edu" className="hover underline">
                            <MdEmail className="text-4xl sm:text-2xl transition-transform duration-200 hover:scale-110"/>
                        </a>
                        <a href="public/Kyle Resume Spring 2024.pdf" target="_blank" aria-label="Resume" rel="noopener noreferrer">
                            <PiReadCvLogo className="text-4xl sm:text-2xl transition-transform duration-200 hover:scale-110"/>
                        </a>
                    </div>
                </div>
        </div>
    );
};


export default IntroCard;