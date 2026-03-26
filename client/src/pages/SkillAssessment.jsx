import { useState, useEffect, useRef } from "react";
import "./SkillAssessment.css";

/* ════════════════════════════════════════════════════════════
   SKILL CATALOG
════════════════════════════════════════════════════════════ */
const SKILLS = [
  { id:"react",   name:"React",        icon:"code",        iconBg:"rgba(99,218,255,0.12)",  iconColor:"var(--cyan)",   questions:8 },
  { id:"python",  name:"Python",       icon:"terminal",    iconBg:"rgba(52,211,153,0.12)",  iconColor:"var(--green)",  questions:8 },
  { id:"ml",      name:"ML / AI",      icon:"psychology",  iconBg:"rgba(167,139,250,0.12)", iconColor:"var(--violet)", questions:8 },
  { id:"nodejs",  name:"Node.js",      icon:"dns",         iconBg:"rgba(99,218,255,0.12)",  iconColor:"var(--cyan)",   questions:8 },
  { id:"uiux",    name:"UI/UX Design", icon:"brush",       iconBg:"rgba(248,113,113,0.12)", iconColor:"var(--red)",    questions:8 },
  { id:"cloud",   name:"Cloud",        icon:"cloud",       iconBg:"rgba(251,191,36,0.12)",  iconColor:"var(--yellow)", questions:8 },
];

