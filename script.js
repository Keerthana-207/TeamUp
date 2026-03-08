/* ═══════════════════════════════════════════════════════════
   TeamUp — Register Page  |  script.js  (v2)
   Changes: removed exp slider, added Instagram/YouTube,
            added School/Others year chips,
            added searchable combo dropdowns for college/dept,
            replaced emoji icons with Material Icons in toasts
═══════════════════════════════════════════════════════════ */

"use strict";

/* ══════════════════════════════════════════════════════════
   DATA LISTS
══════════════════════════════════════════════════════════ */
const COLLEGES = [
  // IITs
  "IIT Bombay", "IIT Delhi", "IIT Madras", "IIT Kanpur",
  "IIT Kharagpur", "IIT Roorkee", "IIT Guwahati", "IIT Hyderabad",
  "IIT Indore", "IIT Jodhpur", "IIT Mandi", "IIT Patna",
  "IIT Tirupati", "IIT Bhubaneswar", "IIT Gandhinagar",
  "IIT Dharwad", "IIT Jammu", "IIT Varanasi (BHU)", "IIT Palakkad",
  // NITs
  "NIT Trichy", "NIT Warangal", "NIT Surathkal", "NIT Calicut",
  "NIT Rourkela", "NIT Jaipur", "NIT Silchar", "NIT Durgapur",
  "NIT Allahabad", "NIT Nagpur", "NIT Patna", "NIT Kurukshetra",
  "NIT Bhopal", "NIT Surat", "NIT Hamirpur", "NIT Goa",
  // IIITs
  "IIIT Hyderabad", "IIIT Bangalore", "IIIT Allahabad",
  "IIIT Delhi", "IIIT Gwalior", "IIIT Jabalpur", "IIIT Kancheepuram",
  // Central Universities
  "Delhi University", "Jawaharlal Nehru University (JNU)",
  "Banaras Hindu University (BHU)", "Hyderabad University",
  "Pondicherry University", "Manipur University",
  // Deemed / Private
  "BITS Pilani", "BITS Goa", "BITS Hyderabad",
  "VIT Vellore", "VIT Chennai", "VIT Bhopal", "VIT-AP",
  "Manipal Institute of Technology", "SRM Institute of Technology",
  "Amity University", "Symbiosis International University",
  "Christ University", "Lovely Professional University",
  "Thapar Institute of Engineering and Technology",
  "PSG College of Technology", "Coimbatore Institute of Technology",
  "Anna University", "Jadavpur University", "Osmania University",
  "Pune Institute of Computer Technology",
  "K. J. Somaiya College of Engineering",
  "Sardar Patel Institute of Technology",
  "Veermata Jijabai Technological Institute (VJTI)",
  // IISc / Research
  "IISc Bangalore", "IISER Pune", "IISER Kolkata",
  "IISER Mohali", "IISER Thiruvananthapuram",
  // Management
  "IIM Ahmedabad", "IIM Bangalore", "IIM Calcutta",
  "IIM Lucknow", "IIM Kozhikode", "IIM Indore",
  // School boards
  "CBSE School", "ICSE School", "State Board School",
  "IB School", "IGCSE School",
  "Others / Not Listed"
];

const DEPARTMENTS = [
  // Engineering
  "Computer Science & Engineering (CSE)",
  "Information Technology (IT)",
  "Electronics & Communication Engineering (ECE)",
  "Electrical Engineering (EE)",
  "Mechanical Engineering (ME)",
  "Civil Engineering (CE)",
  "Chemical Engineering",
  "Aerospace Engineering",
  "Biomedical Engineering",
  "Biotechnology Engineering",
  "Production & Industrial Engineering",
  "Instrumentation Engineering",
  "Mining Engineering",
  "Metallurgical & Materials Engineering",
  "Agricultural Engineering",
  "Environmental Engineering",
  "Textile Engineering",
  "Automobile Engineering",
  "Marine Engineering",
  "Petroleum Engineering",
  // Specialisations
  "Artificial Intelligence & Machine Learning (AI/ML)",
  "Data Science & Analytics",
  "Cybersecurity",
  "Cloud Computing",
  "Internet of Things (IoT)",
  "Robotics & Automation",
  "VLSI Design",
  // Pure Sciences
  "Mathematics", "Physics", "Chemistry",
  "Biology / Life Sciences", "Statistics",
  // Management & Commerce
  "Business Administration (BBA / MBA)",
  "Commerce (B.Com / M.Com)",
  "Economics", "Finance & Accounting",
  "Marketing", "Human Resources (HR)",
  // Design
  "UI/UX Design", "Graphic Design", "Industrial Design",
  "Fashion Design", "Architecture",
  // Humanities & Social Sciences
  "English Literature", "Psychology", "Sociology",
  "Political Science", "History", "Philosophy",
  "Journalism & Mass Communication",
  // Medical / Health
  "MBBS / Medicine", "BDS / Dentistry",
  "Pharmacy (B.Pharm)", "Nursing", "Physiotherapy",
  "Public Health", "AYUSH / Ayurveda",
  // Law
  "Law (LLB / LLM)", "Corporate Law", "Cyber Law",
  // Education
  "B.Ed / M.Ed", "Early Childhood Education",
  // Other
  "Interdisciplinary Studies", "Others / Not Listed"
];

