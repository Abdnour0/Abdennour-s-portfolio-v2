import './i18n.js';
import './hero-3d.js';

/* ΓöÇΓöÇ GSAP SETUP ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */
const HAS_GSAP = typeof gsap !== 'undefined';
if (!HAS_GSAP) {
  window.gsap = { to:function(){}, from:function(){}, fromTo:function(){}, set:function(){}, killTweensOf:function(){}, registerPlugin:function(){} };
  document.body.style.cursor = 'auto';
  ['#cursor','#cursor-ring','#cursor-text','#cursor-glow'].forEach(function(s) {
    var el = document.querySelector(s);
    if (el) el.remove();
  });
} else {
  try { gsap.registerPlugin(ScrollTrigger); } catch (e) {}
}

/* ΓöÇΓöÇ PERFORMANCE DETECTION ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */
var isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
// Only check for fine pointer (mouse) ΓÇö touch-capable laptops should not be treated as touch-only
var hasMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
var isLowEnd = (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) || !window.requestIdleCallback;

/* ΓöÇΓöÇ LENIS SMOOTH SCROLL (disabled on touch / low-end for perf) ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */
let lenis = null;
if (hasMouse && !isLowEnd && !isTouchDevice) {
  try {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });
  } catch (e) {
    lenis = null;
  }

  if (window.ScrollTrigger) {
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function(time) {
      lenis.raf(time * 1000);
    });
  } else {
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }
}

/* ΓöÇΓöÇ SCROLL PROGRESS ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */
const scrollProgress = document.getElementById('scroll-progress');
var bttRing = document.querySelector('.btt-ring circle:last-child');
var bttRingR = bttRing ? parseFloat(bttRing.getAttribute('r')) || 16 : 16;
var bttCirc = 2 * Math.PI * bttRingR;
function updateScrollProgress(e) {
  var scrollY = lenis ? e.scroll : window.scrollY;
  var maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  if (maxScroll <= 0) return;
  var progress = scrollY / maxScroll;
  if (HAS_GSAP) {
    gsap.to(scrollProgress, { width: progress * 100 + '%', duration: 0.1, ease: 'none' });
  } else {
    scrollProgress.style.width = progress * 100 + '%';
  }
  if (bttRing) bttRing.style.strokeDashoffset = bttCirc * (1 - Math.min(progress, 1));
}
if (lenis) {
  lenis.on('scroll', updateScrollProgress);
} else {
  window.addEventListener('scroll', updateScrollProgress, { passive: true });
}

/* ΓöÇΓöÇ CURSOR (mouse only) ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursor-ring');
const cursorText = document.getElementById('cursor-text');
const cursorGlow = document.getElementById('cursor-glow');

if (hasMouse && cursor) {
var mx = 0, my = 0, _cursorRAF = false;

if (HAS_GSAP) {
  gsap.set([cursor, ring, cursorText, cursorGlow], { xPercent: -50, yPercent: -50 });
}

document.addEventListener('mousemove', function(e) {
  mx = e.clientX;
  my = e.clientY;
  if (!_cursorRAF) {
    _cursorRAF = true;
    requestAnimationFrame(function() {
      _cursorRAF = false;
      if (HAS_GSAP) {
        gsap.to(cursor,     { x: mx, y: my, duration: 0.1, ease: 'power2.out' });
        gsap.to(cursorText, { x: mx, y: my, duration: 0.1, ease: 'power2.out' });
        gsap.to(cursorGlow, { x: mx, y: my, duration: 0.6, ease: 'power2.out' });
        gsap.to(ring,       { x: mx, y: my, duration: 0.3, ease: 'power2.out' });
      } else {
        var p = 'translate(' + mx + 'px, ' + my + 'px) translate(-50%, -50%)';
        cursor.style.transform     = p;
        cursorText.style.transform = p;
        cursorGlow.style.transform = p;
        ring.style.transform       = p;
      }
    });
  }
});
} // end cursor (desktop only)

/* ΓöÇΓöÇ CURSOR TRAIL ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */
if (hasMouse && HAS_GSAP) {
  var trail = [];
  for (var i = 0; i < 12; i++) {
    var dot = document.createElement('div');
    dot.className = 'cursor-trail-dot';
    document.body.appendChild(dot);
    trail.push(dot);
    gsap.set(dot, { opacity: 0 });
  }
  var ti = 0, _trailRAF = false;
  document.addEventListener('mousemove', function(e) {
    if (_trailRAF) return;
    _trailRAF = true;
    requestAnimationFrame(function() {
      _trailRAF = false;
      var dot = trail[ti % trail.length];
      gsap.set(dot, { x: e.clientX, y: e.clientY, opacity: 0.6, scale: 1 });
      gsap.to(dot, { opacity: 0, scale: 0.2, duration: 0.6, ease: 'power2.out' });
      ti++;
    });
  });
}

/* ΓöÇΓöÇ 3D TILT HOVER ON CARDS ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */
if (hasMouse && HAS_GSAP) {
  document.querySelectorAll('.service-card, .work-card, .cert-cell').forEach(function(card) {
    var _tiltRAF = false, _tiltX = 0.5, _tiltY = 0.5, _tiltRect = null;
    card.addEventListener('mouseenter', function() { _tiltRect = card.getBoundingClientRect(); });
    card.addEventListener('mousemove', function(e) {
      if (!_tiltRect) return;
      _tiltX = (e.clientX - _tiltRect.left) / _tiltRect.width;
      _tiltY = (e.clientY - _tiltRect.top) / _tiltRect.height;
      if (!_tiltRAF) {
        _tiltRAF = true;
        requestAnimationFrame(function() {
          _tiltRAF = false;
          gsap.to(card, {
            rotateX: (_tiltY - 0.5) * -12,
            rotateY: (_tiltX - 0.5) * 12,
            transformPerspective: 800,
            duration: 0.3,
            ease: 'power2.out'
          });
        });
      }
    });
    card.addEventListener('mouseleave', function() {
      _tiltRect = null;
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.4,
        ease: 'power2.out'
      });
    });
  });
}

