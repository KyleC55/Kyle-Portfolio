import { useState } from 'react'
import './App.css'

function App() {
    const [count, setCount] = useState(0);

    return (
        <main className="App bg-black h-screen flex flex-col items-center justify-center">
            <section className="max-w-screen-md w-full space-y-6">
                <div className="text-center">
                    <h1 className="text-white text-8xl items-center justify-center">
                        Kyle Chen
                    </h1>
                    <p className="text-white text-xl  items-center justify-center">
                    Computer Science Major @ New York University
                    </p>
                </div>
                <div className="w-full max-w-screen-md">
                    <h2 className="text-white text-xl text-left">
                    About Me:
                    </h2>
                    <p className="text-white text-lg max-w-screen-md text-left leading-relaxed">
                        I am a rising junior. My interests are applying machine learning in business scenarios,
                        and transportation with AI. I mainly work in Python and C, but I can currently working
                        on expanding my language skill sets with Javascript.
                    </p>
                </div>
            </section>
        </main>
    );
}
export default App
