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

      {/* Slide Indicators */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex gap-2">
        {Array.from({ length: SLIDE_COUNT }, (_, i) => (
          <button
            key={i}
            onClick={() => setActiveSlide(i)}
            className={`rounded-full transition-all duration-300 ${
              activeSlide === i
                ? "w-8 h-2 bg-orange-500"
                : "w-2 h-2 bg-gray-600 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </>
  );
}
