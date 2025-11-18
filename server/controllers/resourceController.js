import Resource from "../models/Resource.js";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadResource = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const result = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: "edu-bridge-resources",
    });

    const resource = new Resource({
      title: req.body.title,
      description: req.body.description,
      fileUrl: result.secure_url,
      uploadedBy: req.user._id,
    });

    await resource.save();
    res.status(201).json(resource);
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
};

export const getResources = async (req, res) => {
  try {
    const resources = await Resource.find().populate("uploadedBy", "name role");
    res.json(resources);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
