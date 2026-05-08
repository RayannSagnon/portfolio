export type LabMode = {
  pulse: string;
  scan: number;
  grid: number;
  blur: number;
  sig: string;
};

export type Project = {
  slug: string;
  code: string;
  name: string;
  tag: string;
  type: "software" | "embedded" | "ai" | "hardware" | "speculative";
  hue: number;
  glyph: string;
  blurb: string;
  architecture: [string, string][];
  tradeoffs: [string, string][];
  notes: [string, string][];
  labMode: LabMode;
};

export const projects: Project[] = [
  {
    slug: "studentos",
    code: "01",
    name: "StudentOS",
    tag: "Academic OS · Intelligent Interface",
    type: "software",
    hue: 218,
    glyph: "[ ////\n  ////\n  acad·os ]",
    blurb:
      "An academic operating system that consolidates productivity, planning, and study workflows into one adaptive surface — built for students who live in nine tabs.",
    architecture: [
      ["Layer", "Adaptive scheduler · context graph"],
      ["Input", "Calendar · email · LMS feeds"],
      ["Model", "Local-first · privacy preserving"],
      ["UI",    "Single surface · low-attention"],
    ],
    tradeoffs: [
      ["Decision",    "Local-first storage over cloud sync"],
      ["Tradeoff",    "Slower onboarding for stronger privacy"],
      ["Constraint",  "Runs offline on aging hardware"],
    ],
    notes: [
      ["Why",  "Students live in 9 tabs. They deserve one system."],
      ["Next", "Cross-institution learning model."],
    ],
    labMode: { pulse: "7s", scan: 0, grid: 1.0, blur: 38, sig: "12s" },
  },
  {
    slug: "rc-x",
    code: "02",
    name: "RC-X",
    tag: "Embedded · Real-Time Control",
    type: "embedded",
    hue: 18,
    glyph: "[ <RX>\n  <ESC>\n  <IMU> ]",
    blurb:
      "A 1:10-scale embedded platform for real-time remote control — custom firmware, sub-10ms loop, and an honest hardware-first approach to intelligent motion.",
    architecture: [
      ["MCU",   "STM32 · 168 MHz · custom firmware"],
      ["Link",  "2.4 GHz · sub-10ms control loop"],
      ["Sense", "IMU · hall · current sensing"],
      ["Frame", "1:10 composite chassis"],
    ],
    tradeoffs: [
      ["Decision",   "Bare-metal C over RTOS"],
      ["Tradeoff",   "Lower abstraction, fewer surprises"],
      ["Constraint", "Telemetry budget under 50 KB/s"],
    ],
    notes: [
      ["Why",  "Real-time hardware is the most honest engineering."],
      ["Next", "Onboard vision · lap autonomy."],
    ],
    labMode: { pulse: "3.2s", scan: 0, grid: 1.4, blur: 28, sig: "5s" },
  },
  {
    slug: "physical-whiteboard-ai",
    code: "03",
    name: "Physical Whiteboard AI",
    tag: "Physical AI · Vision System",
    type: "ai",
    hue: 350,
    glyph: "[ ▢▢▢\n  ▢AI▢\n  ▢▢▢ ]",
    blurb:
      "A countertop physical-AI unit that observes, understands, and responds to real-world whiteboard work — the room as interface.",
    architecture: [
      ["Vision", "RGB · depth · OCR pipeline"],
      ["Model",  "Multimodal · spatially-aware"],
      ["Loop",   "Observe → understand → respond"],
      ["Form",   "Embedded countertop unit"],
    ],
    tradeoffs: [
      ["Decision",   "On-device inference over cloud"],
      ["Tradeoff",   "Smaller models, faster feedback"],
      ["Constraint", "Thermal envelope under passive cooling"],
    ],
    notes: [
      ["Why",  "The whiteboard is the original interface."],
      ["Next", "Multi-room context graph."],
    ],
    labMode: { pulse: "5.5s", scan: 0.8, grid: 0.9, blur: 36, sig: "9s" },
  },
  {
    slug: "dormlight-system",
    code: "04",
    name: "DormLight System",
    tag: "Human-Machine Interface · IoT",
    type: "hardware",
    hue: 38,
    glyph: "[ on—on\n  ⏻⏻⏻\n  cmd·lt ]",
    blurb:
      "A retrofit smart-room system that physically actuates wall switches — embedded hardware that adapts a space you cannot rewire.",
    architecture: [
      ["Driver", "Servo · capacitive trigger"],
      ["Link",   "Wi-Fi · MQTT · local broker"],
      ["Edge",   "ESP32-S3 · OTA updates"],
      ["Safety", "Mechanical fail-open"],
    ],
    tradeoffs: [
      ["Decision",   "Mechanical actuation over rewiring"],
      ["Tradeoff",   "Bulkier unit, zero electrical risk"],
      ["Constraint", "Battery life > 4 months"],
    ],
    notes: [
      ["Why",  "Retrofit the room you cannot rewire."],
      ["Next", "Voice + presence layer."],
    ],
    labMode: { pulse: "6.5s", scan: 0, grid: 1.0, blur: 38, sig: "11s" },
  },
  {
    slug: "system-flow",
    code: "05",
    name: "System Flow",
    tag: "Interactive Topology · Data",
    type: "software",
    hue: 200,
    glyph: "[ ◇→◇\n  ↓ ◇\n  flow→  ]",
    blurb:
      "A live topology visualizer for intelligent systems — every node a behavior, every edge an intent. Architecture is the idea, made visible.",
    architecture: [
      ["Form",  "WebGL · live topology"],
      ["Input", "Telemetry · semantic events"],
      ["Model", "Force-directed · weighted"],
      ["Int.",  "Hover · focus · isolate"],
    ],
    tradeoffs: [
      ["Decision",   "Force-directed layout over fixed grid"],
      ["Tradeoff",   "Living motion, less predictability"],
      ["Constraint", "60fps with 500+ nodes"],
    ],
    notes: [
      ["Why",  "Architecture is the idea — show it."],
      ["Next", "Multi-system overlay."],
    ],
    labMode: { pulse: "5s", scan: 0, grid: 1.2, blur: 32, sig: "7s" },
  },
  {
    slug: "embedded-vision",
    code: "06",
    name: "Embedded Vision",
    tag: "Edge CV · Low-Cost Sensing",
    type: "embedded",
    hue: 160,
    glyph: "[ <eye>\n  <det>\n  <act> ]",
    blurb:
      "A low-cost edge-vision platform exploring spatial awareness on small MCUs. Intelligence pushed to where the signal lives.",
    architecture: [
      ["MCU",   "ESP32-S3 · ESP-DL"],
      ["Model", "Quantized · on-device"],
      ["Sense", "Mono cam · IR depth"],
      ["Form",  "Sub-$30 · open-frame"],
    ],
    tradeoffs: [
      ["Decision",   "INT8 quantization · 8-bit pipeline"],
      ["Tradeoff",   "~3% accuracy loss for 10× speed"],
      ["Constraint", "Runs in 280 KB SRAM"],
    ],
    notes: [
      ["Why",  "Intelligence belongs at the edge."],
      ["Next", "Multi-cam stereo · pose."],
    ],
    labMode: { pulse: "5.5s", scan: 0.4, grid: 1.1, blur: 34, sig: "8s" },
  },
  {
    slug: "neural-interface",
    code: "07",
    name: "Neural Interface",
    tag: "Speculative · Human-Machine",
    type: "speculative",
    hue: 270,
    glyph: "[ ~~~~\n  /\\/\\\n  signal ]",
    blurb:
      "A speculative probe into ambient human-machine interaction — gaze, gesture, breath as input. Speculation as engineering at long range.",
    architecture: [
      ["Form",  "Spatial · ambient"],
      ["Input", "Gaze · gesture · breath"],
      ["Model", "Generative scene graph"],
      ["Int.",  "Calm · minimal HUD"],
    ],
    tradeoffs: [
      ["Decision",   "Ambient input over explicit commands"],
      ["Tradeoff",   "Ambiguity for lower friction"],
      ["Constraint", "Latency budget under 80ms"],
    ],
    notes: [
      ["Why",  "Speculation is engineering at long range."],
      ["Next", "Embodied build."],
    ],
    labMode: { pulse: "9s", scan: 0, grid: 0.7, blur: 56, sig: "18s" },
  },
];
