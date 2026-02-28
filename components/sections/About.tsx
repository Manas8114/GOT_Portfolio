"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { personalInfo, strengths } from "@/lib/data";
import { Sparkles, Puzzle, BarChart3 } from "lucide-react";
import { useSound } from "@/components/SoundSystem";
import { useRef } from "react";

const StrengthIcon = ({ title, className }: { title: string, className?: string }) => {
    switch (title) {
        case "Creativity and Adaptability": return <Sparkles className={className} />;
        case "Problem-Solving": return <Puzzle className={className} />;
        case "Data Analysis and Visualization": return <BarChart3 className={className} />;
        default: return <Sparkles className={className} />;
    }
};

export default function About() {
    const containerRef = useRef<HTMLElement>(null);
    const { playSound } = useSound();

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const bgY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
    return (
        <section
            id="warrior"
            ref={containerRef}
            className="relative min-h-[160vh] w-full overflow-hidden pt-24 pb-32"
            style={{ background: "transparent" }}
        >
            <div className="container relative z-10 max-w-6xl mx-auto h-full flex flex-col justify-start">

                {/* Section Title Background Scrap */}
                <motion.div
                    className="absolute top-[10%] right-[5%] z-0 pointer-events-none opacity-20 hidden md:block select-none"
                    style={{ y: bgY }}
                >
                    <h2 className="font-heading-scrap text-[15rem] leading-none text-ink-black rotate-[-90deg] translate-x-20 origin-right">
                        ABOUT
                    </h2>
                </motion.div>

                {/* Main Identity "Sticky Note" */}
                <motion.div
                    drag
                    onDragStart={() => playSound("hover")}
                    dragConstraints={{ left: -100, right: 300, top: -50, bottom: 200 }}
                    whileDrag={{ scale: 1.05, rotate: -8, cursor: "grabbing", zIndex: 100 }}
                    initial={{ opacity: 0, rotate: -5, x: -50 }}
                    whileInView={{ opacity: 1, rotate: -2, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="bg-gold-light/90 p-6 md:p-10 shadow-[8px_8px_0px_#0D0D0D] border-4 border-ink-black max-w-2xl w-[90%] md:w-auto relative cursor-grab mb-12 z-20"
                >
                    <div className="scrap-tape top-[-20px] left-[40%] w-32 h-10 rotate-[5deg]" />
                    <p className="font-heading-scrap text-3xl md:text-5xl text-ink-black mb-4 uppercase">
                        I don&apos;t build to ship —<br />
                        <span className="text-parchment brush-highlight px-2 leading-relaxed">I build to understand.</span>
                    </p>
                    <p className="font-body-scrap text-lg md:text-xl text-ink-black font-medium leading-relaxed mt-6">
                        Currently pursuing <span className="font-bold underline decoration-crimson decoration-4 underline-offset-4">{personalInfo.education.degree}</span> at{" "}
                        <span className="font-bold underline decoration-crimson decoration-4 underline-offset-4">{personalInfo.education.institution}</span>.
                    </p>

                    {/* CGPA + Graduation tag */}
                    <div className="flex flex-wrap gap-3 mt-4">
                        <span className="font-body-scrap text-sm bg-ink-black text-gold-muted px-3 py-1 font-black border border-ink-black">
                            CGPA: {personalInfo.education.cgpa}
                        </span>
                        <span className="font-body-scrap text-sm bg-ink-black text-parchment px-3 py-1 font-black border border-ink-black">
                            Graduating: {personalInfo.education.graduationYear}
                        </span>
                        <span className="font-body-scrap text-sm bg-crimson text-parchment px-3 py-1 font-black border border-ink-black">
                            IELTS: {personalInfo.ielts}
                        </span>
                    </div>

                    {/* Languages tag */}
                    <div className="absolute -bottom-6 -right-6 md:-right-12 bg-ink-black text-parchment p-3 border-2 border-parchment rotate-[10deg] shadow-lg">
                        <p className="font-heading-scrap text-sm mb-1 uppercase text-gold-muted">Tongues Spoken:</p>
                        <ul className="font-body-scrap text-xs list-square pl-4 font-black">
                            {personalInfo.languages.map(lang => (
                                <li key={lang.name}>{lang.name} ({lang.level})</li>
                            ))}
                        </ul>
                    </div>
                </motion.div>

                {/* Research Interests — scattered tags */}
                <motion.div
                    drag
                    onDragStart={() => playSound("click")}
                    dragConstraints={{ left: -100, right: 200, top: -50, bottom: 100 }}
                    initial={{ opacity: 0, x: 80 }}
                    whileDrag={{ scale: 1.05, rotate: 5, cursor: "grabbing", zIndex: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-charcoal p-5 md:p-6 border-4 border-ink-black shadow-[6px_6px_0px_var(--crimson)] max-w-lg md:ml-auto md:mr-[5%] mb-10 relative cursor-grab z-20 transform md:rotate-[2deg]"
                >
                    <div className="scrap-tape top-[-12px] right-[20px] w-16 h-7 rotate-[8deg]" />
                    <p className="font-heading-scrap text-xl text-crimson mb-3 uppercase">Research Focus</p>
                    <div className="flex flex-wrap gap-2">
                        {personalInfo.researchInterests.map((interest, i) => (
                            <motion.span
                                key={interest}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                whileHover={{ scale: 1.1, rotate: -2 }}
                                className="font-body-scrap text-xs font-black px-3 py-1.5 bg-parchment text-ink-black border-2 border-ink-black cursor-default select-none"
                            >
                                {interest}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>

                {/* Publications — pinned note */}
                <motion.div
                    drag
                    onDragStart={() => playSound("hover")}
                    dragConstraints={{ left: -100, right: 200, top: -100, bottom: 200 }}
                    initial={{ opacity: 0, y: 50 }}
                    whileDrag={{ scale: 1.05, rotate: -5, cursor: "grabbing", zIndex: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-parchment p-5 md:p-6 border-4 border-ink-black shadow-[6px_6px_0px_#0D0D0D] max-w-xl mx-4 md:ml-[5%] mb-10 relative cursor-grab z-20 transform md:rotate-[-3deg]"
                >
                    <div className="scrap-tape top-[-12px] left-[30%] w-20 h-7 rotate-[-5deg]" />
                    <p className="font-heading-scrap text-xl text-crimson mb-4 uppercase">📄 Publications</p>
                    {personalInfo.publications.map((pub, i) => (
                        <div key={i} className="mb-3 last:mb-0">
                            <p className="font-body-scrap text-sm font-bold text-ink-black leading-snug">
                                &ldquo;{pub.title}&rdquo;
                            </p>
                            <div className="flex flex-wrap gap-2 mt-1">
                                <span className="font-body-scrap text-[10px] font-black bg-crimson text-parchment px-2 py-0.5 border border-ink-black uppercase">
                                    {pub.venue}
                                </span>
                                <span className="font-body-scrap text-[10px] font-black bg-gold-muted text-ink-black px-2 py-0.5 border border-ink-black uppercase">
                                    {pub.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* Strengths scattered like Polaroids */}
                <div className="relative w-full h-[500px] mt-4 md:mt-0 z-30 flex flex-wrap justify-center items-center gap-4 md:block">
                    {/* Abstract path drawing */}
                    <div className="absolute inset-0 z-0 opacity-40 pointer-events-none hidden md:block">
                        <svg viewBox="0 0 800 400" className="w-full h-full stroke-crimson" fill="none" strokeWidth="4" strokeLinecap="round" strokeDasharray="10 15">
                            <path d="M 100,200 C 300,50 500,350 700,100" />
                        </svg>
                    </div>

                    <p className="font-heading-scrap text-6xl md:text-8xl text-ink-black absolute top-0 left-0 md:left-20 md:top-20 z-0 opacity-10">THE ARSENAL</p>

                    {strengths.map((strength, index) => {
                        const positions = [
                            { top: "10%", left: "10%", rotate: "-8deg" },
                            { top: "35%", left: "45%", rotate: "12deg" },
                            { top: "60%", left: "20%", rotate: "-15deg" },
                        ];
                        const pos = positions[index] || positions[0];

                        return (
                            <motion.div
                                key={strength.title}
                                drag
                                onDragStart={() => playSound("click")}
                                whileDrag={{ scale: 1.15, rotate: (parseInt(pos.rotate) || 0) + 10, cursor: "grabbing", zIndex: 100 }}
                                dragConstraints={{ left: -300, right: 300, top: -300, bottom: 300 }}
                                initial={{ opacity: 0, scale: 0.5, y: 100 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ type: "spring", delay: index * 0.2 }}
                                className="polaroid-card w-64 md:w-72 absolute md:block relative m-4 md:m-0 cursor-grab z-10 hover:z-50"
                                style={{
                                    top: pos.top,
                                    left: pos.left,
                                    rotate: pos.rotate,
                                }}
                            >
                                <div className="bg-charcoal w-full h-40 mb-4 flex items-center justify-center border-2 border-ink-black overflow-hidden relative">
                                    <span className="text-7xl z-10">{strength.icon}</span>
                                    <div className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none" />
                                </div>
                                <h4 className="font-heading-scrap text-xl md:text-2xl text-ink-black mb-2 uppercase">
                                    {strength.title}
                                </h4>
                                <p className="font-body-scrap text-sm font-bold text-stone-gray">
                                    {strength.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Interests Tag */}
                <motion.div
                    drag
                    dragConstraints={{ left: -100, right: 100, top: -50, bottom: 50 }}
                    className="absolute bottom-[2%] right-[5%] md:right-[20%] bg-crimson p-4 border-2 border-ink-black transform rotate-[8deg] cursor-grab shadow-[6px_6px_0px_#0D0D0D] z-40 w-64 md:mt-10"
                >
                    <div className="scrap-tape top-[-10px] left-[20px] w-20 h-6 rotate-[-12deg]" />
                    <p className="font-heading-scrap text-lg text-parchment mb-2 uppercase tracking-wide">Beyond the code:</p>
                    <div className="flex flex-wrap gap-2 text-ink-black">
                        {personalInfo.interests.map((interest) => (
                            <span key={interest} className="font-body-scrap text-sm bg-parchment px-2 py-1 font-bold border border-ink-black">
                                {interest.toUpperCase()}
                            </span>
                        ))}
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
