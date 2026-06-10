"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { Github, Linkedin, Mail } from "lucide-react";

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

/* ── Enhanced floating particles ── */
function Particles() {
  const [dots, setDots] = useState<{ id: number; x: number; size: number; dur: number; delay: number; opacity: number }[]>([]);

  useEffect(() => {
    setDots(
      Array.from({ length: 35 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        size: Math.random() * 3 + 1,
        dur: Math.random() * 18 + 10,
        delay: Math.random() * 12,
        opacity: Math.random() * 0.4 + 0.1,
      }))
    );
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      {dots.map((d) => (
        <div
          key={d.id}
          className="absolute rounded-full bg-orange-500"
          style={{
            left: `${d.x}%`,
            bottom: "-5%",
            width: d.size,
            height: d.size,
            opacity: d.opacity,
            animation: `float-up ${d.dur}s ${d.delay}s linear infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ── Typewriter hook ── */
function useTypewriter(text: string, speed = 60, startDelay = 1200, trigger = true) {
  const [display, setDisplay] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!trigger) return;
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
  }, [text, speed, startDelay, trigger]);

  return { display, done };
}

/* ── 3D Tilt Image Component ── */
function TiltImage({ src, alt, isInView }: { src: string; alt: string; isInView: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 20 });

  const handleMouse = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [mouseX, mouseY]);

  const handleLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
      }}
      className="h-[45vh] md:h-[90vh] aspect-[681/1024] relative overflow-hidden"
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover object-top transition-all duration-700"
        priority
      />
      {/* Seamless edge blending */}
      <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
      <div className="absolute top-0 bottom-0 left-0 w-1/5 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="absolute top-0 bottom-0 right-0 w-1/5 bg-gradient-to-l from-black to-transparent z-10" />
      <div className="absolute top-0 left-0 right-0 h-1/5 bg-gradient-to-b from-black to-transparent z-10" />

      {/* Hover glow overlay */}
      <motion.div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          background: "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(249,115,22,0.08) 0%, transparent 60%)",
        }}
      />
    </motion.div>
  );
}

/* ── Status badge ── */
function StatusBadge({ isReady }: { isReady: boolean }) {
  if (!isReady) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2.5, duration: 0.5 }}
      className="flex items-center gap-2 mb-6"
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
      </span>
      <span className="text-gray-500 text-xs tracking-wider uppercase font-mono">Available for work</span>
    </motion.div>
  );
}

/* ── Main Hero ── */
export default function Hero({ isReady = true }: { isReady?: boolean }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  // Wait to start typewriter until welcome screen is gone
  const { display: subtitle, done: subtitleDone } = useTypewriter("Full Stack Developer", 60, 1000, isReady);

  const nameFirst = ["Sai", "Ram"];
  const nameLast = "Bebarta";

  const containerVariants = {
    hidden: {},
    visible: { 
      transition: { 
        staggerChildren: 0.12, 
        delayChildren: 0.4 
      } 
    },
  };

  // Each letter of a word pops in with blur
  const wordVariants = {
    hidden: { y: 50, opacity: 0, filter: "blur(10px)" },
    visible: { 
      y: 0, 
      opacity: 1,
      filter: "blur(0px)",
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] as const
      } 
    },
  };

  const socialContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 1.8
      }
    }
  };

  const socialItemVariants = {
    hidden: { scale: 0.5, opacity: 0, y: 20 },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 260,
        damping: 15
      }
    }
  };

  const animateTrigger = isReady && isInView;

  return (
    <section ref={ref} className="relative min-h-screen w-full flex flex-col md:flex-row overflow-hidden bg-[#e6e6e6]">
      <Particles />
      <div className="absolute top-0 right-0 w-full h-full bg-black z-0 slant-bg shadow-2xl" />

      {/* Ambient orange glow on the dark side */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none z-[2]"
        style={{
          background: "radial-gradient(circle, rgba(249,115,22,0.04) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row min-h-screen md:h-screen px-6 md:px-12 pt-28 md:pt-0 pb-12 md:pb-0">
        {/* Left Side */}
        <div className="w-full md:w-1/2 flex flex-col justify-center min-h-[45vh] md:h-full">
          <StatusBadge isReady={isReady} />
          
          <motion.h2
            initial={{ opacity: 0, y: -20, letterSpacing: "-0.05em" }}
            animate={animateTrigger ? { opacity: 1, y: 0, letterSpacing: "0.05em" } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl sm:text-2xl md:text-3xl font-medium text-gray-600 mb-2"
          >
            Hi, I am
          </motion.h2>

          <motion.h1
            className="text-4xl sm:text-6xl md:text-8xl font-bold mb-4 tracking-tight leading-tight text-black py-1"
            variants={containerVariants}
            initial="hidden"
            animate={animateTrigger ? "visible" : "hidden"}
          >
            {nameFirst.map((word, i) => (
              <motion.span key={i} className="inline-block mr-3 sm:mr-4" variants={wordVariants}>
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
            animate={animateTrigger ? { opacity: 1 } : {}}
            className="text-xl md:text-2xl text-gray-500 mb-10 font-medium h-[2rem]"
          >
            <span className={!subtitleDone ? "typewriter-cursor pr-1" : ""}>
              {subtitle}
            </span>
          </motion.h3>

          <motion.div
            className="flex gap-4"
            variants={socialContainerVariants}
            initial="hidden"
            animate={animateTrigger ? "visible" : "hidden"}
          >
            {[
              { 
                href: "https://mail.google.com/mail/?extsrc=mailto&url=mailto%3Asairambebarta999%40gmail.com%3Fsubject%3DCollaboration%20Inquiry%26body%3DHi%20Sai%20Ram%2C%0A%0AI%20visited%20your%20portfolio%20and%20would%20love%20to%20connect%20regarding...",
                Icon: Mail, 
                label: "Email" 
              },
              { href: "https://github.com/sairam-cyber", Icon: Github, label: "GitHub" },
              { href: "https://linkedin.com/in/sai-ram-bebarta", Icon: Linkedin, label: "LinkedIn" },
            ].map(({ href, Icon, label }) => (
              <motion.div key={label} variants={socialItemVariants}>
                <Magnetic>
                  <motion.a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative p-3 bg-gray-300/80 text-black rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-sm flex items-center justify-center overflow-hidden group"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon size={22} className="relative z-10" />
                    {/* Hover ripple */}
                    <motion.div
                      className="absolute inset-0 bg-orange-500 rounded-lg"
                      initial={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 1.5, opacity: 0.15 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                </Magnetic>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={animateTrigger ? { opacity: 1 } : {}}
            transition={{ delay: 3, duration: 0.5 }}
            className="hidden md:flex items-center gap-3 mt-16"
          >
            <motion.div
              className="w-5 h-8 rounded-full border border-gray-400/50 flex justify-center pt-1"
              animate={{ borderColor: ["rgba(156,163,175,0.3)", "rgba(249,115,22,0.5)", "rgba(156,163,175,0.3)"] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <motion.div
                className="w-1 h-2 rounded-full bg-gray-500"
                animate={{ y: [0, 6, 0], opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
            <span className="text-gray-500 text-xs tracking-wider font-mono uppercase">Scroll to explore</span>
          </motion.div>
        </div>

        {/* Right Side - Image with 3D tilt */}
        <div className="w-full md:w-1/2 flex items-end justify-center min-h-[40vh] md:h-full relative mt-8 md:mt-0">
          <TiltImage src="/profile-pic.jpg" alt="Sai Ram Bebarta" isInView={isInView} />
        </div>
      </div>
    </section>
  );
}
