import { useParams, useNavigate } from "react-router-dom";
import { categories, moodEmojis } from "../data/categories";
import { useState, useEffect } from "react";
import UserCard from "../components/UserCard";

export default function CategoryDetail() {
  const { catId } = useParams();
  const navigate = useNavigate();
  const category = categories.find((c) => c.id === catId);

  const [selectedSub, setSelectedSub] = useState(null);
  const [selectedMood, setSelectedMood] = useState(null);

  // Demo users filtered by this category
  const [users] = useState([
    { id: "u1", name: "Alex", tags: [category?.name?.toLowerCase() || "", "gaming"], location: "2.3 miles away", online: true, verified: true },
    { id: "u2", name: "Jordan", tags: [category?.subcategories?.[0]?.toLowerCase() || "", "books"], location: "4.1 miles away", online: true, verified: false },
    { id: "u3", name: "Sam", tags: [category?.subcategories?.[1]?.toLowerCase() || "", "music"], location: "1.8 miles away", online: false, verified: true },
    { id: "u4", name: "Riley", tags: ["conversation", "coffee"], location: "3.5 miles away", online: true, verified: false },
  ]);

  if (!category) {
    return (
      <div className="page">
        <div className="container">
          <div className="empty-state">
            <div className="icon">🤷</div>
            <h3>Category not found</h3>
            <button className="btn btn-secondary mt-16" onClick={() => navigate("/categories")}>Go back</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container">
        {/* Back + Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
          <button className="btn btn-icon btn-secondary" onClick={() => navigate("/categories")} style={{ width: "40px", height: "40px", fontSize: "1.2rem" }}>
            ←
          </button>
          <div>
            <div style={{ fontSize: "0.8rem", color: category.color }}>{category.icon} {category.name}</div>
            <p className="text-xs text-dim">{category.description}</p>
          </div>
        </div>

        {/* How are you feeling? */}
        <div className="card" style={{ marginBottom: "16px" }}>
          <h3 style={{ fontSize: "0.9rem", marginBottom: "10px" }}>How are you feeling?</h3>
          <div className="mood-grid" style={{ gridTemplateColumns: "repeat(6, 1fr)" }}>
            {moodEmojis.slice(0, 6).map((m) => (
              <button
                key={m.emoji}
                className={`mood-btn ${selectedMood?.emoji === m.emoji ? "selected" : ""}`}
                onClick={() => setSelectedMood(m)}
                style={{ padding: "8px 4px" }}
              >
                <span className="emoji" style={{ fontSize: "1.3rem" }}>{m.emoji}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Subcategories */}
        <div style={{ marginBottom: "16px" }}>
          <h3 style={{ fontSize: "0.9rem", marginBottom: "10px" }}>Pick a topic</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {category.subcategories.map((sub) => (
              <button
                key={sub}
                className={`btn btn-sm ${selectedSub === sub ? "btn-primary" : "btn-secondary"}`}
                onClick={() => setSelectedSub(selectedSub === sub ? null : sub)}
                style={{ width: "auto", padding: "6px 14px", fontSize: "0.8rem" }}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>

        {/* People */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
          <h3 style={{ fontSize: "1rem" }}>People here</h3>
          <span className="text-xs text-dim">{users.length} online</span>
        </div>

        {users.map((u) => (
          <UserCard key={u.id} user={u} onMessage={() => navigate(`/chat/${u.id}`)} />
        ))}

        {/* Custom tag within this category */}
        <div className="card mt-16" style={{ borderStyle: "dashed" }}>
          <p className="text-xs text-dim text-center">
            Don't see what you're looking for?{" "}
            <button
              style={{ background: "none", border: "none", color: "var(--primary-light)", cursor: "pointer", font: "inherit" }}
              onClick={() => navigate("/categories")}
            >
              Create a custom tag
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}