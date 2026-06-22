import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="page" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div className="container" style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div className="slide-up" style={{ textAlign: "center" }}>
          {/* Logo / Icon */}
          <div style={{ fontSize: "5rem", marginBottom: "8px" }}>🌉</div>
          <h1 style={{ fontSize: "2.8rem", marginBottom: "4px" }}>
            <span className="gradient-text">MoodBridge</span>
          </h1>
          <p className="text-muted" style={{ fontSize: "1.05rem", marginBottom: "32px" }}>
            Connect with people who <em>get it</em> — <br />
            right now, the way you're feeling.
          </p>

          {/* Feature highlights */}
          <div style={{ textAlign: "left", marginBottom: "36px", display: "flex", flexDirection: "column", gap: "14px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "1.5rem" }}>🎯</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: "0.95rem" }}>Mood-first matching</div>
                <div className="text-xs text-dim">Find people feeling the same way right now</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "1.5rem" }}>🛡️</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: "0.95rem" }}>Safe meetups</div>
                <div className="text-xs text-dim">ID verification required to meet in person</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "1.5rem" }}>💬</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: "0.95rem" }}>Skip the small talk</div>
                <div className="text-xs text-dim">Start connected — no awkward introductions</div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <button className="btn btn-primary" onClick={() => navigate("/signup")}>
              Get Started Free
            </button>
            <button className="btn btn-secondary" onClick={() => navigate("/home")}>
              I already have an account
            </button>
          </div>

          <p className="text-xs text-dim" style={{ marginTop: "24px" }}>
            By continuing, you agree to our Terms & Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}