"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Layout, AppWindow, Cpu, Palette, Layers } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";
import { servicesData } from "@/data/services";

const iconsMap: Record<string, React.ElementType> = {
  Layout,
  AppWindow,
  Cpu,
  Palette,
  Layers,
};

export default function ServicesPage() {
  return (
    <div className="py-16 md:py-24 max-w-7xl mx-auto px-6 md:px-12">
      {/* Page Hero */}
      <div className="max-w-4xl mb-20 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-[rgba(0,229,255,0.3)] text-xs font-mono text-[#00E5FF] uppercase tracking-widest"
        >
          {"/// OUR SERVICE ARCHITECTURE"}
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight"
        >
          Digital Products. <br />
          <span className="font-serif italic font-normal text-gradient-accent">Designed. Engineered. Delivered.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-[#9A9A9A] font-light max-w-2xl leading-relaxed"
        >
          Explore our complete service capabilities. From conversion-driven web design to enterprise SaaS applications and custom software engineering.
        </motion.p>
      </div>

      {/* Detailed Services List */}
      <div className="space-y-16">
        {servicesData.map((service, index) => {
          const Icon = iconsMap[service.icon] || Layout;
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-panel p-8 md:p-12 rounded-3xl border border-[rgba(255,255,255,0.08)] hover:border-[#6C63FF]/50 transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-extrabold font-mono text-[#6C63FF]">
                    {service.number}
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-[#121218] border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-[#00E5FF]">
                    <Icon className="w-6 h-6" />
                  </div>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  {service.title}
                </h2>
                <p className="text-base text-[#9A9A9A] leading-relaxed font-light">
                  {service.description}
                </p>

                <div className="pt-4">
                  <Link href="/contact">
                    <MagneticButton variant="secondary">
                      Inquire for {service.title.split(" ")[0]} <ArrowUpRight className="w-4 h-4" />
                    </MagneticButton>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-7 bg-[#070709] p-6 md:p-8 rounded-2xl border border-[rgba(255,255,255,0.04)]">
                <h3 className="text-xs font-mono text-[#00E5FF] uppercase tracking-wider mb-6 pb-2 border-b border-[rgba(255,255,255,0.06)]">
                  Included Capabilities
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service.capabilities.map((cap) => (
                    <div
                      key={cap}
                      className="flex items-center gap-3 text-sm text-[#F5F5F5] font-medium"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#6C63FF] shrink-0" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* CTA Bottom Banner */}
      <div className="mt-24 p-12 rounded-3xl glass-panel border border-[rgba(0,229,255,0.3)] text-center space-y-6">
        <h3 className="text-3xl font-bold text-white">
          Need a Custom Solution combining multiple services?
        </h3>
        <p className="text-[#9A9A9A] max-w-xl mx-auto">
          We construct tailored scope packages for complex enterprise requirements.
        </p>
        <Link href="/contact" className="inline-block">
          <MagneticButton variant="primary">
            Schedule a Technical Discovery Call →
          </MagneticButton>
        </Link>
      </div>
    </div>
  );
}