/* ΓöÇΓöÇ ABOUT IMAGE PARALLAX ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */
if (window.gsap && window.ScrollTrigger && !isTouchDevice) {
  var aboutImg = document.querySelector('.about-img-wrap');
  if (aboutImg) {
    gsap.fromTo(aboutImg, {
      y: 0
    }, {
      y: -40,
      ease: 'none',
      scrollTrigger: {
        trigger: aboutImg,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      }
    });
  }
}

/* ΓöÇΓöÇ PROJECT MODALS ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */
const modalLink = document.getElementById('modal-link');
if (modalLink) {
  modalLink.addEventListener('mouseenter', () => {
    gsap.to(cursorText, { opacity: 0, scale: 0.5, duration: 0.3 });
    gsap.to(cursor, { 
      width: 10, 
      height: 10, 
      backgroundColor: 'var(--gold)',
      mixBlendMode: 'difference',
      duration: 0.3 
    });
  });

  // Extremely robust click handler for the modal link
   modalLink.addEventListener('click', (e) => {
     const href = modalLink.getAttribute('href');
     if (href && href !== '#' && href !== '') {
       e.preventDefault();
       e.stopPropagation();
       window.open(href, '_blank');
     }
   }, { capture: true }); // Use capture to intercept before other listeners
 }

const projectData = {
  "E-Commerce Web Application": {
    desc: "A fast, modern e-commerce frontend built with Vite and Vanilla JavaScript. It features dynamic product rendering, a fully functional shopping cart, and a responsive interface optimized for performance.",
    tech: "Vite, Vanilla JavaScript, HTML5, CSS3, ES Modules, LocalStorage API",
    challenge: "Building a fully dynamic shopping experience ΓÇö product filtering, cart state, and quantity management ΓÇö without any framework or backend, keeping the bundle size minimal.",
    solution: "Architected the app using ES Modules for clean separation of concerns, managed cart state entirely in LocalStorage for persistence, and used event delegation to handle dynamic DOM interactions efficiently.",
    role: "Frontend Developer",
    img: "images/photo.jpg",
    gradient: "linear-gradient(135deg, #1a0a00 0%, #3d1a00 40%, #c9784c 100%)",
    link: "https://ecommerce-frontend-v2-beryl.vercel.app/",
    tag: "Vite ┬╖ Vanilla JS ┬╖ 2025"
  },
  "Mini E-Learning Platform": {
    desc: "An intuitive digital classroom environment developed with Laravel and Vue.js. This platform allows educators to upload course materials while students can track their progress through interactive modules.",
    tech: "Laravel, Vue.js, MySQL, Tailwind CSS, Vite",
    challenge: "Managing complex state transitions for student progress across multiple modules and ensuring data persistence during session timeouts.",
    solution: "Utilized Vuex for centralized state management and implemented a background sync service to periodically save student progress without interrupting the user experience.",
    role: "Full-Stack Developer",
    img: new URL('../images/ElearningHubBackImage.png', import.meta.url).href,
    gradient: "linear-gradient(135deg, #00101a 0%, #003d5c 40%, #4cc9c5 100%)",
    link: "https://github.com/Abdnour0",
    tag: "Laravel ┬╖ Vue.js ┬╖ 2024"
  },
  "Stock Management System (C)": {
    desc: "A high-performance systems-level application designed for real-time inventory tracking. Built with pure C, it focuses on extreme memory efficiency and fast data retrieval.",
    tech: "C, Data Structures, File I/O, Algorithms, GCC",
    challenge: "Handling large datasets with minimal memory overhead while providing sub-second search results across thousands of inventory entries.",
    solution: "Developed a custom hash-table implementation with open addressing to minimize memory allocation and used binary search on sorted indices for fast lookups.",
    role: "Software Developer",
    img: null,
    gradient: "linear-gradient(135deg, #0a0012 0%, #2e004d 40%, #9b59b6 100%)",
    link: "https://github.com/Abdnour0",
    tag: "C ┬╖ Data Structures ┬╖ 2023"
  },
  "Hotel Management Web Application": {
    desc: "A comprehensive administrative dashboard for hospitality management. This application streamlines the entire guest journey, from initial room booking to final check-out handling.",
    tech: "Django, Vue.js, PostgreSQL, GSAP, Redis",
    challenge: "Automating the complex billing logic that involves varying rates, tax calculations, and seasonal discounts while maintaining strict auditability.",
    solution: "Designed a modular billing engine using the Strategy Pattern to separate calculation logic from data retrieval, allowing for easy updates and testing.",
    role: "Full-Stack Developer",
    img: null,
    gradient: "linear-gradient(135deg, #1a0a00 0%, #3d1a00 40%, #c9784c 100%)",
    link: "https://github.com/Abdnour0",
    tag: "Django ┬╖ Vue.js ┬╖ 2025"
  },
  "Student Management System": {
    desc: "A cross-platform desktop application built with Java to help educational institutions manage student records, grades, and attendance efficiently. It strictly follows robust Object-Oriented Programming principles.",
    tech: "Java, Swing, OOP, SQLite, JDBC",
    challenge: "Ensuring cross-platform compatibility and a consistent look-and-feel across various Windows and Linux environments without sacrificing performance.",
    solution: "Used the Java Swing library with custom UI components and implemented a persistent SQLite database for lightweight, file-based data storage.",
    role: "Java Developer",
    img: null,
    gradient: "linear-gradient(135deg, #1a000a 0%, #4d0026 40%, #e05599 100%)",
    link: "https://github.com/Abdnour0",
    tag: "Java ┬╖ OOP ┬╖ 2024"
  }
};

