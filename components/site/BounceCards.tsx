'use client';

import React, { useEffect, useRef } from 'react';

import type { CardFan } from './cardFan';
import './BounceCards.css';

export type BounceCardImage = string | { src: string; alt?: string; focus?: string };

export type BounceCardsProps = {
  images?: BounceCardImage[];
  className?: string;
  style?: React.CSSProperties;
  containerWidth?: number;
  containerHeight?: number;
  cardSize?: number;
  spread?: number;
  rotation?: number;
  arc?: number;
  animationDelay?: number;
  animationStagger?: number;
  bounciness?: number;
  enableHover?: boolean;
  pushDistance?: number;
  hoverScale?: number;
  borderWidth?: number;
  borderColor?: string;
  radius?: number;
  shadow?: boolean;
  transformStyles?: string[];
  onCardClick?: (index: number) => void;
  /** Scroll-driven: the cards start as a pile and open into the fan. */
  fan?: CardFan;
};

type Slot = { x: number; y: number; rotate: number };

type Body = {
  x: number;
  y: number;
  rotate: number;
  scale: number;
  vx: number;
  vy: number;
  vr: number;
  vs: number;
  born: number;
};

const PATTERN = [1, 0.5, -0.3, -1, 0.2, 0.75, -0.6, 0.35, -0.85, 0.1];
const PILE_ANGLES = [-14, 9, -5, 12, -2, 7, -9, 4];
const PILE_SCALE = 1.2;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const parseTransform = (value: string | undefined): Slot | null => {
  if (typeof value !== 'string') return null;
  const rotate = value.match(/rotate\(\s*(-?[\d.]+)deg\s*\)/);
  const translate = value.match(/translate\(\s*(-?[\d.]+)px(?:\s*,\s*(-?[\d.]+)px)?\s*\)/);
  return {
    x: translate ? Number(translate[1]) : 0,
    y: translate && translate[2] ? Number(translate[2]) : 0,
    rotate: rotate ? Number(rotate[1]) : 0
  };
};

const toCard = (item: BounceCardImage) =>
  typeof item === 'string' ? { src: item, alt: '', focus: undefined } : { src: item?.src, alt: item?.alt ?? '', focus: item?.focus };

