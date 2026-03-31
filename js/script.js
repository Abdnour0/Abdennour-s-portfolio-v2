/* ── GSAP SETUP ──────────────────────────────────────────────────────── */
gsap.registerPlugin(ScrollTrigger);

/* ── LOADING SCREEN ─────────────────────────────────────────────────── */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  const loaderLine = document.querySelector('.loader-line');
  
  const tl = gsap.timeline();
  
  tl.to(loaderLine, {
    width: '100%',
    duration: 0.8,
    ease: "power2.inOut"
  })
  .to(loader, {
    yPercent: -100,
    duration: 0.8,
    ease: "power4.inOut"
  }, "+=0.2");
});

/* ── LENIS SMOOTH SCROLL ──────────────────────────────────────────────── */
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  gestureOrientation: 'vertical',
  smoothWheel: true,
  wheelMultiplier: 1,
  smoothTouch: true,
  touchMultiplier: 1.5,
  infinite: false,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

/* ── SCROLL PROGRESS ─────────────────────────────────────────────────── */
const scrollProgress = document.getElementById('scroll-progress');
lenis.on('scroll', (e) => {
  const progress = e.scroll / (document.documentElement.scrollHeight - window.innerHeight);
  gsap.to(scrollProgress, {
    width: `${progress * 100}%`,
    duration: 0.1,
    ease: "none"
  });
});

/* ── CURSOR ──────────────────────────────────────────────────────────── */
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursor-ring');
const cursorText = document.getElementById('cursor-text');
const cursorGlow = document.getElementById('cursor-glow');
let mx = 0, my = 0;

// Set initial center position for GSAP
gsap.set([cursor, ring, cursorText, cursorGlow], { xPercent: -50, yPercent: -50 });

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  
  gsap.to(cursor, {
    x: mx,
    y: my,
    duration: 0.1,
    ease: "power2.out"
  });

  gsap.to(cursorText, {
    x: mx,
    y: my,
    duration: 0.1,
    ease: "power2.out"
  });

  gsap.to(cursorGlow, {
    x: mx,
    y: my,
    duration: 0.6,
    ease: "power2.out"
  });
  
  gsap.to(ring, {
    x: mx,
    y: my,
    duration: 0.3,
    ease: "power2.out"
  });
});

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
    link: "https://github.com/Abdnour0/Mini-E-Learning-Platform",
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
    link: "https://github.com/Abdnour0/Stock-Management-System",
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
    link: "https://github.com/Abdnour0/Hotel-Management-App",
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
    link: "https://github.com/Abdnour0/Student-Management-System",
    tag: "Java · OOP · 2024"
  }
};

const modal = document.getElementById('project-modal');
const modalClose = document.querySelector('.modal-close');
const modalOverlay = document.querySelector('.modal-overlay');

function openModal(title) {
  const data = projectData[title];
  if (!data) return;

  const modalImg = document.getElementById('modal-img');
  const modalImgWrap = document.querySelector('.modal-img-wrap');

  document.getElementById('modal-title').textContent = title;
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
  modal.classList.remove('active');
  document.documentElement.classList.remove('modal-open');
  document.body.classList.remove('modal-open');
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

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

    const title = card.querySelector('.work-title').innerText.replace(/\n/g, ' ').trim();
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
const typed = new Typed('#typed', {
  strings: [
    'Software Engineering Student',
    'Full-Stack Developer',
    'Open to Internship Opportunities'
  ],
  typeSpeed: 50,
  backSpeed: 30,
  backDelay: 2000,
  loop: true,
  showCursor: true,
  cursorChar: '|'
});

/* ── NAV SCROLL ──────────────────────────────────────────────────────── */
const nav = document.getElementById('nav');

lenis.on('scroll', (e) => {
  nav.classList.toggle('scrolled', e.scroll > 60);
});

/* ── MAGNETIC BUTTONS ────────────────────────────────────────────────── */
const magneticEls = document.querySelectorAll('.nav-logo, .nav-links a, .nav-cta, .btn-primary, .btn-secondary, .filter-btn, .about-cta');

magneticEls.forEach(el => {
  el.addEventListener('mousemove', e => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(el, {
      x: x * 0.35,
      y: y * 0.35,
      duration: 0.4,
      ease: "power2.out"
    });
    
    // Also move the ring to the element
    gsap.to(ring, {
      scale: 1.5,
      duration: 0.3
    });
  });

  el.addEventListener('mouseleave', () => {
    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)"
    });
    
    gsap.to(ring, {
      scale: 1,
      duration: 0.3
    });
  });
});

/* ── MARQUEE ANIMATION ───────────────────────────────────────────────── */
const marqueeTrack = document.querySelector('.marquee-track');
if (marqueeTrack) {
  // Duplicate for seamless loop only once (CSS keyframes drive the animation)
  if (!marqueeTrack.dataset.duplicated) {
    marqueeTrack.innerHTML += marqueeTrack.innerHTML;
    marqueeTrack.dataset.duplicated = 'true';
  }
}