const modal = document.getElementById('project-modal');
const modalClose = document.querySelector('.modal-close');
const modalOverlay = document.querySelector('.modal-overlay');
let lastFocusedElement = null;

function getFocusableElements(container) {
  return container.querySelectorAll('a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])');
}

function trapFocus(e) {
  if (!modal.classList.contains('active')) return;
  const focusable = getFocusableElements(modal);
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (e.key === 'Tab') {
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }
}

function openModal(title) {
  if (!modal) return;
  let data = projectData[title];
  if (!data) return;

  const activeLang = localStorage.getItem('portfolioLang') || 'en';
  if (activeLang !== 'en' && window.projectTranslations && window.projectTranslations[activeLang] && window.projectTranslations[activeLang][title]) {
    data = { ...data, ...window.projectTranslations[activeLang][title] };
  }

  const modalImg = document.getElementById('modal-img');
  const modalImgWrap = document.querySelector('.modal-img-wrap');

  document.getElementById('modal-title').textContent = data.title || title;
  document.getElementById('modal-desc').textContent = data.desc;
  document.getElementById('modal-tech').textContent = data.tech;
  document.getElementById('modal-tag').textContent = data.tag;
  if (document.getElementById('modal-role')) {
    var dr = (window.translations && window.translations[activeLang] && window.translations[activeLang].defaultRole) || "Full-Stack Developer";
    document.getElementById('modal-role').textContent = data.role || dr;
  }
  document.getElementById('modal-challenge').textContent = data.challenge;
  document.getElementById('modal-solution').textContent = data.solution;
  
  if (data.img) {
    modalImg.src = data.img;
    modalImg.style.display = 'block';
    modalImgWrap.style.background = 'var(--bg-3)';
  } else {
    modalImg.style.display = 'none';
    modalImgWrap.style.background = data.gradient || 'var(--bg-3)';
  }
  
  document.getElementById('modal-link').href = data.link;

  modal.classList.add('active');
  document.documentElement.classList.add('modal-open');
  document.body.classList.add('modal-open');
  lastFocusedElement = document.activeElement;
  
  // Focus the modal container
  const container = document.querySelector('.modal-container');
  if (container) container.focus();
  
  // Set up share link
  const shareBtn = document.getElementById('modal-share');
  if (shareBtn) {
    shareBtn._shareHandler = function() {
      var lang = localStorage.getItem('portfolioLang') || 'en';
      var t = (window.translations && window.translations[lang]) || window.translations.en;
      if (navigator.share) {
        navigator.share({ title: data.title || title, text: data.desc, url: data.link }).catch(function(){});
      } else {
        navigator.clipboard.writeText(data.link).then(function() {
          shareBtn.textContent = t.shareCopied || 'Copied!';
          setTimeout(function(){ shareBtn.textContent = t.modalShare || 'Share'; }, 2000);
        }).catch(function(){});
      }
    };
    shareBtn.removeEventListener('click', shareBtn._shareHandler);
    shareBtn.addEventListener('click', shareBtn._shareHandler);
  }
  
  // Add keyboard trap listener (remove first to avoid duplicates)
  document.removeEventListener('keydown', trapFocus);
  document.addEventListener('keydown', trapFocus);
  
  // Simplified animation for modal content to ensure visibility
  gsap.fromTo('.modal-right > *', 
    { y: 20, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.4,
      stagger: 0.05,
      ease: "power2.out",
      delay: 0.1,
      clearProps: "all"
    }
  );
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove('active');
  document.documentElement.classList.remove('modal-open');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', trapFocus);
  if (lastFocusedElement) { lastFocusedElement.focus(); lastFocusedElement = null; }
}

if (modalClose) {
  modalClose.addEventListener('click', closeModal);
}

if (modalOverlay) {
  modalOverlay.addEventListener('click', closeModal);
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    closeModal();
  }
});

/* ΓöÇΓöÇ WORK CARD HOVER SOUND ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */
var audioCtx = null;
function initAudio() {
  if (audioCtx) return;
  try {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
  } catch (e) {}
}
document.addEventListener('touchstart', initAudio, { once: true });
document.addEventListener('click', initAudio, { once: true });
function playHoverSound() {
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    var osc = audioCtx.createOscillator();
    var gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(520, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(380, audioCtx.currentTime + 0.06);
    gain.gain.setValueAtTime(0.035, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);
    osc.start(audioCtx.currentTime);
    osc.stop(audioCtx.currentTime + 0.08);
  } catch (e) {}
}

/* Handle Cursor Text for Projects and Modal Opening */
const workCards = document.querySelectorAll('.work-card');
workCards.forEach(card => {
  if (hasMouse) {
    card.addEventListener('mouseenter', () => {
      playHoverSound();
      gsap.to(cursorText, { opacity: 1, scale: 1, duration: 0.3 });
      gsap.to(cursor, { 
        width: 100, 
        height: 100, 
        backgroundColor: '#C9A84C', // Gold
        mixBlendMode: 'normal',
        duration: 0.3 
      });
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(cursorText, { opacity: 0, scale: 0.5, duration: 0.3 });
      gsap.to(cursor, { 
        width: 10, 
        height: 10, 
        backgroundColor: 'var(--gold)',
        mixBlendMode: 'difference',
        duration: 0.3 
      });
    });
  }

  card.addEventListener('click', (e) => {
    // Always prevent default navigation first
    e.preventDefault();
    e.stopPropagation();

    // Allow the "Visit Project" link to open in new tab
    if (e.target.closest('.work-visit')) {
      const href = card.getAttribute('href');
      if (href && href !== '#') window.open(href, '_blank', 'noopener,noreferrer');
      return;
    }

    const titleEl = card.querySelector('.work-title');
    const title = titleEl?.innerText?.replace(/\n/g, ' ').trim() || '';
    if (projectData[title]) {
      openModal(title);
    } else {
      // For cards with no modal data (e.g. GitHub card), open the href
      const href = card.getAttribute('href');
      if (href && href !== '#') window.open(href, '_blank', 'noopener,noreferrer');
    }
  });
});

