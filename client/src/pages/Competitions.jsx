import { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import "./Competitions.css";

/* ════════════════════════════════════════════════════════════
   MOCK DATA — replace with API fetch by params.id
════════════════════════════════════════════════════════════ */
const MOCK_HACKATHON = {
  id: "hack01",
  title: "InnovateX National Hackathon 2025",
  organizer: "NASSCOM Foundation",
  mode: "hybrid",           // "online" | "offline" | "hybrid"
  deadline: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000 + 5 * 3600 * 1000),
  prize: "₹5,00,000",
  participants: 1240,
  teamSizeMin: 2,
  teamSizeMax: 5,
  description: `InnovateX is India's biggest student hackathon aimed at solving real-world problems using emerging technology. Teams will compete across 4 tracks — HealthTech, FinTech, EdTech, and Sustainability — and present their solutions to an expert panel of industry leaders and investors.`,
  problemStatement: "Build scalable digital solutions that address critical challenges in healthcare access, financial inclusion, education equity, or climate sustainability for underserved communities in India.",
  rules: [
    "All team members must be currently enrolled students.",
    "Each participant can be a member of only one team.",
    "Solutions must be original and built during the hackathon.",
    "Use of open-source libraries is permitted; do not use pre-built products.",
    "Final submission must include source code, demo video, and a pitch deck.",
  ],
  eligibility: [
    "Currently enrolled UG / PG / PhD students",
    "Age between 18 – 28 years",
    "Any Indian college or university",
    "International students studying in India are welcome",
  ],
  skillsRequired: [
    { name: "React",       icon: "code",        type: "cyan"   },
    { name: "Node.js",     icon: "terminal",    type: "cyan"   },
    { name: "Python",      icon: "code",        type: "cyan"   },
    { name: "ML / AI",     icon: "psychology",  type: "ai"     },
    { name: "Blockchain",  icon: "link",        type: "ai"     },
    { name: "Data Science",icon: "bar_chart",   type: "data"   },
    { name: "UI/UX",       icon: "brush",       type: "cyan"   },
    { name: "Cloud",       icon: "cloud",       type: "data"   },
  ],
  topMatches: [
    { id: "u1", name: "Priya Mehta",    initials: "PM", color: "#63daff", skills: ["React","ML/AI","Python"],  match: 96 },
    { id: "u2", name: "Rohan Gupta",   initials: "RG", color: "#a78bfa", skills: ["Node.js","Cloud","Docker"], match: 91 },
    { id: "u3", name: "Sneha Iyer",    initials: "SI", color: "#34d399", skills: ["Python","Data Science"],    match: 87 },
    { id: "u4", name: "Amit Sharma",   initials: "AS", color: "#fbbf24", skills: ["Blockchain","Web3"],        match: 82 },
    { id: "u5", name: "Divya Nair",    initials: "DN", color: "#f87171", skills: ["UI/UX","Figma","React"],    match: 78 },
  ],
};

/* ════════════════════════════════════════════════════════════
   COUNTDOWN HOOK
════════════════════════════════════════════════════════════ */
function useCountdown(target) {
  const calc = () => {
    const diff = Math.max(0, target - Date.now());
    return {
      days:    Math.floor(diff / 86400000),
      hours:   Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const t = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(t);
  }, [target]);
  return time;
}

/* ════════════════════════════════════════════════════════════
   TOAST HOOK
════════════════════════════════════════════════════════════ */
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

