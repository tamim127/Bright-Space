"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { CheckCircle2, TrendingUp, Search, PenTool, LayoutDashboard } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export default function Dashboard() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // GSAP Animations
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".bento-card");
      
      gsap.fromTo(
        cards,
        { y: 100, opacity: 0, rotateX: 15, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          scale: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
      
      // Floating animation for cards (antigravity feel)
      cards.forEach((card: any, i) => {
        gsap.to(card, {
          y: () => (i % 2 === 0 ? -10 : 10),
          duration: 3 + i * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }, containerRef);

    return () => {
      lenis.destroy();
      ctx.revert();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#02050a] text-white overflow-x-hidden selection:bg-[#00E5FF] selection:text-black font-sans relative">
      {/* Abstract Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#0f766e] opacity-30 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#0369a1] opacity-30 rounded-full blur-[150px] mix-blend-screen" />
        <div className="absolute top-[30%] left-[40%] w-[30%] h-[30%] bg-[#4338ca] opacity-20 rounded-full blur-[100px] mix-blend-screen" />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 py-20 lg:p-24" ref={containerRef}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-[min-content_min-content_min-content] gap-6 auto-rows-[250px]">
          
          {/* Title Card (Top-Left) */}
          <div className="bento-card col-span-1 md:col-span-1 lg:col-span-1 row-span-1 rounded-[2rem] bg-white/[0.03] border border-white/10 backdrop-blur-xl p-8 flex flex-col justify-center shadow-2xl hover:bg-white/[0.05] transition-all duration-300">
            <h1 className="text-4xl lg:text-5xl font-black tracking-tighter text-white mb-2 leading-none">
              QUANTUM<br />ANALYTICA
            </h1>
            <p className="text-[#00E5FF] font-mono text-xs tracking-widest uppercase mt-4">
              Agency Dashboard
            </p>
          </div>

          {/* Data Overview Card (Top-Middle) */}
          <div className="bento-card col-span-1 md:col-span-1 lg:col-span-2 row-span-1 rounded-[2rem] bg-gradient-to-br from-[#0a192f] to-[#020c1b] border border-[#00E5FF]/20 p-8 flex flex-col justify-center shadow-[0_0_40px_rgba(0,229,255,0.1)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00E5FF] opacity-10 blur-[50px] rounded-full" />
            <span className="text-sm text-gray-400 font-mono mb-2 uppercase tracking-wider">Total Ad Spend</span>
            <div className="flex items-end gap-4">
              <span className="text-6xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">$1.2M</span>
              <span className="text-[#00ff88] text-lg font-medium flex items-center mb-2 px-2 py-1 bg-[#00ff88]/10 rounded-full">
                <TrendingUp className="w-4 h-4 mr-1" /> +18.4%
              </span>
            </div>
          </div>

          {/* Team Photo Card (Top-Right) */}
          <div className="bento-card col-span-1 md:col-span-2 lg:col-span-1 row-span-1 rounded-[2rem] overflow-hidden relative group">
            <Image
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop"
              alt="Team Collaborating"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
              <h3 className="text-xl font-bold text-white mb-1">MEET OUR TEAM</h3>
              <p className="text-xs text-gray-300 font-mono tracking-widest uppercase">Innovators & Strategists</p>
            </div>
          </div>

          {/* Central Hero Card (Bottom-Left) */}
          <div className="bento-card col-span-1 md:col-span-2 lg:col-span-2 row-span-2 rounded-[2rem] bg-white/[0.03] border border-white/10 backdrop-blur-xl p-8 flex flex-col justify-between shadow-2xl overflow-hidden relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[60%] bg-[#0f766e]/20 blur-[80px] rounded-full pointer-events-none" />
            <div className="z-10">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-semibold text-white">Campaign Performance</h3>
                <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-gray-300 outline-none">
                  <option>Last 30 Days</option>
                  <option>This Year</option>
                </select>
              </div>
              
              {/* Fake Graph */}
              <div className="relative h-48 w-full flex items-end justify-between px-2 pb-6">
                 {[40, 60, 45, 80, 55, 90, 70].map((val, i) => (
                    <div key={i} className="w-[10%] bg-gradient-to-t from-[#00E5FF]/40 to-transparent rounded-t-sm transition-all duration-1000" style={{ height: `${val}%` }}>
                       <div className="w-full h-1 bg-[#00E5FF] rounded-t-full shadow-[0_0_10px_#00E5FF]" />
                    </div>
                 ))}
                 
                 {/* Smooth Line Curve Mock */}
                 <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                    <path d="M 0,100 C 10,60 20,40 30,55 C 40,80 50,20 60,45 C 70,10 85,30 100,5" fill="none" stroke="#00E5FF" strokeWidth="1" strokeLinecap="round" className="drop-shadow-[0_0_8px_#00E5FF] opacity-70" />
                 </svg>
              </div>
            </div>
            
            <button className="z-10 w-full py-4 mt-6 rounded-xl bg-gradient-to-r from-[#0f766e] to-[#0369a1] hover:from-[#0d6961] hover:to-[#025a8c] text-white font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
              VIEW DETAILED REPORTS
            </button>
          </div>

          {/* Quick Access Module (Bottom-Middle) */}
          <div className="bento-card col-span-1 md:col-span-1 lg:col-span-1 row-span-1 rounded-[2rem] bg-black/40 border border-white/5 p-6 backdrop-blur-2xl flex flex-col justify-center items-center shadow-inner relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-16 h-16 bg-[#4338ca] opacity-30 blur-[30px] rounded-full group-hover:scale-150 transition-transform duration-500" />
             <div className="w-48 h-full bg-[#111] rounded-[2rem] border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] p-4 flex flex-col">
                <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-4" />
                <h4 className="text-xs text-center text-gray-400 font-mono mb-4 uppercase">KPIs Snapshot</h4>
                <div className="space-y-3 flex-1">
                   <div className="bg-white/5 rounded-lg p-3 flex justify-between items-center">
                     <span className="text-xs text-gray-400">Leads</span>
                     <span className="text-sm font-semibold text-white">8,402</span>
                   </div>
                   <div className="bg-white/5 rounded-lg p-3 flex justify-between items-center">
                     <span className="text-xs text-gray-400">ROI</span>
                     <span className="text-sm font-semibold text-[#00ff88]">2.4x</span>
                   </div>
                </div>
                <div className="flex justify-around mt-4 pt-4 border-t border-white/10">
                   <LayoutDashboard className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
                   <Search className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
                </div>
             </div>
          </div>

          {/* Service Module Grid - Inner Grid (Bottom-Right) */}
          <div className="bento-card col-span-1 md:col-span-1 lg:col-span-1 row-span-2 grid grid-cols-2 grid-rows-2 gap-4">
             {/* Card 1 */}
             <div className="rounded-[1.5rem] bg-white/[0.02] border border-white/10 p-5 flex flex-col items-center justify-center text-center hover:bg-white/[0.05] transition-colors">
               <div className="w-10 h-10 rounded-full bg-[#00ff88]/20 flex items-center justify-center mb-3">
                 <Search className="w-5 h-5 text-[#00ff88]" />
               </div>
               <span className="text-xs font-semibold text-gray-200">SEO</span>
               <span className="text-[10px] text-gray-500 mt-1">Optimization</span>
             </div>
             {/* Card 2 */}
             <div className="rounded-[1.5rem] bg-white/[0.02] border border-white/10 p-5 flex flex-col items-center justify-center text-center hover:bg-white/[0.05] transition-colors">
               <div className="w-10 h-10 rounded-full bg-[#00E5FF]/20 flex items-center justify-center mb-3">
                 <TrendingUp className="w-5 h-5 text-[#00E5FF]" />
               </div>
               <span className="text-xs font-semibold text-gray-200">PPC</span>
               <span className="text-[10px] text-gray-500 mt-1">Management</span>
             </div>
             {/* Card 3 */}
             <div className="rounded-[1.5rem] bg-white/[0.02] border border-white/10 p-5 flex flex-col items-center justify-center text-center hover:bg-white/[0.05] transition-colors">
               <div className="w-10 h-10 rounded-full bg-[#818cf8]/20 flex items-center justify-center mb-3">
                 <PenTool className="w-5 h-5 text-[#818cf8]" />
               </div>
               <span className="text-xs font-semibold text-gray-200">CONTENT</span>
               <span className="text-[10px] text-gray-500 mt-1">Strategy</span>
             </div>
             {/* Card 4 */}
             <div className="rounded-[1.5rem] bg-white/[0.02] border border-white/10 p-5 flex flex-col items-center justify-center text-center hover:bg-white/[0.05] transition-colors">
               <div className="w-10 h-10 rounded-full bg-[#f472b6]/20 flex items-center justify-center mb-3">
                 <CheckCircle2 className="w-5 h-5 text-[#f472b6]" />
               </div>
               <span className="text-xs font-semibold text-gray-200">SOCIAL</span>
               <span className="text-[10px] text-[#00ff88] mt-1 font-mono">+15% MOM</span>
             </div>
          </div>

          {/* Client Success Card (Middle-Right) */}
          <div className="bento-card col-span-1 md:col-span-2 lg:col-span-1 row-span-1 rounded-[2rem] bg-gradient-to-br from-[#0f172a] to-[#1e1b4b] border border-indigo-500/30 p-8 flex flex-col justify-center shadow-[0_0_30px_rgba(79,70,229,0.15)] group relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-indigo-600 opacity-20 blur-[50px] rounded-full group-hover:scale-150 transition-transform duration-700" />
            <div className="flex items-center gap-1 mb-4 text-[#fbbf24]">
               {[1,2,3,4,5].map(i => <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>)}
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2 italic">"QUANTUM DOUBLED OUR ROI!"</h3>
            <p className="text-sm text-indigo-200 font-mono uppercase tracking-widest mt-auto">Tech Corp</p>
          </div>

        </div>
      </div>
    </div>
  );
}
