const header = document.querySelector('[data-header]');
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');
const year = document.querySelector('[data-year]');
const modal = document.querySelector('[data-artwork-modal]');
const modalTitle = document.querySelector('[data-modal-title]');
const modalBody = document.querySelector('[data-modal-body]');
const modalClose = document.querySelector('[data-modal-close]');
let lastFocusedElement = null;

if (year) year.textContent = new Date().getFullYear();

const updateHeader = () => {
  if (!header) return;
  header.classList.toggle('is-scrolled', window.scrollY > 24);
};

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const openModal = (card) => {
  if (!modal || !modalTitle || !modalBody) return;
  lastFocusedElement = document.activeElement;
  modalTitle.textContent = card.dataset.viewingTitle || 'BelieveinGOD Collection';
  modalBody.textContent = card.dataset.viewingBody || 'BelieveinGOD Collection';
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  modalClose?.focus();
};

const closeModal = () => {
  if (!modal) return;
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  if (lastFocusedElement instanceof HTMLElement) lastFocusedElement.focus();
};

document.querySelectorAll('[data-viewing-title]').forEach((card) => {
  card.addEventListener('click', () => openModal(card));
});

modalClose?.addEventListener('click', closeModal);
modal?.addEventListener('click', (event) => {
  if (event.target === modal) closeModal();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal?.classList.contains('is-open')) closeModal();
});

const revealElements = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16, rootMargin: '0px 0px -6% 0px' },
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('is-visible'));
}
