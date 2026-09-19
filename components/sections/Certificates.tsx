"use client";

import { motion, useInView } from "framer-motion";
import { certificates } from "@/lib/data";
import { useState, useRef } from "react";
import { useSound } from "@/components/SoundSystem";
import { useMounted } from "@/lib/useClient";
import { ExternalLink, Award, CheckCircle2 } from "lucide-react";

// Thematic rotation angles for the wax seal scroll cards
const CERT_ROTATIONS = ["-3.5deg", "3deg", "-2deg", "4deg", "-3deg", "2deg", "-1.5deg", "3.5deg"];

// Primary certificates that deserve featured ribbon & spotlight
const featuredCerts = [
    "oracle-ai",
    "java-nptel",
    "ng-ml-specialization",
];

interface CertCardProps {
    cert: (typeof certificates)[0];
    index: number;
    rotation: string;
    isExpanded: boolean;
    onToggle: () => void;
}

function CertCard({ cert, index, rotation, isExpanded, onToggle }: CertCardProps) {
    const isFeatured = featuredCerts.includes(cert.id);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-40px" });
    const { playSound } = useSound();

    return (
        <motion.div
            ref={ref}
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
            onClick={() => {
                playSound("click");
                onToggle();
            }}
            drag
            dragConstraints={{ left: -100, right: 100, top: -80, bottom: 100 }}
            whileDrag={{
                scale: 1.06,
                rotate: -2,
                cursor: "grabbing",
                zIndex: 100,
                boxShadow: "14px 20px 40px rgba(13,13,13,0.35), 0 0 0 2px var(--crimson)",
            }}
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ type: "spring", delay: Math.min(index * 0.05, 0.4) }}
            whileHover={{ y: -6, scale: 1.02, rotate: 0 }}
            className={`group w-full bg-parchment p-5 pt-7 border-3 border-charcoal relative cursor-grab z-10 hover:z-40 shadow-[6px_6px_0px_#0D0D0D] torn-edge overflow-visible transition-all duration-300 ${isFeatured ? 'ring-2 ring-crimson/50' : ''}`}
            style={{
                rotate: rotation,
                transformOrigin: "top center",
            }}
        >
            {/* Scrap Tape decoration */}
            <div className="scrap-tape top-[-12px] left-[50%] -translate-x-1/2 w-16 h-7 rotate-[3deg] z-20" />

            {/* Featured Seal Ribbon */}
            {isFeatured && (
                <div className="absolute -top-2 -right-2 z-30 flex items-center gap-1 bg-crimson text-parchment font-heading-scrap text-[10px] px-2 py-0.5 uppercase tracking-widest shadow-sm border border-ink-black transform rotate-6">
                    <Award size={11} /> ELITE
                </div>
            )}

            {/* Red Wax Seal Stamp */}
            <div className="wax-seal mb-3 mx-auto flex-shrink-0 cursor-pointer shadow-md">
                <span className="kanji text-lg text-parchment font-bold block transform rotate-12 select-none">
                    印
                </span>
            </div>

            {/* Certificate Title */}
            <h3 className={`font-heading-scrap ${isFeatured ? 'text-xl md:text-2xl' : 'text-base md:text-lg'} text-ink-black mb-1.5 leading-tight uppercase text-center`}>
                {cert.title}
            </h3>

            {/* Issuer Badge */}
            <p className="font-body-scrap text-[11px] font-black text-crimson mb-2 uppercase tracking-widest text-center flex items-center justify-center gap-1">
                <CheckCircle2 size={12} className="inline text-crimson" /> {cert.issuer}
            </p>

            {/* Divider */}
            <div className="h-[2px] w-2/5 bg-ink-black/20 my-2 mx-auto" />

            {/* Context Summary */}
            <p className="font-body-scrap text-xs font-bold text-stone-gray leading-relaxed text-center mb-2">
                {cert.context}
            </p>

            {/* Expand / Reveal Credential Details (Desktop hover + mobile tap toggle) */}
            <div
                className={`overflow-hidden transition-all duration-400 ease-in-out ${isExpanded ? "max-h-48 opacity-100 mt-2" : "max-h-0 opacity-0 group-hover:max-h-48 group-hover:opacity-100 group-hover:mt-2"}`}
            >
                <div className="pt-2 border-t border-dashed border-ink-black/20 text-center">
                    {"date" in cert && cert.date && (
                        <p className="font-body-scrap text-[11px] text-charcoal">
                            <span className="font-black">Awarded:</span> {cert.date}
                        </p>
                    )}
                    {"credentialId" in cert && cert.credentialId && (
                        <p className="font-body-scrap text-[11px] text-charcoal mt-0.5">
                            <span className="font-black">Credential ID:</span> {cert.credentialId}
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
                            onClick={(e) => {
                                e.stopPropagation();
                                playSound("click");
                            }}
                            className="inline-flex items-center gap-1 mt-2 font-body-scrap text-xs font-black text-crimson underline decoration-2 underline-offset-2 hover:text-ink-black transition-colors"
                        >
                            Verify Credential <ExternalLink size={12} />
                        </a>
                    )}
                </div>
            </div>

            {/* Tap cue for mobile */}
            <div className="mt-2 text-center">
                <span className="font-body-scrap text-[10px] text-stone-gray/80 sm:hidden">
                    {isExpanded ? "Tap to collapse" : "Tap to inspect seal"}
                </span>
            </div>
        </motion.div>
    );
}

