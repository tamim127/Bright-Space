"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function CtaThreeBackground() {
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

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    camera.position.set(0, 0, 11);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // Warm Studio Lighting (ensuring bright, sparkling gold & lustrous pearl)
    const ambientLight = new THREE.AmbientLight(0xfffbf4, 2.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff6ea, 3.8);
    keyLight.position.set(8, 10, 8);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xf5e6cc, 2.4);
    fillLight.position.set(-8, -6, 6);
    scene.add(fillLight);

    const goldPointLight1 = new THREE.PointLight(0xe5b869, 5.0, 25);
    goldPointLight1.position.set(6, 2, 4);
    scene.add(goldPointLight1);

    const goldPointLight2 = new THREE.PointLight(0xe5b869, 4.5, 25);
    goldPointLight2.position.set(-6, 3, 4);
    scene.add(goldPointLight2);

    // High-End Materials
    // 1. Pearl White/Ivory Ceramic with Clearcoat
    const pearlMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xfaf6ef,
      metalness: 0.08,
      roughness: 0.18,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      reflectivity: 0.9,
    });

    // 2. Pure Sparkling Metallic Champagne Gold
    const goldMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xd4a559,
      emissive: 0x3d2708,
      metalness: 0.96,
      roughness: 0.12,
      clearcoat: 1.0,
      clearcoatRoughness: 0.06,
    });

    // ── LEFT OBJECT (Curved Sculptural Form entering from top-left, pushed far left) ──
    const leftGroup = new THREE.Group();
    // Positioned safely outside central text zone
    leftGroup.position.set(-6.8, 2.0, 0);

    const leftCurveGeo = new THREE.TorusGeometry(2.3, 0.65, 48, 120, Math.PI * 1.2);
    const leftMesh = new THREE.Mesh(leftCurveGeo, pearlMaterial);
    leftMesh.rotation.set(0.35, 0.75, -0.5);
    leftGroup.add(leftMesh);

    // Floating Metallic Gold Sphere
    const leftSphereGeo = new THREE.SphereGeometry(0.35, 64, 64);
    const leftSphereMesh = new THREE.Mesh(leftSphereGeo, goldMaterial);
    leftSphereMesh.position.set(2.0, -1.8, 1.2);
    leftGroup.add(leftSphereMesh);

    scene.add(leftGroup);

    // ── RIGHT OBJECT (Sculptural Torus cropped heavily on right edge) ──
    const rightGroup = new THREE.Group();
    // Positioned safely far to the right, cropped by viewport edge so it NEVER covers text
    rightGroup.position.set(6.8, -0.6, 0);

    const rightRingGeo = new THREE.TorusGeometry(2.2, 0.6, 48, 140);
    const rightMesh = new THREE.Mesh(rightRingGeo, pearlMaterial);
    rightMesh.rotation.set(0.6, -0.45, 0.3);
    rightGroup.add(rightMesh);

    // Floating Metallic Gold Sphere near right ring
    const rightSphereGeo = new THREE.SphereGeometry(0.3, 64, 64);
    const rightSphereMesh = new THREE.Mesh(rightSphereGeo, goldMaterial);
    rightSphereMesh.position.set(-1.8, -1.2, 1.3);
    rightGroup.add(rightSphereMesh);

    scene.add(rightGroup);

    // Mouse Parallax with gentle dampening
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Responsive Positioning
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;

      // Adjust positions based on viewport width to guarantee text is NEVER obstructed
      if (width < 1024) {
        // Tablet / Mobile: scale down and push further to sides
        leftGroup.position.set(-5.5, 2.5, -2);
        leftGroup.scale.set(0.7, 0.7, 0.7);
        rightGroup.position.set(5.5, -1.0, -2);
        rightGroup.scale.set(0.7, 0.7, 0.7);
      } else if (width < 1440) {
        // Standard Desktop: push safely to outer thirds
        leftGroup.position.set(-6.5, 2.0, 0);
        leftGroup.scale.set(0.9, 0.9, 0.9);
        rightGroup.position.set(6.6, -0.5, 0);
        rightGroup.scale.set(0.9, 0.9, 0.9);
      } else {
        // Ultra-wide / Large Desktop
        leftGroup.position.set(-7.4, 2.0, 0);
        leftGroup.scale.set(1.05, 1.05, 1.05);
        rightGroup.position.set(7.5, -0.5, 0);
        rightGroup.scale.set(1.05, 1.05, 1.05);
      }

      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const t = clock.getElapsedTime();

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      if (!prefersReducedMotion) {
        // Left Object floating & subtle rotation
        leftMesh.rotation.x = 0.35 + Math.sin(t * 0.3) * 0.06 + mouse.y * 0.04;
        leftMesh.rotation.y = 0.75 + Math.cos(t * 0.25) * 0.06 + mouse.x * 0.04;
        leftSphereMesh.position.y = -1.8 + Math.sin(t * 0.7) * 0.12;
        leftSphereMesh.position.x = 2.0 + Math.cos(t * 0.5) * 0.08;

        // Right Object floating & subtle rotation
        rightMesh.rotation.x = 0.6 + Math.cos(t * 0.28) * 0.07 - mouse.y * 0.04;
        rightMesh.rotation.y = -0.45 + Math.sin(t * 0.32) * 0.08 - mouse.x * 0.04;
        rightSphereMesh.position.y = -1.2 + Math.cos(t * 0.65) * 0.12;
        rightSphereMesh.position.x = -1.8 + Math.sin(t * 0.55) * 0.08;
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

      leftCurveGeo.dispose();
      leftSphereGeo.dispose();
      rightRingGeo.dispose();
      rightSphereGeo.dispose();
      pearlMaterial.dispose();
      goldMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
    />
  );
}
