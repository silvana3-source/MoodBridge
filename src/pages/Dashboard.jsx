import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { moodEmojis } from "../data/categories";
import UserCard from "../components/UserCard";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [currentMood, setCurrentMood] = useState(null);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("moodbridge_user");
    if (stored) setUser(JSON.parse(stored));
    else navigate("/");

    // Generate demo matches
    const demoMatches = [
      { id: "u1", name: "Alex", tags: ["90s nostalgia", "gaming", "anxiety"], location: "2.3 miles away", online: true, verified: true },
      { id: "u2", name: "Jordan", tags: ["grief", "spirituality", "books"], location: "4.1 miles away", online: true, verified: false },
      { id: "u3", name: "Sam", tags: ["AI talk", "quantum physics", "music"], location: "1.8 miles away", online: false, verified: true },
      { id: "u4", name: "Riley", tags: ["breakup", "coffee chat", "walking"], location: "3.5 miles away", online: true, verified: false },
      { id: "u5", name: "Casey", tags: ["80s music", "photography", "lonely"], location: "5.0 miles away", online: false, verified: true },
    ];
    setMatches(demoMatches);
  }, []);

  const handleMoodSelect = (m) => {
    setCurrentMood(m);
    navigate("/categories");
  };

  if (!user) return null;

  return (
    <div className="page">
      <div className="container">
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <div>
            <h2>Hey, {user.name} 👋</h2>
            <p className="text-muted text-sm">How are you feeling today?</p>
          </div>
          <div className="verified-badge" style={{ fontSize: "0.65rem" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
            Phone Verified
          </div>
        </div>

        {/* Quick Mood Selector */}
        <div className="card" style={{ marginBottom: "20px" }}>
          <h3 style={{ marginBottom: "12px", fontSize: "0.95rem" }}>What's your mood right now?</h3>
          <div className="mood-grid">
            {moodEmojis.slice(0, 8).map((m) => (
              <button
                key={m.emoji}
                className={`mood-btn ${currentMood?.emoji === m.emoji ? "selected" : ""}`}
                onClick={() => handleMoodSelect(m)}
              >
                <span className="emoji">{m.emoji}</span>
                <span className="label">{m.label}</span>
              </button>
            ))}
          </div>
          <button className="btn btn-sm btn-outline" style={{ width: "100%", marginTop: "8px" }} onClick={() => navigate("/categories")}>
            Browse all categories →
          </button>
        </div>

        {/* Create custom tag */}
        <div className="card" style={{ marginBottom: "20px" }}>
          <h3 style={{ marginBottom: "8px", fontSize: "0.95rem" }}>🔍 Looking for something specific?</h3>
          <p className="text-xs text-dim" style={{ marginBottom: "12px" }}>
            Search by keyword to find people talking about what you care about
          </p>
          <div className="search-bar" style={{ marginBottom: 0 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder='e.g. "timeline shifts", "AI talk", "90s music"'
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.target.value.trim()) {
                  navigate(`/matches?tag=${encodeURIComponent(e.target.value.trim())}`);
                }
              }}
            />
          </div>
        </div>

        {/* People near you */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
          <h3 style={{ fontSize: "1.1rem" }}>People near you</h3>
          <button className="btn btn-sm btn-outline" onClick={() => navigate("/matches")}>View all</button>
        </div>

        {matches.slice(0, 3).map((m) => (
          <UserCard
            key={m.id}
            user={m}
            onMessage={() => navigate(`/chat/${m.id}`)}
          />
        ))}
      </div>
    </div>
  );
}