"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

const galleryCol1 = [
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
];

const galleryCol2 = [
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400",
];

const galleryCol3 = [
  "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=400",
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = textContainerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let animId: number;
    let width = container.offsetWidth;
    let height = container.offsetHeight;

    const mouse = {
      x: -2000,
      y: -2000,
      targetX: -2000,
      targetY: -2000,
      radius: 75,
    };

    interface Shockwave {
      x: number;
      y: number;
      currentRadius: number;
      maxRadius: number;
      thickness: number;
      strength: number;
      speed: number;
    }
    const shockwaves: Shockwave[] = [];

    class KineticParticle {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      vx: number;
      vy: number;
      color: string;
      size: number;

      constructor(x: number, y: number, color: string) {
        this.x = x + (Math.random() - 0.5) * 20;
        this.y = y + (Math.random() - 0.5) * 20;
        this.baseX = x;
        this.baseY = y;
        this.vx = 0;
        this.vy = 0;
        this.color = color;
        this.size = 1.45;
      }

      update() {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius && mouse.x > -1000) {
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          const pushPower = force * 3.4;
          this.vx -= Math.cos(angle) * pushPower;
          this.vy -= Math.sin(angle) * pushPower;
        }

        for (let i = 0; i < shockwaves.length; i++) {
          const sw = shockwaves[i];
          const sDx = this.x - sw.x;
          const sDy = this.y - sw.y;
          const sDist = Math.sqrt(sDx * sDx + sDy * sDy);
          const diff = Math.abs(sDist - sw.currentRadius);

          if (diff < sw.thickness) {
            const push = (1 - diff / sw.thickness) * sw.strength;
            const angle = Math.atan2(sDy, sDx);
            this.vx += Math.cos(angle) * push;
            this.vy += Math.sin(angle) * push;
          }
        }

        this.vx += (this.baseX - this.x) * 0.03;
        this.vy += (this.baseY - this.y) * 0.03;

        this.vx *= 0.93;
        this.vy *= 0.93;

        this.x += this.vx;
        this.y += this.vy;
      }

      draw(context: CanvasRenderingContext2D) {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();
      }
    }

    let particles: KineticParticle[] = [];

    const initParticles = () => {
      particles = [];
      const offscreen = document.createElement("canvas");
      offscreen.width = width;
      offscreen.height = height;
      const offCtx = offscreen.getContext("2d", { willReadFrequently: true });
      if (!offCtx) return;

      const targetFontSize = Math.min(
        Math.floor(width / 7.6),
        Math.floor(height * 0.72),
        230
      );

      offCtx.fillStyle = "#111111";
      offCtx.textAlign = "center";
      offCtx.textBaseline = "middle";
      offCtx.font = `900 ${targetFontSize}px 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`;

      const centerX = width / 2;
      const centerY = height / 2;
      offCtx.fillText("BRIGHT SPACE", centerX, centerY);

      const imageData = offCtx.getImageData(0, 0, width, height);
      const data = imageData.data;

      const gap = width < 768 ? 3.5 : 3;
      const colors = ["#111111", "#111111", "#111111", "#B08D57", "#D4BD91", "#8C6D3B"];

      for (let y = 0; y < height; y += gap) {
        for (let x = 0; x < width; x += gap) {
          const index = (y * width + x) * 4;
          const alpha = data[index + 3];

          if (alpha > 128) {
            const color = colors[Math.floor(Math.random() * colors.length)];
            particles.push(new KineticParticle(x, y, color));
          }
        }
      }
    };

    const handleResize = () => {
      if (!container || !canvas) return;
      const dpr = window.devicePixelRatio || 1;
      width = container.offsetWidth;
      height = container.offsetHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      initParticles();
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -2000;
      mouse.targetY = -2000;
    };

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      shockwaves.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        currentRadius: 10,
        maxRadius: Math.max(width, height) * 0.55,
        thickness: 40,
        strength: 16,
        speed: 14,
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("mousedown", handleClick);

    const animate = () => {
      mouse.x += (mouse.targetX - mouse.x) * 0.2;
      mouse.y += (mouse.targetY - mouse.y) * 0.2;

      ctx.clearRect(0, 0, width, height);
      ctx.shadowBlur = 0;

      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.currentRadius += sw.speed;
        sw.strength *= 0.93;
        if (sw.currentRadius >= sw.maxRadius || sw.strength < 0.1) {
          shockwaves.splice(i, 1);
        }
      }

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw(ctx);
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
        container.removeEventListener("mousedown", handleClick);
      }
    };
  }, []);

  return (
    <footer className="bg-[#FAF7F2] border-t border-[#DCD4C5] text-[#111111] pt-16 pb-6 relative overflow-hidden select-none">
      <style jsx global>{`
        @keyframes dnaUp {
          0% {
            transform: translateY(0%);
          }
          100% {
            transform: translateY(-50%);
          }
        }
        @keyframes dnaDown {
          0% {
            transform: translateY(-50%);
          }
          100% {
            transform: translateY(0%);
          }
        }
        .dna-marquee-up {
          animation: dnaUp 26s linear infinite;
        }
        .dna-marquee-down {
          animation: dnaDown 28s linear infinite;
        }
        .dna-marquee-container:hover .dna-marquee-up,
        .dna-marquee-container:hover .dna-marquee-down {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          <div className="lg:col-span-4 flex flex-col space-y-8">
            <div>
              <p className="text-[11px] font-mono tracking-[0.25em] text-[#B08D57] uppercase font-bold mb-2">
                DIGITAL CREATIVE AGENCY
              </p>
              <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#111111] uppercase font-sans">
                BRIGHT SPACE
              </h2>
            </div>

            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-[#111111] font-bold">
                SUBSCRIBE TO NEWSLETTER
              </h3>
              <p className="text-xs text-[#555555] leading-relaxed max-w-sm">
                Practical notes about brands, engineering and performance growth from Bright Space.
              </p>

              {subscribed ? (
                <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-white border border-[#B08D57] text-[#B08D57] text-xs font-mono font-medium">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Thank you for subscribing to Bright Space!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-2.5 pt-1">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-[#555555] block font-semibold">
                    YOUR EMAIL
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="email@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white border border-[#DCD4C5] focus:border-[#B08D57] text-[#111111] text-xs px-4 py-3 rounded-xl outline-none transition-colors placeholder:text-[#777777] font-mono shadow-sm"
                  />
                  <button
                    type="submit"
                    className="w-full bg-[#111111] hover:bg-[#B08D57] text-white font-extrabold text-xs uppercase tracking-widest py-3.5 px-6 rounded-full transition-all duration-200 shadow-md cursor-pointer active:scale-98"
                  >
                    SUBSCRIBE
                  </button>
                  <p className="text-[10px] text-[#555555] font-mono pt-0.5">
                    Before submitting, you agree to our{" "}
                    <Link href="/contact" className="underline hover:text-[#111111]">
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </form>
              )}
            </div>

            <div className="bg-white border border-[#DCD4C5] rounded-2xl p-4 flex items-center gap-4 max-w-md shadow-md">
              <div className="relative w-20 h-28 rounded-xl overflow-hidden shrink-0 border border-[#DCD4C5] bg-[#F3EFE6]">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300"
                  alt="Kate W."
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-1.5 justify-center">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-white uppercase">
                    KATE W.
                  </span>
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-between h-28 py-0.5">
                <div>
                  <h4 className="text-sm font-extrabold tracking-tight text-[#111111] uppercase">
                    START A PROJECT
                  </h4>
                  <p className="text-xs text-[#555555] mt-1 leading-snug">
                    Let&apos;s book &amp; talk with our Bright Space team.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center bg-[#B08D57] hover:bg-[#9A7846] text-white font-extrabold text-[11px] uppercase tracking-wider py-2.5 px-5 rounded-full transition-all duration-200 shadow-md hover:scale-102 active:scale-98 w-full"
                >
                  BOOK CALL
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 h-[500px] md:h-[560px] relative overflow-hidden flex justify-center items-center gap-3.5 sm:gap-5 dna-marquee-container [mask-image:linear-gradient(to_bottom,transparent_0%,black_15%,black_85%,transparent_100%)]">
            <div className="flex flex-col gap-4 dna-marquee-up shrink-0 w-28 sm:w-32">
              {[...galleryCol1, ...galleryCol1].map((imgUrl, idx) => (
                <div
                  key={`dna-col1-${idx}`}
                  className="w-full h-44 sm:h-52 rounded-[36px] overflow-hidden border border-[#DCD4C5] shadow-md shrink-0 group relative bg-white"
                >
                  <img
                    src={imgUrl}
                    alt={`Showcase ${idx}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-4 dna-marquee-down shrink-0 w-28 sm:w-32 -translate-y-16">
              {[...galleryCol2, ...galleryCol2].map((imgUrl, idx) => (
                <div
                  key={`dna-col2-${idx}`}
                  className="w-full h-44 sm:h-52 rounded-[36px] overflow-hidden border border-[#DCD4C5] shadow-md shrink-0 group relative bg-white"
                >
                  <img
                    src={imgUrl}
                    alt={`Showcase ${idx}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-4 dna-marquee-up shrink-0 w-28 sm:w-32 translate-y-10">
              {[...galleryCol3, ...galleryCol3].map((imgUrl, idx) => (
                <div
                  key={`dna-col3-${idx}`}
                  className="w-full h-44 sm:h-52 rounded-[36px] overflow-hidden border border-[#DCD4C5] shadow-md shrink-0 group relative bg-white"
                >
                  <img
                    src={imgUrl}
                    alt={`Showcase ${idx}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3 flex flex-col justify-between space-y-10 lg:pl-4">
            <div className="flex flex-col space-y-3 font-sans">
              {[
                { name: "HOME", href: "/" },
                { name: "AGENCY", href: "/about" },
                { name: "PROJECTS", href: "/work" },
                { name: "BLOG", href: "/services" },
                { name: "CONTACT", href: "/contact" },
              ].map((link, idx) => (
                <Link
                  key={idx}
                  href={link.href}
                  className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#111111] hover:text-[#B08D57] transition-colors uppercase inline-block"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="space-y-6 pt-2">
              <div>
                <p className="text-[11px] font-mono tracking-[0.2em] text-[#B08D57] uppercase font-bold mb-3">
                  FOLLOW US
                </p>
                <div className="flex items-center gap-3">
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Community"
                    className="w-9 h-9 rounded-full bg-white border border-[#DCD4C5] hover:border-[#B08D57] hover:bg-[#B08D57] flex items-center justify-center text-[#111111] hover:text-white transition-all hover:scale-110 shadow-sm"
                  >
                    <span className="text-xs font-black">✦</span>
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Twitter X"
                    className="w-9 h-9 rounded-full bg-white border border-[#DCD4C5] hover:border-[#B08D57] hover:bg-[#B08D57] flex items-center justify-center text-[#111111] hover:text-white transition-all hover:scale-110 font-mono font-bold text-xs shadow-sm"
                  >
                    𝕏
                  </a>
                  <a
                    href="https://behance.net"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Behance"
                    className="w-9 h-9 rounded-full bg-white border border-[#DCD4C5] hover:border-[#B08D57] hover:bg-[#B08D57] flex items-center justify-center text-[#111111] hover:text-white transition-all hover:scale-110 font-bold text-xs shadow-sm"
                  >
                    Bē
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                    className="w-9 h-9 rounded-full bg-white border border-[#DCD4C5] hover:border-[#B08D57] hover:bg-[#B08D57] flex items-center justify-center text-[#111111] hover:text-white transition-all hover:scale-110 shadow-sm"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="text-[11px] font-mono text-[#555555] space-y-2 uppercase leading-relaxed font-medium">
                <p>27 WHITFIELD YARD,<br />SHOREDITCH, LONDON E2 7NX</p>
                <a href="tel:+442039991245" className="text-[#111111] hover:text-[#B08D57] transition-colors block font-semibold pt-1">
                  +44 20 3999 1245
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={textContainerRef}
        className="w-full relative overflow-hidden select-none cursor-crosshair flex items-center justify-center mt-8"
        style={{ minHeight: "220px", height: "26vw", maxHeight: "360px" }}
      >
        <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 pt-4">
        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-[#DCD4C5] pt-4 text-[11px] font-mono text-[#555555] gap-3">
          <div className="flex items-center gap-6">
            <Link href="/contact" className="hover:text-[#111111] transition-colors">
              Terms
            </Link>
            <Link href="/contact" className="hover:text-[#111111] transition-colors">
              Privacy Policy
            </Link>
          </div>
          <p className="text-[#555555]">
            &copy; {new Date().getFullYear()} Bright Space Agency. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
