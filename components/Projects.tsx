"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Folder, ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "Career Counselling Platform",
    tech: ["FastAPI", "Next.js", "RAG", "LangChain"],
    desc: "Built a document intelligence assistant utilizing FastAPI and Next.js. Developed automated data ingestion pipelines and a dedicated dashboard for generating context-aware insights.",
    link: "https://github.com/sairam-cyber/career_counselling",
    accent: "from-orange-500/20 to-amber-500/20",
  },
  {
    title: "Customer Churn Prediction",
    tech: ["React", "Node.js", "Python", "MongoDB"],
    desc: "Full-stack analytics platform. Engineered secure data pipelines with JWT authentication, real-time risk dashboards, and automated PDF reporting features.",
    link: "https://github.com/sairam-cyber/customer_churn_prediction_platform",
    accent: "from-blue-500/20 to-cyan-500/20",
  },
  {
    title: "RealTime Chatting",
    tech: ["MERN Stack", "Socket.io", "Firebase"],
    desc: "Modern instant messaging application featuring voice notes, secure file sharing, and smart replies. Secured with robust JWT authentication and structured for high concurrency.",
    link: "https://github.com/sairam-cyber/realtime-chat-app",
    accent: "from-purple-500/20 to-pink-500/20",
  },
  {
    title: "NLP Engine Employee Data",
    tech: ["Flask", "React", "PostgreSQL", "FAISS", "Gemini API"],
    desc: "Built an AI-powered NLP Query Engine using Flask, React, and PostgreSQL for employee data retrieval, implementing document ingestion, embeddings, semantic search (FAISS), and Gemini powered natural language-to-SQL querying.",
    link: "https://github.com/sairam-cyber/nlp-engine-employe-data",
    accent: "from-green-500/20 to-emerald-500/20",
  },
  {
    title: "Medlist: Health Care Platform",
    tech: ["Next.js", "MongoDB", "Gemini API"],
    desc: "Comprehensive healthcare solution tailored for efficient doctor discovery and automated appointment scheduling, complete with an intelligent integrated chatbot.",
    link: "https://github.com/sairam-cyber/medlist-frontend",
    accent: "from-rose-500/20 to-orange-500/20",
  },
];

/* ── 3D Tilt Card ── */
function TiltCard({ 
  children, 
  className = "" 
}: { 
  children: React.ReactNode; 
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 25 });
  const glowX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), { stiffness: 200, damping: 25 });
  const glowY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), { stiffness: 200, damping: 25 });

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
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 800,
      }}
      className={className}
    >
      {/* Dynamic spotlight effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, rgba(249,115,22,0.08) 0%, transparent 60%)`
          ),
        }}
      />
      {children}
    </motion.div>
  );
}

/* ── Animated counter ── */
function AnimatedCounter({ value, isInView }: { value: number; isInView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTimestamp: number | null = null;
    const duration = 1500;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setCount(Math.floor(eased * value));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [value, isInView]);

  return <span>{count}</span>;
}

export default function Projects() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section ref={sectionRef} className="min-h-screen bg-[#0a0a0a] text-white px-6 md:px-12 flex items-start md:items-center relative overflow-hidden">
      {/* Background ambient effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(249,115,22,0.03) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.2, 1], x: [0, -30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(249,115,22,0.03) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.3, 1], y: [0, -40, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-7xl mx-auto w-full pt-32 pb-24 md:py-24 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
          >
            {["Featured", "Projects"].map((word, i) => (
              <motion.span
                key={i}
                className={`inline-block ${i === 1 ? "text-orange-500 ml-3" : ""}`}
                initial={{ y: 40, opacity: 0, filter: "blur(8px)" }}
                animate={isInView ? { y: 0, opacity: 1, filter: "blur(0px)" } : {}}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                {word}
              </motion.span>
            ))}
            <motion.div
              className="mx-auto mt-4 h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent rounded-full"
              initial={{ width: 0, opacity: 0 }}
              animate={isInView ? { width: 120, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
          </motion.h2>

          {/* Project count stats */}
          <motion.div
            className="flex items-center justify-center gap-8 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500">
                <AnimatedCounter value={projects.length} isInView={isInView} />+
              </div>
              <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">Projects</div>
            </div>
            <div className="w-px h-8 bg-gray-800" />
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500">
                <AnimatedCounter value={12} isInView={isInView} />+
              </div>
              <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">Technologies</div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ 
                type: "spring", 
                stiffness: 70, 
                damping: 15, 
                delay: 0.2 + idx * 0.1 
              }}
              className="group"
            >
              <TiltCard className="relative shimmer-card bg-[#151515]/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-800 hover:border-orange-500/30 hover:shadow-[0_15px_35px_rgba(249,115,22,0.12)] flex flex-col h-full transition-all duration-500">
                {/* Top gradient accent */}
                <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${project.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Project number & folder icon */}
                <div className="flex items-center justify-between mb-6">
                  <motion.div
                    className="p-3 rounded-xl bg-black/50 border border-gray-800/50 group-hover:border-orange-500/30 group-hover:shadow-[0_0_15px_rgba(249,115,22,0.1)] transition-all duration-300"
                    whileHover={{ rotate: -10, scale: 1.1 }}
                  >
                    <Folder size={22} className="text-orange-500" />
                  </motion.div>
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-500 hover:text-orange-500 transition-colors"
                    whileHover={{ scale: 1.2, rotate: 45 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ArrowUpRight size={20} />
                  </motion.a>
                </div>

                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-orange-400 transition-colors duration-300">{project.title}</h3>
                <p className="text-gray-400 mb-6 flex-grow leading-relaxed text-sm">{project.desc}</p>
                
                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs text-gray-500 font-mono hover:text-orange-400 transition-colors"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Bottom link */}
                <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-orange-500 transition-all mt-6 pt-4 border-t border-gray-800/50 cursor-pointer group/link"
                  whileHover={{ x: 4 }}
                >
                  <ExternalLink size={14} />
                  <span>View Source</span>
                  <motion.span
                    className="opacity-0 group-hover/link:opacity-100 transition-opacity"
                    initial={{ x: -5 }}
                    animate={{ x: 0 }}
                  >
                    →
                  </motion.span>
                </motion.a>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
