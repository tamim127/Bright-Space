"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BankingBento() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".bento-item-card");

      gsap.fromTo(
        cards,
        { y: 50, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-20 sm:py-28 bg-[#F3EFE6] text-[#111111] font-sans relative overflow-hidden border-t border-[#DCD4C5] select-none"
    >
      {/* Background Subtle Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-grid-pattern" />

      <div className="max-w-[1360px] mx-auto px-6 relative z-10 space-y-12">
        {/* Intro Headline Text (Matching Screenshot) */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-mono uppercase tracking-[0.22em] text-[#B08D57] font-bold">
            {"/// PROVEN REPUTATION & RESULTS"}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111111] tracking-tight leading-tight">
            We Help Brands Grow, Build Trust, and{" "}
            <span className="font-serif italic text-gradient-accent">
              Achieve Meaningful Results
            </span>
          </h2>
          <p className="text-sm sm:text-base text-[#555555] max-w-xl mx-auto font-light leading-relaxed">
            A verified track record of transforming high-growth ventures into authoritative digital industry leaders.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* BENTO GRID (Exact Match to User Reference Screenshot) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6">
          {/* ----------------------------------------------------------------------- */}
          {/* 1. TOP-LEFT CARD: SARAH MITCHELL TESTIMONIAL & 5.0 RATINGS (6 COLS) */}
          {/* ----------------------------------------------------------------------- */}
          <div className="bento-item-card md:col-span-6 rounded-[32px] sm:rounded-[36px] bg-white border border-[#DCD4C5] p-7 sm:p-10 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-[#B08D57] transition-all duration-300">
            <div>
              {/* Red/Terracotta Quotation Mark */}
              <div className="text-4xl sm:text-5xl font-serif text-[#E85D34] font-bold leading-none select-none">
                “
              </div>

              {/* Quote Body */}
              <p className="text-base sm:text-lg md:text-[17px] text-[#222222] font-medium leading-relaxed mt-4 sm:mt-5 mb-8 sm:mb-12">
                Working with Bright Space transformed our digital presence. Their strategic approach, creative execution, and attention to detail exceeded our expectations at every stage of the project.
              </p>
            </div>

            {/* Profile Footer */}
            <div className="flex items-center justify-between pt-6 border-t border-[#DCD4C5]/40">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full overflow-hidden relative border border-[#DCD4C5] shadow-xs">
                  <Image
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop"
                    alt="Sarah Mitchell"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-[#111111] leading-tight">
                    Sarah Mitchell
                  </h4>
                  <p className="text-xs text-[#777777] font-medium mt-0.5">
                    Marketing Director
                  </p>
                </div>
              </div>

              {/* 5-Star Rating & 5.0 Badge */}
              <div className="text-right">
                <div className="flex items-center gap-0.5 text-[#111111] justify-end">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#111111] text-[#111111]" />
                  ))}
                </div>
                <div className="text-sm font-bold text-[#111111] mt-1">
                  5.0 <span className="font-normal text-xs text-[#777777]">Ratings</span>
                </div>
              </div>
            </div>
          </div>

          {/* ----------------------------------------------------------------------- */}
          {/* 2. TOP-RIGHT CARD: 98% SATISFACTION + VIBRANT GRADIENT & FLOATING CARDS (6 COLS) */}
          {/* ----------------------------------------------------------------------- */}
          <div className="bento-item-card md:col-span-6 rounded-[32px] sm:rounded-[36px] bg-white border border-[#DCD4C5] overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-[#B08D57] transition-all duration-300 relative group">
            {/* Top Fluid Radiant Gradient Area with Floating Dark Framed Mockups */}
            <div className="relative w-full h-44 sm:h-52 overflow-hidden bg-gradient-to-tr from-[#FFF2DE] via-[#FFDCB0] to-[#FF4E18]/80">
              {/* Ambient radial blur glows inside */}
              <div className="absolute -top-10 left-10 w-44 h-44 bg-[#FFC340] rounded-full blur-2xl opacity-80" />
              <div className="absolute top-0 right-10 w-52 h-52 bg-[#FF4500] rounded-full blur-2xl opacity-70" />

              {/* Floating Angled Dark Cards (Matches Reference Image) */}
              <div className="absolute top-6 right-6 sm:right-10 flex items-center gap-3">
                {/* Frame 1 (Tilted Left) */}
                <div className="w-24 sm:w-28 h-28 sm:h-32 rounded-xl bg-black p-1 border-[3px] border-black shadow-2xl -rotate-6 transform hover:-rotate-2 transition-transform duration-300 overflow-hidden relative">
                  <Image
                    src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop"
                    alt="Product preview 1"
                    fill
                    className="object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                </div>

                {/* Frame 2 (Tilted Right) */}
                <div className="w-24 sm:w-28 h-28 sm:h-32 rounded-xl bg-black p-1 border-[3px] border-black shadow-2xl rotate-6 transform hover:rotate-2 transition-transform duration-300 overflow-hidden relative -ml-4 z-10">
                  <Image
                    src="https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=400&auto=format&fit=crop"
                    alt="Product preview 2"
                    fill
                    className="object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Bottom Content Area */}
            <div className="p-7 sm:p-10 pt-6">
              <div className="text-5xl sm:text-6xl font-extrabold text-[#111111] tracking-tight font-sans">
                98%
              </div>
              <p className="text-xs sm:text-sm text-[#555555] font-medium mt-2 leading-relaxed max-w-[290px]">
                Client Satisfaction Built Through Consistent Results
              </p>
            </div>
          </div>

          {/* ----------------------------------------------------------------------- */}
          {/* 3. BOTTOM-LEFT CARD: 150+ PROJECTS DELIVERED & PASTEL 3D FLUID (3 COLS) */}
          {/* ----------------------------------------------------------------------- */}
          <div className="bento-item-card md:col-span-6 lg:col-span-3 rounded-[32px] sm:rounded-[36px] bg-white border border-[#DCD4C5] overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-[#B08D57] transition-all duration-300 relative group">
            {/* Top Soft Pastel/Champagne Fluid 3D Visual */}
            <div className="relative w-full h-44 sm:h-52 overflow-hidden bg-gradient-to-b from-[#F9EBF4] via-[#F3EFE6] to-white">
              <Image
                src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=500&auto=format&fit=crop"
                alt="3D Fluid Silk Art"
                fill
                className="object-cover object-center mix-blend-multiply opacity-85 group-hover:scale-105 transition-transform duration-500"
              />
              {/* Smooth Bottom Gradient Fade into Card */}
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white via-white/80 to-transparent" />
            </div>

            {/* Bottom Content Area */}
            <div className="p-7 sm:p-8 pt-2">
              <div className="text-4xl sm:text-5xl font-extrabold text-[#111111] tracking-tight font-sans">
                150+
              </div>
              <p className="text-xs sm:text-sm text-[#555555] font-medium mt-2 leading-relaxed">
                Projects Delivered Across Multiple Industries.
              </p>
            </div>
          </div>

          {/* ----------------------------------------------------------------------- */}
          {/* 4. BOTTOM-CENTER CARD: DAVID CARTER COMPACT TESTIMONIAL (3 COLS) */}
          {/* ----------------------------------------------------------------------- */}
          <div className="bento-item-card md:col-span-6 lg:col-span-3 rounded-[32px] sm:rounded-[36px] bg-white border border-[#DCD4C5] p-7 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-[#B08D57] transition-all duration-300">
            <div>
              {/* Red/Terracotta Quotation Mark */}
              <div className="text-4xl sm:text-5xl font-serif text-[#E85D34] font-bold leading-none select-none">
                “
              </div>

              {/* Quote Body */}
              <p className="text-sm sm:text-[15px] text-[#222222] font-medium leading-relaxed mt-4 mb-6">
                The team delivered exceptional work on time and helped us create a stronger brand identity.
              </p>
            </div>

            {/* Profile Footer */}
            <div className="flex items-center gap-3 pt-4 border-t border-[#DCD4C5]/40">
              <div className="w-10 h-10 rounded-full overflow-hidden relative border border-[#DCD4C5] shrink-0">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop"
                  alt="David Carter"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#111111] leading-tight">
                  David Carter
                </h4>
                <p className="text-[11px] text-[#777777] font-medium mt-0.5">
                  Founder & CEO
                </p>
              </div>
            </div>
          </div>

          {/* ----------------------------------------------------------------------- */}
          {/* 5. BOTTOM-RIGHT CARD: TRUSTED BY 50+ BRANDS & SCENIC MEADOW (6 COLS) */}
          {/* ----------------------------------------------------------------------- */}
          <div className="bento-item-card md:col-span-12 lg:col-span-6 rounded-[32px] sm:rounded-[36px] bg-white border border-[#DCD4C5] overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-[#B08D57] transition-all duration-300 relative group">
            {/* Top Scenic Landscape / Meadow Texture */}
            <div className="relative w-full h-44 sm:h-52 overflow-hidden bg-[#FAF7F2]">
              <Image
                src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=900&auto=format&fit=crop"
                alt="Scenic Natural Texture"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              {/* Soft Gradient Fade to White */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white via-white/80 to-transparent" />
            </div>

            {/* Bottom Content Area with Action Arrow Button */}
            <div className="p-7 sm:p-10 pt-2 flex items-end justify-between gap-6">
              <div className="space-y-2 max-w-lg">
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#111111] tracking-tight leading-snug">
                  Trusted By 50+ Brands Across Diverse Industries
                </h3>
                <p className="text-xs sm:text-sm text-[#555555] leading-relaxed font-light">
                  From startups to established companies, businesses trust Bright Space to create impactful digital experiences that drive growth.
                </p>
              </div>

              {/* Circular Action Arrow Button */}
              <Link
                href="/work"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#DCD4C5] bg-white hover:bg-[#111111] hover:text-white flex items-center justify-center text-[#111111] transition-all duration-300 shadow-xs shrink-0 cursor-pointer group/btn"
                aria-label="View Projects"
              >
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
