"use client";

import { motion } from "framer-motion";
import { FileText, Mail } from "lucide-react";
import { useSound } from "./SoundSystem";

export default function StickyNoteCTA() {
    const { playSound } = useSound();

    return (
        <motion.div
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    playSound("click");
                }
            }}
            drag
            onDragStart={() => playSound("hover")}
            dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
            whileDrag={{ scale: 1.05, rotate: 5, cursor: "grabbing" }}
            className="fixed bottom-24 right-6 md:right-12 z-50 bg-gold-light p-4 shadow-[4px_4px_0px_rgba(0,0,0,0.8)] border-2 border-charcoal transform -rotate-3 cursor-grab w-48 hidden sm:block"
        >
            <div className="scrap-tape top-[-10px] left-[50%] -translate-x-1/2 w-12 h-6 rotate-[-5deg]" />
            <p className="font-heading-scrap text-lg text-ink-black mb-3 text-center border-b-2 border-charcoal/20 pb-1">
                HIRE THE RONIN
            </p>
            <div className="flex flex-col gap-2">
                {/* Adjust the href as needed if resume.pdf doesn't exist yet */}
                <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playSound("click")}
                    className="flex items-center gap-2 font-body-scrap text-sm text-ink-black font-bold hover:text-crimson transition-colors"
                >
                    <FileText size={16} suppressHydrationWarning /> Resume (PDF)
                </a>
                <a
                    href="mailto:ms9580@srmist.edu.in"
                    onClick={() => playSound("click")}
                    className="flex items-center gap-2 font-body-scrap text-sm text-ink-black font-bold hover:text-crimson transition-colors"
                >
                    <Mail size={16} suppressHydrationWarning /> Email Me
                </a>
            </div>
        </motion.div>
    );
}
