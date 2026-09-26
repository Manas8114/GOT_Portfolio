"use client";

import { createContext, useContext, useState, useEffect, useRef, ReactNode } from "react";
import { useIsMobile, usePrefersReducedMotion } from "@/lib/useClient";

interface SoundContextType {
    soundEnabled: boolean;
    toggleSound: () => void;
    playSound: (soundType: SoundType) => void;
}

type SoundType = "transition" | "hover" | "click" | "ambient" | "drag" | "drop";

const SoundContext = createContext<SoundContextType | null>(null);

// Sound URLs — drag/drop reuse existing assets at different volumes for distinct feedback
const sounds: Record<SoundType, string> = {
    transition: "/sounds/wind-soft.wav",
    hover: "/sounds/bamboo-tap.wav",
    click: "/sounds/wood-tap.wav",
    ambient: "/sounds/wind-ambient.wav",
    drag: "/sounds/bamboo-tap.wav",
    drop: "/sounds/wood-tap.wav",
};

export function SoundProvider({ children }: { children: ReactNode }) {
    const [soundEnabled, setSoundEnabled] = useState(false);
    const audioCache = useRef<Record<string, HTMLAudioElement>>({});
    const isMobile = useIsMobile();
    const prefersReducedMotion = usePrefersReducedMotion();

    useEffect(() => {
        // Preload sounds when enabled
        if (soundEnabled && !prefersReducedMotion) {
            Object.entries(sounds).forEach(([key, url]) => {
                const audio = new Audio(url);
                audio.preload = "auto";
                audio.volume = key === "ambient" ? 0.1 : key === "drag" ? 0.15 : key === "drop" ? 0.4 : 0.3;
                audioCache.current[key] = audio;
            });
        }
    }, [soundEnabled, prefersReducedMotion]);

    const toggleSound = () => {
        // Don't enable sound on mobile by default
        if (isMobile && !soundEnabled) {
            console.log("Sound enabled on mobile device");
        }
        setSoundEnabled((prev) => !prev);
    };

    const playSound = (soundType: SoundType) => {
        if (!soundEnabled || prefersReducedMotion) return;

        const audioNode = audioCache.current[soundType];
        if (audioNode) {
            audioNode.currentTime = 0;
            audioNode.play().catch(() => {
                // Autoplay blocked, silent fail
            });
        }
    };

    return (
        <SoundContext.Provider value={{ soundEnabled, toggleSound, playSound }}>
            {children}
        </SoundContext.Provider>
    );
}

export function useSound() {
    const context = useContext(SoundContext);
    if (!context) {
        // Return a safe default when used outside provider
        return {
            soundEnabled: false,
            toggleSound: () => { },
            playSound: () => { },
        };
    }
    return context;
}

// Sound toggle component
export function SoundToggle() {
    const { soundEnabled, toggleSound } = useSound();

    return (
        <button
            suppressHydrationWarning
            onClick={toggleSound}
            className="fixed bottom-6 right-6 z-50 p-3 rounded-full transition-[transform,background-color,border-color,color] duration-300 hover:scale-110"
            style={{
                background: soundEnabled ? "var(--crimson)" : "var(--charcoal)",
                border: "1px solid var(--fog)",
                color: "var(--parchment)",
            }}
            aria-label={soundEnabled ? "Disable sound" : "Enable sound"}
            title={soundEnabled ? "Sound On" : "Sound Off (Click to enable)"}
        >
            {soundEnabled ? (
                <svg
                    suppressHydrationWarning
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                    />
                </svg>
            ) : (
                <svg
                    suppressHydrationWarning
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                    />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                    />
                </svg>
            )}
        </button>
    );
}
