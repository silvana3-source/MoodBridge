import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <div className="container" style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: "40px", paddingBottom: "40px" }}>
        <div className="slide-up">

          {/* Brand */}
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <div style={{ fontSize: "2.8rem", marginBottom: "8px", opacity: 0.9 }}>🌉</div>
            <h1 style={{ fontWeight: 400, letterSpacing: "-0.03em", fontSize: "2.2rem" }}>
              MoodBridge
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "1rem", marginTop: "8px", lineHeight: 1.5 }}>
              A space to connect with people who share <br />what you're going through — right now.
            </p>
          </div>

          {/* The core message */}
          <div className="connection-card" style={{ marginBottom: "32px", textAlign: "center" }}>
            <p style={{ fontSize: "0.95rem", lineHeight: 1.7, color: "var(--text-muted)" }}>
              Grief. A breakup. The urge to talk about the 90s. <br />A curiosity about what happens after we die.
            </p>
            <div style={{ height: "1px", background: "var(--border)", margin: "16px 0" }} />
            <p style={{ fontSize: "0.95rem", lineHeight: 1.7 }}>
              MoodBridge matches you with people nearby who are experiencing the same emotional state or curiosity — so you can talk, share, or simply sit in silence together. No small talk required.
            </p>
          </div>

          {/* How it works */}
          <div style={{ marginBottom: "36px" }}>
            <div style={{ fontWeight: 600, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-dim)", marginBottom: "16px", textAlign: "center" }}>
              How it works
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                <div className="step-number">1</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.9rem", marginBottom: "2px" }}>Choose your state of mind</div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
                    Select from categories like grief, nostalgia, spirituality — or create your own tag, like "timeline shifts" or "AI and consciousness."
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                <div className="step-number">2</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.9rem", marginBottom: "2px" }}>Meet those who understand</div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
                    See people near you who chose the same thing. No profiles, no swiping — just the knowledge that they get it.
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                <div className="step-number">3</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.9rem", marginBottom: "2px" }}>Connect at your own pace</div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
                    Chat first. When you're ready, verify your identity and meet at a public place — a café, a library, a park.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Safety */}
          <div style={{
            textAlign: "center",
            padding: "14px",
            background: "var(--bg-card)",
            borderRadius: "var(--radius-sm)",
            border: "1px solid var(--border)",
            marginBottom: "28px"
          }}>
            <span style={{ fontSize: "0.8rem", color: "var(--text-dim)", lineHeight: 1.5 }}>
              Phone verification required to chat. Government ID verification required to meet in person. Your privacy is protected.
            </span>
          </div>

          {/* CTA */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <button className="btn btn-primary" onClick={() => navigate("/signup")}>
              Create your account
            </button>
            <button className="btn btn-secondary" onClick={() => navigate("/home")}>
              Sign in
            </button>
          </div>

          <p style={{ textAlign: "center", color: "var(--text-dim)", fontSize: "0.7rem", marginTop: "24px" }}>
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}