import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const demoUsers = {
  u1: { name: "Alex", avatar: "🧑", color: "#6C5CE7" },
  u2: { name: "Jordan", avatar: "👩", color: "#FF6B6B" },
  u3: { name: "Sam", avatar: "🧔", color: "#00C9A7" },
  u4: { name: "Riley", avatar: "👨‍🦰", color: "#FFC75F" },
  u5: { name: "Casey", avatar: "👩‍🦱", color: "#D65DB1" },
  u6: { name: "Morgan", avatar: "🧑‍🦳", color: "#2ECC71" },
  u7: { name: "Taylor", avatar: "👨‍🦲", color: "#FF9671" },
  u8: { name: "Jamie", avatar: "👩‍🦰", color: "#845EC2" },
};

const demoChats = {
  u1: [
    { text: "Hey! Saw you're into 90s nostalgia too. What's your favorite era?", sent: false, time: "10:32 AM" },
    { text: "Definitely the 90s! The music was just different back then.", sent: true, time: "10:33 AM" },
    { text: "Right? Grunge era was peak. Ever been to a Nirvana tribute show?", sent: false, time: "10:34 AM" },
  ],
  u2: [
    { text: "I saw you're going through something similar. Want to talk about it?", sent: false, time: "11:00 AM" },
    { text: "Yeah, I think I'd like that. It's been a rough few weeks.", sent: true, time: "11:02 AM" },
    { text: "I get it. I'm here if you need to vent. Coffee sometime?", sent: false, time: "11:03 AM" },
  ],
};

export default function Chat() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const bottomRef = useRef(null);

  const user = demoUsers[userId] || { name: "Unknown", avatar: "👤", color: "#666" };

  useEffect(() => {
    // Load demo messages or empty chat
    const chat = demoChats[userId] || [];
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
      sent: true,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages([...messages, msg]);
    setNewMsg("");

    // Simulate reply
    setTimeout(() => {
      const replies = [
        "That's really interesting! Tell me more.",
        "I feel that. ❤️",
        "Yeah, I know exactly what you mean.",
        "Would you want to grab coffee and talk about it?",
        "That's so relatable!",
        "I've been thinking the same thing lately.",
      ];
      const reply = {
        text: replies[Math.floor(Math.random() * replies.length)],
        sent: false,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, reply]);
    }, 1500);
  };

  return (
    <div className="chat-container">
      {/* Header */}
      <div className="chat-header">
        <button className="back-btn" onClick={() => navigate("/matches")}>←</button>
        <div className="user-avatar" style={{ background: user.color, width: "40px", height: "40px", fontSize: "1.2rem", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%" }}>
          {user.avatar}
        </div>
        <div>
          <div style={{ fontWeight: 600 }}>{user.name}</div>
          <div className="text-xs text-dim">Online</div>
        </div>
        {/* Meetup button */}
        <button
          className="btn btn-sm btn-outline"
          style={{ marginLeft: "auto", width: "auto", fontSize: "0.7rem", padding: "6px 12px" }}
          onClick={() => navigate("/profile")}
        >
          ☕ Meet up?
        </button>
      </div>

      {/* Messages */}
      <div className="chat-messages">
        {messages.length === 0 ? (
          <div className="empty-state" style={{ padding: "40px 20px" }}>
            <div className="icon" style={{ fontSize: "3rem" }}>💬</div>
            <h3>Start the conversation</h3>
            <p className="text-muted text-sm">Say something about why you matched</p>
          </div>
        ) : (
          messages.map((msg, i) => (
            <div key={i} className={`message ${msg.sent ? "sent" : "received"}`}>
              {msg.text}
              <span className="time">{msg.time}</span>
            </div>
          ))
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
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white" stroke="none">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </form>
    </div>
  );
}