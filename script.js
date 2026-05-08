/* ============================================
   PORTFOLIO — INTERACTIONS
   ============================================ */

// ---- Theme Toggle ----
const themeToggle = document.querySelector('.theme-toggle');
const root = document.documentElement;

function getStoredTheme() {
  const stored = localStorage.getItem('theme');
  if (stored) return stored;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

// Apply stored theme on load (before paint)
applyTheme(getStoredTheme());

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') || 'dark';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });
}

// ---- Scroll Progress Bar ----
const progressBar = document.querySelector('.scroll-progress');

function updateProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = progress + '%';
}

window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

// ---- Header scroll state ----
const header = document.querySelector('.header');

function updateHeader() {
  header.classList.toggle('scrolled', window.scrollY > 8);
}

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

// ---- Mobile menu ----
const menuBtn = document.querySelector('.mobile-menu-btn');
const mobileNav = document.querySelector('.mobile-nav');

if (menuBtn && mobileNav) {
  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    mobileNav.classList.toggle('open');
  });

  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuBtn.classList.remove('active');
      mobileNav.classList.remove('open');
    });
  });
}

// ---- Scroll Reveal ----
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -48px 0px' }
);

revealElements.forEach((el) => revealObserver.observe(el));

// ---- Smooth scroll for anchor links ----
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href');
    if (targetId === '#') return;

    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const headerHeight = header ? header.offsetHeight : 0;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight - 24;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });

      if (menuBtn && mobileNav) {
        menuBtn.classList.remove('active');
        mobileNav.classList.remove('open');
      }
    }
  });
});
