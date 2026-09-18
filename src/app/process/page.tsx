"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ProcessTimeline from "@/components/ProcessTimeline";
import MagneticButton from "@/components/MagneticButton";

export default function ProcessPage() {
  return (
    <div className="py-16 md:py-24 max-w-7xl mx-auto px-6 md:px-12 space-y-20">
      {/* Hero */}
      <div className="max-w-4xl space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-[rgba(0,229,255,0.3)] text-xs font-mono text-[#00E5FF] uppercase tracking-widest"
        >
          {"/// HOW WE WORK"}
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight"
        >
          A Better Way to Build <br />
          <span className="font-serif italic font-normal text-gradient-accent">Digital Products.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-[#9A9A9A] font-light max-w-2xl leading-relaxed"
        >
          Our 7-step engineering process is designed to eliminate scope creep, maintain complete transparency, and deliver bulletproof software on schedule.
        </motion.p>
      </div>

      {/* 7-Step Interactive Process Timeline */}
      <ProcessTimeline />

      {/* Process CTA */}
      <div className="p-12 rounded-3xl glass-panel border border-[rgba(108,99,255,0.3)] text-center space-y-6">
        <h3 className="text-3xl font-bold text-white">
          Ready to experience a seamless development workflow?
        </h3>
        <p className="text-[#9A9A9A] max-w-lg mx-auto">
          Schedule a discovery call with our technical lead to discuss your product roadmap.
        </p>
        <Link href="/contact" className="inline-block">
          <MagneticButton variant="primary">
            Start Your Project →
          </MagneticButton>
        </Link>
      </div>
    </div>
  );
}
