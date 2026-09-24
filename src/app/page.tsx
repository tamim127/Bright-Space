"use client";

import { useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  ChevronRight,
  CheckCircle2,
  Layers,
  Sparkles,
  Zap,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import MagneticButton from "@/components/MagneticButton";
import ProjectCard from "@/components/ProjectCard";
import LogoRail from "@/components/LogoRail";
import FaqAccordion from "@/components/FaqAccordion";
import ProblemSolutionSection from "@/components/ProblemSolutionSection";
import TechArsenalSection from "@/components/TechArsenalSection";
import ScrollServices from "@/components/ScrollServices";
import MeetTheTeamSection from "@/components/MeetTheTeamSection";
import TestimonialChain from "@/components/TestimonialChain";
import RotatingGlobe from "@/components/RotatingGlobe";
import ProjectLeadForm from "@/components/ProjectLeadForm";
import BankingBento from "@/components/BankingBento";
import FinalCtaSection from "@/components/FinalCtaSection";
import InfiniteProductShowcase from "@/components/InfiniteProductShowcase";
import WhyUsSection from "@/components/WhyUsSection";
import MeasuredResultsSection from "@/components/MeasuredResultsSection";
import HeroCanvasScrubber, { HeroCanvasScrubberHandle } from "@/components/HeroCanvasScrubber";

import { projectsData } from "@/data/projects";
import { servicesData } from "@/data/services";
import { faqsData } from "@/data/faqs";

import {
  initHeroAnimation,
  initServicesAnimation,
  initProjectShowcase,
  initCaseStudiesAnimation,
  initWhyUsAnimation,
  initStatsAnimation,
  initFinalCTAAnimation,
  type HeroRefs,
  type ServicesRefs,
  type ProjectShowcaseRefs,
  type CaseStudyRefs,
  type WhyUsRefs,
  type StatsRefs,
  type FinalCTARefs,
} from "@/lib/animations";

const agencyMilestones = [
  { value: "50+", label: "Digital Products Shipped", desc: "High-performing websites, SaaS apps & custom software." },
  { value: "99.8%", label: "On-Time Sprint Record", desc: "Punctual delivery with zero compromise on code quality." },
  { value: "15+", label: "Global Tech Hubs", desc: "Clients across USA, UK, Europe, and Asia Pacific." },
  { value: "2.4x", label: "Avg Conversion Growth", desc: "Measured conversion surge post Bright Space redesign." },
];

const whyUsPillars = [
  {
    number: "01",
    title: "Strategy First",
    description: "We thoroughly analyze your business model, competitive landscape, and user goals before writing a single line of code.",
    icon: Sparkles
  },
  {
    number: "02",
    title: "Design + Dev Synergy",
    description: "Designers and full-stack software engineers work side-by-side to deliver 60fps micro-animations and ultra-responsive layouts.",
    icon: Zap
  },
  {
    number: "03",
    title: "Scalable Architecture",
    description: "Built on modern cloud-native frameworks (Next.js 15, Node, Cloud Edge) designed for zero technical debt and effortless scaling.",
    icon: ShieldCheck
  },
  {
    number: "04",
    title: "Long-Term Partnership",
    description: "We don't disappear after launch. We provide ongoing engineering maintenance, performance optimization, and strategic upgrades.",
    icon: TrendingUp
  }
];

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

  const servicesSectionRef = useRef<HTMLElement>(null);
  const servicesHeadingRef = useRef<HTMLDivElement>(null);
  const serviceCardsRef = useRef<HTMLDivElement[]>([]);

  const projectSectionRef = useRef<HTMLElement>(null);
  const projectHeaderRef = useRef<HTMLDivElement>(null);
  const projectPinRef = useRef<HTMLDivElement>(null);
  const projectTrackRef = useRef<HTMLDivElement>(null);
  const projectPanelRefs = useRef<HTMLDivElement[]>([]);

  const caseSectionRef = useRef<HTMLElement>(null);
  const caseHeadingRef = useRef<HTMLDivElement>(null);
  const caseCardRefs = useRef<HTMLDivElement[]>([]);

  const whySectionRef = useRef<HTMLElement>(null);
  const whyHeadingRef = useRef<HTMLDivElement>(null);
  const whyPillarRefs = useRef<HTMLDivElement[]>([]);

  const statsSectionRef = useRef<HTMLElement>(null);
  const statsCardRefs = useRef<HTMLDivElement[]>([]);

  const ctaSectionRef = useRef<HTMLElement>(null);
  const ctaHeadingRef = useRef<HTMLHeadingElement>(null);
  const ctaItalicRef = useRef<HTMLSpanElement>(null);
  const ctaSubtitleRef = useRef<HTMLSpanElement>(null);
  const ctaDescRef = useRef<HTMLParagraphElement>(null);
  const ctaButtonRef = useRef<HTMLDivElement>(null);
  const ctaGlowRef = useRef<HTMLDivElement>(null);

  const setServiceCardRef = useCallback(
    (el: HTMLDivElement | null, idx: number) => {
      if (el) serviceCardsRef.current[idx] = el;
    },
    []
  );
  const setProjectPanelRef = useCallback(
    (el: HTMLDivElement | null, idx: number) => {
      if (el) projectPanelRefs.current[idx] = el;
    },
    []
  );
  const setCaseCardRef = useCallback(
    (el: HTMLDivElement | null, idx: number) => {
      if (el) caseCardRefs.current[idx] = el;
    },
    []
  );
  const setWhyPillarRef = useCallback(
    (el: HTMLDivElement | null, idx: number) => {
      if (el) whyPillarRefs.current[idx] = el;
    },
    []
  );
  const setStatsCardRef = useCallback(
    (el: HTMLDivElement | null, idx: number) => {
      if (el) statsCardRefs.current[idx] = el;
    },
    []
  );

  useEffect(() => {
    const contexts: (gsap.Context | null | undefined)[] = [];

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

      if (servicesSectionRef.current && servicesHeadingRef.current) {
        const sRefs: ServicesRefs = {
          section: servicesSectionRef.current,
          heading: servicesHeadingRef.current,
          cards: serviceCardsRef.current.filter(Boolean),
        };
        contexts.push(initServicesAnimation(sRefs));
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

      if (statsSectionRef.current) {
        const sRefs: StatsRefs = {
          section: statsSectionRef.current,
          cards: statsCardRefs.current.filter(Boolean),
        };
        contexts.push(initStatsAnimation(sRefs));
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
    }, 100);

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

          {/* Precision Architectural Grid Lines */}
          <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 pointer-events-none z-[1] opacity-50">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="border-r border-[#DCD4C5]/30 h-full" />
            ))}
          </div>

          {/* Ambient Lighting & Atmosphere */}
          <div
            ref={heroAmbientRef}
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(176,141,87,0.12)_0%,rgba(243,239,230,0.3)_70%,rgba(243,239,230,0.7)_100%)] pointer-events-none z-[2]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#F3EFE6]/40 via-transparent to-[#F3EFE6] pointer-events-none z-[2]" />
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
                    className="line-reveal-inner block"
                    style={{ transform: "translateY(115%)" }}
                  >
                    BRIGHT
                  </span>
                </span>
                <span className="line-reveal block">
                  <span
                    ref={heroLine2Ref}
                    className="line-reveal-inner block text-[#B08D57]"
                    style={{ transform: "translateY(115%)" }}
                  >
                    SPACE
                  </span>
                </span>
              </h1>

              <p
                ref={heroSloganRef}
                className="text-lg sm:text-xl md:text-2xl text-[#555555] font-light max-w-lg leading-relaxed pt-1"
                style={{ opacity: 0, transform: "translateY(24px)" }}
              >
                Turning concepts into experiences that connect, inspire, and endure.
              </p>

              <div
                ref={heroCtaRef}
                className="w-full max-w-md space-y-3.5 pt-1"
                style={{ opacity: 0, transform: "translateY(20px)" }}
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
                className="pt-4 border-t border-[#DCD4C5] flex flex-wrap items-center gap-6 sm:gap-8 text-[#555555] text-xs font-mono tracking-widest uppercase"
                style={{ opacity: 0, transform: "translateY(16px)" }}
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
                className="relative w-full h-[380px] sm:h-[440px] lg:h-[480px] flex items-center justify-center"
                style={{ opacity: 0, transform: "scale(0.85)" }}
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

        {/* Cinematic Scroll-to-Explore Cue */}
        <div
          ref={heroScrollHintRef}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none text-[#777777]"
        >
          <span className="text-[10px] font-mono tracking-[0.25em] uppercase font-semibold text-[#8C6D3B]">
            Scroll to Explore
          </span>
          <div className="w-5 h-9 rounded-full border border-[#B08D57]/50 flex justify-center pt-1.5 shadow-sm bg-white/40 backdrop-blur-xs">
            <div className="w-1 h-2 rounded-full bg-[#B08D57] animate-bounce" />
          </div>
        </div>
      </section>

      {/* 2. TRUST / CLIENT CRISS-CROSS LOGO RIBBONS */}
      <LogoRail />

      {/* 3. PROBLEM → SOLUTION (Market Contrast & Agency Bloat vs Bright Space) */}
      <ProblemSolutionSection />

      {/* 4. BENTO GRID ARCHITECTURE & SHOWCASE */}
      <BankingBento />

      {/* 5. CORE SERVICES & CAPABILITIES */}
      <section ref={servicesSectionRef} className="py-24 max-w-7xl mx-auto px-6 md:px-12 relative">
        <div ref={servicesHeadingRef} className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-mono text-[#B08D57] tracking-widest uppercase font-bold">
            {"/// OUR CAPABILITIES"}
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#111111] tracking-tight">
            Engineered for <span className="font-serif italic text-gradient-accent">Scale & Speed</span>
          </h2>
          <p className="text-[#555555] text-base leading-relaxed">
            From luxury web design to cloud-native SaaS engineering, we deliver complete digital product solutions under one roof.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.slice(0, 6).map((service, idx) => (
            <div
              key={service.id}
              ref={(el) => setServiceCardRef(el, idx)}
              className="glass-card p-8 rounded-3xl relative overflow-hidden group border border-[#DCD4C5] hover:border-[#B08D57] transition-all duration-300 flex flex-col justify-between bg-white shadow-md"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#B08D57]/15 border border-[#DCD4C5] flex items-center justify-center mb-6 text-[#B08D57] group-hover:scale-110 transition-transform">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-[#111111] mb-3 group-hover:text-[#B08D57] transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-[#555555] leading-relaxed mb-6">
                  {service.description}
                </p>
                <ul className="space-y-2 mb-8">
                  {service.capabilities.slice(0, 3).map((item, i) => (
                    <li key={i} className="text-xs text-[#444444] flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#B08D57] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="/services"
                className="text-xs font-mono uppercase tracking-wider text-[#111111] group-hover:text-[#B08D57] inline-flex items-center gap-1 transition-colors pt-4 border-t border-[#DCD4C5] font-semibold"
              >
                Learn More <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 6. TECH STACK & ARSENAL */}
      <TechArsenalSection />

      {/* 7. INTERACTIVE CREATIVE PROCESS (560vh Pinned Circular Journey) */}
      <ScrollServices />

      {/* 8. FEATURED WORK */}
      <section
        ref={projectSectionRef}
        className="relative bg-[#FAF7F2] border-b border-[#DCD4C5] overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 lg:py-24">
          <div ref={projectHeaderRef} className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-mono text-[#B08D57] tracking-widest uppercase font-bold">
                {"/// FEATURED WORK"}
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#111111] tracking-tight mt-2">
                Selected <span className="font-serif italic text-gradient-accent">Digital Products</span>
              </h2>
            </div>
            <Link href="/work">
              <MagneticButton variant="outline">
                Explore All Projects <ArrowUpRight className="w-4 h-4 ml-1" />
              </MagneticButton>
            </Link>
          </div>
        </div>

        <div ref={projectPinRef} className="hidden lg:block">
          <div
            ref={projectTrackRef}
            className="flex wc-transform"
          >
            {featuredProjects.map((project, idx) => (
              <div
                key={project.id}
                ref={(el) => setProjectPanelRef(el, idx)}
                className="showcase-panel"
              >
                <div className="showcase-number bottom-8 right-12 text-[#B08D57]/20">
                  {String(idx + 1).padStart(2, "0")}
                </div>

                <div className="relative w-full h-full flex items-center px-12 xl:px-20 gap-12">
                  <div className="showcase-img w-[55%] h-[70vh] relative shadow-xl border border-[#DCD4C5]">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="showcase-img-inner object-cover object-center"
                      sizes="55vw"
                      priority={idx < 2}
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-center space-y-6 max-w-lg">
                    <span className="showcase-category text-xs font-mono text-[#B08D57] tracking-widest uppercase font-bold">
                      {project.category} • {project.subcategory}
                    </span>
                    <h3 className="showcase-title text-4xl xl:text-5xl font-extrabold text-[#111111] tracking-tight leading-tight">
                      {project.title}
                    </h3>
                    <div className="showcase-meta space-y-4">
                      <p className="text-base text-[#555555] leading-relaxed">
                        {project.tagline}
                      </p>
                      {project.results && project.results.length > 0 && (
                        <div className="flex items-center gap-6 pt-2">
                          {project.results.slice(0, 2).map((r, ri) => (
                            <div key={ri} className="text-center">
                              <div className="text-2xl font-extrabold font-mono text-[#B08D57]">
                                {r.value}
                              </div>
                              <div className="text-[10px] font-mono text-[#777777] uppercase tracking-wider mt-1">
                                {r.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      <Link
                        href={`/work/${project.id}`}
                        className="interactive inline-flex items-center gap-2 text-sm font-mono text-[#111111] hover:text-[#B08D57] transition-colors pt-2 font-bold"
                      >
                        View Case Study <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:hidden max-w-7xl mx-auto px-6 md:px-12 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
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

      {/* 12. AGENCY STATS & MILESTONES */}
      <section ref={statsSectionRef} className="py-24 bg-[#FAF7F2] border-y border-[#DCD4C5] relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {agencyMilestones.map((m, idx) => (
              <div
                key={m.label}
                ref={(el) => setStatsCardRef(el, idx)}
                className="glass-card p-8 rounded-3xl border border-[#DCD4C5] bg-white space-y-3 shadow-md"
              >
                <div className="text-4xl md:text-5xl font-extrabold font-mono text-gradient-accent">
                  {m.value}
                </div>
                <h4 className="text-lg font-bold text-[#111111] tracking-tight">
                  {m.label}
                </h4>
                <p className="text-xs text-[#555555] leading-relaxed">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13. MEET THE CREATIVE TEAM */}
      <section className="bg-[#F3EFE6] border-b border-[#DCD4C5]">
        <MeetTheTeamSection />
      </section>

      {/* 14. CLIENT TESTIMONIALS */}
      <TestimonialChain />

      {/* 15. FAQ ACCORDION */}
      <section className="py-28 max-w-4xl mx-auto px-6 md:px-12 relative">
        <div className="text-center mb-16 space-y-4">
          <span className="text-xs font-mono text-[#B08D57] tracking-widest uppercase font-bold">
            {"/// FREQUENT QUESTIONS"}
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#111111] tracking-tight">
            Frequently Asked <span className="font-serif italic text-gradient-accent">Questions</span>
          </h2>
          <p className="text-[#555555] text-base">
            Everything you need to know about starting a digital product or software engagement with us.
          </p>
        </div>
        <FaqAccordion items={faqsData} />
      </section>

      {/* 16. INTERACTIVE PROJECT SCOPE BUILDER & FINAL CTA */}
      <FinalCtaSection />

      {/* 17. DIRECT PROJECT BRIEF & LEAD INTAKE */}
      <ProjectLeadForm />
    </div>
  );
}
