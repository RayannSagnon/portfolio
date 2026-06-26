export type Project = {
  slug: string;
  code: string;
  name: string;
  tag: string;
  type: "software" | "embedded" | "ai" | "hardware" | "speculative";
  hue: number;
  glyph: string;
  blurb: string;
  /** Optional cover image shown on the carousel card */
  cardImage?: string;
  /** Vertical anchor on the card, as a CSS top percentage (default 65%) */
  cardImageTop?: string;
  /** Optional link to the project repository */
  repoUrl?: string;
  architecture: [string, string][];
  tradeoffs: [string, string][];
  highlights: [string, string][];
};

export const projects: Project[] = [
  {
    slug: "studentos",
    code: "01",
    name: "StudentOS",
    tag: "Academic Workspace · Intelligent Interface",
    type: "software",
    hue: 218,
    glyph: "[ ////\n  ////\n  acad·os ]",
    repoUrl: "https://github.com/RayannSagnon/StudentOS",
    blurb:
      "An academic workspace that consolidates productivity, planning, and study workflows into one adaptive surface, built for students who live in nine tabs.",
    architecture: [],
    tradeoffs: [
      ["Decision",    "Local-first storage over cloud sync"],
      ["Tradeoff",    "Slower onboarding for stronger privacy"],
      ["Constraint",  "Runs offline on aging hardware"],
    ],
    highlights: [
      ["Why",  "Students live in 9 tabs. They deserve one place."],
      ["Next", "Cross-institution learning patterns."],
    ],
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
      "A 1:10-scale embedded platform for real-time remote control: custom firmware, sub-10ms loop, and an honest hardware-first approach to intelligent motion.",
    architecture: [
      ["MCU",   "STM32 · 168 MHz · custom firmware"],
      ["Link",  "2.4 GHz · sub-10ms control loop"],
      ["Sense", "IMU · hall · current sensing"],
      ["Frame", "1:10 composite chassis"],
    ],
    tradeoffs: [
      ["Decision",   "Bare-metal C over RTOS"],
      ["Tradeoff",   "Lower abstraction, fewer surprises"],
      ["Constraint", "Diagnostics budget under 50 KB/s"],
    ],
    highlights: [
      ["Why",  "Real-time hardware is the most honest engineering."],
      ["Next", "Onboard vision · lap autonomy."],
    ],
  },
  {
    slug: "physical-whiteboard-ai",
    code: "03",
    name: "Physical Whiteboard AI",
    tag: "Physical AI · Computer Vision",
    type: "ai",
    hue: 350,
    glyph: "[ ▢▢▢\n  ▢AI▢\n  ▢▢▢ ]",
    blurb:
      "A countertop physical-AI unit that observes, understands, and responds to real-world whiteboard work, treating the room as interface.",
    architecture: [
      ["Vision", "RGB · depth · OCR pipeline"],
      ["AI",  "Multimodal · spatially-aware"],
      ["Process",   "Observe → understand → respond"],
      ["Form",   "Embedded countertop unit"],
    ],
    tradeoffs: [
      ["Decision",   "On-device inference over cloud"],
      ["Tradeoff",   "Smaller models, faster feedback"],
      ["Constraint", "Thermal envelope under passive cooling"],
    ],
    highlights: [
      ["Why",  "The whiteboard is the original interface."],
      ["Next", "Multi-room context graph."],
    ],
  },
  {
    slug: "dormlight",
    code: "04",
    name: "DormLight",
    tag: "Human-Machine Interface · IoT",
    type: "hardware",
    hue: 38,
    glyph: "[ on-on\n  ⏻⏻⏻\n  cmd·lt ]",
    blurb:
      "A retrofit smart-room controller that physically actuates wall switches: embedded hardware that adapts a space you cannot rewire.",
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
    highlights: [
      ["Why",  "Retrofit the room you cannot rewire."],
      ["Next", "Voice + presence awareness."],
    ],
  },
  {
    slug: "architecture-flow",
    code: "05",
    name: "Architecture Flow",
    tag: "Interactive Topology · Data",
    type: "software",
    hue: 200,
    glyph: "[ ◇→◇\n  ↓ ◇\n  flow→  ]",
    blurb:
      "A live topology visualizer for complex software architectures. Every point is a behavior, every edge an intent. Architecture is the idea, made visible.",
    architecture: [
      ["Form",  "WebGL · live topology"],
      ["Sources", "Semantic events · relationships"],
      ["Layout", "Force-directed · weighted"],
      ["Interaction", "Hover · focus · isolate"],
    ],
    tradeoffs: [
      ["Decision",   "Force-directed layout over fixed grid"],
      ["Tradeoff",   "Living motion, less predictability"],
      ["Constraint", "60fps with 500+ points"],
    ],
    highlights: [
      ["Why",  "Architecture is the idea. Show it."],
      ["Next", "Multi-project overlay."],
    ],
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
      "A low-cost edge-vision platform exploring spatial awareness on small MCUs. Intelligence pushed closer to the hardware.",
    architecture: [
      ["MCU",   "ESP32-S3 · ESP-DL"],
      ["AI", "Quantized · on-device"],
      ["Sense", "Mono cam · IR depth"],
      ["Form",  "Sub-$30 · open-frame"],
    ],
    tradeoffs: [
      ["Decision",   "INT8 quantization · 8-bit pipeline"],
      ["Tradeoff",   "~3% accuracy loss for 10× speed"],
      ["Constraint", "Runs in 280 KB SRAM"],
    ],
    highlights: [
      ["Why",  "Intelligence belongs at the edge."],
      ["Next", "Multi-cam stereo · pose."],
    ],
  },
  {
    slug: "neural-interface",
    code: "07",
    name: "Neural Interface",
    tag: "Speculative · Human-Machine",
    type: "speculative",
    hue: 270,
    glyph: "[ ~~~~\n  /\\/\\\n  sense ]",
    blurb:
      "A speculative probe into ambient human-machine interaction: gaze, gesture, breath as input. Speculation as engineering at long range.",
    architecture: [
      ["Form",  "Spatial · ambient"],
      ["Controls", "Gaze · gesture · breath"],
      ["Scene", "Generative spatial graph"],
      ["Interface", "Calm · minimal HUD"],
    ],
    tradeoffs: [
      ["Decision",   "Ambient controls over explicit commands"],
      ["Tradeoff",   "Ambiguity for lower friction"],
      ["Constraint", "Latency budget under 80ms"],
    ],
    highlights: [
      ["Why",  "Speculation is engineering at long range."],
      ["Next", "Embodied build."],
    ],
  },
];
