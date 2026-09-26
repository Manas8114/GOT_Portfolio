"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FileText, Mail, ExternalLink, X, Briefcase } from "lucide-react";
import { useSound } from "./SoundSystem";
import { personalInfo } from "@/lib/data";
import { useState } from "react";
import { useMounted } from "@/lib/useClient";

export default function StickyNoteCTA() {
    const mounted = useMounted();
    const { playSound } = useSound();
    const [isExpanded, setIsExpanded] = useState(false);

    if (!mounted) return null;

    const toggleOpen = () => {
        playSound("click");
        setIsExpanded((prev) => !prev);
    };

    return (
        <motion.div
            tabIndex={0}
            role="region"
            aria-label="Recruiter Action Dossier"
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleOpen();
                }
            }}
            drag
            onDragStart={() => playSound("hover")}
            dragConstraints={{ left: -250, right: 30, top: -350, bottom: 20 }}
            whileDrag={{ scale: 1.05, rotate: 2, cursor: "grabbing" }}
            className="fixed bottom-24 right-4 md:right-8 z-[9990] flex flex-col items-end"
        >
            {/* Expanded Action Drawer */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, y: 12, scale: 0.92 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 12, scale: 0.92 }}
                        transition={{ duration: 0.2 }}
                        className="mb-3 bg-parchment p-4 border-3 border-charcoal shadow-[6px_6px_0px_#0D0D0D] w-56 flex flex-col gap-2 relative torn-edge"
                    >
                        <div className="scrap-tape top-[-10px] left-[50%] -translate-x-1/2 w-16 h-5 rotate-[-2deg] z-10" />

                        <div className="flex items-center justify-between border-b-2 border-charcoal/20 pb-2 mb-1">
                            <span className="font-heading-scrap text-xs text-crimson font-bold uppercase tracking-wider flex items-center gap-1">
                                <Briefcase size={12} /> Dispatch Menu
                            </span>
                            <button
                                onClick={toggleOpen}
                                className="text-charcoal hover:text-crimson p-0.5 cursor-pointer"
                                aria-label="Close menu"
                            >
                                <X size={14} />
                            </button>
                        </div>

                        {/* Resume PDF */}
                        <a
                            href="/resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => playSound("click")}
                            className="flex items-center justify-between p-2 bg-charcoal text-parchment font-heading-scrap text-xs uppercase tracking-wider border border-ink-black hover:bg-crimson transition-colors shadow-xs"
                        >
                            <span className="flex items-center gap-2">
                                <FileText size={14} className="text-gold-muted" /> Resume (PDF)
                            </span>
                            <ExternalLink size={12} />
                        </a>

                        {/* Direct Email */}
                        <a
                            href={`mailto:${personalInfo.email}`}
                            onClick={() => playSound("click")}
                            className="flex items-center justify-between p-2 bg-charcoal text-parchment font-heading-scrap text-xs uppercase tracking-wider border border-ink-black hover:bg-crimson transition-colors shadow-xs"
                        >
                            <span className="flex items-center gap-2">
                                <Mail size={14} className="text-gold-muted" /> Email Me
                            </span>
                            <ExternalLink size={12} />
                        </a>

                        {/* GitHub */}
                        <a
                            href={personalInfo.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => playSound("click")}
                            className="flex items-center justify-between p-2 bg-parchment-muted text-charcoal font-heading-scrap text-xs uppercase tracking-wider border border-charcoal hover:bg-charcoal hover:text-parchment transition-colors"
                        >
                            <span>⌥ GitHub</span>
                            <ExternalLink size={12} />
                        </a>

                        {/* LinkedIn */}
                        <a
                            href={personalInfo.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => playSound("click")}
                            className="flex items-center justify-between p-2 bg-parchment-muted text-charcoal font-heading-scrap text-xs uppercase tracking-wider border border-charcoal hover:bg-[#0077B5] hover:text-parchment transition-colors"
                        >
                            <span>∞ LinkedIn</span>
                            <ExternalLink size={12} />
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Tactile Sticky Note Toggle Button */}
            <motion.button
                onClick={toggleOpen}
                whileHover={{ scale: 1.06, rotate: 0 }}
                whileTap={{ scale: 0.96 }}
                className={`
                    relative p-3 shadow-[5px_5px_0px_#0D0D0D] border-3 border-charcoal
                    cursor-pointer transition-transform duration-200 select-none
                    ${isExpanded
                        ? "bg-crimson text-parchment rotate-0 w-20 h-20 flex flex-col items-center justify-center"
                        : "bg-[#FFDE59] text-charcoal -rotate-3 hover:rotate-0 w-24 h-24 flex flex-col items-center justify-center"
                    }
                `}
                aria-label={isExpanded ? "Close menu" : "Open Hire Me menu"}
                aria-expanded={isExpanded}
            >
                {/* Washi tape on top of sticky note */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-4 bg-red-500/20 rotate-[-4deg] pointer-events-none shadow-xs" />

                {isExpanded ? (
                    <>
                        <X size={24} />
                        <span className="font-heading-scrap text-[10px] mt-1 uppercase tracking-widest font-bold">
                            Close
                        </span>
                    </>
                ) : (
                    <>
                        <span className="font-heading-scrap text-sm font-black uppercase leading-tight text-center">
                            Hire The<br />Ronin
                        </span>
                        <span className="font-body-scrap text-[9px] mt-1 opacity-70 font-bold tracking-tighter">
                            tap · drag
                        </span>
                    </>
                )}
            </motion.button>
        </motion.div>
    );
}
