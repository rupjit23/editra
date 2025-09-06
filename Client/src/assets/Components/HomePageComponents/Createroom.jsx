

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlusCircle, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { FaCopy } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { BsRocketTakeoffFill } from "react-icons/bs";

function Createroom() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false); 
  const [copied, setCopied] = useState(false);

  
  const [newId] = useState(() => uuidv4());

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  
  const onSubmit = async (value) => {
    const username = value.username?.trim() || "Anonymous";
    const roomId = value.roomId?.trim() || newId;
    const finalData = { ...value, username, roomId };

    toast.success(`Username set as ${username}`, {
      style: {
        borderRadius: "10px",
        background: "white",
        color: "black",
      },
    });

    // console.log("Created Room:", finalData);

    await new Promise((resolve) => setTimeout(resolve, 500));
    reset();

    setOpen(false); 
    navigate(`/editor/${roomId}`, { state: { username } });
  };

  function copyRoomId() {
    navigator.clipboard.writeText(newId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <>
      
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg  h-48"
      >
        <div className="mb-3 flex items-center gap-2 font-semibold text-lg">
          <PlusCircle className="h-6 w-6" /> Create a room
        </div>
        <div className="space-y-3">
           <div   onClick={() => setOpen(true)} className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 text-xs text-slate-400">
                   Suggested ID: <code className="tracking-widest">{`E79JDZXS`}</code>
                 </div>

        <motion.button
  whileTap={{ scale: 0.97 }}
  animate={{
    y: [1, -1, 1], 
  }}
  transition={{
    duration: 2,   
    repeat: Infinity, 
    ease: "easeInOut",
  }}
  onClick={() => setOpen(true)} 
  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-base font-semibold hover:bg-indigo-500 cursor-pointer"
>
  <BsRocketTakeoffFill className="h-6 w-6" />
  Start coding now
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
              <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-slate-900/90 p-8 shadow-2xl">
               
                <button
                  onClick={() => setOpen(false)}
                  className="absolute top-3 right-3 rounded-full bg-white/10 p-2 hover:bg-white/20"
                >
                  <X className="h-6 w-6 text-slate-300 cursor-pointer" />
                </button>

                <h2 className="text-xl font-semibold mb-5 flex items-center gap-2">
                  <PlusCircle className="h-6 w-6" /> Create a Room
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  
                  <div>
                    <label className="block text-slate-300 mb-2 text-base">
                      Room ID
                    </label>
                    <div className="relative">
                      <input
                        value={newId}
                        readOnly
                        {...register("roomId")}
                        className="w-full px-4 py-3 pr-12 rounded-xl border border-white/10 bg-slate-800 text-base outline-none focus:border-indigo-500"
                      />

                     
                      <button
                        type="button"
                        onClick={copyRoomId}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-400"
                      >
                        <FaCopy size={20} />
                      </button>

                      {copied && (
                        <span className="absolute -top-6 right-2 text-green-400 text-sm font-medium cursor-pointer">
                          Copied!
                        </span>
                      )}
                    </div>
                  </div>

                  
                  <div>
                    <label className="block text-slate-300 mb-2 text-base">
                      Username
                    </label>
                    <input
                      {...register("username")}
                      type="text"
                      placeholder="Enter your username"
                      className="w-full px-4 py-3 rounded-xl border border-white/10 bg-slate-800 text-base outline-none focus:border-indigo-500"
                    />
                  </div>

                 
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    disabled={isSubmitting}
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-base font-semibold hover:bg-indigo-500 disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? "Creating..." : "Create Room"}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Createroom;
