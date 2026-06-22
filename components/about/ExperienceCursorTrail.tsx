"use client";

import { useEffect, useRef, type RefObject } from "react";

const PALETTE = ["#8a2a3a", "#a33f4d", "#d6ad72", "#e8e4dc"] as const;
const TRAIL_FADE = 0.09;
const BRUSH_RADIUS = 34;
const MIN_DISTANCE = 5;
const MAX_POINTS = 140;

type TrailPoint = {
  x: number;
  y: number;
  color: string;
};

function mixHex(from: string, to: string, amount: number) {
  const parse = (hex: string) => {
    const value = hex.replace("#", "");
    return [
      Number.parseInt(value.slice(0, 2), 16),
      Number.parseInt(value.slice(2, 4), 16),
      Number.parseInt(value.slice(4, 6), 16),
    ];
  };

  const [r1, g1, b1] = parse(from);
  const [r2, g2, b2] = parse(to);
  const r = Math.round(r1 + (r2 - r1) * amount);
  const g = Math.round(g1 + (g2 - g1) * amount);
  const b = Math.round(b1 + (b2 - b1) * amount);
  return `rgb(${r}, ${g}, ${b})`;
}

function colorAlongPath(distance: number) {
  const cycle = distance * 0.0028;
  const index = Math.floor(cycle) % PALETTE.length;
  const next = (index + 1) % PALETTE.length;
  return mixHex(PALETTE[index], PALETTE[next], cycle - Math.floor(cycle));
}

function toRgba(rgb: string, alpha: number) {
  const match = rgb.match(/\d+/g);
  if (!match) return `rgba(138, 42, 58, ${alpha})`;
  return `rgba(${match[0]}, ${match[1]}, ${match[2]}, ${alpha})`;
}

export function ExperienceCursorTrail({
  targetRef,
}: {
  targetRef: RefObject<HTMLElement | null>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const pointsRef = useRef<TrailPoint[]>([]);
  const distanceRef = useRef(0);
  const activeRef = useRef(false);
  const targetPosRef = useRef({ x: -200, y: -200 });
  const cursorPosRef = useRef({ x: -200, y: -200 });

  useEffect(() => {
    const host = targetRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (reducedMotion || coarsePointer) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = host.clientWidth;
      height = host.clientHeight;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const toLocal = (clientX: number, clientY: number) => {
      const rect = host.getBoundingClientRect();
      return {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
    };

    const addPoint = (x: number, y: number) => {
      const points = pointsRef.current;
      const last = points[points.length - 1];

      if (last) {
        const dx = x - last.x;
        const dy = y - last.y;
        const delta = Math.hypot(dx, dy);
        if (delta < MIN_DISTANCE) return;
        distanceRef.current += delta;
      }

      points.push({ x, y, color: colorAlongPath(distanceRef.current) });
      if (points.length > MAX_POINTS) points.shift();
    };

    const draw = () => {
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = `rgba(5, 5, 5, ${TRAIL_FADE})`;
      ctx.fillRect(0, 0, width, height);

      const points = pointsRef.current;
      if (points.length > 1) {
        for (let index = 1; index < points.length; index += 1) {
          const previous = points[index - 1];
          const current = points[index];
          const progress = index / points.length;

          ctx.globalCompositeOperation = "screen";
          ctx.strokeStyle = current.color;
          ctx.lineWidth = BRUSH_RADIUS * (0.45 + progress * 0.55);
          ctx.globalAlpha = 0.22 + progress * 0.18;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.beginPath();
          ctx.moveTo(previous.x, previous.y);
          ctx.lineTo(current.x, current.y);
          ctx.stroke();

          const glow = ctx.createRadialGradient(
            current.x,
            current.y,
            0,
            current.x,
            current.y,
            BRUSH_RADIUS * 0.9
          );
          glow.addColorStop(0, toRgba(current.color, 0.16));
          glow.addColorStop(1, "rgba(0, 0, 0, 0)");
          ctx.globalCompositeOperation = "screen";
          ctx.fillStyle = glow;
          ctx.globalAlpha = 1;
          ctx.beginPath();
          ctx.arc(current.x, current.y, BRUSH_RADIUS * 0.9, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (activeRef.current) {
        cursorPosRef.current.x += (targetPosRef.current.x - cursorPosRef.current.x) * 0.28;
        cursorPosRef.current.y += (targetPosRef.current.y - cursorPosRef.current.y) * 0.28;

        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate(${cursorPosRef.current.x}px, ${cursorPosRef.current.y}px) translate(-50%, -50%)`;
        }
      }

      raf = requestAnimationFrame(draw);
    };

    const setActive = (active: boolean) => {
      activeRef.current = active;
      if (active) {
        host.setAttribute("data-cursor-paint-active", "true");
      } else {
        host.removeAttribute("data-cursor-paint-active");
        if (cursorRef.current) cursorRef.current.style.opacity = "0";
      }
    };

    const onPointerEnter = () => setActive(true);

    const onPointerLeave = () => setActive(false);

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const local = toLocal(event.clientX, event.clientY);
      targetPosRef.current = local;
      addPoint(local.x, local.y);

      if (cursorRef.current) {
        cursorRef.current.style.opacity = "1";
        const color = colorAlongPath(distanceRef.current);
        cursorRef.current.style.background = color;
        cursorRef.current.style.boxShadow = `0 0 14px ${color}, 0 0 28px rgba(138, 42, 58, 0.35)`;
      }
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    resize();
    raf = requestAnimationFrame(draw);

    host.addEventListener("pointerenter", onPointerEnter);
    host.addEventListener("pointerleave", onPointerLeave);
    host.addEventListener("pointermove", onPointerMove);

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      host.removeEventListener("pointerenter", onPointerEnter);
      host.removeEventListener("pointerleave", onPointerLeave);
      host.removeEventListener("pointermove", onPointerMove);
      host.removeAttribute("data-cursor-paint-active");
    };
  }, [targetRef]);

  return (
    <>
      <canvas ref={canvasRef} className="story-cursor-paint-canvas" aria-hidden />
      <div ref={cursorRef} className="story-cursor-paint-dot" aria-hidden />
    </>
  );
}
