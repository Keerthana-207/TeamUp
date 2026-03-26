import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

/* ─────────────────────────────────────────────────────────────
   Toast helper
───────────────────────────────────────────────────────────── */
function Toast({ toasts }) {
  return (
    <div className="login-toast-container">
      {toasts.map((t) => (
        <div key={t.id} className={`login-toast ${t.type}`}>
          <span className="material-icons-round">{t.icon}</span>
          {t.message}
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Login Page
───────────────────────────────────────────────────────────── */
export default function Login() {
  // Form state
  const [email, setEmail]         = useState("");
  const [password, setPassword]   = useState("");
  const [remember, setRemember]   = useState(false);
  const [showPw, setShowPw]       = useState(false);
  const [loading, setLoading]     = useState(false);
  const navigate = useNavigate();

  // Field errors
  const [errors, setErrors] = useState({ email: "", password: "" });

  // Toast notifications
  const [toasts, setToasts] = useState([]);
  const toastId = useRef(0);

  function showToast(message, type = "info", icon = "info", duration = 3200) {
    const id = ++toastId.current;
    setToasts((prev) => [...prev, { id, message, type, icon }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }

  // ── Validation ─────────────────────────────────────────────
  function validate() {
    const newErrors = { email: "", password: "" };
    let valid = true;

    if (!email.trim()) {
      newErrors.email = "Email is required.";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email address.";
      valid = false;
    }

    if (!password) {
      newErrors.password = "Password is required.";
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  }

  // ── Submit ──────────────────────────────────────────────────
  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      // ── Swap fakeLogin with your real API call ──────────────
      // await fetch("/api/login", { method:"POST", body: JSON.stringify({email, password}) })
      const res = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      // Save token (IMPORTANT)
      localStorage.setItem("token", data.token);

      showToast("Welcome back! Redirecting…", "success", "celebration");
      navigate("/dashboard");
    } catch (err) {
      showToast(err.message || "Login failed. Please try again.", "error", "error");
    } finally {
      setLoading(false);
    }
  }

  // // ── Fake async login (replace with real call) ───────────────
  // function fakeLogin(payload) {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       Math.random() < 0.9
  //         ? resolve({ token: "tok_demo" })
  //         : reject(new Error("Invalid credentials. Please try again."));
  //     }, 1600);
  //   });
  // }

  return (
    <>
      {/* ── Background Effects ──────────────────────────────── */}
      <div className="login-bg-grid" />
      <div className="login-orb login-orb-1" />
      <div className="login-orb login-orb-2" />
      <div className="login-orb login-orb-3" />

      {/* ── Page Wrapper ────────────────────────────────────── */}
      <div className="login-page-wrapper">

        {/* ── Logo / Header ─────────────────────────────────── */}
        <header className="login-site-header">
          <a href="/" className="login-logo">
            <span className="material-icons-round login-logo-icon">bolt</span>
            <span>Team<span className="login-logo-accent">Up</span></span>
          </a>
          <p className="login-tagline">Build. Connect. Launch.</p>
        </header>

        {/* ── Card ──────────────────────────────────────────── */}
        <div className="login-card">

          {/* Card Header */}
          <div className="login-card-header">
            <div className="login-hero-icon">
              <span className="material-icons-round">lock_open</span>
            </div>
            <h2>Welcome back</h2>
            <p>Sign in to continue to your TeamUp dashboard.</p>
          </div>

          {/* ── Form ────────────────────────────────────────── */}
          <form onSubmit={handleSubmit} noValidate>

            {/* Email */}
            <div className="login-field-group">
              <label className="login-label" htmlFor="login-email">
                <span className="material-icons-round login-label-icon">alternate_email</span>
                Email address
              </label>
              <div className={`login-input-wrap${errors.email ? " input-error" : ""}`}>
                <span className="material-icons-round login-input-icon">mail_outline</span>
                <input
                  id="login-email"
                  type="email"
                  placeholder="you@university.edu"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
                  }}
                  autoComplete="email"
                  disabled={loading}
                />
              </div>
              {errors.email && (
                <span className="login-error-msg">
                  <span className="material-icons-round">error_outline</span>
                  {errors.email}
                </span>
              )}
            </div>

            {/* Password */}
            <div className="login-field-group">
              <label className="login-label" htmlFor="login-password">
                <span className="material-icons-round login-label-icon">vpn_key</span>
                Password
              </label>
              <div className={`login-input-wrap${errors.password ? " input-error" : ""}`}>
                <span className="material-icons-round login-input-icon">lock_outline</span>
                <input
                  id="login-password"
                  type={showPw ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors((prev) => ({ ...prev, password: "" }));
                  }}
                  autoComplete="current-password"
                  disabled={loading}
                />
                <button
                  type="button"
                  className="login-toggle-pw"
                  onClick={() => setShowPw((v) => !v)}
                  aria-label={showPw ? "Hide password" : "Show password"}
                >
                  <span className="material-icons-round">
                    {showPw ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
              {errors.password && (
                <span className="login-error-msg">
                  <span className="material-icons-round">error_outline</span>
                  {errors.password}
                </span>
              )}
            </div>

            {/* Remember me + Forgot password */}
            <div className="login-meta-row">
              <label className="login-checkbox-label">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  disabled={loading}
                />
                <span className="login-custom-check">
                  <span className="material-icons-round login-check-icon">check</span>
                </span>
                Remember me
              </label>
              <a href="/forgot-password" className="login-forgot-link">
                Forgot password?
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="login-btn-submit"
              disabled={loading}
            >
              {loading ? (
                <span className="login-loader" />
              ) : (
                <>
                  Sign in
                  <span className="material-icons-round login-btn-arrow">arrow_forward</span>
                </>
              )}
            </button>
          </form>

          {/* ── Divider ───────────────────────────────────────── */}
          <div className="login-divider">
            <div className="login-divider-line" />
            <span className="login-divider-text">or continue with</span>
            <div className="login-divider-line" />
          </div>

          {/* ── Social Buttons ────────────────────────────────── */}
          <div className="login-social-row">
            <button
              type="button"
              className="login-social-btn"
              onClick={() => showToast("Google login coming soon", "info", "info")}
            >
              {/* Google icon */}
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M43.6 24.5c0-1.5-.1-2.9-.4-4.3H24v8.1h11c-.5 2.5-1.9 4.6-4 6v5h6.5c3.8-3.5 6.1-8.7 6.1-14.8z" fill="#4285F4"/>
                <path d="M24 44c5.5 0 10.1-1.8 13.5-4.9l-6.5-5c-1.8 1.2-4.1 1.9-7 1.9-5.4 0-9.9-3.6-11.5-8.5H5.7v5.2C9.1 39.1 16 44 24 44z" fill="#34A853"/>
                <path d="M12.5 27.5A11.9 11.9 0 0 1 12 24c0-1.2.2-2.4.5-3.5V15.3H5.7A20 20 0 0 0 4 24c0 3.2.8 6.2 2.1 8.8l6.4-5.3z" fill="#FBBC05"/>
                <path d="M24 12c3 0 5.7 1 7.8 3L37 9.8C33.6 6.7 29 4.9 24 4.9 16 4.9 9.1 9.8 5.7 15.2l6.8 5.3C14.1 15.6 18.6 12 24 12z" fill="#EA4335"/>
              </svg>
              Google
            </button>

            <button
              type="button"
              className="login-social-btn"
              onClick={() => showToast("GitHub login coming soon", "info", "info")}
            >
              {/* GitHub icon */}
              <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85 0 1.71.11 2.51.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10z"/>
              </svg>
              GitHub
            </button>
          </div>

        </div>

        {/* ── Footer ────────────────────────────────────────── */}
        <p className="login-footer-link">
          Don't have an account?&nbsp;
          <Link to="/register">Create one — it's free</Link>
        </p>

      </div>

      {/* ── Toasts ────────────────────────────────────────────── */}
      <Toast toasts={toasts} />
    </>
  );
}
