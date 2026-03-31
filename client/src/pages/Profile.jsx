import { useState, useRef, useEffect, useCallback } from "react";
import "./Profile.css";

/* ════════════════════════════════════════════════════════════
   DATA
════════════════════════════════════════════════════════════ */
const COLLEGES = [
  "IIT Bombay","IIT Delhi","IIT Madras","IIT Kanpur","IIT Kharagpur",
  "IIT Roorkee","IIT Guwahati","IIT Hyderabad","IIT Indore","IIT Jodhpur",
  "NIT Trichy","NIT Warangal","NIT Surathkal","NIT Calicut","NIT Rourkela",
  "IIIT Hyderabad","IIIT Bangalore","IIIT Allahabad","IIIT Delhi",
  "BITS Pilani","BITS Goa","BITS Hyderabad",
  "VIT Vellore","VIT Chennai","Manipal Institute of Technology",
  "SRM Institute of Technology","Amity University",
  "Delhi University","Jawaharlal Nehru University (JNU)",
  "Banaras Hindu University (BHU)","Anna University","Jadavpur University",
  "IISc Bangalore","IISER Pune","IISER Kolkata",
  "IIM Ahmedabad","IIM Bangalore","IIM Calcutta",
  "CBSE School","ICSE School","State Board School","IB School",
  "Others / Not Listed",
];

const DEPARTMENTS = [
  "Computer Science & Engineering (CSE)","Information Technology (IT)",
  "Electronics & Communication Engineering (ECE)","Electrical Engineering (EE)",
  "Mechanical Engineering (ME)","Civil Engineering (CE)","Chemical Engineering",
  "Aerospace Engineering","Biomedical Engineering","Biotechnology Engineering",
  "Artificial Intelligence & Machine Learning (AI/ML)","Data Science & Analytics",
  "Cybersecurity","Cloud Computing","Internet of Things (IoT)","Robotics & Automation",
  "Mathematics","Physics","Chemistry","Biology / Life Sciences","Statistics",
  "Business Administration (BBA / MBA)","Commerce (B.Com / M.Com)",
  "Economics","Finance & Accounting","Marketing","Human Resources (HR)",
  "UI/UX Design","Graphic Design","Industrial Design","Architecture",
  "English Literature","Psychology","Sociology","Political Science",
  "Journalism & Mass Communication","MBBS / Medicine","Law (LLB / LLM)",
  "B.Ed / M.Ed","Interdisciplinary Studies","Others / Not Listed",
];

const SKILL_SUGGESTIONS   = ["Python","JavaScript","UI/UX","ML/AI","React","Flutter","Data Science","Cloud","TypeScript","Node.js","Figma","Go"];
const INTEREST_SUGGESTIONS = ["Hackathons","Research","Startups","Open Source","Robotics","Competitive Coding","Design","Product Management"];

const YEAR_OPTIONS = [
  { value: "School",  icon: "menu_book",         label: "School"    },
  { value: "1",       icon: "looks_one",          label: "1st Year"  },
  { value: "2",       icon: "looks_two",          label: "2nd Year"  },
  { value: "3",       icon: "looks_3",            label: "3rd Year"  },
  { value: "4",       icon: "looks_4",            label: "4th Year"  },
  { value: "PG",      icon: "workspace_premium",  label: "PG / Masters" },
  { value: "PhD",     icon: "science",            label: "PhD"       },
  { value: "Others",  icon: "more_horiz",         label: "Others"    },
];

/* ════════════════════════════════════════════════════════════
   SIDEBAR NAV CONFIG
════════════════════════════════════════════════════════════ */
const NAV_SECTIONS = [
  { id: "sec-account",  icon: "manage_accounts", label: "Account"         },
  { id: "sec-academic", icon: "school",           label: "Academic"        },
  { id: "sec-skills",   icon: "code",             label: "Skills & Interests" },
  { id: "sec-links",    icon: "link",             label: "Profile & Links" },
  { id: "sec-danger",   icon: "warning_amber",    label: "Danger Zone"     },
];


/* ════════════════════════════════════════════════════════════
   TOAST HOOK
════════════════════════════════════════════════════════════ */
function useToasts() {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);
  const show = useCallback((message, type = "info", icon = "info", duration = 3000) => {
    const id = ++idRef.current;
    setToasts(p => [...p, { id, message, type, icon }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), duration);
  }, []);
  return { toasts, show };
}

