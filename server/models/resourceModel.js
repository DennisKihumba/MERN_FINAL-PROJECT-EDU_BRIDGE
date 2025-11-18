import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String, required: true }, // e.g., Subject
    grade: { type: String, required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    fileUrl: { type: String }, // Cloudinary link
    fileType: { type: String }, // pdf, docx, video, etc.
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        text: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const Resource = mongoose.model("Resource", resourceSchema);
export default Resource;
