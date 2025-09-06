
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaUserCircle, FaCopy } from "react-icons/fa";
import { LogOut, Calendar, ArrowRight, ChevronUp, ChevronDown } from "lucide-react";
import { supabase } from "../../../createClient";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import Logo from "../Images/Logo11.png"
import { PlusCircle, X } from "lucide-react";
import { Edit2, Check, X as Close } from "lucide-react"; 
import { CiEdit } from "react-icons/ci";
import { TiFolderOpen } from "react-icons/ti";
import { MdArrowOutward } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { LuFolderOpen } from "react-icons/lu";
import { FaAnglesDown } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { FaFolderOpen } from "react-icons/fa";
import { ImBooks } from "react-icons/im";


export default function Dashboard() {
  const navigate = useNavigate();
const [range, setRange] = useState("month"); 
const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth()); 
const [previewFile, setPreviewFile] = useState(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState({ username: "", email: "" });
  const [savedCodes, setSavedCodes] = useState([]);
  const [copied, setCopied] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [openJoin, setOpenJoin] = useState(false);
  const [openAllFiles, setOpenAllFiles] = useState(false);
const [selectedPage, setSelectedPage] = useState("my-files");
  const [newRoomId, setNewRoomId] = useState("");
  const [joinRoomId, setJoinRoomId] = useState("");
const storedUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user"));
    if (stored && stored.email) {
      setUser(stored);
      fetchSavedCodes(stored.email);
      return;
    }
    
    (async () => {
      try {
        const {
          data: { user: sbUser },
        } = await supabase.auth.getUser();
        if (sbUser) {
          const username =
            sbUser.user_metadata?.username ||
            sbUser.user_metadata?.name ||
            sbUser.email?.split("@")[0] ||
            "";
          const u = { username, email: sbUser.email };
          setUser(u);
          localStorage.setItem("user", JSON.stringify(u));
          fetchSavedCodes(u.email);
        }
      } catch (err) {
        
      }
    })();
   
  }, []);

  const filteredCodes = useMemo(() => {
  const now = new Date();
  if (range === "today") {
    return savedCodes.filter(c => {
      const d = new Date(c.timestamp);
      return d.toDateString() === now.toDateString();
    });
  }
  if (range === "month") {
    return savedCodes.filter(c => {
      const d = new Date(c.timestamp);
      return d.getMonth() === selectedMonth && d.getFullYear() === now.getFullYear();
    });
  }
  return savedCodes;
}, [range, selectedMonth, savedCodes]);


// inside Dashboard component
const [editingName, setEditingName] = useState(false);
const [newName, setNewName] = useState("");

// function to update username
const handleUpdateName = async () => {
  if (!newName.trim()) return toast.error("Name cannot be empty");

  try {
    //  Update Supabase Auth metadata
    const { error } = await supabase.auth.updateUser({
      data: { username: newName.trim() },
    });
    if (error) throw error;

    //  Update local user state + localStorage
    const updatedUser = { ...user, username: newName.trim() };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));

    toast.success("Username updated successfully!");
    setEditingName(false);
  } catch (err) {
    // console.error("Update username error:", err);
    toast.error("Failed to update username");
  }
};

  // fetch saved codes by email
