import React, {useState} from "react";
import {AiOutlineClose, AiOutlineMenu} from "react-icons/ai";




const Navbar = () => {
    const [nav, setNav] = useState(false)

    const handleNav = () => {
        setNav(!nav)
    }

    return (
        <div className="fixed top-0 left-0 z-50 w-full text-gray-200 bg-black/70 backdrop-blur flex items-center justify-between h-16 px-6">
            <h1 className="text-3xl font-bold sm:text-2xl sm:justify-center">
                Kyle Chen
            </h1>
            <ul className="space-x-4 font-bold hidden lg:flex ">
                <a
                    href="#about"
                    className="flex items-center space-x-1 p-4 transition-transform duration-200 hover:scale-110 hover:text-[#e0aaff]"
                >
                    <li>
                        <span> About </span>
                        <span> Me </span>
                    </li>
                </a>

                <a
                    href="#projects"
                    className="flex items-center space-x-1 p-4 transition-transform duration-200 hover:scale-110 hover:text-[#e0aaff]"
                >
                    <li className="p-4 items-center flex">
                        Projects
                    </li>
                </a>

                <a
                    href="#experience"
                    className="flex items-center justify-between space-x-1 p-4 transition-transform duration-200 hover:scale-110 hover:text-[#e0aaff]"
                >
                    <li>
                        Experience
                    </li>
                </a>

                <a
                    href="#skills"
                    className="flex items-center space-x-1 p-4 transition-transform duration-200 hover:scale-110 hover:text-[#e0aaff]"
                >
                <li>
                    Skills
                </li>
                </a>
            </ul>

            <div onClick={handleNav} className='block lg:hidden'>
                {!nav ? <AiOutlineMenu size={20}/> : <AiOutlineClose size={20} className="text-gray-200" />}
                        <div className="fixed top-0 left-0 h-screen w-[200px] bg-black z-50" >
                                <h1 className="text-3xl font-bold m-8 sm:text-xl sm:justify-center">
                                    Kyle Chen
                                </h1>
                                    <ul className="font-bold">
                                        <a href="#about" className="flex items-center space-x-1 p-4 border-b transition-transform duration-200 hover:scale-105">
                                            <li><span> About </span><span> Me </span></li>
                                        </a>
                                        <a href="#projects" className="flex items-center space-x-1 p-4 border-b transition-transform duration-200 hover:scale-105">
                                            <li>Projects</li>
                                        </a>
                                        <a href="#experience" className="flex items-center space-x-1 p-4 border-b transition-transform duration-200 hover:scale-105">
                                            <li>Experience</li>
                                        </a>
                                        <a href="#skills" className="flex items-center space-x-1 p-4 border-b transition-transform duration-200 hover:scale-105">
                                            <li> Skills</li>
                                        </a>
                                    </ul>
                            </div>
                        );
            </div>
        </div>

    );
};

export default Navbar;