const LINKS = {
  github: "https://github.com/JCkang23",
  linkedin: "https://www.linkedin.com/in/josue-cikanga",
  calendly: "https://calendly.com/josuecik",
  gofundme: "https://www.gofundme.com/f/josue-from-the-congo-pay-for-college"
};
// -------------------------------

document.querySelectorAll('#github-link').forEach(el => el.href = LINKS.github);
document.querySelectorAll('#linkedin-link').forEach(el => el.href = LINKS.linkedin);
document.querySelectorAll('#calendly-link, #calendly-link-2').forEach(el => el.href = LINKS.calendly);
document.querySelectorAll('#gofundme-link').forEach(el => el.href = LINKS.gofundme);

// Theme toggle
const toggleBtn = document.querySelector('.theme-toggle');
const root = document.documentElement;
const THEME_KEY = 'jc-theme';

function setTheme(theme) {
  root.setAttribute('data-theme', theme);
  try { localStorage.setItem(THEME_KEY, theme); } catch (e) {}
}

// Use the saved choice if there is one, otherwise fall back to system preference
let saved = null;
try { saved = localStorage.getItem(THEME_KEY); } catch (e) {}
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
setTheme(saved || (prefersDark ? 'dark' : 'light'));

if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
  });
}

// Typing cursor blink already handled via CSS; nothing else needed here.