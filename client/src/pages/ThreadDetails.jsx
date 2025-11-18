import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";

let socket;

const ThreadDetails = () => {
  const { id } = useParams();
  const [thread, setThread] = useState({});
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const token = localStorage.getItem("token");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket = io("http://localhost:5000", {
      auth: { token },
    });

    fetchThread();
    fetchMessages();

    socket.emit("joinThread", id);

    socket.on("newMessage", (msg) => {
      if (msg.thread === id) setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, [id]);

  useEffect(() => {
    // Scroll to bottom on new message
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchThread = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/forum/threads/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setThread(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch thread");
    }
  };

  const fetchMessages = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/forum/threads/${id}/messages`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch messages");
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage) return;

    try {
      const res = await axios.post(
        `http://localhost:5000/api/forum/threads/${id}/messages`,
        { content: newMessage },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      socket.emit("sendMessage", res.data);
      setNewMessage("");
      setMessages((prev) => [...prev, res.data]);
    } catch (err) {
      console.error(err);
      alert("Failed to send message");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6 flex flex-col">
      <h2 className="text-3xl font-bold mb-6 text-blue-700">{thread.title}</h2>

      <div className="flex-1 overflow-auto mb-4 space-y-3 p-4 bg-white rounded-lg shadow">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`p-3 rounded-lg max-w-md break-words ${
              msg.sender === thread.creator ? "bg-blue-200 self-end ml-auto" : "bg-gray-100 self-start"
            }`}
          >
            <p className="text-sm font-semibold text-gray-700">{msg.senderName}</p>
            <p className="text-gray-800">{msg.content}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Send Message */}
      <form onSubmit={handleSendMessage} className="flex gap-3">
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-md"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ThreadDetails;