const fetchSavedCodes = async (email) => {
  if (!email) return;
  const { data, error } = await supabase
    .from("codes")
    .select("*")
    .eq("email", email)
    .order("created_at", { ascending: false });
  if (error) {
    // console.error("fetchSavedCodes", error);
    toast.error("Failed to fetch saved codes");
  } else {
    // 🔹 normalize "cpp" -> "c++"
    const normalized = (data || []).map((c) => ({
      ...c,
      language: c.language?.toLowerCase() === "cpp" ? "c++" : c.language,
    }));
    setSavedCodes(normalized);
  }
};


  // greeting
  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 18) return "Good afternoon";
    return "Good evening";
  };

  // create/join room handlers
  const startCreate = () => {
    setNewRoomId(uuidv4());
    setOpenCreate(true);
  };
  const copyRoomId = () => {
    if (!newRoomId) return;
    navigator.clipboard.writeText(newRoomId);
    toast.success("Room ID copied!");
  };
  const handleCreateRoom = () => {
    if (!newRoomId) return;
    setOpenCreate(false);
    navigate(`/editor/${newRoomId}`, {
      state: { username: user.username, email: user.email },
    });
  };
  const handleJoinRoom = () => {
    if (!joinRoomId.trim()) {
      toast.error("Please enter a Room ID");
      return;
    }
    setOpenJoin(false);
    navigate(`/editor/${joinRoomId.trim()}`, {
      state: { username: user.username, email: user.email },
    });
  };

  // see all files
 const openSavedFile = (code) => {
  setPreviewFile(code);
  setOpenAllFiles(false);  // Close the All Files modal
};


  const totalFiles = savedCodes.length;

  // language stats
  const languageStats = useMemo(() => {
    const map = {};
    savedCodes.forEach((c) => {
      const lang = (c.language || "unknown").toLowerCase();
      map[lang] = (map[lang] || 0) + 1;
    });
    const preferred = ["c", "c++", "java", "python", "javascript"];
    const arr = preferred.map((p) => ({ lang: p, count: map[p] || 0 }));
    Object.keys(map).forEach((k) => {
      if (!preferred.includes(k)) arr.push({ lang: k, count: map[k] });
    });
    return arr;
  }, [savedCodes]);
