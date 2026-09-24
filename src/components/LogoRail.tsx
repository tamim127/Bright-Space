"use client";

import React from "react";

interface LogoItem {
  name: string;
  category: string;
}

const partnerLogos: LogoItem[] = [
  { name: "APEX TECH", category: "FINTECH PLATFORM" },
  { name: "VANGUARD LABS", category: "AI INFRASTRUCTURE" },
  { name: "NEBULA SYSTEMS", category: "CLOUD EDGE" },
  { name: "HORIZON CAPITAL", category: "WEALTH MGMT" },
  { name: "SYNERGY SOFTWARE", category: "ENTERPRISE SAAS" },
  { name: "QUANTUM VECTOR", category: "CYBERSECURITY" },
  { name: "AETHER DATA", category: "ANALYTICS ENGINE" },
];

export default function LogoRail() {
  const doubledLogos = [...partnerLogos, ...partnerLogos, ...partnerLogos];

  return (
    <section className="relative w-full py-10 overflow-hidden border-y border-[#DCD4C5] bg-[#FAF7F2] backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 mb-3 flex items-center justify-between">
        <span className="text-[11px] font-mono uppercase tracking-widest text-[#B08D57] font-bold flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B08D57]"></span>
          TRUSTED BY INNOVATIVE TEAMS WORLDWIDE
        </span>
      </div>

      <div className="relative w-full overflow-hidden marquee-mask py-2">
        <div className="animate-marquee flex items-center gap-12 md:gap-16">
          {doubledLogos.map((item, idx) => (
            <div
              key={`${item.name}-${idx}`}
              className="flex items-center gap-3 px-6 py-2.5 rounded-xl border border-[#DCD4C5] bg-white hover:border-[#B08D57] transition-all duration-300 group cursor-default shrink-0 shadow-sm"
            >
              <div className="w-2 h-2 rounded-full bg-[#B08D57] group-hover:bg-[#D4BD91] transition-colors" />
              <span className="font-bold text-sm tracking-wider text-[#111111] group-hover:text-[#B08D57] transition-colors">
                {item.name}
              </span>
              <span className="text-[9px] font-mono tracking-widest text-[#777777] group-hover:text-[#111111] uppercase transition-colors">
                • {item.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
