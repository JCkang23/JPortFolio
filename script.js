// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Terminal typing effect
const typedEl = document.getElementById('typed');
const outputEl = document.getElementById('terminal-output');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const command = 'whoami --skills --focus';
const output = [
  '> Josue Cikanga',
  '> Full-stack engineer in training (JS / React / Node)',
  '> Currently: Tenant Management Platform',
  '> Also: K-12 math tutor'
].join('\n');

function typeText(el, text, speed, onDone) {
  let i = 0;
  el.textContent = '';
  function step() {
    if (i < text.length) {
      el.textContent += text.charAt(i);
      i++;
      setTimeout(step, speed);
    } else if (onDone) {
      onDone();
    }
  }
  step();
}

function runTerminal() {
  if (!typedEl || !outputEl) return;
  if (prefersReducedMotion) {
    typedEl.textContent = command;
    outputEl.textContent = output;
    return;
  }
  typeText(typedEl, command, 45, () => {
    setTimeout(() => {
      typeText(outputEl, output, 12);
    }, 300);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', runTerminal);
} else {
  runTerminal();
  
}

// Reveal-on-scroll for sections (subtle, respects reduced motion)
if (!prefersReducedMotion && 'IntersectionObserver' in window) {
  const sections = document.querySelectorAll('.section');
  sections.forEach(s => { s.style.opacity = '0'; s.style.transform = 'translateY(16px)'; s.style.transition = 'opacity 0.6s ease, transform 0.6s ease'; });
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  sections.forEach(s => io.observe(s));
}
