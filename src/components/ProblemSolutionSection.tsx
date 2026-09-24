"use client";

import { useRef, useEffect } from "react";
import {
  XCircle,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  Zap,
} from "lucide-react";
import {
  initProblemSolutionAnimation,
  type ProblemSolutionRefs,
} from "@/lib/animations";

const comparisonPoints = [
  {
    problem:
      "Outdated design templates & clunky UI that look like hundreds of other sites",
    solution:
      "Custom modern luxury aesthetics engineered to command high market authority",
  },
  {
    problem:
      "Bloated page builders, slow load times (> 4s), and poor Lighthouse scores",
    solution:
      "Lightning-fast Next.js App Router & Server Components with < 300ms response times",
  },
  {
    problem:
      "Junior devs learning on your dime or agencies outsourcing to cheap freelancers",
    solution:
      "Direct senior full-stack product engineers & dedicated design leadership",
  },
  {
    problem:
      "Missed deadlines, vague communications, and radio silence after final invoice",
    solution:
      "100% transparent sprint updates, 99.8% on-time delivery & long-term partnership",
  },
];

export default function ProblemSolutionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const listItemsRef = useRef<HTMLLIElement[]>([]);
  const glow1Ref = useRef<HTMLDivElement>(null);
  const glow2Ref = useRef<HTMLDivElement>(null);
  const floatingEditRef = useRef<HTMLDivElement>(null);
  const floatingGrowthRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !headingRef.current) return;

    const refs: ProblemSolutionRefs = {
      section: sectionRef.current,
      heading: headingRef.current,
      leftCard: leftCardRef.current!,
      rightCard: rightCardRef.current!,
      listItems: listItemsRef.current.filter(Boolean),
      glowElements: [glow1Ref.current, glow2Ref.current].filter(
        Boolean
      ) as HTMLDivElement[],
      floatingElements: [
        floatingEditRef.current,
        floatingGrowthRef.current,
      ].filter(Boolean) as HTMLDivElement[],
    };

    const ctx = initProblemSolutionAnimation(refs);

    return () => {
      ctx?.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 max-w-7xl mx-auto px-6 md:px-12 relative overflow-hidden"
    >
      <div
        ref={glow1Ref}
        className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-red-500/5 blur-[150px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2"
      />
      <div
        ref={glow2Ref}
        className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#B08D57]/15 blur-[150px] rounded-full pointer-events-none translate-x-1/3 translate-y-1/3"
      />

      <div className="text-center max-w-3xl mx-auto mb-20 space-y-6 relative z-10">
        <span className="inline-block text-xs font-mono text-[#B08D57] tracking-[0.2em] uppercase font-bold">
          {"/// THE Bright Space DIFFERENCE"}
        </span>
        <h2
          ref={headingRef}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#111111] tracking-tight leading-tight"
        >
          Why Traditional Agencies <br className="hidden md:block" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 via-[#B08D57] to-[#D4BD91]">
            Fail You
          </span>{" "}
          & How We Fix It
        </h2>
        <p className="text-[#555555] text-lg leading-relaxed max-w-2xl mx-auto">
          Most client frustrations come from bloated codebases, uninspired
          designs, and communication breakdowns. Here is how Bright Space
          compares.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch relative z-10">
        <div
          ref={leftCardRef}
          className="group relative rounded-[2rem] p-[1px] bg-gradient-to-br from-red-400/40 via-red-300/10 to-transparent hover:from-red-500/60 transition-colors duration-500 shadow-md"
        >
          <div className="relative h-full bg-white/95 backdrop-blur-xl p-8 md:p-10 rounded-[2rem] flex flex-col justify-between overflow-hidden border border-red-200">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-8 border-b border-red-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-red-100 border border-red-300 flex items-center justify-center text-red-600">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#111111] mb-1">
                      The Old Way
                    </h3>
                    <p className="text-xs text-red-600 font-mono tracking-wide font-semibold">
                      Traditional Agencies & Freelancers
                    </p>
                  </div>
                </div>
                <span className="px-4 py-1.5 rounded-full text-xs font-mono bg-red-100 border border-red-300 text-red-700 font-bold">
                  High Risk
                </span>
              </div>

              <ul className="space-y-6">
                {comparisonPoints.map((pt, i) => (
                  <li
                    key={i}
                    ref={(el) => {
                      if (el) listItemsRef.current[i] = el;
                    }}
                    className="flex items-start gap-4 text-[15px] leading-relaxed text-[#555555]"
                  >
                    <div className="mt-1 bg-red-100 rounded-full p-0.5 shrink-0">
                      <XCircle className="w-4 h-4 text-red-500" />
                    </div>
                    <span>{pt.problem}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 pt-6 border-t border-red-100">
              <div className="flex items-center justify-center gap-2 text-sm text-red-600 font-medium">
                <AlertTriangle className="w-4 h-4" />
                <span>
                  Result: High technical debt, slow launch, poor user
                  conversion.
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          ref={rightCardRef}
          className="group relative rounded-[2rem] p-[1px] bg-gradient-to-br from-[#B08D57] via-[#D4BD91] to-transparent hover:from-[#9A7846] transition-colors duration-500 shadow-xl"
        >
          <div className="relative h-full bg-white backdrop-blur-xl p-8 md:p-10 rounded-[2rem] flex flex-col justify-between overflow-hidden border border-[#DCD4C5]">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#B08D57]/5 to-transparent pointer-events-none" />

            <div>
              <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-8 border-b border-[#DCD4C5]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#B08D57] to-[#8C6D3B] flex items-center justify-center text-white shadow-md">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#111111] mb-1">
                      The Bright Space Way
                    </h3>
                    <p className="text-xs text-[#B08D57] font-mono tracking-wide font-bold">
                      Modern Product & Software Studio
                    </p>
                  </div>
                </div>
                <span className="px-4 py-1.5 rounded-full text-xs font-mono bg-[#FAF7F2] border border-[#DCD4C5] text-[#B08D57] font-bold">
                  Premium Standard
                </span>
              </div>

              <ul className="space-y-6">
                {comparisonPoints.map((pt, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-4 text-[15px] leading-relaxed text-[#111111]"
                  >
                    <div className="mt-1 bg-[#B08D57]/15 rounded-full p-0.5 shrink-0 text-[#B08D57]">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="font-semibold">{pt.solution}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 pt-6 border-t border-[#DCD4C5]">
              <div className="flex items-center justify-center gap-2 text-sm text-[#B08D57] font-bold">
                <Zap className="w-4 h-4" />
                <span>
                  Result: Zero tech debt, 60fps performance & high ROI.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
