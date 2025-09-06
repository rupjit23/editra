
// import React, { useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { Code2, Users, Sparkles, PlusCircle, Link2, LogIn, UserPlus, ShieldCheck } from "lucide-react";
// import Editra from "../HomePageComponents/Editra";
// import Createroom from "../HomePageComponents/Createroom";
// import Joinroom from "../HomePageComponents/Joinroom";
// import Navbar from "../HomePageComponents/Navbar";
// import Features from "../HomePageComponents/Features";
// import { FaRegCopyright } from "react-icons/fa";



// export default function Home() {
  
//   const [error, setError] = useState("");



  

  

//   return (
//     <div className="relative min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50 overflow-y-auto">
//       {/* Navbar */}
//       <Navbar></Navbar>

//       {/* Hero */}
//       <section className="mx-auto grid max-w-310 gap-6  py-10 md:grid-cols-2 md:items-center relative z-10">
//         {/* Left side */}
//         <motion.div
//           initial={{ opacity: 0, x: -50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.7 }}
//           className="md:pr-6"  
//         >
//           <motion.h1
//   initial={{ opacity: 0, y: 10 }}
//   animate={{ opacity: 1, y: 0 }}
//   transition={{ duration: 0.5 }}
//   className="text-5xl font-extrabold leading-tight"
// >
//   Collaborate on <br />
//   <span className="text-indigo-400">code in real time</span>
// </motion.h1>

//           <motion.p 
//             initial={{ opacity: 0 }} 
//             animate={{ opacity: 1 }} 
//             transition={{ delay: 0.4 }}
//             className="text-white-400 mt-4 text-lg whitespace-pre-line"
//           >
//               Whether you’re interviewing, pair programming,
//                or teaching.Share a link, invite your team,
//                 and start coding together instantly.
//           </motion.p>
//       {/* <motion.p 
//   initial={{ opacity: 0 }} 
//   animate={{ opacity: 1 }} 
//   transition={{ delay: 0.4 }}
//   className="text-slate-400 mt-4 text-lg whitespace-pre-line"
// >
//   {`Whether you’re interviewing, pair programming,
// or teaching. Share a link, invite your team,
// and start coding together instantly.`}
// </motion.p> */}

//           {/* Features Section comes right here */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.5, duration: 0.6 }}
//             className="mt-2"
//           >
//             <Features />
//           </motion.div>
          
//           {/* Create / Join Cards */}
//           <motion.div 
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.5, duration: 0.6 }}
//             className="mt-8 grid gap-16 md:grid-cols-2"
//           >

           
//             {/* Create Room */}
//             <Createroom></Createroom>

//             {/* Join Room */}
//           <Joinroom></Joinroom>
//           </motion.div>

//           {error && (
//             <motion.p 
//               initial={{ opacity: 0 }} 
//               animate={{ opacity: 1 }} 
//               transition={{ duration: 0.3 }}
//               className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-200"
//             >{error}</motion.p>
//           )}

//           {/* Social proof */}
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.7 }}
//             className="mt-8 flex flex-wrap items-center gap-2 text-xs text-slate-400"
//           >
//             <ShieldCheck className="h-4 w-4 animate-bounce"/>
//             Multiple users <span className="mx-1">•</span>
//   Syntax highlighting <span className="mx-1">•</span>
//   Shareable links <span className="mx-1">•</span>
//   Save Code<span className="mx-1">•</span>
//   Live rooms & chat
//           </motion.div>
//         </motion.div>

//         {/* Right side visual */}
//         <Editra></Editra>
//       </section>

//       {/* Glowing Star Animation */}
     

//       {/* Footer */}
//     <p className="text-center text-slate-300 text-medium italic">
//   Code faster<span className="mx-1">•</span>
//   Code smarter<span className="mx-1">•</span>
//   Code together<span className="mx-1">•</span>
//   Anytime<span className="mx-1">•</span>
//   Anywhere<span className="mx-1">•</span>
//   With anyone
// </p>

// <div className="text-center text-slate-400 mt-2 flex items-center justify-center gap-1">
//   <FaRegCopyright /> {new Date().getFullYear()} Editra
// </div>


      
//     </div>
//   );
// }


// // import React, { useMemo, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { motion } from "framer-motion";
// // import { ShieldCheck } from "lucide-react";
// // import Editra from "../HomePageComponents/Editra";
// // import Createroom from "../HomePageComponents/Createroom";
// // import Joinroom from "../HomePageComponents/Joinroom";
// // import Navbar from "../HomePageComponents/Navbar";
// // import Features from "../HomePageComponents/Features";
// // import { FaRegCopyright } from "react-icons/fa";

// // export default function Home() {
// //   const [error, setError] = useState("");

// //   return (
// //     <div className="relative min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50 overflow-hidden">
// //       {/* Navbar */}
// //       <Navbar />

// // {/* Hero */}
// // <section className="mx-auto grid max-w-310 gap-6 py-6 md:py-10 md:grid-cols-2 md:items-center relative z-10 h-[calc(100vh-120px)] md:h-auto overflow-hidden">
// //   {/* Left side */}
// //   <motion.div
// //     initial={{ opacity: 0, x: -50 }}
// //     animate={{ opacity: 1, x: 0 }}
// //     transition={{ duration: 0.7 }}
// //     className="md:pr-6 flex flex-col justify-center"
// //   >
// //     <motion.h1
// //       initial={{ opacity: 0, y: 10 }}
// //       animate={{ opacity: 1, y: 0 }}
// //       transition={{ duration: 0.5 }}
// //       className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-center md:text-left"
// //     >
// //       Collaborate on <br />
// //       <span className="text-indigo-400">code in real time</span>
// //     </motion.h1>

