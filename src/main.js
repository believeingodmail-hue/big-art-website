import { artistProfiles, artworkCategories, artworks, collections, exhibitions } from './content.js';

const menuButton = document.querySelector('[data-menu-button]');
const mobileNav = document.querySelector('[data-mobile-nav]');
const menuIcon = document.querySelector('[data-menu-icon]');
const body = document.body;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const previewThemes = ['ochre', 'onyx', 'ember', 'ivory'];
const roomCopy = {
  Invocation: 'Room I: Invocation — a low-lit entrance where gold marks the first act of belief.',
  Memory: 'Room II: Memory — earthen walls and ember light hold Edo heritage, textile rhythm, and ancestral presence.',
  Revelation: 'Room III: Revelation — a brighter chamber where ash, pearl, and gold open into renewal.',
};

let activeArtwork = artworks.find((artwork) => artwork.featured) ?? artworks[0];
let activeCategory = 'All';

function byId(selector) {
  return document.querySelector(selector);
}

function setMenuState(isOpen) {
  if (!menuButton || !mobileNav || !menuIcon) return;

  menuButton.setAttribute('aria-expanded', String(isOpen));
  mobileNav.hidden = !isOpen;
  menuIcon.textContent = isOpen ? '×' : '☰';
}

function finishLoading() {
  body.classList.remove('is-loading');
}

function observeReveals() {
  const revealTargets = document.querySelectorAll('.reveal');

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
}

function artworkNumber(artwork) {
  const index = artworks.findIndex((item) => item.id === artwork.id) + 1;
  return `${String(index).padStart(2, '0')} / ${String(artworks.length).padStart(2, '0')}`;
}

function collectionFor(artwork) {
  return collections.find((collection) => collection.id === artwork.collectionId) ?? collections[0];
}

function exhibitionNamesFor(artwork) {
  return artwork.exhibitionIds
    .map((id) => exhibitions.find((exhibition) => exhibition.id === id)?.title)
    .filter(Boolean)
    .join(', ');
}

function buildPreview(theme, className) {
  const preview = document.createElement('span');
  preview.className = `${className} ${theme}`;
  preview.innerHTML = '<span></span>';
  return preview;
}

function renderArtistProfile() {
  const artist = artistProfiles[0];
  const artistName = byId('[data-artist-name]');
  const artistRole = byId('[data-artist-role]');
  const artistBio = byId('[data-artist-bio]');
  const artistMetrics = byId('[data-artist-metrics]');

  if (artistName) artistName.textContent = artist.name;
  if (artistRole) artistRole.textContent = artist.role;
  if (artistBio) artistBio.innerHTML = artist.bio.map((paragraph) => `<p>${paragraph}</p>`).join('');
  if (artistMetrics) artistMetrics.innerHTML = artist.focusAreas.map((focus) => `<span>${focus}</span>`).join('');
}

function renderCollections() {
  const primaryCollection = collections[0];
  const collectionTitle = byId('[data-collection-title]');
  const collectionSubtitle = byId('[data-collection-subtitle]');
  const collectionDescription = byId('[data-collection-description]');
  const collectionPrinciples = byId('[data-collection-principles]');
  const collectionList = byId('[data-collection-list]');

  if (collectionTitle) collectionTitle.textContent = primaryCollection.title;
  if (collectionSubtitle) collectionSubtitle.textContent = primaryCollection.subtitle;
  if (collectionDescription) collectionDescription.textContent = primaryCollection.description;
  if (collectionPrinciples) {
    collectionPrinciples.innerHTML = primaryCollection.principles
      .map((principle) => `<div class="principle"><span></span><strong>${principle.title}</strong><small>${principle.note}</small></div>`)
      .join('');
  }
  if (collectionList) {
    collectionList.innerHTML = collections.map(renderCollectionCard).join('');
  }
}

function renderCollectionCard(collection) {
  const count = artworks.filter((artwork) => artwork.collectionId === collection.id).length;
  return `
    <article class="management-card">
      <p class="section-kicker">${collection.subtitle}</p>
      <h3>${collection.title}</h3>
      <p>${collection.description}</p>
      <div class="mini-meta"><span>${collection.years}</span><span>${collection.status}</span><span>${count} artwork${count === 1 ? '' : 's'}</span></div>
    </article>
  `;
}

