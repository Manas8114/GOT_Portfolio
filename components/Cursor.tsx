"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Cursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Check if hovering over clickable or draggable items
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
            window.removeEventListener("mousemove", updateMousePosition);
            window.removeEventListener("mouseover", handleMouseOver);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, []);

    // Hide custom cursor on mobile or touch devices
    if (typeof window !== "undefined" && window.innerWidth <= 768) {
        return null;
    }

    return (
        <>
            {/* Grappling Hook Cursor */}
            <motion.div
                suppressHydrationWarning
                className="fixed top-0 left-0 pointer-events-none z-[9999] flex flex-col items-center justify-center mix-blend-difference text-crimson"
                style={{
                    color: "var(--crimson)",
                    transformOrigin: "center center"
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
            </motion.div >
        </>
    );
}
