/* ============================================================
   data.js — All destination data for RouteHunt
   Each entry has a unique picsum seed for a consistent image
   ============================================================ */

const DESTS = [
  {
    name: 'Goa',
    region: 'West India',
    tag: 'Beaches',
    seed: 683,
    station: 'Madgaon (Margao) Railway Station',
    tip: 'Konkan Railway connects Goa from Mumbai (8 hrs), Bangalore & Delhi. Goa Express & Rajdhani run regularly.',
    Image: 'c:\Users\Lenovo\Desktop\projects\Travel\RouteHunt\Goa Tourism.jpg'
  },
  {
    name: 'Rajasthan',
    region: 'North India',
    tag: 'Heritage',
    seed: 1057,
    station: 'Jaipur / Jodhpur / Udaipur Railway Station',
    tip: 'Excellent connectivity from all metros. Pink City Express from Delhi to Jaipur in just 5 hrs.'
  },
  {
    name: 'Shimla',
    region: 'Himachal Pradesh',
    tag: 'Hill Station',
    seed: 29,
    station: 'Kalka Station → Toy Train to Shimla',
    tip: 'Take any train to Kalka, then the iconic UNESCO Kalka-Shimla toy train — a heritage experience in itself!'
  },
  {
    name: 'Manali',
    region: 'Himachal Pradesh',
    tag: 'Mountains',
    seed: 417,
    station: 'Chandigarh Railway Station',
    tip: 'Train to Chandigarh, then HRTC bus to Manali (~10 hrs). Overnight Volvo buses from Delhi Kashmiri Gate.'
  },
  {
    name: 'Kasol',
    region: 'Himachal Pradesh',
    tag: 'Trek & Chill',
    seed: 218,
    station: 'Pathankot Railway Station',
    tip: 'Train to Pathankot, then HRTC bus via Bhuntar to Kasol (~5 hrs). Budget buses from Delhi ISBT too.'
  },
  {
    name: 'Triund',
    region: 'Himachal Pradesh',
    tag: 'Trekking',
    seed: 15,
    station: 'Pathankot → Dharamshala',
    tip: 'Train to Pathankot, bus to McLeod Ganj. Triund trek starts from McLeod Ganj — 9 km, ~3 hrs.'
  },
  {
    name: 'Delhi',
    region: 'North India',
    tag: 'Capital City',
    seed: 1060,
    station: 'New Delhi / Hazrat Nizamuddin / Old Delhi',
    tip: 'Hub of Indian Railways. Every city connects to Delhi. Metro covers the city for ₹10–60.'
  },
  {
    name: 'Rishikesh',
    region: 'Uttarakhand',
    tag: 'Adventure & Yoga',
    seed: 1036,
    station: 'Haridwar Railway Station (25 km)',
    tip: 'Trains from Delhi to Haridwar run every hour. Shared auto to Rishikesh in 45 mins for just ₹25.'
  },
  {
    name: 'Kashmir',
    region: 'North India',
    tag: 'Paradise',
    seed: 60,
    station: 'Jammu Tawi Railway Station',
    tip: 'Train to Jammu Tawi, then Vande Bharat / shared cab via Banihal tunnel to Srinagar in 4–5 hrs.'
  },
  {
    name: 'Varanasi',
    region: 'North India',
    tag: 'Spiritual',
    seed: 65,
    station: 'Varanasi Junction / Mughal Sarai',
    tip: 'Direct trains from Delhi, Mumbai, Kolkata. Kashi Vishwanath Express from Delhi runs daily.'
  },
  {
    name: 'Leh Ladakh',
    region: 'North India',
    tag: 'High Altitude',
    seed: 70,
    station: 'Jammu Tawi (then road to Leh)',
    tip: 'No direct train to Leh. Train to Jammu → cab to Srinagar → Leh. Or Chandigarh → Manali → Leh.'
  },
  {
    name: 'Agra',
    region: 'North India',
    tag: 'Taj Mahal',
    seed: 75,
    station: 'Agra Cantt Railway Station',
    tip: 'Gatimaan Express from Delhi reaches Agra in just 77 minutes! Taj Express also runs daily.'
  },
  {
    name: 'Coorg',
    region: 'Karnataka',
    tag: 'Coffee & Mist',
    seed: 82,
    station: 'Mysuru Railway Station (then to Madikeri)',
    tip: 'Train to Mysuru, then KSRTC bus to Madikeri — 2.5 hrs through coffee and spice estates.'
  },
  {
    name: 'Andaman Islands',
    region: 'Bay of Bengal',
    tag: 'Island Paradise',
    seed: 897,
    station: 'Chennai / Kolkata Port (then ship)',
    tip: 'Train to Chennai or Kolkata → Government ship to Port Blair (56–60 hrs). Book via A&N Administration.'
  },
  {
    name: 'Kerala',
    region: 'South India',
    tag: 'Backwaters',
    seed: 489,
    station: 'Kochi / Thiruvananthapuram Station',
    tip: 'Kerala is extremely well connected. Direct trains from Delhi, Mumbai & Bangalore to Kochi & Trivandrum.'
  },
  {
    name: 'Spiti Valley',
    region: 'Himachal Pradesh',
    tag: 'Remote & Raw',
    seed: 100,
    station: 'Shimla / Chandigarh Railway Station',
    tip: 'Train to Chandigarh → bus to Shimla → bus to Recong Peo → Spiti. Road open only May–Oct.'
  },
  {
    name: 'Jaisalmer',
    region: 'Rajasthan',
    tag: 'Desert',
    seed: 108,
    station: 'Jaisalmer Railway Station',
    tip: 'Direct overnight train from Delhi — Jaisalmer Express (14659). Departs evening, arrives morning. ₹400–1200.'
  }
];
/* ============================================================
   auth.js — User authentication: login, signup, session
   Storage: accounts → localStorage | session → sessionStorage
   ============================================================ */

