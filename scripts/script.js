/* ============================================
   GLOBAL SCRIPT — Shree Nath Mahato Portfolio
   ============================================ */

// ---- Page load fade-in ----
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
  revealOnScroll();
  initCounters();
});

// ---- Navbar ----
const navbar  = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('navMenu');
const navLinks  = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  updateActiveNavLink();
  revealOnScroll();
}, { passive: true });

// Shared helper so every close path is consistent.
function closeNavMenu() {
  hamburger?.classList.remove('active');
  navMenu?.classList.remove('active');
  navbar?.classList.remove('menu-open'); // re-enable backdrop-filter on navbar
  document.body.style.overflow = '';
}

if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    const isOpen = navMenu.classList.contains('active');
    document.body.style.overflow = isOpen ? 'hidden' : '';
    // Toggle .menu-open so CSS can strip backdrop-filter from .navbar.scrolled.
    // backdrop-filter creates a new fixed-position containing block, which
    // collapses .nav-menu (position:fixed) to zero height when scrolled.
    navbar.classList.toggle('menu-open', isOpen);
  });
}

navLinks.forEach(link => {
  link.addEventListener('click', () => closeNavMenu());
});

// Close menu when tapping the dark overlay background (not a link).
navMenu?.addEventListener('click', (e) => {
  if (e.target === navMenu) closeNavMenu();
});

// Close menu on Escape key so the page never stays "stuck" with scroll locked.
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeNavMenu();
});

// ---- Active Nav Link (home page scroll) ----
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  if (!sections.length) return;
  const scrollY = window.scrollY + 120;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[href*="${id}"]`);
    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(l => l.classList.remove('active'));
      link?.classList.add('active');
    }
  });
}

// ---- Smooth Scroll ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href.length > 1) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ---- Scroll Reveal — supports .reveal, .reveal-left, .reveal-right, .reveal-scale ----
function revealOnScroll() {
  const selectors = '.reveal, .reveal-left, .reveal-right, .reveal-scale';
  const els = document.querySelectorAll(`${selectors}:not(.visible)`);
  let delay = 0;
  els.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 70) {
      setTimeout(() => el.classList.add('visible'), delay);
      delay = Math.min(delay + 55, 350); // stagger but cap at 350ms
    }
  });
}

// ---- Counter Animation ----
let countersStarted = false;
function initCounters() {
  const counters = document.querySelectorAll('.stat-number[data-target]');
  if (!counters.length || countersStarted) return;

  const statsSection = document.querySelector('.hero-stats');
  if (!statsSection) return;

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !countersStarted) {
      countersStarted = true;
      counters.forEach(counter => animateCounter(counter));
      observer.disconnect();
    }
  }, { threshold: 0.5 });

  observer.observe(statsSection);
}

function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.target >= 10 ? '+' : '';
  const duration = 1400;
  const step = 16;
  const steps = Math.floor(duration / step);
  let current = 0;
  const increment = target / steps;

  const timer = setInterval(() => {
    current = Math.min(current + increment, target);
    el.textContent = Math.floor(current) + (current >= target ? suffix : '');
    if (current >= target) clearInterval(timer);
  }, step);
}

// ---- Footer Year ----
document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('footerYear');
  if (el) el.innerHTML = `&copy; ${new Date().getFullYear()} Shree Nath Mahato. All rights reserved.`;
  revealOnScroll(); // run once on DOM ready
});

// ---- Notification utility ----
window.showNotification = function(message, type = 'success') {
  document.querySelector('.notification')?.remove();
  const n = document.createElement('div');
  n.className = `notification ${type}`;
  n.setAttribute('role', 'alert');
  n.innerHTML = `
    <div class="notification-content">
      <span>${message}</span>
      <button class="notification-close" aria-label="Close">&times;</button>
    </div>`;
  document.body.appendChild(n);
  n.querySelector('.notification-close').addEventListener('click', () => dismissNotif(n));
  setTimeout(() => dismissNotif(n), 6000);
};

function dismissNotif(n) {
  n.style.animation = 'notifOut 0.3s ease forwards';
  setTimeout(() => n?.remove(), 320);
}

// ---- Card tilt on hover (subtle) ----
document.querySelectorAll('.project-card, .cert-card, .proj-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `translateY(-6px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
