import { useEffect, useState } from "react";
import axios from "axios";

const ResourceList = () => {
  const [resources, setResources] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/resources", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResources(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch resources");
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <h2 className="text-3xl font-bold mb-6">Learning Resources</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resources.map((res) => (
          <div key={res._id} className="bg-white p-4 rounded shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">{res.title}</h3>
            <p className="text-sm text-gray-500 mb-2">Uploaded by: {res.creatorName}</p>
            {res.link && (
              <a
                href={res.link}
                target="_blank"
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
