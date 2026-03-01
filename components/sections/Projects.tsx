"use client";

import { motion } from "framer-motion";
import { projects } from "@/lib/data";
import { useState, useEffect } from "react";
import { useSound } from "@/components/SoundSystem";

const projectLayout = [
    { top: "2%", left: "5%", rotate: "-3deg" },
    { top: "10%", left: "50%", rotate: "4deg" },
    { top: "22%", left: "8%", rotate: "-6deg" },
    { top: "30%", left: "48%", rotate: "2deg" },
    { top: "42%", left: "4%", rotate: "-4deg" },
    { top: "50%", left: "52%", rotate: "5deg" },
    { top: "62%", left: "6%", rotate: "-2deg" },
    { top: "70%", left: "49%", rotate: "3deg" },
    { top: "82%", left: "5%", rotate: "-5deg" },
    { top: "90%", left: "51%", rotate: "2deg" },
    { top: "102%", left: "7%", rotate: "-3deg" },
    { top: "110%", left: "48%", rotate: "4deg" },
    { top: "122%", left: "4%", rotate: "-4deg" },
    { top: "130%", left: "50%", rotate: "3deg" },
];

interface ProjectCardProps {
    project: (typeof projects)[0];
    index: number;
    layout: { top: string; left: string; rotate: string };
    isMobile: boolean;
}

