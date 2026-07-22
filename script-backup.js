// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// ============================================
// THEME TOGGLE
// ============================================
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

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
const pageDots = document.querySelectorAll('.page-dot');
const pageSections = document.querySelectorAll('.page-section');

function navigateToPage(pageName) {
  // Hide all sections
  pageSections.forEach(section => {
    section.classList.remove('active');
  });

  // Remove current page indicator from all dots
  pageDots.forEach(dot => {
    dot.removeAttribute('aria-current');
  });

  // Show requested section
  const targetSection = document.querySelector(`[data-page="${pageName}"]`);
  if (targetSection) {
    targetSection.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Set current page indicator
  const targetDot = document.querySelector(`[data-page="${pageName}"]`);
  if (targetDot && targetDot.classList.contains('page-dot')) {
    targetDot.setAttribute('aria-current', 'page');
  } else {
    // Find dot by data-page
    const dot = Array.from(pageDots).find(d => d.getAttribute('data-page') === pageName);
    if (dot) dot.setAttribute('aria-current', 'page');
  }
}

// Wire up page dots
pageDots.forEach(dot => {
  dot.addEventListener('click', () => {
    const pageName = dot.getAttribute('data-page');
    navigateToPage(pageName);
  });
});

// Keyboard navigation (arrow keys)
document.addEventListener('keydown', (e) => {
  const currentActive = document.querySelector('.page-section.active');
  const currentIndex = Array.from(pageSections).indexOf(currentActive);

  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
    e.preventDefault();
    if (currentIndex < pageSections.length - 1) {
      const nextPage = pageSections[currentIndex + 1].getAttribute('data-page');
      navigateToPage(nextPage);
    }
  } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
    e.preventDefault();
    if (currentIndex > 0) {
      const prevPage = pageSections[currentIndex - 1].getAttribute('data-page');
      navigateToPage(prevPage);
    }
  }
});

// Initialize first page
navigateToPage('home');
