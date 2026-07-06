/* =====================================================
   MAIN.JS — App Bootstrap & Core Utilities
   ===================================================== */

'use strict';

// ─────────────────────────────────────────────────────
// PAGE LOADER
// ─────────────────────────────────────────────────────
window.addEventListener('load', () => {
  const loader = document.getElementById('page-loader');
  if (!loader) return;
  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.style.overflow = '';
    initRevealObserver();
    initStatCounters();
  }, 2200);
  document.body.style.overflow = 'hidden';
});

// ─────────────────────────────────────────────────────
// NAVBAR SCROLL BEHAVIOR
// ─────────────────────────────────────────────────────
const navbar = document.getElementById('navbar');
const scrollProgress = document.getElementById('scroll-progress');
const backToTop = document.getElementById('back-to-top');

let lastScrollY = 0;

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = Math.min((scrollY / docHeight) * 100, 100);

  // Navbar glass on scroll
  if (navbar) {
    navbar.classList.toggle('scrolled', scrollY > 50);
  }

  // Scroll progress bar
  if (scrollProgress) {
    scrollProgress.style.width = progress + '%';
  }

  // Back to top visibility
  if (backToTop) {
    backToTop.classList.toggle('visible', scrollY > 400);
  }

  // Active nav link
  updateActiveNavLink();

  lastScrollY = scrollY;
}, { passive: true });

function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[data-section]');

  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.section === current);
  });
}

// ─────────────────────────────────────────────────────
// MOBILE MENU
// ─────────────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileOverlay = document.getElementById('mobile-overlay');

function toggleMobileMenu() {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen.toString());
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

function closeMobileMenu() {
  mobileMenu.classList.remove('open');
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

hamburger?.addEventListener('click', toggleMobileMenu);
mobileOverlay?.addEventListener('click', closeMobileMenu);

// Close on ESC
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeMobileMenu();
    closeProject();
  }
});

// ─────────────────────────────────────────────────────
// THEME TOGGLE (Dark / Light)
// ─────────────────────────────────────────────────────
const themeToggle = document.getElementById('theme-toggle');
const themeIcon   = document.getElementById('theme-icon');
const html        = document.documentElement;

function applyTheme(theme) {
  html.setAttribute('data-theme', theme);
  if (themeIcon) {
    themeIcon.className = theme === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
  }
  localStorage.setItem('vm-theme', theme);
}

// Load saved theme
const savedTheme = localStorage.getItem('vm-theme') || 'dark';
applyTheme(savedTheme);

themeToggle?.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

// ─────────────────────────────────────────────────────
// BACK TO TOP
// ─────────────────────────────────────────────────────
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ─────────────────────────────────────────────────────
// INTERSECTION OBSERVER — REVEAL ANIMATIONS
// ─────────────────────────────────────────────────────
function initRevealObserver() {
  const revealEls = document.querySelectorAll(
    '.reveal, .reveal-left, .reveal-right, .reveal-scale'
  );

  if (!revealEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  });

  revealEls.forEach(el => observer.observe(el));
}

// ─────────────────────────────────────────────────────
// ANIMATED STAT COUNTERS
// ─────────────────────────────────────────────────────
function initStatCounters() {
  const statNumbers = document.querySelectorAll('.stat-number[data-count]');

  if (!statNumbers.length) return;

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => counterObserver.observe(el));
}

function animateCounter(el) {
  const target  = parseInt(el.dataset.count, 10);
  const suffix  = el.dataset.suffix || '';
  const duration = 2000;
  const start    = performance.now();

  function update(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3); // easeOutCubic
    const current  = Math.round(eased * target);
    el.textContent = current + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

// ─────────────────────────────────────────────────────
// PROJECT FILTER
// ─────────────────────────────────────────────────────
function filterProjects(type) {
  const cards   = document.querySelectorAll('.project-card');
  const buttons = document.querySelectorAll('.filter-btn');

  buttons.forEach(btn => btn.classList.remove('active'));
  document.getElementById(`filter-${type}`)?.classList.add('active');

  cards.forEach(card => {
    const cardType = card.dataset.type;
    const show     = type === 'all' || cardType === type;
    card.style.opacity    = show ? '1' : '0.2';
    card.style.transform  = show ? '' : 'scale(0.95)';
    card.style.pointerEvents = show ? '' : 'none';
    card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  });
}

// ─────────────────────────────────────────────────────
// SKILL TABS
// ─────────────────────────────────────────────────────
function switchSkillTab(tab) {
  const buttons = document.querySelectorAll('.skill-tab-btn');
  const panels  = document.querySelectorAll('.skill-panel');

  buttons.forEach(btn => {
    btn.classList.remove('active');
    btn.setAttribute('aria-selected', 'false');
  });
  panels.forEach(panel => panel.classList.remove('active'));

  document.getElementById(`tab-${tab}`)?.classList.add('active');
  document.getElementById(`tab-${tab}`)?.setAttribute('aria-selected', 'true');
  const panel = document.getElementById(`panel-${tab}`);
  if (panel) {
    panel.classList.add('active');
    // Re-trigger skill bar animations
    setTimeout(() => {
      if (typeof animateSkillBars === 'function') animateSkillBars(panel);
    }, 50);
  }
}

// ─────────────────────────────────────────────────────
// FAQ ACCORDION
// ─────────────────────────────────────────────────────
function toggleFaq(btn) {
  const item     = btn.closest('.faq-item');
  const isOpen   = item.classList.toggle('open');
  btn.setAttribute('aria-expanded', isOpen.toString());
}

// ─────────────────────────────────────────────────────
// SMOOTH ANCHOR SCROLLING (with offset for fixed nav)
// ─────────────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = 80; // navbar height
      const top    = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ─────────────────────────────────────────────────────
// PERFORMANCE: Lazy-load devicon images
// ─────────────────────────────────────────────────────
if ('IntersectionObserver' in window) {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  const imgObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        observer.unobserve(img);
      }
    });
  });
  lazyImages.forEach(img => imgObserver.observe(img));
}

// ─────────────────────────────────────────────────────
// KEYBOARD NAVIGATION for project cards
// ─────────────────────────────────────────────────────
document.querySelectorAll('.project-card[role="button"]').forEach(card => {
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      card.click();
    }
  });
});

// ─────────────────────────────────────────────────────
// EXPOSE closeMobileMenu globally (used in onclick HTML)
// ─────────────────────────────────────────────────────
window.closeMobileMenu  = closeMobileMenu;
window.scrollToTop      = scrollToTop;
window.filterProjects   = filterProjects;
window.switchSkillTab   = switchSkillTab;
window.toggleFaq        = toggleFaq;
