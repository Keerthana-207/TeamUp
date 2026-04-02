import { useState, useEffect, useRef, useCallback } from "react";
import "./TeamDetail.css";

/* ─── DATA ──────────────────────────────────────────────── */
const FALLBACK_TEAM = {
  id: "t1",
  name: "Code Crusaders",
  project: "HackBot — AI Hackathon Assistant",
  desc: "Building an AI assistant that helps teams form, brainstorm and track hackathon submissions in real time.",
  domainIcon: "psychology",
  color: "#63daff",
  accent: "rgba(99,218,255,0.12)",
  role: "Lead",
  memberCount: 4,
};

const TEAMMATES = [
  { name: "Aryan Sharma",  role: "Lead",     skills: "AI, React",          status: "online",  init: "AS", bg: "#63daff" },
  { name: "Priya Kapoor",  role: "ML Eng",   skills: "PyTorch, Python",    status: "online",  init: "PK", bg: "#a78bfa" },
  { name: "Ravi Mehta",    role: "Backend",  skills: "Node.js, PostgreSQL", status: "away",   init: "RM", bg: "#34d399" },
  { name: "Jatin Dubey",   role: "Frontend", skills: "React, Figma",       status: "online",  init: "JD", bg: "#fbbf24" },
  { name: "Sneha Luthra",  role: "DevOps",   skills: "AWS, Docker",        status: "offline", init: "SL", bg: "#fb923c" },
  { name: "Kartik Pandey", role: "Member",   skills: "Flutter, Dart",      status: "away",    init: "KP", bg: "#f472b6" },
];

const SEED_MESSAGES = [
  { id: 1, sender: "Priya Kapoor",  init: "PK", bg: "#a78bfa", text: "Hey! I just pushed the new NLP module. Can someone review the PR?",               time: "9:14 AM", own: false },
  { id: 2, sender: "You",           init: "AS", bg: "#63daff", text: "On it! Accuracy is really good — 94% on validation set 🔥",                        time: "9:16 AM", own: true  },
  { id: 3, sender: "Ravi Mehta",    init: "RM", bg: "#34d399", text: "Backend API for team matching is live on staging. Endpoint: /api/v1/match-team",    time: "9:20 AM", own: false },
  { id: 4, sender: "Jatin Dubey",   init: "JD", bg: "#fbbf24", text: "Updated the UI mockups for the dashboard. Sharing Figma link in the project board.", time: "9:34 AM", own: false },
  { id: 5, sender: "You",           init: "AS", bg: "#63daff", text: "Let's do a quick sync call at 3pm to align on sprint goals?",                       time: "9:36 AM", own: true  },
  { id: 6, sender: "Priya Kapoor",  init: "PK", bg: "#a78bfa", text: "3pm works for me 👍",                                                               time: "9:37 AM", own: false },
  { id: 7, sender: "Jatin Dubey",   init: "JD", bg: "#fbbf24", text: "Hackathon deadline is in 6 days. Let's track blockers on the board.",               time: "9:55 AM", own: false },
  { id: 8, sender: "You",           init: "AS", bg: "#63daff", text: "Will update the task board after the call. We're on track 💪",                       time: "9:57 AM", own: true  },
];

const REPLIES = [
  "Great idea! Let me check that.",
  "On it! Will update you shortly.",
  "That makes sense 👍",
  "Can we discuss this in the call?",
  "Pushing the update now…",
  "Looks good to me! ✅",
  "Thanks for the heads up!",
  "Agreed. Let's move forward.",
];

const TAGS = ["Python", "React", "FastAPI", "PostgreSQL", "Docker"];
const TAG_COLORS = ["var(--cyan)", "var(--violet)", "var(--green)", "var(--yellow)", "var(--orange)"];
const EMOJIS = ["😊", "🔥", "👍", "🚀", "✅", "💡", "🎯", "⚡"];

/* ─── HELPERS ───────────────────────────────────────────── */
function now() {
  return new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}
function makeId() {
  return Date.now() + Math.random();
}
function genInviteLink(teamId) {
  return `https://teamup.dev/join/${(teamId || "T1").toUpperCase()}X9K2`;
}

