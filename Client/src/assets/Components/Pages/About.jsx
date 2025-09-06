// import React from "react";
// import { motion } from "framer-motion";
// import Navbar from "../HomePageComponents/Navbar";
// import { Users, FileCode, Share2, Lock, Video, Mic } from "lucide-react";
// import { useNavigate } from "react-router";

// const About = () => {
//   const navigate = useNavigate();
//   return (
//     <div className="min-h-screen bg-slate-950 flex flex-col">
//       <Navbar />

//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="flex-grow px-6 py-8 max-w-5xl mx-auto"
//       >
//         {/* Title */}
//         <h2 className="text-4xl font-bold text-indigo-400 mb-8 text-center">
//           About Editra
//         </h2>

//         {/* Intro */}
//         <p className="text-slate-300 text-lg text-center mb-12 leading-relaxed">
//           <span
//             onClick={() => navigate("/")}
//             className="text-indigo-400 font-semibold cursor-pointer"
//           >
//             Editra
//           </span>{" "}
//           is a collaborative online code editor that allows you to{" "}
//           <span className="text-white font-medium">
//             create rooms, share code, and work together in real-time
//           </span>
//           . Whether you’re building projects, learning with friends, or pair
//           programming, Editra makes it simple and secure.
//         </p>

//         {/* How it works - Features */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
//           <div className="bg-slate-900 p-8 rounded-2xl shadow-lg border border-slate-800 hover:bg-slate-800/70 transition cursor-pointer">
//             <Users className="text-indigo-400 mb-4" size={32} />
//             <h3 className="text-2xl font-semibold text-white mb-3">
//               Create & Join Rooms
//             </h3>
//             <p className="text-slate-400">
//               Start a coding session by creating a room and sharing the Room ID.
//               Others can instantly join and collaborate with you.
//             </p>
//           </div>

//           <div className="bg-slate-900 p-8 rounded-2xl shadow-lg border border-slate-800 hover:bg-slate-800/70 transition cursor-pointer">
//             <FileCode className="text-indigo-400 mb-4" size={32} />
//             <h3 className="text-2xl font-semibold text-white mb-3">
//               Powerful Code Editor
//             </h3>
//             <p className="text-slate-400">
//               Write and edit code in multiple languages with syntax highlighting
//               and smooth editing experience.
//             </p>
//           </div>

//           <div className="bg-slate-900 p-8 rounded-2xl shadow-lg border border-slate-800 hover:bg-slate-800/70 transition cursor-pointer">
//             <Share2 className="text-indigo-400 mb-4" size={32} />
//             <h3 className="text-2xl font-semibold text-white mb-3">
//               Real-time Collaboration
//             </h3>
//             <p className="text-slate-400">
//               Every keystroke is instantly shared. See your teammates’ changes
//               in real-time without refreshing.
//             </p>
//           </div>

//           <div className="bg-slate-900 p-8 rounded-2xl shadow-lg border border-slate-800 hover:bg-slate-800/70 transition cursor-pointer">
//             <div className="flex items-center gap-3 mb-4">
//               <Video className="text-indigo-400" size={28} />
//               <Mic className="text-indigo-400" size={28} />
//             </div>
//             <h3 className="text-2xl font-semibold text-white mb-3">
//               High-quality Audio & Video Calls
//             </h3>
//             <p className="text-slate-400">
//               Communicate seamlessly with your team using crystal-clear audio
//               and video calls, built right into your collaboration room.
//             </p>
//           </div>

//           <div className="bg-slate-900 p-8 rounded-2xl shadow-lg border border-slate-800 hover:bg-slate-800/70 transition cursor-pointer">
//             <Lock className="text-indigo-400 mb-4" size={32} />
//             <h3 className="text-2xl font-semibold text-white mb-3">
//               Secure & Private
//             </h3>
//             <p className="text-slate-400">
//               Rooms are end-to-end encrypted. Your code and collaboration stay
//               private and protected.
//             </p>
//           </div>
//         </div>

