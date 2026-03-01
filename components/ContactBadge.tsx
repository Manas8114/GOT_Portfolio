"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContactBadge() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Only show after 2 seconds so it doesn't compete with first impression
        const timer = setTimeout(() => setIsVisible(true), 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ x: 120, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 120, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 180, delay: 0 }}
                    className="fixed bottom-24 right-4 z-[9990] flex flex-col items-end gap-2"
                >
                    {/* Expanded menu */}
                    <AnimatePresence>
                        {isExpanded && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                                className="flex flex-col gap-2 items-end"
                            >
                                <a
                                    href="mailto:ms9580@srmist.edu.in"
                                    className="bg-charcoal text-parchment font-heading-scrap text-xs px-4 py-2 border-2 border-charcoal shadow-[3px_3px_0px_#0D0D0D] hover:bg-crimson hover:border-crimson transition-colors uppercase tracking-widest whitespace-nowrap cursor-pointer"
                                >
                                    ✉ Email Me
                                </a>
                                <a
                                    href="https://github.com/Manas8114"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-charcoal text-parchment font-heading-scrap text-xs px-4 py-2 border-2 border-charcoal shadow-[3px_3px_0px_#0D0D0D] hover:bg-charcoal/80 transition-colors uppercase tracking-widest whitespace-nowrap cursor-pointer"
                                >
                                    ⌥ GitHub
                                </a>
                                <a
                                    href="https://linkedin.com/in/manas8114"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-charcoal text-parchment font-heading-scrap text-xs px-4 py-2 border-2 border-charcoal shadow-[3px_3px_0px_#0D0D0D] hover:bg-[#0077B5] hover:border-[#0077B5] transition-colors uppercase tracking-widest whitespace-nowrap cursor-pointer"
                                >
                                    ∞ LinkedIn
                                </a>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Sticky Note Toggle */}
                    <motion.button
                        onClick={() => setIsExpanded(prev => !prev)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`bg-[#FFDE59] text-charcoal font-heading-scrap p-3 shadow-[4px_4px_0px_#0D0D0D] border-2 border-charcoal
                                    w-20 h-20 flex flex-col items-center justify-center text-center cursor-pointer
                                    transition-transform duration-200 ${isExpanded ? 'rotate-0' : 'rotate-3 hover:rotate-0'}`}
                        aria-label="Contact options"
                    >
                        {/* Tape strip at top */}
                        <div className="absolute top-1 left-[50%] -translate-x-1/2 w-8 h-2 bg-red-500/20 rotate-[-5deg]" />
                        <span className="text-base font-bold uppercase leading-none">
                            {isExpanded ? '✕' : 'Hire\nMe!'}
                        </span>
                        {!isExpanded && (
                            <span className="font-body-scrap text-[8px] mt-1 opacity-60">tap</span>
                        )}
                    </motion.button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
