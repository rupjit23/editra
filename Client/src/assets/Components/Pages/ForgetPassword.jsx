// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { X } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
// import { FaArrowLeft } from "react-icons/fa";
// import Navbar from "../HomePageComponents/Navbar"
// function ForgetPassword() {

//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors, isSubmitting },
//   } = useForm();

//   const onSubmit = async (value) => {
//     console.log("Submitted Data:", value);
//     await new Promise((resolve) => setTimeout(resolve, 500));
//     reset();
//     navigate("/dashboard");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50 px-4">
//       <Navbar></Navbar>
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         className="relative w-full max-w-md rounded-2xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl backdrop-blur-xl"
//       >
//         {/* Close Button */}
//         <button
//           onClick={() => navigate("/login")}
//           className="absolute top-3 right-3 rounded-full bg-white/10 p-1 hover:bg-white/20"
//         >
//           <X className="h-5 w-5 text-slate-300 cursor-pointer" />
//         </button>

//         {/* Title */}
//         <h2 className="text-lg font-semibold mb-6 text-center text-white">
//           Reset your password
//         </h2>

//         {/* Form */}
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           {/* Email */}
//           <div>
//             <label className="block text-slate-300 mb-1 text-sm">
//               Email Address
//             </label>
//             <div className="relative">
//               <input
//                 type="email"
//                 placeholder="Enter email address"
//                 {...register("emailAddress", {
//                   required: "Email Address is required",
//                   pattern: {
//                     value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//                     message: "Invalid Email Address",
//                   },
//                 })}
//                 className="w-full pl-10 pr-3 py-2 rounded-xl border border-white/10 bg-slate-800 text-sm text-white outline-none focus:border-indigo-500"
//               />
//               <FontAwesomeIcon
//                 icon={faEnvelope}
//                 className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
//               />
//             </div>
//             {errors.emailAddress && (
//               <p className="mt-1 text-xs italic font-medium text-rose-400 px-2 rounded-md animate-pulse">
//                 {errors.emailAddress.message}
//               </p>
//             )}
//           </div>

//           {/* Submit */}
//           <motion.button
//             whileTap={{ scale: 0.97 }}
//             disabled={isSubmitting}
//             type="submit"
//             className="inline-flex w-full items-center justify-center rounded-xl bg-indigo-500 px-4 py-2 text-base font-medium text-white hover:bg-indigo-700 disabled:opacity-50 cursor-pointer"
//           >
//             {isSubmitting ? "Submitting..." : "Submit"}
//           </motion.button>
//         </form>

//         {/* Footer */}
//         <p className="mt-3 text-slate-400 text-sm flex items-center gap-2 cursor-pointer">
//   <FaArrowLeft className="text-indigo-200" />
//   <span
//     onClick={() => navigate("/login")}
//     className="text-indigo-200 hover:underline"
//   >
//     Back To Login
//   </span>
// </p>

//       </motion.div>
//     </div>
//   );
// }

// export default ForgetPassword;


import React, { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FaArrowLeft } from "react-icons/fa";
import Navbar from "../HomePageComponents/Navbar";
import { supabase } from "../../../createClient"; // make sure path is correct

function ForgetPassword() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (value) => {
    setErrorMessage(""); // reset error state
    try {
      // Check if email exists in Supabase auth
      const { data, error } = await supabase
        .from("auth.Users") // system table with users
        .select("email")
        .eq("email", value.emailAddress)
        .single();

      if (error || !data) {
        setErrorMessage("You are not a registered user. Please check your email ID.");
        return;
      }

      // ✅ Email exists → move to reset password page
      reset();
      navigate("/update-password", { state: { email: value.emailAddress } });
    } catch (err) {
      console.error("Error checking email:", err);
      setErrorMessage("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      {/* Navbar fixed at top */}
      <Navbar />

      {/* Centered Form */}
      <div className="flex items-center justify-center px-4 py-40">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative w-full max-w-md rounded-2xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl backdrop-blur-xl"
        >
          {/* Close Button
          <button
            onClick={() => navigate("/login")}
            className="absolute top-3 right-3 rounded-full bg-white/10 p-1 hover:bg-white/20"
          >
            <X className="h-5 w-5 text-slate-300 cursor-pointer" />
          </button> */}

          {/* Title */}
          <h2 className="text-lg font-semibold mb-6 text-center text-white">
            Reset your password
          </h2>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-slate-300 mb-1 text-sm">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter email address"
                  {...register("emailAddress", {
                    required: "Email Address is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid Email Address",
                    },
                  })}
                  className="w-full pl-10 pr-3 py-2 rounded-xl border border-white/10 bg-slate-800 text-sm text-white outline-none focus:border-indigo-500"
                />
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>
              {errors.emailAddress && (
                <p className="mt-1 text-xs italic font-medium text-rose-400 px-2 rounded-md animate-pulse">
                  {errors.emailAddress.message}
                </p>
              )}
            </div>

            {/* Show error if email not found */}
            {errorMessage && (
              <p className="text-sm text-rose-400 font-medium text-center animate-pulse">
                {errorMessage}
              </p>
            )}

            {/* Submit */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              disabled={isSubmitting}
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-xl bg-indigo-500 px-4 py-2 text-base font-medium text-white hover:bg-indigo-700 disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? "Checking..." : "Submit"}
            </motion.button>
          </form>

          {/* Footer */}
          <p className="mt-3 text-slate-400 text-sm flex items-center gap-2 cursor-pointer">
            <FaArrowLeft className="text-indigo-200" />
            <span
              onClick={() => navigate("/login")}
              className="text-indigo-200 hover:underline"
            >
              Back To Login
            </span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default ForgetPassword;
