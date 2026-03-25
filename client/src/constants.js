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