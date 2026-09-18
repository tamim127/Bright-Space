"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import MagneticButton from "@/components/MagneticButton";
import { techStackData } from "@/data/tech";

export default function TechnologyPage() {
  return (
    <div className="py-16 md:py-24 max-w-7xl mx-auto px-6 md:px-12 space-y-20">
      {/* Hero */}
      <div className="max-w-4xl space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-[rgba(108,99,255,0.3)] text-xs font-mono text-[#6C63FF] uppercase tracking-widest"
        >
          {"/// ENGINEERING STACK"}
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight"
        >
          Modern Stack. <br />
          <span className="text-gradient-accent">Serious Engineering.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-[#9A9A9A] font-light max-w-2xl leading-relaxed"
        >
          We rely strictly on industry-standard, production-proven modern technologies built for sub-second performance, strict type safety, and global scalability.
        </motion.p>
      </div>

      {/* Tech Stack Grid Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {techStackData.map((categoryGroup, index) => (
          <motion.div
            key={categoryGroup.category}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass-panel p-8 md:p-10 rounded-3xl border border-[rgba(255,255,255,0.08)] hover:border-[#6C63FF]/40 transition-all duration-300 space-y-6"
          >
            <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.06)] pb-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00E5FF]" />
                {categoryGroup.category}
              </h3>
              <span className="text-xs font-mono text-[#5A5A66]">
                {categoryGroup.items.length} Tech Tools
              </span>
            </div>

            <div className="space-y-4">
              {categoryGroup.items.map((item) => (
                <div
                  key={item.name}
                  className="p-4 bg-[#08080c] rounded-xl border border-[rgba(255,255,255,0.04)] flex items-center justify-between gap-4 group hover:border-[#6C63FF]/30 transition-colors"
                >
                  <div>
                    <h4 className="font-bold text-white text-base group-hover:text-[#00E5FF] transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-xs text-[#9A9A9A] mt-0.5">{item.description}</p>
                  </div>
                  <span className="text-[10px] font-mono px-3 py-1 bg-[#14141d] rounded-full text-[#6C63FF] border border-[rgba(108,99,255,0.3)] shrink-0">
                    {item.badge}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tech CTA */}
      <div className="p-12 rounded-3xl glass-panel border border-[rgba(0,229,255,0.3)] text-center space-y-6">
        <h3 className="text-3xl font-bold text-white">
          Have specific tech stack requirements or legacy integrations?
        </h3>
        <p className="text-[#9A9A9A] max-w-lg mx-auto">
          We adapt seamlessly to your existing cloud infrastructure and DevOps pipelines.
        </p>
        <Link href="/contact" className="inline-block">
          <MagneticButton variant="primary">
            Discuss Your Architecture →
          </MagneticButton>
        </Link>
      </div>
    </div>
  );
}
