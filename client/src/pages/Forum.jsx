import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Forum = () => {
  const [threads, setThreads] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchThreads();
  }, []);

  const fetchThreads = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/forum/threads", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setThreads(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch threads");
    }
  };

  const handleCreateThread = async (e) => {
    e.preventDefault();
    if (!title) return;
    setLoading(true);

    try {
      await axios.post(
        "http://localhost:5000/api/forum/threads",
        { title },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTitle("");
      fetchThreads();
    } catch (err) {
      console.error(err);
      alert("Failed to create thread");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      <h2 className="text-3xl font-bold mb-6 text-blue-700">Forum Threads</h2>

      {/* Create Thread */}
      <form onSubmit={handleCreateThread} className="mb-6 flex gap-3">
        <input
          type="text"
          placeholder="New thread title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-md"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </form>

      {/* Threads List */}
      <div className="space-y-4">
        {threads.map((thread) => (
          <Link
            to={`/thread/${thread._id}`}
            key={thread._id}
            className="block bg-white p-5 rounded-lg shadow hover:shadow-lg transition duration-300 hover:bg-blue-50"
          >
            <h3 className="text-xl font-semibold text-gray-800">{thread.title}</h3>
            <p className="text-sm text-gray-500 mt-1">
              Created by {thread.creatorName || "Unknown"}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Forum;