/* ════════════════════════════════════════════════════════════
   QUESTION BANK (8 per skill — mixed difficulty)
════════════════════════════════════════════════════════════ */
const QUESTION_BANK = {
  react: [
    { id:1, diff:"easy",   text:"What hook do you use to manage local state in a functional component?", options:["useEffect","useState","useRef","useMemo"], correct:1, explanation:"useState lets you declare state variables inside functional components." },
    { id:2, diff:"easy",   text:"Which method is used to update state without mutating the current state?", options:["this.state =","setState","mutateState","setProps"], correct:1, explanation:"setState (or the setter from useState) schedules a state update and triggers a re-render." },
    { id:3, diff:"medium", text:"When does useEffect run by default (without a dependency array)?", options:["Once on mount","After every render","Only on unmount","Never"], correct:1, explanation:"Without a dependency array, useEffect runs after every single render." },
    { id:4, diff:"medium", text:"What does the key prop do in a list of React elements?", options:["Styles the element","Helps React identify which items changed","Passes data to children","Creates a ref"], correct:1, explanation:"Keys help React identify which items have changed, been added, or been removed for efficient reconciliation." },
    { id:5, diff:"medium", text:"What is the purpose of React.memo()?", options:["Memoize the entire component tree","Prevent unnecessary re-renders of a component","Cache API calls","Create derived state"], correct:1, explanation:"React.memo wraps a component and skips re-rendering when props haven't changed." },
    { id:6, diff:"hard",   text:"In the React fiber architecture, what is a 'fiber'?", options:["A CSS utility","A unit of work representing a React element","A network request abstraction","A webpack plugin"], correct:1, explanation:"A fiber is an internal data structure React uses to track component trees and schedule rendering work." },
    { id:7, diff:"hard",   text:"What is the correct way to avoid stale closures in useEffect?", options:["Use class components","Include all used variables in the dependency array","Never use callbacks","Wrap everything in useMemo"], correct:1, explanation:"Adding all variables the effect depends on to the dependency array ensures it always sees the latest values." },
    { id:8, diff:"hard",   text:"Which hook should you use to synchronously read a mutable value without causing re-renders?", options:["useState","useReducer","useRef","useContext"], correct:2, explanation:"useRef returns a mutable object whose .current property persists without triggering re-renders on change." },
  ],
  python: [
    { id:1, diff:"easy",   text:"Which data type is immutable in Python?", options:["list","dict","tuple","set"], correct:2, explanation:"Tuples are immutable — once created their elements cannot be changed." },
    { id:2, diff:"easy",   text:"What does `len([1, 2, 3])` return?", options:["2","3","4","1"], correct:1, explanation:"len() returns the number of items — 3 in this case." },
    { id:3, diff:"medium", text:"What is a Python generator?", options:["A function using return","A function using yield that lazily produces values","A class method","A built-in data type"], correct:1, explanation:"Generators use yield to produce values lazily, making them memory-efficient for large sequences." },
    { id:4, diff:"medium", text:"What is the time complexity of dict lookup in Python?", options:["O(n)","O(log n)","O(1) average","O(n²)"], correct:2, explanation:"Python dicts use hash tables, giving O(1) average-case lookup time." },
    { id:5, diff:"medium", text:"What does `*args` do in a function definition?", options:["Passes keyword arguments","Collects extra positional arguments into a tuple","Creates a list","Multiplies arguments"], correct:1, explanation:"*args collects any extra positional arguments passed to the function as a tuple." },
    { id:6, diff:"hard",   text:"What is the GIL in CPython?", options:["Global Increment Lock","Global Interpreter Lock that allows only one thread to execute Python bytecode at a time","A garbage collector","A GPU interface layer"], correct:1, explanation:"The GIL is a mutex that protects access to Python objects, preventing true multi-threaded execution in CPython." },
    { id:7, diff:"hard",   text:"Which method makes a class iterable?", options:["__iter__ and __next__","__call__","__len__","__str__"], correct:0, explanation:"Implementing __iter__ (returns self) and __next__ (returns next value or raises StopIteration) makes a class iterable." },
    { id:8, diff:"hard",   text:"What is a metaclass in Python?", options:["A class that inherits from object","A class whose instances are classes","A decorator for classes","An abstract base class"], correct:1, explanation:"A metaclass is a class of a class — it defines how classes behave, just as a class defines how instances behave." },
  ],
  ml: [
    { id:1, diff:"easy",   text:"Which algorithm is used for classification by finding a hyperplane?", options:["K-Means","SVM","PCA","KNN"], correct:1, explanation:"Support Vector Machines find the optimal hyperplane that maximally separates classes." },
    { id:2, diff:"easy",   text:"What does 'overfitting' mean in machine learning?", options:["Model too simple","Model performs well on training data but poorly on new data","Model is not trained","Data is too large"], correct:1, explanation:"Overfitting occurs when a model memorizes training data, capturing noise rather than the underlying pattern." },
    { id:3, diff:"medium", text:"What is the purpose of a validation set?", options:["Train the model","Test final performance","Tune hyperparameters","Normalize data"], correct:2, explanation:"The validation set is used to tune hyperparameters and avoid overfitting during training." },
    { id:4, diff:"medium", text:"In gradient descent, what does the learning rate control?", options:["Number of epochs","Step size of each weight update","Batch size","Model architecture"], correct:1, explanation:"The learning rate controls how large each step is when updating weights to minimize the loss function." },
    { id:5, diff:"medium", text:"What is the vanishing gradient problem?", options:["Gradients become too large","Gradients become very small in early layers, slowing learning","Model diverges","Loss stays constant"], correct:1, explanation:"In deep networks, gradients can exponentially shrink during backpropagation, stalling learning in early layers." },
    { id:6, diff:"hard",   text:"What does the attention mechanism in transformers compute?", options:["Image features","Weighted combination of values using query-key similarity","Word embeddings","Positional encoding"], correct:1, explanation:"Attention computes a weighted sum of values, where weights are determined by the similarity between queries and keys." },
    { id:7, diff:"hard",   text:"What is the curse of dimensionality?", options:["Too many model parameters","Data becomes sparse as feature dimensions increase, degrading distance metrics","GPU memory overflow","Batch normalization failure"], correct:1, explanation:"As dimensions grow, data becomes increasingly sparse, making distance-based algorithms unreliable." },
    { id:8, diff:"hard",   text:"In a VAE, what does the reparameterization trick solve?", options:["Slow training","Making sampling differentiable for backpropagation","Overfitting","Class imbalance"], correct:1, explanation:"The reparameterization trick expresses sampling as a deterministic function of parameters plus noise, enabling gradients to flow through." },
  ],
  nodejs:[
    { id:1, diff:"easy",   text:"What is the event loop in Node.js?", options:["A for loop","A mechanism that handles asynchronous callbacks","A database connection","A middleware"], correct:1, explanation:"The event loop allows Node.js to perform non-blocking I/O by offloading operations and picking up callbacks when they complete." },
    { id:2, diff:"easy",   text:"Which module is used to create an HTTP server in Node.js?", options:["fs","path","http","net"], correct:2, explanation:"The built-in 'http' module provides the createServer method to build HTTP servers." },
    { id:3, diff:"medium", text:"What does `process.nextTick()` do?", options:["Delays execution by 1ms","Schedules a callback before any I/O events in the next iteration","Kills the process","Creates a new thread"], correct:1, explanation:"process.nextTick queues a callback to run before the event loop continues, before any I/O events." },
    { id:4, diff:"medium", text:"What is middleware in Express.js?", options:["A database ORM","Functions that have access to req, res, and the next function","A templating engine","A static file server"], correct:1, explanation:"Middleware functions intercept request-response cycles; they can modify req/res and call next() to pass control." },
    { id:5, diff:"medium", text:"What is the difference between require() and import?", options:["No difference","require is CommonJS (runtime), import is ES modules (static)","import is faster","require is async"], correct:1, explanation:"require() is Node's CommonJS module system loaded at runtime; import is the static ES module syntax." },
    { id:6, diff:"hard",   text:"What is the purpose of cluster module in Node.js?", options:["Create child processes to utilise multi-core CPUs","Cache HTTP responses","Compress files","Manage WebSockets"], correct:0, explanation:"The cluster module lets you fork multiple worker processes to share the same server port, leveraging multiple CPU cores." },
    { id:7, diff:"hard",   text:"What does backpressure mean in Node.js streams?", options:["High CPU usage","The mechanism that signals a writable stream is full and the readable should pause","Memory leaks","HTTP timeout"], correct:1, explanation:"Backpressure prevents the readable stream from overwhelming the writable stream by signalling when to pause/resume." },
    { id:8, diff:"hard",   text:"What is libuv in Node.js?", options:["A package manager","The C library providing the event loop and async I/O","A HTTP framework","A templating engine"], correct:1, explanation:"libuv is the multi-platform C library that implements Node's event loop, thread pool, and async I/O." },
  ],
  uiux:[
    { id:1, diff:"easy",   text:"What does 'affordance' mean in UX design?", options:["Color theory","A design property that suggests how an object should be used","Typography scale","Grid system"], correct:1, explanation:"Affordances are cues in the design that suggest how something can be interacted with — e.g., a button looks pressable." },
    { id:2, diff:"easy",   text:"What is the 8px grid system used for?", options:["Color consistency","Spacing and sizing consistency across layouts","Font selection","Icon design"], correct:1, explanation:"The 8px grid ensures proportional, consistent spacing and sizing — most screen sizes are divisible by 8." },
    { id:3, diff:"medium", text:"What is the purpose of a user persona?", options:["Replace real user testing","Represent a fictional but data-driven archetype of a target user","Define brand colours","Create sitemaps"], correct:1, explanation:"Personas help designers empathize with users, making decisions based on a representative user's goals and behaviours." },
    { id:4, diff:"medium", text:"In accessibility, what does WCAG 2.1 AA contrast ratio require for normal text?", options:["3:1","4.5:1","7:1","2:1"], correct:1, explanation:"WCAG 2.1 AA requires a minimum 4.5:1 contrast ratio for normal text to ensure readability for low-vision users." },
    { id:5, diff:"medium", text:"What is a 'design system'?", options:["A Figma plugin","A collection of reusable components, guidelines, and standards for a product","A type of grid","A prototyping method"], correct:1, explanation:"A design system is a shared library of components, tokens, and documentation that ensures consistency across a product." },
    { id:6, diff:"hard",   text:"What is Fitts's Law?", options:["Colors affect emotion","Time to acquire a target relates to distance and target size","Grid systems must use 12 columns","Personas need 10 data points"], correct:1, explanation:"Fitts's Law predicts that the time to point to a target is a function of the distance to and size of the target — bigger, closer = faster." },
    { id:7, diff:"hard",   text:"What is the difference between UX and UI?", options:["They are synonymous","UX covers the overall experience and research; UI covers visual and interactive design","UI is for mobile only","UX only involves wireframing"], correct:1, explanation:"UX is the broader discipline covering research, strategy, and overall feel; UI is the subset dealing with visual and interactive elements." },
    { id:8, diff:"hard",   text:"What is a mental model in UX?", options:["A wireframe template","A user's internal understanding of how a system works","A navigation pattern","A design token"], correct:1, explanation:"A mental model is the user's expectation of how a system behaves; good UX aligns the system's actual behaviour with this model." },
  ],
  cloud:[
    { id:1, diff:"easy",   text:"What does IaaS stand for?", options:["Internet as a Service","Infrastructure as a Service","Integration as a Service","Instance as a Service"], correct:1, explanation:"IaaS provides virtualised computing resources (servers, storage, networking) over the internet." },
    { id:2, diff:"easy",   text:"What is an AWS S3 bucket?", options:["A virtual machine","An object storage service","A relational database","A CDN"], correct:1, explanation:"Amazon S3 (Simple Storage Service) is an object storage service for storing and retrieving any amount of data." },
    { id:3, diff:"medium", text:"What is a containerisation platform?", options:["AWS Lambda","Docker","Kubernetes only","Nginx"], correct:1, explanation:"Docker is the leading container platform that packages applications and their dependencies into portable containers." },
    { id:4, diff:"medium", text:"What is the difference between vertical and horizontal scaling?", options:["No difference","Vertical = bigger machine; Horizontal = more machines","Horizontal = bigger machine","Vertical = more machines"], correct:1, explanation:"Vertical scaling increases resources on one machine; horizontal scaling adds more machines to distribute load." },
    { id:5, diff:"medium", text:"What is a CDN used for?", options:["Database management","Delivering content from servers geographically close to users","Container orchestration","CI/CD pipelines"], correct:1, explanation:"A Content Delivery Network caches content at edge servers worldwide, reducing latency for end users." },
    { id:6, diff:"hard",   text:"What is the CAP theorem?", options:["Cloud Access Protocol","Distributed systems can guarantee at most 2 of: Consistency, Availability, Partition tolerance","A caching strategy","A load balancing algorithm"], correct:1, explanation:"The CAP theorem states a distributed system can only guarantee two of the three properties simultaneously during a partition." },
    { id:7, diff:"hard",   text:"What is Kubernetes designed to solve?", options:["Object storage","Automating deployment, scaling, and management of containerised applications","Virtual machine provisioning","Database replication"], correct:1, explanation:"Kubernetes orchestrates containers at scale, handling deployment, scaling, networking, and self-healing automatically." },
    { id:8, diff:"hard",   text:"What is a service mesh?", options:["A Docker network","Infrastructure layer handling service-to-service communication (retries, auth, observability)","A cloud storage tier","A CDN configuration"], correct:1, explanation:"A service mesh (e.g., Istio) manages how microservices communicate, providing traffic management, security, and observability." },
  ],
};

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

  /* Start quiz */
  function startQuiz() {
    if (!chosenSkill) return;
    const qs = QUESTION_BANK[chosenSkill.id];
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

  /* Next question */
  function nextQuestion() {
    const newAnswers = [...answers, selected ?? -1];
    if (qIdx + 1 >= questions.length) {
      const s = calcScore(newAnswers, questions);
      setScore(s);
      setAnswers(newAnswers);
      setPhase("result");
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
                    <div className="sa-result-pct-num" style={{ color: level.color }}>{score}%</div>
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
                  <a href="/profile" className="sa-home-btn">
                    <span className="material-icons-round">manage_accounts</span>
                    View My Profile
                  </a>
                  <a href="/dashboard" className="sa-home-btn">
                    <span className="material-icons-round">dashboard</span>
                    Dashboard
                  </a>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
