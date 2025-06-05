const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 8000;
const http = require("http");
const { Server } = require("socket.io");
const { createMessage, getUserAccount, updateLastMessageAt } = require("./db/queries");

let corsOptions = {
  origin: ["http://127.0.0.1:5173", "http://127.0.0.1:5174"],
};

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://127.0.0.1:5173", "http://127.0.0.1:5174"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.set("io", io);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authRoute = require("./routes/authRoutes");
app.use(authRoute);

const friendRoute = require("./routes/friendRoutes");
app.use(friendRoute);

const messageRoute = require("./routes/messageRoute");
app.use(messageRoute);

app.get("/", (req, res) => {
  res.send("Welcome");
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // personal room for direct messages
  socket.on("joinUserRoom", (userId) => {
    socket.join(`user_${userId}`);
    console.log(`User ${userId} joined their personal room`);
  });

  // handle direct messages
  socket.on("sendDirectMessage", async ({ senderId, receiverUsername, content }) => {
    try {
      const receiverUser = await getUserAccount(receiverUsername);
      const receiverId = receiverUser.id;
      const savedMessage = await createMessage(parseInt(senderId), parseInt(receiverId), content);
      await updateLastMessageAt(parseInt(senderId), parseInt(receiverId));

      // Emit to room
      io.to(`user_${receiverId}`).emit("newDirectMessage", savedMessage);
      io.to(`user_${receiverId}`).emit("refreshFriendsList");

      // Emit to sender's room
      io.to(`user_${senderId}`).emit("newDirectMessage", savedMessage);
      io.to(`user_${senderId}`).emit("refreshFriendsList");
    } catch (error) {
      console.log("Error saving or emitting message:", error);
      socket.emit("ErrorMessage", { error: "Failed to send message." });
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
