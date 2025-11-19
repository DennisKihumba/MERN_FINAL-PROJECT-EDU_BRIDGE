import { useEffect, useState } from "react";
import api from "../../api"; // go up two folders to reach src/api.js

const ResourceList = () => {
  const [resources, setResources] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const res = await api.get("/api/resources", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResources(res.data);
    } catch (err) {
      console.error("Fetch resources error:", err.response || err.message);
      alert("Failed to fetch resources");
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <h2 className="text-3xl font-bold mb-6">Learning Resources</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resources.map((res) => (
          <div
            key={res._id}
            className="bg-white p-4 rounded shadow hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold mb-2">{res.title}</h3>
            <p className="text-sm text-gray-500 mb-2">
              Uploaded by: {res.creatorName}
            </p>
            {res.link && (
              <a
                href={res.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View/Download
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourceList;