let currentUser = null;

/* ---- Session ---- */
function loadSession() {
  try {
    const s = sessionStorage.getItem('rh_user');
    if (s) currentUser = JSON.parse(s);
  } catch (e) {}
  updateNavState();
}

function saveSession(user) {
  currentUser = user;
  sessionStorage.setItem('rh_user', JSON.stringify(user));
  updateNavState();
}

function updateNavState() {
  const guestEl = document.getElementById('navGuest');
  const userEl  = document.getElementById('navUser');

  if (currentUser) {
    guestEl.style.display = 'none';
    userEl.style.display  = 'flex';
    document.getElementById('navUname').textContent  = currentUser.name.split(' ')[0];
    document.getElementById('navAvatar').textContent = currentUser.name.charAt(0).toUpperCase();
  } else {
    guestEl.style.display = 'flex';
    userEl.style.display  = 'none';
  }
}

function signOut() {
  currentUser = null;
  sessionStorage.removeItem('rh_user');
  updateNavState();
  showToast('Signed out. See you on the next trip! 👋');
}

/* ---- Open / Close Auth Modal ---- */
function openAuth(tab = 'login') {
  clearAuthErrors();
  switchTab(tab);
  document.getElementById('authOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeAuth() {
  document.getElementById('authOverlay').classList.remove('open');
  document.body.style.overflow = '';
  // Reset to login view
  document.getElementById('fSuccess').classList.remove('on');
  document.getElementById('fLogin').classList.add('on');
  document.getElementById('tabL').classList.add('on');
  document.getElementById('tabS').classList.remove('on');
}

/* ---- Tab switching ---- */
function switchTab(tab) {
  document.getElementById('fLogin').classList.toggle('on',   tab === 'login');
  document.getElementById('fSignup').classList.toggle('on',  tab === 'signup');
  document.getElementById('fSuccess').classList.remove('on');
  document.getElementById('tabL').classList.toggle('on', tab === 'login');
  document.getElementById('tabS').classList.toggle('on', tab === 'signup');
  clearAuthErrors();
}

/* ---- Error helpers ---- */
function clearAuthErrors() {
  document.querySelectorAll('.ferr').forEach(e => e.classList.remove('on'));
  document.querySelectorAll('.finput').forEach(e => e.classList.remove('err'));
}

function showFieldError(errId, inputId, message) {
  const errEl = document.getElementById(errId);
  if (message) errEl.textContent = message;
  errEl.classList.add('on');
  if (inputId) document.getElementById(inputId).classList.add('err');
}

/* ---- Password visibility toggle ---- */
function togglePw(inputId, btn) {
  const inp = document.getElementById(inputId);
  if (inp.type === 'password') {
    inp.type = 'text';
    btn.textContent = '🙈';
  } else {
    inp.type = 'password';
    btn.textContent = '👁';
  }
}

/* ---- Email validation ---- */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ---- Login ---- */
function doLogin() {
  clearAuthErrors();
  const email = document.getElementById('lEmail').value.trim();
  const pass  = document.getElementById('lPass').value;
  let valid   = true;

  if (!email || !isValidEmail(email)) {
    showFieldError('lEmailErr', 'lEmail', 'Please enter a valid email');
    valid = false;
  }
  if (!pass) {
    showFieldError('lPassErr', 'lPass', 'Please enter your password');
    valid = false;
  }
  if (!valid) return;

  const accounts = JSON.parse(localStorage.getItem('rh_accounts') || '[]');
  const found    = accounts.find(a => a.email === email.toLowerCase());

  if (!found) {
    showFieldError('lEmailErr', 'lEmail', 'No account found with this email');
    return;
  }
  if (found.pw !== btoa(pass)) {
    showFieldError('lPassErr', 'lPass', 'Incorrect password');
    return;
  }

  saveSession({ name: found.name, email: found.email });
  document.getElementById('fLogin').classList.remove('on');
  document.getElementById('fSuccess').classList.add('on');
  document.getElementById('sTitle').textContent = `Welcome back, ${found.name.split(' ')[0]}!`;
  document.getElementById('sMsg').textContent   = 'Ready to plan your next adventure across India?';
}

/* ---- Sign Up ---- */
function doSignup() {
  clearAuthErrors();
  const name  = document.getElementById('sName').value.trim();
  const email = document.getElementById('sEmail').value.trim();
  const pass  = document.getElementById('sPass').value;
  const conf  = document.getElementById('sConf').value;
  let valid   = true;

  if (!name) {
    showFieldError('sNameErr', 'sName', 'Please enter your name');
    valid = false;
  }
  if (!email || !isValidEmail(email)) {
    showFieldError('sEmailErr', 'sEmail', 'Please enter a valid email');
    valid = false;
  }
  if (pass.length < 6) {
    showFieldError('sPassErr', 'sPass', 'Password must be at least 6 characters');
    valid = false;
  }
  if (pass !== conf) {
    showFieldError('sConfErr', 'sConf', 'Passwords do not match');
    valid = false;
  }
  if (!valid) return;

  const accounts = JSON.parse(localStorage.getItem('rh_accounts') || '[]');
  if (accounts.find(a => a.email === email.toLowerCase())) {
    showFieldError('sEmailErr', 'sEmail', 'An account with this email already exists');
    return;
  }

  accounts.push({ name, email: email.toLowerCase(), pw: btoa(pass) });
  localStorage.setItem('rh_accounts', JSON.stringify(accounts));

  saveSession({ name, email: email.toLowerCase() });
  document.getElementById('fSignup').classList.remove('on');
  document.getElementById('fSuccess').classList.add('on');
  document.getElementById('sTitle').textContent = `Welcome, ${name.split(' ')[0]}! 🎉`;
  document.getElementById('sMsg').textContent   = 'Your account is ready. Explore 17+ destinations and build your perfect Indian adventure!';
}
/* ============================================================
   trip.js — Destination cards, trip planning wizard,
             itinerary generation via Claude API
   ============================================================ */

/* ---- State ---- */
let SD  = null;   // selected destination
let TD  = {};     // trip data collected from the wizard

/* ============================================================
   RENDER DESTINATION CARDS
   Images: picsum.photos/seed/{n} — reliable in all sandboxes
   ============================================================ */
function renderDests() {
  const grid = document.getElementById('destGrid');

  grid.innerHTML = DESTS.map((d, i) => `
    <div class="dest-card" onclick="openTrip(${i})">
      <img
        src="https://picsum.photos/seed/${d.seed}/480/600"
        alt="${d.name}"
        loading="lazy"
        onerror="this.src='https://picsum.photos/seed/${d.seed + 500}/480/600'"
      >
      <div class="card-overlay"></div>
      <div class="card-train">
        <span style="flex-shrink:0">🚆</span>
        <span>${d.station}</span>
      </div>
      <div class="card-content">
        <div class="card-tag">${d.tag}</div>
        <div class="card-name">${d.name}</div>
        <div class="card-meta">📍 ${d.region}</div>
      </div>
      <button class="card-plan-btn" onclick="event.stopPropagation(); openTrip(${i})">
        Plan Trip →
      </button>
    </div>
  `).join('');
}

/* ============================================================
   TRIP PLANNING OVERLAY
   ============================================================ */

function openTrip(idx) {
  SD = DESTS[idx];
  TD = { origin: '', interests: '', duration: '', budget: '', pace: '' };

  // Populate step 1
  document.getElementById('ts1badge').textContent = SD.name;
  document.getElementById('ts1title').textContent = `Plan your ${SD.name} journey`;
  document.getElementById('tOrigin').value        = '';
  document.getElementById('tInterests').value     = '';
  document.getElementById('custDays').style.display = 'none';

  // Train info box
  const tb = document.getElementById('trainBox');
  tb.innerHTML = `
    <span class="train-box-icon">🚆</span>
    <div>
      <span class="train-box-station">${SD.station}</span>
      ${SD.tip}
    </div>`;

  // Reset selections
  document.querySelectorAll('.dpill').forEach(p => p.classList.remove('on'));
  document.querySelectorAll('.ocard').forEach(c => c.classList.remove('on'));

  // Reset itinerary panel
  document.getElementById('iout').classList.remove('on');
  document.getElementById('icontent').innerHTML = '';
  document.getElementById('thinking').style.display = 'flex';
  document.getElementById('iactions').style.display = 'none';

  showTStep(1);
  updDots(1);
  document.getElementById('tripOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeTrip() {
  document.getElementById('tripOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

/* ---- Step navigation ---- */
function showTStep(n) {
  for (let i = 1; i <= 4; i++) {
    document.getElementById('ts' + i).classList.toggle('on', i === n);
  }
  document.getElementById('iout').classList.remove('on');
}

function updDots(n) {
  for (let i = 1; i <= 4; i++) {
    const dot = document.getElementById('d' + i);
    dot.classList.remove('done', 'cur');
    if (i < n)      dot.classList.add('done');
    else if (i === n) dot.classList.add('cur');
  }
  for (let i = 1; i <= 3; i++) {
    document.getElementById('l' + i).classList.toggle('done', i < n);
  }
}

function tStep(n) {
  if (n === 2) {
    TD.origin    = document.getElementById('tOrigin').value.trim() || 'India';
    TD.interests = document.getElementById('tInterests').value.trim();
  }
  if (n === 3 && !TD.duration) { showToast('Please select trip duration'); return; }
  if (n === 4 && !TD.budget)   { showToast('Please select travel style');  return; }
  showTStep(n);
  updDots(n);
}

/* ---- Duration selection ---- */
function selDur(el, val) {
  document.querySelectorAll('.dpill').forEach(p => p.classList.remove('on'));
  el.classList.add('on');
  document.getElementById('custDays').style.display = 'none';
  TD.duration = val;
}

function showCust(el) {
  document.querySelectorAll('.dpill').forEach(p => p.classList.remove('on'));
  el.classList.add('on');
  const ci = document.getElementById('custDays');
  ci.style.display = 'block';
  ci.focus();
  ci.oninput = () => { TD.duration = ci.value ? ci.value + ' days' : ''; };
}

/* ---- Budget & pace ---- */
function selBudget(el, val) {
  document.querySelectorAll('#ts3 .ocard').forEach(c => c.classList.remove('on'));
  el.classList.add('on');
  TD.budget = val;
}

function selPace(el, val) {
  document.querySelectorAll('#ts4 .ocard').forEach(c => c.classList.remove('on'));
  el.classList.add('on');
  TD.pace = val;
}

/* ============================================================
   ITINERARY GENERATION — Claude API
   ============================================================ */

async function genItin() {
  if (!TD.pace) { showToast('Please select your travel pace'); return; }

  // Hide all steps, show output
  for (let i = 1; i <= 4; i++) document.getElementById('ts' + i).classList.remove('on');
  document.getElementById('iout').classList.add('on');

  // Populate header
  document.getElementById('ithumb').src    = `https://picsum.photos/seed/${SD.seed}/120/120`;
  document.getElementById('idname').textContent = SD.name;
  document.getElementById('idmeta').innerHTML   = `
    <span class="itag">${TD.duration}</span>
    <span class="itag">${TD.budget}</span>
    <span class="itag">${TD.pace}</span>
    <span style="color:var(--text-muted)">From ${TD.origin}</span>`;

  document.getElementById('thinking').style.display = 'flex';
  document.getElementById('icontent').innerHTML     = '';
  document.getElementById('iactions').style.display = 'none';

  // Build transport instruction based on budget
  const transportGuide = buildTransportGuide(TD.budget);

  const prompt = buildPrompt(transportGuide);

  // ── Gemini API ──────────────────────────────────────────────
  // Model: gemini-1.5-flash  (fast, generous limits with Gemini Pro)
  // Get your key: https://aistudio.google.com/app/apikey
  const GEMINI_API_KEY = 'AIzaSyCtLT7lHGSOmheHs9COpaQXRBKV0u0Ykrg';
  const GEMINI_MODEL   = 'gemini-1.5-flash';
  const GEMINI_URL     = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

  try {
    const res = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.8, maxOutputTokens: 4096 }
      })
    });

    const data = await res.json();

    // Gemini response: data.candidates[0].content.parts[0].text
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text
               || data?.error?.message
               || 'Could not generate itinerary. Please try again.';

    document.getElementById('thinking').style.display = 'none';
    renderItinerary(text);
    document.getElementById('iactions').style.display = 'block';

  } catch (err) {
    document.getElementById('thinking').style.display = 'none';
    document.getElementById('icontent').innerHTML =
      '<span style="color:var(--text-muted)">Error generating itinerary. Check your Gemini API key and try again.</span>';
    console.error('Gemini API error:', err);
  }
}