useEffect(() => {
  const handleClickOutside = () => setMenuOpen(false);
  if (menuOpen) {
    document.addEventListener("click", handleClickOutside);
  }
  return () => document.removeEventListener("click", handleClickOutside);
}, [menuOpen]);

  // Wave SVG generator (simple)
  const waveSvg = (() => {
    if (savedCodes.length === 0) {
      return (
        <svg viewBox="0 0 1000 160" className="w-full h-40">
          <path d="M0 100 C150 40 350 160 500 100 C650 40 850 160 1000 100" stroke="#ef4444" strokeWidth="3" fill="none" opacity="0.9" />
          <path d="M0 120 C150 70 350 10 500 120 C650 230 850 100 1000 120" stroke="#3b82f6" strokeWidth="3" fill="none" opacity="0.7" />
        </svg>
      );
    }
    const top = [...languageStats].sort((a, b) => b.count - a.count).slice(0, 2);
    const colorFor = (lang) => {
      if (lang.includes("java")) return "#ef4444";
      if (lang === "c++" || lang === "c") return "#3b82f6";
      if (lang.includes("python")) return "#f59e0b";
      if (lang.includes("javascript")) return "#06b6d4";
      return "#94a3b8";
    };
    const paths = top.map((t, i) => {
      const amp = Math.min(30 + t.count * 6, 80);
      const offset = 30 + i * 12;
      const d = `M0 ${80 + offset} 
                 C 150 ${80 + offset - amp}, 350 ${80 + offset + amp}, 500 ${80 + offset} 
                 C 650 ${80 + offset - amp}, 850 ${80 + offset + amp}, 1000 ${80 + offset}`;
      return <path key={t.lang} d={d} stroke={colorFor(t.lang)} strokeWidth={3} fill="none" opacity={0.95} />;
    });
    if (paths.length === 1) {
      paths.push(<path key="faint" d="M0 120 C150 70 350 10 500 120 C650 230 850 100 1000 120" stroke="#94a3b8" strokeWidth={2} fill="none" opacity="0.45" />);
    }
    return (
      <svg viewBox="0 0 1000 160" className="w-full h-40">
        {paths}
      </svg>
    );
  })();

  // logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("user");
    navigate("/");
  };

  // small util
  const formatDate = (iso) => {
    try {
      const d = new Date(iso);
      return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
    } catch {
      return iso;
    }
  };
   

  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative">
        <aside className="h-screen bg-slate-900 text-white flex flex-col items-center py-6 shadow-lg fixed left-0 top-0 w-[240px]">
        {/* Logo */}
        <div className="mb-8">
          <img
            src={Logo}
            alt="Editra Logo"
            className="h-11 w-auto object-contain select-none transition-transform duration-300 hover:scale-200 drop-shadow-xl px-4 cursor-pointer"
            draggable="false"
          />
        </div>

        {/* Navigation Icons / Items */}
        <nav className="flex flex-col gap-6 flex-1 w-full px-3">
          <p className="h-2"></p>
          {/* My Files */}
          <button
             onClick={() => setSelectedPage("my-files")}
            className="flex items-center gap-3 px-3 py-2 text-left rounded-xl hover:bg-slate-800/70 transition-all duration-200 cursor-pointer"
          >
            <FaFolderOpen className="text-lg" />
            <span>My Files</span>
          </button>

          {/* Developed Skills */}
          <button
             onClick={() => setSelectedPage("skills")}
            className="flex items-center gap-3 px-3 py-2 text-left rounded-xl hover:bg-slate-800/70 transition-all duration-200 cursor-pointer"
          >
            <ImBooks className="text-lg" />
            <span>Developed Skills</span>
          </button>

          {/* Settings */}
          <button
             onClick={() => setSelectedPage("settings")}
            className="flex items-center gap-3 px-3 py-2 text-left rounded-xl hover:bg-slate-800/70 transition-all duration-200 cursor-pointer"
          >
            <IoMdSettings className="text-lg" />
            <span>Settings</span>
          </button>
        </nav>

        {/* Bottom User Menu */}
   <div className="mt-auto w-full px-3">
  <div className="relative flex items-center">
    {/* Compact Profile Row (always visible) */}
    <button
      onClick={(e) => {
        e.stopPropagation();
        setMenuOpen((prev) => !prev);
      }}
      className="flex items-center w-full gap-3 p-3 rounded-xl hover:bg-slate-800/70 transition cursor-pointer"
    >
      {/* Avatar */}
      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500/20 text-indigo-400 font-bold text-lg">
        {user?.username ? user.username[0].toUpperCase() : "G"}
      </div>

      {/* Name + Email */}
      <div className="flex flex-col text-left">
        <span className="font-medium text-white text-sm">
          {user?.username || "Guest"}
        </span>
        <span className="text-xs text-slate-400">{user?.email}</span>
      </div>
    </button>

    {/* Dropdown Menu - Opens to the right but upward */}
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute left-full bottom-0  w-64 rounded-2xl bg-slate-900/90 backdrop-blur-xl shadow-xl border border-slate-700/50 overflow-hidden z-50"
          onClick={(e) => e.stopPropagation()}
        >
          {/* User Info */}
          <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-700/50">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-500/20 text-indigo-400 font-bold text-lg">
              {user?.username ? user.username[0].toUpperCase() : "G"}
            </div>
            <div>
              <p className="text-white font-semibold text-sm">
                {user?.username || "Guest"}
              </p>
              <p className="text-xs text-slate-400">{user?.email}</p>
            </div>
          </div>

          {/* Settings */}
          <button
          onClick={(e) => {
    e.stopPropagation();
    setMenuOpen(false); // close dropdown
    setSelectedPage("settings"); // switch to settings
  }}
            className="flex items-center gap-3 px-6 py-3 text-sm text-slate-300 hover:text-white hover:bg-slate-800/70 transition w-full border border-slate-800/30 cursor-pointer"
          >
            <IoMdSettings size={18} className="text-slate-400" />
            <span>Settings</span>
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-6 py-3 text-sm text-slate-300 hover:text-white hover:bg-slate-800/70 transition w-full cursor-pointer"
          >
            <LogOut size={18} className="text-red-400" />
            <span>Logout</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
</div>



      </aside>
  
      {/* HEADER */}
      {/* HEADER */}
<div className="flex items-center p-6 relative">
  {/* Greeting in center */}
  <h1 className="text-2xl font-bold flex-1 text-center">
    {getGreeting()},{" "}
    <span className="text-indigo-400">{user.username || "Guest"}</span>
  </h1>

  {/* Right Buttons */}
  <div className="absolute right-8 flex items-center gap-6">
    {/* Create Room */}
    <div
      onClick={startCreate}
      className="w-40 h-12 flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-2xl text-white text-lg font-semibold cursor-pointer shadow-lg transition transform hover:scale-105 hover:shadow-[0_0_12px_rgba(99,102,241,0.6)] "
    >
      Create Room
    </div>

    {/* Join Room */}
    <div
      onClick={() => setOpenJoin(true)}
      className="w-40 h-12 flex items-center justify-center bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 rounded-2xl text-white text-lg font-semibold cursor-pointer shadow-lg transition transform hover:scale-105 hover:shadow-[0_0_12px_rgba(16,185,129,0.6)] "
    >
      Join Room
    </div>
  </div>
