"use client";

import { motion, AnimatePresence } from "framer-motion";
import { achievements } from "@/lib/data";
import { useState } from "react";
import { useSound } from "@/components/SoundSystem";
import { useMounted } from "@/lib/useClient";
import { Award, BookOpen, Briefcase, FileText, Trophy, Sparkles, ChevronDown, ExternalLink } from "lucide-react";

// Subtle rotation angles for the tactile scrapbook feel
const SCROLL_ROTATIONS = ["-2.5deg", "3deg", "-1.5deg", "2.5deg", "-3deg", "1.5deg"];

type AchievementType = "all" | "research" | "competition" | "experience";

export default function Research() {
    const mounted = useMounted();
    const [selectedFilter, setSelectedFilter] = useState<AchievementType>("all");
    const [expandedCardId, setExpandedCardId] = useState<string | null>(null);
    const [resetKey, setResetKey] = useState(0);
    const { playSound } = useSound();

    const handleReorganize = () => {
        playSound("click");
        setExpandedCardId(null);
        setResetKey((prev) => prev + 1);
    };

    const handleFilterChange = (filter: AchievementType) => {
        playSound("hover");
        setSelectedFilter(filter);
        setExpandedCardId(null);
    };

    const handleToggleCard = (id: string) => {
        playSound("click");
        setExpandedCardId((prev) => (prev === id ? null : id));
    };

    const filteredAchievements = achievements.filter((item) => {
        if (selectedFilter === "all") return true;
        return item.type === selectedFilter;
    });

    const filters: { id: AchievementType; label: string; count: number }[] = [
        { id: "all", label: "All Milestones", count: achievements.length },
        { id: "research", label: "Research & Papers", count: achievements.filter((a) => a.type === "research").length },
        { id: "competition", label: "Competitions", count: achievements.filter((a) => a.type === "competition").length },
        { id: "experience", label: "Experience", count: achievements.filter((a) => a.type === "experience").length },
    ];

    const typeIcons: Record<string, typeof Trophy> = {
        competition: Trophy,
        research: BookOpen,
        experience: Briefcase,
    };

    if (!mounted) return null;

    return (
        <section
            id="scrolls"
            className="min-h-screen py-20 px-4 md:px-8 max-w-7xl mx-auto relative overflow-hidden"
            suppressHydrationWarning
        >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[url('/grid.png')] opacity-10 pointer-events-none" />

            {/* Large Background Kanji Watermark */}
            <div className="absolute top-[8%] right-[2%] z-0 pointer-events-none select-none opacity-[0.04]">
                <span
                    className="font-heading-scrap text-[12rem] md:text-[20rem] leading-none text-crimson"
                    style={{ writingMode: "vertical-rl" }}
                >
                    巻
                </span>
            </div>

            {/* Header + Tidy Desk Button */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-10 relative z-40">
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative"
                >
                    <div className="absolute -inset-4 bg-crimson/10 rotate-2 blur-lg" />
                    <h2 className="text-4xl md:text-6xl font-heading-scrap text-charcoal tracking-tighter uppercase relative">
                        Scrolls of Honor
                        <span className="block text-xl md:text-2xl text-crimson font-body-scrap tracking-widest mt-1">
                            Research, Honors & Battles Won ({achievements.length})
                        </span>
                    </h2>
                    <motion.div
                        className="h-2 w-full bg-crimson mt-2 origin-left"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.7 }}
                    />
                </motion.div>

                <button
                    onClick={handleReorganize}
                    className="group flex items-center gap-2 px-4 py-2.5 bg-charcoal text-parchment font-heading-scrap text-xs uppercase tracking-widest border-2 border-crimson shadow-[4px_4px_0px_var(--crimson)] hover:bg-crimson hover:text-charcoal transition-all cursor-pointer rounded-sm"
                    title="Reset scrolls to desk order"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                        <path d="M3 3v5h5" />
                    </svg>
                    <span>Tidy Desk</span>
                </button>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 mb-12 relative z-30">
                <span className="font-heading-scrap text-xs uppercase tracking-widest text-charcoal/70 mr-1 flex items-center gap-1">
                    <Award size={14} /> Filter:
                </span>
                {filters.map((f) => {
                    const isActive = selectedFilter === f.id;
                    return (
                        <button
                            key={f.id}
                            onClick={() => handleFilterChange(f.id)}
                            className={`
                                font-heading-scrap text-xs uppercase tracking-wider px-3 py-1.5 transition-all cursor-pointer rounded-sm border-2
                                ${isActive
                                    ? "bg-crimson text-parchment border-ink-black shadow-[3px_3px_0px_#0D0D0D] font-bold"
                                    : "bg-parchment text-charcoal border-charcoal/40 hover:border-charcoal hover:bg-parchment-muted"
                                }
                            `}
                        >
                            {f.label} ({f.count})
                        </button>
                    );
                })}
            </div>

            {/* Scrapbook Board Container */}
            <div className="relative" suppressHydrationWarning>
                <div className="absolute -inset-x-4 -inset-y-6 bg-gradient-to-br from-parchment-light to-parchment-dark shadow-inner-lg border-t-2 border-b-2 border-charcoal/20 z-0" />

                {/* Staggered Scrolls Grid */}
                <div
                    key={resetKey}
                    className="relative z-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-x-10 md:gap-y-12 p-2 md:p-6"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredAchievements.map((item, index) => {
                            const IconComponent = typeIcons[item.type] || FileText;
                            const isExpanded = expandedCardId === item.id;
                            const rotation = SCROLL_ROTATIONS[index % SCROLL_ROTATIONS.length];
                            const isResearch = item.type === "research";

                            return (
                                <motion.div
                                    key={item.id}
                                    layout
                                    tabIndex={0}
                                    role="button"
                                    aria-expanded={isExpanded}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" || e.key === " ") {
                                            e.preventDefault();
                                            handleToggleCard(item.id);
                                        }
                                    }}
                                    onClick={() => handleToggleCard(item.id)}
                                    drag
                                    dragConstraints={{ left: -100, right: 100, top: -80, bottom: 80 }}
                                    whileDrag={{
                                        scale: 1.05,
                                        cursor: "grabbing",
                                        zIndex: 100,
                                        boxShadow: "14px 20px 40px rgba(13,13,13,0.35), 0 0 0 2px var(--crimson)",
                                        rotate: 0,
                                    }}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3, delay: Math.min(index * 0.06, 0.3) }}
                                    className="group w-full relative cursor-grab z-10 hover:z-40 transition-shadow duration-300"
                                    style={{ rotate: rotation }}
                                >
                                    {/* Washi Tape Strip */}
                                    <div className="scrap-tape top-[-12px] left-[50%] -translate-x-1/2 w-20 h-7 rotate-[-2deg] z-20" />

                                    {/* Parchment Scroll Card Body */}
                                    <div
                                        className={`
                                            p-6 border-3 border-charcoal shadow-[6px_6px_0px_#0D0D0D] relative z-10 transition-all duration-300 rounded-sm torn-edge
                                            ${item.highlight ? "bg-parchment ring-2 ring-crimson/50" : "bg-parchment-muted/80"}
                                        `}
                                    >
                                        {/* Top Ribbon / Badge */}
                                        <div className="flex items-center justify-between gap-2 mb-3">
                                            <span
                                                className={`
                                                    inline-flex items-center gap-1.5 font-heading-scrap text-xs px-2.5 py-1 border border-ink-black font-bold uppercase tracking-wider
                                                    ${isResearch ? "bg-charcoal text-parchment" : "bg-crimson text-parchment"}
                                                `}
                                            >
                                                <IconComponent size={13} />
                                                {item.type}
                                            </span>

                                            {item.highlight && (
                                                <span className="flex items-center gap-1 text-[11px] font-bold font-heading-scrap px-2 py-0.5 bg-gold-muted/20 border border-gold-muted text-gold-muted uppercase">
                                                    <Sparkles size={11} /> Milestone
                                                </span>
                                            )}
                                        </div>

                                        {/* Year Callout */}
                                        <div className="text-[11px] font-body-scrap font-black text-stone-gray uppercase tracking-widest mb-1">
                                            Recorded · {item.year}
                                        </div>

                                        {/* Title */}
                                        <h3 className="font-heading-scrap text-xl md:text-2xl text-ink-black leading-tight uppercase mb-3">
                                            {item.title}
                                        </h3>

                                        {/* Divider */}
                                        <div className="h-[2px] w-full bg-ink-black/15 mb-3" />

                                        {/* Description */}
                                        <p className="font-body-scrap text-sm font-semibold text-charcoal leading-relaxed">
                                            {item.description}
                                        </p>

                                        {/* Expand Toggle */}
                                        <div className="mt-4 pt-2 border-t border-dashed border-ink-black/20 flex items-center justify-between text-xs text-stone-gray font-body-scrap">
                                            <span>{isExpanded ? "Click to fold" : "Click to examine proof"}</span>
                                            <ChevronDown
                                                size={16}
                                                className={`transform transition-transform duration-300 text-charcoal ${isExpanded ? "rotate-180" : "rotate-0"}`}
                                            />
                                        </div>

                                        {/* Expandable Case Drawer (Desktop Hover / Mobile Click Reveal) */}
                                        <div
                                            className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? "max-h-[600px] opacity-100 mt-4 pt-3 border-t-2 border-dashed border-charcoal/20" : "max-h-0 opacity-0 group-hover:max-h-[600px] group-hover:opacity-100 group-hover:mt-4 group-hover:pt-3 group-hover:border-t-2 group-hover:border-dashed group-hover:border-charcoal/20"}`}
                                        >
                                            {/* What I Built & Role */}
                                            <div className="mb-3 bg-charcoal/5 p-3 border-l-3 border-crimson rounded-xs">
                                                <p className="font-heading-scrap text-[10px] tracking-widest text-crimson font-bold uppercase mb-1">
                                                    What I Built & Role:
                                                </p>
                                                <p className="font-body-scrap text-xs text-charcoal leading-relaxed font-semibold">
                                                    {item.role}
                                                </p>
                                            </div>

                                            {/* Verification & Proof */}
                                            <div className="mb-3">
                                                <p className="font-heading-scrap text-[10px] tracking-widest text-gold-muted font-bold uppercase mb-1 flex items-center gap-1">
                                                    <Award size={11} className="text-crimson" /> Verification & Evidence:
                                                </p>
                                                <p className="font-body-scrap text-xs text-stone-gray font-bold leading-snug">
                                                    {item.proof}
                                                </p>
                                            </div>

                                            {/* Key Technologies */}
                                            <div className="flex flex-wrap gap-1.5 mb-3.5">
                                                {item.tech.map((t) => (
                                                    <span key={t} className="text-[10px] font-bold px-2 py-0.5 bg-parchment text-ink-black border border-ink-black/40 shadow-xs">
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* Action / Proof Button */}
                                            <a
                                                href={item.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    playSound("click");
                                                }}
                                                className="flex items-center justify-center gap-1.5 px-3 py-2 bg-charcoal text-parchment font-heading-scrap text-xs border border-ink-black hover:bg-crimson transition-colors uppercase w-full font-bold shadow-xs tracking-wider cursor-pointer"
                                            >
                                                Inspect Verification & Code <ExternalLink size={13} />
                                            </a>
                                        </div>

                                        {/* Wax Seal Watermark */}
                                        <div className="absolute bottom-2 right-2 opacity-15 pointer-events-none select-none">
                                            <span className="font-heading-scrap text-5xl text-crimson">印</span>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
