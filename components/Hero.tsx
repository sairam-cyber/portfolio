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

  const wordVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
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

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row h-screen px-6 md:px-12 pt-32 md:pt-0">
        {/* Left Side */}
        <div className="w-full md:w-1/2 flex flex-col justify-center h-full">
          <motion.h2
            initial={{ opacity: 0, y: -20, letterSpacing: "-0.05em" }}
            animate={animateTrigger ? { opacity: 1, y: 0, letterSpacing: "0em" } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl md:text-3xl font-medium text-gray-600 mb-2"
          >
            Hi, I am
          </motion.h2>

          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-4 tracking-tight leading-tight text-black py-1"
            variants={containerVariants}
            initial="hidden"
            animate={animateTrigger ? "visible" : "hidden"}
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
            <motion.div variants={socialItemVariants}>
              <Magnetic>
                <a 
                  href="https://mail.google.com/mail/?extsrc=mailto&url=mailto%3Asairambebarta999%40gmail.com%3Fsubject%3DCollaboration%20Inquiry%26body%3DHi%20Sai%20Ram%2C%0A%0AI%20visited%20your%20portfolio%20and%20would%20love%20to%20connect%20regarding..." 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-300/80 text-black rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-sm flex items-center justify-center"
                >
                  <Mail size={22} />
                </a>
              </Magnetic>
            </motion.div>
            <motion.div variants={socialItemVariants}>
              <Magnetic>
                <a 
                  href="https://github.com/sairam-cyber" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="p-3 bg-gray-300/80 text-black rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-sm flex items-center justify-center"
                >
                  <Github size={22} />
                </a>
              </Magnetic>
            </motion.div>
            <motion.div variants={socialItemVariants}>
              <Magnetic>
                <a 
                  href="https://linkedin.com/in/sai-ram-bebarta" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="p-3 bg-gray-300/80 text-black rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-sm flex items-center justify-center"
                >
                  <Linkedin size={22} />
                </a>
              </Magnetic>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Side - Image */}
        <div className="w-full md:w-1/2 flex items-end justify-center h-full relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="h-[55vh] md:h-[90vh] aspect-[681/1024] relative overflow-hidden"
          >
            <Image
              src="/profile-pic.jpg"
              alt="Sai Ram Bebarta"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-top transition-all duration-700"
              priority
            />
            {/* Seamless edge blending to merge the photo background into the black page background */}
            <div className="absolute bottom-0 left-0 right-0 h-1/5 bg-gradient-to-t from-black to-transparent z-10" />
            <div className="absolute top-0 bottom-0 left-0 w-1/5 bg-gradient-to-r from-black to-transparent z-10" />
            <div className="absolute top-0 bottom-0 right-0 w-1/5 bg-gradient-to-l from-black to-transparent z-10" />
            <div className="absolute top-0 left-0 right-0 h-1/5 bg-gradient-to-b from-black to-transparent z-10" />
          </motion.div>
        </div>
      </div>


    </section>
  );
}
