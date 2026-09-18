"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/work/${project.id}`} className="group block interactive">
        <div className="relative rounded-2xl overflow-hidden glass-panel border border-[rgba(255,255,255,0.08)] group-hover:border-[rgba(108,99,255,0.4)] transition-all duration-500">
          {/* Image Wrapper */}
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0a0a0d]">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out opacity-85 group-hover:opacity-100"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Dark Hover Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

            {/* Category Tag */}
            <div className="absolute top-4 left-4 z-10">
              <span className="px-3 py-1 bg-[#050505]/80 backdrop-blur-md rounded-full text-[11px] font-mono font-medium text-[#00E5FF] border border-[rgba(255,255,255,0.12)]">
                {project.category}
              </span>
            </div>

            {/* Hover Action Arrow */}
            <div className="absolute bottom-4 right-4 z-10 w-10 h-10 rounded-full bg-[#6C63FF] text-white flex items-center justify-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 shadow-lg shadow-[rgba(108,99,255,0.4)]">
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </div>

          {/* Card Info */}
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="text-xs text-[#9A9A9A] font-mono mb-2 uppercase tracking-wider">
                {project.subcategory}
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-[#00E5FF] transition-colors flex items-center justify-between">
                <span>{project.title}</span>
              </h3>
              <p className="text-sm text-[#9A9A9A] mt-2 line-clamp-2 leading-relaxed">
                {project.tagline}
              </p>
            </div>

            {/* Results Badges */}
            {project.results && project.results.length > 0 && (
              <div className="mt-6 pt-4 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between text-xs font-mono text-[#5A5A66]">
                <span>{project.results[0].label}:</span>
                <span className="text-[#00E5FF] font-semibold">
                  {project.results[0].value}
                </span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
