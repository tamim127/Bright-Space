"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ChevronRight,
  Star,
  CheckCircle2,
  Quote,
  Layers,
  Sparkles,
  Zap,
  ShieldCheck,
  TrendingUp
} from "lucide-react";
import MagneticButton from "@/components/MagneticButton";
import ProjectCard from "@/components/ProjectCard";
import LogoRail from "@/components/LogoRail";
import FaqAccordion from "@/components/FaqAccordion";
import ProblemSolutionSection from "@/components/ProblemSolutionSection";
import TechArsenalSection from "@/components/TechArsenalSection";
import ProcessTimeline from "@/components/ProcessTimeline";
import ScrollServices from "@/components/ScrollServices";
import MeetTheTeamSection from "@/components/MeetTheTeamSection";
import TestimonialChain from "@/components/TestimonialChain";
import ProjectLeadForm from "@/components/ProjectLeadForm";

import { projectsData } from "@/data/projects";
import { servicesData } from "@/data/services";
import { faqsData } from "@/data/faqs";

const testimonials = [
  {
    quote: "ARTISAN transformed our legacy SaaS product into a modern, lightning-fast platform. Our user retention surged by 44% in just two months after release.",
    author: "Elena Rostova",
    role: "VP of Product, Nexus Systems",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
  },
  {
    quote: "The visual polish, typography taste, and underlying software engineering exceeded our expectations. They deliver commercial-grade software on tight deadlines.",
    author: "Marcus Thorne",
    role: "Founder & CTO, Vanguard AI",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
  },
  {
    quote: "Working with ARTISAN felt like having a top 1% Silicon Valley product engineering squad embedded right inside our company.",
    author: "Sarah Jenkins",
    role: "Director of Digital, Horizon Capital",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop",
  },
];

