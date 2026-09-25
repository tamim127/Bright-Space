"use client";

import React, { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { Box, Clock, Users, TrendingUp, ArrowRight, ArrowLeft } from "lucide-react";

interface MilestoneCardData {
  id: number;
  icon: React.ElementType;
  value: string;
  label: string;
  desc: string;
  imageSrc: string;
  defaultRotateZ: number;
  defaultRotateY: number;
}

const impactMilestones: MilestoneCardData[] = [
  {
    id: 1,
    icon: Box,
    value: "50+",
    label: "Digital Products Shipped",
    desc: "High-performing websites, SaaS apps & custom software.",
    imageSrc: "/images/impact/glass-layers.jpg",
    defaultRotateZ: -1.2,
    defaultRotateY: 2.5,
  },
  {
    id: 2,
    icon: Clock,
    value: "99.8%",
    label: "On-Time Sprint Record",
    desc: "Punctual delivery with zero compromise on code quality.",
    imageSrc: "/images/impact/glass-clock.jpg",
    defaultRotateZ: 0.8,
    defaultRotateY: 1.2,
  },
  {
    id: 3,
    icon: Users,
    value: "15+",
    label: "Global Tech Hubs",
    desc: "Clients across USA, UK, Europe, and Asia Pacific.",
    imageSrc: "/images/impact/gold-globe.jpg",
    defaultRotateZ: -0.6,
    defaultRotateY: -1.5,
  },
  {
    id: 4,
    icon: TrendingUp,
    value: "2.4x",
    label: "Avg Conversion Growth",
    desc: "Measured conversion surge post Bright Space redesign.",
    imageSrc: "/images/impact/growth-bars.jpg",
    defaultRotateZ: 1.4,
    defaultRotateY: -3,
  },
];

interface TiltCardProps {
  item: MilestoneCardData;
  index: number;
  isActive: boolean;
  onCardFocus?: () => void;
}

function TiltCard({ item, index, isActive, onCardFocus }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState<string>(
    `rotateZ(${item.defaultRotateZ}deg) rotateY(${item.defaultRotateY}deg) rotateX(0deg) translateZ(0px)`
  );
  const [glareStyle, setGlareStyle] = useState<{ x: number; y: number; opacity: number }>({
    x: 50,
    y: 50,
    opacity: 0,
  });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const normX = (x / rect.width) * 2 - 1; // -1 to 1
      const normY = (y / rect.height) * 2 - 1; // -1 to 1

      // 3D tilt calculation
      const rotX = -normY * 14; // max 14deg tilt on X
      const rotY = normX * 18; // max 18deg tilt on Y
      const rotZ = item.defaultRotateZ * 0.4 + normX * 1.5;

      setTransformStyle(
        `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(
          2
        )}deg) rotateZ(${rotZ.toFixed(2)}deg) translateZ(28px) scale3d(1.03, 1.03, 1.03)`
      );

      setGlareStyle({
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100,
        opacity: 0.45,
      });
    },
    [item.defaultRotateZ]
  );

  const handleMouseEnter = () => {
    setIsHovered(true);
    onCardFocus?.();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Smooth reset back to resting angle
    setTransformStyle(
      `rotateZ(${item.defaultRotateZ}deg) rotateY(${item.defaultRotateY}deg) rotateX(0deg) translateZ(0px) scale3d(1, 1, 1)`
    );
    setGlareStyle((prev) => ({ ...prev, opacity: 0 }));
  };

  const IconComponent = item.icon;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative rounded-[28px] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 ease-out cursor-pointer select-none ${
        isActive ? "ring-2 ring-[#B08D57]/40 shadow-2xl" : ""
      }`}
      style={{
        transform: transformStyle,
        transformStyle: "preserve-3d",
        background:
          "linear-gradient(135deg, rgba(255, 255, 255, 0.96) 0%, rgba(255, 255, 255, 0.82) 50%, rgba(250, 246, 238, 0.92) 100%)",
        border: "1px solid rgba(228, 218, 200, 0.75)",
        boxShadow: isHovered
          ? "0 30px 60px -15px rgba(180, 145, 95, 0.28), 0 10px 25px -10px rgba(0, 0, 0, 0.05), inset 0 1px 1px rgba(255, 255, 255, 1)"
          : "0 18px 40px -14px rgba(180, 150, 110, 0.16), 0 4px 12px rgba(0, 0, 0, 0.02), inset 0 1px 1px rgba(255, 255, 255, 0.9)",
        minHeight: "260px",
      }}
    >
      {/* Specular Glare Lighting Sheen Overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[28px] transition-opacity duration-300 z-30"
        style={{
          opacity: glareStyle.opacity,
          background: `radial-gradient(circle 280px at ${glareStyle.x}% ${glareStyle.y}%, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0) 70%)`,
        }}
      />

      {/* Card Content Row */}
      <div className="flex items-start justify-between gap-3 relative z-10" style={{ transform: "translateZ(30px)" }}>
        {/* Left Column: Icon, Number, Title, Desc */}
        <div className="flex flex-col justify-between h-full pr-1">
          {/* Top Icon Badge */}
          <div className="w-9 h-9 rounded-full bg-[#FAF5EB] border border-[#E3DAC8] flex items-center justify-center text-[#9E7A45] shadow-xs group-hover:scale-110 group-hover:bg-[#9E7A45] group-hover:text-white transition-all duration-300">
            <IconComponent className="w-4 h-4" />
          </div>

          {/* Stat Value */}
          <div className="mt-5">
            <div className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#111111] tracking-tight font-sans leading-none">
              {item.value}
            </div>
            <h4 className="text-[14px] sm:text-[15px] font-semibold text-[#111111] mt-2 tracking-tight leading-snug">
              {item.label}
            </h4>
            <p className="text-[11px] sm:text-[11.5px] text-[#666666] mt-1.5 leading-relaxed max-w-[165px]">
              {item.desc}
            </p>
          </div>
        </div>

        {/* Right Column: Floating 3D Artwork Asset */}
        <div
          className="relative shrink-0 w-[125px] sm:w-[145px] lg:w-[155px] h-[125px] sm:h-[145px] lg:h-[155px] flex items-center justify-center -mr-2 -mt-2 transition-transform duration-300"
          style={{ transform: isHovered ? "translateZ(45px) scale(1.08)" : "translateZ(20px)" }}
        >
          {/* Ambient Warm Underglow */}
          <div className="absolute inset-0 rounded-full bg-[#EBDBC2]/40 blur-xl scale-90 pointer-events-none" />

          <Image
            src={item.imageSrc}
            alt={item.label}
            width={160}
            height={160}
            className="w-full h-full object-contain relative z-10 mix-blend-multiply drop-shadow-[0_12px_22px_rgba(160,130,85,0.22)]"
            priority={index === 0}
          />
        </div>
      </div>

      {/* Bottom Row: Circular Action Pill */}
      <div className="mt-4 pt-2 flex items-center justify-between relative z-10" style={{ transform: "translateZ(25px)" }}>
        <div className="w-7 h-7 rounded-full border border-[#D5CAA8] bg-white/60 flex items-center justify-center text-[#555555] group-hover:border-[#111111] group-hover:bg-[#111111] group-hover:text-white transition-all duration-300 shadow-2xs">
          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </div>
  );
}

export default function OurImpactSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % impactMilestones.length);
  };

  const handlePrev = () => {
    setActiveSlide((prev) => (prev - 1 + impactMilestones.length) % impactMilestones.length);
  };

  return (
    <section className="relative py-28 md:py-36 bg-[#F6F2E9] overflow-hidden border-b border-[#E3DAC8]">
      {/* Background Celestial Gold Orbits & Particle Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Warm Golden Ambient Glows */}
        <div className="absolute -top-32 right-10 w-[550px] h-[550px] rounded-full bg-radial from-[#ECD9B8]/50 via-[#F3E7CF]/20 to-transparent blur-3xl opacity-80" />
        <div className="absolute -bottom-24 left-1/4 w-[450px] h-[450px] rounded-full bg-radial from-[#E6D4B2]/40 to-transparent blur-3xl opacity-60" />

        {/* Faint Orbital Dashed Rings in Top-Right Background */}
        <svg
          className="absolute -top-12 -right-24 w-[700px] h-[700px] opacity-40"
          viewBox="0 0 700 700"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="350" cy="350" r="300" stroke="#CBB996" strokeWidth="1" strokeDasharray="3 6" />
          <circle cx="350" cy="350" r="230" stroke="#D8C8A9" strokeWidth="1" />
          <ellipse
            cx="350"
            cy="350"
            rx="320"
            ry="140"
            transform="rotate(-25 350 350)"
            stroke="#C0AE8B"
            strokeWidth="0.8"
            strokeDasharray="4 8"
          />
          <circle cx="580" cy="220" r="4" fill="#B08D57" opacity="0.7" />
          <circle cx="160" cy="420" r="3" fill="#D4BD91" opacity="0.6" />
        </svg>

        {/* Floating Wireframe Globe Silhouette in Top-Right Background */}
        <div className="absolute top-4 -right-16 w-80 h-80 rounded-full opacity-30 pointer-events-none border border-[#C5B390]/40">
          <div className="w-full h-full rounded-full border border-dashed border-[#C5B390]/60 animate-spin-slow" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 z-10">
        {/* Header Section */}
        <div className="mb-14 sm:mb-18">
          {/* Eyebrow Tag: — OUR IMPACT */}
          <div className="flex items-center gap-2.5 mb-3.5">
            <span className="w-6 h-[1.5px] bg-[#9E7A45]" />
            <span className="text-[11.5px] sm:text-[12px] font-mono tracking-[0.25em] text-[#9E7A45] font-bold uppercase">
              OUR IMPACT
            </span>
          </div>

          {/* Main Title: Numbers That Tell Our Story */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold text-[#111111] tracking-tight leading-[1.12]">
            Numbers That{" "}
            <span className="font-serif italic font-normal text-[#9E7A45]">
              Tell Our Story
            </span>
          </h2>

          {/* Subtitle */}
          <p className="mt-3.5 text-sm sm:text-base text-[#666666] leading-relaxed max-w-xl">
            Real results, built on trust, creativity and technology.
            <br />
            Here&apos;s what we&apos;ve achieved together.
          </p>
        </div>

        {/* 4 Angled 3D Tilt Cards Grid */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 items-stretch"
          style={{ perspective: "1600px" }}
        >
          {impactMilestones.map((item, idx) => (
            <TiltCard
              key={item.id}
              item={item}
              index={idx}
              isActive={activeSlide === idx}
              onCardFocus={() => setActiveSlide(idx)}
            />
          ))}
        </div>

        {/* Bottom Pagination & Navigation Controls */}
        <div className="mt-12 sm:mt-16 flex items-center justify-between border-t border-[#E3DAC8]/70 pt-6">
          {/* Left: Gold Progress Bar & Counter (01 — 04) */}
          <div className="flex items-center gap-3">
            <div className="relative w-14 sm:w-20 h-[2.5px] bg-[#DDD2BD] rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 bottom-0 bg-[#9E7A45] rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${((activeSlide + 1) / impactMilestones.length) * 100}%`,
                }}
              />
            </div>
            <span className="text-xs font-mono text-[#888888] font-medium tracking-widest">
              0{activeSlide + 1} — 0{impactMilestones.length}
            </span>
          </div>

          {/* Right: Circular Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              aria-label="Previous impact milestone"
              className="w-9 h-9 rounded-full border border-[#D5CAA8] bg-white/70 hover:bg-white hover:border-[#111111] hover:text-[#111111] text-[#666666] flex items-center justify-center transition-all duration-200 shadow-xs cursor-pointer active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next impact milestone"
              className="w-9 h-9 rounded-full border border-[#D5CAA8] bg-white/70 hover:bg-white hover:border-[#111111] hover:text-[#111111] text-[#666666] flex items-center justify-center transition-all duration-200 shadow-xs cursor-pointer active:scale-95"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
