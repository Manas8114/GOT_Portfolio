"use client";

import { motion, useInView } from "framer-motion";
import { certificates } from "@/lib/data";
import { useState, useEffect, useRef } from "react";
import { useSound } from "@/components/SoundSystem";

// Seeded layout — two-column staggered on desktop, stacked on mobile
const certLayout = [
    { top: "0%", left: "3%", rotate: "-5deg" },
    { top: "2%", left: "52%", rotate: "4deg" },
    { top: "18%", left: "8%", rotate: "3deg" },
    { top: "20%", left: "56%", rotate: "-7deg" },
    { top: "36%", left: "2%", rotate: "5deg" },
    { top: "38%", left: "54%", rotate: "-3deg" },
    { top: "54%", left: "6%", rotate: "-4deg" },
    { top: "56%", left: "52%", rotate: "6deg" },
    { top: "72%", left: "3%", rotate: "2deg" },
    { top: "74%", left: "55%", rotate: "-4deg" },
    { top: "90%", left: "5%", rotate: "3deg" },
    { top: "92%", left: "53%", rotate: "-2deg" },
    { top: "108%", left: "2%", rotate: "5deg" },
    { top: "110%", left: "57%", rotate: "-6deg" },
    { top: "126%", left: "4%", rotate: "2deg" },
];

// Define the primary certificates that deserve larger scale/focus
const featuredCerts = [
    "oracle-ai-foundations",
    "nptel-java"
];

interface CertCardProps {
    cert: (typeof certificates)[0];
    index: number;
    layout: { top: string; left: string; rotate: string };
    isMobile: boolean;
}

