"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Github, Linkedin, Mail, User, ChevronDown } from "lucide-react";

/* ── Magnetic wrapper ── */
function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setPos({
      x: (e.clientX - r.left - r.width / 2) * 0.35,
      y: (e.clientY - r.top - r.height / 2) * 0.35,
    });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={pos}
      transition={{ type: "spring", stiffness: 250, damping: 12, mass: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

/* ── Floating particles ── */
function Particles() {
  const [dots, setDots] = useState<{ id: number; x: number; size: number; dur: number; delay: number }[]>([]);

  useEffect(() => {
    setDots(
      Array.from({ length: 28 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        size: Math.random() * 3 + 1,
        dur: Math.random() * 18 + 10,
        delay: Math.random() * 12,
      }))
    );
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      {dots.map((d) => (
        <div
          key={d.id}
          className="absolute rounded-full bg-orange-500/30"
          style={{
            left: `${d.x}%`,
            bottom: "-5%",
            width: d.size,
            height: d.size,
            animation: `float-up ${d.dur}s ${d.delay}s linear infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ── Typewriter hook ── */
function useTypewriter(text: string, speed = 60, startDelay = 1200) {
  const [display, setDisplay] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let i = 0;
      const timer = setInterval(() => {
        if (i <= text.length) {
          setDisplay(text.slice(0, i));
          i++;
        } else {
          setDone(true);
          clearInterval(timer);
        }
      }, speed);
      return () => clearInterval(timer);
    }, startDelay);
    return () => clearTimeout(timeout);
  }, [text, speed, startDelay]);

  return { display, done };
}

/* ── Main Hero ── */
export default function Hero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { display: subtitle, done: subtitleDone } = useTypewriter("Full Stack Developer");

  const nameFirst = ["Sai", "Ram"];
  const nameLast = "Bebarta";

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
  };

  const wordVariants = {
    hidden: { y: 80, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
  };

  return (
    <section ref={ref} className="relative min-h-screen w-full flex flex-col md:flex-row overflow-hidden bg-[#e6e6e6]">
      <Particles />
      <div className="absolute top-0 right-0 w-full h-full bg-black z-0 slant-bg shadow-2xl" />

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row h-screen px-6 md:px-12 pt-32 md:pt-0">
        {/* Left Side */}
        <div className="w-full md:w-1/2 flex flex-col justify-center h-full">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl md:text-3xl font-medium text-gray-600 mb-2"
          >
            Hi, I am
          </motion.h2>

          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-4 tracking-tight leading-tight text-black"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {nameFirst.map((word, i) => (
              <motion.span key={i} className="inline-block mr-4" variants={wordVariants}>
                {word}
              </motion.span>
            ))}
            <br />
            <motion.span className="inline-block text-black" variants={wordVariants}>
              {nameLast}
            </motion.span>
          </motion.h1>

          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.3 }}
            className="text-xl md:text-2xl text-gray-500 mb-10 font-medium"
          >
            <span className={!subtitleDone ? "typewriter-cursor pr-1" : ""}>
              {subtitle}
            </span>
          </motion.h3>

          <motion.div
            className="flex gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.8, duration: 0.5 }}
          >
            <Magnetic>
              <a href="mailto:sairambebartall1@gmail.com" className="p-3 bg-gray-300/80 text-black rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-sm flex items-center justify-center">
                <Mail size={22} />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="https://github.com/sairam-cyber" target="_blank" rel="noreferrer" className="p-3 bg-gray-300/80 text-black rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-sm flex items-center justify-center">
                <Github size={22} />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="https://linkedin.com/in/sai-ram-bebarta" target="_blank" rel="noreferrer" className="p-3 bg-gray-300/80 text-black rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-sm flex items-center justify-center">
                <Linkedin size={22} />
              </a>
            </Magnetic>
          </motion.div>
        </div>

        {/* Right Side - Image */}
        <div className="w-full md:w-1/2 flex items-center justify-center h-full relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="h-[45vh] md:h-[75vh] aspect-[681/1024] border border-gray-800 rounded-[2.5rem] bg-gradient-to-b from-[#151515] to-[#0a0a0a] relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          >
            <Image
              src="/profile-pic.jpg"
              alt="Sai Ram Bebarta"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-top filter grayscale hover:grayscale-0 transition-all duration-700"
              priority
            />
            {/* Soft ambient bottom overlay glow */}
            <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-black via-black/30 to-transparent z-10" />
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[120%] h-[40%] bg-orange-600/15 blur-3xl -z-10" />
          </motion.div>
        </div>
      </div>


    </section>
  );
}
