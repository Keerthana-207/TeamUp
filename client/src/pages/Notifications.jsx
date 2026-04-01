import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import "./Notifications.css";

const FILTER_TABS = [
  { key: "all",       label: "All",         icon: "notifications" },
  { key: "invite",    label: "Invitations", icon: "group_add" },
  { key: "hackathon", label: "Hackathons",  icon: "emoji_events" },
  { key: "deadline",  label: "Deadlines",   icon: "schedule" },
  { key: "result",    label: "Results",     icon: "military_tech" },
  { key: "system",    label: "System",      icon: "info" },
];

const TYPE_ICONS = {
  invite:    "group_add",
  hackathon: "emoji_events",
  deadline:  "schedule",
  result:    "military_tech",
  follow:    "person_add",
  system:    "info",
};

function ToastContainer({ toasts }) {
  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <div key={t.id} className={`toast ${t.type}`}>
          <span className="material-icons-round">{t.icon}</span>
          {t.message}
        </div>
      ))}
    </div>
  );
}

function getDateLabel(dateString) {
  if (!dateString) return "Unknown";

  const d = new Date(dateString);
  if (isNaN(d)) return "Unknown";

  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (d.toDateString() === today.toDateString()) return "Today";
  if (d.toDateString() === yesterday.toDateString()) return "Yesterday";

  return d.toLocaleDateString();
}



function NotifItem({ notif, onAccept, onDecline, onView, onMarkRead, index }) {
  const n = notif;

const time = n.createdAt
  ? new Date(n.createdAt).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    })
  : "--:--";

  return (
    <div
      className={`notif-item type-${n.type}${n.unread ? " unread" : ""}`}
      style={{ animationDelay: `${index * 0.045}s` }}
      onClick={() => n.unread && onMarkRead(n._id)}
    >
      {n.unread && <div className="unread-dot"></div>}

      <div className="notif-icon-wrap">
        <span className="material-icons-round">{TYPE_ICONS[n.type]}</span>
      </div>

      <div className="notif-content">
        <div className="notif-top">
          <div className="notif-title">{n.title}</div>
          <div className="notif-time">{time}</div>
        </div>
        <div className="notif-body">{n.bodyText}</div>

        <div className="notif-actions">
          {n.actions === "invite" && (
            n.inviteState === "accepted" ? (
              <span className="notif-state-chip accepted">
                <span className="material-icons-round">check_circle</span> Accepted
              </span>
            ) : n.inviteState === "declined" ? (
              <span className="notif-state-chip declined">
                <span className="material-icons-round">cancel</span> Declined
              </span>
            ) : (
              <>
                <button
                  className="notif-btn notif-btn-accept"
                  onClick={(e) => { e.stopPropagation(); onAccept(n._id); }}
                >
                  <span className="material-icons-round">check</span> Accept
                </button>
                <button
                  className="notif-btn notif-btn-decline"
                  onClick={(e) => { e.stopPropagation(); onDecline(n._id); }}
                >
                  <span className="material-icons-round">close</span> Decline
                </button>
              </>
            )
          )}

          {n.actions === "view" && (
            <button
              className="notif-btn notif-btn-view"
              onClick={(e) => { e.stopPropagation(); onView(n); }}
            >
              <span className="material-icons-round">arrow_forward</span>
              {n.viewLabel || "View"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}


export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [activeFilter, setActiveFilter]   = useState("all");
  const [toasts,       setToasts]         = useState([]);

  const token = localStorage.getItem("token");

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

    useEffect(() => {
    async function fetchNotifications() {
      try {
        const res = await axios.get("/api/notifications", config);
        const sorted = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setNotifications(sorted);
      } catch (err) {
        showToast("Failed to load notifications", "error", "error");
      }
    }
    fetchNotifications();
  }, []);


  /* ── toast ── */
  const showToast = useCallback((message, type = "info", icon = "info", duration = 3000) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type, icon }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), duration);
  }, []);

  /* ── mark one as read ── */
  async function markRead(id) {
    setNotifications((prev) =>
      prev.map((n) => (n._id === id ? { ...n, unread: false } : n))
    );
    try {
      await axios.patch(`/api/notifications/${id}/read`, {}, config);
    } catch {
      showToast("Failed to mark read", "error", "error");
    }
  }

  /* ── mark all as read ── */
  async function markAllRead() {
    const hasUnread = notifications.some((n) => n.unread);
    if (!hasUnread) return;
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
    showToast("All notifications marked as read", "success", "done_all");
    try {
      await axios.patch("/api/notifications/read-all", {}, config);
    } catch {}
  }


  /* ── clear all (visible) ── */
  async function clearAll() {
    const visible = getFiltered();
    if (!visible.length) return;
    const ids = visible.map((n) => n._id);
    setNotifications((prev) => prev.filter((n) => !ids.includes(n._id)));
    showToast("Notifications cleared", "info", "delete_sweep");
    try {
      await axios.post("/api/notifications/clear", { ids }, config);
    } catch {}
  }

  /* ── invite actions ── */
  async function handleAccept(id) {
    setNotifications((prev) =>
      prev.map((n) => (n._id === id ? { ...n, inviteState: "accepted", unread: false } : n))
    );
    showToast("You joined the team!", "success", "check_circle");
    try {
      await axios.post(`/api/notifications/${id}/accept`, {}, config);
    } catch {
      showToast("Failed to accept invite", "error", "error");
    }
  }

  async function handleDecline(id) {
    setNotifications((prev) =>
      prev.map((n) => (n._id === id ? { ...n, inviteState: "declined", unread: false } : n))
    );
    showToast("Invitation declined", "error", "cancel");
    try {
      await axios.post(`/api/notifications/${id}/decline`, {}, config);
    } catch {
      showToast("Failed to decline invite", "error", "error");
    }
  }

  /* ── view action ── */
  function handleView(n) {
    markRead(n._id);
    showToast(`Opening: ${n.bodyText}`, "info", "open_in_new");
  }

  /* ── filtering ── */
  function getFiltered() {
    if (activeFilter === "all") return notifications;
    if (activeFilter === "hackathon")
      return notifications.filter((n) => ["hackathon", "deadline", "result"].includes(n.type));
    return notifications.filter((n) => n.type === activeFilter);
  }

  function getCount(key) {
    if (key === "all") return notifications.length;
    if (key === "hackathon")
      return notifications.filter((n) => ["hackathon", "deadline", "result"].includes(n.type)).length;
    return notifications.filter((n) => n.type === key).length;
  }

  const filtered = getFiltered();

  const groupsMap = {};

