export const DOMAINS = [
    {
      group: "Technology",
      items: [
        { value:"web-dev",    label:"Web Development",           icon:"language",          tag:"pop"  },
        { value:"mobile",     label:"Mobile App Development",    icon:"smartphone",        tag:""     },
        { value:"ai-ml",      label:"AI / Machine Learning",     icon:"psychology",        tag:"hot"  },
        { value:"data-sci",   label:"Data Science & Analytics",  icon:"bar_chart",         tag:"hot"  },
        { value:"cloud",      label:"Cloud Computing",           icon:"cloud",             tag:""     },
        { value:"devops",     label:"DevOps & MLOps",            icon:"settings_suggest",  tag:""     },
        { value:"cybersec",   label:"Cybersecurity",             icon:"security",          tag:""     },
        { value:"blockchain", label:"Blockchain & Web3",         icon:"token",             tag:"new"  },
        { value:"iot",        label:"Internet of Things (IoT)",  icon:"sensors",           tag:""     },
        { value:"robotics",   label:"Robotics & Automation",     icon:"precision_manufacturing", tag:"" },
        { value:"ar-vr",      label:"AR / VR / XR",              icon:"view_in_ar",        tag:"new"  },
        { value:"game-dev",   label:"Game Development",          icon:"sports_esports",    tag:""     },
        { value:"embedded",   label:"Embedded Systems",          icon:"memory",            tag:""     },
      ]
    },
    {
      group: "Design & Creative",
      items: [
        { value:"ui-ux",      label:"UI/UX Design",              icon:"palette",           tag:"pop"  },
        { value:"graphic",    label:"Graphic Design",            icon:"brush",             tag:""     },
        { value:"motion",     label:"Motion & Animation",        icon:"animation",         tag:""     },
        { value:"product",    label:"Product Design",            icon:"design_services",   tag:""     },
      ]
    },
    {
      group: "Science & Research",
      items: [
        { value:"biotech",    label:"Biotechnology",             icon:"biotech",           tag:""     },
        { value:"enviro",     label:"Environmental Science",     icon:"eco",               tag:""     },
        { value:"space",      label:"Space & Astronomy",         icon:"rocket",            tag:""     },
        { value:"physics",    label:"Physics & Quantum",         icon:"science",           tag:""     },
        { value:"chem",       label:"Chemistry",                 icon:"science",           tag:""     },
        { value:"medtech",    label:"MedTech & Healthcare",      icon:"local_hospital",    tag:"hot"  },
      ]
    },
    {
      group: "Business & Social",
      items: [
        { value:"edtech",     label:"EdTech",                    icon:"school",            tag:"pop"  },
        { value:"fintech",    label:"FinTech",                   icon:"account_balance",   tag:""     },
        { value:"social",     label:"Social Impact",             icon:"volunteer_activism", tag:""    },
        { value:"startup",    label:"Startup / Entrepreneurship",icon:"emoji_objects",     tag:""     },
        { value:"agri",       label:"AgriTech",                  icon:"agriculture",       tag:""     },
        { value:"legaltech",  label:"LegalTech",                 icon:"gavel",             tag:""     },
      ]
    },
    {
      group: "Others",
      items: [
        { value:"open-source",label:"Open Source",               icon:"code",              tag:""     },
        { value:"hardware",   label:"Hardware Hacking",          icon:"developer_board",   tag:""     },
        { value:"other",      label:"Other / Not Listed",        icon:"more_horiz",        tag:""     },
      ]
    }
  ];

export const INITIAL_PROJECTS = [
  {
    id: "p1", name: "HackBot — AI Hackathon Assistant",
    domain: "AI / Machine Learning", domainIcon: "psychology",
    description: "An intelligent assistant that helps teams find hackathons, form teams, brainstorm ideas, and track submissions using NLP and recommendation algorithms.",
    visibility: "public", files: 24, stars: 18, forks: 4,
    color: "#63daff", accent: "rgba(99,218,255,0.12)", dotColor: "rgba(99,218,255,0.18)",
    date: "2025-03-10", tags: ["Python","FastAPI","React"], status: "active",
  },
  {
    id: "p2", name: "EcoTrack — Carbon Footprint Monitor",
    domain: "Environmental Science", domainIcon: "eco",
    description: "A mobile-first web app that tracks personal and team carbon footprints, visualises impact data and gamifies eco-friendly habits.",
    visibility: "public", files: 37, stars: 31, forks: 9,
    color: "#34d399", accent: "rgba(52,211,153,0.12)", dotColor: "rgba(52,211,153,0.18)",
    date: "2025-01-22", tags: ["Flutter","Firebase","Charts.js"], status: "active",
  },
  {
    id: "p3", name: "MediLens — Smart Prescription Reader",
    domain: "MedTech & Healthcare", domainIcon: "local_hospital",
    description: "An OCR-powered tool that reads handwritten doctor prescriptions, identifies medicines and dosages, and cross-checks drug interactions.",
    visibility: "private", files: 19, stars: 0, forks: 0,
    color: "#f87171", accent: "rgba(248,113,113,0.10)", dotColor: "rgba(248,113,113,0.18)",
    date: "2025-02-14", tags: ["PyTorch","Tesseract","Next.js"], status: "active",
  },
  {
    id: "p4", name: "SkillForge — Peer Learning Platform",
    domain: "EdTech", domainIcon: "school",
    description: "A marketplace connecting students with niche skills to those who want to learn them — structured around short project-based micro-courses.",
    visibility: "public", files: 52, stars: 44, forks: 12,
    color: "#fbbf24", accent: "rgba(251,191,36,0.10)", dotColor: "rgba(251,191,36,0.18)",
    date: "2024-12-05", tags: ["React","Node.js","PostgreSQL"], status: "active",
  },
  {
    id: "p5", name: "Quantum Cipher — Encryption Lab",
    domain: "Cybersecurity", domainIcon: "security",
    description: "An interactive quantum-resistant encryption playground that lets researchers experiment with lattice-based cryptographic schemes.",
    visibility: "private", files: 11, stars: 0, forks: 0,
    color: "#a78bfa", accent: "rgba(167,139,250,0.10)", dotColor: "rgba(167,139,250,0.18)",
    date: "2025-03-01", tags: ["Rust","WebAssembly","C++"], status: "wip",
  },
  {
    id: "p6", name: "FarmVision — Crop Disease Detector",
    domain: "AgriTech", domainIcon: "agriculture",
    description: "A deep-learning model deployed on-device (Raspberry Pi) that identifies crop diseases from leaf images and recommends organic treatments.",
    visibility: "public", files: 29, stars: 22, forks: 6,
    color: "#34d399", accent: "rgba(52,211,153,0.10)", dotColor: "rgba(52,211,153,0.15)",
    date: "2024-11-18", tags: ["TensorFlow Lite","Raspberry Pi","Python"], status: "active",
  },
  {
    id: "p7", name: "NightOwl — Dev Productivity Tracker",
    domain: "Web Development", domainIcon: "language",
    description: "A VS Code extension + web dashboard that logs coding sessions, detects flow states, and generates weekly productivity reports for developers.",
    visibility: "public", files: 16, stars: 9, forks: 2,
    color: "#fb923c", accent: "rgba(251,146,60,0.10)", dotColor: "rgba(251,146,60,0.18)",
    date: "2025-02-28", tags: ["TypeScript","VS Code API","SQLite"], status: "active",
  },
  {
    id: "p8", name: "StageSpace — AR Campus Tour",
    domain: "AR / VR / XR", domainIcon: "view_in_ar",
    description: "An augmented reality app that overlays real-time wayfinding, event info, and historical facts onto the physical campus environment.",
    visibility: "private", files: 41, stars: 0, forks: 0,
    color: "#f472b6", accent: "rgba(244,114,182,0.10)", dotColor: "rgba(244,114,182,0.18)",
    date: "2025-03-15", tags: ["ARCore","Unity","Kotlin"], status: "wip",
  },
];

export const TEAMS = [
  {
    id:"t1", name:"Code Crusaders", project:"HackBot — AI Hackathon Assistant",
    desc:"Building an AI assistant that helps teams form, brainstorm and track hackathon submissions in real time.",
    domain:"AI / ML", domainIcon:"psychology",
    color:"#63daff", accent:"rgba(99,218,255,0.12)", dot:"rgba(99,218,255,0.2)",
    role:"Lead", members:[{init:"AS",bg:"#63daff"},{init:"PK",bg:"#a78bfa"},{init:"RM",bg:"#34d399"},{init:"JD",bg:"#fbbf24"}], memberCount:4,
  },
  {
    id:"t2", name:"Green Bytes", project:"EcoTrack — Carbon Monitor",
    desc:"Mobile-first web app gamifying eco-friendly habits and visualising real-time carbon footprint data across teams.",
    domain:"EnviroTech", domainIcon:"eco",
    color:"#34d399", accent:"rgba(52,211,153,0.12)", dot:"rgba(52,211,153,0.2)",
    role:"Member", members:[{init:"SL",bg:"#34d399"},{init:"AS",bg:"#63daff"},{init:"NK",bg:"#f472b6"}], memberCount:3,
  },
  {
    id:"t3", name:"MediMinds", project:"MediLens — Prescription Reader",
    desc:"OCR-powered prescription reader that identifies medicines, dosages and flags dangerous drug interactions automatically.",
    domain:"MedTech", domainIcon:"local_hospital",
    color:"#f87171", accent:"rgba(248,113,113,0.10)", dot:"rgba(248,113,113,0.18)",
    role:"Lead", members:[{init:"AS",bg:"#63daff"},{init:"VT",bg:"#f87171"},{init:"MD",bg:"#fb923c"},{init:"LK",bg:"#a78bfa"},{init:"+2",bg:"#6b7280"}], memberCount:7,
  },
  {
    id:"t4", name:"Forge & Flow", project:"SkillForge — Peer Learning",
    desc:"Peer-to-peer micro-learning marketplace connecting students with niche skills to eager learners via project-based courses.",
    domain:"EdTech", domainIcon:"school",
    color:"#fbbf24", accent:"rgba(251,191,36,0.10)", dot:"rgba(251,191,36,0.18)",
    role:"Member", members:[{init:"RL",bg:"#fbbf24"},{init:"AS",bg:"#63daff"},{init:"ST",bg:"#34d399"}], memberCount:3,
  },
  {
    id:"t5", name:"CipherSync", project:"Quantum Cipher — Encryption Lab",
    desc:"Quantum-resistant encryption playground for researchers to experiment with lattice-based cryptographic schemes.",
    domain:"Cybersecurity", domainIcon:"security",
    color:"#a78bfa", accent:"rgba(167,139,250,0.10)", dot:"rgba(167,139,250,0.18)",
    role:"Lead", members:[{init:"AS",bg:"#63daff"},{init:"ZH",bg:"#a78bfa"},{init:"TR",bg:"#f472b6"},{init:"KP",bg:"#fb923c"}], memberCount:4,
  },
];

export const FALLBACK_TEAM = {
  id: "t1",
  name: "Code Crusaders",
  project: "HackBot — AI Hackathon Assistant",
  desc: "Building an AI assistant that helps teams form, brainstorm and track hackathon submissions in real time.",
  domain: "AI / ML",
  domainIcon: "psychology",
  color: "#63daff",
  accent: "rgba(99,218,255,0.12)",
  dot: "rgba(99,218,255,0.2)",
  role: "Lead",
  members: [
    { init: "AS", bg: "#63daff" },
    { init: "PK", bg: "#a78bfa" },
    { init: "RM", bg: "#34d399" },
    { init: "JD", bg: "#fbbf24" },
  ],
  memberCount: 4,
};

export const TEAM_DETAILS = [
  { name: "Aryan Sharma",  role: "Lead",     status: "online",  skills: "AI, React" },
  { name: "Priya Kapoor",  role: "ML Eng",   status: "online",  skills: "PyTorch, Python" },
  { name: "Ravi Mehta",    role: "Backend",  status: "away",    skills: "Node.js, PostgreSQL" },
  { name: "Jatin Dubey",   role: "Frontend", status: "online",  skills: "React, Figma" },
  { name: "Sneha Luthra",  role: "DevOps",   status: "offline", skills: "AWS, Docker" },
  { name: "Kartik Pandey", role: "Member",   status: "away",    skills: "Flutter, Dart" },
];

export const SAMPLE_MESSAGES = [
  { sender: "Priya Kapoor", init: "PK", bg: "#a78bfa", text: "Hey everyone! I just pushed the new NLP module to the repo. Can someone review the PR?", time: "9:14 AM", own: false },
  { sender: "You",          init: "AS", bg: "#63daff", text: "On it! Looks great at first glance. The intent classifier accuracy is really good — 94% on validation set 🔥", time: "9:16 AM", own: true },
  { sender: "Ravi Mehta",   init: "RM", bg: "#34d399", text: "Backend API for team matching is live on staging. Endpoint: /api/v1/match-team", time: "9:20 AM", own: false },
  { sender: "Jatin Dubey",  init: "JD", bg: "#fbbf24", text: "I've updated the UI mockups for the dashboard. Sharing the Figma link in the project board.", time: "9:34 AM", own: false },
  { sender: "You",          init: "AS", bg: "#63daff", text: "Perfect Jatin! Let's do a quick sync call at 3pm to align on the sprint goals?", time: "9:36 AM", own: true },
  { sender: "Priya Kapoor", init: "PK", bg: "#a78bfa", text: "3pm works for me 👍", time: "9:37 AM", own: false },
  { sender: "Ravi Mehta",   init: "RM", bg: "#34d399", text: "Same here. I'll send a calendar invite.", time: "9:38 AM", own: false },
  { sender: "Jatin Dubey",  init: "JD", bg: "#fbbf24", text: "Also heads up — the hackathon deadline is in 6 days. Let's track our blockers on the board.", time: "9:55 AM", own: false },
  { sender: "You",          init: "AS", bg: "#63daff", text: "Good reminder! I'll update the task board after the call. We're on track 💪", time: "9:57 AM", own: true },
];

export const TAG_COLORS = ["var(--cyan)", "var(--violet)", "var(--green)", "var(--yellow)", "var(--orange)"];
export const PROJ_TAGS  = ["Python", "React", "FastAPI", "PostgreSQL", "Docker"].slice(0, 4);
export const EMOJIS     = ["😊", "🔥", "👍", "🚀", "✅", "💡", "🎯", "⚡"];
export const REPLY_POOL = [
  "Great idea! Let me check that.",
  "On it! Will update you shortly.",
  "That makes sense 👍",
  "Can we discuss this in the call?",
  "Pushing the update now…",
  "Looks good to me! ✅",
  "Thanks for the heads up!",
  "Agreed. Let's move forward.",
];

// SIDEBAR
export const MAIN_NAV = [
  { id: "dashboard",   label: "Dashboard",    icon: "dashboard",      href: "/dashboard",      badge: null         },
  { id: "projects",    label: "My Projects",  icon: "rocket_launch",  href: "/project",       badge: { text: "3", cls: "" }         },
  { id: "teams",       label: "My Teams",     icon: "group",          href: "/teams",          badge: { text: "2", cls: "violet" }   },
  // { id: "people",      label: "Browse People",icon: "manage_search",  href: "/people",         badge: null         },
  { id: "competitions",  label: "Competitions",   icon: "emoji_events",   href: "/events",     badge: { text: "New", cls: "green" }  },
  { id: "skills-test", label: "Skill Test",   icon: "quiz",           href: "/skills-test",      badge: null},
  { id: "skills-share", label: "Skill Share", icon: "co_present",            href:"/skills-share",   badge:null}
];
export const ACCOUNT_NAV = [
  { id: "profile",     label: "My Profile",   icon: "manage_accounts", href: "/profile",       badge: null },
  { id: "settings",    label: "Settings",     icon: "settings",        href: "/settings",      badge: null },
];


export const SKILLS = [
  { id:'js',      name:'JavaScript',    icon:'code',               iconColor:'var(--yellow)',   iconBg:"rgba(99,218,255,0.12)", questions:5 },
  { id:'python',  name:'Python',        icon:'terminal',           iconColor:'var(--cyan)',     iconBg:"rgba(99,218,255,0.12)", questions:5},
  { id:'react',   name:'React',         icon:'widgets',            iconColor:'#61DAFB',       iconBg:"rgba(99,218,255,0.12)", questions:5 },
  { id:'css',     name:'CSS',           icon:'palette',            iconColor:'var(--violet)',   iconBg:"rgba(99,218,255,0.12)", questions:5 },
  { id:'sql',     name:'SQL',           icon:'storage',            iconColor:'var(--green)',    iconBg:"rgba(99,218,255,0.12)", questions:5 },
  { id:'git',     name:'Git',           icon:'merge_type',         iconColor:'var(--red)',      iconBg:"rgba(99,218,255,0.12)", questions:5 },
  { id:'node',    name:'Node.js',       icon:'hub',                iconColor:'#68A063',       iconBg:"rgba(99,218,255,0.12)", questions:5 },
  { id:'ds',      name:'Data Structures',icon:'account_tree',      iconColor:'var(--cyan)',     iconBg:"rgba(99,218,255,0.12)", questions:5 },
  { id:'ml',      name:'Machine Learning',icon:'psychology',       iconColor:'var(--violet)',   iconBg:"rgba(99,218,255,0.12)", questions:5 },
  { id:'system',  name:'System Design', icon:'architecture',       iconColor:'var(--yellow)',   iconBg:"rgba(99,218,255,0.12)", questions:5 },
  { id:'docker',  name:'Docker',        icon:'cloud',              iconCcolor:'#2496ED',      iconBg:"rgba(99,218,255,0.12)", questions:5 },
  { id:'ts',      name:'TypeScript',    icon:'data_object',        iconColor:'#3178C6',       iconBg:"rgba(99,218,255,0.12)", questions:5 },
];

