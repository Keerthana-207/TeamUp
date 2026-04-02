import React from 'react';
import './NotFound.css';

const quickLinks = [
  { href: '/',         icon: 'home',         label: 'Home' },
  { href: '/explore',  icon: 'explore',      label: 'Explore Teams' },
  { href: '/register', icon: 'person_add',   label: 'Register' },
  { href: '/login',    icon: 'login',        label: 'Sign In' },
  { href: '/help',     icon: 'help_outline', label: 'Help Center' },
];

export default function NotFound() {
  const handleGoBack = (e) => {
    e.preventDefault();
    window.history.back();
  };

  return (
    <>
      {/* Background FX */}
      <div className="bg-grid" />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <div className="page-wrapper">

        {/* Logo */}
        <header className="site-header">
          <a href="/" className="logo">
            <span className="material-icons-round logo-icon">diversity_3</span>
            Team<span className="logo-accent">Up</span>
          </a>
          <p className="tagline">Find your team · Build something great</p>
        </header>

        {/* Card */}
        <main className="card">

          {/* Orbit Icon */}
          <div className="icon-orbit">
            <div className="orbit-ring">
              <div className="orbit-dot" />
            </div>
            <div className="orbit-center">
              <span className="material-icons-round orbit-icon">search_off</span>
            </div>
          </div>

          {/* 404 Glitch */}
          <div className="error-code-wrap">
            <div className="error-code">404</div>
          </div>

          {/* Badge */}
          <div className="error-label">
            <span className="material-icons-round">error_outline</span>
            Page not found
          </div>

          {/* Title & Description */}
          <h1 className="error-title">Looks like this page got lost</h1>
          <p className="error-desc">
            The URL <code>/this-page</code> doesn't exist or has been moved.
            Maybe it was deleted, or you followed a broken link.
          </p>

          <div className="divider" />

          {/* Quick Links */}
          <div className="suggestions">
            <p className="suggestions-label">Quick links</p>
            <div className="suggestion-links">
              {quickLinks.map(({ href, icon, label }) => (
                <a key={href} href={href} className="suggestion-link">
                  <span className="material-icons-round">{icon}</span>
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="btn-row">
            <a href="/" className="btn-home">
              <span className="material-icons-round btn-icon">home</span>
              Back to Home
            </a>
            <a href="#back" className="btn-back" onClick={handleGoBack}>
              <span className="material-icons-round btn-icon">arrow_back</span>
              Go back
            </a>
          </div>

        </main>

        {/* Footer Note */}
        <p className="footer-note">
          Think this is a mistake?{' '}
          <a href="/contact">Contact support</a> and we'll look into it.
        </p>

      </div>
    </>
  );
}
