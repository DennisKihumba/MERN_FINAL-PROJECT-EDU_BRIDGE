import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "edu-bridge/resources",
    allowed_formats: ["jpg", "png", "jpeg", "pdf", "docx", "mp4", "mov"],
  },
});

const parser = multer({ storage });

export default parser;
