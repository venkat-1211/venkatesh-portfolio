/* =====================================================
   CONTACT.JS — EmailJS Contact Form Handler
   ===================================================== */

'use strict';

// ─── EmailJS Configuration ───────────────────────────
// 1. Sign up free at https://emailjs.com
// 2. Create an Email Service (Gmail, Outlook, etc.)
// 3. Create an Email Template
// 4. Replace the values below with your real IDs
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';   // EmailJS Public Key
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';   // e.g., 'service_xxxxx'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';  // e.g., 'template_xxxxx'

(function initContact() {
  const form       = document.getElementById('contact-form');
  const submitBtn  = document.getElementById('contact-submit-btn');
  const submitText = document.getElementById('submit-text');
  const successDiv = document.getElementById('form-success');

  if (!form) return;

  // Load EmailJS SDK
  if (typeof emailjs === 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    script.onload = () => {
      if (EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
      }
    };
    document.head.appendChild(script);
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Basic validation
    const name    = document.getElementById('contact-name').value.trim();
    const email   = document.getElementById('contact-email-field').value.trim();
    const subject = document.getElementById('contact-subject').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    if (!name || !email || !subject || !message) {
      showFormError('Please fill in all required fields.');
      return;
    }

    if (!isValidEmail(email)) {
      showFormError('Please enter a valid email address.');
      return;
    }

    // Loading state
    submitBtn.disabled = true;
    submitText.textContent = 'Sending...';
    submitBtn.querySelector('i').className = 'fa-solid fa-spinner fa-spin';

    const templateParams = {
      from_name:    name,
      from_email:   email,
      subject:      subject,
      message:      message,
      budget:       document.getElementById('contact-budget').value || 'Not specified',
      reply_to:     email,
      to_name:      'Venkatesh Mahalingam'
    };

    try {
      if (EMAILJS_SERVICE_ID !== 'YOUR_SERVICE_ID') {
        // Real EmailJS send
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
      } else {
        // Demo mode — simulate success
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log('EmailJS not configured — form data:', templateParams);
      }

      // Success
      form.style.display = 'none';
      successDiv.style.display = 'block';
      form.reset();

    } catch (err) {
      console.error('EmailJS error:', err);
      showFormError('Failed to send message. Please try emailing directly or use WhatsApp.');

      // Reset button
      submitBtn.disabled = false;
      submitText.textContent = 'Send Message';
      submitBtn.querySelector('i').className = 'fa-regular fa-paper-plane';
    }
  });

  function showFormError(msg) {
    // Remove existing error
    const existing = form.querySelector('.form-error-msg');
    if (existing) existing.remove();

    const err = document.createElement('div');
    err.className = 'form-error-msg';
    err.style.cssText = `
      padding: 0.75rem 1rem;
      background: rgba(239,68,68,0.1);
      border: 1px solid rgba(239,68,68,0.25);
      border-radius: 10px;
      color: #f87171;
      font-size: 0.875rem;
      margin-top: 0.5rem;
    `;
    err.textContent = msg;
    form.appendChild(err);
    setTimeout(() => err.remove(), 5000);
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Input focus micro-animation
  form.querySelectorAll('.input-glass').forEach(input => {
    input.addEventListener('focus', () => {
      input.parentElement.style.transform = 'scale(1.01)';
      input.parentElement.style.transition = 'transform 0.2s ease';
    });
    input.addEventListener('blur', () => {
      input.parentElement.style.transform = '';
    });
  });
})();
