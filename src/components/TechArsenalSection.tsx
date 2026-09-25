"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Shield,
  Zap,
  CheckCircle2,
  Cloud,
  ArrowRight,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import {
  techCategoryGroups,
  TechCategoryGroup,
  TechItem,
} from "@/data/techLogos";
import TechCore3D from "./TechCore3D";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// -----------------------------------------------------------------------------
// Interactive 3D Floating Tech Panel
// -----------------------------------------------------------------------------
interface TechPanelCardProps {
  group: TechCategoryGroup;
  index: number;
  isFocused: boolean;
  onFocus: () => void;
  onHoverLogo: (tech: TechItem | null) => void;
}

function TechPanelCard({
  group,
  isFocused,
  onFocus,
  onHoverLogo,
}: TechPanelCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState<string>(
    `rotateZ(${group.defaultAngle.rotateZ}deg) rotateY(${group.defaultAngle.rotateY}deg) rotateX(${group.defaultAngle.rotateX}deg) translateZ(0px)`
  );
  const [glare, setGlare] = useState<{ x: number; y: number; opacity: number }>({
    x: 50,
    y: 50,
    opacity: 0,
  });
  const [isCardHovered, setIsCardHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const normX = (x / rect.width) * 2 - 1; // -1 to 1
      const normY = (y / rect.height) * 2 - 1; // -1 to 1

      const rotX = -normY * 12 + group.defaultAngle.rotateX;
      const rotY = normX * 14 + group.defaultAngle.rotateY;
      const rotZ = group.defaultAngle.rotateZ + normX * 1.2;

      setTransformStyle(
        `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(
          2
        )}deg) rotateZ(${rotZ.toFixed(2)}deg) translateZ(24px) scale3d(1.03, 1.03, 1.03)`
      );

      setGlare({
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100,
        opacity: 0.4,
      });
    },
    [group.defaultAngle]
  );

  const handleMouseEnter = () => {
    setIsCardHovered(true);
    onFocus();
  };

  const handleMouseLeave = () => {
    setIsCardHovered(false);
    setTransformStyle(
      `rotateZ(${group.defaultAngle.rotateZ}deg) rotateY(${group.defaultAngle.rotateY}deg) rotateX(${group.defaultAngle.rotateX}deg) translateZ(0px) scale3d(1, 1, 1)`
    );
    setGlare((prev) => ({ ...prev, opacity: 0 }));
    onHoverLogo(null);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative rounded-[22px] sm:rounded-[24px] p-4 sm:p-5 transition-all duration-300 ease-out select-none cursor-pointer ${
        isFocused
          ? "ring-2 ring-[#B08D57] shadow-[0_24px_50px_-10px_rgba(180,140,85,0.32)] z-30"
          : "hover:ring-1 hover:ring-[#B08D57]/40 shadow-[0_16px_36px_-12px_rgba(180,150,110,0.16)] z-20"
      }`}
      style={{
        transform: transformStyle,
        transformStyle: "preserve-3d",
        background:
          "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.82) 60%, rgba(250, 246, 238, 0.90) 100%)",
        border: "1px solid rgba(228, 218, 200, 0.8)",
        backdropFilter: "blur(12px)",
        minWidth: "260px",
        maxWidth: "320px",
      }}
    >
      {/* Specular Glare Reflection Sheen */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[22px] sm:rounded-[24px] transition-opacity duration-300 z-30"
        style={{
          opacity: glare.opacity,
          background: `radial-gradient(circle 240px at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0) 70%)`,
        }}
      />

      {/* Top Header of Card: Category Title + Arrow */}
      <div className="flex items-center justify-between mb-4 relative z-10" style={{ transform: "translateZ(20px)" }}>
        <div>
          <span className="text-[12.5px] sm:text-[13px] font-bold text-[#111111] tracking-tight">
            {group.title}
          </span>
          <span className="block text-[10px] text-[#888888] font-mono tracking-wider">
            {group.subtitle}
          </span>
        </div>

        {/* Small Circular Arrow Action Button */}
        <div className="w-6 h-6 rounded-full border border-[#D5CAA8] bg-white/70 flex items-center justify-center text-[#666666] group-hover:border-[#111111] group-hover:bg-[#111111] group-hover:text-white transition-all duration-300 shadow-2xs shrink-0">
          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>

      {/* 4 Colorful Tech Logos Row */}
      <div
        className="grid grid-cols-4 gap-2 sm:gap-2.5 items-start relative z-10"
        style={{ transform: "translateZ(30px)" }}
      >
        {group.items.map((tech) => (
          <div
            key={tech.id}
            onMouseEnter={() => onHoverLogo(tech)}
            className="group/logo flex flex-col items-center text-center transition-transform duration-200 hover:-translate-y-1"
          >
            {/* Logo Icon Container with subtle glass border and hover brand color glow */}
            <div
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-[14px] bg-white border border-[#E6DEC8] flex items-center justify-center p-2 shadow-xs transition-all duration-300 group-hover/logo:scale-110 group-hover/logo:shadow-md group-hover/logo:border-transparent"
              style={{
                boxShadow: isCardHovered
                  ? `0 6px 14px -3px ${tech.brandColor}33`
                  : undefined,
              }}
            >
              {tech.renderLogo("w-full h-full object-contain")}
            </div>

            {/* Label Underneath */}
            <span className="text-[10px] sm:text-[10.5px] font-medium text-[#444444] mt-1.5 line-clamp-1 group-hover/logo:text-[#111111] group-hover/logo:font-semibold transition-colors">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Main TechArsenalSection Component
// -----------------------------------------------------------------------------
export default function TechArsenalSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [activeSlide, setActiveSlide] = useState(0);
  const [hoveredTech, setHoveredTech] = useState<TechItem | null>(null);

  const categories = [
    { id: "ALL", label: "ALL" },
    { id: "frontend", label: "FRONTEND" },
    { id: "backend", label: "BACKEND" },
    { id: "cms", label: "CMS & WEB" },
    { id: "database", label: "DATABASES" },
    { id: "cloud", label: "CLOUD & DEVOPS" },
    { id: "design", label: "DESIGN & MOTION" },
    { id: "tools", label: "TOOLS" },
  ];

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % techCategoryGroups.length);
    setActiveCategory(techCategoryGroups[(activeSlide + 1) % techCategoryGroups.length].id);
  };

  const handlePrev = () => {
    setActiveSlide((prev) => (prev - 1 + techCategoryGroups.length) % techCategoryGroups.length);
    setActiveCategory(
      techCategoryGroups[(activeSlide - 1 + techCategoryGroups.length) % techCategoryGroups.length].id
    );
  };

  const handleSelectCategory = (catId: string) => {
    setActiveCategory(catId);
    if (catId !== "ALL") {
      const idx = techCategoryGroups.findIndex((g) => g.id === catId);
      if (idx !== -1) setActiveSlide(idx);
    }
  };

  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 85%",
        end: "bottom 15%",
        scrub: 1,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 md:py-36 bg-[#FAF7F2] overflow-hidden border-b border-[#E3DAC8]"
    >
      {/* Background Decorative Mesh & Golden Wave Asset */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Soft Golden Ambient Radial Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-radial from-[#F1E4C9]/45 via-[#F6ECE0]/20 to-transparent blur-3xl opacity-80" />
        <div className="absolute -top-24 right-1/4 w-[500px] h-[500px] rounded-full bg-radial from-[#EEDBC0]/35 to-transparent blur-3xl opacity-60" />

        {/* Bottom Left Flowing Gold Particle Wave Mesh Asset (Tamed, non-interfering) */}
        <div className="absolute bottom-0 left-0 w-[450px] lg:w-[580px] h-[280px] sm:h-[340px] opacity-25 mix-blend-multiply pointer-events-none select-none overflow-hidden">
          <Image
            src="/images/tech/gold-wave.jpg"
            alt="Gold particle wave"
            fill
            sizes="(max-width: 1024px) 100vw, 580px"
            className="object-contain object-left-bottom"
          />
        </div>

        {/* Right Edge Editorial Vertical Tech Watermark */}
        <div className="hidden xl:flex absolute right-8 top-1/3 flex-col items-center gap-4 text-[10.5px] font-mono tracking-[0.25em] text-[#9E7A45] opacity-60 uppercase select-none">
          <span className="rotate-90 origin-center translate-y-3">Modern</span>
          <span className="rotate-90 origin-center translate-y-3">Tools</span>
          <span className="rotate-90 origin-center translate-y-3">Real Results</span>
          <div className="w-[1px] h-20 bg-[#D4BD91] mt-6" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#B08D57]" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 z-10">
        {/* ================================================================= */}
        {/* SECTION HEADER (Exact reference layout & editorial typography) */}
        {/* ================================================================= */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-12 sm:mb-16">
          {/* Left Title Block */}
          <div className="max-w-xl">
            {/* Eyebrow: // TECH STACK & TOOLS */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#9E7A45] uppercase">
                {"//"} TECH STACK &amp; TOOLS
              </span>
            </div>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold text-[#111111] tracking-tight leading-[1.12]">
              Built with the{" "}
              <span className="font-serif italic font-normal text-[#9E7A45]">
                Best Technology
              </span>
            </h2>

            {/* Paragraph Description */}
            <p className="mt-3.5 text-sm sm:text-base text-[#666666] leading-relaxed max-w-md">
              We use modern, reliable and scalable technologies to build
              high-performance websites, web apps and digital products that grow
              with your business.
            </p>
          </div>

          {/* Right Header Navigation & Progress Indicator */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 self-start md:self-auto">
            {/* Badge: OUR TECH STACK */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 border border-[#DCD4C5] text-[11px] font-mono tracking-widest text-[#9E7A45] font-semibold uppercase shadow-2xs">
              <Sparkles className="w-3 h-3 text-[#B08D57]" />
              <span>OUR TECH STACK</span>
            </div>

            {/* Navigation Arrows & Progress Counter (01 / 06) */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                aria-label="Previous tech family"
                className="w-8 h-8 rounded-full border border-[#D5CAA8] bg-white/80 hover:bg-white hover:border-[#111111] hover:text-[#111111] text-[#666666] flex items-center justify-center transition-all duration-200 shadow-2xs cursor-pointer active:scale-95"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next tech family"
                className="w-8 h-8 rounded-full border border-[#D5CAA8] bg-white/80 hover:bg-white hover:border-[#111111] hover:text-[#111111] text-[#666666] flex items-center justify-center transition-all duration-200 shadow-2xs cursor-pointer active:scale-95"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {/* Progress 01 / 06 */}
              <div className="flex items-center gap-2 pl-2">
                <span className="text-xs font-mono text-[#888888] font-medium tracking-widest">
                  0{activeSlide + 1} / 0{techCategoryGroups.length}
                </span>
                <div className="w-12 h-[2px] bg-[#DDD2BD] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#9E7A45] rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: `${((activeSlide + 1) / techCategoryGroups.length) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* CATEGORY SWITCHER (Refined Editorial Capsule Filters) */}
        {/* ================================================================= */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 sm:mb-12 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleSelectCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full text-[11px] font-mono tracking-wider transition-all duration-300 cursor-pointer shrink-0 ${
                  isSelected
                    ? "bg-[#111111] text-white font-semibold shadow-xs"
                    : "bg-white/60 text-[#666666] border border-[#E3DAC8] hover:border-[#B08D57] hover:text-[#111111]"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Hovered Technology Contextual Tooltip */}
        {hoveredTech && (
          <div className="mb-4 inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/95 border border-[#D5CAA8] text-xs shadow-md animate-fade-in">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: hoveredTech.brandColor }} />
            <span className="font-semibold text-[#111111]">{hoveredTech.name}</span>
            <span className="text-[11px] text-[#888888] font-mono">[{hoveredTech.badge}]</span>
            <span className="text-[11px] text-[#555555] hidden sm:inline">— {hoveredTech.description}</span>
          </div>
        )}

        {/* ================================================================= */}
        {/* DESKTOP SPATIAL UNIVERSE (Digital Core + Floating 3D Panels) */}
        {/* ================================================================= */}
        <div className="hidden lg:block relative w-full h-[750px] rounded-[32px] border border-[#E3DAC8]/60 bg-gradient-to-b from-white/40 via-[#FAF7F2]/60 to-white/40 p-4 overflow-hidden select-none">
          {/* Subtle Golden SVG Connection Lines Connecting Core to Cards */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
            viewBox="0 0 1200 750"
            fill="none"
          >
            <defs>
              <linearGradient id="goldTechGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#CBB996" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#B08D57" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#E0D1B4" stopOpacity="0.2" />
              </linearGradient>
            </defs>

            {/* Core (Center at 600, 375) -> Floating Panel Anchors */}
            {/* Frontend: Top Left (350, 112) */}
            <path
              d="M 600 375 C 500 300, 420 180, 350 112"
              stroke="url(#goldTechGrad)"
              strokeWidth="1.2"
              strokeDasharray="4 6"
              className={activeCategory === "frontend" ? "opacity-100 stroke-[#9E7A45]" : "opacity-45"}
            />
            {/* Backend: Mid Left (344, 342) */}
            <path
              d="M 600 375 C 500 370, 420 355, 344 342"
              stroke="url(#goldTechGrad)"
              strokeWidth="1.2"
              strokeDasharray="4 6"
              className={activeCategory === "backend" ? "opacity-100 stroke-[#9E7A45]" : "opacity-45"}
            />
            {/* Design: Bottom Left (350, 572) */}
            <path
              d="M 600 375 C 500 450, 420 520, 350 572"
              stroke="url(#goldTechGrad)"
              strokeWidth="1.2"
              strokeDasharray="4 6"
              className={activeCategory === "design" ? "opacity-100 stroke-[#9E7A45]" : "opacity-45"}
            />
            {/* CMS: Top Right (850, 102) */}
            <path
              d="M 600 375 C 700 300, 780 180, 850 102"
              stroke="url(#goldTechGrad)"
              strokeWidth="1.2"
              strokeDasharray="4 6"
              className={activeCategory === "cms" ? "opacity-100 stroke-[#9E7A45]" : "opacity-45"}
            />
            {/* Database: Mid Right (856, 282) */}
            <path
              d="M 600 375 C 700 340, 780 305, 856 282"
              stroke="url(#goldTechGrad)"
              strokeWidth="1.2"
              strokeDasharray="4 6"
              className={activeCategory === "database" ? "opacity-100 stroke-[#9E7A45]" : "opacity-45"}
            />
            {/* Cloud: Lower Right (856, 462) */}
            <path
              d="M 600 375 C 700 410, 780 440, 856 462"
              stroke="url(#goldTechGrad)"
              strokeWidth="1.2"
              strokeDasharray="4 6"
              className={activeCategory === "cloud" ? "opacity-100 stroke-[#9E7A45]" : "opacity-45"}
            />
            {/* Tools: Bottom Right (850, 642) */}
            <path
              d="M 600 375 C 700 480, 780 570, 850 642"
              stroke="url(#goldTechGrad)"
              strokeWidth="1.2"
              strokeDasharray="4 6"
              className={activeCategory === "tools" ? "opacity-100 stroke-[#9E7A45]" : "opacity-45"}
            />

            {/* Glowing Golden Connection Nodes */}
            <circle cx="600" cy="375" r="4.5" fill="#B08D57" />
            <circle cx="350" cy="112" r="3" fill="#B08D57" />
            <circle cx="344" cy="342" r="3" fill="#B08D57" />
            <circle cx="350" cy="572" r="3" fill="#B08D57" />
            <circle cx="850" cy="102" r="3" fill="#B08D57" />
            <circle cx="856" cy="282" r="3" fill="#B08D57" />
            <circle cx="856" cy="462" r="3" fill="#B08D57" />
            <circle cx="850" cy="642" r="3" fill="#B08D57" />
          </svg>

          {/* Central Digital Core Component (Interactive 3D Three.js Object) */}
          <div
            ref={coreRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] lg:w-[520px] lg:h-[520px] flex items-center justify-center z-15 pointer-events-auto"
          >
            {/* Ambient Radial Core Light Glow */}
            <div className="absolute inset-0 rounded-full bg-radial from-[#F0DFC0]/50 via-[#ECD3A8]/15 to-transparent blur-3xl scale-125 pointer-events-none" />

            {/* Real Interactive 3D Three.js Digital Core */}
            <TechCore3D
              className="w-full h-full"
              scrollProgress={scrollProgress}
              isHoveredSection={activeCategory !== "ALL"}
            />
          </div>

          {/* 7 Floating Technology Panels Positioned in Orbit */}
          {techCategoryGroups.map((group, idx) => {
            const isFocused =
              activeCategory === "ALL" || activeCategory === group.id;

            return (
              <div
                key={group.id}
                className={`absolute transition-all duration-500 ${
                  isFocused ? "opacity-100 scale-100" : "opacity-35 scale-95"
                }`}
                style={{
                  top: group.panelPosition.top,
                  bottom: group.panelPosition.bottom,
                  left: group.panelPosition.left,
                  right: group.panelPosition.right,
                }}
              >
                <TechPanelCard
                  group={group}
                  index={idx}
                  isFocused={isFocused && activeCategory !== "ALL"}
                  onFocus={() => {
                    setActiveCategory(group.id);
                    setActiveSlide(idx);
                  }}
                  onHoverLogo={(tech) => setHoveredTech(tech)}
                />
              </div>
            );
          })}
        </div>

        {/* ================================================================= */}
        {/* MOBILE & TABLET LAYOUT (Clean, responsive, touch-friendly grid) */}
        {/* ================================================================= */}
        <div className="block lg:hidden space-y-6">
          {/* Centered Interactive 3D Digital Core on Mobile */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 mx-auto mb-6 pointer-events-auto">
            <TechCore3D className="w-full h-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {techCategoryGroups
              .filter((g) => activeCategory === "ALL" || g.id === activeCategory)
              .map((group, idx) => (
                <TechPanelCard
                  key={group.id}
                  group={group}
                  index={idx}
                  isFocused={activeCategory === group.id}
                  onFocus={() => {
                    setActiveCategory(group.id);
                    setActiveSlide(idx);
                  }}
                  onHoverLogo={(tech) => setHoveredTech(tech)}
                />
              ))}
          </div>
        </div>

        {/* ================================================================= */}
        {/* BOTTOM HIGHLIGHTS BAR (Exact reference: Shield, Zap, Check, Cloud) */}
        {/* ================================================================= */}
        <div className="mt-14 sm:mt-18 pt-8 border-t border-[#E3DAC8] flex flex-col md:flex-row md:items-center justify-between gap-8">
          {/* Left Title: TECH STACK HIGHLIGHTS */}
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono tracking-[0.25em] text-[#9E7A45] font-bold uppercase whitespace-nowrap">
              TECH STACK
              <br />
              HIGHLIGHTS
            </span>
          </div>

          {/* 4 Center Highlight Metric Capsules */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 flex-1 md:px-8">
            {/* Highlight 1: 5+ CMS Platforms */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white border border-[#E3DAC8] flex items-center justify-center text-[#9E7A45] shrink-0 shadow-2xs">
                <Shield className="w-4 h-4" />
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
                <Zap className="w-4 h-4" />
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
                <CheckCircle2 className="w-4 h-4" />
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
