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
        className="absolute left-0 top-0 w-px bg-orange-500/60"
        initial={{ height: 0 }}
        animate={{ height: "100%" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
      <div className="space-y-6">
        {items.map((item, i) => (
          <motion.div
            key={i}
            className="relative p-4 md:p-6 bg-[#111]/30 border border-gray-900 rounded-2xl hover:bg-[#111]/70 hover:border-orange-500/30 hover:shadow-[0_4px_20px_rgba(249,115,22,0.05)] transition-all duration-300"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 + i * 0.15 }}
            whileHover={{ 
              x: 8
            }}
          >
            <motion.div
              className="absolute -left-[37px] md:-left-[45px] top-6 bg-black border-2 border-orange-500 p-1.5 md:p-2 rounded-full z-10"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ delay: 0.4 + i * 0.15, duration: 0.6 }}
              whileHover={{ scale: 1.2, rotate: 10 }}
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
      desc: "Specializing in Python backend architecture, modern web development, and highly scalable distributed systems.",
    },
    {
      title: "12th (Higher Secondary)",
      org: "Dailmai H S School • CHSE",
      desc: "Completed higher secondary education with a focus on Science stream.",
    },
    {
      title: "10th (Matriculation)",
      org: "Sri Aurobindo Integral Education and Research Center • CBSE",
      desc: "Completed matriculation under the CBSE curriculum.",
    },
  ];

  return (
    <div className="relative pl-6 md:pl-8 ml-2 md:ml-4">
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-800/50" />
      <motion.div
        className="absolute left-0 top-0 w-px bg-orange-500/60"
        initial={{ height: 0 }}
        animate={{ height: "100%" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
      <div className="space-y-6">
        {items.map((item, i) => (
          <motion.div
            key={i}
            className="relative p-4 md:p-6 bg-[#111]/30 border border-gray-900 rounded-2xl hover:bg-[#111]/70 hover:border-orange-500/30 hover:shadow-[0_4px_20px_rgba(249,115,22,0.05)] transition-all duration-300"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 + i * 0.15 }}
            whileHover={{ 
              x: 8
            }}
          >
            <motion.div
              className="absolute -left-[37px] md:-left-[45px] top-6 bg-black border-2 border-orange-500 p-1.5 md:p-2 rounded-full z-10"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ delay: 0.4 + i * 0.15, duration: 0.6 }}
              whileHover={{ scale: 1.2, rotate: 10 }}
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
    { title: "Libraries & Frameworks", icon: Layout, skills: ["Flask", "Pandas", "NumPy", "TensorFlow", "REST APIs", "FastAPI", "Node.js", "Next.js", "React"] },
    { title: "Generative AI", icon: Sparkles, skills: ["LangChain", "RAG Pipelines", "Prompt Engineering", "HuggingFace", "Gemini API", "Groq API"] },
    { title: "Tools & Platforms", icon: Terminal, skills: ["Git", "Github", "AWS(Basics)", "Jupyter Notebook", "VSCode", "Figma", "Postman"] },
    { title: "Databases", icon: Database, skills: ["MongoDB", "MySQL", "SQLite", "PostgreSQL"] },
    { title: "Concepts", icon: Brain, skills: ["Agentic AI", "Multi-Agent Systems", "Semantic Search", "Embeddings", "Vector Retrieval"] },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {categories.map((cat, idx) => {
        const Icon = cat.icon;
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            whileHover={{ 
              y: -6, 
              scale: 1.02
            }}
            className="bg-[#111]/30 p-6 rounded-2xl border border-gray-900 hover:border-orange-500/40 hover:shadow-[0_10px_30px_rgba(249,115,22,0.08)] transition-all duration-300 group"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-black p-3 rounded-xl group-hover:shadow-[0_0_20px_rgba(249,115,22,0.25)] transition-shadow">
                <Icon size={18} className="text-orange-500" />
              </div>
              <h4 className="text-white font-semibold">{cat.title}</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {cat.skills.map((skill) => (
                <motion.span
                  key={skill}
                  whileHover={{ 
                    scale: 1.1, 
                    y: -2
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
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            whileHover={{ 
              x: 8
            }}
            className="flex items-start gap-4 bg-[#111]/30 p-5 rounded-2xl border border-gray-900 hover:bg-[#111]/70 hover:border-orange-500/30 hover:shadow-[0_4px_20px_rgba(249,115,22,0.05)] transition-all duration-300"
          >
            <motion.div 
              className="bg-black p-3 rounded-xl shrink-0"
              whileHover={{ scale: 1.1 }}
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
    <section ref={ref} className="min-h-screen bg-black text-white px-6 md:px-12 flex items-center">
      <div className="max-w-5xl mx-auto w-full py-24">
        <motion.h2
          className="text-4xl font-bold mb-10 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          About <span className="text-orange-500">Me</span>
        </motion.h2>

        {/* Tab bar */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
                  isActive
                    ? "bg-orange-500/15 text-orange-500 border-orange-500/30"
                    : "bg-[#111] text-gray-400 border-gray-800 hover:text-white hover:border-gray-600"
                }`}
              >
                <Icon size={14} />
                {tab.label}
              </button>
            );
          })}
        </motion.div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {tabContent[activeTab]}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
