import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ACCOUNT_NAV } from "../constants";
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';
import { logout } from '../utils/auth'
import "./Explore.css";

/* ─── CONSTANTS ─────────────────────────────────────── */
const PAGE_SIZE = 12;

const FILTER_CHIPS = [
  { label: "All",          value: "all" },
  { label: "🌐 Online",    value: "online" },
  { label: "📍 In-Person", value: "offline" },
  { label: "⭐ Featured",  value: "featured" },
  { label: "💰 With Prize",value: "prize" },
  { label: "🤖 AI / ML",  value: "ai" },
  { label: "🌍 Web",       value: "web" },
  { label: "🌱 Beginner",  value: "beginner" },
];

const HARDCODED_HACKATHON = {
  id: "hack01",
  title: "InnovateX National Hackathon 2025",
  organization_name: "NASSCOM Foundation",
  displayed_location: "Hybrid",
  prizeText: "₹5,00,000",
  submission_period_dates: "Apr 25 – May 3, 2026",
  isOpen: "open",
  featured: true,
  time_left_to_submission: "8d 5h",
  themes: [
    { name: "HealthTech" },
    { name: "FinTech" },
    { name: "EdTech" },
    { name: "Sustainability" },
  ],
};

/* ─── HELPERS ───────────────────────────────────────── */
function parsePrize(text) {
  if (!text) return 0;
  const cleaned = text.replace(/<[^>]*>/g, "").replace(/[$,]/g, "").trim();
  return parseInt(cleaned) || 0;
}

function formatPrize(text) {
  const val = parsePrize(text);
  if (val === 0) return null;
  if (val >= 1000) return "$" + (val / 1000).toFixed(val % 1000 === 0 ? 0 : 1) + "K";
  return "$" + val.toLocaleString();
}

