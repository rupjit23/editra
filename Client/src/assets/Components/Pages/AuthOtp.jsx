

import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../../../createClient";
import toast from "react-hot-toast";
import Navbar from "../HomePageComponents/Navbar";

export default function VerifyOtp() {
  const [otp, setOtp] = useState(Array(6).fill("")); 
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const email = query.get("email");
  const username = query.get("username");

  
  const handleOTPChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); 
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    
    if (value && e.target.nextSibling) {
      e.target.nextSibling.focus();
    }
  };

  
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && e.target.previousSibling) {
      e.target.previousSibling.focus();
    }
  };

  const handleVerifyOTP = async () => {
    const token = otp.join(""); 
    if (token.length < 6) {
      toast.error("Please enter all 6 digits");
      return;
    }

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token,
        type: "signup",
      });

      if (error) {
        toast.error(error.message || "Invalid OTP");
        return;
      }

      const user = data.user;
      localStorage.setItem(
        "user",
        JSON.stringify({
          username: user.user_metadata?.username || username,
          email: user.email,
        })
      );

      toast.success("Email verified & logged in!");
      navigate("/dashboard");
    } catch (err) {
      toast.error("OTP verification failed.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      {/* OTP Card */}
      <div className="bg-slate-800 p-6 rounded-xl shadow-xl text-center mt-20 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-white mb-4">Verify Your Email</h2>
        <p className="text-base text-slate-300 mb-5">
          Enter the OTP sent to{" "}
          <span className="text-indigo-400 font-medium">{email}</span>
        </p>

        {/* OTP Boxes */}
        <div className="flex justify-center gap-2 mb-5">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleOTPChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-10 h-12 text-xl text-center rounded-md bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          ))}
        </div>

        <button
          onClick={handleVerifyOTP}
          className="w-full mt-3 py-2.5 bg-indigo-600 hover:bg-indigo-700 rounded-2xl text-base font-medium text-white transition cursor-pointer"
        >
          Verify & Continue
        </button>
      </div>
    </div>
  );
}
