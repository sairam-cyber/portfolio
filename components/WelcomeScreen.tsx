"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ── Particle burst on exit ── */
function ExitParticles({ active }: { active: boolean }) {
  const [particles] = useState(() =>
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 800,
      y: (Math.random() - 0.5) * 800,
      size: Math.random() * 4 + 1,
      delay: Math.random() * 0.3,
      duration: Math.random() * 0.8 + 0.4,
    }))
  );

  if (!active) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-orange-500"
          style={{ width: p.size, height: p.size }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{ x: p.x, y: p.y, opacity: 0, scale: 0 }}
          transition={{ duration: p.duration, delay: p.delay, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

/* ── Orbital loading ring ── */
function OrbitalRing() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <motion.div
        className="w-48 h-48 md:w-64 md:h-64 rounded-full border border-orange-500/10"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <motion.div
          className="absolute -top-1 left-1/2 w-2 h-2 rounded-full bg-orange-500/60"
          style={{ translateX: "-50%" }}
          animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
      <motion.div
        className="absolute w-32 h-32 md:w-44 md:h-44 rounded-full border border-orange-500/5"
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      >
        <motion.div
          className="absolute -bottom-1 left-1/2 w-1.5 h-1.5 rounded-full bg-orange-400/40"
          style={{ translateX: "-50%" }}
        />
      </motion.div>
    </div>
  );
}

export default function WelcomeScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"enter" | "exit">("enter");
  const [showParticles, setShowParticles] = useState(false);

  const dismiss = useCallback(() => {
    if (phase === "enter") {
      setShowParticles(true);
      setPhase("exit");
      setTimeout(onComplete, 900);
    }
  }, [phase, onComplete]);

  useEffect(() => {
    const t = setTimeout(() => {
      dismiss();
    }, 3500);
    return () => clearTimeout(t);
  }, [dismiss]);

  const welcomeText = "Welcome to my portfolio";
  const letters = welcomeText.split("");

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-[#050505] flex items-center justify-center cursor-pointer overflow-hidden"
      animate={phase === "exit" ? { y: "-100%" } : { y: 0 }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      onClick={dismiss}
    >
      {/* Ambient background glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full ambient-glow-1"
          style={{ background: "radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full ambient-glow-2"
          style={{ background: "radial-gradient(circle, rgba(249,115,22,0.06) 0%, transparent 70%)" }}
        />
      </div>

      <OrbitalRing />
      <ExitParticles active={showParticles} />

      <div className="text-center relative z-20">
        {/* Logo with glow */}
        <motion.div
          initial={{ scale: 0.3, opacity: 0, filter: "blur(20px)" }}
          animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center mb-8 relative"
        >
          <div className="relative">
            <img
              src="/logo.png"
              alt="Sai Ram Bebarta Logo"
              className="h-24 md:h-32 w-auto object-contain relative z-10"
            />
            {/* Glow behind logo */}
            <motion.div
              className="absolute inset-0 z-0"
              style={{ filter: "blur(30px)" }}
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="w-full h-full bg-orange-500/30 rounded-full" />
            </motion.div>
          </div>
        </motion.div>

        {/* Letter-by-letter text reveal */}
        <div className="flex justify-center flex-wrap gap-[2px]">
          {letters.map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 0.5, y: 0, filter: "blur(0px)" }}
              transition={{
                delay: 0.6 + i * 0.035,
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-gray-500 text-sm tracking-[0.3em] uppercase inline-block"
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </div>

        {/* Animated progress line */}
        <motion.div
          className="relative w-40 h-px mx-auto mt-8 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gray-800/30" />
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-orange-500 to-orange-400"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.8, duration: 2.2, ease: "easeInOut" }}
          />
          {/* Glowing tip */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-orange-500"
            style={{ filter: "blur(3px)" }}
            initial={{ left: "0%" }}
            animate={{ left: "100%" }}
            transition={{ delay: 0.8, duration: 2.2, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Click hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.4, 0.2, 0.4] }}
          transition={{ delay: 1.8, duration: 2, repeat: Infinity }}
          className="text-gray-600 text-xs mt-10 tracking-widest"
        >
          ⎯ click anywhere to skip ⎯
        </motion.p>
      </div>
    </motion.div>
  );
}
