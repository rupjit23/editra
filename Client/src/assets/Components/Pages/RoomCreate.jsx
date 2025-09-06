import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { FaCopy } from "react-icons/fa";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

function Createroom() {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  // stable roomId
  const [newId] = useState(() => uuidv4());

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  // handle form submit (create room)
  const onSubmit = async (value) => {
    const username = value.username?.trim() || "Anonymous";
    const roomId = value.roomId?.trim() || newId;

    toast.success(`Username set as ${username}`, {
      style: {
        borderRadius: "10px",
        background: "white",
        color: "black",
      },
    });

    // console.log("Created Room:", { username, roomId });

    await new Promise((resolve) => setTimeout(resolve, 500));
    reset();

    navigate(`/editor/${roomId}`, { state: { username } });
  };

  // copy roomId
  function copyRoomId() {
    navigator.clipboard.writeText(newId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  // join room
  function joinRoom(roomId, username) {
    if (!roomId?.trim()) {
      toast.error("Please enter a Room ID to join!");
      return;
    }
    if (!username?.trim()) {
      toast.error("Please enter a Username!");
      return;
    }
    navigate(`/editor/${roomId}`, { state: { username } });
  }

  return (
    <div className="w-full max-w-md mx-auto rounded-2xl border border-white/10 bg-slate-900/90 p-6 shadow-2xl mt-10">
      <h2 className="text-lg font-semibold mb-4">Create a Room</h2>

      {/* Create Room Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        {/* Room ID (readonly new one) */}
        <div>
          <label className="block text-slate-300 mb-1 text-sm">Room ID</label>
          <div className="relative">
            <input
              value={newId}
              readOnly
              {...register("roomId")}
              className="w-full px-3 py-2 pr-10 rounded-xl border border-white/10 bg-slate-800 text-sm outline-none focus:border-indigo-500"
            />

            {/* Copy button */}
            <button
              type="button"
              onClick={copyRoomId}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-400"
            >
              <FaCopy size={18} />
            </button>

            {copied && (
              <span className="absolute -top-5 right-2 text-green-400 text-xs font-medium">
                Copied!
              </span>
            )}
          </div>
        </div>

        {/* Username */}
        <div>
          <label className="block text-slate-300 mb-1 text-sm">Username</label>
          <input
            {...register("username")}
            type="text"
            placeholder="Enter your username"
            className="w-full px-3 py-2 rounded-xl border border-white/10 bg-slate-800 text-sm outline-none focus:border-indigo-500"
          />
        </div>

        {/* Submit Create */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          disabled={isSubmitting}
          type="submit"
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium hover:bg-indigo-500 disabled:opacity-50 cursor-pointer"
        >
          {isSubmitting ? "Creating..." : "Create Room"}
        </motion.button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-2 my-4">
        <div className="flex-1 h-px bg-slate-700"></div>
        <span className="text-slate-400 text-sm">or</span>
        <div className="flex-1 h-px bg-slate-700"></div>
      </div>

      {/* Join Room Section */}
      <p className="mt-4 text-center text-slate-400 text-sm">
          Already have an Room Id?
          <span
            onClick={() => navigate("/room/join")}
            className="text-indigo-400 hover:underline cursor-pointer"
          >
            Join
          </span>
        </p>
    </div>
  );
}

export default Createroom;
