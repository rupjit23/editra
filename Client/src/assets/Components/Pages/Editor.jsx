


import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import logo from "../Images/Logo5.png";
import logo1 from "../Images/Logo11.png";
import Client from "./Client";
import MoncoEditor from "../Editor/MoncoEditor";
import { FaEdit, FaCopy } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { IoExitSharp } from "react-icons/io5";
import toast, { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { initSocket } from "../../../socket";
 import VideoCall from "./VideoCall";

function Editor() {
  const location = useLocation();
  const { roomId } = useParams();
  const navigate = useNavigate();

  const storageKey = `username:${roomId}`;
  const codeRef = useRef(null);
  const socketRef = useRef(null);

  // ✅ Get username & email from state/localStorage
  const initialUser = (() => {
    const fromState = location.state; // { username, email }
    if (fromState?.username) {
      localStorage.setItem(storageKey, fromState.username);
      localStorage.setItem("editorUser", JSON.stringify(fromState));
      return fromState;
    }

    const storedUser = JSON.parse(localStorage.getItem("editorUser"));
    if (storedUser) return storedUser;

    const savedName = localStorage.getItem(storageKey);
    return { username: savedName || "Anonymous", email: "" };
  })();

  const [user, setUser] = useState(initialUser);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(initialUser.username);
  const [clients, setClients] = useState([
    { socketId: 1, username: initialUser.username },
  ]);
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);

  // ✅ Keep username/email synced
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("editorUser"));
    if (saved) setUser(saved);
    else setUser({ username: "Anonymous", email: "" });

    setClients([{ socketId: 1, username: saved?.username || "Anonymous" }]);
    setNewName(saved?.username || "Anonymous");
  }, [roomId]);

  useEffect(() => {
    setClients((prev) => [{ socketId: 1, username: user.username }, ...prev.slice(1)]);
  }, [user.username]);

  // ✅ Save new name
  const handleSaveName = (name) => {
    const clean = name.trim();
    if (!clean) return;
    const updated = { ...user, username: clean };
    setUser(updated);
    localStorage.setItem(storageKey, clean);
    localStorage.setItem("editorUser", JSON.stringify(updated));
    setIsEditing(false);
    setNewName(clean);
  };

  // ✅ Copy Room ID
  const handleCopyRoomId = () => {
    navigator.clipboard.writeText(roomId);
    toast.success(
      <span>
        Room ID:{" "}
        <span className="font-mono font-semibold bg-blue-100 px-1 py-0.5 rounded">
          {roomId}
        </span>{" "}
        copied!
      </span>
    );
  };

  // ✅ Socket setup
  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();

      const handleError = (e) => {
        console.error("Socket error =>", e);
        toast.error("Socket connection failed");
        navigate("/");
      };

      socketRef.current.on("connect_error", handleError);
      socketRef.current.on("connect_failed", handleError);

      // Join room
      socketRef.current.emit("join", { roomId, username: user.username });

      // When someone joins
      socketRef.current.on("joined", ({ clients, username: joinedUser, socketId }) => {
        if (joinedUser !== user.username) {
          toast.success(`${joinedUser} joined`);
        }
        setClients(clients);

        // Send latest code to new user
        socketRef.current.emit("sync-code", {
          code: codeRef.current || "",
          socketId,
        });
      });

      // When someone disconnects
      socketRef.current.on("disconnected", ({ socketId, username: leftUser }) => {
        toast.success(`${leftUser} left`);
        setClients((prev) => prev.filter((c) => c.socketId !== socketId));
      });
    };

    init();

    return () => {
      if (socketRef.current) {
        socketRef.current.off("joined");
        socketRef.current.off("disconnected");
        socketRef.current.disconnect();
      }
    };
  }, [roomId, user.username, navigate]);

  return (
    <div className="flex h-screen bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white transition-all duration-500">
      {/* LEFT SIDEBAR */}
      <div
        onMouseEnter={() => setIsSidebarHovered(true)}
        onMouseLeave={() => setIsSidebarHovered(false)}
        className={`${
          isSidebarHovered ? "w-72" : "w-16"
        } bg-white/10 backdrop-blur-xl border-r border-white/10 
        flex flex-col transition-all duration-600 ease-in-out transform 
        ${isSidebarHovered ? "translate-x-2 shadow-2xl scale-[1.02]" : "translate-x-0 scale-100"} 
        relative z-20`}
      >
        {/* Logo */}
        <div className="flex items-center justify-center py-6 border-b border-white/10">
          <img
            src={isSidebarHovered ? logo1 : logo}
            alt="Logo"
            className={`h-[70px] w-auto object-contain transition-all duration-500 ${
              isSidebarHovered
                ? "opacity-100 scale-70 hover:scale-90 drop-shadow-xl"
                : "opacity-70 scale-95"
            }`}
          />
        </div>

        {/* ✅ Scrollable users list */}
        <div className="flex-1 overflow-y-auto custom-scrollbar overflow-x-hidden">
          {isSidebarHovered ? (
            <motion.div
              key="expanded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.25, duration: 0.3 }}
              className="p-5 w-full"
            >
              <h2 className="text-sm font-bold text-slate-200 mb-4 tracking-wide uppercase">
                Connected Users
              </h2>
              <div className="space-y-3">
                {clients.map((client) => (
                  <motion.div
                    key={client.socketId}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center justify-between bg-white/10 px-3 py-2 rounded-xl 
                               backdrop-blur-md border border-white/10 hover:shadow-lg hover:border-indigo-400 transition-all"
                  >
                    {isEditing && client.socketId === 1 ? (
                      <div className="flex items-center gap-2 w-full">
                        <input
                          type="text"
                          value={newName}
                          onChange={(e) => setNewName(e.target.value)}
                          onBlur={() => handleSaveName(newName)}
                          onKeyDown={(e) =>
                            e.key === "Enter" && handleSaveName(newName)
                          }
                          autoFocus
                          placeholder="Enter your name"
                          className="flex-1 px-3 py-1.5 text-sm rounded-lg 
                                     text-gray-900 bg-white focus:outline-none focus:ring-2 
                                     focus:ring-indigo-500"
                        />
                        <button
                          onClick={() => handleSaveName(newName)}
                          className="text-green-400 hover:text-green-600 cursor-pointer"
                          title="Save name"
                        >
                          <TiTick size={22} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <Client username={client.username} />
                        {client.socketId === 1 && (
                          <button
                            onClick={() => {
                              setIsEditing(true);
                              setNewName(user.username);
                            }}
                            className="text-white/70 hover:text-indigo-400 cursor-pointer transition"
                            title="Edit your name"
                          >
                            <FaEdit size={16} />
                          </button>
                        )}
                      </>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="collapsed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="p-3 flex flex-col items-center space-y-4"
            >
              <h2 className="text-xs font-bold text-slate-200 mb-2 tracking-wide">
                Users
              </h2>
              {clients.map((client) => (
                <motion.div
                  key={client.socketId}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.25 }}
                  className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold shadow-md"
                  title={client.username}
                >
                  {client.username.charAt(0).toUpperCase()}
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        {/* ✅ Buttons at bottom */}
        <div className="p-6 border-t border-white/10">
          <motion.div
            initial={false}
            animate={{ width: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex flex-col items-center space-y-3"
          >
            {/* Copy Button */}
            <motion.button
              onClick={handleCopyRoomId}
              initial={false}
              animate={{ width: isSidebarHovered ? 180 : 48 }}
              transition={{
                duration: 0.1,
                ease: "easeInOut",
                delay: isSidebarHovered ? 0 : 0.08,
              }}
              className="flex items-center h-11 rounded-lg 
                         bg-gradient-to-r from-green-400 via-teal-500 to-cyan-500 
                         hover:scale-105 hover:shadow-lg transition-all cursor-pointer text-white"
            >
              <div
                className={`flex items-center gap-2 w-full h-full px-3 
                  ${isSidebarHovered ? "justify-start" : "justify-center"}`}
              >
                <FaCopy size={22} />
              <AnimatePresence>
  {isSidebarHovered && (
    <motion.span
      key="copy-label"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.25, delay: 0.1 }} // 👈 small delay
      className="whitespace-nowrap font-semibold"
    >
      Copy Room ID
    </motion.span>
  )}
</AnimatePresence>

              </div>
            </motion.button>

            {/* Leave Button */}
          {/* Leave Button */}
<motion.button
  onClick={() => {
    const loggedInUser = localStorage.getItem("user"); // saved on login/signup
    if (loggedInUser) {
      navigate("/dashboard"); // if logged-in → Dashboard
    } else {
      navigate("/"); // if not logged-in → Homepage
    }
  }}
  initial={false}
  animate={{ width: isSidebarHovered ? 180 : 48 }}
  transition={{
    duration: 0.1,
    ease: "easeInOut",
    delay: isSidebarHovered ? 0 : 0.08,
  }}
  className="flex items-center h-11 rounded-lg 
             bg-gradient-to-r from-pink-600 via-red-400 to-orange-300
             hover:scale-105 hover:shadow-lg transition-all cursor-pointer text-white"
>
  <div
    className={`flex items-center gap-2 w-full h-full px-3 
      ${isSidebarHovered ? "justify-start" : "justify-center"}`}
  >
    <IoExitSharp size={24} />
    <AnimatePresence mode="wait">
      {isSidebarHovered && (
           <motion.span
      key="leave-label"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.25, delay: 0.1 }} 
      className="whitespace-nowrap font-semibold"
    >
          Leave
        </motion.span>
      )}
    </AnimatePresence>
  </div>
</motion.button>

          </motion.div>
        </div>
      </div>

      {/* MAIN EDITOR */}
      <div
        className={`flex-1 flex flex-col transition-all duration-500 ${
          isSidebarHovered ? "scale-[0.98] -translate-x-2" : "scale-100 translate-x-0"
        }`}
      >
        <div className="flex-1 bg-slate-950 relative p-4">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-indigo-900/30 via-slate-900/40 to-slate-950 pointer-events-none" />
          <div className="relative h-full rounded-xl overflow-hidden border border-white/10 shadow-xl">
            {/* ✅ Pass username + email to editor */}
            <MoncoEditor
              socketRef={socketRef}
              roomId={roomId}
              username={user.username}
              email={user.email}
              onCodeChange={(code) => {
                codeRef.current = code;
              }}
            />
            <Toaster position="top-center" reverseOrder={false} />
           <VideoCall
  roomId={roomId}
  username={user.username}
  socket={socketRef.current}
/>



          </div>
        </div>
      </div>
    </div>
  );
}

export default Editor;
