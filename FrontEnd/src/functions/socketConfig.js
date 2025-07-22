import { io } from "socket.io-client";

const socketConfig = io(`${import.meta.env.VITE_API_SOCKET}:5000`, {
   transports: ["polling"], 
  autoConnect: false,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  // reconnection: true,
});

export default socketConfig;
