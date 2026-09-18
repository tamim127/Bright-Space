"use client";

import { motion } from "framer-motion";
import { XCircle, CheckCircle2, AlertTriangle, ShieldCheck, Zap, Clock, Code2, Users } from "lucide-react";

const comparisonPoints = [
  {
    problem: "Outdated design templates & clunky UI that look like hundreds of other sites",
    solution: "Custom dark minimal luxury aesthetics engineered to command high market authority",
    icon: Code2
  },
  {
    problem: "Bloated page builders, slow load times (> 4s), and poor Lighthouse scores",
    solution: "Lightning-fast Next.js App Router & Server Components with < 300ms response times",
    icon: Zap
  },
  {
    problem: "Junior devs learning on your dime or agencies outsourcing to cheap freelancers",
    solution: "Direct senior full-stack product engineers & dedicated design leadership",
    icon: Users
  },
  {
    problem: "Missed deadlines, vague communications, and radio silence after final invoice",
    solution: "100% transparent sprint updates, 99.8% on-time delivery & long-term partnership",
    icon: Clock
  }
];

export default function ProblemSolutionSection() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-6 md:px-12 relative overflow-hidden">
      {/* Glow ambient background */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#6C63FF]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#00E5FF]/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <span className="text-xs font-mono text-[#00E5FF] tracking-widest uppercase">
          {"/// THE ARTISAN DIFFERENCE"}
        </span>
        <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Why Traditional Agencies <br className="hidden md:inline" />
          <span className="font-serif italic text-gradient-accent">Fail You</span> & How We Fix It
        </h2>
        <p className="text-[#9A9A9A] text-base leading-relaxed">
          Most client frustrations come from bloated codebases, uninspired designs, and communication breakdowns. Here is how ARTISAN compares.
        </p>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        
        {/* Left Card: The Old Way */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card p-8 md:p-10 rounded-3xl border border-red-500/20 bg-gradient-to-b from-red-950/10 to-transparent relative flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between pb-6 mb-8 border-b border-red-500/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">The Old Way</h3>
                  <p className="text-xs text-red-400 font-mono">Traditional Agencies & Freelancers</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-red-500/10 border border-red-500/30 text-red-400">
                High Risk
              </span>
            </div>

            <ul className="space-y-6">
              {comparisonPoints.map((pt, i) => (
                <li key={i} className="flex items-start gap-4 text-sm text-[#D1D5DB]">
                  <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span>{pt.problem}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 pt-6 border-t border-red-500/15 text-xs text-red-400/80 font-mono italic text-center">
            Result: High technical debt, slow launch, poor user conversion.
          </div>
        </motion.div>

        {/* Right Card: The ARTISAN Model */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card p-8 md:p-10 rounded-3xl border border-[#6C63FF]/40 bg-gradient-to-b from-[#6C63FF]/10 to-[#00E5FF]/5 relative flex flex-col justify-between shadow-[0_0_40px_rgba(108,99,255,0.15)]"
        >
          <div>
            <div className="flex items-center justify-between pb-6 mb-8 border-b border-[rgba(255,255,255,0.1)]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6C63FF] to-[#00E5FF] flex items-center justify-center text-white shadow-lg">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">The ARTISAN Way</h3>
                  <p className="text-xs text-[#00E5FF] font-mono">Modern Product & Software Studio</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF]">
                Premium Standard
              </span>
            </div>

            <ul className="space-y-6">
              {comparisonPoints.map((pt, i) => (
                <li key={i} className="flex items-start gap-4 text-sm text-white font-medium">
                  <CheckCircle2 className="w-5 h-5 text-[#00E5FF] shrink-0 mt-0.5" />
                  <span>{pt.solution}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 pt-6 border-t border-[rgba(255,255,255,0.1)] text-xs text-[#00E5FF] font-mono italic text-center">
            Result: Scalable digital products, top-tier engineering & commercial growth.
          </div>
        </motion.div>

      </div>
    </section>
  );
}
