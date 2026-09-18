"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Sparkles } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";

const projectTypes = [
  "Web Application & SaaS",
  "Website Design & Dev",
  "Custom Software",
  "UI/UX Design System",
  "API & Infrastructure"
];

const budgetRanges = [
  "$5k - $10k",
  "$10k - $25k",
  "$25k - $50k",
  "$50k+"
];

export default function ProjectLeadForm() {
  const [selectedType, setSelectedType] = useState(projectTypes[0]);
  const [selectedBudget, setSelectedBudget] = useState(budgetRanges[1]);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    brief: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="py-28 bg-[#08080c] border-t border-[rgba(255,255,255,0.06)] relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel border border-[#00E5FF]/30 text-[#00E5FF] text-xs font-mono uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" /> Quick Project Estimator & Inquiry
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
            Tell Us About <span className="font-serif italic text-gradient-accent">Your Vision</span>
          </h2>
          <p className="text-[#9A9A9A] text-base leading-relaxed">
            Fill out the brief below and our engineering leads will get back to you within 24 hours with a custom proposal and technical strategy.
          </p>
        </div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-12 rounded-3xl text-center space-y-6 max-w-2xl mx-auto border border-[#00E5FF]/40 shadow-[0_0_40px_rgba(0,229,255,0.2)]"
          >
            <div className="w-16 h-16 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF] flex items-center justify-center mx-auto text-[#00E5FF]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-3xl font-extrabold text-white">Project Inquiry Received!</h3>
            <p className="text-[#9A9A9A] text-sm leading-relaxed">
              Thank you for reaching out, <span className="text-white font-medium">{formData.name || "partner"}</span>. Our technical leads are reviewing your project requirements and will respond to <span className="text-[#00E5FF] font-mono">{formData.email}</span> shortly.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="text-xs font-mono uppercase tracking-wider text-[#00E5FF] hover:underline pt-4 block mx-auto"
            >
              Submit another inquiry
            </button>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="glass-card p-8 md:p-12 rounded-3xl border border-[rgba(255,255,255,0.1)] space-y-10"
          >
            {/* Step 1: Project Type */}
            <div className="space-y-4">
              <label className="text-xs font-mono text-[#00E5FF] uppercase tracking-wider block">
                01. What type of project are you building?
              </label>
              <div className="flex flex-wrap gap-3">
                {projectTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setSelectedType(type)}
                    className={`px-5 py-2.5 rounded-full text-xs font-mono transition-all duration-300 ${
                      selectedType === type
                        ? "bg-[#6C63FF] text-white shadow-[0_0_15px_rgba(108,99,255,0.4)] border border-[#00E5FF]/40"
                        : "bg-[#121218] text-[#9A9A9A] border border-[rgba(255,255,255,0.08)] hover:border-white/30 hover:text-white"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Budget */}
            <div className="space-y-4">
              <label className="text-xs font-mono text-[#00E5FF] uppercase tracking-wider block">
                02. What is your estimated budget?
              </label>
              <div className="flex flex-wrap gap-3">
                {budgetRanges.map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setSelectedBudget(b)}
                    className={`px-5 py-2.5 rounded-full text-xs font-mono transition-all duration-300 ${
                      selectedBudget === b
                        ? "bg-[#00E5FF] text-[#050505] font-bold shadow-[0_0_15px_rgba(0,229,255,0.4)]"
                        : "bg-[#121218] text-[#9A9A9A] border border-[rgba(255,255,255,0.08)] hover:border-white/30 hover:text-white"
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Text Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="text-xs font-mono text-[#D1D5DB] uppercase tracking-wider block mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#050505] border border-[rgba(255,255,255,0.1)] text-white placeholder-[#555] text-sm focus:outline-none focus:border-[#6C63FF] transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-[#D1D5DB] uppercase tracking-wider block mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="john@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#050505] border border-[rgba(255,255,255,0.1)] text-white placeholder-[#555] text-sm focus:outline-none focus:border-[#6C63FF] transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-[#D1D5DB] uppercase tracking-wider block mb-2">
                  Company / Organization
                </label>
                <input
                  type="text"
                  placeholder="Acme Corp"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#050505] border border-[rgba(255,255,255,0.1)] text-white placeholder-[#555] text-sm focus:outline-none focus:border-[#6C63FF] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-mono text-[#D1D5DB] uppercase tracking-wider block mb-2">
                Project Overview & Goals
              </label>
              <textarea
                rows={4}
                placeholder="Describe what you want to build, key timeline requirements, or existing software challenges..."
                value={formData.brief}
                onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#050505] border border-[rgba(255,255,255,0.1)] text-white placeholder-[#555] text-sm focus:outline-none focus:border-[#6C63FF] transition-colors resize-none"
              />
            </div>

            {/* Submit */}
            <div className="flex justify-end pt-2">
              <MagneticButton variant="primary">
                Submit Inquiry <Send className="w-4 h-4 ml-2" />
              </MagneticButton>
            </div>
          </motion.form>
        )}
      </div>
    </section>
  );
}
