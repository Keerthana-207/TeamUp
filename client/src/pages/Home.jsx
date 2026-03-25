import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

const Home = () => {
useEffect(() => {

  // ── STICKY NAV ──
  const handleScroll = () => {
    const nav = document.getElementById('nav');
    if (nav) {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    }
  };
  window.addEventListener('scroll', handleScroll);

  // ── SCROLL REVEAL ──
  const revealEls = document.querySelectorAll(
    '.reveal, .step-item, .feature-row, .dashboard-mock'
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => observer.observe(el));

  // ── AURORA CANVAS ──
  const canvas = document.getElementById('auroraCanvas');
  let animationFrame;

  if (canvas) {
    const ctx = canvas.getContext('2d');
    let W, H, t = 0;

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      W = canvas.width = rect.width;
      H = canvas.height = rect.height;
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = (ts) => {
      t = ts * 0.001;
      ctx.clearRect(0, 0, W, H);

      ctx.beginPath();
      ctx.arc(W/2, H/2, 100, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(99,218,255,0.2)';
      ctx.fill();

      animationFrame = requestAnimationFrame(draw);
    };

    animationFrame = requestAnimationFrame(draw);
  }

  // ── CONNECTION LINES ──
  const svg = document.getElementById('connectLines');

  const updateLines = () => {
    if (!svg || !svg.parentElement) return;

    const W = svg.parentElement.offsetWidth;
    const H = svg.parentElement.offsetHeight;

    svg.innerHTML = '';

    const coords = [
      [0.1, 0.1],
      [0.9, 0.1],
      [0.2, 0.8],
      [0.8, 0.8],
    ];

    coords.forEach(([x, y]) => {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', x * W);
      line.setAttribute('y1', y * H);
      line.setAttribute('x2', W / 2);
      line.setAttribute('y2', H / 2);
      line.setAttribute('stroke', '#63daff');
      svg.appendChild(line);
    });
  };

  updateLines();
  window.addEventListener('resize', updateLines);

  // ── MOUSE PARALLAX ──
  const handleMouseMove = (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;

    const orb1 = document.querySelector('.orb-1');
    const orb2 = document.querySelector('.orb-2');
    const orb3 = document.querySelector('.orb-3');

    if (orb1) orb1.style.transform = `translate(${x * 0.6}px, ${y * 0.6}px)`;
    if (orb2) orb2.style.transform = `translate(${-x * 0.4}px, ${-y * 0.4}px)`;
    if (orb3) orb3.style.transform = `translate(${x * 0.8}px, ${y * 0.8}px)`;
  };

  document.addEventListener('mousemove', handleMouseMove);

  // ── CLEANUP (ONE RETURN ONLY) ──
  return () => {
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('resize', updateLines);
    document.removeEventListener('mousemove', handleMouseMove);
    observer.disconnect();
    cancelAnimationFrame(animationFrame);
  };

}, []);
  return (
    <div>
        <div className="bg-grid"></div>
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>

        <nav id="nav">
        <a href="#" className="logo">
            <span className="material-icons-round logo-icon">hub</span>
            Team<span>Up</span>
        </a>
        <div className="nav-links">
            <a href="#how">How it works</a>
            <a href="#features">Features</a>
            <a href="#about">About</a>
        </div>
        <div className="nav-cta">
            <Link to='/login' className="btn-ghost">Sign in</Link>
            <Link to='/register' className="btn-primary">Get started</Link>
        </div>
        </nav>
        <section className="hero">
        <div className="hero-spotlight"></div>
        <div className="hero-badge">
            <div className="hero-badge-dot"></div>
            Now in early access — join the waitlist
        </div>

        <h1 className="hero-title">
        <span className="line">Find your</span>
        <span className="line accent">perfect team.</span>
        <span className="line">Build something&nbsp;real.</span>
        </h1>

        <p className="hero-sub">
            TeamUp matches students and makers by skills, interests, and ambitions — so you spend less time searching, and more time shipping.
        </p>

        <div className="hero-actions">
            <Link to='/register' className="btn-primary btn-large">Create your profile</Link>
            <a href="#" className="btn-ghost btn-large">See how it works</a>
        </div>

        <div className="hero-visual">
            <canvas id="auroraCanvas"></canvas>
            <svg id="connectLines"></svg>

            <div className="orbit-chip chip-1">
            <div className="chip-dot cyan"></div>
            <span className="chip-label">UI Design</span>
            <span className="chip-sub">· Figma</span>
            </div>

            <div className="orbit-chip chip-2">
            <div className="chip-dot violet"></div>
            <span className="chip-label">ML Engineer</span>
            <span className="chip-sub">· PyTorch</span>
            </div>

            <div className="orbit-chip chip-3">
            <div className="chip-dot yellow"></div>
            <span className="chip-label">Product</span>
            <span className="chip-sub">· Strategy</span>
            </div>

            <div className="orbit-chip chip-4">
            <div className="chip-dot violet"></div>
            <span className="chip-label">Backend Dev</span>
            <span className="chip-sub">· Go · Rust</span>
            </div>

            <div className="orbit-chip chip-5 chip-match">
            <span className="material-icons-round" style={{fontSize:'16px',color:'var(--green)'}}>check_circle</span>
            <span className="chip-label">Team matched</span>
            <div className="match-pct">94%</div>
            </div>
        </div>
        </section>
        <section className="section" id="how">
        <div className="reveal">
            <div className="section-label">How it works</div>
            <h2 className="section-title">From profile to<br />project in minutes</h2>
        </div>

        <div className="steps-grid">
            <div className="step-item">
            <div className="step-num">01</div>
            <div className="step-icon-wrap">
                <span className="material-icons-round">person_outline</span>
            </div>
            <h3>Build your profile</h3>
            <p>List your skills, interests, and what you're looking to build. Takes under two minutes.</p>
            </div>
            <div className="step-item">
            <div className="step-num">02</div>
            <div className="step-icon-wrap" style={{background:'rgba(167,139,250,0.08)',borderColor:'rgba(167,139,250,0.15)',color:'var(--violet)'}}>
                <span className="material-icons-round">auto_awesome</span>
            </div>
            <h3>Get smart matches</h3>
            <p>Our algorithm surfaces teammates whose skills complement yours — not just who's nearby.</p>
            </div>
            <div className="step-item">
            <div className="step-num">03</div>
            <div className="step-icon-wrap" style={{background:'rgba(52,211,153,0.08)',borderColor:'rgba(52,211,153,0.15)',color:'var(--green)'}}>
                <span className="material-icons-round">rocket_launch</span>
            </div>
            <h3>Ship together</h3>
            <p>Connect, align on goals, and get building. No awkward cold DMs, no missed opportunities.</p>
            </div>
        </div>
        </section>
        <div className="features-section" id="features">
        <div className="features-inner">
            <div>
            <div className="reveal">
                <div className="section-label">Why TeamUp</div>
                <h2 className="section-title">Everything you need to find the right people</h2>
            </div>
            <div className="features-list">
                <div className="feature-row">
                <div className="feature-icon fi-cyan">
                    <span className="material-icons-round" style={{fontSize:'18px'}}>psychology</span>
                </div>
                <div className="feature-text">
                    <h4>Skill-based matching</h4>
                    <p>We go beyond keywords. TeamUp understands what skills complement each other for real projects.</p>
                </div>
                </div>
                <div className="feature-row">
                <div className="feature-icon fi-violet">
                    <span className="material-icons-round" style={{fontSize:'18px'}}>school</span>
                </div>
                <div className="feature-text">
                    <h4>College-aware network</h4>
                    <p>Filter by college, department, or year — find people in your cohort or across campuses.</p>
                </div>
                </div>
                <div className="feature-row">
                <div className="feature-icon fi-green">
                    <span className="material-icons-round" style={{fontSize:'18px'}}>event</span>
                </div>
                <div className="feature-text">
                    <h4>Hackathon-ready</h4>
                    <p>Form teams fast. Browse who's looking for a team, post your project idea, fill gaps instantly.</p>
                </div>
                </div>
                <div className="feature-row">
                <div className="feature-icon fi-yellow">
                    <span className="material-icons-round" style={{fontSize:'18px'}}>link</span>
                </div>
                <div className="feature-text">
                    <h4>Unified social presence</h4>
                    <p>Link GitHub, LinkedIn, and more. Let your work speak before the first message is sent.</p>
                </div>
                </div>
            </div>
            </div>
            <div className="dashboard-mock" id="dashMock">
                <div className="mock-bar">
                    <div className="mock-dot"></div>
                    <div className="mock-dot"></div>
                    <div className="mock-dot"></div>
                    <div className="mock-url">teamup.app/matches</div>
                </div>
                <div className="mock-body">
                    <div className="mock-section-title">Your Matches</div>

                    <div className="mock-card">
                    <div className="mock-avatar">🤖</div>
                    <div className="mock-info">
                        <div className="mock-name">Priya Nair</div>
                        <div className="mock-sub">ML Engineer · PyTorch, HuggingFace</div>
                    </div>
                    <div className="mock-skill g">AI/ML</div>
                    </div>
                    <div className="mock-match-row">
                    <div className="mock-match-bar"><div className="mock-match-fill" style={{width:'94%'}}></div></div>
                    <div className="mock-pct">94%</div>
                    </div>

                    <div className="mock-card" style={{marginTop:'16px'}}>
                    <div className="mock-avatar">🛠️</div>
                    <div className="mock-info">
                        <div className="mock-name">Dev K.</div>
                        <div className="mock-sub">Backend · Go, Rust, Postgres</div>
                    </div>
                    <div className="mock-skill v">Backend</div>
                    </div>
                    <div className="mock-match-row">
                    <div className="mock-match-bar"><div className="mock-match-fill" style={{width:'87%'}}></div></div>
                    <div className="mock-pct">87%</div>
                    </div>

                    <div className="mock-card" style={{marginTop:'16px'}}>
                    <div className="mock-avatar">📊</div>
                    <div className="mock-info">
                        <div className="mock-name">S. Iyer</div>
                        <div className="mock-sub">Product · Strategy, GTM</div>
                    </div>
                    <div className="mock-skill">Product</div>
                    </div>
                    <div className="mock-match-row">
                    <div className="mock-match-bar"><div className="mock-match-fill" style={{width:'81%'}}></div></div>
                    <div className="mock-pct">81%</div>
                    </div>
                </div>
                </div>
            </div>
            </div>
            <section className="cta-section">
            <div className="cta-glow"></div>
            <div className="cta-inner reveal">
                <h2 className="cta-title">Your next great<br />team is one click away</h2>
                <p className="cta-sub">Join thousands of students already finding their people on TeamUp. It's free to get started.</p>
                <div className="cta-input-row">
                <input type="email" placeholder="Enter your college email" />
                <a href="#" className="btn-primary" style={{padding:'10px 24px',whiteSpace:'nowrap'}}>Join TeamUp</a>
                </div>
            </div>
            </section>
            <footer>
                <div className="footer-left">
                    <a href="#" className="logo" style={{fontSize:'1.1rem'}}>
                    <span className="material-icons-round logo-icon" style={{fontSize:'1.1rem'}}>hub</span>
                    Team<span>Up</span>
                    </a>
                    <span className="footer-copy">© 2026 TeamUp. All rights reserved.</span>
                </div>
                <div className="footer-links">
                    <a href="#">Privacy</a>
                    <a href="#">Terms</a>
                    <a href="#">Contact</a>
                </div>
                </footer>

        <div className="glow-line"></div>
    </div>
  )
}

export default Home