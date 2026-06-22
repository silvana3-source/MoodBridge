import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="page" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div className="container" style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div className="slide-up" style={{ textAlign: "center" }}>
          {/* Logo */}
          <div style={{ fontSize: "4rem", marginBottom: "4px" }}>🌉</div>
          <h1 style={{ fontSize: "2.6rem", marginBottom: "4px" }}>
            <span className="gradient-text">MoodBridge</span>
          </h1>
          <p className="text-muted" style={{ fontSize: "1rem", marginBottom: "8px", lineHeight: 1.5 }}>
            Ever felt alone in a crowd? <br />
            <strong>Find someone who feels the same way you do — right now.</strong>
          </p>

          {/* How it works — SIMPLE steps */}
          <div style={{
            background: "var(--bg-card)",
            borderRadius: "var(--radius)",
            padding: "20px",
            marginBottom: "28px",
            border: "1px solid var(--border)",
            textAlign: "left"
          }}>
            <div style={{ fontWeight: 700, marginBottom: "14px", fontSize: "0.95rem", textAlign: "center" }}>How it works</div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{
                  background: "var(--primary)",
                  color: "white",
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  flexShrink: 0
                }}>1</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>Tell us how you feel</div>
                  <div className="text-xs text-dim">Sad? Nostalgic? Curious about the 90s? Pick a mood or make your own tag.</div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{
                  background: "var(--primary)",
                  color: "white",
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  flexShrink: 0
                }}>2</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>Meet people who get it</div>
                  <div className="text-xs text-dim">Matched with others feeling the same way near you. No awkward intros.</div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{
                  background: "var(--success)",
                  color: "white",
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  flexShrink: 0
                }}>3</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>Chat or meet up — safely</div>
                  <div className="text-xs text-dim">ID verification required for in-person meetups. Always in public places.</div>
                </div>
              </div>
            </div>
          </div>

          {/* What you can talk about — visual examples */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", justifyContent: "center", marginBottom: "28px" }}>
            {[
              { emoji: "😢", label: "Grief" },
              { emoji: "💔", label: "Breakup" },
              { emoji: "📼", label: "90s Nostalgia" },
              { emoji: "✨", label: "Spirituality" },
              { emoji: "👽", label: "Unexplained" },
              { emoji: "🤖", label: "AI & Tech" },
              { emoji: "☕", label: "Boredom" },
              { emoji: "🧠", label: "Deep Talks" },
            ].map((item) => (
              <span key={item.label} style={{
                padding: "6px 12px",
                background: "rgba(108, 92, 231, 0.1)",
                borderRadius: "20px",
                fontSize: "0.8rem",
                color: "var(--text-muted)"
              }}>
                {item.emoji} {item.label}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <button className="btn btn-primary" onClick={() => navigate("/signup")}>
              Get Started — It's Free
            </button>
            <button className="btn btn-secondary" onClick={() => navigate("/home")}>
              I already have an account
            </button>
          </div>

          <p className="text-xs text-dim" style={{ marginTop: "20px", lineHeight: 1.5 }}>
            🛡️ Phone verification required. ID verification for meetups.<br />
            Your safety is our priority.
          </p>
        </div>
      </div>
    </div>
  );
}