/* ΓöÇΓöÇ TYPED JS ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */
let typedInstance = null;
function initTyped(lang) {
  if (typedInstance) typedInstance.destroy();
  
  const strings = (window.typedTranslations && window.typedTranslations[lang]) ? window.typedTranslations[lang] : [
    'Software Engineering Student',
    'Full-Stack Developer',
    'Open to Internship Opportunities'
  ];

  if (typeof Typed !== 'undefined') {
    typedInstance = new Typed('#typed', {
      strings: strings,
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      loop: true,
      showCursor: true,
      cursorChar: '|'
    });
  }
}

const currentLang = localStorage.getItem('portfolioLang') || 'en';
initTyped(currentLang);

document.addEventListener('langChanged', (e) => {
  initTyped(e.detail);
});

/* ΓöÇΓöÇ BFCACHE FIX ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */
// When restoring from bfcache, just ensure visibility ΓÇö don't re-trigger
// the entrance animation, which would cause a flash.
window.addEventListener('pageshow', (e) => {
  if (e.persisted) {
    initTyped(currentLang);
    var heroLines = document.querySelectorAll('.hero-headline .line-inner');
    gsap.killTweensOf(heroLines);
    heroLines.forEach(function(el) {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    var h = document.querySelector('.hero-headline');
    if (h) h.style.opacity = '1';
    if (window.gsap && window.ScrollTrigger) {
      ScrollTrigger.refresh();
    }
  }
});

/* ΓöÇΓöÇ NAV SCROLL ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */
const nav = document.getElementById('nav');

function handleNavScroll(e) {
  if (!nav) return;
  const scrollY = lenis ? e.scroll : window.scrollY;
  nav.classList.toggle('scrolled', scrollY > 60);
}
if (lenis) {
  lenis.on('scroll', handleNavScroll);
} else {
  window.addEventListener('scroll', handleNavScroll, { passive: true });
}

/* ΓöÇΓöÇ MAGNETIC BUTTONS ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */
const magneticEls = document.querySelectorAll('.nav-logo, .nav-links a, .nav-cta, .btn-primary, .btn-secondary, .filter-btn, .about-cta');

if (!isTouchDevice) {
  magneticEls.forEach(el => {
    let cachedRect;

    el.addEventListener('mouseenter', () => {
      gsap.killTweensOf(el);
      el.style.transform = "none";
      cachedRect = el.getBoundingClientRect();
    });

    el.addEventListener('mousemove', e => {
      if (!cachedRect) return;
      const mx = e.clientX - cachedRect.left - cachedRect.width / 2;
      const my = e.clientY - cachedRect.top - cachedRect.height / 2;

      if (!el._magRAF) {
        el._magRAF = true;
        requestAnimationFrame(() => {
          el._magRAF = false;
          gsap.to(el, {
            x: mx * 0.35,
            y: my * 0.35,
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto"
          });
          gsap.to(ring, {
            scale: 1.5,
            duration: 0.3
          });
        });
      }
    });

    el.addEventListener('mouseleave', () => {
      cachedRect = null;
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
        overwrite: "auto"
      });
      
      gsap.to(ring, {
        scale: 1,
        duration: 0.3
      });
    });
  });
}

/* ΓöÇΓöÇ MARQUEE DUPLICATION ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */
document.querySelectorAll('.marquee-track').forEach(function(track) {
  if (!track.dataset.duplicated) {
    track.innerHTML += track.innerHTML;
    track.dataset.duplicated = 'true';
  }
});

/* ΓöÇΓöÇ REVEAL ON SCROLL ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */
const reveals = document.querySelectorAll('.reveal');

if (window.gsap && window.ScrollTrigger) {
  // On very low-end devices, skip GSAP reveals entirely
  if (isLowEnd) {
    reveals.forEach(el => { el.style.opacity = '1'; el.style.transform = 'none'; });
  } else {
  const revealConfig = isTouchDevice ? { y: 20, duration: 0.5 } : { y: 40, duration: 1.2 };

  reveals.forEach(el => {
    // Skip elements handled by pinned section reveal or word-by-word reveal
    if (el.closest('#services')) return;
    if (el.classList.contains('section-title')) return;

    let delay = 0;
    if (el.classList.contains('reveal-delay-1')) delay = 0.1;
    else if (el.classList.contains('reveal-delay-2')) delay = 0.15;
    else if (el.classList.contains('reveal-delay-3')) delay = 0.2;
    else if (el.classList.contains('reveal-delay-4')) delay = 0.25;
    else if (el.classList.contains('reveal-delay-5')) delay = 0.3;

    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: isTouchDevice ? "top 95%" : "top 90%",
        once: true,
        toggleActions: "play none none none"
      },
      y: revealConfig.y,
      opacity: 0,
      duration: revealConfig.duration,
      delay: isTouchDevice ? 0 : delay,
      ease: "power2.out"
    });
  });
  } // end else (low-end fallback)
}

