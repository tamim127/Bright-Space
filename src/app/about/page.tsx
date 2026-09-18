"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { teamData } from "@/data/team";

const stats = [
  { value: "50+", label: "Completed Projects" },
  { value: "20+", label: "Enterprise Clients" },
  { value: "10+", label: "Global Industries" },
  { value: "99.9%", label: "Uptime & Quality" },
];

const values = [
  { title: "Quality over Quantity", desc: "We intentionally limit client engagements to deliver concentrated engineering firepower." },
  { title: "Radical Transparency", desc: "No hidden scope changes. Direct daily communications via Slack and linear task boards." },
  { title: "Long-Term Thinking", desc: "We architect applications to handle 10x traffic scale without requiring code rewrites." },
  { title: "User-First Engineering", desc: "Micro-interactions and performance optimization designed around real human behavior." },
];

export default function AboutPage() {
  return (
    <div className="py-16 md:py-24 max-w-7xl mx-auto px-6 md:px-12 space-y-24">
      {/* Hero */}
      <div className="max-w-4xl space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-[rgba(108,99,255,0.3)] text-xs font-mono text-[#6C63FF] uppercase tracking-widest"
        >
          {"/// ABOUT OUR STUDIO"}
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight"
        >
          We turn complex ideas into <span className="text-gradient-accent">simple digital experiences.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-[#9A9A9A] font-light max-w-3xl leading-relaxed"
        >
          Artisan.Dev is a dark-tech digital agency positioned at the intersection of high-end UI design and serious software engineering.
        </motion.p>
      </div>

      {/* Philosophy Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="glass-panel p-10 rounded-3xl border border-[rgba(255,255,255,0.08)] space-y-4">
          <span className="text-xs font-mono text-[#00E5FF] uppercase">{"/// PHILOSOPHY 01"}</span>
          <h3 className="text-3xl font-black text-white">Think deeply.</h3>
          <p className="text-sm text-[#9A9A9A] leading-relaxed">
            We spend time analyzing business models, user constraints, and architecture bottlenecks before touching Figma or writing code.
          </p>
        </div>

        <div className="glass-panel p-10 rounded-3xl border border-[rgba(255,255,255,0.08)] space-y-4">
          <span className="text-xs font-mono text-[#6C63FF] uppercase">{"/// PHILOSOPHY 02"}</span>
          <h3 className="text-3xl font-black text-white">Design intentionally.</h3>
          <p className="text-sm text-[#9A9A9A] leading-relaxed">
            Every pixel, color variable, and micro-animation serves a deliberate conversion or usability goal.
          </p>
        </div>

        <div className="glass-panel p-10 rounded-3xl border border-[rgba(255,255,255,0.08)] space-y-4">
          <span className="text-xs font-mono text-emerald-400 uppercase">{"/// PHILOSOPHY 03"}</span>
          <h3 className="text-3xl font-black text-white">Build relentlessly.</h3>
          <p className="text-sm text-[#9A9A9A] leading-relaxed">
            We write clean, strictly-typed TypeScript and deploy to edge networks for sub-second global load performance.
          </p>
        </div>
      </div>

      {/* Numbers / Stats */}
      <div className="p-12 rounded-3xl bg-[#08080a] border border-[rgba(255,255,255,0.08)] grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((s, idx) => (
          <div key={idx} className="space-y-2 text-center md:text-left">
            <div className="text-4xl md:text-6xl font-black text-white font-mono">
              <span className="text-gradient-accent">{s.value}</span>
            </div>
            <p className="text-xs font-mono text-[#9A9A9A] uppercase tracking-wider">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Team Section */}
      <div className="space-y-12">
        <div>
          <p className="text-[#00E5FF] font-mono text-xs uppercase tracking-widest mb-3">
            {"/// OUR PEOPLE"}
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Meet the <span className="text-gradient-accent">Engineers & Designers.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamData.map((member) => (
            <div
              key={member.id}
              className="glass-panel rounded-3xl overflow-hidden border border-[rgba(255,255,255,0.08)] hover:border-[#6C63FF]/50 transition-all duration-300 group"
            >
              <div className="relative aspect-square w-full bg-[#101015]">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>

              <div className="p-6 space-y-2">
                <h3 className="text-lg font-bold text-white group-hover:text-[#00E5FF] transition-colors">
                  {member.name}
                </h3>
                <p className="text-xs font-mono text-[#6C63FF]">{member.role}</p>
                <p className="text-xs text-[#9A9A9A] leading-relaxed pt-2">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Core Values */}
      <div className="space-y-8">
        <h2 className="text-3xl font-extrabold text-white">Our Core Operating Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((v) => (
            <div key={v.title} className="glass-panel p-8 rounded-2xl border border-[rgba(255,255,255,0.06)] space-y-2">
              <h4 className="text-lg font-bold text-white flex items-center gap-2">
                <Check className="w-5 h-5 text-[#00E5FF]" /> {v.title}
              </h4>
              <p className="text-sm text-[#9A9A9A] pl-7">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
