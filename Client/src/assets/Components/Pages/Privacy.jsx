import React from "react";
import { motion } from "framer-motion";
import Navbar from "../HomePageComponents/Navbar";
import { Lock, ShieldCheck, Key, UserCheck } from "lucide-react";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <Navbar />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-grow px-6 py-16 max-w-5xl mx-auto"
      >
        {/* Title */}
        <h2 className="text-4xl font-bold text-indigo-400 mb-10 text-center">
          Privacy & Security
        </h2>

        {/* Intro */}
        <p className="text-slate-300 text-lg text-center mb-12 leading-relaxed">
          At <span className="text-indigo-400 font-semibold">Editra</span>, your
          privacy and security are our top priorities. Every feature is designed
          to make your coding sessions{" "}
          <span className="text-white font-medium">safe, private, and secure</span>.
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* End-to-End Encryption */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-slate-900 p-6 rounded-2xl shadow-lg border border-slate-800"
          >
            <Lock className="text-indigo-400 mb-3" size={28} />
            <h3 className="text-xl font-semibold text-white mb-2">
              End-to-End Encrypted Rooms
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              All your rooms are protected with{" "}
              <span className="text-indigo-300 font-medium">
                end-to-end encryption
              </span>
              , ensuring that only you and your invited collaborators can see
              the code.
            </p>
          </motion.div>

          {/* Authentication */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-slate-900 p-6 rounded-2xl shadow-lg border border-slate-800"
          >
            <UserCheck className="text-indigo-400 mb-3" size={28} />
            <h3 className="text-xl font-semibold text-white mb-2">
              Secure Authentication
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              We use{" "}
              <span className="text-indigo-300 font-medium">
                verified login & signup
              </span>{" "}
              systems with secure password handling and optional OAuth (Google,
              GitHub, etc.) for quick access.
            </p>
          </motion.div>

          {/* Session Privacy */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-slate-900 p-6 rounded-2xl shadow-lg border border-slate-800"
          >
            <ShieldCheck className="text-indigo-400 mb-3" size={28} />
            <h3 className="text-xl font-semibold text-white mb-2">
              Private Sessions
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              No one outside your team can join without your{" "}
              <span className="text-indigo-300 font-medium">Room ID</span>. You
              have full control over who enters your workspace.
            </p>
          </motion.div>

          {/* Data Protection */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-slate-900 p-6 rounded-2xl shadow-lg border border-slate-800"
          >
            <Key className="text-indigo-400 mb-3" size={28} />
            <h3 className="text-xl font-semibold text-white mb-2">
              Data Protection
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Your files, messages, and activity remain{" "}
              <span className="text-indigo-300 font-medium">confidential</span>.
              We never share your data with third parties.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Privacy;