/* ── REVEAL ON SCROLL ────────────────────────────────────────────────── */
const reveals = document.querySelectorAll('.reveal');

if (window.gsap && window.ScrollTrigger) {
  reveals.forEach(el => {
    // Determine delay based on class name if present
    let delay = 0;
    if (el.classList.contains('reveal-delay-1')) delay = 0.15;
    else if (el.classList.contains('reveal-delay-2')) delay = 0.3;
    else if (el.classList.contains('reveal-delay-3')) delay = 0.45;
    else if (el.classList.contains('reveal-delay-4')) delay = 0.6;

    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 90%", // Reveal earlier
        once: true, // Only play once to prevent disappearing on scroll back up
        toggleActions: "play none none none"
      },
      y: 40,
      opacity: 0,
      duration: 1.2,
      delay: delay,
      ease: "power2.out",
      clearProps: "transform,opacity" // Ensure no layout shifts after animation
    });
  });
}

/* ── SCROLL ANIMATIONS ───────────────────────────────────────────────── */
// Hero Section Parallax
gsap.to(".hero-headline", {
  scrollTrigger: {
    trigger: "#hero",
    start: "top top",
    end: "bottom top",
    scrub: true
  },
  y: 80,
  opacity: 0.8 // Less aggressive fade-out to keep it visible longer
});

// Section Title Animation removed as it conflicts with .reveal
// document.querySelectorAll('.section-title').forEach(title => { ... });

/* ── WORK FILTER ─────────────────────────────────────────────────────── */
const filterBtns = document.querySelectorAll('.filter-btn');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    workCards.forEach(card => {
      const match = filter === 'all' || card.dataset.category.split(' ').includes(filter);
      card.style.transition    = 'opacity 0.35s, transform 0.35s';
      card.style.opacity       = match ? '1' : '0.2';
      card.style.transform     = match ? 'none' : 'scale(0.97)';
      card.style.pointerEvents = match ? 'auto' : 'none';
    });
  });
});

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
      gsap.set(mobileNav, { display: 'block' });
      gsap.to(mobileNav, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
      });
      gsap.from('.mobile-links li', {
        y: 50,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.2
      });
      lenis.stop(); // Stop scrolling when menu is open
    } else {
      gsap.to(mobileNav, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => gsap.set(mobileNav, { display: 'none' })
      });
      lenis.start();
    }
  });
}

// Close menu when clicking a link
mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    isMenuOpen = false;
    menuToggle.classList.remove('active');
    gsap.to(mobileNav, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => gsap.set(mobileNav, { display: 'none' })
    });
    lenis.start();
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
    const isAvailable = hour >= 9 && hour < 23; // 9 AM to 11 PM

    if (isAvailable) {
      timeEl.textContent = timeStr;
      if (statusLabel) statusLabel.textContent = 'Available';
      if (statusDot) {
        statusDot.style.background = '#00FF00';
        statusDot.style.boxShadow = '0 0 10px #00FF00';
      }
      if (statusSep) statusSep.style.display = '';
    } else {
      timeEl.textContent = '';
      if (statusLabel) statusLabel.textContent = 'Not Available';
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
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Disable button and show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending...';
    
    const formData = new FormData(contactForm);
    
    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Success state
        submitBtn.style.backgroundColor = '#28a745'; // Green
        submitBtn.style.borderColor = '#28a745';
        submitBtn.style.color = '#fff';
        submitBtn.innerHTML = 'Message Sent! ✓';
        contactForm.reset();
      } else {
        // Fallback to standard form submission if Formspree returns an error
        console.warn('Formspree error, submitting normally...', data);
        contactForm.submit();
      }
    } catch (error) {
      console.error('Fetch error, submitting normally...', error);
      // Fallback to standard form submission on network error
      contactForm.submit();
    } finally {
      // Reset button after 5 seconds if not redirected
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        submitBtn.style.backgroundColor = '';
        submitBtn.style.borderColor = '';
        submitBtn.style.color = '';
      }, 5000);
    }
  });
}

/* ── BACK TO TOP ─────────────────────────────────────────────────────── */
const backToTop = document.getElementById('back-to-top');

if (backToTop) {
  lenis.on('scroll', (e) => {
    if (e.scroll > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  backToTop.addEventListener('click', () => {
    lenis.scrollTo(0, {
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });
  });
}

/* ── SMOOTH NAV ANCHOR CLICKS ────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = link.getAttribute('href');
    if (target && target !== '#') {
      e.preventDefault();
      lenis.scrollTo(target, {
        offset: 0,
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
    }
  });
});