/* ════════════════════════════════════════════════════════════
   SMALL REUSABLE BITS
════════════════════════════════════════════════════════════ */
function ToastContainer({ toasts }) {
  return (
    <div className="pf-toast-container">
      {toasts.map(t => (
        <div key={t.id} className={`pf-toast ${t.type}`}>
          <span className="material-icons-round">{t.icon}</span>
          {t.message}
        </div>
      ))}
    </div>
  );
}

/* Inline-editable field: shows display value or input */
function EditableField({ label, labelIcon, value, editing, children, placeholder = "—" }) {
  return (
    <div className="pf-field">
      <label className="pf-label">
        {labelIcon && <span className="material-icons-round">{labelIcon}</span>}
        {label}
      </label>
      {editing ? children : (
        <div className={`pf-display ${!value ? "empty" : ""}`}>
          {value || placeholder}
        </div>
      )}
    </div>
  );
}

/* Combo dropdown */
function ComboBox({ list, value, onChange, placeholder, icon, disabled }) {
  const [query, setQuery]     = useState(value || "");
  const [open, setOpen]       = useState(false);
  const [focused, setFocused] = useState(-1);
  const wrapRef               = useRef(null);

  useEffect(() => { setQuery(value || ""); }, [value]);

  const filtered = query.trim()
    ? list.filter(i => i.toLowerCase().includes(query.toLowerCase()))
    : list;

  function select(item) {
    setQuery(item);
    onChange(item);
    setOpen(false);
    setFocused(-1);
  }

  function handleKey(e) {
    if (!open) { setOpen(true); return; }
    if (e.key === "ArrowDown") { e.preventDefault(); setFocused(f => Math.min(f + 1, filtered.length - 1)); }
    if (e.key === "ArrowUp")   { e.preventDefault(); setFocused(f => Math.max(f - 1, 0)); }
    if (e.key === "Enter" && focused >= 0) { e.preventDefault(); select(filtered[focused]); }
    if (e.key === "Escape")    { setOpen(false); }
  }

  useEffect(() => {
    function outsideClick(e) { if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false); }
    document.addEventListener("mousedown", outsideClick);
    return () => document.removeEventListener("mousedown", outsideClick);
  }, []);

  return (
    <div className="pf-combo-wrap" ref={wrapRef}>
      <div className={`pf-input-wrap pf-combo-input-wrap ${open ? "open" : ""}`}>
        <span className="material-icons-round pf-input-icon">{icon}</span>
        <input
          type="text" value={query} placeholder={placeholder}
          disabled={disabled}
          onChange={e => { setQuery(e.target.value); onChange(e.target.value); setOpen(true); setFocused(-1); }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKey}
          autoComplete="off"
        />
        <span
          className={`material-icons-round pf-combo-arrow ${open ? "open" : ""}`}
          onClick={() => setOpen(o => !o)}
        >expand_more</span>
      </div>
      <div className={`pf-combo-dropdown ${open ? "open" : ""}`}>
        {filtered.length === 0
          ? <div className="pf-combo-no-result">No matches — your value will be saved as typed.</div>
          : filtered.slice(0, 60).map((item, i) => (
            <div
              key={item}
              className={`pf-combo-item ${item === value ? "selected" : ""} ${i === focused ? "focused" : ""}`}
              onMouseDown={() => select(item)}
            >{item}</div>
          ))
        }
      </div>
    </div>
  );
}

/* Tag Input */
function TagInput({ tags, onChange, placeholder, suggestions, disabled }) {
  const [input, setInput] = useState("");

  function addTag(text) {
    const cleaned = text.replace(/,/g, "").trim();
    if (!cleaned || cleaned.length > 32) return;
    if (tags.includes(cleaned)) return;
    if (tags.length >= 10) return;
    onChange([...tags, cleaned]);
  }
  function removeTag(tag) { onChange(tags.filter(t => t !== tag)); }

  function handleKey(e) {
    if (["Enter", ",", "Tab"].includes(e.key) && input.trim()) {
      e.preventDefault(); addTag(input); setInput("");
    }
    if (e.key === "Backspace" && !input && tags.length > 0) removeTag(tags[tags.length - 1]);
  }
  function handleBlur() { if (input.trim()) { addTag(input); setInput(""); } }

  return (
    <div>
      <div className="pf-tag-input-wrap" onClick={e => { if (!disabled) e.currentTarget.querySelector("input")?.focus(); }}>
        {tags.map(tag => (
          <span key={tag} className="pf-tag">
            {tag}
            {!disabled && (
              <button className="pf-tag-remove" type="button" onClick={() => removeTag(tag)}>×</button>
            )}
          </span>
        ))}
        {!disabled && (
          <input
            type="text" value={input} placeholder={tags.length ? "" : placeholder}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            onBlur={handleBlur}
            autoComplete="off"
          />
        )}
      </div>
      {!disabled && suggestions && (
        <div className="pf-sugg-row">
          <span className="pf-sugg-label">Quick add:</span>
          {suggestions.filter(s => !tags.includes(s)).slice(0, 8).map(s => (
            <button key={s} type="button" className="pf-sugg-chip" onClick={() => addTag(s)}>{s}</button>
          ))}
        </div>
      )}
    </div>
  );
}

