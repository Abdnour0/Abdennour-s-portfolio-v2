/* ── GSAP SETUP ──────────────────────────────────────────────────────── */
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

/* ── PERFORMANCE DETECTION ───────────────────────────────────────────── */
var isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
// Only check for fine pointer (mouse) — touch-capable laptops should not be treated as touch-only
var hasMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
var isLowEnd = (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) || !window.requestIdleCallback;

/* ── LENIS SMOOTH SCROLL (disabled on touch / low-end for perf) ────── */
let lenis = null;
if (hasMouse && !isLowEnd && !isTouchDevice) {
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

  if (window.ScrollTrigger) {
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function(time) {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  } else {
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }
}

/* ── SCROLL PROGRESS ─────────────────────────────────────────────────── */
const scrollProgress = document.getElementById('scroll-progress');
function updateScrollProgress(e) {
  var scrollY = lenis ? e.scroll : window.scrollY;
  var progress = scrollY / (document.documentElement.scrollHeight - window.innerHeight);
  if (HAS_GSAP) {
    gsap.to(scrollProgress, { width: progress * 100 + '%', duration: 0.1, ease: 'none' });
  } else {
    scrollProgress.style.width = progress * 100 + '%';
  }
}
if (lenis) {
  lenis.on('scroll', updateScrollProgress);
} else {
  window.addEventListener('scroll', updateScrollProgress, { passive: true });
}

/* ── CURSOR (mouse only) ─────────────────────────────────────────────── */
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursor-ring');
const cursorText = document.getElementById('cursor-text');
const cursorGlow = document.getElementById('cursor-glow');

if (hasMouse && cursor) {
var mx = 0, my = 0;

if (HAS_GSAP) {
  gsap.set([cursor, ring, cursorText, cursorGlow], { xPercent: -50, yPercent: -50 });
}

document.addEventListener('mousemove', function(e) {
  mx = e.clientX;
  my = e.clientY;

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
} // end cursor (desktop only)

/* ── CURSOR TRAIL ────────────────────────────────────────────────────── */
if (hasMouse && HAS_GSAP) {
  var trail = [];
  for (var i = 0; i < 12; i++) {
    var dot = document.createElement('div');
    dot.className = 'cursor-trail-dot';
    document.body.appendChild(dot);
    trail.push(dot);
    gsap.set(dot, { opacity: 0 });
  }
  var ti = 0;
  document.addEventListener('mousemove', function(e) {
    var dot = trail[ti % trail.length];
    gsap.set(dot, { x: e.clientX, y: e.clientY, opacity: 0.6, scale: 1 });
    gsap.to(dot, { opacity: 0, scale: 0.2, duration: 0.6, ease: 'power2.out' });
    ti++;
  });
}

/* ── 3D TILT HOVER ON CARDS ──────────────────────────────────────────── */
if (hasMouse && HAS_GSAP) {
  document.querySelectorAll('.service-card, .work-card, .cert-cell').forEach(function(card) {
    card.addEventListener('mousemove', function(e) {
      var rect = card.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width;
      var y = (e.clientY - rect.top) / rect.height;
      gsap.to(card, {
        rotateX: (y - 0.5) * -12,
        rotateY: (x - 0.5) * 12,
        transformPerspective: 800,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    card.addEventListener('mouseleave', function() {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.4,
        ease: 'power2.out'
      });
    });
  });
}

/* ── ABOUT IMAGE PARALLAX ────────────────────────────────────────────── */
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

/* ── PROJECT MODALS ─────────────────────────────────────────────────── */
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
    challenge: "Building a fully dynamic shopping experience — product filtering, cart state, and quantity management — without any framework or backend, keeping the bundle size minimal.",
    solution: "Architected the app using ES Modules for clean separation of concerns, managed cart state entirely in LocalStorage for persistence, and used event delegation to handle dynamic DOM interactions efficiently.",
    role: "Frontend Developer",
    img: "images/photo.jpg",
    gradient: "linear-gradient(135deg, #1a0a00 0%, #3d1a00 40%, #c9784c 100%)",
    link: "https://ecommerce-frontend-v2-beryl.vercel.app/",
    tag: "Vite · Vanilla JS · 2025"
  },
  "Mini E-Learning Platform": {
    desc: "An intuitive digital classroom environment developed with Laravel and Vue.js. This platform allows educators to upload course materials while students can track their progress through interactive modules.",
    tech: "Laravel, Vue.js, MySQL, Tailwind CSS, Vite",
    challenge: "Managing complex state transitions for student progress across multiple modules and ensuring data persistence during session timeouts.",
    solution: "Utilized Vuex for centralized state management and implemented a background sync service to periodically save student progress without interrupting the user experience.",
    role: "Full-Stack Developer",
    img: null,
    gradient: "linear-gradient(135deg, #00101a 0%, #003d5c 40%, #4cc9c5 100%)",
    link: "https://github.com/Abdnour0",
    tag: "Laravel · Vue.js · 2024"
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
    tag: "C · Data Structures · 2023"
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
    tag: "Django · Vue.js · 2025"
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
    tag: "Java · OOP · 2024"
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
    document.getElementById('modal-role').textContent = data.role || "Full-Stack Developer";
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
      if (navigator.share) {
        navigator.share({ title: data.title || title, text: data.desc, url: data.link }).catch(function(){});
      } else {
        navigator.clipboard.writeText(data.link).then(function() {
          shareBtn.textContent = 'Copied!';
          setTimeout(function(){ shareBtn.textContent = 'Share \u2197'; }, 2000);
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

/* Handle Cursor Text for Projects and Modal Opening */
const workCards = document.querySelectorAll('.work-card');
workCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
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

/* ── TYPED JS ────────────────────────────────────────────────────────── */
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

/* ── BFCACHE FIX ──────────────────────────────────────────────────────── */
window.addEventListener('pageshow', (e) => {
  if (e.persisted) {
    initTyped(currentLang);
    var headline = document.querySelector('.hero-headline');
    if (headline) {
      gsap.killTweensOf(headline);
      headline.style.opacity = '';
      headline.style.transform = '';
    }
    var heroLines = document.querySelectorAll('.hero-headline .line-inner');
    gsap.killTweensOf(heroLines);
    heroLines.forEach(function(el) {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    if (window.gsap && window.ScrollTrigger) {
      ScrollTrigger.refresh();
    }
  }
});

/* ── NAV SCROLL ──────────────────────────────────────────────────────── */
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

/* ── MAGNETIC BUTTONS ────────────────────────────────────────────────── */
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
      const x = e.clientX - cachedRect.left - cachedRect.width / 2;
      const y = e.clientY - cachedRect.top - cachedRect.height / 2;

      gsap.to(el, {
        x: x * 0.35,
        y: y * 0.35,
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto"
      });
      
      gsap.to(ring, {
        scale: 1.5,
        duration: 0.3
      });
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

/* ── MARQUEE DUPLICATION ──────────────────────────────────────────────── */
document.querySelectorAll('.marquee-track').forEach(function(track) {
  if (!track.dataset.duplicated) {
    track.innerHTML += track.innerHTML;
    track.dataset.duplicated = 'true';
  }
});

/* ── REVEAL ON SCROLL ────────────────────────────────────────────────── */
const reveals = document.querySelectorAll('.reveal');

if (window.gsap && window.ScrollTrigger) {
  // On very low-end devices, skip GSAP reveals entirely
  if (isLowEnd) {
    reveals.forEach(el => { el.style.opacity = '1'; el.style.transform = 'none'; });
  } else {
  const revealConfig = isTouchDevice ? { y: 20, duration: 0.5 } : { y: 40, duration: 1.2 };

  reveals.forEach(el => {
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
      ease: "power2.out",
      clearProps: "transform,opacity"
    });
  });
  } // end else (low-end fallback)
}

/* ── SCROLL ANIMATIONS ───────────────────────────────────────────────── */
// Hero Section Parallax (disabled on mobile to prevent title overlap)
if (window.innerWidth > 768) {
  gsap.to(".hero-headline", {
    scrollTrigger: {
      trigger: "#hero",
      start: "top top",
      end: "bottom top",
      scrub: true
    },
    y: -50,
    opacity: 0
  });
}

// Hero headline entrance animation (GSAP — not CSS, avoids race conditions)
if (!isLowEnd) {
  gsap.set(".hero-headline .line-inner", { y: "110%", opacity: 0 });
  var heroTl = gsap.timeline();
  heroTl.to(".hero-headline .line-inner", {
    y: "0%",
    opacity: 1,
    duration: 0.9,
    stagger: 0.15,
    ease: "power3.out",
    clearProps: "transform,opacity"
  }, 0.35);
}

// Section Title Animation removed as it conflicts with .reveal
// document.querySelectorAll('.section-title').forEach(title => { ... });

/* ── WORK FILTER ─────────────────────────────────────────────────────── */
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

    // Update active button
    var activeBtn = Array.from(filterBtns).find(function(b){ return b.dataset.filter === filter; });
    if (!activeBtn) return;
    filterBtns.forEach(function(b){ b.classList.remove('active'); });
    activeBtn.classList.add('active');

    var isAll  = filter === 'all';
    var cards  = Array.from(workGrid.querySelectorAll('.work-card'));

    var matched   = cards.filter(function(c){ return isAll || (c.dataset.category || '').split(' ').includes(filter); });
    var unmatched = cards.filter(function(c){ return !matched.includes(c); });

    isFiltering = true;
    gsap.killTweensOf(cards);

    gsap.to(cards, {
      opacity: 0,
      y: 16,
      duration: 0.22,
      ease: 'power2.in',
      onComplete: function() {
        workGrid.classList.toggle('filtered', !isAll);
        matched.forEach(function(c){
          c.style.display = '';
          c.style.pointerEvents = 'auto';
          c.classList.toggle('filtered-visible', !isAll);
        });
        unmatched.forEach(function(c){
          c.style.display = 'none';
          c.style.pointerEvents = 'none';
          c.classList.remove('filtered-visible');
        });
        gsap.fromTo(matched,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: 'power2.out', onComplete: function(){ isFiltering = false; } }
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

/* ── SECTION PROGRESS NAV ────────────────────────────────────────────── */
/* ── TESTIMONIALS CAROUSEL ───────────────────────────────────────────── */
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

/* ── GITHUB PINNED REPOS ─────────────────────────────────────────────── */
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

/* ── COUNTER ANIMATION ───────────────────────────────────────────────── */
const statTargets  = [5, 3, 2, 2028];
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

/* ── MOBILE NAV ──────────────────────────────────────────────────────── */
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

/* ── LIVE STATUS TIME ────────────────────────────────────────────────── */
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
      if (activeLang === 'ar') { availText = 'متاح'; unavailText = 'غير متاح'; }
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
setInterval(updateLiveTime, 1000);
updateLiveTime();

/* ── CONTACT FORM HANDLER ───────────────────────────────────────────── */
const contactForm = document.getElementById('contact-form');
const formFeedback = document.getElementById('form-feedback');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    formFeedback.className = '';
    formFeedback.textContent = '';

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending...';

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
        formFeedback.textContent = 'Message sent successfully! I\'ll get back to you soon.';
        contactForm.reset();
      } else {
        formFeedback.className = 'error';
        formFeedback.textContent = 'Something went wrong. Please try again or email me directly.';
      }
    } catch (error) {
      formFeedback.className = 'error';
      formFeedback.textContent = 'Network error. Please check your connection or email me directly.';
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  });
}

/* ── BACK TO TOP ─────────────────────────────────────────────────────── */
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

/* ── SMOOTH NAV ANCHOR CLICKS ────────────────────────────────────────── */
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

/* ── CV DROPDOWN — MOBILE TAP SUPPORT ───────────────────────────────── */
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

/* ── WORD-BY-WORD TEXT REVEAL ────────────────────────────────────────── */
(function initWordReveal() {
  if (isLowEnd) return; // skip on low-end devices
  // Only plain-text headings — avoids stripping <em> / &amp; in others
  const targets = document.querySelectorAll('.section-title');

  targets.forEach(el => {
    // Skip already-processed or dynamically-filled elements (modal title)
    if (el.dataset.wordReveal || el.id === 'modal-title') return;
    el.dataset.wordReveal = '1';

    // innerHTML may contain <br> — split on those first to preserve line breaks
    const rawHTML = el.innerHTML;
    const lines   = rawHTML.split(/<br\s*\/?>/gi);

    const wrappedLines = lines.map(line => {
      // Each line is plain text (or HTML entities like &amp;) — no inner tags
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
        },
        clearProps: 'transform,opacity'
      }
    );
  });
})();

/* ── TIMELINE VERTICAL LINE FILL ─────────────────────────────────────── */
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
        },
        clearProps: 'transform,opacity'
      }
    );
  });
})();

