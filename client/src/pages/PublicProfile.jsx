import { useState, useRef, useCallback, useEffect } from "react";
import "./PublicProfile.css";
import { ThreeDots } from 'react-loader-spinner';
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ROLE_CFG = {
  Student: { icon: "school",               cls: "student", label: "Student"  },
  Mentor:  { icon: "psychology",           cls: "mentor",  label: "Mentor"   },
  Admin:   { icon: "admin_panel_settings", cls: "admin",   label: "Admin"    },
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

/* ── Circular Rating Ring ───────────────────────────────── */
function RatingRing({ avg, count, onRate }) {
  const [hover, setHover]           = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [submitted, setSubmitted]   = useState(false);

  const safeAvg = avg || 0;
  const r       = 38;
  const circ    = 2 * Math.PI * r;
  const filled  = (safeAvg / 5) * circ;

  function handleSubmit() {
    if (!userRating) return;
    setSubmitted(true);
    onRate(userRating);
  }

  return (
    <div className="pp-rating-card">
      {/* Ring */}
      <div className="pp-ring-wrap">
        <svg width="92" height="92" viewBox="0 0 92 92">
          <circle cx="46" cy="46" r={r} fill="none" stroke="var(--border)" strokeWidth="4" />
          <circle
            cx="46" cy="46" r={r} fill="none"
            stroke="var(--cyan)" strokeWidth="4"
            strokeDasharray={`${filled} ${circ}`}
            strokeLinecap="round"
            transform="rotate(-90 46 46)"
            style={{ transition: "stroke-dasharray 1.2s cubic-bezier(0.4,0,0.2,1)" }}
          />
        </svg>
        <div className="pp-ring-inner">
          <span className="pp-ring-val">{safeAvg.toFixed(1)}</span>
          <span className="pp-ring-sub">/ 5</span>
        </div>
      </div>

      {/* Stars + user input */}
      <div className="pp-rating-info">
        <div className="pp-rating-label">REPUTATION SCORE</div>
        <div className="pp-stars-row">
          {[1,2,3,4,5].map(n => {
            const f = safeAvg >= n, h = !f && safeAvg >= n - 0.5;
            return (
              <span key={n} className={`material-icons-round pp-star readonly ${f ? "filled" : h ? "half" : "empty"}`}>
                {f ? "star" : h ? "star_half" : "star_outline"}
              </span>
            );
          })}
          <span className="pp-rating-count">{count} ratings</span>
        </div>

        {!submitted ? (
          <div className="pp-rate-row">
            <span className="pp-rate-prompt">Rate:</span>
            {[1,2,3,4,5].map(n => (
              <span
                key={n}
                className={`material-icons-round pp-star interactive ${(hover || userRating) >= n ? "filled" : "empty"}`}
                onMouseEnter={() => setHover(n)}
                onMouseLeave={() => setHover(0)}
                onClick={() => setUserRating(n)}
              >
                {(hover || userRating) >= n ? "star" : "star_outline"}
              </span>
            ))}
            {userRating > 0 && (
              <button className="pp-submit-btn" onClick={handleSubmit}>Submit</button>
            )}
          </div>
        ) : (
          <div className="pp-rate-thanks">
            <span className="material-icons-round" style={{ color: "var(--green)", fontSize: 16 }}>check_circle</span>
            Rating submitted
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Main Page ──────────────────────────────────────────── */
export default function PublicProfile() {
  const [user, setUser]         = useState(null);
  const [isOwn, setIsOwn]       = useState(false);
  const [connected, setConnected] = useState(false);
  const { toasts, show: showToast } = useToasts();
  const { id }      = useParams();
  const navigate    = useNavigate();

  function handleConnect() {
    setConnected(true);
    showToast(`Request sent to ${user.fullName}`, "success", "person_add");
  }
  function handleRate(val) {
    showToast(`Rated ${val} star${val > 1 ? "s" : ""}`, "success", "star");
  }
  function formatDate(ds) {
    const d = new Date(ds);
    const day = d.getDate();
    const sfx = day > 3 && day < 21 ? "th" : ["th","st","nd","rd"][day % 10] || "th";
    return `${day}${sfx} ${d.toLocaleString("en-IN",{month:"short"})} ${d.getFullYear()}`;
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token      = localStorage.getItem("token");
        const loggedInId = JSON.parse(atob(token.split(".")[1])).id;
        const actualId   = id === "me" ? loggedInId : id;
        const res = await axios.get(
          `http://localhost:3001/api/auth/profile/${actualId}`,
          { headers: { Authorization: `Bearer ${token}` } }
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
    <div className="pp-loader">
      <ThreeDots visible height="80" width="80" color="#53CBF3" radius="9" ariaLabel="loading" />
    </div>
  );

  const role   = ROLE_CFG[user?.role] || ROLE_CFG.Student;
  const uidStr = `USR-${(user._id || "000000").slice(-4).toUpperCase()}`;

  return (
    <>
      {/* BG */}
      <div className="pp-bg-grid" />
      <div className="pp-orb pp-orb-1" />
      <div className="pp-orb pp-orb-2" />
      <div className="pp-orb pp-orb-3" />

      <div className="pp-root">

        {/* Topbar */}
        <header className="pp-topbar">
          <a href="/" className="pp-topbar-logo">
            <span className="material-icons-round pp-topbar-logo-icon">bolt</span>
            Team<span className="pp-topbar-logo-accent">Up</span>
          </a>
          <div className="pp-topbar-spacer" />
          <a href="/dashboard" className="pp-back-btn">
            <span className="material-icons-round">arrow_back</span>
            Dashboard
          </a>
        </header>

        {/* Frame */}
        <div className="pp-frame">

          {/* ── SIDEBAR ──────────────────────────────── */}
          <aside className="pp-sidebar">

            {/* UID chip */}
            <div className="pp-uid-chip">
              <span className="pp-uid-dot" />
              {uidStr}
            </div>

            {/* Avatar frame */}
            <div className="pp-avatar-outer">
              <div className="pp-corner pp-tl" />
              <div className="pp-corner pp-tr" />
              <div className="pp-corner pp-bl" />
              <div className="pp-corner pp-br" />
              <div className="pp-avatar-frame">
                {user.profilePhoto
                  ? <img src={user.profilePhoto} alt={user.fullName} />
                  : (
                    <div className="pp-avatar-placeholder">
                      <span className="material-icons-round">person</span>
                    </div>
                  )
                }
                <div className="pp-scan-line" />
                {user.isOnline && <div className="pp-online-pip" title="Online" />}
              </div>
            </div>

            {/* Name block */}
            <div className="pp-name-block">
              <h1 className="pp-name">{user.fullName}</h1>
              <div className="pp-handle">{user.email}</div>
            </div>

            {/* Role badge */}
            <div className={`pp-role-badge ${role.cls}`}>
              <span className="material-icons-round">{role.icon}</span>
              {role.label}
            </div>

            <div className="pp-sidebar-divider" />

            {/* Meta grid */}
            <div className="pp-meta-grid">
              <div className="pp-meta-row">
                <span className="pp-meta-label">INSTITUTION</span>
                <span className="pp-meta-val">{user.college}</span>
              </div>
              <div className="pp-meta-row">
                <span className="pp-meta-label">DEPARTMENT</span>
                <span className="pp-meta-val">{user.department}</span>
              </div>
              {user.year && (
                <div className="pp-meta-row">
                  <span className="pp-meta-label">YEAR</span>
                  <span className="pp-meta-val">{user.year}</span>
                </div>
              )}
              <div className="pp-meta-row">
                <span className="pp-meta-label">ENROLLED</span>
                <span className="pp-meta-val">{formatDate(user.createdAt)}</span>
              </div>
            </div>

            <div className="pp-sidebar-divider" />

            {/* Actions */}
            <div className="pp-actions">
              {isOwn ? (
                <button className="pp-btn-primary" onClick={() => navigate("/profile")}>
                  <span className="material-icons-round">edit</span>
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    className="pp-btn-primary"
                    onClick={handleConnect}
                    disabled={connected}
                    style={connected ? { opacity: 0.6, cursor: "default" } : {}}
                  >
                    <span className="material-icons-round">
                      {connected ? "how_to_reg" : "person_add"}
                    </span>
                    {connected ? "Requested" : "Connect"}
                  </button>
                  <button
                    className="pp-btn-ghost"
                    onClick={() => showToast("Messaging coming soon!", "info", "chat")}
                  >
                    <span className="material-icons-round">chat_bubble_outline</span>
                    Message
                  </button>
                </>
              )}
            </div>

            {/* External links */}
            {(user.github || user.linkedin) && (
              <div className="pp-link-strip">
                {user.github && (
                  <a href={user.github} target="_blank" rel="noreferrer" className="pp-link-chip">
                    <span className="material-icons-round">terminal</span>
                    GitHub
                  </a>
                )}
                {user.linkedin && (
                  <a href={user.linkedin} target="_blank" rel="noreferrer" className="pp-link-chip">
                    <span className="material-icons-round">work</span>
                    LinkedIn
                  </a>
                )}
              </div>
            )}
          </aside>

          {/* ── CONTENT ──────────────────────────────── */}
          <main className="pp-content">

            {/* Rating */}
            <RatingRing avg={user?.rating?.avg} count={user?.rating?.count} onRate={handleRate} />

            {/* Bio */}
            {user.bio && (
              <section className="pp-section">
                <div className="pp-section-head">
                  <span className="pp-section-num">01</span>
                  <span className="pp-section-title">About</span>
                  <div className="pp-section-line" />
                </div>
                <p className="pp-bio">{user.bio}</p>
              </section>
            )}

            {/* Skills */}
            <section className="pp-section">
              <div className="pp-section-head">
                <span className="pp-section-num">0{user.bio ? 2 : 1}</span>
                <span className="pp-section-title">Skills</span>
                <div className="pp-section-line" />
                <span className="pp-section-count">{user.skills.length}</span>
              </div>
              <div className="pp-skill-grid">
                {user.skills.map((s, i) => (
                  <div
                    key={s._id}
                    className="pp-skill-chip"
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    <span className="pp-skill-hex" />
                    {s.name}
                  </div>
                ))}
              </div>
            </section>

            {/* Interests */}
            <section className="pp-section">
              <div className="pp-section-head">
                <span className="pp-section-num">0{user.bio ? 3 : 2}</span>
                <span className="pp-section-title">Interests</span>
                <div className="pp-section-line" />
                <span className="pp-section-count pp-violet-count">{user.interests.length}</span>
              </div>
              <div className="pp-interest-grid">
                {user.interests.map((s, i) => (
                  <div
                    key={s}
                    className="pp-interest-chip"
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    <span className="material-icons-round">interests</span>
                    {s}
                  </div>
                ))}
              </div>
            </section>

          </main>
        </div>
      </div>

      {/* Toasts */}
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
