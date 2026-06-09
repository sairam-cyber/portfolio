"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <footer ref={ref} id="contact" className="bg-[#050505] py-16 border-t border-gray-900 text-center">
      <motion.h2
        className="text-3xl font-bold mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <span className="text-white">Let&apos;s </span>
        <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">Connect</span>
      </motion.h2>

      <motion.p
        className="text-gray-400 mb-8 max-w-lg mx-auto px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        I am currently looking for new opportunities in Full Stack Web Development and backend architecture. Whether you have a question or just want to say hi, my inbox is always open!
      </motion.p>

      <motion.a
        href="mailto:sairambebartall1@gmail.com"
        className="inline-block bg-orange-600 text-white px-8 py-4 rounded-full font-bold hover:bg-orange-500 hover:scale-105 transition-all shadow-lg shadow-orange-500/25 pulse-glow"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.97 }}
      >
        Send an Email
      </motion.a>

      <motion.div
        className="mt-16 text-gray-600 text-sm"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.4 }}
      >
        © {new Date().getFullYear()} Sai Ram Bebarta. Designed and built with Next.js.
      </motion.div>
    </footer>
  );
}
