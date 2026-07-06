/* =====================================================
   TYPED-INIT.JS — Typing Animation
   ===================================================== */

'use strict';

(function initTyped() {
  const el = document.getElementById('typed-text');
  if (!el) return;

  const waitForTyped = setInterval(() => {
    if (typeof Typed === 'undefined') return;
    clearInterval(waitForTyped);

    new Typed('#typed-text', {
      strings: [
        'Scalable REST APIs',
        'Laravel Backends',
        'Django Applications',
        'FastAPI Microservices',
        'Database Architectures',
        'Cloud-Deployed Systems',
        'GraphQL Services',
        'PHP & Python Solutions'
      ],
      typeSpeed:     55,
      backSpeed:     30,
      backDelay:     2200,
      startDelay:    800,
      loop:          true,
      showCursor:    false,  // Using custom cursor in HTML
      smartBackspace: true
    });
  }, 100);
})();
