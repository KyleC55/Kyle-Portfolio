import { useState } from 'react'
import React from 'react'
import {AiOutlineClose, AiOutlineMenu} from "react-icons/ai";

const Navbar = () => {
    const [nav, setNav] = useState(false)

    const handleNav = () => {
        setNav(!nav)
    }
    return (
        <div className="text-[#e0aaff] bg-[#0d0d0d] justify-between flex h-full w-full items-center  px-4">
            <h1 className="text-3xl font-bold">
                Kyle Chen
            </h1>
            <ul className="space-x-4 font-bold hidden lg:flex">
                <li className="flex items-center space-x-1 p-4">
                    <span> About </span>
                    <span> Me </span>
                </li>
                <li className="p-4 items-center flex">Projects</li>
                <li className="p-4 items-center flex">Experience</li>
                <li className="flex items-center space-x-1 p-4">
                    <span> Contact </span>
                    <span> Info </span>
                </li>
            </ul>
            <div onClick={handleNav} className='block lg:hidden'>
                {!nav ? <AiOutlineMenu size={20}/> : <AiOutlineClose size={20} className="text-[#e0aaff]" />}
                <div className={`fixed top-0 left-0 h-screen bg-black transform ${nav ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out w-[200px] z-50`}>
                    <h1 className="text-3xl font-bold m-8">
                        Kyle Chen
                    </h1>
                    <ul className="font-bold">
                        <li className="flex items-center space-x-1 p-4 border-b">
                            <span> About </span>
                            <span> Me </span>
                        </li>
                        <li className="p-4 items-center flex border-b">Projects</li>
                        <li className="p-4 items-center flex border-b">Experience</li>
                        <li className="flex items-center space-x-1 p-4 border-b">
                            <span> Contact </span>
                            <span> Info </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

    )
}

export {Navbar}

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <Navbar/>
            <main className="App bg-[#0d0d0d] h-screen flex items-center justify-center">
                <section className="max-w-screen-md w-full space-y-6">
                    <div className="text-center">
                        <h1 className="text-[#e0aaff] text-8xl items-center justify-center font-primary flex space-x-6">
                            <span> Kyle </span>
                            <span> Chen</span>
                        </h1>
                        <p className="text-[#e0aaff] text-xl  items-center justify-center">
                        Computer Science Major @ New York University
                        </p>
                    </div>
                    <div className="w-full max-w-screen-md">
                        <h2 className="text-[#e0aaff] text-xl text-left">
                        About Me:
                        </h2>
                        <p className="text-[#e0aaff] text-lg max-w-screen-md text-left leading-relaxed">
                            I am a rising junior. My interests are applying machine learning in business scenarios,
                            and transportation with AI. I mainly work in Python and C, but I can currently working
                            on expanding my language skill sets with Javascript.
                        </p>
                    </div>
                </section>
            </main>
        </>
    );
}
export default App