</div>


 {/* Divider line */}
  <div className="border-t border-slate-700/50 mx-6"></div>

      {/* MAIN GRID */}
      {/* MAIN GRID */}
{/* MAIN GRID */}
<div className="ml-[240px] flex-1 min-h-screen overflow-y-auto">
  {/* LEFT */}
  <div className="col-span-3 space-y-8">
    {/* Profile / Skills later */}
  </div>

  {/* CENTER */}
  <div className="col-span-8 space-y-10 ">
    {/* Dashboard default view */}
    {/* {selectedPage === "dashboard" && (
      <div className="flex items-center justify-center h-64 text-slate-400">
        Select an option from the sidebar
      </div>
    )} */}
    

    {/* My Files View */}
   {/* My Files View */}
{selectedPage === "my-files" && (
  <div
    className="max-h-[calc(100vh-120px)] bg-slate-850 rounded-2xl border border-slate-700 shadow-2xl 
               overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900
               mt-6 ml-10 mb-5 mr-8"
  >
    <div className="py-6 px-6">
      <h2 className="text-2xl font-bold text-indigo-400 mb-6">My Files</h2>

      {savedCodes.map((file, index) => {
        const dateObj = file.created_at ? new Date(file.created_at) : null;
        const formattedDate = dateObj
          ? `${dateObj.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })} · ${dateObj.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}`
          : "Unknown date";

        return (
          <div key={file.id} className="mb-4">
            <div
              className="grid grid-cols-3 items-center px-8 py-5 
                         bg-slate-800/70 rounded-2xl border border-slate-700/60
                         transition hover:bg-slate-800 hover:shadow-lg cursor-pointer"
            >
              <span className="text-slate-200 font-medium text-lg truncate pl-3">
                {file.title || "Untitled File"}
              </span>

              <span className="text-sm text-slate-400 text-center">
                {formattedDate}
              </span>

              <div className="flex items-center justify-end gap-4 pr-3">
                <span className="text-sm text-indigo-400 font-medium">
                  {file.language || "Unknown"}
                </span>
                <button
                  onClick={() => setPreviewFile(file)}
                  className="p-2 rounded-lg hover:bg-indigo-600/30 transition"
                >
                  <ArrowRight
                    size={22}
                    className="text-indigo-300 cursor-pointer"
                  />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
)}







    {/* Skills View */}
    {selectedPage === "skills" && (
  <div className="mt-10 mx-auto w-[90%] h-[500px] bg-slate-800 rounded-2xl p-8 shadow-2xl border border-slate-700">
    <div className="flex items-center justify-between mb-6">
      <h4 className="text-2xl font-bold text-indigo-400">Developed Skills</h4>

    </div>

    {/* Skills progress bars */}
    <div className="space-y-6 overflow-y-auto h-[400px] pr-2">
      {languageStats.map((l) => {
        if (totalFiles === 0) {
          return (
            <div key={l.lang}>
              <div className="flex justify-between mb-2">
                <span className="text-slate-200">{l.lang}</span>
                <span className="text-gray-400">0%</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-3">
                <div className="bg-indigo-500 h-3 rounded-full w-0" />
              </div>
            </div>
          );
        }
        const pct = Math.round((l.count / totalFiles) * 100);
        const arrowUp = pct > 30;
        return (
          <div key={l.lang}>
            <div className="flex justify-between mb-2 items-center">
              <span className="capitalize text-slate-200 text-lg">{l.lang}</span>
              <div className="flex items-center gap-2">
                <span className="text-gray-300 text-sm">{pct}%</span>
                <span
                  className={`text-sm ${
                    arrowUp ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  {arrowUp ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </span>
              </div>
            </div>
            <div className="w-full bg-white/5 rounded-full h-3">
              <div
                className="bg-indigo-500 h-3 rounded-full"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  </div>
)}


    {/* Settings View */}
 {selectedPage === "settings" && (
  <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-700/60 rounded-3xl p-10 shadow-2xl max-w-3xl mx-auto mt-16">
    <h2 className="text-4xl font-bold text-indigo-400 mb-10 text-center tracking-wide">
      Profile Settings
    </h2>

    <div className="space-y-8">
      {/* Username Input */}
      <div>
        <label className="block text-slate-400 font-medium mb-2 text-lg">
          Username
        </label>
        <div className="flex gap-3 items-center">
          <input
            type="text"
            value={newName || user.username}
            onChange={(e) => setNewName(e.target.value)}
            className="flex-1 px-5 py-4 rounded-2xl bg-slate-800/80 border border-slate-700 text-white text-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 transition"
            placeholder="Your username"
          />
          <button
            onClick={handleUpdateName}
            className="px-7 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-lg shadow-lg hover:shadow-indigo-600/30 transition-all"
          >
            Save
          </button>
        </div>
      </div>

      {/* Email Input (read-only) */}
      <div>
        <label className="block text-slate-400 font-medium mb-2 text-lg">
          Email
        </label>
        <input
          type="email"
          value={user.email}
          readOnly
          className="w-full px-5 py-4 rounded-2xl bg-slate-800/80 border border-slate-700 text-slate-400 text-lg cursor-not-allowed"
        />
      </div>
    </div>
  </div>
)}




  </div>

  {/* RIGHT */}
  <div className="col-span-3 space-y-8">
    {/* reserved for stats / extra widgets */}
  </div>
</div>


      <div className="px-8 pb-8 grid grid-cols-12 gap-8">
        {/* LEFT */}
        <div className="col-span-3 space-y-8">
          {/* Profile card */}
        {/* Profile card */}




          

         {/* Developed skills card */}
          
        </div>

        {/* CENTER */}
       <div className="col-span-6 space-y-12">
  {/* Room buttons moved above Focusing */}





  {/* Focusing card */}
 




</div>
  
        {/* RIGHT */}
      

      </div>

      {/* subtle backdrop blur when modals open */}
      {(openCreate || openJoin || openAllFiles) && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/30 backdrop-blur-[1px] z-40" />
      )}

      {/* CREATE modal */}
     {/* CREATE modal */}
{/* CREATE modal */}
<AnimatePresence>
  {openCreate && (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div className="bg-slate-800 p-8 rounded-3xl w-full max-w-lg shadow-2xl relative">
        {/* Header with Title + Close */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Create Room</h2> {/* increased from text-lg */}
          <button
            onClick={() => setOpenCreate(false)}
            className="absolute top-3 right-3 rounded-full bg-white/10 p-1 hover:bg-white/20"
          >
            <X size={27} className="text-slate-300 cursor-pointer" /> {/* slightly bigger icon */}
          </button>
        </div>

        {/* Room ID input with copy */}
        <div className="mb-4">
          <label className="block text-slate-300 mb-1 text-base"> {/* increased from text-sm */}
            Room ID
          </label>
          <div className="relative">
            <input
              value={newRoomId}
              readOnly
              className="w-full px-4 py-3 pr-10 rounded-xl border border-white/10 bg-slate-900 text-base outline-none focus:border-indigo-500" 
            />

            {/* Copy button */}
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(newRoomId);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-400"
            >
              <FaCopy size={20} /> {/* slightly bigger icon */}
            </button>

            {/* Copied text */}
            {copied && (
              <span className="absolute -top-5 right-2 text-green-400 text-sm font-medium cursor-p"> 
                Copied!
              </span>
            )}
          </div>
        </div>

        {/* Create button */}
        <button
          onClick={handleCreateRoom}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-base font-medium hover:bg-indigo-500 disabled:opacity-50 cursor-pointer"
        >
          Create & Go to Editor
        </button>
      </div>
    </motion.div>
  )}
</AnimatePresence>




     
<AnimatePresence>
  {openJoin && (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div className="bg-slate-800 p-8 rounded-3xl w-full max-w-lg shadow-2xl relative">
        
        {/* Header with Title + Close */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Join Room</h2>
          <button
            onClick={() => setOpenJoin(false)}
            className="absolute top-4 right-4 rounded-full bg-white/10 p-2 hover:bg-white/20"
          >
            <X size={24} className="text-slate-300 cursor-pointer" />
          </button>
        </div>

        {/* Input */}
       <div className="mb-6">
  <label className="block text-slate-300 mb-2 text-base">
    Room ID
  </label>
  <div className="relative">
    <input
      placeholder="Enter Room ID"
      value={joinRoomId}
      onChange={(e) => setJoinRoomId(e.target.value)}
      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-base outline-none focus:border-green-500"
    />
  </div>
</div>


        {/* Join Button */}
        <button
          onClick={handleJoinRoom}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-base font-medium hover:bg-green-500 disabled:opacity-50 cursor-pointer"
        >
          Join & Go to Editor
        </button>
      </div>
    </motion.div>
  )}
</AnimatePresence>

{/* FILE PREVIEW MODAL */}
<AnimatePresence>
  {previewFile && (
    <motion.div
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 30 }}
      className="fixed top-0 right-0 h-full w-[40%] bg-slate-900 border-l border-slate-700 shadow-2xl z-50 p-6 flex flex-col"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-indigo-400">
          {previewFile.title}
        </h2>
        <button
          onClick={() => setPreviewFile(null)}
          className="text-slate-400 hover:text-white cursor-pointer"
        >
          ✕
        </button>
      </div>

      {/* Code */}
      <div className="flex-1 overflow-auto rounded-lg bg-slate-800 p-4 text-sm font-mono text-slate-200">
        <pre className="whitespace-pre-wrap">{previewFile.code}</pre>
      </div>
    </motion.div>
  )}
</AnimatePresence>



      {/* SEE ALL FILES modal (left-enlarged) */}
     <AnimatePresence>
  {openAllFiles && (
    <motion.div
      initial={{ x: "100%", opacity: 0 }}   // comes in from right
      animate={{ x: "0%", opacity: 1 }}     // stays in place
      exit={{ x: "-100%", opacity: 0 }}     // leaves to the LEFT
      transition={{
        type: "tween",
        ease: "easeInOut",
        duration: 0.45,
      }}
      className="fixed inset-0 z-50 flex justify-end"
    >
      {/* Right-side sleek panel */}
      <div className="w-[520px] h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-2xl border-l border-white/10 p-6 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <LuFolderOpen size={26} className="text-indigo-400" />
            <h2 className="text-lg font-semibold text-white tracking-wide">
              All Files
            </h2>
          </div>
         <button
  onClick={() => setOpenAllFiles(false)}
  className="text-slate-400 hover:text-white transition cursor-pointer"
>
  <X size={30} />
</button>

        </div>

        {/* File list */}
        {savedCodes.length === 0 ? (
          <div className="text-slate-500 text-sm italic">No saved files yet.</div>
        ) : (
          <div className="space-y-4">
            {savedCodes.map((c) => (
             <motion.div
  key={c.id}
  whileHover={{ scale: 1.02 }}
  transition={{ type: "spring", stiffness: 200, damping: 20 }}
  className="bg-white/5 hover:bg-white/10 p-4 rounded-xl flex justify-between items-start transition duration-200"
>
  {/* Left content */}
  <div className="flex-1 pr-3">
    {/* Title + Language in one line */}
    <div className="flex items-center gap-2 text-white font-medium truncate">
      <span>{c.title}</span>
      <span className="text-xs text-indigo-300">• {c.language}</span>
    </div>

    {/* Date below */}
    <div className="text-xs text-slate-300 mt-1">
      {formatDate(c.created_at)}
    </div>

    {/* Code preview */}
    <div className="text-xs text-slate-400 mt-2 line-clamp-3">
      {(c.code || "").slice(0, 180)}
      {(c.code || "").length > 180 ? "..." : ""}
    </div>
  </div>

  {/* Right actions */}
  <div className="flex flex-col gap-2 items-end">
    <button
      onClick={() => openSavedFile(c)}
      className="p-2 rounded-md hover:bg-indigo-600/30 transition cursor-pointer"
    >
      <ArrowRight size={24} className="text-indigo-300" />
    </button>
    <span className="text-xs text-slate-500">
      {c.user_id ? "Saved" : "Guest"}
    </span>
  </div>
</motion.div>

            ))}
          </div>
        )}
      </div>

      {/* Transparent overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="flex-1 bg-black/40 backdrop-blur-sm"
        onClick={() => setOpenAllFiles(false)}
      />
    </motion.div>
  )}
</AnimatePresence>



    </div>
  );
}










