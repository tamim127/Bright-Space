"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Target,
  TrendingUp,
  Eye,
  BarChart3,
  Play,
  X,
  Star,
  Sparkles,
} from "lucide-react";

interface TestimonialStory {
  id: string;
  clientBrand: string;
  quote: string;
  author: string;
  role: string;
  avatar: string;
  metrics: {
    label: string;
    value: string;
  }[];
}

const stories: TestimonialStory[] = [
  {
    id: "growthly-nexus",
    clientBrand: "NEXUS SYSTEMS",
    quote:
      "Their expertise helped us refine our product experience and significantly improve performance. The process became faster, clearer, and far more efficient — exactly what a modern digital team needs.",
    author: "Alex Morgan",
    role: "Product Lead at Growthly",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    metrics: [
      { label: "Conversion Rate", value: "+43%" },
      { label: "User engagement", value: "+18%" },
      { label: "Bounce rate", value: "-84%" },
    ],
  },
  {
    id: "horizon-capital",
    clientBrand: "HORIZON CAPITAL",
    quote:
      "Working with Bright Space elevated our venture platform into an elite tier. We doubled qualified inbound investor pitches in 90 days with zero operational latency.",
    author: "Elena Rostova",
    role: "Partner & Head of Product",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
    metrics: [
      { label: "Inbound Flow", value: "+2.4x" },
      { label: "Page Load Speed", value: "99/100" },
      { label: "Pipeline Velocity", value: "+65%" },
    ],
  },
];