function getInitials(title) {
  return (title || "?")
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function getThumbUrl(url) {
  if (!url) return null;
  return url.startsWith("//") ? "https:" + url : url;
}

/* ─── HACKATHON CARD ────────────────────────────────── */
function HackathonCard({ hackathon, index }) {
  const h = hackathon;
  const isOnline = h.displayed_location?.toLowerCase().includes("online");
  const prize    = formatPrize(h.prizeText);
  const initials = getInitials(h.title);
  const thumbUrl = getThumbUrl(h.thumbnail_url);
  const themes   = (h.themes || []).slice(0, 3);
  const delay    = (index % PAGE_SIZE) * 0.04 + "s";

  const [imgError, setImgError] = useState(false);

  return (
<Link
  to={`/events/${h.id}`}
  style={{ animationDelay: delay }}
  className="hcard"
>
  {/* THUMBNAIL */}
  <div className="hcard-thumb">
    {thumbUrl && !imgError ? (
      <img
        src={thumbUrl}
        alt={h.title}
        loading="lazy"
        onError={() => setImgError(true)}
      />
    ) : (
      <div className="thumb-fallback">{initials}</div>
    )}

    <div className="hcard-badges">
      {h.isOpen === "open" && <span className="badge badge-open">Open</span>}
      {h.featured && <span className="badge badge-featured">⭐ Featured</span>}
      {isOnline
        ? <span className="badge badge-online">Online</span>
        : <span className="badge badge-offline">In-Person</span>
      }
    </div>

    {h.time_left_to_submission && (
      <div className="time-left-pill">
        <span className="material-icons-round">schedule</span>
        {h.time_left_to_submission}
      </div>
    )}
  </div>

  {/* BODY */}
  <div className="hcard-body">
    <div className="hcard-org">{h.organization_name || "Unknown Org"}</div>
    <div className="hcard-title">{h.title}</div>

    <div className="hcard-meta">
      {h.displayed_location && (
        <span className="hcard-meta-item">
          <span className="material-icons-round">
            {isOnline ? "language" : "location_on"}
          </span>
          {h.displayed_location}
        </span>
      )}
      {h.submission_period_dates && (
        <span className="hcard-meta-item">
          <span className="material-icons-round">calendar_today</span>
          {h.submission_period_dates}
        </span>
      )}
      {h.registrations_count && (
        <span className="hcard-meta-item">
          <span className="material-icons-round">group</span>
          {h.registrations_count} registered
        </span>
      )}
    </div>

    {themes.length > 0 && (
      <div className="hcard-themes">
        {themes.map((t, i) => (
          <span key={i} className="theme-chip">{t.name}</span>
        ))}
      </div>
    )}

    <div className="hcard-footer">
      <div className="prize-block">
        <span className="prize-label">Prize Pool</span>
        {prize
          ? <span className="prize-value">{prize}</span>
          : <span className="prize-value no-prize">No prize listed</span>
        }
      </div>
      <span className="hcard-cta">
        View Details
        <span className="material-icons-round">arrow_forward</span>
      </span>
    </div>
  </div>
</Link>
  );
}

/* ─── SKELETON ──────────────────────────────────────── */
function SkeletonCard() {
  return (
    <div className="skeleton">
      <div className="skel-thumb"></div>
      <div className="skel-body">
        <div className="skel-line short"></div>
        <div className="skel-line medium"></div>
        <div className="skel-line"></div>
        <div className="skel-line short"></div>
      </div>
    </div>
  );
}

/* ─── TOAST ─────────────────────────────────────────── */
function ToastContainer({ toasts }) {
  return (
    <div id="toastContainer">
      {toasts.map((t) => (
        <div key={t.id} className={`toast ${t.type}`}>
          <span className="material-icons-round">{t.icon}</span>
          {t.message}
        </div>
      ))}
    </div>
  );
}

/* ─── MAIN COMPONENT ────────────────────────────────── */
export default function Explore() {
  const [user, setUser] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [allHackathons, setAllHackathons] = useState([]);
  const [filtered,      setFiltered]      = useState([]);
  const [currentFilter, setCurrentFilter] = useState("all");
  const [currentSearch, setCurrentSearch] = useState("");
  const [currentSort,   setCurrentSort]   = useState("default");
  const [isListView,    setIsListView]     = useState(false);
  const [page,          setPage]           = useState(1);
  const [loading,       setLoading]        = useState(true);
  const [error,         setError]          = useState(false);
  const [toasts,        setToasts]         = useState([]);
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    total: "—", online: "—", offline: "—", featured: "—",
  });

  const searchTimer = useRef(null);

  /* ── TOAST HELPER ── */
  const showToast = useCallback((message, type = "info", icon = "info", duration = 3200) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type, icon }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  /* ── FETCH ── */
  // useEffect(() => {
  //   async function fetchHackathons() {
  //     try {
  //       const res  = await fetch("https://webdevharsha.github.io/open-hackathons-api/data.json");
  //       if (!res.ok) throw new Error("API error");
  //       const data = await res.json();
  //       const list = (data.hackathons || []).filter(
  //         (h) => h.title && h.title.trim() !== "------------"
  //       );

  //       setAllHackathons(list);
  //       setStats({
  //         total:    list.length,
  //         online:   list.filter((h) => h.displayed_location?.toLowerCase().includes("online")).length,
  //         offline:  list.filter((h) => !h.displayed_location?.toLowerCase().includes("online")).length,
  //         featured: list.filter((h) => h.featured).length,
  //       });
  //       setLoading(false);
  //     } catch (err) {
  //       setLoading(false);
  //       setError(true);
  //       showToast("Failed to load hackathons", "error", "error");
  //     }
  //   }
  //   fetchHackathons();
  // }, [showToast]);
  // Fetch User
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