export default function BounceCards({
  images = [],
  className = '',
  style,
  containerWidth = 400,
  containerHeight = 400,
  cardSize = 200,
  spread = 85,
  rotation = 10,
  arc = 0,
  animationDelay = 0.5,
  animationStagger = 0.06,
  bounciness = 0.6,
  enableHover = true,
  pushDistance = 160,
  hoverScale = 1.06,
  borderWidth = 5,
  borderColor = '#ffffff',
  radius = 25,
  shadow = true,
  transformStyles,
  onCardClick,
  fan
}: BounceCardsProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const wakeRef = useRef<(() => void) | null>(null);
  const cards = images.map(toCard);
  const count = cards.length;
  const middle = (count - 1) / 2;
  const reach = Math.max(1, middle);
  const slots = cards.map((_, i): Slot => {
    const custom = transformStyles ? parseTransform(transformStyles[i]) : null;
    if (custom) return custom;
    const offset = i - middle;
    return {
      x: offset * spread,
      y: arc * (offset / reach) ** 2,
      rotate: rotation * PATTERN[i % PATTERN.length]
    };
  });
  const settings = {
    slots,
    cardSize: Math.max(10, cardSize),
    delay: Math.max(0, animationDelay),
    stagger: Math.max(0, animationStagger),
    bounciness: clamp(bounciness, 0, 1),
    enableHover,
    pushDistance,
    hoverScale: clamp(hoverScale, 0.5, 2),
    clickable: typeof onCardClick === 'function'
  };
  const settingsRef = useRef(settings);
  settingsRef.current = settings;
  const clickRef = useRef(onCardClick);
  clickRef.current = onCardClick;
  const fanRef = useRef(fan);
  fanRef.current = fan;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    const bodies: Body[] = [];
    const state = { hovered: -1, time: 0, layer: -1 };
    let raf = 0;
    let last = performance.now();
    let alive = true;
    // Arriving by scroll the pile is already there; arriving any other way the cards pop in.
    const skipIntro = !!fanRef.current && fanRef.current.open < 1;

    const goal = (i: number) => {
      const s = settingsRef.current;
      const slot = s.slots[i] ?? { x: 0, y: 0, rotate: 0 };
      const f = fanRef.current;
      if (!f || f.open >= 1) return { x: slot.x, y: slot.y, rotate: slot.rotate, scale: 1 };
      const middleIndex = (s.slots.length - 1) / 2;
      const offset = i - middleIndex;
      // The outer cards leave the pile first, so it fans open from the edges.
      const local = clamp(f.open * 1.3 - 0.3 * (1 - Math.abs(offset) / Math.max(1, middleIndex)), 0, 1);
      const pileX = offset * s.cardSize * 0.05;
      const pileY = (i % 2 ? -1 : 1) * s.cardSize * 0.035 + f.pileY;
      const pileRotate = PILE_ANGLES[i % PILE_ANGLES.length];
      return {
        x: pileX + (slot.x - pileX) * local,
        y: pileY + (slot.y - pileY) * local,
        rotate: pileRotate + (slot.rotate - pileRotate) * local,
        scale: PILE_SCALE + (1 - PILE_SCALE) * local
      };
    };

    const body = (i: number): Body => {
      if (!bodies[i]) {
        const start = goal(i);
        bodies[i] = {
          x: start.x,
          y: start.y,
          rotate: start.rotate,
          scale: reduce || skipIntro ? start.scale : 0,
          vx: 0,
          vy: 0,
          vr: 0,
          vs: 0,
          born: state.time
        };
      }
      return bodies[i];
    };

    const step = (
      value: number,
      velocity: number,
      target: number,
      stiffness: number,
      damping: number,
      dt: number
    ): [number, number] => {
      const next = velocity + ((target - value) * stiffness - velocity * damping) * dt;
      return [value + next * dt, next];
    };

    const frame = (now: number) => {
      raf = 0;
      if (!alive) return;
      const s = settingsRef.current;
      const dt = Math.min(1 / 30, Math.max(1 / 240, (now - last) / 1000));
      last = now;
      state.time += dt;

      const opened = !fanRef.current || fanRef.current.open >= 0.995;
      const hovered = s.enableHover && opened ? state.hovered : -1;
      const popStiffness = 170;
      const popDamping = 2 * (1 - 0.85 * s.bounciness) * Math.sqrt(popStiffness);
      const moveStiffness = 210;
      const moveDamping = 2 * (reduce ? 1 : 0.72) * Math.sqrt(moveStiffness);
      const substeps = Math.ceil(dt / (1 / 240));
      const h = dt / substeps;
      let moving = 0;

      for (let i = 0; i < s.slots.length; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;
        const card = body(i);
        const slot = s.slots[i];
        const appeared = reduce || skipIntro || state.time - card.born >= s.delay + i * s.stagger;
        const target = goal(i);
        let targetX = target.x;
        let targetY = target.y;
        let targetRotate = target.rotate;
        let targetScale = appeared ? target.scale : 0;
        if (hovered >= 0 && appeared) {
          if (i === hovered) {
            targetY = slot.y - s.cardSize * 0.04;
            targetRotate = 0;
            targetScale = s.hoverScale;
          } else {
            targetX = slot.x + Math.sign(i - hovered) * s.pushDistance;
          }
        }
        for (let k = 0; k < substeps; k++) {
          [card.x, card.vx] = step(card.x, card.vx, targetX, moveStiffness, moveDamping, h);
          [card.y, card.vy] = step(card.y, card.vy, targetY, moveStiffness, moveDamping, h);
          [card.rotate, card.vr] = step(card.rotate, card.vr, targetRotate, moveStiffness, moveDamping, h);
          if (reduce) {
            card.scale = targetScale;
            card.vs = 0;
          } else {
            [card.scale, card.vs] = step(card.scale, card.vs, targetScale, popStiffness, popDamping, h);
          }
        }
        moving +=
          Math.abs(card.vx) +
          Math.abs(card.vy) +
          Math.abs(card.vr) +
          Math.abs(card.vs) * 100 +
          Math.abs(targetX - card.x) +
          Math.abs(targetY - card.y) +
          Math.abs(targetRotate - card.rotate) +
          Math.abs(targetScale - card.scale) * 100 +
          (appeared ? 0 : 1);
        el.style.transform = `translate(-50%, -50%) translate3d(${card.x.toFixed(2)}px, ${card.y.toFixed(2)}px, 0) rotate(${card.rotate.toFixed(3)}deg) scale(${Math.max(0, card.scale).toFixed(4)})`;
      }

      if (state.layer !== hovered) {
        state.layer = hovered;
        cardRefs.current.forEach((el, i) => {
          if (!el) return;
          el.style.zIndex = i === hovered ? String(s.slots.length + 1) : String(s.slots.length - i);
          el.toggleAttribute('data-active', i === hovered);
        });
      }

      if (moving > 0.02) raf = requestAnimationFrame(frame);
    };

    const wake = () => {
      if (raf || !alive) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    wakeRef.current = wake;
    if (fanRef.current) fanRef.current.wake = wake;

    const pick = (event: MouseEvent): number => {
      const s = settingsRef.current;
      const rect = root.getBoundingClientRect();
      const px = event.clientX - rect.left - rect.width / 2;
      const py = event.clientY - rect.top - rect.height / 2;
      let best = -1;
      let distance = Infinity;
      s.slots.forEach((slot, i) => {
        const gap = Math.hypot(px - slot.x, py - slot.y);
        if (gap < distance) {
          distance = gap;
          best = i;
        }
      });
      if (best < 0) return -1;
      const slot = s.slots[best];
      const half = s.cardSize / 2;
      if (Math.abs(py - slot.y) > half + 12 || Math.abs(px - slot.x) > half + 12) return -1;
      if (state.hovered >= 0 && state.hovered !== best) {
        const current = s.slots[state.hovered];
        if (current && Math.hypot(px - current.x, py - current.y) - distance < 6) return state.hovered;
      }
      return best;
    };

    const onMove = (event: PointerEvent) => {
      // On a touch screen a card comes forward on a tap, so scrolling past never moves one.
      if (event.pointerType === 'touch') return;
      const next = pick(event);
      if (next !== state.hovered) {
        state.hovered = next;
        wake();
      }
    };
    const onLeave = (event: Event) => {
      if ((event as PointerEvent).pointerType === 'touch') return;
      if (state.hovered !== -1) {
        state.hovered = -1;
        wake();
      }
    };
    const onClick = (event: MouseEvent) => {
      const index = pick(event);
      if ((event as PointerEvent).pointerType === 'touch') {
        state.hovered = index === state.hovered ? -1 : index;
        wake();
      }
      if (index < 0) return;
      const card = bodies[index];
      if (card && !reduce) card.vs -= 2.2;
      wake();
      clickRef.current?.(index);
    };
    const onFocus = (event: FocusEvent) => {
      const index = cardRefs.current.indexOf(event.target as HTMLDivElement);
      if (index >= 0) {
        state.hovered = index;
        wake();
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      const index = cardRefs.current.indexOf(event.target as HTMLDivElement);
      if (index < 0 || !settingsRef.current.clickable) return;
      event.preventDefault();
      if (bodies[index] && !reduce) bodies[index].vs -= 2.2;
      wake();
      clickRef.current?.(index);
    };

    root.addEventListener('pointermove', onMove);
    root.addEventListener('pointerdown', onMove);
    root.addEventListener('pointerleave', onLeave);
    root.addEventListener('click', onClick);
    root.addEventListener('focusin', onFocus);
    root.addEventListener('focusout', onLeave);
    root.addEventListener('keydown', onKey);
    wake();

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      wakeRef.current = null;
      if (fanRef.current) fanRef.current.wake = null;
      root.removeEventListener('pointermove', onMove);
      root.removeEventListener('pointerdown', onMove);
      root.removeEventListener('pointerleave', onLeave);
      root.removeEventListener('click', onClick);
      root.removeEventListener('focusin', onFocus);
      root.removeEventListener('focusout', onLeave);
      root.removeEventListener('keydown', onKey);
    };
  }, []);

  useEffect(() => {
    wakeRef.current?.();
  });

  return (
    <div
      ref={rootRef}
      className={`bounce-cards${className ? ` ${className}` : ''}`}
      style={
        {
          width: containerWidth,
          height: containerHeight,
          '--bounce-cards-size': `${settings.cardSize}px`,
          '--bounce-cards-border': `${Math.max(0, borderWidth)}px`,
          '--bounce-cards-border-color': borderColor,
          '--bounce-cards-radius': `${Math.max(0, radius)}px`,
          '--bounce-cards-shadow': shadow
            ? '0 1px 2px rgba(0, 0, 0, 0.12), 0 10px 28px -6px rgba(0, 0, 0, 0.32)'
            : 'none',
          '--bounce-cards-shadow-active': shadow
            ? '0 2px 4px rgba(0, 0, 0, 0.14), 0 22px 44px -10px rgba(0, 0, 0, 0.42)'
            : 'none',
          ...style
        } as React.CSSProperties
      }
    >
      {cards.map((card, i) => (
        <div
          key={i}
          ref={el => {
            cardRefs.current[i] = el;
          }}
          className={`bounce-cards__card${settings.clickable ? ' bounce-cards__card--clickable' : ''}`}
          style={{ zIndex: count - i }}
          {...(settings.clickable ? { role: 'button', tabIndex: 0, 'aria-label': card.alt || `Card ${i + 1}` } : null)}
        >
          {card.src && <img src={card.src} alt={card.alt} draggable={false} style={{ objectPosition: card.focus }} />}
        </div>
      ))}
    </div>
  );
}
