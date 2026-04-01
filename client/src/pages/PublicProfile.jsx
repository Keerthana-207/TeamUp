import { useState, useRef, useCallback } from "react";
import "./PublicProfile.css";
import { ThreeDots } from 'react-loader-spinner';
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const ROLE_CFG = {
  Student : { icon: "school",              cls: "student", label: "Student"  },
  Mentor  : { icon: "psychology",          cls: "mentor",  label: "Mentor"   },
  Admin   : { icon: "admin_panel_settings",cls: "admin",   label: "Admin"    },
};


function useToasts() {
  const [toasts, setToasts] = useState([]);
  const id = useRef(0);
  const show = useCallback((msg, type = "info", icon = "info", ms = 3000) => {
    const tid = ++id.current;
    setToasts(p => [...p, { id: tid, msg, type, icon }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== tid)), ms);
  }, []);
  return { toasts, show };
}

// Star Ratings
function StarRating({ avg, count, onRate }) {
  const [hover, setHover]         = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [submitted, setSubmitted]  = useState(false);
  const display = hover || userRating || avg;

  function handleRate(val) {
    setUserRating(val);
  }
  function handleSubmit() {
    if (!userRating) return;
    setSubmitted(true);
    onRate(userRating);
  }

  return (
    <div className="pp-rating-strip">
      {/* Display stars (readonly — shows avg) */}
      <div className="pp-stars">
        {[1,2,3,4,5].map(n => {
          const filled = avg >= n;
          const half   = !filled && avg >= n - 0.5;
          return (
            <span
              key={n}
              className={`material-icons-round pp-star readonly ${filled ? "filled" : half ? "half" : "empty"}`}
            >
              {filled ? "star" : half ? "star_half" : "star_outline"}
            </span>
          );
        })}
      </div>
      <span className="pp-rating-val">{avg?.toFixed(1)}</span>
      <span className="pp-rating-count">({count} ratings)</span>

      {/* Interactive: user rates */}
      {!submitted ? (
        <div className="pp-rating-your">
          Rate:
          <div className="pp-stars">
            {[1,2,3,4,5].map(n => (
              <span
                key={n}
                className={`material-icons-round pp-star ${(hover || userRating) >= n ? "filled" : "empty"}`}
                onMouseEnter={() => setHover(n)}
                onMouseLeave={() => setHover(0)}
                onClick={() => handleRate(n)}
              >
                {(hover || userRating) >= n ? "star" : "star_outline"}
              </span>
            ))}
          </div>
          {userRating > 0 && (
            <button className="pp-rating-submit" onClick={handleSubmit}>Submit</button>
          )}
        </div>
      ) : (
        <div className="pp-rating-your">
          <span className="material-icons-round" style={{ color: "var(--green)", fontSize: "17px" }}>check_circle</span>
          Thanks for rating!
        </div>
      )}
    </div>
  );
}

