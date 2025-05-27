import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! How can I assist you with Urban Governance project?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5001/api/chatbot', { question: input });
      const botMessage = { sender: 'bot', text: response.data.answer };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = { sender: 'bot', text: 'Sorry, I am having trouble answering right now.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
      setInput('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow-lg flex flex-col h-[500px]">
      <div className="flex-1 overflow-y-auto mb-4 p-2 border border-gray-300 rounded">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded ${
              msg.sender === 'bot' ? 'bg-gray-200 text-gray-800 self-start' : 'bg-blue-500 text-white self-end'
            } max-w-[80%]`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex">
        <textarea
          className="flex-1 border border-gray-300 rounded p-2 resize-none"
          rows={2}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask your question..."
          disabled={loading}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="ml-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
