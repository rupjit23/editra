import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { FaPaperPlane } from "react-icons/fa";
import { SiBetfair } from "react-icons/si";
import { SiFiles } from "react-icons/si";
import { FaUserEdit } from "react-icons/fa";
import { IoFolderOpenSharp } from "react-icons/io5";
import { IoTimerSharp } from "react-icons/io5";
import { IoIosTimer } from "react-icons/io";
import { FaMicrophone } from "react-icons/fa";
import { FaVideo } from "react-icons/fa";
const Editra = () => {
  const navigate = useNavigate();

const goToLogin = () => {
  navigate("/login"); 
};
const goToSignup = () => {
  navigate("/sign-up"); 
};
  const code = `import React from "react";
import CTAButton from "./Button";
import TypeAnimation from "react-type";
import { FaArrowRight } from "react-icons/fa";

export default function Counter() {
  const [count, setCount] = React.useState(0);
  return (
    <button onClick={() => setCount(c => c + 1)}
      className="rounded-lg bg-indigo-600/90 px-3 py-2 font-medium">
      Count: {count}
    </button>
  );
}`;

  const lines = code.split("\n");
  const [visibleLines, setVisibleLines] = useState(0);
  const [showButtons, setShowButtons] = useState(false);

  
  useEffect(() => {
    if (visibleLines < lines.length) {
      const timer = setTimeout(() => {
        setVisibleLines((prev) => prev + 1);
      }, 400); 
      return () => clearTimeout(timer);
    } else {
      
      setTimeout(() => setShowButtons(true), 500);
    }
  }, [visibleLines, lines.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.05 }}
      className="relative"
    >
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="relative mx-auto w-full max-w-xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900 to-slate-950 p-3 shadow-2xl"
      >
        {/* Glow behind editor */}
        <motion.div
          animate={{ opacity: [0.4, 1, 0.6, 1] }}
          transition={{ repeat: Infinity, duration: 4 }}
          className="absolute inset-0 rounded-3xl bg-indigo-500/20 blur-2xl"
          style={{ zIndex: 0 }}
        />

        <div className="relative z-10">
          {/* Editor header */}
          <div className="mb-3 flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-3 py-2 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-red-500"></span>
              <span className="inline-block h-2 w-2 rounded-full bg-yellow-500"></span>
              <span className="inline-block h-2 w-2 rounded-full bg-green-500"></span>
              <span className="ml-2">editra.js — Room LIVE</span>
            </div>
            <div className="rounded-md bg-white/5 px-2 py-1">Collaborators: 3</div>
          </div>

          {/* Animated code block */}
          <div className="max-h-[420px] overflow-auto rounded-xl bg-slate-900/80 p-4 font-mono text-[13.5px] leading-6 text-slate-300">
            {lines.slice(0, visibleLines).map((line, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="flex"
              >
                <span className="w-8 pr-2 text-slate-500 select-none">
                  {idx + 1}
                </span>
                <span className="whitespace-pre">{line}</span>
              </motion.div>
            ))}
          </div>

{showButtons && (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="mt-4 flex justify-between gap-4"
  >
  <button
  onClick={goToSignup}
  className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-indigo-500/80 px-5 py-3 text-white font-medium shadow-lg backdrop-blur-sm hover:bg-indigo-400/90 transition cursor-pointer"
>
  <FaMicrophone className="h-6 w-6" />
Mute
</button>

<button
  onClick={goToLogin}
  className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-slate-600 bg-slate-700/50 px-5 py-3 text-slate-200 font-medium shadow-lg backdrop-blur-sm hover:bg-slate-600/70 transition cursor-pointer"
>
  <FaVideo className="h-5 w-5" />
Stop
</button>

  </motion.div>
)}

        </div>
      </motion.div>
    </motion.div>
  );
};

export default Editra;
