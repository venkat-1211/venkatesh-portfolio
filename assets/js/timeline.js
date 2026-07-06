/* =====================================================
   TIMELINE.JS — Experience Timeline Animation
   ===================================================== */

'use strict';

(function initTimeline() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  if (!timelineItems.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity    = '1';
        entry.target.style.transform  = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  timelineItems.forEach((item, i) => {
    item.style.opacity    = '0';
    item.style.transform  = 'translateY(30px)';
    item.style.transition = `opacity 0.6s ease ${i * 0.15}s, transform 0.6s ease ${i * 0.15}s`;
    observer.observe(item);
  });

  // Animate timeline line draw
  const timelineEl = document.querySelector('.timeline');
  if (timelineEl) {
    const lineObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const pseudo = document.createElement('style');
        pseudo.textContent = `.timeline::before { animation: timelineLine 2s ease forwards; }`;
        document.head.appendChild(pseudo);
      }
    }, { threshold: 0.05 });
    lineObserver.observe(timelineEl);
  }
})();
