import React, {useState} from "react";
import {AiOutlineClose, AiOutlineMenu} from "react-icons/ai";
import { NavLink } from "react-router";




const Navbar = () => {
    const [nav, setNav] = useState(false)

    const handleNav = () => {
        setNav(!nav)
    }

    return (
        <div className="text-gray-200 bg-[#000000] justify-between flex h-full w-full items-center font-bold  px-4">
            <h1 className="text-3xl font-bold sm:text-2xl sm:justify-center">
                Kyle Chen
            </h1>
            <ul className="space-x-4 font-bold hidden lg:flex ">
                <NavLink to='/aboutme' className="flex items-center space-x-1 p-4">
                    <li>
                        <span> About </span>
                        <span> Me </span>
                    </li>
                </NavLink>

                <NavLink to='/projects' className="flex items-center space-x-1 p-4">
                    <li className="p-4 items-center flex">
                        Projects
                    </li>
                </NavLink>

                <NavLink to='/experience' className="flex items-center justify-between space-x-1 p-4">
                    <li>
                        Experience
                    </li>
                </NavLink>

                <NavLink to='/skills' className="flex items-center space-x-1 p-4">
                <li>
                    Skills
                </li>
                </NavLink>
            </ul>

            <div onClick={handleNav} className='block lg:hidden'>
                {!nav ? <AiOutlineMenu size={20}/> : <AiOutlineClose size={20} className="text-gray-200" />}
                        <div className="fixed top-0 left-0 h-screen w-[200px] bg-black z-50" >
                                <h1 className="text-3xl font-bold m-8 sm:text-xl sm:justify-center">
                                    Kyle Chen
                                </h1>
                                    <ul className="font-bold">
                                        <NavLink to='/aboutme' className="flex items-center space-x-1 p-4 border-b">
                                            <li><span> About </span><span> Me </span></li>
                                        </NavLink>
                                        <NavLink to='/projects' className="flex items-center space-x-1 p-4 border-b">
                                            <li>Projects</li>
                                        </NavLink>
                                        <NavLink to='/experience' className="flex items-center space-x-1 p-4 border-b">
                                            <li>Experience</li>
                                        </NavLink>
                                        <NavLink to='/skills' className="flex items-center space-x-1 p-4 border-b">
                                            <li> Skills</li>
                                        </NavLink>
                                    </ul>
                            </div>
                        );
            </div>
        </div>

    );
};

export default Navbar;