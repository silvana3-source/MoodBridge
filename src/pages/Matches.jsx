import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import UserCard from "../components/UserCard";

export default function Matches() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tagParam = searchParams.get("tag") || searchParams.get("tags");

  const [matches, setMatches] = useState([]);
  const [filter, setFilter] = useState("all"); // all, online, verified

  useEffect(() => {
    // Demo matches — in production these would come from an API
    const allMatches = [
      { id: "u1", name: "Alex", tags: ["90s nostalgia", "gaming", "anxiety"], location: "2.3 miles away", online: true, verified: true },
      { id: "u2", name: "Jordan", tags: ["grief", "spirituality", "books"], location: "4.1 miles away", online: true, verified: false },
      { id: "u3", name: "Sam", tags: ["AI talk", "quantum physics", "music"], location: "1.8 miles away", online: false, verified: true },
      { id: "u4", name: "Riley", tags: ["breakup", "coffee chat", "walking"], location: "3.5 miles away", online: true, verified: false },
      { id: "u5", name: "Casey", tags: ["80s music", "photography", "lonely"], location: "5.0 miles away", online: false, verified: true },
      { id: "u6", name: "Morgan", tags: ["witchcraft", "astrology", "art"], location: "0.8 miles away", online: true, verified: true },
      { id: "u7", name: "Taylor", tags: ["timeline shifts", "consciousness", "meditation"], location: "6.2 miles away", online: true, verified: false },
      { id: "u8", name: "Jamie", tags: ["AI development", "tech", "entrepreneur"], location: "3.0 miles away", online: false, verified: true },
    ];

    let filtered = allMatches;

    // If searching by tag, filter
    if (tagParam) {
      const searchTags = tagParam.split(",").map(t => t.trim().toLowerCase());
      filtered = allMatches.filter(m =>
        m.tags.some(t => searchTags.some(st => t.toLowerCase().includes(st)))
      );
    }

    setMatches(filtered);
  }, [tagParam]);

  const filteredMatches = matches.filter((m) => {
    if (filter === "online") return m.online;
    if (filter === "verified") return m.verified;
    return true;
  });

  return (
    <div className="page">
      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
          <h2>Your matches</h2>
          <span className="text-xs text-dim">{filteredMatches.length} people</span>
        </div>

        {tagParam && (
          <p className="text-sm text-muted" style={{ marginBottom: "16px" }}>
            Searching: <span className="badge">#{tagParam.replace(",", ", #")}</span>
          </p>
        )}

        {/* Filter tabs */}
        <div style={{ display: "flex", gap: "6px", marginBottom: "16px" }}>
          {[
            { key: "all", label: "All" },
            { key: "online", label: "🟢 Online" },
            { key: "verified", label: "🛡️ Verified" },
          ].map((f) => (
            <button
              key={f.key}
              className={`btn btn-sm ${filter === f.key ? "btn-primary" : "btn-secondary"}`}
              onClick={() => setFilter(f.key)}
              style={{ width: "auto", padding: "6px 14px", fontSize: "0.8rem" }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {filteredMatches.length === 0 ? (
          <div className="empty-state">
            <div className="icon">🔍</div>
            <h3>No matches yet</h3>
            <p className="text-muted text-sm" style={{ marginBottom: "16px" }}>
              Try a different category or create your own tag
            </p>
            <button className="btn btn-primary" onClick={() => navigate("/categories")}>
              Browse categories
            </button>
          </div>
        ) : (
          filteredMatches.map((m) => (
            <UserCard key={m.id} user={m} onMessage={() => navigate(`/chat/${m.id}`)} />
          ))
        )}
      </div>
    </div>
  );
}