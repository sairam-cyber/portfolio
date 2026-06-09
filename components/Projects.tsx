"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Career Counselling Platform",
    tech: "FastAPI, Next.js, RAG, LangChain",
    desc: "Built a document intelligence assistant utilizing FastAPI and Next.js. Developed automated data ingestion pipelines and a dedicated dashboard for generating context-aware insights.",
  },
  {
    title: "Customer Churn Prediction",
    tech: "React, Node.js, Python, MongoDB",
    desc: "Full-stack analytics platform. Engineered secure data pipelines with JWT authentication, real-time risk dashboards, and automated PDF reporting features.",
  },
  {
    title: "RealTime Chatting",
    tech: "MERN Stack, Socket.io, Firebase",
    desc: "Modern instant messaging application featuring voice notes, secure file sharing, and smart replies. Secured with robust JWT authentication and structured for high concurrency.",
  },
  {
    title: "NLP Engine Employee Data",
    tech: "Flask, React, PostgreSQL, FAISS, Gemini API",
    desc: "Built an AI-powered NLP Query Engine using Flask, React, and PostgreSQL for employee data retrieval, implementing document ingestion, embeddings, semantic search (FAISS), and Gemini powered natural language-to-SQL querying.",
  },
  {
    title: "Medlist: Health Care Platform",
    tech: "Next.js, MongoDB, Gemini API",
    desc: "Comprehensive healthcare solution tailored for efficient doctor discovery and automated appointment scheduling, complete with an intelligent integrated chatbot.",
  },
];

export default function Projects() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section ref={sectionRef} className="min-h-screen bg-[#0a0a0a] text-white px-6 md:px-12 flex items-center">
      <div className="max-w-7xl mx-auto w-full py-24">
        <motion.h2
          className="text-4xl font-bold mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Featured <span className="text-orange-500">Projects</span>
        </motion.h2>

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
                delay: 0.1 + idx * 0.08 
              }}
              whileHover={{ 
                y: -10, 
                scale: 1.02
              }}
              className="shimmer-card bg-[#151515]/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-800 hover:border-orange-500/30 hover:shadow-[0_15px_35px_rgba(249,115,22,0.12)] flex flex-col h-full transition-all duration-300"
            >
              <h3 className="text-2xl font-bold mb-2 transition-colors duration-300 group-hover:text-orange-400">{project.title}</h3>
              <p className="text-orange-500 text-sm font-medium mb-4">{project.tech}</p>
              <p className="text-gray-400 mb-8 flex-grow leading-relaxed">{project.desc}</p>
              <div className="flex gap-4 mt-auto">
                <button className="flex items-center gap-2 text-sm font-medium text-white hover:text-orange-500 transition-colors">
                  <ExternalLink size={16} /> View Source
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
