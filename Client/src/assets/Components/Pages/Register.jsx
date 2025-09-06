


import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { supabase } from "../../../createClient";
import toast, { Toaster } from "react-hot-toast";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
import { MdEmail } from "react-icons/md";
import Navbar from "../HomePageComponents/Navbar";
import SignUp from "../Images/SignUp.png"
import CodeBlocks from "./CodeBlocks";
function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [verifyEmailSent, setVerifyEmailSent] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  //  Email/Password SignUp
  // const onSubmit = async (values) => {
  //   try {
  //     const { error } = await supabase.auth.signUp({
  //       email: values.email,
  //       password: values.password,
  //       options: {
  //         data: { username: values.username },
  //         emailRedirectTo: `${window.location.origin}/dashboard`,
  //       },
  //     });

  //     if (error) {
  //       toast.error(error.message, {
  //         style: { background: "#1f2937", color: "#fff", borderRadius: "8px" },
  //       });
  //       return;
  //     }

  //     setUserEmail(values.email);
  //     setVerifyEmailSent(true); // show verification screen
  //     reset();
  //   } catch (err) {
  //     toast.error("Something went wrong. Please try again.", {
  //       style: { background: "#1f2937", color: "#fff", borderRadius: "8px" },
  //     });
  //   }
   
  // };
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const onSubmit = async (values) => {
  try {
    const { error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: { username: values.username },
      },
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    // generate OTP
    const otp = generateOTP();

    // save OTP in Supabase
    await supabase.from("email_otp").insert({
      email: values.email,
      otp,
    });

    // TODO: send email using Resend/SendGrid/SMTP
    // For now just log it
    // console.log("OTP:", otp);

    // redirect user to verify-otp page with params
    navigate(`/verify-otp?email=${values.email}&username=${values.username}`);
  } catch (err) {
    toast.error("Something went wrong.");
  }
};

// useEffect(() => {
//   const checkSession = async () => {
//     const { data, error } = await supabase.auth.getSession();
//     if (error || !data.session) return;

//     const user = data.session.user;

//     const userInfo = {
//       username:
//         user.user_metadata?.username ||   // email/password signup
//         user.user_metadata?.user_name ||  // GitHub username
//         user.user_metadata?.full_name ||  // Google full name
//         user.user_metadata?.name ||       // other providers
//         user.email?.split("@")[0],        // fallback
//       email: user.email,
//     };

//     localStorage.setItem("user", JSON.stringify(userInfo));
//     toast.success("Login successful!");
//     navigate("/dashboard");
//   };

