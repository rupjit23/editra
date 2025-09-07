import { io } from "socket.io-client";

const BACKEND_URL = "https://editra.onrender.com"; 

export const initSocket = async () => {
  const options = {
    'force new connection': true,
    reconnectionAttempts: Infinity,
    timeout: 10000,
    transports: ['websocket'],
  };

  return io(BACKEND_URL, options);
};





