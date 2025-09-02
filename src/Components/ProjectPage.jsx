import React from 'react';
import ProjectTab from "../Components/ProjectTabs.jsx";


const ProjectPage = () =>  {
    return (
        <div className="max-w-[1000px] w-full min-h-screen mx-auto flex flex-col items-center justify-start px-6 pt-28 text-white gap-8">
            <h1 className="text-6xl font-cursive font-bold text-center [text-shadow:_0_0_4px_#228B22,_0_0_8px_#228B22,_0_0_12px_#228B22]">
                Project
            </h1>
            <ProjectTab />
        </div>
    );
};

export default ProjectPage;