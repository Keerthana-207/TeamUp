import { useState, useEffect, useCallback, useRef } from "react";
import axios from 'axios';
import "./SkillShare.css";
import { logout } from '../utils/auth'
import { ACCOUNT_NAV } from "../constants";

/* ══════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════ */
const ALL_PEOPLE = [
  {
    id: "u1", name: "Ananya Krishnan", initials: "AK", color: "#63daff",
    tagline: "Full-Stack Dev · IIT Bombay, 3rd Year",
    bio: "Passionate about building scalable web systems. Love exploring AI integrations in everyday apps. Open to hackathon collabs and research projects.",
    desc: "Hey! I'm Ananya, a full-stack developer who loves clean code and great design. Currently building AI-powered productivity tools and looking for passionate teammates for my next hackathon project.",
    skills: ["React", "Python", "Node.js", "Machine Learning", "SQL", "TypeScript"],
    domain: "Web Development", domainIcon: "language",
    links: ["terminal:github.com/ananya-k", "work:linkedin.com/in/ananya-k"],
    projects: 6, stars: 44, followers: 31,
    projects_list: [
      { name: "HackBot AI",    desc: "AI hackathon assistant with NLP team matching",              color: "#63daff", icon: "psychology",           domain: "AI/ML",   tag: "ai",     stars: 18, files: 24 },
      { name: "DevSync",       desc: "Real-time collaborative code editor for remote teams",       color: "#a78bfa", icon: "code",                 domain: "Web Dev", tag: "web",    stars: 12, files: 18 },
      { name: "NutriTrack",    desc: "ML-powered nutrition planner using food image recognition",  color: "#34d399", icon: "local_dining",          domain: "AI/ML",   tag: "ai",     stars: 9,  files: 31 },
      { name: "PortfolioGen",  desc: "Auto-generate beautiful portfolios from GitHub activity",    color: "#fbbf24", icon: "person",               domain: "Web Dev", tag: "web",    stars: 22, files: 14 },
      { name: "CampusMeet",    desc: "Event discovery and scheduling app for college students",    color: "#fb923c", icon: "event",                domain: "Mobile",  tag: "mobile", stars: 6,  files: 11 },
      { name: "CodeReviewer",  desc: "AI code reviewer that explains bugs in simple language",     color: "#f472b6", icon: "rate_review",           domain: "AI/ML",   tag: "ai",     stars: 15, files: 22 },
    ],
  },
  {
    id: "u2", name: "Rohan Verma", initials: "RV", color: "#a78bfa",
    tagline: "ML Engineer · NIT Warangal, 4th Year",
    bio: "Deep learning researcher with publications in computer vision. Building cool AI products in spare time. Always up for research collaborations.",
    desc: "ML Engineer obsessed with computer vision and generative models. I like making research-grade work production-ready. Currently working on diffusion models for medical imaging.",
    skills: ["PyTorch", "Computer Vision", "Python", "Deep Learning", "NLP", "Docker"],
    domain: "AI / ML", domainIcon: "psychology",
    links: ["terminal:github.com/rohan-v", "biotech:kaggle.com/rohanv"],
    projects: 8, stars: 67, followers: 52,
    projects_list: [
      { name: "MediLens",      desc: "OCR prescription reader detecting drug interactions",        color: "#f87171", icon: "local_hospital",        domain: "MedTech", tag: "ai",     stars: 31, files: 19 },
      { name: "FaceGuard",     desc: "Privacy-first face anonymization for live video streams",    color: "#a78bfa", icon: "face",                 domain: "AI/ML",   tag: "ai",     stars: 24, files: 27 },
      { name: "DiffuseIt",     desc: "Text-to-image diffusion model fine-tuned on sketches",       color: "#63daff", icon: "image",                domain: "AI/ML",   tag: "ai",     stars: 18, files: 44 },
      { name: "SmartResume",   desc: "ATS-optimised resume builder powered by GPT",               color: "#34d399", icon: "description",           domain: "Web Dev", tag: "web",    stars: 15, files: 13 },
      { name: "GestureLang",   desc: "Real-time sign language to text translation",               color: "#fbbf24", icon: "sign_language",         domain: "AI/ML",   tag: "ai",     stars: 22, files: 38 },
      { name: "SentimentLive", desc: "Real-time Twitter sentiment dashboard",                     color: "#fb923c", icon: "sentiment_satisfied",   domain: "Web Dev", tag: "web",    stars: 9,  files: 16 },
    ],
  },
  {
    id: "u3", name: "Shruti Malhotra", initials: "SM", color: "#34d399",
    tagline: "UI/UX Designer · BITS Pilani, 2nd Year",
    bio: "Crafting interfaces that feel alive. I obsess over micro-interactions and accessibility. Figma wizard and motion design enthusiast.",
    desc: "Designer who codes! I bridge the gap between beautiful design and functional engineering. I have shipped 4 apps to production and mentored 20+ students in UI/UX bootcamps.",
    skills: ["UI/UX", "Figma", "Motion Design", "React", "CSS", "Graphic Design"],
    domain: "Design", domainIcon: "palette",
    links: ["terminal:github.com/shruti-m", "language:shruti.design"],
    projects: 5, stars: 38, followers: 44,
    projects_list: [
      { name: "DesignOS",      desc: "Open-source design system with 80+ components",             color: "#34d399", icon: "palette",              domain: "Design",  tag: "web",    stars: 28, files: 62 },
      { name: "AnimKit",       desc: "Drag-and-drop motion design tool for developers",            color: "#63daff", icon: "animation",            domain: "Design",  tag: "web",    stars: 16, files: 31 },
      { name: "ColorLens",     desc: "AI colour palette generator from mood board images",         color: "#f472b6", icon: "colorize",             domain: "AI/ML",   tag: "ai",     stars: 11, files: 17 },
      { name: "AccessiCheck",  desc: "Automated WCAG accessibility checker for web apps",          color: "#fbbf24", icon: "accessibility",        domain: "Web Dev", tag: "web",    stars: 9,  files: 24 },
      { name: "UXReview",      desc: "Peer feedback platform for design portfolio critique",       color: "#a78bfa", icon: "rate_review",           domain: "EdTech",  tag: "web",    stars: 7,  files: 12 },
      { name: "Wireflow",      desc: "Collaborative wireframing tool with real-time cursors",      color: "#fb923c", icon: "draw",                 domain: "Design",  tag: "web",    stars: 14, files: 19 },
    ],
  },
  {
    id: "u4", name: "Karan Mehta", initials: "KM", color: "#fbbf24",
    tagline: "Backend Dev · IIT Delhi, 4th Year",
    bio: "Systems programmer and backend architect. Love distributed systems, databases and making things run 10x faster. Competitive programmer (Codeforces 1800+).",
    desc: "I love building high-performance backends. From writing low-latency APIs to tuning PostgreSQL queries, I enjoy making systems run at peak efficiency.",
    skills: ["Node.js", "PostgreSQL", "Docker", "Kubernetes", "Go", "Rust"],
    domain: "Backend", domainIcon: "dns",
    links: ["terminal:github.com/karan-m", "sports_esports:codeforces.com/karan"],
    projects: 7, stars: 51, followers: 29,
    projects_list: [
      { name: "FastQueue",     desc: "In-memory message queue with sub-ms latency",               color: "#fbbf24", icon: "speed",                domain: "Systems", tag: "web",    stars: 22, files: 28 },
      { name: "DBOptimizer",   desc: "Automatic slow-query detector and optimizer for Postgres",   color: "#63daff", icon: "storage",              domain: "Backend", tag: "web",    stars: 18, files: 33 },
      { name: "AuthKit",       desc: "Drop-in authentication microservice with MFA support",       color: "#34d399", icon: "security",             domain: "Backend", tag: "web",    stars: 15, files: 21 },
      { name: "MicroLog",      desc: "Distributed logging system with Elasticsearch backend",      color: "#a78bfa", icon: "article",              domain: "DevOps",  tag: "web",    stars: 11, files: 17 },
      { name: "K8sDeploy",     desc: "One-command Kubernetes deployment generator",               color: "#fb923c", icon: "settings_suggest",     domain: "DevOps",  tag: "web",    stars: 9,  files: 14 },
      { name: "RustHTTP",      desc: "Blazing-fast HTTP server built in Rust from scratch",        color: "#f87171", icon: "bolt",                 domain: "Systems", tag: "web",    stars: 24, files: 39 },
    ],
  },
  {
    id: "u5", name: "Priya Nair", initials: "PN", color: "#fb923c",
    tagline: "Mobile Developer · VIT Vellore, 3rd Year",
    bio: "Flutter dev who ships apps fast. Built 3 apps with 10k+ downloads. Love clean architecture, state management and native integrations.",
    desc: "Mobile-first developer passionate about creating smooth, native-feeling experiences on both iOS and Android with a single codebase. Open to cross-platform projects.",
    skills: ["Flutter", "Firebase", "UI/UX", "React", "JavaScript", "SQL"],
    domain: "Mobile", domainIcon: "smartphone",
    links: ["terminal:github.com/priya-n", "language:priya-apps.dev"],
    projects: 5, stars: 29, followers: 37,
    projects_list: [
      { name: "PocketBudget",  desc: "Smart expense tracker with ML-based categorisation",        color: "#fb923c", icon: "account_balance_wallet", domain: "FinTech",  tag: "mobile", stars: 14, files: 26 },
      { name: "StudyPal",      desc: "Pomodoro + note-taking app for focused study sessions",      color: "#63daff", icon: "school",               domain: "EdTech",   tag: "mobile", stars: 11, files: 19 },
      { name: "LocalMart",     desc: "Hyperlocal shop discovery and ordering platform",            color: "#34d399", icon: "storefront",           domain: "Commerce", tag: "mobile", stars: 8,  files: 32 },
      { name: "FitFlow",       desc: "AI workout planner adapting to your recovery metrics",       color: "#a78bfa", icon: "fitness_center",       domain: "HealthTech", tag: "mobile", stars: 10, files: 24 },
      { name: "EventPass",     desc: "Digital event ticket scanner with QR + NFC support",         color: "#f472b6", icon: "qr_code_scanner",      domain: "Mobile",   tag: "mobile", stars: 6,  files: 15 },
      { name: "SkyRoute",      desc: "Offline-capable maps for hiking trails",                    color: "#fbbf24", icon: "terrain",              domain: "Mobile",   tag: "mobile", stars: 12, files: 22 },
    ],
  },
  {
    id: "u6", name: "Aditya Sharma", initials: "AS", color: "#f472b6",
    tagline: "Cybersecurity Researcher · IISc Bangalore",
    bio: "Security researcher, CTF player and bug bounty hunter. Passionate about making the web safer. Speaker at null Pune security meetups.",
    desc: "Cybersecurity enthusiast who loves breaking things (ethically). I focus on web application security, reverse engineering and network forensics. Available for security audits.",
    skills: ["Cybersecurity", "Python", "C++", "Rust", "Blockchain", "Research"],
    domain: "Security", domainIcon: "security",
    links: ["terminal:github.com/aditya-sec", "bug_report:bugcrowd.com/aditya"],
    projects: 6, stars: 73, followers: 60,
    projects_list: [
      { name: "VulnMap",       desc: "Automated web app vulnerability scanner with PoC export",   color: "#f472b6", icon: "security",             domain: "Security", tag: "web",    stars: 38, files: 47 },
      { name: "CipherCraft",   desc: "Quantum-resistant encryption library for Python",            color: "#a78bfa", icon: "enhanced_encryption",  domain: "Security", tag: "web",    stars: 21, files: 33 },
      { name: "PacketScope",   desc: "Real-time network traffic analyser and anomaly detector",    color: "#63daff", icon: "network_check",        domain: "Security", tag: "web",    stars: 17, files: 28 },
      { name: "SecTrail",      desc: "Audit trail system for compliance-heavy applications",       color: "#34d399", icon: "verified_user",        domain: "Security", tag: "web",    stars: 14, files: 22 },
      { name: "PhishGuard",    desc: "Browser extension detecting phishing sites via ML",          color: "#f87171", icon: "phishing",             domain: "AI/ML",    tag: "ai",     stars: 19, files: 31 },
      { name: "DarkFind",      desc: "OSINT tool for dark web monitoring and alerting",            color: "#fbbf24", icon: "search",               domain: "Security", tag: "web",    stars: 11, files: 18 },
    ],
  },
  {
    id: "u7", name: "Neha Singh", initials: "NS", color: "#63daff",
    tagline: "Data Scientist · IIM Bangalore (MBA-Tech)",
    bio: "Data storyteller. Turning messy datasets into clear business insights. Python + SQL wizard, Tableau and Power BI expert. Love NLP use-cases.",
    desc: "I help organisations make sense of their data. From EDA to deploying ML pipelines to production, I cover the full data science lifecycle. Open to research collaborations.",
    skills: ["Data Science", "Python", "SQL", "NLP", "Machine Learning", "Deep Learning"],
    domain: "Data Science", domainIcon: "bar_chart",
    links: ["terminal:github.com/neha-ds", "language:medium.com/@neha-ds"],
    projects: 5, stars: 42, followers: 48,
    projects_list: [
      { name: "InsightBoard",  desc: "Automated business intelligence dashboard with NL queries",  color: "#63daff", icon: "insights",             domain: "Data",    tag: "ai",     stars: 19, files: 27 },
      { name: "ChurnPred",     desc: "Customer churn predictor with SHAP explainability",          color: "#a78bfa", icon: "trending_down",        domain: "AI/ML",   tag: "ai",     stars: 14, files: 21 },
      { name: "DataClean",     desc: "Automated data cleaning pipeline for structured datasets",   color: "#34d399", icon: "cleaning_services",    domain: "Data",    tag: "web",    stars: 11, files: 16 },
      { name: "NLPSuite",      desc: "Collection of text preprocessing utilities for Indian languages", color: "#fbbf24", icon: "translate",       domain: "NLP",     tag: "ai",     stars: 17, files: 34 },
      { name: "SalesForecast", desc: "Time-series sales forecasting with LSTM and Prophet",        color: "#fb923c", icon: "trending_up",          domain: "AI/ML",   tag: "ai",     stars: 9,  files: 19 },
      { name: "VisualStat",    desc: "No-code statistical analysis and visualisation tool",        color: "#f472b6", icon: "bar_chart",            domain: "Data",    tag: "web",    stars: 8,  files: 13 },
    ],
  },
  {
    id: "u8", name: "Vikram Patel", initials: "VP", color: "#34d399",
    tagline: "Cloud Architect · Thapar University, PG",
    bio: "AWS Certified Solutions Architect. Love infrastructure-as-code and serverless. Building a startup on the side. 3x hackathon winner.",
    desc: "I design cloud-native architectures that scale from zero to millions. Terraform, CDK, EKS — name it, I've deployed it. Let's build something resilient together.",
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Firebase", "PostgreSQL"],
    domain: "Cloud / DevOps", domainIcon: "cloud",
    links: ["terminal:github.com/vikram-p", "cloud:aws.amazon.com/hero/vikram"],
    projects: 6, stars: 55, followers: 43,
    projects_list: [
      { name: "InfraForge",    desc: "Terraform module library for common AWS patterns",           color: "#34d399", icon: "cloud",                domain: "DevOps",  tag: "web",    stars: 28, files: 41 },
      { name: "ScalePilot",    desc: "Auto-scaling K8s controller based on custom metrics",        color: "#63daff", icon: "speed",                domain: "DevOps",  tag: "web",    stars: 18, files: 29 },
      { name: "ServerlessKit", desc: "Boilerplate for production-ready serverless APIs on AWS",    color: "#fbbf24", icon: "bolt",                 domain: "Cloud",   tag: "web",    stars: 22, files: 33 },
      { name: "CostGuard",     desc: "AWS cost anomaly detector with Slack alerts",               color: "#f87171", icon: "savings",              domain: "FinTech", tag: "web",    stars: 15, files: 17 },
      { name: "LogStream",     desc: "Centralised log aggregation with ElasticSearch + Kibana",    color: "#a78bfa", icon: "article",              domain: "DevOps",  tag: "web",    stars: 11, files: 24 },
      { name: "DeployBot",     desc: "GitHub Actions bot for one-click production deployments",    color: "#fb923c", icon: "rocket_launch",        domain: "DevOps",  tag: "web",    stars: 14, files: 19 },
    ],
  },
];

