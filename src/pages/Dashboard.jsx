import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("moodbridge_user");
    if (stored) setUser(JSON.parse(stored));
    else navigate("/");

    // Check if they've seen the welcome before
    const seen = localStorage.getItem("moodbridge_welcome_seen");
    if (seen) setShowWelcome(false);
  }, []);

  const dismissWelcome = () => {
    setShowWelcome(false);
    localStorage.setItem("moodbridge_welcome_seen", "true");
  };

  if (!user) return null;

  return (
    <div className="page">
      <div className="container">
        {/* Welcome card (shows on first visit) */}
        {showWelcome && (
          <div className="card" style={{
            marginBottom: "20px",
            borderColor: "var(--primary)",
            background: "linear-gradient(135deg, rgba(108,92,231,0.1), rgba(255,107,107,0.05))"
          }}>
            <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
              <span style={{ fontSize: "2rem" }}>👋</span>
              <div>
                <h3 style={{ fontSize: "1rem", marginBottom: "4px" }}>Welcome to MoodBridge, {user.name}!</h3>
                <p className="text-sm text-muted" style={{ lineHeight: 1.5 }}>
                  Here's how it works:
                </p>
                <div style={{ marginTop: "10px", display: "flex", flexDirection: "column", gap: "8px" }}>
                  <div className="text-sm" style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <span>1️⃣</span> <span className="text-muted">Go to <strong>Moods</strong> and pick how you feel</span>
                  </div>
                  <div className="text-sm" style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <span>2️⃣</span> <span className="text-muted">See people near you who feel the same</span>
                  </div>
                  <div className="text-sm" style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <span>3️⃣</span> <span className="text-muted">Tap a person to chat — no awkward hello</span>
                  </div>
                </div>
                <button className="btn btn-sm btn-primary mt-8" onClick={dismissWelcome} style={{ width: "auto" }}>
                  Got it! →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div>
            <h2>Hey, {user.name} 👋</h2>
            <p className="text-muted text-sm">What are you in the mood for today?</p>
          </div>
        </div>

        {/* Quick actions */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "20px" }}>
          <div className="card card-clickable" onClick={() => navigate("/categories")} style={{ textAlign: "center", padding: "20px 12px" }}>
            <div style={{ fontSize: "2rem", marginBottom: "6px" }}>🎯</div>
            <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>Pick a mood</div>
            <div className="text-xs text-dim">Browse categories</div>
          </div>
          <div className="card card-clickable" onClick={() => navigate("/matches")} style={{ textAlign: "center", padding: "20px 12px" }}>
            <div style={{ fontSize: "2rem", marginBottom: "6px" }}>👥</div>
            <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>See matches</div>
            <div className="text-xs text-dim">People near you</div>
          </div>
          <div className="card card-clickable" onClick={() => navigate("/categories")} style={{ textAlign: "center", padding: "20px 12px" }}>
            <div style={{ fontSize: "2rem", marginBottom: "6px" }}>🏷️</div>
            <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>Create a tag</div>
            <div className="text-xs text-dim">e.g. "90s music"</div>
          </div>
          <div className="card card-clickable" onClick={() => navigate("/profile")} style={{ textAlign: "center", padding: "20px 12px" }}>
            <div style={{ fontSize: "2rem", marginBottom: "6px" }}>🛡️</div>
            <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>Verify ID</div>
            <div className="text-xs text-dim">Unlock meetups</div>
          </div>
        </div>

        {/* Search bar */}
        <div className="search-bar" style={{ marginBottom: "16px" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder='Try: "timeline shifts", "AI talk", "grief support"'
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.target.value.trim()) {
                navigate(`/matches?tag=${encodeURIComponent(e.target.value.trim())}`);
              }
            }}
          />
        </div>

        {/* Example people */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
          <h3 style={{ fontSize: "1rem" }}>People near you</h3>
          <button className="btn btn-sm btn-outline" onClick={() => navigate("/matches")} style={{ width: "auto", fontSize: "0.75rem" }}>See all →</button>
        </div>

        {/* Demo users */}
        {[
          { id: "u1", name: "Alex", tags: ["90s nostalgia", "gaming"], location: "2.3 miles", online: true, verified: true, color: "#6C5CE7", emoji: "🧑" },
          { id: "u2", name: "Jordan", tags: ["grief", "spirituality"], location: "4.1 miles", online: true, verified: false, color: "#FF6B6B", emoji: "👩" },
          { id: "u3", name: "Sam", tags: ["AI talk", "quantum physics"], location: "1.8 miles", online: false, verified: true, color: "#00C9A7", emoji: "🧔" },
        ].map((u) => (
          <div key={u.id} className="card user-card card-clickable" onClick={() => navigate(`/chat/${u.id}`)}>
            <div className="user-avatar" style={{ background: u.color }}>
              {u.emoji}
              {u.online && <span className="online-dot" />}
            </div>
            <div className="user-info">
              <div className="name">{u.name}</div>
              <div className="location">📍 {u.location}</div>
              <div className="match-tags">
                {u.tags.map((tag, i) => (
                  <span key={i} className="match-tag">#{tag}</span>
                ))}
              </div>
            </div>
            {u.verified && (
              <div className="verified-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0 1 12 2.944a11.955 11.955 0 0 1-8.618 3.04A12.02 12.02 0 0 0 3 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                Verified
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}