"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import WelcomeScreen from "@/components/WelcomeScreen";

const SLIDE_COUNT = 4;
const slideLabels = ["Home", "About", "Projects", "Contact"];

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <>
      <CustomCursor />
      <div className="grain-overlay" />

      {/* Welcome Intro */}
      <AnimatePresence>
        {showWelcome && (
          <WelcomeScreen onComplete={() => setShowWelcome(false)} />
        )}
      </AnimatePresence>

      <Navbar onNavigate={setActiveSlide} activeSlide={activeSlide} />

      {/* Horizontal Slider */}
      <div className="h-screen w-screen overflow-hidden bg-[#050505]">
        <motion.div
          className="flex h-full"
          animate={{ x: `${-activeSlide * 100}vw` }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="min-w-[100vw] h-screen overflow-y-auto"><Hero isReady={!showWelcome} /></div>
          <div className="min-w-[100vw] h-screen overflow-y-auto"><About /></div>
          <div className="min-w-[100vw] h-screen overflow-y-auto"><Projects /></div>
          <div className="min-w-[100vw] h-screen overflow-y-auto"><Footer /></div>
        </motion.div>
      </div>

      {/* Enhanced Slide Indicators */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3">
        {Array.from({ length: SLIDE_COUNT }, (_, i) => (
          <motion.button
            key={i}
            onClick={() => setActiveSlide(i)}
            className="relative group flex flex-col items-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {/* Label tooltip on hover */}
            <motion.span
              className="absolute -top-7 text-[10px] font-mono text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
              initial={false}
            >
              {slideLabels[i]}
            </motion.span>
            
            {/* Dot / pill indicator */}
            <motion.div
              className="rounded-full transition-all duration-300"
              animate={{
                width: activeSlide === i ? 32 : 8,
                height: 8,
                backgroundColor: activeSlide === i ? "#f97316" : "#4b5563",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              style={{
                boxShadow: activeSlide === i ? "0 0 12px rgba(249,115,22,0.4)" : "none",
              }}
            />
          </motion.button>
        ))}
      </div>

      {/* Slide counter (bottom-right) */}
      <motion.div
        className="fixed bottom-8 right-8 z-50 font-mono text-xs text-gray-600 hidden md:flex items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.span
          key={activeSlide}
          className="text-orange-500 text-sm font-bold"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          0{activeSlide + 1}
        </motion.span>
        <span>/</span>
        <span>0{SLIDE_COUNT}</span>
      </motion.div>
    </>
  );
}
