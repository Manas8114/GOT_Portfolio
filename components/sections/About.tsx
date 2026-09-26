"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { personalInfo, strengths } from "@/lib/data";
import { useSound } from "@/components/SoundSystem";
import { useIsMobile } from "@/lib/useClient";
import { Palette, Flame, Compass, RefreshCw, Puzzle, BarChart3, BookOpen, Eye, ExternalLink, type LucideIcon } from "lucide-react";

const strengthIconMap: Record<string, LucideIcon> = {
    palette: Palette,
    flame: Flame,
    compass: Compass,
    refresh: RefreshCw,
    puzzle: Puzzle,
    chart: BarChart3,
    book: BookOpen,
    eye: Eye,
};

export default function About() {
    const { playSound } = useSound();
    const isMobile = useIsMobile();

    const { scrollYProgress } = useScroll();

    const bgY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
    return (
        <section
            id="warrior"
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

                    {/* CGPA + Graduation tag + Admitted program */}
                    <div className="flex flex-wrap gap-2.5 mt-4">
                        <span className="font-body-scrap text-sm bg-ink-black text-gold-muted px-3 py-1 font-black border border-ink-black">
                            CGPA: {personalInfo.education.cgpa}
                        </span>
                        <span className="font-body-scrap text-sm bg-emerald-800 text-parchment px-3 py-1 font-black border border-ink-black shadow-xs">
                            ✓ Admitted: UCD Dublin (MSc T306)
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
                    <div className="flex items-center gap-2 mb-4 border-b-2 border-charcoal/20 pb-2">
                        <BookOpen size={20} className="text-crimson" />
                        <p className="font-heading-scrap text-xl text-crimson uppercase font-bold tracking-wider m-0">
                            Published Research (IEEE)
                        </p>
                    </div>
                    <div className="space-y-4">
                        {personalInfo.publications.map((pub, i) => (
                            <div key={i} className="pb-3 border-b border-dashed border-charcoal/20 last:border-none last:pb-0">
                                <p className="font-body-scrap text-sm font-bold text-ink-black leading-snug mb-2">
                                    &ldquo;{pub.title}&rdquo;
                                </p>
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="font-body-scrap text-[10px] font-black bg-crimson text-parchment px-2.5 py-0.5 border border-ink-black uppercase shadow-xs">
                                            {pub.venue}
                                        </span>
                                        <span className="font-body-scrap text-[10px] font-black bg-emerald-700 text-parchment px-2.5 py-0.5 border border-ink-black uppercase shadow-xs">
                                            ✓ {pub.status}
                                        </span>
                                    </div>
                                    <a
                                        href="#battles"
                                        onClick={() => playSound("click")}
                                        className="font-heading-scrap text-[11px] text-crimson font-bold uppercase tracking-wider hover:text-ink-black flex items-center gap-1 transition-colors"
                                    >
                                        Case File <ExternalLink size={11} />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Strengths scattered like Polaroids */}
                <div className="relative w-full min-h-[520px] md:h-[500px] mt-8 md:mt-4 z-30 flex flex-col md:block items-center">
                    {/* Abstract path drawing */}
                    <div className="absolute inset-0 z-0 opacity-40 pointer-events-none hidden md:block">
                        <svg viewBox="0 0 800 400" className="w-full h-full stroke-crimson" fill="none" strokeWidth="4" strokeLinecap="round" strokeDasharray="10 15">
                            <path d="M 100,200 C 300,50 500,350 700,100" />
                        </svg>
                    </div>

                    <p className="font-heading-scrap text-6xl md:text-8xl text-ink-black absolute top-0 left-0 md:left-20 md:top-12 z-0 opacity-10 select-none">
                        THE WARRIOR
                    </p>

                    {strengths.slice(0, 3).map((strength, index) => {
                        const IconComponent = strengthIconMap[strength.icon] || Flame;
                        const positions = [
                            { mdTop: "8%", mdLeft: "4%" },
                            { mdTop: "16%", mdLeft: "37%" },
                            { mdTop: "6%", mdLeft: "70%" },
                        ];
                        const pos = positions[index] || positions[0];
                        const rotate = ["-5deg", "5deg", "-3deg"][index] || "-2deg";

                        return (
                            <motion.div
                                key={strength.title}
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                        playSound("click");
                                    }
                                }}
                                drag
                                onDragStart={() => playSound("click")}
                                whileDrag={{ scale: 1.12, rotate: (parseInt(rotate) || 0) + 10, cursor: "grabbing", zIndex: 100 }}
                                dragConstraints={{ left: -150, right: 150, top: -100, bottom: 100 }}
                                initial={{ opacity: 0, scale: 0.85, y: 30 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={{ once: true, margin: "-30px" }}
                                transition={{ type: "spring", stiffness: 260, damping: 20, delay: index * 0.12 }}
                                className={`polaroid-card absolute w-64 md:w-72 ${isMobile ? "relative mx-auto mb-6" : "absolute"} cursor-grab z-10 hover:z-50`}
                                style={{
                                    position: isMobile ? "relative" : "absolute",
                                    top: isMobile ? "auto" : pos.mdTop,
                                    left: isMobile ? "auto" : pos.mdLeft,
                                    rotate: isMobile ? (index % 2 === 0 ? "-2deg" : "2deg") : rotate,
                                }}
                            >
                                <div className="bg-charcoal w-full h-36 mb-4 flex items-center justify-center border-2 border-ink-black overflow-hidden relative">
                                    <div className="p-3.5 rounded-full bg-parchment-muted/10 border border-crimson/30 flex items-center justify-center">
                                        <IconComponent size={36} className="text-crimson" />
                                    </div>
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

                    {/* Interests Tag placed harmoniously in the strengths cluster */}
                    <motion.div
                        drag
                        dragConstraints={{ left: -100, right: 100, top: -50, bottom: 50 }}
                        className={`${isMobile ? "relative mt-6 mb-8" : "absolute bottom-[4%] right-[6%]"} bg-crimson p-4 border-2 border-ink-black transform rotate-[6deg] cursor-grab shadow-[6px_6px_0px_#0D0D0D] z-40 w-64`}
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


            </div>
        </section>
    );
}
