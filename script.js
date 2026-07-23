// ---- EDIT YOUR LINKS HERE ----
const LINKS = {
  github: "https://github.com/your-username",
  linkedin: "https://linkedin.com/in/your-profile",
  calendly: "https://calendly.com/your-username"
};
// -------------------------------

document.querySelectorAll('#github-link').forEach(el => el.href = LINKS.github);
document.querySelectorAll('#linkedin-link').forEach(el => el.href = LINKS.linkedin);
document.querySelectorAll('#calendly-link, #calendly-link-2').forEach(el => el.href = LINKS.calendly);

// Theme toggle
const toggleBtn = document.querySelector('.theme-toggle');
const root = document.documentElement;

function setTheme(theme) {
  root.setAttribute('data-theme', theme);
  try { window.__theme = theme; } catch (e) {}
}

// Respect system preference on first load
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
setTheme(window.__theme || (prefersDark ? 'dark' : 'light'));

if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
  });
}

// Typing cursor blink already handled via CSS; nothing else needed here.
