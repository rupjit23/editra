

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link2, Users, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { GiKnot } from "react-icons/gi";
import { TbBrandTorchain } from "react-icons/tb";

function Joinroom() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (value) => {
    const username = value.username?.trim() || "Anonymous";
    const finalData = { ...value, username };

    // console.log("Joining Room:", finalData);

    await new Promise((resolve) => setTimeout(resolve, 500));
    reset();

    navigate(`/editor/${value.roomId}`, { state: { username } });
    setOpen(false);
  };

  return (
    <>
      {/* Trigger Card */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg"
      >
        <div className="mb-3 flex items-center gap-2 font-semibold text-lg">
          <Link2 className="h-5 w-5" /> Join a room
        </div>
        <div className="space-y-3">
          <div>
           
            <input
              onFocus={() => setOpen(true)}
              placeholder="Enter Your Name"
              className="w-full h-9 flex items-center justify-between rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 text-xs  text-semibold text-slate-500"
            />
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setOpen(true)}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/10 px-5 py-3 text-base font-semibold hover:bg-white/20 cursor-pointer"
          >
            <GiKnot className="h-6 w-6" />
            Join Room
          </motion.button>
        </div>
      </motion.div>

      {/* Modal + Backdrop */}
      <AnimatePresence>
        {open && (
          <>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            />

            
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="fixed inset-0 flex items-center justify-center z-50"
            >
              <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-slate-900/90 p-6 shadow-2xl">
                {/* Close button */}
                <button
                  onClick={() => setOpen(false)}
                  className="absolute top-3 right-3 rounded-full bg-white/10 p-2 hover:bg-white/20"
                >
                  <X className="h-6 w-6 text-slate-300 cursor-pointer" />
                </button>

                <h2 className="text-xl font-semibold mb-5 flex items-center gap-2">
                  <Users className="h-6 w-6" /> Join a Room
                </h2>

                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  
                  <div>
                    <label className="block text-slate-300 mb-2 text-base">
                      Room ID
                    </label>
                    <input
                      {...register("roomId", {
                        required: "Room ID is required",
                        minLength: {
                          value: 4,
                          message: "Room ID must be at least 4 characters",
                        },
                      })}
                      type="text"
                      placeholder="Enter Room ID"
                      className="w-full px-4 py-3 pr-12 rounded-xl border border-white/10 bg-slate-800 text-base outline-none focus:border-indigo-500"
                    />
                    <p className="h-1 text-yellow-500 text-sm mt-1">
                      {errors.roomId?.message}
                    </p>
                  </div>

                  
                  <div>
                    <label className="block text-slate-300 mb-1 text-base">
                      Username
                    </label>
                    <input
                      {...register("username")}
                      type="text"
                      placeholder="Enter your username"
                      className="w-full px-4 py-3 rounded-xl border border-white/10 bg-slate-800 text-base outline-none focus:border-indigo-500"
                    />
                  </div>

                  {/* Submit */}
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    disabled={isSubmitting}
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-base font-semibold hover:bg-indigo-500 disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? "Joining..." : "Join Room"}
                  </motion.button>
                </form>

                
                <Toaster position="top-center" reverseOrder={false} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Joinroom;
