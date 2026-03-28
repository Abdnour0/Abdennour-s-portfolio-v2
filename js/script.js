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
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

/* ── CURSOR ──────────────────────────────────────────────────────────── */
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursor-ring');
const cursorText = document.getElementById('cursor-text');
let mx = 0, my = 0;

// Set initial center position for GSAP
gsap.set([cursor, ring, cursorText], { xPercent: -50, yPercent: -50 });

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
  
  gsap.to(ring, {
    x: mx,
    y: my,
    duration: 0.3,
    ease: "power2.out"
  });
});

/* Handle Cursor Text for Projects */
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
});


/* ── TYPED JS ────────────────────────────────────────────────────────── */
const typed = new Typed('#typed', {
  strings: [
    'Software Engineering Student',
    'Full-Stack Developer',
    'Problem Solver',
    'Tech Enthusiast'
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

/* ── REVEAL ON SCROLL ────────────────────────────────────────────────── */
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach(el => revealObserver.observe(el));

/* ── WORK FILTER ─────────────────────────────────────────────────────── */
const filterBtns = document.querySelectorAll('.filter-btn');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    workCards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
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