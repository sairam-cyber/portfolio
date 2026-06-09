"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-[90%] md:w-[700px] bg-[#121212]/60 backdrop-blur-xl border border-gray-800/40 rounded-full px-8 py-4 flex justify-between items-center shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
    >
      <div className="flex gap-8 text-sm font-medium text-gray-300">
        {["About me", "Skills", "Portfolio"].map((item, i) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + i * 0.08 }}
          >
            <Link
              href={`#${item === "About me" ? "about" : item.toLowerCase()}`}
              className="hover:text-orange-500 transition-colors duration-200 relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-orange-500 transition-all duration-300 group-hover:w-full" />
            </Link>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9, duration: 0.4 }}
      >
        <Link
          href="#contact"
          className="bg-white text-black px-6 py-2 rounded-full font-semibold text-sm hover:bg-orange-500 hover:text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(249,115,22,0.3)]"
        >
          CONTACT ME
        </Link>
      </motion.div>
    </motion.nav>
  );
}
