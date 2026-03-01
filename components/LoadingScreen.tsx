"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function LoadingScreen() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Enforce a strict 1.5s loading state so the noise textures and fonts have time to load
        // preventing FOUC (Flash of Unstyled Content) and heavy GPU spikes on initial paint.
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-ink-black overflow-hidden font-body-scrap"
                >
                    <div className="w-full max-w-2xl px-8 flex flex-col gap-4">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            className="h-[2px] bg-crimson"
                        />
                        <div className="flex justify-between items-center w-full">
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="text-crimson text-sm uppercase tracking-widest"
                            >
                                {'>'} ACCESSING THE ARCHIVE...
                            </motion.p>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1 }}
                                className="text-crimson font-bold text-sm tracking-widest"
                            >
                                [OK]
                            </motion.p>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
