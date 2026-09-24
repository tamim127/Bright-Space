"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ═══════════════════════════════════════════════════════════
// MOTION TOKENS — Consistent motion language across the site
// ═══════════════════════════════════════════════════════════

export const MOTION = {
  ease: {
    smooth: "power2.out",
    cinematic: "power3.out",
    dramatic: "power4.out",
    elastic: "back.out(1.2)",
    linear: "none",
  },
  duration: {
    fast: 0.35,
    normal: 0.6,
    slow: 1.0,
    cinematic: 1.2,
  },
  distance: {
    small: 20,
    medium: 40,
    large: 60,
  },
  scale: {
    subtle: 0.97,
    medium: 0.92,
    dramatic: 0.85,
  },
  stagger: {
    tight: 0.04,
    normal: 0.08,
    relaxed: 0.12,
  },
} as const;

// ═══════════════════════════════════════════════════════════
// UTILITIES
// ═══════════════════════════════════════════════════════════

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Creates a parallax effect on a single element, scoped to its own ScrollTrigger.
 * Returns the ScrollTrigger instance for cleanup within a gsap.context().
 */
function applyParallax(
  el: Element,
  speed: number,
  scrub: number = 1
): ScrollTrigger {
  const yDistance = speed * 100;
  const tween = gsap.fromTo(
    el,
    { y: -yDistance },
    { y: yDistance, ease: "none" }
  );
  return ScrollTrigger.create({
    trigger: el.closest("section") || el.parentElement || el,
    start: "top bottom",
    end: "bottom top",
    scrub,
    animation: tween,
  });
}

// ═══════════════════════════════════════════════════════════
// S1: HERO — Cinematic Intro + Scrubbed Scroll Timeline
// ═══════════════════════════════════════════════════════════

export interface HeroRefs {
  section: HTMLElement;
  headingLines: HTMLElement[];   // inner spans of each line (BRIGHT, SPACE)
  slogan: HTMLElement;
  ctaRow: HTMLElement;
  clientLogos: HTMLElement;
  videoBg?: HTMLElement;
  ambientGlow?: HTMLElement;
  globeContainer: HTMLElement;
  renderFrame?: (index: number) => void;
  scrollHint?: HTMLElement;
  contentWrapper?: HTMLElement;
  frameCount?: number;
}

