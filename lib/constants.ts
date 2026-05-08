export const SYSTEM_STREAM_MESSAGES = [
  { kind: "signal", msg: "NODE 03 · ping · 12ms" },
  { kind: "ok",     msg: "cylinder · idle drift · stable" },
  { kind: "signal", msg: "NODE 05 · topology sync" },
  { kind: "ok",     msg: "sensor matrix · calibrated" },
  { kind: "warn",   msg: "thermal · 41°C · nominal" },
  { kind: "signal", msg: "NODE 02 · RC-X · loop 8.4ms" },
  { kind: "ok",     msg: "dust field · 36 particles · drifting" },
  { kind: "signal", msg: "OCR pass · 0.92 confidence" },
  { kind: "ok",     msg: "memory · 142.4 MB · steady" },
  { kind: "signal", msg: "visitor · presence · detected" },
  { kind: "ok",     msg: "NODE 06 · vision frame · 30 fps" },
  { kind: "signal", msg: "system · listening" },
  { kind: "ok",     msg: "archive · 11 entries · indexed" },
  { kind: "signal", msg: "NODE 07 · ambient field · open" },
] as const;

export const BOOT_LINES = [
  { delay: 0.1,  time: "0.001", msg: "initializing rayann.sagnon system",               ok: "OK" },
  { delay: 0.4,  time: "0.180", msg: "loading engineering kernel · embedded layer",     ok: "OK" },
  { delay: 0.7,  time: "0.420", msg: "linking AI modules · interaction subsystems",     ok: "OK" },
  { delay: 1.0,  time: "0.690", msg: "mounting product vision · creative technology",   ok: "OK" },
  { delay: 1.3,  time: "0.880", msg: "calibrating cinematic environment · grain · light", ok: "OK" },
  { delay: 1.6,  time: "1.040", msg: "handshake established with visitor",              ok: "SIGNAL" },
] as const;

export const DUST_COUNT = 36;
export const BOOT_AUTO_SKIP_MS = 3400;
export const STREAM_INTERVAL_MS = 1800;
export const STREAM_MAX_LINES = 6;
export const CYLINDER_IDLE_AFTER_MS = 4000;
export const CYLINDER_IDLE_SPEED = 0.05;
export const CYLINDER_DRAG_FACTOR = 0.3;
export const CYLINDER_LERP = 0.08;
