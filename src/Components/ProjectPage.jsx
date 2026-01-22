import React from 'react';
import { AiFillGithub } from "react-icons/ai";
import ProjectTab from "../Components/ProjectTabs.jsx";


const ProjectPage = () =>  {
    return (
        <div className="max-w-[1000px] w-full min-h-screen mx-auto flex flex-col items-center justify-start px-6 pt-28 text-white gap-6">
            <h1 className="text-6xl font-cursive font-bold text-center [text-shadow:_0_0_4px_#228B22,_0_0_8px_#228B22,_0_0_12px_#228B22]">
                Projects
            </h1>
            <div className="flex items-center gap-3 text-gray-200">
                <span className="text-lg font-semibold">Find Projects</span>
                <a
                    href="https://github.com/KyleC55"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub projects"
                    className="text-3xl hover:text-[#e0aaff] transition-colors"
                >
                    <AiFillGithub />
                </a>
            </div>
            <ProjectTab />
        </div>
    );
};

export default ProjectPage;