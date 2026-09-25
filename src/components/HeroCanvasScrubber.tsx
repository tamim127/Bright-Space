"use client";

import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useCallback,
} from "react";

export interface HeroCanvasScrubberHandle {
  renderFrame: (index: number) => void;
  getCurrentFrame: () => number;
}

interface HeroCanvasScrubberProps {
  frameCount?: number;
  className?: string;
  onFirstFrameLoaded?: () => void;
}

const TOTAL_FRAMES = 240;

function formatFrameUrl(index: number): string {
  const frameNum = String(index + 1).padStart(3, "0");
  return `/frames/hero/ezgif-frame-${frameNum}.webp`;
}

export const HeroCanvasScrubber = forwardRef<
  HeroCanvasScrubberHandle,
  HeroCanvasScrubberProps
>(({ frameCount = TOTAL_FRAMES, className = "", onFirstFrameLoaded }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const framesCacheRef = useRef<(HTMLImageElement | null)[]>(
    new Array(frameCount).fill(null)
  );
  const currentFrameRef = useRef<number>(0);
  const isLoadedRef = useRef<boolean[]>(new Array(frameCount).fill(false));
  const isMountedRef = useRef<boolean>(true);

  // Draws a given image onto the canvas using cover sizing
  const drawImageToCanvas = useCallback((img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;
    if (cw === 0 || ch === 0) return;

    const iw = img.naturalWidth || 1920;
    const ih = img.naturalHeight || 1080;

    const hRatio = cw / iw;
    const vRatio = ch / ih;
    const ratio = Math.max(hRatio, vRatio);

    const drawW = iw * ratio;
    const drawH = ih * ratio;
    const drawX = (cw - drawW) / 2;
    const drawY = (ch - drawH) / 2;

    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  }, []);

  // Finds nearest loaded frame if current target frame is still downloading
  const findNearestLoadedFrame = useCallback(
    (targetIndex: number): HTMLImageElement | null => {
      const cache = framesCacheRef.current;
      const loaded = isLoadedRef.current;
      if (loaded[targetIndex] && cache[targetIndex]) {
        return cache[targetIndex];
      }

      // Search radiating outward from targetIndex
      for (let offset = 1; offset < frameCount; offset++) {
        const prev = targetIndex - offset;
        if (prev >= 0 && loaded[prev] && cache[prev]) {
          return cache[prev];
        }
        const next = targetIndex + offset;
        if (next < frameCount && loaded[next] && cache[next]) {
          return cache[next];
        }
      }
      return null;
    },
    [frameCount]
  );

  // Renders a specific frame by index
  const renderFrame = useCallback(
    (index: number) => {
      const clampedIndex = Math.max(0, Math.min(frameCount - 1, Math.round(index)));
      currentFrameRef.current = clampedIndex;

      const img = findNearestLoadedFrame(clampedIndex);
      if (img && img.complete && img.naturalWidth > 0) {
        drawImageToCanvas(img);
      }
    },
    [frameCount, findNearestLoadedFrame, drawImageToCanvas]
  );

  // Adjust canvas size to match DOM layout + devicePixelRatio
  const updateCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const targetW = Math.round(rect.width * dpr);
    const targetH = Math.round(rect.height * dpr);

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }

    renderFrame(currentFrameRef.current);
  }, [renderFrame]);

  // Expose imperative handle to GSAP
  useImperativeHandle(
    ref,
    () => ({
      renderFrame,
      getCurrentFrame: () => currentFrameRef.current,
    }),
    [renderFrame]
  );

  useEffect(() => {
    isMountedRef.current = true;
    updateCanvasSize();

    // Priority 1: Load Frame 0 immediately for instant first paint
    const firstImg = new Image();
    firstImg.decoding = "async";
    firstImg.src = formatFrameUrl(0);
    firstImg.onload = () => {
      if (!isMountedRef.current) return;
      framesCacheRef.current[0] = firstImg;
      isLoadedRef.current[0] = true;
      if (currentFrameRef.current === 0) {
        drawImageToCanvas(firstImg);
      }
      onFirstFrameLoaded?.();
    };

    // Priority 2: Preload keyframes (every 6th frame) for instant scrub response
    const keyframeIndices: number[] = [];
    for (let i = 0; i < frameCount; i += 6) {
      if (i !== 0) keyframeIndices.push(i);
    }
    // Also include final frame explicitly
    if (!keyframeIndices.includes(frameCount - 1)) {
      keyframeIndices.push(frameCount - 1);
    }

    // Remaining frames
    const remainingIndices: number[] = [];
    for (let i = 0; i < frameCount; i++) {
      if (i !== 0 && !keyframeIndices.includes(i)) {
        remainingIndices.push(i);
      }
    }

    // Worker queue with concurrency limiter (4 concurrent requests)
    const queue = [...keyframeIndices, ...remainingIndices];
    const CONCURRENCY = 4;
    let activeLoads = 0;

    const loadNext = () => {
      if (!isMountedRef.current || queue.length === 0) return;
      while (activeLoads < CONCURRENCY && queue.length > 0) {
        const nextIdx = queue.shift();
        if (nextIdx === undefined) break;

        activeLoads++;
        const img = new Image();
        img.decoding = "async";
        img.src = formatFrameUrl(nextIdx);
        img.onload = () => {
          activeLoads--;
          if (isMountedRef.current) {
            framesCacheRef.current[nextIdx] = img;
            isLoadedRef.current[nextIdx] = true;
            if (currentFrameRef.current === nextIdx) {
              drawImageToCanvas(img);
            }
          }
          loadNext();
        };
        img.onerror = () => {
          activeLoads--;
          loadNext();
        };
      }
    };

    // Start background progressive preload
    loadNext();

    // Resize handling
    const resizeObserver = new ResizeObserver(() => {
      updateCanvasSize();
    });
    if (canvasRef.current) {
      resizeObserver.observe(canvasRef.current);
    }

    window.addEventListener("resize", updateCanvasSize);

    return () => {
      isMountedRef.current = false;
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, [frameCount, updateCanvasSize, drawImageToCanvas, onFirstFrameLoaded]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full block ${className}`}
      style={{
        // Maintain smooth rendering and warm backdrop
        backgroundColor: "#F3EFE6",
      }}
    />
  );
});

HeroCanvasScrubber.displayName = "HeroCanvasScrubber";

export default HeroCanvasScrubber;
