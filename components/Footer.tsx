"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Copy, Check, Mail } from "lucide-react";

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("sairambebarta999@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer ref={ref} className="min-h-screen bg-[#050505] border-t border-gray-900 text-center flex flex-col items-center justify-center px-6">
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
        className="text-gray-400 mb-8 max-w-lg mx-auto px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        I am currently looking for new opportunities in Full Stack Web Development and backend architecture. Whether you have a question or just want to say hi, my inbox is always open!
      </motion.p>

      <motion.div
        className="flex flex-col sm:flex-row items-center gap-4 bg-gray-900/30 border border-gray-800/60 rounded-2xl p-4 md:p-6 mb-8 shadow-xl max-w-lg w-full mx-auto"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-start px-3 py-2 bg-black/40 border border-gray-800 rounded-xl flex-1">
          <Mail size={18} className="text-orange-500 shrink-0" />
          <span className="text-gray-200 font-mono text-sm select-all truncate">
            sairambebarta999@gmail.com
          </span>
          <button
            onClick={handleCopy}
            className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all shrink-0"
            title="Copy Email"
          >
            {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
          </button>
        </div>

         <motion.a
          href="https://mail.google.com/mail/?extsrc=mailto&url=mailto%3Asairambebarta999%40gmail.com%3Fsubject%3DCollaboration%20Inquiry%26body%3DHi%20Sai%20Ram%2C%0A%0AI%20visited%20your%20portfolio%20and%20would%20love%20to%20connect%20regarding..."
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto bg-orange-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-500 hover:scale-105 transition-all text-center flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          Send Email
        </motion.a>
      </motion.div>

      <motion.div
        className="mt-16 text-gray-600 text-sm"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.4 }}
      >
        © {new Date().getFullYear()} Sai Ram Bebarta. Designed and built with Next.js.
      </motion.div>
    </footer>
  );
}
