import React from "react";
import MoncoEditor from "../Editor/MoncoEditor";

function EditorArea({ isSidebarHovered }) {
  return (
    <div className={`flex-1 flex flex-col transition-all duration-500 
                    ${isSidebarHovered ? "scale-[0.98] -translate-x-2" : "scale-100 translate-x-0"}`}>
      <div className="flex-1 bg-slate-950 relative p-4">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-indigo-900/30 via-slate-900/40 to-slate-950" />
        <div className="relative h-full rounded-xl overflow-hidden border border-white/10 shadow-xl">
          <MoncoEditor />
        </div>
      </div>
    </div>
  );
}

export default EditorArea;
