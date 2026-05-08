"use client";

let ctx: AudioContext | null = null;
export const sfx = { on: false };

export function ping(freq = 440, dur = 0.07, vol = 0.04) {
  if (!sfx.on) return;
  try {
    ctx = ctx ?? new (window.AudioContext ?? (window as never)["webkitAudioContext"])();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;
    gain.gain.value = 0;
    osc.connect(gain).connect(ctx.destination);
    const t = ctx.currentTime;
    gain.gain.linearRampToValueAtTime(vol, t + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.start(t);
    osc.stop(t + dur + 0.01);
  } catch {
    // AudioContext blocked by policy — silently ignore
  }
}

export const PINGS = {
  enter:  () => { ping(220, 0.18, 0.04); setTimeout(() => ping(440, 0.12, 0.03), 380); setTimeout(() => ping(880, 0.06, 0.02), 760); },
  exit:   () => ping(420, 0.10, 0.02),
  hover:  () => ping(660, 0.04, 0.015),
  click:  () => ping(880, 0.05, 0.025),
  rotate: () => ping(440, 0.07, 0.04),
};
