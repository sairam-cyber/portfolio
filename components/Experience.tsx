"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";

const items = [
  {
    icon: Briefcase,
    title: "Online Electronics Store (Full Stack)",
    org: "Rooman Technologies Pvt. Ltd. • Jan 2026 - Apr 2026",
    desc: "Developed a full-stack electronic e-commerce platform. Built features including user authentication, shopping cart, secure checkout, and database integration using modern web technologies.",
  },
  {
    icon: Briefcase,
    title: "Summer Research Intern",
    org: "NIT Rourkela • May 2025 - July 2025",
    desc: "Contributed to software optimization processes. Improved system architecture and ranking metrics through advanced feature engineering and data processing techniques.",
  },
  {
    icon: GraduationCap,
    title: "BTech in Computer Science Engineering",
    org: "BPUT Rourkela • 2022 - 2026",
    desc: "CGPA: 7.03. Specializing in Python backend architecture, modern web development, and highly scalable distributed systems.",
  },
];

export default function Experience() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end 80%"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={sectionRef} id="about" className="py-24 bg-black text-white px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-4xl font-bold mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Experience & <span className="text-orange-500">Education</span>
        </motion.h2>

        <div className="relative pl-8 ml-4">
          {/* Static background line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-800/50" />
          {/* Animated foreground line */}
          <motion.div className="absolute left-0 top-0 w-px bg-orange-500/60" style={{ height: lineHeight }} />

          <div className="space-y-12">
            {items.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  className="relative"
                  initial={{ opacity: 0, x: -40 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.18, ease: [0.16, 1, 0.3, 1] }}
                >
                  <motion.div
                    className="absolute -left-[41px] top-1 bg-black border-2 border-orange-500 p-2 rounded-full"
                    animate={isInView ? { scale: [1, 1.3, 1] } : {}}
                    transition={{ delay: 0.5 + i * 0.18, duration: 0.6, repeat: 0 }}
                  >
                    <Icon size={16} className="text-orange-500" />
                  </motion.div>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <h4 className="text-orange-500 font-medium mb-2">{item.org}</h4>
                  <p className="text-gray-400">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
