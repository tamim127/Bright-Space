"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { FaqItem } from "@/data/faqs";

interface FaqAccordionProps {
  items: FaqItem[];
}

export default function FaqAccordion({ items }: FaqAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id || null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="space-y-4">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className={`rounded-2xl transition-all duration-300 border ${
              isOpen
                ? "bg-[rgba(255,255,255,0.05)] border-[#00E5FF] shadow-[0_0_20px_rgba(0,229,255,0.1)]"
                : "bg-transparent border-[rgba(255,255,255,0.08)] hover:border-[#6C63FF]/50"
            }`}
          >
            <button
              onClick={() => toggle(item.id)}
              className="w-full text-left p-6 md:p-8 flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
            >
              <span className="text-base md:text-lg font-bold text-white tracking-wide">
                {item.question}
              </span>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors shrink-0 ${
                  isOpen
                    ? "bg-[#00E5FF] text-[#08080a]"
                    : "bg-[#101015] border border-[rgba(255,255,255,0.1)] text-[#9A9A9A]"
                }`}
              >
                {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </div>
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 md:px-8 pb-6 md:pb-8 pt-2 text-sm md:text-base text-[#9A9A9A] leading-relaxed border-t border-[rgba(255,255,255,0.08)]">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
