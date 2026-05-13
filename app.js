/* ============================================================
   RouteHunt — Full JavaScript
   ============================================================ */

/* ============================================================
   DESTINATION DATA
   ============================================================ */

const DESTS = [
  {
    name: 'Goa',
    region: 'West India',
    tag: 'Beaches',
    station: 'Madgaon (Margao) Railway Station',
    tip: 'Konkan Railway connects Goa from Mumbai (8 hrs), Bangalore & Delhi.',
    image: 'RouteHunt/goa-tourism.jpg'
  },

  {
    name: 'Rajasthan',
    region: 'North India',
    tag: 'Heritage',
    station: 'Jaipur / Jodhpur / Udaipur Railway Station',
    tip: 'Excellent connectivity from all metros.',
    image: 'RouteHunt/rajasthan.jpg'
  },

  {
    name: 'Shimla',
    region: 'Himachal Pradesh',
    tag: 'Hill Station',
    station: 'Kalka Station → Toy Train to Shimla',
    tip: 'UNESCO heritage toy train experience.',
    image: 'RouteHunt/shimla.jpg'
  },

  {
    name: 'Manali',
    region: 'Himachal Pradesh',
    tag: 'Mountains',
    station: 'Chandigarh Railway Station',
    tip: 'Overnight Volvo buses available from Delhi.',
    image: 'RouteHunt/manali.jpg'
  },

  {
    name: 'Kasol',
    region: 'Himachal Pradesh',
    tag: 'Trek & Chill',
    station: 'Pathankot Railway Station',
    tip: 'Budget buses available from Delhi.',
    image: 'RouteHunt/kasol.jpg'
  },

  {
    name: 'Triund',
    region: 'Himachal Pradesh',
    tag: 'Trekking',
    station: 'Pathankot → Dharamshala',
    tip: 'Triund trek starts from McLeod Ganj.',
    image: 'RouteHunt/triund.jpg'
  },

  {
    name: 'Delhi',
    region: 'North India',
    tag: 'Capital City',
    station: 'New Delhi / Hazrat Nizamuddin / Old Delhi',
    tip: 'Metro connectivity across the city.',
    image: 'RouteHunt/delhi.jpg'
  },

  {
    name: 'Rishikesh',
    region: 'Uttarakhand',
    tag: 'Adventure & Yoga',
    station: 'Haridwar Railway Station',
    tip: 'Shared autos available from Haridwar.',
    image: 'RouteHunt/rishikesh.jpg'
  },

  {
    name: 'Kashmir',
    region: 'North India',
    tag: 'Paradise',
    station: 'Jammu Tawi Railway Station',
    tip: 'Beautiful valley routes via Banihal tunnel.',
    image: 'RouteHunt/kashmir.jpg'
  },

  {
    name: 'Varanasi',
    region: 'North India',
    tag: 'Spiritual',
    station: 'Varanasi Junction',
    tip: 'Daily direct trains from major cities.',
    image: 'RouteHunt/varanasi.jpg'
  },

  {
    name: 'Leh Ladakh',
    region: 'North India',
    tag: 'High Altitude',
    station: 'Jammu Tawi',
    tip: 'Road journey via Manali or Srinagar.',
    image: 'RouteHunt/ladakh.jpg'
  },

  {
    name: 'Agra',
    region: 'North India',
    tag: 'Taj Mahal',
    station: 'Agra Cantt Railway Station',
    tip: 'Gatimaan Express reaches in 77 minutes.',
    image: 'RouteHunt/agra.jpg'
  },

  {
    name: 'Coorg',
    region: 'Karnataka',
    tag: 'Coffee & Mist',
    station: 'Mysuru Railway Station',
    tip: 'Beautiful coffee estate routes.',
    image: 'RouteHunt/coorg.jpg'
  },

  {
    name: 'Andaman Islands',
    region: 'Bay of Bengal',
    tag: 'Island Paradise',
    station: 'Chennai / Kolkata Port',
    tip: 'Government ships available to Port Blair.',
    image: 'RouteHunt/andaman.jpg'
  },

  {
    name: 'Kerala',
    region: 'South India',
    tag: 'Backwaters',
    station: 'Kochi / Thiruvananthapuram',
    tip: 'Excellent railway connectivity.',
    image: 'RouteHunt/kerala.jpg'
  },

  {
    name: 'Spiti Valley',
    region: 'Himachal Pradesh',
    tag: 'Remote & Raw',
    station: 'Shimla / Chandigarh Railway Station',
    tip: 'Road open mainly from May–October.',
    image: 'RouteHunt/spiti.jpg'
  },

  {
    name: 'Jaisalmer',
    region: 'Rajasthan',
    tag: 'Desert',
    station: 'Jaisalmer Railway Station',
    tip: 'Direct overnight train from Delhi.',
    image: 'RouteHunt/jaisalmer.jpg'
  }
];


/* ============================================================
   GLOBAL STATE
   ============================================================ */

let currentUser = null;
let SD = null;
let TD = {};


/* ============================================================
   SESSION MANAGEMENT
   ============================================================ */

function loadSession() {
  try {
    const s = sessionStorage.getItem('rh_user');

    if (s) {
      currentUser = JSON.parse(s);
    }

  } catch (e) {}

  updateNavState();
}

function saveSession(user) {

  currentUser = user;

  sessionStorage.setItem(
    'rh_user',
    JSON.stringify(user)
  );

  updateNavState();
}

