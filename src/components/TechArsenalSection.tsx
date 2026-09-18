"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { techStackData } from "@/data/tech";
import { Cpu, Terminal, Database, Cloud } from "lucide-react";

const categoryIcons: Record<string, typeof Cpu> = {
  "Frontend & UI": Cpu,
  "Backend & APIs": Terminal,
  "Databases & Storage": Database,
  "Cloud & Infrastructure": Cloud
};

export default function TechArsenalSection() {
  const [activeCategory, setActiveCategory] = useState<string>(techStackData[0].category);

  return (
    <section className="py-24 bg-[#08080c] border-y border-[rgba(255,255,255,0.06)] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-mono text-[#00E5FF] tracking-widest uppercase">
            {"/// TECHNICAL ARSENAL"}
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Powered by <span className="font-serif italic text-gradient-accent">Battle-Tested Tech</span>
          </h2>
          <p className="text-[#9A9A9A] text-base leading-relaxed">
            We don&apos;t build on bloated templates. We engineer full-stack software using modern, production-grade tools designed for extreme speed and scalability.
          </p>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {techStackData.map((cat) => {
            const Icon = categoryIcons[cat.category] || Cpu;
            const isActive = activeCategory === cat.category;

            return (
              <button
                key={cat.category}
                onClick={() => setActiveCategory(cat.category)}
                className={`flex items-center gap-2.5 px-6 py-3 rounded-full text-xs font-mono tracking-wider transition-all duration-300 ${
                  isActive
                    ? "bg-[#6C63FF] text-white shadow-[0_0_20px_rgba(108,99,255,0.4)] border border-[#00E5FF]/40"
                    : "glass-panel text-[#9A9A9A] hover:text-white hover:border-[rgba(255,255,255,0.2)]"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{cat.category}</span>
              </button>
            );
          })}
        </div>

        {/* Tech Grid Content */}
        <AnimatePresence mode="wait">
          {techStackData
            .filter((c) => c.category === activeCategory)
            .map((c) => (
              <motion.div
                key={c.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {c.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="glass-card p-6 rounded-2xl border border-[rgba(255,255,255,0.08)] hover:border-[#6C63FF]/50 transition-all group"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-lg font-bold text-white group-hover:text-[#00E5FF] transition-colors">
                        {item.name}
                      </h4>
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-[#121218] border border-[rgba(255,255,255,0.1)] text-[#00E5FF]">
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-xs text-[#9A9A9A] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
