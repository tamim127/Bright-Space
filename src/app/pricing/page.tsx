"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ArrowUpRight, ShieldCheck } from "lucide-react";

const engagementModels = [
  {
    id: "fixed-project",
    title: "Fixed Project",
    badge: "Most Popular for New Builds",
    startingAt: "Custom Scope",
    description: "Best for clearly defined websites, web applications, or custom software builds with set milestones.",
    features: [
      "Fixed timeline & budget guarantee",
      "Full UI/UX design & prototype",
      "Next.js 15 production build",
      "100% code ownership & source handoff",
      "30-day post-launch warranty support"
    ],
    ctaText: "Start Fixed Project",
    recommended: true
  },
  {
    id: "dedicated-dev",
    title: "Dedicated Team Extension",
    badge: "Best for Fast-Growing Startups",
    startingAt: "Monthly Billing",
    description: "For long-term product development requiring full-stack engineers and senior UI designers on demand.",
    features: [
      "Dedicated senior developers & designer",
      "Daily Slack / Discord communication",
      "Sprint planning & bi-weekly demos",
      "Flexible scope changes as you scale",
      "Immediate onboarding within 48 hours"
    ],
    ctaText: "Hire Dedicated Team",
    recommended: false
  },
  {
    id: "monthly-partnership",
    title: "Monthly Retainer",
    badge: "Continuous Evolution",
    startingAt: "Flat Retainer",
    description: "Ongoing design updates, feature improvements, security audits, and continuous performance optimization.",
    features: [
      "Guaranteed monthly engineering hours",
      "Priority response within 2 hours",
      "Conversion rate optimization (CRO)",
      "Security patches & dependency updates",
      "24/7 uptime & error telemetry"
    ],
    ctaText: "Start Retainer",
    recommended: false
  }
];

const whatsIncluded = [
  "Dedicated Slack / Discord channel for real-time team chat",
  "Transparent task tracking via Linear / Jira",
  "Senior UI/UX Design & High-fidelity Figma files",
  "Clean, strictly-typed TypeScript & Next.js code",
  "Automated CI/CD deployment pipelines on Vercel or AWS",
  "Comprehensive QA testing & Lighthouse 95+ performance",
  "Post-launch technical warranty & ongoing support options"
];

export default function PricingPage() {
  return (
    <div className="py-16 md:py-24 max-w-7xl mx-auto px-6 md:px-12 space-y-24">
      {/* Hero */}
      <div className="max-w-4xl space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-[rgba(0,229,255,0.3)] text-xs font-mono text-[#00E5FF] uppercase tracking-widest"
        >
          {"/// ENGAGEMENT MODELS"}
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight"
        >
          Flexible Ways to <br />
          <span className="text-gradient-accent">Work Together.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-[#9A9A9A] font-light max-w-2xl leading-relaxed"
        >
          Instead of rigid generic price tags, we tailor our engagement structure to match your exact product scope, timeline, and business goals.
        </motion.p>
      </div>

      {/* Engagement Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {engagementModels.map((model, idx) => (
          <motion.div
            key={model.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className={`glass-panel p-8 rounded-3xl border transition-all duration-300 flex flex-col justify-between relative ${
              model.recommended
                ? "border-[#6C63FF] shadow-[0_0_35px_rgba(108,99,255,0.25)] bg-[#0e0e14]"
                : "border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.2)]"
            }`}
          >
            {model.recommended && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#6C63FF] to-[#00E5FF] px-4 py-1 rounded-full text-[10px] font-mono font-bold text-white uppercase tracking-wider shadow-md">
                Recommended
              </div>
            )}

            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono text-[#00E5FF] uppercase block mb-1">
                  {model.badge}
                </span>
                <h3 className="text-2xl font-bold text-white">{model.title}</h3>
                <div className="mt-4 text-xs font-mono text-[#6C63FF] uppercase font-bold">
                  {model.startingAt}
                </div>
                <p className="text-sm text-[#9A9A9A] mt-3 leading-relaxed font-light">
                  {model.description}
                </p>
              </div>

              <div className="border-t border-[rgba(255,255,255,0.06)] pt-6">
                <ul className="space-y-3">
                  {model.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-3 text-xs text-[#F5F5F5]">
                      <Check className="w-4 h-4 text-[#00E5FF] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-8">
              <Link href="/contact" className="w-full block">
                <button
                  className={`w-full py-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all interactive ${
                    model.recommended
                      ? "bg-gradient-to-r from-[#6C63FF] to-[#00E5FF] text-white shadow-lg shadow-[rgba(108,99,255,0.4)]"
                      : "bg-[#14141c] text-white border border-[rgba(255,255,255,0.1)] hover:bg-[#1a1a24]"
                  }`}
                >
                  {model.ctaText} <ArrowUpRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* What's Included Checklist */}
      <div className="glass-panel p-10 md:p-14 rounded-3xl border border-[rgba(255,255,255,0.08)] space-y-8">
        <div>
          <p className="text-[#00E5FF] font-mono text-xs uppercase tracking-widest mb-2">
            {"/// GUARANTEED STANDARDS"}
          </p>
          <h2 className="text-3xl font-bold text-white">What&apos;s Included in Every Engagement</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {whatsIncluded.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 p-4 bg-[#08080c] rounded-xl border border-[rgba(255,255,255,0.04)]">
              <ShieldCheck className="w-5 h-5 text-[#6C63FF] shrink-0" />
              <span className="text-sm text-white font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
