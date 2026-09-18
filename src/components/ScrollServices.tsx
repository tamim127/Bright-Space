"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "@/components/MagneticButton";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ServicePhase {
  phase: string;
  titleLine1: string;
  titleLine2?: string;
  description: string;
  tags: string[];
  image: string;
  imageAlt: string;
}

export const defaultPhases: ServicePhase[] = [
  {
    phase: "Phase 01",
    titleLine1: "Discovery",
    titleLine2: "& Research",
    description:
      "We start by understanding your goals, users, and market — turning open questions into a clear, shared direction.",
    tags: ["Audit", "User Research", "Workshops"],
    image: "/images/services/phase-01-discovery.png",
    imageAlt: "Discovery",
  },
  {
    phase: "Phase 02",
    titleLine1: "Product",
    titleLine2: "Strategy",
    description:
      "We shape the roadmap — defining priorities, positioning, and the metrics that tell us we are winning.",
    tags: ["Roadmap", "Positioning", "Metrics"],
    image: "/images/services/phase-02-strategy.png",
    imageAlt: "Strategy",
  },
  {
    phase: "Phase 03",
    titleLine1: "Interface",
    titleLine2: "Design",
    description:
      "We design intuitive, beautiful interfaces and flows that make the product feel effortless to use.",
    tags: ["UI Design", "Prototyping", "Design System"],
    image: "/images/services/phase-03-design.png",
    imageAlt: "Design",
  },
  {
    phase: "Phase 04",
    titleLine1: "Engineering",
    titleLine2: "& Build",
    description:
      "We turn design into robust, production-ready product — built to scale, tested, and shipped with confidence.",
    tags: ["Frontend", "Backend", "QA"],
    image: "/images/services/phase-04-engineering.png",
    imageAlt: "Engineering",
  },
  {
    phase: "Phase 05",
    titleLine1: "Launch",
    titleLine2: "& Growth",
    description:
      "We ship, measure, and iterate — refining the product and driving momentum long after go-live.",
    tags: ["Launch", "Analytics", "Iteration"],
    image: "/images/services/phase-05-launch.png",
    imageAlt: "Launch",
  },
];

