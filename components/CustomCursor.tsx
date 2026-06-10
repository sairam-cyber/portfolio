"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const trailRef = useRef<{ x: number; y: number }[]>([]);
  const rafRef = useRef<number>(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smoother, more fluid spring for the outer glow
  const springConfig = { damping: 22, stiffness: 180, mass: 0.8 };
  const glowX = useSpring(cursorX, springConfig);
  const glowY = useSpring(cursorY, springConfig);

  // Even softer spring for the outermost aura
  const auraConfig = { damping: 30, stiffness: 100, mass: 1.2 };
  const auraX = useSpring(cursorX, auraConfig);
  const auraY = useSpring(cursorY, auraConfig);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Trail particle canvas animation
  const drawTrail = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const trail = trailRef.current;
    for (let i = 0; i < trail.length; i++) {
      const point = trail[i];
      const alpha = (i / trail.length) * 0.35;
      const size = (i / trail.length) * 3;

      ctx.beginPath();
      ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(249, 115, 22, ${alpha})`;
      ctx.fill();
    }

    // Fade out old trail points
    if (trail.length > 20) {
      trailRef.current = trail.slice(-20);
    }

    rafRef.current = requestAnimationFrame(drawTrail);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    rafRef.current = requestAnimationFrame(drawTrail);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isMounted, drawTrail]);

  useEffect(() => {
    if (!isMounted) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      trailRef.current.push({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a, button, [role='button'], input, textarea, select")) {
        setIsHovering(true);
      }
    };

    const onOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a, button, [role='button'], input, textarea, select")) {
        setIsHovering(false);
      }
    };

    const onDown = () => setIsClicking(true);
    const onUp = () => setIsClicking(false);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", () => setIsVisible(false));
    document.addEventListener("mouseenter", () => setIsVisible(true));

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
    };
  }, [isMounted, isVisible, cursorX, cursorY]);

  if (!isMounted) return null;

  return (
    <>
      {/* Trail canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9996]"
        style={{ width: "100vw", height: "100vh" }}
      />

      {/* Core dot — sharp, snappy */}
      <motion.div
        className="fixed pointer-events-none z-[9999]"
        style={{
          left: cursorX,
          top: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isClicking ? 0.6 : isHovering ? 0.8 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ scale: { type: "spring", stiffness: 500, damping: 20 } }}
      >
        <div
          className="rounded-full"
          style={{
            width: 8,
            height: 8,
            background: "radial-gradient(circle, #fff 0%, #f97316 60%, transparent 100%)",
            boxShadow: "0 0 8px 2px rgba(249,115,22,0.6)",
          }}
        />
      </motion.div>

      {/* Inner ring — fluid morphing */}
      <motion.div
        className="fixed pointer-events-none z-[9998]"
        style={{
          left: glowX,
          top: glowY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isClicking ? 0.5 : isHovering ? 1.8 : 1,
          opacity: isVisible ? 1 : 0,
          borderRadius: isHovering ? "40%" : "50%",
          rotate: isHovering ? 45 : 0,
        }}
        transition={{
          scale: { type: "spring", stiffness: 300, damping: 18 },
          borderRadius: { duration: 0.4 },
          rotate: { duration: 0.6, ease: "easeInOut" },
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "inherit",
            border: isHovering
              ? "1.5px solid rgba(249,115,22,0.8)"
              : "1.5px solid rgba(249,115,22,0.35)",
            background: isHovering
              ? "radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 70%)"
              : "transparent",
            transition: "border 0.3s, background 0.3s",
          }}
        />
      </motion.div>

      {/* Outer aura — ambient glow */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="fixed pointer-events-none z-[9997]"
            style={{
              left: auraX,
              top: auraY,
              translateX: "-50%",
              translateY: "-50%",
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: isHovering ? 0.5 : 0.2,
              scale: isClicking ? 0.4 : isHovering ? 2.5 : 1,
            }}
            exit={{ opacity: 0, scale: 0.3 }}
            transition={{
              opacity: { duration: 0.4 },
              scale: { type: "spring", stiffness: 150, damping: 20 },
            }}
          >
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                background: `radial-gradient(circle, rgba(249,115,22,${isHovering ? 0.15 : 0.08}) 0%, transparent 70%)`,
                filter: "blur(4px)",
                transition: "background 0.3s",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click ripple effect */}
      <AnimatePresence>
        {isClicking && isVisible && (
          <motion.div
            key="ripple"
            className="fixed pointer-events-none z-[9997]"
            style={{
              left: cursorX,
              top: cursorY,
              translateX: "-50%",
              translateY: "-50%",
            }}
            initial={{ scale: 0.2, opacity: 0.6 }}
            animate={{ scale: 3, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                border: "1px solid rgba(249,115,22,0.4)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
