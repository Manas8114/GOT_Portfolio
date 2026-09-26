"use client";

import { motion, AnimatePresence } from "framer-motion";
import { projects, Project } from "@/lib/data";
import { useState } from "react";
import { useSound } from "@/components/SoundSystem";
import { useMounted } from "@/lib/useClient";
import { ChevronDown, ExternalLink, Folder, FileText, Sparkles, Search, X } from "lucide-react";

// Subtle rotation angles to preserve the tactile KidSuper scrapbook feel
const SCRAPBOOK_ROTATIONS = ["-2.5deg", "3deg", "-1.5deg", "2.5deg", "-3deg", "1.5deg", "-2deg", "3.5deg"];

type ProjectCategory = "all" | "research" | "ai-ml" | "systems" | "web";

interface ProjectCardProps {
    project: Project;
    index: number;
    rotation: string;
    isExpanded: boolean;
    onToggle: () => void;
}

function ProjectCard({ project, index, rotation, isExpanded, onToggle }: ProjectCardProps) {
    const { playSound } = useSound();

    const categoryLabels: Record<string, string> = {
        research: "Research Paper",
        "ai-ml": "AI / ML",
        systems: "Systems & Network",
        web: "Web App",
    };

    const isManila = project.isResearch;
    const topTierIds = ["icicv-cnn", "wocc-network-slicing", "6g-network"];
    const isTopTier = topTierIds.includes(project.id);

    return (
        <motion.div
            layout
            tabIndex={0}
            role="button"
            aria-expanded={isExpanded}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    playSound("click");
                    onToggle();
                }
            }}
            drag
            dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
            whileDrag={{
                scale: 1.04,
                cursor: "grabbing",
                zIndex: 100,
                boxShadow: "16px 24px 48px rgba(13,13,13,0.35), 0 0 0 2px var(--crimson)",
                rotate: 0,
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.4) }}
            className={`group w-full relative cursor-grab z-10 hover:z-40 transition-shadow duration-300 ${index % 2 === 1 ? 'md:mt-6' : 'md:mt-0'}`}
            style={{ rotate: rotation }}
        >
            {/* The Manila Folder Tab for Research Dossiers */}
            {isManila && (
                <div className="absolute -top-7 left-4 px-3 py-1 bg-[#E6C280] border-2 border-b-0 border-charcoal rounded-t-lg z-0 flex items-center gap-1.5 shadow-sm">
                    <FileText size={12} className="text-charcoal" />
                    <span className="font-heading-scrap text-xs text-charcoal uppercase font-bold tracking-wider">
                        Research Dossier
                    </span>
                    <span className="text-xs transform rotate-12 drop-shadow-sm ml-0.5">📎</span>
                </div>
            )}

            {/* Main Folder / Case File Container */}
            <div
                onClick={() => {
                    playSound("click");
                    onToggle();
                }}
                className={`
                    ${isTopTier ? 'bg-[#2A1A1A] border-[#8B1A1A] text-parchment' : isManila ? 'bg-[#F4D08F] border-[#D1A054] text-ink-black' : 'bg-parchment border-charcoal text-ink-black'}
                    p-5 md:p-6 border-3 shadow-[6px_6px_0px_#0D0D0D] relative z-10 transition-all duration-300 rounded-sm
                `}
            >
                {/* CLASSIFIED Stamp for Top Tier Works */}
                {isTopTier && (
                    <div className="absolute top-4 right-3 z-30 transform rotate-12 opacity-85 pointer-events-none mix-blend-screen">
                        <div className="border-3 border-crimson text-crimson font-heading-scrap text-lg md:text-xl px-2.5 py-0.5 font-bold tracking-widest uppercase shadow-sm">
                            CLASSIFIED
                        </div>
                    </div>
                )}

                {/* Banner / Title Header */}
                <div className="w-full min-h-28 py-4 px-3 bg-ink-black flex flex-col items-center justify-center border-2 border-charcoal overflow-hidden relative mb-4 rounded-sm">
                    <div className="absolute inset-0 bg-crimson opacity-20 mix-blend-overlay" />
                    <h3
                        className="font-heading-scrap text-2xl md:text-3xl text-parchment text-center z-10 leading-tight uppercase px-2"
                        style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}
                    >
                        {project.title}
                    </h3>
                    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay pointer-events-none" style={{ backgroundSize: '150px' }} />
                </div>

                {/* Category Badge & Meta */}
                <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                        className={`font-heading-scrap text-xs px-2.5 py-1 border border-ink-black font-bold uppercase tracking-wider ${isTopTier ? 'bg-crimson text-parchment' : isManila ? 'bg-charcoal text-parchment' : 'bg-ink-black text-gold-muted'}`}
                    >
                        #{categoryLabels[project.category] || project.category.toUpperCase()}
                    </span>

                    <div className="flex items-center gap-2">
                        {project.featured && (
                            <span className="flex items-center gap-1 text-xs font-bold font-heading-scrap px-2 py-0.5 bg-gold-muted/20 border border-gold-muted text-gold-muted">
                                <Sparkles size={12} /> FEATURED
                            </span>
                        )}
                        <span className="text-xs text-stone-gray font-body-scrap hidden sm:inline">
                            {isExpanded ? "Click to close" : "Click to view"}
                        </span>
                        <ChevronDown
                            size={16}
                            className={`transform transition-transform duration-300 ${isExpanded ? "rotate-180" : "rotate-0"} ${isTopTier ? 'text-parchment' : 'text-ink-black'}`}
                        />
                    </div>
                </div>

                {/* Always-Visible Brief Summary */}
                <p className={`font-body-scrap text-sm font-semibold leading-relaxed mb-3 line-clamp-2 ${isTopTier ? 'text-parchment/90' : 'text-charcoal'}`}>
                    {project.description}
                </p>

                {/* Expandable Case File Drawer (Desktop Hover Peek + Click/Tap Pin) */}
                <div
                    className={`overflow-hidden transition-all duration-400 ease-in-out ${isExpanded ? "max-h-[500px] opacity-100 mt-3 pt-3 border-t-2 border-dashed border-charcoal/20" : "max-h-0 opacity-0 group-hover:max-h-[500px] group-hover:opacity-100 group-hover:mt-3 group-hover:pt-3 group-hover:border-t-2 group-hover:border-dashed group-hover:border-charcoal/20"}`}
                >
                    {project.longDescription && (
                        <p className={`font-body-scrap text-xs md:text-sm mb-3 leading-relaxed ${isTopTier ? 'text-parchment/80' : 'text-charcoal/80'}`}>
                            {project.longDescription}
                        </p>
                    )}

                    {/* Highlights / Badges */}
                    {project.highlights && project.highlights.length > 0 && (
                        <div className="mb-3">
                            <p className="font-heading-scrap text-[10px] tracking-widest text-crimson font-bold uppercase mb-1">
                                Mission Highlights:
                            </p>
                            <ul className="space-y-1">
                                {project.highlights.map((highlight, idx) => (
                                    <li key={idx} className="flex items-start gap-1.5 font-body-scrap text-xs leading-snug">
                                        <span className="text-crimson font-bold">▸</span>
                                        <span className={isTopTier ? 'text-parchment/80' : 'text-charcoal'}>{highlight}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.technologies.map((tech) => (
                            <span
                                key={tech}
                                className="text-[11px] font-bold px-2 py-0.5 bg-gold-muted/80 text-ink-black border border-ink-black/60 shadow-xs transform -rotate-1"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>

                    {/* Action CTA */}
                    <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                            e.stopPropagation();
                            playSound("click");
                        }}
                        className={`flex items-center justify-center gap-2 px-4 py-2 font-heading-scrap text-xs md:text-sm border-2 border-charcoal transition-colors uppercase w-full text-center tracking-wider font-bold shadow-sm ${isManila ? 'bg-charcoal text-parchment hover:bg-crimson' : 'bg-crimson text-parchment hover:bg-ink-black'}`}
                    >
                        Open Case File <ExternalLink size={14} />
                    </a>
                </div>
            </div>

            {/* Scrapbook Tape Decoration */}
            {!isManila && (
                <div className="scrap-tape top-[-10px] left-[50%] -translate-x-1/2 w-20 h-7 rotate-[2deg] z-20" />
            )}
        </motion.div>
    );
}

export default function Projects() {
    const mounted = useMounted();
    const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [expandedCardId, setExpandedCardId] = useState<string | null>(null);
    const [resetKey, setResetKey] = useState(0);
    const { playSound } = useSound();

    const handleReorganize = () => {
        playSound("click");
        setExpandedCardId(null);
        setSearchQuery("");
        setResetKey((prev) => prev + 1);
    };

    const handleCategoryChange = (cat: ProjectCategory) => {
        playSound("hover");
        setSelectedCategory(cat);
        setExpandedCardId(null);
    };

    const handleToggleCard = (id: string) => {
        setExpandedCardId((prev) => (prev === id ? null : id));
    };

    const filteredProjects = projects.filter((p) => {
        const matchesCategory =
            selectedCategory === "all"
                ? true
                : selectedCategory === "research"
                    ? p.isResearch || p.category === "research"
                    : p.category === selectedCategory;

        if (!matchesCategory) return false;

        if (!searchQuery.trim()) return true;

        const query = searchQuery.toLowerCase().trim();
        return (
            p.title.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query) ||
            (p.longDescription && p.longDescription.toLowerCase().includes(query)) ||
            p.technologies.some((t) => t.toLowerCase().includes(query)) ||
            (p.highlights && p.highlights.some((h) => h.toLowerCase().includes(query)))
        );
    });

    const categories: { id: ProjectCategory; label: string }[] = [
        { id: "all", label: `All (${projects.length})` },
        { id: "research", label: `Research (${projects.filter((p) => p.isResearch || p.category === "research").length})` },
        { id: "ai-ml", label: `AI / ML (${projects.filter((p) => p.category === "ai-ml").length})` },
        { id: "systems", label: `Systems (${projects.filter((p) => p.category === "systems").length})` },
        { id: "web", label: `Web (${projects.filter((p) => p.category === "web").length})` },
    ];

    if (!mounted) return null;

    return (
        <section
            id="battles"
            className="min-h-screen py-20 px-4 md:px-8 max-w-7xl mx-auto relative overflow-hidden"
            suppressHydrationWarning
        >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[url('/grid.png')] opacity-10 pointer-events-none" />

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
                        Case Files
                        <span className="block text-xl md:text-2xl text-crimson font-body-scrap tracking-widest mt-1">
                            The Archive of Battles ({projects.length} Dossiers)
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

                <div className="flex items-center gap-3">
                    <button
                        onClick={handleReorganize}
                        className="group flex items-center gap-2 px-4 py-2.5 bg-charcoal text-parchment font-heading-scrap text-xs uppercase tracking-widest border-2 border-crimson shadow-[4px_4px_0px_var(--crimson)] hover:bg-crimson hover:text-charcoal transition-all cursor-pointer rounded-sm"
                        title="Reset dragged cards to desk order"
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
            </div>

            {/* Category Filter Pills & Search Input */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10 relative z-30">
                <div className="flex flex-wrap items-center gap-2">
                    <span className="font-heading-scrap text-xs uppercase tracking-widest text-charcoal/70 mr-1 flex items-center gap-1">
                        <Folder size={14} /> Filter:
                    </span>
                    {categories.map((cat) => {
                        const isActive = selectedCategory === cat.id;
                        return (
                            <button
                                key={cat.id}
                                onClick={() => handleCategoryChange(cat.id)}
                                className={`
                                    font-heading-scrap text-xs uppercase tracking-wider px-3 py-1.5 transition-all cursor-pointer rounded-sm border-2
                                    ${isActive
                                        ? "bg-crimson text-parchment border-ink-black shadow-[3px_3px_0px_#0D0D0D] font-bold"
                                        : "bg-parchment text-charcoal border-charcoal/40 hover:border-charcoal hover:bg-parchment-muted"
                                    }
                                `}
                            >
                                {cat.label}
                            </button>
                        );
                    })}
                </div>

                {/* Live Dossier Search Input */}
                <div className="relative max-w-xs w-full">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-charcoal/60">
                        <Search size={14} />
                    </div>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search dossier / tech..."
                        className="w-full pl-8 pr-8 py-1.5 bg-parchment border-2 border-charcoal/50 text-ink-black font-body-scrap text-xs placeholder:text-stone-gray font-bold focus:outline-none focus:border-crimson focus:ring-1 focus:ring-crimson shadow-xs rounded-sm"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery("")}
                            className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-charcoal/60 hover:text-crimson cursor-pointer"
                            aria-label="Clear search"
                        >
                            <X size={14} />
                        </button>
                    )}
                </div>
            </div>

            {/* Results counter when searching */}
            {searchQuery && (
                <div className="mb-6 font-body-scrap text-xs font-bold text-stone-gray flex items-center gap-2">
                    <span className="text-crimson">▸</span> Showing {filteredProjects.length} of {projects.length} dossiers matching &ldquo;{searchQuery}&rdquo;
                </div>
            )}

            {/* Board edge texture & Grid */}
            <div className="relative" suppressHydrationWarning>
                <div className="absolute -inset-x-4 -inset-y-6 bg-gradient-to-br from-parchment-light to-parchment-dark shadow-inner-lg border-t-2 border-b-2 border-charcoal/20 z-0" />

                {/* Projects Staggered Grid — handles all items with zero clipping or collision */}
                <div
                    key={resetKey}
                    className="relative z-20 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-12 md:gap-y-14 p-2 md:p-6"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.length > 0 ? (
                            filteredProjects.map((project, index) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    index={index}
                                    rotation={SCRAPBOOK_ROTATIONS[index % SCRAPBOOK_ROTATIONS.length]}
                                    isExpanded={expandedCardId === project.id}
                                    onToggle={() => handleToggleCard(project.id)}
                                />
                            ))
                        ) : (
                            <div className="col-span-full py-16 text-center bg-parchment-muted/90 p-8 border-3 border-dashed border-charcoal/40 torn-edge">
                                <p className="font-heading-scrap text-2xl text-crimson mb-2 uppercase">
                                    No Dossiers Found
                                </p>
                                <p className="font-body-scrap text-sm text-stone-gray font-bold mb-4">
                                    No classified case files match &ldquo;{searchQuery}&rdquo; in this category.
                                </p>
                                <button
                                    onClick={() => {
                                        setSearchQuery("");
                                        setSelectedCategory("all");
                                    }}
                                    className="px-4 py-2 bg-charcoal text-parchment font-heading-scrap text-xs uppercase tracking-wider border-2 border-charcoal hover:bg-crimson cursor-pointer transition-colors"
                                >
                                    Reset Search & Filter
                                </button>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
