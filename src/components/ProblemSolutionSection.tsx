"use client";

import { motion } from "framer-motion";
import { XCircle, CheckCircle2, AlertTriangle, ShieldCheck, Zap, Code, TrendingUp, Share } from "lucide-react";

const comparisonPoints = [
  {
    problem: "Outdated design templates & clunky UI that look like hundreds of other sites",
    solution: "Custom dark minimal luxury aesthetics engineered to command high market authority",
  },
  {
    problem: "Bloated page builders, slow load times (> 4s), and poor Lighthouse scores",
    solution: "Lightning-fast Next.js App Router & Server Components with < 300ms response times",
  },
  {
    problem: "Junior devs learning on your dime or agencies outsourcing to cheap freelancers",
    solution: "Direct senior full-stack product engineers & dedicated design leadership",
  },
  {
    problem: "Missed deadlines, vague communications, and radio silence after final invoice",
    solution: "100% transparent sprint updates, 99.8% on-time delivery & long-term partnership",
  }
];

export default function ProblemSolutionSection() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-6 md:px-12 relative overflow-hidden">
      {/* Background ambient glows and lines */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-red-500/10 blur-[150px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#00E5FF]/10 blur-[150px] rounded-full pointer-events-none translate-x-1/3 translate-y-1/3" />

      {/* Decorative curved line (SVG) */}
      <svg className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M-100 400C300 100 600 700 1540 300" stroke="url(#paint0_linear)" strokeWidth="1.5" />
        <defs>
          <linearGradient id="paint0_linear" x1="-100" y1="400" x2="1540" y2="300" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF3366" stopOpacity="0" />
            <stop offset="0.5" stopColor="#00E5FF" stopOpacity="0.5" />
            <stop offset="1" stopColor="#00E5FF" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-20 space-y-6 relative z-10">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block text-xs font-mono text-[#00E5FF] tracking-[0.2em] uppercase font-semibold"
        >
          {"/// THE Bright Space DIFFERENCE"}
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight"
        >
          Why Traditional Agencies <br className="hidden md:block" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">Fail You</span> & How We Fix It
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-[#9A9A9A] text-lg leading-relaxed max-w-2xl mx-auto"
        >
          Most client frustrations come from bloated codebases, uninspired designs, and communication breakdowns. Here is how Bright Space compares.
        </motion.p>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch relative z-10">

        {/* Left Card: The Old Way */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="group relative rounded-[2rem] p-[1px] bg-gradient-to-br from-red-500/30 via-red-500/5 to-transparent hover:from-red-500/50 transition-colors duration-500"
        >
          <div className="absolute -inset-[1px] rounded-[2rem] bg-red-500/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

          <div className="relative h-full bg-[#050505]/90 backdrop-blur-xl p-8 md:p-10 rounded-[2rem] flex flex-col justify-between overflow-hidden">
            {/* Inner top glow */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-red-500/10 to-transparent pointer-events-none" />

            <div>
              <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-8 border-b border-red-500/10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 shadow-[0_0_20px_rgba(248,113,113,0.2)]">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">The Old Way</h3>
                    <p className="text-xs text-red-400 font-mono tracking-wide">Traditional Agencies & Freelancers</p>
                  </div>
                </div>
                <span className="px-4 py-1.5 rounded-full text-xs font-mono bg-red-500/10 border border-red-500/20 text-red-400">
                  High Risk
                </span>
              </div>

              <ul className="space-y-6">
                {comparisonPoints.map((pt, i) => (
                  <li key={i} className="flex items-start gap-4 text-[15px] leading-relaxed text-[#9A9A9A]">
                    <div className="mt-1 bg-red-500/10 rounded-full p-0.5 shrink-0">
                      <XCircle className="w-4 h-4 text-red-400" />
                    </div>
                    <span>{pt.problem}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 pt-6 border-t border-red-500/10">
              <div className="flex items-center justify-center gap-2 text-sm text-red-400/80 font-medium">
                <AlertTriangle className="w-4 h-4" />
                <span>Result: High technical debt, slow launch, poor user conversion.</span>
              </div>
            </div>

            {/* Decorative Floating Element (Edit Code) */}
            <div className="absolute -bottom-4 -left-4 w-20 h-24 bg-[#111] border border-red-500/20 rounded-2xl shadow-2xl flex flex-col items-center justify-center gap-2 transform -rotate-6 group-hover:rotate-0 transition-transform duration-300 z-20">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-purple-600 flex items-center justify-center text-white">
                <Code className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-white">Edit</span>
            </div>
          </div>
        </motion.div>

        {/* Right Card: The Bright Space Model */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="group relative rounded-[2rem] p-[1px] bg-gradient-to-br from-[#00E5FF]/40 via-[#6C63FF]/20 to-transparent hover:from-[#00E5FF]/60 transition-colors duration-500 shadow-[0_0_50px_rgba(0,229,255,0.1)]"
        >
          <div className="absolute -inset-[1px] rounded-[2rem] bg-[#00E5FF]/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

          <div className="relative h-full bg-[#050505]/90 backdrop-blur-xl p-8 md:p-10 rounded-[2rem] flex flex-col justify-between overflow-hidden">
            {/* Inner top glow */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#00E5FF]/10 to-transparent pointer-events-none" />

            <div>
              <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-8 border-b border-[rgba(255,255,255,0.05)]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00E5FF] to-[#6C63FF] flex items-center justify-center text-white shadow-[0_0_20px_rgba(0,229,255,0.4)]">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">The Bright Space Way</h3>
                    <p className="text-xs text-[#00E5FF] font-mono tracking-wide">Modern Product & Software Studio</p>
                  </div>
                </div>
                <span className="px-4 py-1.5 rounded-full text-xs font-mono bg-[#00E5FF]/10 border border-[#00E5FF]/20 text-[#00E5FF]">
                  Premium Standard
                </span>
              </div>

              <ul className="space-y-6">
                {comparisonPoints.map((pt, i) => (
                  <li key={i} className="flex items-start gap-4 text-[15px] leading-relaxed text-gray-200 font-medium">
                    <div className="mt-1 bg-[#00E5FF]/20 rounded-full p-0.5 shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-[#00E5FF]" />
                    </div>
                    <span>{pt.solution}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 pt-6 border-t border-[rgba(255,255,255,0.05)]">
              <div className="flex items-center justify-center gap-2 text-sm text-[#00E5FF] font-medium">
                <Zap className="w-4 h-4" />
                <span>Result: Scalable digital products, top-tier engineering & commercial growth.</span>
              </div>
            </div>

            {/* Decorative Floating Element (Growth) */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#111] border border-[#00E5FF]/20 rounded-2xl shadow-2xl flex flex-col items-center justify-center gap-2 transform rotate-6 group-hover:rotate-0 transition-transform duration-300 z-20">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-400 to-[#00E5FF] flex items-center justify-center text-[#111]">
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>

            {/* Small floating share icon */}
            <div className="absolute -bottom-8 right-16 w-10 h-10 bg-[#111] border border-white/10 rounded-full shadow-xl flex items-center justify-center z-20 text-white/50 hover:text-white transition-colors cursor-pointer">
              <Share className="w-4 h-4" />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
