"use client";

import Link from "next/link";
import { motion } from "framer-motion";
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
import {
  DisneyReveal,
  DisneyStaggerGroup,
  DisneyStaggerItem,
  SquashStretchOnScroll,
  DisneyArcParallax,
} from "@/components/DisneyScrollReveal";

import { projectsData } from "@/data/projects";
import { servicesData } from "@/data/services";
import { faqsData } from "@/data/faqs";

const agencyMilestones = [
  { value: "50+", label: "Digital Products Shipped", desc: "High-performing websites, SaaS apps & custom software." },
  { value: "99.8%", label: "On-Time Sprint Record", desc: "Punctual delivery with zero compromise on code quality." },
  { value: "15+", label: "Global Tech Hubs", desc: "Clients across USA, UK, Europe, and Asia Pacific." },
  { value: "2.4x", label: "Avg Conversion Growth", desc: "Measured conversion surge post ARTISAN redesign." },
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

  return (
    <div className="relative overflow-x-clip bg-[#050505] text-[#F5F5F5]">
      {/* Ambient Background Grid for rest of the page */}
      <div className="fixed inset-0 bg-grid-pattern opacity-20 pointer-events-none z-0" />

      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      {/* ========================================================================= */}
      {/* 1. HERO SECTION — Bright Space (MINIMAL EDITORIAL AESTHETIC) */}
      {/* ========================================================================= */}
      <section className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden border-b border-white/10 -mt-24 pt-28 pb-8">

        {/* Cinematic Background Video & Ambient Lighting */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-[#02040a]">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-screen pointer-events-none scale-105"
            src="/hero-bg.mp4"
          />

          {/* Architectural Vertical Grid Lines (Framer Editorial Style) */}
          <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 pointer-events-none z-0">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="border-r border-white/[0.04] h-full" />
            ))}
          </div>

          {/* Deep Ambient Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(14,165,233,0.12)_0%,rgba(2,6,23,0.9)_70%,#050505_100%)] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#02040a]/80 via-transparent to-[#050505] pointer-events-none" />
        </div>

        {/* Hero Grid: Left side Bright Space Bold + Slogan + CTA, Right side 3D Interactive Globe */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 z-10 w-full relative flex-grow flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left Column: Giant Bold Bright Space & Slogan & CTA */}
            <div className="lg:col-span-6 flex flex-col justify-center space-y-6 lg:pr-4">

              {/* Giant Bold Studio Typography */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-6xl sm:text-7xl md:text-8xl lg:text-[104px] font-black tracking-tighter leading-[0.88] text-white uppercase select-none"
              >
                BRIGHT<br />
                SPACE
              </motion.h1>

              {/* Short crisp slogan */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="text-lg sm:text-xl md:text-2xl text-neutral-300 font-light max-w-lg leading-relaxed pt-1"
              >
                Turning concepts into experiences that connect, inspire, and endure.
              </motion.p>

              {/* Directly under text: Avatar rating & Minimal Start Project button */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="w-full max-w-md space-y-3.5 pt-1"
              >
                {/* Review Rating Pill */}
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[
                      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop",
                      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop",
                      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=100&auto=format&fit=crop",
                    ].map((src, i) => (
                      <img
                        key={i}
                        src={src}
                        alt="Client avatar"
                        className="w-7 h-7 rounded-full border border-black/80 object-cover"
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5 text-[#00E5FF]">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-xs">&bull;</span>
                      ))}
                    </div>
                    <span className="text-xs font-mono font-semibold text-white">4.9/5</span>
                    <span className="text-[10px] font-mono tracking-wider text-neutral-400 uppercase">
                      BASED ON 180+ VERIFIED REVIEWS
                    </span>
                  </div>
                </div>

                {/* Minimalist Start A Project Button */}
                <Link
                  href="/contact"
                  className="group flex items-center justify-between w-full py-3.5 px-4 rounded-xl border border-white/15 bg-white/[0.03] hover:bg-white/[0.08] hover:border-[#00E5FF]/50 transition-all duration-300"
                >
                  <span className="text-xs font-mono font-bold tracking-widest text-white uppercase group-hover:text-[#00E5FF] transition-colors">
                    START A PROJECT
                  </span>
                  <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-[#00E5FF] group-hover:translate-x-1 transition-all" />
                </Link>
              </motion.div>

              {/* Minimal Client / Partner Logos */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-6 sm:gap-8 text-neutral-400 text-xs font-mono tracking-widest uppercase"
              >
                <span className="hover:text-white transition-colors flex items-center gap-1.5 font-bold">
                  <span className="w-2 h-2 rounded-sm bg-[#00E5FF]/70"></span> 3PORTALS
                </span>
                <span className="hover:text-white transition-colors flex items-center gap-1.5 font-bold">
                  <span className="w-2 h-2 rounded-full bg-white/70"></span> GOODWELL
                </span>
                <span className="hover:text-white transition-colors flex items-center gap-1.5 font-bold">
                  <span className="w-2 h-2 rotate-45 bg-[#818cf8]"></span> INTELLECT
                </span>
                <span className="hover:text-white transition-colors flex items-center gap-1.5 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400/80"></span> VANGUARD
                </span>
              </motion.div>
            </div>

            {/* Right Column: 3D Pure Frameless Interactive Globe */}
            <div className="lg:col-span-6 flex flex-col justify-center items-center lg:items-center">
              <div className="relative w-full h-[380px] sm:h-[440px] lg:h-[480px] flex items-center justify-center">
                <RotatingGlobe
                  className="w-full h-full"
                  density={68}
                  speed={1.05}
                  accentColor="#00E5FF"
                  wireColor="#818cf8"
                  dotColor="#c7d2fe"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. TRUST / CLIENT LOGOS */}
      {/* ========================================================================= */}
      <LogoRail />

      {/* ========================================================================= */}
      {/* 3. PROBLEM → SOLUTION */}
      {/* ========================================================================= */}
      <ProblemSolutionSection />

      {/* ========================================================================= */}
      {/* 4. CORE SERVICES (Disney Staging & Overlapping Follow-Through) */}
      {/* ========================================================================= */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-12 relative">
        <DisneyReveal className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-mono text-[#00E5FF] tracking-widest uppercase">
            {"/// OUR CAPABILITIES"}
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Engineered for <span className="font-serif italic text-gradient-accent">Scale & Speed</span>
          </h2>
          <p className="text-[#9A9A9A] text-base leading-relaxed">
            From luxury web design to cloud-native SaaS engineering, we deliver complete digital product solutions under one roof.
          </p>
        </DisneyReveal>

        <DisneyStaggerGroup stagger={0.08} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.slice(0, 6).map((service) => (
            <DisneyStaggerItem
              key={service.id}
              className="glass-card p-8 rounded-3xl relative overflow-hidden group hover:border-[#6C63FF]/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#6C63FF]/20 to-[#00E5FF]/20 border border-[rgba(255,255,255,0.1)] flex items-center justify-center mb-6 text-[#00E5FF] group-hover:scale-110 transition-transform">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#00E5FF] transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-[#9A9A9A] leading-relaxed mb-6">
                  {service.description}
                </p>
                <ul className="space-y-2 mb-8">
                  {service.capabilities.slice(0, 3).map((item, i) => (
                    <li key={i} className="text-xs text-[#D1D5DB] flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00E5FF] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="/services"
                className="text-xs font-mono uppercase tracking-wider text-white group-hover:text-[#00E5FF] inline-flex items-center gap-1 transition-colors pt-4 border-t border-[rgba(255,255,255,0.06)]"
              >
                Learn More <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </DisneyStaggerItem>
          ))}
        </DisneyStaggerGroup>
      </section>

      {/* ========================================================================= */}
      {/* 5. TECH STACK / ARSENAL */}
      {/* ========================================================================= */}
      <TechArsenalSection />

      {/* ========================================================================= */}
      {/* 6. FEATURED WORK (Velocity Squash & Stretch on Scroll) */}
      {/* ========================================================================= */}
      <section className="py-24 bg-[#08080c] border-b border-[rgba(255,255,255,0.06)] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <DisneyReveal className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-xs font-mono text-[#00E5FF] tracking-widest uppercase">
                {"/// FEATURED WORK"}
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mt-2">
                Selected <span className="font-serif italic text-gradient-accent">Digital Products</span>
              </h2>
            </div>
            <Link href="/work">
              <MagneticButton variant="outline">
                Explore All Projects <ArrowUpRight className="w-4 h-4 ml-1" />
              </MagneticButton>
            </Link>
          </DisneyReveal>

          <SquashStretchOnScroll intensity={0.025}>
            <DisneyStaggerGroup stagger={0.12} className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {featuredProjects.map((project, idx) => (
                <DisneyStaggerItem key={project.id}>
                  <ProjectCard project={project} index={idx} />
                </DisneyStaggerItem>
              ))}
            </DisneyStaggerGroup>
          </SquashStretchOnScroll>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. CASE STUDIES / RESULTS (Anticipation & Secondary Action) */}
      {/* ========================================================================= */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-12 relative">
        <DisneyReveal className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-mono text-[#00E5FF] tracking-widest uppercase">
            {"/// MEASURED RESULTS"}
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Commercial Impact & <span className="font-serif italic text-gradient-accent">Case Studies</span>
          </h2>
          <p className="text-[#9A9A9A] text-base leading-relaxed">
            We measure success not just in clean code and aesthetic design, but in real business outcomes and revenue acceleration.
          </p>
        </DisneyReveal>

        <DisneyStaggerGroup stagger={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <DisneyStaggerItem className="glass-card p-8 rounded-3xl border border-[#6C63FF]/30 space-y-4">
            <div className="text-5xl font-extrabold font-mono text-gradient-accent">+44%</div>
            <h4 className="text-xl font-bold text-white">SaaS User Retention</h4>
            <p className="text-xs text-[#9A9A9A] leading-relaxed">
              Refactored Nexus Systems legacy portal into a zero-latency Next.js web application with intuitive workflow UX.
            </p>
            <div className="pt-2 text-[11px] font-mono text-[#00E5FF] uppercase">
              Client: Nexus Systems • SaaS Platform
            </div>
          </DisneyStaggerItem>

          <DisneyStaggerItem className="glass-card p-8 rounded-3xl border border-[#00E5FF]/30 space-y-4">
            <div className="text-5xl font-extrabold font-mono text-[#00E5FF]">2.4x</div>
            <h4 className="text-xl font-bold text-white">Conversion Surge</h4>
            <p className="text-xs text-[#9A9A9A] leading-relaxed">
              Designed a high-converting digital branding experience for Horizon Capital, doubling lead generation in 90 days.
            </p>
            <div className="pt-2 text-[11px] font-mono text-[#00E5FF] uppercase">
              Client: Horizon Capital • Fintech Portal
            </div>
          </DisneyStaggerItem>

          <DisneyStaggerItem className="glass-card p-8 rounded-3xl border border-[#6C63FF]/30 space-y-4">
            <div className="text-5xl font-extrabold font-mono text-gradient-accent">-60%</div>
            <h4 className="text-xl font-bold text-white">Manual Processing</h4>
            <p className="text-xs text-[#9A9A9A] leading-relaxed">
              Built automated custom internal software tools & REST APIs that reduced operational manual processing time by over half.
            </p>
            <div className="pt-2 text-[11px] font-mono text-[#00E5FF] uppercase">
              Client: Vanguard AI • Enterprise Workflow
            </div>
          </DisneyStaggerItem>
        </DisneyStaggerGroup>
      </section>

      {/* ========================================================================= */}
      {/* 8. SCROLL SERVICES (GSAP PINNED ARC WORKFLOW) */}
      {/* ========================================================================= */}
      <ScrollServices />

      {/* ========================================================================= */}
      {/* 9. WHY CHOOSE US (Disney Staging & Overlapping Follow-Through) */}
      {/* ========================================================================= */}
      <section className="py-28 max-w-7xl mx-auto px-6 md:px-12 relative">
        <DisneyReveal className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-mono text-[#00E5FF] tracking-widest uppercase">
            {"/// BUILT DIFFERENT"}
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Why Choose <span className="font-serif italic text-gradient-accent">ARTISAN.DEV</span>
          </h2>
          <p className="text-[#9A9A9A] text-base leading-relaxed">
            We combine high-end aesthetic taste with strict software engineering discipline to deliver exceptional digital products.
          </p>
        </DisneyReveal>

        <DisneyStaggerGroup stagger={0.09} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {whyUsPillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <DisneyStaggerItem
                key={pillar.number}
                className="glass-card p-8 rounded-3xl relative border border-[rgba(255,255,255,0.08)] hover:border-[#6C63FF]/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-2xl font-extrabold font-mono text-[#00E5FF]">
                      {pillar.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#121218] border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-[#6C63FF]">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-[#9A9A9A] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </DisneyStaggerItem>
            );
          })}
        </DisneyStaggerGroup>
      </section>

      {/* ========================================================================= */}
      {/* 10. MEET THE TEAM */}
      {/* ========================================================================= */}
      <section className="bg-[#08080c] border-y border-[rgba(255,255,255,0.06)]">
        <MeetTheTeamSection />
      </section>

      {/* ========================================================================= */}
      {/* 11. CLIENT TESTIMONIALS (100vh Chain Style) */}
      {/* ========================================================================= */}
      <TestimonialChain />

      {/* ========================================================================= */}
      {/* 12. AGENCY STATS & MILESTONES (Disney Cascading Reveal) */}
      {/* ========================================================================= */}
      <section className="py-24 bg-[#08080c] border-y border-[rgba(255,255,255,0.06)] relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <DisneyStaggerGroup stagger={0.08} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {agencyMilestones.map((m) => (
              <DisneyStaggerItem
                key={m.label}
                className="glass-card p-8 rounded-3xl border border-[rgba(255,255,255,0.08)] space-y-3"
              >
                <div className="text-4xl md:text-5xl font-extrabold font-mono text-gradient-accent">
                  {m.value}
                </div>
                <h4 className="text-lg font-bold text-white tracking-tight">
                  {m.label}
                </h4>
                <p className="text-xs text-[#9A9A9A] leading-relaxed">
                  {m.desc}
                </p>
              </DisneyStaggerItem>
            ))}
          </DisneyStaggerGroup>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 13. FAQ ACCORDION */}
      {/* ========================================================================= */}
      <section className="py-28 max-w-4xl mx-auto px-6 md:px-12 relative">
        <DisneyReveal className="text-center mb-16 space-y-4">
          <span className="text-xs font-mono text-[#00E5FF] tracking-widest uppercase">
            {"/// FREQUENT QUESTIONS"}
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Frequently Asked <span className="font-serif italic text-gradient-accent">Questions</span>
          </h2>
          <p className="text-[#9A9A9A] text-base">
            Everything you need to know about starting a digital product or software engagement with us.
          </p>
        </DisneyReveal>
        <FaqAccordion items={faqsData} />
      </section>

      {/* ========================================================================= */}
      {/* 14. PROJECT BRIEF / LEAD FORM */}
      {/* ========================================================================= */}
      <ProjectLeadForm />

      {/* ========================================================================= */}
      {/* 15. FINAL CTA (Disney Arc Parallax + Organic Appeal) */}
      {/* ========================================================================= */}
      <section className="py-32 relative overflow-hidden bg-gradient-to-b from-[#050505] to-[#0a0a12]">
        {/* Disney Arc Parallax Ambient Orb */}
        <DisneyArcParallax arcStrength={24} yOffset={40} className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="glow-orb-indigo opacity-40" />
        </DisneyArcParallax>

        <DisneyReveal scaleInitial={0.95} distance={32} className="max-w-4xl mx-auto px-6 text-center relative z-10 space-y-8">
          <span className="text-xs font-mono text-[#00E5FF] tracking-widest uppercase">
            {"/// READY TO BUILD?"}
          </span>
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-tight">
            Have an Idea? <br />
            <span className="font-serif italic font-normal text-gradient-accent">Let&apos;s Build It.</span>
          </h2>
          <p className="text-lg text-[#9A9A9A] max-w-xl mx-auto leading-relaxed">
            Partner with a studio that delivers commercial-grade software engineering, luxury visual polish, and high-impact digital experiences.
          </p>
          <div className="pt-4 flex justify-center gap-4 flex-wrap">
            <Link href="/contact">
              <MagneticButton variant="primary">
                Schedule a Call <ArrowUpRight className="w-5 h-5 ml-1" />
              </MagneticButton>
            </Link>
          </div>
        </DisneyReveal>
      </section>
    </div>
  );
}
