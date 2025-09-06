// import React from "react";
// import { motion } from "framer-motion";
// import Navbar from "../HomePageComponents/Navbar";
// import { BookOpen, Github } from "lucide-react";

// const Docs = () => {
//   return (
//     <div className="min-h-screen bg-slate-950 flex flex-col">
//       <Navbar />

//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="flex-grow px-6 py-16 max-w-4xl mx-auto"
//       >
//         {/* Title */}
//         <h2 className="text-4xl font-bold text-indigo-400 mb-8 text-center">
//           Documentation
//         </h2>

//         {/* Intro */}
//         <p className="text-slate-300 text-lg text-center mb-12 leading-relaxed">
//           Welcome to the{" "}
//           <span className="text-indigo-400 font-semibold">Editra Docs</span>.  
//           Here you’ll find everything you need to get started, from{" "}
//           <span className="text-white font-medium">setting up rooms</span> and{" "}
//           <span className="text-white font-medium">saving files</span> to{" "}
//           <span className="text-white font-medium">collaborating with your team</span>.  
//           Our docs are designed to make your journey smooth and productive.
//         </p>

//         {/* Docs Sections */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
//           <motion.div
//             whileHover={{ scale: 1.03 }}
//             className="bg-slate-900 p-6 rounded-2xl shadow-lg border border-slate-800"
//           >
//             <BookOpen className="text-indigo-400 mb-3" size={28} />
//             <h3 className="text-xl font-semibold text-white mb-2">
//               Getting Started
//             </h3>
//             <p className="text-slate-400 text-sm leading-relaxed">
//               Learn how to create rooms, invite collaborators, and start coding
//               together in minutes.
//             </p>
//           </motion.div>

//           <motion.div
//             whileHover={{ scale: 1.03 }}
//             className="bg-slate-900 p-6 rounded-2xl shadow-lg border border-slate-800"
//           >
//             <BookOpen className="text-indigo-400 mb-3" size={28} />
//             <h3 className="text-xl font-semibold text-white mb-2">
//               Saving & Managing Files
//             </h3>
//             <p className="text-slate-400 text-sm leading-relaxed">
//               Understand how to save your work, track changes, and manage your
//               files effectively within Editra.
//             </p>
//           </motion.div>
//         </div>

//         {/* GitHub Link */}
//         <div className="text-center">
//           <a
//             href="http://github.com/rupjit23/editra" 
//             target="_blank"
//             rel="noopener noreferrer"
//             className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-6 py-3 rounded-xl cursor-pointer transition"
//           >
//             <Github size={22} /> View on GitHub
//           </a>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default Docs;
import React from "react";
import { motion } from "framer-motion";
import Navbar from "../HomePageComponents/Navbar";
import { BookOpen, Github } from "lucide-react";

const Docs = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <Navbar />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-grow px-4 sm:px-6 py-12 sm:py-16 max-w-4xl mx-auto"
      >
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl font-bold text-indigo-400 mb-8 text-center">
          Documentation
        </h2>

        {/* Intro */}
        <p className="text-slate-300 text-base sm:text-lg text-center mb-12 leading-relaxed px-2 sm:px-0">
          Welcome to the{" "}
          <span className="text-indigo-400 font-semibold">Editra Docs</span>.  
          Here you’ll find everything you need to get started, from{" "}
          <span className="text-white font-medium">setting up rooms</span> and{" "}
          <span className="text-white font-medium">saving files</span> to{" "}
          <span className="text-white font-medium">collaborating with your team</span>.  
          Our docs are designed to make your journey smooth and productive.
        </p>

        {/* Docs Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12">
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-slate-900 p-6 rounded-2xl shadow-lg border border-slate-800 w-full max-w-sm mx-auto md:max-w-none"
          >
            <BookOpen className="text-indigo-400 mb-3" size={28} />
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
              Getting Started
            </h3>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Learn how to create rooms, invite collaborators, and start coding
              together in minutes.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-slate-900 p-6 rounded-2xl shadow-lg border border-slate-800 w-full max-w-sm mx-auto md:max-w-none"
          >
            <BookOpen className="text-indigo-400 mb-3" size={28} />
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
              Saving & Managing Files
            </h3>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Understand how to save your work, track changes, and manage your
              files effectively within Editra.
            </p>
          </motion.div>
        </div>

        {/* GitHub Link */}
        <div className="text-center">
          <a
            href="http://github.com/rupjit23/editra"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-6 py-3 rounded-xl cursor-pointer transition w-full sm:w-auto justify-center"
          >
            <Github size={22} /> View on GitHub
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default Docs;
