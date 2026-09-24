"use client";

import React from "react";
import { Sparkles } from "lucide-react";

// Brand Logo Definition with Authentic SVG Vectors
interface BrandLogo {
  id: string;
  name: string;
  renderLogo: (color: string) => React.ReactNode;
}

const brandLogos: BrandLogo[] = [
  {
    id: "clickup",
    name: "ClickUp",
    renderLogo: (color) => (
      <div className="flex items-center gap-2.5">
        <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 13.5L12 7.5L19 13.5"
            stroke={color}
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6.5 17.5C9.5 19.5 14.5 19.5 17.5 17.5"
            stroke={color}
            strokeWidth="3.2"
            strokeLinecap="round"
          />
        </svg>
        <span className="font-extrabold text-xl sm:text-2xl tracking-tight" style={{ color }}>
          ClickUp
        </span>
      </div>
    ),
  },
  {
    id: "airtable",
    name: "Airtable",
    renderLogo: (color) => (
      <div className="flex items-center gap-3">
        <svg className="w-7 h-7 shrink-0" viewBox="0 0 24 24" fill={color}>
          <path d="M11.5 2.5L2 6.8L11.5 11.2L21 6.8L11.5 2.5Z" />
          <path d="M2 9.5V17.2L10.5 21.5V13.8L2 9.5Z" opacity="0.85" />
          <path d="M22 9.5L13.5 13.8V21.5L22 17.2V9.5Z" opacity="0.7" />
        </svg>
        <span className="font-bold text-xl sm:text-2xl tracking-tight" style={{ color }}>
          Airtable
        </span>
      </div>
    ),
  },
  {
    id: "pendo",
    name: "pendo",
    renderLogo: (color) => (
      <div className="flex items-center gap-2.5">
        <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill={color}>
          <path d="M4 4L20 12L4 20L8 12L4 4Z" />
        </svg>
        <span className="font-extrabold text-xl sm:text-2xl tracking-tighter lowercase" style={{ color }}>
          pendo
        </span>
      </div>
    ),
  },
  {
    id: "monday",
    name: "monday.com",
    renderLogo: (color) => (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
          <span className="w-2.5 h-4 rounded-xs rotate-12 -translate-y-0.5" style={{ backgroundColor: color }} />
        </div>
        <span className="font-extrabold text-xl sm:text-2xl tracking-tight" style={{ color }}>
          monday<span className="font-normal text-sm opacity-80">.com</span>
        </span>
      </div>
    ),
  },
  {
    id: "airwallex",
    name: "Airwallex",
    renderLogo: (color) => (
      <div className="flex items-center gap-2.5">
        <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.8">
          <path d="M4 18L10 6L14 14L18 6L21 12" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="font-bold text-xl sm:text-2xl tracking-tight" style={{ color }}>
          Airwallex
        </span>
      </div>
    ),
  },
  {
    id: "gitlab",
    name: "GitLab",
    renderLogo: (color) => (
      <div className="flex items-center gap-2.5">
        <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill={color}>
          <path d="M23.6 9.6L20.8 1.1C20.6 0.4 19.7 0.2 19.3 0.8L16.2 7.1H7.8L4.7 0.8C4.3 0.2 3.4 0.4 3.2 1.1L0.4 9.6C0.1 10.5 0.5 11.5 1.2 12.1L12 20.3L22.8 12.1C23.5 11.5 23.9 10.5 23.6 9.6Z" />
        </svg>
        <span className="font-extrabold text-xl sm:text-2xl tracking-tight" style={{ color }}>
          GitLab
        </span>
      </div>
    ),
  },
  {
    id: "fundall",
    name: "fundall",
    renderLogo: (color) => (
      <div className="flex items-center gap-2">
        <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill={color}>
          <path d="M5 4V14C5 17.866 8.134 21 12 21C15.866 21 19 17.866 19 14V4H15V14C15 15.657 13.657 17 12 17C10.343 17 9 15.657 9 14V4H5Z" />
          <path d="M17 4H21V10H17V4Z" opacity="0.8" />
        </svg>
        <span className="font-black text-xl sm:text-2xl tracking-tight" style={{ color }}>
          fundall
        </span>
      </div>
    ),
  },
  {
    id: "stripe",
    name: "Stripe",
    renderLogo: (color) => (
      <div className="flex items-center gap-2">
        <span className="font-extrabold text-2xl sm:text-3xl tracking-tighter italic" style={{ color }}>
          stripe
        </span>
      </div>
    ),
  },
  {
    id: "linear",
    name: "Linear",
    renderLogo: (color) => (
      <div className="flex items-center gap-2.5">
        <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3">
          <circle cx="12" cy="12" r="9" />
          <path d="M6 18L18 6" strokeLinecap="round" />
        </svg>
        <span className="font-bold text-xl sm:text-2xl tracking-tight" style={{ color }}>
          Linear
        </span>
      </div>
    ),
  },
  {
    id: "figma",
    name: "Figma",
    renderLogo: (color) => (
      <div className="flex items-center gap-2.5">
        <svg className="w-5 h-6 shrink-0" viewBox="0 0 38 57" fill={color}>
          <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" />
          <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" />
          <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" />
          <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" />
          <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" />
        </svg>
        <span className="font-bold text-xl sm:text-2xl tracking-tight" style={{ color }}>
          Figma
        </span>
      </div>
    ),
  },
  {
    id: "supabase",
    name: "Supabase",
    renderLogo: (color) => (
      <div className="flex items-center gap-2.5">
        <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill={color}>
          <path d="M21.362 9.354H12V.5a.5.5 0 0 0-.853-.354L.64 12.646A.5.5 0 0 0 1 13.5h9.362v8.854a.5.5 0 0 0 .853.354l10.507-12.5a.5.5 0 0 0-.36-.854z" />
        </svg>
        <span className="font-extrabold text-xl sm:text-2xl tracking-tight" style={{ color }}>
          supabase
        </span>
      </div>
    ),
  },
  {
    id: "vercel",
    name: "Vercel",
    renderLogo: (color) => (
      <div className="flex items-center gap-2.5">
        <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill={color}>
          <path d="M12 2L24 22H0L12 2Z" />
        </svg>
        <span className="font-extrabold text-xl sm:text-2xl tracking-tight" style={{ color }}>
          Vercel
        </span>
      </div>
    ),
  },
];