// //     <motion.p
// //       initial={{ opacity: 0 }}
// //       animate={{ opacity: 1 }}
// //       transition={{ delay: 0.4 }}
// //       className="text-slate-400 mt-2 md:mt-4 text-sm sm:text-base md:text-lg text-center md:text-left"
// //     >
// //       Whether you’re interviewing, pair programming, or teaching. Share a link,
// //       invite your team, and start coding together instantly.
// //     </motion.p>

// //     {/* Features (hidden on mobile) */}
// //     <motion.div
// //       initial={{ opacity: 0, y: 20 }}
// //       animate={{ opacity: 1, y: 0 }}
// //       transition={{ delay: 0.5, duration: 0.6 }}
// //       className="mt-3 md:mt-5 hidden sm:block"
// //     >
// //       <Features />
// //     </motion.div>

// //     {/* Create / Join Cards */}
// //     <motion.div
// //       initial={{ opacity: 0, y: 30 }}
// //       animate={{ opacity: 1, y: 0 }}
// //       transition={{ delay: 0.5, duration: 0.6 }}
// //       className="mt-4 md:mt-8 grid gap-4 sm:gap-10 grid-cols-1 sm:grid-cols-2"
// //     >
// //       <div className="scale-95 sm:scale-100">
// //         <Createroom />
// //       </div>
// //       <div className="scale-95 sm:scale-100">
// //         <Joinroom />
// //       </div>
// //     </motion.div>
// //   </motion.div>

// //   {/* Right side visual (hidden on mobile) */}
// //   <div className="hidden md:block">
// //     <Editra />
// //   </div>
// // </section>

// // {/* Footer */}
// // <footer className="absolute bottom-0 left-0 right-0 pb-4">
// //   <p className="text-center text-slate-300 text-xs sm:text-sm italic">
// //     Code faster<span className="mx-1">•</span>
// //     Code smarter<span className="mx-1">•</span>
// //     Code together<span className="mx-1">•</span>
// //     Anytime<span className="mx-1">•</span>
// //     Anywhere<span className="mx-1">•</span>
// //     With anyone
// //   </p>

// //   <div className="text-center text-slate-400 mt-1 flex items-center justify-center gap-1 text-xs sm:text-sm">
// //     <FaRegCopyright /> {new Date().getFullYear()} Editra
// //   </div>
// // </footer>


// //       <div className="text-center text-slate-400 mt-2 flex items-center justify-center gap-1 text-xs sm:text-sm pb-4">
// //         <FaRegCopyright /> {new Date().getFullYear()} Editra
// //       </div>
// //     </div>
// //   );
// // }
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import Editra from "../HomePageComponents/Editra";
import Createroom from "../HomePageComponents/Createroom";
import Joinroom from "../HomePageComponents/Joinroom";
import Navbar from "../HomePageComponents/Navbar";
import Features from "../HomePageComponents/Features";
import { FaRegCopyright } from "react-icons/fa";

export default function Home() {
  const [error, setError] = useState("");

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50 overflow-y-auto">
      {/* Navbar */}
      <Navbar />

      {/* ---------- DESKTOP/TABLET VIEW ---------- */}
      <section className="hidden md:grid mx-auto max-w-310 gap-6 py-10 md:grid-cols-2 md:items-center relative z-10">
        {/* Left side */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="md:pr-6"
        >
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl font-extrabold leading-tight"
          >
            Collaborate on <br />
            <span className="text-indigo-400">code in real time</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-slate-400 mt-4 text-lg whitespace-pre-line"
          >
            Whether you’re interviewing, pair programming,
            or teaching. Share a link, invite your team,
            and start coding together instantly.
          </motion.p>

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-2"
          >
            <Features />
          </motion.div>

          {/* Create / Join Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-8 grid gap-16 md:grid-cols-2"
          >
            <Createroom />
            <Joinroom />
          </motion.div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-200"
            >
              {error}
            </motion.p>
          )}

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8 flex flex-wrap items-center gap-2 text-xs text-slate-400"
          >
            <ShieldCheck className="h-4 w-4 animate-bounce" />
            Multiple users <span className="mx-1">•</span>
            Syntax highlighting <span className="mx-1">•</span>
            Shareable links <span className="mx-1">•</span>
            Save Code <span className="mx-1">•</span>
            Live rooms & chat
          </motion.div>
        </motion.div>

        {/* Right side visual */}
        <Editra />
      </section>

      {/* ---------- MOBILE VIEW ---------- */}
      <section className="block md:hidden px-4 py-10 text-center ">
        <h1 className="text-2xl font-bold leading-snug">
          Collaborate on <br />
          <span className="text-indigo-400">code in real time</span>
        </h1>
        <p className="text-slate-400 mt-3 text-sm">
          Share a link, invite your team, and start coding together instantly.
        </p>

        <div className="mt-8 grid gap-6">
          <Createroom />
          <Joinroom />
        </div>
      </section>

      {/* Footer */}
      <p className="text-center text-slate-300 text-sm sm:text-base italic px-4">
        Code faster<span className="mx-1">•</span>
        Code smarter<span className="mx-1">•</span>
        Code together<span className="mx-1">•</span>
        Anytime<span className="mx-1">•</span>
        Anywhere<span className="mx-1">•</span>
        With anyone
      </p>

      <div className="text-center text-slate-400 mt-2 flex items-center justify-center gap-1">
        <FaRegCopyright /> {new Date().getFullYear()} Editra
      </div>
    </div>
  );
}
