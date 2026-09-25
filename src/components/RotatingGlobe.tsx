'use client'
import React, { useEffect, useRef } from 'react'
import { createParticleGlobe } from './globe-engine'

interface RotatingGlobeProps {
  className?: string;
  onInteractionStart?: () => void;
  density?: number;
  speed?: number;
  dotColor?: string;
  wireColor?: string;
  accentColor?: string;
}

interface GlobeInstance {
  update: (props?: unknown) => void;
  destroy: () => void;
  canvas: HTMLCanvasElement;
}

export default function RotatingGlobe({
  className = '',
  onInteractionStart,
  density = 65,
  speed = 1.0,
  dotColor = "#b9c8ff",
  wireColor = "#818cf8",
  accentColor = "#00E5FF",
}: RotatingGlobeProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)

  const onInteractionStartRef = useRef(onInteractionStart)
  useEffect(() => {
    onInteractionStartRef.current = onInteractionStart
  }, [onInteractionStart])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let instance: GlobeInstance | null = null;
    let cancelled = false;

    const initGlobe = () => {
      if (cancelled || !containerRef.current) return;
      instance = createParticleGlobe(container, {
        motion: { speed, density, particleSize: 1.15, autoPlay: true },
        layers: { showWireframe: true, showStars: true, showHotspots: true, showMarkers: true },
        interaction: { enableDrag: true, enableParallax: true },
        appearance: {
          bgCenter: "rgba(0,0,0,0)",
          bgEdge: "rgba(0,0,0,0)",
          dotColor,
          wireColor,
          markerColor: "#ffffff",
          accentColor,
          hotColor: "#00E5FF"
        },
        markers: [
          { name: "SAN FRANCISCO", latitude: 37.7, longitude: -122.4, accent: false },
          { name: "LONDON", latitude: 51.5, longitude: -0.1, accent: false },
          { name: "TOKYO", latitude: 35.7, longitude: 139.7, accent: true },
          { name: "DHAKA", latitude: 23.8, longitude: 90.4, accent: true },
          { name: "NEW YORK", latitude: 40.7, longitude: -74.0, accent: false },
          { name: "BERLIN", latitude: 52.5, longitude: 13.4, accent: false }
        ]
      });
    };

    const timer = setTimeout(initGlobe, 250);

    const handlePointerDown = () => {
      if (onInteractionStartRef.current) onInteractionStartRef.current()
    }

    container.addEventListener('pointerdown', handlePointerDown)

    return () => {
      cancelled = true;
      clearTimeout(timer);
      container.removeEventListener('pointerdown', handlePointerDown)
      if (instance && instance.destroy) {
        instance.destroy()
      }
    }
  }, [density, speed, dotColor, wireColor, accentColor])

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full select-none cursor-grab active:cursor-grabbing touch-none ${className}`}
    />
  )
}
