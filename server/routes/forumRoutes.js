import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createThread,
  getThreads,
  getThreadMessages,
  createMessage
} from "../controllers/forumController.js";

const router = express.Router();

// 🔹 Thread Routes
router.post("/threads", protect, createThread);          // Create a new thread
router.get("/threads", protect, getThreads);            // Get all threads

// 🔹 Message Routes for a thread
router.get("/threads/:id/messages", protect, getThreadMessages);  // Get messages in a thread
router.post("/threads/:id/messages", protect, createMessage);    // Post a new message in a thread

export default router;
