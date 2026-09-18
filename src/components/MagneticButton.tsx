"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  particleType?: "triangles" | "circles" | "squares";
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  vRot: number;
  life: number;
  maxLife: number;
  color: string;
  stroke: boolean;
  shape: "triangle" | "circle" | "square";
}

export default function MagneticButton({
  children,
  className = "",
  onClick,
  variant = "primary",
  particleType = "triangles",
}: MagneticButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const animFrameIdRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);

  // Canvas size setup
  const updateCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    // Padding so particles can fly far outside button boundaries
    const paddingX = 140;
    const paddingY = 80;

    const width = rect.width + paddingX * 2;
    const height = rect.height + paddingY * 2;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(dpr, dpr);
    }
  }, []);

  useEffect(() => {
    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);
    return () => window.removeEventListener("resize", updateCanvasSize);
  }, [updateCanvasSize]);

  // Main Canvas render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let lastSpawn = 0;

    const render = (time: number) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const paddingX = 140;
      const paddingY = 80;
      const width = rect.width + paddingX * 2;
      const height = rect.height + paddingY * 2;

      ctx.clearRect(0, 0, width, height);

      // Spawn particles when hovered
      if (isHovered && time - lastSpawn > 16) { // ~60 particles/sec
        lastSpawn = time;
        const count = Math.floor(Math.random() * 2) + 2; // 2-3 particles per frame

        for (let i = 0; i < count; i++) {
          const relX = mousePosRef.current.x;
          const relY = mousePosRef.current.y;

          // Canvas coordinate space offset
          const spawnX = paddingX + relX + (Math.random() * 20 - 10);
          const spawnY = paddingY + relY + (Math.random() * 20 - 10);

          // Disintegrate towards left / outwards (matching Framer demo)
          const angle = Math.PI + (Math.random() * 0.8 - 0.4); // drift leftwards (-X direction)
          const speed = Math.random() * 4.5 + 2.0;

          // Colors
          let color = "rgba(255, 255, 255, 0.85)";
          if (variant === "primary") {
            const colors = [
              "rgba(0, 229, 255, 0.9)",
              "rgba(108, 99, 255, 0.9)",
              "rgba(255, 255, 255, 0.95)",
              "rgba(0, 229, 255, 0.6)",
            ];
            color = colors[Math.floor(Math.random() * colors.length)];
          } else {
            const colors = [
              "rgba(255, 255, 255, 0.85)",
              "rgba(200, 200, 220, 0.7)",
              "rgba(108, 99, 255, 0.7)",
            ];
            color = colors[Math.floor(Math.random() * colors.length)];
          }

          const shape = particleType === "triangles"
            ? "triangle"
            : particleType === "squares"
              ? "square"
              : "circle";

          particlesRef.current.push({
            x: spawnX,
            y: spawnY,
            vx: Math.cos(angle) * speed - 1.5, // strong leftward velocity
            vy: Math.sin(angle) * speed * 0.6,
            size: Math.random() * 10 + 5, // 5px to 15px
            rotation: Math.random() * Math.PI * 2,
            vRot: (Math.random() - 0.5) * 0.15,
            life: 1.0,
            maxLife: 1.0,
            color,
            stroke: Math.random() > 0.35, // 65% hollow wireframes like Framer demo
            shape,
          });
        }
      }

      // Update and draw existing particles
      const activeParticles: Particle[] = [];

      for (let p of particlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.vRot;
        p.life -= 0.022; // Decay rate

        if (p.life > 0) {
          activeParticles.push(p);

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.globalAlpha = Math.max(0, p.life);

          const radius = p.size / 2;

          if (p.shape === "triangle") {
            ctx.beginPath();
            ctx.moveTo(0, -radius);
            ctx.lineTo(radius * 0.866, radius * 0.5);
            ctx.lineTo(-radius * 0.866, radius * 0.5);
            ctx.closePath();

            if (p.stroke) {
              ctx.strokeStyle = p.color;
              ctx.lineWidth = 1.5;
              ctx.stroke();
            } else {
              ctx.fillStyle = p.color;
              ctx.fill();
            }
          } else if (p.shape === "square") {
            ctx.beginPath();
            ctx.rect(-radius, -radius, p.size, p.size);
            if (p.stroke) {
              ctx.strokeStyle = p.color;
              ctx.lineWidth = 1.5;
              ctx.stroke();
            } else {
              ctx.fillStyle = p.color;
              ctx.fill();
            }
          } else {
            // Circle
            ctx.beginPath();
            ctx.arc(0, 0, radius, 0, Math.PI * 2);
            if (p.stroke) {
              ctx.strokeStyle = p.color;
              ctx.lineWidth = 1.5;
              ctx.stroke();
            } else {
              ctx.fillStyle = p.color;
              ctx.fill();
            }
          }

          ctx.restore();
        }
      }

      particlesRef.current = activeParticles;

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    animFrameIdRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [isHovered, variant, particleType]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);

    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });

    // Store mouse position relative to container top-left
    mousePosRef.current = {
      x: clientX - left,
      y: clientY - top,
    };
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    setIsHovered(true);
    handleMouseMove(e);
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const baseStyles =
    "relative inline-flex items-center justify-center font-medium px-8 py-4 rounded-full transition-all duration-300 interactive cursor-pointer select-none text-sm tracking-wide group";

  const variants = {
    primary:
      "bg-gradient-to-r from-[#6C63FF] via-[#3B82F6] to-[#00E5FF] text-white shadow-[0_0_30px_rgba(108,99,255,0.4)] hover:shadow-[0_0_40px_rgba(0,229,255,0.6)] border border-transparent",
    secondary:
      "bg-[#0D0D12] text-[#F5F5F5] border border-[rgba(255,255,255,0.15)] hover:border-[rgba(0,229,255,0.5)] hover:bg-[#13131A] shadow-lg",
    outline:
      "bg-[#0B0B0E]/80 backdrop-blur-md text-[#F5F5F5] border border-[rgba(255,255,255,0.2)] hover:border-[#00E5FF] hover:text-white shadow-md",
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="inline-block relative overflow-visible"
    >
      {/* Dynamic Canvas Particle Overlay */}
      <canvas
        ref={canvasRef}
        className="absolute pointer-events-none z-20"
        style={{
          top: "-80px",
          left: "-140px",
        }}
      />

      <motion.div
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 220, damping: 16, mass: 0.1 }}
        className="relative z-10"
      >
        <button
          onClick={onClick}
          className={`${baseStyles} ${variants[variant]} ${className}`}
        >
          {/* Disintegration Edge Glow effect */}
          <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-r from-transparent via-[rgba(0,229,255,0.25)] to-transparent blur-sm" />

          <span className="relative z-10 flex items-center gap-2">
            {children}
          </span>
        </button>
      </motion.div>
    </div>
  );
}

