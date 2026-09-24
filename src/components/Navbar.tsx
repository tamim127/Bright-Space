"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ChevronDown, Link2, BookOpen, CreditCard } from "lucide-react";
import gsap from "gsap";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Work", href: "/work" },
  { name: "Blog", href: "/blog" },
  { name: "More", href: "#", hasDropdown: true },
];

export default function Navbar() {
  const pathname = usePathname();
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);

  const activeTabName = hoveredTab || (navLinks.find(l => l.href === pathname)?.name || "Home");

  useEffect(() => {
    const activeIndex = navLinks.findIndex(link => link.name === activeTabName);
    const activeElement = linksRef.current[activeIndex];
    
    if (activeElement && indicatorRef.current) {
      gsap.to(indicatorRef.current, {
        x: activeElement.offsetLeft,
        width: activeElement.offsetWidth,
        duration: 0.4,
        ease: "power3.out",
      });
    }
  }, [activeTabName]);

  return (
    <header className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-max">
       <div className="flex items-start gap-3">
         <nav 
           className="relative flex flex-col"
           onMouseLeave={() => setHoveredTab(null)}
         >
            <div className="flex items-center p-1.5 rounded-full bg-[#F3EFE6]/90 backdrop-blur-xl border border-[#DCD4C5] shadow-[0_8px_32px_rgba(17,17,17,0.06)]">
              <div className="relative flex items-center">
                <div 
                  ref={indicatorRef}
                  className="absolute left-0 top-0 h-full bg-[#EAE4D7] rounded-full pointer-events-none shadow-[inset_0_1px_1px_rgba(0,0,0,0.05)] border border-[#DCD4C5]"
                >
                   <div className="absolute top-0 left-1/2 -translate-x-1/2 w-5 h-[2px] bg-[#B08D57] rounded-b-full shadow-[0_2px_8px_rgba(176,141,87,0.7)]" />
                </div>

                {navLinks.map((link, idx) => {
                  const isActive = activeTabName === link.name;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      ref={(el) => {
                        linksRef.current[idx] = el;
                      }}
                      onMouseEnter={() => setHoveredTab(link.name)}
                      className={`relative z-10 px-6 py-2.5 text-[14px] font-medium transition-colors duration-300 flex items-center gap-1.5 ${
                        isActive ? "text-[#111111] font-semibold" : "text-[#555555] hover:text-[#111111]"
                      }`}
                    >
                      {link.name}
                      {link.hasDropdown && (
                        <ChevronDown 
                          className={`w-3.5 h-3.5 opacity-70 transition-transform duration-300 ${activeTabName === "More" && link.name === "More" ? "rotate-180" : ""}`} 
                        />
                      )}
                    </Link>
                  );
                })}
              </div>

              {/* Book a Call Button - Dark CTA with Gold hover */}
              <Link
                href="/contact"
                onMouseEnter={() => setHoveredTab(null)}
                className="ml-2 px-6 py-2.5 text-[14px] font-medium text-white bg-[#111111] hover:bg-[#B08D57] rounded-full transition-all duration-200 shadow-[0_2px_10px_rgba(17,17,17,0.15)]"
              >
                Book a Call
              </Link>
            </div>

            {/* Dropdown Menu */}
            <div 
              className={`absolute top-full left-0 w-full mt-2 p-3 bg-white backdrop-blur-xl border border-[#DCD4C5] rounded-[24px] shadow-2xl transition-all duration-300 origin-top flex gap-3 ${
                activeTabName === "More" ? "opacity-100 visible scale-y-100 translate-y-0" : "opacity-0 invisible scale-y-95 -translate-y-2 pointer-events-none"
              }`}
              onMouseEnter={() => setHoveredTab("More")}
            >
              <Link href="#" className="relative flex-1 aspect-[4/5] rounded-[16px] overflow-hidden group">
                <img src="https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=400&auto=format&fit=crop" alt="Guestbook" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-semibold text-[15px]">Guestbook</h3>
                  <p className="text-white/70 text-[11px] mt-0.5">Let me know you were here</p>
                </div>
              </Link>

              <Link href="#" className="relative flex-1 aspect-[4/5] rounded-[16px] overflow-hidden group">
                <img src="https://images.unsplash.com/photo-1521685149344-9ad90e663435?q=80&w=400&auto=format&fit=crop" alt="Bucket List" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-semibold text-[15px]">Bucket List</h3>
                  <p className="text-white/70 text-[11px] mt-0.5">Dreams with a deadline</p>
                </div>
              </Link>

              <div className="flex-[1.4] flex flex-col gap-2">
                 <Link href="#" className="flex items-center gap-3 p-2.5 rounded-[14px] border border-transparent hover:border-[#DCD4C5] hover:bg-[#FAF7F2] transition-colors group">
                    <div className="w-10 h-10 rounded-[10px] border border-[#DCD4C5] flex items-center justify-center bg-[#F3EFE6] text-[#B08D57] group-hover:bg-[#B08D57] group-hover:text-white transition-colors shrink-0">
                       <Link2 className="w-4 h-4" />
                    </div>
                    <div>
                       <div className="text-[#111111] font-medium text-[13px]">Links</div>
                       <div className="text-[#555555] text-[11px] mt-0.5">All my links are here</div>
                    </div>
                 </Link>

                 <Link href="#" className="flex items-center gap-3 p-2.5 rounded-[14px] border border-transparent hover:border-[#DCD4C5] hover:bg-[#FAF7F2] transition-colors group">
                    <div className="w-10 h-10 rounded-[10px] border border-[#DCD4C5] flex items-center justify-center bg-[#F3EFE6] text-[#B08D57] group-hover:bg-[#B08D57] group-hover:text-white transition-colors shrink-0">
                       <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                       <div className="text-[#111111] font-medium text-[13px]">Uses</div>
                       <div className="text-[#555555] text-[11px] mt-0.5">A peek into my digital...</div>
                    </div>
                 </Link>

                 <Link href="#" className="flex items-center gap-3 p-2.5 rounded-[14px] border border-transparent hover:border-[#DCD4C5] hover:bg-[#FAF7F2] transition-colors group">
                    <div className="w-10 h-10 rounded-[10px] border border-[#DCD4C5] flex items-center justify-center bg-[#F3EFE6] text-[#B08D57] group-hover:bg-[#B08D57] group-hover:text-white transition-colors shrink-0">
                       <CreditCard className="w-4 h-4" />
                    </div>
                    <div>
                       <div className="text-[#111111] font-medium text-[13px]">Attribution</div>
                       <div className="text-[#555555] text-[11px] mt-0.5">Journey to create this site</div>
                    </div>
                 </Link>
              </div>
            </div>
         </nav>

         <button 
           className="flex items-center justify-center w-[46px] h-[46px] rounded-full bg-[#F3EFE6]/90 backdrop-blur-xl border border-[#DCD4C5] text-[#555555] hover:text-[#111111] hover:bg-[#FAF7F2] transition-all shadow-[0_8px_32px_rgba(17,17,17,0.06)] shrink-0"
           aria-label="Search"
         >
           <Search className="w-4 h-4" />
         </button>
       </div>
    </header>
  );
}
