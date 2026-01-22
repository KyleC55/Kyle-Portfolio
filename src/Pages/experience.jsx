import React from 'react'

const Experience = () => {
    const experiences = [
        {
            company: "Guavo Ai",
            location: "New York, NY",
            role: "Software Engineering Intern",
            dates: "Aug 2025 - Present",
            bullets: [
                "Built an admin dashboard in TypeScript, GraphQL, and React to manage companies, members, and subscriptions.",
                "Integrated Keycloak authentication with role-based access control for admin-only workflows.",
                "Implemented Stripe Checkout and Payment Intents to support subscription billing flows.",
            ],
        },
        {
            company: "Fitext",
            location: "Shanghai, CN",
            role: "Tech Consultant Intern",
            dates: "Jan 2024 - May 2024",
            bullets: [
                "Delivered a React and Tailwind CSS website and app to boost engagement and user experience.",
                "Collaborated across front-end and back-end work with React and Node.js to speed delivery.",
            ],
        },
    ];

    return (
        <section className="w-full min-h-screen bg-black text-white">
            <div className="max-w-5xl mx-auto px-6 py-20">
                <h1 className="text-[#e0aaff] text-4xl md:text-5xl font-bold font-primary">
                    Experience
                </h1>
                <p className="text-gray-300 mt-3 max-w-2xl">
                    Hands-on work building products and internal tools across web, auth, and payments.
                </p>

                <div className="flex flex-col gap-6 mt-10">
                    {experiences.map((exp) => (
                        <div
                            key={`${exp.company}-${exp.role}`}
                            className="bg-[#111] border border-[#2a2a2a] rounded-2xl p-6 shadow-[0_0_20px_rgba(224,170,255,0.12)]"
                        >
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                                <div>
                                    <h2 className="text-xl font-semibold text-white">
                                        {exp.role}
                                    </h2>
                                    <p className="text-gray-300">
                                        {exp.company} · {exp.location}
                                    </p>
                                </div>
                                <span className="text-sm text-gray-400">
                                    {exp.dates}
                                </span>
                            </div>
                            <ul className="list-disc list-inside mt-4 text-gray-200 space-y-2">
                                {exp.bullets.map((bullet) => (
                                    <li key={bullet}>{bullet}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;