/* ── STATE ────────────────────────────────────────────────── */
const state = {
  currentStep : 1,
  totalSteps  : 4,
  skills      : [],
  interests   : [],
};

/* ── INIT ─────────────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  initPhotoUpload();
  initPasswordStrength();
  initTogglePassword();
  initYearChips();
  initComboBox("collegeInput", "collegeDropdown", "collegeArrow", "college", COLLEGES);
  initComboBox("deptInput",    "deptDropdown",    "deptArrow",   "department", DEPARTMENTS);
  initTagInputs();
  initBioCounter();
  initFormSubmit();
  // Close combo dropdowns on outside click
  document.addEventListener("click", closeAllCombos);
});

/* ══════════════════════════════════════════════════════════
   COMBO BOX — searchable dropdown + free-type
══════════════════════════════════════════════════════════ */
function initComboBox(inputId, dropdownId, arrowId, hiddenId, list) {
  const input    = document.getElementById(inputId);
  const dropdown = document.getElementById(dropdownId);
  const arrow    = document.getElementById(arrowId);
  const hidden   = document.getElementById(hiddenId);
  if (!input || !dropdown) return;

  let focusedIdx = -1;

  function openDropdown(filter = "") {
    const q = filter.toLowerCase().trim();
    const filtered = q
      ? list.filter(item => item.toLowerCase().includes(q))
      : list;

    dropdown.innerHTML = "";
    focusedIdx = -1;

    if (filtered.length === 0) {
      dropdown.innerHTML = `
        <div class="combo-no-result">
          <span class="material-icons-round">search_off</span>
          No match — your entry will be used as-is
        </div>`;
    } else {
      filtered.slice(0, 60).forEach((item, i) => {
        const div = document.createElement("div");
        div.className = "combo-item";
        div.dataset.value = item;
        const icon = getListIcon(item, inputId);
        div.innerHTML = `<span class="material-icons-round item-icon">${icon}</span>${item}`;
        if (hidden.value === item) div.classList.add("selected");

        div.addEventListener("mousedown", (e) => {
          e.preventDefault();
          selectComboItem(item, input, hidden, dropdown, arrow);
        });
        dropdown.appendChild(div);
      });
    }

    dropdown.classList.add("open");
    arrow.classList.add("open");
    input.closest(".input-wrap")?.classList.add("combo-open");
  }

  function closeDropdown() {
    dropdown.classList.remove("open");
    arrow.classList.remove("open");
    // If user typed something not from list, still accept it as custom value
    if (input.value.trim() && !hidden.value) {
      hidden.value = input.value.trim();
    }
  }

  function selectComboItem(value, inp, hid, dd, arr) {
    inp.value  = value;
    hid.value  = value;
    dd.classList.remove("open");
    arr.classList.remove("open");
    clearError(hiddenId);
    // Highlight selected
    dd.querySelectorAll(".combo-item").forEach(el => {
      el.classList.toggle("selected", el.dataset.value === value);
    });
  }

  input.addEventListener("focus", () => openDropdown(input.value));

  input.addEventListener("input", () => {
    hidden.value = input.value.trim(); // allow free-type
    openDropdown(input.value);
    clearError(hiddenId);
  });

  input.addEventListener("blur", () => {
    setTimeout(() => closeDropdown(), 150);
  });

  // Keyboard navigation
  input.addEventListener("keydown", (e) => {
    const items = dropdown.querySelectorAll(".combo-item");
    if (!items.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      focusedIdx = Math.min(focusedIdx + 1, items.length - 1);
      items.forEach((el, i) => el.classList.toggle("focused", i === focusedIdx));
      items[focusedIdx]?.scrollIntoView({ block: "nearest" });
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      focusedIdx = Math.max(focusedIdx - 1, 0);
      items.forEach((el, i) => el.classList.toggle("focused", i === focusedIdx));
      items[focusedIdx]?.scrollIntoView({ block: "nearest" });
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (focusedIdx >= 0 && items[focusedIdx]) {
        selectComboItem(items[focusedIdx].dataset.value, input, hidden, dropdown, arrow);
      } else {
        hidden.value = input.value.trim();
        closeDropdown();
      }
    } else if (e.key === "Escape") {
      closeDropdown();
    }
  });

  // Toggle on arrow click
  arrow.addEventListener("click", (e) => {
    e.stopPropagation();
    if (dropdown.classList.contains("open")) closeDropdown();
    else { input.focus(); openDropdown(input.value); }
  });
}

