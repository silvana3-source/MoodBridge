import { useNavigate } from "react-router-dom";

// Demo avatars — in production these would be user-uploaded
const avatarColors = ["#6C5CE7", "#FF6B6B", "#00C9A7", "#FFC75F", "#D65DB1", "#2ECC71", "#FF9671", "#845EC2"];
const avatarEmojis = ["🧑", "👩", "🧔", "👨‍🦰", "👩‍🦱", "🧑‍🦳", "👨‍🦲", "👩‍🦰"];

export default function UserCard({ user, onMessage }) {
  const navigate = useNavigate();
  const colorIdx = user.id.charCodeAt(0) % avatarColors.length;

  return (
    <div className="card user-card card-clickable fade-in" onClick={() => onMessage && onMessage(user)}>
      <div className="user-avatar" style={{ background: avatarColors[colorIdx] }}>
        {avatarEmojis[colorIdx]}
        {user.online && <span className="online-dot" />}
      </div>
      <div className="user-info">
        <div className="name">{user.name}</div>
        <div className="location">📍 {user.location || "Near you"}</div>
        <div className="match-tags">
          {user.tags?.slice(0, 3).map((tag, i) => (
            <span key={i} className="match-tag">#{tag}</span>
          ))}
          {user.tags?.length > 3 && <span className="match-tag">+{user.tags.length - 3}</span>}
        </div>
      </div>
      {user.verified && (
        <div className="verified-badge" title="ID Verified for meetups">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0 1 12 2.944a11.955 11.955 0 0 1-8.618 3.04A12.02 12.02 0 0 0 3 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          Verified
        </div>
      )}
    </div>
  );
}