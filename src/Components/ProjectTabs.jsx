import React from 'react';
import {useState} from "react";

const projects = [
    {
        title: "Network Topology",
        description:
            "Using Python for the backend and JavaScript for the display, my team of four built a network topology visualization for our Computer Networking class. We loaded in IP addresses and displayed hop counts on an Earth globe. A legend indicates hop types, such as ICMP, TCP, and UDP."
    },
    {
        title: "Frontend Development",
        description:
            "Using React, Tailwind, and Framer Motion, I created my portfolio website. This project helped me learn fundamental front-end development concepts while producing a clean, responsive layout."
    },
    {
        title: "Chat System",
        description:
            "Using Python and libraries such as `socket`, I built a basic chat system and integrated a Tic-Tac-Toe game for two users to play in real time."
    }
];


const ProjectTabs = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    return (
        <div className="flex flex-col items-center text-white gap-6">
            <div className="flex gap-4 flex-wrap justify-center">
                {projects.map((project, index) => (
                    <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`px-6 py-3 rounded-lg font-bold border transition duration-200 ${
                        activeIndex === index
                            ? "bg-white text-black"
                            : "bg-black border-white text-white hover:bg-white hover:text-black"
                    }`}
                    >
                        {project.title}
                    </button>
                ))}
            </div>


            <div className="max-w-3xl px-6 py-4 border border-white rounded-xl text-center text-lg leading-relaxed mt-4 shadow-lg bg-black bg-opacity-60">
                <h1 className="text-bold font-primary underline"> Description
                </h1>
                {projects[activeIndex].description}
            </div>
        </div>
    );
};



export default ProjectTabs;