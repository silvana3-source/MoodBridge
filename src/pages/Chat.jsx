import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const demoUsers = {
  u1: { name: "Alex", emoji: "🧑", color: "#6C5CE7", mood: "90s Nostalgia" },
  u2: { name: "Jordan", emoji: "👩", color: "#FF6B6B", mood: "Grief & Loss" },
  u3: { name: "Sam", emoji: "🧔", color: "#00C9A7", mood: "AI & Deep Talk" },
  u4: { name: "Riley", emoji: "👨‍🦰", color: "#FFC75F", mood: "Breakup Support" },
  u5: { name: "Casey", emoji: "👩‍🦱", color: "#D65DB1", mood: "80s Music" },
  u6: { name: "Morgan", emoji: "🧑‍🦳", color: "#2ECC71", mood: "Spirituality" },
  u7: { name: "Taylor", emoji: "👨‍🦲", color: "#FF9671", mood: "Quantum Physics" },
  u8: { name: "Jamie", emoji: "👩‍🦰", color: "#845EC2", mood: "Entrepreneurship" },
};

const starterChats = {
  u1: [
    { text: "Hey! Saw you're into 90s nostalgia too. What's your favorite thing about that decade?", sender: "them", time: "2m ago" },
    { text: "The music for sure! Grunge, hip hop, boy bands — it was all so good.", sender: "me", time: "1m ago" },
  ],
  u2: [
    { text: "I noticed you're going through grief too. It's really hard. I'm here if you want to talk.", sender: "them", time: "5m ago" },
    { text: "Thank you. It's been a rough few weeks. I think I just need someone who understands.", sender: "me", time: "4m ago" },
  ],
  u3: [
    { text: "AI is developing so fast it's scary and exciting at the same time. What do you think?", sender: "them", time: "3m ago" },
    { text: "Right? I think we're at a turning point. The next 5 years will change everything.", sender: "me", time: "2m ago" },
  ],
};

const autoReplies = [
  "I totally get that. Tell me more!",
  "That's exactly how I feel too ❤️",
  "Would you want to grab coffee and talk about it?",
  "I've been thinking the same thing lately.",
  "It helps just knowing someone else gets it.",
  "That's really interesting! How did you get into that?",
  "Sending you a virtual hug 🤗",
  "Maybe we can meet up this weekend?",
];

export default function Chat() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);

  const user = demoUsers[userId] || { name: "Someone", emoji: "👤", color: "#666", mood: "Unknown" };

  useEffect(() => {
    // Load starter chat or start fresh
    const chat = starterChats[userId] || [];
    if (chat.length === 0) {
      chat.push({ text: "Hi! I saw we matched. How are you feeling today?", sender: "them", time: "just now" });
    }
    setMessages(chat);
  }, [userId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (e) => {
    e?.preventDefault();
    if (!newMsg.trim()) return;

    const msg = {
      text: newMsg.trim(),
      sender: "me",
      time: "just now",
    };
    setMessages((prev) => [...prev, msg]);
    setNewMsg("");
    setIsTyping(true);

    // Simulate typing then reply
    setTimeout(() => {
      setIsTyping(false);
      const reply = {
        text: autoReplies[Math.floor(Math.random() * autoReplies.length)],
        sender: "them",
        time: "just now",
      };
      setMessages((prev) => [...prev, reply]);
    }, 1200 + Math.random() * 800);
  };

  return (
    <div className="chat-container">
      {/* Header */}
      <div className="chat-header">
        <button className="back-btn" onClick={() => navigate("/matches")}>←</button>
        <div style={{
          width: "42px", height: "42px", borderRadius: "50%",
          background: user.color, display: "flex", alignItems: "center",
          justifyContent: "center", fontSize: "1.3rem", flexShrink: 0
        }}>
          {user.emoji}
        </div>
        <div>
          <div style={{ fontWeight: 600, fontSize: "0.95rem" }}>{user.name}</div>
          <div className="text-xs" style={{ color: "var(--text-dim)" }}>
            Matched via: {user.mood}
          </div>
        </div>
        <button
          className="btn btn-sm btn-outline"
          style={{ marginLeft: "auto", width: "auto", fontSize: "0.7rem", padding: "6px 10px" }}
          onClick={() => navigate("/profile")}
        >
          ☕ Meet up?
        </button>
      </div>

      {/* Messages */}
      <div className="chat-messages">
        <div className="text-center text-xs text-dim" style={{ marginBottom: "12px", padding: "8px" }}>
          You matched based on shared feelings. No need for small talk. 🙌
        </div>

        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.sender === "me" ? "sent" : "received"}`}>
            {msg.text}
            <span className="time">{msg.time}</span>
          </div>
        ))}

        {isTyping && (
          <div className="message received" style={{ maxWidth: "100px" }}>
            <span style={{ display: "flex", gap: "4px" }}>
              <span style={{ animation: "pulse 1s infinite" }}>.</span>
              <span style={{ animation: "pulse 1s infinite 0.2s" }}>.</span>
              <span style={{ animation: "pulse 1s infinite 0.4s" }}>.</span>
            </span>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form className="chat-input-area" onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="Type a message..."
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          autoFocus
        />
        <button type="submit" className="send-btn" disabled={!newMsg.trim()}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </form>
    </div>
  );
}