/* Password strength */
function passwordStrength(pw) {
  if (!pw) return { score: 0, label: "Password strength", color: "transparent" };
  let s = 0;
  if (pw.length >= 8)  s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  const map = [
    { label: "Too short",  color: "#f87171" },
    { label: "Weak",       color: "#f87171" },
    { label: "Fair",       color: "#fbbf24" },
    { label: "Good",       color: "#34d399" },
    { label: "Strong 💪",  color: "#34d399" },
  ];
  return { score: s, ...map[s] };
}

/* ════════════════════════════════════════════════════════════
   SECTION WRAPPER
════════════════════════════════════════════════════════════ */
function Section({ id, icon, title, subtitle, editing, onEdit, onCancel, onSave, saving, children }) {
  return (
    <div id={id} className={`pf-section ${editing ? "editing" : ""}`}>
      <div className="pf-section-head">
        <div className="pf-section-icon">
          <span className="material-icons-round">{icon}</span>
        </div>
        <div className="pf-section-title-wrap">
          <div className="pf-section-title">{title}</div>
          <div className="pf-section-subtitle">{subtitle}</div>
        </div>
        <button className={`pf-edit-btn ${editing ? "active" : ""}`} onClick={editing ? onCancel : onEdit}>
          <span className="material-icons-round">{editing ? "close" : "edit"}</span>
          {editing ? "Cancel" : "Edit"}
        </button>
      </div>

      <div className="pf-section-body">{children}</div>

      {editing && (
        <div className="pf-action-row">
          <button className="pf-btn-cancel" onClick={onCancel}>
            <span className="material-icons-round" style={{ fontSize: "15px" }}>undo</span>
            Discard
          </button>
          <button className="pf-btn-save" onClick={onSave} disabled={saving}>
            {saving
              ? <span className="pf-save-loader" />
              : <><span className="material-icons-round">check</span>Save changes</>
            }
          </button>
        </div>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   MAIN PROFILE COMPONENT
════════════════════════════════════════════════════════════ */
export default function Profile() {
  /* ── profile data ────────────────────────────────────── */
  const [profile, setProfile] = useState({
  fullName: "",
  email: "",
  role: "",
  college: "",
  department: "",
  year: "",
  skills: [],        // ✅ string array (for UI)
  skillsRaw: [],     // ✅ full objects (from backend)
  interests: [],
  github: "",
  linkedin: "",
  instagram: "",
  youtube: "",
  bio: "",
  photoUrl: ""
});

  /* ── draft state per section ─────────────────────────── */
  const [drafts, setDrafts] = useState({});
  const [editing, setEditing] = useState({});   // { [sectionId]: bool }
  const [saving, setSaving]   = useState({});

  /* ── active sidebar nav ──────────────────────────────── */
  const [activeNav, setActiveNav] = useState("sec-account");
  const sectionRefs = useRef({});

  /* ── password change state (account section) ─────────── */
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw]         = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);

  /* ── toasts ──────────────────────────────────────────── */
  const { toasts, show: showToast } = useToasts();

  /* ── photo file input ref ────────────────────────────── */
  const photoInputRef = useRef(null);

  /* ── Intersection Observer for sidebar ──────────────── */
  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch("http://localhost:3001/api/auth/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });

        const data = await res.json();

        setProfile({
          fullName: data.fullName || "",
          email: data.email || "",
          role: data.role || "",
          college: data.college || "",
          department: data.department || "",
          year: data.yearOfStudy || "",

          // 🔥 IMPORTANT TRANSFORMATION
          skills: data.skills?.map(s => s.name) || [],
          skillsRaw: data.skills || [],

          interests: data.interests || [],
          github: data.github || "",
          linkedin: data.linkedin || "",
          instagram: data.instagram || "",
          youtube: data.youtube || "",
          bio: data.bio || "",
          photoUrl: data.profilePhoto || ""
        });

      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    }

    fetchProfile();
  }, []);

  /* ── Section edit helpers ────────────────────────────── */
  function startEdit(sectionId, initDraft) {
    setDrafts(d => ({ ...d, [sectionId]: initDraft }));
    setEditing(e => ({ ...e, [sectionId]: true }));
  }
  function cancelEdit(sectionId) {
    setEditing(e => ({ ...e, [sectionId]: false }));
    setDrafts(d => { const n = { ...d }; delete n[sectionId]; return n; });
  }
  function updateDraft(sectionId, key, value) {
    setDrafts(d => ({ ...d, [sectionId]: { ...d[sectionId], [key]: value } }));
  }
  function getDraft(sectionId) { return drafts[sectionId] || {}; }

  async function saveSection(sectionId, updatedFields, onSuccess) {
    setSaving(s => ({ ...s, [sectionId]: true }));
    try {
      /* ── Replace with real API call ──────────────────────
         await fetch("/api/profile", {
           method: "PATCH",
           headers: { "Content-Type": "application/json" },
           body: JSON.stringify(updatedFields),
         });
      ─────────────────────────────────────────────────── */
      await new Promise(r => setTimeout(r, 1000)); // fake save
      setProfile(p => ({ ...p, ...updatedFields }));
      cancelEdit(sectionId);
      if (onSuccess) onSuccess();
      showToast("Changes saved!", "success", "check_circle");
    } catch {
      showToast("Failed to save. Please try again.", "error", "error");
    } finally {
      setSaving(s => ({ ...s, [sectionId]: false }));
    }
  }

  /* ── Photo upload ────────────────────────────────────── */
  function handlePhotoChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { showToast("Photo must be under 2 MB.", "error", "error"); return; }
    const url = URL.createObjectURL(file);
    setProfile(p => ({ ...p, photoUrl: url }));
    showToast("Photo updated!", "success", "check_circle");
  }

  /* ── Scroll to section ──────────────────────────────── */
  function scrollTo(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveNav(id);
  }

  /* ════════════════════════════════════════════════════
     SECTION 1 — ACCOUNT
  ════════════════════════════════════════════════════ */
  const acct = getDraft("sec-account");
  const isEditingAcct = !!editing["sec-account"];

  function startEditAcct() {
    startEdit("sec-account", {
      fullName: profile.fullName, email: profile.email,
      role: profile.role,
      currentPw: "", newPw: "", confirmPw: "",
    });
  }
  function saveAcct() {
    if (!acct.fullName?.trim()) { showToast("Full name is required.", "error", "error"); return; }
    if (!acct.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(acct.email)) {
      showToast("Enter a valid email address.", "error", "error"); return;
    }
    if (acct.newPw && acct.newPw.length < 6) {
      showToast("New password must be at least 6 characters.", "error", "error"); return;
    }
    if (acct.newPw && acct.newPw !== acct.confirmPw) {
      showToast("Passwords do not match.", "error", "error"); return;
    }
    saveSection("sec-account", { fullName: acct.fullName, email: acct.email, role: acct.role });
  }
  const pwStrength = passwordStrength(acct.newPw || "");

  /* ════════════════════════════════════════════════════
     SECTION 2 — ACADEMIC
  ════════════════════════════════════════════════════ */
  const acad = getDraft("sec-academic");
  const isEditingAcad = !!editing["sec-academic"];

  function startEditAcad() {
    startEdit("sec-academic", { college: profile.college, department: profile.department, year: profile.year });
  }
  function saveAcad() {
    if (!acad.college?.trim()) { showToast("Please select or enter a college.", "error", "error"); return; }
    if (!acad.department?.trim()) { showToast("Please select or enter a department.", "error", "error"); return; }
    if (!acad.year) { showToast("Please select your year of study.", "error", "error"); return; }
    saveSection("sec-academic", { college: acad.college, department: acad.department, year: acad.year });
  }

  /* ════════════════════════════════════════════════════
     SECTION 3 — SKILLS & INTERESTS
  ════════════════════════════════════════════════════ */
  const skls = getDraft("sec-skills");
  const isEditingSkills = !!editing["sec-skills"];

  function startEditSkills() {
    startEdit("sec-skills", { skills: [...profile.skills], interests: [...profile.interests] });
  }
  function saveSkills() {
    if (!skls.skills?.length) { showToast("Add at least one skill.", "error", "error"); return; }
    saveSection("sec-skills", { skills: skls.skills, interests: skls.interests });
  }

  /* ════════════════════════════════════════════════════
     SECTION 4 — PROFILE & LINKS
  ════════════════════════════════════════════════════ */
  const lnks = getDraft("sec-links");
  const isEditingLinks = !!editing["sec-links"];

  function startEditLinks() {
    startEdit("sec-links", {
      github: profile.github, linkedin: profile.linkedin,
      instagram: profile.instagram, youtube: profile.youtube, bio: profile.bio,
    });
  }
  function saveLinks() {
    saveSection("sec-links", {
      github: lnks.github, linkedin: lnks.linkedin,
      instagram: lnks.instagram, youtube: lnks.youtube, bio: lnks.bio,
    });
  }

  /* ════════════════════════════════════════════════════
     ROLE DISPLAY HELPER
  ════════════════════════════════════════════════════ */
  const ROLES = [
    { value: "Student", icon: "school",               label: "Student" },
    { value: "Mentor",  icon: "psychology",            label: "Mentor"  },
    { value: "Admin",   icon: "admin_panel_settings",  label: "Admin"   },
  ];
  const activeRole = isEditingAcct ? (acct.role || profile.role) : profile.role;
  const roleObj = ROLES.find(r => r.value === profile.role);

  return (
    <>
      <div className="pf-bg-grid" />
      <div className="pf-orb pf-orb-1" />
      <div className="pf-orb pf-orb-2" />
      <div className="pf-orb pf-orb-3" />

      <div className="pf-root">

        {/* ── TOP BAR ─────────────────────────────────── */}
        <header className="pf-topbar">
          <a href="/" className="pf-topbar-logo">
            <span className="material-icons-round pf-topbar-logo-icon">bolt</span>
            Team<span className="pf-topbar-logo-accent">Up</span>
          </a>
          <div className="pf-topbar-divider" />
          <span className="pf-topbar-title">My Profile</span>
          <div className="pf-topbar-avatar">
            {profile.photoUrl
              ? <img src={profile.photoUrl} alt="avatar" />
              : <span className="material-icons-round">person</span>
            }
          </div>
        </header>

        {/* ── BODY ────────────────────────────────────── */}
        <div className="pf-body">

          {/* ── SIDEBAR ─────────────────────────────── */}
          <aside className="pf-sidebar">
            <div className="pf-sidebar-label">Sections</div>
            {NAV_SECTIONS.map(({ id, icon, label }) => (
              <button
                key={id}
                className={`pf-nav-item ${activeNav === id ? "active" : ""}`}
                onClick={() => scrollTo(id)}
              >
                <span className="material-icons-round">{icon}</span>
                {label}
                {editing[id] && <span className="pf-nav-badge unsaved">Editing</span>}
              </button>
            ))}
          </aside>

          {/* ── MAIN CONTENT ────────────────────────── */}
          <main className="pf-main">

            {/* ══════════════════════════════════════════
                SECTION 1: ACCOUNT
            ══════════════════════════════════════════ */}
            <Section
              id="sec-account"
              icon="manage_accounts"
              title="Account"
              subtitle="Your name, email, role and password"
              editing={isEditingAcct}
              onEdit={startEditAcct}
              onCancel={() => cancelEdit("sec-account")}
              onSave={saveAcct}
              saving={!!saving["sec-account"]}
            >
              {/* Profile hero */}
              <div className="pf-hero">
                <div className="pf-avatar-wrap">
                  <div className="pf-avatar">
                    {profile.photoUrl
                      ? <img src={profile.photoUrl} alt={profile.fullName} />
                      : <span className="material-icons-round">person</span>
                    }
                  </div>
                  <div className="pf-avatar-edit-btn" onClick={() => photoInputRef.current?.click()}>
                    <span className="material-icons-round">photo_camera</span>
                  </div>
                  <input
                    ref={photoInputRef} type="file" accept="image/*"
                    style={{ display: "none" }} onChange={handlePhotoChange}
                  />
                </div>
                <div className="pf-hero-info">
                  <div className="pf-hero-name">{profile.fullName}</div>
                  <div className="pf-hero-email">{profile.email}</div>
                  {roleObj && (
                    <div className="pf-hero-role">
                      <span className="material-icons-round">{roleObj.icon}</span>
                      {roleObj.label}
                    </div>
                  )}
                </div>
              </div>

              {/* Fields */}
              <div className="pf-grid pf-grid-2">
                <EditableField label="Full Name" labelIcon="person" value={profile.fullName} editing={isEditingAcct}>
                  <div className="pf-input-wrap">
                    <span className="material-icons-round pf-input-icon">person</span>
                    <input
                      type="text" placeholder="e.g. Aryan Sharma"
                      value={acct.fullName || ""}
                      onChange={e => updateDraft("sec-account", "fullName", e.target.value)}
                    />
                  </div>
                </EditableField>

                <EditableField label="College Email" labelIcon="alternate_email" value={profile.email} editing={isEditingAcct}>
                  <div className="pf-input-wrap">
                    <span className="material-icons-round pf-input-icon">mail</span>
                    <input
                      type="email" placeholder="you@college.edu"
                      value={acct.email || ""}
                      onChange={e => updateDraft("sec-account", "email", e.target.value)}
                    />
                  </div>
                </EditableField>
              </div>

              {/* Role */}
              <div className="pf-field" style={{ marginTop: "20px" }}>
                <label className="pf-label">
                  <span className="material-icons-round">badge</span>
                  I am a…
                </label>
                <div className="pf-role-cards">
                  {ROLES.map(r => (
                    <label
                      key={r.value}
                      className={`pf-role-card ${activeRole === r.value ? "selected" : ""}`}
                      style={{ pointerEvents: isEditingAcct ? "auto" : "none", opacity: !isEditingAcct && activeRole !== r.value ? 0.45 : 1 }}
                    >
                      <input
                        type="radio" name="pf-role" value={r.value}
                        checked={activeRole === r.value}
                        onChange={() => isEditingAcct && updateDraft("sec-account", "role", r.value)}
                      />
                      <div className="pf-role-inner">
                        <span className="material-icons-round pf-role-icon">{r.icon}</span>
                        <span>{r.label}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Change password (only when editing) */}
              {isEditingAcct && (
                <div style={{ marginTop: "24px" }}>
                  <div className="pf-sidebar-label" style={{ padding: 0, marginBottom: "14px" }}>
                    Change Password <span style={{ textTransform: "none", letterSpacing: 0, color: "var(--text-muted)", fontSize: "0.76rem" }}>(leave blank to keep current)</span>
                  </div>
                  <div className="pf-grid pf-grid-1">
                    <div className="pf-field">
                      <label className="pf-label"><span className="material-icons-round">lock</span>Current Password</label>
                      <div className="pf-input-wrap">
                        <span className="material-icons-round pf-input-icon">lock_outline</span>
                        <input
                          type={showCurrentPw ? "text" : "password"} placeholder="Enter current password"
                          value={acct.currentPw || ""}
                          onChange={e => updateDraft("sec-account", "currentPw", e.target.value)}
                        />
                        <button type="button" className="pf-toggle-pw" onClick={() => setShowCurrentPw(v => !v)}>
                          <span className="material-icons-round">{showCurrentPw ? "visibility_off" : "visibility"}</span>
                        </button>
                      </div>
                    </div>
                    <div className="pf-grid pf-grid-2">
                      <div className="pf-field">
                        <label className="pf-label"><span className="material-icons-round">vpn_key</span>New Password</label>
                        <div className="pf-input-wrap">
                          <span className="material-icons-round pf-input-icon">key</span>
                          <input
                            type={showNewPw ? "text" : "password"} placeholder="New password"
                            value={acct.newPw || ""}
                            onChange={e => updateDraft("sec-account", "newPw", e.target.value)}
                          />
                          <button type="button" className="pf-toggle-pw" onClick={() => setShowNewPw(v => !v)}>
                            <span className="material-icons-round">{showNewPw ? "visibility_off" : "visibility"}</span>
                          </button>
                        </div>
                        {acct.newPw && (
                          <>
                            <div className="pf-strength-bar">
                              <div className="pf-strength-fill" style={{ width: `${(pwStrength.score / 4) * 100}%`, background: pwStrength.color }} />
                            </div>
                            <div className="pf-strength-label">{pwStrength.label}</div>
                          </>
                        )}
                      </div>
                      <div className="pf-field">
                        <label className="pf-label"><span className="material-icons-round">key</span>Confirm Password</label>
                        <div className="pf-input-wrap">
                          <span className="material-icons-round pf-input-icon">key</span>
                          <input
                            type={showConfirmPw ? "text" : "password"} placeholder="Confirm password"
                            value={acct.confirmPw || ""}
                            onChange={e => updateDraft("sec-account", "confirmPw", e.target.value)}
                          />
                          <button type="button" className="pf-toggle-pw" onClick={() => setShowConfirmPw(v => !v)}>
                            <span className="material-icons-round">{showConfirmPw ? "visibility_off" : "visibility"}</span>
                          </button>
                        </div>
                        {acct.newPw && acct.confirmPw && acct.newPw !== acct.confirmPw && (
                          <div className="pf-error">
                            <span className="material-icons-round">error_outline</span>Passwords don't match
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Section>

            {/* ══════════════════════════════════════════
                SECTION 2: ACADEMIC
            ══════════════════════════════════════════ */}
            <Section
              id="sec-academic"
              icon="school"
              title="Academic Details"
              subtitle="Your institution, department and year"
              editing={isEditingAcad}
              onEdit={startEditAcad}
              onCancel={() => cancelEdit("sec-academic")}
              onSave={saveAcad}
              saving={!!saving["sec-academic"]}
            >
              <div className="pf-grid pf-grid-2">
                <EditableField label="College / University" labelIcon="account_balance" value={profile.college} editing={isEditingAcad}>
                  <ComboBox
                    list={COLLEGES} value={acad.college || ""} placeholder="Search or type your college…"
                    icon="account_balance"
                    onChange={v => updateDraft("sec-academic", "college", v)}
                  />
                </EditableField>

                <EditableField label="Department / Branch" labelIcon="biotech" value={profile.department} editing={isEditingAcad}>
                  <ComboBox
                    list={DEPARTMENTS} value={acad.department || ""} placeholder="Search or type your branch…"
                    icon="biotech"
                    onChange={v => updateDraft("sec-academic", "department", v)}
                  />
                </EditableField>
              </div>

              <div className="pf-field" style={{ marginTop: "20px" }}>
                <label className="pf-label">
                  <span className="material-icons-round">event_note</span>
                  Year of Study
                </label>
                <div className="pf-year-chips">
                  {YEAR_OPTIONS.map(opt => (
                    <button
                      key={opt.value}
                      type="button"
                      disabled={!isEditingAcad}
                      className={`pf-year-chip ${(isEditingAcad ? acad.year : profile.year) === opt.value ? "selected" : ""}`}
                      onClick={() => isEditingAcad && updateDraft("sec-academic", "year", opt.value)}
                    >
                      <span className="material-icons-round">{opt.icon}</span>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </Section>

            {/* ══════════════════════════════════════════
                SECTION 3: SKILLS & INTERESTS
            ══════════════════════════════════════════ */}
            <Section
              id="sec-skills"
              icon="code"
              title="Skills & Interests"
              subtitle="What you're good at and passionate about"
              editing={isEditingSkills}
              onEdit={startEditSkills}
              onCancel={() => cancelEdit("sec-skills")}
              onSave={saveSkills}
              saving={!!saving["sec-skills"]}
            >
              <div className="pf-grid pf-grid-1">
                <div className="pf-field">
                  <label className="pf-label">
                    <span className="material-icons-round">code</span>
                    Your Skills
                    <span className="pf-optional">(up to 10)</span>
                  </label>
                  <TagInput
                    tags={isEditingSkills ? (skls.skills || []) : profile.skills}
                    onChange={v => updateDraft("sec-skills", "skills", v)}
                    placeholder="Type a skill and press Enter…"
                    suggestions={SKILL_SUGGESTIONS}
                    disabled={!isEditingSkills}
                  />
                </div>

                <div className="pf-field">
                  <label className="pf-label">
                    <span className="material-icons-round">interests</span>
                    Interests
                    <span className="pf-optional">(up to 10)</span>
                  </label>
                  <TagInput
                    tags={isEditingSkills ? (skls.interests || []) : profile.interests}
                    onChange={v => updateDraft("sec-skills", "interests", v)}
                    placeholder="Type an interest and press Enter…"
                    suggestions={INTEREST_SUGGESTIONS}
                    disabled={!isEditingSkills}
                  />
                </div>
              </div>
            </Section>

            {/* ══════════════════════════════════════════
                SECTION 4: PROFILE & LINKS
            ══════════════════════════════════════════ */}
            <Section
              id="sec-links"
              icon="link"
              title="Profile & Links"
              subtitle="Social links and a short bio"
              editing={isEditingLinks}
              onEdit={startEditLinks}
              onCancel={() => cancelEdit("sec-links")}
              onSave={saveLinks}
              saving={!!saving["sec-links"]}
            >
              <div className="pf-grid pf-grid-2">
                <EditableField label="GitHub" labelIcon="terminal" value={profile.github} editing={isEditingLinks} placeholder="Not set">
                  <div className="pf-input-wrap">
                    <span className="material-icons-round pf-input-icon">terminal</span>
                    <input
                      type="url" placeholder="https://github.com/username"
                      value={lnks.github || ""}
                      onChange={e => updateDraft("sec-links", "github", e.target.value)}
                    />
                  </div>
                </EditableField>

                <EditableField label="LinkedIn" labelIcon="work" value={profile.linkedin} editing={isEditingLinks} placeholder="Not set">
                  <div className="pf-input-wrap">
                    <span className="material-icons-round pf-input-icon">work</span>
                    <input
                      type="url" placeholder="https://linkedin.com/in/username"
                      value={lnks.linkedin || ""}
                      onChange={e => updateDraft("sec-links", "linkedin", e.target.value)}
                    />
                  </div>
                </EditableField>

                <EditableField label="Instagram" labelIcon="photo_camera" value={profile.instagram} editing={isEditingLinks} placeholder="Not set">
                  <div className="pf-input-wrap">
                    <span className="material-icons-round pf-input-icon">photo_camera</span>
                    <input
                      type="url" placeholder="https://instagram.com/username"
                      value={lnks.instagram || ""}
                      onChange={e => updateDraft("sec-links", "instagram", e.target.value)}
                    />
                  </div>
                </EditableField>

                <EditableField label="YouTube" labelIcon="smart_display" value={profile.youtube} editing={isEditingLinks} placeholder="Not set">
                  <div className="pf-input-wrap">
                    <span className="material-icons-round pf-input-icon">smart_display</span>
                    <input
                      type="url" placeholder="https://youtube.com/@channel"
                      value={lnks.youtube || ""}
                      onChange={e => updateDraft("sec-links", "youtube", e.target.value)}
                    />
                  </div>
                </EditableField>
              </div>

              {/* Bio */}
              <div className="pf-field" style={{ marginTop: "20px" }}>
                <label className="pf-label">
                  <span className="material-icons-round">notes</span>
                  Short Bio
                  <span className="pf-optional">optional</span>
                </label>
                {isEditingLinks ? (
                  <div className="pf-textarea-wrap">
                    <textarea
                      placeholder="Tell teams who you are — your passion, projects, or goals in 2–3 lines…"
                      maxLength={200}
                      rows={3}
                      value={lnks.bio || ""}
                      onChange={e => updateDraft("sec-links", "bio", e.target.value)}
                    />
                    <div className="pf-char-count" style={{ color: (lnks.bio?.length || 0) > 180 ? "var(--yellow)" : undefined }}>
                      {lnks.bio?.length || 0}/200
                    </div>
                  </div>
                ) : (
                  <div className={`pf-display ${!profile.bio ? "empty" : ""}`} style={{ alignItems: "flex-start", minHeight: "72px" }}>
                    {profile.bio || "No bio added yet."}
                  </div>
                )}
              </div>
            </Section>

            {/* ══════════════════════════════════════════
                SECTION 5: DANGER ZONE
            ══════════════════════════════════════════ */}
            <div id="sec-danger" className="pf-section">
              <div className="pf-section-head">
                <div className="pf-section-icon" style={{ background: "rgba(248,113,113,0.1)", borderColor: "rgba(248,113,113,0.2)" }}>
                  <span className="material-icons-round" style={{ color: "var(--red)" }}>warning_amber</span>
                </div>
                <div className="pf-section-title-wrap">
                  <div className="pf-section-title">Danger Zone</div>
                  <div className="pf-section-subtitle">Irreversible account actions</div>
                </div>
              </div>
              <div className="pf-section-body" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div className="pf-danger-row">
                  <div className="pf-danger-text">
                    <h4>Sign out of all devices</h4>
                    <p>Revoke all active sessions across all devices.</p>
                  </div>
                  <button className="pf-btn-danger" onClick={() => showToast("Signed out of all devices.", "info", "logout")}>
                    <span className="material-icons-round">logout</span>Sign out all
                  </button>
                </div>
                <div className="pf-danger-row">
                  <div className="pf-danger-text">
                    <h4>Delete account</h4>
                    <p>Permanently delete your account and all data. This cannot be undone.</p>
                  </div>
                  <button
                    className="pf-btn-danger"
                    onClick={() => { if (window.confirm("Are you absolutely sure? This cannot be undone.")) showToast("Account deletion requested.", "error", "delete_forever"); }}
                  >
                    <span className="material-icons-round">delete_forever</span>Delete account
                  </button>
                </div>
              </div>
            </div>

          </main>
        </div>
      </div>

      <ToastContainer toasts={toasts} />
    </>
  );
}
