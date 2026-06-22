"use client";

import { useEffect, useRef, type RefObject } from "react";

const PALETTE = ["#8a2a3a", "#a33f4d", "#d6ad72", "#e8e4dc"] as const;
const TRAIL_FADE = 0.2;
const TRAIL_FADE_IDLE = 0.34;
const BRUSH_RADIUS = 20;
const MIN_DISTANCE = 7;

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

function drawSegment(
  ctx: CanvasRenderingContext2D,
  from: TrailPoint,
  to: TrailPoint,
) {
  ctx.save();
  ctx.globalCompositeOperation = "screen";
  ctx.strokeStyle = to.color;
  ctx.lineWidth = BRUSH_RADIUS;
  ctx.globalAlpha = 0.1;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.moveTo(from.x, from.y);
  ctx.lineTo(to.x, to.y);
  ctx.stroke();
  ctx.restore();
}

export function ExperienceCursorTrail({
  targetRef,
}: {
  targetRef: RefObject<HTMLElement | null>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const distanceRef = useRef(0);
  const activeRef = useRef(false);
  const lastPointRef = useRef<TrailPoint | null>(null);
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

    const draw = () => {
      const fade = activeRef.current ? TRAIL_FADE : TRAIL_FADE_IDLE;
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = `rgba(5, 5, 5, ${fade})`;
      ctx.fillRect(0, 0, width, height);

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
        lastPointRef.current = null;
        if (cursorRef.current) cursorRef.current.style.opacity = "0";
      }
    };

    const onPointerEnter = () => setActive(true);

    const onPointerLeave = () => setActive(false);

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;

      const local = toLocal(event.clientX, event.clientY);
      const last = lastPointRef.current;

      if (last) {
        const dx = local.x - last.x;
        const dy = local.y - last.y;
        const delta = Math.hypot(dx, dy);
        if (delta >= MIN_DISTANCE) {
          distanceRef.current += delta;
          const next: TrailPoint = {
            x: local.x,
            y: local.y,
            color: colorAlongPath(distanceRef.current),
          };
          drawSegment(ctx, last, next);
          lastPointRef.current = next;
        }
      } else {
        lastPointRef.current = {
          x: local.x,
          y: local.y,
          color: colorAlongPath(distanceRef.current),
        };
      }

      targetPosRef.current = local;

      if (cursorRef.current) {
        cursorRef.current.style.opacity = "1";
        const color = colorAlongPath(distanceRef.current);
        cursorRef.current.style.background = color;
        cursorRef.current.style.boxShadow = `0 0 8px ${color}, 0 0 16px rgba(138, 42, 58, 0.2)`;
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
