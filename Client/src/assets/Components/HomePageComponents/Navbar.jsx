
// import React from "react"
// import { motion } from "framer-motion"
// import { useNavigate } from "react-router-dom"
// import { LogIn, UserPlus } from "lucide-react"
// import Logo from "../Images/Logo11.png"

// function Navbar() {
//   const navigate = useNavigate()

//   return (
//     <motion.header
//       initial={{ y: -50, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ duration: 0.6 }}
//       className="sticky top-0 z-40 border-b border-white/10 backdrop-blur"
//     >
//       <nav className="mx-auto flex max-w-6xl items-center justify-between  py-3">
//         {/* Logo Section */}
//         <motion.div
//           initial={{ opacity: 0, x: -30 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: 0.2, duration: 0.3 }}
//           className="flex items-center cursor-pointer mr-auto"
//           onClick={() => navigate("/")} 
//         >
//           <img
//             src={Logo}
//             alt="Editra Logo"
//             className="h-10 w-auto object-contain select-none transition-transform duration-300 hover:scale-110 drop-shadow-xl"
//             draggable="false"
//           />
//         </motion.div>

//         {/* Links Section */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.4 }}
//           className="hidden md:flex space-x-7 text-slate-300  font-medium"
//         >
//           <button
//             onClick={() => navigate("/")}
//             className="hover:text-white transition cursor-pointer"
//           >
//             Home
//           </button>
//           <button
//             onClick={() => navigate("/about")}
//             className="hover:text-white transition cursor-pointer"
//           >
//             About
//           </button>
//           <button
//             onClick={() => navigate("/docs")}
//             className="hover:text-white transition cursor-pointer"
//           >
//             Docs
//           </button>
//           <button
//             onClick={() => navigate("/privacy")}
//             className="hover:text-white transition cursor-pointer"
//           >
//             Privacy
//           </button>
//           <button
//             onClick={() => navigate("/contact")}
//             className="hover:text-white transition cursor-pointer"
//           >
//             Contact
//           </button>
//           {/* <button
//             onClick={() =>
//               window.open("https://github.com/yourusername/yourrepo", "_blank")
//             }
//             className="hover:text-white transition cursor-pointer"
//           >
//             GitHub
//           </button> */}
//         </motion.div>

//         {/* Buttons Section */}
//         <motion.div
//           initial={{ opacity: 0, x: 30 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: 0.3, duration: 0.6 }}
//           className="flex items-center gap-3 ml-auto"
//         >
//           <button
//             onClick={() => navigate("/login")}
//             className="rounded-xl border border-white/10 px-3 py-2  hover:bg-white/5 active:scale-[.98] cursor-pointer text-white"
//           >
//             <span className="inline-flex items-center gap-1">
//               <LogIn className="h-4 w-4" /> Login
//             </span>
//           </button>

//           <button
//             onClick={() => navigate("/sign-up")}
//             className="rounded-xl bg-indigo-600 px-3 py-2  font-medium hover:bg-indigo-500 active:scale-[.98] shadow-md shadow-indigo-600/30 cursor-pointer text-white"
//           >
//             <span className="inline-flex items-center gap-1">
//               <UserPlus className="h-4 w-4" /> Sign up
//             </span>
//           </button>
//         </motion.div>
//       </nav>
//     </motion.header>
//   )
// }

// export default Navbar

 // responsive

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { LogIn, UserPlus, Menu, X } from "lucide-react"
import Logo from "../Images/Logo11.png"

function Navbar() {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-40 border-b border-white/10 backdrop-blur"
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between py-3 px-4 md:px-0">
        {/* Logo Section */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="flex items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src={Logo}
            alt="Editra Logo"
            className="h-10 w-auto object-contain select-none transition-transform duration-300 hover:scale-110 drop-shadow-xl"
            draggable="false"
          />
        </motion.div>

        {/* Desktop Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="hidden md:flex space-x-7 text-slate-300 font-medium"
        >
          <button onClick={() => navigate("/")} className="hover:text-white transition cursor-pointer">
            Home
          </button>
          <button onClick={() => navigate("/about")} className="hover:text-white transition cursor-pointer">
            About
          </button>
          <button onClick={() => navigate("/docs")} className="hover:text-white transition cursor-pointer">
            Docs
          </button>
          <button onClick={() => navigate("/privacy")} className="hover:text-white transition cursor-pointer">
            Privacy
          </button>
          <button onClick={() => navigate("/contact")} className="hover:text-white transition cursor-pointer">
            Contact
          </button>
        </motion.div>

        {/* Desktop Buttons */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="hidden md:flex items-center gap-3"
        >
          <button
            onClick={() => navigate("/login")}
            className="rounded-xl border border-white/10 px-3 py-2 hover:bg-white/5 active:scale-[.98] cursor-pointer text-white"
          >
            <span className="inline-flex items-center gap-1">
              <LogIn className="h-4 w-4" /> Login
            </span>
          </button>

          <button
            onClick={() => navigate("/sign-up")}
            className="rounded-xl bg-indigo-600 px-3 py-2 font-medium hover:bg-indigo-500 active:scale-[.98] shadow-md shadow-indigo-600/30 cursor-pointer text-white"
          >
            <span className="inline-flex items-center gap-1">
              <UserPlus className="h-4 w-4" /> Sign up
            </span>
          </button>
        </motion.div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-slate-900 border-t border-slate-800 px-4 py-6 space-y-4 text-slate-300 font-medium"
          >
            <button onClick={() => {navigate("/"); setMenuOpen(false)}} className="block w-full text-left hover:text-white  cursor-pointer">
              Home
            </button>
            <button onClick={() => {navigate("/about"); setMenuOpen(false)}} className="block w-full text-left hover:text-white cursor-pointer">
              About
            </button>
            <button onClick={() => {navigate("/docs"); setMenuOpen(false)}} className="block w-full text-left hover:text-white cursor-pointer">
              Docs
            </button>
            <button onClick={() => {navigate("/privacy"); setMenuOpen(false)}} className="block w-full text-left hover:text-white cursor-pointer">
              Privacy
            </button>
            <button onClick={() => {navigate("/contact"); setMenuOpen(false)}} className="block w-full text-left hover:text-white cursor-pointer">
              Contact
            </button>

            {/* Mobile Login/Signup */}
           <div className="flex justify-center gap-6 pt-4">
  <button
    onClick={() => {navigate("/login"); setMenuOpen(false)}}
    className="w-30 text-center rounded-xl border bg-indigo-600 border-white/10 px-3 py-2 hover:bg-indigo-500 cursor-pointer text-white"
  >
    <span className="inline-flex items-center gap-1">
      <LogIn className="h-4 w-4" /> Login
    </span>
  </button>

  <button
    onClick={() => {navigate("/sign-up"); setMenuOpen(false)}}
    className="w-30 text-center rounded-xl bg-indigo-600 px-3 py-2 font-medium hover:bg-indigo-500 shadow-md shadow-indigo-600/30 cursor-pointer text-white"
  >
    <span className="inline-flex items-center gap-1">
      <UserPlus className="h-4 w-4" /> Sign up
    </span>
  </button>
</div>

          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Navbar
