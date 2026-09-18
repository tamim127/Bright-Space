"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import { projectsData } from "@/data/projects";

const categories = ["All", "Websites", "Web Apps", "SaaS", "E-commerce", "Software"];

export default function WorkPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects =
    selectedCategory === "All"
      ? projectsData
      : projectsData.filter((p) => p.category === selectedCategory);

  return (
    <div className="py-16 md:py-24 max-w-7xl mx-auto px-6 md:px-12">
      {/* Page Header */}
      <div className="max-w-4xl mb-16 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-[rgba(108,99,255,0.3)] text-xs font-mono text-[#6C63FF] uppercase tracking-widest"
        >
          {"/// PORTFOLIO ARCHIVE"}
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold text-white tracking-tight"
        >
          Selected <span className="font-serif italic font-normal text-gradient-accent">Work.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-[#9A9A9A] font-light max-w-2xl"
        >
          Explore digital products, SaaS platforms, enterprise tools, and luxury web experiences we&apos;ve designed and engineered.
        </motion.p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-3 mb-16">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-mono font-medium transition-all duration-300 interactive border ${
                isActive
                  ? "bg-[#6C63FF] text-white border-[#6C63FF] shadow-[0_0_20px_rgba(108,99,255,0.4)]"
                  : "bg-[#0c0c0e] text-[#9A9A9A] border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.2)] hover:text-white"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Portfolio Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
