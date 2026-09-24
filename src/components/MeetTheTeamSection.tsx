"use client";

import React, { useEffect, useRef } from "react";
import { teamData } from "@/data/team";
import { Linkedin, Github, Twitter } from "lucide-react";

export default function MeetTheTeamSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const spotlight = {
      originX: 0,
      originY: -40,
      targetX: 0,
      targetY: 0,
      currentX: 0,
      currentY: 0,
      spreadAngle: 0.38,
      intensity: 0.22,
    };

    const updateStageScale = () => {
      if (!sectionRef.current || !stageWrapperRef.current) return;
      const sectionWidth = sectionRef.current.clientWidth;
      const scale = Math.min(sectionWidth / 1920, 1);
      stageWrapperRef.current.style.transform = `scale(${scale})`;
    };

    const handleResize = () => {
      if (!sectionRef.current || !canvas) return;
      width = sectionRef.current.clientWidth;
      height = sectionRef.current.clientHeight;
      dpr = window.devicePixelRatio || 1;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      spotlight.originX = width / 2;
      spotlight.originY = -40;

      if (spotlight.currentX === 0) {
        spotlight.targetX = width / 2;
        spotlight.targetY = height * 0.55;
        spotlight.currentX = width / 2;
        spotlight.currentY = height * 0.55;
      }

      updateStageScale();
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (y >= -300 && y <= rect.height + 300) {
        spotlight.targetX = x;
        spotlight.targetY = y;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    const cards = Array.from(
      sectionRef.current?.querySelectorAll<HTMLElement>(".service-card") || []
    );

    const cardMouseMoveHandlers: Array<{ el: HTMLElement; handler: (e: MouseEvent) => void }> = [];
    cards.forEach((card) => {
      const handler = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const localX = e.clientX - rect.left;
        const localY = e.clientY - rect.top;
        card.style.setProperty("--mouse-x", `${localX}px`);
        card.style.setProperty("--mouse-y", `${localY}px`);
      };
      card.addEventListener("mousemove", handler);
      cardMouseMoveHandlers.push({ el: card, handler });
    });

    const render = () => {
      spotlight.currentX += (spotlight.targetX - spotlight.currentX) * 0.07;
      spotlight.currentY += (spotlight.targetY - spotlight.currentY) * 0.07;

      ctx.clearRect(0, 0, width, height);

      const originX = spotlight.originX;
      const originY = spotlight.originY;
      const targetX = spotlight.currentX;
      const targetY = spotlight.currentY;

      const angle = Math.atan2(targetY - originY, targetX - originX);
      const beamLength = Math.max(height * 1.6, Math.hypot(targetX - originX, targetY - originY) * 1.55);

      const leftAngle = angle - spotlight.spreadAngle;
      const rightAngle = angle + spotlight.spreadAngle;

      const leftX = originX + Math.cos(leftAngle) * beamLength;
      const leftY = originY + Math.sin(leftAngle) * beamLength;
      const rightX = originX + Math.cos(rightAngle) * beamLength;
      const rightY = originY + Math.sin(rightAngle) * beamLength;

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(originX, originY);
      ctx.lineTo(leftX, leftY);
      ctx.lineTo(rightX, rightY);
      ctx.closePath();

      const beamGrad = ctx.createRadialGradient(
        originX, originY, 25,
        targetX, targetY, beamLength * 0.85
      );
      beamGrad.addColorStop(0, "rgba(176, 141, 87, 0.22)");
      beamGrad.addColorStop(0.2, "rgba(212, 189, 145, 0.12)");
      beamGrad.addColorStop(0.5, "rgba(243, 239, 230, 0.06)");
      beamGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = beamGrad;
      ctx.fill();
      ctx.restore();

      ctx.save();
      const spotGrad = ctx.createRadialGradient(
        targetX, targetY, 0,
        targetX, targetY, 300
      );
      spotGrad.addColorStop(0, "rgba(176, 141, 87, 0.18)");
      spotGrad.addColorStop(0.4, "rgba(212, 189, 145, 0.08)");
      spotGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = spotGrad;
      ctx.beginPath();
      ctx.arc(targetX, targetY, 300, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      if (sectionRef.current) {
        const secRect = sectionRef.current.getBoundingClientRect();
        cards.forEach((card) => {
          const rect = card.getBoundingClientRect();
          const cardCenterX = rect.left + rect.width / 2 - secRect.left;
          const cardCenterY = rect.top + rect.height / 2 - secRect.top;

          const cardAngle = Math.atan2(cardCenterY - originY, cardCenterX - originX);
          const angleDiff = Math.abs(cardAngle - angle);
          const distToBeamCenter = Math.hypot(cardCenterX - targetX, cardCenterY - targetY);

          if (angleDiff < spotlight.spreadAngle * 1.05 || distToBeamCenter < 300) {
            card.classList.add("illuminated");
            const localX = targetX - (rect.left - secRect.left);
            const localY = targetY - (rect.top - secRect.top);
            card.style.setProperty("--mouse-x", `${localX}px`);
            card.style.setProperty("--mouse-y", `${localY}px`);
          } else {
            card.classList.remove("illuminated");
          }
        });
      }

      animFrameId = requestAnimationFrame(render);
    };

    animFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cardMouseMoveHandlers.forEach(({ el, handler }) =>
        el.removeEventListener("mousemove", handler)
      );
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  const cardPositions = [
    { class: "card-1", rot: "-10", index: "[ 01 ]" },
    { class: "card-2", rot: "-5", index: "[ 02 ]" },
    { class: "card-3", rot: "-1", index: "[ 03 ]" },
    { class: "card-4", rot: "5", index: "[ 04 ]" },
    { class: "card-5", rot: "10", index: "[ 05 ]" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[950px] bg-[#F3EFE6] text-[#111111] overflow-hidden flex justify-center items-center select-none border-t border-[#DCD4C5]"
    >
      <style jsx>{`
        .noise-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }

        .ambient-vignette {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          background: radial-gradient(circle at 50% 50%, transparent 40%, rgba(220, 212, 197, 0.45) 100%);
        }

        .top-glow-halo {
          position: absolute;
          top: -180px;
          left: 50%;
          transform: translateX(-50%);
          width: 850px;
          height: 420px;
          background: radial-gradient(ellipse at center, rgba(176, 141, 87, 0.22) 0%, rgba(212, 189, 145, 0.1) 45%, transparent 75%);
          pointer-events: none;
          z-index: 2;
          filter: blur(60px);
        }

        #spotlight-canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 3;
          pointer-events: none;
        }

        .bg-typography {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          z-index: 2;
          pointer-events: none;
          text-align: center;
          line-height: 0.94;
          margin-top: -20px;
        }

        .bg-typography-line {
          font-size: clamp(3.5rem, 8.5vw, 9.2rem);
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: -0.025em;
          color: rgba(176, 141, 87, 0.04);
          -webkit-text-stroke: 1.5px rgba(176, 141, 87, 0.25);
          white-space: nowrap;
        }

        .side-content {
          position: absolute;
          z-index: 10;
          width: 310px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          pointer-events: auto;
        }

        .side-content.top-right {
          top: 48px;
          right: 52px;
        }

        .side-content.bottom-right {
          bottom: 48px;
          right: 52px;
        }

        .cross-decor {
          display: flex;
          gap: 10px;
          font-size: 13px;
          color: #B08D57;
          letter-spacing: 0.28em;
          font-family: monospace;
          opacity: 0.85;
        }

        .side-paragraph {
          font-size: 13.5px;
          line-height: 1.55;
          color: #555555;
          font-weight: 400;
        }

        .lime-text {
          color: #B08D57;
          font-weight: 600;
        }

        .side-tag {
          align-self: flex-end;
          font-family: monospace;
          font-size: 12px;
          color: #777777;
          letter-spacing: 0.04em;
        }

        .stage-wrapper {
          position: relative;
          z-index: 5;
          width: 1920px;
          height: 945px;
          display: flex;
          justify-content: center;
          align-items: center;
          transform-origin: center center;
          pointer-events: none;
        }

        .cards-deck {
          position: absolute;
          inset: 0;
          pointer-events: auto;
        }

        .service-card {
          position: absolute;
          width: 330px;
          height: 380px;
          background: #FFFFFF;
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid #DCD4C5;
          border-radius: 16px;
          padding: 30px 24px 22px 24px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: 0 20px 45px rgba(17, 17, 17, 0.06), 0 1px 2px rgba(255, 255, 255, 0.9) inset;
          cursor: pointer;
          transform-origin: center 20px;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), 
                      border-color 0.35s ease, 
                      box-shadow 0.4s ease;
          will-change: transform;
          overflow: visible;
        }

        .pushpin-anchor {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          width: 26px;
          height: 26px;
          z-index: 25;
          pointer-events: none;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .pushpin-sphere {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 30%, #ffffff 0%, #D4BD91 35%, #B08D57 70%, #8C6D3B 100%);
          box-shadow: 0 4px 12px rgba(176, 141, 87, 0.4), 
                      0 0 16px rgba(176, 141, 87, 0.3),
                      0 1px 2px rgba(255, 255, 255, 0.9) inset;
          position: relative;
        }

        .pushpin-specular {
          position: absolute;
          top: 3px;
          left: 5px;
          width: 6px;
          height: 4px;
          background: rgba(255, 255, 255, 0.95);
          border-radius: 50%;
          transform: rotate(-35deg);
        }

        .pushpin-needle-shadow {
          position: absolute;
          top: 18px;
          left: 6px;
          width: 14px;
          height: 12px;
          background: radial-gradient(ellipse at center, rgba(176, 141, 87, 0.4) 0%, rgba(0, 0, 0, 0) 75%);
          border-radius: 50%;
          filter: blur(1.5px);
          z-index: -1;
        }

        .pushpin-hole {
          position: absolute;
          top: 19px;
          width: 4px;
          height: 4px;
          background: #B08D57;
          border-radius: 50%;
          box-shadow: 0 1px 1px rgba(255, 255, 255, 0.5);
        }

        .card-specular {
          position: absolute;
          inset: 0;
          border-radius: 16px;
          pointer-events: none;
          opacity: 0;
          background: radial-gradient(circle 280px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(176, 141, 87, 0.12) 0%, rgba(212, 189, 145, 0.04) 60%, transparent 80%);
          transition: opacity 0.3s ease;
        }

        .service-card.illuminated .card-specular {
          opacity: 1;
        }

        .service-card.illuminated {
          border-color: #B08D57;
          box-shadow: 0 25px 50px rgba(176, 141, 87, 0.2), 0 0 30px rgba(176, 141, 87, 0.1);
        }

        .card-1 {
          left: 145px;
          top: 202px;
          transform: rotate(-10deg);
          z-index: 1;
        }

        .card-2 {
          left: 428px;
          top: 426px;
          transform: rotate(-5deg);
          z-index: 2;
        }

        .card-3 {
          left: 800px;
          top: 454px;
          transform: rotate(-1deg);
          z-index: 3;
        }

        .card-4 {
          left: 1122px;
          top: 388px;
          transform: rotate(5deg);
          z-index: 2;
        }

        .card-5 {
          left: 1472px;
          top: 248px;
          transform: rotate(10deg);
          z-index: 1;
        }

        .service-card:hover {
          transform: translateY(-30px) rotate(0deg) scale(1.05) !important;
          z-index: 50 !important;
          border-color: #B08D57;
          box-shadow: 0 35px 70px rgba(176, 141, 87, 0.25), 
                      0 0 40px rgba(212, 189, 145, 0.2);
        }

        @media (max-width: 1400px) {
          .side-content {
            opacity: 0.7;
          }
        }

        @media (max-width: 1100px) {
          .side-content {
            display: none;
          }
        }
      `}</style>

      <div className="noise-overlay" />
      <div className="ambient-vignette" />
      <div className="top-glow-halo" />

      <canvas id="spotlight-canvas" ref={canvasRef} />

      <div className="bg-typography">
        <div className="bg-typography-line">MEET OUR TEAM</div>
        <div className="bg-typography-line">EXPERT STRATEGISTS</div>
        <div className="bg-typography-line">& CREATIVE LEADERS</div>
      </div>

      <div className="side-content top-right">
        <div className="cross-decor">× &nbsp; × &nbsp; ×</div>
        <p className="side-paragraph">
          We combine creative vision with advanced engineering to{" "}
          <span className="lime-text">build extraordinary digital products</span> that drive high-growth results.
        </p>
        <span className="side-tag">[ The Squad ]</span>
      </div>

      <div className="side-content bottom-right">
        <div className="cross-decor">× &nbsp; × &nbsp; ×</div>
        <p className="side-paragraph">
          No pass-offs to juniors. You work directly with veteran product architects to{" "}
          <span className="lime-text">maximize impact</span> and scale effortlessly.
        </p>
        <span className="side-tag">[ 05 Leaders ]</span>
      </div>

      <div className="stage-wrapper" ref={stageWrapperRef}>
        <div className="cards-deck">
          {teamData.map((member, idx) => {
            const pos = cardPositions[idx] || cardPositions[0];
            return (
              <article
                key={member.id}
                className={`service-card ${pos.class}`}
                data-index={idx + 1}
                data-base-rot={pos.rot}
              >
                <div className="pushpin-anchor">
                  <div className="pushpin-sphere">
                    <div className="pushpin-specular" />
                  </div>
                  <div className="pushpin-hole" />
                  <div className="pushpin-needle-shadow" />
                </div>

                <div className="card-specular" />

                <div>
                  <div className="flex items-center gap-3.5 mb-4">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden border border-[#DCD4C5] shadow-md flex-shrink-0 bg-[#FAF7F2]">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-[#111111] leading-tight">
                        {member.name}
                      </h4>
                      <p className="text-xs font-mono text-[#B08D57] font-semibold mt-0.5">
                        {member.role}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed text-[#555555] font-normal">
                    {member.bio}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#DCD4C5] mt-2">
                  <span className="font-mono text-xs text-[#777777] tracking-wider font-semibold">
                    {pos.index}
                  </span>

                  <div className="flex items-center gap-2">
                    {member.socials.linkedin && (
                      <a
                        href={member.socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-7 h-7 rounded-full bg-[#FAF7F2] border border-[#DCD4C5] hover:bg-[#B08D57] hover:text-white hover:border-[#B08D57] transition-colors flex items-center justify-center text-[#555555] text-xs"
                      >
                        <Linkedin className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {member.socials.github && (
                      <a
                        href={member.socials.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-7 h-7 rounded-full bg-[#FAF7F2] border border-[#DCD4C5] hover:bg-[#B08D57] hover:text-white hover:border-[#B08D57] transition-colors flex items-center justify-center text-[#555555] text-xs"
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {member.socials.twitter && (
                      <a
                        href={member.socials.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-7 h-7 rounded-full bg-[#FAF7F2] border border-[#DCD4C5] hover:bg-[#B08D57] hover:text-white hover:border-[#B08D57] transition-colors flex items-center justify-center text-[#555555] text-xs"
                      >
                        <Twitter className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