useEffect(() => {
  async function fetchHackathons() {
    try {
      const res  = await fetch("https://webdevharsha.github.io/open-hackathons-api/data.json");
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      const list = (data.hackathons || []).filter(
        (h) => h.title && h.title.trim() !== "------------"
      );

      // <<< ADD HARDCODED HACKATHON HERE >>>
      const updatedList = [HARDCODED_HACKATHON, ...list];

      setAllHackathons(updatedList);
      setStats({
        total:    updatedList.length,
        online:   updatedList.filter((h) => h.displayed_location?.toLowerCase().includes("online")).length,
        offline:  updatedList.filter((h) => !h.displayed_location?.toLowerCase().includes("online")).length,
        featured: updatedList.filter((h) => h.featured).length,
      });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(true);
      showToast("Failed to load hackathons", "error", "error");
    }
  }
  fetchHackathons();
}, [showToast]);
  /* ── APPLY FILTERS ── */
  useEffect(() => {
    let result = [...allHackathons];

    if (currentFilter === "online")   result = result.filter((h) => h.displayed_location?.toLowerCase().includes("online"));
    if (currentFilter === "offline")  result = result.filter((h) => !h.displayed_location?.toLowerCase().includes("online"));
    if (currentFilter === "featured") result = result.filter((h) => h.featured);
    if (currentFilter === "prize")    result = result.filter((h) => parsePrize(h.prizeText) > 0);
    if (currentFilter === "ai")       result = result.filter((h) => h.themes?.some((t) => t.name.toLowerCase().includes("machine learning") || t.name.toLowerCase().includes("ai")));
    if (currentFilter === "web")      result = result.filter((h) => h.themes?.some((t) => t.name.toLowerCase() === "web"));
    if (currentFilter === "beginner") result = result.filter((h) => h.themes?.some((t) => t.name.toLowerCase().includes("beginner")));

    if (currentSearch) {
      const q = currentSearch.toLowerCase();
      result = result.filter((h) =>
        h.title?.toLowerCase().includes(q) ||
        h.organization_name?.toLowerCase().includes(q) ||
        h.themes?.some((t) => t.name.toLowerCase().includes(q)) ||
        h.displayed_location?.toLowerCase().includes(q)
      );
    }

    if (currentSort === "prize")         result.sort((a, b) => parsePrize(b.prizeText) - parsePrize(a.prizeText));
    if (currentSort === "registrations") result.sort((a, b) => (b.registrations_count || 0) - (a.registrations_count || 0));

    setFiltered(result);
    setPage(1);
  }, [allHackathons, currentFilter, currentSearch, currentSort]);

  /* ── DERIVED ── */
  const slice         = filtered.slice(0, page * PAGE_SIZE);
  const hasMore       = filtered.length > slice.length;

  /* ── SEARCH DEBOUNCE ── */
  function handleSearchInput(e) {
    clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => {
      setCurrentSearch(e.target.value.trim());
    }, 280);
  }

  /* ── LOAD MORE ── */
  function handleLoadMore() {
    setPage((p) => p + 1);
  }

  const handleLogout = () => {
    logout(navigate, setUser, showToast);
  };

  if (!user) return (
  <div style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",       // full viewport height
    width: "100vw",        // full viewport width
    background: "var(--bg)" // optional, match your dashboard background
  }}>
    <ThreeDots
      visible={true}
      height="80"
      width="80"
      color="#53CBF3"
      radius="9"
      ariaLabel="three-dots-loading"
    />
  </div>
);

  /* ─────────────────────────────────────────────────── */
  return (
    <>
      {/* BG */}
      <div className="bg-grid"></div>
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>

      {/* NAVBAR */}
      <nav className="navbar">
        <a href="#" className="logo">
          <span className="material-icons-round logo-icon">hub</span>
          Team<span className="logo-accent">Up</span>
        </a>
        <ul className="nav-links">
          <li><a href="#">Home</a></li>
          <li><a href="#" className="active">Explore</a></li>
          <li><a href="#">Teams</a></li>
          <li><a href="#">Projects</a></li>
        </ul>
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
            onClick={() => navigate('/notifications')}
          >
            <span className="material-icons-round">notifications_none</span>
            <div className="db-notif-dot" />
          </div>

          {/* Avatar → profile */}
          <div className="db-topbar-avatar-wrap">
            <div
              className="db-topbar-avatar"
              onClick={() => setOpenMenu(prev => !prev)}
            >
              {user.profilePhoto
                ? <img src={user.profilePhoto} alt={user.fullName} />
                : <span className="material-icons-round">person</span>
              }
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

      {/* MAIN */}
      <main className="main-wrapper">

        {/* HERO */}
        <section className="hero">
          <div className="hero-badge">
            <span className="dot"></span>
            Live Hackathons
          </div>
          <h1>Find Your Next<br /><span>Big Challenge</span></h1>
          <p>Discover upcoming hackathons, find your dream team, and build something extraordinary together.</p>
        </section>

        {/* STATS */}
        <div className="stats-row">
          <div className="stat-item">
            <div className="stat-number">{stats.total}</div>
            <div className="stat-label">Total Hackathons</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{stats.online}</div>
            <div className="stat-label">Online</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{stats.offline}</div>
            <div className="stat-label">In-Person</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{stats.featured}</div>
            <div className="stat-label">Featured</div>
          </div>
        </div>

        {/* CONTROLS */}
        <div className="controls">
          <div className="search-row">
            <div className="search-wrap">
              <span className="material-icons-round">search</span>
              <input
                type="text"
                placeholder="Search hackathons, themes, organizations…"
                onChange={handleSearchInput}
              />
            </div>
            <div className="select-wrap">
              <select value={currentSort} onChange={(e) => setCurrentSort(e.target.value)}>
                <option value="default">Sort: Default</option>
                <option value="prize">Highest Prize</option>
                <option value="registrations">Most Registered</option>
                <option value="deadline">Deadline Soon</option>
              </select>
            </div>
          </div>

          <div className="filter-row">
            <span className="filter-label">Filter:</span>
            {FILTER_CHIPS.map((chip) => (
              <button
                key={chip.value}
                className={`chip${currentFilter === chip.value ? " active" : ""}`}
                onClick={() => setCurrentFilter(chip.value)}
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>

        {/* RESULTS META */}
        <div className="results-meta">
          <div className="results-count">
            {loading
              ? "Loading hackathons…"
              : <>Showing <strong>{slice.length}</strong> of <strong>{filtered.length}</strong> hackathons</>
            }
          </div>
          <div className="view-toggle">
            <button
              className={`view-btn${!isListView ? " active" : ""}`}
              title="Grid view"
              onClick={() => setIsListView(false)}
            >
              <span className="material-icons-round">grid_view</span>
            </button>
            <button
              className={`view-btn${isListView ? " active" : ""}`}
              title="List view"
              onClick={() => setIsListView(true)}
            >
              <span className="material-icons-round">view_list</span>
            </button>
          </div>
        </div>

        {/* GRID */}
        <div id="hackathonsGrid" className={isListView ? "list-view" : ""}>
          {loading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : error ? (
            <div className="empty-state">
              <span className="material-icons-round">wifi_off</span>
              <h3>Couldn't load hackathons</h3>
              <p>Please check your connection and try again.</p>
            </div>
          ) : slice.length === 0 ? (
            <div className="empty-state">
              <span className="material-icons-round">search_off</span>
              <h3>No hackathons found</h3>
              <p>Try a different filter or search term.</p>
            </div>
          ) : (
            slice.map((h, i) => (
              <HackathonCard key={h.id || h.url || i} hackathon={h} index={i} />
            ))
          )}
        </div>

        {/* LOAD MORE */}
        {hasMore && !loading && (
          <div className="load-more-wrap">
            <button id="loadMoreBtn" onClick={handleLoadMore}>
              <span className="material-icons-round">expand_more</span>
              Load More Hackathons
            </button>
          </div>
        )}

      </main>

      {/* TOAST */}
      <ToastContainer toasts={toasts} />
    </>
  );
}
