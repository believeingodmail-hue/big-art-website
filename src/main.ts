const menuButton = document.querySelector<HTMLButtonElement>('[data-menu-button]');
const mobileNav = document.querySelector<HTMLElement>('[data-mobile-nav]');
const menuIcon = document.querySelector<HTMLElement>('[data-menu-icon]');

function setMenuState(isOpen: boolean) {
  if (!menuButton || !mobileNav || !menuIcon) return;

  menuButton.setAttribute('aria-expanded', String(isOpen));
  mobileNav.hidden = !isOpen;
  menuIcon.textContent = isOpen ? '×' : '☰';
}

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  setMenuState(!isOpen);
});

mobileNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setMenuState(false));
});

const revealTargets = document.querySelectorAll<HTMLElement>('.reveal');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 },
  );

  revealTargets.forEach((target) => observer.observe(target));
} else {
  revealTargets.forEach((target) => target.classList.add('is-visible'));
}
