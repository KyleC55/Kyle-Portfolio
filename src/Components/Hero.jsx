import React, {useState} from "react";
import { ReactTyped } from "react-typed";
import { useNavigate }  from "react-router"

const Hero = () => {
    const navigate = useNavigate(); // access to navigation function for the button

    const handleClick = () => {
        navigate("/aboutme")
    };

    return (
        <div>
            <div className='max-w-[800px] w-full h-screen mx-auto text-center flex flex-col -mt-20 items-center justify-center'>
                <h1 className="text-[#e0aaff] md:text-7xl sm:text-6xl  font-bold font-primary flex item-center gap-4">
                    <span>Kyle</span>
                    <span> Chen's </span>
                </h1>
                <h2 className="text-gray-200 md:text-6xl sm:text-5xl font-bold font-secondary mt-4">
                    <ReactTyped
                        strings = {['Webpage']}
                        typeSpeed={120}
                        backSpeed={140}
                        loop={true} />
                </h2>
                <div className="flex justify-center mt-12">
                    <img
                        src="/src/assets/enter-button.png"
                        alt="Enter Button"
                        onClick={handleClick}
                        className="lg:w-96 md:w-72 w-24 -mt-8 cursor-pointer object-contain hover:scale-105 transition-transform duration-300"
                    />
                </div>
            </div>
        </div>
    )
}

export default Hero;