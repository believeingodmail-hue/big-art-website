const menuButton = document.querySelector('[data-menu-button]');
const mobileNav = document.querySelector('[data-mobile-nav]');
const menuIcon = document.querySelector('[data-menu-icon]');

function setMenuState(isOpen) {
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

const revealTargets = document.querySelectorAll('.reveal');
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
    { rootMargin: '0px 0px -8% 0px', threshold: 0.16 },
  );

  revealTargets.forEach((target) => observer.observe(target));
} else {
  revealTargets.forEach((target) => target.classList.add('is-visible'));
}

const body = document.body;

function finishLoading() {
  body.classList.remove('is-loading');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => window.setTimeout(finishLoading, 420), { once: true });
} else {
  window.setTimeout(finishLoading, 420);
}

window.setTimeout(finishLoading, 1800);

const artworkCards = document.querySelectorAll('[data-artwork-card]');
const featuredPreview = document.querySelector('[data-featured-preview]');
const artworkTitle = document.querySelector('[data-artwork-title]');
const artworkDescription = document.querySelector('[data-artwork-description]');
const artworkNumber = document.querySelector('[data-artwork-number]');
const previewThemes = ['ochre', 'onyx', 'ember', 'ivory'];

function selectArtwork(card) {
  const title = card.dataset.title;
  const description = card.dataset.description;
  const preview = card.dataset.preview;
  const number = card.dataset.number;

  artworkCards.forEach((artworkCard) => artworkCard.classList.toggle('is-active', artworkCard === card));

  if (title && artworkTitle) artworkTitle.textContent = title;
  if (description && artworkDescription) artworkDescription.textContent = description;
  if (number && artworkNumber) artworkNumber.textContent = number;
  if (preview && featuredPreview) {
    featuredPreview.classList.remove(...previewThemes);
    featuredPreview.classList.add(preview);
  }
}

artworkCards.forEach((card) => {
  card.addEventListener('click', () => selectArtwork(card));
  card.addEventListener('pointerenter', () => {
    if (!prefersReducedMotion) selectArtwork(card);
  });
});
