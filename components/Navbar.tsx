"use client";

import { motion } from "framer-motion";

const navItems = [
  { label: "Hello", index: 0 },
  { label: "About", index: 1 },
  { label: "Projects", index: 2 },
];

interface NavbarProps {
  onNavigate: (index: number) => void;
  activeSlide: number;
}

export default function Navbar({ onNavigate, activeSlide }: NavbarProps) {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-[90%] md:w-[720px] bg-[#121212]/60 backdrop-blur-xl border border-gray-800/40 rounded-full px-8 py-4 flex justify-between items-center shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
    >
      {/* Home logo */}
      <button
        onClick={() => onNavigate(0)}
        className="font-bold text-base sm:text-lg tracking-tighter text-white hover:text-orange-500 transition-colors mr-2 sm:mr-6"
      >
        SB<span className="text-orange-500">.</span>
      </button>

      <div className="flex gap-4 sm:gap-8 text-xs sm:text-sm font-medium text-gray-300">
        {navItems.map((item, i) => (
          <motion.button
            key={item.label}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + i * 0.08 }}
            onClick={() => onNavigate(item.index)}
            className={`relative group transition-colors duration-200 ${
              activeSlide === item.index ? "text-orange-500" : "hover:text-orange-500"
            }`}
          >
            {item.label}
            <span
              className={`absolute -bottom-1 left-0 h-px bg-orange-500 transition-all duration-300 ${
                activeSlide === item.index ? "w-full" : "w-0 group-hover:w-full"
              }`}
            />
          </motion.button>
        ))}
      </div>

      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9, duration: 0.4 }}
        onClick={() => onNavigate(3)}
        className={`px-4 sm:px-6 py-1.5 sm:py-2 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 ${
          activeSlide === 3
            ? "bg-orange-500 text-white shadow-[0_0_20px_rgba(249,115,22,0.3)]"
            : "bg-white text-black hover:bg-orange-500 hover:text-white hover:shadow-[0_0_20px_rgba(249,115,22,0.3)]"
        }`}
      >
        CONTACT ME
      </motion.button>
    </motion.nav>
  );
}
