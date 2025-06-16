import { io } from "socket.io-client";

const socketConfig = io(`${import.meta.env.VITE_API_SOCKET}:5000`, {
  transports: ["websocket"],
  autoConnect: true,
});

export default socketConfig;
