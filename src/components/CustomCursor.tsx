"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  const [isVisible, setIsVisible] = useState(false);

  // Cursor state: 'default' | 'hover' | 'project' | 'cta'
  const stateRef = useRef<string>("default");

  useEffect(() => {
    // Don't run on touch devices / small screens
    if (typeof window === "undefined") return;
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;
    const mq = window.matchMedia("(min-width: 768px)");
    if (!mq.matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    // Mouse position (raw) + interpolated positions
    const mouse = { x: -100, y: -100 };

    // GSAP quickTo for buttery-smooth interpolation with lag
    const dotX = gsap.quickTo(dot, "x", {
      duration: 0.15,
      ease: "power2.out",
    });
    const dotY = gsap.quickTo(dot, "y", {
      duration: 0.15,
      ease: "power2.out",
    });
    const ringX = gsap.quickTo(ring, "x", {
      duration: 0.35,
      ease: "power2.out",
    });
    const ringY = gsap.quickTo(ring, "y", {
      duration: 0.35,
      ease: "power2.out",
    });

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      dotX(mouse.x - 6);
      dotY(mouse.y - 6);
      ringX(mouse.x - 20);
      ringY(mouse.y - 20);

      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Check for project showcase items
      if (
        target.closest(".showcase-panel") ||
        target.closest(".interactive")
      ) {
        if (stateRef.current !== "project") {
          stateRef.current = "project";
          gsap.to(ring, {
            scale: 2.5,
            borderColor: "rgba(0, 229, 255, 0.6)",
            duration: 0.3,
            ease: "power2.out",
          });
          gsap.to(dot, {
            scale: 0,
            duration: 0.2,
          });
          gsap.to(label, {
            opacity: 1,
            scale: 1,
            duration: 0.25,
          });
        }
        return;
      }

      // Check for buttons and links
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.getAttribute("role") === "button"
      ) {
        if (stateRef.current !== "hover") {
          stateRef.current = "hover";
          gsap.to(ring, {
            scale: 1.8,
            borderColor: "rgba(0, 229, 255, 0.5)",
            duration: 0.3,
            ease: "power2.out",
          });
          gsap.to(dot, {
            scale: 0.6,
            duration: 0.2,
          });
          gsap.to(label, {
            opacity: 0,
            scale: 0.8,
            duration: 0.15,
          });
        }
        return;
      }

      // Default state
      if (stateRef.current !== "default") {
        stateRef.current = "default";
        gsap.to(ring, {
          scale: 1,
          borderColor: "rgba(255, 255, 255, 0.2)",
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(dot, {
          scale: 1,
          duration: 0.2,
        });
        gsap.to(label, {
          opacity: 0,
          scale: 0.8,
          duration: 0.15,
        });
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden md:block">
      {/* Primary Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-3 h-3 bg-[#6C63FF] rounded-full mix-blend-difference pointer-events-none z-50"
        style={{ transform: "translate(-100px, -100px)" }}
      />

      {/* Outer Ring + Label */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 border border-[rgba(255,255,255,0.2)] rounded-full pointer-events-none z-40 flex items-center justify-center"
        style={{ transform: "translate(-100px, -100px)" }}
      >
        <span
          ref={labelRef}
          className="text-[9px] font-mono font-bold text-white uppercase tracking-wider opacity-0 scale-[0.8]"
        >
          View
        </span>
      </div>
    </div>
  );
}
