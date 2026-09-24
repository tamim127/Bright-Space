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

  const updateCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
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

      if (isHovered && time - lastSpawn > 16) {
        lastSpawn = time;
        const count = Math.floor(Math.random() * 2) + 2;

        for (let i = 0; i < count; i++) {
          const relX = mousePosRef.current.x;
          const relY = mousePosRef.current.y;

          const spawnX = paddingX + relX + (Math.random() * 20 - 10);
          const spawnY = paddingY + relY + (Math.random() * 20 - 10);

          const angle = Math.PI + (Math.random() * 0.8 - 0.4);
          const speed = Math.random() * 4.5 + 2.0;

          let color = "rgba(176, 141, 87, 0.85)";
          if (variant === "primary") {
            const colors = [
              "rgba(176, 141, 87, 0.9)",
              "rgba(212, 189, 145, 0.95)",
              "rgba(140, 109, 59, 0.9)",
              "rgba(176, 141, 87, 0.6)",
            ];
            color = colors[Math.floor(Math.random() * colors.length)];
          } else {
            const colors = [
              "rgba(176, 141, 87, 0.85)",
              "rgba(212, 189, 145, 0.7)",
              "rgba(85, 85, 85, 0.7)",
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
            vx: Math.cos(angle) * speed - 1.5,
            vy: Math.sin(angle) * speed * 0.6,
            size: Math.random() * 10 + 5,
            rotation: Math.random() * Math.PI * 2,
            vRot: (Math.random() - 0.5) * 0.15,
            life: 1.0,
            maxLife: 1.0,
            color,
            stroke: Math.random() > 0.35,
            shape,
          });
        }
      }

      const activeParticles: Particle[] = [];

      for (const p of particlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.vRot;
        p.life -= 0.022;

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
    "relative inline-flex items-center justify-center font-bold px-8 py-4 rounded-full transition-all duration-300 cursor-pointer select-none text-sm tracking-wide group";

  const variants = {
    primary:
      "bg-gradient-to-r from-[#B08D57] via-[#9A7846] to-[#8C6D3B] text-white shadow-[0_4px_25px_rgba(176,141,87,0.35)] hover:shadow-[0_4px_35px_rgba(176,141,87,0.5)] border border-transparent",
    secondary:
      "bg-white text-[#111111] border border-[#DCD4C5] hover:border-[#B08D57] hover:bg-[#FAF7F2] shadow-sm",
    outline:
      "bg-white/80 backdrop-blur-md text-[#111111] border border-[#DCD4C5] hover:border-[#B08D57] hover:text-[#B08D57] shadow-sm",
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="inline-block relative overflow-visible"
    >
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
          <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-r from-transparent via-[rgba(176,141,87,0.25)] to-transparent blur-sm" />

          <span className="relative z-10 flex items-center gap-2">
            {children}
          </span>
        </button>
      </motion.div>
    </div>
  );
}
