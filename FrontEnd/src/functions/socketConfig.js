import { io } from "socket.io-client";

const socketConfig = io("http://localhost:5000", {
  transports: ["websocket"],
  autoConnect: true,
});

export default socketConfig;