const SKILL_CATEGORIES = [
  {
    label: "Programming & Dev", cat: "dev",
    skills: [
      { skill: "Python",     icon: "code" },
      { skill: "JavaScript", icon: "javascript" },
      { skill: "TypeScript", icon: "data_object" },
      { skill: "React",      icon: "hub" },
      { skill: "Node.js",    icon: "terminal" },
      { skill: "Flutter",    icon: "smartphone" },
      { skill: "Java",       icon: "coffee" },
      { skill: "C++",        icon: "memory" },
      { skill: "Rust",       icon: "precision_manufacturing" },
      { skill: "Go",         icon: "terminal" },
      { skill: "Next.js",    icon: "web" },
      { skill: "Django",     icon: "dns" },
    ],
  },
  {
    label: "AI / Data Science", cat: "violet",
    skills: [
      { skill: "Machine Learning",  icon: "psychology" },
      { skill: "Deep Learning",     icon: "network_intelligence_update" },
      { skill: "NLP",               icon: "record_voice_over" },
      { skill: "Computer Vision",   icon: "visibility" },
      { skill: "Data Science",      icon: "bar_chart" },
      { skill: "PyTorch",           icon: "science" },
      { skill: "TensorFlow",        icon: "science" },
      { skill: "SQL",               icon: "table_chart" },
    ],
  },
  {
    label: "Design & Creative", cat: "green",
    skills: [
      { skill: "UI/UX",         icon: "palette" },
      { skill: "Figma",         icon: "design_services" },
      { skill: "Graphic Design",icon: "brush" },
      { skill: "Motion Design", icon: "animation" },
      { skill: "3D Modelling",  icon: "view_in_ar" },
      { skill: "Video Editing", icon: "movie" },
    ],
  },
  {
    label: "Cloud & DevOps", cat: "yellow",
    skills: [
      { skill: "AWS",        icon: "cloud" },
      { skill: "Docker",     icon: "inventory_2" },
      { skill: "Kubernetes", icon: "settings_suggest" },
      { skill: "CI/CD",      icon: "autorenew" },
      { skill: "Firebase",   icon: "local_fire_department" },
      { skill: "PostgreSQL", icon: "storage" },
    ],
  },
  {
    label: "Soft Skills & Domain", cat: "pink",
    skills: [
      { skill: "Project Management", icon: "task_alt" },
      { skill: "Public Speaking",    icon: "mic" },
      { skill: "Research",           icon: "biotech" },
      { skill: "Cybersecurity",      icon: "security" },
      { skill: "Blockchain",         icon: "token" },
      { skill: "Game Dev",           icon: "sports_esports" },
    ],
  },
];