function selectArtwork(artwork) {
  activeArtwork = artwork;

  const featuredPreview = byId('[data-featured-preview]');
  const artworkTitle = byId('[data-artwork-title]');
  const artworkDescription = byId('[data-artwork-description]');
  const artworkNumberElement = byId('[data-artwork-number]');
  const artworkMeta = byId('[data-artwork-featured-meta]');
  const artworkCards = document.querySelectorAll('[data-artwork-card]');

  artworkCards.forEach((artworkCard) => artworkCard.classList.toggle('is-active', artworkCard.dataset.artworkId === artwork.id));

  if (artworkTitle) artworkTitle.textContent = artwork.title;
  if (artworkDescription) artworkDescription.textContent = artwork.shortDescription;
  if (artworkNumberElement) artworkNumberElement.textContent = artworkNumber(artwork);
  if (artworkMeta) artworkMeta.textContent = `${artwork.medium} / ${artwork.year} / ${artwork.status}`;
  if (featuredPreview) {
    featuredPreview.classList.remove(...previewThemes);
    featuredPreview.classList.add(artwork.preview);
  }
}

function filteredArtworks() {
  const searchTerm = byId('[data-artwork-search]')?.value.trim().toLowerCase() ?? '';

  return artworks.filter((artwork) => {
    const matchesCategory = activeCategory === 'All' || artwork.category === activeCategory;
    const haystack = [
      artwork.title,
      artwork.medium,
      artwork.year,
      artwork.status,
      artwork.category,
      artwork.shortDescription,
      artwork.detail,
      collectionFor(artwork).title,
      exhibitionNamesFor(artwork),
      ...artwork.keywords,
    ]
      .join(' ')
      .toLowerCase();

    return matchesCategory && haystack.includes(searchTerm);
  });
}

function renderArtworkFilters() {
  const categoryFilters = byId('[data-artwork-categories]');
  if (!categoryFilters) return;

  categoryFilters.innerHTML = artworkCategories
    .map(
      (category) =>
        `<button class="category-pill${category === activeCategory ? ' is-active' : ''}" type="button" data-category-filter="${category}" aria-pressed="${category === activeCategory}">${category}</button>`,
    )
    .join('');

  categoryFilters.querySelectorAll('[data-category-filter]').forEach((button) => {
    button.addEventListener('click', () => {
      activeCategory = button.dataset.categoryFilter ?? 'All';
      renderArtworks();
    });
  });
}

function renderArtworks() {
  renderArtworkFilters();
  const artGrid = byId('[data-artwork-grid]');
  const resultCount = byId('[data-result-count]');
  if (!artGrid) return;

  const results = filteredArtworks();
  if (resultCount) resultCount.textContent = `${results.length} artwork${results.length === 1 ? '' : 's'} shown`;

  artGrid.innerHTML = results
    .map((artwork) => {
      const collection = collectionFor(artwork);
      return `
        <button class="art-card reveal${artwork.id === activeArtwork.id ? ' is-active' : ''}" type="button" role="listitem" data-artwork-card data-artwork-id="${artwork.id}">
          ${buildPreview(artwork.preview, 'art-preview').outerHTML}
          <span class="art-meta"><strong>${artwork.title}</strong><small>${artwork.medium} / ${artwork.year}</small><small>${collection.title} · ${artwork.category}</small></span>
        </button>
      `;
    })
    .join('');

  if (!results.includes(activeArtwork) && results[0]) selectArtwork(results[0]);

  artGrid.querySelectorAll('[data-artwork-card]').forEach((card) => {
    const artwork = artworks.find((item) => item.id === card.dataset.artworkId);
    if (!artwork) return;

    card.addEventListener('click', () => {
      selectArtwork(artwork);
      openArtworkDialog(artwork);
    });
    card.addEventListener('pointerenter', () => {
      if (!prefersReducedMotion) selectArtwork(artwork);
    });
  });

  observeReveals();
}

