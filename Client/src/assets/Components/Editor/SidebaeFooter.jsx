import React from "react";
import { motion } from "framer-motion";
import { FaCopy } from "react-icons/fa";
import { IoIosExit } from "react-icons/io";
import toast from "react-hot-toast";

function SidebarFooter({ roomId, isSidebarHovered, navigate }) {
  const handleCopyRoomId = () => {
    navigator.clipboard.writeText(roomId);
    toast.success(`Room ID ${roomId} copied!`);
  };

  return (
    <div className="p-5">
      <motion.div initial={false} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
        {isSidebarHovered ? (
          <div className="space-y-3">
            <button
              onClick={handleCopyRoomId}
              className="w-full py-2 rounded-xl font-semibold bg-gradient-to-r from-indigo-500 to-pink-500"
            >
              Copy Room ID
            </button>
            <button
              onClick={() => navigate("/")}
              className="w-full py-2 rounded-xl font-semibold bg-gradient-to-r from-red-500 to-pink-500"
            >
              Leave
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-4">
            <button
              onClick={handleCopyRoomId}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-500"
              title="Copy Room ID"
            >
              <FaCopy size={18} />
            </button>
            <button
              onClick={() => navigate("/")}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-red-500"
              title="Leave Room"
            >
              <IoIosExit size={20} />
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default SidebarFooter;
