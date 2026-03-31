import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios';
import "./FindTeam.css";

/* ════════════════════════════════════════════════════════════
   DATA
════════════════════════════════════════════════════════════ */
// const SKILL_OPTIONS = ["React","Node.js","Python","ML/AI","Blockchain","UI/UX","Data Science","Cloud","Flutter","TypeScript","Java","Figma"];

const LEVEL_OPTIONS = [
  { value: "Beginner",     icon: "signal_cellular_alt_1_bar", desc: "0–1 years"   },
  { value: "Intermediate", icon: "signal_cellular_alt_2_bar", desc: "1–3 years"   },
  { value: "Expert",       icon: "signal_cellular_alt",       desc: "3+ years"    },
];

const SORT_OPTIONS = [
  { key: "match",  label: "Best Match",   icon: "percent"         },
  { key: "rating", label: "Top Rated",    icon: "star"            },
  { key: "exp",    label: "Most Experienced", icon: "workspace_premium" },
];

// const MOCK_USERS = [
//   { id:"u1", name:"Priya Mehta",   initials:"PM", avatarColor:"#63daff", role:"Student", year:"3rd Year", college:"IIT Bombay",
//     skills:[{name:"React",col:"cyan"},{name:"ML/AI",col:"violet"},{name:"Python",col:"cyan"},{name:"TypeScript",col:"cyan"}],
//     topSkill:"React", score:85, level:"Expert",   rating:4.8, match:96, exp:3 },
//   { id:"u2", name:"Rohan Gupta",   initials:"RG", avatarColor:"#a78bfa", role:"Student", year:"4th Year", college:"NIT Trichy",
//     skills:[{name:"Node.js",col:"cyan"},{name:"Cloud",col:"green"},{name:"Docker",col:"green"},{name:"MongoDB",col:"green"}],
//     topSkill:"Node.js", score:79, level:"Intermediate", rating:4.5, match:91, exp:2 },
//   { id:"u3", name:"Sneha Iyer",    initials:"SI", avatarColor:"#34d399", role:"Mentor",  year:"PG",       college:"IISc Bangalore",
//     skills:[{name:"Python",col:"cyan"},{name:"Data Science",col:"violet"},{name:"ML/AI",col:"violet"}],
//     topSkill:"Python", score:91, level:"Expert",   rating:4.9, match:87, exp:5 },
//   { id:"u4", name:"Amit Sharma",   initials:"AS", avatarColor:"#fbbf24", role:"Student", year:"2nd Year", college:"BITS Pilani",
//     skills:[{name:"Blockchain",col:"violet"},{name:"Solidity",col:"violet"},{name:"React",col:"cyan"}],
//     topSkill:"Blockchain", score:72, level:"Intermediate", rating:4.2, match:82, exp:1 },
//   { id:"u5", name:"Divya Nair",    initials:"DN", avatarColor:"#f87171", role:"Student", year:"3rd Year", college:"VIT Vellore",
//     skills:[{name:"UI/UX",col:"violet"},{name:"Figma",col:"violet"},{name:"React",col:"cyan"}],
//     topSkill:"Figma", score:88, level:"Expert",   rating:4.7, match:78, exp:2 },
//   { id:"u6", name:"Karthik Raj",   initials:"KR", avatarColor:"#63daff", role:"Student", year:"4th Year", college:"IIT Madras",
//     skills:[{name:"Flutter",col:"cyan"},{name:"Dart",col:"cyan"},{name:"Firebase",col:"green"}],
//     topSkill:"Flutter", score:76, level:"Intermediate", rating:4.3, match:74, exp:2 },
//   { id:"u7", name:"Ananya Singh",  initials:"AS", avatarColor:"#a78bfa", role:"Mentor",  year:"PG",       college:"IIIT Hyderabad",
//     skills:[{name:"ML/AI",col:"violet"},{name:"Python",col:"cyan"},{name:"Data Science",col:"green"},{name:"Cloud",col:"green"}],
//     topSkill:"ML/AI", score:94, level:"Expert",   rating:4.9, match:89, exp:4 },
//   { id:"u8", name:"Rahul Verma",   initials:"RV", avatarColor:"#34d399", role:"Student", year:"1st Year", college:"BITS Goa",
//     skills:[{name:"TypeScript",col:"cyan"},{name:"React",col:"cyan"},{name:"Node.js",col:"cyan"}],
//     topSkill:"TypeScript", score:58, level:"Beginner", rating:3.9, match:65, exp:0 },
// ];

