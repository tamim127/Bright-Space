"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles, ExternalLink, Eye } from "lucide-react";

interface ProductCardData {
  id: string;
  brand: string;
  category: string;
  headline: string;
  subtext: string;
  image: string;
  tag?: string;
  theme: "light" | "dark" | "warm" | "editorial";
  accentColor?: string;
  metrics?: { label: string; value: string };
}

// ROW 1 CARDS (Scrolls Left)
const row1Cards: ProductCardData[] = [
  {
    id: "pluto-agency",
    brand: "PLUTO",
    category: "Creative Agency",
    headline: "Creativity, strategy & innovation to build meaningful digital experiences that drive success",
    subtext: "Exploring uncharted frontiers in digital motion & spatial identity.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    tag: "Awwwards SOTD",
    theme: "editorial",
    accentColor: "#E05A36",
  },
  {
    id: "junglese-precision",
    brand: "Junglese",
    category: "Executive Growth",
    headline: "Built for leaders who value precision, clarity and measurable progress",
    subtext: "Bespoke executive workflows and strategic digital systems.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
    tag: "Design System",
    theme: "light",
  },
  {
    id: "design-and-strategy",
    brand: "Design & Strategy",
    category: "Brand Studio",
    headline: "Driven by Strategy, fueled by imagination. We craft design-first solutions that help brands stand out",
    subtext: "Sculptural forms, dark mode precision, and high-frequency identity.",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop",
    tag: "Brand Identity",
    theme: "dark",
  },
  {
    id: "empower-mind",
    brand: "Empower Mind",
    category: "Wellness & Life",
    headline: "Empower your mind and transform your life through daily intentional habits",
    subtext: "Guided self-reflection, neuro-wellness modules & mindfulness.",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop",
    tag: "Mobile App & Web",
    theme: "warm",
  },
  {
    id: "nexus-enterprise",
    brand: "Nexus Telemetry",
    category: "Enterprise SaaS",
    headline: "Real-time automated workflow telemetry for distributed engineering clusters",
    subtext: "Zero-latency pipeline queries with role-based access control.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    tag: "Cloud Platform",
    theme: "dark",
    metrics: { label: "Query Speed", value: "< 240ms" },
  },
  {
    id: "aurora-luxury",
    brand: "Aurora Paris",
    category: "Haute Couture",
    headline: "Curated haute couture, bespoke craftsmanship & timeless digital storefront",
    subtext: "Immersive headless commerce with 3D product interactive viewer.",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop",
    tag: "E-Commerce",
    theme: "light",
  },
  {
    id: "kinetic-motion",
    brand: "Kinetic Labs",
    category: "3D & Motion",
    headline: "Fluid WebGL interaction and tactile physics engineered for modern browsers",
    subtext: "Interactive 3D shaders and dynamic particle environments.",
    image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=800&auto=format&fit=crop",
    tag: "Interactive 3D",
    theme: "editorial",
  },
  {
    id: "horizon-capital-vc",
    brand: "Horizon Capital",
    category: "Venture Partners",
    headline: "Backing visionaries shaping the next sovereign frontier of deep technology",
    subtext: "$380M+ deployed across enterprise artificial intelligence and robotics.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
    tag: "Corporate Experience",
    theme: "dark",
    metrics: { label: "Capital AUM", value: "$380M+" },
  },
];