const SKILL_COLORS = ["#63daff", "#a78bfa", "#34d399", "#fbbf24", "#fb923c", "#f472b6", "#f87171"];

/* ══════════════════════════════════════════════════
   TOAST
══════════════════════════════════════════════════ */
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

/* ══════════════════════════════════════════════════
   PROFILE CARD (search results)
══════════════════════════════════════════════════ */
function ProfileCard({ person, matchedSkills, index, onClick }) {
  const p = person;
  return (
    <div
      className="profile-card"
      style={{ animationDelay: `${index * 0.06}s` }}
      onClick={() => onClick(p)}
    >
      <div className="pc-bar" style={{ background: p.color }}></div>
      <div className="pc-body">
        <div className="pc-top">
          <div
            className="pc-avatar"
            style={{ background: p.color + "22", color: p.color, borderColor: p.color + "44" }}
          >
            {p.initials}
          </div>
          <div className="pc-name-wrap">
            <div className="pc-name">{p.name}</div>
            <div className="pc-role">{p.tagline}</div>
          </div>
        </div>
        <div className="pc-bio">{p.bio}</div>
        <div className="pc-skills">
          {p.skills.slice(0, 5).map((s, i) => {
            const isMatch = matchedSkills.some((ms) =>
              s.toLowerCase().includes(ms.toLowerCase())
            );
            return (
              <span key={i} className={`pc-skill${isMatch ? " matched" : ""}`}>
                {s}
              </span>
            );
          })}
        </div>
      </div>
      <div className="pc-footer">
        <div className="pc-meta">
          <span className="pc-meta-item">
            <span className="material-icons-round" style={{ color: "var(--cyan)" }}>folder_copy</span>
            {p.projects}
          </span>
          <span className="pc-meta-item">
            <span className="material-icons-round" style={{ color: "var(--yellow)" }}>star</span>
            {p.stars}
          </span>
          <span className="pc-meta-item">
            <span className="material-icons-round" style={{ color: "var(--violet)" }}>person_add</span>
            {p.followers}
          </span>
        </div>
        <button className="pc-open">
          View <span className="material-icons-round">arrow_forward</span>
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   PROJECT CARD
══════════════════════════════════════════════════ */
function ProjectCard({ project, index, onToast }) {
  const pr = project;
  return (
    <div
      className="proj-card"
      style={{ animationDelay: `${index * 0.05}s` }}
      onClick={() => onToast(`Opening "${pr.name}"…`, "info", "open_in_new")}
    >
      <div className="proj-card-bar" style={{ background: pr.color }}></div>
      <div className="proj-card-banner" style={{ background: pr.color + "15" }}>
        <div className="proj-card-banner-bg" style={{ background: pr.color + "15" }}></div>
        <div
          className="proj-card-banner-pat"
          style={{ "--pc-dot": pr.color + "25" }}
        ></div>
        <div
          className="proj-card-icon"
          style={{ background: pr.color + "20", borderColor: pr.color + "33" }}
        >
          <span className="material-icons-round" style={{ color: pr.color, fontSize: 18 }}>
            {pr.icon}
          </span>
        </div>
      </div>
      <div className="proj-card-body">
        <div className="proj-card-name">{pr.name}</div>
        <div className="proj-card-desc">{pr.desc}</div>
      </div>
      <div className="proj-card-footer">
        <span className="proj-card-domain">
          <span className="material-icons-round">{pr.icon}</span>
          {pr.domain}
        </span>
        <div className="proj-card-meta">
          <span className="proj-card-stat">
            <span className="material-icons-round" style={{ color: "var(--yellow)" }}>star</span>
            {pr.stars}
          </span>
          <span className="proj-card-stat">
            <span className="material-icons-round" style={{ color: "var(--cyan)" }}>insert_drive_file</span>
            {pr.files}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════ */
export default function SkillShare() {
  /* ── state ── */
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [searchText,     setSearchText]     = useState("");
  const [results,        setResults]        = useState(null);   // null = not searched yet
  const [searchQuery,    setSearchQuery]    = useState("");
  const [currentProfile, setCurrentProfile] = useState(null);  // null = search view
  const [projFilter,     setProjFilter]     = useState("all");
  const [inviteSent,     setInviteSent]     = useState(false);
  const [toasts,         setToasts]         = useState([]);
  const resultsRef = useRef(null);
  const [user, setUser] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);

  /* ── toast helper ── */
  const showToast = useCallback((msg, type = "info", icon = "info", duration = 3200) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, msg, type, icon }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), duration);
  }, []);

  /* ── skill chip toggle ── */
  function toggleSkill(skill) {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  }

  /* ── remove a tag from the search bar ── */
  function removeTag(skill) {
    setSelectedSkills((prev) => prev.filter((s) => s !== skill));
  }

  /* ── search ── */
  function doSearch() {
    const textTokens = searchText
      .toLowerCase()
      .split(/[\s,]+/)
      .filter(Boolean);
    const allSkills = [...selectedSkills];
    textTokens.forEach((tok) => {
      if (!allSkills.map((s) => s.toLowerCase()).includes(tok)) allSkills.push(tok);
    });

    const found = allSkills.length
      ? ALL_PEOPLE.filter((p) =>
          allSkills.some((s) =>
            p.skills.some((ps) => ps.toLowerCase().includes(s.toLowerCase()))
          )
        )
      : ALL_PEOPLE;

    setResults({ list: found, skills: allSkills });
    setSearchQuery(allSkills.length ? allSkills.join(", ") : "all skills");

    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }

  /* ── open profile detail ── */
  function openProfile(p) {
    setCurrentProfile(p);
    setProjFilter("all");
    setInviteSent(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ── back to search ── */
  function showSearchView() {
    setCurrentProfile(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ── invite ── */
  function sendInvite() {
    if (inviteSent) return;
    setInviteSent(true);
    showToast(`Invite sent to ${currentProfile?.name || "user"}!`, "violet", "person_add");
  }

  /* ── filtered projects ── */
  const visibleProjects = currentProfile
    ? projFilter === "all"
      ? currentProfile.projects_list
      : currentProfile.projects_list.filter((pr) => pr.tag === projFilter)
    : [];

   useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:3001/api/auth/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(res.data);
      } catch (err) {
        console.error(err);
        setUser(null); // 🔴 MODIFIED: ensure fallback state (prevents undefined crashes)
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    logout(navigate, setUser, showToast);
  };

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
          <div className="db-topbar-avatar-wrap">
            <div
              className="db-topbar-avatar"
              onClick={() => setOpenMenu(prev => !prev)}
            >
              {user?.profilePhoto ? (
                <img
                  src={user.profilePhoto}
                  alt={user?.fullName || "User"}
                />
              ) : (
                <span className="material-icons-round">person</span>
              )}
            </div>

            {openMenu && (
              <div className="db-dropdown">
                {ACCOUNT_NAV.map(item => (
                  <a key={item.id} href={item.href} className="db-nav-item">
                    <span className="material-icons-round">{item.icon}</span>
                    {item.label}
                  </a>
                ))}

                <div className="db-dropdown-divider" />

                <button
                  className="db-nav-item logout"
                  style={{ color: "var(--red)", marginTop: "4px" }}
                  onClick={handleLogout}
                >
                  <span className="material-icons-round">logout</span>
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* ══════════ SEARCH VIEW ══════════ */}
      {!currentProfile && (
        <div className="search-page">

          {/* Hero */}
          <div className="hero">
            <div className="hero-badge">
              <span className="material-icons-round">hub</span>
              Skill Share
            </div>
            <h1>Find people with the <span>skills you need</span></h1>
            <p>Search by skill, domain or keyword — discover teammates who match your project requirements.</p>
          </div>

          {/* Search Bar */}
          <div className="search-bar-wrap">
            <div className="search-bar">
              <span className="material-icons-round search-bar-icon">search</span>
              <div
                className="search-bar-inner"
                onClick={() => document.getElementById("searchTextInput").focus()}
              >
                {selectedSkills.map((skill) => (
                  <span key={skill} className="search-tag">
                    {skill}
                    <button
                      className="tag-rm"
                      onClick={(e) => { e.stopPropagation(); removeTag(skill); }}
                    >×</button>
                  </span>
                ))}
                <input
                  id="searchTextInput"
                  type="text"
                  placeholder={selectedSkills.length ? "" : "Search skills, e.g. Python, UI/UX…"}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && doSearch()}
                />
              </div>
              <button className="search-btn" onClick={doSearch}>
                <span className="material-icons-round">search</span>Find People
              </button>
            </div>
          </div>

          {/* Skill Categories */}
          <div className="skill-section">
            {SKILL_CATEGORIES.map((cat) => (
              <div key={cat.label}>
                <div className="skill-section-header">
                  <h3>{cat.label}</h3>
                  <div className="skill-section-line"></div>
                </div>
                <div className={`skill-cloud${cat.cat !== "dev" ? ` cat-${cat.cat}` : ""}`}>
                  {cat.skills.map(({ skill, icon }) => (
                    <span
                      key={skill}
                      className={`skill-chip${selectedSkills.includes(skill) ? " selected" : ""}`}
                      onClick={() => toggleSkill(skill)}
                    >
                      <span className="material-icons-round">{icon}</span>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Results */}
          {results !== null && (
            <div className="results-section" ref={resultsRef}>
              <div className="results-header">
                <div>
                  <div style={{ fontSize: ".74rem", color: "var(--muted)", marginBottom: 4 }}>
                    Searching for: {searchQuery}
                  </div>
                  <div className="results-title">Matching Profiles</div>
                </div>
                <span className="results-count">
                  <span className="material-icons-round">person</span>
                  {results.list.length} found
                </span>
              </div>

              {results.list.length === 0 ? (
                <div className="empty-state visible">
                  <div className="empty-icon">
                    <span className="material-icons-round">person_search</span>
                  </div>
                  <h3>No profiles found</h3>
                  <p>Try different skills or broader keywords to discover more teammates.</p>
                </div>
              ) : (
                <div className="profiles-grid">
                  {results.list.map((p, i) => (
                    <ProfileCard
                      key={p.id}
                      person={p}
                      matchedSkills={results.skills}
                      index={i}
                      onClick={openProfile}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ══════════ PROFILE DETAIL VIEW ══════════ */}
      {currentProfile && (
        <div className="profile-page">

          {/* Back row */}
          <div className="profile-back-row">
            <button className="back-btn" onClick={showSearchView}>
              <span className="material-icons-round">arrow_back</span>Back to Results
            </button>
            <div style={{ display: "flex", gap: 8 }}>
              <div
                className="nav-icon-btn"
                onClick={() => showToast("Profile saved!", "success", "bookmark")}
              >
                <span className="material-icons-round">bookmark_border</span>
              </div>
              <div
                className="nav-icon-btn"
                onClick={() => showToast("Link copied", "info", "link")}
              >
                <span className="material-icons-round">share</span>
              </div>
            </div>
          </div>

          <div className="profile-layout">

            {/* LEFT SIDEBAR */}
            <div className="profile-sidebar">
              <div className="sidebar-banner">
                <div
                  className="sidebar-banner-bg"
                  style={{ background: currentProfile.color + "18" }}
                ></div>
                <div
                  className="sidebar-banner-pattern"
                  style={{ "--dot-color": currentProfile.color + "30" }}
                ></div>
              </div>

              <div className="sidebar-body">
                <div style={{ position: "relative", width: 72 }}>
                  <div
                    className="profile-av-wrap"
                    style={{
                      background: currentProfile.color + "22",
                      color: currentProfile.color,
                      borderColor: currentProfile.color + "55",
                    }}
                  >
                    {currentProfile.initials}
                  </div>
                  <div className="profile-av-online"></div>
                </div>

                <div className="profile-full-name">{currentProfile.name}</div>
                <div className="profile-tagline">{currentProfile.tagline}</div>

                <div className="profile-desc-heading">
                  <span className="material-icons-round">person</span>About
                </div>
                <div className="profile-desc">{currentProfile.desc}</div>

                <div className="profile-skills-heading">
                  <span className="material-icons-round">code</span>Skills
                </div>
                <div className="profile-skill-list">
                  {currentProfile.skills.map((s, i) => {
                    const c = SKILL_COLORS[i % SKILL_COLORS.length];
                    return (
                      <span
                        key={s}
                        className="profile-skill-tag"
                        style={{ background: c + "18", borderColor: c + "44", color: c }}
                      >
                        <span className="material-icons-round" style={{ fontSize: 11 }}>code</span>
                        {s}
                      </span>
                    );
                  })}
                </div>

                <div className="profile-links">
                  {currentProfile.links.map((lStr, i) => {
                    const [icon, href] = lStr.split(":");
                    return (
                      <a key={i} className="profile-link" href="#">
                        <span className="material-icons-round">{icon}</span>
                        {href}
                      </a>
                    );
                  })}
                </div>

                <div className="profile-meta-row">
                  <div className="profile-meta-item">
                    <div className="profile-meta-val" style={{ color: "var(--cyan)" }}>{currentProfile.projects}</div>
                    <div className="profile-meta-label">Projects</div>
                  </div>
                  <div className="profile-meta-item">
                    <div className="profile-meta-val" style={{ color: "var(--yellow)" }}>{currentProfile.stars}</div>
                    <div className="profile-meta-label">Stars</div>
                  </div>
                  <div className="profile-meta-item">
                    <div className="profile-meta-val" style={{ color: "var(--violet)" }}>{currentProfile.followers}</div>
                    <div className="profile-meta-label">Followers</div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: PROJECTS */}
            <div className="profile-right">
              <div className="projects-header">
                <h2>
                  <span className="material-icons-round">folder_copy</span>
                  Public Projects
                </h2>
                <div className="proj-filter-row">
                  {["all", "ai", "web", "mobile"].map((tag) => (
                    <button
                      key={tag}
                      className={`proj-filter-btn${projFilter === tag ? " active" : ""}`}
                      onClick={() => setProjFilter(tag)}
                    >
                      {tag === "all" ? "All" : tag === "ai" ? "AI/ML" : tag === "web" ? "Web" : "Mobile"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="proj-grid">
                {visibleProjects.length > 0 ? (
                  visibleProjects.map((pr, i) => (
                    <ProjectCard key={pr.name} project={pr} index={i} onToast={showToast} />
                  ))
                ) : (
                  <div style={{ gridColumn: "1/-1", textAlign: "center", padding: 32, color: "var(--muted)", fontSize: ".85rem" }}>
                    No projects in this category
                  </div>
                )}
              </div>

              {/* Invite */}
              <div className="invite-action-row">
                <button
                  className={`btn-invite-big${inviteSent ? " sent" : ""}`}
                  onClick={sendInvite}
                >
                  <span className="material-icons-round">
                    {inviteSent ? "check_circle" : "person_add"}
                  </span>
                  <span>{inviteSent ? "Invite Sent!" : "Invite to Team"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOASTS */}
      <ToastContainer toasts={toasts} />
    </>
  );
}
