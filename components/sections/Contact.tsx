"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { personalInfo } from "@/lib/data";
import { useSound } from "@/components/SoundSystem";
import { useMounted } from "@/lib/useClient";
import { Mail, Check, ExternalLink, MapPin, Send, MessageSquare, GraduationCap } from "lucide-react";

export default function Contact() {
    const mounted = useMounted();
    const { playSound } = useSound();
    const [copied, setCopied] = useState(false);

    const handleCopyEmail = () => {
        playSound("click");
        navigator.clipboard.writeText(personalInfo.email);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
    };

    if (!mounted) return null;

    return (
        <section
            id="call"
            className="min-h-screen py-20 px-4 md:px-8 max-w-5xl mx-auto relative overflow-hidden flex flex-col justify-center"
            suppressHydrationWarning
        >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[url('/grid.png')] opacity-10 pointer-events-none" />

            {/* Background Kanji Watermark */}
            <div className="absolute top-[10%] right-[5%] z-0 pointer-events-none select-none opacity-[0.04]">
                <span
                    className="font-heading-scrap text-[14rem] md:text-[22rem] leading-none text-crimson"
                    style={{ writingMode: "vertical-rl" }}
                >
                    声
                </span>
            </div>

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12 text-center relative z-20"
            >
                <div className="inline-block bg-crimson px-5 py-2 border-3 border-ink-black shadow-[4px_4px_0px_#0D0D0D] transform -rotate-1 mb-4">
                    <span className="font-heading-scrap text-xs md:text-sm text-parchment uppercase tracking-widest font-bold">
                        Direct Communiqué Dispatch
                    </span>
                </div>
                <h2 className="text-5xl md:text-7xl font-heading-scrap text-charcoal tracking-tighter uppercase mb-4">
                    The Call to Arms
                </h2>
                <p className="font-body-scrap text-base md:text-lg font-bold text-stone-gray max-w-xl mx-auto leading-relaxed">
                    Whether it&apos;s machine learning research, full-stack systems architecture, or mission-critical engineering — send word.
                </p>
            </motion.div>

            {/* Central Communique Parchment Dossier */}
            <motion.div
                drag
                dragConstraints={{ left: -60, right: 60, top: -40, bottom: 40 }}
                whileDrag={{ scale: 1.02, rotate: 1, cursor: "grabbing", zIndex: 50 }}
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", duration: 0.8 }}
                className="bg-parchment p-6 md:p-12 border-4 border-charcoal shadow-[10px_10px_0px_#0D0D0D] relative z-30 torn-edge max-w-3xl mx-auto w-full cursor-grab transform -rotate-0.5"
            >
                {/* Washi Tape Strip at corners */}
                <div className="scrap-tape top-[-14px] left-[50%] -translate-x-1/2 w-28 h-8 rotate-[2deg] z-20" />
                <div className="scrap-tape top-[-10px] right-[10%] w-16 h-6 rotate-[-6deg] z-20" />

                {/* Wax Seal Stamp */}
                <div className="wax-seal absolute top-4 right-4 md:top-6 md:right-8 flex-shrink-0 shadow-md">
                    <span className="kanji text-xl text-parchment font-bold block transform rotate-12 select-none">
                        声
                    </span>
                </div>

                {/* Communiqué Title */}
                <div className="border-b-2 border-charcoal/20 pb-4 mb-6">
                    <p className="font-heading-scrap text-xs uppercase tracking-widest text-crimson font-bold mb-1">
                        Priority Transmission // Classified
                    </p>
                    <h3 className="font-heading-scrap text-2xl md:text-3xl text-ink-black uppercase leading-tight">
                        Ready to Build Something Meaningful?
                    </h3>
                </div>

                {/* Email Callout & Direct Copy Action */}
                <div className="bg-charcoal p-5 md:p-6 border-3 border-ink-black shadow-[5px_5px_0px_var(--crimson)] mb-8">
                    <p className="font-heading-scrap text-xs text-gold-muted uppercase tracking-widest mb-2 flex items-center gap-1.5">
                        <Mail size={14} /> Direct Transmission Address:
                    </p>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                        <span className="font-body-scrap text-sm md:text-base font-bold text-parchment break-all select-all">
                            {personalInfo.email}
                        </span>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleCopyEmail}
                                className={`
                                    px-4 py-2 font-heading-scrap text-xs uppercase tracking-wider border-2 border-parchment transition-all cursor-pointer flex items-center justify-center gap-1.5 font-bold shadow-xs whitespace-nowrap
                                    ${copied ? "bg-emerald-600 text-parchment" : "bg-crimson text-parchment hover:bg-parchment hover:text-ink-black"}
                                `}
                            >
                                {copied ? (
                                    <>
                                        <Check size={14} /> Copied!
                                    </>
                                ) : (
                                    <>
                                        Copy Email
                                    </>
                                )}
                            </button>
                            <a
                                href={`mailto:${personalInfo.email}`}
                                onClick={() => playSound("click")}
                                className="px-3.5 py-2 bg-parchment text-ink-black font-heading-scrap text-xs uppercase tracking-wider border-2 border-parchment hover:bg-gold-muted transition-colors cursor-pointer flex items-center justify-center gap-1 font-bold shadow-xs whitespace-nowrap"
                                title="Open in default mail client"
                            >
                                <Send size={13} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Communication Channels Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    <a
                        href={personalInfo.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => playSound("click")}
                        className="group flex items-center justify-between p-4 bg-parchment-muted border-2 border-charcoal shadow-[3px_3px_0px_#0D0D0D] hover:bg-charcoal hover:text-parchment transition-all"
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-ink-black text-parchment group-hover:bg-crimson transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div>
                                <span className="font-heading-scrap text-xs uppercase tracking-widest text-stone-gray group-hover:text-gold-muted block">Codebase Archive</span>
                                <span className="font-heading-scrap text-sm font-bold uppercase">GitHub / Manas8114</span>
                            </div>
                        </div>
                        <ExternalLink size={16} className="text-stone-gray group-hover:text-parchment" />
                    </a>

                    <a
                        href={personalInfo.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => playSound("click")}
                        className="group flex items-center justify-between p-4 bg-parchment-muted border-2 border-charcoal shadow-[3px_3px_0px_#0D0D0D] hover:bg-[#0077B5] hover:text-parchment transition-all"
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-ink-black text-parchment group-hover:bg-parchment group-hover:text-[#0077B5] transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </div>
                            <div>
                                <span className="font-heading-scrap text-xs uppercase tracking-widest text-stone-gray group-hover:text-parchment/80 block">Network & Updates</span>
                                <span className="font-heading-scrap text-sm font-bold uppercase">LinkedIn / manas8114</span>
                            </div>
                        </div>
                        <ExternalLink size={16} className="text-stone-gray group-hover:text-parchment" />
                    </a>
                </div>

                {/* Location & Academic Trajectory Info */}
                <div className="pt-5 border-t-2 border-charcoal/20 space-y-3 font-body-scrap">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 bg-parchment-muted/90 border border-charcoal/30 shadow-xs">
                        <div className="flex items-center gap-2.5">
                            <GraduationCap size={22} className="text-crimson flex-shrink-0" />
                            <div>
                                <span className="text-[10px] font-heading-scrap text-crimson uppercase tracking-widest font-black block">
                                    Admitted · Graduate Studies
                                </span>
                                <span className="text-xs md:text-sm font-bold text-ink-black uppercase font-heading-scrap">
                                    University College Dublin (UCD) — MSc Data &amp; Computational Science (T306)
                                </span>
                            </div>
                        </div>
                        <span className="font-heading-scrap text-[10px] px-2.5 py-1 bg-emerald-800 text-parchment border border-ink-black self-start sm:self-auto font-bold uppercase tracking-wider shadow-xs">
                            ✓ Offer Received · Admitted
                        </span>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-charcoal font-bold pt-1">
                        <div className="flex items-center gap-1.5">
                            <MapPin size={14} className="text-crimson" />
                            <span>{personalInfo.location} · {personalInfo.education.institution} (CGPA {personalInfo.education.cgpa})</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-stone-gray">
                            <MessageSquare size={14} />
                            <span>Open to Research, Internships &amp; Engineering Roles</span>
                        </div>
                    </div>
                </div>

                {/* Closing quote */}
                <div className="mt-8 text-center border-t border-dashed border-charcoal/30 pt-6">
                    <p className="font-heading-scrap text-lg md:text-xl text-ink-black uppercase tracking-wide">
                        &ldquo;The path forward is built by those who walk it.&rdquo;
                    </p>
                    <span className="font-body-scrap text-xs text-crimson uppercase tracking-widest font-black mt-1 block">
                        — The Ronin Creed
                    </span>
                </div>
            </motion.div>
        </section>
    );
}
