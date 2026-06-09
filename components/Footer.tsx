"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Copy, Check, Mail, Linkedin, Github } from "lucide-react";

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [copied, setCopied] = useState(false);

  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [senderMessage, setSenderMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const [isContactsOpen, setIsContactsOpen] = useState(true);
  const [isFindMeOpen, setIsFindMeOpen] = useState(true);

  const [dateStr, setDateStr] = useState("Tue 9 Jun");

  useEffect(() => {
    const date = new Date();
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    setDateStr(`${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]}`);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText("sairambebarta999@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "YOUR_ACCESS_KEY_HERE";

    if (accessKey === "YOUR_ACCESS_KEY_HERE") {
      // Simulate successful submission for demonstration if key is missing
      setTimeout(() => {
        setStatus("success");
        setSenderName("");
        setSenderEmail("");
        setSenderMessage("");
        setTimeout(() => setStatus("idle"), 4000);
      }, 1500);
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: senderName,
          email: senderEmail,
          message: senderMessage,
        })
      });

      const result = await response.json();
      if (result.success) {
        setStatus("success");
        setSenderName("");
        setSenderEmail("");
        setSenderMessage("");
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const highlightCode = (name: string, email: string, msg: string, dateStr: string) => {
    return (
      <pre className="font-mono text-xs md:text-sm leading-relaxed text-gray-400 select-none overflow-x-auto whitespace-pre-wrap">
        <div>
          <span className="text-pink-500">const</span>{" "}
          <span className="text-blue-400">button</span> ={" "}
          <span className="text-blue-300">document</span>.
          <span className="text-green-400">querySelector</span>(
          <span className="text-orange-400">&apos;#sendBtn&apos;</span>);
        </div>
        <br />
        <div>
          <span className="text-pink-500">const</span>{" "}
          <span className="text-blue-400">message</span> = &#123;
        </div>
        <div className="pl-4">
          <span className="text-blue-300">name</span>:{" "}
          <span className="text-orange-400">&quot;{name || "Rakesh Barik"}&quot;</span>,
        </div>
        <div className="pl-4">
          <span className="text-blue-300">email</span>:{" "}
          <span className="text-orange-400">&quot;{email || "rakesh-barik@gmail.com"}&quot;</span>,
        </div>
        <div className="pl-4">
          <span className="text-blue-300">message</span>:{" "}
          <span className="text-orange-400">&quot;{msg || "Hey! Just checked your website and it looks awesome! Also, I checked your articled on Medium. Lerned a few nice tips.Thanks"}&quot;</span>
        </div>
        <div className="pl-4">
          <span className="text-blue-300">date</span>:{" "}
          <span className="text-orange-400">&quot;{dateStr}&quot;</span>
        </div>
        <div>&#125;</div>
        <br />
        <div>
          <span className="text-blue-400">button</span>.
          <span className="text-green-400">addEventListener</span>(
          <span className="text-orange-400">&apos;click&apos;</span>, () =&gt; &#123;
        </div>
        <div className="pl-4">
          <span className="text-blue-400">form</span>.
          <span className="text-green-400">send</span>(
          <span className="text-blue-400">message</span>);
        </div>
        <div>&#125;)</div>
      </pre>
    );
  };

  return (
    <footer ref={ref} className="min-h-screen bg-[#050505] border-t border-gray-900 text-center flex flex-col items-center justify-center px-6 pt-32 pb-16">
      {/* IDE Container */}
      <motion.div
        className="w-full max-w-6xl mx-auto bg-[#0b0f19]/80 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[580px] mb-8 text-left backdrop-blur-xl"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Top Header Bar */}
        <div className="bg-[#070a13] border-b border-gray-800/80 px-4 py-3 flex items-center justify-between shrink-0">
          <div className="flex gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 block" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 block" />
            <span className="w-3 h-3 rounded-full bg-green-500/80 block" />
          </div>
          <span className="text-gray-400 font-mono text-xs md:text-sm">
            contact-me.js — Portfolio IDE
          </span>
          <div className="w-12" /> {/* spacer */}
        </div>

        {/* Editor Main Content Area */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Panel: Explorer (hidden on mobile, visible on md+) */}
          <div className="hidden md:flex flex-col w-64 bg-[#080d16] border-r border-gray-800/80 p-4 font-mono select-none overflow-y-auto shrink-0">
            {/* Contacts dropdown */}
            <div className="mb-6">
              <button
                onClick={() => setIsContactsOpen(!isContactsOpen)}
                className="flex items-center justify-between w-full text-gray-300 hover:text-white text-xs font-semibold uppercase tracking-wider mb-2"
              >
                <span>contacts</span>
                <span className="text-gray-500 transition-transform duration-200" style={{ transform: isContactsOpen ? 'rotate(0deg)' : 'rotate(-90deg)', display: 'inline-block' }}>
                  ▼
                </span>
              </button>
              {isContactsOpen && (
                <div className="flex flex-col gap-2 pl-2 text-sm text-gray-400">
                  <a href="mailto:sairambebarta999@gmail.com" className="flex items-center gap-2 hover:text-orange-500 transition-colors truncate">
                    <Mail size={14} className="text-gray-500 shrink-0" />
                    <span className="truncate">sairambebarta999@gmail.com</span>
                  </a>
                </div>
              )}
            </div>

            {/* Find me also in dropdown */}
            <div>
              <button
                onClick={() => setIsFindMeOpen(!isFindMeOpen)}
                className="flex items-center justify-between w-full text-gray-300 hover:text-white text-xs font-semibold uppercase tracking-wider mb-2"
              >
                <span>find-me-also-in</span>
                <span className="text-gray-500 transition-transform duration-200" style={{ transform: isFindMeOpen ? 'rotate(0deg)' : 'rotate(-90deg)', display: 'inline-block' }}>
                  ▼
                </span>
              </button>
              {isFindMeOpen && (
                <div className="flex flex-col gap-2 pl-2 text-sm text-gray-400">
                  <a href="https://linkedin.com/in/sai-ram-bebarta" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-orange-500 transition-colors">
                    <Linkedin size={14} className="text-gray-500 shrink-0" />
                    <span>LinkedIn</span>
                  </a>
                  <a href="https://github.com/sairam-cyber" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-orange-500 transition-colors">
                    <Github size={14} className="text-gray-500 shrink-0" />
                    <span>GitHub</span>
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Middle Panel: Form */}
          <div className="flex-1 bg-[#0b0f19] p-6 md:p-8 overflow-y-auto flex flex-col justify-between border-r border-gray-800/80">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
                  className="w-full bg-[#070a13]/80 border border-gray-800 rounded-xl px-4 py-3 text-white font-mono placeholder-gray-600 focus:outline-none focus:border-orange-500/50 transition-all text-sm"
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
                  className="w-full bg-[#070a13]/80 border border-gray-800 rounded-xl px-4 py-3 text-white font-mono placeholder-gray-600 focus:outline-none focus:border-orange-500/50 transition-all text-sm"
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
                  className="w-full bg-[#070a13]/80 border border-gray-800 rounded-xl px-4 py-3 text-white font-mono placeholder-gray-600 focus:outline-none focus:border-orange-500/50 transition-all text-sm resize-none h-[110px]"
                />
              </div>

              <button
                type="submit"
                id="sendBtn"
                disabled={status === "sending" || status === "success"}
                className={`px-6 py-3 rounded-xl font-mono text-sm transition-all self-start shadow-md shadow-black/30 cursor-pointer border ${
                  status === "sending"
                    ? "bg-[#1e293b]/50 text-gray-500 border-transparent cursor-not-allowed animate-pulse"
                    : status === "success"
                    ? "bg-green-500/10 text-green-400 border-green-500/30"
                    : status === "error"
                    ? "bg-red-500/10 text-red-400 border-red-500/30"
                    : "bg-[#1e293b] text-gray-300 hover:bg-[#2d3748] hover:text-white border-transparent hover:border-orange-500/40"
                }`}
              >
                {status === "sending" && "sending..."}
                {status === "success" && "message-sent! ✓"}
                {status === "error" && "failed-to-send! ✗"}
                {status === "idle" && "submit-message"}
              </button>
            </form>
          </div>

          {/* Right Panel: Live Code Preview (hidden on mobile/tablet, visible on lg+) */}
          <div className="hidden lg:block w-[420px] bg-[#080d16] p-6 font-mono overflow-y-auto shrink-0">
            {highlightCode(senderName, senderEmail, senderMessage, dateStr)}
          </div>
        </div>
      </motion.div>

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
