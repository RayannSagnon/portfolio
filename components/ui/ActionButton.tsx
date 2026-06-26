"use client";
import { type ButtonHTMLAttributes } from "react";
import { PINGS } from "@/lib/sound";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { label: string };

export function ActionButton({ label, onClick, className, ...rest }: Props) {
  return (
    <>
      <style>{`
        .action-button {
          background: transparent;
          border: 1px solid var(--line-strong);
          color: var(--fg);
          padding: 14px 22px;
          min-height: var(--touch-min);
          cursor: pointer;
          font-family: var(--font-jetbrains), monospace;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          touch-action: manipulation;
          transition:
            transform var(--press-duration, 0.25s) var(--ease),
            border-color 0.28s var(--ease),
            background 0.28s var(--ease),
            letter-spacing 0.28s var(--ease);
        }

        @media (hover: hover) and (pointer: fine) {
          .action-button:hover,
          .action-button:focus-visible {
            border-color: var(--accent);
            background: rgba(138, 42, 58, 0.08);
            letter-spacing: 0.22em;
            outline: none;
          }
        }

        @media (max-width: 860px) {
          .action-button {
            width: 100%;
            justify-content: center;
            font-size: 0.62rem;
            letter-spacing: 0.14em;
            padding: 0 1rem;
          }
        }
      `}</style>
      <button
        type="button"
        {...rest}
        className={["action-button", className].filter(Boolean).join(" ")}
        onPointerEnter={(event) => {
          if (event.pointerType === "mouse") PINGS.hover();
        }}
        onClick={(e) => {
          PINGS.click();
          onClick?.(e);
        }}
      >
        {label}
      </button>
    </>
  );
}
