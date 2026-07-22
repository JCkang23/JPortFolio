// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// ============================================
// THEME TOGGLE
// ============================================
const themeToggle = document.getElementById('theme-toggle');

// Load saved theme or default to 'light'
const savedTheme = localStorage.getItem('theme') || 'light';
document.body.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const currentTheme = document.body.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  document.body.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});

// ============================================
// PAGE NAVIGATION
// ============================================
const pages = document.querySelectorAll('.page');

function navigateTo(pageName) {
  // Hide all pages
  pages.forEach(page => {
    page.classList.remove('active');
  });

  // Show requested page
  const targetPage = document.querySelector(`[data-page="${pageName}"]`);
  if (targetPage) {
    targetPage.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// Wire up nav links using onclick attribute parsing
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      const pageName = href.substring(1);
      navigateTo(pageName);
    }
  });
});

// Initialize first page
navigateTo('home');