const metrics = [
  { value: "99.8%", label: "On-Time Delivery Rate" },
  { value: "4.9/5", label: "Client Satisfaction Rating" },
  { value: "10M+", label: "Daily Active End-Users" },
  { value: "<300ms", label: "Avg API Response Speed" },
];

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
      {/* Added -mt-24 to pull background behind navbar, pb-24 to compensate */}
      <section className="relative min-h-[100vh] flex flex-col justify-center overflow-hidden border-b border-white/5 -mt-24 pt-24 pb-16">
        
        {/* Deep Blue Organic Smoky Wave Background */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-[#020617]">
          
          {/* Base ambient glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(30,58,138,0.2)_0%,rgba(2,6,23,1)_100%)]" />

          {/* Wave Layer 1: Deep Blue/Indigo wide sweeping wave */}
          <motion.div 
            animate={{ 
              x: ['-15%', '15%', '-15%'], 
              y: ['0%', '10%', '0%'],
              rotate: [0, 3, -2, 0]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[15%] -left-[20%] w-[140%] h-[45%] rounded-[100%] bg-gradient-to-r from-transparent via-[#1e3a8a] to-transparent mix-blend-screen filter blur-[120px] opacity-[0.9]" 
          />
          
          {/* Wave Layer 2: Bright Cyan/Blue inner smoke */}
          <motion.div 
            animate={{ 
              x: ['15%', '-15%', '15%'], 
              y: ['10%', '-5%', '10%'],
              rotate: [-2, 1, -2]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[25%] -left-[20%] w-[140%] h-[35%] rounded-[100%] bg-gradient-to-r from-transparent via-[#0284c7] to-transparent mix-blend-screen filter blur-[100px] opacity-[0.7]" 
          />
          
          {/* Wave Layer 3: Soft Violet organic flow */}
          <motion.div 
            animate={{ 
              x: ['-10%', '10%', '-10%'], 
              y: ['-5%', '15%', '-5%'],
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[35%] -left-[10%] w-[120%] h-[55%] rounded-[100%] bg-gradient-to-r from-transparent via-[#4338ca] to-transparent mix-blend-screen filter blur-[140px] opacity-[0.8]" 
          />

          {/* Fine Noise Texture for video realism */}
          <div className="absolute inset-0 opacity-[0.12] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

          {/* Gradient Overlays to smoothly fade the edges into black */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/10 via-transparent to-[#020617]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#020617_100%)] opacity-60" />
        </div>

        {/* Hero Content */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-20 z-10 w-full relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Main Hero Content */}
            <div className="lg:col-span-8 space-y-8">
              {/* Status Pill Badge */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass-panel border border-[rgba(108,99,255,0.3)] shadow-[0_0_20px_rgba(108,99,255,0.15)] bg-black/40 backdrop-blur-md"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#00E5FF] animate-pulse" />
                <span className="text-xs font-mono tracking-widest text-[#D1D5DB] uppercase font-semibold">
                  PREMIUM DIGITAL PRODUCT & SOFTWARE STUDIO
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.04] text-white"
              >
                Ideas In. <br />
                <span className="font-serif italic font-normal text-gradient-accent">
                  Digital Products
                </span>{" "}
                Out.
              </motion.h1>

              {/* Subtext */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-lg md:text-xl text-[#B0B0B0] font-light max-w-2xl leading-relaxed"
              >
                We design and engineer high-performance websites, scalable web applications, SaaS platforms, and custom software built to elevate ambitious digital brands.
              </motion.p>

              {/* Hero CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="flex flex-wrap items-center gap-4 pt-2"
              >
                <Link href="/contact">
                  <MagneticButton variant="primary">
                    Start Your Project <ArrowUpRight className="w-5 h-5 ml-1" />
                  </MagneticButton>
                </Link>

                <Link href="/work">
                  <MagneticButton variant="outline">
                    Explore Our Work
                  </MagneticButton>
                </Link>
              </motion.div>

              {/* Rating Pill */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="flex items-center gap-4 pt-4 border-t border-[rgba(255,255,255,0.1)] max-w-md"
              >
                <div className="flex -space-x-2">
                  {[
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=100&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=100&auto=format&fit=crop",
                  ].map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt="Client Avatar"
                      className="w-8 h-8 rounded-full border-2 border-[#050505] object-cover"
                    />
                  ))}
                </div>
                <div className="text-xs">
                  <div className="flex items-center gap-1 text-amber-400 font-bold">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                    <span className="text-white font-mono ml-1">4.9/5.0</span>
                  </div>
                  <span className="text-[#9A9A9A] text-[11px]">
                    Rated by founders, CTOs & product leaders
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Right Metrics Grid */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-4 hidden lg:grid grid-cols-2 gap-4 relative"
            >
              {metrics.map((m) => (
                <div
                  key={m.label}
                  className="glass-card p-6 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-black/40 backdrop-blur-md hover:border-[#6C63FF]/40 hover:bg-black/60 transition-all duration-300 group"
                >
                  <div className="text-3xl font-extrabold text-white group-hover:text-[#00E5FF] transition-colors font-mono">
                    {m.value}
                  </div>
                  <div className="text-xs text-[#9A9A9A] mt-2 font-medium tracking-wide uppercase">
                    {m.label}
                  </div>
                </div>
              ))}
            </motion.div>
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
      {/* 4. CORE SERVICES */}
      {/* ========================================================================= */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-12 relative">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-mono text-[#00E5FF] tracking-widest uppercase">
            {"/// OUR CAPABILITIES"}
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Engineered for <span className="font-serif italic text-gradient-accent">Scale & Speed</span>
          </h2>
          <p className="text-[#9A9A9A] text-base leading-relaxed">
            From luxury web design to cloud-native SaaS engineering, we deliver complete digital product solutions under one roof.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.slice(0, 6).map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
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
            </motion.div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. TECH STACK / ARSENAL */}
      {/* ========================================================================= */}
      <TechArsenalSection />

      {/* ========================================================================= */}
      {/* 6. FEATURED WORK */}
      {/* ========================================================================= */}
      <section className="py-24 bg-[#08080c] border-b border-[rgba(255,255,255,0.06)] relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
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
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {featuredProjects.map((project, idx) => (
              <ProjectCard key={project.id} project={project} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. CASE STUDIES / RESULTS */}
      {/* ========================================================================= */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-12 relative">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-mono text-[#00E5FF] tracking-widest uppercase">
            {"/// MEASURED RESULTS"}
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Commercial Impact & <span className="font-serif italic text-gradient-accent">Case Studies</span>
          </h2>
          <p className="text-[#9A9A9A] text-base leading-relaxed">
            We measure success not just in clean code and aesthetic design, but in real business outcomes and revenue acceleration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card p-8 rounded-3xl border border-[#6C63FF]/30 space-y-4">
            <div className="text-5xl font-extrabold font-mono text-gradient-accent">+44%</div>
            <h4 className="text-xl font-bold text-white">SaaS User Retention</h4>
            <p className="text-xs text-[#9A9A9A] leading-relaxed">
              Refactored Nexus Systems legacy portal into a zero-latency Next.js web application with intuitive workflow UX.
            </p>
            <div className="pt-2 text-[11px] font-mono text-[#00E5FF] uppercase">
              Client: Nexus Systems • SaaS Platform
            </div>
          </div>

          <div className="glass-card p-8 rounded-3xl border border-[#00E5FF]/30 space-y-4">
            <div className="text-5xl font-extrabold font-mono text-[#00E5FF]">2.4x</div>
            <h4 className="text-xl font-bold text-white">Conversion Surge</h4>
            <p className="text-xs text-[#9A9A9A] leading-relaxed">
              Designed a high-converting digital branding experience for Horizon Capital, doubling lead generation in 90 days.
            </p>
            <div className="pt-2 text-[11px] font-mono text-[#00E5FF] uppercase">
              Client: Horizon Capital • Fintech Portal
            </div>
          </div>

          <div className="glass-card p-8 rounded-3xl border border-[#6C63FF]/30 space-y-4">
            <div className="text-5xl font-extrabold font-mono text-gradient-accent">-60%</div>
            <h4 className="text-xl font-bold text-white">Manual Processing</h4>
            <p className="text-xs text-[#9A9A9A] leading-relaxed">
              Built automated custom internal software tools & REST APIs that reduced operational manual processing time by over half.
            </p>
            <div className="pt-2 text-[11px] font-mono text-[#00E5FF] uppercase">
              Client: Vanguard AI • Enterprise Workflow
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. SCROLL SERVICES (GSAP PINNED ARC WORKFLOW) */}
      {/* ========================================================================= */}
      <ScrollServices />

      {/* ========================================================================= */}
      {/* 9. WHY CHOOSE US */}
      {/* ========================================================================= */}
      <section className="py-28 max-w-7xl mx-auto px-6 md:px-12 relative">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-mono text-[#00E5FF] tracking-widest uppercase">
            {"/// BUILT DIFFERENT"}
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Why Choose <span className="font-serif italic text-gradient-accent">ARTISAN.DEV</span>
          </h2>
          <p className="text-[#9A9A9A] text-base leading-relaxed">
            We combine high-end aesthetic taste with strict software engineering discipline to deliver exceptional digital products.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {whyUsPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
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
              </motion.div>
            );
          })}
        </div>
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
      {/* 12. AGENCY STATS & MILESTONES */}
      {/* ========================================================================= */}
      <section className="py-24 bg-[#08080c] border-y border-[rgba(255,255,255,0.06)] relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {agencyMilestones.map((m, idx) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 13. FAQ ACCORDION */}
      {/* ========================================================================= */}
      <section className="py-28 max-w-4xl mx-auto px-6 md:px-12 relative">
        <div className="text-center mb-16 space-y-4">
          <span className="text-xs font-mono text-[#00E5FF] tracking-widest uppercase">
            {"/// FREQUENT QUESTIONS"}
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Frequently Asked <span className="font-serif italic text-gradient-accent">Questions</span>
          </h2>
          <p className="text-[#9A9A9A] text-base">
            Everything you need to know about starting a digital product or software engagement with us.
          </p>
        </div>
        <FaqAccordion items={faqsData} />
      </section>

      {/* ========================================================================= */}
      {/* 14. PROJECT BRIEF / LEAD FORM */}
      {/* ========================================================================= */}
      <ProjectLeadForm />

      {/* ========================================================================= */}
      {/* 15. FINAL CTA */}
      {/* ========================================================================= */}
      <section className="py-32 relative overflow-hidden bg-gradient-to-b from-[#050505] to-[#0a0a12]">
        <div className="glow-orb-indigo top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-40" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 space-y-8">
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
        </div>
      </section>
    </div>
  );
}
