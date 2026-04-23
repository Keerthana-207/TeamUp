import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { MAIN_NAV } from "../constants";
import axios from "axios";
import TopBar from "../components/TopBar";
import "./TeamDetails.css";

/* ── helpers ── */
const getInitials = (name) =>
  name
    ? name
        .split(" ")
        .map((x) => x[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

const AVATAR_COLORS = [
  ["#6366f1", "#fff"],
  ["#0ea5e9", "#fff"],
  ["#10b981", "#fff"],
  ["#f59e0b", "#07080f"],
  ["#ec4899", "#fff"],
  ["#8b5cf6", "#fff"],
  ["#14b8a6", "#fff"],
  ["#f97316", "#fff"],
];

const avatarColor = (index) => AVATAR_COLORS[index % AVATAR_COLORS.length];

const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

/* ── Skeleton loader ── */
const SkeletonHero = () => (
  <div style={{ marginBottom: 28 }}>
    <div className="td-skeleton" style={{ height: 180, borderRadius: 20 }} />
  </div>
);

const SkeletonCard = ({ lines = 3, height = 120 }) => (
  <div className="td-card" style={{ marginBottom: 20 }}>
    <div className="td-card-header" style={{ background: "transparent" }}>
      <div className="td-skeleton" style={{ width: 140, height: 18 }} />
    </div>
    <div className="td-card-body" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="td-skeleton" style={{ height: 14, width: i === lines - 1 ? "60%" : "100%" }} />
      ))}
    </div>
  </div>
);

/* ══════════════════════════════════════════════════ */
const TeamDetails = () => {
  const { teamId } = useParams();
  const navigate = useNavigate();

  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [toast, setToast] = useState(null);
  const [activeNav, setActiveNav] = useState("teams");

  /* ── current user from localStorage ── */
  let currentUser = null;
  try {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      currentUser = JSON.parse(storedUser);
    }
  } catch {
    /* ignore */
  }

  const showToast = (msg, type = "info") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const cache = useRef({});

  /* ── fetch authenticated user ── */
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3001/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, []);

  /* ── fetch team by ID ── */
