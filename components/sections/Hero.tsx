"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { personalInfo } from "@/lib/data";
import { useState, useEffect } from "react";
import { useSound } from "@/components/SoundSystem";

const CREDENTIALS = [
    { label: "SRM", value: "B.Tech DS" },
    { label: "GPA", value: "8.33/10" },
    { label: "IEEE", value: "Published" },
    { label: "IELTS", value: "Band 6.5" },
];

export default function Hero() {
    const [mounted, setMounted] = useState(false);
    const { playSound } = useSound();

    // Use window-level scroll — no target ref avoids the "ref not hydrated" crash
    const { scrollYProgress } = useScroll();

    const bgY = useTransform(scrollYProgress, [0, 0.4], ["0%", "5%"]);
    const textY = useTransform(scrollYProgress, [0, 0.4], ["0%", "-10%"]);
    const elementsY = useTransform(scrollYProgress, [0, 0.4], ["0%", "15%"]);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <section
            id="path"
            className="relative min-h-screen flex items-center w-full pt-20"
            suppressHydrationWarning
        >
            {/* Parallax Background Tint */}
            <motion.div className="absolute inset-0 pointer-events-none z-[-1]" style={{ y: bgY }} />

            {/* Draggable Collage — only rendered client-side to avoid hydration mismatch from drag prop */}
            {mounted && (
                <motion.div
                    className="absolute inset-0 pointer-events-none z-20 overflow-visible"
                    style={{ y: elementsY }}
                >
                    {/* Torn Paper */}
                    <motion.div
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") playSound("drop");
                        }}
                        drag
                        onDragStart={() => playSound("drag")}
                        onDragEnd={() => playSound("drop")}
                        dragConstraints={{ left: -50, right: 350, top: -50, bottom: 500 }}
                        whileDrag={{ scale: 1.1, rotate: -2, cursor: "grabbing", zIndex: 100 }}
                        className="absolute top-[10%] left-[5%] w-48 h-64 md:w-64 md:h-80 bg-parchment-muted pointer-events-auto cursor-grab shadow-[0_10px_40px_rgba(0,0,0,0.5)] -rotate-6"
                        style={{ clipPath: "polygon(2% 2%, 98% 5%, 95% 98%, 5% 95%)" }}
                    >
                        <div className="w-full h-full border-[3px] border-crimson/40 m-2" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-20">
                            <span className="font-heading-scrap text-8xl rotate-90 tracking-widest text-ink-black">RONIN</span>
                        </div>
                    </motion.div>

                    {/* Kanji Calligraphy */}
                    <motion.div
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") playSound("drop");
                        }}
                        drag
                        onDragStart={() => playSound("drag")}
                        onDragEnd={() => playSound("drop")}
                        dragConstraints={{ left: -400, right: 100, top: -100, bottom: 400 }}
                        whileDrag={{ scale: 1.15, rotate: 15, cursor: "grabbing", zIndex: 100 }}
                        className="absolute top-[18%] right-[5%] p-6 md:p-10 bg-parchment pointer-events-auto cursor-grab shadow-2xl border-2 border-charcoal rotate-12"
                    >
                        <div className="scrap-tape top-[-10px] left-[50%] w-16 h-8 -translate-x-1/2 rotate-[-5deg]" />
                        <p className="kanji text-5xl md:text-7xl text-ink-black opacity-90" style={{ writingMode: "vertical-rl" }}>大道無門</p>
                    </motion.div>



                    {/* Floating Stamp */}
                    <motion.div
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") playSound("drop");
                        }}
                        drag
                        onDragStart={() => playSound("drag")}
                        onDragEnd={() => playSound("drop")}
                        dragConstraints={{ left: -200, right: 200, top: -400, bottom: 200 }}
                        whileDrag={{ scale: 1.2, rotate: -30, cursor: "grabbing", zIndex: 100 }}
                        className="absolute bottom-[10%] right-[25%] w-24 h-24 rounded-full border-4 border-gold-muted pointer-events-auto cursor-grab flex items-center justify-center -rotate-[25deg]"
                    >
                        <span className="font-heading-scrap text-sm text-gold-muted text-center leading-none">DATA<br />SCIENCE</span>
                    </motion.div>

                    {/* Profile Picture Polaroid */}
                    <motion.div
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") playSound("drop");
                        }}
                        drag
                        onDragStart={() => playSound("drag")}
                        onDragEnd={() => playSound("drop")}
                        dragConstraints={{ left: -300, right: 300, top: -200, bottom: 400 }}
                        whileDrag={{ scale: 1.1, rotate: 10, cursor: "grabbing", zIndex: 100 }}
                        className="absolute top-[35%] left-[60%] md:left-[64%] lg:left-[68%] hidden sm:block w-48 md:w-56 p-3 pb-8 bg-parchment pointer-events-auto cursor-grab shadow-2xl border-2 border-charcoal rotate-[8deg]"
                    >
                        <div className="w-full aspect-[4/5] bg-ink-black mb-2 border-2 border-charcoal overflow-hidden relative">
                            {/* Uses the uploaded profile picture */}
                            <img src="/images/profile.jpg" alt="Profile collage" className="w-full h-full object-cover filter contrast-125 sepia-[0.2]" draggable={false} />
                            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay pointer-events-none" />
                        </div>
                        <p className="font-heading-scrap text-xl text-ink-black text-center uppercase tracking-widest mt-2">{personalInfo.name.split(' ')[0]}</p>
                        <div className="scrap-tape top-[-15px] left-[50%] w-20 h-8 -translate-x-1/2 rotate-[-5deg]" />
                    </motion.div>
                </motion.div>
            )}

            {/* Main Content — always server-rendered */}
            <motion.div
                className="container relative z-10 flex flex-col justify-center items-start lg:w-3/4 mx-auto mt-10 md:mt-20 gap-12"
                style={{ y: textY }}
            >
                {/* ── IDENTITY CARD (THE 3-SECOND PITCH) ── */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const }}
                    className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 relative z-30"
                >
                    {/* Name badge */}
                    <div className="inline-flex items-center gap-3">
                        <div className="w-2 h-12 bg-crimson flex-shrink-0" />
                        <div>
                            <p suppressHydrationWarning className="font-heading-scrap text-3xl md:text-5xl leading-none tracking-tight uppercase" style={{ color: '#F5F0E8', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                                {personalInfo.name}
                            </p>
                            <p className="font-body-scrap text-xs md:text-sm text-crimson uppercase tracking-[0.2em] mt-1 font-bold">
                                B.Tech Data Science · SRM Institute
                            </p>
                        </div>
                    </div>

                    {/* Social proof chips */}
                    <div className="flex flex-wrap gap-2 sm:border-l-2 sm:border-crimson/40 sm:pl-6">
                        {CREDENTIALS.map((c) => (
                            <span
                                key={c.label}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-ink-black text-parchment font-heading-scrap text-[10px] md:text-xs uppercase tracking-widest border border-charcoal/60 shadow-[2px_2px_0px_var(--charcoal)]"
                            >
                                <span className="text-gold-muted font-bold">{c.label}</span>
                                <span className="text-stone-gray">·</span>
                                <span>{c.value}</span>
                            </span>
                        ))}
                    </div>
                </motion.div>

                {/* ── Main Title ── */}
                <motion.div
                    initial={{ opacity: 0, y: 50, rotate: -5 }}
                    animate={{ opacity: 1, y: 0, rotate: -2 }}
                    transition={{ duration: 0.8, delay: 0.15, ease: "backOut" }}
                    className="bg-parchment p-4 md:p-10 shadow-[8px_8px_0px_#0D0D0D] relative border-4 border-ink-black inline-block select-none transform hover:rotate-0 transition-transform duration-300 z-20"
                >
                    <div className="scrap-tape top-[-20px] left-[-20px] w-24 h-10 rotate-[-15deg]" />
                    <div className="scrap-tape bottom-[-20px] right-[-20px] w-24 h-10 rotate-[-15deg]" />
                    <p className="font-heading-scrap text-5xl md:text-7xl xl:text-8xl text-ink-black leading-none mb-4 md:mb-6">
                        BUILDING SYSTEMS
                    </p>
                    <p className="font-heading-scrap text-5xl md:text-7xl xl:text-8xl text-crimson leading-none">
                        <span suppressHydrationWarning className="brush-highlight px-4 py-2" style={{ color: '#FFFFFF' }}>THAT MATTER</span>
                    </p>
                </motion.div>

                {/* ── Bio + Research Card ── */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.35, ease: "backOut" }}
                    className="bg-charcoal text-parchment p-6 md:p-8 max-w-xl shadow-[6px_6px_0px_var(--crimson)] relative mt-2 rotate-2 border-2 border-ink-black z-20 select-none transform hover:rotate-1 transition-transform duration-300"
                >
                    <div className="scrap-tape top-[-10px] right-[20px] w-20 h-8 rotate-[10deg]" />
                    <p className="font-body-scrap text-base md:text-lg font-bold mb-3 text-parchment leading-relaxed uppercase tracking-wide">
                        {personalInfo.tagline}
                    </p>
                    <div className="h-[3px] w-full bg-crimson opacity-80 mb-3" />

                    {/* Published Research */}
                    <p className="font-heading-scrap text-xs text-gold-muted mb-2 uppercase tracking-widest">Published Research:</p>
                    <div className="space-y-1.5 mb-3">
                        {personalInfo.publications.map((pub) => (
                            <div key={pub.venue} className="flex items-start gap-2">
                                <span className="text-crimson font-bold text-xs mt-0.5">▸</span>
                                <p className="font-body-scrap text-xs text-parchment/80 leading-snug">
                                    <span className="font-bold text-parchment">{pub.venue}</span> — {pub.title}
                                    <span className="text-gold-muted ml-1">({pub.status})</span>
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="h-[1px] w-full bg-parchment/10 mb-3" />
                    <p className="font-heading-scrap text-xs text-stone-gray mb-1">SPECIALTIES:</p>
                    <p className="font-body-scrap text-sm text-gold-muted font-bold tracking-widest">
                        Data Science // Reinforcement Learning // Full-Stack
                    </p>
                </motion.div>

                {/* ── CTAs ── */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.55 }}
                    className="mt-8 md:ml-auto z-30 flex flex-wrap gap-4"
                >
                    <button
                        onClick={() => {
                            window.location.hash = "#battles";
                        }}
                        className="inline-block px-8 py-4 bg-crimson text-parchment font-heading-scrap text-xl md:text-2xl border-4 border-ink-black shadow-[6px_6px_0px_#0D0D0D] hover:bg-ink-black hover:text-crimson hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all uppercase cursor-pointer"
                    >
                        EXPLORE THE WORK →
                    </button>
                    <a
                        href={personalInfo.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-6 py-4 bg-ink-black text-parchment font-heading-scrap text-lg border-4 border-charcoal shadow-[6px_6px_0px_var(--charcoal)] hover:bg-parchment hover:text-ink-black hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all uppercase cursor-pointer"
                    >
                        GitHub
                    </a>
                    <a
                        href={personalInfo.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-6 py-4 bg-ink-black text-parchment font-heading-scrap text-lg border-4 border-charcoal shadow-[6px_6px_0px_var(--crimson)] hover:bg-crimson hover:border-crimson hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all uppercase cursor-pointer"
                    >
                        LinkedIn
                    </a>
                </motion.div>
            </motion.div>

            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-ink-black to-transparent pointer-events-none z-40 opacity-90" />
        </section>
    );
}
