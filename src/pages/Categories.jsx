import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { categories } from "../data/categories";
import CategoryCard from "../components/CategoryCard";

export default function Categories() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [customTag, setCustomTag] = useState("");
  const [myTags, setMyTags] = useState([]);

  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.subcategories.some((s) => s.toLowerCase().includes(search.toLowerCase()))
  );

  const addCustomTag = () => {
    const tag = customTag.trim();
    if (tag && !myTags.includes(tag)) {
      setMyTags([...myTags, tag]);
      setCustomTag("");
    }
  };

  const removeTag = (tag) => setMyTags(myTags.filter((t) => t !== tag));

  const searchCustom = () => {
    if (myTags.length > 0) {
      navigate(`/matches?tags=${encodeURIComponent(myTags.join(","))}`);
    }
  };

  return (
    <div className="page">
      <div className="container">
        <div style={{ marginBottom: "20px" }}>
          <h2 style={{ fontSize: "1.4rem", marginBottom: "4px" }}>How are you feeling?</h2>
          <p className="text-muted text-sm">Choose a category or create your own to find people nearby</p>
        </div>

        {/* Search */}
        <div className="search-bar">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Create custom tag */}
        <div className="card" style={{ marginBottom: "20px", borderColor: "var(--border)" }}>
          <div style={{ fontWeight: 600, fontSize: "0.9rem", marginBottom: "6px" }}>Can't find what you're looking for?</div>
          <p className="text-xs text-dim" style={{ marginBottom: "12px" }}>
            Create your own tag — if others search for it, you'll find each other.
          </p>
          <div className="tag-input-container">
            {myTags.map((tag) => (
              <span key={tag} className="tag">
                #{tag}
                <span className="remove" onClick={() => removeTag(tag)}>×</span>
              </span>
            ))}
            <input
              className="tag-input"
              placeholder={myTags.length === 0 ? 'e.g. "timeline shifts", "AI development", "80s goth music"...' : "Add another..."}
              value={customTag}
              onChange={(e) => setCustomTag(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") addCustomTag(); }}
            />
          </div>
          <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
            <button className="btn btn-sm btn-secondary" onClick={addCustomTag} disabled={!customTag.trim()}>
              Add tag
            </button>
            {myTags.length > 0 && (
              <button className="btn btn-sm btn-primary" onClick={searchCustom}>
                Find matches →
              </button>
            )}
          </div>
        </div>

        {/* Category grid */}
        <div style={{ marginBottom: "12px" }}>
          <h3 style={{ fontSize: "1rem" }}>Browse categories</h3>
        </div>
        <div className="cat-grid">
          {filtered.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="empty-state">
            <div className="icon" style={{ fontSize: "2.5rem" }}>🔍</div>
            <h3 style={{ fontSize: "1.1rem" }}>No categories found</h3>
            <p className="text-muted text-sm">Try a different search or create a custom tag above</p>
          </div>
        )}
      </div>
    </div>
  );
}