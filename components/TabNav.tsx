"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, memo } from "react";

export type TabId = "path" | "warrior" | "arsenal" | "battles" | "scrolls" | "seals" | "call";

interface Tab {
    id: TabId;
    label: string;
    kanji: string;
}

export const tabs: Tab[] = [
    { id: "path", label: "THE PATH", kanji: "道" },
    { id: "warrior", label: "THE WARRIOR", kanji: "武" },
    { id: "arsenal", label: "ARSENAL", kanji: "器" },
    { id: "battles", label: "BATTLES", kanji: "戦" },
    { id: "scrolls", label: "SCROLLS", kanji: "巻" },
    { id: "seals", label: "SEALS", kanji: "印" },
    { id: "call", label: "THE CALL", kanji: "声" },
];

interface TabNavProps {
    activeTab: TabId;
    onTabChange: (tab: TabId) => void;
}

const TabButton = memo(function TabButton({
    tab,
    isActive,
    onClick,
}: {
    tab: Tab;
    isActive: boolean;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className={`
                relative px-3 md:px-5 py-3 text-xs md:text-sm tracking-wider
                brush-tab tab-hover-wiggle
                transition-colors duration-200 ease-out
                ${isActive
                    ? "active text-parchment font-bold"
                    : "text-charcoal hover:text-ink-black"
                }
            `}
            style={{ willChange: "transform" }}
        >
            {/* Tab content */}
            <span className="relative z-10 flex items-center gap-1.5 md:gap-2">
                <span
                    className={`
                        hidden md:inline text-base font-serif transition-colors transition-transform duration-300
                        ${isActive
                            ? "text-gold-muted kanji-glow scale-110"
                            : "text-stone-gray"
                        }
                    `}
                >
                    {tab.kanji}
                </span>
                <span className="font-heading-scrap text-xs md:text-sm uppercase tracking-widest">
                    {tab.label}
                </span>
            </span>

            {/* Active ink-stroke underline */}
            <span
                className={`
                    absolute bottom-1 left-1/2 -translate-x-1/2 h-[3px] rounded-sm
                    transition-[width,opacity,background-color] duration-300 ease-out
                    ${isActive
                        ? "w-3/5 opacity-100 bg-gold-muted"
                        : "w-0 opacity-0 bg-crimson"
                    }
                `}
                style={{
                    clipPath: isActive
                        ? "polygon(0% 0%, 100% 20%, 98% 100%, 2% 80%)"
                        : "none",
                }}
            />
        </button>
    );
});

export function TabNav({ activeTab, onTabChange }: TabNavProps) {
    const handleTabClick = useCallback(
        (tabId: TabId) => {
            if (tabId !== activeTab) {
                onTabChange(tabId);
            }
        },
        [activeTab, onTabChange]
    );

    return (
        <nav
            className="fixed top-0 left-0 right-0 z-50 nav-parchment"
            style={{ willChange: "transform" }}
        >
            <div className="container">
                <ul className="flex items-center justify-center gap-0 md:gap-0.5 py-2 overflow-x-auto scrollbar-hide">
                    {tabs.map((tab) => (
                        <li key={tab.id}>
                            <TabButton
                                tab={tab}
                                isActive={activeTab === tab.id}
                                onClick={() => handleTabClick(tab.id)}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}

// Page transition variants
export const pageTransitionVariants = {
    initial: (direction: number) => ({
        opacity: 0,
        x: direction > 0 ? 60 : -60,
    }),
    animate: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.35,
            ease: [0.25, 0.1, 0.25, 1] as const,
        },
    },
    exit: (direction: number) => ({
        opacity: 0,
        x: direction > 0 ? -60 : 60,
        transition: {
            duration: 0.25,
            ease: [0.25, 0.1, 0.25, 1] as const,
        },
    }),
};

export function getTabDirection(fromTab: TabId, toTab: TabId): number {
    const fromIndex = tabs.findIndex((t) => t.id === fromTab);
    const toIndex = tabs.findIndex((t) => t.id === toTab);
    return toIndex > fromIndex ? 1 : -1;
}
