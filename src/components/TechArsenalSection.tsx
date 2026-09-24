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
    <section className="py-24 bg-[#FAF7F2] border-y border-[#DCD4C5] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-mono text-[#B08D57] tracking-widest uppercase font-bold">
            {"/// TECHNICAL ARSENAL"}
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#111111] tracking-tight">
            Powered by <span className="font-serif italic text-gradient-accent">Battle-Tested Tech</span>
          </h2>
          <p className="text-[#555555] text-base leading-relaxed">
            We don&apos;t build on bloated templates. We engineer full-stack software using modern, production-grade tools designed for extreme speed and scalability.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {techStackData.map((cat) => {
            const Icon = categoryIcons[cat.category] || Cpu;
            const isActive = activeCategory === cat.category;

            return (
              <button
                key={cat.category}
                onClick={() => setActiveCategory(cat.category)}
                className={`flex items-center gap-2.5 px-6 py-3 rounded-full text-xs font-mono tracking-wider transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-[#B08D57] text-white shadow-md border border-[#B08D57] font-bold"
                    : "bg-white text-[#555555] border border-[#DCD4C5] hover:border-[#B08D57] hover:text-[#111111]"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{cat.category}</span>
              </button>
            );
          })}
        </div>

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
                    className="bg-white p-6 rounded-2xl border border-[#DCD4C5] hover:border-[#B08D57] transition-all group shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-lg font-bold text-[#111111] group-hover:text-[#B08D57] transition-colors">
                        {item.name}
                      </h4>
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-[#FAF7F2] border border-[#DCD4C5] text-[#B08D57] font-bold">
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-xs text-[#555555] leading-relaxed">
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
