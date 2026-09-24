"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
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
      "Bright Space transformed our product interface entirely. The particle interactions and micro-animations brought our SaaS platform to life, doubling our user retention rate within 60 days.",
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
      "Working with Bright Space felt like hiring a dedicated principal engineering team. They solved complex cloud data pipelines while maintaining extreme aesthetic standards.",
    author: "Alexander Vance",
    role: "Founder & CEO",
    company: "Vanguard Tech",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
  },
];

export default function TestimonialChain() {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = testimonialsData.length;

  const activeCardRef = useRef<HTMLDivElement>(null);
  const metricRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const authorRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (activeCardRef.current) {
        gsap.fromTo(
          activeCardRef.current,
          { scale: 0.96, opacity: 0.8 },
          { scale: 1, opacity: 1, duration: 0.5, ease: "power2.out" }
        );
      }
      if (metricRef.current) {
        gsap.fromTo(
          metricRef.current,
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
        );
      }
      if (quoteRef.current) {
        gsap.fromTo(
          quoteRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, delay: 0.1, ease: "power2.out" }
        );
      }
      if (authorRef.current) {
        gsap.fromTo(
          authorRef.current,
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, delay: 0.2, ease: "power2.out" }
        );
      }
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { scale: 1.05, opacity: 0.8 },
          { scale: 1, opacity: 1, duration: 0.6, ease: "power2.out" }
        );
      }
    });

    return () => ctx.revert();
  }, [activeIndex]);

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % total);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + total) % total);

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
    <section className="min-h-screen w-full relative flex flex-col justify-between py-10 px-4 md:px-12 bg-[#F3EFE6] border-t border-[#DCD4C5] overflow-hidden text-[#111111] select-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[950px] h-[650px] bg-gradient-to-tr from-[#B08D57]/20 via-[#D4BD91]/15 to-transparent blur-[140px] rounded-full pointer-events-none z-0" />

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-3 pt-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#DCD4C5] backdrop-blur-md shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#B08D57]" />
          <span className="text-xs font-mono text-[#B08D57] tracking-widest uppercase font-bold">
            {"/// CLIENT TESTIMONIALS"}
          </span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#111111]">
          Trusted by <span className="font-serif italic text-gradient-accent">Product Leaders</span>
        </h2>
        <p className="text-sm md:text-base text-[#555555] max-w-xl mx-auto">
          Here is what founders, engineering VPs, and design leaders say about building with Bright Space.
        </p>
      </div>

      <div className="relative z-10 w-full my-auto py-4 flex items-center justify-center gap-3 sm:gap-6 lg:gap-8 overflow-visible min-h-[500px]">
        <button
          onClick={handlePrev}
          aria-label="Previous Testimonial"
          className="hidden md:flex absolute left-4 z-30 w-12 h-12 rounded-full bg-white hover:bg-[#FAF7F2] border border-[#DCD4C5] items-center justify-center text-[#111111] transition-all hover:scale-110 active:scale-95 shadow-md cursor-pointer"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={handleNext}
          aria-label="Next Testimonial"
          className="hidden md:flex absolute right-4 z-30 w-12 h-12 rounded-full bg-white hover:bg-[#FAF7F2] border border-[#DCD4C5] items-center justify-center text-[#111111] transition-all hover:scale-110 active:scale-95 shadow-md cursor-pointer"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <div
          onClick={() => setActiveIndex(prev2.index)}
          className="hidden xl:block w-28 h-[360px] rounded-[30px] overflow-hidden border-[4px] border-white shadow-xl cursor-pointer hover:opacity-80 transition-all duration-500 hover:scale-105 shrink-0 relative group opacity-35 scale-65"
        >
          <Image
            src={prev2.item.image}
            alt={prev2.item.author}
            fill
            sizes="112px"
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
            <span className="text-xs font-semibold text-white truncate">{prev2.item.author}</span>
          </div>
        </div>

        <div
          onClick={() => setActiveIndex(prev1.index)}
          className="hidden sm:block w-36 lg:w-44 h-[430px] rounded-[32px] overflow-hidden border-[4px] border-white shadow-2xl cursor-pointer hover:opacity-95 transition-all duration-500 hover:scale-90 shrink-0 relative group z-10 opacity-75 scale-80"
        >
          <Image
            src={prev1.item.image}
            alt={prev1.item.author}
            fill
            sizes="176px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
            <span className="text-xs font-mono text-[#B08D57] uppercase font-bold">{prev1.item.metric}</span>
            <span className="text-sm font-bold text-white truncate">{prev1.item.author}</span>
            <span className="text-[11px] text-white/70 truncate">{prev1.item.company}</span>
          </div>
        </div>

        <div
          ref={activeCardRef}
          className="w-full max-w-3xl md:h-[460px] rounded-[36px] bg-white border border-[#DCD4C5] p-6 sm:p-10 flex flex-col md:flex-row gap-6 md:gap-8 shadow-2xl relative z-20 shrink-0"
        >
          <div className="flex-1 flex flex-col justify-between space-y-6">
            <div>
              <div ref={metricRef} className="mb-4">
                <div className="inline-flex items-baseline gap-2">
                  <span className="text-4xl md:text-6xl font-extrabold tracking-tight text-[#111111] font-sans">
                    {active.metric}
                  </span>
                  <span className="text-xs md:text-sm font-mono uppercase tracking-wider text-[#B08D57] font-bold">
                    {active.metricLabel}
                  </span>
                </div>
              </div>

              <div className="relative">
                <Quote className="w-8 h-8 text-[#DCD4C5] absolute -top-4 -left-2 -z-10" />
                <p
                  ref={quoteRef}
                  className="text-base md:text-xl text-[#222222] font-medium leading-relaxed tracking-tight font-serif italic"
                >
                  &ldquo;{active.quote}&rdquo;
                </p>
              </div>
            </div>

            <div
              ref={authorRef}
              className="flex items-center gap-4 pt-4 border-l-2 border-[#B08D57] pl-4 mt-auto"
            >
              <Image
                src={active.avatar}
                alt={active.author}
                width={48}
                height={48}
                className="w-12 h-12 rounded-full object-cover border border-[#DCD4C5] shadow-md"
              />
              <div>
                <h4 className="text-base font-extrabold text-[#111111] tracking-tight">
                  {active.author}
                </h4>
                <p className="text-xs md:text-sm text-[#555555] font-medium">
                  {active.role} &bull; <span className="text-[#B08D57] font-bold">{active.company}</span>
                </p>
              </div>
            </div>
          </div>

          <div
            ref={imageRef}
            className="w-full md:w-[42%] h-64 md:h-auto rounded-[28px] overflow-hidden relative shadow-lg group shrink-0 border border-[#DCD4C5]"
          >
            <Image
              src={active.image}
              alt={active.author}
              fill
              sizes="(max-width: 768px) 100vw, 42%"
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-5">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20">
                <div className="w-2 h-2 rounded-full bg-[#B08D57] animate-pulse" />
                <span className="text-xs font-bold text-white tracking-wide uppercase">
                  {active.company}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          onClick={() => setActiveIndex(next1.index)}
          className="hidden sm:block w-36 lg:w-44 h-[430px] rounded-[32px] overflow-hidden border-[4px] border-white shadow-2xl cursor-pointer hover:opacity-95 transition-all duration-500 hover:scale-90 shrink-0 relative group z-10 opacity-75 scale-80"
        >
          <Image
            src={next1.item.image}
            alt={next1.item.author}
            fill
            sizes="176px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
            <span className="text-xs font-mono text-[#B08D57] uppercase font-bold">{next1.item.metric}</span>
            <span className="text-sm font-bold text-white truncate">{next1.item.author}</span>
            <span className="text-[11px] text-white/70 truncate">{next1.item.company}</span>
          </div>
        </div>

        <div
          onClick={() => setActiveIndex(next2.index)}
          className="hidden xl:block w-28 h-[360px] rounded-[30px] overflow-hidden border-[4px] border-white shadow-2xl cursor-pointer hover:opacity-80 transition-all duration-500 hover:scale-105 shrink-0 relative group opacity-35 scale-65"
        >
          <Image
            src={next2.item.image}
            alt={next2.item.author}
            fill
            sizes="112px"
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
            <span className="text-xs font-semibold text-white truncate">{next2.item.author}</span>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-4 pb-2">
        <div className="flex items-center gap-2.5">
          {testimonialsData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`transition-all duration-500 cursor-pointer ${idx === activeIndex
                  ? "w-10 h-2.5 bg-[#B08D57] rounded-full shadow-[0_0_15px_rgba(176,141,87,0.5)]"
                  : "w-2.5 h-2.5 bg-[#DCD4C5] hover:bg-[#B08D57] rounded-full"
                }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full bg-white border border-[#DCD4C5] flex items-center justify-center text-[#111111]"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-xs font-mono text-[#555555]">
            {activeIndex + 1} / {total}
          </span>
          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full bg-white border border-[#DCD4C5] flex items-center justify-center text-[#111111]"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
