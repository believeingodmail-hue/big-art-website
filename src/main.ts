import { artistProfiles, artworkCategories, artworks, collections, exhibitions, type Artwork, type Collection, type Exhibition } from './content';

const menuButton = document.querySelector<HTMLButtonElement>('[data-menu-button]');
const mobileNav = document.querySelector<HTMLElement>('[data-mobile-nav]');
const menuIcon = document.querySelector<HTMLElement>('[data-menu-icon]');
const body = document.body;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const previewThemes = ['ochre', 'onyx', 'ember', 'ivory'];
const roomCopy: Record<string, string> = {
  Invocation: 'Room I: Invocation — a low-lit entrance where gold marks the first act of belief.',
  Memory: 'Room II: Memory — earthen walls and ember light hold Edo heritage, textile rhythm, and ancestral presence.',
  Revelation: 'Room III: Revelation — a brighter chamber where ash, pearl, and gold open into renewal.',
};

let activeArtwork = artworks.find((artwork) => artwork.featured) ?? artworks[0];
let activeCategory = 'All';

function byId<T extends HTMLElement>(selector: string) {
  return document.querySelector<T>(selector);
}

function setMenuState(isOpen: boolean) {
  if (!menuButton || !mobileNav || !menuIcon) return;

  menuButton.setAttribute('aria-expanded', String(isOpen));
  mobileNav.hidden = !isOpen;
  menuIcon.textContent = isOpen ? '×' : '☰';
}

function finishLoading() {
  body.classList.remove('is-loading');
}