function getListIcon(item, inputId) {
  if (inputId === "collegeInput") {
    if (item.includes("IIT"))  return "precision_manufacturing";
    if (item.includes("NIT"))  return "apartment";
    if (item.includes("IIIT")) return "computer";
    if (item.includes("BITS")) return "auto_stories";
    if (item.includes("VIT") || item.includes("Manipal") || item.includes("SRM")) return "school";
    if (item.includes("IIM"))  return "business_center";
    if (item.includes("School")) return "menu_book";
    if (item.includes("Others")) return "more_horiz";
    return "account_balance";
  }
  // department icons
  if (item.includes("Computer") || item.includes("IT") || item.includes("Cloud")) return "computer";
  if (item.includes("AI") || item.includes("Data") || item.includes("Machine")) return "psychology";
  if (item.includes("Electrical") || item.includes("Electronic")) return "electrical_services";
  if (item.includes("Mechanical")) return "settings";
  if (item.includes("Civil")) return "foundation";
  if (item.includes("Design") || item.includes("UI") || item.includes("Architecture")) return "palette";
  if (item.includes("Medical") || item.includes("MBBS") || item.includes("Pharmacy")) return "local_hospital";
  if (item.includes("Law")) return "gavel";
  if (item.includes("Business") || item.includes("MBA") || item.includes("Finance")) return "business_center";
  if (item.includes("Mathematics") || item.includes("Physics") || item.includes("Chemistry")) return "science";
  if (item.includes("Others")) return "more_horiz";
  return "biotech";
}

function closeAllCombos(e) {
  ["collegeDropdown", "deptDropdown"].forEach(id => {
    const dd = document.getElementById(id);
    if (dd && !dd.closest(".combo-wrap")?.contains(e.target)) {
      dd.classList.remove("open");
    }
  });
  const ca = document.getElementById("collegeArrow");
  const da = document.getElementById("deptArrow");
  if (ca && !ca.closest(".combo-wrap")?.contains(e.target)) ca.classList.remove("open");
  if (da && !da.closest(".combo-wrap")?.contains(e.target)) da.classList.remove("open");
}

/* ══════════════════════════════════════════════════════════
   STEP NAVIGATION
══════════════════════════════════════════════════════════ */
function nextStep(current) {
  if (!validateStep(current)) return;
  goToStep(current + 1);
}
function prevStep(current) { goToStep(current - 1); }