// ROW 2 CARDS (Scrolls Right)
const row2Cards: ProductCardData[] = [
  {
    id: "cafen-cafe",
    brand: "Cafen Café",
    category: "Artisan Coffee",
    headline: "Discover the perfect brew at Cafen café — single-origin beans roasted to perfection",
    subtext: "Artisanal espresso subscriptions, cold brew blends & local roasteries.",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop",
    tag: "Lifestyle & Store",
    theme: "warm",
  },
  {
    id: "capera-strategy",
    brand: "Capera Advisory",
    category: "Management Consulting",
    headline: "Driving sustainable business growth through expert strategy and market insights",
    subtext: "Strategic M&A guidance, restructuring, and capital optimization.",
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=800&auto=format&fit=crop",
    tag: "B2B Advisory",
    theme: "light",
  },
  {
    id: "jobport-career",
    brand: "JobPort",
    category: "Talent Marketplace",
    headline: "Unlock doors to new opportunities with AI-driven verified candidate matching",
    subtext: "Connecting top 1% global product designers & senior engineers.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop",
    tag: "Talent Platform",
    theme: "light",
    metrics: { label: "Placements", value: "25k+ Hires" },
  },
  {
    id: "voss-max-portfolio",
    brand: "VOSS MAX",
    category: "Design Director",
    headline: "Hi, I'm Voss — crafting spatial interfaces, typography & digital depth for modern culture",
    subtext: "Selected personal works, client commissions and architectural posters.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    tag: "Creative Direction",
    theme: "dark",
  },
  {
    id: "vertex-ai-engine",
    brand: "Vertex Studio",
    category: "AI Developer Tool",
    headline: "Configure, benchmark & deploy multi-modal neural models with instant API latency metrics",
    subtext: "Interactive prompt playground with live token telemetry.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop",
    tag: "Developer Tool",
    theme: "dark",
    metrics: { label: "Tokens/sec", value: "140 tps" },
  },
  {
    id: "strata-architecture",
    brand: "Strata Spatial",
    category: "Architectural Studio",
    headline: "Monolithic concrete, natural sunlight and harmonized brutalist residential sanctuaries",
    subtext: "International architectural awards across Tokyo, Zurich & Oslo.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
    tag: "Architecture",
    theme: "editorial",
  },
  {
    id: "elevate-fitness",
    brand: "Elevate Biometrics",
    category: "Health & Fitness",
    headline: "Precision athletic telemetry, heart rate recovery analytics and adaptive workouts",
    subtext: "Continuous synchronization across smart wearables and iOS ecosystem.",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
    tag: "Wearable App",
    theme: "dark",
  },
  {
    id: "solis-energy",
    brand: "Solis CleanTech",
    category: "Renewable Systems",
    headline: "Decentralized solar micro-grids powering sustainable zero-emission urban communities",
    subtext: "Real-time kilowatt generation, battery storage & carbon offset tracking.",
    image: "https://images.unsplash.com/photo-1509391365360-2e959784a276?q=80&w=800&auto=format&fit=crop",
    tag: "Clean Tech",
    theme: "light",
  },
];

