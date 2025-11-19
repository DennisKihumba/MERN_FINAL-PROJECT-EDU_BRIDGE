import { useState } from "react";
import api from "../../api"; // go up two folders to reach src/api.js


const ResourceUpload = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !title) return alert("Title and file are required");
    if (!token) return alert("You must be logged in to upload resources");

    setUploading(true);

    try {
      // FormData for file upload
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", title);
      formData.append("description", description);

      // ✅ Use api.js instance instead of manual URL
      const res = await api.post("/api/resources", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Upload successful!");
      console.log("Uploaded resource:", res.data);

      // Reset form
      setFile(null);
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error("Upload error:", err.response || err.message);
      alert(err.response?.data?.message || "Upload failed. Check console for details.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Upload Resource</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg flex flex-col gap-4 w-full max-w-md"
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
};

export default ResourceUpload;
