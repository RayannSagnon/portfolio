"use client";
import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

export function Reveal({ children, delay = 0, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("in"); io.disconnect(); } },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal
      className={className}
      style={{ transitionDelay: delay ? `${delay}ms` : undefined }}
    >
      {children}
    </div>
  );
}
