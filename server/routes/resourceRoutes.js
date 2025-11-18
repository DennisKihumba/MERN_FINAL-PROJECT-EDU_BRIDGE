import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { authMiddleware } from "../middleware/authMiddleware.js";
import Resource from "../models/Resource.js";

const router = express.Router();

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer + Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "edu-bridge-resources",
    resource_type: "auto",
  },
});

const upload = multer({ storage });

// Upload resource
router.post("/", authMiddleware, upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const resource = new Resource({
      title: req.body.title,
      description: req.body.description,
      fileUrl: req.file.path, // Cloudinary URL
      uploadedBy: req.user.id,
    });

    await resource.save();
    res.status(201).json(resource);
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: "Upload failed" });
  }
});

// Get all resources
router.get("/", authMiddleware, async (req, res) => {
  try {
    const resources = await Resource.find().populate("uploadedBy", "name");
    res.json(resources);
  } catch (err) {
    console.error("Fetch resources error:", err);
    res.status(500).json({ message: "Failed to fetch resources" });
  }
});

export default router;