/* Build transport instruction string */
function buildTransportGuide(budget) {
  const guides = {
    'budget':    'PRIMARY TRANSPORT: Indian Railways Sleeper/3AC. Give specific real train names, train numbers, journey time, ticket price in INR. Also local state buses, shared autos, local jeeps. No flights.',
    'mid-range': 'PRIMARY TRANSPORT: Train 3AC/2AC intercity. Local buses & autos within city. Give train names and fares in INR.',
    'premium':   'PRIMARY TRANSPORT: AC trains (1AC/2AC) or Vande Bharat/Shatabdi. Private cabs within city.',
    'luxury':    'PRIMARY TRANSPORT: Flights preferred, private transfers, luxury trains (Palace on Wheels) where relevant.'
  };
  return guides[budget] || guides['mid-range'];
}

/* Build full prompt */
function buildPrompt(transportGuide) {
  return `You are a RouteHunt expert India travel planner. Create a DETAILED practical itinerary.

TRIP DETAILS:
- Destination: ${SD.name}, ${SD.region} (${SD.tag})
- Nearest Station: ${SD.station}
- Starting From: ${TD.origin}
- Duration: ${TD.duration}
- Budget: ${TD.budget}
- Travel Pace: ${TD.pace}
${TD.interests ? `- Special Interests: ${TD.interests}` : ''}

TRANSPORT RULE: ${transportGuide}

FORMAT YOUR RESPONSE EXACTLY AS:

## 🚆 Getting There from ${TD.origin}
Specific train name, number, duration, class, price INR. IRCTC booking tip. Connecting legs if needed.

## 💰 Budget Snapshot
Daily estimate INR: transport + stay + food + activities. Total trip cost range.

## Day 1: [Catchy Day Theme]
### 🌅 Morning
Activities with timings, entry fees INR, insider tips
### ☀️ Afternoon
Lunch spot — specific dish & price INR. Activities.
### 🌙 Evening
Evening plan, dinner with must-try dish & cost INR, stay recommendation with price INR.

[Continue for all days]

## 🏨 Where to Stay
Budget option ₹300–800/night and mid option ₹800–2500/night with real property names.

## 🍽️ Must Eat
5 local dishes, where to find them, price INR.

## 🎒 Pack This
5 essential items specific to ${SD.name}.

## ⚠️ Traveller Tips
3–4 tips: scams to avoid, local customs, best season, SIM/connectivity.

Be SPECIFIC — use real place names, actual train numbers, real street food stalls, real trek routes. All prices in INR.`;
}

