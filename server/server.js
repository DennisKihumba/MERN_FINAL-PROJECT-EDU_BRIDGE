import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import forumRoutes from "./routes/forumRoutes.js";
import resourceRoutes from "./routes/resourceRoutes.js"; // ✅ Add resource routes
import http from "http";             
import { Server } from "socket.io";  
import cloudinary from "./config/cloudinary.js"; // make sure this is correctly configured

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/forum", forumRoutes);
app.use("/api/resources", resourceRoutes); // ✅ Mount resource routes

app.get("/", (req, res) => res.send("Edu-Bridge API Running..."));

// Create HTTP server and attach Socket.io
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }, // adjust to your frontend URL in production
});

// Socket.io connection
io.on("connection", (socket) => {
  console.log("A user connected: " + socket.id);

  // Join a thread room
  socket.on("joinThread", (threadId) => {
    socket.join(threadId);
  });

  // Listen for new messages in a thread
  socket.on("sendMessage", (data) => {
    io.to(data.threadId).emit("receiveMessage", data.message);
  });

  // Listen for new threads
  socket.on("createThread", (thread) => {
    io.emit("newThread", thread); 
  });

  socket.on("disconnect", () => {
    console.log("User disconnected: " + socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
