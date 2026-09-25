"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  X,
  Check,
  AlertTriangle,
  Zap,
  ArrowRight,
  Briefcase,
  Layers,
  ShieldCheck,
  Cloud,
} from "lucide-react";
import TechCore3D from "./TechCore3D";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// -----------------------------------------------------------------------------
// Interactive 3D Perspective Card with Smooth Cursor Tilt Movement
// -----------------------------------------------------------------------------
interface TiltCardProps {
  children: React.ReactNode;
  baseRotateY: number; // e.g., 12deg for left card, -12deg for right card
  baseRotateX?: number; // e.g., 3.5deg
  baseRotateZ?: number; // e.g., -1deg or 1deg
  className?: string;
}

function TiltCard({
  children,
  baseRotateY,
  baseRotateX = 3.5,
  baseRotateZ = 0,
  className = "",
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState<string>(
    `rotateY(${baseRotateY}deg) rotateX(${baseRotateX}deg) rotateZ(${baseRotateZ}deg) translateZ(0px)`
  );
  const [glare, setGlare] = useState<{ x: number; y: number; opacity: number }>({
    x: 50,
    y: 50,
    opacity: 0,
  });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
      const ny = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5

      // Smooth interactive 3D rotation tilt
      const dynamicY = baseRotateY + nx * 14;
      const dynamicX = baseRotateX - ny * 12;
      const dynamicZ = baseRotateZ + nx * 1.5;

      setTransform(
        `rotateY(${dynamicY}deg) rotateX(${dynamicX}deg) rotateZ(${dynamicZ}deg) translateZ(26px) scale(1.025)`
      );
      setGlare({
        x: (nx + 0.5) * 100,
        y: (ny + 0.5) * 100,
        opacity: 0.14,
      });
    },
    [baseRotateY, baseRotateX, baseRotateZ]
  );

  const handleMouseLeave = useCallback(() => {
    setTransform(
      `rotateY(${baseRotateY}deg) rotateX(${baseRotateX}deg) rotateZ(${baseRotateZ}deg) translateZ(0px) scale(1)`
    );
    setGlare({ x: 50, y: 50, opacity: 0 });
  }, [baseRotateY, baseRotateX, baseRotateZ]);

  return (
    <div
      style={{ perspective: "1400px" }}
      className="w-full flex items-center justify-center select-none"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform,
          transformStyle: "preserve-3d",
          transition: "transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease",
        }}
        className={`relative will-change-transform ${className}`}
      >
        {/* Dynamic Interactive Glare Reflection */}
        <div
          className="absolute inset-0 rounded-[28px] sm:rounded-[32px] pointer-events-none transition-opacity duration-300 z-30"
          style={{
            opacity: glare.opacity,
            background: `radial-gradient(circle 350px at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.45), transparent 70%)`,
          }}
        />

        {/* Content with 3D translation depth */}
        <div style={{ transform: "translateZ(18px)", transformStyle: "preserve-3d" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Comparison Bullet Data
// -----------------------------------------------------------------------------
const oldWayItems = [
  "Outdated design templates & clunky UI",
  "Bloated page builders, slow load times (> 4s)",
  "Junior devs or agencies outsourcing to cheap freelancers",
  "Missed deadlines, vague communication, and radio silence",
];

const brightSpaceItems = [
  "Custom modern luxury aesthetics engineered to command high market authority",
  "Lightning-fast Next.js App Router & Server Components with < 300ms response times",
  "Direct senior full-stack product engineers & dedicated design leadership",
  "100% transparent sprint updates, 99.8% on-time delivery & long-term partnership",
];

// -----------------------------------------------------------------------------
// ProblemSolutionSection Component
// -----------------------------------------------------------------------------
export default function ProblemSolutionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const leftCardWrapRef = useRef<HTMLDivElement>(null);
  const rightCardWrapRef = useRef<HTMLDivElement>(null);
  const centerCoreRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. ScrollTrigger to update 3D core scroll progress
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 85%",
        end: "bottom 15%",
        scrub: 1,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      });

      // 2. Entrance Animation for Header
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 3. Staggered Entrance Animation for Comparison Cards & Core
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: leftCardWrapRef.current,
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      });

      if (leftCardWrapRef.current) {
        timeline.fromTo(
          leftCardWrapRef.current,
          { opacity: 0, x: -50 },
          { opacity: 1, x: 0, duration: 0.85, ease: "power3.out" },
          0
        );
      }

      if (centerCoreRef.current) {
        timeline.fromTo(
          centerCoreRef.current,
          { opacity: 0, scale: 0.85 },
          { opacity: 1, scale: 1, duration: 1.0, ease: "power3.out" },
          0.15
        );
      }

      if (rightCardWrapRef.current) {
        timeline.fromTo(
          rightCardWrapRef.current,
          { opacity: 0, x: 50 },
          { opacity: 1, x: 0, duration: 0.85, ease: "power3.out" },
          0.2
        );
      }

      // 4. Entrance for Bottom Highlight Bar
      if (bottomBarRef.current) {
        gsap.fromTo(
          bottomBarRef.current,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: bottomBarRef.current,
              start: "top 92%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-[#FAF7F2] overflow-hidden border-b border-[#E3DAC8]"
    >
      {/* Background Decorative Mesh & Radial Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Soft Golden Ambient Glow in center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-radial from-[#F1E4C9]/40 via-[#F6ECE0]/20 to-transparent blur-3xl opacity-80" />

        {/* Bottom Left Flowing Gold Particle Wave Mesh */}
        <div className="absolute bottom-0 left-0 w-[450px] lg:w-[580px] h-[280px] sm:h-[340px] opacity-25 mix-blend-multiply pointer-events-none select-none overflow-hidden">
          <Image
            src="/images/tech/gold-wave.jpg"
            alt="Gold particle wave"
            fill
            sizes="(max-width: 1024px) 100vw, 580px"
            className="object-contain object-left-bottom"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* ================================================================= */}
        {/* SECTION HEADER (Exact reference match) */}
        {/* ================================================================= */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-16 sm:mb-20"
        >
          {/* Left Title Block */}
          <div className="max-w-2xl">
            {/* Eyebrow: // THE BRIGHT SPACE DIFFERENCE */}
            <div className="flex items-center gap-3 mb-3.5">
              <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#9E7A45] uppercase">
                {"//"} THE BRIGHT SPACE DIFFERENCE
              </span>
              <div className="hidden sm:flex items-center gap-1.5 opacity-60">
                <div className="w-8 h-[1px] bg-[#9E7A45]" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#9E7A45]" />
                <div className="w-8 h-[1px] bg-[#9E7A45]" />
              </div>
            </div>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold text-[#111111] tracking-tight leading-[1.12]">
              Why Traditional Agencies{" "}
              <span className="font-serif italic font-normal text-[#9E7A45]">
                Fail You
              </span>{" "}
              &amp; How We Fix It
            </h2>

            {/* Description Subtitle */}
            <p className="mt-4 text-sm sm:text-base text-[#666666] leading-relaxed max-w-xl">
              Most client frustrations come from bloated codebases, uninspired
              designs, and communication breakdowns. Here is how Bright Space
              compares.
            </p>
          </div>

          {/* Right Header Editorial Action: BETTER PROCESS / BIGGER IMPACT */}
          <div className="hidden md:flex items-center gap-4 self-start pt-2 select-none">
            <div className="text-right">
              <span className="block text-[10px] font-mono tracking-[0.22em] text-[#888888] uppercase leading-tight font-medium">
                BETTER PROCESS
              </span>
              <span className="block text-[10px] font-mono tracking-[0.22em] text-[#888888] uppercase leading-tight font-medium mt-0.5">
                BIGGER IMPACT
              </span>
            </div>
            <div className="w-[1px] h-9 bg-[#D8CEB8]" />
            <Link
              href="/process"
              aria-label="Explore our process"
              className="w-8 h-8 rounded-full border border-[#D5CAA8] bg-white/80 hover:bg-[#111111] hover:border-[#111111] text-[#666666] hover:text-white flex items-center justify-center transition-all duration-300 shadow-2xs group"
            >
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* ================================================================= */}
        {/* MAIN COMPARISON SHOWCASE: 3D Angled Left Card | 3D Core | 3D Angled Right Card */}
        {/* ================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
          {/* --------------------------------------------------------------- */}
          {/* LEFT CARD: Traditional Agencies & Freelancers (THE OLD WAY) */}
          {/* 3D Angled inward towards center with mouse hover tilt */}
          {/* --------------------------------------------------------------- */}
          <div ref={leftCardWrapRef} className="lg:col-span-4 w-full">
            <TiltCard
              baseRotateY={11}
              baseRotateX={3.5}
              baseRotateZ={-1}
              className="w-full rounded-[28px] sm:rounded-[32px] bg-white/95 backdrop-blur-md border border-[#F3D7D7] p-6 sm:p-7 shadow-[0_22px_55px_-10px_rgba(239,68,68,0.1)] hover:shadow-[0_28px_65px_-10px_rgba(239,68,68,0.18)]"
            >
              {/* Top Red Glow Accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#F87171]/50 to-transparent" />

              <div>
                {/* Card Header: Pill & High Risk Pill */}
                <div className="flex items-center justify-between gap-3 mb-5">
                  <span className="px-3 py-1 rounded-full text-[10.5px] font-mono tracking-wider font-bold uppercase bg-[#FEE2E2]/70 text-[#DC2626] border border-[#FECACA]">
                    THE OLD WAY
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold text-[#DC2626] bg-white border border-[#FECACA] shadow-2xs">
                    High Risk
                  </span>
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-xl sm:text-[22px] font-bold text-[#111111] tracking-tight leading-snug">
                  Traditional Agencies &amp; Freelancers
                </h3>
                <p className="text-xs sm:text-[13px] text-[#777777] mt-1.5 mb-6">
                  Outdated methods, slow processes, and unexpected issues.
                </p>

                {/* 4 Feature Items */}
                <div className="space-y-4 mb-6">
                  {oldWayItems.map((text, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#FEF2F2] border border-[#FEE2E2] flex items-center justify-center text-[#EF4444] shrink-0 mt-0.5 shadow-2xs">
                        <X className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                      <p className="text-xs sm:text-[12.5px] text-[#444444] leading-relaxed pt-0.5">
                        {text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Negative Result Banner */}
              <div className="rounded-2xl bg-[#FFF1F2] border border-[#FFE4E6] p-3.5 flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-white border border-[#FECDD3] flex items-center justify-center text-[#E11D48] shrink-0 shadow-2xs">
                  <AlertTriangle className="w-3 h-3" />
                </div>
                <span className="text-[11.5px] sm:text-xs font-semibold text-[#BE123C] leading-snug">
                  Result: High technical debt, slow launch, poor user conversion.
                </span>
              </div>
            </TiltCard>
          </div>

          {/* --------------------------------------------------------------- */}
          {/* CENTER: Interactive 3D Digital Architecture Core */}
          {/* --------------------------------------------------------------- */}
          <div
            ref={centerCoreRef}
            className="lg:col-span-4 flex flex-col items-center justify-center relative py-4 lg:py-0 select-none z-10"
          >
            {/* Ambient Radial Core Light Glow */}
            <div className="absolute inset-0 rounded-full bg-radial from-[#F0DFC0]/55 via-[#ECD3A8]/20 to-transparent blur-3xl scale-125 pointer-events-none" />

            {/* 3D WebGL Three.js Digital Core */}
            <div className="relative w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] lg:w-[420px] lg:h-[420px] flex items-center justify-center">
              <TechCore3D
                className="w-full h-full"
                scrollProgress={scrollProgress}
              />
            </div>

            {/* Center Tagline Under Core */}
            <div className="mt-3 flex flex-col items-center select-none text-center">
              <div className="flex items-center gap-2 text-[10px] sm:text-[10.5px] font-mono tracking-[0.22em] uppercase text-[#777777]">
                <span>REAL SOLUTIONS</span>
                <span className="text-[#C5B496]">/</span>
                <span className="font-bold text-[#9E7A45]">MODERN TECH</span>
                <span className="text-[#C5B496]">/</span>
                <span>YOUR GROWTH</span>
              </div>
              <div className="flex items-center gap-1.5 mt-2 opacity-65">
                <div className="w-10 sm:w-14 h-[1px] bg-[#D4BD91]" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#B08D57]" />
                <div className="w-10 sm:w-14 h-[1px] bg-[#D4BD91]" />
              </div>
            </div>
          </div>

          {/* --------------------------------------------------------------- */}
          {/* RIGHT CARD: Bright Space (THE BRIGHT SPACE WAY) */}
          {/* Deep Luxurious Dark Obsidian Card with Warm Gold Glow & 3D Tilt */}
          {/* --------------------------------------------------------------- */}
          <div ref={rightCardWrapRef} className="lg:col-span-4 w-full">
            <TiltCard
              baseRotateY={-11}
              baseRotateX={3.5}
              baseRotateZ={1}
              className="w-full rounded-[28px] sm:rounded-[32px] bg-gradient-to-b from-[#18181A] via-[#141416] to-[#101012] border border-[#2D2A24] p-6 sm:p-7 shadow-[0_24px_60px_-10px_rgba(0,0,0,0.6),0_0_40px_rgba(184,138,69,0.18)] hover:border-[#B08D57]/60 hover:shadow-[0_28px_70px_-10px_rgba(0,0,0,0.7),0_0_55px_rgba(184,138,69,0.28)]"
            >
              {/* Top Gold Glow Accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />

              <div>
                {/* Card Header: Pill & Premium Standard Pill */}
                <div className="flex items-center justify-between gap-3 mb-5">
                  <span className="px-3 py-1 rounded-full text-[10.5px] font-mono tracking-wider font-bold uppercase bg-[#785C2B] text-white border border-[#9A7846] shadow-2xs">
                    THE BRIGHT SPACE WAY
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold text-[#D4AF37] bg-[#1E1E22] border border-[#785C2B]/60 shadow-2xs">
                    Premium Standard
                  </span>
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-xl sm:text-[22px] font-bold text-white tracking-tight leading-snug">
                  Bright Space
                </h3>
                <p className="text-xs sm:text-[13px] text-[#9A9A9E] mt-1.5 mb-6">
                  Modern product &amp; software studio
                </p>

                {/* 4 Feature Items */}
                <div className="space-y-4 mb-6">
                  {brightSpaceItems.map((text, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#241F16] border border-[#785C2B]/60 flex items-center justify-center text-[#E5B54F] shrink-0 mt-0.5 shadow-2xs">
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                      <p className="text-xs sm:text-[12.5px] text-[#E2E2E6] leading-relaxed pt-0.5">
                        {text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Positive Result Banner (Dark Obsidian with Gold Accent) */}
              <div className="rounded-2xl bg-[#18181B] border border-[#3E3420] p-3.5 flex items-center gap-3 text-white shadow-md">
                <div className="w-6 h-6 rounded-full bg-[#241F16] border border-[#785C2B]/60 flex items-center justify-center text-[#F5CF68] shrink-0 shadow-2xs">
                  <Zap className="w-3 h-3 fill-[#F5CF68]" />
                </div>
                <span className="text-[11.5px] sm:text-xs font-semibold text-[#F5E6C8] leading-snug">
                  Result: Zero tech debt, 60fps performance &amp; high ROI.
                </span>
              </div>
            </TiltCard>
          </div>
        </div>

        {/* ================================================================= */}
        {/* BOTTOM HIGHLIGHTS BAR (5+ CMS, 50+ Tech, 99.9% Uptime, Scalable) */}
        {/* ================================================================= */}
        <div
          ref={bottomBarRef}
          className="mt-16 sm:mt-20 pt-8 border-t border-[#E3DAC8] flex flex-col md:flex-row md:items-center justify-between gap-8 select-none"
        >
          {/* Left Title: WHY BRIGHT SPACE IS DIFFERENT */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 opacity-60">
              <div className="w-6 h-[1px] bg-[#9E7A45]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#9E7A45]" />
              <div className="w-6 h-[1px] bg-[#9E7A45]" />
            </div>
            <span className="text-[11px] font-mono tracking-[0.25em] text-[#9E7A45] font-bold uppercase whitespace-nowrap">
              WHY BRIGHT SPACE
              <br />
              IS DIFFERENT
            </span>
          </div>

          {/* 4 Center Highlight Metric Capsules */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 flex-1 md:px-8">
            {/* Highlight 1: 5+ CMS Platforms */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white border border-[#E3DAC8] flex items-center justify-center text-[#9E7A45] shrink-0 shadow-2xs">
                <Briefcase className="w-4 h-4" />
              </div>
              <div>
                <div className="text-base sm:text-lg font-bold text-[#111111] leading-none">
                  5+
                </div>
                <div className="text-[11px] text-[#666666] font-medium mt-1 leading-snug">
                  CMS Platforms
                </div>
              </div>
            </div>

            {/* Highlight 2: 50+ Technologies & Tools */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white border border-[#E3DAC8] flex items-center justify-center text-[#9E7A45] shrink-0 shadow-2xs">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <div className="text-base sm:text-lg font-bold text-[#111111] leading-none">
                  50+
                </div>
                <div className="text-[11px] text-[#666666] font-medium mt-1 leading-snug">
                  Technologies &amp; Tools
                </div>
              </div>
            </div>

            {/* Highlight 3: 99.9% Uptime Focus */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white border border-[#E3DAC8] flex items-center justify-center text-[#9E7A45] shrink-0 shadow-2xs">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <div className="text-base sm:text-lg font-bold text-[#111111] leading-none">
                  99.9%
                </div>
                <div className="text-[11px] text-[#666666] font-medium mt-1 leading-snug">
                  Uptime Focus
                </div>
              </div>
            </div>

            {/* Highlight 4: Scalable Cloud Infrastructure */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white border border-[#E3DAC8] flex items-center justify-center text-[#9E7A45] shrink-0 shadow-2xs">
                <Cloud className="w-4 h-4" />
              </div>
              <div>
                <div className="text-base sm:text-lg font-bold text-[#111111] leading-none">
                  Scalable
                </div>
                <div className="text-[11px] text-[#666666] font-medium mt-1 leading-snug">
                  Cloud Infrastructure
                </div>
              </div>
            </div>
          </div>

          {/* Right Action: LET'S BUILD TOGETHER → */}
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#111111] hover:text-[#9E7A45] font-bold group transition-colors self-start md:self-center shrink-0"
          >
            <span>LET&apos;S BUILD TOGETHER</span>
            <div className="w-7 h-7 rounded-full border border-[#D5CAA8] bg-white flex items-center justify-center text-[#111111] group-hover:border-[#111111] group-hover:bg-[#111111] group-hover:text-white transition-all shadow-2xs">
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
