"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function VisionThreeBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let animationFrameId: number;
    let width = container.clientWidth;
    let height = container.clientHeight;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 0, 11);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // 2. Warm Luxury Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xfff8ed, 2.5);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff5e4, 4.0);
    sunLight.position.set(6, 9, 8);
    scene.add(sunLight);

    const fillLight = new THREE.DirectionalLight(0xf2e4cc, 2.2);
    fillLight.position.set(-8, -4, 5);
    scene.add(fillLight);

    const goldPointLight1 = new THREE.PointLight(0xe8be6f, 4.8, 30);
    goldPointLight1.position.set(-5, -2, 4);
    scene.add(goldPointLight1);

    const goldPointLight2 = new THREE.PointLight(0xdfb464, 4.0, 30);
    goldPointLight2.position.set(6, 2, 4);
    scene.add(goldPointLight2);

    // 3. Materials
    // Marble / Stone Travertine Material for Pedestal
    const marbleMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xede6d8,
      roughness: 0.5,
      metalness: 0.04,
      clearcoat: 0.4,
      clearcoatRoughness: 0.2,
    });

    // Amber / Golden Crystal Glass Prisms
    const crystalMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xd6a858,
      roughness: 0.12,
      metalness: 0.15,
      transmission: 0.72,
      transparent: true,
      opacity: 0.88,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      reflectivity: 0.9,
    });

    // Pure Mirror Champagne Gold Material
    const goldMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xd9a852,
      emissive: 0x362105,
      metalness: 0.96,
      roughness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
    });

    // Frosted Ivory / Pearl Glass Torus Material
    const pearlGlassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xfcf7ed,
      roughness: 0.22,
      metalness: 0.08,
      transmission: 0.45,
      transparent: true,
      opacity: 0.85,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
    });

    // 4. BOTTOM-LEFT GROUP: Stepped Architectural Marble Pedestal + Crystal Bars + Gold Sphere
    const leftGroup = new THREE.Group();
    // Positioned safely in bottom-left corner so it does not collide with central content
    leftGroup.position.set(-6.8, -2.6, 0);

    // Lower Marble Step Slab
    const baseStepGeo = new THREE.BoxGeometry(3.6, 0.4, 2.2);
    const baseStepMesh = new THREE.Mesh(baseStepGeo, marbleMaterial);
    baseStepMesh.position.set(0, 0, 0);
    baseStepMesh.rotation.set(0.12, 0.38, -0.05);
    leftGroup.add(baseStepMesh);

    // Upper Marble Step Slab
    const upperStepGeo = new THREE.BoxGeometry(2.6, 0.4, 1.8);
    const upperStepMesh = new THREE.Mesh(upperStepGeo, marbleMaterial);
    upperStepMesh.position.set(-0.35, 0.38, -0.2);
    upperStepMesh.rotation.set(0.12, 0.38, -0.05);
    leftGroup.add(upperStepMesh);

    // 3 Golden Crystal Prisms on the Pedestal
    const bar1Geo = new THREE.BoxGeometry(0.32, 1.8, 0.32);
    const bar1Mesh = new THREE.Mesh(bar1Geo, crystalMaterial);
    bar1Mesh.position.set(-0.8, 1.25, -0.4);
    bar1Mesh.rotation.set(0.08, 0.35, 0);
    leftGroup.add(bar1Mesh);

    const bar2Geo = new THREE.BoxGeometry(0.35, 2.4, 0.35);
    const bar2Mesh = new THREE.Mesh(bar2Geo, crystalMaterial);
    bar2Mesh.position.set(-0.4, 1.55, -0.3);
    bar2Mesh.rotation.set(0.08, 0.35, 0);
    leftGroup.add(bar2Mesh);

    const bar3Geo = new THREE.BoxGeometry(0.32, 1.4, 0.32);
    const bar3Mesh = new THREE.Mesh(bar3Geo, crystalMaterial);
    bar3Mesh.position.set(0.0, 1.05, -0.2);
    bar3Mesh.rotation.set(0.08, 0.35, 0);
    leftGroup.add(bar3Mesh);

    // Polished Mirror Gold Sphere resting on the corner
    const leftSphereGeo = new THREE.SphereGeometry(0.5, 64, 64);
    const leftSphereMesh = new THREE.Mesh(leftSphereGeo, goldMaterial);
    leftSphereMesh.position.set(0.7, 0.72, 0.4);
    leftGroup.add(leftSphereMesh);

    scene.add(leftGroup);

    // 5. TOP-RIGHT GROUP: Floating Pearl Glass Ribbon / Torus + Floating Gold Sphere
    const rightGroup = new THREE.Group();
    // Positioned safely in upper-right margin
    rightGroup.position.set(6.8, 1.8, 0);

    // Pearl / Glass Torus Ribbon
    const ringGeo = new THREE.TorusGeometry(1.8, 0.28, 40, 100, Math.PI * 1.5);
    const ringMesh = new THREE.Mesh(ringGeo, pearlGlassMaterial);
    ringMesh.rotation.set(0.7, -0.5, 0.4);
    rightGroup.add(ringMesh);

    // Floating Gold Sphere
    const rightSphereGeo = new THREE.SphereGeometry(0.42, 64, 64);
    const rightSphereMesh = new THREE.Mesh(rightSphereGeo, goldMaterial);
    rightSphereMesh.position.set(-0.7, 0.6, 0.8);
    rightGroup.add(rightSphereMesh);

    scene.add(rightGroup);

    // 6. Mouse Parallax Reaction
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // 7. Responsive Auto-scaling
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;

      if (width < 1024) {
        // Mobile / Tablet: scale down and push further to edge
        leftGroup.position.set(-5.6, -3.2, -2.5);
        leftGroup.scale.set(0.65, 0.65, 0.65);
        rightGroup.position.set(5.5, 2.6, -2.5);
        rightGroup.scale.set(0.65, 0.65, 0.65);
      } else if (width < 1440) {
        // Standard Desktop
        leftGroup.position.set(-6.6, -2.6, 0);
        leftGroup.scale.set(0.9, 0.9, 0.9);
        rightGroup.position.set(6.7, 1.8, 0);
        rightGroup.scale.set(0.9, 0.9, 0.9);
      } else {
        // Large / Ultra-wide
        leftGroup.position.set(-7.4, -2.6, 0);
        leftGroup.scale.set(1.05, 1.05, 1.05);
        rightGroup.position.set(7.4, 2.0, 0);
        rightGroup.scale.set(1.05, 1.05, 1.05);
      }

      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // 8. Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const t = clock.getElapsedTime();

      // Smooth mouse damping
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      if (!prefersReducedMotion) {
        // Left Pedestal subtle tilt reaction
        leftGroup.rotation.y = mouse.x * 0.03;
        leftGroup.rotation.x = -mouse.y * 0.02;

        // Crystal Prisms micro-glow shimmer
        bar2Mesh.position.y = 1.55 + Math.sin(t * 1.2) * 0.04;
        leftSphereMesh.position.y = 0.72 + Math.cos(t * 0.8) * 0.03;

        // Right Ring gentle float & spin
        ringMesh.rotation.z = t * 0.08 + mouse.x * 0.03;
        ringMesh.rotation.x = 0.7 + Math.sin(t * 0.3) * 0.06 - mouse.y * 0.03;

        // Right Gold Sphere gentle floating bob
        rightSphereMesh.position.y = 0.6 + Math.sin(t * 0.85) * 0.12;
        rightSphereMesh.position.x = -0.7 + Math.cos(t * 0.6) * 0.08;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      baseStepGeo.dispose();
      upperStepGeo.dispose();
      bar1Geo.dispose();
      bar2Geo.dispose();
      bar3Geo.dispose();
      leftSphereGeo.dispose();
      ringGeo.dispose();
      rightSphereGeo.dispose();

      marbleMaterial.dispose();
      crystalMaterial.dispose();
      goldMaterial.dispose();
      pearlGlassMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
