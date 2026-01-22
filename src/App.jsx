import React from 'react'
import Navbar from "./Components/Navbar.jsx";
import IntroCard from "./Components/IntroCard.jsx";
import ProjectPage from "./Components/ProjectPage.jsx";
import Experience from "./Pages/experience.jsx";
import Skill from "./Components/Skill.jsx";

function App() {
    return (
        <div>
            <Navbar />
            <main className="pt-20">
                <section id="about" className="scroll-mt-24">
                    <IntroCard />
                </section>
                <section id="projects" className="scroll-mt-24">
                    <ProjectPage />
                </section>
                <section id="experience" className="scroll-mt-24">
                    <Experience />
                </section>
                <section id="skills" className="scroll-mt-24">
                    <Skill />
                </section>
            </main>
        </div>
    );
}

export default App;