//         <p className="text-slate-400 text-center mt-16 text-lg">
//           🚀 Editra is designed to make{" "}
//           <span className="text-white font-medium">
//             coding with others easy, fun, and secure
//           </span>
//           . Get started by creating your first room today!
//         </p>
//       </motion.div>
//     </div>
//   );
// };

// export default About;



import React from "react";
import { motion } from "framer-motion";
import Navbar from "../HomePageComponents/Navbar";
import { Users, FileCode, Share2, Video, Mic } from "lucide-react";
import { useNavigate } from "react-router";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-[100dvh] bg-slate-950 flex flex-col overflow-x-hidden overflow-y-auto">
      <Navbar />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-grow w-full max-w-5xl px-3 sm:px-6 py-6 sm:py-8 mx-auto"
      >
        {/* Title */}
        <h2 className="text-2xl sm:text-4xl font-bold text-indigo-400 mb-6 sm:mb-8 text-center">
          About Editra
        </h2>

        {/* Intro */}
        <p className="text-slate-300 text-sm sm:text-lg text-center mb-8 sm:mb-12 leading-relaxed">
          <span
            onClick={() => navigate("/")}
            className="text-indigo-400 font-semibold cursor-pointer"
          >
            Editra
          </span>{" "}
          is a collaborative online code editor that allows you to{" "}
          <span className="text-white font-medium">
            create rooms, share code, and work together in real-time
          </span>
          . Whether you’re building projects, learning with friends, or pair
          programming, Editra makes it simple and secure.
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
          <div className="bg-slate-900 p-4 sm:p-8 rounded-2xl shadow-lg border border-slate-800 hover:bg-slate-800/70 transition cursor-pointer">
            <Users className="text-indigo-400 mb-2 sm:mb-4" size={28} />
            <h3 className="text-lg sm:text-2xl font-semibold text-white mb-1 sm:mb-3">
              Create & Join Rooms
            </h3>
            <p className="text-slate-400 text-xs sm:text-base">
              Start a coding session by creating a room and sharing the Room ID.
              Others can instantly join and collaborate with you.
            </p>
          </div>

          <div className="bg-slate-900 p-4 sm:p-8 rounded-2xl shadow-lg border border-slate-800 hover:bg-slate-800/70 transition cursor-pointer">
            <FileCode className="text-indigo-400 mb-2 sm:mb-4" size={28} />
            <h3 className="text-lg sm:text-2xl font-semibold text-white mb-1 sm:mb-3">
              Powerful Code Editor
            </h3>
            <p className="text-slate-400 text-xs sm:text-base">
              Write and edit code in multiple languages with syntax highlighting
              and smooth editing experience.
            </p>
          </div>

          <div className="bg-slate-900 p-4 sm:p-8 rounded-2xl shadow-lg border border-slate-800 hover:bg-slate-800/70 transition cursor-pointer">
            <Share2 className="text-indigo-400 mb-2 sm:mb-4" size={28} />
            <h3 className="text-lg sm:text-2xl font-semibold text-white mb-1 sm:mb-3">
              Real-time Collaboration
            </h3>
            <p className="text-slate-400 text-xs sm:text-base">
              Every keystroke is instantly shared. See your teammates’ changes
              in real-time without refreshing.
            </p>
          </div>

          <div className="bg-slate-900 p-4 sm:p-8 rounded-2xl shadow-lg border border-slate-800 hover:bg-slate-800/70 transition cursor-pointer">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-4">
              <Video className="text-indigo-400" size={24} />
              <Mic className="text-indigo-400" size={24} />
            </div>
            <h3 className="text-lg sm:text-2xl font-semibold text-white mb-1 sm:mb-3">
              High-quality Audio & Video Calls
            </h3>
            <p className="text-slate-400 text-xs sm:text-base">
              Communicate seamlessly with your team using crystal-clear audio
              and video calls, built right into your collaboration room.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