function goToStep(target) {
  const from = state.currentStep;
  const fromEl = document.getElementById(`step-${from}`);
  if (fromEl) fromEl.classList.remove("active");

  const toEl = document.getElementById(`step-${target}`);
  if (!toEl) return;
  toEl.style.animation = "none";
  toEl.offsetHeight;
  toEl.style.animation = target > from
    ? "stepIn 0.35s cubic-bezier(0.4,0,0.2,1) both"
    : "stepInReverse 0.35s cubic-bezier(0.4,0,0.2,1) both";
  toEl.classList.add("active");

  state.currentStep = target;
  updateProgressBar(target);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function updateProgressBar(to) {
  for (let i = 1; i <= state.totalSteps; i++) {
    const el = document.querySelector(`.step[data-step="${i}"]`);
    if (!el) continue;
    el.classList.remove("active", "done");
    if (i < to)  el.classList.add("done");
    if (i === to) el.classList.add("active");
  }
  document.querySelectorAll(".step-line").forEach((line, idx) => {
    line.classList.toggle("done", idx + 1 < to);
  });
}

/* ══════════════════════════════════════════════════════════
   VALIDATION
══════════════════════════════════════════════════════════ */
const validators = { 1: validateStep1, 2: validateStep2, 3: validateStep3 };

function validateStep(step) {
  return validators[step] ? validators[step]() : true;
}

function clearError(id) {
  const el = document.getElementById(`err-${id}`);
  if (el) el.textContent = "";
}

function setError(id, msg, icon = "error") {
  const el = document.getElementById(`err-${id}`);
  if (!el) return false;
  el.innerHTML = `<span class="material-icons-round" style="font-size:13px;flex-shrink:0;">${icon}</span>${msg}`;
  return false;
}

function val(id) { return document.getElementById(id)?.value ?? ""; }

function validateStep1() {
  let ok = true;
  ["fullName","email","password","confirmPassword","role"].forEach(clearError);

  const name = val("fullName").trim();
  const email = val("email");
  const pw    = val("password");
  const cpw   = val("confirmPassword");
  const role  = document.querySelector("input[name='role']:checked")?.value;

  if (name.length < 2)
    ok = setError("fullName", "Please enter your full name (min 2 chars).");
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    ok = setError("email", "Enter a valid email address.");
  if (!pw || pw.length < 8)
    ok = setError("password", "Password must be at least 8 characters.");
  if (!cpw || cpw !== pw)
    ok = setError("confirmPassword", "Passwords do not match.");
  if (!role)
    ok = setError("role", "Please select your role.");

  if (ok) showToast("Step 1 complete!", "success", "check_circle");
  return ok;
}

function validateStep2() {
  let ok = true;
  ["college","department","yearOfStudy"].forEach(clearError);

  const college = val("college") || val("collegeInput");
  const dept    = val("department") || val("deptInput");

  if (!college?.trim())
    ok = setError("college", "Please enter or select your college.");
  if (!dept?.trim())
    ok = setError("department", "Please enter or select your department.");
  if (!val("yearOfStudy"))
    ok = setError("yearOfStudy", "Please select your year of study.");

  if (ok) showToast("Academic info saved!", "success", "check_circle");
  return ok;
}

function validateStep3() {
  let ok = true;
  ["skills","interests"].forEach(clearError);

  if (state.skills.length === 0)
    ok = setError("skills", "Add at least one skill.");
  if (state.interests.length === 0)
    ok = setError("interests", "Add at least one interest.");

  if (ok) showToast("Skills noted!", "success", "check_circle");
  return ok;
}

function validateStep4() {
  let ok = true;
  clearError("terms");

  if (!document.getElementById("terms").checked)
    ok = setError("terms", "You must accept the Terms of Service.", "info");

  ["github","linkedin","instagram","youtube"].forEach(field => {
    clearError(field);
    const v = val(field);
    if (v && !/^https?:\/\/.+/.test(v))
      ok = setError(field, "Enter a valid URL starting with https://", "link_off");
  });

  return ok;
}

/* ══════════════════════════════════════════════════════════
   PHOTO UPLOAD
══════════════════════════════════════════════════════════ */
function initPhotoUpload() {
  const input = document.getElementById("profilePhoto");
  const img   = document.getElementById("photoImg");
  const placeholder = document.querySelector(".photo-placeholder");
  const preview = document.getElementById("photoPreview");
  if (!input) return;

  input.addEventListener("change", () => {
    const file = input.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { showToast("Image must be under 2MB.", "error", "image_not_supported"); return; }
    const reader = new FileReader();
    reader.onload = (e) => {
      img.src = e.target.result;
      img.style.display = "block";
      if (placeholder) placeholder.style.display = "none";
      preview.style.borderColor = "var(--cyan)";
      preview.style.boxShadow   = "0 0 0 3px rgba(99,218,255,0.15)";
      showToast("Photo uploaded!", "info", "check_circle");
    };
    reader.readAsDataURL(file);
  });
}

/* ══════════════════════════════════════════════════════════
   PASSWORD STRENGTH
══════════════════════════════════════════════════════════ */
function initPasswordStrength() {
  const pw = document.getElementById("password");
  if (!pw) return;
  pw.addEventListener("input", () => {
    const score = getStrength(pw.value);
    const fill  = document.getElementById("strengthFill");
    const label = document.getElementById("strengthLabel");
    const cfgs = [
      { pct: 0,   color: "transparent",  text: "Password strength" },
      { pct: 25,  color: "var(--red)",   text: "Weak" },
      { pct: 50,  color: "var(--yellow)","text": "Fair" },
      { pct: 75,  color: "#a3e635",      text: "Good" },
      { pct: 100, color: "var(--green)", text: "Strong" },
    ];
    const cfg = cfgs[score];
    fill.style.width      = cfg.pct + "%";
    fill.style.background = cfg.color;
    label.textContent     = cfg.text;
    label.style.color     = cfg.color;
  });
}
function getStrength(pw) {
  if (!pw) return 0;
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
}

/* ══════════════════════════════════════════════════════════
   TOGGLE PASSWORD VISIBILITY
══════════════════════════════════════════════════════════ */
function initTogglePassword() {
  document.querySelectorAll(".toggle-pw").forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.dataset.target;
      const iconId   = btn.dataset.icon;
      const input    = document.getElementById(targetId);
      const icon     = document.getElementById(iconId);
      if (!input) return;
      const isText = input.type === "text";
      input.type = isText ? "password" : "text";
      if (icon) icon.textContent = isText ? "visibility" : "visibility_off";
    });
  });
}

