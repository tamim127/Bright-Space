"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Code2, Sparkles, TrendingUp, BarChart3, Rocket, Server, Smartphone, Monitor } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BankingBento() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // GSAP Animations - Awwwards Style Scroll Reveal
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
    <section className="py-24 bg-[#050505] text-black font-sans relative overflow-x-hidden selection:bg-[#00E5FF] selection:text-white" ref={containerRef}>
      {/* Container */}
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-[min-content_min-content_min-content] gap-4 auto-rows-[250px]">
          
          {/* Our Process Card (Top-Left) */}
          <div className="agency-bento-card col-span-1 md:col-span-1 lg:col-span-1 row-span-2 rounded-[2rem] bg-[#111111] border border-white/10 p-6 flex flex-col shadow-xl">
            <h3 className="text-sm font-bold text-white mb-6 tracking-widest uppercase">Our Process</h3>
            <div className="space-y-4 flex-1">
              {/* Step 1 */}
              <div className="flex items-center justify-between border border-white/5 bg-white/5 rounded-xl p-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#00E5FF]/20 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-[#00E5FF]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">01. Strategy</p>
                    <p className="text-[10px] text-gray-400">Research & Planning</p>
                  </div>
                </div>
              </div>
              {/* Step 2 */}
              <div className="flex items-center justify-between border border-white/5 bg-white/5 rounded-xl p-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center bg-[#818cf8]/20 rounded-full">
                     <Monitor className="w-4 h-4 text-[#818cf8]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">02. Design</p>
                    <p className="text-[10px] text-gray-400">UI/UX & Prototyping</p>
                  </div>
                </div>
              </div>
              {/* Step 3 */}
              <div className="flex items-center justify-between border border-white/5 bg-white/5 rounded-xl p-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#4ADE80]/20 text-white flex items-center justify-center rounded-full">
                     <Code2 className="w-4 h-4 text-[#4ADE80]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">03. Develop</p>
                    <p className="text-[10px] text-gray-400">Engineering & QA</p>
                  </div>
                </div>
              </div>
            </div>
            
            <button className="w-full mt-4 bg-white text-black text-sm font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors">
              Start Project <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </button>
          </div>

          {/* Slogan Text Card (Top-Middle) */}
          <div className="agency-bento-card col-span-1 md:col-span-1 lg:col-span-1 row-span-1 rounded-[2rem] bg-gradient-to-br from-[#00E5FF] to-[#0077ff] p-8 relative overflow-hidden flex flex-col justify-end shadow-xl">
            <div className="absolute top-[-20%] left-[-10%] w-[120%] h-[60%] bg-gradient-to-br from-white/30 to-transparent rounded-full blur-2xl z-0 pointer-events-none" />
            <div className="absolute top-6 right-6 z-10">
              <div className="relative">
                <Rocket className="w-10 h-10 text-white drop-shadow-md" strokeWidth={1.5} />
              </div>
            </div>
            <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-white z-10">
              Next-Gen<br />Digital<br />Experiences
            </h2>
          </div>

          {/* Large Team Photo (Top-Right) */}
          <div className="agency-bento-card col-span-1 md:col-span-2 lg:col-span-2 row-span-2 rounded-[2rem] overflow-hidden relative shadow-xl h-[520px] bg-[#111111] border border-white/10">
            <div className="absolute inset-0 p-4 flex gap-4">
              {/* Left Portrait */}
              <div className="w-[45%] h-full relative rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop"
                  alt="Team Collaboration"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Right Meeting */}
              <div className="w-[55%] h-full flex flex-col gap-4">
                <div className="w-full h-[50%] relative rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop"
                    alt="Code Review"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="w-full h-[50%] bg-[#1A1A1A] rounded-2xl p-6 flex flex-col justify-center border border-white/5">
                   <h3 className="text-gray-400 font-mono text-xs tracking-widest uppercase mb-2">Projects Shipped</h3>
                   <div className="text-5xl font-black text-white mb-4">150+</div>
                   
                   <div className="flex items-center gap-4 h-16 w-full relative">
                      <div className="bg-[#00E5FF]/20 text-[#00E5FF] text-xs font-bold px-3 py-1.5 rounded-full flex items-center">
                        <TrendingUp className="w-3 h-3 mr-1" /> 100% Success
                      </div>
                      <div className="flex-1 h-full relative flex items-center">
                         <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 40">
                           <path d="M0,35 Q10,35 20,20 T40,25 T60,10 T80,30 T100,5" fill="none" stroke="#00E5FF" strokeWidth="2" strokeLinecap="round" />
                           <circle cx="100" cy="5" r="2" fill="#00E5FF" />
                         </svg>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>

          {/* App Icons Grid (Middle-Left) */}
          <div className="agency-bento-card col-span-1 md:col-span-1 lg:col-span-1 row-span-1 grid grid-cols-2 grid-rows-2 gap-4">
             <div className="bg-[#111111] border border-white/10 rounded-[1.5rem] flex items-center justify-center shadow-lg p-4 hover:-translate-y-1 transition-transform">
                <Monitor className="w-8 h-8 text-[#00E5FF]" />
             </div>
             <div className="bg-[#111111] border border-white/10 rounded-[1.5rem] flex items-center justify-center shadow-lg p-4 hover:-translate-y-1 transition-transform">
                <Smartphone className="w-8 h-8 text-[#818cf8]" />
             </div>
             <div className="bg-[#111111] border border-white/10 rounded-[1.5rem] flex items-center justify-center shadow-lg p-4 hover:-translate-y-1 transition-transform">
                <Server className="w-8 h-8 text-[#4ADE80]" />
             </div>
             <div className="bg-[#111111] border border-white/10 rounded-[1.5rem] flex items-center justify-center shadow-lg p-4 hover:-translate-y-1 transition-transform">
                <Code2 className="w-8 h-8 text-[#F87171]" />
             </div>
          </div>

          {/* Performance Mockup Card (Bottom-Middle) */}
          <div className="agency-bento-card col-span-1 md:col-span-1 lg:col-span-1 row-span-2 rounded-[2rem] bg-[#111111] border border-white/10 p-0 relative overflow-hidden shadow-xl flex items-end justify-center group">
            {/* Ambient Background */}
            <div className="absolute top-0 left-0 w-[150%] h-[150%] bg-[radial-gradient(ellipse_at_center,rgba(0,229,255,0.1)_0%,transparent_70%)] rounded-full -translate-x-1/4 -translate-y-1/4 pointer-events-none group-hover:scale-110 transition-transform duration-700" />
            
            {/* Phone Mockup Hand */}
            <div className="relative w-full h-[110%] flex items-end justify-center">
              <div className="w-[75%] h-[85%] bg-black rounded-t-[2.5rem] border-4 border-[#333] border-b-0 shadow-[0_-10px_40px_rgba(0,229,255,0.2)] relative flex flex-col items-center pt-8 pb-4 overflow-hidden">
                 {/* Dynamic Island */}
                 <div className="absolute top-3 w-1/3 h-5 bg-[#111] rounded-full z-20" />
                 
                 {/* Lighthouse Score Ring */}
                 <div className="relative w-32 h-32 mt-8 flex items-center justify-center z-10">
                    <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                       <circle cx="50" cy="50" r="45" fill="none" stroke="#222" strokeWidth="8" />
                       <circle cx="50" cy="50" r="45" fill="none" stroke="#00E5FF" strokeWidth="8" strokeDasharray="283" strokeDashoffset="28" strokeLinecap="round" className="animate-[dash_2s_ease-out_forwards]" />
                    </svg>
                    <div className="flex flex-col items-center justify-center">
                       <span className="text-3xl font-black text-white">99</span>
                       <span className="text-[8px] text-[#00E5FF] font-mono tracking-widest uppercase">Performance</span>
                    </div>
                 </div>

                 {/* Metrics Box */}
                 <div className="mt-auto w-[85%] bg-[#1A1A1A] rounded-2xl p-4 border border-white/5 z-10">
                    <div className="space-y-3">
                       <div className="flex justify-between items-center">
                          <span className="text-[10px] text-gray-400">Accessibility</span>
                          <span className="text-xs font-bold text-[#4ADE80]">100</span>
                       </div>
                       <div className="flex justify-between items-center">
                          <span className="text-[10px] text-gray-400">Best Practices</span>
                          <span className="text-xs font-bold text-[#4ADE80]">100</span>
                       </div>
                       <div className="flex justify-between items-center">
                          <span className="text-[10px] text-gray-400">SEO</span>
                          <span className="text-xs font-bold text-[#4ADE80]">100</span>
                       </div>
                    </div>
                 </div>
                 
                 {/* Decorative elements */}
                 <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#00E5FF]/20 to-transparent z-0" />
              </div>
            </div>
          </div>

          {/* Conversion Intelligence (Bottom-Left) */}
          <div className="agency-bento-card col-span-1 md:col-span-1 lg:col-span-1 row-span-1 rounded-[2rem] bg-[#111111] border border-white/10 p-6 shadow-xl flex flex-col justify-between">
             <h3 className="text-sm font-bold text-gray-400 tracking-widest uppercase text-center mb-4">Avg Conversion</h3>
             
             <div className="flex-1 relative w-full flex items-center pt-8">
               <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 50">
                 <path d="M0,45 Q10,30 20,40 T40,25 T60,35 T80,10 T100,20" fill="none" stroke="#4ADE80" strokeWidth="3" strokeLinecap="round" />
               </svg>
               <div className="absolute right-0 top-[20%] w-3 h-3 bg-[#4ADE80] rounded-full shadow-[0_0_10px_rgba(74,222,128,0.5)]"></div>
             </div>

             <div className="mt-4">
               <p className="text-4xl font-black text-white text-center">2.4x</p>
             </div>
          </div>

          {/* Retention Bar Chart (Bottom-Right) */}
          <div className="agency-bento-card col-span-1 md:col-span-2 lg:col-span-2 row-span-1 rounded-[2rem] bg-[#111111] border border-white/10 p-8 shadow-xl flex flex-col">
             <div className="flex justify-between items-start mb-6">
                <div>
                   <h3 className="text-sm font-bold text-gray-400 tracking-widest uppercase mb-4">Client Retention</h3>
                   <div className="flex items-end gap-2 text-white">
                     <span className="text-6xl font-black leading-none">98</span>
                     <span className="text-2xl font-semibold mb-1 text-[#818cf8]">%</span>
                     <span className="text-gray-500 font-medium mb-1 ml-2">Avg Rate</span>
                   </div>
                </div>
                <div className="flex flex-col items-end">
                   <span className="text-[10px] text-gray-500 font-bold tracking-widest uppercase mb-2">Timeframe</span>
                   <select className="appearance-none bg-[#1A1A1A] text-white border border-white/10 rounded-lg px-4 py-2 pr-10 text-sm font-medium outline-none focus:border-[#818cf8]">
                     <option>This Year</option>
                     <option>All Time</option>
                   </select>
                </div>
             </div>

             {/* Bar Chart Mockup */}
             <div className="flex-1 flex items-end gap-3 lg:gap-6 mt-4 pb-2 relative h-32">
                <div className="absolute left-0 bottom-0 h-full flex flex-col justify-between text-gray-600 py-2">
                  <div className="w-4 h-1 bg-gray-600 rounded-full"></div>
                  <div className="w-6 h-1.5 bg-gray-500 rounded-full"></div>
                  <div className="w-4 h-1 bg-gray-600 rounded-full"></div>
                </div>
                <div className="pl-10 w-full h-full flex items-end justify-between">
                  {[40, 60, 55, 80, 75, 85, 95].map((h, i) => (
                    <div key={i} className="w-[10%] bg-[#818cf8]/20 rounded-t-lg transition-all duration-500 hover:bg-[#818cf8]" style={{ height: `${h}%` }}></div>
                  ))}
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
