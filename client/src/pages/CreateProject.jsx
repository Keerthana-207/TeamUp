import { useState, useRef, useCallback, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./CreateProject.css";

const DOMAINS = [
  { id:"ai",        label:"AI / ML",      icon:"psychology"         },
  { id:"web",       label:"Web Dev",       icon:"language"           },
  { id:"mobile",    label:"Mobile",        icon:"smartphone"         },
  { id:"blockchain",label:"Blockchain",    icon:"link"               },
  { id:"iot",       label:"IoT",           icon:"sensors"            },
  { id:"data",      label:"Data Science",  icon:"bar_chart"          },
  { id:"design",    label:"UI/UX",         icon:"brush"              },
  { id:"cloud",     label:"Cloud",         icon:"cloud"              },
  { id:"security",  label:"Cybersecurity", icon:"security"           },
  { id:"other",     label:"Other",         icon:"more_horiz"         },
];

const ROLES_NEEDED = [
  { id:"frontend",  label:"Frontend",     icon:"code"               },
  { id:"backend",   label:"Backend",      icon:"dns"                },
  { id:"ml",        label:"ML Engineer",  icon:"psychology"         },
  { id:"design",    label:"Designer",     icon:"brush"              },
  { id:"pm",        label:"PM",           icon:"work"               },
  { id:"devops",    label:"DevOps",       icon:"cloud"              },
];

/* ── AI suggestion engine (keyword-based; replace with real LLM call) ── */
const DOMAIN_SKILL_MAP = {
  ai:         ["Python","TensorFlow","PyTorch","Scikit-learn","NumPy","FastAPI","ML Ops","Hugging Face"],
  web:        ["React","Node.js","TypeScript","MongoDB","PostgreSQL","REST API","GraphQL","Tailwind CSS"],
  mobile:     ["Flutter","React Native","Swift","Kotlin","Firebase","Expo","Dart"],
  blockchain: ["Solidity","Web3.js","Ethereum","IPFS","Truffle","MetaMask","Rust"],
  iot:        ["Arduino","Raspberry Pi","MQTT","C++","Embedded C","Sensor Fusion","AWS IoT"],
  data:       ["Python","Pandas","SQL","Tableau","Apache Spark","Kafka","Airflow","dbt"],
  design:     ["Figma","Adobe XD","Prototyping","User Research","Design Systems","Accessibility"],
  cloud:      ["AWS","GCP","Azure","Kubernetes","Docker","Terraform","CI/CD","Serverless"],
  security:   ["Penetration Testing","OWASP","Cryptography","Wireshark","Network Security","CTF"],
  other:      ["Git","Agile","Project Management","Technical Writing"],
};

const KEYWORD_SKILL_MAP = {
  "chat":    ["WebSocket","Socket.io","Redis"],
  "real":    ["WebSocket","Socket.io"],
  "health":  ["FHIR","HL7","Healthcare API"],
  "finance": ["Plaid API","Stripe","Payment Gateway"],
  "social":  ["OAuth2","Social Graph","CDN"],
  "game":    ["Unity","WebGL","Three.js"],
  "image":   ["OpenCV","PIL","YOLO","Image Processing"],
  "video":   ["FFmpeg","WebRTC","HLS"],
  "nlp":     ["NLTK","spaCy","Transformers","LangChain"],
  "market":  ["Stripe","Payment","E-commerce","Search Engine"],
  "resume":  ["PDF Parsing","NLP","Resume Parser"],
  "student": ["Authentication","Dashboards","Analytics"],
};

function suggestSkills(title, description, domains) {
  const text = (title + " " + description).toLowerCase();
  const skills = new Set();

  // Domain-based
  domains.forEach(d => (DOMAIN_SKILL_MAP[d] || []).forEach(s => skills.add(s)));

  // Keyword-based
  Object.entries(KEYWORD_SKILL_MAP).forEach(([kw, sks]) => {
    if (text.includes(kw)) sks.forEach(s => skills.add(s));
  });

  // Always add essentials
  skills.add("Git"); skills.add("REST API");

  return [...skills].slice(0, 10);
}

/* ════════════════════════════════════════════════════════════
   TAG INPUT
════════════════════════════════════════════════════════════ */
function TagInput({ tags, onChange, placeholder }) {
  const [input, setInput] = useState("");
  function add(text) {
    const t = text.replace(/,/g,"").trim();
    if (!t || tags.includes(t) || tags.length >= 12) return;
    onChange([...tags, t]);
  }
  function remove(tag) { onChange(tags.filter(t => t !== tag)); }
  function handleKey(e) {
    if (["Enter",",","Tab"].includes(e.key) && input.trim()) { e.preventDefault(); add(input); setInput(""); }
    if (e.key === "Backspace" && !input && tags.length) remove(tags[tags.length-1]);
  }
  return (
    <div className="cp-tag-input-wrap" onClick={e => e.currentTarget.querySelector("input")?.focus()}>
      {tags.map(t => (
        <span key={t} className="cp-tag">
          {t}
          <button className="cp-tag-remove" type="button" onClick={() => remove(t)}>×</button>
        </span>
      ))}
      <input
        type="text" value={input} placeholder={tags.length ? "" : placeholder}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleKey}
        onBlur={() => { if (input.trim()) { add(input); setInput(""); }}}
        autoComplete="off"
      />
    </div>
  );
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
export default function CreateProject() {
  // Form state
  const [title,       setTitle]       = useState("");
  const [description, setDescription] = useState("");
  const [selectedDomains, setDomains] = useState([]);
  const [skills,      setSkills]      = useState([]);
  const [teamSize,    setTeamSize]    = useState(3);
  const [rolesNeeded, setRoles]       = useState([]);
  const [privacy,     setPrivacy]     = useState("public");

  // AI suggestion state
  const [aiSuggestions,  setAiSuggestions]  = useState([]);
  const [aiLoading,      setAiLoading]      = useState(false);
  const [aiTriggered,    setAiTriggered]    = useState(false);
  const descDebounce = useRef(null);

  // Submit state
  const [submitting, setSubmitting]  = useState(false);
  const [submitted,  setSubmitted]   = useState(false);
  const [createdId,  setCreatedId]   = useState("");

  const { toasts, show: showToast } = useToasts();

  /* ── AI suggestions trigger ─────────────────────────── */
  useEffect(() => {
    if (descDebounce.current) clearTimeout(descDebounce.current);
    if ((description.length > 30 || selectedDomains.length > 0) && (title.length > 3 || description.length > 20)) {
      descDebounce.current = setTimeout(() => runAiSuggestion(), 900);
    }
    return () => clearTimeout(descDebounce.current);
  }, [description, title, selectedDomains]);

  function runAiSuggestion() {
    setAiLoading(true);
    setAiTriggered(true);
    setTimeout(() => {
      const suggested = suggestSkills(title, description, selectedDomains);
      setAiSuggestions(suggested);
      setAiLoading(false);
    }, 1200);
  }

  function addAiSkill(skill) {
    if (!skills.includes(skill)) setSkills(p => [...p, skill]);
  }
  function toggleDomain(id) {
    setDomains(p => p.includes(id) ? p.filter(d => d !== id) : [...p, id]);
  }
  function toggleRole(id) {
    setRoles(p => p.includes(id) ? p.filter(r => r !== id) : [...p, id]);
  }

  /* ── Submit ─────────────────────────────────────────── */
async function handleSubmit() {
  if (!title.trim()) return showToast("Title required", "error");

  try {
    setSubmitting(true);

    const token = localStorage.getItem("token");

    const res = await axios.post(
      "http://localhost:3001/api/projects",
      {
        title,
        description,
        domains: selectedDomains,
        skills,
        teamSize,
        rolesNeeded,
        privacy,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setCreatedId(res.data._id);
    setSubmitted(true);
  } catch (err) {
    console.error(err);
    showToast("Failed to create project", "error");
  } finally {
    setSubmitting(false);
  }
}

  /* ── SUCCESS SCREEN ─────────────────────────────────── */
  if (submitted) return (
    <>
      <div className="cp-bg-grid" />
      <div className="cp-orb cp-orb-1" />
      <div className="cp-orb cp-orb-2" />
      <div className="cp-root">
        <header className="cp-topbar">
          <a href="/" className="cp-topbar-logo">
            <span className="material-icons-round cp-logo-icon">bolt</span>
            Team<span className="cp-logo-accent">Up</span>
          </a>
        </header>
        <div className="cp-page">
          <div className="cp-success">
            <div className="cp-success-ring">
              <div className="cp-success-ring-circle" />
              <span className="material-icons-round cp-success-check">check</span>
            </div>
            <h2 className="cp-success-title">Project Created! 🚀</h2>
            <p className="cp-success-sub">
              <strong style={{ color:"var(--text)" }}>{title}</strong> is live. Start building your team now.
            </p>
            <p style={{ fontSize:"0.76rem", color:"var(--text-muted)", fontFamily:"'Syne',sans-serif", letterSpacing:"0.08em" }}>
              Project ID: {createdId}
            </p>
            <div className="cp-success-actions">
              <a href={`/find-team/${createdId}`} className="cp-success-action">
                <span className="material-icons-round">group_add</span>
                Find Team Members
              </a>
              <a href={`/projects/${createdId}`} className="cp-success-sec">
                <span className="material-icons-round">open_in_new</span>
                View Project
              </a>
              <Link to="/dashboard" className="cp-success-sec">
                <span className="material-icons-round">dashboard</span>
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      <div className="cp-bg-grid" />
      <div className="cp-orb cp-orb-1" />
      <div className="cp-orb cp-orb-2" />

      <div className="cp-root">
        <header className="cp-topbar">
          <a href="/" className="cp-topbar-logo">
            <span className="material-icons-round cp-logo-icon">bolt</span>
            Team<span className="cp-logo-accent">Up</span>
          </a>
          <div className="cp-topbar-spacer" />
          <a href="/dashboard" className="cp-back-btn">
            <span className="material-icons-round">arrow_back</span>
            Dashboard
          </a>
        </header>

        <div className="cp-page">
          {/* HEADER */}
          <div className="cp-header">
            <div className="cp-header-eyebrow">New Project</div>
            <h1 className="cp-header-title">Create Your Project</h1>
            <p className="cp-header-sub">Describe your idea and we'll automatically suggest the skills your team needs.</p>
          </div>

          {/* ══ CARD 1: BASICS ══ */}
          <div className="cp-card">
            <div className="cp-card-head">
              <div className="cp-card-icon" style={{ background:"rgba(99,218,255,0.1)" }}>
                <span className="material-icons-round" style={{ color:"var(--cyan)" }}>edit_note</span>
              </div>
              <div>
                <div className="cp-card-title">Project Basics</div>
                <div className="cp-card-subtitle">Give your project a name and description</div>
              </div>
            </div>
            <div className="cp-card-body">
              <div className="cp-field">
                <label className="cp-label">
                  <span className="material-icons-round">label</span>
                  Project Title
                </label>
                <div className="cp-input-wrap">
                  <span className="material-icons-round cp-input-icon">rocket_launch</span>
                  <input
                    type="text" placeholder="e.g. SmartResume AI, CampusMarket, HackTracker…"
                    value={title} onChange={e => setTitle(e.target.value)}
                  />
                </div>
              </div>
              <div className="cp-field">
                <label className="cp-label">
                  <span className="material-icons-round">description</span>
                  Description
                </label>
                <textarea
                  className="cp-textarea"
                  placeholder="Describe what your project does, the problem it solves, and who it's for. The more detail, the better our skill suggestions will be…"
                  rows={5} maxLength={600}
                  value={description} onChange={e => setDescription(e.target.value)}
                />
                <div className="cp-char-hint">{description.length}/600</div>
              </div>
            </div>
          </div>

          {/* ══ CARD 2: DOMAIN ══ */}
          <div className="cp-card">
            <div className="cp-card-head">
              <div className="cp-card-icon" style={{ background:"rgba(167,139,250,0.1)" }}>
                <span className="material-icons-round" style={{ color:"var(--violet)" }}>category</span>
              </div>
              <div>
                <div className="cp-card-title">Domain</div>
                <div className="cp-card-subtitle">What tech area does your project fall under?</div>
              </div>
            </div>
            <div className="cp-card-body">
              <div className="cp-domain-chips">
                {DOMAINS.map(d => (
                  <button
                    key={d.id}
                    className={`cp-domain-chip ${selectedDomains.includes(d.id) ? "selected" : ""}`}
                    onClick={() => toggleDomain(d.id)}
                  >
                    <span className="material-icons-round">{d.icon}</span>
                    {d.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ══ CARD 3: SKILLS (with AI) ══ */}
          <div className="cp-card">
            <div className="cp-card-head">
              <div className="cp-card-icon" style={{ background:"rgba(99,218,255,0.1)" }}>
                <span className="material-icons-round" style={{ color:"var(--cyan)" }}>code</span>
              </div>
              <div>
                <div className="cp-card-title">Required Skills</div>
                <div className="cp-card-subtitle">Add skills manually or use our AI suggestions</div>
              </div>
            </div>
            <div className="cp-card-body">
              <div className="cp-field">
                <label className="cp-label">
                  <span className="material-icons-round">code</span>
                  Skills Required
                </label>
                <TagInput
                  tags={skills} onChange={setSkills}
                  placeholder="Type a skill and press Enter…"
                />
              </div>

              {/* AI Suggestion Box */}
              {aiTriggered && (
                <div className="cp-ai-box">
                  <div className="cp-ai-head">
                    <span className="material-icons-round cp-ai-spark">auto_awesome</span>
                    <div style={{ flex:1 }}>
                      <div className="cp-ai-head-text">AI Suggested Skills</div>
                      <div className="cp-ai-head-sub">Based on your description and domain</div>
                    </div>
                    <button className="cp-ai-regen" onClick={runAiSuggestion}>
                      <span className="material-icons-round">refresh</span>
                      Refresh
                    </button>
                  </div>
                  {aiLoading ? (
                    <div className="cp-ai-loading">
                      <div className="cp-ai-loader" />
                      Analysing your description…
                    </div>
                  ) : (
                    <div className="cp-ai-body">
                      {aiSuggestions.map((sk, i) => {
                        const isAdded = skills.includes(sk);
                        return (
                          <button
                            key={sk}
                            className={`cp-ai-skill ${isAdded ? "added" : "pending"}`}
                            style={{ animationDelay: `${i * 0.04}s` }}
                            onClick={() => !isAdded && addAiSkill(sk)}
                          >
                            <span className="material-icons-round">
                              {isAdded ? "check" : "add"}
                            </span>
                            {sk}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {!aiTriggered && (description.length < 30 && selectedDomains.length === 0) && (
                <div style={{ display:"flex", alignItems:"center", gap:"8px", padding:"12px 14px", background:"var(--surface2)", borderRadius:"var(--radius-sm)", border:"1px solid var(--border)", fontSize:"0.8rem", color:"var(--text-muted)" }}>
                  <span className="material-icons-round" style={{ fontSize:"16px", color:"var(--cyan)" }}>tips_and_updates</span>
                  Fill in your description and domain to get AI skill suggestions automatically.
                </div>
              )}
            </div>
          </div>

          {/* ══ CARD 4: TEAM ══ */}
          <div className="cp-card">
            <div className="cp-card-head">
              <div className="cp-card-icon" style={{ background:"rgba(52,211,153,0.1)" }}>
                <span className="material-icons-round" style={{ color:"var(--green)" }}>group</span>
              </div>
              <div>
                <div className="cp-card-title">Team Requirements</div>
                <div className="cp-card-subtitle">Set your team size and roles you need</div>
              </div>
            </div>
            <div className="cp-card-body">
              <div className="cp-grid-2">
                <div className="cp-field">
                  <label className="cp-label">
                    <span className="material-icons-round">groups</span>
                    Team Size
                  </label>
                  <div className="cp-input-wrap">
                    <span className="material-icons-round cp-input-icon">people</span>
                    <input
                      type="number" min={1} max={10} value={teamSize}
                      onChange={e => setTeamSize(Math.min(10,Math.max(1,+e.target.value)))}
                      style={{ textAlign:"center" }}
                    />
                  </div>
                </div>
                <div className="cp-field">
                  <label className="cp-label">
                    <span className="material-icons-round">assignment_ind</span>
                    Open Positions
                  </label>
                  <div className="cp-input-wrap" style={{ padding:"11px 14px", cursor:"default", pointerEvents:"none", justifyContent:"center" }}>
                    <span style={{ color:"var(--cyan)", fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"1rem" }}>
                      {Math.max(0, teamSize - 1)}
                    </span>
                    <span style={{ color:"var(--text-muted)", fontSize:"0.82rem", marginLeft:"6px" }}>spots available</span>
                  </div>
                </div>
              </div>

              <div className="cp-field">
                <label className="cp-label">
                  <span className="material-icons-round">work</span>
                  Roles Needed
                  <span className="cp-optional">select all that apply</span>
                </label>
                <div className="cp-roles-grid">
                  {ROLES_NEEDED.map(r => (
                    <div
                      key={r.id}
                      className={`cp-role-toggle ${rolesNeeded.includes(r.id) ? "selected" : ""}`}
                      onClick={() => toggleRole(r.id)}
                    >
                      <span className="material-icons-round">{r.icon}</span>
                      {r.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ══ CARD 5: PRIVACY ══ */}
          <div className="cp-card">
            <div className="cp-card-head">
              <div className="cp-card-icon" style={{ background:"rgba(251,191,36,0.1)" }}>
                <span className="material-icons-round" style={{ color:"var(--yellow)" }}>lock</span>
              </div>
              <div>
                <div className="cp-card-title">Privacy</div>
                <div className="cp-card-subtitle">Who can see and join your project?</div>
              </div>
            </div>
            <div className="cp-card-body">
              <div className="cp-privacy-options">
                <div
                  className={`cp-privacy-option ${privacy === "public" ? "selected" : ""}`}
                  onClick={() => setPrivacy("public")}
                >
                  <div className="cp-privacy-icon" style={{ background:"rgba(52,211,153,0.1)" }}>
                    <span className="material-icons-round" style={{ color:"var(--green)" }}>public</span>
                  </div>
                  <div>
                    <div className="cp-privacy-label">Public</div>
                    <div className="cp-privacy-desc">Anyone on TeamUp can discover and request to join</div>
                  </div>
                </div>
                <div
                  className={`cp-privacy-option ${privacy === "private" ? "selected" : ""}`}
                  onClick={() => setPrivacy("private")}
                >
                  <div className="cp-privacy-icon" style={{ background:"rgba(251,191,36,0.1)" }}>
                    <span className="material-icons-round" style={{ color:"var(--yellow)" }}>lock</span>
                  </div>
                  <div>
                    <div className="cp-privacy-label">Private</div>
                    <div className="cp-privacy-desc">Invite-only — only people you invite can see it</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ══ SUBMIT ROW ══ */}
          <div className="cp-submit-row">
            <button className="cp-draft-btn" onClick={() => showToast("Saved as draft!", "info", "save")}>
              <span className="material-icons-round" style={{ fontSize:"16px" }}>save</span>
              Save Draft
            </button>
            <button className="cp-submit-btn" onClick={handleSubmit} disabled={submitting}>
              {submitting ? (
                <span className="cp-submit-loader" />
              ) : (
                <>
                  <span className="material-icons-round">rocket_launch</span>
                  Create Project
                </>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* TOASTS */}
      <div className="cp-toast-container">
        {toasts.map(t => (
          <div key={t.id} className={`cp-toast ${t.type}`}>
            <span className="material-icons-round">{t.icon}</span>
            {t.msg}
          </div>
        ))}
      </div>
    </>
  );
}
