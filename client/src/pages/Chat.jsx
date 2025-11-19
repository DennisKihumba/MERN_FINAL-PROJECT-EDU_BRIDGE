import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_API_URL; // Use Vite env variable
const socket = io(SOCKET_URL, {
  withCredentials: true, // if your server uses cookies
  transports: ["websocket"], // ensure websocket transport
});

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Listen for messages from server
    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    // Cleanup on unmount
    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() !== "") {
      socket.emit("sendMessage", { message }); // match server-side event
      setMessage("");
    }
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-3">Chat Room</h2>
      <div className="border p-4 h-64 overflow-y-scroll mb-4 bg-gray-100 rounded">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">{msg}</div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          className="flex-grow border rounded p-2 mr-2"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