export default function InfiniteProductShowcase() {
  const [activeModalProject, setActiveModalProject] = useState<ProductCardData | null>(null);

  return (
    <section className="relative w-full py-20 lg:py-28 overflow-hidden bg-[#F3EFE6] border-y border-[#DCD4C5] select-none">
      {/* Background Subtle Ambience */}
      <div className="absolute inset-0 pointer-events-none bg-grid-pattern opacity-40" />

      {/* Section Header Title & Eyebrow */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center mb-12 sm:mb-16 relative z-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#DCD4C5] shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#B08D57]" />
          <span className="text-xs font-mono text-[#B08D57] tracking-widest uppercase font-bold">
            {"/// DESIGN ARSENAL & CLIENT BUILDS"}
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111111] tracking-tight">
          Explore Our Endless <span className="font-serif italic text-gradient-accent">Product Gallery</span>
        </h2>
        <p className="text-sm sm:text-base text-[#555555] max-w-2xl mx-auto font-light">
          A continuous stream of custom web applications, SaaS dashboards, and digital experiences handcrafted for high-growth brands.
        </p>
      </div>

      {/* Main Showcase Container with Centerpiece */}
      <div className="relative w-full overflow-hidden py-4 group/showcase">
        {/* Left Edge Gradient Fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-48 md:w-64 bg-gradient-to-r from-[#F3EFE6] via-[#F3EFE6]/80 to-transparent z-20 pointer-events-none" />

        {/* Right Edge Gradient Fade */}
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-48 md:w-64 bg-gradient-to-l from-[#F3EFE6] via-[#F3EFE6]/80 to-transparent z-20 pointer-events-none" />

        {/* ========================================================================= */}
        {/* FLOATING CENTER CIRCULAR BADGE (Matches Reference Image) */}
        {/* ========================================================================= */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-auto">
          <div className="relative w-[270px] h-[270px] sm:w-[320px] sm:h-[320px] md:w-[340px] md:h-[340px] rounded-full bg-white/95 backdrop-blur-xl border-[4px] border-[#DCD4C5] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.18),0_0_50px_rgba(176,141,87,0.15)] flex flex-col items-center justify-center p-6 text-center transition-all duration-500 hover:scale-105 hover:border-[#B08D57] group/badge">
            {/* Subtle Rotating Ambient Ring Glow */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-[#B08D57]/20 via-[#D4BD91]/25 to-transparent blur-md -z-10 opacity-70 group-hover/badge:opacity-100 transition-opacity" />

            {/* Top Badge Icon (Terracotta-Gold Diamond / Symbol) */}
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-[#F05A28] to-[#D47A22] p-[1.5px] shadow-md flex items-center justify-center mb-3 sm:mb-4 group-hover/badge:rotate-12 transition-transform duration-300">
              <div className="w-full h-full rounded-[14px] bg-white flex items-center justify-center">
                <div className="flex items-center gap-0.5">
                  <div className="w-2.5 h-2.5 bg-[#F05A28] rounded-xs rotate-45" />
                  <div className="w-1.5 h-1.5 bg-[#B08D57] rounded-full" />
                </div>
              </div>
            </div>

            {/* Headline */}
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight leading-[1.1] mb-1 sm:mb-2">
              100+ Premium
              <br />
              <span className="font-serif italic text-gradient-accent">Designs</span>
            </h3>

            {/* Subtext */}
            <p className="text-[11px] sm:text-xs text-[#777777] font-medium mb-4 sm:mb-5 max-w-[210px] leading-tight">
              Bespoke motion & software crafted by Bright Space
            </p>

            {/* Vibrant CTA Button */}
            <Link
              href="/work"
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-[#F05A28] to-[#E04B1A] hover:from-[#E04B1A] hover:to-[#C83E12] text-white text-xs sm:text-sm font-bold shadow-[0_8px_20px_-4px_rgba(240,90,40,0.5)] hover:shadow-[0_12px_28px_-4px_rgba(240,90,40,0.7)] active:scale-95 transition-all duration-300 group/btn cursor-pointer"
            >
              <span>Explore all Projects</span>
              <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ROW 1: CONTINUOUS INFINITE SCROLL (LEFT) */}
        {/* ========================================================================= */}
        <div className="flex w-max mb-6 overflow-hidden">
          <div className="animate-marquee flex gap-5 sm:gap-6 items-center">
            {/* First Set of Cards */}
            {row1Cards.map((card) => (
              <ProductCardItem
                key={`r1-a-${card.id}`}
                card={card}
                onSelect={() => setActiveModalProject(card)}
              />
            ))}
            {/* Duplicated Set for Seamless Infinite Loop */}
            {row1Cards.map((card) => (
              <ProductCardItem
                key={`r1-b-${card.id}`}
                card={card}
                onSelect={() => setActiveModalProject(card)}
              />
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ROW 2: CONTINUOUS INFINITE SCROLL (RIGHT / REVERSE) */}
        {/* ========================================================================= */}
        <div className="flex w-max overflow-hidden">
          <div className="animate-marquee-reverse flex gap-5 sm:gap-6 items-center">
            {/* First Set of Cards */}
            {row2Cards.map((card) => (
              <ProductCardItem
                key={`r2-a-${card.id}`}
                card={card}
                onSelect={() => setActiveModalProject(card)}
              />
            ))}
            {/* Duplicated Set for Seamless Infinite Loop */}
            {row2Cards.map((card) => (
              <ProductCardItem
                key={`r2-b-${card.id}`}
                card={card}
                onSelect={() => setActiveModalProject(card)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Live Stats Bar */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12 pt-8 border-t border-[#DCD4C5]/80 flex flex-wrap items-center justify-between gap-6 text-xs font-mono text-[#777777]">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#B08D57] animate-pulse" />
          <span className="text-[#111111] font-bold">120+ Completed Deployments</span>
          <span>•</span>
          <span>Next.js 15 App Architecture</span>
        </div>
        <div className="flex items-center gap-6">
          <span>Avg. Lighthouse Score: <strong className="text-[#111111]">99/100</strong></span>
          <span>Client Satisfaction: <strong className="text-[#B08D57]">99.4%</strong></span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* QUICK PREVIEW MODAL */}
      {/* ========================================================================= */}
      {activeModalProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setActiveModalProject(null)}
        >
          <div
            className="w-full max-w-2xl bg-white rounded-3xl border-2 border-[#DCD4C5] p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-mono text-[#B08D57] uppercase font-bold tracking-widest">
                  {activeModalProject.category}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111111] mt-1">
                  {activeModalProject.brand}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalProject(null)}
                className="w-9 h-9 rounded-full bg-[#F3EFE6] border border-[#DCD4C5] text-[#111111] hover:bg-[#B08D57] hover:text-white transition-colors flex items-center justify-center font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Image Frame */}
            <div className="w-full h-64 sm:h-72 rounded-2xl overflow-hidden relative border border-[#DCD4C5]">
              <Image
                src={activeModalProject.image}
                alt={activeModalProject.brand}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                <span className="text-xs font-mono text-white bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                  {activeModalProject.tag || "Live Case Study"}
                </span>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-3">
              <h4 className="text-base font-bold text-[#111111]">
                {activeModalProject.headline}
              </h4>
              <p className="text-sm text-[#555555] leading-relaxed">
                {activeModalProject.subtext}
              </p>
            </div>

            {/* Footer Buttons */}
            <div className="pt-2 flex items-center justify-between border-t border-[#DCD4C5]">
              <Link
                href="/work"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase font-bold text-[#B08D57] hover:text-[#111111] transition-colors"
              >
                <Eye className="w-4 h-4" /> View Full Case Study
              </Link>
              <Link
                href="/contact"
                className="px-5 py-2.5 rounded-full bg-[#111111] hover:bg-[#B08D57] text-white text-xs font-bold transition-all shadow-md"
              >
                Start Similar Project
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// ---------------------------------------------------------------------------
// SUB-COMPONENT: PRODUCT CARD ITEM (Mimicking High-End Web Mockup)
// ---------------------------------------------------------------------------
function ProductCardItem({
  card,
  onSelect,
}: {
  card: ProductCardData;
  onSelect: () => void;
}) {
  const isDark = card.theme === "dark";

  return (
    <div
      onClick={onSelect}
      className={`group relative w-[340px] sm:w-[400px] md:w-[440px] h-[230px] sm:h-[260px] md:h-[275px] rounded-2xl sm:rounded-3xl border border-[#DCD4C5] overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:border-[#B08D57] hover:shadow-xl shrink-0 flex flex-col justify-between p-4 sm:p-5 ${
        isDark ? "bg-[#181716] text-white" : "bg-white text-[#111111]"
      }`}
    >
      {/* Mini Browser / Window Chrome Header */}
      <div className="flex items-center justify-between pb-2 border-b border-[#DCD4C5]/40 relative z-10">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#E57373]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFB74D]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#81C784]" />
          <span className={`text-[10px] font-mono tracking-wider ml-2 uppercase font-bold truncate max-w-[140px] ${
            isDark ? "text-white/60" : "text-[#777777]"
          }`}>
            {card.brand}
          </span>
        </div>

        {card.tag && (
          <span className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#F3EFE6] text-[#B08D57] border border-[#DCD4C5] font-bold">
            {card.tag}
          </span>
        )}
      </div>

      {/* Main Body: Split Layout with Realistic Web Mockup Typography & Image */}
      <div className="flex gap-4 items-center my-auto relative z-10">
        {/* Left Side: Editorial Typography */}
        <div className="flex-1 space-y-2">
          <div className="text-[10px] font-mono uppercase tracking-widest text-[#B08D57] font-bold">
            {card.category}
          </div>
          <h4 className={`text-sm sm:text-base font-extrabold line-clamp-3 leading-snug tracking-tight ${
            isDark ? "text-white" : "text-[#111111]"
          }`}>
            {card.headline}
          </h4>

          {card.metrics && (
            <div className="pt-1 flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-[#B08D57]">
                {card.metrics.value}
              </span>
              <span className={`text-[10px] font-mono uppercase tracking-wider ${
                isDark ? "text-white/50" : "text-[#777777]"
              }`}>
                {card.metrics.label}
              </span>
            </div>
          )}
        </div>

        {/* Right Side: Hero Visual Thumbnail */}
        <div className="w-28 sm:w-36 h-28 sm:h-32 rounded-xl sm:rounded-2xl overflow-hidden relative shrink-0 border border-[#DCD4C5]/60 shadow-inner group-hover:scale-105 transition-transform duration-500">
          <Image
            src={card.image}
            alt={card.brand}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 120px, 160px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>
      </div>

      {/* Bottom Mock Bar: Realistic CTA or Status */}
      <div className="flex items-center justify-between pt-2 border-t border-[#DCD4C5]/40 text-[10px] font-mono relative z-10">
        <span className={`${isDark ? "text-white/60" : "text-[#777777]"} truncate max-w-[200px]`}>
          brightspace.dev/work/{card.id}
        </span>
        <span className="inline-flex items-center gap-1 text-[#B08D57] font-bold group-hover:translate-x-1 transition-transform">
          Preview <ExternalLink className="w-3 h-3" />
        </span>
      </div>

      {/* Subtle Specular Ambient Hover Highlight */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-2xl sm:rounded-3xl" />
    </div>
  );
}
