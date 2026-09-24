"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface CaseResultItem {
  id: string;
  num: string;
  metric: string;
  title: string;
  description: string;
  client: string;
  category: string;
  image: string;
  link: string;
}

const caseItems: CaseResultItem[] = [
  {
    id: "nexus-saas",
    num: "01",
    metric: "+44%",
    title: "SaaS User Retention",
    description:
      "Refactored Nexus Systems legacy portal into a zero-latency Next.js web application with intuitive workflow UX.",
    client: "NEXUS SYSTEMS",
    category: "SAAS PLATFORM",
    image: "/images/case-studies/case_glass_slabs.jpg",
    link: "/work/nexus-saas-platform",
  },
  {
    id: "horizon-capital",
    num: "02",
    metric: "2.4x",
    title: "Conversion Surge",
    description:
      "Designed a high-converting digital branding experience for Horizon Capital, doubling lead generation in 90 days.",
    client: "HORIZON CAPITAL",
    category: "FINTECH PORTAL",
    image: "/images/case-studies/case_orbital_sphere.jpg",
    link: "/work/horizon-corporate-site",
  },
  {
    id: "vanguard-ai",
    num: "03",
    metric: "-60%",
    title: "Manual Processing",
    description:
      "Built automated custom internal software tools & REST APIs that reduced operational manual processing time by over half.",
    client: "VANGUARD AI",
    category: "ENTERPRISE WORKFLOW",
    image: "/images/case-studies/case_crystal_cubes.jpg",
    link: "/work/pulse-crm-automation",
  },
];