/* ══════════════════════════════════════════════════════════
   YEAR CHIPS
══════════════════════════════════════════════════════════ */
function initYearChips() {
  const chips  = document.querySelectorAll(".year-chip");
  const hidden = document.getElementById("yearOfStudy");
  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      chips.forEach(c => c.classList.remove("selected"));
      chip.classList.add("selected");
      if (hidden) hidden.value = chip.dataset.year;
      clearError("yearOfStudy");
    });
  });
}

/* ══════════════════════════════════════════════════════════
   TAG INPUTS (Skills & Interests)
══════════════════════════════════════════════════════════ */
function initTagInputs() {
  setupTagInput("skillInput",    "skillsTags",    "skills",    state.skills);
  setupTagInput("interestInput", "interestsTags", "interests", state.interests);
}

function setupTagInput(inputId, containerId, hiddenId, arr) {
  const input     = document.getElementById(inputId);
  const container = document.getElementById(containerId);
  const hidden    = document.getElementById(hiddenId);
  const wrap      = container?.closest(".tag-input-wrap");
  if (!input || !container) return;

  wrap?.addEventListener("click", () => input.focus());

  input.addEventListener("keydown", (e) => {
    if (["Enter",",","Tab"].includes(e.key) && input.value.trim()) {
      e.preventDefault();
      addTagFromInput(input.value.trim(), containerId, hiddenId, arr);
      input.value = "";
    }
    if (e.key === "Backspace" && !input.value && arr.length > 0) {
      removeTag(arr[arr.length - 1], containerId, hiddenId, arr);
    }
  });

  input.addEventListener("blur", () => {
    if (input.value.trim()) {
      addTagFromInput(input.value.trim(), containerId, hiddenId, arr);
      input.value = "";
    }
  });
}

function addTagFromInput(text, containerId, hiddenId, arr) {
  const cleaned = text.replace(/,/g,"").trim();
  if (!cleaned || cleaned.length > 32) return;
  if (arr.includes(cleaned)) { showToast(`"${cleaned}" already added`, "info", "info"); return; }
  if (arr.length >= 10) { showToast("Max 10 tags allowed", "info", "info"); return; }
  arr.push(cleaned);
  renderTags(containerId, hiddenId, arr);
  clearError(hiddenId);
}

function addTag(containerId, text) {
  const map = {
    "skillsTags":    ["skills",    state.skills],
    "interestsTags": ["interests", state.interests],
  };
  const [hiddenId, arr] = map[containerId] || [];
  if (hiddenId) addTagFromInput(text, containerId, hiddenId, arr);
}

function removeTag(text, containerId, hiddenId, arr) {
  const idx = arr.indexOf(text);
  if (idx > -1) arr.splice(idx, 1);
  renderTags(containerId, hiddenId, arr);
}

function renderTags(containerId, hiddenId, arr) {
  const container = document.getElementById(containerId);
  const hidden    = document.getElementById(hiddenId);
  if (!container) return;

  container.querySelectorAll(".tag").forEach(t => t.remove());
  const wrap  = container.closest(".tag-input-wrap");
  const input = wrap?.querySelector("input[type='text']");

  arr.forEach(text => {
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.innerHTML = `${text}<button class="tag-remove" type="button" title="Remove">×</button>`;
    tag.querySelector(".tag-remove").addEventListener("click", (e) => {
      e.stopPropagation();
      removeTag(text, containerId, hiddenId, arr);
    });
    if (input) wrap.insertBefore(tag, input);
    else container.appendChild(tag);
  });

  if (hidden) hidden.value = arr.join(",");
}

