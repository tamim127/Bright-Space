"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, CheckCircle2, MessageSquare } from "lucide-react";
import confetti from "canvas-confetti";

const projectTypes = [
  "Website Design & Development",
  "Web Application (SaaS / Portal)",
  "Custom Software Development",
  "Headless E-Commerce Store",
  "UI/UX Design & System",
  "API & System Integration",
  "Other / Custom Scope"
];

const budgetRanges = [
  "< $5,000",
  "$5,000 - $15,000",
  "$15,000 - $35,000",
  "$35,000+"
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectType: projectTypes[0],
    budget: budgetRanges[1],
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="py-16 md:py-24 max-w-7xl mx-auto px-6 md:px-12 space-y-16">
      {/* Hero */}
      <div className="max-w-3xl space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-[rgba(0,229,255,0.3)] text-xs font-mono text-[#00E5FF] uppercase tracking-widest"
        >
          {"/// GET IN TOUCH"}
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight"
        >
          Let&apos;s Build <br />
          <span className="text-gradient-accent">Something Great.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-[#9A9A9A] font-light leading-relaxed"
        >
          Tell us about what you&apos;re working on. We&apos;ll help analyze requirements and turn your idea into a digital product.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Contact Form Column */}
        <div className="lg:col-span-8 glass-panel p-8 md:p-12 rounded-3xl border border-[rgba(255,255,255,0.08)]">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-16 text-center space-y-6"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-bold text-white">Inquiry Received!</h3>
              <p className="text-sm text-[#9A9A9A] max-w-md mx-auto leading-relaxed">
                Thank you for reaching out. A lead technical architect will review your project details and respond within 12 business hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-3 bg-[#14141c] text-white rounded-full text-xs font-mono border border-[rgba(255,255,255,0.1)] hover:bg-[#1a1a24] transition-colors"
              >
                Send Another Message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-xs font-mono text-[#9A9A9A] uppercase block">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Morgan"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#08080c] border border-[rgba(255,255,255,0.08)] rounded-xl px-4 py-3.5 text-sm text-white placeholder-[#5A5A66] focus:outline-none focus:border-[#6C63FF] transition-colors"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-xs font-mono text-[#9A9A9A] uppercase block">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#08080c] border border-[rgba(255,255,255,0.08)] rounded-xl px-4 py-3.5 text-sm text-white placeholder-[#5A5A66] focus:outline-none focus:border-[#6C63FF] transition-colors"
                  />
                </div>
              </div>

              {/* Company & Project Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono text-[#9A9A9A] uppercase block">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    placeholder="Company Name"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-[#08080c] border border-[rgba(255,255,255,0.08)] rounded-xl px-4 py-3.5 text-sm text-white placeholder-[#5A5A66] focus:outline-none focus:border-[#6C63FF] transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-[#9A9A9A] uppercase block">
                    Project Type *
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full bg-[#08080c] border border-[rgba(255,255,255,0.08)] rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#6C63FF] transition-colors"
                  >
                    {projectTypes.map((pt) => (
                      <option key={pt} value={pt} className="bg-[#0c0c0e] text-white">
                        {pt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Budget Range Selector */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-[#9A9A9A] uppercase block">
                  Estimated Budget Range *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {budgetRanges.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setFormData({ ...formData, budget: b })}
                      className={`py-3 px-3 rounded-xl text-xs font-mono transition-all border ${
                        formData.budget === b
                          ? "bg-[#6C63FF] text-white border-[#6C63FF]"
                          : "bg-[#08080c] text-[#9A9A9A] border-[rgba(255,255,255,0.08)] hover:text-white"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Project Message */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-[#9A9A9A] uppercase block">
                  Tell us about your project *
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Describe your goals, desired timeline, or current technical stack..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#08080c] border border-[rgba(255,255,255,0.08)] rounded-xl p-4 text-sm text-white placeholder-[#5A5A66] focus:outline-none focus:border-[#6C63FF] transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-[#6C63FF] to-[#00E5FF] text-white font-semibold rounded-xl text-base flex items-center justify-center gap-2 shadow-lg shadow-[rgba(108,99,255,0.4)] hover:shadow-[0_0_30px_rgba(0,229,255,0.5)] transition-all interactive"
              >
                Send Project Inquiry <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

        {/* Alternative Contact Information */}
        <div className="lg:col-span-4 space-y-8">
          <div className="glass-panel p-8 rounded-3xl border border-[rgba(255,255,255,0.08)] space-y-6">
            <h3 className="text-lg font-bold text-white uppercase font-mono tracking-wider">
              Direct Contact
            </h3>
            
            <div className="space-y-4 text-sm">
              <a
                href="mailto:hello@artisan.dev"
                className="flex items-center gap-4 text-[#9A9A9A] hover:text-[#00E5FF] transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#14141d] border border-[rgba(255,255,255,0.06)] flex items-center justify-center text-white group-hover:border-[#00E5FF]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#5A5A66] block">EMAIL US</span>
                  <span className="font-semibold text-white">hello@artisan.dev</span>
                </div>
              </a>

              <a
                href="https://wa.me/123456789"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 text-[#9A9A9A] hover:text-[#00E5FF] transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#14141d] border border-[rgba(255,255,255,0.06)] flex items-center justify-center text-white group-hover:border-[#00E5FF]">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#5A5A66] block">WHATSAPP</span>
                  <span className="font-semibold text-white">+1 (555) 019-2834</span>
                </div>
              </a>
            </div>
          </div>

          <div className="glass-panel p-8 rounded-3xl border border-[rgba(255,255,255,0.08)] space-y-4">
            <h3 className="text-xs font-mono text-[#5A5A66] uppercase tracking-wider">
              OFFICE HOURS
            </h3>
            <p className="text-sm text-white font-medium">
              Monday — Friday: 9:00 AM – 7:00 PM EST
            </p>
            <p className="text-xs text-[#9A9A9A]">
              Asynchronous communications for worldwide client teams.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
