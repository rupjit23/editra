


import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const userSocketMap = {};

// Helper to get all connected clients in a room
const getAllConnectedClients = (roomId) => {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => ({
      socketId,
      username: userSocketMap[socketId],
    })
  );
};

io.on("connection", (socket) => {
  // console.log(`User connected: ${socket.id}`);

  // --- JOIN ROOM ---
  socket.on("join", ({ roomId, username }) => {
    userSocketMap[socket.id] = username;
    socket.join(roomId);

    const clients = getAllConnectedClients(roomId);

    // Notify all clients in the room
    clients.forEach(({ socketId }) => {
      io.to(socketId).emit("joined", {
        clients,
        username,
        socketId: socket.id,
      });
    });
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

    delete userSocketMap[socket.id];
    socket.leave();
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  // console.log("✅ Server is running");
  // console.log(`🌐 Server listening at http://localhost:${PORT}`);
});







