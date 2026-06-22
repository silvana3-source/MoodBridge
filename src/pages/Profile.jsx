import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [idVerified, setIdVerified] = useState(false);
  const [myTags, setMyTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("moodbridge_user");
    if (stored) setUser(JSON.parse(stored));
    else navigate("/");

    // Load saved tags
    const savedTags = localStorage.getItem("moodbridge_tags");
    if (savedTags) setMyTags(JSON.parse(savedTags));
  }, []);

  const addTag = () => {
    const tag = newTag.trim().toLowerCase();
    if (tag && !myTags.includes(tag)) {
      const updated = [...myTags, tag];
      setMyTags(updated);
      localStorage.setItem("moodbridge_tags", JSON.stringify(updated));
      setNewTag("");
    }
  };

  const removeTag = (tag) => {
    const updated = myTags.filter((t) => t !== tag);
    setMyTags(updated);
    localStorage.setItem("moodbridge_tags", JSON.stringify(updated));
  };

  const handleVerification = () => {
    // Simulate ID verification flow
    setIdVerified(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("moodbridge_user");
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="page">
      <div className="container">
        {/* Profile header */}
        <div className="text-center" style={{ marginBottom: "24px" }}>
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, var(--primary), #FF6B6B)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "2.5rem",
              margin: "0 auto 12px",
            }}
          >
            {user.name?.[0]?.toUpperCase() || "👤"}
          </div>
          <h2>{user.name}</h2>
          <p className="text-muted text-sm">{user.phone}</p>
          <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "8px" }}>
            <span className="badge badge-success">✓ Phone Verified</span>
            {idVerified && <span className="badge badge-success">🛡️ ID Verified</span>}
          </div>
        </div>

        {/* My tags */}
        <div className="card" style={{ marginBottom: "16px" }}>
          <h3 style={{ fontSize: "0.95rem", marginBottom: "8px" }}>🏷️ My mood tags</h3>
          <p className="text-xs text-dim" style={{ marginBottom: "12px" }}>
            These help people find you. Add tags for how you're feeling or what you want to talk about.
          </p>
          <div className="tag-input-container" style={{ marginBottom: "8px" }}>
            {myTags.map((tag) => (
              <span key={tag} className="tag">
                #{tag}
                <span className="remove" onClick={() => removeTag(tag)}>×</span>
              </span>
            ))}
            <input
              className="tag-input"
              placeholder={myTags.length === 0 ? 'e.g. "90s music", "grief", "AI talk"...' : "Add another..."}
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") addTag(); }}
            />
          </div>
          <button className="btn btn-sm btn-secondary" onClick={addTag} disabled={!newTag.trim()} style={{ width: "auto" }}>
            + Add
          </button>
        </div>

        {/* ID Verification */}
        <div className="card" style={{ marginBottom: "16px", borderColor: idVerified ? "var(--success)" : "var(--border)" }}>
          <h3 style={{ fontSize: "0.95rem", marginBottom: "8px" }}>🛡️ Safety & Meetups</h3>
          <p className="text-xs text-dim" style={{ marginBottom: "12px" }}>
            To meet people in person, you need to verify your identity. This keeps everyone safe.
          </p>

          {idVerified ? (
            <div style={{ textAlign: "center", padding: "12px" }}>
              <span style={{ fontSize: "2rem" }}>✅</span>
              <p style={{ color: "var(--success)", fontWeight: 600 }}>ID Verified!</p>
              <p className="text-xs text-dim">You can now meet people in person</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem" }}>
                <span>📱</span> <span className="text-muted">Phone verified</span> <span style={{ marginLeft: "auto", color: "var(--success)" }}>✓</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem" }}>
                <span>🪪</span> <span className="text-muted">Government ID</span> <span style={{ marginLeft: "auto", color: "var(--text-dim)" }}>Pending</span>
              </div>
              <button className="btn btn-primary mt-8" onClick={handleVerification}>
                Verify ID — $2.99
              </button>
              <p className="text-xs text-dim text-center">Your ID is encrypted and never shared</p>
            </div>
          )}
        </div>

        {/* Location */}
        <div className="card" style={{ marginBottom: "16px" }}>
          <h3 style={{ fontSize: "0.95rem", marginBottom: "8px" }}>📍 Location</h3>
          <p className="text-xs text-dim" style={{ marginBottom: "8px" }}>
            Your location is used to find people near you. Only your approximate distance is shown.
          </p>
          <select className="input" style={{ cursor: "pointer" }}>
            <option>Within 5 miles</option>
            <option>Within 10 miles</option>
            <option>Within 25 miles</option>
            <option>Within 50 miles</option>
            <option selected>Within 100 miles</option>
          </select>
        </div>

        {/* Logout */}
        <button className="btn btn-secondary" onClick={handleLogout} style={{ borderColor: "var(--danger)", color: "var(--danger)" }}>
          Sign out
        </button>
      </div>
    </div>
  );
}