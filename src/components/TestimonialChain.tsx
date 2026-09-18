"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ChevronLeft, ChevronRight, Quote, Sparkles } from "lucide-react";

interface TestimonialItem {
  id: number;
  metric: string;
  metricLabel: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  image: string;
}

const testimonialsData: TestimonialItem[] = [
  {
    id: 1,
    metric: "3.4×",
    metricLabel: "More Demos Booked",
    quote:
      "ARTISAN transformed our product interface entirely. The particle interactions and micro-animations brought our SaaS platform to life, doubling our user retention rate within 60 days.",
    author: "Elena Rostova",
    role: "VP of Product",
    company: "Veloce Systems",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    metric: "40 hrs",
    metricLabel: "Saved Per Month",
    quote:
      "The engineering depth and design polish delivered were world-class. They didn't just build UI—they architected a complete design system that scaled our entire product line.",
    author: "Marcus Chen",
    role: "Co-Founder & CTO",
    company: "Hyperion Labs",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    metric: "98.4%",
    metricLabel: "On-Time Delivery Rate",
    quote:
      "Execution speed was unreal. From initial concepts to production deployment, every iteration was crisp, performant, and visual perfection. Easily the best agency partner we've hired.",
    author: "Sophia Sterling",
    role: "Head of Growth",
    company: "Aether AI",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 4,
    metric: "$2.5M",
    metricLabel: "New ARR Pipeline Generated",
    quote:
      "Our new marketing app and interactive showcase directly drove high-ticket enterprise deals. The visual aesthetics wowed every buyer demo in our funnel.",
    author: "David Vance",
    role: "Chief Revenue Officer",
    company: "Apex Dynamics",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 5,
    metric: "12ms",
    metricLabel: "Ultra-Fast Load Speeds",
    quote:
      "Combining complex 3D shader scenes with zero performance lag seemed impossible until ARTISAN took on the project. Truly benchmark-defining work.",
    author: "Amara Patel",
    role: "Design Director",
    company: "Pulse Studio",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800",
  },
];