/* ─── PINNED SECTION REVEAL ──────────────────────────────────────────────── */
if (window.gsap && window.ScrollTrigger && !isTouchDevice && !isLowEnd) {
  var pinnedSec = document.getElementById('services');
  if (pinnedSec) {
    var pinnedEls = pinnedSec.querySelectorAll('.section-label, .section-title, .service-card');
    pinnedEls.forEach(function(el) {
      gsap.killTweensOf(el);
      el.style.opacity = '';
      el.style.transform = '';
    });
    var pinnedTl = gsap.timeline({
      scrollTrigger: {
        trigger: '#services',
        start: 'top top',
        end: '+=2500',
        pin: true,
        anticipatePin: 1,
        toggleActions: 'play none none reset'
      }
    });
    pinnedTl.from(pinnedSec.querySelector('.section-label'), { y: 30, opacity: 0, duration: 0.4 }, 0);
    pinnedTl.from(pinnedSec.querySelector('.section-title'), { y: 40, opacity: 0, duration: 0.5 }, 0.3);
    pinnedTl.from(pinnedSec.querySelectorAll('.service-card'), { y: 60, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' }, 0.7);
  }
}

/* ─── SCROLL ANIMATIONS ──────────────────────────────────────────────────── */
// Hero Section Parallax (disabled on mobile to prevent title overlap)
// Subtle y movement only — headline stays fully visible (avoids "disappears on scroll" issue)
if (window.innerWidth > 768) {
  gsap.to(".hero-headline", {
    scrollTrigger: {
      trigger: "#hero",
      start: "top top",
      end: "bottom top",
      scrub: true
    },
    y: -80
  });
}

// Hero headline entrance animation (GSAP ΓÇö not CSS, avoids race conditions)
if (!isLowEnd) {
  gsap.set(".hero-headline .line-inner", { y: "110%", opacity: 0 });
  var heroTl = gsap.timeline();
  heroTl.to(".hero-headline", { opacity: 1, duration: 0.01 }, 0);
  heroTl.to(".hero-headline .line-inner", {
    y: "0%",
    opacity: 1,
    duration: 0.9,
    stagger: 0.15,
    ease: "power3.out"
  }, 0.35);
}

// Section Title Animation removed as it conflicts with .reveal
// document.querySelectorAll('.section-title').forEach(title => { ... });

/* ΓöÇΓöÇ WORK FILTER ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */
const filterBtns = document.querySelectorAll('.filter-btn');
const workGrid = document.querySelector('.work-grid');
let isFiltering = false;

if (filterBtns.length && workGrid) {
  // Restore filter from URL hash on load
  var hashFilter = location.hash.indexOf('#filter=') === 0 ? location.hash.replace('#filter=', '') : '';
  if (hashFilter) {
    var targetBtn = Array.from(filterBtns).find(function(b){ return b.dataset.filter === hashFilter; });
    if (targetBtn) {
      filterBtns.forEach(function(b){ b.classList.remove('active'); });
      targetBtn.classList.add('active');
    }
  }

  function applyFilter(filter) {
    if (isFiltering) return;

    var activeBtn = Array.from(filterBtns).find(function(b){ return b.dataset.filter === filter; });
    if (!activeBtn) return;
    filterBtns.forEach(function(b){ b.classList.remove('active'); });
    activeBtn.classList.add('active');

    var isAll  = filter === 'all';
    var cards  = Array.from(workGrid.querySelectorAll('.work-card'));

    isFiltering = true;
    gsap.killTweensOf(cards);

    // Reset potential display:none from old code path
    cards.forEach(function(c){ c.style.display = ''; });

    gsap.to(cards, {
      opacity: 0, y: 10, duration: 0.18, ease: 'power2.in',
      onComplete: function() {
        if (isAll) {
          workGrid.classList.remove('filtered');
          cards.forEach(function(c){
            c.classList.remove('blurred', 'filtered-visible');
            c.style.pointerEvents = '';
          });
            gsap.fromTo(cards,
              { opacity: 0, y: 10, filter: 'blur(4px) grayscale(40%)' },
              { opacity: 1, y: 0, filter: 'blur(0px) grayscale(0%)', duration: 0.35, stagger: 0.04, ease: 'power2.out', onComplete: function(){
                isFiltering = false;
                if (window.ScrollTrigger) ScrollTrigger.refresh();
              } }
            );
          return;
        }

        var matched   = cards.filter(function(c){ return (c.dataset.category || '').split(' ').includes(filter); });
        var unmatched = cards.filter(function(c){ return !matched.includes(c); });

        workGrid.classList.add('filtered');

        // Reorder DOM: matched cards first, unmatched after
        var ordered = matched.concat(unmatched);
        ordered.forEach(function(c) { workGrid.appendChild(c); });

        matched.forEach(function(c){
          c.classList.remove('blurred');
          c.classList.add('filtered-visible');
          c.style.pointerEvents = 'auto';
        });
        unmatched.forEach(function(c){
          c.classList.add('blurred');
          c.classList.remove('filtered-visible');
          c.style.pointerEvents = 'none';
        });

        gsap.fromTo(ordered,
          { opacity: 0, y: 10, filter: 'blur(4px) grayscale(40%)' },
          {
            opacity: function(i){ return i < matched.length ? 1 : 0.45; },
            filter: function(i){ return i < matched.length ? 'blur(0px) grayscale(0%)' : 'blur(4px) grayscale(40%)'; },
            y: 0,
            duration: 0.35,
            stagger: 0.04,
            ease: 'power2.out',
            onComplete: function(){
                isFiltering = false;
                ordered.forEach(function(c){
                  c.querySelectorAll('img[loading="lazy"]').forEach(function(img){
                    if (!img.complete) { img.loading = 'eager'; }
                  });
                });
                if (window.ScrollTrigger) ScrollTrigger.refresh();
              }
          }
        );
      }
    });
  }

  // Apply saved hash filter
  if (hashFilter) { applyFilter(hashFilter); }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      if (isFiltering) return;
      var filter = this.dataset.filter;
      history.replaceState(null, '', filter === 'all' ? '#' : '#filter=' + filter);
      applyFilter(filter);
    });
  });
} // end if filterBtns.length