export function initHeroAnimation(refs: HeroRefs): gsap.Context | null {
  const frameCount = refs.frameCount || 240;

  if (prefersReducedMotion()) {
    // If user prefers reduced motion: show final frame and reveal hero content immediately
    if (refs.renderFrame) {
      refs.renderFrame(frameCount - 1);
    }
    gsap.set(refs.headingLines, { y: "0%", rotate: 0, opacity: 1 });
    gsap.set([refs.slogan, refs.ctaRow, refs.clientLogos], { y: 0, opacity: 1 });
    gsap.set(refs.globeContainer, { scale: 1, opacity: 1 });
    if (refs.contentWrapper) {
      refs.contentWrapper.style.pointerEvents = "auto";
    }
    if (refs.scrollHint) {
      gsap.set(refs.scrollHint, { opacity: 0, display: "none" });
    }
    return null;
  }

  const ctx = gsap.context(() => {
    // Initial state: hide hero text, globe, and CTA; prepare animation stage
    gsap.set(refs.headingLines, { y: "115%", rotate: 2 });
    gsap.set([refs.slogan, refs.ctaRow, refs.clientLogos], { y: 24, opacity: 0 });
    gsap.set(refs.globeContainer, { scale: 0.85, opacity: 0 });
    if (refs.contentWrapper) {
      refs.contentWrapper.style.pointerEvents = "none";
    }
    if (refs.scrollHint) {
      gsap.set(refs.scrollHint, { opacity: 1, y: 0 });
    }

    if (refs.renderFrame) {
      refs.renderFrame(0);
    }

    const mm = gsap.matchMedia();

    // Desktop & Tablet
    mm.add("(min-width: 768px)", () => {
      const frameTracker = { frame: 0 };
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: refs.section,
          start: "top top",
          end: "+=2600",
          pin: true,
          pinSpacing: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (refs.contentWrapper) {
              refs.contentWrapper.style.pointerEvents = self.progress >= 0.8 ? "auto" : "none";
            }
          },
        },
      });

      // 1. Initial scroll prompt fades away quickly (0 -> 0.08)
      if (refs.scrollHint) {
        scrollTl.to(
          refs.scrollHint,
          { opacity: 0, y: -16, duration: 0.08, ease: "power1.out" },
          0
        );
      }

      // 2. Scrub frames 0 -> 239 over 0 to 0.72 of the timeline
      if (refs.renderFrame) {
        scrollTl.to(
          frameTracker,
          {
            frame: frameCount - 1,
            ease: "none",
            duration: 0.72,
            onUpdate: () => {
              refs.renderFrame!(Math.round(frameTracker.frame));
            },
          },
          0
        );
      }

      // 3. Smooth continuous transition into Hero content reveal (0.68 -> 1.0)
      // Rotating globe begins expanding and materializing as frames settle
      scrollTl.to(
        refs.globeContainer,
        { scale: 1, opacity: 1, duration: 0.28, ease: "power2.out" },
        0.68
      );

      // Masked typography slides up
      scrollTl.to(
        refs.headingLines,
        {
          y: "0%",
          rotate: 0,
          duration: 0.24,
          stagger: 0.05,
          ease: "power3.out",
        },
        0.72
      );

      // Slogan
      scrollTl.to(
        refs.slogan,
        { y: 0, opacity: 1, duration: 0.2, ease: "power2.out" },
        0.78
      );

      // CTA row
      scrollTl.to(
        refs.ctaRow,
        { y: 0, opacity: 1, duration: 0.2, ease: "power2.out" },
        0.82
      );

      // Client logos
      scrollTl.to(
        refs.clientLogos,
        { y: 0, opacity: 1, duration: 0.2, ease: "power2.out" },
        0.86
      );
    });

    // Mobile (< 768px): shorter scroll distance for comfortable swipe, same cinematic flow
    mm.add("(max-width: 767px)", () => {
      const frameTracker = { frame: 0 };
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: refs.section,
          start: "top top",
          end: "+=1700",
          pin: true,
          pinSpacing: true,
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (refs.contentWrapper) {
              refs.contentWrapper.style.pointerEvents = self.progress >= 0.8 ? "auto" : "none";
            }
          },
        },
      });

      if (refs.scrollHint) {
        scrollTl.to(
          refs.scrollHint,
          { opacity: 0, y: -12, duration: 0.08, ease: "power1.out" },
          0
        );
      }

      if (refs.renderFrame) {
        scrollTl.to(
          frameTracker,
          {
            frame: frameCount - 1,
            ease: "none",
            duration: 0.72,
            onUpdate: () => {
              refs.renderFrame!(Math.round(frameTracker.frame));
            },
          },
          0
        );
      }

      scrollTl.to(
        refs.globeContainer,
        { scale: 1, opacity: 1, duration: 0.28, ease: "power2.out" },
        0.68
      );

      scrollTl.to(
        refs.headingLines,
        { y: "0%", rotate: 0, duration: 0.24, stagger: 0.05, ease: "power3.out" },
        0.72
      );

      scrollTl.to(
        refs.slogan,
        { y: 0, opacity: 1, duration: 0.2, ease: "power2.out" },
        0.78
      );

      scrollTl.to(
        refs.ctaRow,
        { y: 0, opacity: 1, duration: 0.2, ease: "power2.out" },
        0.82
      );

      scrollTl.to(
        refs.clientLogos,
        { y: 0, opacity: 1, duration: 0.2, ease: "power2.out" },
        0.86
      );
    });
  }, refs.section);

  return ctx;
}

// ═══════════════════════════════════════════════════════════
// S3: PROBLEM → SOLUTION — Staggered Content + Layered Parallax
// ═══════════════════════════════════════════════════════════

export interface ProblemSolutionRefs {
  section: HTMLElement;
  heading: HTMLElement;
  leftCard: HTMLElement;
  rightCard: HTMLElement;
  listItems: HTMLElement[];
  glowElements: HTMLElement[];  // decorative glow divs
  floatingElements: HTMLElement[]; // floating badges (Edit, TrendingUp)
}

