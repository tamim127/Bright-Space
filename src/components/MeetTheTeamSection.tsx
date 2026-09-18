"use client";

import { motion } from "framer-motion";
import { teamData } from "@/data/team";
import { Linkedin, Github, Twitter } from "lucide-react";

export default function MeetTheTeamSection() {
  return (
    <section className="py-28 max-w-7xl mx-auto px-6 md:px-12 relative">
      {/* Background Orbs */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-[#6C63FF]/10 blur-[100px] pointer-events-none rounded-full" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <span className="text-xs font-mono text-[#00E5FF] tracking-widest uppercase">
          {"/// THE SQUAD"}
        </span>
        <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Meet the <span className="font-serif italic text-gradient-accent">Architects & Designers</span>
        </h2>
        <p className="text-[#9A9A9A] text-base leading-relaxed">
          No account managers or junior pass-offs. You work directly with veteran product engineers and design leaders.
        </p>
      </div>

      {/* Team Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {teamData.map((member, idx) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="glass-card rounded-3xl overflow-hidden group border border-[rgba(255,255,255,0.08)] hover:border-[#6C63FF]/50 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden bg-[#121218]">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-90" />
                
                {/* Social links float on image bottom */}
                <div className="absolute bottom-3 right-3 flex items-center gap-2">
                  {member.socials.linkedin && (
                    <a
                      href={member.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-[#050505]/80 backdrop-blur border border-[rgba(255,255,255,0.2)] flex items-center justify-center text-white hover:text-[#00E5FF] hover:border-[#00E5FF] transition-colors"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {member.socials.github && (
                    <a
                      href={member.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-[#050505]/80 backdrop-blur border border-[rgba(255,255,255,0.2)] flex items-center justify-center text-white hover:text-[#00E5FF] hover:border-[#00E5FF] transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {member.socials.twitter && (
                    <a
                      href={member.socials.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-[#050505]/80 backdrop-blur border border-[rgba(255,255,255,0.2)] flex items-center justify-center text-white hover:text-[#00E5FF] hover:border-[#00E5FF] transition-colors"
                    >
                      <Twitter className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Text Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white group-hover:text-[#00E5FF] transition-colors mb-1">
                  {member.name}
                </h3>
                <p className="text-xs font-mono text-[#00E5FF] mb-3">
                  {member.role}
                </p>
                <p className="text-xs text-[#9A9A9A] leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
