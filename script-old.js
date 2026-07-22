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

/* ----------------------------------
   Page toggle (segmented control) + reader mode
   ---------------------------------- */
const pageButtons = document.querySelectorAll('.page-btn');
const readerToggle = document.querySelector('.reader-toggle');
const allSections = Array.from(document.querySelectorAll('main > section, main > .hero'));

function setActivePageButton(targetBtn) {
  pageButtons.forEach(b => {
    const isActive = (b === targetBtn);
    b.classList.toggle('active', isActive);
    b.setAttribute('aria-pressed', isActive ? 'true' : 'false');
  });
}

function showSectionById(id, makeSingle = true) {
  // id may be 'all' to show everything
  if (!id || id === 'all') {
    document.body.classList.remove('single-page');
    // make sure everything is visible
    allSections.forEach(el => el.classList.remove('hidden'));
    // reset active button to 'all'
    const allBtn = Array.from(pageButtons).find(b => b.dataset.target === 'all');
    if (allBtn) setActivePageButton(allBtn);
    return;
  }

  // show only the requested section
  document.body.classList.add('single-page');
  allSections.forEach(el => el.classList.add('hidden'));
  // find the matching section or hero
  const targetEl = document.getElementById(id) || document.querySelector('.hero');
  if (targetEl) {
    targetEl.classList.remove('hidden');
    // scroll the target into view (top of page for a clean reading experience)
    targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // update active state on buttons
  const btn = Array.from(pageButtons).find(b => b.dataset.target === id);
  if (btn) setActivePageButton(btn);
}

// wire up page buttons
pageButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    const target = btn.dataset.target;
    showSectionById(target, true);
  });
});

// clicking nav anchors should also put reader into single-page for focus (keeps both controls available)
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', (e) => {
    const href = a.getAttribute('href');
    if (href && href.startsWith('#')) {
      const id = href.slice(1);
      // small timeout to allow hash to change then show section
      setTimeout(() => showSectionById(id, true), 50);
    }
  });
});

// reader mode toggle — simplifies visual noise for calmer reading
if (readerToggle) {
  readerToggle.addEventListener('click', () => {
    const enabled = document.body.classList.toggle('reader-mode');
    readerToggle.setAttribute('aria-pressed', String(enabled));
  });
}

// optional: on page load, if there's a hash, reflect it in controls
window.addEventListener('load', () => {
  const h = location.hash.replace('#', '');
  if (h) {
    // show the hashed section in single-page mode and set active control
    showSectionById(h, true);
  }
});

// keep the 'All' control selected by default (in case DOM order varies)
const initialAll = Array.from(pageButtons).find(b => b.dataset.target === 'all');
if (initialAll) setActivePageButton(initialAll);
