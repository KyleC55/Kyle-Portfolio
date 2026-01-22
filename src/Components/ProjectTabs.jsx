import React from 'react';
import {useState} from "react";

const projects = [
    {
        title: "Classification of Mathematical Problems",
        description:
            "Curated and annotated a ~1,000-problem multi-label dataset and evaluated text classification models for prompt routing. Compared BERT-based and character-level CNN approaches on symbolic, formula-heavy inputs and analyzed per-label performance."
    },
    {
        title: "Visualization Traceroute",
        description:
            "Built a network visualization tool with Python, JavaScript, and HTML to map traceroute hops on an interactive world map. Integrated Google Earth 3D for geographic path and latency visualization."
    },
    {
        title: "Responsive Portfolio Website",
        description:
            "Implemented a personal website with React, Tailwind, and Framer Motion to deliver smooth page transitions, clean layout, and responsive design."
    },
    {
        title: "Chat System",
        description:
            "Developed a real-time chat app using Python and Socket.IO with multi-user support, authentication, and an embedded tic-tac-toe game within chat sessions."
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