/* ΓöÇΓöÇ TESTIMONIALS CAROUSEL ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */
(function initTestimonials() {
  var track = document.querySelector('.testimonials-track');
  var dots = document.querySelectorAll('.t-dot');
  if (!track || !dots.length) return;
  var current = 0;
  var interval;
  function goTo(index) {
    current = index;
    dots.forEach(function(d){ d.classList.remove('active'); });
    dots[current].classList.add('active');
    track.scrollTo({ left: track.clientWidth * current, behavior: 'smooth' });
  }
  dots.forEach(function(dot){
    dot.addEventListener('click', function(){
      clearInterval(interval);
      goTo(parseInt(this.dataset.index));
      interval = setInterval(function(){ goTo((current + 1) % dots.length); }, 5000);
    });
  });
  interval = setInterval(function(){ goTo((current + 1) % dots.length); }, 5000);
  // Pause on hover
  track.addEventListener('mouseenter', function(){ clearInterval(interval); });
  track.addEventListener('mouseleave', function(){ interval = setInterval(function(){ goTo((current + 1) % dots.length); }, 5000); });
  // Handle manual scroll
  track.addEventListener('scroll', function(){
    var idx = Math.round(track.scrollLeft / track.clientWidth);
    if (idx !== current && idx >= 0 && idx < dots.length) {
      current = idx;
      dots.forEach(function(d){ d.classList.remove('active'); });
      dots[current].classList.add('active');
    }
  });
})();

/* ΓöÇΓöÇ GITHUB PINNED REPOS ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */
(function fetchGitHub() {
  var exploreCard = document.querySelector('.work-card:last-child');
  if (!exploreCard) return;
  var overlay = exploreCard.querySelector('.work-overlay');
  if (!overlay) return;
  fetch('https://api.github.com/users/Abdnour0/repos?sort=updated&per_page=3')
    .then(function(r){ return r.ok ? r.json() : null; })
    .then(function(repos){
      if (!repos || !repos.length) return;
      var tag = overlay.querySelector('.work-tag');
      if (tag) tag.textContent = 'Latest: ' + repos[0].name.replace(/-/g, ' ');
      var title = overlay.querySelector('.work-title');
      if (title) {
        var repo = repos[0];
        title.innerHTML = repo.name.replace(/-/g, ' ') + '<br><span style="font-size:0.6rem;opacity:0.6;">' + (repo.description || '').substring(0, 40) + '...</span>';
      }
      exploreCard.href = repos[0].html_url;
    })
    .catch(function(){});
})();

/* ΓöÇΓöÇ COUNTER ANIMATION ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */
const statTargets  = [5, 3, 2, 2022];
const statsSection = document.querySelector('.about-stats');

function animateCount(el, target) {
  let start = null;
  const duration = 1800;

  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

if (statsSection) {
  const countEls = statsSection.querySelectorAll('.count-val');

  const countObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        countEls.forEach((el, i) => animateCount(el, statTargets[i]));
        countObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  countObserver.observe(statsSection);
}

/* ΓöÇΓöÇ MOBILE NAV ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */
const menuToggle = document.getElementById('menu-toggle');
const mobileNav = document.getElementById('mobile-nav');
const mobileLinks = document.querySelectorAll('.mobile-links a');
let isMenuOpen = false;

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    menuToggle.classList.toggle('active');
    
    if (isMenuOpen) {
      if (HAS_GSAP) {
        gsap.set(mobileNav, { display: 'block', y: '100%', opacity: 0 });
        gsap.to(mobileNav, { y: '0%', opacity: 1, duration: 0.5, ease: 'power3.out' });
        gsap.from('.mobile-links li', {
          y: 60, opacity: 0, stagger: 0.07, duration: 0.4, delay: 0.15, ease: 'power2.out'
        });
      } else {
        mobileNav.style.display = 'block';
        mobileNav.style.transform = 'translateY(0%)';
        mobileNav.style.opacity = '1';
      }
      if (lenis) lenis.stop();
      document.body.style.overflow = 'hidden';
    } else {
      if (HAS_GSAP) {
        gsap.to(mobileNav, {
          y: '100%', opacity: 0, duration: 0.4, ease: 'power3.in',
          onComplete: function() { gsap.set(mobileNav, { display: 'none', y: '0%' }); }
        });
      } else {
        mobileNav.style.transform = 'translateY(100%)';
        mobileNav.style.opacity = '0';
        mobileNav.style.display = 'none';
      }
      if (lenis) lenis.start();
      document.body.style.overflow = '';
    }
  });
}

// Close menu when clicking a link
mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    isMenuOpen = false;
    menuToggle.classList.remove('active');
    if (HAS_GSAP) {
      gsap.to(mobileNav, {
        y: '100%', opacity: 0, duration: 0.35, ease: 'power3.in',
        onComplete: function() { gsap.set(mobileNav, { display: 'none', y: '0%' }); }
      });
    } else {
      mobileNav.style.transform = 'translateY(100%)';
      mobileNav.style.opacity = '0';
      mobileNav.style.display = 'none';
    }
    if (lenis) lenis.start();
    document.body.style.overflow = '';
  });
});

