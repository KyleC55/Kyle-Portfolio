import Navbar from "@/Components/Navbar.jsx";
import IntroCard from "@/Components/IntroCard.jsx";
import ProjectPage from "@/Components/ProjectPage.jsx";
import Experience from "@/Pages/experience.jsx";
import Skill from "@/Components/Skill.jsx";
import VisitorGlobe from "@/Components/VisitorGlobe.jsx";
import Contact from "@/Components/Contact.jsx";
import FloatingDock from "@/Components/FloatingDock.jsx";
import CustomCursor from "@/Components/CustomCursor.jsx";
import Footer from "@/Components/Footer.jsx";
import SpaceBackground from "@/Components/SpaceBackground.jsx";

import { SECTION } from "@/constants/site";

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SpaceBackground />
      <CustomCursor />
      <Navbar />
      <FloatingDock />
      <main className="relative z-10 pt-20">
        <section id={SECTION.about} className="scroll-mt-24">
          <IntroCard />
        </section>
        <section id={SECTION.projects} className="scroll-mt-24">
          <ProjectPage />
        </section>
        <section id={SECTION.experience} className="scroll-mt-24">
          <Experience />
        </section>
        <section id={SECTION.skills} className="scroll-mt-24">
          <Skill />
        </section>
        <section id={SECTION.visitors} className="scroll-mt-24">
          <VisitorGlobe />
        </section>
        <section id={SECTION.contact} className="scroll-mt-24">
          <Contact />
        </section>
      </main>
      <Footer />
    </div>
  );
}