function populateDialog(artwork) {
  const dialogPreview = byId('[data-dialog-preview]');
  const dialogTitle = byId('[data-dialog-title]');
  const dialogNumber = byId('[data-dialog-number]');
  const dialogMedium = byId('[data-dialog-medium]');
  const dialogYear = byId('[data-dialog-year]');
  const dialogScale = byId('[data-dialog-scale]');
  const dialogCategory = byId('[data-dialog-category]');
  const dialogCollection = byId('[data-dialog-collection]');
  const dialogStatus = byId('[data-dialog-status]');
  const dialogDetail = byId('[data-dialog-detail]');
  const dialogProvenance = byId('[data-dialog-provenance]');
  const dialogInquire = byId('[data-dialog-inquire]');

  if (dialogTitle) dialogTitle.textContent = artwork.title;
  if (dialogNumber) dialogNumber.textContent = artworkNumber(artwork);
  if (dialogMedium) dialogMedium.textContent = artwork.medium;
  if (dialogYear) dialogYear.textContent = artwork.year;
  if (dialogScale) dialogScale.textContent = artwork.scale;
  if (dialogCategory) dialogCategory.textContent = artwork.category;
  if (dialogCollection) dialogCollection.textContent = collectionFor(artwork).title;
  if (dialogStatus) dialogStatus.textContent = `${artwork.status} · ${artwork.priceNote}`;
  if (dialogDetail) dialogDetail.textContent = artwork.detail;
  if (dialogProvenance) dialogProvenance.textContent = artwork.provenance;
  if (dialogPreview) {
    dialogPreview.classList.remove(...previewThemes);
    dialogPreview.classList.add(artwork.preview);
  }
  if (dialogInquire) {
    dialogInquire.href = `#inquiry`;
    dialogInquire.setAttribute('aria-label', `Inquire about ${artwork.title}`);
  }
}

function openArtworkDialog(artwork) {
  const artworkDialog = byId('[data-artwork-dialog]');
  populateDialog(artwork);

  if (artworkDialog?.showModal) {
    artworkDialog.showModal();
  }
}

function renderFeaturedArtwork() {
  const featuredArtwork = artworks.find((artwork) => artwork.featured) ?? artworks[0];
  selectArtwork(featuredArtwork);
}

function renderExhibitions() {
  const exhibitionList = byId('[data-exhibition-list]');
  if (!exhibitionList) return;

  exhibitionList.innerHTML = exhibitions
    .map((exhibition) => {
      const artworkCount = exhibition.artworkIds.length;
      return `
        <article class="management-card exhibition-card" data-exhibition-card data-room="${exhibition.room}">
          <p class="section-kicker">${exhibition.status}</p>
          <h3>${exhibition.title}</h3>
          <p>${exhibition.description}</p>
          <div class="mini-meta"><span>${exhibition.date}</span><span>${exhibition.venue}</span><span>${artworkCount} linked work${artworkCount === 1 ? '' : 's'}</span></div>
        </article>
      `;
    })
    .join('');
}

function renderTimeline() {
  const timeline = byId('[data-timeline-list]');
  if (!timeline) return;

  const collectionItems = collections.map((collection) => ({
    date: collection.years,
    title: collection.title,
    copy: `${collection.status}. ${artworks.filter((artwork) => artwork.collectionId === collection.id).length} managed artwork records.`,
  }));
  const exhibitionItems = exhibitions.map((exhibition) => ({
    date: exhibition.date,
    title: exhibition.title,
    copy: `${exhibition.status} — ${exhibition.venue}.`,
  }));

  timeline.innerHTML = [...collectionItems, ...exhibitionItems]
    .map((item) => `<li><time>${item.date}</time><strong>${item.title}</strong><span>${item.copy}</span></li>`)
    .join('');
}

function setupRoomTabs() {
  const roomTabs = document.querySelectorAll('[data-room-tab]');
  const galleryRoom = byId('[data-gallery-room]');
  const roomCaption = byId('[data-room-caption]');

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
}

function validateEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

