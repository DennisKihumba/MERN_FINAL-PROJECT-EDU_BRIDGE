import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ResourceDetails = () => {
  const { id } = useParams();
  const [resource, setResource] = useState({});
  const [comment, setComment] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchResource();
  }, []);

  const fetchResource = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/resources/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResource(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch resource");
    }
  };

  const handleComment = async () => {
    if (!comment) return;
    try {
      await axios.post(
        `http://localhost:5000/api/resources/${id}/comment`,
        { content: comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Comment added!");
      setComment("");
    } catch (err) {
      console.error(err);
      alert("Failed to add comment");
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <h2 className="text-3xl font-bold mb-4">{resource.title}</h2>
      {resource.link && (
        <a
          href={resource.link}
          target="_blank"
          className="text-blue-600 hover:underline mb-4 block"
        >
          View/Download Resource
        </a>
      )}

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Comments</h3>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="flex-1 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleComment}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Post
          </button>
        </div>
        <div className="space-y-2">
          {resource.comments?.map((c) => (
            <div key={c._id} className="bg-white p-2 rounded shadow">
              <p className="text-sm font-semibold">{c.userName}</p>
              <p>{c.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResourceDetails;