/* ════════════════════════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════════════════════════ */
export default function Competitions({ hackathonId }) {
  const { id } = useParams();
  const hack  = MOCK_HACKATHON;
  const time  = useCountdown(hack.deadline);
  const { toasts, show: showToast } = useToasts();
  const [registered, setRegistered] = useState(false);

  const modeLabel = { online: "Online", offline: "Offline", hybrid: "Hybrid" };
  const modeIcon  = { online: "wifi", offline: "location_on", hybrid: "device_hub" };
  const isUrgent  = time.days < 3;

  function handleRegister() {
    setRegistered(true);
    showToast("Registration successful! Check your email for confirmation.", "success", "check_circle");
  }

  return (
    <>
      <div className="ed-bg-grid" />
      <div className="ed-orb ed-orb-1" />
      <div className="ed-orb ed-orb-2" />
      <div className="ed-orb ed-orb-3" />

      <div className="ed-root">
        {/* ── TOPBAR ─────────────────────────────────── */}
        <header className="ed-topbar">
          <a href="/" className="ed-topbar-logo">
            <span className="material-icons-round ed-logo-icon">bolt</span>
            Team<span className="ed-logo-accent">Up</span>
          </a>
          <div className="ed-topbar-spacer" />
          <a href="/dashboard" className="ed-back-btn">
            <span className="material-icons-round">arrow_back</span>
            Dashboard
          </a>
        </header>

        {/* ── PAGE GRID ──────────────────────────────── */}
        <div className="ed-page">

          {/* ══ HERO ════════════════════════════════════ */}
          <div className="ed-hero">
            <div className="ed-hero-banner" />
            <div className="ed-hero-body">
              <div className="ed-hero-icon">
                <span className="material-icons-round">emoji_events</span>
              </div>
              <div className="ed-hero-text">
                <div className="ed-hero-organizer">{hack.organizer}</div>
                <h1 className="ed-hero-title">{hack.title}</h1>
                <div className="ed-hero-pills">
                  <span className={`ed-mode-pill ${hack.mode}`}>
                    <span className="material-icons-round">{modeIcon[hack.mode]}</span>
                    {modeLabel[hack.mode]}
                  </span>
                  <span className="ed-info-pill ed-prize-pill">
                    <span className="material-icons-round">workspace_premium</span>
                    Prize Pool: {hack.prize}
                  </span>
                  <span className="ed-info-pill">
                    <span className="material-icons-round">groups</span>
                    {hack.participants.toLocaleString()} registered
                  </span>
                  <span className="ed-info-pill">
                    <span className="material-icons-round">group</span>
                    Team: {hack.teamSizeMin}–{hack.teamSizeMax} members
                  </span>
                </div>

                {/* Countdown */}
                <div className="ed-countdown">
                  <span className="ed-countdown-label">Closes in</span>
                  <div className="ed-countdown-units">
                    <div className="ed-cd-unit">
                      <div className="ed-cd-num">{String(time.days).padStart(2,"0")}</div>
                      <div className="ed-cd-lbl">Days</div>
                    </div>
                    <span className="ed-cd-sep">:</span>
                    <div className="ed-cd-unit">
                      <div className="ed-cd-num">{String(time.hours).padStart(2,"0")}</div>
                      <div className="ed-cd-lbl">Hrs</div>
                    </div>
                    <span className="ed-cd-sep">:</span>
                    <div className="ed-cd-unit">
                      <div className="ed-cd-num">{String(time.minutes).padStart(2,"0")}</div>
                      <div className="ed-cd-lbl">Min</div>
                    </div>
                    <span className="ed-cd-sep">:</span>
                    <div className="ed-cd-unit">
                      <div className="ed-cd-num" style={{ color: isUrgent ? "var(--red)" : undefined }}>
                        {String(time.seconds).padStart(2,"0")}
                      </div>
                      <div className="ed-cd-lbl">Sec</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ══ LEFT COLUMN ═════════════════════════════ */}
          <div className="ed-left">

            {/* Description */}
            <div className="ed-card">
              <div className="ed-card-head">
                <div className="ed-card-icon"><span className="material-icons-round">description</span></div>
                <span className="ed-card-title">About this Hackathon</span>
              </div>
              <div className="ed-card-body">
                <p className="ed-prose">{hack.description}</p>
                <div style={{ marginTop: "16px", padding: "14px 16px", background: "var(--surface2)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)" }}>
                  <div style={{ fontSize: "0.73rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--cyan)", fontWeight: 600, marginBottom: "8px" }}>Problem Statement</div>
                  <p className="ed-prose">{hack.problemStatement}</p>
                </div>
              </div>
            </div>

            {/* Skills Required */}
            <div className="ed-card">
              <div className="ed-card-head">
                <div className="ed-card-icon"><span className="material-icons-round">code</span></div>
                <span className="ed-card-title">Skills Required</span>
              </div>
              <div className="ed-card-body">
                <div className="ed-skill-tags">
                  {hack.skillsRequired.map(s => (
                    <span key={s.name} className={`ed-skill-tag ${s.type}`}>
                      <span className="material-icons-round">{s.icon}</span>
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Rules */}
            <div className="ed-card">
              <div className="ed-card-head">
                <div className="ed-card-icon"><span className="material-icons-round">gavel</span></div>
                <span className="ed-card-title">Rules & Guidelines</span>
              </div>
              <div className="ed-card-body">
                <ul className="ed-rule-list">
                  {hack.rules.map((r, i) => (
                    <li key={i}>
                      <span className="material-icons-round">check_circle</span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Eligibility */}
            <div className="ed-card">
              <div className="ed-card-head">
                <div className="ed-card-icon"><span className="material-icons-round">verified_user</span></div>
                <span className="ed-card-title">Eligibility Criteria</span>
              </div>
              <div className="ed-card-body">
                <div className="ed-eligibility-list">
                  {hack.eligibility.map((e, i) => (
                    <div key={i} className="ed-eligibility-item">
                      <span className="material-icons-round">task_alt</span>
                      {e}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Participation Info */}
            <div className="ed-card">
              <div className="ed-card-head">
                <div className="ed-card-icon"><span className="material-icons-round">info</span></div>
                <span className="ed-card-title">Participation Info</span>
              </div>
              <div className="ed-card-body">
                <div className="ed-part-grid">
                  <div className="ed-part-stat">
                    <div className="ed-part-val">{hack.participants.toLocaleString()}</div>
                    <div className="ed-part-lbl">Registered Participants</div>
                  </div>
                  <div className="ed-part-stat">
                    <div className="ed-part-val">{hack.teamSizeMin}–{hack.teamSizeMax}</div>
                    <div className="ed-part-lbl">Members per Team</div>
                  </div>
                  <div className="ed-part-stat">
                    <div className="ed-part-val">4</div>
                    <div className="ed-part-lbl">Tracks</div>
                  </div>
                  <div className="ed-part-stat">
                    <div className="ed-part-val">{hack.prize}</div>
                    <div className="ed-part-lbl">Total Prize Pool</div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* ══ RIGHT SIDEBAR ════════════════════════════ */}
          <div className="ed-right">

            {/* Action Card */}
            <div className="ed-action-card">
              {isUrgent && (
                <div className="ed-deadline-warn">
                  <span className="material-icons-round">schedule</span>
                  Closing in less than {time.days + 1} day{time.days !== 1 ? "s" : ""}! Register now.
                </div>
              )}
              <button
                className="ed-reg-btn"
                onClick={handleRegister}
                disabled={registered}
                style={registered ? { opacity: 0.65, cursor: "default" } : {}}
              >
                <span className="material-icons-round">
                  {registered ? "how_to_reg" : "rocket_launch"}
                </span>
                {registered ? "Registered!" : "Register Now"}
              </button>
              <a href={`/find-team/${hack.id}`} className="ed-find-team-btn">
                <span className="material-icons-round">group_add</span>
                Find a Team
              </a>
              <div className="ed-action-divider" />
              <button className="ed-share-btn" onClick={() => { navigator.clipboard?.writeText(window.location.href); showToast("Link copied to clipboard!", "info", "link"); }}>
                <span className="material-icons-round">share</span>
                Share this Hackathon
              </button>
            </div>

            {/* Smart Recommendations */}
            <div className="ed-rec-card">
              <div className="ed-rec-head">
                <span className="material-icons-round ed-rec-fire">local_fire_department</span>
                <span className="ed-rec-title">Best Matches for You</span>
              </div>
              <div className="ed-rec-body">
                {hack.topMatches.map(u => (
                  <a key={u.id} href={`/u/${u.id}`} className="ed-rec-user">
                    <div className="ed-rec-avatar" style={{ background: u.color + "22", color: u.color }}>
                      {u.initials}
                    </div>
                    <div className="ed-rec-info">
                      <div className="ed-rec-name">{u.name}</div>
                      <div className="ed-rec-skills">{u.skills.join(" · ")}</div>
                    </div>
                    <span className={`ed-match-badge ${u.match >= 88 ? "high" : "mid"}`}>
                      {u.match}% match
                    </span>
                  </a>
                ))}
                <a href={`/find-team/${hack.id}`} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "5px", padding: "10px", fontSize: "0.81rem", color: "var(--cyan)", textDecoration: "none", fontWeight: 600, marginTop: "4px" }}>
                  View all matches
                  <span className="material-icons-round" style={{ fontSize: "15px" }}>arrow_forward</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* TOASTS */}
      <div className="ed-toast-container">
        {toasts.map(t => (
          <div key={t.id} className={`ed-toast ${t.type}`}>
            <span className="material-icons-round">{t.icon}</span>
            {t.msg}
          </div>
        ))}
      </div>
    </>
  );
}
