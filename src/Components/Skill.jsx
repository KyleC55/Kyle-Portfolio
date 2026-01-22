import React from 'react'

const Skill = () => {
    const skillGroups = [
        {
            title: "Languages",
            items: ["JavaScript", "TypeScript", "Python", "Java", "HTML", "CSS"],
        },
        {
            title: "Frameworks & Libraries",
            items: ["React", "Vite", "Tailwind CSS", "Node.js", "Express", "Framer Motion", "PyTorch"],
        },
        {
            title: "Tools",
            items: ["Git", "GitHub", "VS Code", "Figma", "Postman", "npm", "Docker", "Docker Compose"],
        },
        {
            title: "Other",
            items: ["Responsive Design", "UI/UX", "REST APIs", "Accessibility", "ML Training"],
        },
    ];

    return(
        <section className="w-full min-h-screen bg-black text-white">
            <div className="max-w-5xl mx-auto px-6 py-20">
                <h1 className="text-[#e0aaff] text-4xl md:text-5xl font-bold font-primary">
                    Skills
                </h1>
                <p className="text-gray-300 mt-3 max-w-2xl">
                    A quick overview of the tools and technologies I use to build clean, modern web experiences.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mt-10">
                    {skillGroups.map((group) => (
                        <div
                            key={group.title}
                            className="bg-[#111] border border-[#2a2a2a] rounded-2xl p-6 shadow-[0_0_20px_rgba(224,170,255,0.15)]"
                        >
                            <h2 className="text-xl font-semibold text-white">
                                {group.title}
                            </h2>
                            <div className="flex flex-wrap gap-2 mt-4">
                                {group.items.map((item) => (
                                    <span
                                        key={item}
                                        className="px-3 py-1 rounded-full text-sm bg-[#1b1b1b] border border-[#2f2f2f] text-gray-200"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skill;