function signOut() {

  currentUser = null;

  sessionStorage.removeItem('rh_user');

  updateNavState();

  showToast('Signed out successfully 👋');
}


/* ============================================================
   NAVBAR STATE
   ============================================================ */

function updateNavState() {

  const guestEl = document.getElementById('navGuest');
  const userEl  = document.getElementById('navUser');

  if (!guestEl || !userEl) return;

  if (currentUser) {

    guestEl.style.display = 'none';
    userEl.style.display  = 'flex';

    document.getElementById('navUname').textContent =
      currentUser.name.split(' ')[0];

    document.getElementById('navAvatar').textContent =
      currentUser.name.charAt(0).toUpperCase();

  } else {

    guestEl.style.display = 'flex';
    userEl.style.display  = 'none';
  }
}


/* ============================================================
   DESTINATION CARDS
   ============================================================ */

function renderDests() {

  const grid = document.getElementById('destGrid');

  if (!grid) return;

  grid.innerHTML = DESTS.map((d, i) => `

    <div class="dest-card" onclick="openTrip(${i})">

      <img
        src="${d.image}"
        alt="${d.name}"
        loading="lazy"
        onerror="this.src='https://picsum.photos/500/700'"
      >

      <div class="card-overlay"></div>

      <div class="card-train">
        <span>🚆</span>
        <span>${d.station}</span>
      </div>

      <div class="card-content">

        <div class="card-tag">
          ${d.tag}
        </div>

        <div class="card-name">
          ${d.name}
        </div>

        <div class="card-meta">
          📍 ${d.region}
        </div>

      </div>

      <button
        class="card-plan-btn"
        onclick="event.stopPropagation(); openTrip(${i})"
      >
        Plan Trip →
      </button>

    </div>

  `).join('');
}


/* ============================================================
   OPEN TRIP
   ============================================================ */

function openTrip(idx) {

  SD = DESTS[idx];

  TD = {
    origin: '',
    interests: '',
    duration: '',
    budget: '',
    pace: ''
  };

  const overlay = document.getElementById('tripOverlay');

  if (overlay) {
    overlay.classList.add('open');
  }

  document.body.style.overflow = 'hidden';

  const title = document.getElementById('ts1title');

  if (title) {
    title.textContent =
      `Plan your ${SD.name} journey`;
  }

  const badge = document.getElementById('ts1badge');

  if (badge) {
    badge.textContent = SD.name;
  }

  const trainBox = document.getElementById('trainBox');

  if (trainBox) {

    trainBox.innerHTML = `
      <span class="train-box-icon">🚆</span>

      <div>
        <span class="train-box-station">
          ${SD.station}
        </span>

        ${SD.tip}
      </div>
    `;
  }

  const thumb = document.getElementById('ithumb');

  if (thumb) {
    thumb.src = SD.image;
  }

  showTStep(1);

  updDots(1);
}


/* ============================================================
   CLOSE TRIP
   ============================================================ */

function closeTrip() {

  const overlay = document.getElementById('tripOverlay');

  if (overlay) {
    overlay.classList.remove('open');
  }

  document.body.style.overflow = '';
}


/* ============================================================
   STEP SYSTEM
   ============================================================ */

function showTStep(n) {

  for (let i = 1; i <= 4; i++) {

    const step = document.getElementById('ts' + i);

    if (step) {
      step.classList.toggle('on', i === n);
    }
  }
}

function updDots(n) {

  for (let i = 1; i <= 4; i++) {

    const dot = document.getElementById('d' + i);

    if (!dot) continue;

    dot.classList.remove('done', 'cur');

    if (i < n) {
      dot.classList.add('done');
    }

    else if (i === n) {
      dot.classList.add('cur');
    }
  }
}


/* ============================================================
   HERO SEARCH
   ============================================================ */

function doHeroSearch() {

  const input = document.getElementById('heroSearch');

  if (!input) return;

  const q = input.value.toLowerCase().trim();

  if (!q) return;

  const idx = DESTS.findIndex(d =>

    d.name.toLowerCase().includes(q) ||
    d.tag.toLowerCase().includes(q) ||
    d.region.toLowerCase().includes(q)
  );

  if (idx >= 0) {

    openTrip(idx);

  } else {

    showToast('Destination not found');
  }
}


/* ============================================================
   TOAST
   ============================================================ */

function showToast(msg) {

  const t = document.getElementById('toast');

  if (!t) return;

  t.textContent = msg;

  t.classList.add('show');

  setTimeout(() => {
    t.classList.remove('show');
  }, 3000);
}


/* ============================================================
   SCROLL REVEAL
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
    threshold: 0.1
  });

  document
    .querySelectorAll('.reveal, .reveal-card, .reveal-spring')
    .forEach(el => observer.observe(el));
}


function applyRevealClasses() {

  document
    .querySelectorAll('.sec-header')
    .forEach(el => {
      el.classList.add('reveal');
    });

  document
    .querySelectorAll('.dest-card')
    .forEach((el, i) => {

      el.classList.add('reveal-card');

      if (i > 0) {
        el.classList.add(
          'reveal-d' + Math.min(i, 6)
        );
      }
    });

  initScrollReveal();
}


/* ============================================================
   PAGE INIT
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  loadSession();

  renderDests();

  applyRevealClasses();

});