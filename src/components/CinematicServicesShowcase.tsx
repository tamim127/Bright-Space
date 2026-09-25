"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  ArrowDown,
  Check,
  Monitor,
  Smartphone,
  Tablet,
} from "lucide-react";
import { servicesData, ServiceItem } from "@/data/services";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// -----------------------------------------------------------------------------
// Floating Glass Performance & Device Badges (Top Right of Card)
// -----------------------------------------------------------------------------
function ServiceFloatingBadges({ service }: { service: ServiceItem }) {
  if (!service.metricsBadge) return null;

  return (
    <div className="hidden xl:flex flex-col gap-3.5 absolute right-8 sm:right-12 top-10 sm:top-12 z-20 pointer-events-none select-none">
      {/* 1. Metric / Performance Score Glass Card */}
      <div className="w-56 p-3.5 rounded-2xl bg-white/85 backdrop-blur-xl border border-white/80 shadow-[0_15px_35px_-5px_rgba(0,0,0,0.08)] text-[#111111]">
        <div className="flex items-center justify-between mb-2.5 border-b border-black/5 pb-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#777777] font-semibold">
            {service.metricsBadge.title}
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>

        <div className="flex items-center gap-3 mb-2.5">
          <div className="w-11 h-11 rounded-full border-2 border-emerald-500/80 bg-emerald-50/80 flex items-center justify-center font-bold text-sm text-emerald-600 shadow-inner">
            {service.metricsBadge.score}
          </div>
          <div className="flex-1 space-y-0.5">
            {service.metricsBadge.items.slice(0, 2).map((item, i) => (
              <div key={i} className="flex justify-between text-[10px]">
                <span className="text-[#666666]">{item.label}</span>
                <span className="font-mono font-bold text-[#111111]">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-0.5 border-t border-black/5 pt-2">
          {service.metricsBadge.items.slice(2, 4).map((item, i) => (
            <div key={i} className="flex justify-between text-[10px]">
              <span className="text-[#666666]">{item.label}</span>
              <span className="font-mono font-bold text-[#111111]">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Secondary Device / Architecture Floating Glass Card */}
      {service.floatingBadge && (
        <div className="w-52 p-3 rounded-2xl bg-white/85 backdrop-blur-xl border border-white/80 shadow-[0_15px_35px_-5px_rgba(0,0,0,0.08)] text-[#111111]">
          <div className="text-[9.5px] font-mono uppercase tracking-wider text-[#777777] font-semibold mb-1">
            {service.floatingBadge.title}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[10.5px] font-medium text-[#333333]">
              {service.floatingBadge.subtitle}
            </span>
            <div className="flex items-center gap-1.5 text-[#B08D57]">
              <Monitor className="w-3.5 h-3.5" />
              <Tablet className="w-3 h-3" />
              <Smartphone className="w-2.5 h-2.5" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// -----------------------------------------------------------------------------
// Main CinematicServicesShowcase Component
// -----------------------------------------------------------------------------
export default function CinematicServicesShowcase() {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const totalServices = servicesData.length; // 5

  // Directly manipulate DOM transform/opacity on each card for butter-smooth 120 FPS
  const updateCards = useCallback((progress: number) => {
    const maxP = totalServices - 1; // 4
    const rawPos = Math.max(0, Math.min(1, progress)) * maxP;
    const currentStep = Math.min(maxP - 1, Math.floor(rawPos));
    const subProg = rawPos - currentStep;

    // Cinematic Hermite curve with generous reading dwell plateau:
    // 0.00 - 0.28: stable dwell on current card for comfortable reading
    // 0.28 - 0.72: smooth Hermite transition bracket
    // 0.72 - 1.00: stable dwell settled on next card
    let easedSub = 0;
    if (subProg < 0.28) {
      easedSub = 0;
    } else if (subProg > 0.72) {
      easedSub = 1;
    } else {
      const t = (subProg - 0.28) / 0.44;
      easedSub = t * t * (3 - 2 * t);
    }

    const continuousPos = currentStep + easedSub;
    const newActiveIdx = Math.min(maxP, Math.round(continuousPos));

    setActiveIndex((prev) => (prev !== newActiveIdx ? newActiveIdx : prev));

    const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;
    const baseShift = isMobile ? 18 : 48;

    cardRefs.current.forEach((cardEl, idx) => {
      if (!cardEl) return;
      const diff = idx - continuousPos;

      let translateX = 0;
      let translateYPercent = 0;
      let translateYPx = 0;
      let rotate = 0;
      let scale = 1;
      let opacity = 1;
      let zIndex = 10;
      let pointerEvents = "none";
      let cursor = "default";

      if (diff >= -0.04 && diff <= 0.04) {
        // Active Card: Center stage
        translateX = 0;
        translateYPercent = 0;
        translateYPx = 0;
        rotate = 0;
        scale = 1;
        opacity = 1;
        zIndex = 30;
        pointerEvents = "auto";
        cursor = "default";
      } else if (diff > 0.04) {
        // Upcoming card waiting in the stack behind on the left
        const clampedDiff = Math.min(diff, 4.0);
        const factor = Math.pow(clampedDiff, 0.78);
        translateX = -factor * baseShift;
        translateYPx = -clampedDiff * (isMobile ? 5 : 10);
        rotate = -clampedDiff * (isMobile ? 1.4 : 2.8);
        scale = Math.max(0.78, 1.0 - clampedDiff * 0.05);
        opacity = Math.max(0.25, 1.0 - clampedDiff * 0.18);
        zIndex = Math.max(1, Math.round(25 - clampedDiff * 4));
        pointerEvents = "auto"; // clickable to jump
        cursor = "pointer";
      } else {
        // diff < -0.04: Passed card exiting smoothly to top/left
        const exitProgress = Math.min(1.0, -diff);
        translateYPercent = -exitProgress * 105;
        translateX = -exitProgress * (baseShift * 0.6);
        rotate = -exitProgress * 2.5;
        scale = 1.0 - exitProgress * 0.04;
        opacity = Math.max(0, 1.0 - exitProgress * 1.3);
        zIndex = 35; // stays above while sliding away
        pointerEvents = "none";
        cursor = "default";
      }

      if (diff < -0.04) {
        cardEl.style.transform = `translate3d(${translateX}px, ${translateYPercent}%, 0px) rotate(${rotate}deg) scale(${scale})`;
      } else {
        cardEl.style.transform = `translate3d(${translateX}px, ${translateYPx}px, 0px) rotate(${rotate}deg) scale(${scale})`;
      }
      cardEl.style.opacity = `${opacity}`;
      cardEl.style.zIndex = `${zIndex}`;
      cardEl.style.pointerEvents = pointerEvents;
      cardEl.style.cursor = cursor;
    });
  }, [totalServices]);

  // Synchronize Scroll with Lenis and ScrollTrigger
  useEffect(() => {
    if (!trackRef.current) return;

    // Direct native scroll event handler for instant 0-lag tracking
    const handleScroll = () => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const scrollableDistance = rect.height - window.innerHeight;
      if (scrollableDistance > 0) {
        const p = Math.max(0, Math.min(1, -rect.top / scrollableDistance));
        updateCards(p);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // GSAP ScrollTrigger for seamless Lenis scrub synchronization
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: trackRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
        onUpdate: (self) => {
          updateCards(self.progress);
        },
      });
    }, trackRef);

    return () => {
      ctx.revert();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [updateCards]);

  // Smooth scroll to specific service when clicking vertical timeline or stacked card
  const scrollToService = (index: number) => {
    if (!trackRef.current) return;
    const track = trackRef.current;
    const rect = track.getBoundingClientRect();
    const scrollTop = window.scrollY + rect.top;
    const scrollableDistance = track.offsetHeight - window.innerHeight;
    const targetY = scrollTop + (index / (totalServices - 1)) * scrollableDistance + 10;

    if (typeof window !== "undefined" && window.__lenis) {
      window.__lenis.scrollTo(targetY, { duration: 1.2 });
    } else {
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  };

  // Subtle interactive mouse parallax for active card
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x: nx * 14, y: ny * 10 });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  return (
    <section
      ref={trackRef}
      id="capabilities"
      className="relative w-full bg-[#FAF7F2] border-b border-[#E3DAC8]"
      style={{ height: "460vh" }} // 460vh provides a comfortable, luxurious scroll journey
    >
      {/* Sticky Viewport Stage (Pinned Screen) */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between py-5 sm:py-7 lg:py-9 px-4 sm:px-8 lg:px-12 overflow-hidden select-none">
        {/* Subtle Ambient Gold Glow Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-1/4 right-1/4 w-[650px] h-[650px] rounded-full bg-radial from-[#F1E4C9]/45 via-[#F6ECE0]/15 to-transparent blur-3xl opacity-70" />
          <div className="absolute -bottom-16 left-1/4 w-[500px] h-[500px] rounded-full bg-radial from-[#EEDBC0]/35 to-transparent blur-3xl opacity-50" />
        </div>

        {/* =============================================================== */}
        {/* SECTION HEADER: Compact, Editorial & Architectural */}
        {/* =============================================================== */}
        <div className="relative z-20 max-w-7xl w-full mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2">
          <div>
            {/* Eyebrow: // OUR CAPABILITIES */}
            <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#9E7A45] uppercase block mb-1">
              {"//"} OUR CAPABILITIES
            </span>

            {/* Headline: Engineered for Scale & Speed */}
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#111111] tracking-tight leading-tight">
              Engineered for{" "}
              <span className="font-serif italic font-normal text-[#9E7A45]">
                Scale &amp; Speed
              </span>
            </h2>

            <p className="text-xs sm:text-[13.5px] text-[#666666] max-w-xl mt-1 leading-relaxed hidden sm:block">
              From luxury web design to cloud-native SaaS engineering, we deliver complete digital product solutions under one roof.
            </p>
          </div>

          {/* Right Indicator: SCROLL TO EXPLORE ↓ */}
          <div className="hidden md:flex items-center gap-3 text-xs font-mono tracking-widest text-[#888888] uppercase select-none self-end pb-1">
            <div className="w-12 h-[1px] bg-[#D4BD91]" />
            <span>SCROLL TO EXPLORE</span>
            <div className="w-6 h-6 rounded-full border border-[#D5CAA8] bg-white flex items-center justify-center text-[#9E7A45] shadow-2xs">
              <ArrowDown className="w-3 h-3 animate-bounce" />
            </div>
          </div>
        </div>

        {/* =============================================================== */}
        {/* PINNED SERVICE SHOWCASE: Stacked Cinematic Card Deck */}
        {/* =============================================================== */}
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative z-10 max-w-[1620px] w-full mx-auto flex-1 flex items-center justify-center my-auto py-2 pl-4 sm:pl-8 lg:pl-16 pr-2 sm:pr-4 lg:pr-8"
        >
          {/* Main Card Viewport Box */}
          <div className="relative w-[90vw] lg:w-[82vw] max-w-[1420px] h-[64vh] sm:h-[67vh] lg:h-[71vh] flex items-center justify-center">
            {servicesData.map((service, idx) => {
              const isCurrentActive = idx === activeIndex;

              return (
                <div
                  key={service.id}
                  ref={(el) => {
                    cardRefs.current[idx] = el;
                  }}
                  onClick={() => {
                    if (idx !== activeIndex) {
                      scrollToService(idx);
                    }
                  }}
                  className="absolute inset-0 w-full h-full rounded-[28px] sm:rounded-[36px] overflow-hidden border border-[#E3DAC8] bg-[#FAF7F2] shadow-[0_25px_65px_-15px_rgba(0,0,0,0.12),0_10px_35px_rgba(184,138,69,0.06)] select-none will-change-transform flex flex-col justify-between"
                  style={{
                    // Initial positions before first scroll tick
                    transform:
                      idx === 0
                        ? "translate3d(0px, 0px, 0px) rotate(0deg) scale(1)"
                        : `translate3d(-${Math.pow(idx, 0.78) * 48}px, -${idx * 10}px, 0px) rotate(-${idx * 2.8}deg) scale(${1 - idx * 0.05})`,
                    opacity: idx === 0 ? 1 : Math.max(0.25, 1 - idx * 0.18),
                    zIndex: idx === 0 ? 30 : 25 - idx * 4,
                  }}
                >
                  {/* Exposed Stack Tab / Indicator (clearly visible when card peeks out on the left in the stack) */}
                  <div className="absolute left-3.5 sm:left-5 top-7 sm:top-9 z-30 pointer-events-none">
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border flex items-center justify-center shadow-xs transition-all duration-300 ${
                        isCurrentActive
                          ? "bg-[#B08D57] text-white border-[#9E7A45] scale-100"
                          : "bg-white/95 text-[#8C6D3B] border-[#D5CAA8] scale-105"
                      }`}
                    >
                      <span className="text-[10px] sm:text-xs font-mono font-extrabold tracking-wider">
                        {service.number}
                      </span>
                    </div>
                  </div>

                  {/* 1. Full-Bleed 3D Background Visual with Subtle Mouse Parallax */}
                  <div
                    className="absolute inset-0 overflow-hidden pointer-events-none transition-transform duration-500 ease-out"
                    style={{
                      transform: isCurrentActive
                        ? `scale(1.05) translate3d(${-mouseOffset.x * 0.8}px, ${-mouseOffset.y * 0.8}px, 0px)`
                        : "scale(1.02)",
                    }}
                  >
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      priority={idx <= 1}
                      sizes="(max-width: 1600px) 100vw, 1600px"
                      className="object-cover object-center"
                    />

                    {/* Editorial Gradient Overlays (preserves crisp left-side text readability) */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#FAF7F2]/95 via-[#FAF7F2]/75 to-transparent w-full md:w-[65%] lg:w-[52%] z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F2]/90 via-transparent to-[#FAF7F2]/25 z-10" />
                    <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/10 z-10" />
                  </div>

                  {/* 2. Floating Live Metric Badges (Top Right) */}
                  <ServiceFloatingBadges service={service} />

                  {/* 3. Foreground Left Editorial Content Panel */}
                  <div
                    className="relative z-20 p-7 sm:p-10 lg:p-14 pl-14 sm:pl-16 lg:pl-18 max-w-xl lg:max-w-2xl flex flex-col justify-between h-full pointer-events-auto transition-transform duration-300 ease-out"
                    style={{
                      transform: isCurrentActive
                        ? `translate3d(${mouseOffset.x * 0.5}px, ${mouseOffset.y * 0.5}px, 0px)`
                        : "translate3d(0, 0, 0)",
                    }}
                  >
                    <div>
                      {/* Top Pill: 01 / 05 — SERVICE CATEGORY */}
                      <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#D5CAA8] text-[10.5px] font-mono tracking-widest text-[#8C6D3B] font-bold uppercase shadow-2xs mb-5 sm:mb-7">
                        <span>{service.number} / 05</span>
                        <span className="text-[#C5B496]">•</span>
                        <span>{service.categoryTag}</span>
                      </div>

                      {/* Large Bold Editorial Title */}
                      <h3 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#111111] tracking-tight leading-[1.1] whitespace-pre-line mb-3.5 sm:mb-4">
                        {service.title}
                      </h3>

                      {/* Service Description */}
                      <p className="text-xs sm:text-[14px] text-[#555555] leading-relaxed max-w-lg mb-6 sm:mb-7">
                        {service.description}
                      </p>

                      {/* 3 Key Capabilities with Gold Hex Badges */}
                      <div className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
                        {service.capabilities.slice(0, 3).map((item, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-[#FAF5EC] border border-[#E3DAC8] flex items-center justify-center text-[#9E7A45] shrink-0 shadow-2xs">
                              <Check className="w-3 h-3 stroke-[2.5]" />
                            </div>
                            <span className="text-xs sm:text-[13.5px] font-medium text-[#222222]">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom CTA Row & Architecture Tags */}
                    <div className="pt-3.5 border-t border-[#DCD4C5]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <Link
                        href="/services"
                        className="inline-flex items-center gap-2.5 text-xs font-mono tracking-widest text-[#111111] hover:text-[#9E7A45] font-bold uppercase transition-colors group"
                      >
                        <span>EXPLORE SERVICE</span>
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-[#D5CAA8] bg-white flex items-center justify-center text-[#111111] group-hover:border-[#111111] group-hover:bg-[#111111] group-hover:text-white transition-all shadow-2xs">
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </Link>

                      {/* Bottom Tags */}
                      <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.2em] text-[#888888] uppercase">
                        <span className="text-[#9E7A45]">➤</span>
                        <span>{service.tags.join("  /  ")}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ============================================================= */}
          {/* RIGHT VERTICAL TIMELINE NAVIGATION (01 - 05) */}
          {/* ============================================================= */}
          <div className="hidden lg:flex flex-col items-center gap-5 ml-6 xl:ml-10 select-none z-30">
            {/* Subtle connecting vertical line */}
            <div className="relative flex flex-col items-center gap-6">
              <div className="absolute top-2 bottom-2 w-[1px] bg-[#E0D7C4] -z-10" />

              {servicesData.map((item, i) => {
                const isActive = i === activeIndex;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToService(i)}
                    className="group flex items-center gap-3 focus:outline-hidden transition-all duration-300 cursor-pointer"
                    aria-label={`Jump to service ${item.number}`}
                  >
                    <div className="relative flex items-center justify-center">
                      {/* Active Golden Target Ring */}
                      <div
                        className={`w-6 h-6 rounded-full border transition-all duration-300 flex items-center justify-center ${
                          isActive
                            ? "border-[#B08D57] bg-white scale-110 shadow-xs"
                            : "border-[#DCD4C5] bg-[#FAF7F2] group-hover:border-[#D4BD91]"
                        }`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            isActive
                              ? "bg-[#B08D57] scale-100"
                              : "bg-[#D4CEBF] group-hover:bg-[#9E7A45]"
                          }`}
                        />
                      </div>
                    </div>

                    <span
                      className={`text-xs font-mono font-bold transition-colors duration-200 ${
                        isActive
                          ? "text-[#111111]"
                          : "text-[#AAAAAA] group-hover:text-[#666666]"
                      }`}
                    >
                      {item.number}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* =============================================================== */}
        {/* BOTTOM METRICS PROGRESS BAR */}
        {/* =============================================================== */}
        <div className="relative z-20 max-w-7xl w-full mx-auto pt-3 border-t border-[#E3DAC8]/70 flex items-center justify-between text-xs font-mono text-[#888888] select-none">
          <div className="flex items-center gap-2">
            <span className="text-[#111111] font-bold">
              0{activeIndex + 1}
            </span>
            <span className="text-[#C5B496]">/</span>
            <span>05</span>
            <span className="mx-2 text-[#D8CEB8]">|</span>
            <span className="uppercase text-[#555555] font-semibold hidden sm:inline">
              {servicesData[activeIndex].title.replace("\n", " ")}
            </span>
          </div>

          {/* Interactive Progress Line */}
          <div className="w-32 sm:w-48 h-1 rounded-full bg-[#E5DEC9] overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#B08D57] to-[#D4BD91] transition-all duration-200"
              style={{ width: `${((activeIndex + 1) / totalServices) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
