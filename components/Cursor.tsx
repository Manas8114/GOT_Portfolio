"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useMounted } from "@/lib/useClient";

export default function Cursor() {
    const mounted = useMounted();
    const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [isPointerFine, setIsPointerFine] = useState(false);

    useEffect(() => {
        // Only activate custom cursor on devices with fine pointer (mouse / trackpad)
        const checkPointer = () => {
            const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
            const isDesktopWidth = window.innerWidth > 768;
            setIsPointerFine(hasFinePointer && isDesktopWidth);
        };

        checkPointer();
        window.addEventListener("resize", checkPointer);

        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                window.getComputedStyle(target).cursor === "pointer" ||
                target.tagName.toLowerCase() === "a" ||
                target.tagName.toLowerCase() === "button" ||
                target.classList.contains("draggable-item") ||
                target.closest("a") ||
                target.closest("button")
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        window.addEventListener("mousemove", updateMousePosition);
        window.addEventListener("mouseover", handleMouseOver);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("resize", checkPointer);
            window.removeEventListener("mousemove", updateMousePosition);
            window.removeEventListener("mouseover", handleMouseOver);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, []);

    // Never render on server or touch devices
    if (!mounted || !isPointerFine) {
        return null;
    }

    return (
        <motion.div
            suppressHydrationWarning
            className="fixed top-0 left-0 pointer-events-none z-[9999] flex flex-col items-center justify-center mix-blend-difference text-crimson"
            style={{
                color: "var(--crimson)",
                transformOrigin: "center center",
            }}
            animate={{
                x: mousePosition.x - 16,
                y: mousePosition.y - 16,
                scale: isClicking ? 0.9 : isHovering ? 1.2 : 1,
                rotate: isClicking ? 45 : isHovering ? -15 : 0,
            }}
            transition={{
                type: "spring",
                stiffness: 400,
            }}
        >
            <svg
                suppressHydrationWarning
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="drop-shadow-sm"
            >
                <path d="M12 2v10" />
                <path d="M12 12c-2 0-4 1.5-4 4v2" />
                <path d="M12 12c2 0 4 1.5 4 4v2" />
                <path d="M9 16l3 2 3-2" />
                <circle cx="12" cy="3" r="1.5" />
                {/* Rope trailing off */}
                <path d="M12 2C13 0 16 0 17 -3" opacity="0.6" strokeDasharray="2 2" />
            </svg>
        </motion.div>
    );
}
