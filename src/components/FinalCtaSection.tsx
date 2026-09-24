"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Sparkles,
  ArrowUpRight,
  Calendar,
  Zap,
  ShieldCheck,
  CheckCircle2,
  Mail,
  Clock,
  Code2,
  Bot,
  Palette,
  Smartphone,
} from "lucide-react";

export default function FinalCtaSection() {
  const [selectedServices, setSelectedServices] = useState<string[]>([
    "web-saas",
    "ai-integration",
  ]);

  const services = [
    {
      id: "web-saas",
      label: "Web & SaaS Apps",
      icon: Code2,
      gradient: "from-[#B08D57] to-[#8C6D3B]",
    },
    {
      id: "ai-integration",
      label: "AI & Agents",
      icon: Bot,
      gradient: "from-[#D4BD91] to-[#B08D57]",
    },
    {
      id: "design-systems",
      label: "UI/UX & Design Systems",
      icon: Palette,
      gradient: "from-[#B08D57] to-[#6d552e]",
    },
    {
      id: "mobile-apps",
      label: "Mobile & iOS/Android",
      icon: Smartphone,
      gradient: "from-[#D4BD91] to-[#8C6D3B]",
    },
  ];

  const toggleService = (id: string) => {
    if (selectedServices.includes(id)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s !== id));
      }
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  return (
    <section className="relative py-32 bg-[#F3EFE6] text-[#111111] overflow-hidden select-none border-t border-[#DCD4C5]">
      {/* Background Grid Pattern & Ambient Lighting */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#B08D570a_1px,transparent_1px),linear-gradient(to_bottom,#B08D570a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Top Ambient Lamp Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[350px] bg-gradient-to-b from-[#B08D57]/20 via-[#D4BD91]/12 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[2px] bg-gradient-to-r from-transparent via-[#B08D57] to-transparent shadow-[0_0_25px_#B08D57]" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Top Status & Availability Tag */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#DCD4C5] text-xs font-mono text-[#B08D57] shadow-sm backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#B08D57] animate-pulse" />
            <span className="tracking-widest uppercase font-bold">
              /// READY TO BUILD YOUR PRODUCT?
            </span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF7F2] border border-[#DCD4C5] text-xs font-mono text-[#8C6D3B]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B08D57] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#B08D57]"></span>
            </span>
            <span className="font-semibold">2 Project Slots Open for Q4</span>
          </div>
        </div>

        {/* Main Title & Subtitle */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1] text-[#111111]">
            Transform Your Vision Into <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#B08D57] via-[#8C6D3B] to-[#D4BD91] drop-shadow-sm">
              High-Impact Production Reality.
            </span>
          </h2>
          <p className="text-base sm:text-xl text-[#555555] max-w-2xl mx-auto leading-relaxed font-normal">
            Partner directly with senior cloud architects & product engineers. No pass-offs, no fluff — just engineering precision & luxury polish.
          </p>
        </div>

        {/* Interactive Scope Selector */}
        <div className="mt-12 max-w-3xl mx-auto bg-white backdrop-blur-2xl border border-[#DCD4C5] rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <p className="text-xs font-mono text-[#555555] uppercase tracking-widest text-center mb-5 font-semibold">
            Select your scope of interest:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {services.map((service) => {
              const Icon = service.icon;
              const isSelected = selectedServices.includes(service.id);
              return (
                <button
                  key={service.id}
                  onClick={() => toggleService(service.id)}
                  className={`relative flex items-center gap-3.5 p-4 rounded-2xl border text-left transition-all duration-300 ${
                    isSelected
                      ? "bg-[#FAF7F2] border-[#B08D57] shadow-[0_0_20px_rgba(176,141,87,0.15)] text-[#111111]"
                      : "bg-[#F3EFE6] border-[#DCD4C5] text-[#555555] hover:border-[#B08D57] hover:text-[#111111]"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                      isSelected
                        ? `bg-gradient-to-br ${service.gradient} text-white shadow-md`
                        : "bg-[#DCD4C5] text-[#555555]"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-sm sm:text-base flex-1">
                    {service.label}
                  </span>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                      isSelected
                        ? "border-[#B08D57] bg-[#B08D57] text-white"
                        : "border-[#DCD4C5] bg-transparent"
                    }`}
                  >
                    {isSelected && <CheckCircle2 className="w-4 h-4 stroke-[3]" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Action CTA Buttons */}
          <div className="mt-8 pt-6 border-t border-[#DCD4C5] flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#111111] hover:bg-[#B08D57] text-white font-bold text-base flex items-center justify-center gap-2.5 shadow-[0_4px_25px_rgba(17,17,17,0.25)] hover:shadow-[0_4px_35px_rgba(176,141,87,0.4)] transition-all cursor-pointer"
              >
                <Calendar className="w-5 h-5" />
                <span>Schedule Discovery Call</span>
                <ArrowUpRight className="w-5 h-5" />
              </motion.button>
            </Link>

            <a
              href="mailto:hello@brightspace.dev"
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-[#FAF7F2] hover:bg-[#EAE4D7] border border-[#DCD4C5] text-[#111111] font-semibold text-base flex items-center justify-center gap-2 transition-colors"
            >
              <Mail className="w-4 h-4 text-[#B08D57]" />
              <span>Instant Email Brief</span>
            </a>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-5 rounded-2xl bg-white border border-[#DCD4C5] flex items-center gap-4 text-left shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[#B08D57]/10 border border-[#B08D57]/20 flex items-center justify-center text-[#B08D57] flex-shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#111111]">Rapid 2-4 Wk MVPs</h4>
              <p className="text-xs text-[#555555] mt-0.5">
                From architecture blueprint to deployed production code.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#DCD4C5] flex items-center gap-4 text-left shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[#D4BD91]/25 border border-[#D4BD91]/40 flex items-center justify-center text-[#8C6D3B] flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#111111]">100% Code Ownership</h4>
              <p className="text-xs text-[#555555] mt-0.5">
                Clean TypeScript, strict linting, and full IP transfer.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#DCD4C5] flex items-center gap-4 text-left shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[#B08D57]/10 border border-[#B08D57]/20 flex items-center justify-center text-[#B08D57] flex-shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#111111]">Direct Engineer Access</h4>
              <p className="text-xs text-[#555555] mt-0.5">
                Daily Slack updates & weekly video sprint demos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