/* Render markdown-like itinerary to HTML */
function renderItinerary(text) {
  document.getElementById('icontent').innerHTML = text
    .replace(/^## (.+)$/gm,  '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>[^<]*<\/li>\n?)+/g, m => '<ul>' + m + '</ul>')
    .replace(/\n\n/g, '<br><br>');
}

/* Start over from step 1 */
function startOver() {
  showTStep(1);
  updDots(1);
  document.getElementById('iout').classList.remove('on');
  document.getElementById('icontent').innerHTML = '';
  document.querySelectorAll('.dpill').forEach(p => p.classList.remove('on'));
  document.querySelectorAll('.ocard').forEach(c => c.classList.remove('on'));
}

/* ============================================================
   HERO SEARCH
   ============================================================ */
function doHeroSearch() {
  const q = document.getElementById('heroSearch').value.toLowerCase().trim();
  if (!q) {
    document.getElementById('destinations').scrollIntoView({ behavior: 'smooth' });
    return;
  }

  const idx = DESTS.findIndex(d =>
    d.name.toLowerCase().includes(q) ||
    d.tag.toLowerCase().includes(q)  ||
    d.region.toLowerCase().includes(q)
  );

  if (idx >= 0) {
    openTrip(idx);
  } else {
    showToast('Destination not found — browse below!');
    document.getElementById('destinations').scrollIntoView({ behavior: 'smooth' });
  }
}

/* ============================================================
   TOAST UTILITY
   ============================================================ */
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}


/* ============================================================
   PULL-UP SCROLL REVEAL — IntersectionObserver
   Gives a "pulling from below" feel as elements enter view
   ============================================================ */

function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.10,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.reveal, .reveal-card, .reveal-spring')
    .forEach(el => observer.observe(el));
}

/* Apply pull-up reveal classes, then start observing */
function applyRevealClasses() {
  // Section headers — smooth pull up
  document.querySelectorAll('.sec-header').forEach(el => {
    el.classList.add('reveal');
  });

  // Destination cards — tilt + pull feel, staggered per row
  document.querySelectorAll('.dest-card').forEach((el, i) => {
    el.classList.add('reveal-card');
    const d = i % 6;
    if (d > 0) el.classList.add('reveal-d' + d);
  });

  // Feature cards — spring bounce up, staggered
  document.querySelectorAll('.feat-card').forEach((el, i) => {
    el.classList.add('reveal-spring');
    if (i > 0) el.classList.add('reveal-d' + Math.min(i, 6));
  });

  // Footer
  const footer = document.querySelector('footer');
  if (footer) footer.classList.add('reveal');

  initScrollReveal();
}