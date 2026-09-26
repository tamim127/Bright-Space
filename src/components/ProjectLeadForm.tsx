"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Zap,
  ShieldCheck,
  Gem,
  Laptop,
  Globe,
  Code2,
  PenTool,
  Cloud,
  User,
  Mail,
  Building2,
  FileText,
  Paperclip,
  ArrowRight,
  CheckCircle2,
  X,
} from "lucide-react";
import confetti from "canvas-confetti";
import VisionThreeBackground from "@/components/VisionThreeBackground";

interface ProjectTypeOption {
  id: string;
  label: string;
  icon: React.ElementType;
}

const projectTypeOptions: ProjectTypeOption[] = [
  { id: "saas", label: "Web Application & SaaS", icon: Laptop },
  { id: "web", label: "Website Design & Dev", icon: Globe },
  { id: "custom", label: "Custom Software", icon: Code2 },
  { id: "design", label: "UI/UX Design System", icon: PenTool },
  { id: "api", label: "API & Infrastructure", icon: Cloud },
];

const budgetOptions = ["$5k – $10k", "$10k – $25k", "$25k – $50k", "$50k+"];

export default function ProjectLeadForm() {
  const [selectedType, setSelectedType] = useState<string>("saas");
  const [selectedBudget, setSelectedBudget] = useState<string>("$10k – $25k");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    brief: "",
  });
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachedFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setAttachedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#B08D57", "#D4BD91", "#1E1C1A", "#FFFFFF"],
      });
    } catch {
      // Fallback if confetti is blocked
    }
  };

  return (
    <section className="relative py-24 md:py-32 bg-[#F6F2EB] text-[#14171A] overflow-hidden border-t border-[#DFD6C8]">
      {/* 1. Real-time 3D Studio Background: Marble Pedestal, Crystals, Spheres, Glass Ribbon */}
      <VisionThreeBackground />

      {/* 2. Soft Ambient Background Curved Wave Glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 90% 60% at 50% 20%, rgba(224, 202, 166, 0.25) 0%, rgba(246, 242, 235, 0) 70%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        {/* Top Right Calligraphy Script Accent */}
        <div className="flex justify-end items-center gap-3 mb-6 lg:-mb-4">
          <span className="font-script text-2xl sm:text-3xl text-[#7D643E] font-medium tracking-wide">
            Let&apos;s Build Something Great
          </span>
          <div className="w-10 sm:w-16 h-[1px] bg-[#C5B49D]" />
        </div>

        {/* 2-Column Split: Left Pitch + Why Us Card / Right Grand White Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* ========================================================================= */}
          {/* LEFT COLUMN: Headings, Badge, Value Proposition & Dark Why-Us Card */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              {/* Top Pill Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF8F5] border border-[#DFD6C8] text-[#7B623E] text-[11px] font-mono font-bold uppercase tracking-wider shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#B08D57]" />
                <span>QUICK PROJECT ESTIMATOR & INQUIRY</span>
              </div>

              {/* Kicker */}
              <div className="pt-2">
                <span className="text-xs font-mono font-bold tracking-[0.22em] text-[#8C7B65] uppercase block">
                  GOT AN IDEA? LET&apos;S TALK
                </span>
              </div>

              {/* Main Headline */}
              <h2 className="text-4xl sm:text-5xl lg:text-[62px] font-black text-[#13161A] tracking-tight leading-[1.05]">
                Tell Us About <br />
                <span className="bg-gradient-to-r from-[#B58D52] via-[#C9A262] to-[#8C682B] bg-clip-text text-transparent font-serif italic font-normal lg:font-bold">
                  Your Vision
                </span>
              </h2>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-[#5F5A52] leading-relaxed max-w-md pt-1">
                Fill out the brief below and our engineering leads will get back
                to you within 24 hours with a custom proposal and technical strategy.
              </p>
            </div>

            {/* Why Work With Us? Luxury Dark Card */}
            <div className="relative rounded-[28px] bg-gradient-to-br from-[#1C1C1E] via-[#141416] to-[#0D0D0F] border border-white/10 shadow-[0_20px_45px_rgba(0,0,0,0.32)] p-6 sm:p-7 overflow-hidden text-white">
              {/* Fine Golden Guilloche Curve Lines in Background */}
              <svg
                className="absolute right-0 bottom-0 w-56 h-44 opacity-25 pointer-events-none"
                viewBox="0 0 200 160"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M10 160 C 60 110, 140 130, 200 60"
                  stroke="#E2BD78"
                  strokeWidth="1"
                />
                <path
                  d="M30 160 C 80 115, 150 120, 200 75"
                  stroke="#E2BD78"
                  strokeWidth="0.8"
                />
                <path
                  d="M50 160 C 95 120, 160 110, 200 90"
                  stroke="#E2BD78"
                  strokeWidth="0.7"
                />
                <path
                  d="M70 160 C 110 125, 170 100, 200 105"
                  stroke="#E2BD78"
                  strokeWidth="0.6"
                />
                <path
                  d="M90 160 C 130 130, 180 90, 200 120"
                  stroke="#E2BD78"
                  strokeWidth="0.5"
                />
              </svg>

              {/* Card Header Badge */}
              <div className="flex items-center gap-2 mb-6">
                <span className="text-[#D4AF6E] text-xs">✦</span>
                <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#D4AF6E]">
                  WHY WORK WITH US?
                </span>
              </div>

              {/* 3 Value Rows */}
              <div className="space-y-5 relative z-10">
                {/* 1. Senior Engineers */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#242428] border border-[#D4AF6E]/40 text-[#E5C27F] flex items-center justify-center shrink-0 shadow-inner">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm sm:text-base">
                      Senior Engineers
                    </h3>
                    <p className="text-xs text-[#9A9A9A] leading-relaxed pt-0.5">
                      Work directly with experienced cloud architects & product engineers.
                    </p>
                  </div>
                </div>

                {/* 2. No Pass-offs */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#242428] border border-[#D4AF6E]/40 text-[#E5C27F] flex items-center justify-center shrink-0 shadow-inner">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm sm:text-base">
                      No Pass-offs
                    </h3>
                    <p className="text-xs text-[#9A9A9A] leading-relaxed pt-0.5">
                      No middlemen, no fluff — just real engineering.
                    </p>
                  </div>
                </div>

                {/* 3. Premium Quality */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#242428] border border-[#D4AF6E]/40 text-[#E5C27F] flex items-center justify-center shrink-0 shadow-inner">
                    <Gem className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm sm:text-base">
                      Premium Quality
                    </h3>
                    <p className="text-xs text-[#9A9A9A] leading-relaxed pt-0.5">
                      Clean code, scalable architecture, long-term support.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: The Grand White/Ivory Luxury Form Card */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7">
            <div className="rounded-[32px] sm:rounded-[38px] bg-[#FAF8F5]/95 backdrop-blur-xl border border-white/80 shadow-[0_25px_60px_-15px_rgba(180,150,110,0.18),0_10px_30px_rgba(0,0,0,0.03)] p-6 sm:p-9 lg:p-11 relative">
              {submitted ? (
                /* Post-Submission Confirmation State */
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-6 max-w-lg mx-auto"
                >
                  <div className="w-16 h-16 rounded-full bg-[#8C6D3B]/10 border border-[#8C6D3B] flex items-center justify-center mx-auto text-[#8C6D3B]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#14171A]">
                    Project Inquiry Received!
                  </h3>
                  <p className="text-sm text-[#5F5A52] leading-relaxed">
                    Thank you for detailing your vision,{" "}
                    <span className="font-bold text-[#14171A]">
                      {formData.name || "Partner"}
                    </span>
                    . Our lead engineering team will review your specifications and
                    deliver a comprehensive technical scope to{" "}
                    <span className="font-mono font-bold text-[#8C6D3B]">
                      {formData.email}
                    </span>{" "}
                    within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", company: "", brief: "" });
                      setAttachedFile(null);
                    }}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1E1C1A] text-white text-xs font-mono font-bold uppercase tracking-wider hover:bg-[#8C6D3B] transition-colors cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-7">
                  {/* Top Stepper Indicator */}
                  <div className="flex items-center justify-between border-b border-[#EAE2D5] pb-5">
                    {/* Step 1 */}
                    <div
                      onClick={() => setCurrentStep(1)}
                      className="flex items-center gap-2.5 cursor-pointer"
                    >
                      <div
                        className={`w-7 h-7 rounded-full text-xs font-mono font-bold flex items-center justify-center transition-colors ${
                          currentStep === 1
                            ? "bg-[#7A5F35] text-white"
                            : "bg-[#EFE9DF] text-[#8C8070] border border-[#DFD6C8]"
                        }`}
                      >
                        01
                      </div>
                      <span
                        className={`text-[11px] sm:text-xs font-mono font-bold tracking-wider uppercase ${
                          currentStep === 1 ? "text-[#231E18]" : "text-[#8C8070]"
                        }`}
                      >
                        PROJECT DETAILS
                      </span>
                    </div>

                    <div className="h-[1px] bg-[#DFD6C8] flex-1 max-w-[40px] sm:max-w-[60px] mx-2" />

                    {/* Step 2 */}
                    <div
                      onClick={() => setCurrentStep(2)}
                      className="flex items-center gap-2.5 cursor-pointer"
                    >
                      <div
                        className={`w-7 h-7 rounded-full text-xs font-mono font-bold flex items-center justify-center transition-colors ${
                          currentStep === 2
                            ? "bg-[#7A5F35] text-white"
                            : "bg-[#EFE9DF] text-[#8C8070] border border-[#DFD6C8]"
                        }`}
                      >
                        02
                      </div>
                      <span
                        className={`text-[11px] sm:text-xs font-mono tracking-wider uppercase hidden sm:inline ${
                          currentStep === 2 ? "text-[#231E18] font-bold" : "text-[#8C8070]"
                        }`}
                      >
                        CONTACT INFO
                      </span>
                    </div>

                    <div className="h-[1px] bg-[#DFD6C8] flex-1 max-w-[40px] sm:max-w-[60px] mx-2" />

                    {/* Step 3 */}
                    <div
                      onClick={() => setCurrentStep(3)}
                      className="flex items-center gap-2.5 cursor-pointer"
                    >
                      <div
                        className={`w-7 h-7 rounded-full text-xs font-mono font-bold flex items-center justify-center transition-colors ${
                          currentStep === 3
                            ? "bg-[#7A5F35] text-white"
                            : "bg-[#EFE9DF] text-[#8C8070] border border-[#DFD6C8]"
                        }`}
                      >
                        03
                      </div>
                      <span
                        className={`text-[11px] sm:text-xs font-mono tracking-wider uppercase hidden sm:inline ${
                          currentStep === 3 ? "text-[#231E18] font-bold" : "text-[#8C8070]"
                        }`}
                      >
                        REVIEW & SEND
                      </span>
                    </div>
                  </div>

                  {/* 1. Project Type Selector */}
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#1E1B17]">
                      <span className="text-[#B08D57]">✦</span>
                      <span>What type of project are you building?</span>
                    </label>

                    <div className="flex flex-wrap gap-2.5">
                      {projectTypeOptions.map((opt) => {
                        const Icon = opt.icon;
                        const isSelected = selectedType === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setSelectedType(opt.id)}
                            className={`rounded-xl sm:rounded-full px-4 py-2.5 sm:px-5 sm:py-2.5 text-xs sm:text-[13px] font-medium flex items-center gap-2.5 transition-all duration-200 cursor-pointer ${
                              isSelected
                                ? "bg-gradient-to-r from-[#8C6D3B] to-[#715426] text-white shadow-md shadow-[#8C6D3B]/25 border border-[#8C6D3B]"
                                : "bg-white/80 hover:bg-white text-[#4A453E] border border-[#E5DDD0] hover:border-[#B08D57]"
                            }`}
                          >
                            <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                            <span>{opt.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 2. Budget Selector */}
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#1E1B17]">
                      <span className="text-[#B08D57]">✦</span>
                      <span>What is your estimated budget?</span>
                    </label>

                    <div className="flex flex-wrap gap-2.5">
                      {budgetOptions.map((b) => {
                        const isSelected = selectedBudget === b;
                        return (
                          <button
                            key={b}
                            type="button"
                            onClick={() => setSelectedBudget(b)}
                            className={`rounded-full px-5 py-2 sm:px-6 sm:py-2.5 text-xs sm:text-[13px] font-medium transition-all duration-200 cursor-pointer ${
                              isSelected
                                ? "bg-[#1E1C1A] text-white font-bold shadow-md shadow-black/20 border border-[#1E1C1A]"
                                : "bg-white/80 hover:bg-white text-[#4A453E] border border-[#E5DDD0] hover:border-[#B08D57]"
                            }`}
                          >
                            {b}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 3. Three Contact Input Columns */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Your Name */}
                    <div>
                      <label className="text-[11px] font-mono text-[#5F5A52] font-semibold uppercase tracking-wider block mb-1.5">
                        Your Name *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-[#8C8070] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="text"
                          required
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl bg-white/90 border border-[#E5DDD0] text-[#1E1B18] placeholder-[#9E968B] text-xs sm:text-sm focus:outline-none focus:border-[#B08D57] focus:ring-2 focus:ring-[#B08D57]/20 transition-all shadow-xs"
                        />
                      </div>
                    </div>

                    {/* Email Address */}
                    <div>
                      <label className="text-[11px] font-mono text-[#5F5A52] font-semibold uppercase tracking-wider block mb-1.5">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-[#8C8070] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="email"
                          required
                          placeholder="john@company.com"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl bg-white/90 border border-[#E5DDD0] text-[#1E1B18] placeholder-[#9E968B] text-xs sm:text-sm focus:outline-none focus:border-[#B08D57] focus:ring-2 focus:ring-[#B08D57]/20 transition-all shadow-xs"
                        />
                      </div>
                    </div>

                    {/* Company / Organization */}
                    <div>
                      <label className="text-[11px] font-mono text-[#5F5A52] font-semibold uppercase tracking-wider block mb-1.5">
                        Company / Organization
                      </label>
                      <div className="relative">
                        <Building2 className="w-4 h-4 text-[#8C8070] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="text"
                          placeholder="Acme Corp"
                          value={formData.company}
                          onChange={(e) =>
                            setFormData({ ...formData, company: e.target.value })
                          }
                          className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl bg-white/90 border border-[#E5DDD0] text-[#1E1B18] placeholder-[#9E968B] text-xs sm:text-sm focus:outline-none focus:border-[#B08D57] focus:ring-2 focus:ring-[#B08D57]/20 transition-all shadow-xs"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 4. Textarea: Project Overview & Goals */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono text-[#5F5A52] font-semibold uppercase tracking-wider block">
                      Project Overview & Goals
                    </label>
                    <div className="relative">
                      <FileText className="w-4 h-4 text-[#8C8070] absolute left-3.5 top-3.5 pointer-events-none" />
                      <textarea
                        rows={3}
                        maxLength={1000}
                        placeholder="Describe what you want to build, key timeline requirements, or existing software challenges..."
                        value={formData.brief}
                        onChange={(e) =>
                          setFormData({ ...formData, brief: e.target.value })
                        }
                        className="w-full pl-10 pr-4 pt-3 pb-7 rounded-2xl bg-white/90 border border-[#E5DDD0] text-[#1E1B18] placeholder-[#9E968B] text-xs sm:text-sm focus:outline-none focus:border-[#B08D57] focus:ring-2 focus:ring-[#B08D57]/20 transition-all resize-none shadow-xs min-h-[96px]"
                      />
                      {/* Character Count */}
                      <span className="absolute right-3.5 bottom-2 text-[10px] sm:text-[11px] font-mono text-[#8C8070]">
                        {formData.brief.length}/1000
                      </span>
                    </div>
                  </div>

                  {/* 5. Bottom Action Row: File Attachment + Submit Button */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2 border-t border-[#EAE2D5]">
                    {/* Left: Attach Files Button */}
                    <div>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.zip"
                      />
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#EFE9DF] hover:bg-[#E4DACB] border border-[#DFD6C8] flex items-center justify-center shrink-0 transition-colors cursor-pointer text-[#7A5F35]"
                        >
                          <Paperclip className="w-4 h-4" />
                        </button>
                        <div>
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="text-xs font-bold text-[#231E18] hover:text-[#8C6D3B] transition-colors cursor-pointer text-left block"
                          >
                            Attach Files (optional)
                          </button>
                          <span className="text-[11px] text-[#8C8070] block">
                            PDF, DOC, PNG, or ZIP · Max 10MB
                          </span>
                        </div>
                      </div>

                      {/* Display Selected File */}
                      <AnimatePresence>
                        {attachedFile && (
                          <motion.div
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#FAF7F2] border border-[#DFD6C8] text-xs text-[#231E18]"
                          >
                            <span className="font-mono truncate max-w-[180px]">
                              {attachedFile.name}
                            </span>
                            <button
                              type="button"
                              onClick={removeFile}
                              className="text-[#8C8070] hover:text-[#111111] cursor-pointer"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Right: Submit Button */}
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-7 sm:px-8 py-3.5 rounded-full bg-gradient-to-r from-[#29231D] via-[#1C1814] to-[#11100F] hover:from-[#3D342B] hover:to-[#1A1816] text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-black/20 hover:shadow-xl transition-all flex items-center justify-center gap-3 cursor-pointer group"
                    >
                      <span>Submit Inquiry</span>
                      <div className="w-6 h-6 rounded-full bg-white/10 group-hover:bg-[#B08D57] group-hover:text-white transition-all flex items-center justify-center text-white/90">
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