/* ═══════════════════════════════════════════════════════════
   TOAST HOOK
═══════════════════════════════════════════════════════════ */
function useToast() {
  const [toasts, setToasts] = useState([]);
  const show = useCallback((msg, type = "info", icon = "info") => {
    const id = makeId();
    setToasts(prev => [...prev, { id, msg, type, icon }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3200);
  }, []);
  return { toasts, show };
}

/* ═══════════════════════════════════════════════════════════
   TEAMMATES POPUP COMPONENT
═══════════════════════════════════════════════════════════ */
function TeammatesPopup({ team, onClose, inviteLink, showToast }) {
  const [search, setSearch]         = useState("");
  const [inviteVal, setInviteVal]   = useState("");
  const [showInviteForm, setShowInviteForm] = useState(false);
  const popupRef = useRef(null);
  const inputRef = useRef(null);

  /* close on outside click */
  useEffect(() => {
    function handler(e) {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        // also check the trigger button itself (parent handles it)
        onClose();
      }
    }
    // slight delay so the open-click doesn't immediately close
    const tid = setTimeout(() => document.addEventListener("mousedown", handler), 10);
    return () => { clearTimeout(tid); document.removeEventListener("mousedown", handler); };
  }, [onClose]);

  /* close on Escape */
  useEffect(() => {
    function handler(e) { if (e.key === "Escape") onClose(); }
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  const filtered = TEAMMATES.filter(m =>
    !search || m.name.toLowerCase().includes(search.toLowerCase())
  );

  const onlineCount = TEAMMATES.filter(m => m.status === "online").length;

  function copyLink() {
    navigator.clipboard?.writeText(inviteLink).catch(() => {});
    showToast("Invite link copied!", "success", "link");
  }

  function sendInvite() {
    if (!inviteVal.trim()) { showToast("Enter a name or email", "error", "error"); return; }
    showToast(`Invite sent to ${inviteVal.trim()}!`, "success", "send");
    setInviteVal("");
    setShowInviteForm(false);
  }

  return (
    <div className="tm-popup" ref={popupRef} role="dialog" aria-label="Teammates">
      {/* Arrow pointer */}
      <div className="tm-popup-arrow" />

      {/* Header */}
      <div className="tm-popup-header">
        <div className="tm-popup-header-top">
          <div className="tm-popup-title-row">
            <span className="material-icons-round tm-popup-hicon">groups</span>
            <span className="tm-popup-title">Teammates</span>
          </div>
          <div className="tm-popup-badges">
            <span className="tm-badge-online">
              <span className="online-pulse" />
              {onlineCount} online
            </span>
            <span className="tm-badge-count">
              <span className="material-icons-round">person</span>
              {TEAMMATES.length}
            </span>
          </div>
        </div>

        {/* Search */}
        <div className="tm-popup-search">
          <span className="material-icons-round">search</span>
          <input
            type="text"
            placeholder="Search members…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            ref={inputRef}
          />
          {search && (
            <button className="tm-search-clear" onClick={() => setSearch("")}>
              <span className="material-icons-round">close</span>
            </button>
          )}
        </div>
      </div>

      {/* Member List */}
      <div className="tm-popup-list">
        {filtered.length === 0 ? (
          <div className="tm-popup-empty">
            <span className="material-icons-round">search_off</span>
            No members match "{search}"
          </div>
        ) : (
          filtered.map((m, i) => (
            <div className="tm-popup-item" key={i} style={{ animationDelay: `${i * 0.04}s` }}>
              <div className="tm-popup-avatar" style={{ background: `${m.bg}22`, color: m.bg }}>
                {m.init}
                <div className={`tm-popup-status status-${m.status}`} />
              </div>
              <div className="tm-popup-info">
                <div className="tm-popup-name">{m.name}</div>
                <div className="tm-popup-sub">
                  <span className="tm-popup-role">{m.role}</span>
                  <span className="tm-popup-dot">·</span>
                  <span className="tm-popup-skills">{m.skills}</span>
                </div>
              </div>
              <div className="tm-popup-item-actions">
                <button
                  className="tm-popup-act"
                  title="Message"
                  onClick={() => showToast(`DM to ${m.name} coming soon`, "info", "chat_bubble")}
                >
                  <span className="material-icons-round">chat_bubble_outline</span>
                </button>
                <button
                  className="tm-popup-act"
                  title="View profile"
                  onClick={() => showToast(`Profile of ${m.name}`, "info", "person")}
                >
                  <span className="material-icons-round">open_in_new</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Invite section */}
      <div className="tm-popup-invite">
        <div className="tm-invite-label">
          <span className="material-icons-round">link</span>
          Invite Link
        </div>
        <div className="tm-invite-link-row">
          <div className="tm-invite-link-box">
            <span className="material-icons-round">tag</span>
            <input type="text" readOnly value={inviteLink} />
          </div>
          <button className="btn-copy-link" onClick={copyLink} title="Copy link">
            <span className="material-icons-round">copy_all</span>
          </button>
        </div>

        {!showInviteForm ? (
          <button className="btn-invite-teammate" onClick={() => { setShowInviteForm(true); }}>
            <span className="material-icons-round">person_add</span>
            Invite Teammate
          </button>
        ) : (
          <div className="invite-form">
            <div className="invite-form-input-wrap">
              <span className="material-icons-round">alternate_email</span>
              <input
                type="text"
                placeholder="Name or email address…"
                value={inviteVal}
                onChange={e => setInviteVal(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter") sendInvite(); if (e.key === "Escape") setShowInviteForm(false); }}
                autoFocus
              />
            </div>
            <div className="invite-form-actions">
              <button className="btn-invite-cancel" onClick={() => { setShowInviteForm(false); setInviteVal(""); }}>
                Cancel
              </button>
              <button className="btn-invite-send" onClick={sendInvite}>
                <span className="material-icons-round">send</span>Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════ */
export default function TeamDetail() {
  /* team data */
  let team = FALLBACK_TEAM;
  try {
    const s = sessionStorage.getItem("activeTeam");
    if (s) team = { ...FALLBACK_TEAM, ...JSON.parse(s) };
  } catch (e) {}

  const inviteLink = genInviteLink(team.id);

  /* state */
  const [messages, setMessages]         = useState(SEED_MESSAGES);
  const [chatInput, setChatInput]       = useState("");
  const [emojiIdx, setEmojiIdx]         = useState(0);
  const [replyIdx, setReplyIdx]         = useState(0);
  const [tmOpen, setTmOpen]             = useState(false);
  const messagesEndRef                  = useRef(null);
  const tmBtnRef                        = useRef(null);
  const { toasts, show: showToast }     = useToast();

  /* auto-scroll */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* send message */
  function sendMessage() {
    if (!chatInput.trim()) return;
    const msg = { id: makeId(), sender: "You", init: "AS", bg: team.color || "#63daff", text: chatInput.trim(), time: now(), own: true };
    setMessages(prev => [...prev, msg]);
    setChatInput("");
    // simulate reply
    setTimeout(() => {
      const rnd = TEAMMATES.filter(m => m.name !== "You")[Math.floor(Math.random() * 5)];
      setMessages(prev => [...prev, {
        id: makeId(), sender: rnd.name, init: rnd.init, bg: rnd.bg,
        text: REPLIES[replyIdx % REPLIES.length], time: now(), own: false,
      }]);
      setReplyIdx(r => r + 1);
    }, 1600 + Math.random() * 1000);
  }

  function insertEmoji() {
    setChatInput(v => v + EMOJIS[emojiIdx % EMOJIS.length]);
    setEmojiIdx(i => i + 1);
  }

  /* meet features */
  const meetFeatures = [
    { icon: "screen_share",        color: "var(--cyan)",   label: "Screen Share",   sub: "Present your work live",   msg: "Screen sharing ready" },
    { icon: "draw",                color: "var(--violet)", label: "Whiteboard",      sub: "Brainstorm together",       msg: "Whiteboard opened" },
    { icon: "fiber_manual_record", color: "var(--red)",    label: "Record Session",  sub: "Save for teammates",        msg: "Recording started" },
    { icon: "poll",                color: "var(--yellow)", label: "Live Poll",       sub: "Quick team decisions",      msg: "Poll created" },
    { icon: "event",               color: "var(--green)",  label: "Schedule Meet",   sub: "Pick a time for all",       msg: "Scheduler opened" },
  ];

  const onlineCount = TEAMMATES.filter(m => m.status === "online").length;

  return (
    <div className="td-root">
      <div className="bg-grid" />
      <div className="orb orb-1" /><div className="orb orb-2" />

      {/* ── TOPBAR ── */}
      <nav className="td-topbar">
        <div className="td-topbar-left">
          <a href="/teams" className="back-btn">
            <span className="material-icons-round">arrow_back</span>Teams
          </a>
          <div className="team-title-row">
            <div className="team-dot" style={{ background: team.color }} />
            <span className="team-name-label">{team.name}</span>
            <span className="team-proj-pill">
              <span className="material-icons-round">folder_special</span>
              {team.project.length > 30 ? team.project.slice(0, 30) + "…" : team.project}
            </span>
          </div>
        </div>

        <div className="td-topbar-right">
          <button className="tb-icon-btn" title="Pinned messages" onClick={() => showToast("Pinned messages coming soon", "info", "push_pin")}>
            <span className="material-icons-round">push_pin</span>
          </button>
          <button className="tb-icon-btn" title="Search" onClick={() => showToast("Search coming soon", "info", "search")}>
            <span className="material-icons-round">search</span>
          </button>

          {/* ── TEAMMATES TRIGGER BUTTON ── */}
          <div className="tm-trigger-wrap">
            <button
              ref={tmBtnRef}
              className={`tm-trigger-btn${tmOpen ? " active" : ""}`}
              onClick={() => setTmOpen(o => !o)}
              title="Teammates"
              aria-haspopup="true"
              aria-expanded={tmOpen}
            >
              {/* stacked mini-avatars */}
              <div className="tm-btn-avatars">
                {TEAMMATES.slice(0, 3).map((m, i) => (
                  <div
                    key={i}
                    className="tm-btn-av"
                    style={{ background: `${m.bg}30`, color: m.bg, zIndex: 3 - i }}
                  >
                    {m.init}
                  </div>
                ))}
              </div>
              <span className="tm-btn-label">Teammates</span>
              <span className="tm-btn-count">{TEAMMATES.length}</span>
              <span className="material-icons-round tm-btn-chevron">
                {tmOpen ? "expand_less" : "expand_more"}
              </span>
            </button>

            {/* POPUP */}
            {tmOpen && (
              <TeammatesPopup
                team={team}
                onClose={() => setTmOpen(false)}
                inviteLink={inviteLink}
                showToast={showToast}
              />
            )}
          </div>

          <div className="td-nav-avatar">AS</div>
        </div>
      </nav>

      {/* ── WORKSPACE (2 col) ── */}
      <div className="td-workspace">

        {/* ── LEFT: CHAT ── */}
        <div className="td-chat-panel">
          <div className="chat-header">
            <div className="chat-header-left">
              <div
                className="chat-header-icon"
                style={{ background: team.accent || "rgba(99,218,255,0.12)" }}
              >
                <span
                  className="material-icons-round"
                  style={{ color: team.color || "var(--cyan)" }}
                >
                  {team.domainIcon || "groups"}
                </span>
              </div>
              <div>
                <div className="chat-title"># {team.name}</div>
                <div className="chat-subtitle">
                  <span className="online-pill">
                    <span className="online-pulse" />
                    {onlineCount} online
                  </span>
                </div>
              </div>
            </div>
            <div className="chat-header-actions">
              <button className="chat-act-btn" title="Attach" onClick={() => showToast("File sharing coming soon", "info", "attach_file")}>
                <span className="material-icons-round">attach_file</span>
              </button>
              <button className="chat-act-btn" title="Mute" onClick={() => showToast("Notifications muted", "info", "notifications_off")}>
                <span className="material-icons-round">notifications_none</span>
              </button>
            </div>
          </div>

          <div className="chat-messages">
            {/* date dividers + seed */}
            <div className="date-divider"><span>Yesterday</span></div>
            <div className="sys-msg">🎉 Team "{team.name}" was created</div>
            <div className="date-divider"><span>Today</span></div>

            {messages.map(msg => (
              <div key={msg.id} className={`msg-row${msg.own ? " own" : ""}`}>
                <div className="msg-av" style={{ background: `${msg.bg}22`, color: msg.bg }}>
                  {msg.init}
                </div>
                <div className="msg-body">
                  {!msg.own && <div className="msg-sender">{msg.sender}</div>}
                  <div className="msg-bubble">{msg.text}</div>
                  <div className="msg-time">{msg.time}</div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-area">
            <div className="chat-input-row">
              <button className="chat-attach-btn" onClick={() => showToast("Attach file", "info", "attach_file")}>
                <span className="material-icons-round">add_circle_outline</span>
              </button>
              <div className="chat-input-wrap">
                <input
                  type="text"
                  placeholder="Message the team…"
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter") sendMessage(); }}
                />
                <button className="emoji-btn" onClick={insertEmoji}>😊</button>
              </div>
              <button className="send-btn" onClick={sendMessage}>
                <span className="material-icons-round">send</span>
              </button>
            </div>
          </div>
        </div>

        {/* ── RIGHT: PROJECT INFO + MEET ── */}
        <div className="td-middle-panel">

          {/* Project info */}
          <div className="info-box">
            <div className="box-header">
              <div className="box-icon" style={{ background: "rgba(99,218,255,0.12)" }}>
                <span className="material-icons-round" style={{ color: "var(--cyan)" }}>folder_special</span>
              </div>
              <span className="box-title">Project</span>
            </div>
            <div className="proj-name-big" style={{ color: team.color }}>{team.project}</div>
            <div className="proj-desc">{team.desc}</div>
            <div className="proj-tags">
              {TAGS.map((tag, i) => (
                <span key={i} className="proj-tag">
                  <span className="material-icons-round" style={{ color: TAG_COLORS[i % TAG_COLORS.length] }}>code</span>
                  {tag}
                </span>
              ))}
            </div>
            <div className="proj-meta-row">
              {[
                { val: 24, label: "Files",   color: "var(--cyan)" },
                { val: 18, label: "Stars",   color: "var(--yellow)" },
                { val: team.memberCount || 4, label: "Members", color: "var(--violet)" },
              ].map(({ val, label, color }) => (
                <div className="proj-meta-item" key={label}>
                  <div className="proj-meta-val" style={{ color }}>{val}</div>
                  <div className="proj-meta-label">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Meet box */}
          <div className="meet-box">
            <div className="box-header">
              <div className="box-icon" style={{ background: "rgba(52,211,153,0.12)" }}>
                <span className="material-icons-round" style={{ color: "var(--green)" }}>video_camera_front</span>
              </div>
              <span className="box-title">Team Meet</span>
            </div>

            <button
              className="start-meet-btn"
              onClick={() => { showToast("Starting meeting…", "success", "videocam"); }}
            >
              <span className="material-icons-round">videocam</span>
              Start Meeting
            </button>

            <div className="meet-features">
              {meetFeatures.map((f, i) => (
                <div
                  key={i}
                  className="meet-feature"
                  onClick={() => showToast(f.msg, "info", f.icon)}
                >
                  <div className="meet-feat-icon" style={{ background: `${f.color.replace("var(", "").replace(")", "")}1a` }}>
                    <span className="material-icons-round" style={{ color: f.color }}>{f.icon}</span>
                  </div>
                  <div className="meet-feat-text">
                    <strong>{f.label}</strong>
                    <span>{f.sub}</span>
                  </div>
                  <span className="material-icons-round meet-feat-arrow">chevron_right</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── TOASTS ── */}
      <div className="toast-container">
        {toasts.map(t => (
          <div key={t.id} className={`toast toast-${t.type}`}>
            <span className="material-icons-round">{t.icon}</span>
            {t.msg}
          </div>
        ))}
      </div>
    </div>
  );
}
