import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="hero-section">
      <div className="hero-bg" />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div className="slide-up">

          {/* Logo / Brand */}
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            <div style={{ fontSize: "3rem", marginBottom: "4px", opacity: 0.9 }}>🌉</div>
            <h1 style={{ fontSize: "2.4rem", letterSpacing: "-0.03em" }}>
              MoodBridge
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginTop: "4px" }}>
              Find someone who feels the same way you do.
            </p>
          </div>

          {/* Problem / Solution — immediate clarity */}
          <div
            style={{
              background: "var(--bg-card)",
              borderRadius: "var(--radius)",
              padding: "24px",
              border: "1px solid var(--border)",
              marginBottom: "28px"
            }}
          >
            <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "var(--text-muted)", marginBottom: "20px" }}>
              <span style={{ color: "var(--primary-light)", fontWeight: 600 }}>Struggling with grief?</span> Lonely after a breakup? <span style={{ color: "var(--primary-light)", fontWeight: 600 }}>Just want to talk about the 90s with someone who remembers?</span>
            </p>
            <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "var(--text)" }}>
              MoodBridge connects you with people nearby who share your <strong>exact emotional state</strong> or interest — right now. No small talk. No awkward introductions. Just real connection.
            </p>
          </div>

          {/* How it works — clean, minimal */}
          <div style={{ marginBottom: "28px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <div className="feature-card">
                <div className="feature-icon" style={{ background: "rgba(91, 79, 215, 0.12)", color: "var(--primary-light)" }}>
                  01
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.9rem", marginBottom: "2px" }}>Tell us your mood</div>
                  <div style={{ color: "var(--text-dim)", fontSize: "0.8rem", lineHeight: 1.4 }}>
                    Pick from categories like grief, nostalgia, spirituality — or create your own tag like "timeline shifts" or "AI talk"
                  </div>
                </div>
              </div>

              <div className="feature-card">
                <div className="feature-icon" style={{ background: "rgba(91, 79, 215, 0.12)", color: "var(--primary-light)" }}>
                  02
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.9rem", marginBottom: "2px" }}>Match with someone who gets it</div>
                  <div style={{ color: "var(--text-dim)", fontSize: "0.8rem", lineHeight: 1.4 }}>
                    See people near you who chose the same mood. No profiles, no swiping — just shared feeling.
                  </div>
                </div>
              </div>

              <div className="feature-card">
                <div className="feature-icon" style={{ background: "rgba(46, 213, 115, 0.12)", color: "var(--success)" }}>
                  03
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.9rem", marginBottom: "2px" }}>Chat or meet up — safely</div>
                  <div style={{ color: "var(--text-dim)", fontSize: "0.8rem", lineHeight: 1.4 }}>
                    Chat first. When you're ready, verify your ID (phone + government ID) and meet at a public place. Safety built in.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Safety note */}
          <div style={{
            textAlign: "center",
            padding: "14px",
            background: "rgba(46, 213, 115, 0.06)",
            borderRadius: "var(--radius-sm)",
            border: "1px solid rgba(46, 213, 115, 0.1)",
            marginBottom: "24px"
          }}>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
              🛡️ Phone verification required · ID verification for meetups · Your privacy matters
            </span>
          </div>

          {/* CTA */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <button className="btn btn-primary" onClick={() => navigate("/signup")}>
              Get Started Free
            </button>
            <button className="btn btn-secondary" onClick={() => navigate("/home")}>
              I already have an account
            </button>
          </div>

          {/* Footer */}
          <p style={{ textAlign: "center", color: "var(--text-dim)", fontSize: "0.7rem", marginTop: "20px", lineHeight: 1.5 }}>
            By continuing, you agree to our Terms & Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}