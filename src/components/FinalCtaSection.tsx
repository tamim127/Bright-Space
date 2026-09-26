"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Sparkles,
  Users,
  Code2,
  Bot,
  Palette,
  Smartphone,
  Calendar,
  ArrowUpRight,
  Mail,
  Zap,
  ShieldCheck,
} from "lucide-react";
import CtaThreeBackground from "@/components/CtaThreeBackground";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServiceCard {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

const serviceCards: ServiceCard[] = [
  {
    id: "web-saas",
    title: "Web & SaaS Apps",
    description: "Scalable web platforms & cloud-native SaaS products.",
    icon: Code2,
  },
  {
    id: "ai-agents",
    title: "AI & Agents",
    description: "Intelligent agents, automation & AI-powered solutions.",
    icon: Bot,
  },
  {
    id: "design-systems",
    title: "UI/UX & Design Systems",
    description: "Modern interfaces, design systems & user experiences.",
    icon: Palette,
  },
  {
    id: "mobile-apps",
    title: "Mobile & iOS/Android",
    description: "Native & cross-platform mobile applications.",
    icon: Smartphone,
  },
];

export default function FinalCtaSection() {
  const [selectedCard, setSelectedCard] = useState<string>("web-saas");

  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const cardsContainerRef = useRef<HTMLDivElement | null>(null);
  const cardElementRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const featuresRef = useRef<HTMLDivElement | null>(null);

  // GSAP Entrance Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Main Panel & Cards Entrance
      if (panelRef.current) {
        gsap.fromTo(
          panelRef.current,
          { opacity: 0, y: 40, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: panelRef.current,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Stagger entrance on cards
      if (cardsContainerRef.current) {
        const cards = cardsContainerRef.current.querySelectorAll(".scope-card");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsContainerRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Feature highlights entrance
      if (featuresRef.current) {
        const featureItems = featuresRef.current.querySelectorAll(".feature-highlight");
        gsap.fromTo(
          featureItems,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: featuresRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // GSAP Interactive Card Click Animation
  const handleCardClick = (id: string) => {
    setSelectedCard(id);

    const cardEl = cardElementRefs.current.get(id);
    if (cardEl) {
      // Punchy tactile pop
      gsap.fromTo(
        cardEl,
        { scale: 0.97 },
        {
          scale: 1,
          duration: 0.35,
          ease: "back.out(2.2)",
        }
      );

      // Icon rotation burst
      const icon = cardEl.querySelector(".card-icon");
      if (icon) {
        gsap.fromTo(
          icon,
          { rotate: -8, scale: 0.9 },
          { rotate: 0, scale: 1.08, duration: 0.35, ease: "back.out(2)" }
        );
      }

      // Radio indicator pop
      const radio = cardEl.querySelector(".radio-dot");
      if (radio) {
        gsap.fromTo(
          radio,
          { scale: 0 },
          { scale: 1, duration: 0.25, ease: "back.out(2.5)" }
        );
      }
    }
  };

  // GSAP Card Hover Animation
  const handleCardMouseEnter = (id: string) => {
    const cardEl = cardElementRefs.current.get(id);
    if (!cardEl) return;

    if (id !== selectedCard) {
      gsap.to(cardEl, {
        y: -3,
        duration: 0.25,
        ease: "power2.out",
      });
      const icon = cardEl.querySelector(".card-icon");
      if (icon) {
        gsap.to(icon, { rotate: 5, scale: 1.05, duration: 0.25 });
      }
    }
  };

  const handleCardMouseLeave = (id: string) => {
    const cardEl = cardElementRefs.current.get(id);
    if (!cardEl) return;

    if (id !== selectedCard) {
      gsap.to(cardEl, {
        y: 0,
        duration: 0.25,
        ease: "power2.out",
      });
      const icon = cardEl.querySelector(".card-icon");
      if (icon) {
        gsap.to(icon, { rotate: 0, scale: 1, duration: 0.25 });
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-28 bg-[#FAF7F2] text-[#111111] overflow-hidden select-none border-t border-[#DCD4C5]"
    >
      {/* 1. THREE.JS 3D BACKGROUND (Positioned safely at sides, z-0) */}
      <CtaThreeBackground />

      {/* 2. SOFT AMBIENT RADIAL LIGHTING (Clean, no harsh dark grid) */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#FAF7F2]/40 to-[#FAF7F2]/90 pointer-events-none z-1" />

      {/* Subtle Warm Top Light Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[240px] bg-gradient-to-b from-[#B08D57]/15 via-[#D4BD91]/8 to-transparent blur-[80px] pointer-events-none z-1" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* ── TOP PILL-SHAPED STATUS BADGES ── */}
        <div
          ref={headerRef}
          className="flex flex-col items-center justify-center space-y-5 mb-10 sm:mb-12"
        >
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            {/* Badge 1: Ready to build */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-[#DCD4C5] shadow-xs backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#B08D57]" />
              <span className="text-[10px] sm:text-[11px] font-mono tracking-wider uppercase font-bold text-[#555555]">
                READY TO BUILD YOUR PRODUCT?
              </span>
            </div>

            {/* Badge 2: Project Slots Open */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-[#DCD4C5] shadow-xs backdrop-blur-md">
              <Users className="w-3.5 h-3.5 text-[#B08D57]" />
              <span className="text-[10px] sm:text-[11px] font-mono tracking-wider font-semibold text-[#555555]">
                2 Project Slots Open for Q4
              </span>
            </div>
          </div>

          {/* ── MAIN HEADING: EXACTLY TWO LINES ON DESKTOP (No clipping) ── */}
          <div className="text-center max-w-4xl mx-auto space-y-3.5">
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-[3.85rem] font-extrabold tracking-tight leading-[1.08] text-center">
              {/* Line 1 */}
              <span className="block text-[#111111] whitespace-normal sm:whitespace-nowrap">
                Transform Your Vision Into
              </span>
              {/* Line 2 with elegant gold gradient */}
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-[#B08D57] via-[#C99E5B] to-[#D4BD91] whitespace-normal sm:whitespace-nowrap mt-1 pb-1">
                High-Impact Production Reality.
              </span>
            </h2>

            {/* Subheading */}
            <p className="text-sm sm:text-base md:text-lg text-[#666666] max-w-2xl mx-auto leading-relaxed font-normal">
              Partner directly with senior cloud architects &amp; product engineers. No pass-offs, no fluff — just engineering precision &amp; luxury polish.
            </p>
          </div>
        </div>

        {/* ── THE SCOPE SELECTION PANEL (Matching Reference Screenshot) ── */}
        <div
          ref={panelRef}
          className="max-w-4xl xl:max-w-5xl mx-auto bg-white rounded-[2rem] sm:rounded-[2.5rem] border border-[#E2DDD2] p-3 sm:p-4 shadow-[0_22px_60px_-15px_rgba(20,20,20,0.08),0_0_30px_rgba(176,141,87,0.05)] grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 items-stretch relative"
        >
          {/* LEFT DARK PANEL */}
          <div className="lg:col-span-4 bg-[#141517] rounded-[1.6rem] sm:rounded-[2rem] p-7 sm:p-8 flex flex-col justify-between relative overflow-hidden text-white min-h-[350px] shadow-lg">
            <div className="relative z-10 space-y-3">
              <span className="text-[10px] font-mono tracking-[0.22em] text-[#B08D57] uppercase font-bold block">
                SELECT YOUR SCOPE OF INTEREST
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                What are you building?
              </h3>
              <p className="text-xs sm:text-sm text-[#A0A0A0] leading-relaxed font-light pt-1">
                Choose your focus area, and we&apos;ll match you with the right experts and solutions.
              </p>
            </div>

            {/* Decorative 3D Wireframe Wave Graphic at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none opacity-40 overflow-hidden">
              <svg
                viewBox="0 0 300 150"
                className="w-full h-full object-cover"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {[...Array(14)].map((_, i) => (
                  <path
                    key={i}
                    d={`M -20,${150 - i * 8} Q ${80 + i * 4},${90 - i * 6} ${160 + i * 2},${130 - i * 4} T 320,${80 - i * 5}`}
                    stroke={i % 2 === 0 ? "#B08D57" : "#D4BD91"}
                    strokeWidth="0.8"
                    strokeOpacity={0.15 + (i / 14) * 0.45}
                  />
                ))}
              </svg>
            </div>
          </div>

          {/* RIGHT LIGHT PANEL */}
          <div className="lg:col-span-8 p-2 sm:p-4 flex flex-col justify-between space-y-5">
            {/* 4 Selectable Service Cards in 2x2 Grid */}
            <div
              ref={cardsContainerRef}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5"
            >
              {serviceCards.map((card) => {
                const Icon = card.icon;
                const isSelected = selectedCard === card.id;

                return (
                  <button
                    key={card.id}
                    ref={(el) => {
                      if (el) cardElementRefs.current.set(card.id, el);
                    }}
                    onClick={() => handleCardClick(card.id)}
                    onMouseEnter={() => handleCardMouseEnter(card.id)}
                    onMouseLeave={() => handleCardMouseLeave(card.id)}
                    className={`scope-card group relative p-4 sm:p-5 rounded-2xl border text-left transition-colors duration-250 cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? "bg-[#FFFDF9] border-[#B08D57] shadow-[0_6px_25px_rgba(176,141,87,0.16)] ring-1 ring-[#B08D57]/60"
                        : "bg-white border-[#EAE5DA] hover:border-[#B08D57]/60 hover:bg-[#FAF7F2] shadow-xs"
                    }`}
                  >
                    <div className="flex items-start gap-3.5 min-w-0">
                      {/* Circular Icon Container */}
                      <div
                        className={`card-icon w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300 ${
                          isSelected
                            ? "bg-gradient-to-br from-[#B08D57] to-[#8C6D3B] text-white shadow-sm"
                            : "bg-[#F3EFE6] text-[#666666] group-hover:text-[#B08D57] group-hover:bg-[#EAE4D7]"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>

                      {/* Text Content — No Truncation */}
                      <div className="space-y-0.5 min-w-0">
                        <h4 className="text-sm sm:text-base font-bold text-[#111111] tracking-tight leading-snug">
                          {card.title}
                        </h4>
                        <p className="text-xs text-[#666666] leading-snug">
                          {card.description}
                        </p>
                      </div>
                    </div>

                    {/* Circular Selection Radio Indicator (Matching screenshot) */}
                    <div className="shrink-0 flex items-center justify-center">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-200 ${
                          isSelected
                            ? "border-2 border-[#B08D57] bg-white shadow-xs"
                            : "border border-[#DCD4C5] bg-transparent group-hover:border-[#B08D57]/70"
                        }`}
                      >
                        {isSelected && (
                          <div className="radio-dot w-2.5 h-2.5 rounded-full bg-[#B08D57]" />
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* CTA Buttons beneath cards */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              {/* Primary CTA */}
              <Link href="/contact" className="w-full sm:flex-1">
                <button className="w-full px-6 py-3.5 rounded-xl bg-[#141517] hover:bg-[#B08D57] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(17,17,17,0.2)] hover:shadow-[0_6px_25px_rgba(176,141,87,0.35)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-250 cursor-pointer">
                  <Calendar className="w-4 h-4" />
                  <span>Schedule Discovery Call</span>
                  <ArrowUpRight className="w-4 h-4 ml-0.5" />
                </button>
              </Link>

              {/* Secondary CTA */}
              <a
                href="mailto:hello@brightspace.dev"
                className="w-full sm:flex-1"
              >
                <button className="w-full px-6 py-3.5 rounded-xl bg-white hover:bg-[#FAF7F2] border border-[#DCD4C5] hover:border-[#B08D57] text-[#111111] font-semibold text-sm sm:text-base flex items-center justify-center gap-2 transition-all duration-250 shadow-xs cursor-pointer">
                  <Mail className="w-4 h-4 text-[#B08D57]" />
                  <span>Instant Email Brief</span>
                </button>
              </a>
            </div>
          </div>
        </div>

        {/* ── BOTTOM FEATURE HIGHLIGHTS (3 Items matching screenshot) ── */}
        <div
          ref={featuresRef}
          className="mt-12 sm:mt-14 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-center"
        >
          {/* Feature 1 */}
          <div className="feature-highlight flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#B08D57]/12 border border-[#B08D57]/25 flex items-center justify-center text-[#B08D57] shrink-0">
              <Zap className="w-4 h-4 fill-[#B08D57]/30" />
            </div>
            <div>
              <h5 className="text-sm font-bold text-[#111111] tracking-tight">
                Rapid 2–4 Wk MVPs
              </h5>
              <p className="text-xs text-[#666666] mt-0.5 leading-snug">
                From architecture blueprint to deployed production code.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="feature-highlight flex items-center gap-3.5 md:border-l md:border-[#DCD4C5]/60 md:pl-8">
            <div className="w-10 h-10 rounded-full bg-[#B08D57]/12 border border-[#B08D57]/25 flex items-center justify-center text-[#B08D57] shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h5 className="text-sm font-bold text-[#111111] tracking-tight">
                100% Code Ownership
              </h5>
              <p className="text-xs text-[#666666] mt-0.5 leading-snug">
                Clean TypeScript, strict linting, and full IP transfer.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="feature-highlight flex items-center gap-3.5 md:border-l md:border-[#DCD4C5]/60 md:pl-8">
            <div className="w-10 h-10 rounded-full bg-[#B08D57]/12 border border-[#B08D57]/25 flex items-center justify-center text-[#B08D57] shrink-0">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h5 className="text-sm font-bold text-[#111111] tracking-tight">
                Direct Engineer Access
              </h5>
              <p className="text-xs text-[#666666] mt-0.5 leading-snug">
                Daily Slack updates &amp; weekly video sprint demos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
