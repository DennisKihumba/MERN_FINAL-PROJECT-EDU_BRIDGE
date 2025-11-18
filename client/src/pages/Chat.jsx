import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("chatMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
  }, []);

  const sendMessage = () => {
    if (message.trim() !== "") {
      socket.emit("chatMessage", message);
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
          onChange={(e)=>setMessage(e.target.value)}
        />
        <button onClick={sendMessage} className="bg-blue-600 text-white px-4 py-2 rounded">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
