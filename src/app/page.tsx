"use client";

import { useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import {
  ArrowUpRight,
  ChevronRight,
} from "lucide-react";
import MagneticButton from "@/components/MagneticButton";
import ProjectCard from "@/components/ProjectCard";
import LogoRail from "@/components/LogoRail";
import ProblemSolutionSection from "@/components/ProblemSolutionSection";
import TechArsenalSection from "@/components/TechArsenalSection";
import CinematicServicesShowcase from "@/components/CinematicServicesShowcase";
import ScrollServices from "@/components/ScrollServices";
import MeetTheTeamSection from "@/components/MeetTheTeamSection";
import TestimonialChain from "@/components/TestimonialChain";
import ProjectLeadForm from "@/components/ProjectLeadForm";
import BankingBento from "@/components/BankingBento";
import FinalCtaSection from "@/components/FinalCtaSection";
import InfiniteProductShowcase from "@/components/InfiniteProductShowcase";
import WhyUsSection from "@/components/WhyUsSection";
import MeasuredResultsSection from "@/components/MeasuredResultsSection";
import OurImpactSection from "@/components/OurImpactSection";
import HeroCanvasScrubber, { HeroCanvasScrubberHandle } from "@/components/HeroCanvasScrubber";

// Lazy-load the globe — its engine computes ~8000 particles at module parse time (4.8s CPU)
// Deferring this to when the component actually mounts saves massive TBT
const RotatingGlobe = dynamic(() => import("@/components/RotatingGlobe"), {
  ssr: false,
  loading: () => <div className="w-full h-full" />,
});

import { projectsData } from "@/data/projects";

import {
  initHeroAnimation,
  initProjectShowcase,
  initCaseStudiesAnimation,
  initWhyUsAnimation,
  initFinalCTAAnimation,
  type HeroRefs,
  type ProjectShowcaseRefs,
  type CaseStudyRefs,
  type WhyUsRefs,
  type FinalCTARefs,
} from "@/lib/animations";



export default function HomePage() {
  const featuredProjects = projectsData.filter((p) => p.featured);

  // Refs
  const heroSectionRef = useRef<HTMLElement>(null);
  const heroCanvasScrubberRef = useRef<HeroCanvasScrubberHandle>(null);
  const heroContentWrapperRef = useRef<HTMLDivElement>(null);
  const heroScrollHintRef = useRef<HTMLDivElement>(null);
  const heroLine1Ref = useRef<HTMLSpanElement>(null);
  const heroLine2Ref = useRef<HTMLSpanElement>(null);
  const heroSloganRef = useRef<HTMLParagraphElement>(null);
  const heroCtaRef = useRef<HTMLDivElement>(null);
  const heroLogosRef = useRef<HTMLDivElement>(null);
  const heroAmbientRef = useRef<HTMLDivElement>(null);
  const heroGlobeRef = useRef<HTMLDivElement>(null);

  const projectSectionRef = useRef<HTMLElement>(null);
  const projectHeaderRef = useRef<HTMLDivElement>(null);
  const projectPinRef = useRef<HTMLDivElement>(null);
  const projectTrackRef = useRef<HTMLDivElement>(null);
  const projectPanelRefs = useRef<HTMLDivElement[]>([]);
  const projectProgressBarRef = useRef<HTMLDivElement>(null);

  const caseSectionRef = useRef<HTMLElement>(null);
  const caseHeadingRef = useRef<HTMLDivElement>(null);
  const caseCardRefs = useRef<HTMLDivElement[]>([]);

  const whySectionRef = useRef<HTMLElement>(null);
  const whyHeadingRef = useRef<HTMLDivElement>(null);
  const whyPillarRefs = useRef<HTMLDivElement[]>([]);


  const ctaSectionRef = useRef<HTMLElement>(null);
  const ctaHeadingRef = useRef<HTMLHeadingElement>(null);
  const ctaItalicRef = useRef<HTMLSpanElement>(null);
  const ctaSubtitleRef = useRef<HTMLSpanElement>(null);
  const ctaDescRef = useRef<HTMLParagraphElement>(null);
  const ctaButtonRef = useRef<HTMLDivElement>(null);
  const ctaGlowRef = useRef<HTMLDivElement>(null);

  const setProjectPanelRef = useCallback(
    (el: HTMLDivElement | null, idx: number) => {
      if (el) projectPanelRefs.current[idx] = el;
    },
    []
  );


  useEffect(() => {
    const contexts: (gsap.Context | null | undefined)[] = [];

    // Initialize GSAP animations swiftly after mount
    const timer = setTimeout(() => {
      if (heroSectionRef.current && heroLine1Ref.current && heroLine2Ref.current) {
        const hRefs: HeroRefs = {
          section: heroSectionRef.current,
          headingLines: [heroLine1Ref.current, heroLine2Ref.current],
          slogan: heroSloganRef.current!,
          ctaRow: heroCtaRef.current!,
          clientLogos: heroLogosRef.current!,
          ambientGlow: heroAmbientRef.current || undefined,
          globeContainer: heroGlobeRef.current!,
          scrollHint: heroScrollHintRef.current || undefined,
          contentWrapper: heroContentWrapperRef.current || undefined,
          renderFrame: (index: number) => {
            heroCanvasScrubberRef.current?.renderFrame(index);
          },
          frameCount: 240,
        };
        contexts.push(initHeroAnimation(hRefs));
      }

      if (
        projectSectionRef.current &&
        projectPinRef.current &&
        projectTrackRef.current
      ) {
        const projRefs: ProjectShowcaseRefs = {
          section: projectSectionRef.current,
          header: projectHeaderRef.current!,
          pinContainer: projectPinRef.current,
          track: projectTrackRef.current,
          panels: projectPanelRefs.current.filter(Boolean),
          progressBar: projectProgressBarRef.current || undefined,
        };
        contexts.push(initProjectShowcase(projRefs));
      }

      if (caseSectionRef.current && caseHeadingRef.current) {
        const caseRefs: CaseStudyRefs = {
          section: caseSectionRef.current,
          heading: caseHeadingRef.current,
          cards: caseCardRefs.current.filter(Boolean),
          counters: [],
        };
        contexts.push(initCaseStudiesAnimation(caseRefs));
      }

      if (whySectionRef.current && whyHeadingRef.current) {
        const wRefs: WhyUsRefs = {
          section: whySectionRef.current,
          heading: whyHeadingRef.current,
          pillars: whyPillarRefs.current.filter(Boolean),
        };
        contexts.push(initWhyUsAnimation(wRefs));
      }


      if (ctaSectionRef.current && ctaHeadingRef.current) {
        const fRefs: FinalCTARefs = {
          section: ctaSectionRef.current,
          heading: ctaHeadingRef.current,
          italicSpan: ctaItalicRef.current!,
          subtitle: ctaSubtitleRef.current!,
          description: ctaDescRef.current!,
          ctaButton: ctaButtonRef.current!,
          glowOrb: ctaGlowRef.current!,
        };
        contexts.push(initFinalCTAAnimation(fRefs));
      }

    }, 20);

    return () => {
      clearTimeout(timer);
      contexts.forEach((ctx) => ctx?.revert());
    };
  }, []);

  return (
    <div className="relative overflow-x-clip bg-[#F3EFE6] text-[#111111]">
      <div className="fixed inset-0 bg-grid-pattern opacity-40 pointer-events-none z-0" />

      {/* ========================================================================= */}
      {/* 1. HERO SECTION — Pinned Scroll-Scrubbed Animation Stage */}
      {/* ========================================================================= */}
      <section
        ref={heroSectionRef}
        className="relative h-screen min-h-[640px] w-full flex flex-col justify-between overflow-hidden border-b border-[#DCD4C5] -mt-24 pt-24 pb-6"
      >
        <div className="absolute inset-0 z-0 overflow-hidden bg-[#F3EFE6]">
          {/* Performant HTML5 Canvas Frame Scrubber */}
          <HeroCanvasScrubber
            ref={heroCanvasScrubberRef}
            frameCount={240}
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
          />

          {/* Precision Architectural Grid Lines — subtle */}
          <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 pointer-events-none z-[1] opacity-25">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="border-r border-[#DCD4C5]/40 h-full" />
            ))}
          </div>

          {/* Minimal Subtle Ambient Glow — Keeps frames crisp, clear and vibrant */}
          <div
            ref={heroAmbientRef}
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(176,141,87,0.08)_0%,transparent_55%)] pointer-events-none z-[2]"
          />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#F3EFE6]/30 to-transparent pointer-events-none z-[2]" />
        </div>

        {/* Existing Hero Content Layer — Revealed dynamically at end of frame scrub */}
        <div
          ref={heroContentWrapperRef}
          className="max-w-7xl mx-auto px-6 md:px-12 z-10 w-full relative flex-grow flex flex-col justify-center pointer-events-none"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6 flex flex-col justify-center space-y-6 lg:pr-4">
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[104px] font-black tracking-tighter leading-[0.88] text-[#111111] uppercase select-none">
                <span className="line-reveal block">
                  <span
                    ref={heroLine1Ref}
                    className="line-reveal-inner block translate-y-[115%] rotate-2"
                  >
                    BRIGHT
                  </span>
                </span>
                <span className="line-reveal block">
                  <span
                    ref={heroLine2Ref}
                    className="line-reveal-inner block text-[#B08D57] translate-y-[115%] rotate-2"
                  >
                    SPACE
                  </span>
                </span>
              </h1>

              <p
                ref={heroSloganRef}
                className="text-lg sm:text-xl md:text-2xl text-[#555555] font-light max-w-lg leading-relaxed pt-1 opacity-0 translate-y-6"
              >
                Turning concepts into experiences that connect, inspire, and endure.
              </p>

              <div
                ref={heroCtaRef}
                className="w-full max-w-md space-y-3.5 pt-1 opacity-0 translate-y-6"
              >
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[
                      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop",
                      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop",
                      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=100&auto=format&fit=crop",
                    ].map((src, i) => (
                      <Image
                        key={i}
                        src={src}
                        alt="Client avatar"
                        width={28}
                        height={28}
                        className="w-7 h-7 rounded-full border border-[#DCD4C5] object-cover"
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5 text-[#B08D57]">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-xs">&bull;</span>
                      ))}
                    </div>
                    <span className="text-xs font-mono font-bold text-[#111111]">4.9/5</span>
                    <span className="text-[10px] font-mono tracking-wider text-[#777777] uppercase font-semibold">
                      BASED ON 180+ VERIFIED REVIEWS
                    </span>
                  </div>
                </div>

                <Link
                  href="/contact"
                  className="group flex items-center justify-between w-full py-3.5 px-4 rounded-xl border border-[#DCD4C5] bg-white hover:bg-[#EAE4D7] hover:border-[#B08D57] transition-all duration-300 shadow-sm"
                >
                  <span className="text-xs font-mono font-bold tracking-widest text-[#111111] uppercase group-hover:text-[#B08D57] transition-colors">
                    START A PROJECT
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#777777] group-hover:text-[#B08D57] group-hover:translate-x-1 transition-all" />
                </Link>
              </div>

              <div
                ref={heroLogosRef}
                className="pt-4 border-t border-[#DCD4C5] flex flex-wrap items-center gap-6 sm:gap-8 text-[#555555] text-xs font-mono tracking-widest uppercase opacity-0 translate-y-6"
              >
                <span className="hover:text-[#111111] transition-colors flex items-center gap-1.5 font-bold">
                  <span className="w-2 h-2 rounded-sm bg-[#B08D57]"></span> 3PORTALS
                </span>
                <span className="hover:text-[#111111] transition-colors flex items-center gap-1.5 font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#111111]"></span> GOODWELL
                </span>
                <span className="hover:text-[#111111] transition-colors flex items-center gap-1.5 font-bold">
                  <span className="w-2 h-2 rotate-45 bg-[#8C6D3B]"></span> INTELLECT
                </span>
                <span className="hover:text-[#111111] transition-colors flex items-center gap-1.5 font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#D4BD91]"></span> VANGUARD
                </span>
              </div>
            </div>

            <div className="lg:col-span-6 flex flex-col justify-center items-center lg:items-center">
              <div
                ref={heroGlobeRef}
                className="relative w-full h-[380px] sm:h-[440px] lg:h-[480px] flex items-center justify-center opacity-0 scale-90"
              >
                <RotatingGlobe
                  className="w-full h-full"
                  density={68}
                  speed={1.05}
                  accentColor="#B08D57"
                  wireColor="#D4BD91"
                  dotColor="#8C6D3B"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Cinematic Scroll-to-Explore Cue — Prominent, bold, luxury styling */}
        <div
          ref={heroScrollHintRef}
          className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3 pointer-events-none select-none"
        >
          <div className="flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/85 backdrop-blur-md border-2 border-[#B08D57] shadow-[0_8px_30px_rgba(176,141,87,0.3)]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#B08D57] animate-pulse" />
            <span className="text-sm sm:text-base md:text-lg font-mono font-black tracking-[0.25em] text-[#111111] uppercase">
              SCROLL TO EXPLORE
            </span>
            <span className="text-[#B08D57] font-bold text-sm sm:text-base">↓</span>
          </div>
          <div className="w-6 h-11 rounded-full border-2 border-[#B08D57] flex justify-center pt-2 shadow-md bg-white/70 backdrop-blur-xs">
            <div className="w-1.5 h-3 rounded-full bg-[#B08D57] animate-bounce" />
          </div>
        </div>
      </section>

      {/* 2. TRUST / CLIENT CRISS-CROSS LOGO RIBBONS */}
      <LogoRail />

      {/* 3. PROBLEM → SOLUTION (Market Contrast & Agency Bloat vs Bright Space) */}
      <ProblemSolutionSection />

      {/* 4. BENTO GRID ARCHITECTURE & SHOWCASE */}
      <BankingBento />

      {/* 5. CORE SERVICES & CAPABILITIES (Cinematic Viewport-Sized Stacked Showcase) */}
      <CinematicServicesShowcase />

      {/* 6. TECH STACK & ARSENAL */}
      <TechArsenalSection />

      {/* 7. INTERACTIVE CREATIVE PROCESS (560vh Pinned Circular Journey) */}
      <ScrollServices />

      {/* 8. FEATURED WORK */}
      <section
        ref={projectSectionRef}
        className="relative bg-[#FAF7F2] border-b border-[#DCD4C5] overflow-hidden"
      >
        {/* DESKTOP PINNED VIEWPORT SHOWCASE (h-screen, zero white space gap, generous bottom margin/padding) */}
        <div
          ref={projectPinRef}
          className="hidden lg:flex flex-col justify-between w-full h-screen min-h-[680px] max-h-[1050px] relative overflow-hidden"
        >
          {/* Header Row: Compact, elegant, integrated at top of pinned screen */}
          <div
            ref={projectHeaderRef}
            className="w-full max-w-7xl mx-auto px-6 md:px-12 pt-6 lg:pt-8 pb-2 shrink-0 z-20 flex items-center justify-between"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#B08D57] animate-pulse" />
                <span className="text-xs font-mono text-[#B08D57] tracking-widest uppercase font-bold">
                  {"/// FEATURED WORK"}
                </span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-[#111111] tracking-tight mt-1">
                Selected <span className="font-serif italic text-gradient-accent">Digital Products</span>
              </h2>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/work">
                <MagneticButton variant="outline" className="px-5 py-2.5 text-xs font-bold font-mono">
                  Explore All Projects <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                </MagneticButton>
              </Link>
            </div>
          </div>

          {/* Middle Stage: Horizontal Track with properly proportioned cards */}
          <div className="flex-1 w-full min-h-0 relative flex items-center overflow-hidden my-auto">
            <div
              ref={projectTrackRef}
              className="flex h-full items-center wc-transform"
            >
              {featuredProjects.map((project, idx) => (
                <div
                  key={project.id}
                  ref={(el) => setProjectPanelRef(el, idx)}
                  className="showcase-panel w-screen h-full flex items-center justify-center px-6 md:px-12 lg:px-16 shrink-0"
                >
                  <div className="relative w-full max-w-6xl mx-auto grid grid-cols-12 gap-8 lg:gap-12 items-center">
                    {/* Visual Mockup Frame (Col 1-7: 58% width, max-h 48vh, 16:10 ratio) */}
                    <div className="col-span-12 lg:col-span-7 relative">
                      <div className="showcase-img relative w-full aspect-[16/10] max-h-[48vh] rounded-2xl lg:rounded-3xl overflow-hidden border border-[#DCD4C5] bg-[#181716] shadow-[0_20px_50px_-15px_rgba(17,17,17,0.18)] group">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="showcase-img-inner object-cover object-center transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 1200px) 60vw, 700px"
                          priority={idx === 0}
                        />

                        {/* Floating Top Glass Bar */}
                        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
                          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono tracking-wider">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#81C784]" />
                            <span>{project.category}</span>
                          </div>
                          <span className="px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white/90 text-[11px] font-mono">
                            {project.client}
                          </span>
                        </div>

                        {/* Subtle Bottom Ambient Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                      </div>
                    </div>

                    {/* Content Column (Col 8-12: 42% width) */}
                    <div className="col-span-12 lg:col-span-5 flex flex-col justify-center space-y-4 lg:space-y-5 relative">
                      <div className="flex items-center justify-between">
                        <span className="showcase-category text-xs font-mono text-[#B08D57] tracking-widest uppercase font-bold flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#B08D57]" />
                          {project.subcategory}
                        </span>
                        <span className="text-3xl lg:text-4xl font-serif italic text-[#B08D57]/30 font-bold select-none">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <h3 className="showcase-title text-2xl lg:text-3xl xl:text-4xl font-extrabold text-[#111111] tracking-tight leading-tight">
                        {project.title}
                      </h3>

                      <div className="showcase-meta space-y-4">
                        <p className="text-sm lg:text-base text-[#555555] leading-relaxed line-clamp-3">
                          {project.tagline}
                        </p>

                        {project.results && project.results.length > 0 && (
                          <div className="grid grid-cols-2 gap-3 pt-1">
                            {project.results.slice(0, 2).map((r, ri) => (
                              <div
                                key={ri}
                                className="p-3 rounded-xl bg-white/80 border border-[#DCD4C5] shadow-xs"
                              >
                                <div className="text-xl font-extrabold font-mono text-[#B08D57]">
                                  {r.value}
                                </div>
                                <div className="text-[10px] font-mono text-[#777777] uppercase tracking-wider mt-0.5 truncate">
                                  {r.label}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="pt-2 flex items-center gap-4">
                          <Link
                            href={`/work/${project.id}`}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#111111] hover:bg-[#B08D57] text-white text-xs font-mono uppercase font-bold transition-all shadow-md group"
                          >
                            <span>View Case Study</span>
                            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </Link>
                          <span className="text-[11px] font-mono text-[#777777]">
                            Timeline: {project.timeline}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Bar: Generous padding & margin, dynamic progress, slide cues */}
          <div className="w-full max-w-7xl mx-auto px-6 md:px-12 pb-6 lg:pb-8 pt-3 border-t border-[#DCD4C5]/80 flex items-center justify-between text-xs font-mono text-[#777777] shrink-0 z-20">
            <div className="flex items-center gap-3">
              <span className="text-[#111111] font-bold">
                [ 01 — 03 ]
              </span>
              <span>•</span>
              <span className="hidden sm:inline">Featured Work Gallery</span>
            </div>

            {/* Dynamic Progress Bar */}
            <div className="flex items-center gap-2 w-44 md:w-56">
              <div className="h-1.5 w-full bg-[#DCD4C5]/60 rounded-full overflow-hidden">
                <div
                  ref={projectProgressBarRef}
                  className="h-full bg-gradient-to-r from-[#B08D57] to-[#D4BD91] rounded-full transition-all duration-75"
                  style={{ width: "33%" }}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[#B08D57] font-semibold">Scroll to explore</span>
              <span className="inline-block animate-pulse text-[#B08D57]">→</span>
            </div>
          </div>
        </div>

        {/* MOBILE / TABLET VIEW (Responsive clean grid with comfortable spacing) */}
        <div className="lg:hidden max-w-7xl mx-auto px-6 md:px-12 py-16">
          <div className="flex flex-col gap-6 mb-10">
            <div>
              <span className="text-xs font-mono text-[#B08D57] tracking-widest uppercase font-bold">
                {"/// FEATURED WORK"}
              </span>
              <h2 className="text-3xl font-extrabold text-[#111111] tracking-tight mt-1">
                Selected <span className="font-serif italic text-gradient-accent">Digital Products</span>
              </h2>
            </div>
            <Link href="/work">
              <MagneticButton variant="outline" className="w-full justify-center">
                Explore All Projects <ArrowUpRight className="w-4 h-4 ml-1" />
              </MagneticButton>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.map((project, idx) => (
              <ProjectCard key={project.id} project={project} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* 9. INFINITE PRODUCT & DESIGN SHOWCASE (Bi-directional Marquee with Center Floating Badge) */}
      <InfiniteProductShowcase />

      {/* 10. MEASURED COMMERCIAL RESULTS & CASE STUDIES (Same-to-same layout with 3D artwork and golden arc) */}
      <MeasuredResultsSection />

      {/* 11. WHY CHOOSE US (New Modern Bento & Showreel Layout) */}
      <WhyUsSection />

      {/* 12. AGENCY STATS & MILESTONES — OUR IMPACT */}
      <OurImpactSection />

      {/* 13. MEET THE CREATIVE TEAM */}
      <section className="bg-[#F3EFE6] border-b border-[#DCD4C5]">
        <MeetTheTeamSection />
      </section>

      {/* 14. CLIENT TESTIMONIALS */}
      <TestimonialChain />

      {/* 15. INTERACTIVE PROJECT SCOPE BUILDER & FINAL CTA */}
      <FinalCtaSection />

      {/* 17. DIRECT PROJECT BRIEF & LEAD INTAKE */}
      <ProjectLeadForm />
    </div>
  );
}
