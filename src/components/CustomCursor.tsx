"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.getAttribute("role") === "button" ||
        target.classList.contains("interactive")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden md:block">
      {/* Primary Dot Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-[#6C63FF] rounded-full mix-blend-difference pointer-events-none z-50"
        animate={{
          x: position.x - 6,
          y: position.y - 6,
          scale: 1,
        }}
        transition={{ type: "spring", stiffness: 800, damping: 35, mass: 0.1 }}
      />

      {/* Outer Ring Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-[rgba(255,255,255,0.3)] rounded-full pointer-events-none z-40"
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: isHovered ? 1.8 : 1,
          borderColor: isHovered ? "rgba(0, 229, 255, 0.6)" : "rgba(255, 255, 255, 0.2)",
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
      />
    </div>
  );
}
