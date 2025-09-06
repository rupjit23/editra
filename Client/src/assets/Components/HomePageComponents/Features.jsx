import React from "react";
import { FaBolt, FaUsers, FaLock,FaVideo } from "react-icons/fa";


const Hero = () => {
  const items = [
    { icon: <FaBolt className="text-yellow-400 text-xl" />, text: "Real-time collaboration with zero lag" },
    // { icon: <FaUsers className="text-indigo-400 text-xl" />, text: "Live rooms & chat" },
    { icon: <FaLock className="text-blue-400 text-xl" />, text: "End-to-end encrypted rooms" },
     { 
    icon: <FaVideo className="text-red-400 text-xl" />, 
    text: "High quality video and audio calls" 
  },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 mt-4 w-3xl cursor-pointer">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 rounded-2xl bg-slate-900/60 border border-white/10 px-3 py-4 shadow-lg hover:shadow-indigo-500/20 transition"
          >
            <div>{item.icon}</div>
            <p className="text-slate-200 text-sm font-medium">{item.text}</p>
          </div>
        ))}
      </div>
  );
};

export default Hero;
