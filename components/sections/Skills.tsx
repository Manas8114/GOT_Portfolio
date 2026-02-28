"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { skills } from "@/lib/data";
import { useState, useEffect, useRef } from "react";
import { useSound } from "@/components/SoundSystem";

// Seeded positions for each category — deterministic & SSR-safe
const categoryLayout = [
    { top: "5%", left: "5%", rotate: "-6deg" },
    { top: "8%", left: "55%", rotate: "4deg" },
    { top: "38%", left: "15%", rotate: "7deg" },
    { top: "42%", left: "60%", rotate: "-9deg" },
    { top: "72%", left: "25%", rotate: "3deg" },
];

// Individual chip rotations per index
function chipRotation(i: number): string {
    const angles = [-3, 2, -1, 4, -2, 1, -4, 3, -1, 2];
    return `${angles[i % angles.length]}deg`;
}

interface SkillItemProps {
    name: string;
    level: number;
    index: number;
}

function SkillItem({ name, level, index }: SkillItemProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const { playSound } = useSound();

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ type: "spring", delay: index * 0.04, stiffness: 300, damping: 20 }}
            whileHover={{ scale: 1.15, zIndex: 50, rotate: 0 }}
            onMouseEnter={() => playSound("hover")}
            className="relative group"
            style={{ transform: `rotate(${chipRotation(index)})` }}
        >
            <div className="font-body-scrap text-sm font-bold px-3 py-2 bg-charcoal text-parchment border-2 border-ink-black hover:bg-crimson transition-colors cursor-default select-none">
                <span className="block mb-1">{name}</span>
                <div
                    className="ink-fill-bar"
                    style={{ "--fill": isInView ? `${level}%` : "0%" } as React.CSSProperties}
                />
            </div>
            {/* Mastery tooltip on hover */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                <span className="font-body-scrap text-xs font-black bg-ink-black text-gold-muted px-2 py-1 border border-gold-muted whitespace-nowrap">
                    {level}%
                </span>
            </div>
        </motion.div>
    );
}

interface SkillCategoryProps {
    title: string;
    icon: React.ReactNode;
    items: { name: string; level: number }[];
    index: number;
    layout: { top: string; left: string; rotate: string };
}

function SkillCategory({ title, icon, items, index, layout }: SkillCategoryProps) {
    const { playSound } = useSound();

    return (
        <motion.div
            drag
            onDragStart={() => playSound("click")}
            dragConstraints={{ left: -300, right: 300, top: -200, bottom: 400 }}
            whileDrag={{ scale: 1.05, rotate: (parseInt(layout.rotate) || 0) + 5, cursor: "grabbing", zIndex: 100 }}
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", delay: index * 0.12 }}
            className="w-[90vw] md:w-[360px] bg-parchment p-6 pb-5 mb-8 md:mb-0 relative cursor-grab z-10 hover:z-50 md:absolute border-4 border-ink-black shadow-[8px_8px_0px_#0D0D0D] torn-edge"
            style={{
                top: layout.top,
                left: layout.left,
                rotate: layout.rotate,
            }}
        >
            {/* Tape decoration */}
            <div className="scrap-tape top-[-15px] left-[50%] -translate-x-1/2 w-20 h-8 rotate-[5deg]" />

            {/* Ink smudge corner */}
            <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-crimson/20 rounded-full blur-xl pointer-events-none" />

            {/* Category Header */}
            <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{icon}</span>
                <h3 className="font-heading-scrap text-3xl text-crimson uppercase pt-2 leading-none">
                    {title}
                </h3>
            </div>

            {/* Dashed separator */}
            <div className="border-t-2 border-dashed border-ink-black/30 mb-4" />

            {/* Skill chips with mastery bars */}
            <div className="flex flex-wrap gap-2">
                {items.map((skill, i) => (
                    <SkillItem
                        key={skill.name}
                        name={skill.name}
                        level={skill.level}
                        index={i}
                    />
                ))}
            </div>
        </motion.div>
    );
}

import { Code2, BrainCircuit, BarChart3, Database, Wrench } from "lucide-react";

