"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 18, stiffness: 250, mass: 0.5 };
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a, button, [role='button']")) {
        setIsHovering(true);
      }
    };

    const onOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a, button, [role='button']")) {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    document.addEventListener("mouseleave", () => setIsVisible(false));
    document.addEventListener("mouseenter", () => setIsVisible(true));

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, [isMounted, isVisible, cursorX, cursorY]);

  if (!isMounted) return null;

  return (
    <>
      <motion.div
        className="fixed w-2 h-2 bg-orange-500 rounded-full pointer-events-none z-[9999]"
        style={{ left: cursorX, top: cursorY, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: isHovering ? 0.5 : 1, opacity: isVisible ? 1 : 0 }}
        transition={{ scale: { duration: 0.15 } }}
      />
      <motion.div
        className="fixed w-10 h-10 border-2 border-orange-500/50 rounded-full pointer-events-none z-[9998] mix-blend-difference"
        style={{ left: ringX, top: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: isHovering ? 2 : 1, opacity: isVisible ? 1 : 0 }}
        transition={{ scale: { duration: 0.2 } }}
      />
    </>
  );
}
