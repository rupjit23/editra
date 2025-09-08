
import { io } from "socket.io-client";

const BACKEND_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000" // local backend
    : "https://editra.onrender.com"; // deployed backend

export const initSocket = async () => {
  const options = {
    forceNew: true,
    reconnectionAttempts: Infinity,
    timeout: 10000,
    transports: ["websocket"],
  };

  return io(BACKEND_URL, options);
};
