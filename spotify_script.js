// ============================================================
//  SPOTIFY REDESIGN — script.js
//  UX Case Study Prototype
// ============================================================
// ── 1. FEATURE TAB SWITCHING ─────────────────────────────────
function showPanel(id) {
  // Hide all panels
  document.querySelectorAll('.feature-panel').forEach(p => {
    p.classList.remove('active');
  });
  // Remove active from all tabs
  document.querySelectorAll('.ftab').forEach(t => {
    t.classList.remove('active');
  });
  // Show selected panel
  document.getElementById('panel-' + id).classList.add('active');
  // Mark clicked tab as active
  event.target.classList.add('active');
}
// ── 2. SMOOTH SCROLL NAV PILLS ───────────────────────────────
document.querySelectorAll('a.nav-pill').forEach(pill => {
  pill.addEventListener('click', function (e) {
    e.preventDefault();
    // Update active pill
    document.querySelectorAll('a.nav-pill').forEach(p => p.classList.remove('active'));
    this.classList.add('active');
    // Scroll to target section
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
// ── 3. SCROLL-REVEAL ANIMATIONS ──────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, i * 80); // stagger delay
    }
  });
}, { threshold: 0.1 });
// Apply reveal to all cards
document.querySelectorAll(
  '.pain-card, .imp-card, .metric-card, .principle-card'
).forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity .5s ease, transform .5s ease';
  revealObserver.observe(el);
});
// ── 4. MOOD CHIP INTERACTION ─────────────────────────────────
document.querySelectorAll('.mood-chip').forEach(chip => {
  chip.addEventListener('click', function () {
    // Remove active from all siblings
    this.closest('.mood-row').querySelectorAll('.mood-chip').forEach(c => {
      c.classList.remove('active');
    });
    // Set this one active
    this.classList.add('active');
  });
});
// ── 5. ACTIVE NAV HIGHLIGHT ON SCROLL ────────────────────────
const sections = document.querySelectorAll('section[id], div[id]');
const navPills = document.querySelectorAll('a.nav-pill[href^="#"]');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navPills.forEach(pill => {
        pill.classList.remove('active');
        if (pill.getAttribute('href') === '#' + id) {
          pill.classList.add('active');
        }
      });
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => sectionObserver.observe(s));