function setFieldError(form, fieldName, message) {
  const field = form.elements.namedItem(fieldName);
  const error = form.querySelector(`[data-field-error="${fieldName}"]`);

  if (field) {
    field.classList.toggle('is-invalid', Boolean(message));
    field.setAttribute('aria-invalid', String(Boolean(message)));
  }

  if (error) error.textContent = message;
}

function validateForm(form) {
  const formType = form.dataset.form;
  const formData = new FormData(form);
  const errors = {};
  const email = String(formData.get('email') ?? '').trim();

  if (!email) errors.email = 'Please enter an email address.';
  else if (!validateEmail(email)) errors.email = 'Please enter a valid email address.';

  if (formType === 'collector') {
    const name = String(formData.get('name') ?? '').trim();
    const interest = String(formData.get('interest') ?? '').trim();
    const message = String(formData.get('message') ?? '').trim();

    if (name.length < 2) errors.name = 'Please enter your name.';
    if (!interest) errors.interest = 'Please choose an inquiry type.';
    if (message.length < 20) errors.message = 'Please share at least 20 characters so the gallery can respond well.';
  }

  ['name', 'email', 'interest', 'message'].forEach((fieldName) => setFieldError(form, fieldName, errors[fieldName] ?? ''));
  return errors;
}

function setupForms() {
  const forms = document.querySelectorAll('[data-form]');
  forms.forEach((form) => {
    form.addEventListener('input', () => validateForm(form));
    form.addEventListener('change', () => validateForm(form));
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const status = form.querySelector('[data-form-status]');
      const formType = form.dataset.form;
      const errors = validateForm(form);
      const firstInvalidName = Object.keys(errors)[0];

      if (firstInvalidName) {
        const firstInvalidField = form.elements.namedItem(firstInvalidName);
        if (status) status.textContent = 'Please correct the highlighted fields before sending.';
        firstInvalidField?.focus();
        return;
      }

      if (status) {
        status.textContent =
          formType === 'newsletter'
            ? 'Thank you. You are on the private release list.'
            : 'Thank you. Your inquiry has been prepared for the gallery.';
      }

      form.reset();
      ['name', 'email', 'interest', 'message'].forEach((fieldName) => setFieldError(form, fieldName, ''));
    });
  });
}

function setupAnalyticsPlaceholder() {
  const configuredId = window.BIG_GA_MEASUREMENT_ID || document.querySelector('meta[name="google-analytics-id"]')?.content;
  if (!configuredId || configuredId === 'G-XXXXXXXXXX') return;

  const analyticsScript = document.createElement('script');
  analyticsScript.async = true;
  analyticsScript.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(configuredId)}`;
  document.head.append(analyticsScript);

  window.dataLayer = window.dataLayer || [];
  window.gtag = (...args) => window.dataLayer?.push(args);
  window.gtag('js', new Date());
  window.gtag('config', configuredId, { anonymize_ip: true });
}

function setupEvents() {
  menuButton?.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    setMenuState(!isOpen);
  });

  mobileNav?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenuState(false));
  });

  byId('[data-open-active-artwork]')?.addEventListener('click', () => openArtworkDialog(activeArtwork));
  byId('[data-dialog-close]')?.addEventListener('click', () => byId('[data-artwork-dialog]')?.close());
  byId('[data-artwork-dialog]')?.addEventListener('click', (event) => {
    if (event.target === byId('[data-artwork-dialog]')) byId('[data-artwork-dialog]')?.close();
  });
  byId('[data-dialog-inquire]')?.addEventListener('click', () => byId('[data-artwork-dialog]')?.close());
  byId('[data-artwork-search]')?.addEventListener('input', renderArtworks);
}

function init() {
  renderArtistProfile();
  renderCollections();
  renderFeaturedArtwork();
  renderArtworks();
  renderExhibitions();
  renderTimeline();
  setupRoomTabs();
  setupForms();
  setupAnalyticsPlaceholder();
  setupEvents();
  observeReveals();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.setTimeout(finishLoading, 420), { once: true });
  } else {
    window.setTimeout(finishLoading, 420);
  }

  window.setTimeout(finishLoading, 1800);
}

init();
