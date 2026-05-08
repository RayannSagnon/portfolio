import type { Variants } from "framer-motion";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1, ease: [0.2, 0.8, 0.05, 1] },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: [0.2, 0.7, 0.1, 1] } },
};

export const blurIn: Variants = {
  hidden: { opacity: 0, filter: "blur(20px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 1.6, ease: [0.2, 0.8, 0.05, 1] },
  },
};

export const stagger = (delay = 0.08): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: delay } },
});

export const EASE = [0.2, 0.7, 0.1, 1] as const;
export const EASE_LONG = [0.2, 0.8, 0.05, 1] as const;
