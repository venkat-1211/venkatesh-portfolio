# Venkatesh Mahalingam — Portfolio

A premium, production-ready developer portfolio website built with pure HTML, CSS, and JavaScript.

## 🚀 Tech Stack

- **Frontend:** HTML5, Vanilla CSS, JavaScript (ES6+)
- **Animations:** GSAP + ScrollTrigger, CSS keyframes
- **3D Background:** Three.js shader-based aurora
- **Typing:** Typed.js
- **Icons:** Font Awesome 6, Devicons
- **Fonts:** Google Fonts (Outfit, Inter)

## 🌐 Live Demo

Deployed on Vercel — [venkatesh-portfolio.vercel.app](https://venkatesh-portfolio.vercel.app)

## 📁 Project Structure

```
venkatesh-portfolio/
├── index.html          # Main SPA entry point
├── assets/
│   ├── css/
│   │   ├── style.css           # Design system & section styles
│   │   ├── animations.css      # GSAP-ready keyframes
│   │   ├── glassmorphism.css   # Glass UI components
│   │   └── responsive.css      # All breakpoints
│   ├── js/
│   │   ├── main.js             # App bootstrap & core
│   │   ├── three-bg.js         # Three.js aurora background
│   │   ├── cursor.js           # Custom magnetic cursor
│   │   ├── typed-init.js       # Typing animation
│   │   ├── skills.js           # Skill bar animations
│   │   ├── projects.js         # Project modal system
│   │   ├── animations.js       # GSAP ScrollTrigger
│   │   ├── timeline.js         # Timeline reveals
│   │   └── contact.js          # EmailJS contact form
│   └── images/
│       ├── hero-bg.png
│       ├── profile.png
│       └── projects/
└── vercel.json
```

## 🛠️ Local Development

Simply open `index.html` in your browser — no build step required.

## 📧 Contact Form Setup

To enable the contact form, sign up at [EmailJS](https://emailjs.com) and replace the placeholder keys in `assets/js/contact.js`:

```js
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
```