/* ══════════════════════════════════════════════════════════
   BIO CHARACTER COUNTER
══════════════════════════════════════════════════════════ */
function initBioCounter() {
  const bio   = document.getElementById("bio");
  const count = document.getElementById("bioCount");
  if (!bio || !count) return;
  bio.addEventListener("input", () => {
    count.textContent = bio.value.length;
    count.style.color = bio.value.length > 180 ? "var(--yellow)" : "var(--text-muted)";
  });
}

/* ══════════════════════════════════════════════════════════
   FORM SUBMIT + AJAX
══════════════════════════════════════════════════════════ */
function initFormSubmit() {
  const form = document.getElementById("registerForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!validateStep4()) return;

    const btn    = document.getElementById("submitBtn");
    const text   = document.getElementById("submitText");
    const loader = document.getElementById("submitLoader");

    btn.disabled         = true;
    text.style.display   = "none";
    loader.style.display = "inline-block";

    const payload = buildPayload();

    try {
      await fakeAjaxSubmit(payload); // ← swap with realAjaxSubmit(payload)
      showSuccessScreen(payload);
    } catch (err) {
      showToast("Registration failed: " + err.message, "error", "error");
      btn.disabled         = false;
      text.style.display   = "inline-flex";
      loader.style.display = "none";
    }
  });
}

function buildPayload() {
  return {
    fullName   : val("fullName"),
    email      : val("email"),
    password   : val("password"),
    role       : document.querySelector("input[name='role']:checked")?.value,
    college    : val("college") || val("collegeInput"),
    department : val("department") || val("deptInput"),
    yearOfStudy: val("yearOfStudy"),
    skills     : state.skills,
    interests  : state.interests,
    github     : val("github"),
    linkedin   : val("linkedin"),
    instagram  : val("instagram"),
    youtube    : val("youtube"),
    bio        : val("bio"),
  };
}

/**
 * ── REAL AJAX TEMPLATE ──────────────────────────────────────
 * Replace fakeAjaxSubmit with this when you have a backend:
 *
 * async function realAjaxSubmit(payload) {
 *   const res = await fetch("/api/register", {
 *     method  : "POST",
 *     headers : { "Content-Type": "application/json" },
 *     body    : JSON.stringify(payload),
 *   });
 *   if (!res.ok) {
 *     const err = await res.json().catch(() => ({}));
 *     throw new Error(err.message || `Server error ${res.status}`);
 *   }
 *   return res.json();
 * }
 */
function fakeAjaxSubmit(payload) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() < 0.92
        ? resolve({ success: true, userId: "USR_" + Math.random().toString(36).slice(2,8).toUpperCase() })
        : reject(new Error("Network error. Please try again."));
    }, 1800);
  });
}

function showSuccessScreen(payload) {
  document.getElementById("registerForm").style.display  = "none";
  document.querySelector(".step-progress").style.display = "none";
  const success = document.getElementById("successScreen");
  success.style.display = "block";

  document.getElementById("successName").textContent = payload.fullName.split(" ")[0];

  const tagsEl = document.getElementById("successTags");
  if (tagsEl) {
    tagsEl.innerHTML = "";
    [...payload.skills, ...payload.interests].slice(0, 6).forEach(tag => {
      const el = document.createElement("span");
      el.className = "success-tag";
      el.textContent = tag;
      tagsEl.appendChild(el);
    });
  }

  showToast("Account created! Welcome to TeamUp", "success", "celebration");
}

/* ══════════════════════════════════════════════════════════
   TOAST NOTIFICATIONS
══════════════════════════════════════════════════════════ */
function showToast(message, type = "info", icon = "info", duration = 3200) {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span class="material-icons-round">${icon}</span>${message}`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = "toastOut 0.3s ease both";
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

/* ── Inject reverse step keyframe ──────────────────────── */
(function injectStyle() {
  const s = document.createElement("style");
  s.textContent = `
    @keyframes stepInReverse {
      from { opacity:0; transform:translateX(-20px); }
      to   { opacity:1; transform:translateX(0); }
    }
  `;
  document.head.appendChild(s);
})();
