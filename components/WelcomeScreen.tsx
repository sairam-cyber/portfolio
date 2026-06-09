"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function WelcomeScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"enter" | "exit">("enter");

  useEffect(() => {
    const t = setTimeout(() => {
      setPhase("exit");
      setTimeout(onComplete, 800);
    }, 3000);
    return () => clearTimeout(t);
  }, [onComplete]);

  const dismiss = () => {
    if (phase === "enter") {
      setPhase("exit");
      setTimeout(onComplete, 800);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-[#050505] flex items-center justify-center cursor-pointer"
      animate={phase === "exit" ? { y: "-100%" } : { y: 0 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      onClick={dismiss}
    >
      <div className="text-center">
        <motion.h1
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-7xl md:text-9xl font-bold text-white mb-4"
        >
          SB<span className="text-orange-500">.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-gray-500 text-sm tracking-[0.3em] uppercase"
        >
          Welcome to my portfolio
        </motion.p>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.8, duration: 1.8, ease: "easeInOut" }}
          className="w-32 h-px bg-orange-500 mx-auto mt-6 origin-left"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 1.5 }}
          className="text-gray-600 text-xs mt-8"
        >
          click anywhere to continue
        </motion.p>
      </div>
    </motion.div>
  );
}