/* ── THEME TOGGLE ────────────────────────────────────────────────────── */
const themeToggleBtn = document.getElementById('theme-toggle');
const sunIcon = document.querySelector('.sun-icon');
const moonIcon = document.querySelector('.moon-icon');

const savedTheme = localStorage.getItem('portfolioTheme');
if (savedTheme === 'light') {
  document.documentElement.setAttribute('data-theme', 'light');
  if (sunIcon && moonIcon) {
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
  }
} else if (!savedTheme && window.matchMedia('(prefers-color-scheme: light)').matches) {
  document.documentElement.setAttribute('data-theme', 'light');
  if (sunIcon && moonIcon) {
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
  }
  localStorage.setItem('portfolioTheme', 'light');
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    document.body.classList.add('theme-transition');
    
    const currentTheme = document.documentElement.getAttribute('data-theme');
    
    if (currentTheme === 'light') {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('portfolioTheme', 'dark');
      sunIcon.style.display = 'block';
      moonIcon.style.display = 'none';
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('portfolioTheme', 'light');
      sunIcon.style.display = 'none';
      moonIcon.style.display = 'block';
    }
    
    setTimeout(() => {
      document.body.classList.remove('theme-transition');
    }, 400);
  });
}

/* ── IMAGE LOADING BLUR-UP ──────────────────────────────────────────── */
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

/* ── NAV ACTIVE SECTION TRACKING ────────────────────────────────────── */
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

/* ── SKILL PROGRESS RINGS ─────────────────────────────────────────────── */
document.querySelectorAll('.ring-fill').forEach(function(ring) {
  var wrapper = ring.closest('.service-proficiency');
  if (!wrapper) return;
  var progress = parseInt(wrapper.getAttribute('data-progress'), 10) || 0;
  var circumference = 94.25;
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

/* ── REFRESH SCROLLTRIGGER AFTER SETUP ─────────────────────────────── */
if (window.ScrollTrigger) {
  ScrollTrigger.refresh();
}

/* ── HERO HEADLINE SAFETY NET ────────────────────────────────────────── */
setTimeout(function() {
  var h = document.querySelector('.hero-headline');
  if (h) h.style.opacity = '1';
  document.querySelectorAll('.hero-headline .line-inner').forEach(function(el) {
    el.style.opacity = '1';
    el.style.transform = 'none';
  });
}, 2000);