function observeReveals() {
  const revealTargets = document.querySelectorAll<HTMLElement>('.reveal');

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

function artworkNumber(artwork: Artwork) {
  const index = artworks.findIndex((item) => item.id === artwork.id) + 1;
  return `${String(index).padStart(2, '0')} / ${String(artworks.length).padStart(2, '0')}`;
}

function collectionFor(artwork: Artwork) {
  return collections.find((collection) => collection.id === artwork.collectionId) ?? collections[0];
}

function exhibitionNamesFor(artwork: Artwork) {
  return artwork.exhibitionIds
    .map((id) => exhibitions.find((exhibition) => exhibition.id === id)?.title)
    .filter(Boolean)
    .join(', ');
}

function buildPreview(theme: Artwork['preview'], className: string) {
  const preview = document.createElement('span');
  preview.className = `${className} ${theme}`;
  preview.innerHTML = '<span></span>';
  return preview;
}

function renderArtistProfile() {
  const artist = artistProfiles[0];
  const artistName = byId<HTMLElement>('[data-artist-name]');
  const artistRole = byId<HTMLElement>('[data-artist-role]');
  const artistBio = byId<HTMLElement>('[data-artist-bio]');
  const artistMetrics = byId<HTMLElement>('[data-artist-metrics]');

  if (artistName) artistName.textContent = artist.name;
  if (artistRole) artistRole.textContent = artist.role;
  if (artistBio) artistBio.innerHTML = artist.bio.map((paragraph) => `<p>${paragraph}</p>`).join('');
  if (artistMetrics) artistMetrics.innerHTML = artist.focusAreas.map((focus) => `<span>${focus}</span>`).join('');
}

function renderCollections() {
  const primaryCollection = collections[0];
  const collectionTitle = byId<HTMLElement>('[data-collection-title]');
  const collectionSubtitle = byId<HTMLElement>('[data-collection-subtitle]');
  const collectionDescription = byId<HTMLElement>('[data-collection-description]');
  const collectionPrinciples = byId<HTMLElement>('[data-collection-principles]');
  const collectionList = byId<HTMLElement>('[data-collection-list]');

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

function renderCollectionCard(collection: Collection) {
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

function selectArtwork(artwork: Artwork) {
  activeArtwork = artwork;

  const featuredPreview = byId<HTMLElement>('[data-featured-preview]');
  const artworkTitle = byId<HTMLElement>('[data-artwork-title]');
  const artworkDescription = byId<HTMLElement>('[data-artwork-description]');
  const artworkNumberElement = byId<HTMLElement>('[data-artwork-number]');
  const artworkMeta = byId<HTMLElement>('[data-artwork-featured-meta]');
  const artworkCards = document.querySelectorAll<HTMLButtonElement>('[data-artwork-card]');

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
  const searchTerm = byId<HTMLInputElement>('[data-artwork-search]')?.value.trim().toLowerCase() ?? '';

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
  const categoryFilters = byId<HTMLElement>('[data-artwork-categories]');
  if (!categoryFilters) return;

  categoryFilters.innerHTML = artworkCategories
    .map(
      (category) =>
        `<button class="category-pill${category === activeCategory ? ' is-active' : ''}" type="button" data-category-filter="${category}" aria-pressed="${category === activeCategory}">${category}</button>`,
    )
    .join('');

  categoryFilters.querySelectorAll<HTMLButtonElement>('[data-category-filter]').forEach((button) => {
    button.addEventListener('click', () => {
      activeCategory = button.dataset.categoryFilter ?? 'All';
      renderArtworks();
    });
  });
}

function renderArtworks() {
  renderArtworkFilters();
  const artGrid = byId<HTMLElement>('[data-artwork-grid]');
  const resultCount = byId<HTMLElement>('[data-result-count]');
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

  artGrid.querySelectorAll<HTMLButtonElement>('[data-artwork-card]').forEach((card) => {
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

function populateDialog(artwork: Artwork) {
  const dialogPreview = byId<HTMLElement>('[data-dialog-preview]');
  const dialogTitle = byId<HTMLElement>('[data-dialog-title]');
  const dialogNumber = byId<HTMLElement>('[data-dialog-number]');
  const dialogMedium = byId<HTMLElement>('[data-dialog-medium]');
  const dialogYear = byId<HTMLElement>('[data-dialog-year]');
  const dialogScale = byId<HTMLElement>('[data-dialog-scale]');
  const dialogCategory = byId<HTMLElement>('[data-dialog-category]');
  const dialogCollection = byId<HTMLElement>('[data-dialog-collection]');
  const dialogStatus = byId<HTMLElement>('[data-dialog-status]');
  const dialogDetail = byId<HTMLElement>('[data-dialog-detail]');
  const dialogProvenance = byId<HTMLElement>('[data-dialog-provenance]');
  const dialogInquire = byId<HTMLAnchorElement>('[data-dialog-inquire]');

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

function openArtworkDialog(artwork: Artwork) {
  const artworkDialog = byId<HTMLDialogElement>('[data-artwork-dialog]');
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
  const exhibitionList = byId<HTMLElement>('[data-exhibition-list]');
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
  const timeline = byId<HTMLElement>('[data-timeline-list]');
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
  const roomTabs = document.querySelectorAll<HTMLButtonElement>('[data-room-tab]');
  const galleryRoom = byId<HTMLElement>('[data-gallery-room]');
  const roomCaption = byId<HTMLElement>('[data-room-caption]');

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

function setupForms() {
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
        status.textContent =
          formType === 'newsletter'
            ? 'Thank you. You are on the private release list.'
            : 'Thank you. Your inquiry has been prepared for the studio.';
      }

      form.reset();
    });
  });
}

function setupEvents() {
  menuButton?.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    setMenuState(!isOpen);
  });

  mobileNav?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenuState(false));
  });

  byId<HTMLButtonElement>('[data-open-active-artwork]')?.addEventListener('click', () => openArtworkDialog(activeArtwork));
  byId<HTMLButtonElement>('[data-dialog-close]')?.addEventListener('click', () => byId<HTMLDialogElement>('[data-artwork-dialog]')?.close());
  byId<HTMLDialogElement>('[data-artwork-dialog]')?.addEventListener('click', (event) => {
    if (event.target === byId<HTMLDialogElement>('[data-artwork-dialog]')) byId<HTMLDialogElement>('[data-artwork-dialog]')?.close();
  });
  byId<HTMLAnchorElement>('[data-dialog-inquire]')?.addEventListener('click', () => byId<HTMLDialogElement>('[data-artwork-dialog]')?.close());
  byId<HTMLInputElement>('[data-artwork-search]')?.addEventListener('input', renderArtworks);
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
