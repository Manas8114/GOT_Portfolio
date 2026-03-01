"use client";

import { useCallback, memo } from "react";

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
            aria-current={isActive ? "page" : undefined}
            className={`
                relative px-3 md:px-4 py-2 text-xs md:text-sm tracking-wider
                transition-all duration-200 ease-out rounded-sm
                ${isActive
                    ? "bg-crimson text-parchment font-bold shadow-[3px_3px_0px_#0D0D0D]"
                    : "text-charcoal hover:text-ink-black hover:bg-charcoal/10"
                }
            `}
            style={{ willChange: "transform" }}
        >
            {/* Tab content */}
            <span className="relative z-10 flex items-center gap-1.5 md:gap-2">
                <span
                    className={`
                        hidden md:inline text-base font-serif transition-all duration-300
                        ${isActive
                            ? "text-gold-muted scale-125 drop-shadow-[0_0_6px_rgba(210,175,98,0.8)]"
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
