import { useState, useRef, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { MAIN_NAV, ACCOUNT_NAV } from "../constants";
import { ThreeDots } from 'react-loader-spinner';
import axios from 'axios';
import "./Dashboard.css";


const STATS = [
  { icon: "rocket_launch",    iconBg: "rgba(99,218,255,0.12)",  iconColor: "var(--cyan)",   label: "My Projects", value: 0,   trend: "+",  trendDir: "up"  },
  { icon: "group",            iconBg: "rgba(167,139,250,0.12)", iconColor: "var(--violet)", label: "My Teams",    value: 2,   trend: "—",   trendDir: "neu" },
  { icon: "star",             iconBg: "rgba(251,191,36,0.12)",  iconColor: "var(--yellow)", label: "Avg Rating",  value: "4.3", trend: "+0.2", trendDir: "up" },
  { icon: "groups",           iconBg: "rgba(52,211,153,0.12)",  iconColor: "var(--green)",  label: "Connections", value: 17,  trend: "+3",  trendDir: "up"  },
];

const QUICK_ACTIONS = [
  { label: "New Project",    icon: "add_circle",        iconBg: "rgba(99,218,255,0.12)",  iconColor: "var(--cyan)",   href: "/projects/new"  },
  { label: "Find a Team",    icon: "group_add",         iconBg: "rgba(167,139,250,0.12)", iconColor: "var(--violet)", href: "/teams/browse"  },
  { label: "Browse People",  icon: "manage_search",     iconBg: "rgba(52,211,153,0.12)",  iconColor: "var(--green)",  href: "/people"        },
  { label: "Explore Hacks",  icon: "emoji_events",      iconBg: "rgba(251,191,36,0.12)",  iconColor: "var(--yellow)", href: "/hackathons"    },
];

/* ════════════════════════════════════════════════════════════
   STATUS PILL HELPER
════════════════════════════════════════════════════════════ */
const STATUS_MAP = {
  active:  { cls: "active",  label: "Active"    },
  open:    { cls: "open",    label: "Open"      },
  closed:  { cls: "closed",  label: "Closed"    },
  looking: { cls: "looking", label: "Recruiting" },
};

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
   REUSABLE: MODULE CARD WRAPPER
════════════════════════════════════════════════════════════ */
function Module({ iconBg, iconColor, icon, title, subtitle, href, hrefLabel = "View All", children }) {
  return (
    <div className="db-module">
      <div className="db-module-head">
        <div className="db-module-icon" style={{ background: iconBg }}>
          <span className="material-icons-round" style={{ color: iconColor }}>{icon}</span>
        </div>
        <div className="db-module-title-wrap">
          <div className="db-module-title">{title}</div>
          <div className="db-module-subtitle">{subtitle}</div>
        </div>
        <a href={href} className="db-module-go-btn">
          {hrefLabel}
          <span className="material-icons-round">arrow_forward</span>
        </a>
      </div>
      <div className="db-module-body">{children}</div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   DASHBOARD PAGE
════════════════════════════════════════════════════════════ */
export default function Dashboard() {
  // const user = CURRENT_USER;
  const [user, setUser] = useState(null);
  const [activeNav, setActiveNav] = useState("dashboard");
  const { toasts, show: showToast } = useToasts();

  useEffect(() => {
    const fetchUser = async () => {
      try{
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:3001/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      setUser(res.data);
      }catch(err){
        console.error(err);
      }
    }
    fetchUser();
  },[])



  const firstName = user.fullName.split(" ")[0];
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  const MY_PROJECTS = user.projects || [];
  const MY_TEAMS = user.teams || [];
  return (
    <>
      {/* ── BG ──────────────────────────────────────────── */}
      <div className="db-bg-grid" />
      <div className="db-orb db-orb-1" />
      <div className="db-orb db-orb-2" />
      <div className="db-orb db-orb-3" />

      <div className="db-root">

        {/* ════════════════════════════════════════════════
            TOP BAR
        ════════════════════════════════════════════════ */}
        <header className="db-topbar">
          <a href="/" className="db-topbar-logo">
            <span className="material-icons-round db-logo-icon">bolt</span>
            Team<span className="db-logo-accent">Up</span>
          </a>
          <div className="db-topbar-divider" />
          <span className="db-topbar-greeting">
            {greeting}, <strong>{firstName}</strong> 👋
          </span>

          <div className="db-topbar-right">
            {/* Search */}
            <div
              className="db-icon-btn"
              title="Search"
              onClick={() => showToast("Search coming soon!", "info", "search")}
            >
              <span className="material-icons-round">search</span>
            </div>

            {/* Notifications */}
            <div
              className="db-icon-btn"
              title="Notifications"
              onClick={() => showToast("No new notifications.", "info", "notifications")}
            >
              <span className="material-icons-round">notifications_none</span>
              <div className="db-notif-dot" />
            </div>

            {/* Avatar → profile */}
            <a href="/profile" className="db-topbar-avatar" title="My Profile">
              {user.photoUrl
                ? <img src={user.photoUrl} alt={user.fullName} />
                : <span className="material-icons-round">person</span>
              }
            </a>
          </div>
        </header>

        {/* ════════════════════════════════════════════════
            BODY
        ════════════════════════════════════════════════ */}
        <div className="db-body">

          {/* ── SIDEBAR ───────────────────────────────── */}
          <aside className="db-sidebar">
            <div className="db-nav-section-label">Main</div>
            {MAIN_NAV.map(item => (
              <Link
                key={item.id}
                to={item.href}
                className={`db-nav-item ${activeNav === item.id ? "active" : ""}`}
                onClick={() => setActiveNav(item.id)}
              >
                <span className="material-icons-round">{item.icon}</span>
                {item.label}
                {item.badge && (
                  <span className={`db-nav-badge ${item.badge.cls}`}>{item.badge.text}</span>
                )}
              </Link>
            ))}

            <div className="db-sidebar-footer">
              <div className="db-nav-section-label" style={{ marginTop: 0 }}>Account</div>
              {ACCOUNT_NAV.map(item => (
                <a
                  key={item.id}
                  href={item.href}
                  className={`db-nav-item ${activeNav === item.id ? "active" : ""}`}
                  onClick={() => setActiveNav(item.id)}
                >
                  <span className="material-icons-round">{item.icon}</span>
                  {item.label}
                </a>
              ))}

              {/* Logout */}
              <button
                className="db-nav-item"
                style={{ color: "var(--red)", marginTop: "4px" }}
                onClick={() => showToast("Signing out…", "info", "logout")}
              >
                <span className="material-icons-round">logout</span>
                Sign out
              </button>
            </div>
          </aside>

          {/* ── MAIN CONTENT ──────────────────────────── */}
          <main className="db-main">

            {/* ══ WELCOME BANNER ════════════════════════ */}
            <div className="db-welcome">
              <div className="db-welcome-avatar">
                {user.photoUrl
                  ? <img src={user.photoUrl} alt={user.fullName} />
                  : <span className="material-icons-round">person</span>
                }
              </div>
              <div className="db-welcome-text">
                <div className="db-welcome-eyebrow">{greeting}</div>
                <div className="db-welcome-name">{user.fullName}</div>
                <div className="db-welcome-sub">
                  {user.role} · {user.college} · {user.department}
                </div>
              </div>
              <a href="/projects/new" className="db-welcome-action">
                <span className="material-icons-round">add</span>
                New Project
              </a>
            </div>

            {/* ══ STATS ROW ═════════════════════════════ */}
            <div className="db-stats-row">
              {STATS.map(s => (
                <div key={s.label} className="db-stat-card">
                  <div className="db-stat-top">
                    <div className="db-stat-icon" style={{ background: s.iconBg }}>
                      <span className="material-icons-round" style={{ color: s.iconColor }}>{s.icon}</span>
                    </div>
                    <span className={`db-stat-trend ${s.trendDir}`}>
                      <span className="material-icons-round">
                        {s.trendDir === "up" ? "trending_up" : s.trendDir === "down" ? "trending_down" : "remove"}
                      </span>
                      {s.trend}
                    </span>
                  </div>
                  <div className="db-stat-val">{s.value}</div>
                  <div className="db-stat-label">{s.label}</div>
                </div>
              ))}
            </div>

            {/* ══ QUICK ACTIONS ═════════════════════════ */}
            <div>
              <div className="db-section-label">Quick Actions</div>
              <div style={{ marginTop: "10px" }} className="db-quick-grid">
                {QUICK_ACTIONS.map(q => (
                  <a key={q.label} href={q.href} className="db-quick-card">
                    <div className="db-quick-card-icon" style={{ background: q.iconBg }}>
                      <span className="material-icons-round" style={{ color: q.iconColor }}>{q.icon}</span>
                    </div>
                    <div className="db-quick-card-label">{q.label}</div>
                  </a>
                ))}
              </div>
            </div>

            {/* ══ MY PROJECTS MODULE ════════════════════ */}
            <Module
              icon="rocket_launch"
              iconBg="rgba(99,218,255,0.12)"
              iconColor="var(--cyan)"
              title="My Projects"
              subtitle={`${MY_PROJECTS.length} active project${MY_PROJECTS.length !== 1 ? "s" : ""}`}
              href="/project"
              hrefLabel="View All Projects"
            >
              {MY_PROJECTS.length === 0 ? (
                <div className="db-module-empty">
                  <span className="material-icons-round">rocket_launch</span>
                  No projects yet. Start one!
                </div>
              ) : (
                <div className="db-project-list">
                  {MY_PROJECTS.map(p => {
                    const st = STATUS_MAP[p.status] || STATUS_MAP.open;
                    return (
                      <a key={p.id} href={`/projects/${p.id}`} className="db-project-item">
                        <div className="db-project-thumb" style={{ background: p.iconBg }}>
                          <span className="material-icons-round" style={{ color: p.iconColor }}>{p.icon}</span>
                        </div>
                        <div className="db-project-info">
                          <div className="db-project-name">{p.name}</div>
                          <div className="db-project-desc">{p.desc}</div>
                        </div>
                        <div className="db-project-right">
                          <span className={`db-pill ${st.cls}`}>{st.label}</span>
                          <span className="material-icons-round db-chevron">chevron_right</span>
                        </div>
                      </a>
                    );
                  })}
                </div>
              )}
            </Module>

            {/* ══ MY TEAMS MODULE ═══════════════════════ */}
            <Module
              icon="group"
              iconBg="rgba(167,139,250,0.12)"
              iconColor="var(--violet)"
              title="My Teams"
              subtitle={`${MY_TEAMS.length} team${MY_TEAMS.length !== 1 ? "s" : ""} you're part of`}
              href="/teams"
              hrefLabel="View All Teams"
            >
              {MY_TEAMS.length === 0 ? (
                <div className="db-module-empty">
                  <span className="material-icons-round">group</span>
                  You're not in any team yet.
                </div>
              ) : (
                <div className="db-team-list">
                  {MY_TEAMS.map(t => (
                    <a key={t.id} href={`/teams/${t.id}`} className="db-team-item">
                      <div className="db-team-icon">
                        <span className="material-icons-round">group</span>
                      </div>
                      <div className="db-team-info">
                        <div className="db-team-name">{t.name}</div>
                        <div className="db-team-meta">{t.project} · {t.role}</div>
                      </div>
                      <div className="db-avatar-stack">
                        {t.members.slice(0, 4).map((m, i) => (
                          <div key={i} className="db-avatar-mini" style={{ background: m.color + "22", color: m.color, borderColor: "var(--bg)" }}>
                            {m.name}
                          </div>
                        ))}
                        {t.members.length > 4 && <div className="db-avatar-mini">+{t.members.length - 4}</div>}
                      </div>
                      <span className="material-icons-round db-chevron" style={{ marginLeft: "8px" }}>chevron_right</span>
                    </a>
                  ))}
                </div>
              )}
            </Module>

            {/* ══ MY PROFILE MODULE ═════════════════════ */}
            <Module
              icon="manage_accounts"
              iconBg="rgba(99,218,255,0.1)"
              iconColor="var(--cyan)"
              title="My Profile"
              subtitle="Your public presence on TeamUp"
              href="/profile"
              hrefLabel="Edit Profile"
            >
              <div className="db-profile-summary">
                <div className="db-profile-sum-avatar">
                  {user.photoUrl
                    ? <img src={user.photoUrl} alt={user.fullName} />
                    : <span className="material-icons-round">person</span>
                  }
                </div>
                <div className="db-profile-sum-info" style={{ flex: 1 }}>
                  <div className="db-profile-sum-name">{user.fullName}</div>
                  <div className="db-profile-sum-email">{user.email}</div>
                  <div className="db-profile-sum-tags">
                    {user.skills.slice(0, 4).map(s => (
                      <span key={s} className="db-tag-mini skill">{s}</span>
                    ))}
                    {user.interests.slice(0, 3).map(s => (
                      <span key={s} className="db-tag-mini interest">{s}</span>
                    ))}
                  </div>
                </div>
                {/* View Public Profile button */}
                <a
                  href={`/u/${user.email.split("@")[0]}`}
                  className="db-create-btn"
                  style={{ alignSelf: "flex-start", flexShrink: 0 }}
                >
                  <span className="material-icons-round">open_in_new</span>
                  View Public Profile
                </a>
              </div>

              {/* Profile completion bar */}
              <div className="db-completion-wrap">
                <div className="db-completion-label">
                  <span>Profile completion</span>
                  <span>{user.profileCompletion}%</span>
                </div>
                <div className="db-completion-bar">
                  <div className="db-completion-fill" style={{ width: `${user.profileCompletion}%` }} />
                </div>
              </div>

              {user.profileCompletion < 100 && (
                <div style={{ marginTop: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span className="material-icons-round" style={{ fontSize: "16px", color: "var(--yellow)" }}>tips_and_updates</span>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                    Complete your profile to attract better team matches.
                  </span>
                  <a href="/profile" style={{ marginLeft: "auto", fontSize: "0.8rem", color: "var(--cyan)", textDecoration: "none", fontWeight: 600, flexShrink: 0 }}>
                    Complete now →
                  </a>
                </div>
              )}
            </Module>

          </main>
        </div>
      </div>

      {/* ── Toasts ──────────────────────────────────────── */}
      <div className="db-toast-container">
        {toasts.map(t => (
          <div key={t.id} className={`db-toast ${t.type}`}>
            <span className="material-icons-round">{t.icon}</span>
            {t.msg}
          </div>
        ))}
      </div>
    </>
  );
}
