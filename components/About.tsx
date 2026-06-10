"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Briefcase, GraduationCap, Code2, Database, Layout, Terminal,
  Award, BookOpen, Wrench, ShieldCheck, Sparkles, Brain, Trophy,
} from "lucide-react";

/* ── Tab definitions ── */
const tabs = [
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "skills", label: "Skills", icon: Wrench },
  { id: "certifications", label: "Certifications", icon: Award },
];

/* ── Animated section header ── */
function SectionHeader({ isInView }: { isInView: boolean }) {
  const words = ["About", "Me"];
  return (
    <motion.h2
      className="text-4xl md:text-5xl font-bold mb-12 text-center"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
    >
      {words.map((word, i) => (
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
      {/* Animated underline */}
      <motion.div
        className="mx-auto mt-4 h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent rounded-full"
        initial={{ width: 0, opacity: 0 }}
        animate={isInView ? { width: 120, opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
      />
    </motion.h2>
  );
}

/* ════════════════════════════════════════════
   EXPERIENCE TAB
   ════════════════════════════════════════════ */
function ExperienceTab() {
  const items = [
    {
      title: "Online Electronics Store (Full Stack)",
      org: "Rooman Technologies Pvt. Ltd. • Jan 2026 - Apr 2026",
      desc: "Developed a full-stack electronic e-commerce platform. Built features including user authentication, shopping cart, secure checkout, and database integration using modern web technologies.",
    },
    {
      title: "Summer Research Intern",
      org: "NIT Rourkela • May 2025 - July 2025",
      desc: "Contributed to software optimization processes. Improved system architecture and ranking metrics through advanced feature engineering and data processing techniques.",
    },
  ];

  return (
    <div className="relative pl-6 md:pl-8 ml-2 md:ml-4">
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-800/50" />
      <motion.div
        className="absolute left-0 top-0 w-px bg-gradient-to-b from-orange-500 to-orange-500/20"
        initial={{ height: 0 }}
        animate={{ height: "100%" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
      <div className="space-y-6">
        {items.map((item, i) => (
          <motion.div
            key={i}
            className="relative p-4 md:p-6 bg-[#111]/30 border border-gray-900 rounded-2xl hover:bg-[#111]/70 hover:border-orange-500/30 hover:shadow-[0_4px_20px_rgba(249,115,22,0.05)] transition-all duration-300 backdrop-blur-sm"
            initial={{ opacity: 0, x: -40, filter: "blur(4px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay: 0.15 + i * 0.2, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ 
              x: 8,
              transition: { duration: 0.2 }
            }}
          >
            <motion.div
              className="absolute left-0 -translate-x-1/2 top-6 bg-black border-2 border-orange-500 p-1.5 md:p-2 rounded-full z-10"
              initial={{ scale: 0, rotate: -180, x: "-50%" }}
              animate={{ scale: 1, rotate: 0, x: "-50%" }}
              transition={{ delay: 0.4 + i * 0.2, duration: 0.6, type: "spring" }}
              whileHover={{ scale: 1.3, rotate: 15, x: "-50%", boxShadow: "0 0 15px rgba(249,115,22,0.4)" }}
            >
              <Briefcase size={14} className="text-orange-500 md:hidden" />
              <Briefcase size={16} className="text-orange-500 hidden md:block" />
            </motion.div>
            <h3 className="text-lg font-bold text-white">{item.title}</h3>
            <h4 className="text-orange-500 font-medium text-sm mb-2">{item.org}</h4>
            <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   EDUCATION TAB
   ════════════════════════════════════════════ */
function EducationTab() {
  const items = [
    {
      title: "BTech in Computer Science Engineering",
      org: "BPUT Rourkela • 2022 - 2026",
      desc: "MERN Stack Developer & AI Engineer building scalable full-stack applications, intelligent AI systems, and production-ready backend solutions using modern web and LLM technologies.",
    },
    {
      title: "12th (Higher Secondary)",
      org: "Dailmai H S School • CHSE • 2020- 2022",
      desc: "Completed higher secondary education with a focus on Science stream.",
    },
    {
      title: "10th (Matriculation)",
      org: "Sri Aurobindo Integral Education and Research Center • CBSE • 2020",
      desc: "Completed matriculation under the CBSE curriculum.",
    },
  ];

  return (
    <div className="relative pl-6 md:pl-8 ml-2 md:ml-4">
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-800/50" />
      <motion.div
        className="absolute left-0 top-0 w-px bg-gradient-to-b from-orange-500 to-orange-500/20"
        initial={{ height: 0 }}
        animate={{ height: "100%" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
      <div className="space-y-6">
        {items.map((item, i) => (
          <motion.div
            key={i}
            className="relative p-4 md:p-6 bg-[#111]/30 border border-gray-900 rounded-2xl hover:bg-[#111]/70 hover:border-orange-500/30 hover:shadow-[0_4px_20px_rgba(249,115,22,0.05)] transition-all duration-300 backdrop-blur-sm"
            initial={{ opacity: 0, x: -40, filter: "blur(4px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay: 0.15 + i * 0.2, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ 
              x: 8,
              transition: { duration: 0.2 }
            }}
          >
            <motion.div
              className="absolute left-0 -translate-x-1/2 top-6 bg-black border-2 border-orange-500 p-1.5 md:p-2 rounded-full z-10"
              initial={{ scale: 0, rotate: -180, x: "-50%" }}
              animate={{ scale: 1, rotate: 0, x: "-50%" }}
              transition={{ delay: 0.4 + i * 0.2, duration: 0.6, type: "spring" }}
              whileHover={{ scale: 1.3, rotate: 15, x: "-50%", boxShadow: "0 0 15px rgba(249,115,22,0.4)" }}
            >
              <GraduationCap size={14} className="text-orange-500 md:hidden" />
              <GraduationCap size={16} className="text-orange-500 hidden md:block" />
            </motion.div>
            <h3 className="text-lg font-bold text-white">{item.title}</h3>
            <h4 className="text-orange-500 font-medium text-sm mb-2">{item.org}</h4>
            <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   SKILLS TAB
   ════════════════════════════════════════════ */
function SkillsTab() {
  const categories = [
    { title: "Programming Languages", icon: Code2, skills: ["C", "JAVA", "Python", "Javascript"] },
    { title: "Libraries & Frameworks", icon: Layout, skills: ["React.js", "Next.js", "Node.js", "Express.js", "FastAPI", "Flask", "TensorFlow", "Pandas", "NumPy"] },
    { title: "Generative AI", icon: Sparkles, skills: ["LangChain", "RAG Pipelines", "Prompt Engineering", "HuggingFace", "Gemini API", "Groq API"] },
    { title: "Tools & Platforms", icon: Terminal, skills: ["Git", "GitHub", "Postman", "VS Code", "Jupyter Notebook", "AWS (Basics)", "Figma"] },
    { title: "Databases", icon: Database, skills: ["MongoDB", "MySQL", "SQLite", "PostgreSQL"] },
    { title: "Core Concepts", icon: Brain, skills: ["Agentic AI", "Multi-Agent Systems", "RAG Architecture", "Semantic Search", "Embeddings", "Vector Retrieval"] },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {categories.map((cat, idx) => {
        const Icon = cat.icon;
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ 
              y: -6, 
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
            className="bg-[#111]/30 p-6 rounded-2xl border border-gray-900 hover:border-orange-500/40 hover:shadow-[0_10px_30px_rgba(249,115,22,0.08)] transition-all duration-300 group backdrop-blur-sm relative overflow-hidden"
          >
            {/* Subtle corner glow on hover */}
            <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-orange-500/0 group-hover:bg-orange-500/5 transition-all duration-500 blur-3xl" />
            
            <div className="flex items-center gap-3 mb-4 relative">
              <motion.div 
                className="bg-black p-3 rounded-xl group-hover:shadow-[0_0_20px_rgba(249,115,22,0.25)] transition-all duration-300"
                whileHover={{ rotate: 5, scale: 1.1 }}
              >
                <Icon size={18} className="text-orange-500" />
              </motion.div>
              <h4 className="text-white font-semibold">{cat.title}</h4>
            </div>
            <div className="flex flex-wrap gap-2 relative">
              {cat.skills.map((skill, skillIdx) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 + skillIdx * 0.03, duration: 0.3 }}
                  whileHover={{ 
                    scale: 1.1, 
                    y: -2,
                    boxShadow: "0 4px 12px rgba(249,115,22,0.15)"
                  }}
                  className="px-3 py-1 text-xs bg-black/60 text-gray-300 rounded-full border border-gray-800 hover:bg-orange-500/15 hover:border-orange-500/50 hover:text-orange-400 transition-all duration-200 cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ════════════════════════════════════════════
   CERTIFICATIONS TAB
   ════════════════════════════════════════════ */
function CertificationsTab() {
  const certs = [
    {
      title: "AI Data Quality Analyst",
      issuer: "Rooman Technologies Pvt. Ltd.",
      desc: "Certified as AI Data Quality Analyst.",
      icon: Award,
    },
    {
      title: "SAP Certified Associate",
      issuer: "SAP",
      desc: "ABAP Cloud, SAP Fiori, Business Process Integration.",
      icon: ShieldCheck,
    },
    {
      title: "Summer Research Internship",
      issuer: "National Institute of Technology (NIT) Rourkela",
      desc: "Certificate of Completion for Summer Research Internship.",
      icon: BookOpen,
    },
    {
      title: "BPUT Odisha Hackathon Participant & Innovator",
      issuer: "Biju Patnaik University of Technology (BPUT), Odisha",
      desc: "Developed 'AI Resume Builder for Blue Collar Professionals' - a Flutter-based mobile application with multilingual support, ATS score evaluation, and template customization.",
      icon: Trophy,
    },
    {
      title: "GIET Bhubaneswar Hackathon 2025 Participant",
      issuer: "GIET University, Bhubaneswar",
      desc: "Developed 'Navmarg.tech' - a smart product scanning system featuring QR/barcode scanning, ML object recognition, and multilingual support.",
      icon: Award,
    },
  ];

  return (
    <div className="space-y-4">
      {certs.map((cert, i) => {
        const Icon = cert.icon;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -30, filter: "blur(4px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.5, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ 
              x: 8,
              transition: { duration: 0.2 }
            }}
            className="flex items-start gap-4 bg-[#111]/30 p-5 rounded-2xl border border-gray-900 hover:bg-[#111]/70 hover:border-orange-500/30 hover:shadow-[0_4px_20px_rgba(249,115,22,0.05)] transition-all duration-300 backdrop-blur-sm group"
          >
            <motion.div 
              className="bg-black p-3 rounded-xl shrink-0 group-hover:shadow-[0_0_15px_rgba(249,115,22,0.2)] transition-all duration-300"
              whileHover={{ scale: 1.15, rotate: 5 }}
            >
              <Icon size={20} className="text-orange-500" />
            </motion.div>
            <div>
              <h4 className="text-white font-semibold">{cert.title}</h4>
              <p className="text-orange-500 text-sm font-medium">{cert.issuer}</p>
              <p className="text-gray-400 text-sm mt-1 leading-relaxed">{cert.desc}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ════════════════════════════════════════════
   MAIN ABOUT COMPONENT
   ════════════════════════════════════════════ */
export default function About() {
  const [activeTab, setActiveTab] = useState("experience");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const tabContent: Record<string, React.ReactNode> = {
    experience: <ExperienceTab />,
    education: <EducationTab />,
    skills: <SkillsTab />,
    certifications: <CertificationsTab />,
  };

  return (
    <section ref={ref} className="min-h-screen bg-black text-white px-6 md:px-12 flex items-start md:items-center relative overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-40 -left-40 w-80 h-80 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(249,115,22,0.05) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.3, 1], x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(249,115,22,0.04) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.2, 1], x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-5xl mx-auto w-full pt-32 pb-24 md:py-24 relative z-10">
        <SectionHeader isInView={isInView} />

        {/* Tab bar */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
                  isActive
                    ? "text-orange-500 border-orange-500/30"
                    : "bg-[#111] text-gray-400 border-gray-800 hover:text-white hover:border-gray-600"
                }`}
              >
                {/* Animated background for active tab */}
                {isActive && (
                  <motion.div
                    layoutId="tab-bg"
                    className="absolute inset-0 bg-orange-500/15 rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    style={{ boxShadow: "0 0 20px rgba(249,115,22,0.1)" }}
                  />
                )}
                <Icon size={14} className="relative z-10" />
                <span className="relative z-10">{tab.label}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -15, filter: "blur(4px)" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {tabContent[activeTab]}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
