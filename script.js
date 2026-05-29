const categoryContexts = {
  'Bible-Based Art':
    'Bible-Based Art reflects Scripture not as doctrine, but as lived experience — moments of mercy, obedience, silence, and belief translated into form.',
  'Tradition and Bronze':
    'Tradition and Bronze honor ancestral memory and spiritual continuity. Through enduring materials and virtual exhibits of historical masterpieces, these works hold ritual, identity, and time — reminding us that faith is carried, not invented, and that cultural treasures belong in their homeland.',
  'Abstract Thought and Painting':
    'Abstract Thought and Painting move inward. Here, color, space, and texture become language for inner struggle, prayer, and revelation — where belief exists beyond structure and meaning is felt before it is understood.',
};

const artworks = {
  'mercy-frame': {
    title: 'Mercy Frame',
    image: 'assets/mercy-frame.jpg',
    category: 'Bible-Based Art',
    medium: 'Painting',
    context: categoryContexts['Bible-Based Art'],
    verse: '“Blessed are the merciful: for they shall obtain mercy.” — Matthew 5:7',
  },
  'the-call-of-the-faithful': {
    title: 'The Call of the Faithful',
    image: 'assets/the-call-of-the-faithful.png',
    category: 'Bible-Based Art',
    medium: 'Painting',
    context: categoryContexts['Bible-Based Art'],
    verse: '“Many are called, but few are chosen.” — Matthew 22:14',
  },
  'days-of-pentecost': {
    title: 'Days of Pentecost',
    image: 'assets/pentecost.jpg',
    category: 'Bible-Based Art',
    medium: 'Painting',
    context: categoryContexts['Bible-Based Art'],
    verse: '“And they were all filled with the Holy Ghost.” — Acts 2:4',
  },
  'oba-esigie': {
    title: 'Oba Esigie',
    image: 'assets/oba-esigie-bronze.jpg',
    category: 'Tradition and Bronze',
    medium: 'Bronze / virtual heritage exhibit',
    context: categoryContexts['Tradition and Bronze'],
  },
  'olokun-drum': {
    title: 'Olokun Drum',
    image: 'assets/Olokun_Drum.jpg',
    category: 'Tradition and Bronze',
    medium: 'Bronze / virtual heritage exhibit',
    context: categoryContexts['Tradition and Bronze'],
  },
  'bronze-ekpen': {
    title: 'Bronze Ekpen',
    image: 'assets/Bronze_Ekpen.jpg',
    category: 'Tradition and Bronze',
    medium: 'Bronze / virtual heritage exhibit',
    context: categoryContexts['Tradition and Bronze'],
  },
  'eve-before-the-knowing': {
    title: 'Eve Before the Knowing',
    image: 'assets/eve-before-knowing.jpg',
    category: 'Abstract Thought and Painting',
    medium: 'Painting',
    context: categoryContexts['Abstract Thought and Painting'],
    verse: '“And the eyes of them both were opened.” — Genesis 3:7',
  },
  'one-with-god': {
    title: 'One with GOD',
    image: 'assets/one-with-god.jpg',
    category: 'Abstract Thought and Painting',
    medium: 'Painting',
    context: categoryContexts['Abstract Thought and Painting'],
    verse: '“I and my Father are one.” — John 10:30',
  },
  'garden-of-crows': {
    title: 'Garden of Crows',
    image: 'assets/garden-of-crows.jpg',
    category: 'Abstract Thought and Painting',
    medium: 'Painting',
    context: categoryContexts['Abstract Thought and Painting'],
  },
  blessing: {
    title: 'Blessing',
    image: 'assets/blessing.png',
    category: 'Abstract Thought and Painting',
    medium: 'Painting',
    context: categoryContexts['Abstract Thought and Painting'],
    verse: '“The blessing of the LORD, it maketh rich, and he addeth no sorrow with it.” — Proverbs 10:22',
  },
  'queen-iden': {
    title: 'Queen Iden',
    image: 'assets/Queen_Iden.jpg',
    category: 'Abstract Thought and Painting',
    medium: 'Painting',
    context: categoryContexts['Abstract Thought and Painting'],
  },
  'the-dream-we-carry': {
    title: 'The Dream We Carry',
    image: 'assets/the-dream-we-carry.png',
    category: 'Abstract Thought and Painting',
    medium: 'Painting',
    context: categoryContexts['Abstract Thought and Painting'],
  },
  'trance-of-supplication': {
    title: 'Trance of Supplication',
    image: 'assets/trance-of-supplication.jpg',
    category: 'Abstract Thought and Painting',
    medium: 'Painting',
    context: categoryContexts['Abstract Thought and Painting'],
  },
  'she-who-calls-the-ancestors': {
    title: 'She Who Calls the Ancestors',
    image: 'assets/she-who-calls-the-ancestors.png',
    category: 'Abstract Thought and Painting',
    medium: 'Conceptual painting',
    context: categoryContexts['Abstract Thought and Painting'],
  },
};

const header = document.querySelector('[data-header]');
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');
const year = document.querySelector('[data-year]');
const modal = document.querySelector('[data-artwork-modal]');
const modalTitle = document.querySelector('[data-modal-title]');
const modalCategory = document.querySelector('[data-modal-category]');
const modalImage = document.querySelector('[data-modal-image]');
const modalMeta = document.querySelector('[data-modal-meta]');
const modalStatement = document.querySelector('[data-modal-statement]');
const modalStatementWrap = document.querySelector('[data-modal-statement-wrap]');
const modalContext = document.querySelector('[data-modal-context]');
const modalContextWrap = document.querySelector('[data-modal-context-wrap]');
const modalVerse = document.querySelector('[data-modal-verse]');
const modalVerseWrap = document.querySelector('[data-modal-verse-wrap]');
const modalRequest = document.querySelector('[data-modal-request]');
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

const setBlock = (wrap, target, value) => {
  if (!wrap || !target) return;
  wrap.hidden = !value;
  target.textContent = value || '';
};

const renderMeta = (artwork) => {
  if (!modalMeta) return;
  const rows = [
    ['Body of work', artwork.category],
    ['Medium', artwork.medium],
  ].filter(([, value]) => Boolean(value));

  modalMeta.innerHTML = rows.map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`).join('');
};

const openModal = (artworkId) => {
  const artwork = artworks[artworkId];
  if (!artwork || !modal || !modalTitle || !modalCategory || !modalImage) return;

  lastFocusedElement = document.activeElement;
  modalTitle.textContent = artwork.title;
  modalCategory.textContent = `${artwork.category} / BelieveinGOD Collection`;
  modalImage.src = artwork.image;
  modalImage.alt = artwork.title;
  renderMeta(artwork);
  setBlock(modalStatementWrap, modalStatement, artwork.statement);
  setBlock(modalContextWrap, modalContext, artwork.context);
  setBlock(modalVerseWrap, modalVerse, artwork.verse);

  if (modalRequest) {
    const subject = encodeURIComponent(`Viewing Request / ${artwork.title}`);
    modalRequest.href = `mailto:connect@izoduwa.gallery?subject=${subject}`;
  }

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

document.querySelectorAll('[data-artwork-id]').forEach((card) => {
  card.addEventListener('click', () => openModal(card.dataset.artworkId));
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
