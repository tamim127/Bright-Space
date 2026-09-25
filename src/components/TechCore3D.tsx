"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface TechCore3DProps {
  scrollProgress?: number;
  className?: string;
  isHoveredSection?: boolean;
}

export default function TechCore3D({
  scrollProgress = 0,
  className = "",
  isHoveredSection = false,
}: TechCore3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const isHoveredRef = useRef(false);
  const scrollRef = useRef(0);

  useEffect(() => {
    isHoveredRef.current = isHoveredSection;
  }, [isHoveredSection]);

  useEffect(() => {
    scrollRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || 500;
    let height = container.clientHeight || 500;

    // 1. Three.js Scene, Camera, WebGL Renderer
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 50);
    // Elevated isometric vantage point focusing on diamond-oriented core
    camera.position.set(0, 3.8, 4.6);
    camera.lookAt(0, 0.05, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // 2. Curated Luxury Warm Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xfff7ee, 1.8);
    scene.add(ambientLight);

    // Warm Ivory/Champagne Directional Key Light (Offset to avoid blinding specular on glass)
    const keyLight = new THREE.DirectionalLight(0xffe2b0, 3.0);
    keyLight.position.set(4.5, 8.5, 2.0);
    scene.add(keyLight);

    // Soft Champagne Secondary Fill Light
    const fillLight = new THREE.DirectionalLight(0xffeedd, 1.5);
    fillLight.position.set(-4, 3, 3);
    scene.add(fillLight);

    // Crisp Cool-Silver/Champagne Backlight for clean rim definition
    const rimLight = new THREE.DirectionalLight(0xdce7f5, 1.2);
    rimLight.position.set(0, 4, -5);
    scene.add(rimLight);

    // Internal Warm Amber Light Burst (inside core between layers)
    const corePointLight = new THREE.PointLight(0xff9a1c, 5.5, 6);
    corePointLight.position.set(0, 0.02, 0);
    scene.add(corePointLight);

    // 3. Materials
    // Metallic Gold Substrate Material (#B88A45 to #D4AF37)
    const goldMetalMat = new THREE.MeshStandardMaterial({
      color: 0xc89e3a,
      metalness: 0.92,
      roughness: 0.26,
    });

    const goldTrimMat = new THREE.MeshStandardMaterial({
      color: 0xffd465,
      emissive: 0xdd8e18,
      emissiveIntensity: 1.2,
      metalness: 0.95,
      roughness: 0.18,
    });

    // Dark Obsidian Platform Material (#111111)
    const darkPlatformMat = new THREE.MeshStandardMaterial({
      color: 0x121215,
      metalness: 0.65,
      roughness: 0.22,
    });

    const darkRecessMat = new THREE.MeshStandardMaterial({
      color: 0x0a0a0c,
      metalness: 0.75,
      roughness: 0.32,
    });

    // Translucent Frosted Glass Material (MeshPhysicalMaterial)
    // Satin roughness prevents harsh specular glare, allowing the golden </> code symbol to shine through cleanly
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xfffae8,
      transmission: 0.94,
      opacity: 0.58,
      transparent: true,
      roughness: 0.18,
      ior: 1.5,
      thickness: 0.28,
      reflectivity: 0.5,
    });

    // Mid Glass Layer (ultra translucent)
    const midGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0xfffae8,
      transmission: 0.95,
      opacity: 0.5,
      transparent: true,
      roughness: 0.12,
      ior: 1.5,
      thickness: 0.2,
      reflectivity: 0.5,
    });

    // Luminous Code Symbol Gold Material (Crisp glowing warm gold)
    const symbolMat = new THREE.MeshStandardMaterial({
      color: 0xffe270,
      emissive: 0xffa010,
      emissiveIntensity: 2.4,
      metalness: 0.92,
      roughness: 0.14,
    });

    // Fine Wireframe & Edge Lines
    const goldEdgeMat = new THREE.LineBasicMaterial({
      color: 0xffd978,
      transparent: true,
      opacity: 0.75,
    });

    const glassEdgeMat = new THREE.LineBasicMaterial({
      color: 0xf5ebd2,
      transparent: true,
      opacity: 0.85,
    });

    const traceLineMat = new THREE.LineBasicMaterial({
      color: 0xd6b976,
      transparent: true,
      opacity: 0.5,
    });

    // 4. Root Assembly Group (Diamond orientation: rotated 45° around Y)
    const rootGroup = new THREE.Group();
    rootGroup.rotation.y = Math.PI / 4; // 45 degrees diamond orientation
    scene.add(rootGroup);

    // --- LAYER 1: Bottom Metallic Gold Architecture Substrate Plate ---
    const bottomLayerGroup = new THREE.Group();
    bottomLayerGroup.position.y = -0.58;

    // Stepped gold base plate
    const basePlateGeo = new THREE.BoxGeometry(2.35, 0.12, 2.35);
    const basePlate = new THREE.Mesh(basePlateGeo, goldMetalMat);
    bottomLayerGroup.add(basePlate);

    const basePlateEdgeGeo = new THREE.EdgesGeometry(basePlateGeo);
    const basePlateEdges = new THREE.LineSegments(basePlateEdgeGeo, goldEdgeMat);
    bottomLayerGroup.add(basePlateEdges);

    // Lower stepped rim
    const lowerSubPlateGeo = new THREE.BoxGeometry(2.1, 0.06, 2.1);
    const lowerSubPlate = new THREE.Mesh(lowerSubPlateGeo, goldTrimMat);
    lowerSubPlate.position.y = -0.09;
    bottomLayerGroup.add(lowerSubPlate);

    // Micro circuitry blocks on gold plate
    const chipGeo = new THREE.BoxGeometry(0.16, 0.05, 0.16);
    const chipMat = new THREE.MeshStandardMaterial({ color: 0x1b1b1e, metalness: 0.5, roughness: 0.4 });
    const chipCoords = [
      [-0.8, -0.8],
      [-0.8, 0.7],
      [0.8, -0.7],
      [0.8, 0.8],
      [-0.35, 0.85],
      [0.4, -0.85],
      [0.85, 0.1],
      [-0.85, -0.1],
    ];
    chipCoords.forEach(([cx, cz]) => {
      const chip = new THREE.Mesh(chipGeo, chipMat);
      chip.position.set(cx, 0.08, cz);
      bottomLayerGroup.add(chip);
    });

    rootGroup.add(bottomLayerGroup);

    // --- INTERLAYER: Radiant Golden Energy Burst Core ---
    const lightGlowGeo = new THREE.CylinderGeometry(0.9, 1.25, 0.48, 32, 1, true);
    const lightGlowMat = new THREE.MeshBasicMaterial({
      color: 0xffa424,
      transparent: true,
      opacity: 0.32,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });
    const lightGlow = new THREE.Mesh(lightGlowGeo, lightGlowMat);
    lightGlow.position.y = -0.25;
    rootGroup.add(lightGlow);

    // Radiant inner ring
    const innerRingGeo = new THREE.RingGeometry(0.7, 1.05, 32);
    const innerRingMat = new THREE.MeshBasicMaterial({
      color: 0xffbe45,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });
    const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
    innerRing.rotation.x = Math.PI / 2;
    innerRing.position.y = -0.15;
    rootGroup.add(innerRing);

    // --- LAYER 2: Central Dark Obsidian Platform ---
    const middlePlatformGroup = new THREE.Group();
    middlePlatformGroup.position.y = 0;

    // Main dark platform block
    const platformGeo = new THREE.BoxGeometry(2.05, 0.22, 2.05);
    const platform = new THREE.Mesh(platformGeo, darkPlatformMat);
    middlePlatformGroup.add(platform);

    const platformEdgeGeo = new THREE.EdgesGeometry(platformGeo);
    const platformEdges = new THREE.LineSegments(platformEdgeGeo, goldEdgeMat);
    middlePlatformGroup.add(platformEdges);

    // Radiant Gold Chamfered Rim around perimeter (Softly glowing gold)
    const goldRimGeo = new THREE.BoxGeometry(2.12, 0.045, 2.12);
    const goldRim = new THREE.Mesh(goldRimGeo, goldTrimMat);
    goldRim.position.y = -0.06;
    middlePlatformGroup.add(goldRim);

    // Top gold accent line around platform edge
    const topRimGeo = new THREE.BoxGeometry(2.08, 0.02, 2.08);
    const topRim = new THREE.Mesh(topRimGeo, goldTrimMat);
    topRim.position.y = 0.11;
    middlePlatformGroup.add(topRim);

    // Dark recessed center square
    const recessGeo = new THREE.BoxGeometry(1.45, 0.07, 1.45);
    const recess = new THREE.Mesh(recessGeo, darkRecessMat);
    recess.position.y = 0.1;
    middlePlatformGroup.add(recess);

    // Inner gold bevel line surrounding the recess
    const innerBevelGeo = new THREE.EdgesGeometry(new THREE.BoxGeometry(1.48, 0.01, 1.48));
    const innerBevel = new THREE.LineSegments(innerBevelGeo, goldEdgeMat);
    innerBevel.position.y = 0.135;
    middlePlatformGroup.add(innerBevel);

    // --- LAYER 3: 3D Illuminated Technology Symbol `</>` ---
    // Counteract rootGroup's 45° rotation so the symbol reads horizontally across the diamond: `<  /  >`
    const symbolGroup = new THREE.Group();
    symbolGroup.position.set(0, 0.22, 0);
    symbolGroup.rotation.y = -Math.PI / 4;

    // Dedicated warm golden glow right at the symbol
    const symbolLight = new THREE.PointLight(0xffa415, 3.8, 2.5);
    symbolLight.position.set(0, 0.18, 0);
    symbolGroup.add(symbolLight);

    // Precision 3D Code Bracket Geometry
    const bracketArmGeo = new THREE.BoxGeometry(0.08, 0.07, 0.32);

    // Left Bracket `<` (Pointing towards left corner -X)
    const leftArm1 = new THREE.Mesh(bracketArmGeo, symbolMat);
    leftArm1.position.set(-0.35, 0, -0.1);
    leftArm1.rotation.y = Math.PI / 4;
    symbolGroup.add(leftArm1);

    const leftArm2 = new THREE.Mesh(bracketArmGeo, symbolMat);
    leftArm2.position.set(-0.35, 0, 0.1);
    leftArm2.rotation.y = -Math.PI / 4;
    symbolGroup.add(leftArm2);

    // Diagonal Slash `/` (Angled forward slash in center)
    const slashGeo = new THREE.BoxGeometry(0.075, 0.07, 0.52);
    const slash = new THREE.Mesh(slashGeo, symbolMat);
    slash.position.set(0, 0, 0);
    slash.rotation.y = -Math.PI / 5;
    symbolGroup.add(slash);

    // Right Bracket `>` (Pointing towards right corner +X)
    const rightArm1 = new THREE.Mesh(bracketArmGeo, symbolMat);
    rightArm1.position.set(0.35, 0, -0.1);
    rightArm1.rotation.y = -Math.PI / 4;
    symbolGroup.add(rightArm1);

    const rightArm2 = new THREE.Mesh(bracketArmGeo, symbolMat);
    rightArm2.position.set(0.35, 0, 0.1);
    rightArm2.rotation.y = Math.PI / 4;
    symbolGroup.add(rightArm2);

    middlePlatformGroup.add(symbolGroup);
    rootGroup.add(middlePlatformGroup);

    // --- LAYER 4: Intermediate Translucent Glass Layer ---
    const midGlassGroup = new THREE.Group();
    midGlassGroup.position.y = 0.42;

    const midGlassGeo = new THREE.BoxGeometry(1.85, 0.025, 1.85);
    const midGlass = new THREE.Mesh(midGlassGeo, midGlassMat);
    midGlassGroup.add(midGlass);

    const midGlassEdgeGeo = new THREE.EdgesGeometry(midGlassGeo);
    const midGlassEdges = new THREE.LineSegments(midGlassEdgeGeo, glassEdgeMat);
    midGlassGroup.add(midGlassEdges);

    rootGroup.add(midGlassGroup);

    // --- LAYER 5: Top Floating Frosted UI Glass Architectural Plate ---
    const topGlassGroup = new THREE.Group();
    topGlassGroup.position.y = 0.68;

    const topGlassGeo = new THREE.BoxGeometry(2.35, 0.04, 2.35);
    const topGlass = new THREE.Mesh(topGlassGeo, glassMat);
    topGlassGroup.add(topGlass);

    const topGlassEdgeGeo = new THREE.EdgesGeometry(topGlassGeo);
    const topGlassEdges = new THREE.LineSegments(topGlassEdgeGeo, glassEdgeMat);
    topGlassGroup.add(topGlassEdges);

    // Delicate Architectural Schematic Lines engraved on the top glass
    const trace1Geo = new THREE.EdgesGeometry(new THREE.BoxGeometry(1.9, 0.005, 1.9));
    const trace1 = new THREE.LineSegments(trace1Geo, traceLineMat);
    trace1.position.y = 0.022;
    topGlassGroup.add(trace1);

    // Subtle corner targeting marks on glass
    const cornerMarkGeo = new THREE.BoxGeometry(0.18, 0.008, 0.02);
    const cornerOffsets = [
      [-0.85, -0.85],
      [-0.85, 0.85],
      [0.85, -0.85],
      [0.85, 0.85],
    ];
    cornerOffsets.forEach(([cx, cz]) => {
      const mark = new THREE.Mesh(cornerMarkGeo, goldTrimMat);
      mark.position.set(cx, 0.022, cz);
      topGlassGroup.add(mark);
    });

    rootGroup.add(topGlassGroup);

    // --- FLOATING ORBITAL NODES & PARTICLES ---
    const particleCount = 26;
    const particleGeo = new THREE.SphereGeometry(0.024, 8, 8);
    const particleMat = new THREE.MeshBasicMaterial({ color: 0xffd97a });
    const particles: { mesh: THREE.Mesh; angle: number; radius: number; speed: number; y: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      const pMesh = new THREE.Mesh(particleGeo, particleMat);
      const angle = (i / particleCount) * Math.PI * 2;
      const radius = 1.7 + (i % 4) * 0.28;
      const yPos = -0.45 + ((i * 11) % 20) * 0.055;
      pMesh.position.set(Math.cos(angle) * radius, yPos, Math.sin(angle) * radius);
      rootGroup.add(pMesh);
      particles.push({
        mesh: pMesh,
        angle,
        radius,
        speed: 0.0028 + (i % 3) * 0.0012,
        y: yPos,
      });
    }

    // 5. Mouse Interaction Tracking (Smooth Inertia Lerp)
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      mouseRef.current.targetX = nx;
      mouseRef.current.targetY = ny;
    };

    const onMouseEnter = () => {
      isHoveredRef.current = true;
    };

    const onMouseLeave = () => {
      isHoveredRef.current = false;
      mouseRef.current.targetX = 0;
      mouseRef.current.targetY = 0;
    };

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseenter", onMouseEnter);
    container.addEventListener("mouseleave", onMouseLeave);

    // 6. Responsive Resize Handling
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 500;
      height = container.clientHeight || 500;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // 7. Visibility Observer (Pause when off-screen to save 100% CPU/GPU)
    let isVisible = true;
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    // 8. 60fps Animation Loop with GSAP Scroll Scrub & Eased Movement
    let animationFrameId = 0;
    const clock = new THREE.Clock();
    let currentScroll = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      clock.getDelta();
      const time = clock.getElapsedTime();

      // Smooth Lerp Mouse Inertia
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.06;

      // Smooth Lerp Scroll Progress
      currentScroll += (scrollRef.current - currentScroll) * 0.08;

      // Base Diamond Orientation (Math.PI / 4) + Very Slow Majestic Idle Sway
      const baseRotation = Math.PI / 4 + Math.sin(time * 0.35) * 0.08;

      // Scroll-driven rotation advance
      const scrollRotation = (currentScroll - 0.5) * 0.45;

      // Combined dynamic Y-axis and X-axis rotation
      rootGroup.rotation.y = baseRotation + scrollRotation + mouseRef.current.x * 0.32;
      rootGroup.rotation.x = -mouseRef.current.y * 0.22;

      // Gentle vertical floating breathing
      const floatY = Math.sin(time * 1.2) * 0.04;
      rootGroup.position.y = floatY;

      // Scroll and Hover Scale
      // Phase 1 (entry): slightly smaller. Phase 3 (center): full scale.
      const scrollScaleFactor = 0.92 + Math.sin(currentScroll * Math.PI) * 0.16;
      const hoverScale = isHoveredRef.current ? 1.04 : 1.0;
      const targetScale = scrollScaleFactor * hoverScale;
      rootGroup.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.07);

      // Scroll-Driven Layer Separation Expansion
      // Layers separate slightly as user reaches the center of the section!
      const layerSeparation = Math.sin(currentScroll * Math.PI) * 0.18;

      topGlassGroup.position.y = 0.68 + layerSeparation + Math.sin(time * 1.5 + 1.2) * 0.03;
      midGlassGroup.position.y = 0.42 + layerSeparation * 0.5 + Math.sin(time * 1.4 + 0.6) * 0.02;
      bottomLayerGroup.position.y = -0.58 - layerSeparation * 0.6 + Math.sin(time * 1.1) * 0.015;

      // Symbol Floating & Glow Pulsing
      symbolGroup.position.y = 0.22 + Math.sin(time * 2.0) * 0.012;
      const glowPulse = Math.sin(time * 2.2) * 0.25;
      symbolMat.emissiveIntensity = 2.4 + glowPulse + (isHoveredRef.current ? 0.6 : 0);
      corePointLight.intensity = 5.2 + glowPulse * 1.5 + (isHoveredRef.current ? 1.2 : 0);
      symbolLight.intensity = 3.8 + glowPulse * 1.0 + (isHoveredRef.current ? 1.0 : 0);

      // Orbit particles around the core
      particles.forEach((p) => {
        p.angle += p.speed;
        p.mesh.position.x = Math.cos(p.angle) * p.radius;
        p.mesh.position.z = Math.sin(p.angle) * p.radius;
        p.mesh.position.y = p.y + Math.sin(time * 1.4 + p.angle) * 0.025;
      });

      renderer.render(scene, camera);
    };

    animate();

    // 9. Thorough Cleanup to Prevent WebGL Leaks
    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseenter", onMouseEnter);
      container.removeEventListener("mouseleave", onMouseLeave);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Dispose geometries
      [
        basePlateGeo,
        basePlateEdgeGeo,
        lowerSubPlateGeo,
        chipGeo,
        lightGlowGeo,
        innerRingGeo,
        platformGeo,
        platformEdgeGeo,
        goldRimGeo,
        topRimGeo,
        recessGeo,
        innerBevelGeo,
        bracketArmGeo,
        slashGeo,
        midGlassGeo,
        midGlassEdgeGeo,
        topGlassGeo,
        topGlassEdgeGeo,
        trace1Geo,
        cornerMarkGeo,
        particleGeo,
      ].forEach((g) => g.dispose());

      // Dispose materials
      [
        goldMetalMat,
        goldTrimMat,
        darkPlatformMat,
        darkRecessMat,
        glassMat,
        midGlassMat,
        symbolMat,
        goldEdgeMat,
        glassEdgeMat,
        traceLineMat,
        chipMat,
        lightGlowMat,
        innerRingMat,
        particleMat,
      ].forEach((m) => m.dispose());

      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center select-none pointer-events-auto ${className}`}
      style={{
        width: "100%",
        height: "100%",
      }}
    />
  );
}
