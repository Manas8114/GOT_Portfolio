"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { certificates } from "@/lib/data";
import { useState, useEffect, useRef } from "react";
import { useSound } from "@/components/SoundSystem";

// Seeded layout — two-column staggered on desktop, stacked on mobile
const certLayout = [
    { top: "0%", left: "3%", rotate: "-5deg" },
    { top: "2%", left: "52%", rotate: "4deg" },
    { top: "22%", left: "8%", rotate: "3deg" },
    { top: "24%", left: "56%", rotate: "-7deg" },
    { top: "44%", left: "2%", rotate: "5deg" },
    { top: "46%", left: "54%", rotate: "-3deg" },
    { top: "66%", left: "6%", rotate: "-4deg" },
    { top: "68%", left: "52%", rotate: "6deg" },
    { top: "88%", left: "3%", rotate: "2deg" },
];

// Featured certificates get a gold ribbon
const featuredCerts = ["oracle-ai", "java-nptel"];

interface CertCardProps {
    cert: (typeof certificates)[0];
    index: number;
    layout: { top: string; left: string; rotate: string };
    isMobile: boolean;
}

function CertCard({ cert, index, layout, isMobile }: CertCardProps) {
    const hasFeaturedRibbon = featuredCerts.includes(cert.id);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-40px" });
    const { playSound } = useSound();

    return (
        <motion.div
            ref={ref}
            drag
            onDragStart={() => playSound("hover")}
            dragConstraints={{ left: -200, right: 200, top: -150, bottom: 300 }}
            whileDrag={{ scale: 1.08, rotate: -2, cursor: "grabbing", zIndex: 100 }}
            initial={{ opacity: 0, scale: 0.8, y: 40 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ type: "spring", delay: index * 0.08, stiffness: 200, damping: 20 }}
            whileHover={{ y: -10, scale: 1.03, rotate: 0 }}
            className={`w-[85vw] max-w-[340px] bg-parchment p-5 pt-7 border-3 border-charcoal relative cursor-grab z-10 hover:z-50 ${isMobile ? "mb-6" : "absolute"} shadow-[6px_6px_0px_#0D0D0D] group torn-edge overflow-visible`}
            style={{
                top: isMobile ? "auto" : layout.top,
                left: isMobile ? "auto" : layout.left,
                rotate: isMobile ? "0deg" : layout.rotate,
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
            <h3 className="font-heading-scrap text-base md:text-lg text-ink-black mb-1.5 leading-tight uppercase text-center">
                {cert.title}
            </h3>

            {/* Issuer */}
            <p className="font-body-scrap text-[10px] font-black text-crimson mb-2 uppercase tracking-widest text-center">
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
    const containerRef = useRef<HTMLElement>(null);
    const { playSound } = useSound();

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const bgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

    useEffect(() => {
        setMounted(true);
        setIsMobile(window.innerWidth <= 768);
    }, []);


    return (
        <section
            id="certificates"
            ref={containerRef}
            className="relative min-h-[180vh] w-full pt-10 pb-32 overflow-hidden"
            style={{ background: "transparent" }}
        >
            <div className="container relative z-10 max-w-6xl mx-auto h-full px-4">

                {/* Background Kanji Watermark */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 0.05, scale: 1 }}
                    viewport={{ once: true }}
                    className="absolute top-[8%] left-[5%] z-0 select-none hidden md:block pointer-events-none"
                    style={{ y: bgY }}
                >
                    <h2 className="kanji text-[14rem] md:text-[18rem] leading-none text-crimson">
                        印
                    </h2>
                </motion.div>

                {/* Scattered ink dots */}
                <div className="absolute top-[15%] right-[20%] w-3 h-3 bg-ink-black rounded-full opacity-25 pointer-events-none" />
                <div className="absolute top-[25%] right-[40%] w-2 h-2 bg-crimson rounded-full opacity-15 pointer-events-none" />
                <div className="absolute top-[60%] left-[18%] w-4 h-4 bg-ink-black rounded-full opacity-20 pointer-events-none" />
                <div className="absolute bottom-[30%] right-[12%] w-2 h-2 bg-gold-muted rounded-full opacity-25 pointer-events-none" />

                {/* Title element */}
                <motion.div
                    className="bg-charcoal p-6 md:p-8 max-w-md mx-auto md:mx-0 md:ml-auto md:mr-[10%] border-4 border-ink-black shadow-[8px_8px_0px_#0D0D0D] relative z-20 transform md:rotate-[3deg] mt-10 md:mt-20"
                    drag
                    onDragStart={() => playSound("click")}
                    dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
                    whileDrag={{ scale: 1.05, rotate: 1, cursor: "grabbing" }}
                >
                    <div className="scrap-tape top-[-20px] left-[50%] -translate-x-1/2 w-24 h-10 rotate-[-5deg]" />
                    <h2 className="font-heading-scrap text-4xl md:text-5xl text-gold-muted mb-2 uppercase">Seals of Mastery</h2>
                    <p className="font-body-scrap text-sm text-parchment font-bold leading-relaxed">
                        Formal recognition of knowledge acquired. Each seal represents a deliberate step toward mastery. Hover to reveal credentials. Drag to explore.
                    </p>
                </motion.div>

                {/* Certificates Scattered Grid */}
                <div className={`relative w-full mt-14 z-30 ${isMobile ? "flex flex-col items-center" : ""}`}
                    style={{ height: isMobile ? "auto" : "1400px" }}
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

            {/* Background texture overlay */}
            <div className="absolute inset-0 bg-parchment-muted opacity-15 mix-blend-multiply pointer-events-none z-0" />
        </section>
    );
}
