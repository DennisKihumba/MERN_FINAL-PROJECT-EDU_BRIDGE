import mongoose from "mongoose";

const threadSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    creatorName: { type: String }, // quick access to creator’s name
    creatorRole: { type: String }, // quick access to creator’s role
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const Thread = mongoose.model("Thread", threadSchema);
export default Thread;
