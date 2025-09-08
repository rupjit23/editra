
import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:3000",   // React dev server
      "http://localhost:5173",   // Vite dev server
      "https://try-editra.vercel.app" // deployed frontend (no trailing slash!)
    ],
    methods: ["GET", "POST"],
  },
});

const userSocketMap = {};

// Helper: Get all connected clients in a room
const getAllConnectedClients = (roomId) => {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => ({
      socketId,
      username: userSocketMap[socketId],
    })
  );
};

io.on("connection", (socket) => {
  console.log(` New client connected: ${socket.id}`);

  // --- JOIN ROOM ---
  socket.on("join", ({ roomId, username }) => {
    userSocketMap[socket.id] = username;
    socket.join(roomId);

    const clients = getAllConnectedClients(roomId);

    clients.forEach(({ socketId }) => {
      io.to(socketId).emit("joined", {
        clients,
        username,
        socketId: socket.id,
      });
    });

    console.log(` ${username} joined room ${roomId}`);
  });

  // --- CODE SYNC ---
  socket.on("code-change", ({ roomId, code }) => {
    socket.broadcast.to(roomId).emit("code-change", { code });
  });

  socket.on("sync-code", ({ socketId, code }) => {
    io.to(socketId).emit("code-change", { code });
  });

  // --- LANGUAGE SYNC ---
  socket.on("language-change", ({ roomId, language }) => {
    socket.broadcast.to(roomId).emit("language-change", { language });
  });

  // --- WEBRTC SIGNALING ---
  socket.on("webrtc-offer", ({ roomId, offer }) => {
    socket.to(roomId).emit("webrtc-offer", { from: socket.id, offer });
  });

  socket.on("webrtc-answer", ({ roomId, answer }) => {
    socket.to(roomId).emit("webrtc-answer", { from: socket.id, answer });
  });

  socket.on("webrtc-ice-candidate", ({ roomId, candidate }) => {
    socket.to(roomId).emit("webrtc-ice-candidate", { from: socket.id, candidate });
  });

  // --- DISCONNECT ---
  socket.on("disconnecting", () => {
    const rooms = [...socket.rooms];
    rooms.forEach((roomId) => {
      socket.in(roomId).emit("disconnected", {
        socketId: socket.id,
        username: userSocketMap[socket.id],
      });
    });

    // console.log(` ${userSocketMap[socket.id]} disconnected`);

    delete userSocketMap[socket.id];
  });
});

// Root route for sanity check
app.get("/", (req, res) => {
  res.send(" Backend server is running");
});

// PORT handling (local: 5000, prod: from env)
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  // console.log(`🚀 Server running on port ${PORT}`);
});
