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
  const [activeTab, setActiveTab] = useState<TabId>(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.slice(1) as TabId;
      if (hash && tabs.some((t) => t.id === hash)) {
        return hash;
      }
    }
    return "path";
  });
  const [direction, setDirection] = useState(0);

  const handleTabChange = useCallback(
    (newTab: TabId) => {
      const currentIndex = tabs.findIndex((t) => t.id === activeTab);
      const newIndex = tabs.findIndex((t) => t.id === newTab);
      setDirection(newIndex > currentIndex ? 1 : -1);
      setActiveTab(newTab);
      window.history.pushState(null, "", `#${newTab}`);
    },
    [activeTab]
  );

  // Handle browser back/forward navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) as TabId;
      if (hash && tabs.some((t) => t.id === hash)) {
        setActiveTab(hash);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
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
