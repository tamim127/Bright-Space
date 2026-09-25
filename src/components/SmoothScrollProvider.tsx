"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

// Register once at module level — avoids re-registration on every render
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export interface ScrollToOptions {
  offset?: number;
  lerp?: number;
  duration?: number;
  easing?: (t: number) => number;
  immediate?: boolean;
  lock?: boolean;
  force?: boolean;
  onComplete?: (lenis: Lenis) => void;
}

interface SmoothScrollContextType {
  lenis: Lenis | null;
  scrollTo: (target: string | HTMLElement | number, options?: ScrollToOptions) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  lenis: null,
  scrollTo: () => {},
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Framer Motion scroll progress for the top indicator
  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 28,
    restDelta: 0.001,
  });

  useEffect(() => {
    // Accessibility check: reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      return;
    }

    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.6,
      infinite: false,
    });

    lenisRef.current = lenis;
    setLenisInstance(lenis);
    window.__lenis = lenis;

    // Synchronize Lenis with GSAP ScrollTrigger
    const handleScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on("scroll", handleScroll);

    // Synchronize GSAP ticker with Lenis raf
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Track scroll threshold for Floating "Scroll to top" button
    const unsubscribeScrollY = scrollY.on("change", (latest) => {
      setShowScrollTop(latest > 500);
    });

    return () => {
      unsubscribeScrollY();
      lenis.off("scroll", handleScroll);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
      setLenisInstance(null);
      delete window.__lenis;
    };
  }, [scrollY]);

  // Handle route change
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    }
  }, [pathname]);

  const scrollTo = (target: string | HTMLElement | number, options?: ScrollToOptions) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { duration: 1.2, ...options });
    } else if (typeof window !== "undefined") {
      if (typeof target === "number") {
        window.scrollTo({ top: target, behavior: "smooth" });
      }
    }
  };

  return (
    <SmoothScrollContext.Provider value={{ lenis: lenisInstance, scrollTo }}>
      {/* 1. Global Modern Top Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 h-[2.5px] z-[9999] pointer-events-none bg-transparent">
        <motion.div
          className="h-full w-full bg-gradient-to-r from-[#00E5FF] via-[#6C63FF] to-[#00E5FF] origin-left shadow-[0_0_12px_rgba(0,229,255,0.7)]"
          style={{ scaleX }}
        />
      </div>

      {children}

      {/* 2. Floating Modern "Scroll to Top" Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            type="button"
            onClick={() => scrollTo(0, { duration: 1.3 })}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            aria-label="Scroll to top"
            className="fixed bottom-8 right-8 z-50 p-3 rounded-full border border-white/15 bg-[#0c0c0e]/80 hover:bg-[#15151c] text-white hover:text-[#00E5FF] shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all duration-300 group hover:border-[#00E5FF]/40 hover:scale-110 active:scale-95"
          >
            <ArrowUp className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
            <span className="sr-only">Scroll to top</span>
          </motion.button>
        )}
      </AnimatePresence>
    </SmoothScrollContext.Provider>
  );
}
