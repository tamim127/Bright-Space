"use client";

import { motion } from "framer-motion";
import { Search, Target, Compass, Code, ShieldCheck, Rocket, TrendingUp } from "lucide-react";

const processSteps = [
  {
    number: "01",
    title: "Discover",
    subtitle: "Understanding your business core",
    description: "Deep dive into your market positioning, target audience, competitive advantages, and core strategic goals.",
    icon: Search
  },
  {
    number: "02",
    title: "Strategy",
    subtitle: "Architecture & technical roadmap",
    description: "Defining detailed feature scope, tech stack selection, backend data schemas, and sprint milestones.",
    icon: Target
  },
  {
    number: "03",
    title: "Design",
    subtitle: "Human-centered UI/UX & motion",
    description: "Wireframes, high-fidelity UI design systems, interactive prototypes, and micro-interaction visual polish.",
    icon: Compass
  },
  {
    number: "04",
    title: "Build",
    subtitle: "Full-stack engineering & APIs",
    description: "Clean Next.js server component frontend, Node/Express APIs, database architecture, and microservices.",
    icon: Code
  },
  {
    number: "05",
    title: "Test",
    subtitle: "Rigorous QA & performance tuning",
    description: "Comprehensive cross-browser testing, Lighthouse performance optimization, security audits, and load testing.",
    icon: ShieldCheck
  },
  {
    number: "06",
    title: "Launch",
    subtitle: "Deployment & live telemetry",
    description: "Production CI/CD deployment on Vercel/AWS, domain setup, analytics configuration, and live launch validation.",
    icon: Rocket
  },
  {
    number: "07",
    title: "Scale",
    subtitle: "Ongoing optimization & partnership",
    description: "Continuous monitoring, quarterly feature updates, conversion optimization, and long-term tech scaling.",
    icon: TrendingUp
  }
];

export default function ProcessTimeline() {
  return (
    <div className="relative">
      {/* Central Connecting Line */}
      <div className="hidden lg:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-[#6C63FF]/80 via-[#00E5FF]/50 to-transparent" />

      <div className="space-y-12 md:space-y-16">
        {processSteps.map((step, idx) => {
          const isEven = idx % 2 === 0;
          const Icon = step.icon;

          return (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className={`relative flex flex-col lg:flex-row items-center ${
                isEven ? "lg:flex-row" : "lg:flex-row-reverse"
              }`}
            >
              {/* Content Box */}
              <div className="w-full lg:w-1/2 p-4 md:p-6">
                <div className="glass-panel p-8 rounded-2xl border border-[rgba(255,255,255,0.08)] hover:border-[rgba(108,99,255,0.4)] transition-all duration-300 group">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-extrabold font-mono text-gradient-accent">
                      {step.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#121218] border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-[#00E5FF] group-hover:bg-[#6C63FF] group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                    {step.title}
                  </h3>
                  <div className="text-xs font-mono text-[#00E5FF] mb-3">
                    {step.subtitle}
                  </div>
                  <p className="text-sm text-[#9A9A9A] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Center Node Indicator */}
              <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#050505] border-2 border-[#6C63FF] items-center justify-center z-10 shadow-[0_0_15px_rgba(108,99,255,0.6)]">
                <div className="w-2.5 h-2.5 rounded-full bg-[#00E5FF]" />
              </div>

              {/* Empty Spacer */}
              <div className="hidden lg:block w-1/2" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
