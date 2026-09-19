"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { skills, strengths } from "@/lib/data";
import { useRef } from "react";
import { useSound } from "@/components/SoundSystem";
import { useMounted, useIsMobile } from "@/lib/useClient";
import { Code2, BrainCircuit, BarChart3, Database, Wrench, Sparkles } from "lucide-react";

// Seeded positions for each category on desktop
const categoryLayout = [
    { top: "5%", left: "5%", rotate: "-5deg" },
    { top: "8%", left: "55%", rotate: "4deg" },
    { top: "36%", left: "12%", rotate: "6deg" },
    { top: "40%", left: "58%", rotate: "-6deg" },
    { top: "68%", left: "8%", rotate: "3deg" },
    { top: "70%", left: "56%", rotate: "-4deg" },
];

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
            whileHover={{ scale: 1.12, zIndex: 50, rotate: 0 }}
            onMouseEnter={() => playSound("hover")}
            className="relative group"
            style={{ transform: `rotate(${chipRotation(index)})` }}
        >
            <div className="font-body-scrap text-xs md:text-sm font-bold px-3 py-1.5 md:py-2 bg-charcoal text-parchment border-2 border-ink-black hover:bg-crimson transition-colors cursor-default select-none shadow-xs">
                <span className="block mb-1">{name}</span>
                <div
                    className="ink-fill-bar"
                    style={{ "--fill": isInView ? `${level}%` : "0%" } as React.CSSProperties}
                />
            </div>
            {/* Mastery tooltip on hover */}
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                <span className="font-body-scrap text-[10px] font-black bg-ink-black text-gold-muted px-2 py-0.5 border border-gold-muted whitespace-nowrap shadow-md">
                    {level}% Mastery
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
    isMobile: boolean;
}

