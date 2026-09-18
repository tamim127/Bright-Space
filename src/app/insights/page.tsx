"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import { blogsData } from "@/data/blogs";

export default function InsightsPage() {
  return (
    <div className="py-16 md:py-24 max-w-7xl mx-auto px-6 md:px-12 space-y-16">
      {/* Hero */}
      <div className="max-w-4xl space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-[rgba(108,99,255,0.3)] text-xs font-mono text-[#6C63FF] uppercase tracking-widest"
        >
          {"/// ARTICLES & INSIGHTS"}
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight"
        >
          Ideas, Insights & <span className="text-gradient-accent">Engineering.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-[#9A9A9A] font-light max-w-2xl leading-relaxed"
        >
          Technical write-ups, design teardowns, and strategic perspectives on building scalable web products.
        </motion.p>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogsData.map((post, idx) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <Link href={`/insights/${post.slug}`} className="group block interactive">
              <div className="glass-panel rounded-3xl overflow-hidden border border-[rgba(255,255,255,0.08)] group-hover:border-[#6C63FF]/50 transition-all duration-300">
                <div className="relative aspect-[16/10] w-full bg-[#0a0a0d] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-[#050505]/80 backdrop-blur-md rounded-full text-[10px] font-mono text-[#00E5FF] border border-[rgba(255,255,255,0.1)]">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 md:p-8 space-y-4">
                  <div className="flex items-center gap-3 text-xs font-mono text-[#5A5A66]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{post.readTime}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-[#00E5FF] transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-sm text-[#9A9A9A] line-clamp-2 leading-relaxed font-light">
                    {post.excerpt}
                  </p>

                  <div className="pt-4 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between text-xs font-mono text-[#00E5FF] group-hover:underline">
                    <span>Read Article</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