export const QUESTION_BANK = {
  js: [
    { id:1, diff:'easy', text:'What does `typeof null` return in JavaScript?', options:['null','undefined','object','boolean'], correct:2, explanation:'This is a known JavaScript quirk — typeof null returns "object" due to a legacy bug.' },
    { id:2, diff:'easy', text:'Which method creates a shallow copy of an array?', options:['Array.clone()','arr.slice()','arr.copy()','arr.duplicate()'], correct:1, explanation:'arr.slice() without arguments returns a shallow copy of the array.' },
    { id:3, diff:'easy', text:'What is the output of `0.1 + 0.2 === 0.3` in JavaScript?', options:['true','false','NaN','undefined'], correct:1, explanation:'Floating-point precision issues cause 0.1 + 0.2 to equal 0.30000000000000004, not 0.3.' },
    { id:4, diff:'easy', text:'What does the `===` operator check?', options:['Value only','Type only','Value and type','Reference equality'], correct:2,
      explanation:'=== is strict equality, checking both value and type without coercion.' },
    { id:5, diff:'easy', text:'Which keyword declares a block-scoped variable?', options:['var','let','function','global'], correct:1,
      explanation:'let is block-scoped; var is function-scoped.' },
    { id:6, diff:'easy', text:'What does `Array.isArray([])` return?', options:['false','true','null','undefined'], correct:1,
      explanation:'Array.isArray() returns true for arrays and false for everything else.' },
    { id:7, diff:'easy', text:'Which of these is NOT a JavaScript data type?', options:['Symbol','BigInt','Float','String'], correct:2,
      explanation:'Float is not a distinct JS type; numbers are all Number (or BigInt).' },
    { id:8, diff:'easy',text:'What does `Promise.all()` do when one promise rejects?', options:['Ignores it','Waits for all','Rejects immediately','Returns undefined'], correct:2,
      explanation:'Promise.all() rejects immediately when any one promise in the array rejects.' },
    { id:9, diff:'easy', text:'What is a closure in JavaScript?', options:['A loop construct','A function with access to its outer scope','An error handler','An async function'], correct:1,
      explanation:'A closure is a function that retains access to variables from its enclosing scope.' },
    { id:10, diff:'easy', text:'Which method stops event propagation?', options:['event.stop()','event.preventDefault()','event.stopPropagation()','event.cancel()'], correct:2,
      explanation:'stopPropagation() prevents the event from bubbling up the DOM tree.' },
    { id:11, diff:'easy', text:'What is the result of `"5" - 3` in JavaScript?', options:['"53"','Error','2','NaN'], correct:2,
      explanation:'The minus operator triggers numeric coercion, so "5" becomes 5, giving 2.' },
    { id:12, diff:'easy', text:'What does the `spread` operator (`...`) do?', options:['Deletes elements','Expands iterable into individual elements','Creates a Promise','Binds `this`'], correct:1,
      explanation:'Spread expands an iterable (array, string, etc.) into its individual elements.' },
    { id:13, diff:'easy', text:'Which built-in method removes the last element of an array?', options:['shift()','pop()','splice()','delete()'], correct:1,
      explanaton:'pop() removes and returns the last element of an array.' },
    { id:14, diff:'easy', text:'What is `NaN === NaN` in JavaScript?', options:['true','false','undefined','TypeError'], correct:1,
      explanation:'NaN is the only value that is not equal to itself. Use Number.isNaN() to check.' },
    { id:15, diff:'easy', text:'What does `localStorage.setItem()` do?', options:['Reads a value','Deletes a key','Stores a key-value pair persistently','Sends data to a server'], correct:2,
      explanation:'setItem() stores a string value at a given key in the browser\'s localStorage.' },
    { id:16, diff:'easy', text:'What is the purpose of `async/await`?', options:['To create classes','To write synchronous-style code for async operations','To define prototypes','To handle CSS'], correct:1,
      explanation:'async/await is syntactic sugar over Promises for cleaner asynchronous code.' },
    { id:17, diff:'easy', text:'Which method is used to parse a JSON string?', options:['JSON.stringify()','JSON.parse()','JSON.decode()','JSON.read()'], correct:1,
      explanation:'JSON.parse() converts a JSON string into a JavaScript object.' },
    { id:18, diff:'easy', text:'What does `Array.prototype.map()` return?', options:['The original array','undefined','A new transformed array','A boolean'], correct:2,
      explanation:'map() returns a new array with results of calling the callback on each element.' },
    { id:19, diff:'easy', text:'What is the event loop responsible for?', options:['Rendering HTML','Handling asynchronous callbacks','Parsing CSS','Managing memory'], correct:1,
      explanation:'The event loop processes the callback queue after the call stack is empty.' },
    { id:20, diff:'easy', text:'Which symbol is used for template literals?', options:['Single quotes','Double quotes','Backticks','Forward slashes'], correct:2,
      explanation:'Template literals use backticks (`) and support embedded expressions via ${}.' },
    { 
      id: 21, diff: 'easy', 
      text: 'Which of the following is NOT a JavaScript data type?', 
      options: ['String', 'Boolean', 'Float', 'Undefined'], correct: 2,
      explanation: 'JavaScript has a Number type that handles both integers and floating-point values; "Float" is not a separate primitive type.' 
    },
    { 
      id: 22, diff: 'easy', 
      text: 'What is the result of "5" + 5?', 
      options: ['10', '"55"', 'NaN', 'TypeError'], correct: 1,
      explanation: 'The plus operator triggers string coercion if one operand is a string, resulting in concatenation.' 
    },
    { 
      id: 23, diff: 'easy', 
      text: 'Which keyword is used to declare a block-scoped variable?', 
      options: ['var', 'let', 'const', 'Both let and const'], correct: 3,
      explanation: 'let and const are block-scoped, meaning they only exist within the curly braces {} they are defined in.' 
    },
    { 
      id: 24, diff: 'easy', 
      text: 'What does the "===" operator check?', 
      options: ['Value equality only', 'Assignment', 'Value and Type equality', 'Reference equality only'], correct: 2,
      explanation: 'Strict equality (===) checks both the value and the data type without performing type conversion.' 
    },
    { 
      id: 25, diff: 'easy', 
      text: 'How do you write an arrow function?', 
      options: ['function => ()', '() => {}', 'callback: ()', '=> function()'], correct: 1,
      explanation: 'Arrow functions use the parameters in parentheses followed by the "fat arrow" and function body.' 
    },

    // --- BUILDER LEVEL (intermediate) ---
    { 
      id: 26, diff: 'intermediate', 
      text: 'What is a "closure" in JavaScript?', 
      options: ['A function that returns a value', 'A function bundled with its lexical environment', 'A way to close a browser tab', 'A method to end a loop'], correct: 1,
      explanation: 'Closures allow a function to access variables from an outer function scope even after the outer function has finished executing.' 
    },
    { 
      id: 27, diff: 'intermediate', 
      text: 'What is the purpose of the "this" keyword?', 
      options: ['It refers to the current function name', 'It refers to the object the function is a property of', 'It is a placeholder for future variables', 'It always refers to the global window object'], correct: 1,
      explanation: 'In an object method, "this" refers to the "owner" object, though its value depends on how the function is called.' 
    },
    { 
      id: 28, diff: 'intermediate', 
      text: 'What does Array.prototype.map() return?', 
      options: ['The original array modified', 'A single value (accumulator)', 'A new array with the results of the callback function', 'A boolean'], correct: 2,
      explanation: 'Map creates a new array of the same length, populated with the results of calling a provided function on every element.' 
    },
    { 
      id: 29, diff: 'intermediate', 
      text: 'What is the difference between "undefined" and "null"?', 
      options: ['They are identical', 'Undefined is for objects; Null is for primitives', 'Undefined means a variable is declared but not assigned; Null is an intentional absence of value', 'Null is a type; Undefined is a value'], correct: 2,
      explanation: 'Undefined is the default value of uninitialized variables; null is an assignment value used to represent "no value".' 
    },
    { 
      id: 30, diff: 'intermediate', 
      text: 'What is the Event Loop?', 
      options: ['A loop that runs through every element in an array', 'The mechanism that handles asynchronous callbacks by pushing them to the call stack', 'A CSS animation tool', 'A way to prevent infinite loops'], correct: 1,
      explanation: 'The Event Loop monitors the Callback Queue and moves tasks to the Stack when it is empty.' 
    },

    // --- ARCHITECT LEVEL (hard) ---
    { 
      id: 31, diff: 'hard', 
      text: 'What is "Hoisting" in JavaScript?', 
      options: ['Moving all script tags to the header', 'JavaScript’s behavior of moving declarations to the top of their scope during compilation', 'A method for lifting heavy data objects', 'The process of minifying code'], correct: 1,
      explanation: 'Function and variable declarations are moved to the top of their scope, though "let" and "const" are not initialized (TDZ).' 
    },
    { 
      id: 32, diff: 'hard', 
      text: 'How does Prototypal Inheritance work?', 
      options: ['Objects inherit from classes directly', 'Objects have a link to a prototype object from which they inherit properties and methods', 'It is a copy of all properties from one object to another', 'Inheritance is handled by the compiler at build time'], correct: 1,
      explanation: 'JavaScript uses a prototype chain; if a property isn\'t found on an object, JS looks up the chain to find it.' 
    },
    { 
      id: 33, diff: 'hard', 
      text: 'What is the "Temporal Dead Zone" (TDZ)?', 
      options: ['A period where the website is unresponsive', 'The state between a variable\'s scope entry and its actual declaration (for let/const)', 'A way to delete old memory', 'The time it takes for a Promise to resolve'], correct: 1,
      explanation: 'Accessing a let/const variable before its declaration line results in a ReferenceError due to the TDZ.' 
    },
    { 
      id: 34, diff: 'hard', 
      text: 'What is the difference between a "Promise" and "Async/Await"?', 
      options: ['Async/Await is faster than Promises', 'Async/Await is syntactic sugar built on top of Promises for cleaner asynchronous code', 'Promises are deprecated', 'Promises are for frontend; Async is for backend'], correct: 1,
      explanation: 'Async/Await makes asynchronous code look and behave a bit more like synchronous code, improving readability.' 
    },
    { 
      id: 35, diff: 'hard', 
      text: 'What is "Debouncing" in the context of JS performance?', 
      options: ['Removing extra spaces from strings', 'Limiting the rate at which a function is executed by ensuring it only runs after a delay', 'A method to clear the cache', 'A way to fix variable naming conflicts'], correct: 1,
      explanation: 'Debouncing prevents a function from firing too often (e.g., on window resize) by waiting for a pause in the events.' 
    }
  ],
  python: [
    /* ═════════ EASY ═════════ */

    { id:1, diff:'easy', text:'Which of these is a valid Python list?', options:['(1,2,3)','[1,2,3]','{1,2,3}','<1,2,3>'], correct:1,
      explanation:'Square brackets define a list in Python. () is a tuple, {} is a set/dict.' },

    { id:2, diff:'easy', text:'What does `len("hello")` return?', options:['4','5','6','Error'], correct:1,
      explanation:'len() returns number of characters, so "hello" has 5.' },

    { id:3, diff:'easy', text:'How do you start a comment in Python?', options:['//','/* */','#','--'], correct:2,
      explanation:'# is used for single-line comments in Python.' },

    { id:4, diff:'easy', text:'Which keyword defines a function in Python?', options:['function','func','def','fn'], correct:2,
      explanation:'Functions are defined using def keyword.' },

    { id:5, diff:'easy', text:'What is the output of type(3.14)?', options:["<class 'int'>","<class 'float'>","<class 'double'>","<class 'number'>"], correct:1,
      explanation:'3.14 is a float in Python.' },

    { id:6, diff:'easy', text:'What does range(5) produce?', options:['[1,2,3,4,5]','[0,1,2,3,4]','(0,1,2,3,4)','Iterator from 0 to 4'], correct:3,
      explanation:'range(5) generates values 0 to 4 lazily.' },

    { id:7, diff:'easy', text:'Which method removes whitespace from both ends of a string?', options:['clean()','strip()','trim()','remove()'], correct:1,
      explanation:'strip() removes leading and trailing spaces.' },

    { id:8, diff:'easy', text:'What is a Python dictionary?', options:['Ordered list','Key-value pair collection','Tuple','Function'], correct:1,
      explanation:'Dictionary stores key-value pairs.' },

    { id:9, diff:'easy', text:'What does __init__ do in a class?', options:['Deletes object','Initializes object','Creates module','Imports file'], correct:1,
      explanation:'__init__ is constructor method.' },

    { id:10, diff:'easy', text:'Which block handles exceptions?', options:['catch','try/except','handle','error'], correct:1,
      explanation:'Python uses try/except for exception handling.' },

    { id:11, diff:'easy', text:'What does list.append(x) do?', options:['Adds at start','Removes x','Adds at end','Sorts list'], correct:2,
      explanation:'append() adds element at end of list.' },

    { id:12, diff:'easy', text:'What is a generator?', options:['Returns list','Uses yield for lazy values','Class type','Loop type'], correct:1,
      explanation:'Generators yield values lazily.' },

    { id:13, diff:'easy', text:'What is bool(0)?', options:['True','False','None','Error'], correct:1,
      explanation:'0 is falsy in Python.' },

    { id:14, diff:'easy', text:'Which keyword is used for loops?', options:['loop','while','foreach','for'], correct:3,
      explanation:'for is used for iteration.' },

    { id:15, diff:'easy', text:'What does *args allow?', options:['Keyword args','Multiple positional args','Type hints','Return values'], correct:1,
      explanation:'*args collects multiple positional arguments.' },

    { id:16, diff:'easy', text:'How do you open a file?', options:['open()','file()','read()','load()'], correct:0,
      explanation:'open() is used to open files.' },

    { id:17, diff:'easy', text:'What does enumerate() do?', options:['Sorts','Adds index','Counts only','Reverses'], correct:1,
      explanation:'enumerate adds index to iterable.' },

    { id:18, diff:'easy', text:'What is lambda?', options:['Named function','Anonymous function','Class','Module'], correct:1,
      explanation:'lambda creates anonymous functions.' },

    { id:19, diff:'easy', text:'What is pip?', options:['Compiler','Package manager','IDE','Debugger'], correct:1,
      explanation:'pip installs Python packages.' },

    { id:20, diff:'easy', text:'What does "is" check?', options:['Value equality','Type','Identity','Length'], correct:2,
      explanation:'is checks object identity.' },

    { id:21, diff:'easy', text:'What is 2**3 in Python?', options:['6','8','9','Error'], correct:1,
      explanation:'** is exponent operator.' },

    { id:22, diff:'easy', text:'What is "hello"[1:4]?', options:['hel','ell','llo','heo'], correct:1,
      explanation:'Slicing returns characters from index 1 to 3.' },

    { id:23, diff:'easy', text:'What does input() return?', options:['int','float','string','bool'], correct:2,
      explanation:'input() always returns string.' },

    { id:24, diff:'easy', text:'What is Python file extension?', options:['.java','.py','.python','.pt'], correct:1,
      explanation:'.py is Python file extension.' },

    { id:25, diff:'easy', text:'Which data structure is mutable?', options:['tuple','string','list','int'], correct:2,
      explanation:'Lists are mutable in Python.' },


    /* ═════════ INTERMEDIATE ═════════ */

    { id:26, diff:'medium', text:'What is output of 3 * "Hi"?', options:['HiHiHi','3Hi','Error','Hi3'], correct:0,
      explanation:'String multiplication repeats the string.' },

    { id:27, diff:'medium', text:'What is correct list comprehension?', options:['[x for x in range(5)]','for x in range(5) [x]','(x in range 5)','{x range(5)}'], correct:0,
      explanation:'List comprehension uses [expression for item in iterable].' },

    { id:28, diff:'medium', text:'What does dict.get(key) do?', options:['Deletes key','Returns value safely','Sorts dict','Creates key'], correct:1,
      explanation:'get() avoids KeyError if key is missing.' },

    { id:29, diff:'medium', text:'What is output of isinstance(5, int)?', options:['True','False','Error','None'], correct:0,
      explanation:'5 is an integer.' },

    { id:30, diff:'medium', text:'What does break do in loop?', options:['Skips iteration','Ends loop','Restarts loop','Pauses loop'], correct:1,
      explanation:'break exits loop immediately.' },

    { id:31, diff:'medium', text:'What is output of sorted([3,1,2])?', options:['[3,2,1]','[1,2,3]','(1,2,3)','Error'], correct:1,
      explanation:'sorted returns ascending order.' },

    { id:32, diff:'medium', text:'What is a Python module?', options:['Function','File with Python code','Loop','Variable'], correct:1,
      explanation:'Module is a .py file.' },

    { id:33, diff:'medium', text:'What does pass do?', options:['Stops program','Placeholder','Raises error','Returns value'], correct:1,
      explanation:'pass does nothing, used as placeholder.' },

    { id:34, diff:'medium', text:'What is output of bool("")?', options:['True','False','None','Error'], correct:1,
      explanation:'Empty string is falsy.' },

    { id:35, diff:'medium', text:'What is OOP encapsulation?', options:['Hiding data','Looping','Sorting','Compilation'], correct:0,
      explanation:'Encapsulation hides internal data.' },


    /* ═════════ HARD ═════════ */

    { id:36, diff:'hard', text:'What is output of [i*i for i in range(3)]?', options:['[0,1,4]','[1,4,9]','[0,2,4]','Error'], correct:0,
      explanation:'Squares of 0,1,2 → [0,1,4].' },

    { id:37, diff:'hard', text:'What is GIL in Python?', options:['Memory system','Global Interpreter Lock','File system','Compiler'], correct:1,
      explanation:'GIL allows only one thread to execute Python bytecode.' },

    { id:38, diff:'hard', text:'What is decorator?', options:['Function modifying function','Loop','Class','Variable'], correct:0,
      explanation:'Decorators modify behavior of functions.' },

    { id:39, diff:'hard', text:'What is output of map(lambda x:x+1,[1,2,3])?', options:['[2,3,4]','[1,2,3]','Error','None'], correct:0,
      explanation:'map applies function to each element.' },

    { id:40, diff:'hard', text:'What is deep copy?', options:['Copies reference','Copies values recursively','Deletes object','Shares memory'], correct:1,
      explanation:'deepcopy creates independent nested copies.' }
  ],
  react: [
    { id:1, diff:'easy', text:'What is JSX?', options:['A CSS framework','A JavaScript syntax extension for writing HTML-like code','A database query language','A build tool'], correct:1,
      explanation:'JSX is syntactic sugar that lets you write HTML-like markup inside JavaScript.' },
    { id:2, diff:'easy', text:'Which hook manages local component state?', options:['useEffect','useContext','useState','useRef'], correct:2,
      explanation:'useState returns a state variable and a setter function for local component state.' },
    { id:3, diff:'easy', text:'What does `useEffect` with an empty dependency array `[]` do?', options:['Runs on every render','Runs only on unmount','Runs once after initial mount','Never runs'], correct:2,
      explanation:'Empty [] means the effect runs once after the first render, like componentDidMount.' },
    { id:4, diff:'easy', text:'How do you pass data from parent to child in React?', options:['State','Props','Context only','Redux only'], correct:1,
      explanation:'Props are the primary mechanism for passing data down the component tree.' },
    { id:5, diff:'easy', text:'What is the virtual DOM?', options:['A real browser DOM','A lightweight JS representation of the DOM','A CSS engine','A server-side render'], correct:1,
      explanation:'React maintains a virtual DOM to efficiently diff and batch DOM updates.' },
    { id:6, diff:'easy', text:'Which method updates component state?', options:['this.state = {}','setState() or the setter from useState','forceUpdate()','render()'], correct:1,
      explanation:'In class components use setState(); in functional components use the useState setter.' },
    { id:7, diff:'easy', text:'What is the purpose of `key` in a list render?', options:['Styling','Animation','Helping React identify changed items','SEO'], correct:2,
      explanation:'Keys help React efficiently determine which list items changed, were added, or removed.' },
    { id:8, diff:'easy', text:'What does `React.memo` do?', options:['Memoizes state','Prevents re-render if props are unchanged','Caches API calls','Replaces useEffect'], correct:1,
      explanation:'React.memo is a HOC that skips re-rendering if the props haven\'t changed.' },
    { id:9, diff:'easy', text:'What is Context used for?', options:['Styling','Routing','Sharing state across many components without prop drilling','Animation'], correct:2,
      explanation:'Context provides a way to pass data through the component tree without prop drilling.' },
    { id:10, diff:'easy', text:'What does `useRef` return?', options:['A state value','A mutable ref object with a .current property','A promise','A callback'], correct:1,
      explanation:'useRef returns a mutable object whose .current property persists across renders.' },
    { id:11, diff:'easy', text:'What triggers a re-render in a functional component?', options:['Only state changes','State or prop changes','Only prop changes','Manual calls only'], correct:1,
      explanation:'A functional component re-renders when its state or props change.' },
    { id:12, diff:'easy', text:'What is a controlled component?', options:['A component managed by Redux','A form element whose value is controlled by React state','A lazy-loaded component','A class component'], correct:1,
      explanation:'Controlled components have their form input values managed by React state.' },
    { id:13, diff:'easy', text:'What does `useMemo` do?', options:['Creates a ref','Memoizes the result of an expensive computation','Fetches data','Replaces useState'], correct:1,
      explanation:'useMemo caches a computed value, recalculating only when dependencies change.' },
    { id:14, diff:'easy', text:'What is a Higher-Order Component (HOC)?', options:['A component with more than 100 lines','A function that takes a component and returns a new component','A Redux pattern','A CSS-in-JS method'], correct:1,
      explanation:'An HOC is a function that takes a component and returns an enhanced component.' },
    { id:15, diff:'easy', text:'How do you handle side effects in functional components?', options:['render()','componentDidMount()','useEffect()','useState()'], correct:2,
      explanation:'useEffect handles side effects like data fetching, subscriptions, and DOM manipulation.' },
    { id:16, diff:'easy', text:'What does `ReactDOM.render()` do?', options:['Creates a component','Mounts a React element into a DOM node','Fetches data','Deletes elements'], correct:1,
      explanation:'ReactDOM.render() mounts the root React component into a specified DOM container.' },
    { id:17, diff:'easy', text:'Which lifecycle method is called before a component unmounts?', options:['componentDidMount','componentDidUpdate','componentWillUnmount','render'], correct:2,
      explanation:'componentWillUnmount (or useEffect cleanup) is called just before unmounting.' },
    { id:18, diff:'easy', text:'What is the purpose of `useCallback`?', options:['Cache computed values','Memoize a function reference','Manage state','Create refs'], correct:1,
      explanation:'useCallback memoizes a function so it\'s not recreated on every render.' },
    { id:19, diff:'easy', text:'What does lifting state up mean?', options:['Using Redux','Moving state to a common ancestor component','Using server state','Using context'], correct:1,
      explanation:'Lifting state up means moving shared state to the nearest common ancestor.' },
    { id:20, diff:'easy', text:'What is React Fragments used for?', options:['CSS styling','Grouping children without adding extra DOM nodes','Code splitting','API calls'], correct:1,
      explanation:'Fragments let you group a list of children without adding extra nodes to the DOM.' },
    { 
      id: 21, diff: 'intermediate', 
      text: 'Primary purpose of the useEffect hook?', 
      options: ['To manage component styling', 'To perform side effects (data fetching, subscriptions, DOM mutations) after render', 'To replace useState', 'To memoize expensive calculations'], correct: 1,
      explanation: 'useEffect runs after the render is committed to the DOM, making it the right place for side effects.' 
    },
    { 
      id: 22, diff: 'intermediate', 
      text: 'Empty dependency array [] in useEffect means:', 
      options: ['The effect runs on every render', 'The effect never runs', 'The effect runs only once after the initial mount', 'It causes a runtime error'], correct: 2,
      explanation: 'An empty array tells React there are no dependencies to watch, so the effect fires only on mount.' 
    },
    { 
      id: 23, diff: 'intermediate', 
      text: 'Difference between controlled and uncontrolled components?', 
      options: ['Controlled use refs; uncontrolled use state', 'Controlled have form state managed by React state; uncontrolled rely on the DOM', 'Uncontrolled cannot be used in forms', 'They are identical'], correct: 1,
      explanation: 'In controlled components React is the single source of truth for input value; uncontrolled components let the DOM handle it.' 
    },
    { 
      id: 24, diff: 'intermediate', 
      text: 'What does React.memo() do?', 
      options: ['Memoizes the return value of an expensive function', 'Prevents a functional component from re-rendering if its props haven\'t changed', 'Caches API responses', 'Converts a class component to a functional one'], correct: 1,
      explanation: 'React.memo() does a shallow comparison of props and skips re-rendering if they haven\'t changed.' 
    },
    { 
      id: 25, diff: 'intermediate', 
      text: 'Purpose of the key prop when rendering lists?', 
      options: ['It sets the CSS id', 'It helps React identify changed, added, or removed items for efficient reconciliation', 'It is required for event handlers', 'It controls render order of siblings'], correct: 1,
      explanation: 'Keys give React a stable identity for list items so it can minimally update the DOM during re-renders.' 
    },
    { 
      id: 26, diff: 'intermediate', 
      text: "What does 'lifting state up' mean in React?", 
      options: ['Moving state to a common ancestor so siblings can share it', 'Using Context instead of useState', 'Converting local state to a Redux store', 'Moving useState calls to the top of the component'], correct: 0,
      explanation: "When siblings need shared state, it's moved to their closest common ancestor which passes it down as props." 
    },
    { 
      id: 27, diff: 'intermediate', 
      text: 'Difference between useCallback and useMemo?', 
      options: ['useCallback memoizes a value; useMemo memoizes a function', 'useCallback memoizes a function reference; useMemo memoizes the result of calling a function', 'They are identical', 'useCallback is only for event handlers'], correct: 1,
      explanation: 'useCallback prevents a function from being recreated; useMemo prevents an expensive calculation from rerunning.' 
    },

    // --- ARCHITECT LEVEL (hard) ---
    { 
      id: 28, diff: 'hard', 
      text: "How does React's reconciliation algorithm decide what to update?", 
      options: ['It re-renders the full DOM on every change', 'It compares the new virtual DOM with the previous, using element type and key to find minimal DOM mutations', 'It patches the DOM using CSS selectors', 'It uses MutationObserver to track changes'], correct: 1,
      explanation: "React's diffing algorithm has O(n) complexity by assuming type changes require full subtree replacement and using keys for lists." 
    },
    { 
      id: 29, diff: 'hard', 
      text: "What problem does React 18's Concurrent Mode solve?", 
      options: ['It enables server-side rendering', 'It lets React interrupt, pause, and resume rendering to keep the UI responsive during heavy updates', 'It replaces the Context API', 'It enables multi-threaded JS'], correct: 1,
      explanation: 'Concurrent rendering makes updates interruptible so high-priority updates (user input) aren\'t blocked by low-priority ones.' 
    },
    { 
      id: 30, diff: 'hard', 
      text: 'When should you use useReducer over useState?', 
      options: ['Always — useReducer is strictly better', 'When state is a simple boolean or string', 'When state logic is complex with multiple sub-values or next state depends on previous in non-trivial ways', 'Only when integrating with Redux'], correct: 2,
      explanation: 'useReducer centralizes complex state transitions in a pure reducer function, making logic easier to test and reason about.' 
    },
    { 
      id: 31, diff: 'hard', 
      text: 'What is a render prop pattern and what problem does it solve?', 
      options: ['A prop containing JSX to inject — shares stateful logic without HOCs', 'A prop controlling whether a component renders', 'A pattern to pass CSS styles dynamically', 'A way to prevent unnecessary re-renders'], correct: 0,
      explanation: 'Render props share behavior by passing a function-as-prop that the child calls to render, avoiding HOC wrapper hell.' 
    },
    { 
      id: 32, diff: 'hard', 
      text: 'What causes a stale closure in a React hook and how do you prevent it?', 
      options: ['Using too many hooks; split into smaller components', 'A callback capturing an old state/prop because the dependency array is incomplete; fix by including all deps or using a ref', 'Calling a hook conditionally; fix by always calling hooks at top level', 'Using arrow functions inside JSX; move them outside the component'], correct: 1,
      explanation: 'The closure captures the value at render time; a missing dependency means the callback forever sees that snapshot.' 
    }
  ],

  css: [
    { id:1, diff:'easy', text:'What does CSS stand for?', options:['Colorful Style Sheets','Cascading Style Sheets','Computer Style Sheets','Creative Styling System'], correct:1,
      explanation:'CSS stands for Cascading Style Sheets.' },
    { id:2, diff:'easy', text:'Which property controls the space between elements outside their border?', options:['padding','margin','border-spacing','spacing'], correct:1,
      explanation:'Margin controls the space outside an element\'s border.' },
    { id:3, diff:'easy', text:'What does `display: flex` do?', options:['Hides the element','Creates a block-level flex container','Creates an inline element','Removes margin'], correct:1,
      explanation:'display: flex creates a flex container, enabling flexbox layout for its children.' },
    { id:4, diff:'easy', text:'Which CSS unit is relative to the root element\'s font size?', options:['em','px','rem','vh'], correct:2,
      explanation:'rem (root em) is relative to the <html> element\'s font size.' },
    { id:5, diff:'easy', text:'What does `position: absolute` do?', options:['Stays in normal flow','Positions relative to viewport','Positions relative to nearest positioned ancestor','Removes element from page'], correct:2,
      explanation:'Absolute positioning removes the element from normal flow and positions it relative to its nearest positioned ancestor.' },
    { id:6, diff:'easy', text:'Which property adds shadow to text?', options:['box-shadow','text-shadow','shadow','drop-shadow'], correct:1,
      explanation:'text-shadow adds shadow effects directly to text.' },
    { id:7, diff:'easy', text:'What does `z-index` control?', options:['Zoom level','Stacking order of elements','Zero-indexed arrays','Zoom in CSS'], correct:1,
      explanation:'z-index controls the stacking order of positioned elements on the z-axis.' },
    { id:8, diff:'easy', text:'What is the box model composed of?', options:['Content, border, outline','Content, padding, border, margin','Margin, font, border','None of these'], correct:1,
      explanation:'The CSS box model consists of content, padding, border, and margin.' },
    { id:9, diff:'easy', text:'Which value of `display` makes an element take up the full width?', options:['inline','flex','block','grid'], correct:2,
      explanation:'block-level elements take up the full available width by default.' },
    { id:10, diff:'easy', text:'What does `opacity: 0` do?', options:['Deletes the element','Makes it invisible but still takes up space','Removes it from layout','Sets white background'], correct:1,
      explanation:'opacity: 0 makes an element fully transparent but it still occupies space in the layout.' },
    { id:11, diff:'easy', text:'Which CSS property controls how overflowing content is handled?', options:['clip','overflow','hidden','display'], correct:1,
      explanation:'overflow controls whether content that exceeds the box dimensions is clipped, scrolled, or visible.' },
    { id:12, diff:'easy',text:'What does `align-items: center` do in flexbox?', options:['Centers items horizontally','Centers items along the cross axis','Centers text','Centers the container'], correct:1,
      explanation:'align-items controls alignment along the cross axis (vertical in a row flex container).' },
    { id:13, diff:'easy', text:'Which selector has the highest specificity?', options:['Element','Class','ID','Universal (*)'], correct:2,
      explanation:'ID selectors (#id) have higher specificity than class or element selectors.' },
    { id:14, diff:'easy',text:'What does `transition` do?', options:['Creates animations that loop','Smoothly animates property changes over time','Changes DOM structure','Loads fonts'], correct:1,
      explanation:'transition allows CSS property changes to animate smoothly over a specified duration.' },
    { id:15, diff:'easy',text:'What does `grid-template-columns: repeat(3, 1fr)` create?', options:['3 rows','3 equal-width columns','3 cells','A 3x3 grid'], correct:1,
      explanation:'This creates 3 columns each taking an equal fraction of available space.' },
    { id:16, diff:'easy',text:'What is a CSS pseudo-class?', options:['A fake class','A keyword for special element states like :hover','An SCSS feature','A font class'], correct:1,
      explanation:'Pseudo-classes like :hover, :focus, :nth-child target elements in specific states.' },
    { id:17, diff:'easy',text:'What does `box-sizing: border-box` do?', options:['Removes borders','Includes padding and border in element\'s total width/height','Makes element a square','Adds a box shadow'], correct:1,
      explanation:'border-box makes padding and border included in the element\'s specified width/height.' },
    { id:18, diff:'easy',text:'Which property makes content scroll within a container?', options:['overflow: scroll','position: fixed','float: left','clip: rect'], correct:0,
      explanation:'overflow: scroll (or auto) enables scrolling for overflowing content.' },
    { id:19, diff:'easy',text:'What does `@media` query do?', options:['Imports media files','Applies styles based on device characteristics','Animates elements','Loads fonts'], correct:1,
      explanation:'Media queries apply CSS rules conditionally based on screen size, resolution, etc.' },
    { id:20, diff:'easy',text:'Which value centers a block element horizontally?', options:['text-align: center','margin: auto','padding: auto','align: center'], correct:1,
      explanation:'margin: auto on a block element with a set width centers it horizontally.' },
    { 
      id: 21, diff: 'intermediate', 
      text: 'Difference between display: flex and display: grid?', 
      options: ['Flexbox is 2D; Grid is 1D', 'Flexbox handles 1D (row or column); Grid handles 2D (rows and columns simultaneously)', 'Grid only works in modern browsers', 'They are interchangeable'], correct: 1,
      explanation: 'Flexbox aligns items along one axis at a time; Grid lets you control both axes simultaneously.' 
    },
    { 
      id: 22, diff: 'intermediate', 
      text: 'What does position: sticky do?', 
      options: ['Fixes element to viewport at all times', 'Behaves like relative until a scroll threshold, then acts like fixed within its container', 'Removes element from document flow', 'Makes the element overlap others'], correct: 1,
      explanation: 'sticky is a hybrid: it scrolls with content until the threshold is hit, then pins within its scroll container.' 
    },
    { 
      id: 23, diff: 'intermediate', 
      text: 'Which selector has the highest specificity?', 
      options: ['.class-name', 'element', '#id', '*'], correct: 2,
      explanation: 'ID selectors (score 1-0-0) beat class selectors (0-1-0) which beat element selectors (0-0-1).' 
    },
    { 
      id: 24, diff: 'intermediate', 
      text: 'What does the CSS box model consist of?', 
      options: ['content, margin, border, font', 'content, padding, border, margin', 'width, height, position, display', 'content, spacing, outline, shadow'], correct: 1,
      explanation: 'The four layers from inside out are content → padding → border → margin.' 
    },
    { 
      id: 25, diff: 'intermediate', 
      text: 'Difference between box-sizing: content-box and border-box?', 
      options: ['content-box includes padding and border in width; border-box excludes them', 'border-box includes padding and border in width; content-box excludes them', 'They are identical in modern browsers', 'border-box only applies to block elements'], correct: 1,
      explanation: 'border-box makes width mean "total rendered width", simplifying layout math; content-box adds padding/border on top.' 
    },
    { 
      id: 26, diff: 'intermediate', 
      text: 'What does :nth-child(2n+1) select?', 
      options: ['Every second element', 'Only the first child', 'Every odd-numbered child element', 'Every third element'], correct: 2,
      explanation: '2n+1 matches positions 1, 3, 5, … — the odd children; :nth-child(2n) would match even ones.' 
    },
    { 
      id: 27, diff: 'intermediate', 
      text: 'What is a CSS custom property (variable)?', 
      options: ['A shorthand property; declared with @property', 'A reusable value declared with -- prefix and accessed with var()', 'A preprocessor feature from SASS/LESS only', 'A property set at the browser level'], correct: 1,
      explanation: 'Custom properties (e.g., --primary: blue) are declared on any element and read with var(--primary), supporting the cascade.' 
    },

    // --- ARCHITECT LEVEL (hard) ---
    { 
      id: 28, diff: 'hard', 
      text: 'What creates a new CSS stacking context?', 
      options: ['The order HTML elements appear in the DOM; nothing can change it', 'A rendering layer controlling z-index scope; created by position+z-index, opacity<1, transform, filter, etc.', 'The order CSS files are loaded', 'The order rules are applied after specificity resolution'], correct: 1,
      explanation: 'A stacking context isolates z-index; children can never escape their context to overlap elements outside it.' 
    },
    { 
      id: 29, diff: 'hard', 
      text: 'Difference between CSS transitions and CSS animations?', 
      options: ['Transitions are JavaScript-based; animations are CSS', 'Transitions animate between two states triggered by a change; animations use @keyframes for multi-step sequences', 'Animations can only change opacity and transform', 'Transitions require more browser support'], correct: 1,
      explanation: 'Transitions need a trigger (hover, class toggle); @keyframes animations can auto-start, loop, and have multiple steps.' 
    },
    { 
      id: 30, diff: 'hard', 
      text: 'How does the CSS contain property improve performance?', 
      options: ['It compresses CSS files before parsing', 'It tells the browser the subtree is independent, limiting style/layout/paint recalculations to within it', 'It prevents CSS from applying to child elements', 'It enables GPU acceleration'], correct: 1,
      explanation: 'contain: layout stops a subtree\'s layout changes from triggering a full-page reflow, a key rendering optimization.' 
    },
    { 
      id: 31, diff: 'hard', 
      text: 'What causes layout thrashing and how does CSS help?', 
      options: ['Too many CSS classes; reduce rules', 'Alternating between reading and writing layout properties in JS; mitigated by using CSS transforms and batching reads/writes', 'Large image files; use object-fit', 'Too many z-index layers'], correct: 1,
      explanation: 'CSS transforms (translate, scale) don\'t trigger reflow — they run on the compositor thread, avoiding layout thrashing.' 
    },
    { 
      id: 32, diff: 'hard', 
      text: 'What are the four factors of the CSS cascade?', 
      options: ['Alphabetical order, file size, media query, selector type', 'Origin, importance (!important), specificity, and source order', 'Specificity, class count, element count, file order', 'Browser defaults, inherited, inline, external'], correct: 1,
      explanation: 'The cascade resolves conflicts in this order: origin+importance first, then specificity, then source order as a tiebreaker.' 
    }
  ],

  sql: [
    { id:1, diff:'easy', text:'What does SQL stand for?', options:['Structured Query Language','Simple Query Logic','Standard Query List','Sequential Query Language'], correct:0,
      explanation:'SQL stands for Structured Query Language.' },
    { id:2, diff:'easy', text:'Which clause filters rows in a SELECT statement?', options:['GROUP BY','HAVING','WHERE','ORDER BY'], correct:2,
      explanation:'WHERE filters rows before grouping; HAVING filters after grouping.' },
    { id:3, diff:'easy', text:'What does `SELECT *` do?', options:['Deletes all rows','Selects all columns','Creates a table','Counts rows'], correct:1,
      explanation:'SELECT * retrieves all columns from the specified table.' },
    { id:4, diff:'easy', text:'Which JOIN returns only matching rows from both tables?', options:['LEFT JOIN','RIGHT JOIN','FULL JOIN','INNER JOIN'], correct:3,
      explanation:'INNER JOIN returns only the rows where there is a match in both tables.' },
    { id:5, diff:'easy', text:'What does `GROUP BY` do?', options:['Sorts results','Groups rows with same values for aggregation','Filters rows','Joins tables'], correct:1,
      explanation:'GROUP BY groups rows that have the same values, typically used with aggregate functions.' },
    { id:6, diff:'easy',text:'Which aggregate function counts non-null values?', options:['SUM()','AVG()','COUNT()','MAX()'], correct:2,
      explanation:'COUNT() counts the number of non-null values in a column or all rows with COUNT(*).' },
    { id:7, diff:'easy',text:'What does `DISTINCT` do in a query?', options:['Returns the first row','Returns unique values only','Sorts results','Limits rows'], correct:1,
      explanation:'DISTINCT eliminates duplicate rows from the result set.' },
    { id:8, diff:'easy',text:'Which statement adds a new row to a table?', options:['UPDATE','INSERT INTO','CREATE','ALTER'], correct:1,
      explanation:'INSERT INTO adds new rows to a table.' },
    { id:9, diff:'easy',text:'What does `ORDER BY DESC` do?', options:['Ascending sort','Descending sort','Groups data','Filters nulls'], correct:1,
      explanation:'ORDER BY DESC sorts results in descending order (highest to lowest).' },
    { id:10, diff:'easy',text:'What is a PRIMARY KEY?', options:['Any indexed column','A column that uniquely identifies each row','A foreign reference','An auto-increment column only'], correct:1,
      explanation:'A PRIMARY KEY uniquely identifies each record in a table and cannot be null.' },
    { id:11, diff:'easy', text:'What does `HAVING` filter?', options:['Individual rows','Groups after GROUP BY','Null values','Column names'], correct:1,
      explanation:'HAVING filters the results of GROUP BY aggregations.' },
    { id:12, diff:'easy', text:'What does a LEFT JOIN return?', options:['Only matching rows','All rows from left + matches from right','All rows from both','Only right rows'], correct:1,
      explanation:'LEFT JOIN returns all rows from the left table and matched rows from the right (NULL if no match).' },
    { id:13, diff:'easy', text:'What is a FOREIGN KEY?', options:['A primary key of another table referenced in this table','A unique column','An encrypted key','An indexed column'], correct:0,
      explanation:'A FOREIGN KEY references the PRIMARY KEY of another table to enforce referential integrity.' },
    { id:14, diff:'easy', text:'Which function returns the current date in SQL?', options:['NOW()','DATE()','GETDATE()','CURDATE() / CURRENT_DATE'], correct:3,
      explanation:'CURDATE() (MySQL) or CURRENT_DATE returns today\'s date; GETDATE() is SQL Server.' },
    { id:15, diff:'easy', text:'What does `LIMIT 10` do?', options:['Skips 10 rows','Returns only the first 10 rows','Counts 10 rows','Deletes 10 rows'], correct:1,
      explanation:'LIMIT restricts the number of rows returned by the query.' },
    { id:16, diff:'easy', text:'What does `UPDATE` do?', options:['Adds new rows','Deletes rows','Modifies existing rows','Creates a table'], correct:2,
      explanation:'UPDATE modifies existing records in a table, typically combined with WHERE.' },
    { id:17, diff:'easy', text:'What is an INDEX used for in SQL?', options:['Data encryption','Speeding up query lookups','Adding constraints','Joining tables'], correct:1,
      explanation:'Indexes speed up data retrieval at the cost of additional storage and write overhead.' },
    { id:18, diff:'easy', text:'Which keyword removes duplicates when combining two queries?', options:['JOIN','UNION','INTERSECT','MINUS'], correct:1,
      explanation:'UNION combines result sets from two SELECT statements, removing duplicates by default.' },
    { id:19, diff:'easy', text:'What does NULL represent in SQL?', options:['Zero','An empty string','An unknown or missing value','False'], correct:2,
      explanation:'NULL represents the absence of a value or an unknown value.' },
    { id:20, diff:'easy', text:'Which clause is used to give a column or table an alias?', options:['RENAME','AS','ALIAS','LABEL'], correct:1,
      explanation:'AS gives a column or table a temporary alias in the query result.' },
    { 
      id: 21, diff: 'intermediate', 
      text: 'Difference between INNER JOIN and LEFT JOIN?', 
      options: ['INNER returns all rows from both; LEFT returns only matches', 'INNER returns only matching rows; LEFT returns all left rows plus matches (NULLs where none)', 'They are identical', 'LEFT JOIN is faster'], correct: 1,
      explanation: 'INNER JOIN is the intersection; LEFT JOIN is the left table plus the intersection, padding missing rights with NULL.' 
    },
    { 
      id: 22, diff: 'intermediate', 
      text: 'What does GROUP BY do?', 
      options: ['Sorts the result set', 'Filters rows before aggregation', 'Groups rows sharing the same values so aggregate functions apply per group', 'Joins two tables on a common column'], correct: 2,
      explanation: 'Without GROUP BY, aggregate functions (SUM, COUNT) collapse all rows into one; GROUP BY produces one row per group.' 
    },
    { 
      id: 23, diff: 'intermediate', 
      text: 'Difference between WHERE and HAVING?', 
      options: ['WHERE filters columns; HAVING filters rows', 'WHERE filters rows before grouping; HAVING filters groups after aggregation', 'HAVING is used only with ORDER BY', 'They are interchangeable'], correct: 1,
      explanation: 'WHERE can\'t reference aggregate results; HAVING is applied after GROUP BY to filter aggregated groups.' 
    },
    { 
      id: 24, diff: 'intermediate', 
      text: 'What does a PRIMARY KEY constraint enforce?', 
      options: ['The column is indexed and can have duplicates', 'The column must be a number', 'Values must be unique and non-null, uniquely identifying each row', 'The column is automatically encrypted'], correct: 2,
      explanation: 'A primary key is the row\'s unique identifier; it implicitly creates an index and disallows NULL and duplicates.' 
    },
    { 
      id: 25, diff: 'intermediate', 
      text: 'What is a subquery?', 
      options: ['A stored procedure with parameters', 'A query nested inside another query, used in SELECT, FROM, or WHERE clauses', 'A query that runs on a subset of a table', 'A query that modifies data'], correct: 1,
      explanation: 'Subqueries allow results of one query to drive another, enabling filtering by aggregates or derived sets.' 
    },
    { 
      id: 26, diff: 'intermediate', 
      text: 'What does DISTINCT do in SELECT?', 
      options: ['Sorts the result alphabetically', 'Removes duplicate rows from the result set', 'Returns only NULL values', 'Limits the result to 1 row'], correct: 1,
      explanation: 'DISTINCT eliminates rows where all selected column values are identical, returning only unique combinations.' 
    },
    { 
      id: 27, diff: 'intermediate', 
      text: 'What is a foreign key?', 
      options: ['A key from an external database', 'A column that uniquely identifies each row in its own table', 'A column referencing the primary key of another table, enforcing referential integrity', 'An encrypted primary key'], correct: 2,
      explanation: 'Foreign keys prevent orphaned rows by ensuring referenced values exist in the parent table.' 
    },

    // --- ARCHITECT LEVEL (hard) ---
    { 
      id: 28, diff: 'hard', 
      text: 'What is a database index and its trade-offs?', 
      options: ['A backup copy of a table; only disk space trade-off', 'A data structure (usually B-tree) that speeds up reads but slows writes and uses extra storage', 'A constraint preventing duplicate values', 'A virtual table based on a query'], correct: 1,
      explanation: 'Indexes make SELECT faster but every INSERT/UPDATE/DELETE must also update the index, adding write overhead.' 
    },
    { 
      id: 29, diff: 'hard', 
      text: 'ACID: which property ensures all-or-nothing transactions?', 
      options: ['Authorization, Concurrency, Integrity, Durability — Concurrency', 'Atomicity, Consistency, Isolation, Durability — Atomicity', 'Atomicity, Concurrency, Indexing, Durability — Durability', 'Access, Consistency, Integrity, Distribution — Integrity'], correct: 1,
      explanation: 'Atomicity means a transaction is treated as a single unit — it either fully commits or fully rolls back.' 
    },
    { 
      id: 30, diff: 'hard', 
      text: 'What is a CTE and when is it preferred over a subquery?', 
      options: ['A permanent table from a query; preferred for large datasets', 'A named temporary result set defined with WITH, improving readability and enabling recursive queries', 'A compiled stored procedure; preferred for performance', 'A cross-database join mechanism'], correct: 1,
      explanation: 'CTEs make complex queries more readable and are the only way to write recursive queries (WITH RECURSIVE).' 
    }
  ],

  git: [
    { id:1, diff:'easy', text:'What does `git init` do?', options:['Clones a repo','Creates a new local git repository','Stages all files','Pushes to remote'], correct:1,
      explanation:'git init initializes a new empty Git repository in the current directory.' },
    { id:2, diff:'easy', text:'What does `git status` show?', options:['Commit history','Working tree status and staged changes','Remote branches','Stashed changes'], correct:1,
      explanation:'git status shows modified, staged, and untracked files in the working directory.' },
    { id:3, diff:'easy', text:'What does `git add .` do?', options:['Commits all files','Stages all modified/new files','Pushes to origin','Creates a branch'], correct:1,
      explanation:'git add . stages all changes in the current directory for the next commit.' },
    { id:4, diff:'easy', text:'What does `git commit -m "msg"` do?', options:['Pushes changes','Saves staged changes as a commit with a message','Merges branches','Tags a release'], correct:1,
      explanation:'git commit creates a snapshot of staged changes with the given message.' },
    { id:5, diff:'easy', text:'What does `git pull` do?', options:['Pushes local commits','Fetches and merges remote changes','Creates a branch','Deletes a branch'], correct:1,
      explanation:'git pull fetches changes from the remote and merges them into the current branch.' },
    { id:6, diff:'easy', text:'What is a branch in Git?', options:['A backup','A pointer to a specific commit, allowing parallel work','A remote repository','A merge conflict'], correct:1,
      explanation:'A branch is a lightweight movable pointer to a commit, enabling parallel workflows.' },
    { id:7, diff:'easy',text:'What does `git merge` do?', options:['Deletes a branch','Integrates changes from one branch into another','Creates a tag','Resets commits'], correct:1,
      explanation:'git merge combines the history of two branches together.' },
    { id:8, diff:'easy',text:'What is a merge conflict?', options:['A deleted file','A permission error','A situation where two branches have conflicting changes','A network error'], correct:2,
      explanation:'A merge conflict occurs when two branches modify the same part of a file differently.' },
    { id:9, diff:'easy',text:'What does `git stash` do?', options:['Commits all changes','Temporarily shelves uncommitted changes','Deletes untracked files','Resets HEAD'], correct:1,
      explanation:'git stash saves your uncommitted changes temporarily so you can switch contexts.' },
    { id:10, diff:'easy',text:'What is `origin` in Git?', options:['Your local branch','The default name for the remote repository','A commit hash','A tag'], correct:1,
      explanation:'origin is the conventional name given to the remote repository you cloned from.' },
    { id:11, diff:'easy',text:'What does `git rebase` do?', options:['Merges branches','Moves or combines commits onto a new base commit','Resets history','Tags a commit'], correct:1,
      explanation:'git rebase replays commits on top of another branch, creating a linear history.' },
    { id:12, diff:'easy',text:'What is `HEAD` in Git?', options:['The latest remote commit','A pointer to the current checked-out commit/branch','A deleted commit','A merge marker'], correct:1,
      explanation:'HEAD points to the currently checked-out commit or branch tip.' },
    { id:13, diff:'easy',text:'What does `git clone` do?', options:['Creates a new repo','Copies a remote repository to your local machine','Merges branches','Pushes changes'], correct:1,
      explanation:'git clone creates a local copy of a remote repository including its full history.' },
    { id:14, diff:'easy',text:'What does `git log` show?', options:['Current status','Stashed changes','Commit history','Branch list'], correct:2,
      explanation:'git log displays the commit history of the current branch.' },
    { id:15, diff:'easy',text:'What is `.gitignore` used for?', options:['Staging files','Deleting branches','Specifying files Git should ignore','Configuring remotes'], correct:2,
      explanation:'.gitignore lists files and patterns that Git should not track.' },
    { id:16, diff:'easy',text:'What does `git reset --hard` do?', options:['Resets staging area only','Discards all changes and resets to a previous commit','Stashes changes','Merges branches'], correct:1,
      explanation:'git reset --hard discards all uncommitted changes and resets to the specified commit.' },
    { id:17, diff:'easy',text:'What is a `tag` in Git?', options:['A branch alias','A marked reference to a specific commit, often for releases','A remote name','A file label'], correct:1,
      explanation:'Tags mark specific commits, commonly used to mark release versions like v1.0.' },
    { id:18, diff:'easy',text:'Which command shows the differences between working directory and staged?', options:['git log','git diff','git status','git show'], correct:1,
      explanation:'git diff shows unstaged changes; git diff --staged shows staged vs last commit.' },
    { id:19, diff:'easy',text:'What does `git fetch` do?', options:['Merges remote changes','Downloads remote changes without merging','Creates a branch','Pushes changes'], correct:1,
      explanation:'git fetch retrieves remote changes but does not merge them into your working branch.' },
    { id:20, diff:'easy',text:'What does `git cherry-pick` do?', options:['Selects a random commit','Applies a specific commit to the current branch','Deletes commits','Compares branches'], correct:1,
      explanation:'git cherry-pick applies the changes from a specific commit onto the current branch.' },
    { 
      id: 21, diff: 'easy', 
      text: 'Which command is used to initialize a new Git repository?', 
      options: ['git start', 'git create', 'git init', 'git setup'], correct: 1,
      explanation: 'git init creates a new .git subdirectory in your current working directory to begin tracking files.' 
    },
    { 
      id: 22, diff: 'easy', 
      text: 'How do you check the state of your working directory and staging area?', 
      options: ['git check', 'git status', 'git inspect', 'git log'], correct: 1,
      explanation: 'git status shows which files are staged, unstaged, or untracked.' 
    },
    { 
      id: 23, diff: 'easy', 
      text: 'Which command moves changes from the working directory to the staging area?', 
      options: ['git commit', 'git push', 'git add', 'git stage'], correct: 2,
      explanation: 'git add <file> tells Git you want to include updates to a particular file in the next commit.' 
    },
    { 
      id: 24, diff: 'easy', 
      text: "What does 'git commit -m \"message\"' do?", 
      options: ['Uploads code to GitHub', 'Saves a snapshot of staged changes with a descriptive message', 'Deletes the current branch', 'Downloads the latest changes'], correct: 1,
      explanation: 'Commits are local snapshots of your project at a specific point in time.' 
    },
    { 
      id: 25, diff: 'easy', 
      text: 'Which command is used to copy an existing repository from a remote server?', 
      options: ['git copy', 'git download', 'git clone', 'git pull'], correct: 2,
      explanation: 'git clone creates a local copy of a remote repository and sets up remote tracking.' 
    },

    // --- BUILDER LEVEL (intermediate) ---
    { 
      id: 26, diff: 'intermediate', 
      text: 'What is the difference between git fetch and git pull?', 
      options: ['They are identical', 'fetch downloads data but doesn\'t merge it; pull downloads and immediately tries to merge', 'pull only works for private repos', 'fetch is for branches; pull is for tags'], correct: 1,
      explanation: 'git pull is essentially git fetch followed by git merge FETCH_HEAD.' 
    },
    { 
      id: 27, diff: 'intermediate', 
      text: 'How do you create a new branch and switch to it immediately?', 
      options: ['git branch <name>', 'git switch <name>', 'git checkout -b <name>', 'git move <name>'], correct: 2,
      explanation: 'The -b flag with checkout (or git switch -c) creates the branch before switching.' 
    },
    { 
      id: 28, diff: 'intermediate', 
      text: 'What does "git merge" do?', 
      options: ['Deletes a branch', 'Combines the histories of two branches', 'Renames a repository', 'Uploads files to a server'], correct: 1,
      explanation: 'Merge takes the independent lines of development created by branches and integrates them into a single branch.' 
    },
    { 
      id: 29, diff: 'intermediate', 
      text: 'What is "git stash" used for?', 
      options: ['Deleting unused files', 'Temporarily shelving uncommitted changes to work on something else', 'Pushing code to a hidden branch', 'Viewing the history of a single file'], correct: 1,
      explanation: 'Stashing saves your dirty working directory on a stack of unfinished changes that you can reapply later.' 
    },
    { 
      id: 30, diff: 'intermediate', 
      text: 'How do you view the commit history of a repository?', 
      options: ['git history', 'git log', 'git show', 'git status'], correct: 1,
      explanation: 'git log lists the commits made in the repository in reverse chronological order.' 
    },

    // --- ARCHITECT LEVEL (hard) ---
    { 
      id: 31, diff: 'hard', 
      text: 'What is the difference between "git merge" and "git rebase"?', 
      options: ['Merge creates a new commit joining histories; Rebase moves the entire feature branch to the tip of main', 'Rebase is safer than merge', 'Merge only works on local branches', 'Rebase deletes the commit history'], correct: 0,
      explanation: 'Rebase rewrites project history by creating brand new commits for each commit in the original branch, resulting in a linear history.' 
    },
    { 
      id: 32, diff: 'hard', 
      text: 'What does "git cherry-pick" allow you to do?', 
      options: ['Select the best branch to work on', 'Apply the changes introduced by an existing commit from another branch onto your current branch', 'Delete specific lines of code', 'Merge only the last commit of a branch'], correct: 1,
      explanation: 'Cherry-picking is useful for bringing a specific fix or feature from one branch to another without merging the whole branch.' 
    },
    { 
      id: 33, diff: 'hard', 
      text: 'What is a "detached HEAD" state in Git?', 
      options: ['A fatal error that deletes the repo', 'When your working directory points to a specific commit instead of a branch', 'When the server is down', 'When you have uncommitted changes'], correct: 1,
      explanation: 'In detached HEAD, you are looking at a snapshot. Any commits made here won\'t belong to a branch and can be lost if you switch away.' 
    },
    { 
      id: 34, diff: 'hard', 
      text: 'What is the purpose of the "git reflog" command?', 
      options: ['To view a log of all reference changes (checkouts, resets, etc.) even if not in branch history', 'To repair a broken repository', 'To list all remote repositories', 'To delete all temporary files'], correct: 0,
      explanation: 'Reflog is a safety net; it records when branch tips were updated, allowing you to recover "lost" commits after a bad rebase.' 
    },
    { 
      id: 35, diff: 'hard', 
      text: 'What does "git reset --hard" do compared to "--soft"?', 
      options: ['Soft deletes files; Hard keeps them', 'Soft only moves the HEAD pointer; Hard moves HEAD and overwrites staging and working directory', 'There is no difference', 'Hard only works on remote repositories'], correct: 1,
      explanation: '--hard is destructive as it discards all uncommitted changes in your working directory and staging area.' 
    }
  ],

  node: [
    { id:1, diff:'easy', text:'What is Node.js?', options:['A browser plugin','A JavaScript runtime built on Chrome\'s V8 engine','A database','A CSS framework'], correct:1,
      explanation:'Node.js is a server-side JavaScript runtime environment built on Chrome\'s V8 engine.' },
    { id:2, diff:'easy', text:'What is npm?', options:['A Node module','A package manager for Node.js','A testing library','A build tool'], correct:1,
      explanation:'npm (Node Package Manager) is used to install, share, and manage Node.js packages.' },
    { id:3, diff:'easy', text:'Which object provides HTTP functionality in Node.js?', options:['fs','path','http','os'], correct:2,
      explanation:'The built-in http module lets you create web servers and handle HTTP requests.' },
    { id:4, diff:'easy', text:'What is Express.js?', options:['A Node.js database','A minimalist web framework for Node.js','A testing framework','A module bundler'], correct:1,
      explanation:'Express.js is a popular, minimal web framework that simplifies building servers with Node.js.' },
    { id:5, diff:'easy', text:'What does `require()` do in Node.js?', options:['Runs a script','Imports a module','Creates a server','Deletes a file'], correct:1,
      explanation:'require() imports a CommonJS module (built-in, npm package, or local file).' },
    { id:6, diff:'easy', text:'What is `process.env` used for?', options:['File paths','Environment variables','Process IDs','Memory usage'], correct:1,
      explanation:'process.env contains environment variables, commonly used for secrets and config.' },
    { id:7, diff:'easy', text:'What is the `fs` module used for?', options:['HTTP requests','File system operations','Event handling','Crypto'], correct:1,
      explanation:'The fs (file system) module allows reading, writing, and manipulating files.' },
    { id:8, diff:'easy', text:'What does `module.exports` do?', options:['Imports a module','Deletes a module','Exports values from a module','Installs packages'], correct:2,
      explanation:'module.exports defines what a module exposes when required by another file.' },
    { id:9, diff:'easy', text:'What is middleware in Express?', options:['A database layer','Functions that process requests before reaching route handlers','A template engine','A logging library'], correct:1,
      explanation:'Middleware functions have access to req, res, and next; they process requests in a pipeline.' },
    { id:10, diff:'easy',text:'What does `npm install` do?', options:['Runs the app','Installs dependencies listed in package.json','Creates a server','Builds the project'], correct:1,
      explanation:'npm install reads package.json and installs all listed dependencies into node_modules.' },
    { id:11, diff:'easy',text:'What is `package.json` for?', options:['Storing API keys','Defining project metadata and dependencies','HTML templates','Database config'], correct:1,
      explanation:'package.json describes the project, its dependencies, and scripts.' },
    { id:12, diff:'easy', text:'What is an EventEmitter in Node.js?', options:['A timer','An object that can emit and listen for named events','A stream','A thread'], correct:1,
      explanation:'EventEmitter allows objects to emit events and attach listener functions.' },
    { id:13, diff:'easy', text:'What does `async/await` require in Node.js?', options:['Callbacks','Promises','Synchronous code','C++ addons'], correct:1,
      explanation:'async/await is syntactic sugar over Promises; the awaited expression must return a Promise.' },
    { id:14, diff:'easy', text:'What is a stream in Node.js?', options:['A database connection','Data handled chunk by chunk rather than all at once','A timer','A thread pool'], correct:1,
      explanation:'Streams process data incrementally, making them memory-efficient for large data.' },
    { id:15, diff:'easy', text:'Which HTTP status code means "Not Found"?', options:['200','301','403','404'], correct:3,
      explanation:'404 is the standard HTTP status code for a resource that could not be found.' },
    { id:16, diff:'easy', text:'What is `nodemon` used for?', options:['Testing','Auto-restarting the server on file changes','Package management','Deployment'], correct:1,
      explanation:'nodemon watches for file changes and automatically restarts your Node server.' },
    { id:17, diff:'easy', text:'How do you start a basic HTTP server in Node.js?', options:['fs.createServer()','http.createServer()','server.listen()','express.listen()'], correct:1,
      explanation:'http.createServer() creates an HTTP server; .listen() binds it to a port.' },
    { id:18, diff:'easy', text:'What does `res.json()` do in Express?', options:['Sends an HTML response','Sends a JSON response with proper headers','Reads a JSON file','Parses a request'], correct:1,
      explanation:'res.json() serializes an object to JSON and sends it with Content-Type: application/json.' },
    { id:19, diff:'easy',text:'What is the purpose of `.env` files?', options:['Storing HTML templates','Storing environment-specific config and secrets','Caching data','Logging errors'], correct:1,
      explanation:'.env files store environment variables (like API keys) outside of source code.' },
    { id:20, diff:'easy',text:'What does `app.use()` do in Express?', options:['Creates a route','Mounts middleware or routers','Starts the server','Connects to a database'], correct:1,
      explanation:'app.use() mounts middleware at a path, executing it for every matching request.' },
    { 
      id: 21, diff: 'intermediate', 
      text: 'How does the Node.js Event Loop work?', 
      options: ['Multi-threaded execution', 'Single-threaded non-blocking I/O using a callback queue', 'Synchronous execution of all tasks', 'Parallel processing of multiple requests'], correct: 1,
      explanation: 'Node.js uses a single thread but delegates I/O tasks to the system, handling results via an event loop.' 
    },
    { 
      id: 22, diff: 'intermediate', 
      text: 'Difference between CommonJS (require) and ES Modules (import)?', 
      options: ['require is synchronous and loaded at runtime; import is asynchronous and analyzed at build time', 'import is only for CSS', 'require is newer than import', 'They are identical'], correct: 0,
      explanation: 'CommonJS evaluates scripts as they are required; ESM allows for static analysis and tree-shaking.' 
    },
    { 
      id: 23, diff: 'intermediate', 
      text: 'What is the purpose of process.nextTick()?', 
      options: ['To delay execution until the next day', 'To schedule a callback to run immediately after the current operation, before the event loop continues', 'To stop the event loop', 'To schedule a task for the next second'], correct: 1,
      explanation: 'nextTick queue is drained immediately after the current operation, making it higher priority than setTimeout.' 
    },

    // --- ARCHITECT LEVEL (hard) ---
    { 
      id: 24, diff: 'hard', 
      text: 'What is the purpose of the cluster module in Node.js?', 
      options: ['To group files together', 'To manage database clusters', 'To spawn multiple instances of a Node process to leverage multi-core CPUs', 'To minify code'], correct: 2,
      explanation: 'Cluster allows a master process to fork worker processes that share the same server port.' 
    },
    { 
      id: 25, diff: 'hard', 
      text: 'How do Node.js Streams improve performance for large files?', 
      options: ['By compressing the file', 'By reading/writing data in small chunks instead of loading the entire file into memory', 'By increasing CPU speed', 'By deleting the file after reading'], correct: 1,
      explanation: 'Streams provide better memory efficiency by processing data as it arrives.' 
    },
    { 
      id: 26, diff: 'hard', 
      text: 'What is Express.js middleware fundamentally?', 
      options: ['A database connector', 'A frontend template', 'A function that has access to the request/response objects and the next middleware in the pipeline', 'A CSS styling tool'], correct: 2,
      explanation: 'Middleware functions can execute code, modify request/response, and end the cycle or pass control.' 
    }
  ],

  ds: [
    { id:1, diff:'easy', text:'What is a stack data structure?', options:['First In First Out','Last In First Out','Random access','Priority-based access'], correct:1,
      explanation:'A stack follows LIFO — the last element pushed is the first one popped.' },
    { id:2, diff:'easy', text:'What is a queue?', options:['Last In First Out','First In First Out','Tree structure','Graph structure'], correct:1,
      explanation:'A queue follows FIFO — elements are enqueued at the rear and dequeued from the front.' },
    { id:3, diff:'easy', text:'What is the time complexity of binary search?', options:['O(n)','O(n²)','O(log n)','O(1)'], correct:2,
      explanation:'Binary search halves the search space each step, yielding O(log n) complexity.' },
    { id:4, diff:'easy', text:'What is a linked list?', options:['An array with pointers','A sequence of nodes where each node points to the next','A binary tree','A hash table'], correct:1,
      explanation:'A linked list consists of nodes, each containing data and a pointer to the next node.' },
    { id:5, diff:'easy', text:'What is the time complexity of accessing an element in an array by index?', options:['O(n)','O(log n)','O(1)','O(n log n)'], correct:2,
      explanation:'Array access by index is O(1) — direct memory addressing.' },
    { id:6, diff:'easy',text:'What is a binary tree?', options:['A tree with exactly 2 nodes','A tree where each node has at most 2 children','A tree with 2 levels','A sorted array'], correct:1,
      explanation:'In a binary tree, each node has at most two children: left and right.' },
    { id:7, diff:'easy', text:'What is a hash table used for?', options:['Sorting elements','Fast key-value lookups','Traversing trees','Sorting graphs'], correct:1,
      explanation:'Hash tables offer average O(1) time complexity for insertions, deletions, and lookups.' },
    { id:8, diff:'easy', text:'What is the worst-case time complexity of bubble sort?', options:['O(n)','O(n log n)','O(n²)','O(log n)'], correct:2,
      explanation:'Bubble sort compares adjacent elements and repeats, resulting in O(n²) worst case.' },
    { id:9, diff:'easy', text:'What is a graph?', options:['A sorted array','A collection of nodes connected by edges','A type of linked list','A two-dimensional array'], correct:1,
      explanation:'A graph consists of vertices (nodes) and edges (connections between nodes).' },
    { id:10, diff:'easy', text:'What is recursion?', options:['A loop construct','A function that calls itself to solve a sub-problem','A sorting algorithm','A data type'], correct:1,
      explanation:'Recursion is when a function calls itself, typically with a base case to stop.' },
    { id:11, diff:'easy', text:'What is a min-heap?', options:['A tree where the root is the maximum','A tree where each parent is ≤ its children','A balanced BST','A hash table'], correct:1,
      explanation:'In a min-heap, the parent node is always less than or equal to its children, so the minimum is at the root.' },
    { id:12, diff:'easy', text:'What is the time complexity of quicksort on average?', options:['O(n²)','O(n log n)','O(n)','O(log n)'], correct:1,
      explanation:'Quicksort averages O(n log n) but degrades to O(n²) in the worst case (sorted input with bad pivot).' },
    { id:13, diff:'easy',text:'What is a BST (Binary Search Tree)?', options:['A tree where left < node < right','A tree where all nodes are equal','A balanced tree only','A graph'], correct:0,
      explanation:'In a BST, the left subtree contains smaller values and the right subtree contains larger values.' },
    { id:14, diff:'easy',text:'What is DFS (Depth-First Search)?', options:['Explores all neighbors first','Explores as deep as possible before backtracking','Sorts a graph','Finds shortest paths'], correct:1,
      explanation:'DFS traverses as far as possible down each branch before backtracking.' },
    { id:15, diff:'easy', text:'What is BFS (Breadth-First Search)?', options:['Explores deepest nodes first','Explores all neighbors at the current depth first','Sorts nodes','Deletes duplicates'], correct:1,
      explanation:'BFS explores all nodes at the current level before moving to the next level.' },
    { id:16, diff:'easy', text:'What is the space complexity of merge sort?', options:['O(1)','O(log n)','O(n)','O(n²)'], correct:2,
      explanation:'Merge sort requires O(n) auxiliary space for the temporary arrays used in merging.' },
    { id:17, diff:'easy', text:'What is memoization?', options:['Memory management','Caching results of expensive function calls','A sorting technique','A graph algorithm'], correct:1,
      explanation:'Memoization stores results of function calls to avoid redundant computation.' },
    { id:18, diff:'easy', text:'What is a doubly linked list?', options:['A list with two heads','A list where each node has next and prev pointers','A two-dimensional list','A list of pairs'], correct:1,
      explanation:'In a doubly linked list, each node has pointers to both the next and previous nodes.' },
    { id:19, diff:'easy',text:'What is Big O notation used for?', options:['Measuring file size','Describing algorithm time/space complexity','Counting lines of code','Measuring memory'], correct:1,
      explanation:'Big O notation describes the upper bound of an algorithm\'s time or space complexity.' },
    { id:20, diff:'easy', text:'What is a trie?', options:['A type of graph','A tree used for efficient string prefix searching','A balanced BST','A hash map'], correct:1,
      explanation:'A trie (prefix tree) stores strings character by character, enabling fast prefix searches.' },
    { 
      id: 21, diff: 'easy', 
      text: 'What is the time complexity of accessing an element in an array by its index?', 
      options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], correct: 0,
      explanation: 'Arrays allow "random access," meaning the computer can jump directly to any memory address using the index in constant time[cite: 72].' 
    },
    { 
      id: 22, diff: 'easy', 
      text: 'Which data structure follows the Last-In-First-Out (LIFO) principle?', 
      options: ['Queue', 'Linked List', 'Stack', 'Tree'], correct: 2,
      explanation: 'A Stack works like a pile of plates; the last one you put on top is the first one you take off[cite: 72].' 
    },
    { 
      id: 23, diff: 'easy', 
      text: 'Which data structure follows the First-In-First-Out (FIFO) principle?', 
      options: ['Stack', 'Queue', 'Binary Tree', 'Graph'], correct: 1,
      explanation: 'A Queue works like a real-life line; the person who gets in line first is served first[cite: 72].' 
    },
    { 
      id: 24, diff: 'easy', 
      text: 'What is a major disadvantage of a Singly Linked List compared to an Array?', 
      options: ['It uses more memory for pointers', 'It cannot grow in size', 'It does not allow random access', 'It is always sorted'], correct: 2,
      explanation: 'In a linked list, you must start at the beginning and follow the pointers one by one to find an element, whereas arrays allow instant access[cite: 72].' 
    },
    { 
      id: 25, diff: 'easy', 
      text: 'In a Binary Search Tree (BST), values smaller than the root are always placed where?', 
      options: ['In the right subtree', 'In the left subtree', 'Directly in the root', 'In a separate list'], correct: 1,
      explanation: 'The fundamental rule of a BST is that the left child is smaller than the parent and the right child is larger[cite: 72].' 
    },

    // --- BUILDER LEVEL (intermediate) ---
    { 
      id: 26, diff: 'intermediate', 
      text: 'What is the average time complexity for searching a value in a Hash Table?', 
      options: ['O(n)', 'O(log n)', 'O(1)', 'O(n log n)'], correct: 2,
      explanation: 'Hash tables use a hash function to map keys to specific indices, allowing for near-instant retrieval[cite: 72].' 
    },
    { 
      id: 27, diff: 'intermediate', 
      text: 'Which tree traversal visits the root node last?', 
      options: ['Pre-order', 'In-order', 'Post-order', 'Level-order'], correct: 2,
      explanation: 'Post-order traversal follows the sequence: Left Child -> Right Child -> Root[cite: 72].' 
    },
    { 
      id: 28, diff: 'intermediate', 
      text: 'What occurs during a "Hash Collision"?', 
      options: ['The table is deleted', 'Two different keys produce the same hash index', 'The memory overflows', 'The hash function stops working'], correct: 1,
      explanation: 'Collisions happen when different inputs result in the same index; they are usually handled by "chaining" or "open addressing"[cite: 72].' 
    },
    { 
      id: 29, diff: 'intermediate', 
      text: 'Which data structure is fundamentally used to manage Function Calls and Recursion?', 
      options: ['Queue', 'Stack', 'Heap', 'Graph'], correct: 1,
      explanation: 'The "Call Stack" tracks active functions; each new call is pushed onto the stack and popped off when finished[cite: 72].' 
    },
    { 
      id: 30, diff: 'intermediate', 
      text: 'What is the height of a perfectly balanced Binary Tree with N nodes?', 
      options: ['O(N)', 'O(log N)', 'O(N²)', 'O(1)'], correct: 1,
      explanation: 'Because each level doubles the number of nodes, the relationship between the number of nodes and the height is logarithmic[cite: 72].' 
    },

    // --- ARCHITECT LEVEL (hard) ---
    { 
      id: 31, diff: 'hard', 
      text: 'How does a Min-Heap differ from a Binary Search Tree (BST)?', 
      options: [
        'Heaps are always sorted', 
        'Min-Heaps provide O(1) access to the minimum element; BSTs are optimized for general searching', 
        'BSTs use more memory', 
        'There is no functional difference'
      ], 
      correct: 1,
      explanation: 'Heaps are specialized for priority tasks (finding the smallest/largest), whereas BSTs are designed for fast searching of any key[cite: 72].' 
    },
    { 
      id: 32, diff: 'hard', 
      text: 'Which algorithm is used to find the shortest path from one node to all others in a weighted graph?', 
      options: ['DFS', 'Dijkstra’s Algorithm', 'Kruskal’s Algorithm', 'Prim’s Algorithm'], correct: 1,
      explanation: 'Dijkstra’s uses a priority queue to greedily find the shortest distance in graphs without negative edge weights[cite: 72].' 
    },
    { 
      id: 33, diff: 'hard', 
      text: 'What is the primary characteristic of an AVL Tree?', 
      options: ['It is a tree with 3 children per node', 'It is a self-balancing BST where subtrees differ in height by at most one', 'It is used only for strings', 'It is a type of linear list'], correct: 1,
      explanation: 'AVL trees use rotations to maintain strict balance, ensuring that operations always remain O(log N)[cite: 72].' 
    },
    { 
      id: 34, diff: 'hard', 
      text: 'What is the time complexity of the "Heapify" process when building a heap from an unsorted array?', 
      options: ['O(N log N)', 'O(N)', 'O(log N)', 'O(N²)'], correct: 1,
      explanation: 'While single insertions are O(log N), building an entire heap from the bottom up mathematically converges to O(N)[cite: 72].' 
    },
    { 
      id: 35, diff: 'hard', 
      text: 'What is a "Disjoint Set" (Union-Find) data structure primarily used for?', 
      options: ['Sorting strings', 'Tracking connected components and detecting cycles in a graph', 'Performing binary search', 'Calculating node degrees'], correct: 1,
      explanation: 'Union-Find efficiently manages elements partitioned into non-overlapping sets, which is vital for Kruskal’s MST algorithm[cite: 72].' 
    }
  ],

  ml: [
    { id:1, diff:'easy', text:'What is supervised learning?', options:['Learning without labels','Learning from labeled examples','Reinforcement learning','Clustering'], correct:1,
      explanation:'Supervised learning trains on labeled data to learn the mapping from inputs to outputs.' },
    { id:2, diff:'easy', text:'What is overfitting?', options:['Underfitting the training data','When a model performs well on training but poorly on unseen data','When a model has too few parameters','A regularization technique'], correct:1,
      explanation:'Overfitting occurs when a model memorizes training data and fails to generalize.' },
    { id:3, diff:'easy', text:'What is a neural network?', options:['A decision tree','A set of algorithms inspired by biological neurons','A statistical model','A clustering algorithm'], correct:1,
      explanation:'Neural networks are layers of interconnected nodes (neurons) that learn representations from data.' },
    { id:4, diff:'easy', text:'What is gradient descent?', options:['A regularization method','An optimization algorithm that minimizes a loss function','A data normalization technique','A feature selection method'], correct:1,
      explanation:'Gradient descent iteratively updates parameters in the direction that reduces the loss function.' },
    { id:5, diff:'easy', text:'What is the purpose of a train/test split?', options:['To duplicate data','To evaluate model generalization on unseen data','To clean data','To balance classes'], correct:1,
      explanation:'Splitting data lets you train on one portion and evaluate on a separate, unseen portion.' },
    { id:6, diff:'easy', text:'What is a loss function?', options:['A function that increases model accuracy','A function measuring the difference between predictions and true values','A feature extractor','A layer in a neural network'], correct:1,
      explanation:'The loss function quantifies how wrong the model\'s predictions are.' },
    { id:7, diff:'easy',text:'What is regularization used for?', options:['Data augmentation','Preventing overfitting by penalizing complexity','Increasing model size','Speeding up training'], correct:1,
      explanation:'Regularization (L1/L2) adds a penalty to the loss to discourage overly complex models.' },
    { id:8, diff:'easy', text:'What is a confusion matrix?', options:['A visualization of model layers','A table showing TP, TN, FP, FN predictions','A loss function','A clustering result'], correct:1,
      explanation:'A confusion matrix shows the actual vs predicted classifications across all classes.' },
    { id:9, diff:'easy', text:'What does "epoch" mean in ML training?', options:['A single data point','One complete pass through the training dataset','A batch of data','A learning rate step'], correct:1,
      explanation:'An epoch is one full cycle through the entire training dataset.' },
    { id:10, diff:'easy', text:'What is unsupervised learning?', options:['Learning with labels','Learning patterns from unlabeled data','Reinforcement learning','Transfer learning'], correct:1,
      explanation:'Unsupervised learning finds structure in data without labeled examples (e.g., clustering, PCA).' },
    { id:11, diff:'easy', text:'What is k-fold cross-validation?', options:['Splitting data once','Dividing data into k folds and rotating which fold is the test set','A clustering method','A neural architecture'], correct:1,
      explanation:'k-fold CV trains k models each using a different fold as the validation set, averaging results.' },
    { id:12, diff:'easy', text:'What is the activation function in a neural network?', options:['A weight initializer','A non-linear function applied to neuron outputs','A loss function','A normalization layer'], correct:1,
      explanation:'Activation functions (ReLU, sigmoid, tanh) introduce non-linearity, enabling complex learning.' },
    { id:13, diff:'easy', text:'What is precision in classification?', options:['TP / (TP + FN)','TP / (TP + FP)','TN / (TN + FP)','Accuracy'], correct:1,
      explanation:'Precision = TP / (TP + FP) — of all predicted positives, how many are actually positive.' },
    { id:14, diff:'easy', text:'What is recall in classification?', options:['TP / (TP + FP)','TN / (TN + FN)','TP / (TP + FN)','Accuracy'], correct:2,
      explanation:'Recall = TP / (TP + FN) — of all actual positives, how many did we correctly predict.' },
    { id:15, diff:'easy', text:'What is a hyperparameter?', options:['A model weight','A parameter set before training (not learned)','A feature','A layer'], correct:1,
      explanation:'Hyperparameters (like learning rate, number of layers) are set before training begins.' },
    { id:16, diff:'easy', text:'What is transfer learning?', options:['Moving data between systems','Using a pre-trained model on a new task','Training from scratch','Data augmentation'], correct:1,
      explanation:'Transfer learning reuses a model trained on one task as the starting point for another.' },
    { id:17, diff:'easy', text:'What is feature engineering?', options:['Building neural networks','Creating or transforming features to improve model performance','Data collection','Model evaluation'], correct:1,
      explanation:'Feature engineering creates, selects, or transforms variables to improve model learning.' },
    { id:18, diff:'easy', text:'What is a decision tree?', options:['A neural network layer','A flowchart-like model that makes decisions based on feature thresholds','A clustering algorithm','A regression model'], correct:1,
      explanation:'Decision trees recursively split data by feature thresholds to make predictions.' },
    { id:19, diff:'easy', text:'What is the vanishing gradient problem?', options:['Overfitting','Gradients becoming too small to update early network layers','Slow data loading','Memory overflow'], correct:1,
      explanation:'In deep networks, gradients can become exponentially small during backprop, stalling learning.' },
    { id:20, diff:'easy', text:'What does CNN stand for?', options:['Central Neural Node','Convolutional Neural Network','Clustered Node Network','Continuous Neural Node'], correct:1,
      explanation:'CNNs use convolutional layers to automatically learn spatial features from images.' },
    { 
      id: 21, diff: 'intermediate', 
      text: 'What is the difference between Supervised and Unsupervised Learning?', 
      options: [
        'Supervised uses labeled data; Unsupervised finds hidden patterns in unlabeled data', 
        'Supervised is for images; Unsupervised is for text', 
        'Supervised requires no data; Unsupervised requires historical data', 
        'They are the same'
      ], 
      correct: 0,
      explanation: 'Supervised learning learns a mapping from input to output based on example pairs; Unsupervised learning groups data based on inherent structures.' 
    },
    { 
      id: 22, diff: 'intermediate', 
      text: 'What is "Overfitting" in a Machine Learning model?', 
      options: [
        'The model is too simple to capture the data trend', 
        'The model performs well on training data but poorly on unseen test data', 
        'The model has too few parameters', 
        'The data is too large for the model'
      ], 
      correct: 1,
      explanation: 'Overfitting occurs when a model learns the "noise" in the training data rather than the actual signal, failing to generalize.' 
    },
    { 
      id: 23, diff: 'intermediate', 
      text: 'What is the purpose of a "Validation Set"?', 
      options: [
        'To train the model weights', 
        'To test the final model accuracy only once', 
        'To tune hyperparameters and prevent overfitting during the training process', 
        'To replace the training set'
      ], 
      correct: 2,
      explanation: 'The validation set provides an unbiased evaluation of a model fit while tuning model parameters (like learning rate or tree depth).' 
    },
    { 
      id: 24, diff: 'intermediate', 
      text: 'What does the "Bias-Variance Tradeoff" refer to?', 
      options: [
        'Choosing between speed and accuracy', 
        'The conflict between a models ability to minimize error from simple assumptions (bias) vs sensitivity to data fluctuations (variance)', 
        'The cost of hardware vs the size of the dataset', 
        'The difference between training and inference time'
      ], 
      correct: 1,
      explanation: 'High bias causes underfitting; high variance causes overfitting. A good model finds the sweet spot that minimizes total error.' 
    },
    { 
      id: 25, diff: 'intermediate', 
      text: 'What is a "Confusion Matrix" used for?', 
      options: [
        'To scramble data for security', 
        'To visualize the performance of a classification model by showing true vs predicted classes', 
        'To calculate the derivative of a function', 
        'To handle missing values in a dataset'
      ], 
      correct: 1,
      explanation: 'It allows you to see not just the accuracy, but where the model is specifically getting confused (e.g., False Positives vs False Negatives).' 
    },

    // --- ARCHITECT LEVEL (hard) ---
    { 
      id: 26, diff: 'hard', 
      text: 'How does Gradient Descent work in training a Neural Network?', 
      options: [
        'By randomly guessing weights until it works', 
        'By iteratively updating weights in the opposite direction of the gradient of the loss function to find a minimum', 
        'By increasing the learning rate at every step', 
        'By removing layers from the network'
      ], 
      correct: 1,
      explanation: 'The gradient tells us which way "up" is; we move in the opposite direction to slide down the loss curve toward the lowest error.' 
    },
    { 
      id: 27, diff: 'hard', 
      text: 'What is "Regularization" (L1/L2) and why is it used?', 
      options: [
        'A method to speed up data loading', 
        'Adding a penalty term to the loss function to discourage overly complex models and prevent overfitting', 
        'The process of cleaning a dataset', 
        'A technique for normalizing image pixels'
      ], 
      correct: 1,
      explanation: 'L1 (Lasso) can lead to sparse weights (feature selection), while L2 (Ridge) keeps weights small; both help the model generalize.' 
    },
    { 
      id: 28, diff: 'hard', 
      text: 'What is the "Vanishing Gradient" problem in Deep Learning?', 
      options: [
        'When the dataset becomes too small', 
        'When gradients become extremely small during backpropagation, preventing early layers from learning', 
        'When the model forgets the training data', 
        'When the loss function reaches zero'
      ], 
      correct: 1,
      explanation: 'In very deep networks, multiplying many small gradients causes them to shrink to zero, effectively stopping the weights from updating.' 
    },
    { 
      id: 29, diff: 'hard', 
      text: 'What is the "Kernel Trick" in Support Vector Machines (SVM)?', 
      options: [
        'A way to hide data from the user', 
        'Mapping data into a higher-dimensional space to make it linearly separable without explicitly calculating coordinates', 
        'A method to speed up the CPU', 
        'A way to use SVM for text generation'
      ], 
      correct: 1,
      explanation: 'The kernel function calculates the dot product in high-dimensional space efficiently, allowing for complex non-linear boundaries.' 
    },
    { 
      id: 30, diff: 'hard', 
      text: 'What is "Principal Component Analysis" (PCA) primarily used for?', 
      options: [
        'Increasing the size of the dataset', 
        'Dimensionality reduction by projecting data onto axes that maximize variance', 
        'Predicting a continuous target variable', 
        'Training a deep neural network'
      ], 
      correct: 1,
      explanation: 'PCA transforms correlated variables into a smaller set of uncorrelated variables (principal components) while keeping as much information as possible.' 
    }
  ],

  system: [
    { id:1, diff:'easy', text:'What is horizontal scaling?', options:['Making a server more powerful','Adding more servers to handle load','Reducing database size','Increasing RAM'], correct:1,
      explanation:'Horizontal scaling adds more machines to distribute load across multiple nodes.' },
    { id:2, diff:'easy', text:'What is a load balancer?', options:['A database optimizer','A system that distributes traffic across multiple servers','A caching layer','A CDN'], correct:1,
      explanation:'Load balancers distribute incoming requests across servers for better availability and reliability.' },
    { id:3, diff:'easy', text:'What is caching used for?', options:['Long-term storage','Speeding up data access by storing frequently used data closer to the requester','Encryption','Authentication'], correct:1,
      explanation:'Caching reduces latency and database load by storing results of expensive operations.' },
    { id:4, diff:'easy', text:'What is a CDN?', options:['A type of database','A network of geographically distributed servers delivering content closer to users','A caching algorithm','A load balancer'], correct:1,
      explanation:'CDNs (Content Delivery Networks) cache content at edge locations close to users worldwide.' },
    { id:5, diff:'easy', text:'What is the CAP theorem?', options:['A sorting theorem','States a distributed system can only guarantee 2 of: Consistency, Availability, Partition Tolerance','A caching rule','A networking protocol'], correct:1,
      explanation:'CAP theorem states distributed systems must trade off between consistency, availability, and partition tolerance.' },
    { id:6, diff:'easy', text:'What is a microservices architecture?', options:['A monolithic codebase','Breaking an application into small, independently deployable services','A database design','A testing method'], correct:1,
      explanation:'Microservices decompose an app into small, loosely coupled services that communicate over APIs.' },
    { id:7, diff:'easy', text:'What is a message queue?', options:['A database table','An asynchronous communication mechanism between services','A caching tool','A load balancer'], correct:1,
      explanation:'Message queues (like Kafka, RabbitMQ) decouple services by buffering messages between them.' },
    { id:8, diff:'easy', text:'What is a reverse proxy?', options:['A client-side proxy','A server that forwards client requests to backend servers','A database proxy','A DNS server'], correct:1,
      explanation:'A reverse proxy sits in front of backend servers, routing client requests and providing load balancing, SSL, etc.' },
    { id:9, diff:'easy', text:'What is database sharding?', options:['Backing up a database','Partitioning data across multiple databases for scalability','Indexing a table','Encrypting data'], correct:1,
      explanation:'Sharding splits a large database into smaller pieces (shards) distributed across servers.' },
    { id:10, diff:'easy', text:'What is eventual consistency?', options:['Immediate consistency after every write','Given no new updates, all replicas will eventually converge to the same value','Strong consistency','Database locking'], correct:1,
      explanation:'Eventual consistency means replicas will agree eventually, accepting temporary divergence for availability.' },
    { id:11, diff:'easy', text:'What does REST stand for?', options:['Remote Execution State Transfer','Representational State Transfer','Remote Entity Server Technology','Request-Entity-State Transfer'], correct:1,
      explanation:'REST (Representational State Transfer) is an architectural style for designing networked APIs.' },
    { id:12, diff:'easy', text:'What is the purpose of an API gateway?', options:['Database management','Single entry point managing auth, routing, and rate limiting for microservices','A CDN','A message queue'], correct:1,
      explanation:'An API gateway acts as a single entry point for clients, handling routing, authentication, and rate limiting.' },
    { id:13, diff:'easy', text:'What is rate limiting?', options:['Slowing down a database','Restricting the number of requests a client can make in a time window','Caching responses','Load balancing'], correct:1,
      explanation:'Rate limiting prevents abuse and ensures fair usage by capping request frequency per client.' },
    { id:14, diff:'easy', text:'What is a distributed system?', options:['A single server with multiple CPUs','Multiple computers working together, appearing as one to end users','A database cluster','A virtual machine'], correct:1,
      explanation:'Distributed systems span multiple networked computers to achieve a common goal with fault tolerance and scalability.' },
    { id:15, diff:'easy', text:'What is a SQL database?', options:['A NoSQL database','A relational database using structured tables and SQL queries','A cache','A file system'], correct:1,
      explanation:'SQL databases use tabular schemas and support ACID transactions and relational queries.' },
    { id:16, diff:'easy', text:'What is NoSQL used for?', options:['Only big data','Flexible schemas, high throughput, and unstructured data use cases','Only caching','Only key-value stores'], correct:1,
      explanation:'NoSQL encompasses document, key-value, column-family, and graph databases for varied non-relational use cases.' },
    { id:17, diff:'easy', text:'What is a single point of failure?', options:['A bug in code','A component whose failure brings down the entire system','A network issue','A database lock'], correct:1,
      explanation:'Eliminating SPOFs through redundancy is a core goal of resilient system design.' },
    { id:18, diff:'easy', text:'What does "idempotent" mean in API design?', options:['The API is fast','Making the same request multiple times produces the same result','The API is stateless','The API has no auth'], correct:1,
      explanation:'Idempotent operations can be repeated without changing the result beyond the first call (e.g., PUT, DELETE).' },
    { id:19, diff:'easy', text:'What is a circuit breaker pattern?', options:['An electrical concept only','A fault-tolerance pattern that stops calling a failing service temporarily','A caching strategy','A database pattern'], correct:1,
      explanation:'Circuit breakers prevent cascading failures by stopping calls to a failing service until it recovers.' },
    { id:20, diff:'easy', text:'What is WebSocket used for?', options:['Database queries','Full-duplex real-time communication between client and server','Static file serving','DNS resolution'], correct:1,
      explanation:'WebSockets provide a persistent, bidirectional connection for real-time apps like chat or live feeds.' },
    { 
      id: 21, diff: 'intermediate', 
      text: 'What is the primary purpose of an Operating System (OS)?', 
      options: [
        'To design websites', 
        'To manage hardware resources and provide a user interface for software execution', 
        'To act as a primary database for user files', 
        'To increase the physical clock speed of the CPU'
      ], 
      correct: 1,
      explanation: 'The OS acts as an intermediary between the user/applications and the computer hardware, managing memory, processes, and storage.' 
    },
    { 
      id: 22, diff: 'intermediate', 
      text: 'What is "Virtual Memory"?', 
      options: [
        'Memory stored on a cloud server', 
        'A technique that uses hard drive space to simulate additional RAM', 
        'Memory that only exists while the computer is off', 
        'A hardware upgrade for the motherboard'
      ], 
      correct: 1,
      explanation: 'Virtual memory allows a computer to compensate for physical memory shortages by temporarily transferring data from RAM to disk storage.' 
    },
    { 
      id: 23, diff: 'intermediate', 
      text: 'Difference between a Process and a Thread?', 
      options: [
        'Threads are larger than processes', 
        'A process is an executing program with its own memory; a thread is a subset of a process that shares memory with other threads', 
        'Processes share memory, while threads do not', 
        'There is no difference'
      ], 
      correct: 1,
      explanation: 'Processes are independent execution units; threads are "lightweight" processes that run within a process to perform concurrent tasks.' 
    },
    { 
      id: 24, diff: 'intermediate', 
      text: 'What is a "System Call"?', 
      options: [
        'A phone call to technical support', 
        'A programmatic way for an application to request a service from the OS kernel', 
        'An error message sent by the hardware', 
        'A function used only for mathematical calculations'
      ], 
      correct: 1,
      explanation: 'System calls provide the interface between a running program and the operating system (e.g., reading a file or allocating memory).' 
    },
    { 
      id: 25, diff: 'intermediate', 
      text: 'What is the "Kernel" of an Operating System?', 
      options: [
        'The GUI (Graphical User Interface)', 
        'The central core of the OS that has complete control over everything in the system', 
        'The folder where user documents are stored', 
        'The bootloader that starts the computer'
      ], 
      correct: 1,
      explanation: 'The kernel is the first part of the OS to load into memory and remains there to manage system resources and hardware communication.' 
    },

    // --- ARCHITECT LEVEL (hard) ---
    { 
      id: 26, diff: 'hard', 
      text: 'What is a "Deadlock" in OS and its four necessary conditions?', 
      options: [
        'A computer crash caused by overheating', 
        'A state where a set of processes are blocked because each is holding a resource and waiting for another; conditions: Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait', 
        'When the hard drive stops spinning', 
        'When the CPU runs at 100% capacity indefinitely'
      ], 
      correct: 1,
      explanation: 'Deadlock prevents system progress. All four "Coffman conditions" must hold true simultaneously for a deadlock to occur.' 
    },
    { 
      id: 27, diff: 'hard', 
      text: 'What is "Thrashing" in memory management?', 
      options: [
        'Physical damage to the RAM sticks', 
        'A state where the system spends more time swapping pages in and out of virtual memory than executing instructions', 
        'Deleting all temporary files to save space', 
        'Overclocking the CPU beyond its limits'
      ], 
      correct: 1,
      explanation: 'Thrashing occurs when the total size of active processes exceeds physical RAM, causing constant page faults and severe performance drops.' 
    },
    { 
      id: 28, diff: 'hard', 
      text: 'Difference between Monolithic and Microkernel architectures?', 
      options: [
        'Monolithic is only for old computers', 
        'Monolithic runs all OS services in kernel space; Microkernel moves most services to user space for better stability and modularity', 
        'Microkernels are faster than Monolithic kernels', 
        'Monolithic kernels cannot be updated'
      ], 
      correct: 1,
      explanation: 'Monolithic kernels are generally faster due to direct communication, but Microkernels are more robust as service failures don’t crash the whole system.' 
    },
    { 
      id: 29, diff: 'hard', 
      text: 'What is the purpose of a "Translation Lookaside Buffer" (TLB)?', 
      options: [
        'To translate code from C++ to Java', 
        'A hardware cache that stores recent virtual-to-physical address mappings to speed up memory access', 
        'To buffer network requests', 
        'To store the results of mathematical operations'
      ], 
      correct: 1,
      explanation: 'The TLB reduces the time taken to access a user data location by avoiding multiple memory lookups in page tables.' 
    },
    { 
      id: 30, diff: 'hard', 
      text: 'What is "Context Switching" and why is it expensive?', 
      options: [
        'Changing the desktop wallpaper', 
        'The process of storing and restoring the state of a CPU so that execution can be resumed later; expensive due to cache misses and overhead', 
        'Moving a computer to a different room', 
        'Switching between different programming languages'
      ], 
      correct: 1,
      explanation: 'While essential for multitasking, context switching requires the CPU to save registers and flush caches, which consumes significant cycles.' 
    }
  ],

  docker: [
    { id:1, diff:'easy', text:'What is Docker?', options:['A virtual machine','A platform for building and running containerized applications','A cloud provider','A programming language'], correct:1,
      explanation:'Docker packages apps and their dependencies into containers for consistent, portable execution.' },
    { id:2, diff:'easy', text:'What is a Docker image?', options:['A running container','A read-only template used to create containers','A Dockerfile','A network'], correct:1,
      explanation:'Images are immutable blueprints; containers are running instances of images.' },
    { id:3, diff:'easy', text:'What is a Dockerfile?', options:['A shell script','A text file with instructions to build a Docker image','A compose file','A network config'], correct:1,
      explanation:'A Dockerfile contains a series of commands to assemble a Docker image layer by layer.' },
    { id:4, diff:'easy', text:'What does `docker run` do?', options:['Builds an image','Creates and starts a container from an image','Stops a container','Removes a container'], correct:1,
      explanation:'docker run creates and starts a new container from the specified image.' },
    { id:5, diff:'easy', text:'What is Docker Compose?', options:['A build tool','A tool for defining and running multi-container Docker apps with a YAML file','A container registry','A monitoring tool'], correct:1,
      explanation:'Docker Compose uses docker-compose.yml to define and orchestrate multi-container applications.' },
    { id:6, diff:'easy', text:'What is a Docker volume?', options:['A container','Persistent storage that exists outside the container lifecycle','A network bridge','An environment variable'], correct:1,
      explanation:'Volumes provide persistent storage for containers; data survives container restarts.' },
    { id:7, diff:'easy', text:'What does `docker build` do?', options:['Runs a container','Pushes an image','Builds a Docker image from a Dockerfile','Removes images'], correct:2,
      explanation:'docker build reads the Dockerfile and creates a new image.' },
    { id:8, diff:'easy', text:'What is a container registry?', options:['A running container','A storage service for Docker images','A network policy','A Dockerfile'], correct:1,
      explanation:'Container registries (Docker Hub, ECR, GCR) store and distribute Docker images.' },
    { id:9, diff:'easy', text:'What does `docker ps` show?', options:['All images','Running containers','Stopped containers','Networks'], correct:1,
      explanation:'docker ps lists currently running containers; docker ps -a shows all containers.' },
    { id:10, diff:'easy', text:'What is the difference between CMD and ENTRYPOINT in a Dockerfile?', options:['No difference','CMD provides defaults; ENTRYPOINT sets the main executable','CMD runs at build time','ENTRYPOINT is optional'], correct:1,
      explanation:'ENTRYPOINT sets the main command; CMD provides default arguments that can be overridden.' },
    { id:11, diff:'easy',text:'What does `docker stop` do?', options:['Removes a container','Gracefully stops a running container','Pauses a container','Kills a container immediately'], correct:1,
      explanation:'docker stop sends SIGTERM then SIGKILL after a grace period to stop a container.' },
    { id:12, diff:'easy', text:'What is a Docker network?', options:['A file system','A virtual network enabling containers to communicate','A volume type','A registry'], correct:1,
      explanation:'Docker networks allow containers to communicate with each other and the outside world.' },
    { id:13, diff:'easy', text:'What is the base instruction in a Dockerfile?', options:['RUN','CMD','FROM','ENV'], correct:2,
      explanation:'FROM specifies the base image; every Dockerfile must start with a FROM instruction.' },
    { id:14, diff:'easy', text:'What does `docker pull` do?', options:['Pushes an image','Downloads an image from a registry','Builds an image','Runs a container'], correct:1,
      explanation:'docker pull downloads an image from a container registry to your local machine.' },
    { id:15, diff:'easy', text:'What is the purpose of `.dockerignore`?', options:['Ignoring containers','Excluding files from the build context sent to Docker daemon','Ignoring volumes','Removing images'], correct:1,
      explanation:'.dockerignore excludes files from the build context, reducing image size and build time.' },
    { id:16, diff:'easy', text:'What does `EXPOSE` do in a Dockerfile?', options:['Opens a port on the host','Documents which port the container listens on at runtime','Creates a network','Binds a volume'], correct:1,
      explanation:'EXPOSE is documentation; it doesn\'t publish the port — you must use -p in docker run.' },
    { id:17, diff:'easy', text:'What is a multi-stage build?', options:['Building multiple images','Using multiple FROM stages to create smaller final images','Running parallel builds','A Compose feature'], correct:1,
      explanation:'Multi-stage builds use multiple FROM statements to keep the final image small by discarding build tools.' },
    { id:18, diff:'easy', text:'What does `docker exec` do?', options:['Creates a container','Runs a command inside a running container','Builds an image','Removes a container'], correct:1,
      explanation:'docker exec runs an additional command in a running container (e.g., opening a shell).' },
    { id:19, diff:'easy', text:'What does `RUN` do in a Dockerfile?', options:['Runs a container','Executes a command during image build','Sets environment variables','Exposes a port'], correct:1,
      explanation:'RUN executes a command in a new layer during the image build process.' },
    { id:20, diff:'easy', text:'What is Kubernetes?', options:['A container runtime','A container orchestration platform for automating deployment and scaling','A Docker replacement','A registry'], correct:1,
      explanation:'Kubernetes (k8s) automates deployment, scaling, and management of containerized applications.' },
    { 
      id: 21, diff: 'intermediate', 
      text: 'What is the fundamental difference between a Docker Container and a Virtual Machine (VM)?', 
      options: [
        'Containers include a full OS; VMs share the host OS kernel', 
        'Containers share the host OS kernel and are lightweight; VMs include a full guest OS and run on a hypervisor', 
        'VMs are faster to start than containers', 
        'There is no difference in resource usage'
      ], 
      correct: 1,
      explanation: 'Containers virtualize the OS level, making them much smaller and faster than VMs, which virtualize the hardware level.' 
    },
    { 
      id: 22, diff: 'intermediate', 
      text: 'What is a "Dockerfile"?', 
      options: [
        'A script containing commands to assemble a Docker image', 
        'A log file showing container errors', 
        'A configuration file for Docker Desktop settings', 
        'A backup of a running container'
      ], 
      correct: 0,
      explanation: 'A Dockerfile is a text document that contains all the commands a user could call on the command line to create an image.' 
    },
    { 
      id: 23, diff: 'intermediate', 
      text: 'What does the "docker-compose" tool allow you to do?', 
      options: [
        'Compile C++ code into Docker', 
        'Define and run multi-container Docker applications using a YAML file', 
        'Connect Docker to a physical printer', 
        'Scan images for security vulnerabilities'
      ], 
      correct: 1,
      explanation: 'Compose is used to manage a stack of services (like a web app and a database) as a single unit.' 
    },
    { 
      id: 24, diff: 'intermediate', 
      text: 'What is a Docker "Image" vs a "Container"?', 
      options: [
        'An image is a running instance of a container', 
        'An image is a read-only template; a container is a running, executable instance of an image', 
        'They are the same thing', 
        'Images are for databases; containers are for code'
      ], 
      correct: 1,
      explanation: 'Think of an image as a "class" or "blueprint," and a container as an "object" or "instance" of that class.' 
    },
    { 
      id: 25, diff: 'intermediate', 
      text: 'How do you persist data in Docker after a container is deleted?', 
      options: [
        'Data is automatically saved to the cloud', 
        'Using Docker Volumes or Bind Mounts', 
        'By committing the container to a new image every hour', 
        'Data cannot be persisted in Docker'
      ], 
      correct: 1,
      explanation: 'Volumes are the preferred mechanism for persisting data generated by and used by Docker containers.' 
    },

    // --- ARCHITECT LEVEL (hard) ---
    { 
      id: 26, diff: 'hard', 
      text: 'What is "Layer Caching" in Docker and why is it important?', 
      options: [
        'A way to hide code layers from hackers', 
        'A mechanism where Docker reuses unchanged instructions from previous builds to speed up the build process', 
        'A tool for compressing images for storage', 
        'A method for encrypting container traffic'
      ], 
      correct: 1,
      explanation: 'Each instruction in a Dockerfile creates a layer. Docker caches these layers to avoid re-running expensive steps like dependency installation if the commands haven\'t changed.' 
    },
    { 
      id: 27, diff: 'hard', 
      text: 'What is the purpose of a Multi-stage build in a Dockerfile?', 
      options: [
        'To run a container on multiple servers at once', 
        'To use multiple FROM statements to create smaller, optimized production images by leaving out build-time dependencies', 
        'To allow multiple users to edit the same Dockerfile', 
        'To test the image on different Operating Systems'
      ], 
      correct: 1,
      explanation: 'Multi-stage builds allow you to compile your code in one stage and copy only the binary to a final, much smaller image.' 
    },
    { 
      id: 28, diff: 'hard', 
      text: 'Difference between the "COPY" and "ADD" instructions?', 
      options: [
        'COPY is for folders; ADD is for files', 
        'COPY only supports basic local file copying; ADD has extra features like extracting local tar files and downloading from URLs', 
        'ADD is the newer, preferred version of COPY', 
        'There is no functional difference'
      ], 
      correct: 1,
      explanation: 'While ADD has more features, COPY is generally preferred for its simplicity and transparency unless the specific features of ADD are required.' 
    },
    { 
      id: 29, diff: 'hard', 
      text: 'What is a "Distroless" image?', 
      options: [
        'An image without an internet connection', 
        'An image that contains only your application and its runtime dependencies, excluding package managers and shells', 
        'An image that cannot be distributed to others', 
        'A generic image that works on any hardware'
      ], 
      correct: 1,
      explanation: 'Distroless images improve security by reducing the attack surface (removing tools like "sh" or "apt" that a hacker could use).' 
    },
    { 
      id: 30, diff: 'hard', 
      text: 'In Docker networking, what does the "bridge" network mode do?', 
      options: [
        'Connects the container directly to the physical router', 
        'Creates a private internal network on the host so containers can communicate with each other but are isolated from the outside', 
        'Disables all networking for the container', 
        'Shares the host’s IP address directly'
      ], 
      correct: 1,
      explanation: 'The bridge driver is the default network driver. It creates a software bridge that allows containers on the same bridge network to communicate while providing isolation from the host network.' 
    }
  ],

  ts: [
    { id:1, diff:'easy', text:'What is TypeScript?', options:['A new programming language','A typed superset of JavaScript that compiles to plain JS','A CSS preprocessor','A testing framework'], correct:1,
      explanation:'TypeScript adds optional static typing and modern features on top of JavaScript.' },
    { id:2, diff:'easy', text:'What does the `:` symbol do in TypeScript?', options:['Concatenates strings','Annotates a variable with a type','Creates a ternary','Accesses object properties'], correct:1,
      explanation:'The colon annotates variables, parameters, and return values with their expected types.' },
    { id:3, diff:'easy', text:'What is `interface` in TypeScript?', options:['A class blueprint','A named type definition describing the shape of an object','An abstract class','A module'], correct:1,
      explanation:'Interfaces define the structure (shape) of objects or function signatures.' },
    { id:4, diff:'easy', text:'What is `type` in TypeScript?', options:['Same as interface (no difference)','A type alias for any type including unions, intersections, and primitives','A class modifier','A runtime check'], correct:1,
      explanation:'type aliases can define unions, intersections, tuples, and mapped types — more flexible than interfaces.' },
    { id:5, diff:'easy', text:'What is `any` type in TypeScript?', options:['A type that must be a string','A type that opts out of type checking','The default type','A null type'], correct:1,
      explanation:'any disables type checking for that variable, essentially reverting to plain JavaScript behavior.' },
    { id:6, diff:'easy', text:'What is `unknown` in TypeScript?', options:['Same as any','A type-safe counterpart to any — requires type narrowing before use','A null value','An undefined check'], correct:1,
      explanation:'unknown requires you to narrow the type before using it, unlike any which skips all checks.' },
    { id:7, diff:'easy', text:'What is a union type?', options:['An intersection of two types','A type that can be one of several specified types','A generic type','A tuple'], correct:1,
      explanation:'Union types (A | B) allow a value to be of one of multiple types.' },
    { id:8, diff:'easy', text:'What are generics in TypeScript?', options:['A type for arrays only','Reusable type parameters that make components work with any type','An interface feature','A class-only feature'], correct:1,
      explanation:'Generics allow you to write flexible, reusable functions and types parameterized by type.' },
    { id:9, diff:'easy', text:'What does `readonly` do?', options:['Makes a property required','Prevents a property from being reassigned after initialization','Makes a class abstract','Marks a parameter optional'], correct:1,
      explanation:'readonly prevents a property from being modified after it is initially set.' },
    { id:10, diff:'easy', text:'What is type narrowing?', options:['Making a type smaller','Refining a broader type to a more specific one using type guards','Removing type annotations','Casting a type'], correct:1,
      explanation:'Type narrowing uses checks (typeof, instanceof, in) to refine types within a block.' },
    { id:11, diff:'easy',text:'What does the `?` operator do in an interface property?', options:['Makes it a union','Marks the property as optional','Adds null','Creates a tuple'], correct:1,
      explanation:'A trailing ? makes the property optional — it can be omitted or undefined.' },
    { id:12, diff:'easy', text:'What is `never` type?', options:['A null type','An undefined type','A type for values that never occur (impossible states, infinite loops)','An empty array'], correct:2,
      explanation:'never represents values that never exist, such as functions that always throw or never return.' },
    { id:13, diff:'easy',text:'What is an enum in TypeScript?', options:['An array of strings','A way to define a set of named constants','A generic type','A class modifier'], correct:1,
      explanation:'Enums define a set of named numeric or string constants.' },
    { id:14, diff:'easy', text:'What is the `as` keyword used for?', options:['Type assertions — telling the compiler to treat a value as a specific type','Renaming imports','Defining generics','Creating aliases'], correct:0,
      explanation:'Type assertions (as) override the inferred type when you know more than the compiler.' },
    { id:15, diff:'easy', text:'What is `Partial<T>` utility type?', options:['Makes all properties required','Makes all properties of T optional','Picks certain properties','Removes properties'], correct:1,
      explanation:'Partial<T> constructs a type with all properties of T set to optional.' },
    { id:16, diff:'easy', text:'What is `Required<T>`?', options:['Makes all properties optional','Makes all properties required','Adds a new property','Removes null'], correct:1,
      explanation:'Required<T> constructs a type with all properties of T set to required.' },
    { id:17, diff:'easy', text:'What is `Pick<T, K>` utility type?', options:['Omits properties','Creates a type with only specific keys K from T','Makes all optional','Creates a union'], correct:1,
      explanation:'Pick<T, K> constructs a type by selecting a subset of keys K from T.' },
    { id:18, diff:'easy', text:'What is `Record<K, V>`?', options:['An array type','A type with keys of type K and values of type V','A generic class','A mapped interface'], correct:1,
      explanation:'Record<K, V> constructs an object type with keys of type K and values of type V.' },
    { id:19, diff:'easy', text:'What does `tsc` do?', options:['Runs tests','Compiles TypeScript to JavaScript','Starts a dev server','Lints code'], correct:1,
      explanation:'tsc is the TypeScript compiler that transforms .ts files into .js files.' },
    { id:20, diff:'easy', text:'What is a mapped type in TypeScript?', options:['A type for Maps','A type that transforms each property of another type','An array type','A generic constraint'], correct:1,
      explanation:'Mapped types iterate over keys of a type and transform each property (e.g., Readonly<T>).' },
    { 
      id: 21, diff: 'intermediate', 
      text: 'What is the primary benefit of using TypeScript over JavaScript?', 
      options: ['It makes the code run faster', 'It adds static typing to catch errors during development', 'It replaces CSS', 'It is a different language'], correct: 1,
      explanation: 'TS catches type-related bugs at compile-time before they reach production.' 
    },
    { 
      id: 22, diff: 'intermediate', 
      text: 'Difference between an Interface and a Type alias?', 
      options: ['Interfaces are only for classes', 'Interfaces are open for "declaration merging"; Type aliases are not', 'Types are faster', 'Interfaces cannot be used with objects'], correct: 1,
      explanation: 'Interfaces can be extended by declaring them multiple times; Types are constant.' 
    },
    { 
      id: 23, diff: 'intermediate', 
      text: 'What does the "any" type do in TypeScript?', 
      options: ['Enforces strict typing', 'Effectively opts out of type checking for a variable', 'Same as unknown', 'Auto-detects types'], correct: 1,
      explanation: '"any" bypasses the compiler checks, essentially reverting the variable to plain JavaScript behavior.' 
    },
    { 
      id: 24, diff: 'intermediate', 
      text: 'What is a "Union Type" in TypeScript?', 
      options: ['An array-only type', 'A type that allows a value to be one of several types (e.g., string | number)', 'A database join', 'A type containing all properties of two interfaces'], correct: 1,
      explanation: 'Unions allow a variable to hold more than one specific type of data.' 
    },
    { 
      id: 25, diff: 'intermediate', 
      text: 'What is the purpose of the "tsconfig.json" file?', 
      options: ['Store passwords', 'Specify root files and compiler options for the project', 'Install packages', 'Define UI layout'], correct: 1,
      explanation: 'It defines how the TypeScript compiler (tsc) should behave for that specific project.' 
    },
    { 
      id: 26, diff: 'intermediate', 
      text: 'How does TypeScript handle "Structural Typing"?', 
      options: ['Checks if names match', 'Checks if the members of the object match the required shape (duck typing)', 'Requires classes for every object', 'Only for primitives'], correct: 1,
      explanation: 'TS focuses on the shape of the data rather than the specific class or name assigned to it.' 
    },
    { 
      id: 27, diff: 'intermediate', 
      text: 'What does the "readonly" modifier do on an interface property?', 
      options: ['Hides the property', 'Prevents reassignment after initialization', 'Converts to string', 'Only for loops'], correct: 1,
      explanation: 'Readonly ensures that a property’s value cannot be changed once the object is created.' 
    },

    // --- ARCHITECT LEVEL (6 Unique) ---
    { 
      id: 28, diff: 'hard', 
      text: 'What are Generics in TypeScript?', 
      options: ['Common types', 'A way to create reusable components that work with various types (using <T>)', 'Random data generators', 'Auto-assigned types'], correct: 1,
      explanation: 'Generics allow for type-safe code that remains flexible for different data inputs.' 
    },
    { 
      id: 29, diff: 'hard', 
      text: 'Difference between "unknown" and "any"?', 
      options: ['Identical', 'Unknown is safer; it requires type narrowing before usage', 'Any is for objects', 'Unknown is for catch blocks only'], correct: 1,
      explanation: 'You must check what an "unknown" variable is (e.g., using typeof) before calling methods on it.' 
    },
    { 
      id: 30, diff: 'hard', 
      text: 'What is "Type Narrowing"?', 
      options: ['Saving memory', 'Refining a broad type into a more specific one using logic like "if" statements', 'Deleting types', 'Type conversion'], correct: 1,
      explanation: 'TS uses control flow to determine that a variable is a specific type within a certain block of code.' 
    },
    { 
      id: 31, diff: 'hard', 
      text: 'What does the "keyof" operator do?', 
      options: ['Returns object value', 'Creates a union type of all keys/properties of an object type', 'Unlocks variables', 'Database check'], correct: 1,
      explanation: 'keyof takes an object type and produces a string or numeric literal union of its keys.' 
    },
    { 
      id: 32, diff: 'hard', 
      text: 'What is a "Mapped Type"?', 
      options: ['Google Maps type', 'Creating new types based on existing ones by transforming properties (e.g., Partial)', 'Project type list', 'Coordinate map'], correct: 1,
      explanation: 'Mapped types allow you to programmatically create variations of types (like making all fields optional).' 
    },
    { 
      id: 33, diff: 'hard', 
      text: 'How does the tsc treat ES Modules vs CommonJS?', 
      options: ['Converts to ESM only', 'Allows specifying the target module system in tsconfig.json', 'Cannot compile ESM', 'Ignores modules'], correct: 1,
      explanation: 'The "module" compiler option dictates whether output uses "require" or "import/export" syntax.' 
    }
  ],
};
