"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { projects } from "@/content/projects";
import {
  CYLINDER_DRAG_FACTOR,
  CYLINDER_IDLE_AFTER_MS,
  CYLINDER_IDLE_SPEED,
  CYLINDER_LERP,
} from "@/lib/constants";
import { PINGS } from "@/lib/sound";

const N = projects.length;
const FACE_W = 280;
export const CYLINDER_RADIUS = Math.round((FACE_W / 2) / Math.tan(Math.PI / N)) + 40;

export function useLabCylinder() {
  const [activeIdx, setActiveIdx] = useState(0);
  const angleRef   = useRef(0);
  const targetRef  = useRef(0);
  const dragging   = useRef(false);
  const lastX      = useRef(0);
  const idleStart  = useRef(Date.now());
  const rafRef     = useRef<number>(0);
  const [angle, setAngle] = useState(0);

  const snapTo = useCallback((idx: number) => {
    const step = 360 / N;
    targetRef.current = -(step * idx);
    setActiveIdx(idx);
    idleStart.current = Date.now();
  }, []);

  const rotate = useCallback((dir: -1 | 1) => {
    const next = ((activeIdx + dir) % N + N) % N;
    snapTo(next);
    PINGS.rotate();
  }, [activeIdx, snapTo]);

  useEffect(() => {
    function tick() {
      if (!dragging.current) {
        if (Date.now() - idleStart.current > CYLINDER_IDLE_AFTER_MS) {
          targetRef.current -= CYLINDER_IDLE_SPEED;
        }
        angleRef.current += (targetRef.current - angleRef.current) * CYLINDER_LERP;
      }

      // determine nearest face
      const step = 360 / N;
      let nearest = 0, best = Infinity;
      for (let i = 0; i < N; i++) {
        const a = ((angleRef.current + step * i) % 360 + 540) % 360 - 180;
        if (Math.abs(a) < best) { best = Math.abs(a); nearest = i; }
      }
      setActiveIdx(nearest);
      setAngle(angleRef.current);
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  useEffect(() => {
    const reset = () => { idleStart.current = Date.now(); };
    ["pointerdown", "keydown", "wheel"].forEach(ev => window.addEventListener(ev, reset, { passive: true }));
    return () => ["pointerdown", "keydown", "wheel"].forEach(ev => window.removeEventListener(ev, reset));
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLElement>) => {
    dragging.current = true;
    lastX.current = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
    idleStart.current = Date.now();
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - lastX.current;
    lastX.current = e.clientX;
    angleRef.current += dx * CYLINDER_DRAG_FACTOR;
    targetRef.current = angleRef.current;
  }, []);

  const onPointerUp = useCallback(() => {
    if (!dragging.current) return;
    dragging.current = false;
    const step = 360 / N;
    const snap = Math.round(angleRef.current / step) * step;
    targetRef.current = snap;
    const idx = ((-snap / step) % N + N) % N;
    setActiveIdx(idx);
    PINGS.rotate();
  }, []);

  const lightX = 50 + Math.sin(angle * Math.PI / 180) * 8;

  return { angle, activeIdx, lightX, rotate, snapTo, onPointerDown, onPointerMove, onPointerUp };
}