// Public Profile Page
export default function PublicProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [isOwn, setIsOwn] = useState(false);
  const { toasts, show: showToast } = useToasts();
  const [connected, setConnected]   = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  function handleConnect() {
    setConnected(true);
    showToast(`Connection request sent to ${user.fullName}!`, "success", "person_add");
  }

  function handleRate(val) {
    showToast(`You rated ${user.fullName} ${val} star${val > 1 ? "s" : ""}!`, "success", "star");
  }

  function formatDate(dateString) {
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.toLocaleString("en-IN", { month: "long" });
    const year = date.getFullYear();

    // Add suffix (st, nd, rd, th)
    const getSuffix = (d) => {
      if (d > 3 && d < 21) return "th";
      switch (d % 10) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
      }
    };

    return `${day}${getSuffix(day)} ${month} ${year}`;
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        const loggedInId = JSON.parse(atob(token.split(".")[1])).id;

        const actualId = id === "me" ? loggedInId : id;

        const res = await axios.get(
          `http://localhost:3001/api/auth/profile/${actualId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setUser(res.data.user);

        setIsOwn(loggedInId === res.data.user._id);

      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, [id]);

  if (!user) return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",       // full viewport height
      width: "100vw",        // full viewport width
      background: "var(--bg)" // optional, match your dashboard background
    }}>
      <ThreeDots
        visible={true}
        height="80"
        width="80"
        color="#53CBF3"
        radius="9"
        ariaLabel="three-dots-loading"
      />
    </div>
  );
  const role = ROLE_CFG[user?.role] || ROLE_CFG.Student;
  return (
    <>
      {/* ── BG Effects ─────────────────────────────────────── */}
      <div className="pp-bg-grid" />
      <div className="pp-orb pp-orb-1" />
      <div className="pp-orb pp-orb-2" />
      <div className="pp-orb pp-orb-3" />

      <div className="pp-root">

        {/* ── Top Bar ──────────────────────────────────────── */}
        <header className="pp-topbar">
          <a href="/" className="pp-topbar-logo">
            <span className="material-icons-round pp-topbar-logo-icon">bolt</span>
            Team<span className="pp-topbar-logo-accent">Up</span>
          </a>
          <div className="pp-topbar-spacer" />
          <a href="/dashboard" className="pp-back-btn">
            <span className="material-icons-round">arrow_back</span>
            Back to Dashboard
          </a>
        </header>

        {/* ── Page ─────────────────────────────────────────── */}
        <div className="pp-page">

          {/* ══ HERO CARD ════════════════════════════════════ */}
          <div className="pp-hero-card">
            <div className="pp-banner" />

            <div className="pp-hero-body">
              {/* Avatar */}
              <div className="pp-avatar-wrap">
                <div className="pp-avatar">
                  {user.photoUrl
                    ? <img src={user.photoUrl} alt={user.fullName} />
                    : <span className="material-icons-round">person</span>
                  }
                </div>
                {user.isOnline && <div className="pp-online-dot" title="Online" />}
              </div>

              {/* Name + role */}
              <div className="pp-name-row">
                <div className="pp-name-block">
                  <div className="pp-name">{user.fullName}</div>
                  <div className="pp-handle">{user.email}</div>
                </div>
                <div className={`pp-role-badge ${role.cls}`}>
                  <span className="material-icons-round">{role.icon}</span>
                  {role.label}
                </div>
              </div>

              {/* Info pills */}
              <div className="pp-info-row">
                <div className="pp-info-pill">
                  <span className="material-icons-round">account_balance</span>
                  {user.college}
                </div>
                <div className="pp-info-pill">
                  <span className="material-icons-round">biotech</span>
                  {user.department}
                </div>
                {user.year && (
                  <div className="pp-info-pill">
                    <span className="material-icons-round">event_note</span>
                    {user.year}
                  </div>
                )}
                <div className="pp-info-pill">
                  <span className="material-icons-round">calendar_today</span>
                  Joined: {formatDate(user.createdAt)}
                </div>
              </div>

              {/* Bio */}
              {user.bio && (
                <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.65, marginBottom: "20px" }}>
                  {user.bio}
                </p>
              )}

              {/* Star Rating */}
              <StarRating avg={user?.rating?.avg} count={user?.rating?.count} onRate={handleRate} />

              {/* Action buttons */}
              <div className="pp-actions">
                {isOwn ? (
                  <button
                    className="pp-connect-btn"
                    onClick={() => navigate("/profile")}
                  >
                    <span className="material-icons-round">edit</span>
                    Edit Profile
                  </button>
                ) : (
                  <>
                    <button
                      className="pp-connect-btn"
                      onClick={handleConnect}
                      disabled={connected}
                      style={connected ? { opacity: 0.65, cursor: "default" } : {}}
                    >
                      <span className="material-icons-round">
                        {connected ? "how_to_reg" : "person_add"}
                      </span>
                      {connected ? "Request Sent" : "Connect"}
                    </button>
                    <button
                      className="pp-msg-btn"
                      onClick={() => showToast("Messaging coming soon!", "info", "chat")}
                    >
                      <span className="material-icons-round">chat_bubble_outline</span>
                      Message
                    </button>
                  </>
                )}
                {user.github && (
                  <a href={user.github} target="_blank" rel="noreferrer" className="pp-msg-btn">
                    <span className="material-icons-round">terminal</span>
                    GitHub
                  </a>
                )}
                {user.linkedin && (
                  <a href={user.linkedin} target="_blank" rel="noreferrer" className="pp-msg-btn">
                    <span className="material-icons-round">work</span>
                    LinkedIn
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* ══ SKILLS CARD ══════════════════════════════════ */}
          <div className="pp-card">
            <div className="pp-card-head">
              <div className="pp-card-icon">
                <span className="material-icons-round">code</span>
              </div>
              <span className="pp-card-title">Skills</span>
              <span className="pp-card-count">{user.skills.length}</span>
            </div>
            <div className="pp-card-body">
              <div className="pp-tags">
                {user.skills.map((s, i) => (
                  <span
                    key={s._id}
                    className="pp-tag skill"
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    <span className="material-icons-round">code</span>
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ══ INTERESTS CARD ═══════════════════════════════ */}
          <div className="pp-card">
            <div className="pp-card-head">
              <div className="pp-card-icon" style={{ background: "rgba(167,139,250,0.1)", borderColor: "rgba(167,139,250,0.2)" }}>
                <span className="material-icons-round" style={{ color: "var(--violet)" }}>interests</span>
              </div>
              <span className="pp-card-title">Interests</span>
              <span className="pp-card-count" style={{ background: "rgba(167,139,250,0.1)", color: "var(--violet)", borderColor: "rgba(167,139,250,0.2)" }}>
                {user.interests.length}
              </span>
            </div>
            <div className="pp-card-body">
              <div className="pp-tags">
                {user.interests.map((s, i) => (
                  <span key={s} className="pp-tag interest" style={{ animationDelay: `${i * 0.05}s` }}>
                    <span className="material-icons-round">interests</span>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Toasts ─────────────────────────────────────────── */}
      <div className="pp-toast-container">
        {toasts.map(t => (
          <div key={t.id} className={`pp-toast ${t.type}`}>
            <span className="material-icons-round">{t.icon}</span>
            {t.msg}
          </div>
        ))}
      </div>
    </>
  );
}
