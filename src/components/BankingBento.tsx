"use client";

import React, { useEffect, useRef } from "react";
import { Code2, Sparkles, TrendingUp, BarChart3, Rocket, Server, Smartphone, Monitor } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BankingBento() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".agency-bento-card");
      
      gsap.fromTo(
        cards,
        { y: 60, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section className="py-24 bg-[#F3EFE6] text-[#111111] font-sans relative overflow-x-hidden border-t border-[#DCD4C5]" ref={containerRef}>
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-[min-content_min-content_min-content] gap-4 auto-rows-[250px]">
          
          {/* Our Process Card (Top-Left) */}
          <div className="agency-bento-card col-span-1 md:col-span-1 lg:col-span-1 row-span-2 rounded-[2rem] bg-white border border-[#DCD4C5] p-6 flex flex-col shadow-sm">
            <h3 className="text-sm font-bold text-[#111111] mb-6 tracking-widest uppercase">Our Process</h3>
            <div className="space-y-4 flex-1">
              <div className="flex items-center justify-between border border-[#DCD4C5] bg-[#FAF7F2] rounded-xl p-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#B08D57]/15 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-[#B08D57]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#111111]">01. Strategy</p>
                    <p className="text-[10px] text-[#555555]">Research & Planning</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between border border-[#DCD4C5] bg-[#FAF7F2] rounded-xl p-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center bg-[#D4BD91]/25 rounded-full">
                     <Monitor className="w-4 h-4 text-[#8C6D3B]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#111111]">02. Design</p>
                    <p className="text-[10px] text-[#555555]">UI/UX & Prototyping</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between border border-[#DCD4C5] bg-[#FAF7F2] rounded-xl p-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#B08D57]/20 flex items-center justify-center rounded-full">
                     <Code2 className="w-4 h-4 text-[#B08D57]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#111111]">03. Develop</p>
                    <p className="text-[10px] text-[#555555]">Engineering & QA</p>
                  </div>
                </div>
              </div>
            </div>
            
            <button className="w-full mt-4 bg-[#111111] hover:bg-[#B08D57] text-white text-sm font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm">
              Start Project <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </button>
          </div>

          {/* Slogan Text Card (Top-Middle) */}
          <div className="agency-bento-card col-span-1 md:col-span-1 lg:col-span-1 row-span-1 rounded-[2rem] bg-gradient-to-br from-[#B08D57] via-[#9A7846] to-[#8C6D3B] text-white p-8 relative overflow-hidden flex flex-col justify-end shadow-md">
            <div className="absolute top-6 right-6 z-10">
              <span className="inline-block p-3 rounded-full bg-white/10 backdrop-blur-md">
                <Rocket className="w-6 h-6 text-white" />
              </span>
            </div>
            <div className="relative z-10">
              <p className="text-xs uppercase tracking-widest text-white/80 font-bold mb-1">Agency Vision</p>
              <h2 className="text-2xl font-black leading-snug">WE BUILD DIGITAL EMPIRES</h2>
            </div>
          </div>

          {/* Core Services Card (Top-Right) */}
          <div className="agency-bento-card col-span-1 md:col-span-2 lg:col-span-2 row-span-2 rounded-[2rem] bg-white border border-[#DCD4C5] p-8 flex flex-col justify-between shadow-sm relative overflow-hidden">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-xs font-mono uppercase text-[#B08D57] tracking-widest font-bold">Capabilities</span>
                <h3 className="text-2xl font-black text-[#111111] mt-1">Full-Spectrum Product Studio</h3>
              </div>
              <span className="p-3 bg-[#FAF7F2] border border-[#DCD4C5] rounded-full text-[#B08D57]">
                <Server className="w-5 h-5" />
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 my-4">
              <div className="p-4 bg-[#FAF7F2] border border-[#DCD4C5] rounded-2xl">
                <div className="w-8 h-8 rounded-lg bg-[#B08D57]/15 flex items-center justify-center text-[#B08D57] mb-2">
                  <Monitor className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-[#111111]">Web Applications</h4>
                <p className="text-xs text-[#555555] mt-1">Next.js & React Architectures</p>
              </div>

              <div className="p-4 bg-[#FAF7F2] border border-[#DCD4C5] rounded-2xl">
                <div className="w-8 h-8 rounded-lg bg-[#D4BD91]/25 flex items-center justify-center text-[#8C6D3B] mb-2">
                  <Smartphone className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-[#111111]">Mobile Solutions</h4>
                <p className="text-xs text-[#555555] mt-1">iOS & Android Ecosystems</p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#DCD4C5] flex items-center justify-between text-xs text-[#555555]">
              <span>Powered by modern cloud infrastructure</span>
              <span className="font-mono text-[#B08D57] font-bold">99.9% Uptime Guarantee</span>
            </div>
          </div>

          {/* Growth Analytics Card (Bottom-Middle Left) */}
          <div className="agency-bento-card col-span-1 md:col-span-1 lg:col-span-1 row-span-1 rounded-[2rem] bg-white border border-[#DCD4C5] p-6 flex flex-col justify-between shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-[#555555]">ROI Metrics</span>
              <TrendingUp className="w-4 h-4 text-[#B08D57]" />
            </div>
            <div>
              <p className="text-3xl font-black text-[#111111]">+340%</p>
              <p className="text-xs text-[#555555] mt-1">Avg Client Growth Year-over-Year</p>
            </div>
          </div>

          {/* High Conversion Card (Bottom-Middle Right) */}
          <div className="agency-bento-card col-span-1 md:col-span-1 lg:col-span-1 row-span-1 rounded-[2rem] bg-[#FAF7F2] border border-[#DCD4C5] p-6 flex flex-col justify-between shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-[#B08D57]">Performance</span>
              <BarChart3 className="w-4 h-4 text-[#B08D57]" />
            </div>
            <div>
              <p className="text-3xl font-black text-[#111111]">40+ Builds</p>
              <p className="text-xs text-[#555555] mt-1">Successfully Deployed Worldwide</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
