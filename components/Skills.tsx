"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Database, Layout, Terminal } from "lucide-react";

const skillCategories = [
  { title: "Languages", icon: Code2, skills: "C, JAVA, Python, JavaScript" },
  { title: "Frameworks & Libraries", icon: Layout, skills: "Node.js, Next.js, React, Flask, REST APIs" },
  { title: "Tools & Platforms", icon: Terminal, skills: "Git, Github, VSCode, Figma, Postman" },
  { title: "Databases", icon: Database, skills: "MongoDB, MySQL, PostgreSQL, SQLite" },
];

function TiltCard({ children, index }: { children: React.ReactNode; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ rotateX: y * -12, rotateY: x * 12 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt({ rotateX: 0, rotateY: 0 })}
      animate={tilt}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ transformPerspective: 800 }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="gradient-border"
    >
      {children}
    </motion.div>
  );
}

export default function Skills() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section ref={sectionRef} id="skills" className="py-24 bg-black text-white px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-4xl font-bold mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          My <span className="text-orange-500">Skills</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, idx) => {
            const Icon = category.icon;
            return (
              <TiltCard key={idx} index={idx}>
                <div className="bg-[#111] p-8 rounded-2xl h-full group">
                  <motion.div
                    className="bg-black p-4 rounded-xl inline-block mb-6 shadow-lg shadow-black"
                    whileHover={{ scale: 1.15, boxShadow: "0 0 25px rgba(249,115,22,0.3)" }}
                    transition={{ duration: 0.25 }}
                  >
                    <Icon className="text-orange-500" />
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-200">{category.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm">{category.skills}</p>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
