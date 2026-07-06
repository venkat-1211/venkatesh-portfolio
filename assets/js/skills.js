/* =====================================================
   SKILLS.JS — Skill Bar Animations
   ===================================================== */

'use strict';

// Animate all skill bars in a given container (or document)
function animateSkillBars(container) {
  container = container || document;
  const bars = container.querySelectorAll('.skill-bar[data-skill]');

  bars.forEach(bar => {
    bar.style.width = '0%';
    bar._observed = false;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target._observed) {
        entry.target._observed = true;
        const target = entry.target.dataset.skill;
        setTimeout(() => {
          entry.target.style.width = target + '%';
        }, 150);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => observer.observe(bar));
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  // Animate visible panel immediately (PHP tab is default)
  const activePanel = document.querySelector('.skill-panel.active');
  if (activePanel) {
    // Short delay to let page render
    setTimeout(() => animateSkillBars(activePanel), 800);
  }
});

// Export for tab switching
window.animateSkillBars = animateSkillBars;
