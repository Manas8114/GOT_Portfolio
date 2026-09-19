"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * Idiomatic React 19 hook to check if the component is mounted on the client
 * without triggering cascading renders or `react-hooks/set-state-in-effect` errors.
 */
export function useMounted(): boolean {
    return useSyncExternalStore(
        emptySubscribe,
        () => true,
        () => false
    );
}

/**
 * Idiomatic React 19 hook for responsive viewport width detection
 */
export function useIsMobile(breakpoint = 768): boolean {
    return useSyncExternalStore(
        (callback) => {
            window.addEventListener("resize", callback);
            return () => window.removeEventListener("resize", callback);
        },
        () => (typeof window !== "undefined" ? window.innerWidth <= breakpoint : false),
        () => false
    );
}

/**
 * Idiomatic React 19 hook for reduced motion detection
 */
export function usePrefersReducedMotion(): boolean {
    return useSyncExternalStore(
        (callback) => {
            if (typeof window === "undefined") return () => {};
            const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
            mediaQuery.addEventListener("change", callback);
            return () => mediaQuery.removeEventListener("change", callback);
        },
        () => (typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false),
        () => false
    );
}
