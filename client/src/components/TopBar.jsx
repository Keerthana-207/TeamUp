import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ACCOUNT_NAV } from "../constants";
import './TopBar.css'

const TopBar = ({ user, showToast, showGreeting = true }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();

  if (!user) return null; // ✅ prevent crash

  const firstName = user.fullName?.split(" ")[0] || "User";
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" :
    hour < 17 ? "Good afternoon" :
    "Good evening";

  const handleLogout = () => {
    localStorage.removeItem("token");
    showToast?.("Logged out successfully", "success", "logout");
    navigate("/login");
  }

  return (
    <header className="db-topbar">
      <a href="/" className="db-topbar-logo">
        <span className="material-icons-round db-logo-icon">bolt</span>
        Team<span className="db-logo-accent">Up</span>
      </a>

      <div className="db-topbar-divider" />
        <span
          className="db-topbar-greeting"
          style={{ visibility: showGreeting ? "visible" : "hidden" }}
        >
          {greeting}, <strong>{firstName}</strong> 👋
        </span>


      <div className="db-topbar-right">
        {/* Search */}
        <div
          className="db-icon-btn"
          title="Search"
          onClick={() => showToast?.("Search coming soon!", "info", "search")}
        >
          <span className="material-icons-round">search</span>
        </div>

        {/* Notifications */}
        <div
          className="db-icon-btn"
          title="Notifications"
          onClick={() => navigate("/notifications")}
        >
          <span className="material-icons-round">notifications_none</span>
          {user.notifications?.length > 0 && (
            <div className="db-notif-dot" />
          )}
        </div>

        {/* Avatar */}
        <div className="db-topbar-avatar-wrap">
          <div
            className="db-topbar-avatar"
            onClick={() => setOpenMenu(prev => !prev)}
          >
            {user.profilePhoto ? (
              <img src={user.profilePhoto} alt={user.fullName} />
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
    </header>
  );
};

export default TopBar;