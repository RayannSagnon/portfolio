import { useId } from "react";

/**
 * Side profile of a race kart in the livery: low chassis, fat rear tyres, driver sat upright
 * between the wheels. Wheels, body and exhaust are tagged so the intro can drive them.
 * Geometry is in a 240 x 112 box; the ground line is y = 108.
 */
export const KART_BOX = { w: 240, h: 112, ground: 108 };
export const KART_WHEELS = [
  { id: "rear", cx: 52, cy: 86, r: 22, rim: 12 },
  { id: "front", cx: 194, cy: 90, r: 18, rim: 9.5 },
] as const;

export function KartSvg({ className }: { className?: string }) {
  // Unique gradient ids: two karts can share a page, and a hidden one must not take the defs with it.
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const id = (name: string) => `${name}${uid}`;
  const ref = (name: string) => `url(#${name}${uid})`;
  return (
    <svg viewBox={`0 0 ${KART_BOX.w} ${KART_BOX.h}`} className={className} aria-hidden="true">
      <defs>
        <linearGradient id={id("kTyre")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2c2c2c" />
          <stop offset="1" stopColor="#0b0b0b" />
        </linearGradient>
        <radialGradient id={id("kRim")} cx="0.4" cy="0.35" r="0.75">
          <stop offset="0" stopColor="#f2f2ee" />
          <stop offset="1" stopColor="#8f9294" />
        </radialGradient>
        <linearGradient id={id("kPod")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#b0001f" />
          <stop offset="1" stopColor="#6d0014" />
        </linearGradient>
        <linearGradient id={id("kWhite")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#cfcfca" />
        </linearGradient>
        <radialGradient id={id("kHelmet")} cx="0.38" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#c4c4bf" />
        </radialGradient>
        <linearGradient id={id("kSuit")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#1e1e1e" />
          <stop offset="1" stopColor="#0d0d0d" />
        </linearGradient>
      </defs>

      <ellipse data-k="shadow" cx="124" cy="108.5" rx="108" ry="4" fill="#000" opacity="0.4" />

      <g data-k="body">
        {/* exhaust, from the engine back past the rear bumper */}
        <path d="M80 72 Q60 74 44 66 L30 62" fill="none" stroke="#8a8d8f" strokeWidth="4" strokeLinecap="round" />
        <circle cx="29" cy="61.5" r="3" fill="#55585a" />
        <g data-k="puffs">
          <circle cx="26" cy="61" r="4" fill="#c9c9c3" />
          <circle cx="26" cy="61" r="4" fill="#c9c9c3" />
          <circle cx="26" cy="61" r="4" fill="#c9c9c3" />
        </g>

        {/* rear bumper and chassis rail */}
        <rect x="12" y="78" width="14" height="20" rx="4" fill="#55585a" />
        <path d="M26 88H40M30 95L206 97" stroke="#6b6e70" strokeWidth="3.5" strokeLinecap="round" />

        {/* engine block on the right side */}
        <rect x="62" y="60" width="26" height="20" rx="3" fill="#3a3d3f" />
        <path d="M66 64H84M66 68H84M66 72H84" stroke="#55585a" strokeWidth="1.6" />
        <circle cx="90" cy="64" r="4" fill="#6b6e70" />

        {/* seat shell */}
        <path d="M84 84Q76 58 86 42L96 44Q88 60 94 84Z" fill="#1a1a1a" />

        {/* legs reach forward to the pedals */}
        <path d="M100 80L150 70L154 79L104 89Z" fill={ref("kSuit")} />
        <path d="M150 70L180 80L178 88L151 79Z" fill={ref("kSuit")} />

        {/* torso in the race suit, white piping down the side */}
        <path d="M92 86Q87 62 92 44Q99 37 109 42L113 60Q113 77 109 87Z" fill={ref("kSuit")} />
        <path d="M96 47Q92 65 97 84" fill="none" stroke="#f5f5f2" strokeWidth="2.6" />

        {/* arm out to the wheel */}
        <path d="M104 50L126 65" stroke="#151515" strokeWidth="9" strokeLinecap="round" />
        <path d="M126 65L148 53" stroke="#151515" strokeWidth="8" strokeLinecap="round" />
        <circle cx="150" cy="52" r="4.8" fill="#8f001a" />

        {/* steering wheel and column */}
        <path d="M166 84L153 58" stroke="#6b6e70" strokeWidth="3" strokeLinecap="round" />
        <ellipse cx="152" cy="52" rx="3.2" ry="10.5" transform="rotate(-22 152 52)" fill="none" stroke="#1a1a1a" strokeWidth="3.6" />

        {/* side pod in livery garnet with the RS number roundel and an ink cut */}
        <path d="M76 80L170 80L176 98L72 98Q68 96 70 90Z" fill={ref("kPod")} />
        <path d="M78 81.5H168" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="1.4" />
        <path d="M136 80L145 80L152 98L143 98Z" fill="#111" />
        <circle cx="114" cy="89" r="7.6" fill="#f5f5f2" stroke="#111" strokeWidth="1.4" />
        <text x="114" y="91.6" textAnchor="middle" fontSize="7.4" fontWeight="900" fontStyle="italic" fill="#111">
          RS
        </text>

        {/* nassau panel in front of the knees */}
        <path d="M160 55Q166 52 171 56L178 86L165 88Z" fill={ref("kWhite")} stroke="#111" strokeWidth="1" />

        {/* front fairing */}
        <path d="M212 84L226 84Q237 86 238 97L238 100L212 100Z" fill={ref("kWhite")} stroke="#111" strokeWidth="1" />
        <path d="M214 96H237" stroke="#8f001a" strokeWidth="3" />

        {/* helmet: white shell, garnet band, ink visor with a glint, neck brace */}
        <path d="M92 42Q102 49 113 42" fill="none" stroke="#8f001a" strokeWidth="4.5" strokeLinecap="round" />
        <circle cx="102" cy="27" r="17" fill={ref("kHelmet")} />
        <path d="M86 23Q102 12 118 21" fill="none" stroke="#8f001a" strokeWidth="5" />
        <path d="M104 23L120 24Q122 33 117 37L104 35Z" fill="#111" />
        <path d="M108 26.5L117 27" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="1.6" strokeLinecap="round" />
      </g>

      {KART_WHEELS.map((w) => (
        <g key={w.id}>
          <circle cx={w.cx} cy={w.cy} r={w.r} fill={ref("kTyre")} />
          <circle cx={w.cx} cy={w.cy} r={w.r - 2.5} fill="none" stroke="#3a3a3a" strokeWidth="1" />
          <circle cx={w.cx} cy={w.cy} r={w.rim} fill={ref("kRim")} />
          <g data-k={`spokes-${w.id}`}>
            {[0, 72, 144, 216, 288].map((a) => (
              <path
                key={a}
                d={`M${w.cx} ${w.cy}V${w.cy - w.rim + 1.5}`}
                transform={`rotate(${a} ${w.cx} ${w.cy})`}
                stroke="#6b6e70"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            ))}
            {/* a tread mark on the sidewall so the spin reads even when spokes blur */}
            <path d={`M${w.cx} ${w.cy - w.r + 1}v4`} stroke="#5a5a5a" strokeWidth="2.4" strokeLinecap="round" />
          </g>
          <circle cx={w.cx} cy={w.cy} r="3.4" fill="#8f001a" />
        </g>
      ))}
    </svg>
  );
}