export default function MeasuredResultsSection() {
  const [activeIdx, setActiveIdx] = useState(1); // default center card (02) is active

  const handlePrev = () => {
    setActiveIdx((prev) => (prev === 0 ? caseItems.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev === caseItems.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative w-full py-24 sm:py-32 bg-[#F3EFE6] text-[#111111] overflow-hidden select-none border-t border-[#DCD4C5]">
      {/* Background Subtle Ambience & Grain */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-grid-pattern" />

      {/* ========================================================================= */}
      {/* GLOWING AMBIENT GOLDEN ARC (Spanning behind cards like in reference) */}
      {/* ========================================================================= */}
      <div className="absolute top-[28%] sm:top-[24%] left-1/2 -translate-x-1/2 w-full max-w-[1450px] h-[340px] pointer-events-none z-0 hidden md:block">
        <svg
          viewBox="0 0 1400 320"
          fill="none"
          className="w-full h-full overflow-visible"
        >
          <defs>
            <linearGradient id="arcGoldGlow" x1="0%" y1="100%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#B08D57" stopOpacity="0.05" />
              <stop offset="30%" stopColor="#D4BD91" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#FFE0A3" stopOpacity="0.95" />
              <stop offset="70%" stopColor="#D4BD91" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#B08D57" stopOpacity="0.05" />
            </linearGradient>
            <filter id="arcGlowBlur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Arched Line */}
          <path
            d="M 120 300 Q 700 20 1280 300"
            stroke="url(#arcGoldGlow)"
            strokeWidth="2.5"
            filter="url(#arcGlowBlur)"
            fill="none"
          />

          {/* Glowing Golden Beads / Nodes along the Arc */}
          <circle cx="700" cy="85" r="4.5" fill="#FFE0A3" filter="drop-shadow(0 0 8px #B08D57)" />
          <circle cx="500" cy="120" r="3" fill="#D4BD91" opacity="0.8" />
          <circle cx="900" cy="120" r="3" fill="#D4BD91" opacity="0.8" />
        </svg>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 relative z-10 space-y-12 sm:space-y-16">
        {/* ========================================================================= */}
        {/* SECTION HEADER & TOP-RIGHT METADATA (Matches Reference Screenshot) */}
        {/* ========================================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pt-2">
          {/* Left Title Area */}
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono tracking-[0.22em] text-[#B08D57] uppercase font-bold">
              <span>03</span>
              <span className="w-4 h-[1px] bg-[#B08D57]" />
              <span>MEASURED RESULTS</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#111111] tracking-tight leading-[1.08]">
              Commercial Impact &amp;{" "}
              <span className="font-serif italic font-normal text-gradient-accent">
                Case Studies
              </span>
            </h2>

            <p className="text-sm sm:text-base text-[#555555] font-light leading-relaxed max-w-xl">
              We measure success not just in clean code and aesthetic design, but in real business outcomes and revenue acceleration.
            </p>
          </div>

          {/* Right Navigation & Metadata Area */}
          <div className="flex items-center gap-8 lg:gap-12 self-start lg:self-end">
            {/* Arrow Pagination Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                aria-label="Previous Case Study"
                className="w-12 h-12 rounded-full border border-[#DCD4C5] bg-white hover:bg-[#111111] hover:text-white flex items-center justify-center text-[#111111] transition-all cursor-pointer shadow-xs active:scale-95"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              {/* Next Button with Subtle Orbit Ring */}
              <div className="relative">
                <svg className="absolute -inset-1 w-14 h-14 pointer-events-none rotate-[-45deg]" viewBox="0 0 56 56">
                  <circle
                    cx="28"
                    cy="28"
                    r="25"
                    fill="none"
                    stroke="#DCD4C5"
                    strokeWidth="1.5"
                    strokeDasharray="40 120"
                    opacity="0.8"
                  />
                </svg>
                <button
                  onClick={handleNext}
                  aria-label="Next Case Study"
                  className="w-12 h-12 rounded-full border border-[#DCD4C5] bg-white hover:bg-[#111111] hover:text-white flex items-center justify-center text-[#111111] transition-all cursor-pointer shadow-xs active:scale-95"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Header Metadata Column */}
            <div className="hidden sm:flex items-center gap-4 text-right">
              <div className="space-y-0.5">
                <div className="text-[10px] font-mono tracking-widest text-[#777777] uppercase font-bold">
                  REAL RESULTS
                </div>
                <div className="text-[9px] font-mono tracking-widest text-[#B08D57] uppercase">
                  SCROLL TO EXPLORE
                </div>
              </div>
              <div className="relative h-10 w-[1px] bg-[#DCD4C5] flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-[#B08D57] border border-white shadow-xs" />
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* THE 3 CASE STUDY CARDS (Exact match to user's uploaded layout) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch pt-4 pb-4">
          {caseItems.map((item, idx) => {
            const isSelected = activeIdx === idx;

            return (
              <div
                key={item.id}
                onClick={() => setActiveIdx(idx)}
                className={`relative rounded-[32px] sm:rounded-[36px] p-6 sm:p-8 flex flex-col justify-between transition-all duration-500 cursor-pointer overflow-hidden border ${
                  isSelected
                    ? "bg-white border-[#B08D57] shadow-[0_20px_50px_-10px_rgba(176,141,87,0.22),0_10px_25px_rgba(0,0,0,0.06)] lg:-translate-y-3 lg:scale-[1.02] z-20"
                    : "bg-white/85 backdrop-blur-md border-[#DCD4C5] shadow-sm hover:border-[#B08D57]/70 hover:shadow-md z-10"
                }`}
              >
                {/* Ambient Top Glow on Selected Card */}
                {isSelected && (
                  <div className="absolute -top-10 inset-x-0 h-24 bg-gradient-to-b from-[#B08D57]/15 to-transparent pointer-events-none rounded-t-[36px]" />
                )}

                {/* Top Half: Watermark Number + Metric + Title + 3D Visual */}
                <div className="flex items-start justify-between gap-4">
                  {/* Left Column: Number, Metric, Text */}
                  <div className="space-y-1.5 flex-1 relative z-10">
                    {/* Watermark Number in background */}
                    <div className="text-4xl sm:text-5xl font-mono font-black text-[#DCD4C5]/60 tracking-tighter leading-none select-none">
                      {item.num}
                    </div>

                    {/* High-Impact Stat Metric */}
                    <div className="text-4xl sm:text-5xl font-extrabold font-mono text-[#111111] tracking-tight leading-none pt-1">
                      {item.metric}
                    </div>

                    {/* Subtitle Heading */}
                    <h3 className="text-base sm:text-lg font-bold text-[#111111] pt-1 leading-snug">
                      {item.title}
                    </h3>

                    {/* Description Paragraph */}
                    <p className="text-xs sm:text-sm text-[#555555] font-light leading-relaxed max-w-[260px] pt-1">
                      {item.description}
                    </p>
                  </div>

                  {/* Right Column: High-Res 3D Artwork Render */}
                  <div className="w-32 sm:w-40 md:w-44 aspect-square rounded-2xl overflow-hidden relative shrink-0 border border-[#DCD4C5]/50 shadow-inner group">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover object-center transition-transform duration-500 hover:scale-105"
                      sizes="(max-width: 768px) 140px, 180px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
                  </div>
                </div>

                {/* Bottom Half: Interactive Client Tag Pill */}
                <div className="pt-6 mt-6 border-t border-[#DCD4C5]/50 flex items-center justify-between relative z-10">
                  <Link
                    href={item.link}
                    className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#111111] hover:text-[#B08D57] transition-colors font-bold group/link"
                  >
                    <div className="w-5 h-5 rounded-full border border-[#DCD4C5] bg-white flex items-center justify-center group-hover/link:border-[#B08D57] group-hover/link:translate-x-0.5 transition-all">
                      <ArrowRight className="w-3 h-3 text-[#111111] group-hover/link:text-[#B08D57]" />
                    </div>
                    <span>
                      {item.client} • {item.category}
                    </span>
                  </Link>

                  {/* Tiny Active Pill Indicator */}
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-[#B08D57] animate-pulse" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* BOTTOM METADATA & TIMELINE PAGINATION (Matches Reference Screenshot) */}
        {/* ========================================================================= */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#DCD4C5]/80 text-[11px] font-mono text-[#777777]">
          {/* Bottom Left: Timeline Slider */}
          <div className="flex items-center gap-3">
            <div className="relative w-28 h-[2px] bg-[#DCD4C5] rounded-full overflow-hidden">
              <div
                className="absolute top-0 bottom-0 bg-[#B08D57] transition-all duration-300 rounded-full"
                style={{
                  left: `${(activeIdx / (caseItems.length - 1)) * 65}%`,
                  width: "35%",
                }}
              />
            </div>
            <span className="tracking-widest font-bold text-[#111111]">
              0{activeIdx + 1} — 03
            </span>
          </div>

          {/* Bottom Right: Tagline */}
          <div className="flex items-center gap-2 tracking-widest uppercase">
            <span>IDEAS</span>
            <span>→</span>
            <span>PRODUCTS</span>
            <span>→</span>
            <span className="text-[#111111] font-bold">IMPACT</span>
            <span>—</span>
          </div>
        </div>
      </div>
    </section>
  );
}