function ProjectCard({ project, index, layout, isMobile }: ProjectCardProps) {
    const { playSound } = useSound();
    const categoryColors: Record<string, string> = {
        research: "var(--crimson)",
        "ai-ml": "var(--gold-muted)",
        systems: "var(--charcoal)",
        web: "var(--stone-gray)",
    };

    const isManila = project.isResearch;

    // Define the primary projects that deserve larger scale/focus
    const topTierIds = ["icicv-cnn", "wocc-network-slicing", "6g-network"];
    const isTopTier = topTierIds.includes(project.id);

    return (
        <motion.div
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") playSound("drop");
            }}
            drag
            onDragStart={() => playSound("drag")}
            onDragEnd={() => playSound("drop")}
            dragConstraints={{ left: -400, right: 400, top: -200, bottom: 400 }}
            whileDrag={{
                scale: 1.06,
                cursor: "grabbing",
                zIndex: 100,
                boxShadow: "16px 24px 48px rgba(13,13,13,0.35), 0 0 0 2px var(--crimson)",
                rotate: 0,
            }}
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", delay: index * 0.1 }}
            className={`group ${isTopTier ? "w-[95vw] md:w-[480px]" : "w-[85vw] md:w-[380px]"} mb-12 md:mb-0 relative cursor-grab z-10 hover:z-50 ${isMobile ? "" : "absolute"} max-w-full transition-shadow duration-300`}
            style={{
                top: isMobile ? "auto" : layout.top,
                left: isMobile ? "auto" : layout.left,
                rotate: isMobile ? "0deg" : layout.rotate,
                willChange: "transform"
            }}
        >
            {/* The Manila Folder Tab */}
            {isManila && (
                <div className="absolute -top-6 left-4 w-32 h-8 bg-[#E6C280] border-2 border-b-0 border-charcoal rounded-t-xl z-0 flex items-center justify-center">
                    <span className="font-heading-scrap text-xs text-charcoal uppercase font-bold px-2 py-1 transform -rotate-1">
                        Research
                    </span>
                    <span className="absolute -top-3 -right-3 text-2xl transform rotate-12 drop-shadow-md">📎</span>
                </div>
            )}

            {/* The Main Folder Body */}
            <div className={`
                ${isTopTier ? 'bg-[#2A1A1A] border-[#8B1A1A]' : isManila ? 'bg-[#F4D08F] border-[#D1A054]' : 'bg-parchment border-charcoal'}
                p-4 border-2 shadow-[8px_8px_0px_var(--charcoal)] relative z-10 transition-all duration-300
            `}>

                {/* CLASSIFIED Stamp for Top Tier */}
                {isTopTier && (
                    <div className="absolute top-8 right-[-10px] z-30 transform rotate-12 opacity-80 pointer-events-none mix-blend-multiply">
                        <div className="border-4 border-crimson text-crimson font-heading-scrap text-2xl md:text-3xl px-3 py-1 font-bold tracking-widest uppercase">
                            CLASSIFIED
                        </div>
                    </div>
                )}

                <div className="w-full h-40 bg-ink-black flex items-center justify-center border-2 border-charcoal overflow-hidden relative mb-4">
                    <div className="absolute inset-0 bg-crimson opacity-20 mix-blend-overlay"></div>
                    <h3 className={`font-heading-scrap ${isTopTier ? 'text-4xl md:text-5xl' : 'text-3xl md:text-4xl'} text-parchment px-4 text-center z-10 leading-none`} style={{ mixBlendMode: "difference" }}>
                        {project.title.toUpperCase()}
                    </h3>
                    {/* Replaced heavy SVG generator with a static noise background class (assumed to be loaded globally via CSS or as a light webp) */}
                    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay pointer-events-none" style={{ backgroundSize: '150px' }} />
                </div>

                <div className="flex items-center justify-between mb-2">
                    <span className={`font-heading-scrap text-sm px-2 py-1 border border-ink-black ${isTopTier ? 'bg-crimson text-parchment' : isManila ? 'bg-parchment' : 'bg-charcoal'}`} style={{ color: isTopTier ? undefined : isManila ? categoryColors[project.category] || "var(--ink-black)" : "var(--parchment)" }}>
                        #{project.category.toUpperCase()}
                    </span>
                    {project.featured && <span className="text-crimson font-bold text-xl drop-shadow-sm">★</span>}
                </div>

                {/* Collapsible Content */}
                <div className="max-h-0 opacity-0 group-hover:max-h-96 group-hover:opacity-100 overflow-hidden transition-all duration-500 ease-in-out">
                    <div className="pt-2 border-t-2 border-dashed border-ink-black/20 mt-2">
                        <p className={`font-body-scrap text-sm font-bold ${isTopTier ? 'text-parchment/80' : 'text-ink-black'} mb-4 leading-relaxed line-clamp-4`}>
                            {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                            {project.technologies.slice(0, 4).map((tech) => (
                                <span
                                    key={tech}
                                    className="text-xs font-bold px-2 py-1 bg-gold-muted text-ink-black border border-ink-black transform -rotate-1"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>

                        <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-block px-4 py-2 font-heading-scrap text-sm border-2 border-charcoal transition-colors uppercase w-full text-center ${isManila ? 'bg-charcoal text-parchment hover:bg-crimson' : 'bg-crimson text-parchment hover:bg-ink-black'}`}
                        >
                            Open Case File →
                        </a>
                    </div>
                </div>
            </div>

            {/* Random tape on top */}
            {!isManila && <div className="scrap-tape top-[-10px] left-[50%] -translate-x-1/2 w-24 h-8 rotate-[2deg] z-20" />}

            {/* Onboarding Interaction Cue (Only on the very first card) */}
            {index === 0 && (
                <div className="absolute -bottom-16 -right-12 md:-right-24 z-50 pointer-events-none animate-bounce hidden sm:block opacity-60">
                    <svg width="120" height="80" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform -rotate-12">
                        <path d="M10.5 15.5C30.5 5.5 80.5 -4.5 95.5 35.5C108.5 70.1667 95.5 65.5 90.5 70.5M90.5 70.5C92.5 60.5 105.167 68.8333 110.5 65.5M90.5 70.5C85.5 65.5 80.5 72.1667 75.5 70.5" stroke="var(--crimson)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        <text x="15" y="45" fontFamily="'Courier New', Courier, monospace" fontSize="12" fill="var(--crimson)" fontWeight="bold" transform="rotate(5 15 45)">Drag & Hover!</text>
                    </svg>
                </div>
            )}

        </motion.div>
    );
}

export default function Projects() {
    const [mounted, setMounted] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [resetKey, setResetKey] = useState(0);
    const { playSound } = useSound(); // Ensure playSound is available here

    const handleReorganize = () => {
        playSound('click');
        setResetKey(prev => prev + 1);
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);

        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile(); // Check on mount

        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    if (!mounted) return null;

    return (
        <section id="battles" className="min-h-screen py-20 px-4 md:px-8 max-w-7xl mx-auto relative overflow-hidden" suppressHydrationWarning>
            <div className="absolute top-0 right-0 w-64 h-64 bg-[url('/grid.png')] opacity-10 pointer-events-none" />

            {/* Tidy Desk Button */}
            <div className="flex justify-between items-end mb-16 relative z-50">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative"
                >
                    <div className="absolute -inset-4 bg-crimson/10 rotate-2 blur-lg" />
                    <h2 className="text-4xl md:text-6xl font-heading-scrap text-charcoal tracking-tighter uppercase relative">
                        Case Files
                        <span className="block text-xl md:text-2xl text-crimson font-body-scrap tracking-widest mt-2">Active Targets</span>
                    </h2>
                    <motion.div
                        className="h-2 w-full bg-crimson mt-2 origin-left"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    />
                </motion.div>

                <button
                    onClick={handleReorganize}
                    className="group flex flex-col items-center justify-center gap-1 cursor-pointer transition-transform hover:scale-105 active:scale-95"
                >
                    <div className="w-12 h-12 bg-charcoal rounded-full flex items-center justify-center shadow-[4px_4px_0px_var(--crimson)] border-2 border-crimson text-parchment group-hover:bg-crimson group-hover:text-charcoal transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></svg>
                    </div>
                    <span className="font-heading-scrap text-sm uppercase text-charcoal font-bold tracking-widest">Tidy Desk</span>
                </button>
            </div>

            <div className="relative mt-20" suppressHydrationWarning>
                {/* Board edge texture */}
                <div className="absolute -inset-x-4 -inset-y-8 bg-gradient-to-br from-parchment-light to-parchment-dark shadow-inner-lg border-t-2 border-b-2 border-charcoal/20 z-0" />

                {/* Projects Scattered Grid */}
                <div className={`relative w-full z-30 ${isMobile ? "flex flex-col items-center" : ""}`}
                    style={{ height: isMobile ? "auto" : "2000px" }}
                    key={resetKey} // Used to force a hard remount/revert on "Tidy Desk"
                >
                    {projects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} layout={projectLayout[index] || projectLayout[0]} isMobile={isMobile} />
                    ))}
                </div>
            </div>
        </section>
    );
}
