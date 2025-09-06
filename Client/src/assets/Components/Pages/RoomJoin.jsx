import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

function Joinroom() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  // handle form submit (join room)
  const onSubmit = async (value) => {
    const username = value.username?.trim();
    const roomId = value.roomId?.trim();

    if (!roomId) {
      toast.error("Please enter a Room ID!");
      return;
    }
    if (!username) {
      toast.error("Please enter a Username!");
      return;
    }

    toast.success(`Joining room as ${username}`, {
      style: {
        borderRadius: "10px",
        background: "white",
        color: "black",
      },
    });

    // console.log("Joining Room:", { username, roomId });

    await new Promise((resolve) => setTimeout(resolve, 500));

    navigate(`/editor/${roomId}`, { state: { username } });
  };

  return (
    <div className="w-full max-w-md mx-auto rounded-2xl border border-white/10 bg-slate-900/90 p-6 shadow-2xl mt-10">
      <h2 className="text-lg font-semibold mb-4">Join a Room</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        {/* Room ID */}
        <div>
          <label className="block text-slate-300 mb-1 text-sm">Room ID</label>
          <input
            {...register("roomId")}
            type="text"
            placeholder="Enter Room ID"
            className="w-full px-3 py-2 rounded-xl border border-white/10 bg-slate-800 text-sm outline-none focus:border-indigo-500"
          />
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

        {/* Submit Join */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          disabled={isSubmitting}
          type="submit"
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-2 text-sm font-medium hover:bg-green-500 disabled:opacity-50 cursor-pointer"
        >
          {isSubmitting ? "Joining..." : "Join Room"}
        </motion.button>
      </form>

      {/* Back to Create Room */}
      <p className="mt-4 text-center text-slate-400 text-sm">
        Want to create a new Room?{" "}
        <span
          onClick={() => navigate("/room/create")}
          className="text-indigo-400 hover:underline cursor-pointer"
        >
          Create
        </span>
      </p>
    </div>
  );
}

export default Joinroom;
