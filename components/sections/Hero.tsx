"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { personalInfo } from "@/lib/data";
import { useState, useEffect, useRef } from "react";
import { useSound } from "@/components/SoundSystem";

export default function Hero() {
    const [mounted, setMounted] = useState(false);
    const containerRef = useRef<HTMLElement>(null);
    const { playSound } = useSound();

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Parallax values for different layers
    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "150%"]);
    const elementsY = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);

    useEffect(() => {
        setMounted(true);
    }, []);


    const title = "Building Systems";
    const subtitle = "That Matter";

    return (
        <section
            id="hero"
            ref={containerRef}
            className="relative min-h-screen flex items-center w-full overflow-hidden pt-20"
            style={{ background: "transparent" }}
        >
            {/* Parallax Background */}
            <motion.div
                className="absolute inset-0 pointer-events-none z-[-1]"
                style={{ y: bgY }}
            >
                {/* We can add an actual background image here if needed, but for now it's transparent */}
            </motion.div>

            {/* Draggable Background Elements (The Collage) */}
            <motion.div
                className="absolute inset-0 pointer-events-none z-0 overflow-visible"
                style={{ y: elementsY }}
            >
                {/* Element 1: Torn Paper */}
                <motion.div
                    drag
                    onDragStart={() => playSound("hover")}
                    dragConstraints={{ left: -50, right: 350, top: -50, bottom: 500 }}
                    whileDrag={{ scale: 1.1, rotate: -2, cursor: "grabbing", zIndex: 100 }}
                    className="absolute top-[10%] left-[5%] w-48 h-64 md:w-64 md:h-80 bg-parchment-muted pointer-events-auto cursor-grab"
                    style={{
                        clipPath: "polygon(2% 2%, 98% 5%, 95% 98%, 5% 95%)",
                        boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
                        rotate: "-6deg"
                    }}
                >
                    <div className="w-full h-full border-[3px] border-crimson/40 m-2" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-20">
                        <span className="font-heading-scrap text-8xl rotate-90 tracking-widest text-ink-black">RONIN</span>
                    </div>
                </motion.div>

                {/* Element 2: Kanji Calligraphy */}
                <motion.div
                    drag
                    onDragStart={() => playSound("click")}
                    dragConstraints={{ left: -400, right: 100, top: -100, bottom: 400 }}
                    whileDrag={{ scale: 1.15, rotate: 15, cursor: "grabbing", zIndex: 100 }}
                    className="absolute top-[30%] right-[10%] p-6 md:p-10 bg-parchment pointer-events-auto cursor-grab shadow-2xl border-2 border-charcoal"
                    style={{ rotate: "12deg" }}
                >
                    <div className="scrap-tape top-[-10px] left-[50%] w-16 h-8 -translate-x-1/2 rotate-[-5deg]" />
                    <p className="kanji text-5xl md:text-7xl text-ink-black opacity-90" style={{ writingMode: "vertical-rl" }}>大道無門</p>
                </motion.div>

                {/* Element 3: Abstract Shape */}
                <motion.div
                    drag
                    onDragStart={() => playSound("hover")}
                    dragConstraints={{ left: -200, right: 200, top: -200, bottom: 500 }}
                    whileDrag={{ scale: 1.1, rotate: 45, cursor: "grabbing", zIndex: 100 }}
                    className="absolute bottom-[20%] left-[30%] w-32 h-32 md:w-48 md:h-48 bg-crimson pointer-events-auto cursor-grab shadow-xl border-4 border-ink-black"
                    style={{ borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%", opacity: 0.85, mixBlendMode: "hard-light" }}
                >
                </motion.div>

                {/* Element 4: Floating Stamp */}
                <motion.div
                    drag
                    onDragStart={() => playSound("click")}
                    dragConstraints={{ left: -200, right: 200, top: -400, bottom: 200 }}
                    whileDrag={{ scale: 1.2, rotate: -30, cursor: "grabbing", zIndex: 100 }}
                    className="absolute bottom-[10%] right-[25%] w-24 h-24 rounded-full border-4 border-gold-muted pointer-events-auto cursor-grab flex items-center justify-center"
                    style={{ rotate: "-25deg" }}
                >
                    <span className="font-heading-scrap text-sm text-gold-muted text-center leading-none">AI / ML<br />ENGINEER</span>
                </motion.div>
            </motion.div>

            {/* Main Content */}
            <div className="container relative z-10 flex flex-col justify-center items-start lg:w-3/4 mx-auto mt-10 md:mt-20">
                <motion.div
                    initial={{ opacity: 0, y: 50, rotate: -5 }}
                    animate={{ opacity: 1, y: 0, rotate: -2 }}
                    transition={{ duration: 0.8, ease: "backOut" }}
                    className="bg-parchment p-4 md:p-10 shadow-[8px_8px_0px_#0D0D0D] relative border-4 border-ink-black mb-8 inline-block select-none transform hover:rotate-0 transition-transform duration-300"
                >
                    <div className="scrap-tape top-[-20px] left-[-20px] w-24 h-10 rotate-[-15deg]" />
                    <div className="scrap-tape bottom-[-20px] right-[-20px] w-24 h-10 rotate-[-15deg]" />
                    <p className="font-heading-scrap text-5xl md:text-7xl xl:text-8xl text-ink-black leading-none mb-4 md:mb-6">
                        {title.toUpperCase()}
                    </p>
                    <p className="font-heading-scrap text-5xl md:text-7xl xl:text-8xl text-crimson leading-none">
                        <span className="brush-highlight text-parchment px-4 py-2">{subtitle.toUpperCase()}</span>
                    </p>
                </motion.div>

                {/* Bio card */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: "backOut" }}
                    className="bg-charcoal text-parchment p-6 md:p-8 max-w-xl shadow-[6px_6px_0px_var(--crimson)] relative mt-4 rotate-2 border-2 border-ink-black z-20 select-none transform hover:rotate-1 transition-transform duration-300"
                >
                    <div className="scrap-tape top-[-10px] right-[20px] w-20 h-8 rotate-[10deg]" />
                    <p className="font-body-scrap text-lg md:text-xl font-bold mb-4 text-parchment leading-relaxed uppercase tracking-wide">
                        {personalInfo.tagline}
                    </p>
                    <div className="h-[3px] w-full bg-crimson opacity-80 mb-4" />
                    <p className="font-heading-scrap text-sm text-stone-gray mb-1">SPECIALTIES:</p>
                    <p className="font-body-scrap text-sm text-gold-muted font-bold tracking-widest">
                        Data Science // Machine Learning // Full-Stack
                    </p>
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="mt-16 md:ml-auto z-30"
                >
                    <button
                        onClick={() => {
                            const event = new HashChangeEvent('hashchange');
                            window.location.hash = '#battles';
                            window.dispatchEvent(event);
                        }}
                        className="inline-block px-8 py-4 bg-crimson text-parchment font-heading-scrap text-xl md:text-2xl border-4 border-ink-black shadow-[6px_6px_0px_#0D0D0D] transition-colors transition-transform transition-shadow hover:bg-ink-black hover:text-crimson hover:translate-x-1 hover:translate-y-1 hover:shadow-none uppercase cursor-pointer"
                    >
                        EXPLORE THE WORK →
                    </button>
                </motion.div>
            </div>
            {/* Some noisy foreground element */}
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-ink-black to-transparent pointer-events-none z-40 opacity-90" />
        </section >
    );
}