export default function TestimonialChain() {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = testimonialsData.length;

  // Refs for GSAP animations
  const cardRef = useRef<HTMLDivElement>(null);
  const metricRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const authorRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // Reliable Autoplay Loop (3.5s interval)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 3500);
    return () => clearInterval(timer);
  }, [total]);

  // GSAP Animation sequence whenever activeIndex changes
  useEffect(() => {
    if (!cardRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Active card container pop & scale animation
      tl.fromTo(
        cardRef.current,
        { scale: 0.94, opacity: 0.7, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.65, ease: "back.out(1.2)" }
      );

      // Staggered text & content reveal
      if (metricRef.current) {
        tl.fromTo(
          metricRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          "-=0.4"
        );
      }

      if (quoteRef.current) {
        tl.fromTo(
          quoteRef.current,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          "-=0.35"
        );
      }

      if (authorRef.current) {
        tl.fromTo(
          authorRef.current,
          { x: -20, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.45 },
          "-=0.3"
        );
      }

      // Right image zoom-in reveal
      if (imageRef.current) {
        tl.fromTo(
          imageRef.current,
          { scale: 1.15, opacity: 0.5 },
          { scale: 1, opacity: 1, duration: 0.7, ease: "power2.out" },
          "-=0.6"
        );
      }
    });

    return () => ctx.revert();
  }, [activeIndex]);

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % total);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + total) % total);

  // Helper to get testimonial at relative offset
  const getTestimonialAt = (offset: number) => {
    const index = (activeIndex + offset + total * 10) % total;
    return { item: testimonialsData[index], index };
  };

  const active = testimonialsData[activeIndex];
  const prev1 = getTestimonialAt(-1);
  const prev2 = getTestimonialAt(-2);
  const next1 = getTestimonialAt(1);
  const next2 = getTestimonialAt(2);

  return (
    <section className="min-h-screen w-full relative flex flex-col justify-between py-10 px-4 md:px-12 bg-[#07070A] overflow-hidden text-white select-none">
      {/* Ambient background glow mesh */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[950px] h-[650px] bg-gradient-to-tr from-[#6C63FF]/20 via-[#00E5FF]/15 to-[#3B82F6]/10 blur-[140px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-[#FF6B6B]/10 blur-[150px] rounded-full pointer-events-none z-0" />

      {/* Header Section */}
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-3 pt-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-[#00E5FF]" />
          <span className="text-xs font-mono text-[#00E5FF] tracking-widest uppercase font-semibold">
            {"/// CLIENT TESTIMONIALS"}
          </span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
          Trusted by <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] via-[#6C63FF] to-[#FF6B6B]">Product Leaders</span>
        </h2>
        <p className="text-sm md:text-base text-neutral-400 max-w-xl mx-auto">
          Here is what founders, engineering VPs, and design leaders say about building with ARTISAN.
        </p>
      </div>

      {/* Testimonial Chain Row */}
      <div className="relative z-10 w-full my-auto py-4 flex items-center justify-center gap-3 sm:gap-6 lg:gap-8 overflow-visible min-h-[500px]">
        {/* Navigation Buttons (Desktop) */}
        <button
          onClick={handlePrev}
          aria-label="Previous Testimonial"
          className="hidden md:flex absolute left-4 z-30 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 border border-white/15 backdrop-blur-md items-center justify-center text-white transition-all hover:scale-110 active:scale-95 shadow-lg cursor-pointer"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={handleNext}
          aria-label="Next Testimonial"
          className="hidden md:flex absolute right-4 z-30 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 border border-white/15 backdrop-blur-md items-center justify-center text-white transition-all hover:scale-110 active:scale-95 shadow-lg cursor-pointer"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Outer Left Side Pill (-2) */}
        <div
          onClick={() => setActiveIndex(prev2.index)}
          className="hidden xl:block w-28 h-[360px] rounded-[30px] overflow-hidden border-[4px] border-white/80 shadow-2xl cursor-pointer hover:opacity-80 transition-all duration-500 hover:scale-105 shrink-0 relative group opacity-35 scale-65"
        >
          <img
            src={prev2.item.image}
            alt={prev2.item.author}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
            <span className="text-xs font-semibold text-white/90 truncate">{prev2.item.author}</span>
          </div>
        </div>

        {/* Inner Left Side Pill (-1) */}
        <div
          onClick={() => setActiveIndex(prev1.index)}
          className="hidden sm:block w-36 lg:w-44 h-[430px] rounded-[32px] overflow-hidden border-[4px] border-white shadow-2xl cursor-pointer hover:opacity-95 transition-all duration-500 hover:scale-90 shrink-0 relative group z-10 opacity-75 scale-80"
        >
          <img
            src={prev1.item.image}
            alt={prev1.item.author}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
            <span className="text-xs font-mono text-[#00E5FF] uppercase font-bold">{prev1.item.metric}</span>
            <span className="text-sm font-bold text-white truncate">{prev1.item.author}</span>
            <span className="text-[11px] text-white/70 truncate">{prev1.item.company}</span>
          </div>
        </div>

        {/* ACTIVE MAIN CARD (GSAP Animated) */}
        <div
          ref={cardRef}
          className="w-full max-w-3xl lg:max-w-4xl min-h-[460px] md:min-h-[500px] bg-[#ECEBE7] text-neutral-900 rounded-[36px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] p-6 md:p-10 flex flex-col md:flex-row gap-6 md:gap-8 justify-between relative overflow-hidden z-20 shrink-0"
        >
          {/* Left Content Column */}
          <div className="flex-1 flex flex-col justify-between space-y-6">
            <div>
              {/* Metric Header */}
              <div ref={metricRef} className="mb-4">
                <div className="inline-flex items-baseline gap-2">
                  <span className="text-4xl md:text-6xl font-extrabold tracking-tight text-neutral-900 font-sans">
                    {active.metric}
                  </span>
                  <span className="text-xs md:text-sm font-mono uppercase tracking-wider text-neutral-500 font-bold">
                    {active.metricLabel}
                  </span>
                </div>
              </div>

              {/* Quote Body */}
              <div className="relative">
                <Quote className="w-8 h-8 text-neutral-300 absolute -top-4 -left-2 -z-10" />
                <p
                  ref={quoteRef}
                  className="text-base md:text-xl text-neutral-800 font-medium leading-relaxed tracking-tight font-serif italic"
                >
                  &ldquo;{active.quote}&rdquo;
                </p>
              </div>
            </div>

            {/* Author Info with Left Accent Line */}
            <div
              ref={authorRef}
              className="flex items-center gap-4 pt-4 border-l-2 border-neutral-900 pl-4 mt-auto"
            >
              <img
                src={active.avatar}
                alt={active.author}
                className="w-12 h-12 rounded-full object-cover border border-neutral-300 shadow-md"
              />
              <div>
                <h4 className="text-base font-extrabold text-neutral-900 tracking-tight">
                  {active.author}
                </h4>
                <p className="text-xs md:text-sm text-neutral-600 font-medium">
                  {active.role} &bull; <span className="text-neutral-900 font-semibold">{active.company}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Full-Height Portrait Card */}
          <div
            ref={imageRef}
            className="w-full md:w-[42%] h-64 md:h-auto rounded-[28px] overflow-hidden relative shadow-lg group shrink-0"
          >
            <img
              src={active.image}
              alt={active.author}
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            {/* Overlay Gradient & Logo Badge */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-5">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                <div className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
                <span className="text-xs font-bold text-white tracking-wide uppercase">
                  {active.company}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Inner Right Side Pill (+1) */}
        <div
          onClick={() => setActiveIndex(next1.index)}
          className="hidden sm:block w-36 lg:w-44 h-[430px] rounded-[32px] overflow-hidden border-[4px] border-white shadow-2xl cursor-pointer hover:opacity-95 transition-all duration-500 hover:scale-90 shrink-0 relative group z-10 opacity-75 scale-80"
        >
          <img
            src={next1.item.image}
            alt={next1.item.author}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
            <span className="text-xs font-mono text-[#00E5FF] uppercase font-bold">{next1.item.metric}</span>
            <span className="text-sm font-bold text-white truncate">{next1.item.author}</span>
            <span className="text-[11px] text-white/70 truncate">{next1.item.company}</span>
          </div>
        </div>

        {/* Outer Right Side Pill (+2) */}
        <div
          onClick={() => setActiveIndex(next2.index)}
          className="hidden xl:block w-28 h-[360px] rounded-[30px] overflow-hidden border-[4px] border-white/80 shadow-2xl cursor-pointer hover:opacity-80 transition-all duration-500 hover:scale-105 shrink-0 relative group opacity-35 scale-65"
        >
          <img
            src={next2.item.image}
            alt={next2.item.author}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
            <span className="text-xs font-semibold text-white/90 truncate">{next2.item.author}</span>
          </div>
        </div>
      </div>

      {/* Bottom Story Pagination Dots & Controls */}
      <div className="relative z-10 flex flex-col items-center gap-4 pb-2">
        <div className="flex items-center gap-2.5">
          {testimonialsData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`transition-all duration-500 ${
                idx === activeIndex
                  ? "w-10 h-2.5 bg-gradient-to-r from-[#00E5FF] to-[#6C63FF] rounded-full shadow-[0_0_15px_rgba(0,229,255,0.7)]"
                  : "w-2.5 h-2.5 bg-white/30 hover:bg-white/70 rounded-full cursor-pointer"
              }`}
            />
          ))}
        </div>

        {/* Mobile Navigation Arrows */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-xs font-mono text-neutral-400">
            {activeIndex + 1} / {total}
          </span>
          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