/* ΓöÇΓöÇ LIVE STATUS TIME ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */
function updateLiveTime() {
  const timeEl = document.getElementById('current-time');
  const statusDot = document.querySelector('.status-dot');
  const statusLabel = document.querySelector('.status-label');
  const statusSep = document.querySelector('.status-sep');

  if (timeEl) {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'Africa/Casablanca'
    });
    const timeStr = formatter.format(now);

    // Get local hour in Morocco timezone
    const parts = new Intl.DateTimeFormat('en-GB', {
      hour: 'numeric',
      hour12: false,
      timeZone: 'Africa/Casablanca'
    }).formatToParts(now);
    const hour = parseInt(parts.find(p => p.type === 'hour').value, 10);
    const isAvailable = hour >= 9 && hour < 23; // 9 AM to 10:59 PM
    
    // Retrieve correct translation based on current lang
    const activeLang = localStorage.getItem('portfolioLang') || 'en';
    const langObj = (typeof translations !== 'undefined') ? translations[activeLang] : null;
    let availText = 'Available';
    let unavailText = 'Unavailable';
    if (langObj) {
      if (activeLang === 'fr') { availText = 'Disponible'; unavailText = 'Indisponible'; }
      if (activeLang === 'ar') { availText = '┘à╪¬╪º╪¡'; unavailText = '╪║┘è╪▒ ┘à╪¬╪º╪¡'; }
    }

    if (isAvailable) {
      timeEl.textContent = timeStr;
      if (statusLabel) statusLabel.textContent = availText;
      if (statusDot) {
        statusDot.style.background = '#00FF00';
        statusDot.style.boxShadow = '0 0 10px #00FF00';
      }
      if (statusSep) statusSep.style.display = '';
    } else {
      timeEl.textContent = '';
      if (statusLabel) statusLabel.textContent = unavailText;
      if (statusDot) {
        statusDot.style.background = '#E03535';
        statusDot.style.boxShadow = '0 0 10px #E03535';
      }
      if (statusSep) statusSep.style.display = 'none';
    }
  }
}
var liveInterval = setInterval(updateLiveTime, 1000);
updateLiveTime();
document.addEventListener('visibilitychange', function() {
  if (document.hidden) { clearInterval(liveInterval); }
  else { liveInterval = setInterval(updateLiveTime, 1000); }
});

/* ΓöÇΓöÇ CONTACT FORM HANDLER ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */
const contactForm = document.getElementById('contact-form');
const formFeedback = document.getElementById('form-feedback');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    formFeedback.className = '';
    formFeedback.textContent = '';

    var lang = localStorage.getItem('portfolioLang') || 'en';
    var ft = (window.translations && window.translations[lang]) || window.translations.en;

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.disabled = true;
    submitBtn.innerHTML = ft.formSending || 'Sending...';

    const formData = new FormData(contactForm);

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      const data = await response.json();

      if (response.ok) {
        formFeedback.className = 'success';
        formFeedback.textContent = ft.formSuccess || 'Message sent successfully!';
        contactForm.reset();
      } else {
        formFeedback.className = 'error';
        formFeedback.textContent = ft.formError || 'Something went wrong.';
      }
    } catch (error) {
      formFeedback.className = 'error';
      formFeedback.textContent = ft.formNetworkError || 'Network error.';
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  });
}

/* ΓöÇΓöÇ BACK TO TOP ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */
const backToTop = document.getElementById('back-to-top');

