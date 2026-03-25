import { useState, useEffect, useCallback, useRef } from "react";
import { INITIAL_PROJECTS } from "../constants";
import './MyProject.css'

function formatDate(str) {
  return new Date(str).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function sortProjects(list, by) {
  return [...list].sort((a, b) => {
    if (by === "newest")    return new Date(b.date) - new Date(a.date);
    if (by === "oldest")    return new Date(a.date) - new Date(b.date);
    if (by === "name")      return a.name.localeCompare(b.name);
    if (by === "name-desc") return b.name.localeCompare(a.name);
    if (by === "files")     return b.files - a.files;
    return 0;
  });
}

/* ══════════════════════════════════════════════════════
   SUB-COMPONENTS
══════════════════════════════════════════════════════ */

/** Single project card */
function ProjectCard({ project: p, onShare, onEdit, onDelete, onOpen }) {
  const domainBorder = p.color + "44";

  return (
    <div className="project-card">
      <div className="card-bar" style={{ background: p.color }} />

      {/* Banner */}
      <div className="card-banner">
        <div className="card-banner-bg" style={{ background: p.accent }} />
        <div
          className="card-banner-pattern"
          style={{ "--dot-color": p.dotColor }}
        />
        <div className={`card-vis-badge ${p.visibility === "public" ? "badge-public" : "badge-private"}`}>
          <span className="material-icons-round">
            {p.visibility === "public" ? "public" : "lock"}
          </span>
          {p.visibility === "public" ? "Public" : "Private"}
        </div>
        <div
          className="card-banner-icon"
          style={{ background: p.accent, borderColor: p.color + "33" }}
        >
          <span className="material-icons-round" style={{ color: p.color }}>
            {p.domainIcon}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="card-body" onClick={() => onOpen(p)}>
        <div className="card-title-block">
          <div
            className="card-domain"
            style={{ background: p.accent, borderColor: domainBorder, color: p.color }}
          >
            <span className="material-icons-round">{p.domainIcon}</span>
            {p.domain}
          </div>
          <div className="card-title">
            {p.name}
            {p.status === "wip" && (
              <span style={{
                fontSize: ".68rem", padding: "2px 7px", borderRadius: "8px",
                background: "rgba(251,191,36,.12)", border: "1px solid rgba(251,191,36,.3)",
                color: "var(--yellow)", fontWeight: 700, marginLeft: 6, verticalAlign: "middle",
              }}>WIP</span>
            )}
          </div>
          <div className="card-desc">{p.description}</div>
        </div>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 10 }}>
          {p.tags.map(tag => (
            <span key={tag} style={{
              fontSize: ".68rem", padding: "2px 8px", borderRadius: "8px",
              background: "var(--surface3)", border: "1px solid var(--border)", color: "var(--muted)",
            }}>{tag}</span>
          ))}
        </div>

        {/* Meta */}
        <div className="card-meta">
          <span className="meta-item">
            <span className="material-icons-round" style={{ color: "var(--cyan)" }}>insert_drive_file</span>
            {p.files}
          </span>
          <span className="meta-item">
            <span className="material-icons-round" style={{ color: "var(--yellow)" }}>star</span>
            {p.stars}
          </span>
          <span className="meta-item">
            <span className="material-icons-round" style={{ color: "var(--violet)" }}>fork_right</span>
            {p.forks}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="card-footer">
        <div className="card-date">
          <span className="material-icons-round">calendar_today</span>
          {formatDate(p.date)}
        </div>
        <div className="card-actions">
          <button className="card-action-btn share" title="Share" onClick={e => { e.stopPropagation(); onShare(p); }}>
            <span className="material-icons-round">share</span>
          </button>
          <button className="card-action-btn edit" title="Edit" onClick={e => { e.stopPropagation(); onEdit(p); }}>
            <span className="material-icons-round">edit</span>
          </button>
          <button className="card-action-btn delete" title="Delete" onClick={e => { e.stopPropagation(); onDelete(p); }}>
            <span className="material-icons-round">delete_outline</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/** Delete confirmation modal */
function DeleteModal({ project, onCancel, onConfirm }) {
  // Close on Escape key
  useEffect(() => {
    const handler = e => { if (e.key === "Escape") onCancel(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onCancel]);

  return (
    <div
      className={`modal-backdrop ${project ? "open" : ""}`}
      onClick={e => { if (e.target === e.currentTarget) onCancel(); }}
    >
      <div className="modal">
        <div className="modal-icon-del">
          <span className="material-icons-round">delete_forever</span>
        </div>
        <h3>Delete Project?</h3>
        <p>
          Are you sure you want to delete{" "}
          <strong>"{project?.name}"</strong>?{" "}
          This action cannot be undone and all associated files will be permanently removed.
        </p>
        <div className="modal-actions">
          <button className="btn-modal-cancel" onClick={onCancel}>Cancel</button>
          <button className="btn-modal-confirm" onClick={onConfirm}>
            <span className="material-icons-round">delete</span> Delete
          </button>
        </div>
      </div>
    </div>
  );
}

/** Individual toast message */
function Toast({ toast }) {
  return (
    <div className={`toast ${toast.type}`}>
      <span className="material-icons-round">{toast.icon}</span>
      {toast.message}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════ */
export default function MyProjects() {
  // Inject global CSS once
  // useEffect(() => {
  //   const el = document.createElement("style");
  //   el.textContent = GLOBAL_CSS;
  //   document.head.appendChild(el);
  //   return () => document.head.removeChild(el);
  // }, []);

  // ── State ──────────────────────────────────────────
  const [projects, setProjects]       = useState(INITIAL_PROJECTS);
  const [showAll, setShowAll]         = useState(true);
  const [searchQ, setSearchQ]         = useState("");
  const [sortBy, setSortBy]           = useState("newest");
  const [listView, setListView]       = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toasts, setToasts]           = useState([]);
  const toastIdRef                    = useRef(0);

  // ── Toast helper ──────────────────────────────────
  const showToast = useCallback((message, type = "info", icon = "info", duration = 3000) => {
    const id = ++toastIdRef.current;
    setToasts(prev => [...prev, { id, message, type, icon }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), duration);
  }, []);

  // ── Derived list ──────────────────────────────────
  const filteredProjects = (() => {
    let list = [...projects];
    if (!showAll) list = list.filter(p => p.visibility === "public");
    if (searchQ) {
      const q = searchQ.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.domain.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    return sortProjects(list, sortBy);
  })();

  // ── Stats ─────────────────────────────────────────
  const total = projects.length;
  const pub   = projects.filter(p => p.visibility === "public").length;
  const priv  = total - pub;

  // ── Empty state content ───────────────────────────
  const emptyTitle = searchQ
    ? `No results for "${searchQ}"`
    : !showAll ? "No public projects yet" : "No projects yet";
  const emptyDesc = searchQ
    ? "Try a different keyword or clear the search."
    : !showAll
    ? "Switch the toggle to see all your projects, or make some public."
    : "Hit the Create Project button below to launch your first project!";
  const emptyIcon = searchQ ? "search_off" : !showAll ? "public_off" : "rocket_launch";

  // ── Card action handlers ──────────────────────────
  const handleShare = p => {
    if (p.visibility === "private") { showToast("Private projects can't be shared", "error", "lock"); return; }
    navigator.clipboard?.writeText(`https://teamup.dev/projects/${p.id}`).catch(() => {});
    showToast("Link copied to clipboard!", "success", "link");
  };
  const handleEdit  = p => showToast("Opening editor…", "info", "edit");
  const handleOpen  = p => showToast(`Opening "${p.name}"…`, "info", "open_in_new");

  const confirmDelete = () => {
    if (!deleteTarget) return;
    setProjects(prev => prev.filter(p => p.id !== deleteTarget.id));
    showToast(`"${deleteTarget.name}" deleted`, "error", "delete");
    setDeleteTarget(null);
  };

  // ── Render ────────────────────────────────────────
  return (
    <>
      {/* Background */}
      <div className="bg-grid" />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* Topbar */}
      <nav className="topbar">
        <a href="#" className="logo">
          <span className="material-icons-round logo-icon">bolt</span>
          <span>Team<span className="logo-accent">Up</span></span>
        </a>
        <div className="nav-actions">
          <div className="nav-icon-btn" title="Notifications">
            <span className="material-icons-round">notifications_none</span>
          </div>
          <div className="nav-icon-btn" title="Settings">
            <span className="material-icons-round">settings</span>
          </div>
          <div className="nav-avatar">AS</div>
        </div>
      </nav>

      {/* Page */}
      <main className="page">

        {/* Header */}
        <div className="page-header">
          <div className="page-title-block">
            <div className="page-title-icon">
              <span className="material-icons-round">folder_copy</span>
            </div>
            <div className="page-title-text">
              <h1>My Projects</h1>
              <p>Manage and track all your uploaded projects</p>
            </div>
          </div>
          <div className="header-stats">
            <span className="stat-pill sp-total">
              <span className="material-icons-round">folder_copy</span>{total} Total
            </span>
            <span className="stat-pill sp-public">
              <span className="material-icons-round">public</span>{pub} Public
            </span>
            <span className="stat-pill sp-priv">
              <span className="material-icons-round">lock</span>{priv} Private
            </span>
          </div>
        </div>

        {/* Toolbar */}
        <div className="toolbar">
          {/* Search */}
          <div className="search-wrap">
            <span className="material-icons-round">search</span>
            <input
              type="text"
              placeholder="Search projects…"
              value={searchQ}
              onChange={e => setSearchQ(e.target.value)}
            />
            {searchQ && (
              <button className="search-clear" onClick={() => setSearchQ("")}>
                <span className="material-icons-round">close</span>
              </button>
            )}
          </div>

          {/* Sort */}
          <select
            className="sort-select"
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="name">Name A–Z</option>
            <option value="name-desc">Name Z–A</option>
            <option value="files">Most Files</option>
          </select>

          {/* View toggle */}
          <div className="view-toggle">
            <button
              className={`view-btn ${!listView ? "active" : ""}`}
              title="Grid view"
              onClick={() => setListView(false)}
            >
              <span className="material-icons-round">grid_view</span>
            </button>
            <button
              className={`view-btn ${listView ? "active" : ""}`}
              title="List view"
              onClick={() => setListView(true)}
            >
              <span className="material-icons-round">view_list</span>
            </button>
          </div>

          {/* Visibility toggle */}
          <div className="vis-toggle-wrap">
            <span className="vis-toggle-label">
              <span className="material-icons-round">visibility</span>
              <span>Show:</span>
            </span>
            <label className="toggle-switch" title="Toggle all / public only">
              <input
                type="checkbox"
                checked={showAll}
                onChange={e => {
                  setShowAll(e.target.checked);
                  showToast(
                    e.target.checked ? "Showing all projects" : "Showing public projects only",
                    "info",
                    e.target.checked ? "visibility" : "public"
                  );
                }}
              />
              <div className="toggle-track">
                <div className="toggle-thumb" />
              </div>
            </label>
            <span className={`vis-state-label ${showAll ? "all" : "public"}`}>
              {showAll ? "All" : "Public"}
            </span>
          </div>
        </div>

        {/* Projects grid */}
        <div className={`projects-grid${listView ? " list-view" : ""}`}>
          {filteredProjects.map(p => (
            <ProjectCard
              key={p.id}
              project={p}
              onShare={handleShare}
              onEdit={handleEdit}
              onDelete={setDeleteTarget}
              onOpen={handleOpen}
            />
          ))}
        </div>

        {/* Empty state */}
        <div className={`empty-state${filteredProjects.length === 0 ? " visible" : ""}`}>
          <div className="empty-icon">
            <span className="material-icons-round">{emptyIcon}</span>
          </div>
          <h3>{emptyTitle}</h3>
          <p>{emptyDesc}</p>
        </div>

      </main>

      {/* FAB */}
      <button className="fab" onClick={() => (window.location.href = "create_project.html")}>
        <div className="fab-ring" />
        <span className="material-icons-round">add</span>
        <span className="fab-label">Create Project</span>
      </button>

      {/* Delete modal */}
      <DeleteModal
        project={deleteTarget}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
      />

      {/* Toasts */}
      <div className="toast-container">
        {toasts.map(t => <Toast key={t.id} toast={t} />)}
      </div>
    </>
  );
}
