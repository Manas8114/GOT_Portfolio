"use client";

import { motion } from "framer-motion";
import { projects } from "@/lib/data";
import { useState, useEffect } from "react";

interface ProjectCardProps {
    project: (typeof projects)[0];
    index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
    const categoryColors: Record<string, string> = {
        research: "var(--crimson)",
        "ai-ml": "var(--gold-muted)",
        systems: "var(--charcoal)",
        web: "var(--stone-gray)",
    };

    // calculate random-looking pseudo-scattered positions
    const pos = {
        top: `${Math.random() * 40 + 10}%`,
        left: `${Math.random() * 60 + 10}%`,
        rotate: `${Math.random() * 30 - 15}deg`,
    };

    return (
        <motion.div
            drag
            dragConstraints={{ left: -400, right: 400, top: -200, bottom: 400 }}
            whileDrag={{ scale: 1.05, cursor: "grabbing", zIndex: 100 }}
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", delay: index * 0.1 }}
            className="polaroid-card w-[85vw] md:w-[400px] mb-12 md:mb-0 relative cursor-grab z-10 hover:z-50 md:absolute max-w-full"
            style={{
                top: typeof window !== "undefined" && window.innerWidth > 768 ? pos.top : "auto",
                left: typeof window !== "undefined" && window.innerWidth > 768 ? pos.left : "auto",
                rotate: typeof window !== "undefined" && window.innerWidth > 768 ? pos.rotate : "0deg",
            }}
        >
            <div className="w-full h-48 bg-ink-black flex items-center justify-center border-2 border-charcoal overflow-hidden relative mb-4">
                <div className="absolute inset-0 bg-crimson opacity-20 mix-blend-overlay"></div>
                <h3 className="font-heading-scrap text-3xl md:text-5xl text-parchment px-4 text-center z-10 leading-none" style={{ mixBlendMode: "difference" }}>
                    {project.title.toUpperCase()}
                </h3>
                {/* Vintage overlay effect */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.15\'/%3E%3C/svg%3E')] mix-blend-overlay pointer-events-none" />
            </div>

            <div className="flex items-center justify-between mb-2">
                <span className="font-heading-scrap text-sm px-2 py-1 bg-parchment border border-ink-black" style={{ color: categoryColors[project.category] || "var(--ink-black)" }}>
                    #{project.category.toUpperCase()}
                </span>
                {project.featured && <span className="text-crimson font-bold text-xl">★</span>}
            </div>

            <p className="font-body-scrap text-sm font-bold text-stone-gray mb-4 leading-relaxed line-clamp-3">
                {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.slice(0, 4).map((tech) => (
                    <span
                        key={tech}
                        className="text-xs font-bold px-2 py-1 bg-gold-muted text-ink-black border border-ink-black transform -rotate-2"
                    >
                        {tech}
                    </span>
                ))}
            </div>

            <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-ink-black text-parchment font-heading-scrap text-sm border-2 border-charcoal hover:bg-crimson hover:text-parchment transition-colors uppercase w-full text-center"
            >
                View Case File →
            </a>

            {/* Random tape on top */}
            <div className="scrap-tape top-[-10px] left-[50%] -translate-x-1/2 w-24 h-8 rotate-[2deg]" />
        </motion.div>
    );
}

export default function Projects() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <section
            id="battles"
            className="relative min-h-[150vh] w-full pt-10 pb-32"
            style={{ background: "transparent" }}
        >
            <div className="container relative z-10 max-w-6xl mx-auto h-full px-4">

                {/* Large Background Text */}
                <div className="absolute top-[5%] left-[5%] z-0 pointer-events-none select-none opacity-10">
                    <h2 className="font-heading-scrap text-[8rem] md:text-[12rem] xl:text-[16rem] leading-none text-ink-black uppercase">
                        The<br />Archive
                    </h2>
                </div>

                {/* Section Intro Note */}
                <motion.div
                    drag
                    dragConstraints={{ left: -50, right: 300, top: -50, bottom: 200 }}
                    whileDrag={{ scale: 1.05, cursor: "grabbing", zIndex: 100 }}
                    className="bg-charcoal p-6 shadow-[6px_6px_0px_var(--crimson)] border-2 border-ink-black max-w-sm absolute top-20 right-[5%] md:right-[15%] z-30 cursor-grab transform rotate-[-4deg]"
                >
                    <div className="scrap-tape top-[-15px] right-[20px] w-16 h-8 rotate-[10deg]" />
                    <p className="font-heading-scrap text-2xl text-parchment mb-2 uppercase text-crimson">Case Files</p>
                    <p className="font-body-scrap text-sm text-parchment font-bold leading-relaxed">
                        Each piece is a solution forged through research and discipline. The code is just a byproduct of the thinking. Drag the files around to explore.
                    </p>
                </motion.div>

                {/* Projects Container */}
                <div className="relative w-full h-full mt-64 md:mt-40 z-20 flex flex-col md:block items-center">
                    {projects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>

            </div>
            {/* Background Texture Overlay specific to this section */}
            <div className="absolute inset-0 bg-parchment-muted opacity-30 mix-blend-multiply pointer-events-none z-0" />
        </section>
    );
}
