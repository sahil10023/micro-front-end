import React, { useState } from "react";
import { COHERE_API_KEY } from "../utils/constants"

const ChatApp = ({ apiKey }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const sendMessage = async () => {
    if (!inputMessage.trim()) return; // Prevent sending empty messages

    const userMessage = {
      role: "user",
      content: inputMessage,
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputMessage(""); // Clear input field
    setLoading(true);

    try {
      const response = await fetch("https://api.cohere.ai/v2/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `BEARER ${apiKey ? apiKey : COHERE_API_KEY}`, // Replace <<YOUR_API_KEY>> with your Cohere API key
        },
        body: JSON.stringify({
          model: "command-r-plus",
          messages: [userMessage], // Send the user's message to the API
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response from Cohere API.");
      }

      const data = await response.json();
      console.log(data);
      const aiResponse = {
        role: "assistant",
        content: data?.message?.content?.[0].text || "I couldn't generate a response. Please try again.",
      };

      setMessages((prevMessages) => [...prevMessages, aiResponse]);
    } catch (error) {
      console.error("Error communicating with Cohere API:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: "An error occurred. Please try again later." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-app bg-gray-100 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">AI Chat Application</h2>
      <div className="chat-window bg-white p-4 rounded-lg shadow-inner mb-4 overflow-y-auto h-64">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-3 p-2 rounded-md ${msg.role === "user" ? "bg-blue-100 text-blue-800 text-right" : "bg-gray-100 text-gray-800 text-left"
              }`}
          >
            <p className=" whitespace-pre-line">{msg.content}</p>
          </div>
        ))}
        {loading && (
          <div className="loading text-gray-500 text-center">
            <p>AI is typing...</p>
          </div>
        )}
      </div>
      <div className="input-section flex items-center">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className="flex-grow border rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Type your message here..."
        />
        <button
          onClick={sendMessage}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
          disabled={loading || !inputMessage.trim()}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatApp;
