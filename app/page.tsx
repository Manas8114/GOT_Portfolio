"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { TabNav, TabId, tabs, pageTransitionVariants } from "@/components/TabNav";
import { SoundProvider, SoundToggle } from "@/components/SoundSystem";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Research from "@/components/sections/Research";
import Certificates from "@/components/sections/Certificates";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

// Map tabs to components
const tabComponents: Record<TabId, React.ComponentType> = {
  path: Hero,
  warrior: About,
  arsenal: Skills,
  battles: Projects,
  scrolls: Research,
  seals: Certificates,
  call: Contact,
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>("path");
  const [direction, setDirection] = useState(0);

  const handleTabChange = useCallback(
    (newTab: TabId) => {
      const currentIndex = tabs.findIndex((t) => t.id === activeTab);
      const newIndex = tabs.findIndex((t) => t.id === newTab);
      // Update URL hash without full navigation
      setDirection(newIndex > currentIndex ? 1 : -1);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveTab(newTab); // Set activeTab immediately
      window.history.pushState(null, "", `#${newTab}`);
    },
    [activeTab]
  );

  // Handle browser back/forward and initial hash
  const initialHash = typeof window !== 'undefined' ? window.location.hash.slice(1) as TabId : null;

  // Check initial hash silently BEFORE effect to avoid cascade warning if possible, 
  // but honestly Next.js layout needs this to sync. We will use a ref to prevent double-firing
  // or just capture it gracefully.
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) as TabId;
      if (hash && tabs.some((t) => t.id === hash)) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setActiveTab(hash);
        // Scroll to top when switching tabs — the content is swapped by AnimatePresence,
        // so scrollIntoView on a DOM id would fail (element not yet rendered).
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    window.addEventListener("hashchange", handleHashChange);

    // Process initial hash once on mount without causing a cascade loop
    if (initialHash && tabs.some((t) => t.id === initialHash)) {

      setActiveTab(initialHash);
    }

    return () => window.removeEventListener("hashchange", handleHashChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ActiveComponent = tabComponents[activeTab];

  return (
    <SoundProvider>
      <MotionConfig reducedMotion="user">
        <TabNav activeTab={activeTab} onTabChange={handleTabChange} />

        {/* Main content with page transitions */}
        <main className="pt-14">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeTab}
              custom={direction}
              variants={pageTransitionVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="min-h-screen"
            >
              <ActiveComponent />
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Only show footer on contact tab */}
        {activeTab === "call" && <Footer />}

        {/* Sound toggle */}
        <SoundToggle />
      </MotionConfig>
    </SoundProvider>
  );
}
