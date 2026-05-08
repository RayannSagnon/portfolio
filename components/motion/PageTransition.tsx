"use client";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react";

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, filter: "blur(8px)" }}
        animate={{ opacity: 1, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.2, 0.8, 0.05, 1] } }}
        exit={{    opacity: 0, filter: "blur(8px)",  transition: { duration: 0.4, ease: [0.2, 0.7, 0.1, 1] } }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
