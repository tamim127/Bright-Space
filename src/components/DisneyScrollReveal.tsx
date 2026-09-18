"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useVelocity,
  Variants,
} from "framer-motion";

/**
 * DISNEY'S 12 PRINCIPLES OF SCROLL-TRIGGERED MOTION
 * 
 * 1. Squash & Stretch: Subtle velocity-driven scaling on fast scrolls, softly settling back.
 * 2. Anticipation: Early trigger (10-15% into viewport) before full view.
 * 3. Staging: Reading order progression (top-to-bottom, left-to-right).
 * 4. Straight Ahead vs Pose-to-Pose: Clear hidden vs revealed poses.
 * 5. Follow Through & Overlapping: Staggered sequential reveals.
 * 6. Slow In / Slow Out: Custom ease-out curve [0.22, 1, 0.36, 1].
 * 7. Arcs: Curved motion paths using scroll progress.
 * 8. Secondary Action: Simultaneous opacity + translateY + subtle scale.
 * 9. Timing: 500-600ms responsive durations.
 * 10. Exaggeration: Scroll speed drives micro-dynamic intensity.
 * 11. Solid Drawing: Continuous 3D/2D interpolation with no jumps.
 * 12. Appeal: Organic, fluid, non-obstructive delight.
 */

// Premium Quintic Ease-Out curve for organic settling (Slow In/Slow Out)
export const DISNEY_EASE = [0.22, 1, 0.36, 1] as const;

export interface DisneyRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  scaleInitial?: number;
  threshold?: number;
  viewportMargin?: string;
  once?: boolean;
}

/**
 * DisneyReveal Component
 * Applies Anticipation, Pose-to-Pose, Secondary Action (fade+slide+scale), and Slow In/Slow Out.
 */
export function DisneyReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.55,
  direction = "up",
  distance = 32,
  scaleInitial = 0.97,
  viewportMargin = "-12%",
  once = true,
}: DisneyRevealProps) {
  const getOffset = () => {
    switch (direction) {
      case "up":
        return { x: 0, y: distance };
      case "down":
        return { x: 0, y: -distance };
      case "left":
        return { x: distance, y: 0 };
      case "right":
        return { x: -distance, y: 0 };
      case "none":
      default:
        return { x: 0, y: 0 };
    }
  };

  const offset = getOffset();

  const variants: Variants = {
    hidden: {
      opacity: 0,
      x: offset.x,
      y: offset.y,
      scale: scaleInitial,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        duration,
        delay,
        ease: DISNEY_EASE,
      },
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: viewportMargin }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * DisneyStaggerGroup & DisneyStaggerItem
 * Implements Follow Through & Overlapping Action, and Staging.
 */
export interface DisneyStaggerGroupProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  viewportMargin?: string;
  once?: boolean;
}

export function DisneyStaggerGroup({
  children,
  className = "",
  stagger = 0.09,
  delayChildren = 0.05,
  viewportMargin = "-12%",
  once = true,
}: DisneyStaggerGroupProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: viewportMargin }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function DisneyStaggerItem({
  children,
  className = "",
  duration = 0.55,
  distance = 28,
  scaleInitial = 0.96,
}: {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  distance?: number;
  scaleInitial?: number;
}) {
  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: distance,
      scale: scaleInitial,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration,
        ease: DISNEY_EASE,
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}

/**
 * SquashStretchOnScroll Component
 * Implements Disney Principle #1: Squash & Stretch based on scroll velocity.
 * Elements gently compress vertically and expand slightly horizontally during high-speed scrolls,
 * settling smoothly with spring physics when scrolling halts.
 */
export function SquashStretchOnScroll({
  children,
  className = "",
  intensity = 0.03, // subtle micro-compression (3% max) to remain aesthetic
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}) {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  // Smooth the raw velocity with spring physics for natural elasticity
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 35,
    stiffness: 280,
    restDelta: 0.001,
  });

  // Calculate subtle squash factor (1 -> 0.97 on fast scroll)
  const scaleY = useTransform(smoothVelocity, [-2500, 0, 2500], [
    1 - intensity,
    1,
    1 - intensity,
  ]);

  // Minor complementary stretch on the orthogonal axis
  const scaleX = useTransform(smoothVelocity, [-2500, 0, 2500], [
    1 + intensity * 0.5,
    1,
    1 + intensity * 0.5,
  ]);

  return (
    <motion.div style={{ scaleX, scaleY }} className={className}>
      {children}
    </motion.div>
  );
}

/**
 * DisneyArcParallax Component
 * Implements Disney Principle #7: Arcs.
 * Moves elements along a subtle curved trajectory as the user scrolls past.
 */
export function DisneyArcParallax({
  children,
  className = "",
  arcStrength = 18,
  yOffset = 50,
}: {
  children?: React.ReactNode;
  className?: string;
  arcStrength?: number; // horizontal arc peak in pixels
  yOffset?: number; // vertical parallax distance
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Vertical parallax: moves from +yOffset to -yOffset
  const y = useTransform(scrollYProgress, [0, 1], [yOffset, -yOffset]);

  // Arc path: subtle sine-like curve (0 -> peak -> 0)
  const x = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0, arcStrength, 0]
  );

  return (
    <motion.div ref={ref} style={{ y, x }} className={className}>
      {children}
    </motion.div>
  );
}
