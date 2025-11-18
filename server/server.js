import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import forumRoutes from "./routes/forumRoutes.js";
import resourceRoutes from "./routes/resourceRoutes.js";
import http from "http";
import { Server } from "socket.io";
import cloudinary from "./config/cloudinary.js";

dotenv.config();

const app = express();

/* --------------------------- CORS FIX HERE --------------------------- */
app.use(
  cors({
    origin: [
      "https://edu-bridge-phi.vercel.app", // your deployed client
      "http://localhost:5173"              // your laptop
    ],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
/* --------------------------------------------------------------------- */

app.use(express.json());

connectDB();

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/forum", forumRoutes);
app.use("/api/resources", resourceRoutes);

app.get("/", (req, res) => res.send("Edu-Bridge API Running..."));

// Socket.io Setup
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "https://edu-bridge-phi.vercel.app",
      "http://localhost:5173"
    ],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected: " + socket.id);

  socket.on("joinThread", (threadId) => {
    socket.join(threadId);
  });

  socket.on("sendMessage", (data) => {
    io.to(data.threadId).emit("receiveMessage", data.message);
  });

  socket.on("createThread", (thread) => {
    io.emit("newThread", thread);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected: " + socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