//   if (location.hash || location.search) {
//     checkSession();
//   }
// }, [location, navigate]);

 useEffect(() => {
  const checkSession = async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error || !data.session) return;

    const user = data.session.user;

    const userInfo = {
      username:
        user.user_metadata?.username ||
        user.user_metadata?.user_name ||
        user.user_metadata?.full_name ||
        user.user_metadata?.name ||
        user.email?.split("@")[0],
      email: user.email,
    };

    localStorage.setItem("user", JSON.stringify(userInfo));
    toast.success("Login successful!");
    navigate("/dashboard");   // 🚀 auto-login after redirect
  };

  checkSession();

  //  Listen for login events (important after email verification redirect)
  const { data: listener } = supabase.auth.onAuthStateChange(
    async (event, session) => {
      if (session) {
        const user = session.user;
        const userInfo = {
          username:
            user.user_metadata?.username ||
            user.user_metadata?.user_name ||
            user.user_metadata?.full_name ||
            user.user_metadata?.name ||
            user.email?.split("@")[0],
          email: user.email,
        };
        localStorage.setItem("user", JSON.stringify(userInfo));
        navigate("/dashboard");
      }
    }
  );

  return () => {
    listener.subscription.unsubscribe();
  };
}, [navigate]);


  // 🔥 OAuth (Google / GitHub)
  const handleOAuthLogin = async (provider) => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/dashboard`, // after login redirect
      },
    });

    if (error) {
      toast.error(error.message, {
        style: { background: "#1f2937", color: "#fff", borderRadius: "8px" },
      });
    }
  } catch (err) {
    toast.error("Something went wrong. Please try again.");
  }
};


 return (
  <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col">
    <Toaster position="top-right" reverseOrder={false} />

    {/* Fixed Navbar */}
    <div className="fixed top-0 left-0 w-full z-50">
      <Navbar />
    </div>

    {/* Main Content */}
    <div className="flex flex-1 items-center justify-center px-6 pt-20">
      <div className="flex w-full max-w-6xl items-center justify-between gap-10 p-10">
        {/* Left Side - Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-full md:max-w-md p-8 space-y-3 bg-slate-800 
             rounded-2xl shadow-xl border border-slate-700"
        >
          {/* Close Button */}
          {/* <button
            onClick={() => navigate("/")}
            className="absolute top-4 right-4 z-10 flex items-center justify-center 
               w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition"
          > */}
            {/* <X className="h-5 w-5 text-slate-300 cursor-pointer" />
          </button> */}

          {/* Title */}
          <h2 className="text-2xl font-bold text-center text-white">
            Create Your Account
          </h2>

          {/* Signup Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-sm text-slate-300">Username</label>
              <div className="flex items-center mt-1 bg-slate-700 rounded-xl p-3 border border-slate-600">
                <FontAwesomeIcon icon={faUser} className="text-slate-400 mr-2" />
                <input
                  type="text"
                  placeholder="Enter your username"
                  {...register("username", { required: "Username is required" })}
                  className="w-full bg-transparent outline-none text-white"
                />
              </div>
              {errors.username && (
                <p className="text-yellow-500 text-sm mt-1 italic">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm text-slate-300">Email</label>
              <div className="flex items-center mt-1 bg-slate-700 rounded-xl p-3 border border-slate-600">
                <FontAwesomeIcon icon={faEnvelope} className="text-slate-400 mr-2" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                      message: "Invalid email address",
                    },
                  })}
                  className="w-full bg-transparent outline-none text-white"
                />
              </div>
              {errors.email && (
                <p className="text-yellow-500 text-sm mt-1 italic">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-slate-300">Password</label>
              <div className="flex items-center mt-1 bg-slate-700 rounded-xl p-3 border border-slate-600">
                <FontAwesomeIcon icon={faLock} className="text-slate-400 mr-2" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...register("password", { required: "Password is required" })}
                  className="w-full bg-transparent outline-none text-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-400 ml-2 cursor-pointer"
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
              {errors.password && (
                <p className="text-yellow-500 text-sm mt-1 italic">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              disabled={isSubmitting}
              type="submit"
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 rounded-xl text-white font-semibold shadow-md transition cursor-pointer"
            >
              {isSubmitting ? "Creating..." : "Sign Up"}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="flex items-center space-x-2 my-1">
            <div className="flex-1 h-px bg-slate-600"></div>
            <p className="text-center text-slate-400 my-4 text-sm">
              Or continue with
            </p>
            <div className="flex-1 h-px bg-slate-600"></div>
          </div>

          {/* Social Logins */}
          <div className="flex justify-center gap-4">
            <button
              onClick={() => handleOAuthLogin("google")}
              className="p-3 w-12 h-12 flex items-center justify-center rounded-xl border border-white/10 bg-slate-800/70 text-slate-300 hover:text-white hover:bg-slate-700 hover:border-indigo-500 transition-all duration-300 shadow-md hover:shadow-indigo-500/30 cursor-pointer"
            >
              <FontAwesomeIcon icon={faGoogle} size="lg" />
            </button>

            <button
              onClick={() => handleOAuthLogin("github")}
              className="p-3 w-12 h-12 flex items-center justify-center rounded-xl border border-white/10 bg-slate-800/70 text-slate-300 hover:text-white hover:bg-slate-700 hover:border-indigo-500 transition-all duration-300 shadow-md hover:shadow-indigo-500/30 cursor-pointer"
            >
              <FontAwesomeIcon icon={faGithub} size="lg" />
            </button>
          </div>

          {/* Footer */}
          {/* <p className="mt-6 text-center text-slate-400 text-sm">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-indigo-400 hover:underline cursor-pointer"
            >
              Login
            </span>
          </p> */}
          <p className="mt-3"></p>
        </motion.div>

        {/* Right Side - Image */}
        <motion.div
  initial={{ opacity: 0, x: 50 }}   // start faded & shifted right
  animate={{ opacity: 1, x: 0 }}    // fade in + slide to place
  transition={{ delay: 0.6, duration: 0.7, ease: "easeOut" }} // delay & smooth
  className="hidden md:block w-full max-w-md relative bg-slate-800 rounded-xl shadow-lg overflow-hidden"
>
       <div className="hidden md:block w-full max-w-md relative bg-slate-800 rounded-xl shadow-lg overflow-hidden ">
  {/* Title Bar */}
  <div className="bg-slate-700 text-white text-sm font-semibold px-4 py-2 border-b border-slate-900">
    editra.file
  </div>

  {/* Code Block */}
  <div > {/* reduced padding to remove extra space */}
    <CodeBlocks
      position={"lg:flex-row"}
      codeColor={"text-white-25"}
      codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>editra</title>\n</head>\n<body>\n<h1>Welcome to editra</h1>\n<a href="/login">Login</a>\n <a href="/sign-up">SignUp</a>\n <a href="/editor">Editor</a>\n</body>`}
      backgroundGradient={<div className="codeblock1 absolute inset-1"></div>}
    />
  </div>
<div className="h-35"></div>
  {/* Image overlay at bottom */}
  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[85%] pointer-events-none">
    <img
      src={SignUp}
      alt="Sign Up Illustration"
      className="w-full h-auto object-contain translate-y-13" 
    />
  </div>
</div>

</motion.div>

      </div>
    </div>
  </div>
);

}

export default Register;
