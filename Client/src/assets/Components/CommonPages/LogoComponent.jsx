
import React from "react";
import logo1 from "../logo/Logo.png";

function LogoComponent() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 shadow-lg p-6 flex items-center justify-center relative overflow-hidden">
      
      {/* Glow / Accent */}
      <div className="absolute inset-0 bg-indigo-600/20 blur-3xl"></div>

      {/* Logo + Text */}
      <div className="flex items-center space-x-4 relative z-10">
        {/* Logo with hover animation */}
        <img
          src={logo1}
          alt="Logo"
          className="h-20 w-auto object-contain transform transition-transform duration-500 hover:scale-105 drop-shadow-lg"
        />

        {/* Text with gradient + glow */}
        <p className="text-xl md:text-2xl font-bold bg-gradient-to-r from-indigo-400 to-slate-200 bg-clip-text text-transparent drop-shadow">
          Real-time Collaboration
        </p>
      </div>
    </div>
  );
}

export default LogoComponent;
