"use client";

import React from "react";

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
    id: "vercel",
    name: "Vercel",
    renderLogo: (color) => (
      <div className="flex items-center gap-2.5">
        <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill={color}>
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
    <section className="relative w-full py-16 sm:py-24 md:py-28 overflow-hidden bg-[#0A0A0A] select-none border-y border-[#222222]">
      {/* Background Subtle Ambience / Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_50%_50%,rgba(204,255,0,0.15),transparent_70%)]" />

      {/* Top Section Header */}
      <div className="max-w-7xl mx-auto px-6 mb-8 sm:mb-12 relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#CCFF00] font-bold">
            Trusted By High-Velocity Product Teams
          </span>
        </div>
        <span className="text-xs font-mono text-white/50 tracking-wider">
          Over 40+ Enterprise Integrations & Deployments
        </span>
      </div>

      {/* ========================================================================= */}
      {/* ANGLED CRISS-CROSS RIBBONS CONTAINER */}
      {/* ========================================================================= */}
      <div className="relative w-full h-[220px] sm:h-[260px] md:h-[300px] flex items-center justify-center overflow-hidden">
        {/* Subtle Side Vignette Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-36 md:w-56 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent z-30 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-36 md:w-56 bg-gradient-to-l from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent z-30 pointer-events-none" />

        {/* ----------------------------------------------------------------------- */}
        {/* RIBBON 1 (DARK / BACKGROUND RIBBON - TILTED -2.5 DEG - SCROLLS LEFT) */}
        {/* ----------------------------------------------------------------------- */}
        <div
          className="absolute w-[140vw] -left-[20vw] z-10 py-3 sm:py-4.5 bg-[#161616] border-y border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.7)]"
          style={{
            transform: "rotate(-2.8deg)",
            transformOrigin: "center center",
          }}
        >
          <div className="animate-marquee-ribbon flex items-center gap-14 sm:gap-20 md:gap-24 will-change-transform">
            {logosSet1.map((logo, idx) => (
              <div
                key={`dark-${logo.id}-${idx}`}
                className="flex items-center shrink-0 opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-300 cursor-default"
              >
                {logo.renderLogo("#FFFFFF")}
              </div>
            ))}
          </div>
        </div>

        {/* ----------------------------------------------------------------------- */}
        {/* RIBBON 2 (ELECTRIC LIME / FOREGROUND RIBBON - TILTED +2.8 DEG - SCROLLS RIGHT) */}
        {/* ----------------------------------------------------------------------- */}
        <div
          className="absolute w-[140vw] -left-[20vw] z-20 py-3.5 sm:py-5 md:py-6 bg-[#CCFF00] shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_40px_rgba(204,255,0,0.35)]"
          style={{
            transform: "rotate(3deg)",
            transformOrigin: "center center",
          }}
        >
          <div className="animate-marquee-ribbon-reverse flex items-center gap-14 sm:gap-20 md:gap-24 will-change-transform">
            {logosSet2.map((logo, idx) => (
              <div
                key={`lime-${logo.id}-${idx}`}
                className="flex items-center shrink-0 hover:scale-110 active:scale-95 transition-transform duration-300 cursor-default"
              >
                {logo.renderLogo("#000000")}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Subtle Indicator */}
      <div className="max-w-7xl mx-auto px-6 mt-8 sm:mt-10 relative z-10 flex items-center justify-between text-[11px] font-mono text-white/40">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
          <span>Interactive Canvas • Hardware-Accelerated 60 FPS</span>
        </div>
        <span className="hidden sm:inline">Hover to inspect partner stacks</span>
      </div>
    </section>
  );
}