if (backToTop) {
  function handleBackToTopScroll(e) {
    const scrollY = lenis ? e.scroll : window.scrollY;
    backToTop.classList.toggle('visible', scrollY > 500);
  }
  if (lenis) {
    lenis.on('scroll', handleBackToTopScroll);
  } else {
    window.addEventListener('scroll', handleBackToTopScroll, { passive: true });
  }

  backToTop.addEventListener('click', () => {
    if (lenis) {
      lenis.scrollTo(0, {
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
}

/* ΓöÇΓöÇ SMOOTH NAV ANCHOR CLICKS ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  if (link.closest('.work-card')) return;
  if (link.classList.contains('skip-link')) return; // let skip link use native behavior

  link.addEventListener('click', e => {
    e.preventDefault();
    const targetSelector = link.getAttribute('href');
    if (targetSelector && targetSelector !== '#') {
      const targetEl = document.querySelector(targetSelector);
      if (targetEl) {
        if (lenis) {
          lenis.scrollTo(targetEl, {
            offset: 0,
            duration: 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
          });
        } else {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  });
});

/* ΓöÇΓöÇ CV DROPDOWN ΓÇö MOBILE TAP SUPPORT ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */
const cvDropdown = document.querySelector('.cv-dropdown');
const cvMenu = document.querySelector('.cv-menu');
if (cvDropdown && cvMenu && isTouchDevice) {
  const cvBtn = cvDropdown.querySelector('button');
  if (cvBtn) {
    cvBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = cvMenu.classList.toggle('mobile-open');
    });
  }
  // Close when tapping outside
  document.addEventListener('click', (e) => {
    if (!cvDropdown.contains(e.target)) {
      cvMenu.classList.remove('mobile-open');
    }
  });
}

/* ΓöÇΓöÇ WORD-BY-WORD TEXT REVEAL ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */
(function initWordReveal() {
  if (isLowEnd) return; // skip on low-end devices
  // Only plain-text headings ΓÇö avoids stripping <em> / &amp; in others
  const targets = document.querySelectorAll('.section-title');

  targets.forEach(el => {
    // Skip already-processed or dynamically-filled elements (modal title)
    if (el.dataset.wordReveal || el.id === 'modal-title') return;
    el.dataset.wordReveal = '1';

    // innerHTML may contain <br> ΓÇö split on those first to preserve line breaks
    const rawHTML = el.innerHTML;
    const lines   = rawHTML.split(/<br\s*\/?>/gi);

    const wrappedLines = lines.map(line => {
      // Each line is plain text (or HTML entities like &amp;) ΓÇö no inner tags
      const words = line.trim().split(/\s+/);
      return words
        .filter(w => w.length > 0)
        .map(w => `<span class="word-wrap"><span class="word">${w}</span></span>`)
        .join(' ');
    });

    el.innerHTML = wrappedLines.join('<br>');

    // Collect all .word spans inside this element
    const wordSpans = el.querySelectorAll('.word');

    const isMobile = window.innerWidth <= 768;
    gsap.fromTo(wordSpans,
      { y: isMobile ? '50%' : '110%', opacity: 0 },
      {
        y: '0%',
        opacity: 1,
        duration: isMobile ? 0.35 : 0.75,
        ease: 'power3.out',
        stagger: isMobile ? 0.03 : 0.07,
        scrollTrigger: {
          trigger: el,
          start: isMobile ? 'top 92%' : 'top 88%',
          once: true,
          toggleActions: 'play none none none'
        }
      }
    );
  });
})();

/* ΓöÇΓöÇ TIMELINE VERTICAL LINE FILL ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */
(function initTimelineFill() {
  const lineFill = document.querySelector('.timeline-line-fill');
  const timelineSection = document.getElementById('timeline');

  if (!lineFill || !timelineSection) return;

  // On low-end, just show the fill immediately
  if (!isLowEnd) {
    gsap.to(lineFill, {
      height: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: timelineSection,
        start: 'top 70%',
        end: 'bottom 60%',
        scrub: 1
      }
    });
  } else {
    lineFill.style.height = '100%';
  }

  // Stagger-animate each timeline card sliding in from its side
  const timelineItems = document.querySelectorAll('.timeline-item');
  timelineItems.forEach((item, i) => {
    const isMobile = window.innerWidth <= 768;
    const side = isMobile ? 0 : (item.dataset.side === 'right' ? 60 : -60);
    const card = item.querySelector('.timeline-card');
    if (!card) return;

    if (isLowEnd) {
      card.style.opacity = '1';
      card.style.transform = 'none';
      return;
    }

    gsap.fromTo(card,
      { x: side, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: isMobile ? 0.4 : 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: isMobile ? 'top 92%' : 'top 85%',
          once: true,
          toggleActions: 'play none none none'
        }
      }
    );
  });
})();

/* ΓöÇΓöÇ THEME TOGGLE ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */
const themeToggleBtn = document.getElementById('theme-toggle');
const sunIcon = document.querySelector('.sun-icon');
const moonIcon = document.querySelector('.moon-icon');

const savedTheme = localStorage.getItem('portfolioTheme_v2');
if (savedTheme === 'light') {
  document.documentElement.setAttribute('data-theme', 'light');
  if (sunIcon && moonIcon) {
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
  }
} else {
  // Default to dark mode (original design)
  document.documentElement.removeAttribute('data-theme');
  if (sunIcon && moonIcon) {
    sunIcon.style.display = 'block';
    moonIcon.style.display = 'none';
  }
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    document.body.classList.add('theme-transition');
    
    const currentTheme = document.documentElement.getAttribute('data-theme');
    
    if (currentTheme === 'light') {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('portfolioTheme_v2', 'dark');
      sunIcon.style.display = 'block';
      moonIcon.style.display = 'none';
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('portfolioTheme_v2', 'light');
      sunIcon.style.display = 'none';
      moonIcon.style.display = 'block';
    }
    
    setTimeout(() => {
      document.body.classList.remove('theme-transition');
    }, 400);
  });
}

/* ΓöÇΓöÇ IMAGE LOADING BLUR-UP ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */
document.querySelectorAll('.about-img-wrap').forEach(wrap => {
  const img = wrap.querySelector('img');
  if (img) {
    wrap.classList.add('loading');
    if (img.complete) {
      wrap.classList.remove('loading');
      wrap.classList.add('loaded');
    } else {
      img.addEventListener('load', () => {
        wrap.classList.remove('loading');
        wrap.classList.add('loaded');
      });
    }
  }
});

/* ΓöÇΓöÇ NAV ACTIVE SECTION TRACKING ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */
(function initActiveNav() {
  const navLinks = document.querySelectorAll('.nav-links a');
  if (!navLinks.length) return;

  const sections = [];
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      const section = document.querySelector(href);
      if (section) sections.push({ link, section });
    }
  });

  if (!sections.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const active = sections.find(s => s.section === entry.target);
        if (active) {
          sections.forEach(s => s.link.classList.remove('nav-active'));
          active.link.classList.add('nav-active');
        }
      }
    });
  }, { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' });

  sections.forEach(s => observer.observe(s.section));
})();

/* ΓöÇΓöÇ SKILL PROGRESS RINGS ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */
document.querySelectorAll('.ring-fill').forEach(function(ring) {
  var wrapper = ring.closest('.service-proficiency');
  if (!wrapper) return;
  var progress = parseInt(wrapper.getAttribute('data-progress'), 10) || 0;
  var r = parseFloat(ring.getAttribute('r')) || 15;
  var circumference = 2 * Math.PI * r;
  var target = circumference - (circumference * progress / 100);

if (window.ScrollTrigger) {
    gsap.to(ring, {
      strokeDashoffset: target,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: ring.closest('.service-card'),
        start: 'top 92%',
        once: true,
        toggleActions: 'play none none none'
      }
    });
  } else {
    ring.setAttribute('stroke-dashoffset', target);
  }
});

/* ΓöÇΓöÇ REFRESH SCROLLTRIGGER AFTER SETUP ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */
if (window.ScrollTrigger) {
  ScrollTrigger.refresh();
}

/* ΓöÇΓöÇ HERO HEADLINE SAFETY NET ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */
var heroSafetyTimer = setTimeout(function() {
  var h = document.querySelector('.hero-headline');
  if (h) h.style.opacity = '1';
  document.querySelectorAll('.hero-headline .line-inner').forEach(function(el) {
    el.style.opacity = '1';
    el.style.transform = 'none';
  });
}, 2000);
