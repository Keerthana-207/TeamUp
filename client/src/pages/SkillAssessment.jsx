import { useState, useEffect, useRef } from "react";
import { SKILLS,  QUESTION_BANK } from "../constants";
import { Link } from 'react-router-dom';
import "./SkillAssessment.css";

/* ════════════════════════════════════════════════════════════
   SCORING
════════════════════════════════════════════════════════════ */
const DIFF_WEIGHTS = { easy: 1, medium: 1.5, hard: 2 };

function calcScore(answers, questions) {
  let earned = 0, max = 0;
  questions.forEach((q, i) => {
    const w = DIFF_WEIGHTS[q.diff];
    max += w;
    if (answers[i] === q.correct) earned += w;
  });
  return Math.round((earned / max) * 100);
}

function levelFor(score) {
  if (score >= 80) return { label: "Expert",       color: "var(--green)",  border: "rgba(52,211,153,0.3)",  icon: "workspace_premium" };
  if (score >= 55) return { label: "Intermediate", color: "var(--cyan)",   border: "rgba(99,218,255,0.3)",  icon: "signal_cellular_alt_2_bar" };
  return                  { label: "Beginner",     color: "var(--yellow)", border: "rgba(251,191,36,0.3)",  icon: "signal_cellular_alt_1_bar" };
}

/* ════════════════════════════════════════════════════════════
   TIMER COMPONENT
════════════════════════════════════════════════════════════ */
const Q_TIME = 30; // seconds per question