export default function Skills() {
    const [isMobile, setIsMobile] = useState(false);
    const [mounted, setMounted] = useState(false);
    const containerRef = useRef<HTMLElement>(null);
    const { playSound } = useSound();

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const bgY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

    useEffect(() => {
        setMounted(true);
        setIsMobile(window.innerWidth <= 768);
    }, []);


    const categories = [
        { title: "Languages", icon: <Code2 className="w-8 h-8 text-charcoal" />, items: skills.languages },
        { title: "AI / ML", icon: <BrainCircuit className="w-8 h-8 text-charcoal" />, items: skills.aiml },
        { title: "Data Science", icon: <BarChart3 className="w-8 h-8 text-charcoal" />, items: skills.datascience },
        { title: "Backend", icon: <Database className="w-8 h-8 text-charcoal" />, items: skills.backend },
        { title: "Tools", icon: <Wrench className="w-8 h-8 text-charcoal" />, items: skills.tools },
    ];

    return (
        <section
            id="skills"
            ref={containerRef}
            className="relative min-h-[150vh] w-full pt-20 pb-40 overflow-hidden"
            style={{ background: "transparent" }}
        >
            <div className="container relative z-10 max-w-6xl mx-auto h-full px-4">

                {/* Large Background Kanji Watermark */}
                <motion.div
                    className="absolute top-[15%] right-[0%] z-0 pointer-events-none select-none opacity-[0.06]"
                    style={{ y: bgY }}
                >
                    <h2 className="font-heading-scrap text-[12rem] md:text-[20rem] leading-none text-crimson text-right uppercase" style={{ writingMode: "vertical-rl" }}>
                        器
                    </h2>
                </motion.div>

                {/* Decorative dashed connector lines */}
                <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-20 hidden md:block" viewBox="0 0 1000 1200" fill="none" stroke="var(--crimson)" strokeWidth="2" strokeDasharray="8 12" strokeLinecap="round">
                    <path d="M 200,150 C 400,300 300,500 600,400" />
                    <path d="M 700,200 C 500,350 650,600 400,650" />
                    <path d="M 350,700 C 500,800 700,750 650,950" />
                </svg>

                {/* Section Title */}
                <div className="mb-20 md:mb-0 relative z-20 md:w-1/2 pt-10">
                    <motion.div
                        drag
                        onDragStart={() => playSound("hover")}
                        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                        whileDrag={{ scale: 1.05, rotate: -5, cursor: "grabbing", zIndex: 100 }}
                        className="inline-block bg-crimson p-4 border-4 border-ink-black shadow-[6px_6px_0px_#0D0D0D] transform rotate-[-2deg] cursor-grab"
                    >
                        <h2 className="font-heading-scrap text-5xl md:text-7xl text-parchment uppercase m-0 leading-none">
                            The Arsenal
                        </h2>
                    </motion.div>
                    <p className="font-body-scrap text-lg font-bold text-ink-black mt-6 ml-4 max-w-sm bg-parchment-muted p-4 border-2 border-charcoal transform rotate-[2deg]">
                        Weapons forged and sharpened through countless hours of problem-solving. Drag to explore.
                    </p>
                </div>

                {/* Skills Container — scattered on desktop, stacked on mobile */}
                <div className="relative w-full h-full md:mt-[-100px] z-30 flex flex-col md:block items-center">
                    {categories.map((category, index) => (
                        <SkillCategory
                            key={category.title}
                            title={category.title}
                            icon={category.icon}
                            items={category.items}
                            index={index}
                            layout={isMobile ? { top: "auto", left: "auto", rotate: "0deg" } : categoryLayout[index]}
                        />
                    ))}
                </div>

            </div>

            {/* Background Ink Splatters */}
            <div className="absolute top-[50%] left-[20%] w-64 h-64 bg-charcoal mix-blend-multiply opacity-20 rounded-full blur-3xl pointer-events-none z-0" />
            <div className="absolute bottom-[20%] right-[30%] w-96 h-96 bg-crimson mix-blend-multiply opacity-15 rounded-full blur-3xl pointer-events-none z-0" />
            <div className="absolute top-[30%] right-[10%] w-40 h-40 bg-gold-muted mix-blend-multiply opacity-10 rounded-full blur-2xl pointer-events-none z-0" />
        </section>
    );
}
