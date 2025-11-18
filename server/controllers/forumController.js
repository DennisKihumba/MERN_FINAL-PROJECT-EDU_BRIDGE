import Thread from "../models/threadModel.js";
import Message from "../models/messageModel.js";

// ✅ Create a new thread
export const createThread = async (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  try {
    const thread = await Thread.create({
      title,
      description,
      creator: req.user._id,
      creatorName: req.user.name,
      creatorRole: req.user.role,
      participants: [req.user._id],
    });

    res.status(201).json(thread);
  } catch (error) {
    console.error("Error creating thread:", error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get all threads
export const getThreads = async (req, res) => {
  try {
    const threads = await Thread.find()
      .populate("creator", "name role")
      .sort({ createdAt: -1 });

    res.json(threads);
  } catch (error) {
    console.error("Error fetching threads:", error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get messages in a thread
export const getThreadMessages = async (req, res) => {
  try {
    const messages = await Message.find({ thread: req.params.id })
      .sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ Create a message in a thread
export const createMessage = async (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ message: "Message content is required" });
  }

  try {
    const message = await Message.create({
      thread: req.params.id,
      sender: req.user._id,
      senderName: req.user.name,
      senderRole: req.user.role,
      content,
    });

    // Add sender to participants if not already
    const thread = await Thread.findById(req.params.id);
    if (!thread.participants.includes(req.user._id)) {
      thread.participants.push(req.user._id);
      await thread.save();
    }

    res.status(201).json(message);
  } catch (error) {
    console.error("Error creating message:", error);
    res.status(500).json({ message: error.message });
  }
};
