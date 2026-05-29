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

const artworkCards = document.querySelectorAll<HTMLButtonElement>('[data-artwork-card]');
const featuredPreview = document.querySelector<HTMLElement>('[data-featured-preview]');
const artworkTitle = document.querySelector<HTMLElement>('[data-artwork-title]');
const artworkDescription = document.querySelector<HTMLElement>('[data-artwork-description]');
const artworkNumber = document.querySelector<HTMLElement>('[data-artwork-number]');
const openActiveArtwork = document.querySelector<HTMLButtonElement>('[data-open-active-artwork]');
const artworkDialog = document.querySelector<HTMLDialogElement>('[data-artwork-dialog]');
const dialogClose = document.querySelector<HTMLButtonElement>('[data-dialog-close]');
const dialogPreview = document.querySelector<HTMLElement>('[data-dialog-preview]');
const dialogTitle = document.querySelector<HTMLElement>('[data-dialog-title]');
const dialogNumber = document.querySelector<HTMLElement>('[data-dialog-number]');
const dialogMedium = document.querySelector<HTMLElement>('[data-dialog-medium]');
const dialogYear = document.querySelector<HTMLElement>('[data-dialog-year]');
const dialogScale = document.querySelector<HTMLElement>('[data-dialog-scale]');
const dialogDetail = document.querySelector<HTMLElement>('[data-dialog-detail]');
const dialogInquire = document.querySelector<HTMLAnchorElement>('[data-dialog-inquire]');
const previewThemes = ['ochre', 'onyx', 'ember', 'ivory'];
let activeArtwork = artworkCards[0];

function selectArtwork(card: HTMLButtonElement) {
  const { title, description, preview, number } = card.dataset;
  activeArtwork = card;

  artworkCards.forEach((artworkCard) => artworkCard.classList.toggle('is-active', artworkCard === card));

  if (title && artworkTitle) artworkTitle.textContent = title;
  if (description && artworkDescription) artworkDescription.textContent = description;
  if (number && artworkNumber) artworkNumber.textContent = number;
  if (preview && featuredPreview) {
    featuredPreview.classList.remove(...previewThemes);
    featuredPreview.classList.add(preview);
  }
}

function populateDialog(card: HTMLButtonElement) {
  const { title, medium, year, scale, detail, preview, number } = card.dataset;

  if (title && dialogTitle) dialogTitle.textContent = title;
  if (number && dialogNumber) dialogNumber.textContent = number;
  if (medium && dialogMedium) dialogMedium.textContent = medium;
  if (year && dialogYear) dialogYear.textContent = year;
  if (scale && dialogScale) dialogScale.textContent = scale;
  if (detail && dialogDetail) dialogDetail.textContent = detail;
  if (preview && dialogPreview) {
    dialogPreview.classList.remove(...previewThemes);
    dialogPreview.classList.add(preview);
  }
  if (title && dialogInquire) {
    dialogInquire.href = `#inquiry`;
    dialogInquire.setAttribute('aria-label', `Inquire about ${title}`);
  }
}

function openArtworkDialog(card: HTMLButtonElement) {
  populateDialog(card);

  if (artworkDialog?.showModal) {
    artworkDialog.showModal();
  }
}

artworkCards.forEach((card) => {
  card.addEventListener('click', () => {
    selectArtwork(card);
    openArtworkDialog(card);
  });
  card.addEventListener('pointerenter', () => {
    if (!prefersReducedMotion) selectArtwork(card);
  });
});

openActiveArtwork?.addEventListener('click', () => {
  if (activeArtwork) openArtworkDialog(activeArtwork);
});

dialogClose?.addEventListener('click', () => artworkDialog?.close());
artworkDialog?.addEventListener('click', (event) => {
  if (event.target === artworkDialog) artworkDialog.close();
});
dialogInquire?.addEventListener('click', () => artworkDialog?.close());

const roomTabs = document.querySelectorAll<HTMLButtonElement>('[data-room-tab]');
const galleryRoom = document.querySelector<HTMLElement>('[data-gallery-room]');
const roomCaption = document.querySelector<HTMLElement>('[data-room-caption]');
const roomCopy: Record<string, string> = {
  Invocation: 'Room I: Invocation — a low-lit entrance where gold marks the first act of belief.',
  Memory: 'Room II: Memory — earthen walls and ember light hold Edo heritage, textile rhythm, and ancestral presence.',
  Revelation: 'Room III: Revelation — a brighter chamber where ash, pearl, and gold open into renewal.',
};

roomTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const room = tab.dataset.roomTab ?? 'Invocation';
    const roomClass = room.toLowerCase();

    roomTabs.forEach((roomTab) => {
      const isActive = roomTab === tab;
      roomTab.classList.toggle('is-active', isActive);
      roomTab.setAttribute('aria-selected', String(isActive));
    });

    if (galleryRoom) {
      galleryRoom.classList.remove('invocation', 'memory', 'revelation');
      galleryRoom.classList.add(roomClass);
    }

    if (roomCaption) roomCaption.textContent = roomCopy[room] ?? roomCopy.Invocation;
  });
});

const forms = document.querySelectorAll<HTMLFormElement>('[data-form]');
forms.forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const status = form.querySelector<HTMLElement>('[data-form-status]');
    const formType = form.dataset.form;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (status) {
      status.textContent = formType === 'newsletter'
        ? 'Thank you. You are on the private release list.'
        : 'Thank you. Your inquiry has been prepared for the studio.';
    }

    form.reset();
  });
});
