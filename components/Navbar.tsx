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
      className="fixed top-4 md:top-8 left-1/2 -translate-x-1/2 z-50 w-[92%] md:w-[720px] bg-[#121212]/60 backdrop-blur-xl border border-gray-800/40 rounded-full px-4 py-3 md:px-8 md:py-4 flex justify-between items-center shadow-[0_8px_32px_rgba(0,0,0,0.4)] glass-noise"
    >
      {/* Subtle animated border glow */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(249,115,22,0.05) 0%, transparent 50%, rgba(249,115,22,0.03) 100%)",
        }}
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Home logo */}
      <motion.button
        onClick={() => onNavigate(0)}
        className="flex items-center mr-2 sm:mr-6 hover:opacity-85 transition-opacity cursor-pointer relative z-10"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <img
          src="/logo.png"
          alt="Sai Ram Bebarta Logo"
          className="h-7 sm:h-8 w-auto object-contain"
        />
      </motion.button>

      <div className="flex gap-3 sm:gap-8 text-[11px] sm:text-sm font-medium text-gray-300 relative z-10">
        {navItems.map((item, i) => {
          const isActive = activeSlide === item.index;
          return (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.08 }}
              onClick={() => onNavigate(item.index)}
              className="relative group py-1"
              whileHover={{ y: -1 }}
            >
              <span className={`transition-colors duration-200 ${
                isActive ? "text-orange-500" : "hover:text-orange-500"
              }`}>
                {item.label}
              </span>
              
              {/* Animated underline indicator */}
              {isActive && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-orange-500 to-orange-400 rounded-full"
                  style={{
                    boxShadow: "0 0 8px rgba(249,115,22,0.5)",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
              
              {/* Hover underline for non-active items */}
              {!isActive && (
                <span className="absolute -bottom-1 left-0 h-px bg-orange-500/50 transition-all duration-300 w-0 group-hover:w-full" />
              )}
            </motion.button>
          );
        })}
      </div>

      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9, duration: 0.4 }}
        onClick={() => onNavigate(3)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`relative px-3 sm:px-6 py-1 sm:py-2 rounded-full font-semibold text-[10px] sm:text-sm transition-all duration-300 z-10 overflow-hidden ${
          activeSlide === 3
            ? "bg-orange-500 text-white shadow-[0_0_20px_rgba(249,115,22,0.3)]"
            : "bg-white text-black hover:bg-orange-500 hover:text-white hover:shadow-[0_0_20px_rgba(249,115,22,0.3)]"
        }`}
      >
        {/* Button shimmer effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: "-100%" }}
          animate={{ x: "200%" }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
        />
        <span className="relative z-10">CONTACT ME</span>
      </motion.button>
    </motion.nav>
  );
}
