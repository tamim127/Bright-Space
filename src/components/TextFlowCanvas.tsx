"use client";

import React, { useRef, useEffect } from "react";

interface TextFlowCanvasProps {
  text?: string;
  className?: string;
}

export default function TextFlowCanvas({
  text = "BRIGHT SPACE",
  className = "",
}: TextFlowCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let animId: number;
    let width = container.offsetWidth;
    let height = container.offsetHeight;

    // Smooth Mouse tracking with reduced interaction radius (60px)
    const mouse = {
      x: -2000,
      y: -2000,
      targetX: -2000,
      targetY: -2000,
      radius: 65, // Reduced interaction radius as requested
    };

    // Shockwaves on click
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

    // Kinetic Particle with tiny size and smooth physics
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
        this.size = 1.15; // Very small particle size as requested
      }

      update() {
        // Distance to mouse
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Smooth gentle repel only within reduced radius
        if (dist < mouse.radius && mouse.x > -1000) {
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          // Smoother, gentle push power
          const pushPower = force * 2.8;
          this.vx -= Math.cos(angle) * pushPower;
          this.vy -= Math.sin(angle) * pushPower;
        }

        // Shockwaves from click
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

        // Reduced elasticity return (soft, fluid spring back)
        this.vx += (this.baseX - this.x) * 0.024;
        this.vy += (this.baseY - this.y) * 0.024;

        // High damping for buttery smooth motion without jitter
        this.vx *= 0.94;
        this.vy *= 0.94;

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

    // Initialize & sample particles with tight density gap
    const initParticles = () => {
      particles = [];
      const offscreen = document.createElement("canvas");
      offscreen.width = width;
      offscreen.height = height;
      const offCtx = offscreen.getContext("2d", { willReadFrequently: true });
      if (!offCtx) return;

      // Responsive font size so "BRIGHT SPACE" stays on 1 single line across viewport
      const targetFontSize = Math.min(
        Math.floor(width / 7.2),
        Math.floor(height * 0.65),
        230
      );

      offCtx.fillStyle = "#ffffff";
      offCtx.textAlign = "center";
      offCtx.textBaseline = "middle";
      offCtx.font = `900 ${targetFontSize}px 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`;

      const centerX = width / 2;
      const centerY = height / 2;
      offCtx.fillText(text, centerX, centerY);

      const imageData = offCtx.getImageData(0, 0, width, height);
      const data = imageData.data;

      // Tight density gap (2px) for crisp, densely packed micro-particles
      const gap = width < 768 ? 2.5 : 2;

      // Clean, sharp palette without blur
      const colors = [
        "#ffffff",
        "#f8fafc",
        "#e2e8f0",
        "#38bdf8",
        "#00f2fe",
        "#a78bfa",
      ];

      for (let y = 0; y < height; y += gap) {
        for (let x = 0; x < width; x += gap) {
          const index = (y * width + x) * 4;
          const alpha = data[index + 3];

          if (alpha > 125) {
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
        currentRadius: 8,
        maxRadius: Math.max(width, height) * 0.5,
        thickness: 35,
        strength: 12,
        speed: 12,
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("mousedown", handleClick);

    // Animation render loop
    const animate = () => {
      // Smooth interpolation for mouse position
      mouse.x += (mouse.targetX - mouse.x) * 0.18;
      mouse.y += (mouse.targetY - mouse.y) * 0.18;

      ctx.clearRect(0, 0, width, height);

      // Glow completely removed as requested (crisp, matte, sharp)
      ctx.shadowBlur = 0;

      // Update shockwaves
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.currentRadius += sw.speed;
        sw.strength *= 0.93;
        if (sw.currentRadius >= sw.maxRadius || sw.strength < 0.1) {
          shockwaves.splice(i, 1);
        }
      }

      // Update and draw particles
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
  }, [text]);

  return (
    <div
      ref={containerRef}
      className={`w-full relative overflow-hidden bg-transparent select-none cursor-crosshair flex items-center justify-center ${className}`}
      style={{ minHeight: "220px", height: "26vw", maxHeight: "360px" }}
    >
      {/* Kinetic Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />

      {/* Interaction Hint */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none text-[10px] font-mono tracking-widest text-neutral-500 uppercase opacity-50">
        Hover cursor to push &bull; Click to ripple
      </div>
    </div>
  );
}
