import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: name, 2: phone, 3: done
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) setStep(2);
  };

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    if (phone.length >= 10) {
      setCodeSent(true);
      // Simulate sending SMS code
      setTimeout(() => setStep(3), 500);
    }
  };

  const handleCodeSubmit = (e) => {
    e.preventDefault();
    if (code.length >= 4) {
      // Store user info in localStorage (simple MVP approach)
      localStorage.setItem("moodbridge_user", JSON.stringify({
        name: name.trim(),
        phone,
        id: "user_" + Date.now(),
        verified: false,
        online: true
      }));
      navigate("/categories");
    }
  };

  return (
    <div className="page" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div className="container" style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div className="fade-in">
          {/* Progress dots */}
          <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: "32px" }}>
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                style={{
                  width: s === step ? "28px" : "10px",
                  height: "10px",
                  borderRadius: "5px",
                  background: s <= step ? "var(--primary)" : "var(--border)",
                  transition: "all 0.3s ease"
                }}
              />
            ))}
          </div>

          {step === 1 && (
            <form onSubmit={handleNameSubmit} className="slide-up">
              <h2 style={{ marginBottom: "8px" }}>What's your name?</h2>
              <p className="text-muted text-sm" style={{ marginBottom: "24px" }}>
                This is how people will see you
              </p>
              <div className="input-group">
                <input
                  className="input"
                  type="text"
                  placeholder="Your first name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoFocus
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary mt-24" disabled={!name.trim()}>
                Continue
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handlePhoneSubmit} className="slide-up">
              <h2 style={{ marginBottom: "8px" }}>Your phone number</h2>
              <p className="text-muted text-sm" style={{ marginBottom: "24px" }}>
                For verification — we'll send you a code
              </p>
              <div className="input-group">
                <input
                  className="input"
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                  autoFocus
                  required
                />
              </div>
              {codeSent && (
                <p className="text-xs text-muted mt-8" style={{ textAlign: "center" }}>
                  ✅ Code sent to {phone}
                </p>
              )}
              <button type="submit" className="btn btn-primary mt-24" disabled={phone.length < 10}>
                Send Code
              </button>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleCodeSubmit} className="slide-up">
              <h2 style={{ marginBottom: "8px" }}>Enter verification code</h2>
              <p className="text-muted text-sm" style={{ marginBottom: "24px" }}>
                We sent a 6-digit code to your phone
              </p>
              <div className="input-group">
                <input
                  className="input"
                  type="text"
                  placeholder="000000"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  autoFocus
                  required
                  style={{ textAlign: "center", fontSize: "1.5rem", letterSpacing: "8px" }}
                />
              </div>
              <button type="submit" className="btn btn-primary mt-24" disabled={code.length < 4}>
                Verify & Continue
              </button>
              <p className="text-xs text-dim text-center mt-8">
                Didn't get it? <button style={{ background: "none", border: "none", color: "var(--primary-light)", cursor: "pointer", font: "inherit" }} onClick={() => setCodeSent(false)}>Resend</button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}