export default function LogoRail() {
  // Duplicated arrays for seamless infinite horizontal loop
  const logosSet1 = [...brandLogos, ...brandLogos];
  const logosSet2 = [...brandLogos.slice().reverse(), ...brandLogos.slice().reverse()];

  return (
    <section className="relative w-full py-20 sm:py-28 overflow-hidden bg-[#F3EFE6] select-none border-y border-[#DCD4C5]">
      {/* Background Subtle Ambience / Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-grid-pattern" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-gradient-to-r from-[#B08D57]/15 via-[#D4BD91]/20 to-[#B08D57]/10 blur-[130px] rounded-full pointer-events-none" />

      {/* Top Section Header */}
      <div className="max-w-7xl mx-auto px-6 mb-12 sm:mb-16 relative z-10 text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#DCD4C5] shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#B08D57]" />
          <span className="text-xs font-mono uppercase tracking-[0.22em] text-[#B08D57] font-bold">
            {"/// TRUSTED PARTNER ECOSYSTEM"}
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111111] tracking-tight">
          Trusted by Teams Building the <span className="font-serif italic text-gradient-accent">Next Frontier</span>
        </h2>
        <p className="text-sm sm:text-base text-[#555555] max-w-xl mx-auto font-light">
          Engineering mission-critical digital flagships and cloud architectures for high-velocity startups and global enterprises.
        </p>
      </div>

      {/* ========================================================================= */}
      {/* 3D ANGLED CRISS-CROSS RIBBONS CONTAINER */}
      {/* ========================================================================= */}
      <div className="relative w-full h-[260px] sm:h-[300px] md:h-[340px] flex items-center justify-center overflow-hidden">
        {/* Side Vignette Fades to Background Color (#F3EFE6) */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-44 md:w-64 bg-gradient-to-r from-[#F3EFE6] via-[#F3EFE6]/80 to-transparent z-30 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-44 md:w-64 bg-gradient-to-l from-[#F3EFE6] via-[#F3EFE6]/80 to-transparent z-30 pointer-events-none" />

        {/* ----------------------------------------------------------------------- */}
        {/* RIBBON 1 (DEEP NOIR / BACK RIBBON - TILTED -4.5 DEG - SCROLLS LEFT) */}
        {/* ----------------------------------------------------------------------- */}
        <div
          className="absolute w-[150vw] -left-[25vw] z-10 py-4 sm:py-5.5 md:py-6 bg-[#111111] border-y-2 border-[#D4BD91]/40 shadow-[0_15px_35px_rgba(0,0,0,0.35)]"
          style={{
            transform: "rotate(-4.5deg)",
            transformOrigin: "center center",
          }}
        >
          <div className="animate-marquee-ribbon flex items-center gap-14 sm:gap-20 md:gap-24 will-change-transform">
            {logosSet1.map((logo, idx) => (
              <div
                key={`noir-${logo.id}-${idx}`}
                className="flex items-center shrink-0 opacity-85 hover:opacity-100 hover:scale-105 transition-all duration-300 cursor-default"
              >
                {logo.renderLogo("#D4BD91")}
              </div>
            ))}
          </div>
        </div>

        {/* ----------------------------------------------------------------------- */}
        {/* RIBBON 2 (ANTIQUE GOLD / FRONT RIBBON - TILTED +4.5 DEG - SCROLLS RIGHT) */}
        {/* ----------------------------------------------------------------------- */}
        <div
          className="absolute w-[150vw] -left-[25vw] z-20 py-4.5 sm:py-6 md:py-6.5 bg-gradient-to-r from-[#B08D57] via-[#C9A46C] to-[#8C6D3B] border-y-2 border-[#8C6D3B] shadow-[0_25px_60px_-10px_rgba(0,0,0,0.5),0_0_35px_rgba(176,141,87,0.4)]"
          style={{
            transform: "rotate(4.5deg)",
            transformOrigin: "center center",
          }}
        >
          {/* Subtle metallic specular shine on ribbon edge */}
          <div className="absolute inset-x-0 top-0 h-[2px] bg-white/40 pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-[2px] bg-black/25 pointer-events-none" />

          <div className="animate-marquee-ribbon-reverse flex items-center gap-14 sm:gap-20 md:gap-24 will-change-transform">
            {logosSet2.map((logo, idx) => (
              <div
                key={`gold-${logo.id}-${idx}`}
                className="flex items-center shrink-0 hover:scale-110 active:scale-95 transition-transform duration-300 cursor-default filter drop-shadow-[0_1px_1px_rgba(255,255,255,0.2)]"
              >
                {logo.renderLogo("#111111")}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Status Ticker */}
      <div className="max-w-7xl mx-auto px-6 mt-10 relative z-10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#777777]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#B08D57] animate-pulse" />
          <span className="text-[#111111] font-bold">Live Integration Network</span>
          <span>•</span>
          <span>99.99% Production Uptime</span>
        </div>
        <span className="hidden sm:inline">Pause on hover to inspect verified tech stacks</span>
      </div>
    </section>
  );
}
