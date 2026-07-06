/* =====================================================
   ANIMATIONS.JS — GSAP Scroll Animations
   ===================================================== */

'use strict';

(function initGSAP() {
  const waitForGSAP = setInterval(() => {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    clearInterval(waitForGSAP);
    setupAnimations();
  }, 100);

  function setupAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // ── Hero section stagger ──
    gsap.from('.hero-stats-strip .hero-stat', {
      y: 30,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
      delay: 1.8,
      ease: 'power3.out'
    });

    // ── Section titles ──
    gsap.utils.toArray('.section-title').forEach(title => {
      gsap.from(title, {
        scrollTrigger: {
          trigger: title,
          start: 'top 85%',
          once: true
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });
    });

    // ── Service cards stagger ──
    gsap.utils.toArray('.service-card').forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 88%',
          once: true
        },
        y: 40,
        opacity: 0,
        duration: 0.6,
        delay: (i % 4) * 0.08,
        ease: 'power2.out'
      });
    });

    // ── Tech logo items ──
    gsap.utils.toArray('.tech-logo-item').forEach((item, i) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: 'top 90%',
          once: true
        },
        scale: 0.7,
        opacity: 0,
        duration: 0.4,
        delay: (i % 10) * 0.04,
        ease: 'back.out(1.7)'
      });
    });

    // ── Stats section ──
    gsap.from('#statistics .stat-card', {
      scrollTrigger: {
        trigger: '#statistics',
        start: 'top 75%',
        once: true
      },
      y: 50,
      opacity: 0,
      stagger: 0.08,
      duration: 0.7,
      ease: 'power3.out'
    });

    // ── Process steps ──
    gsap.from('.process-step', {
      scrollTrigger: {
        trigger: '#process',
        start: 'top 75%',
        once: true
      },
      y: 50,
      opacity: 0,
      stagger: 0.15,
      duration: 0.7,
      ease: 'back.out(1.4)'
    });

    // ── About section parallax ──
    gsap.to('.about-image-wrap', {
      scrollTrigger: {
        trigger: '#about',
        scrub: 1.5
      },
      y: -30,
      ease: 'none'
    });

    // ── Architecture diagram ──
    gsap.utils.toArray('.arch-layer').forEach((layer, i) => {
      gsap.from(layer, {
        scrollTrigger: {
          trigger: layer,
          start: 'top 85%',
          once: true
        },
        x: i % 2 === 0 ? -30 : 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out'
      });
    });

    // ── Footer grid ──
    gsap.from('.footer-grid > *', {
      scrollTrigger: {
        trigger: 'footer',
        start: 'top 85%',
        once: true
      },
      y: 30,
      opacity: 0,
      stagger: 0.12,
      duration: 0.6,
      ease: 'power2.out'
    });

    // ── Scroll-triggered color shift on navbar ──
    ScrollTrigger.create({
      start: 1,
      onUpdate: self => {
        const navbar = document.getElementById('navbar');
        if (navbar) navbar.classList.toggle('scrolled', self.progress > 0);
      }
    });
  }
})();
