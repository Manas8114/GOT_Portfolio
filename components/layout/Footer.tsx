"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const signatureText = "— Manas";
const yearText = `© ${new Date().getFullYear()}`;

// Each character animates in sequence like ink being drawn
const charVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.08, duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const },
    }),
};

export default function Footer() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <footer
            ref={ref}
            className="py-16 border-t-2 border-charcoal/20 bg-ink-black relative overflow-hidden"
        >
            {/* Subtle noise overlay */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 pointer-events-none mix-blend-overlay" />

            <div className="max-w-4xl mx-auto px-4 flex flex-col items-center gap-6 relative z-10">

                {/* Auto-writing Signature */}
                <div className="flex items-baseline gap-1">
                    {signatureText.split("").map((char, i) => (
                        <motion.span
                            key={i}
                            custom={i}
                            variants={charVariants}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            className="font-heading-scrap text-4xl md:text-6xl text-crimson inline-block"
                            style={{
                                display: char === " " ? "inline" : "inline-block",
                                minWidth: char === " " ? "0.3em" : undefined,
                            }}
                        >
                            {char}
                        </motion.span>
                    ))}
                </div>

                {/* Brush stroke underline */}
                <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={isInView ? { scaleX: 1, opacity: 0.8 } : {}}
                    transition={{ delay: signatureText.length * 0.08 + 0.2, duration: 0.6, ease: "easeOut" }}
                    className="w-48 h-[3px] bg-gradient-to-r from-transparent via-crimson to-transparent origin-center"
                />

                {/* Kanji seal */}
                <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={isInView ? { scale: 1, rotate: 12 } : {}}
                    transition={{
                        delay: signatureText.length * 0.08 + 0.5,
                        type: "spring",
                        stiffness: 200,
                    }}
                    className="w-14 h-14 bg-crimson rounded-sm flex items-center justify-center shadow-[3px_3px_0px_var(--charcoal)]"
                >
                    <span className="text-parchment text-2xl font-bold">道</span>
                </motion.div>

                {/* Subtitle + copyright */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: signatureText.length * 0.08 + 0.8 }}
                    className="font-body-scrap text-sm text-stone-gray tracking-widest uppercase"
                >
                    Crafted with discipline
                </motion.p>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 0.5 } : {}}
                    transition={{ delay: signatureText.length * 0.08 + 1.0 }}
                    className="font-body-scrap text-xs text-fog tracking-[0.3em]"
                >
                    {yearText}
                </motion.p>
            </div>
        </footer>
    );
}
