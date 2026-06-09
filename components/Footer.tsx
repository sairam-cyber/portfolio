"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Copy, Check, Mail } from "lucide-react";

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [copied, setCopied] = useState(false);

  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [senderMessage, setSenderMessage] = useState("");

  const handleCopy = () => {
    navigator.clipboard.writeText("sairambebarta999@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Contact Form Submission from ${senderName}`;
    const body = `Name: ${senderName}\nEmail: ${senderEmail}\n\nMessage:\n${senderMessage}`;
    const mailtoUrl = `mailto:sairambebarta999@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const gmailUrl = `https://mail.google.com/mail/?extsrc=mailto&url=${encodeURIComponent(mailtoUrl)}`;
    
    window.open(gmailUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <footer ref={ref} className="min-h-screen bg-[#050505] border-t border-gray-900 text-center flex flex-col items-center justify-center px-6 py-20">
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
        className="text-gray-400 mb-8 max-w-lg mx-auto px-6 text-sm md:text-base"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        I am currently looking for new opportunities in Full Stack Web Development and backend architecture. Whether you have a question or just want to say hi, my inbox is always open!
      </motion.p>

      {/* Terminal-styled Contact Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="w-full max-w-lg mx-auto flex flex-col gap-5 text-left bg-gray-950/40 border border-gray-900/60 rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-xl mb-8"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div>
          <label className="text-gray-400 font-mono text-sm mb-2 block">
            _name:
          </label>
          <input
            type="text"
            required
            placeholder="Your name"
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            className="w-full bg-[#0b1120]/60 border border-gray-800/80 rounded-xl px-4 py-3 text-white font-mono placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-all"
          />
        </div>

        <div>
          <label className="text-gray-400 font-mono text-sm mb-2 block">
            _email:
          </label>
          <input
            type="email"
            required
            placeholder="your.email@example.com"
            value={senderEmail}
            onChange={(e) => setSenderEmail(e.target.value)}
            className="w-full bg-[#0b1120]/60 border border-gray-800/80 rounded-xl px-4 py-3 text-white font-mono placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-all"
          />
        </div>

        <div>
          <label className="text-gray-400 font-mono text-sm mb-2 block">
            _message:
          </label>
          <textarea
            required
            placeholder="Your message here ..."
            rows={4}
            value={senderMessage}
            onChange={(e) => setSenderMessage(e.target.value)}
            className="w-full bg-[#0b1120]/60 border border-gray-800/80 rounded-xl px-4 py-3 text-white font-mono placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-all resize-y min-h-[110px]"
          />
        </div>

        <button
          type="submit"
          className="bg-[#1e293b] text-gray-300 hover:bg-[#2d3748] hover:text-white border border-transparent hover:border-orange-500/40 px-6 py-3 rounded-xl font-mono text-sm transition-all self-start shadow-md shadow-black/30 cursor-pointer"
        >
          submit-message
        </button>
      </motion.form>

      {/* Copy-able Quick Email widget */}
      <motion.div
        className="flex items-center gap-3 justify-center px-4 py-2 bg-gray-900/20 border border-gray-800/40 rounded-xl max-w-sm mx-auto shadow-sm"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.4 }}
      >
        <Mail size={16} className="text-orange-500 shrink-0" />
        <span className="text-gray-400 font-mono text-xs select-all truncate">
          sairambebarta999@gmail.com
        </span>
        <button
          onClick={handleCopy}
          className="p-1.5 text-gray-500 hover:text-white hover:bg-gray-800 rounded-lg transition-all shrink-0"
          title="Copy Email"
        >
          {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
        </button>
      </motion.div>

      <motion.div
        className="mt-16 text-gray-600 text-sm"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.5 }}
      >
        © {new Date().getFullYear()} Sai Ram Bebarta. Designed and built with Next.js.
      </motion.div>
    </footer>
  );
}