/* ════════════════════════════════════════════════════════════
   MATCH RING STYLE
════════════════════════════════════════════════════════════ */
function matchStyle(pct) {
  if (pct >= 90) return { border: "var(--green)", color: "var(--green)" };
  if (pct >= 75) return { border: "var(--cyan)",  color: "var(--cyan)"  };
  return              { border: "var(--yellow)", color: "var(--yellow)" };
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
export default function FindTeam() {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedLevel,  setSelectedLevel]  = useState("");
  const [sortKey,        setSortKey]         = useState("match");
  const [search,         setSearch]          = useState("");
  const [invited,        setInvited]         = useState({});
  const { toasts, show: showToast } = useToasts();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const { hackathonId, hackathonTitle, skills } = location.state || {};

  const SKILL_OPTIONS = skills || ["React","Node.js","Python","ML/AI","Blockchain","UI/UX","Data Science","Cloud","Flutter","TypeScript","Java","Figma"];

  /* ── Filter + Sort ──────────────────────────────────── */
  const fetchUsers = async () => {
  try {
    setLoading(true);

    const res = await axios.post("http://localhost:3001/api/users/match", {
      skills: selectedSkills,
      level: selectedLevel,
      search,
      sort: sortKey
    });

    setUsers(res.data);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

  function toggleSkill(sk) {
    setSelectedSkills(p => p.includes(sk) ? p.filter(s => s !== sk) : [...p, sk]);
  }
  function handleInvite(user) {
    setInvited(p => ({ ...p, [user._id]: true }));
    showToast(`Invite sent to ${user.fullName}!`, "success", "person_add");
  }
  function resetFilters() {
    setSelectedSkills([]); setSelectedLevel(""); setSearch(""); setSortKey("match");
  }


  const filtered = users;

  useEffect(() => {
    fetchUsers();
  }, [selectedSkills, selectedLevel, search, sortKey]);

  return (
    <>
      <div className="ft-bg-grid" />
      <div className="ft-orb ft-orb-1" />
      <div className="ft-orb ft-orb-2" />

      <div className="ft-root">
        {/* TOPBAR */}
        <header className="ft-topbar">
          <a href="/" className="ft-topbar-logo">
            <span className="material-icons-round ft-logo-icon">bolt</span>
            Team<span className="ft-logo-accent">Up</span>
          </a>
          <div className="ft-topbar-sep" />
          <div className="ft-topbar-context">
            <div className="ft-topbar-context-label">Find Team for</div>
            <div className="ft-topbar-context-name">{hackathonTitle || "this event"}</div>
          </div>
          <a href={`/explore/${hackathonId}`} className="ft-back-btn">
            <span className="material-icons-round">arrow_back</span>
            Back
          </a>
        </header>

        <div className="ft-body">
          {/* ── FILTER SIDEBAR ─────────────────────── */}
          <aside className="ft-sidebar">
            <div>
              <div className="ft-filter-title">Filter Teammates</div>
              <div className="ft-filter-sub">Narrow down your perfect match</div>
            </div>

            <div className="ft-filter-section">
              <div className="ft-filter-label">Skills</div>
              <div className="ft-skill-chips">
                {SKILL_OPTIONS.map(sk => (
                  <button
                    key={sk}
                    className={`ft-skill-chip ${selectedSkills.includes(sk) ? "active" : ""}`}
                    onClick={() => toggleSkill(sk)}
                  >{sk}</button>
                ))}
              </div>
            </div>

            <div className="ft-filter-divider" />

            <div className="ft-filter-section">
              <div className="ft-filter-label">Experience Level</div>
              <div className="ft-level-btns">
                {LEVEL_OPTIONS.map(lv => (
                  <button
                    key={lv.value}
                    className={`ft-level-btn ${selectedLevel === lv.value ? "active" : ""}`}
                    onClick={() => setSelectedLevel(p => p === lv.value ? "" : lv.value)}
                  >
                    <span className="material-icons-round">{lv.icon}</span>
                    <span>{lv.value} <span style={{ fontSize: "0.7rem", opacity: 0.6 }}>({lv.desc})</span></span>
                  </button>
                ))}
              </div>
            </div>

            <div className="ft-filter-divider" />

            <button className="ft-reset-btn" onClick={resetFilters}>
              <span className="material-icons-round">refresh</span>
              Reset All Filters
            </button>
          </aside>

          {/* ── MAIN CONTENT ───────────────────────── */}
          <main className="ft-main">
            {/* Search + Sort */}
            <div className="ft-search-wrap">
              <span className="material-icons-round ft-search-icon">search</span>
              <input
                type="text"
                placeholder="Search by name or skill…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            <div className="ft-sort-bar">
              <div className="ft-count-text">
                Showing <strong>{filtered.length}</strong> users
              </div>
              <div className="ft-sort-row">
                {SORT_OPTIONS.map(s => (
                  <button
                    key={s.key}
                    className={`ft-sort-btn ${sortKey === s.key ? "active" : ""}`}
                    onClick={() => setSortKey(s.key)}
                  >
                    <span className="material-icons-round">{s.icon}</span>
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Cards Grid */}
            {loading ? (
              <div className="ft-empty">
                <span className="material-icons-round">hourglass_top</span>
                <p>Finding best teammates...</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="ft-empty">
                <span className="material-icons-round">manage_search</span>
                <h3>No users found</h3>
                <p>Try adjusting your filters or search term.</p>
              </div>
            ) : (
              <div className="ft-card-grid">
                {filtered.map((user, idx) => {
                  const ms = matchStyle(user.match);
                  const isInvited = !!invited[user._id];
                  const shownSkills = user.skills.slice(0, 3);
                  const extra = user.skills.length - 3;

                  const topSkillObj = user.skills.reduce(
                    (max, s) => (s.score || 0) > (max.score || 0) ? s : max,
                    {}
                  );

                  const topSkill = topSkillObj?.name || "Skill";
                  const score = topSkillObj?.score || 0;
                  return (
                    <div key={user._id} className="ft-user-card" style={{ animationDelay: `${idx * 0.04}s` }}>
                      <div className="ft-card-top">
                        {/* Avatar */}
                        <div className="ft-card-avatar" style={{ background: user.avatarColor + "22", color: user.avatarColor }}>
                          {user.fullName?.slice(0,2).toUpperCase()}
                        </div>
                        {/* Info */}
                        <div className="ft-card-info">
                          <div className="ft-card-name">{user.fullName}</div>
                          <div className="ft-card-role">{user.role}</div>
                          <div className="ft-card-year">{user.College} · {user.yearOfStudy}</div>
                        </div>
                        {/* Match ring */}
                        <div className="ft-match-ring" style={{ borderColor: ms.border }}>
                          <div className="ft-match-pct" style={{ color: ms.color }}>{user.match}%</div>
                          <div className="ft-match-lbl" style={{ color: ms.color }}>match</div>
                        </div>
                      </div>

                      <div className="ft-card-body">
                        {/* Skill tags */}
                        <div className="ft-card-skill-row">
                          {shownSkills.map(s => (
                            <span key={s.name} className="ft-card-skill cyan">
                              {s.name}
                            </span>
                          ))}
                          {extra > 0 && <span className="ft-more-skills">+{extra}</span>}
                        </div>
                        {/* Score bar */}
                        <div className="ft-score-row">
                          <div className="ft-score-label">{topSkill}</div>
                          <div className="ft-score-bar">
                            <div className="ft-score-fill" style={{ width: `${score}%` }} />
                          </div>
                          <div className="ft-score-val">{score}%</div>
                        </div>
                        {/* Rating */}
                        <div style={{ display:"flex", alignItems:"center", gap:"5px", marginTop:"8px", fontSize:"0.76rem", color:"var(--text-muted)" }}>
                          <span className="material-icons-round" style={{ fontSize:"14px", color:"var(--yellow)" }}>star</span>
                          <strong style={{ color:"var(--text)" }}>{user.rating}</strong>
                          rating
                          <span style={{ marginLeft:"auto", color:"var(--text-muted)" }}>
                            {user.exp}+ yr{user.exp !== 1 ? "s" : ""} exp
                          </span>
                        </div>
                      </div>

                      <div className="ft-card-footer">
                        <button
                          className={`ft-invite-btn ${isInvited ? "sent" : ""}`}
                          onClick={() => !isInvited && handleInvite(user)}
                        >
                          <span className="material-icons-round">
                            {isInvited ? "how_to_reg" : "person_add"}
                          </span>
                          {isInvited ? "Invite Sent" : "Invite to Team"}
                        </button>
                        <a href={`/u/${user._id}`} className="ft-view-btn">
                          <span className="material-icons-round">open_in_new</span>
                          Profile
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* TOASTS */}
      <div className="ft-toast-container">
        {toasts.map(t => (
          <div key={t.id} className={`ft-toast ${t.type}`}>
            <span className="material-icons-round">{t.icon}</span>
            {t.msg}
          </div>
        ))}
      </div>
    </>
  );
}
