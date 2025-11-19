import React, { useState, useEffect } from "react";
import api from "../../api"; // go up two folders to reach src/api.js

const Resources = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [resources, setResources] = useState([]);
  const [uploading, setUploading] = useState(false);
  const token = localStorage.getItem("token");

  const fetchResources = async () => {
    try {
      const res = await api.get("/api/resources", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResources(res.data);
    } catch (err) {
      console.error("Error fetching resources:", err.response || err.message);
      alert("Failed to fetch resources");
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !title) return alert("Title and file are required");
    setUploading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file);

    try {
      await api.post("/api/resources", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Upload successful!");
      fetchResources(); // refresh list
      setTitle("");
      setDescription("");
      setFile(null);
    } catch (err) {
      console.error("Upload error:", err.response || err.message);
      alert(err.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Upload Resource</h2>

      <form
        onSubmit={handleUpload}
        className="flex flex-col gap-4 bg-gray-100 p-4 rounded-lg shadow"
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
        <button
          type="submit"
          disabled={uploading}
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>

      <h3 className="text-xl font-semibold mt-8">Available Resources</h3>
      <ul className="mt-4 space-y-3">
        {resources.map((r) => (
          <li key={r._id} className="bg-white p-3 rounded shadow">
            <h4 className="font-bold">{r.title}</h4>
            <p>{r.description}</p>
            {r.fileUrl && (
              <a
                href={r.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                View Resource
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Resources;