export default function WhyUsSection() {
  const [activeStoryIdx, setActiveStoryIdx] = useState(0);
  const [showVideoModal, setShowVideoModal] = useState(false);

  const currentStory = stories[activeStoryIdx];

  const handlePrev = () => {
    setActiveStoryIdx((prev) => (prev === 0 ? stories.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveStoryIdx((prev) => (prev === stories.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-24 sm:py-28 bg-[#F3EFE6] text-[#111111] font-sans relative overflow-hidden select-none border-t border-[#DCD4C5]">
      {/* Subtle Background Grid & Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-grid-pattern" />

      <div className="max-w-[1360px] mx-auto px-6 relative z-10 space-y-12">
        {/* ========================================================================= */}
        {/* HEADER: "Why us ✩" (Matches Reference Image) */}
        {/* ========================================================================= */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#DCD4C5] shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#B08D57]" />
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#B08D57] font-bold">
                {"/// BUILT DIFFERENT"}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#111111] tracking-tight">
                Why us
              </h2>
              {/* Star Badge Icon Superscript */}
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg border border-[#111111] flex items-center justify-center text-[#111111] mt-1 shadow-xs">
                <Star className="w-4 h-4 fill-[#111111] text-[#111111]" />
              </div>
            </div>
          </div>

          <p className="text-sm sm:text-base text-[#555555] max-w-md font-light leading-relaxed">
            We combine high-end aesthetic taste with strict software engineering discipline to deliver exceptional digital products.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* TOP HERO TESTIMONIAL & METRIC CARD */}
        {/* ========================================================================= */}
        <div className="rounded-[32px] sm:rounded-[36px] bg-[#FAF7F2] border border-[#DCD4C5] p-6 sm:p-10 md:p-12 shadow-sm relative transition-all duration-300 hover:shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Column: Brand Logo + Author Profile */}
            <div className="lg:col-span-3 flex flex-col justify-between space-y-6">
              {/* Client Brand Logo Pill */}
              <div>
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white border border-[#DCD4C5] shadow-xs">
                  <div className="w-4 h-4 rounded-sm bg-[#B08D57] flex items-center justify-center">
                    <span className="text-[9px] font-black text-white">B</span>
                  </div>
                  <span className="text-xs font-mono font-bold tracking-wider text-[#111111] uppercase">
                    {currentStory.clientBrand}
                  </span>
                </div>
              </div>

              {/* Author Profile */}
              <div className="space-y-1">
                <h4 className="text-base font-bold text-[#111111] leading-tight">
                  {currentStory.author}
                </h4>
                <p className="text-xs text-[#777777] font-medium">
                  {currentStory.role}
                </p>
              </div>
            </div>

            {/* Right Column: Quotes + Navigation + 3 Metric Chips */}
            <div className="lg:col-span-9 flex flex-col justify-between space-y-8">
              {/* Top Row: Quote Icon + Arrows */}
              <div className="flex items-center justify-between">
                {/* Quotation Icon Badge */}
                <div className="w-10 h-10 rounded-xl bg-white border border-[#DCD4C5] flex items-center justify-center text-[#111111] shadow-xs font-serif text-2xl font-bold leading-none select-none">
                  “
                </div>

                {/* Prev / Next Pagination Arrow Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    aria-label="Previous Story"
                    className="w-9 h-9 rounded-full bg-white hover:bg-[#111111] hover:text-white border border-[#DCD4C5] flex items-center justify-center text-[#111111] transition-all cursor-pointer shadow-xs active:scale-95"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Next Story"
                    className="w-9 h-9 rounded-full bg-white hover:bg-[#111111] hover:text-white border border-[#DCD4C5] flex items-center justify-center text-[#111111] transition-all cursor-pointer shadow-xs active:scale-95"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Main Statement Quote */}
              <blockquote className="text-xl sm:text-2xl md:text-3xl font-normal text-[#111111] leading-relaxed tracking-tight font-sans">
                {currentStory.quote}
              </blockquote>

              {/* Bottom 3 Verified Metric Pill Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-2">
                {currentStory.metrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-[#DCD4C5] p-4 flex flex-col justify-between shadow-2xs hover:border-[#B08D57] transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-[#777777]">
                        {metric.label}
                      </span>
                      {/* Dark Checkmark in Circle */}
                      <div className="w-4 h-4 rounded-full bg-[#111111] flex items-center justify-center text-white shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                    </div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-[#111111] font-mono tracking-tight">
                      {metric.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BOTTOM ROW: 2x2 STRATEGIC PILLARS (LEFT) + LARGE SHOWREEL CARD (RIGHT) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          {/* Left: 2x2 Feature Cards (6 Cols) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Card 1: Strategic Thinking */}
            <div className="rounded-3xl bg-[#FAF7F2] border border-[#DCD4C5] p-6 sm:p-7 flex flex-col justify-between min-h-[170px] sm:min-h-[190px] shadow-2xs hover:border-[#B08D57] transition-all hover:bg-white group">
              <div className="flex justify-end">
                <div className="w-8 h-8 rounded-full border border-[#DCD4C5] bg-white flex items-center justify-center text-[#B08D57] group-hover:scale-110 transition-transform">
                  <Target className="w-4 h-4" />
                </div>
              </div>
              <p className="text-sm sm:text-base font-bold text-[#111111] leading-snug">
                Strategic thinking
                <br />
                <span className="text-[#555555] font-normal">behind every decision</span>
              </p>
            </div>

            {/* Card 2: Design for Real Impact */}
            <div className="rounded-3xl bg-[#FAF7F2] border border-[#DCD4C5] p-6 sm:p-7 flex flex-col justify-between min-h-[170px] sm:min-h-[190px] shadow-2xs hover:border-[#B08D57] transition-all hover:bg-white group">
              <div className="flex justify-end">
                <div className="w-8 h-8 rounded-full border border-[#DCD4C5] bg-white flex items-center justify-center text-[#B08D57] group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-4 h-4" />
                </div>
              </div>
              <p className="text-sm sm:text-base font-bold text-[#111111] leading-snug">
                Design crafted for
                <br />
                <span className="text-[#555555] font-normal">real business impact</span>
              </p>
            </div>

            {/* Card 3: Pixel Perfection */}
            <div className="rounded-3xl bg-[#FAF7F2] border border-[#DCD4C5] p-6 sm:p-7 flex flex-col justify-between min-h-[170px] sm:min-h-[190px] shadow-2xs hover:border-[#B08D57] transition-all hover:bg-white group">
              <div className="flex justify-end">
                <div className="w-8 h-8 rounded-full border border-[#DCD4C5] bg-white flex items-center justify-center text-[#B08D57] group-hover:scale-110 transition-transform">
                  <Eye className="w-4 h-4" />
                </div>
              </div>
              <p className="text-sm sm:text-base font-bold text-[#111111] leading-snug">
                Obsessive precision
                <br />
                <span className="text-[#555555] font-normal">down to every pixel</span>
              </p>
            </div>

            {/* Card 4: Continuous Deployment & Floating Nav Preview */}
            <div className="rounded-3xl bg-[#FAF7F2] border border-[#DCD4C5] p-5 sm:p-6 flex flex-col justify-between min-h-[170px] sm:min-h-[190px] shadow-2xs hover:border-[#B08D57] transition-all hover:bg-white group overflow-hidden relative">
              <div className="flex justify-end">
                <div className="w-8 h-8 rounded-full border border-[#DCD4C5] bg-white flex items-center justify-center text-[#B08D57] group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-4 h-4" />
                </div>
              </div>

              {/* Floating Mini Navbar Pill (Matches Reference Image) */}
              <div className="mt-auto pt-2">
                <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-white border border-[#DCD4C5] shadow-xs text-[10px] font-mono text-[#111111] overflow-x-auto scrollbar-none">
                  <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-[#111111] text-white font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B08D57]" />
                    <span>BrightSpace</span>
                  </div>
                  <span className="px-1.5 py-0.5 text-[#555555]">Services</span>
                  <span className="px-1.5 py-0.5 text-[#555555]">Works</span>
                  <span className="px-1.5 py-0.5 text-[#555555]">About</span>
                  <span className="px-2 py-1 rounded-full bg-[#111111] text-white text-[9px] font-bold shrink-0">
                    Get in touch
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Large Collaborative Studio Showreel Card (6 Cols) */}
          <div className="lg:col-span-6 rounded-[32px] sm:rounded-[36px] overflow-hidden border border-[#DCD4C5] relative min-h-[340px] sm:min-h-[380px] group shadow-sm">
            {/* Background Studio Creative Photo */}
            <Image
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop"
              alt="Bright Space Creative Studio Collaboration"
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30 group-hover:bg-black/40 transition-colors" />

            {/* Center Interactive Showreel Button */}
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <button
                onClick={() => setShowVideoModal(true)}
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer group/btn"
              >
                <div className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center group-hover/btn:scale-110 transition-transform">
                  <Play className="w-3 h-3 fill-black ml-0.5" />
                </div>
                <span className="text-sm font-bold tracking-wide">Showreel</span>
              </button>
            </div>

            {/* Bottom Caption Pill */}
            <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between text-xs text-white/80 font-mono">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#B08D57] animate-pulse" />
                Studio Culture & Engineering
              </span>
              <span>2026 Reel</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SHOWREEL VIDEO MODAL */}
      {/* ========================================================================= */}
      {showVideoModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={() => setShowVideoModal(false)}
        >
          <div
            className="w-full max-w-4xl bg-black rounded-3xl border border-white/20 overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 px-6 border-b border-white/10 bg-[#111111]">
              <div className="flex items-center gap-2 text-white text-sm font-bold">
                <span className="w-2 h-2 rounded-full bg-[#B08D57]" />
                Bright Space • Creative Studio Showreel
              </div>
              <button
                onClick={() => setShowVideoModal(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Video Player */}
            <div className="relative aspect-video w-full bg-black">
              <video
                src="/hero-bg.mp4"
                controls
                autoPlay
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