useEffect(() => {
  const fetchTeam = async () => {
    try {
      setLoading(true);
      setError(null);

      // 1. cache check
      if (cache.current[teamId]) {
        setTeam(cache.current[teamId]);
        setLoading(false);
        return;
      }

      // 2. fetch API
      const res = await fetch(`http://localhost:3001/api/teams/${teamId}`);

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Team not found");
      }

      const data = await res.json();
      console.log(data);

      // 3. store properly in cache
      cache.current[teamId] = data;

      // 4. set state
      setTeam(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (teamId) fetchTeam();
}, [teamId]);

  /* ── derived flags ── */
  const currentUserId = user?._id || currentUser?._id;
  const leadId =
    typeof team?.lead === "object" ? team?.lead?._id : team?.lead;

  const isLead =
  currentUserId && leadId && String(currentUserId) === String(leadId);
  const isMember =
    !isLead &&
    currentUserId &&
    team?.members?.some((m) =>
      typeof m === "object"
        ? String(m._id) === String(currentUserId)
        : String(m) === String(currentUserId)
    );

  const handleLeaveTeam = async () => {
    if (!window.confirm("Are you sure you want to leave this team?")) return;
    try {
      await axios.post(
        `http://localhost:3001/api/teams/${teamId}/leave`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      showToast("You have left the team.", "info");
      setTimeout(() => navigate("/teams"), 1200);
    } catch (err) {
      showToast(err.response?.data?.error || "Failed to leave team.", "error");
    }
  };

  /* ── render ── */
  return (
    <div>
      {/* Background effects */}
      <div className="bg-grid" />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <TopBar user={user} showToast={showToast} showGreeting={false} />

      <div className="app-layout">
        {/* Sidebar */}
        <aside className="db-sidebar">
          <div className="db-nav-section-label">Main</div>
          {MAIN_NAV.map((item) => (
            <Link
              key={item.id}
              to={item.href}
              className={`db-nav-item ${activeNav === item.id ? "active" : ""}`}
              onClick={() => setActiveNav(item.id)}
            >
              <span className="material-icons-round">{item.icon}</span>
              {item.label}
              {item.badge && (
                <span className={`db-nav-badge ${item.badge.cls}`}>
                  {item.badge.text}
                </span>
              )}
            </Link>
          ))}
        </aside>

        {/* Main content */}
        <main className="page">
          {/* Back button */}
          <button className="td-back-btn" onClick={() => navigate("/teams")}>
            <span className="material-icons-round">arrow_back</span>
            Back to Teams
          </button>

          {/* ── LOADING ── */}
          {loading && (
            <>
              <SkeletonHero />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 14, marginBottom: 28 }}>
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="td-skeleton" style={{ height: 82, borderRadius: 16 }} />
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 22 }}>
                <div>
                  <SkeletonCard lines={4} />
                  <SkeletonCard lines={5} />
                </div>
                <div>
                  <SkeletonCard lines={3} />
                  <SkeletonCard lines={4} />
                </div>
              </div>
            </>
          )}

          {/* ── ERROR ── */}
          {!loading && error && (
            <div className="td-error-wrap">
              <div className="td-error-icon">
                <span className="material-icons-round">error_outline</span>
              </div>
              <h2 className="td-error-title">Team Not Found</h2>
              <p className="td-error-sub">{error}</p>
              <button className="td-btn-secondary" onClick={() => navigate("/teams")}>
                <span className="material-icons-round">arrow_back</span>
                Go Back
              </button>
            </div>
          )}

          {/* ── TEAM CONTENT ── */}
          {!loading && !error && team && (
            <>
              {/* ── Hero Banner ── */}
              <div className="td-hero">
                <div className="td-hero-bg" style={{ background: (team.color || "#6366f1") + "20" }} />
                <div className="td-hero-overlay" />
                <div className="td-hero-dot-pattern" />
                <div
                  className="td-hero-bar"
                  style={{ background: team.color || "#6366f1" }}
                />
                <div className="td-hero-content">
                  <div className="td-hero-left">
                    <div className="td-hero-icon">
                      <span
                        className="material-icons-round"
                        style={{ color: team.color || "#63daff" }}
                      >
                        {team.domainIcon || "groups"}
                      </span>
                    </div>
                    <div className="td-hero-info">
                      <div className="td-hero-name">{team.name}</div>
                      <div className="td-hero-meta">
                        {team.project?.name && (
                          <span className="td-hero-project">
                            <span className="material-icons-round">folder_special</span>
                            {team.project.name}
                          </span>
                        )}
                        {team.domain && (
                          <span className="td-hero-domain">
                            <span className="material-icons-round">workspaces</span>
                            {team.domain}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Hero actions + your role badge */}
                  <div className="td-hero-actions">
                    {(isLead || isMember) && (
                      <span className={`td-you-badge ${isLead ? "lead" : "member"}`}>
                        <span className="material-icons-round">
                          {isLead ? "star" : "person"}
                        </span>
                        {isLead ? "You are the Lead" : "You are a Member"}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* ── Stats Row ── */}
              <div className="td-stats-row">
                <div className="td-stat-card">
                  <div className="td-stat-label">
                    <span className="material-icons-round">group</span>
                    Members
                  </div>
                  <div className="td-stat-value" style={{ color: team.color || "#63daff" }}>
                    {team.members?.length ?? 0}
                  </div>
                  <div className="td-stat-sub">Team size</div>
                </div>

                <div className="td-stat-card">
                  <div className="td-stat-label">
                    <span className="material-icons-round">workspaces</span>
                    Domain
                  </div>
                  <div className="td-stat-value" style={{ fontSize: "1rem", color: "var(--cyan)" }}>
                    {team.domain || "—"}
                  </div>
                  <div className="td-stat-sub">Focus area</div>
                </div>

                <div className="td-stat-card">
                  <div className="td-stat-label">
                    <span className="material-icons-round">calendar_today</span>
                    Created
                  </div>
                  <div className="td-stat-value" style={{ fontSize: "1rem" }}>
                    {formatDate(team.createdAt)}
                  </div>
                  <div className="td-stat-sub">Date formed</div>
                </div>

                <div className="td-stat-card">
                  <div className="td-stat-label">
                    <span className="material-icons-round">
                      {team.status === "active" ? "check_circle" : "radio_button_unchecked"}
                    </span>
                    Status
                  </div>
                  <div
                    className="td-stat-value"
                    style={{
                      fontSize: "1rem",
                      color:
                        team.status === "active"
                          ? "var(--green)"
                          : "var(--muted)",
                    }}
                  >
                    {team.status
                      ? team.status.charAt(0).toUpperCase() + team.status.slice(1)
                      : "Active"}
                  </div>
                  <div className="td-stat-sub">Team status</div>
                </div>
              </div>

              {/* ── Two-column layout ── */}
              <div className="td-columns">
                {/* LEFT column */}
                <div>
                  {/* About / Description */}
                  <div className="td-card">
                    <div className="td-card-header">
                      <div className="td-card-title">
                        <span className="material-icons-round">info</span>
                        About this Team
                      </div>
                    </div>
                    <div className="td-card-body">
                      {team.description ? (
                        <p className="td-desc">{team.description}</p>
                      ) : (
                        <p className="td-desc-empty">No description provided.</p>
                      )}
                    </div>
                  </div>

                  {/* Members Section */}
                  <div className="td-card">
                    <div className="td-card-header">
                      <div className="td-card-title">
                        <span className="material-icons-round">group</span>
                        Members
                      </div>
                      <span className="td-card-badge">
                        {team.members?.length ?? 0}
                      </span>
                    </div>
                    <div className="td-card-body">
                      {!team.members || team.members.length === 0 ? (
                        <p className="td-desc-empty">No members yet.</p>
                      ) : (
                        team.members.map((m, index) => {
                          const member = typeof m === "object" ? m : { _id: m };
                          const memberId = member._id;
                          const name = member.fullName || member.name || "Unknown";
                          const initials = getInitials(name);
                          const [bg, fg] = avatarColor(index);
                          const isThisLead =
                            leadId && memberId && memberId === leadId;
                          const isCurrentUser =
                            currentUserId && memberId === currentUserId;

                          return (
                            <div className="td-member-item" key={memberId || index}>
                              {/* Avatar */}
                              <div
                                className="td-member-av"
                                style={{ background: bg, color: fg }}
                                title={name}
                              >
                                {member.profilePhoto ? (
                                  <img src={member.profilePhoto} alt={name} />
                                ) : (
                                  initials
                                )}
                              </div>

                              {/* Info */}
                              <div className="td-member-info">
                                <div className="td-member-name">
                                  {name}
                                  {isCurrentUser && (
                                    <span style={{ color: "var(--muted)", fontWeight: 400, fontSize: ".75rem", marginLeft: 6 }}>
                                      (you)
                                    </span>
                                  )}
                                </div>
                                {member.email && (
                                  <div className="td-member-role">{member.email}</div>
                                )}
                              </div>

                              {/* Tags */}
                              <div style={{ display: "flex", gap: 5, flexShrink: 0 }}>
                                {isThisLead && (
                                  <span className="td-member-lead-tag">
                                    ⭐ Lead
                                  </span>
                                )}
                                {isCurrentUser && (
                                  <span className="td-member-you">YOU</span>
                                )}
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>

                  {/* Activity Timeline (if available) */}
                  {team.activity && team.activity.length > 0 && (
                    <div className="td-card">
                      <div className="td-card-header">
                        <div className="td-card-title">
                          <span className="material-icons-round">timeline</span>
                          Activity
                        </div>
                      </div>
                      <div className="td-card-body">
                        {team.activity.map((item, i) => (
                          <div className="td-timeline-item" key={i}>
                            <div className="td-timeline-dot">
                              <span className="material-icons-round">
                                {item.icon || "radio_button_checked"}
                              </span>
                            </div>
                            <div className="td-timeline-text">
                              <span className="td-timeline-msg">{item.message}</span>
                              <span className="td-timeline-time">
                                {formatDate(item.date)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* RIGHT column */}
                <div>
                  {/* Lead card */}
                  <div className="td-card">
                    <div className="td-card-header">
                      <div className="td-card-title">
                        <span className="material-icons-round">star</span>
                        Team Lead
                      </div>
                    </div>
                    <div className="td-card-body">
                      {team.lead ? (
                        (() => {
                          const lead =
                            typeof team.lead === "object"
                              ? team.lead
                              : { _id: team.lead };
                          const leadName =
                            lead.fullName || lead.name || "Unknown Lead";
                          const [bg, fg] = avatarColor(0);
                          return (
                            <div className="td-lead-wrap">
                              <div
                                className="td-lead-avatar"
                                style={{ background: bg, color: fg }}
                                title={leadName}
                              >
                                {lead.profilePhoto ? (
                                  <img
                                    className="td-lead-img"
                                    src={lead.profilePhoto}
                                    alt={leadName}
                                  />
                                ) : (
                                  getInitials(leadName)
                                )}
                                <span className="material-icons-round td-lead-crown">
                                  star
                                </span>
                              </div>
                              <div className="td-lead-info">
                                <div className="td-lead-name">{leadName}</div>
                                <span className="td-lead-badge">
                                  ⭐ Team Lead
                                </span>
                                {lead.email && (
                                  <div className="td-lead-email" title={lead.email}>
                                    {lead.email}
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })()
                      ) : (
                        <p className="td-desc-empty">No lead assigned.</p>
                      )}
                    </div>
                  </div>

                  {/* Team Info card */}
                  <div className="td-card">
                    <div className="td-card-header">
                      <div className="td-card-title">
                        <span className="material-icons-round">article</span>
                        Team Info
                      </div>
                    </div>
                    <div className="td-card-body">
                      <div className="td-info-row">
                        <div className="td-info-icon">
                          <span className="material-icons-round">folder_special</span>
                        </div>
                        <div>
                          <div className="td-info-label">Project</div>
                          <div className="td-info-value" style={{ color: "var(--cyan)" }}>
                            {team.project?.name || "No project"}
                          </div>
                        </div>
                      </div>

                      <div className="td-info-row">
                        <div className="td-info-icon">
                          <span className="material-icons-round">workspaces</span>
                        </div>
                        <div>
                          <div className="td-info-label">Domain</div>
                          <div className="td-info-value">{team.domain || "—"}</div>
                        </div>
                      </div>

                      <div className="td-info-row">
                        <div className="td-info-icon">
                          <span className="material-icons-round">calendar_today</span>
                        </div>
                        <div>
                          <div className="td-info-label">Created</div>
                          <div className="td-info-value">{formatDate(team.createdAt)}</div>
                        </div>
                      </div>

                      <div className="td-info-row">
                        <div className="td-info-icon">
                          <span className="material-icons-round">update</span>
                        </div>
                        <div>
                          <div className="td-info-label">Last Updated</div>
                          <div className="td-info-value">{formatDate(team.updatedAt)}</div>
                        </div>
                      </div>

                      <div className="td-info-row">
                        <div className="td-info-icon">
                          <span className="material-icons-round">tag</span>
                        </div>
                        <div>
                          <div className="td-info-label">Team ID</div>
                          <div
                            className="td-info-value"
                            style={{ fontFamily: "'DM Mono', monospace", fontSize: ".72rem", color: "var(--muted)" }}
                          >
                            {team._id}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions card */}
                  <div className="td-card">
                    <div className="td-card-header">
                      <div className="td-card-title">
                        <span className="material-icons-round">settings</span>
                        Actions
                      </div>
                    </div>
                    <div
                      className="td-card-body"
                      style={{ display: "flex", flexDirection: "column", gap: 10 }}
                    >
                      {isLead && (
                        <>
                          <button className="td-btn-primary" style={{ justifyContent: "center" }}>
                            <span className="material-icons-round">manage_accounts</span>
                            Manage Team
                          </button>
                          <button className="td-btn-secondary" style={{ justifyContent: "center" }}>
                            <span className="material-icons-round">person_add</span>
                            Invite Members
                          </button>
                        </>
                      )}
                      {isMember && (
                        <button
                          className="td-btn-danger"
                          style={{ justifyContent: "center" }}
                          onClick={handleLeaveTeam}
                        >
                          <span className="material-icons-round">exit_to_app</span>
                          Leave Team
                        </button>
                      )}
                      {!isLead && !isMember && (
                        <button className="td-btn-primary" style={{ justifyContent: "center" }}>
                          <span className="material-icons-round">group_add</span>
                          Join Team
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </main>
      </div>

      {/* Toast */}
      {toast && (
        <div className="toast-container">
          <div className={`toast ${toast.type}`}>
            <span className="material-icons-round">
              {toast.type === "success"
                ? "check_circle"
                : toast.type === "error"
                ? "error"
                : "info"}
            </span>
            {toast.msg}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamDetails;
