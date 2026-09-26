"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  baseAlpha: number;
  phase: number;
}

interface ClickRipple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

interface ProcessConstellationCanvasProps {
  className?: string;
}

export default function ProcessConstellationCanvas({
  className = "",
}: ProcessConstellationCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    // Mouse coordinates with smooth interpolation
    const mouse = {
      x: -9999,
      y: -9999,
      targetX: -9999,
      targetY: -9999,
      active: false,
    };

    let particles: Particle[] = [];
    const ripples: ClickRipple[] = [];
    const colors = ["#B08D57", "#D4BD91", "#8C6D3B", "#C5A875", "#E8D4AE"];

    const createParticle = (x: number, y: number, burst = false): Particle => {
      const angle = Math.random() * Math.PI * 2;
      const speed = burst ? Math.random() * 3.5 + 1.2 : (Math.random() - 0.5) * 0.55;
      const vx = burst ? Math.cos(angle) * speed : speed;
      const vy = burst ? Math.sin(angle) * speed : (Math.random() - 0.5) * 0.55;
      const baseAlpha = Math.random() * 0.45 + 0.35;

      return {
        x,
        y,
        vx,
        vy,
        radius: Math.random() * 1.8 + 1.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: baseAlpha,
        baseAlpha,
        phase: Math.random() * Math.PI * 2,
      };
    };

    const initParticles = () => {
      particles = [];
      // Substantially increased density: ~130 - 170 particles on desktop
      const baseCount = Math.min(170, Math.max(75, Math.floor((width * height) / 10500)));

      for (let i = 0; i < baseCount; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        particles.push(createParticle(x, y));
      }
    };

    const resize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.scale(dpr, dpr);

      initParticles();
    };

    resize();
    window.addEventListener("resize", resize);

    // Track mouse and click on canvas parent section
    const parent = canvas.parentElement;

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.targetX = -9999;
      mouse.targetY = -9999;
    };

    // On Click: Spawn burst of new particles + radiating golden ripple ring
    const handleClick = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Add ripple effect
      ripples.push({
        x: clickX,
        y: clickY,
        radius: 6,
        maxRadius: 120,
        alpha: 0.65,
      });

      // Spawn 14 new burst particles at click location
      const spawnCount = 14;
      for (let i = 0; i < spawnCount; i++) {
        particles.push(createParticle(clickX, clickY, true));
      }

      // Cap particles to prevent memory or render lag (max 280)
      if (particles.length > 280) {
        particles.splice(0, particles.length - 280);
      }
    };

    if (parent) {
      parent.addEventListener("mousemove", handleMouseMove);
      parent.addEventListener("mouseleave", handleMouseLeave);
      parent.addEventListener("click", handleClick);
    }

    let time = 0;

    // Render loop
    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse lerp
      if (mouse.active) {
        mouse.x += (mouse.targetX - mouse.x) * 0.14;
        mouse.y += (mouse.targetY - mouse.y) * 0.14;
      } else {
        mouse.x = -9999;
        mouse.y = -9999;
      }

      // Draw & update click ripples
      for (let r = ripples.length - 1; r >= 0; r--) {
        const ripple = ripples[r];
        ripple.radius += 2.5;
        ripple.alpha *= 0.94;

        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(176, 141, 87, ${ripple.alpha.toFixed(3)})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        if (ripple.alpha < 0.02 || ripple.radius >= ripple.maxRadius) {
          ripples.splice(r, 1);
        }
      }

      // Update and draw particles
      const connectionDist = 115;
      const mouseInfluenceDist = 185;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Decelerate burst velocity gradually back to gentle ambient speed
        p.vx *= 0.985;
        p.vy *= 0.985;

        // Ambient organic drift
        p.x += p.vx + Math.sin(time + p.phase) * 0.18;
        p.y += p.vy + Math.cos(time + p.phase) * 0.18;

        // Wrap around boundaries smoothly
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        // Mouse hover interaction: elastic repulsion + line connection
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouseInfluenceDist && dist > 0) {
            const force = (1 - dist / mouseInfluenceDist) * 3.8;
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force;

            // Connect particle to mouse with subtle glowing line
            const mouseLineAlpha = (1 - dist / mouseInfluenceDist) * 0.48;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(176, 141, 87, ${mouseLineAlpha.toFixed(3)})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 5;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;

        // Connect nearby particles to form the constellation network
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            const lineAlpha = (1 - dist / connectionDist) * 0.22;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(176, 141, 87, ${lineAlpha.toFixed(3)})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      if (parent) {
        parent.removeEventListener("mousemove", handleMouseMove);
        parent.removeEventListener("mouseleave", handleMouseLeave);
        parent.removeEventListener("click", handleClick);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ zIndex: 1 }}
    />
  );
}
