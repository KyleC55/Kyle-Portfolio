import React from 'react'
import { HashRouter as Router, Routes, Route, useLocation} from 'react-router';
import { AnimatePresence } from "motion";
import Home  from "./Pages/home.jsx";
import AboutMe from "./Pages/aboutme.jsx";
import Experience from "./Pages/experience.jsx";
import Projects from "./Pages/projects.jsx";
import ContactMe from "./Pages/skills.jsx";

function AnimatedRoutes() {
    const location = useLocation();

    return (
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/aboutme" element={<AboutMe />} />
                <Route path="/experience" element={<Experience />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/skills" element={<ContactMe />} />
            </Routes>
    );
}

function App() {
    return (
        <Router>
            <AnimatedRoutes />
        </Router>
    );
}

export default App;
