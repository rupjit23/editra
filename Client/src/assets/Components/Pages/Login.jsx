



import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
import { supabase } from "../../../createClient";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { X } from "lucide-react";
import Navbar from "../HomePageComponents/Navbar";
import LoginImg from "../Images/Login.png"
import CodeBlocks from "./CodeBlocks";
import Boy from "../Images/Boy.png"
import Girl from "../Images/Girl.png"
import Girl_with_laptop from "../Images/Girl_with_laptop.png"
import image1 from "../Images/image1.jpeg"
import image2 from "../Images/image2.jpeg"
import boy_with_laptop from "../Images/boy_with_laptop.png"
import girl_with_laptop from "../Images/girl_with_laptop1.png"

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Email/Password login
 const onSubmit = async (formData) => {
  const { email, password } = formData;

  const { data: signInData, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    toast.error(error.message);
    return;
  }

  const user = signInData.user; // ✅ Correct user object
  const userInfo = {
    username:
      user.user_metadata?.username ||   // email/password users
      user.user_metadata?.full_name || // Google
      user.user_metadata?.name ||      // Google (sometimes)
      user.user_metadata?.user_name || // GitHub
      user.email.split("@")[0],        // fallback
    email: user.email,
  };

  localStorage.setItem("user", JSON.stringify(userInfo));

  toast.success("Login successful!");
  navigate("/dashboard");
};


  // Google / GitHub login
  const handleOAuthLogin = async (provider) => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: window.location.origin + "/login", // come back to this page
        },
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success(`Redirecting to ${provider} login...`);
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  // Handle redirect back from Supabase OAuth
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
    user.email.split("@")[0], // fallback if nothing else
  email: user.email,
      };
      localStorage.setItem("user", JSON.stringify(userInfo));

      toast.success("Login successful!");
      navigate("/dashboard");
    };

    // Only run check if query params exist (OAuth redirect will add them)
    if (location.hash || location.search) {
      checkSession();
    }
  }, [location, navigate]);
  

  return (
    

<div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
  <Toaster position="top-right" reverseOrder={false} />

  {/* Navbar */}
  <div className="fixed top-0 left-0 w-full z-50">
    <Navbar />
  </div>

  {/* Main content wrapper */}
  <div className="flex flex-1 pt-15 px-8 items-center justify-between w-full max-w-6xl mx-auto">
    
    {/* LEFT SIDE - Code block + Image */}
<motion.div
  initial={{ opacity: 0, x: -50 }} // slide from left
  animate={{ opacity: 1, x: 0 }}   // settle in place
  transition={{ delay: 0.4, duration: 0.7, ease: "easeOut" }}
  className="hidden md:block w-full max-w-md relative bg-slate-800 rounded-xl shadow-lg overflow-hidden"
>
  {/* Title Bar */}
  <div className="bg-slate-700 text-white text-sm font-semibold px-4 py-2 border-b border-slate-900">
    editra.file
  </div>

  {/* Code Block */}
  <div>
    <CodeBlocks
      position={"lg:flex-row"}
      codeColor={"text-white-25"}
      codeblock={`import React, { useState } from "react";
function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Hello from Editra!</h1>
      <button onClick={() => setCount(count + 1)}>+
      </button>
    </div>
  );
}`}
      backgroundGradient={<div className="codeblock1 absolute inset-1"></div>}
    />
  </div>
<div className="h-20"></div>
  {/* Run button on extreme bottom left */}
  <div className="absolute bottom-5 left-8 ">
    <button className="px-8 py-2  text-sm font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-500 shadow-md transition">
      Run
    </button>
  </div>

  {/* Two stacked images on extreme bottom right */}
 <div className="absolute bottom-2 right-2 bg-slate-700 border-2 border-white rounded-xl overflow-hidden w-28">
  {/* Top Image */}
  <div className="border-b border-white">
    <img src={girl_with_laptop} className="w-full h-23 object-cover" alt="boy" />
  </div>

  {/* Bottom Image */}
  <div>
    <img src={boy_with_laptop} className="w-full h-23 object-cover" alt="girl with laptop" />
  </div>
</div>

</motion.div>




    {/* RIGHT SIDE - Login form */}
    <motion.div
      initial={{ opacity: 0, x: 50 }}   // slide from right
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-md p-8 space-y-3 bg-slate-800 
                 rounded-2xl shadow-xl border border-slate-700"
    >
      <h2 className="text-2xl font-bold text-center text-white">Login</h2>
      <p className="text-sm text-center text-slate-300">
        Welcome back! Please login to your account
      </p>

      {/* --- Login Form --- */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block text-sm text-slate-300">Email</label>
          <div className="flex items-center mt-1 bg-slate-700 rounded-xl p-3 border border-slate-600">
            <FontAwesomeIcon icon={faEnvelope} className="text-slate-400 mr-2" />
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: "Email is required" })}
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

        {/* Forgot Password */}
        <p
          onClick={() => navigate("/forget-password")}
          className="text-right text-sm text-indigo-300 cursor-pointer hover:underline italic mt-1"
        >
          Forgot password?
        </p>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 rounded-xl text-white font-semibold shadow-md transition cursor-pointer"
        >
          Login
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
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => handleOAuthLogin("google")}
          className="p-3 w-12 h-12 flex items-center justify-center rounded-xl border border-white/10 bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 hover:border-indigo-500 transition-all duration-300 shadow-md hover:shadow-indigo-500/20 cursor-pointer"
        >
          <FontAwesomeIcon icon={faGoogle} size="lg" />
        </button>

        <button
          onClick={() => handleOAuthLogin("github")}
          className="p-3 w-12 h-12 flex items-center justify-center rounded-xl border border-white/10 bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 hover:border-indigo-500 transition-all duration-300 shadow-md hover:shadow-indigo-500/20 cursor-pointer"
        >
          <FontAwesomeIcon icon={faGithub} size="lg" />
        </button>
      </div>
            <p className="h-2"></p>
      
    </motion.div>
  </div>
</div>




  );
}

export default Login;