export default function ScrollServices() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  const [dimensions, setDimensions] = useState({ width: 1440, height: 900 });
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [easedProgress, setEasedProgress] = useState(0);

  const totalPhases = defaultPhases.length;

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle subtle mouse parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMouse({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // GSAP ScrollTrigger + continuous smooth scrub
  useEffect(() => {
    if (!trackRef.current) return;

    ScrollTrigger.refresh();

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: trackRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.2,
        onUpdate: (self) => {
          setEasedProgress(self.progress);
        },
      });
    }, containerRef);

    const handleScroll = () => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const scrollableDistance = rect.height - window.innerHeight;
      if (scrollableDistance > 0) {
        const p = Math.max(0, Math.min(1, -rect.top / scrollableDistance));
        setEasedProgress(p);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      ctx.revert();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [totalPhases, dimensions]);

  // Framer-matching snappy easing curve between phases
  // Calculates A (continuous phase progress 0 to totalPhases - 1)
  const At = Math.max(0, Math.min(1, easedProgress)) * (totalPhases - 1);
  const jt = Math.min(Math.max(totalPhases - 2, 0), Math.floor(At));
  const Mt = At - jt;
  let Nt = 0;
  if (Mt < 0.34) {
    Nt = 0;
  } else if (Mt > 0.66) {
    Nt = 1;
  } else {
    const t = (Mt - 0.34) / 0.32;
    Nt = t * t * (3 - 2 * t);
  }
  const A = jt + Nt;
  const activeIndex = Math.round(A);

  // Geometry calculations matching the reference
  const { width: W, height: H } = dimensions;
  const isMobile = W < 820;

  // Offsets and radius
  const circleLeftPct = isMobile ? -35 : -12;
  const circleRadiusPct = isMobile ? 55 : 32;
  const stepDegrees = isMobile ? 24 : 19;

  const Pt = (circleLeftPct / 100) * W;
  const P = H * 0.5;
  const F = (circleRadiusPct / 100) * W;

  // Node locations along the circular arc
  const nodeStates = defaultPhases.map((_, i) => {
    const tDeg = (i - A) * stepDegrees;
    const nRad = (tDeg * Math.PI) / 180;
    const x = Pt + F * Math.cos(nRad);
    const y = P - F * Math.sin(nRad);
    const dist = Math.abs(i - A);

    // Scaling & opacities
    const scale = Math.max(0.68, Math.min(1.15, 1.15 - 0.11 * dist));
    const activeFillAlpha = Math.max(0, Math.min(1, 1.25 - 1.9 * dist));
    const ringBorderAlpha =
      (1 - activeFillAlpha) * Math.max(0.2, Math.min(0.5, 0.5 - 0.09 * dist));

    return {
      x,
      y,
      scale,
      activeFillAlpha,
      ringBorderAlpha,
      dist,
      tDeg,
    };
  });

  // Calculate active connecting line arc path
  // Starts from Node 0's angle up to current active node (angle 0)
  const angle0 = -A * stepDegrees * (Math.PI / 180);
  const p1x = Pt + F * Math.cos(angle0);
  const p1y = P - F * Math.sin(angle0);
  const p2x = Pt + F;
  const p2y = P;

  const showActiveArc = A > 0.02;
  const activeArcD = showActiveArc
    ? `M ${p1x.toFixed(2)} ${p1y.toFixed(2)} A ${F.toFixed(2)} ${F.toFixed(2)} 0 0 0 ${p2x.toFixed(2)} ${p2y.toFixed(2)}`
    : "";

  // Smooth scroll to specific phase on click
  const scrollToPhase = useCallback(
    (index: number) => {
      if (!trackRef.current) return;
      const track = trackRef.current;
      const rect = track.getBoundingClientRect();
      const scrollTop = window.scrollY + rect.top;
      const scrollableDistance = track.offsetHeight - window.innerHeight;
      const targetY =
        scrollTop + (index / (totalPhases - 1)) * scrollableDistance;
      window.scrollTo({ top: targetY, behavior: "smooth" });
    },
    [totalPhases]
  );

  return (
    <div ref={containerRef} className="relative w-full">
      {/* 1. INTRO BOOKEND SECTION */}
      <section className="min-h-screen bg-[#171512] text-[#f2f0ec] flex flex-col justify-center items-center relative px-6 text-center select-none z-10">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-xs uppercase tracking-[0.22em] text-[#9A9A9A] font-mono font-medium">
            Our Process
          </div>
          <h2 className="font-instrument text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white leading-[1.04]">
            How we bring ideas to life
          </h2>
          <p className="text-[#9A9A9A] max-w-xl mx-auto text-base sm:text-lg font-light leading-relaxed">
            Scroll down to walk through each phase — from first conversation to
            launch. Every step stays pinned to the screen while the story unfolds
            around it.
          </p>
        </div>

        {/* Bouncing down indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#9A9A9A] pointer-events-none">
          <span className="text-xs font-mono uppercase tracking-widest text-[#777]">
            Scroll
          </span>
          <svg
            className="w-5 h-5 animate-bounce text-[#9A9A9A]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/* 2. PINNED SCROLL SERVICES TRACK (560vh) */}
      <div ref={trackRef} className="relative w-full h-[560vh]">
        <div
          ref={viewportRef}
          className="sticky top-0 w-full h-screen overflow-hidden bg-[#f2f0ec] text-[#171512] select-none"
        >
          {/* Subtle Ambient Grain / Vignette */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.8) 0%, rgba(220,217,210,0.4) 100%)",
            }}
          />

          {/* ========================================================================= */}
          {/* A. SVG CIRCULAR ARC WHEEL (Left side) */}
          {/* ========================================================================= */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            style={{ overflow: "visible" }}
          >
            {/* Base Guide Circle Arc */}
            <circle
              cx={Pt}
              cy={P}
              r={F}
              fill="none"
              stroke="#171512"
              strokeWidth={1.5}
              opacity={0.12}
            />

            {/* Dynamic Active Connecting Arc */}
            {showActiveArc && (
              <path
                d={activeArcD}
                fill="none"
                stroke="#171512"
                strokeWidth={3.5}
                strokeLinecap="round"
              />
            )}
          </svg>

          {/* Circular Step Number Badges along the arc */}
          {defaultPhases.map((phase, idx) => {
            const node = nodeStates[idx];
            const isCurrent = idx === activeIndex;
            const numberStr = String(idx + 1).padStart(2, "0");

            return (
              <button
                key={phase.phase}
                type="button"
                onClick={() => scrollToPhase(idx)}
                style={{
                  position: "absolute",
                  left: `${node.x}px`,
                  top: `${node.y}px`,
                  transform: `translate(-50%, -50%) scale(${node.scale})`,
                  width: isMobile ? "54px" : "68px",
                  height: isMobile ? "54px" : "68px",
                  borderRadius: "50%",
                  zIndex: isCurrent ? 25 : 10,
                  transition:
                    "background-color 0.15s ease, color 0.15s ease, box-shadow 0.15s ease",
                  backgroundColor:
                    node.activeFillAlpha > 0.5
                      ? "#171512"
                      : `rgba(242, 240, 236, ${1 - node.activeFillAlpha})`,
                  color: node.activeFillAlpha > 0.5 ? "#f2f0ec" : "#171512",
                  border:
                    node.activeFillAlpha > 0.5
                      ? "none"
                      : `1px solid rgba(217, 213, 205, ${Math.max(0.4, node.ringBorderAlpha * 2)})`,
                  boxShadow:
                    node.activeFillAlpha > 0.5
                      ? "0 12px 28px -6px rgba(0, 0, 0, 0.35)"
                      : "0 2px 8px rgba(0,0,0,0.04)",
                  cursor: "pointer",
                }}
                className="flex items-center justify-center font-instrument text-2xl sm:text-3xl focus:outline-hidden hover:scale-110 active:scale-95 transition-transform"
                title={`Go to ${phase.phase}: ${phase.titleLine1}`}
              >
                <span>{numberStr}</span>
              </button>
            );
          })}

          {/* ========================================================================= */}
          {/* B. CENTER TEXT CONTENT (Phase details) */}
          {/* ========================================================================= */}
          <div
            className="absolute z-20 pointer-events-none"
            style={{
              left: isMobile ? "18%" : "31%",
              top: "50%",
              width: isMobile ? "75%" : "36%",
              maxWidth: "520px",
              transform: "translateY(-50%)",
            }}
          >
            {defaultPhases.map((phase, idx) => {
              const dist = Math.abs(idx - A);
              const opacity = Math.max(0, Math.min(1, 1 - 1.7 * dist));
              const translateY = (idx - A) * (isMobile ? 50 : 80);
              const isInteractive = opacity > 0.6;

              return (
                <div
                  key={phase.phase}
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: "100%",
                    transform: `translateY(calc(-50% + ${translateY}px))`,
                    opacity,
                    pointerEvents: isInteractive ? "auto" : "none",
                    transition: "opacity 0.06s linear",
                  }}
                  className="space-y-4 sm:space-y-5"
                >
                  {/* Eyebrow */}
                  <div className="text-xs uppercase font-semibold tracking-[0.18em] text-[#6a655d]">
                    {phase.phase}
                  </div>

                  {/* Title */}
                  <h3 className="font-instrument text-4xl sm:text-5xl md:text-6xl lg:text-[62px] text-[#171512] font-normal leading-[1.02] tracking-tight">
                    {phase.titleLine1}
                    {phase.titleLine2 && (
                      <>
                        <br />
                        {phase.titleLine2}
                      </>
                    )}
                  </h3>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-[#6a655d] leading-relaxed max-w-md font-light">
                    {phase.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {phase.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3.5 py-1.5 rounded-full border border-[#d9d5cd] text-xs font-medium text-[#171512] bg-[#f2f0ec]/70 backdrop-blur-xs shadow-2xs hover:border-[#171512]/40 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ========================================================================= */}
          {/* C. 3D FLOATING GRAPHIC (Right side) */}
          {/* ========================================================================= */}
          <div
            className="absolute z-20 pointer-events-none"
            style={{
              right: isMobile ? "4%" : "6%",
              top: "50%",
              width: isMobile ? "32%" : "26%",
              maxWidth: "360px",
              aspectRatio: "1 / 1",
              transform: `translate(${mouse.x * 22}px, calc(-50% + ${mouse.y * 18}px))`,
              transition: "transform 0.15s ease-out",
            }}
          >
            {defaultPhases.map((phase, idx) => {
              const dist = Math.abs(idx - A);
              const opacity = Math.max(0, Math.min(1, 1 - 1.6 * dist));
              const scale = Math.max(0.75, Math.min(1, 1 - 0.1 * dist));
              const rotate = (A - idx) * 12;

              return (
                <div
                  key={phase.phase}
                  style={{
                    position: "absolute",
                    inset: 0,
                    opacity,
                    transform: `scale(${scale}) rotate(${rotate}deg)`,
                    transition: "opacity 0.06s linear",
                  }}
                  className="flex items-center justify-center"
                >
                  {/* Floating animation wrapper */}
                  <div className="w-full h-full relative animate-[spin_0s] flex items-center justify-center">
                    <Image
                      src={phase.image}
                      alt={phase.imageAlt}
                      width={320}
                      height={320}
                      className="w-full h-full object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.18)] select-none pointer-events-none transition-transform"
                      priority={idx < 2}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Phase Counter in bottom right */}
          <div className="absolute bottom-8 right-10 text-xs font-mono tracking-widest text-[#6a655d] uppercase z-20">
            <span className="text-[#171512] font-bold">
              0{activeIndex + 1}
            </span>{" "}
            / 0{totalPhases}
          </div>
        </div>
      </div>

      {/* 3. OUTRO BOOKEND SECTION */}
      <section className="min-h-screen bg-[#171512] text-[#f2f0ec] flex flex-col justify-center items-center relative px-6 text-center select-none z-10">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-xs uppercase tracking-[0.22em] text-[#9A9A9A] font-mono font-medium">
            Ready when you are
          </div>
          <h2 className="font-instrument text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white leading-[1.04]">
            Let&apos;s build the next one together
          </h2>
          <p className="text-[#9A9A9A] max-w-xl mx-auto text-base sm:text-lg font-light leading-relaxed">
            That&apos;s our end-to-end process. If it feels like the right fit,
            we&apos;d love to hear what you&apos;re working on.
          </p>

          <div className="pt-6 flex justify-center gap-4 flex-wrap">
            <Link href="/contact">
              <MagneticButton variant="primary">
                Schedule a Call
              </MagneticButton>
            </Link>
            <Link href="/work">
              <MagneticButton variant="outline">
                Explore Case Studies
              </MagneticButton>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
