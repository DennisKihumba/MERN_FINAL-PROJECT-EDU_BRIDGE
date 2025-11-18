import express from "express";
import { authMiddleware, adminOnly } from "../middleware/authMiddleware.js";
import {
  createThread,
  getThreads,
  getThreadMessages,
  createMessage
} from "../controllers/forumController.js";

const router = express.Router();

// 🔹 Thread Routes
router.post("/threads", authMiddleware, createThread);          // Create a new thread
router.get("/threads", authMiddleware, getThreads);            // Get all threads

// 🔹 Message Routes for a thread
router.get("/threads/:id/messages", authMiddleware, getThreadMessages);  // Get messages in a thread
router.post("/threads/:id/messages", authMiddleware, createMessage);    // Post a new message in a thread

export default router;
