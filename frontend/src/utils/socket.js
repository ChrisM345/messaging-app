import { io } from "socket.io-client";

// Point to your backend server
const socket = io("http://localhost:8000", {
  withCredentials: true,
  autoConnect: true,
});

export default socket;