export function initProblemSolutionAnimation(
  refs: ProblemSolutionRefs
): gsap.Context | null {
  if (prefersReducedMotion()) return null;

  const ctx = gsap.context(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      // Heading — clip-path reveal (word-style wipe)
      gsap.fromTo(
        refs.heading,
        { clipPath: "inset(100% 0 0 0)", y: 30 },
        {
          clipPath: "inset(0% 0 0 0)",
          y: 0,
          duration: MOTION.duration.slow,
          ease: MOTION.ease.cinematic,
          scrollTrigger: {
            trigger: refs.heading,
            start: "top 85%",
            end: "top 55%",
            scrub: 1,
          },
        }
      );

      // Left card — enters from left
      gsap.fromTo(
        refs.leftCard,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: MOTION.duration.normal,
          ease: MOTION.ease.cinematic,
          scrollTrigger: {
            trigger: refs.leftCard,
            start: "top 80%",
            end: "top 55%",
            scrub: 1,
          },
        }
      );

      // Right card — enters from right, slightly delayed
      gsap.fromTo(
        refs.rightCard,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: MOTION.duration.normal,
          ease: MOTION.ease.cinematic,
          scrollTrigger: {
            trigger: refs.rightCard,
            start: "top 78%",
            end: "top 53%",
            scrub: 1,
          },
        }
      );

      // List items — staggered reveal within each card
      if (refs.listItems.length > 0) {
        gsap.fromTo(
          refs.listItems,
          { y: 15, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: MOTION.duration.fast,
            stagger: MOTION.stagger.normal,
            ease: MOTION.ease.smooth,
            scrollTrigger: {
              trigger: refs.leftCard,
              start: "top 65%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Layered glow parallax — background depth
      refs.glowElements.forEach((el, i) => {
        const speed = 0.15 + i * 0.1; // slightly different speeds
        applyParallax(el, speed);
      });

      // Floating decorative elements — foreground, slightly faster
      refs.floatingElements.forEach((el) => {
        applyParallax(el, 0.4);
      });
    });

    // Tablet: simplified
    mm.add("(min-width: 768px) and (max-width: 1023px)", () => {
      gsap.fromTo(
        refs.heading,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: MOTION.duration.normal,
          scrollTrigger: {
            trigger: refs.heading,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      [refs.leftCard, refs.rightCard].forEach((card) => {
        gsap.fromTo(
          card,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: MOTION.duration.normal,
            ease: MOTION.ease.smooth,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    });

    // Mobile: simple fade
    mm.add("(max-width: 767px)", () => {
      [refs.leftCard, refs.rightCard].forEach((card) => {
        gsap.fromTo(
          card,
          { y: 25, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: MOTION.duration.normal,
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    });
  }, refs.section);

  return ctx;
}

// ═══════════════════════════════════════════════════════════
// S4: CORE SERVICES — Scrubbed Card Reveal
// ═══════════════════════════════════════════════════════════

export interface ServicesRefs {
  section: HTMLElement;
  heading: HTMLElement;
  cards: HTMLElement[];
}

export function initServicesAnimation(
  refs: ServicesRefs
): gsap.Context | null {
  if (prefersReducedMotion()) return null;

  const ctx = gsap.context(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      // Heading — horizontal clip reveal
      gsap.fromTo(
        refs.heading,
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1,
          ease: MOTION.ease.cinematic,
          scrollTrigger: {
            trigger: refs.heading,
            start: "top 80%",
            end: "top 50%",
            scrub: 1,
          },
        }
      );

      // Cards — scrubbed stagger with scale + translate
      const cardTl = gsap.timeline();
      refs.cards.forEach((card, i) => {
        cardTl.fromTo(
          card,
          { y: MOTION.distance.large, scale: MOTION.scale.medium, opacity: 0 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: MOTION.ease.cinematic,
          },
          i * 0.12
        );
      });

      ScrollTrigger.create({
        trigger: refs.section,
        start: "top 60%",
        end: "center center",
        scrub: 1,
        animation: cardTl,
      });
    });

    mm.add("(max-width: 1023px)", () => {
      refs.cards.forEach((card) => {
        gsap.fromTo(
          card,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: MOTION.duration.normal,
            ease: MOTION.ease.smooth,
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    });
  }, refs.section);

  return ctx;
}

// ═══════════════════════════════════════════════════════════
// S6: FEATURED WORK — 🔥 PINNED HORIZONTAL SCROLL SHOWCASE
// ═══════════════════════════════════════════════════════════

export interface ProjectShowcaseRefs {
  section: HTMLElement;
  header: HTMLElement;
  pinContainer: HTMLElement;
  track: HTMLElement;
  panels: HTMLElement[];
}

export function initProjectShowcase(
  refs: ProjectShowcaseRefs
): gsap.Context | null {
  if (prefersReducedMotion()) return null;

  const ctx = gsap.context(() => {
    const mm = gsap.matchMedia();

    // ── DESKTOP: Full cinematic horizontal scroll ──────────
    mm.add("(min-width: 1024px)", () => {
      // Header reveal — line-style clip
      gsap.fromTo(
        refs.header,
        { clipPath: "inset(100% 0 0 0)", y: 25 },
        {
          clipPath: "inset(0% 0 0 0)",
          y: 0,
          duration: MOTION.duration.slow,
          ease: MOTION.ease.cinematic,
          scrollTrigger: {
            trigger: refs.header,
            start: "top 85%",
            end: "top 60%",
            scrub: 1,
          },
        }
      );

      // Calculate total horizontal scroll distance dynamically
      const getScrollDistance = () => {
        return refs.track.scrollWidth - window.innerWidth;
      };

      // Master timeline
      const numPanels = refs.panels.length;
      const masterTl = gsap.timeline();

      // Continuous horizontal movement (the spine of the experience)
      masterTl.to(
        refs.track,
        {
          x: () => -getScrollDistance(),
          ease: "none",
          duration: numPanels,
        },
        0
      );

      // Per-panel cinematic transitions layered on top
      refs.panels.forEach((panel, i) => {
        const img = panel.querySelector<HTMLElement>(".showcase-img");
        const imgInner = panel.querySelector<HTMLElement>(".showcase-img-inner");
        const title = panel.querySelector<HTMLElement>(".showcase-title");
        const meta = panel.querySelector<HTMLElement>(".showcase-meta");
        const number = panel.querySelector<HTMLElement>(".showcase-number");
        const category = panel.querySelector<HTMLElement>(".showcase-category");

        // Each panel occupies ~1 unit in the timeline
        const enter = i * 1;

        // Image container clip-path reveal
        if (img) {
          masterTl.fromTo(
            img,
            { clipPath: "inset(12% 12% 12% 12%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 0.45,
              ease: MOTION.ease.cinematic,
            },
            enter + 0.05
          );
        }

        // Internal image parallax — image content moves
        // at a different rate than its container for depth
        if (imgInner) {
          masterTl.fromTo(
            imgInner,
            { scale: 1.15, x: "5%" },
            {
              scale: 1.05,
              x: "-5%",
              duration: 0.9,
              ease: "none",
            },
            enter
          );
        }

        // Title slides up
        if (title) {
          masterTl.fromTo(
            title,
            { y: 35, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.3,
              ease: MOTION.ease.cinematic,
            },
            enter + 0.15
          );
        }

        // Category
        if (category) {
          masterTl.fromTo(
            category,
            { y: 12, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.25,
              ease: MOTION.ease.smooth,
            },
            enter + 0.1
          );
        }

        // Metadata (tagline + results)
        if (meta) {
          masterTl.fromTo(
            meta,
            { y: 18, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.25,
              ease: MOTION.ease.smooth,
            },
            enter + 0.22
          );
        }

        // Large background number
        if (number) {
          masterTl.fromTo(
            number,
            { scale: 1.15, opacity: 0 },
            {
              scale: 1,
              opacity: 0.06,
              duration: 0.4,
              ease: MOTION.ease.smooth,
            },
            enter + 0.02
          );
        }

        // Exit animations (not for last panel)
        if (i < numPanels - 1) {
          if (img) {
            masterTl.to(
              img,
              {
                scale: 0.95,
                opacity: 0.6,
                duration: 0.25,
                ease: MOTION.ease.smooth,
              },
              enter + 0.72
            );
          }
          if (title) {
            masterTl.to(
              title,
              { y: -15, opacity: 0, duration: 0.2 },
              enter + 0.74
            );
          }
          if (meta) {
            masterTl.to(meta, { opacity: 0, duration: 0.18 }, enter + 0.76);
          }
          if (number) {
            masterTl.to(number, { opacity: 0, duration: 0.2 }, enter + 0.72);
          }
          if (category) {
            masterTl.to(
              category,
              { opacity: 0, duration: 0.18 },
              enter + 0.73
            );
          }
        }
      });

      ScrollTrigger.create({
        trigger: refs.section,
        start: "top top",
        end: () => `+=${getScrollDistance() + window.innerHeight * 0.5}`,
        pin: refs.pinContainer,
        scrub: 1,
        anticipatePin: 1,
        animation: masterTl,
        invalidateOnRefresh: true,
      });
    });

    // ── TABLET: Simplified horizontal (no pin) ─────────────
    mm.add("(min-width: 768px) and (max-width: 1023px)", () => {
      refs.panels.forEach((panel) => {
        gsap.fromTo(
          panel,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: MOTION.duration.normal,
            ease: MOTION.ease.smooth,
            scrollTrigger: {
              trigger: panel,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    });

    // ── MOBILE: Simple stacked reveals ─────────────────────
    mm.add("(max-width: 767px)", () => {
      refs.panels.forEach((panel) => {
        gsap.fromTo(
          panel,
          { y: 25, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: MOTION.duration.normal,
            scrollTrigger: {
              trigger: panel,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    });
  }, refs.section);

  return ctx;
}

// ═══════════════════════════════════════════════════════════
// S7: CASE STUDIES — Counter + Stagger Reveal
// ═══════════════════════════════════════════════════════════

export interface CaseStudyRefs {
  section: HTMLElement;
  heading: HTMLElement;
  cards: HTMLElement[];
  counters: HTMLElement[]; // elements containing the metric values
}

export function initCaseStudiesAnimation(
  refs: CaseStudyRefs
): gsap.Context | null {
  if (prefersReducedMotion()) return null;

  const ctx = gsap.context(() => {
    // Heading reveal
    gsap.fromTo(
      refs.heading,
      { y: 25, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: MOTION.duration.normal,
        ease: MOTION.ease.cinematic,
        scrollTrigger: {
          trigger: refs.heading,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    // Cards — stagger reveal
    const cardTl = gsap.timeline({
      scrollTrigger: {
        trigger: refs.section,
        start: "top 65%",
        toggleActions: "play none none none",
      },
    });

    refs.cards.forEach((card, i) => {
      cardTl.fromTo(
        card,
        { y: MOTION.distance.medium, opacity: 0, scale: MOTION.scale.subtle },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: MOTION.duration.normal,
          ease: MOTION.ease.cinematic,
        },
        i * MOTION.stagger.relaxed
      );
    });
  }, refs.section);

  return ctx;
}

// ═══════════════════════════════════════════════════════════
// S9: WHY CHOOSE US — Progressive Pillar Reveal
// ═══════════════════════════════════════════════════════════

export interface WhyUsRefs {
  section: HTMLElement;
  heading: HTMLElement;
  pillars: HTMLElement[];
}

export function initWhyUsAnimation(refs: WhyUsRefs): gsap.Context | null {
  if (prefersReducedMotion()) return null;

  const ctx = gsap.context(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      // Heading
      gsap.fromTo(
        refs.heading,
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: MOTION.duration.normal,
          ease: MOTION.ease.cinematic,
          scrollTrigger: {
            trigger: refs.heading,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Pillars — scrubbed sequential reveal
      const pillarTl = gsap.timeline();
      refs.pillars.forEach((pillar, i) => {
        // Number emphasis
        const number = pillar.querySelector(".pillar-number");
        if (number) {
          pillarTl.fromTo(
            number,
            { scale: 1.3, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.3,
              ease: MOTION.ease.elastic,
            },
            i * 0.2
          );
        }

        pillarTl.fromTo(
          pillar,
          { y: MOTION.distance.medium, scale: MOTION.scale.medium, opacity: 0 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: MOTION.ease.cinematic,
          },
          i * 0.2
        );
      });

      ScrollTrigger.create({
        trigger: refs.section,
        start: "top 65%",
        end: "center center",
        scrub: 1,
        animation: pillarTl,
      });
    });

    mm.add("(max-width: 1023px)", () => {
      refs.pillars.forEach((pillar) => {
        gsap.fromTo(
          pillar,
          { y: 25, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: MOTION.duration.normal,
            scrollTrigger: {
              trigger: pillar,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    });
  }, refs.section);

  return ctx;
}

// ═══════════════════════════════════════════════════════════
// S10: MEET THE TEAM — Staggered Card + Image Parallax
// ═══════════════════════════════════════════════════════════

export interface TeamRefs {
  section: HTMLElement;
  heading: HTMLElement;
  cards: HTMLElement[];
}

export function initTeamAnimation(refs: TeamRefs): gsap.Context | null {
  if (prefersReducedMotion()) return null;

  const ctx = gsap.context(() => {
    // Heading
    gsap.fromTo(
      refs.heading,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: MOTION.duration.normal,
        ease: MOTION.ease.cinematic,
        scrollTrigger: {
          trigger: refs.heading,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    // Cards stagger
    const cardTl = gsap.timeline({
      scrollTrigger: {
        trigger: refs.section,
        start: "top 65%",
        toggleActions: "play none none none",
      },
    });

    refs.cards.forEach((card, i) => {
      cardTl.fromTo(
        card,
        { y: MOTION.distance.medium, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: MOTION.duration.normal,
          ease: MOTION.ease.cinematic,
        },
        i * MOTION.stagger.normal
      );

      // Internal image parallax within each card
      const img = card.querySelector<HTMLElement>("img");
      if (img) {
        gsap.fromTo(
          img,
          { y: "-8%" },
          {
            y: "8%",
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      }
    });
  }, refs.section);

  return ctx;
}

// ═══════════════════════════════════════════════════════════
// S11: TESTIMONIALS — Section Entry + Glow Parallax
// ═══════════════════════════════════════════════════════════

export interface TestimonialRefs {
  section: HTMLElement;
  heading: HTMLElement;
  glows: HTMLElement[];
}

export function initTestimonialsAnimation(
  refs: TestimonialRefs
): gsap.Context | null {
  if (prefersReducedMotion()) return null;

  const ctx = gsap.context(() => {
    // Heading reveal
    gsap.fromTo(
      refs.heading,
      { y: 25, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: MOTION.duration.normal,
        ease: MOTION.ease.cinematic,
        scrollTrigger: {
          trigger: refs.heading,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    // Glow parallax
    refs.glows.forEach((glow, i) => {
      applyParallax(glow, 0.15 + i * 0.1);
    });
  }, refs.section);

  return ctx;
}

// ═══════════════════════════════════════════════════════════
// S12: STATS — Counter Stagger
// ═══════════════════════════════════════════════════════════

export interface StatsRefs {
  section: HTMLElement;
  cards: HTMLElement[];
}

export function initStatsAnimation(refs: StatsRefs): gsap.Context | null {
  if (prefersReducedMotion()) return null;

  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: refs.section,
        start: "top 70%",
        toggleActions: "play none none none",
      },
    });

    refs.cards.forEach((card, i) => {
      tl.fromTo(
        card,
        { y: MOTION.distance.medium, opacity: 0, scale: MOTION.scale.subtle },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: MOTION.duration.normal,
          ease: MOTION.ease.cinematic,
        },
        i * MOTION.stagger.relaxed
      );
    });
  }, refs.section);

  return ctx;
}

// ═══════════════════════════════════════════════════════════
// S15: FINAL CTA — Cinematic Closing Transition
// ═══════════════════════════════════════════════════════════

export interface FinalCTARefs {
  section: HTMLElement;
  heading: HTMLElement;
  italicSpan: HTMLElement;
  subtitle: HTMLElement;
  description: HTMLElement;
  ctaButton: HTMLElement;
  glowOrb: HTMLElement;
}

export function initFinalCTAAnimation(
  refs: FinalCTARefs
): gsap.Context | null {
  if (prefersReducedMotion()) return null;

  const ctx = gsap.context(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: refs.section,
          start: "top 70%",
          end: "center center",
          scrub: 1,
        },
      });

      // Subtitle mono text
      tl.fromTo(
        refs.subtitle,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3 },
        0
      );

      // Heading — masked reveal with clip-path
      tl.fromTo(
        refs.heading,
        { clipPath: "inset(100% 0 0 0)", y: 30 },
        {
          clipPath: "inset(0% 0 0 0)",
          y: 0,
          duration: 0.6,
          ease: MOTION.ease.cinematic,
        },
        0.1
      );

      // Italic emphasis — scale pulse
      tl.fromTo(
        refs.italicSpan,
        { scale: 1.06 },
        { scale: 1, duration: 0.4, ease: MOTION.ease.smooth },
        0.35
      );

      // Description
      tl.fromTo(
        refs.description,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35 },
        0.4
      );

      // CTA button — scale up
      tl.fromTo(
        refs.ctaButton,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.35,
          ease: MOTION.ease.elastic,
        },
        0.5
      );

      // Glow orb — slow parallax behind
      gsap.fromTo(
        refs.glowOrb,
        { y: 40 },
        {
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: refs.section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );
    });

    mm.add("(max-width: 767px)", () => {
      gsap.fromTo(
        refs.heading,
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: MOTION.duration.normal,
          scrollTrigger: {
            trigger: refs.heading,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        refs.ctaButton,
        { y: 15, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: MOTION.duration.normal,
          scrollTrigger: {
            trigger: refs.ctaButton,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, refs.section);

  return ctx;
}