function SkillCategory({ title, icon, items, index, layout, isMobile }: SkillCategoryProps) {
    const { playSound } = useSound();

    return (
        <motion.div
            drag
            onDragStart={() => playSound("click")}
            dragConstraints={{ left: -150, right: 150, top: -100, bottom: 150 }}
            whileDrag={{ scale: 1.04, rotate: 0, cursor: "grabbing", zIndex: 100 }}
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", delay: index * 0.08 }}
            className={`w-[90vw] md:w-[380px] bg-parchment p-5 md:p-6 pb-5 mb-8 md:mb-0 relative cursor-grab z-10 hover:z-40 ${isMobile ? "" : "md:absolute"} border-4 border-ink-black shadow-[8px_8px_0px_#0D0D0D] torn-edge`}
            style={{
                top: isMobile ? "auto" : layout.top,
                left: isMobile ? "auto" : layout.left,
                rotate: isMobile ? "0deg" : layout.rotate,
            }}
        >
            {/* Scrap Tape */}
            <div className="scrap-tape top-[-14px] left-[50%] -translate-x-1/2 w-20 h-7 rotate-[4deg] z-20" />

            {/* Subtle ink watermark */}
            <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-crimson/15 rounded-full blur-xl pointer-events-none" />

            {/* Category Header */}
            <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-parchment-muted border-2 border-charcoal shadow-xs">
                    {icon}
                </div>
                <h3 className="font-heading-scrap text-2xl md:text-3xl text-crimson uppercase leading-none">
                    {title}
                </h3>
            </div>

            {/* Dashed separator */}
            <div className="border-t-2 border-dashed border-ink-black/20 mb-4" />

            {/* Skill chips */}
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

export default function Skills() {
    const isMobile = useIsMobile();
    const mounted = useMounted();
    const { playSound } = useSound();

    const { scrollYProgress } = useScroll();
    const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    const categories = [
        { title: "Languages", icon: <Code2 className="w-6 h-6 text-charcoal" />, items: skills.languages },
        { title: "AI / ML", icon: <BrainCircuit className="w-6 h-6 text-charcoal" />, items: skills.aiml },
        { title: "Data Science", icon: <BarChart3 className="w-6 h-6 text-charcoal" />, items: skills.datascience },
        { title: "Backend", icon: <Database className="w-6 h-6 text-charcoal" />, items: skills.backend },
        { title: "Tools", icon: <Wrench className="w-6 h-6 text-charcoal" />, items: skills.tools },
        {
            title: "Personal Strengths",
            icon: <Sparkles className="w-6 h-6 text-charcoal" />,
            items: strengths.map((s) => ({ name: s.title, level: 100 })),
        },
    ];

    if (!mounted) return null;

    return (
        <section
            id="skills"
            className="relative min-h-screen md:min-h-[1600px] w-full pt-20 pb-32 overflow-hidden"
            suppressHydrationWarning
        >
            <div className="container relative z-10 max-w-6xl mx-auto h-full px-4">
                {/* Large Background Kanji Watermark */}
                <motion.div
                    className="absolute top-[10%] right-[0%] z-0 pointer-events-none select-none opacity-[0.05]"
                    style={{ y: bgY }}
                >
                    <h2
                        className="font-heading-scrap text-[10rem] md:text-[18rem] leading-none text-crimson text-right uppercase"
                        style={{ writingMode: "vertical-rl" }}
                    >
                        器
                    </h2>
                </motion.div>

                {/* Section Header */}
                <div className="mb-12 relative z-20 max-w-xl">
                    <motion.div
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                playSound("click");
                            }
                        }}
                        drag
                        dragConstraints={{ left: -30, right: 30, top: -20, bottom: 20 }}
                        whileDrag={{ scale: 1.03, rotate: -3, cursor: "grabbing" }}
                        className="inline-block bg-crimson p-4 border-4 border-ink-black shadow-[6px_6px_0px_#0D0D0D] transform rotate-[-2deg] cursor-grab"
                    >
                        <h2 className="font-heading-scrap text-4xl md:text-6xl text-parchment uppercase m-0 leading-none">
                            The Arsenal
                        </h2>
                    </motion.div>
                    <p className="font-body-scrap text-base md:text-lg font-bold text-ink-black mt-4 max-w-md bg-parchment-muted p-3.5 border-2 border-charcoal transform rotate-[1.5deg] shadow-sm">
                        Technical competencies forged and tested across machine learning, systems architecture, and data pipelines.
                    </p>
                </div>

                {/* Skills Container: natural stacked column on mobile, scattered scrapbook on desktop */}
                <div className={`relative w-full ${isMobile ? "flex flex-col items-center gap-6" : "md:h-[1100px]"} z-30`}>
                    {categories.map((category, index) => (
                        <SkillCategory
                            key={category.title}
                            title={category.title}
                            icon={category.icon}
                            items={category.items}
                            index={index}
                            layout={categoryLayout[index] || categoryLayout[0]}
                            isMobile={isMobile}
                        />
                    ))}
                </div>

                {/* The Creative Catalyst Banner */}
                <motion.div
                    className="relative md:absolute md:top-[1250px] left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-2xl bg-charcoal p-6 md:p-8 border-4 border-ink-black shadow-[8px_8px_0px_var(--crimson)] mt-12 md:mt-0"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.01, rotate: 1 }}
                >
                    <div className="scrap-tape top-[-14px] left-[50%] -translate-x-1/2 w-24 h-7 rotate-[-2deg]" />
                    <h3 className="font-heading-scrap text-2xl md:text-3xl text-gold-muted mb-3 text-center uppercase tracking-wider">
                        The Creative Catalyst
                    </h3>
                    <p className="font-body-scrap text-parchment text-sm md:text-base text-center font-bold leading-relaxed">
                        Data science and engineering isn&apos;t just about syntax; it&apos;s an art form. I blend technical rigor with original, unconventional thinking. That&apos;s the secret to building intelligent systems that feel alive.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