filtered.forEach((n) => {
  const label = getDateLabel(n.createdAt);

  if (!groupsMap[label]) groupsMap[label] = [];
  groupsMap[label].push(n);
});

const groups = Object.entries(groupsMap).map(([date, items]) => ({
  date,
  items,
}));

  const totalUnread = notifications.filter((n) => n.unread).length;
  const totalInvites = notifications.filter((n) => n.type === "invite" && n.inviteState === null).length;

  /* ════════════════════════════════════════════
     RENDER
  ════════════════════════════════════════════ */
  return (
    <>
      {/* BG */}
      <div className="bg-grid"></div>
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>

      {/* TOPBAR */}
      <nav className="topbar">
        <a href="#" className="logo">
          <span className="material-icons-round logo-icon">bolt</span>
          <span>Team<span className="logo-accent">Up</span></span>
        </a>
        <div className="nav-actions">
          <div className="nav-icon-btn">
            <span className="material-icons-round">notifications_none</span>
          </div>
          <div className="nav-icon-btn">
            <span className="material-icons-round">settings</span>
          </div>
          <div className="nav-avatar">AS</div>
        </div>
      </nav>

      {/* PAGE */}
      <div className="notif-page">

        {/* HERO */}
        <div className="notif-hero">
          <div className="notif-hero-left">
            <div className="notif-hero-badge">
              <span className="material-icons-round">notifications_active</span>
              Notifications
            </div>
            <h1>Your <span>Activity</span> Feed</h1>
            <p className="notif-hero-sub">
              Stay on top of team invites, hackathon updates, and important deadlines.
            </p>
          </div>
          <div className="notif-hero-actions">
            <button className="btn-ghost-sm" onClick={markAllRead}>
              <span className="material-icons-round">done_all</span>
              Mark all read
            </button>
            <button className="btn-primary-sm" onClick={clearAll}>
              <span className="material-icons-round">delete_sweep</span>
              Clear
            </button>
          </div>
        </div>

        {/* SUMMARY STRIP */}
        <div className="notif-summary">
          <div className="notif-summary-counts">
            <div className="summary-stat">
              <span className="material-icons-round" style={{ color: "var(--cyan)" }}>mark_chat_unread</span>
              <strong>{totalUnread}</strong> unread
            </div>
            <div className="summary-stat">
              <span className="material-icons-round" style={{ color: "var(--violet)" }}>group_add</span>
              <strong>{totalInvites}</strong> pending {totalInvites === 1 ? "invite" : "invites"}
            </div>
            <div className="summary-stat">
              <span className="material-icons-round" style={{ color: "var(--muted)" }}>inbox</span>
              <strong>{notifications.length}</strong> total
            </div>
          </div>
        </div>

        {/* FILTER TABS */}
        <div className="notif-filters">
          {FILTER_TABS.map((tab) => {
            const count = getCount(tab.key);
            if (count === 0 && tab.key !== "all") return null;
            return (
              <button
                key={tab.key}
                className={`filter-tab${activeFilter === tab.key ? " active" : ""}`}
                onClick={() => setActiveFilter(tab.key)}
              >
                <span className="material-icons-round" style={{ fontSize: 15 }}>{tab.icon}</span>
                {tab.label}
                <span className="tab-count">{count}</span>
              </button>
            );
          })}
        </div>

        {/* NOTIFICATION LIST */}
        {filtered.length === 0 ? (
          <div className="notif-empty">
            <div className="notif-empty-icon">
              <span className="material-icons-round">notifications_off</span>
            </div>
            <h3>All clear here</h3>
            <p>No notifications in this category. We'll let you know when something comes up.</p>
          </div>
        ) : (
          <div className="notif-list">
            {groups.map((group) => (
              <div key={group.date}>
                <div className="notif-date-sep">
                  <span>{group.date}</span>
                </div>
                {group.items.map((n, i) => (
                  <NotifItem
                    key={n._id}
                    notif={n}
                    index={i}
                    onAccept={handleAccept}
                    onDecline={handleDecline}
                    onView={handleView}
                    onMarkRead={markRead}
                  />
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* TOASTS */}
      <ToastContainer toasts={toasts} />
    </>
  );
}
