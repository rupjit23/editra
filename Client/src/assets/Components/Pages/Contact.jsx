import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import Navbar from "../HomePageComponents/Navbar";
import { supabase } from "../../../createClient"; 

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("messages").insert([
      {
        name: form.name,
        email: form.email,
        message: form.message,
      },
    ]);

    setLoading(false);

    if (error) {
      console.error("Error saving message:", error.message);
      alert("❌ Failed to send message. Please try again.");
      return;
    }

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Navbar at top */}
      <Navbar />

      {/* Main content */}
      <div className="flex-grow flex items-center justify-center px-6 py-1">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-slate-900 rounded-3xl shadow-2xl p-10 w-full max-w-3xl border border-slate-800"
        >
          {/* Title */}
          <h2 className="text-3xl font-bold text-indigo-400 mb-6 text-center">
            Contact Us
          </h2>

          {/* Info section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-slate-300">
            <div className="flex items-center gap-3">
              <Mail className="text-indigo-400" size={22} />
              <span>rupjitmaity@gmail.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="text-indigo-400" size={22} />
              <span>+100 200 300</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-indigo-400" size={22} />
              <span>Kolkata, India</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-slate-300 mb-1">Your Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 mb-1">Your Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 mb-1">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="4"
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-indigo-500"
              />
            </div>

            {/* Submit */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-xl cursor-pointer transition disabled:opacity-50"
            >
              {loading ? "Sending..." : <><Send size={18} /> Send Message</>}
            </motion.button>
          </form>

          {/* Success message */}
          {submitted && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-green-400 text-center mt-4 font-medium"
            >
              ✅ Message sent successfully!
            </motion.p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
