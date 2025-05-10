import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Chatbot = () => {
  const navigate = useNavigate();

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.body.className = theme === "dark" ? "dark-mode" : "light-mode";
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const productKnowledge = {
    greetings: "Hello! How can I assist you today?",
    products: "We offer phones, laptops, tablets, desktops, computer components, speakers, and microphones.",
    phone: "Phones come in different types: budget, mid-range, and flagship. Consider battery life, camera quality, and processing power.",
    laptop: "Laptops vary by purpose: gaming, business, or general use. Key factors: RAM, processor speed, SSD.",
    tablet: "Tablets are great for portability and entertainment. Choose Android, iOS, or Windows.",
    desktop: "Desktops offer powerful performance. Look for upgradability, CPU/GPU strength, and cooling.",
    "computer components": "Components include CPU, GPU, RAM, SSD, motherboard, PSU. Each affects performance.",
    speakers: "Speakers can be wired, Bluetooth, or smart. Consider quality, battery, and compatibility.",
    microphone: "Microphones may be dynamic or condenser. Dynamic suits live use; condenser is best for studio."
  };

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { text: input, sender: "user" }]);
    setLoading(true);

    setTimeout(() => {
      const response = productKnowledge[input.toLowerCase()] || "Sorry, I don't have information on that.";
      setMessages((prev) => [...prev, { text: response, sender: "bot" }]);
      setInput("");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="chatbot-container">
      <div className="chat-header">
        <h2>Jayden's mall Chatbot</h2>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "dark" ? <b>☀️</b> : <b>🌙</b>}
        </button>
      </div>

      <div className="chat-box">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat-message ${msg.sender}`}>
            {msg.sender === "user" ? <b>👤</b>: <b> 🤖</b>}
            <p>{msg.text}</p>
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={input}
          placeholder="Ask me about Jaydens mall products..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend} disabled={loading}>
          {loading ? "Loading..." : "Send"}
        </button>
      </div>

      <button className="home-button" onClick={() => navigate("/")}>
        Back to Home
      </button>
    </div>
  );
};

export default Chatbot;
