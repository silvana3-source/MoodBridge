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
        <h2 style={{ marginBottom: "4px" }}>Find your people</h2>
        <p className="text-muted text-sm" style={{ marginBottom: "20px" }}>
          Pick a category or create your own
        </p>

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

        {/* Custom tag creator */}
        <div className="card" style={{ marginBottom: "20px", borderColor: "var(--primary)" }}>
          <h3 style={{ fontSize: "0.9rem", marginBottom: "8px" }}>✨ Create your own tag</h3>
          <p className="text-xs text-dim" style={{ marginBottom: "10px" }}>
            Can't find what you're looking for? Make a tag and see who joins.
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
              placeholder={myTags.length === 0 ? 'e.g. "timeline shifts", "AI talk", "80s goth"...' : "Add another..."}
              value={customTag}
              onChange={(e) => setCustomTag(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") addCustomTag();
              }}
            />
          </div>
          <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
            <button className="btn btn-sm btn-secondary" onClick={addCustomTag} disabled={!customTag.trim()}>
              + Add tag
            </button>
            {myTags.length > 0 && (
              <button className="btn btn-sm btn-primary" onClick={searchCustom}>
                Find matches →
              </button>
            )}
          </div>
        </div>

        {/* Category grid */}
        <div className="cat-grid">
          {filtered.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="empty-state">
            <div className="icon">🔍</div>
            <h3>No categories found</h3>
            <p className="text-muted text-sm">Try a different search or create a custom tag above</p>
          </div>
        )}
      </div>
    </div>
  );
}