function Timer({ onExpire }) {
  const [secs, setSecs] = useState(Q_TIME);
  useEffect(() => {
    setSecs(Q_TIME);
    const t = setInterval(() => {
      setSecs(s => {
        if (s <= 1) { clearInterval(t); onExpire(); return 0; }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [onExpire]);
  const cls = secs <= 5 ? "danger" : secs <= 10 ? "warn" : "";
  return (
    <div className={`sa-timer ${cls}`}>
      <span className="material-icons-round">timer</span>
      {String(secs).padStart(2,"0")}s
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   SKILL ASSESSMENT PAGE
════════════════════════════════════════════════════════════ */
export default function SkillAssessment() {
  const [phase,       setPhase]       = useState("select");   // select | quiz | result
  const [chosenSkill, setChosenSkill] = useState(null);
  const [questions,   setQuestions]   = useState([]);
  const [qIdx,        setQIdx]        = useState(0);
  const [answers,     setAnswers]     = useState([]);
  const [selected,    setSelected]    = useState(null);   // current choice
  const [revealed,    setRevealed]    = useState(false);
  const [score,       setScore]       = useState(0);
  const timerKey = useRef(0);

  function getRandomQuestions(allQuestions, count = 5) {
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }

  /* Start quiz */
  function startQuiz() {
    if (!chosenSkill) return;
    const allQs = QUESTION_BANK[chosenSkill.id];
    const qs = getRandomQuestions(allQs, 5);
    setQuestions(qs);
    setQIdx(0); setAnswers([]); setSelected(null); setRevealed(false);
    timerKey.current++;
    setPhase("quiz");
  }

  /* Pick an answer */
  function pickAnswer(idx) {
    if (revealed) return;
    setSelected(idx);
    setRevealed(true);
  }

  /* Timer expires — auto-skip */
  function handleTimerExpire() {
    if (!revealed) {
      setSelected(-1);   // -1 = timed out (wrong)
      setRevealed(true);
    }
  }

  async function saveScoreToProfile(finalScore) {
    try {
      const token = localStorage.getItem("token");

      await fetch("http://localhost:3001/api/auth/skill-score", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          skillName: chosenSkill.name,
          score: finalScore
        })
      });

      console.log("✅ Score saved");

    } catch (err) {
      console.error("❌ Error saving score:", err);
    }
  }

  /* Next question */
  function nextQuestion() {
    const newAnswers = [...answers, selected ?? -1];
    if (qIdx + 1 >= questions.length) {
      const s = calcScore(newAnswers, questions);
      setScore(s);
      setAnswers(newAnswers);
      setPhase("result");

      saveScoreToProfile(s);
    } else {
      setAnswers(newAnswers);
      setQIdx(q => q + 1);
      setSelected(null);
      setRevealed(false);
      timerKey.current++;
    }
  }

  /* Retry */
  function retry() {
    setChosenSkill(null);
    setPhase("select");
  }

  const q        = questions[qIdx];
  const progress = questions.length ? ((qIdx) / questions.length) * 100 : 0;
  const level    = levelFor(score);
  const correct  = answers.filter((a, i) => a === questions[i]?.correct).length;
  const CIRC     = 2 * Math.PI * 48; // circumference for r=48

  return (
    <>
      <div className="sa-bg-grid" />
      <div className="sa-orb sa-orb-1" />
      <div className="sa-orb sa-orb-2" />

      <div className="sa-root">
        <header className="sa-topbar">
          <a href="/" className="sa-topbar-logo">
            <span className="material-icons-round sa-logo-icon">bolt</span>
            Team<span className="sa-logo-accent">Up</span>
          </a>
          <div className="sa-topbar-spacer" />
          <a href="/dashboard" className="sa-back-btn">
            <span className="material-icons-round">arrow_back</span>
            Dashboard
          </a>
        </header>

        <div className="sa-page">

          {/* ══ SELECT SCREEN ════════════════════════════ */}
          {phase === "select" && (
            <>
              <div className="sa-select-header">
                <div className="sa-select-eyebrow">Skill Assessment</div>
                <h1 className="sa-select-title">Test Your Skills</h1>
                <p className="sa-select-sub">Pick a skill and prove your expertise. Scores are added to your public profile.</p>
              </div>

              <div className="sa-skill-grid">
                {SKILLS.map(sk => (
                  <div
                    key={sk.id}
                    className={`sa-skill-option ${chosenSkill?.id === sk.id ? "selected" : ""}`}
                    onClick={() => setChosenSkill(sk)}
                  >
                    <div className="sa-skill-opt-icon" style={{ background: sk.iconBg }}>
                      <span className="material-icons-round" style={{ color: sk.iconColor }}>{sk.icon}</span>
                    </div>
                    <div className="sa-skill-opt-name">{sk.name}</div>
                    <div className="sa-skill-opt-questions">{sk.questions} questions · 30s each</div>
                  </div>
                ))}
              </div>

              <button className="sa-start-btn" onClick={startQuiz} disabled={!chosenSkill}>
                <span className="material-icons-round">play_arrow</span>
                {chosenSkill ? `Start ${chosenSkill.name} Assessment` : "Select a Skill to Begin"}
              </button>
            </>
          )}

          {/* ══ QUIZ SCREEN ══════════════════════════════ */}
          {phase === "quiz" && q && (
            <>
              {/* Progress + Timer */}
              <div className="sa-quiz-toprow">
                <div className="sa-quiz-progress-wrap">
                  <div className="sa-quiz-progress-label">
                    <span>Question {qIdx + 1} of {questions.length}</span>
                    <span>{chosenSkill?.name}</span>
                  </div>
                  <div className="sa-progress-bar">
                    <div className="sa-progress-fill" style={{ width: `${progress}%` }} />
                  </div>
                </div>
                <Timer key={timerKey.current} onExpire={handleTimerExpire} />
              </div>

              {/* Question card */}
              <div className="sa-question-card" key={qIdx}>
                <div className="sa-q-head">
                  <span className={`sa-q-diff ${q.diff}`}>
                    {q.diff.charAt(0).toUpperCase() + q.diff.slice(1)}
                  </span>
                  <span className="sa-q-num">Q{qIdx + 1} / {questions.length}</span>
                </div>

                <div className="sa-q-body">
                  <div className="sa-q-text">{q.text}</div>
                  <div className="sa-options">
                    {q.options.map((opt, i) => {
                      let cls = "";
                      if (revealed) {
                        if (i === q.correct)           cls = "correct";
                        else if (i === selected && i !== q.correct) cls = "wrong";
                      } else if (i === selected)       cls = "selected";
                      const letters = ["A","B","C","D"];
                      return (
                        <button
                          key={i}
                          className={`sa-option ${cls}`}
                          onClick={() => pickAnswer(i)}
                          disabled={revealed}
                        >
                          <span className="sa-option-indicator">
                            {revealed && i === q.correct
                              ? <span className="material-icons-round" style={{ fontSize:"14px" }}>check</span>
                              : revealed && i === selected && i !== q.correct
                              ? <span className="material-icons-round" style={{ fontSize:"14px" }}>close</span>
                              : letters[i]
                            }
                          </span>
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {revealed && (
                  <div className="sa-q-footer">
                    <div className="sa-explanation">
                      <strong>{selected === q.correct ? "✓ Correct! " : selected === -1 ? "⏱ Time's up! " : "✗ Incorrect. "}</strong>
                      {q.explanation}
                    </div>
                    <button className="sa-next-btn" onClick={nextQuestion}>
                      {qIdx + 1 < questions.length ? "Next" : "See Results"}
                      <span className="material-icons-round">arrow_forward</span>
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          {/* ══ RESULT SCREEN ════════════════════════════ */}
          {phase === "result" && (
            <div className="sa-result">
              <div className="sa-result-top">
                {/* Score ring */}
                <div className="sa-result-ring">
                  <svg width="120" height="120" viewBox="0 0 120 120">
                    <circle className="sa-result-ring-bg" cx="60" cy="60" r="48" />
                    <circle
                      className="sa-result-ring-fill"
                      cx="60" cy="60" r="48"
                      stroke={level.color}
                      strokeDasharray={CIRC}
                      strokeDashoffset={CIRC - (score / 100) * CIRC}
                    />
                  </svg>
                  <div className="sa-result-pct">
                    <div className="sa-result-pct-num" style={{ color: level.color, fontSize: '20px' }}>{score}%</div>
                    <div className="sa-result-pct-lbl">Score</div>
                  </div>
                </div>

                <h2 className="sa-result-title">{chosenSkill?.name} Assessment Complete!</h2>
                <p className="sa-result-sub">Your score has been added to your profile.</p>
                <div className="sa-level-badge" style={{ background: level.color + "18", borderColor: level.border, color: level.color }}>
                  <span className="material-icons-round" style={{ fontSize:"16px" }}>{level.icon}</span>
                  {level.label}
                </div>
              </div>

              <div className="sa-result-body">
                <div className="sa-result-stats">
                  <div className="sa-res-stat">
                    <div className="sa-res-stat-val" style={{ color: "var(--green)" }}>{correct}</div>
                    <div className="sa-res-stat-lbl">Correct</div>
                  </div>
                  <div className="sa-res-stat">
                    <div className="sa-res-stat-val" style={{ color: "var(--red)" }}>{questions.length - correct}</div>
                    <div className="sa-res-stat-lbl">Incorrect</div>
                  </div>
                  <div className="sa-res-stat">
                    <div className="sa-res-stat-val">{questions.length}</div>
                    <div className="sa-res-stat-lbl">Total Questions</div>
                  </div>
                </div>

                <div className="sa-result-actions">
                  <button className="sa-redo-btn" onClick={retry}>
                    <span className="material-icons-round">refresh</span>
                    Try Another Skill
                  </button>
                  <Link to="/profile" className="sa-home-btn">
                    <span className="material-icons-round">manage_accounts</span>
                    View My Profile
                  </Link>
                  <Link to="/dashboard" className="sa-home-btn">
                    <span className="material-icons-round">dashboard</span>
                    Dashboard
                  </Link>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