function CertCard({ cert, index, layout, isMobile }: CertCardProps) {
    const hasFeaturedRibbon = featuredCerts.includes(cert.id);
    const isFeatured = featuredCerts.includes(cert.id);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-40px" });
    const { playSound } = useSound();

    return (
        <motion.div
            ref={ref}
            drag
            onDragStart={() => playSound("drag")}
            onDragEnd={() => playSound("drop")}
            dragConstraints={{ left: -200, right: 200, top: -150, bottom: 300 }}
            whileDrag={{
                scale: 1.08,
                rotate: -2,
                cursor: "grabbing",
                zIndex: 100,
                boxShadow: "14px 20px 40px rgba(13,13,13,0.3), 0 0 0 2px var(--crimson)",
            }}
            initial={{ opacity: 0, scale: 0.8, y: 40 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ type: "spring", delay: index * 0.1 }}
            whileHover={{ y: -10, scale: 1.03, rotate: 0 }}
            className={`group ${isFeatured ? "w-[90vw] md:w-[350px]" : "w-[80vw] md:w-[280px]"} mb-12 md:mb-0 bg-parchment p-5 pt-7 border-3 border-charcoal relative cursor-grab z-10 hover:z-50 ${isMobile ? "" : "absolute"} shadow-[6px_6px_0px_#0D0D0D] torn-edge overflow-visible transition-shadow duration-300`}
            style={{
                top: isMobile ? "auto" : layout.top,
                left: isMobile ? "auto" : layout.left,
                rotate: isMobile ? "0deg" : layout.rotate,
                transformOrigin: "top center",
                willChange: "transform"
            }}
        >
            {/* Tape decoration */}
            <div className="scrap-tape top-[-12px] left-[50%] -translate-x-1/2 w-16 h-7 rotate-[3deg]" />

            {/* Ribbon for featured certs */}
            {hasFeaturedRibbon && <div className="cert-ribbon" />}

            {/* Wax Seal */}
            <div className="wax-seal mb-3 mx-auto flex-shrink-0">
                <span className="kanji text-lg text-parchment font-bold block transform rotate-12">印</span>
            </div>

            {/* Title */}
            <h3 className={`font-heading-scrap ${isFeatured ? 'text-2xl md:text-3xl' : 'text-base md:text-lg'} text-ink-black mb-1.5 leading-tight uppercase text-center`}>
                {cert.title}
            </h3>

            {/* Issuer */}
            <p className={`font-body-scrap ${isFeatured ? 'text-xs' : 'text-[10px]'} font-black text-crimson mb-2 uppercase tracking-widest text-center`}>
                {cert.issuer}
            </p>

            {/* Divider */}
            <div className="h-[2px] w-2/5 bg-ink-black/20 my-2 mx-auto" />

            {/* Context */}
            <p className="font-body-scrap text-xs font-bold text-stone-gray leading-relaxed text-center mb-1">
                {cert.context}
            </p>

            {/* Hover reveal: credential details */}
            <div className="max-h-0 group-hover:max-h-44 overflow-hidden transition-[max-height] duration-500 ease-in-out w-full">
                <div className="pt-2 border-t border-dashed border-ink-black/20 mt-2 text-center">
                    {cert.date && (
                        <p className="font-body-scrap text-[11px] text-charcoal">
                            <span className="font-black">Date:</span> {cert.date}
                        </p>
                    )}
                    {cert.credentialId && (
                        <p className="font-body-scrap text-[11px] text-charcoal mt-0.5">
                            <span className="font-black">ID:</span> {cert.credentialId}
                        </p>
                    )}
                    {"score" in cert && (cert as { score?: string }).score && (
                        <p className="font-body-scrap text-[11px] text-gold-muted mt-0.5 font-black">
                            Score: {(cert as { score?: string }).score}
                        </p>
                    )}
                    {"verifyUrl" in cert && (cert as { verifyUrl?: string }).verifyUrl && (
                        <a
                            href={(cert as { verifyUrl?: string }).verifyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block mt-1.5 font-body-scrap text-[11px] font-black text-crimson underline decoration-2 underline-offset-2 hover:text-ink-black transition-colors"
                        >
                            Verify Credential →
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

export default function Certificates() {
    const [mounted, setMounted] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [resetKey, setResetKey] = useState(0);
    const { playSound } = useSound();

    const handleReorganize = () => {
        playSound('click');
        setResetKey(prev => prev + 1);
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();

        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);


    if (!mounted) return null;

    return (
        <section id="seals" className="min-h-screen py-20 px-4 md:px-8 max-w-7xl mx-auto relative overflow-hidden" suppressHydrationWarning>
            <div className="absolute top-0 right-0 w-64 h-64 bg-[url('/grid.png')] opacity-10 pointer-events-none" />

            {/* Tidy Desk Button */}
            <div className="flex justify-between items-end mb-16 relative z-50">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative inline-block"
                >
                    <div className="absolute -inset-4 bg-crimson/10 rotate-2 blur-lg" />
                    <h2 className="text-4xl md:text-6xl font-heading-scrap text-charcoal tracking-tighter uppercase relative">
                        Official Seals
                        <span className="block text-xl md:text-2xl text-crimson font-body-scrap tracking-widest mt-2">Certified Output</span>
                    </h2>
                    <motion.div
                        className="h-2 w-full bg-crimson mt-2 origin-left"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    />
                </motion.div>

                <button
                    onClick={handleReorganize}
                    className="group flex flex-col items-center justify-center gap-1 cursor-pointer transition-transform hover:scale-105 active:scale-95"
                >
                    <div className="w-12 h-12 bg-charcoal rounded-full flex items-center justify-center shadow-[4px_4px_0px_var(--crimson)] border-2 border-crimson text-parchment group-hover:bg-crimson group-hover:text-charcoal transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></svg>
                    </div>
                    <span className="font-heading-scrap text-sm uppercase text-charcoal font-bold tracking-widest">Tidy Desk</span>
                </button>
            </div>

            <div className="relative mt-20" suppressHydrationWarning>
                {/* Board edge texture */}
                <div className="absolute -inset-x-4 -inset-y-8 bg-gradient-to-br from-parchment-light to-parchment-dark shadow-inner-lg border-t-2 border-b-2 border-charcoal/20 z-0" />

                {/* Certificates Scattered Grid */}
                <div className={`relative w-full z-30 ${isMobile ? "flex flex-col items-center" : ""}`}
                    style={{ height: isMobile ? "auto" : "2200px" }}
                    key={resetKey} // Hooked to re-render all Framer drags back to zero
                >
                    {certificates.map((cert, index) => (
                        <CertCard
                            key={cert.id}
                            cert={cert}
                            index={index}
                            layout={certLayout[index] || certLayout[0]}
                            isMobile={isMobile}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
