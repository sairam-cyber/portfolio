"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

export default function Home() {
  return (
    <>
      <CustomCursor />

      {/* Film Grain Overlay */}
      <div className="grain-overlay" />

      <motion.main
        className="min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Decorative logo top left */}
        <div className="absolute top-12 left-12 md:left-24 font-bold text-3xl tracking-tighter z-50 text-black">
          SB<span className="text-orange-500">.</span>
        </div>

        <Navbar />
        <Hero />
        <Experience />
        <Skills />
        <Projects />
        <Footer />
      </motion.main>
    </>
  );
}