export default function Certificates() {
    const mounted = useMounted();
    const [expandedCertId, setExpandedCertId] = useState<string | null>(null);
    const [resetKey, setResetKey] = useState(0);
    const { playSound } = useSound();

    const handleReorganize = () => {
        playSound("click");
        setExpandedCertId(null);
        setResetKey((prev) => prev + 1);
    };

    const handleToggleCert = (id: string) => {
        setExpandedCertId((prev) => (prev === id ? null : id));
    };

    if (!mounted) return null;

    return (
        <section
            id="seals"
            className="min-h-screen py-20 px-4 md:px-8 max-w-7xl mx-auto relative overflow-hidden"
            suppressHydrationWarning
        >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[url('/grid.png')] opacity-10 pointer-events-none" />

            {/* Header + Tidy Desk Button */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-16 relative z-50">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative inline-block"
                >
                    <div className="absolute -inset-4 bg-crimson/10 rotate-2 blur-lg" />
                    <h2 className="text-4xl md:text-6xl font-heading-scrap text-charcoal tracking-tighter uppercase relative">
                        Official Seals
                        <span className="block text-xl md:text-2xl text-crimson font-body-scrap tracking-widest mt-2">
                            Certified Output & Credentials ({certificates.length})
                        </span>
                    </h2>
                    <motion.div
                        className="h-2 w-full bg-crimson mt-2 origin-left"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                    />
                </motion.div>

                <button
                    onClick={handleReorganize}
                    className="group flex items-center gap-2 px-4 py-2.5 bg-charcoal text-parchment font-heading-scrap text-xs uppercase tracking-widest border-2 border-crimson shadow-[4px_4px_0px_var(--crimson)] hover:bg-crimson hover:text-charcoal transition-all cursor-pointer rounded-sm"
                    title="Reset seals to desk order"
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

            <div className="relative mt-8" suppressHydrationWarning>
                {/* Board edge texture */}
                <div className="absolute -inset-x-4 -inset-y-8 bg-gradient-to-br from-parchment-light to-parchment-dark shadow-inner-lg border-t-2 border-b-2 border-charcoal/20 z-0" />

                {/* Certificates Staggered Grid — handles all 13+ certificates seamlessly */}
                <div
                    key={resetKey}
                    className="relative z-30 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 p-2 md:p-6"
                >
                    {certificates.map((cert, index) => (
                        <CertCard
                            key={cert.id}
                            cert={cert}
                            index={index}
                            rotation={CERT_ROTATIONS[index % CERT_ROTATIONS.length]}
                            isExpanded={expandedCertId === cert.id}
                            onToggle={() => handleToggleCert(cert.id)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
