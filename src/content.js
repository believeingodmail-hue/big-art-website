export const artistProfiles = [
  {
    id: 'izoduwa-precious',
    name: 'Izoduwa Precious',
    role: 'Founder Artist / B.I.G Art Collections',
    location: 'Nigeria / Global collector viewing room',
    bio: [
      'Izoduwa Precious is the visionary artist behind B.I.G Art Collections and the BelieveinGOD Collection. The practice moves between devotion, African contemporary abstraction, spiritual portraiture, and the material intelligence of earth, cloth, ash, metal, and light.',
      'Precious approaches art as testimony: a disciplined act of remembering God, honoring ancestry, and creating objects that can live with emotional permanence in homes, galleries, museums, and contemplative interiors.',
    ],
    focusAreas: ['Spiritual abstraction', 'Edo ancestral memory', 'Luxury sacred minimalism'],
  },
];

export const collections = [
  {
    id: 'believeingod',
    title: 'BelieveinGOD Collection',
    subtitle: 'Dedicated Collection Page',
    years: '2025–2026',
    status: 'Global viewing room open',
    description:
      'A devotional body of work built as a sanctuary: quiet enough for prayer, refined enough for international collectors, and rooted enough to carry ancestral presence. Every public artwork record on this site belongs to the BelieveinGOD Collection.',
    principles: [
      { title: 'Faith', note: 'Prayer as visual structure' },
      { title: 'Memory', note: 'Edo histories held in texture' },
      { title: 'Light', note: 'Gold as sacred illumination' },
      { title: 'Silence', note: 'Negative space as reverence' },
    ],
  },
];

export const artworkCategories = ['All', 'Gold Leaf', 'Mixed Media', 'Textile', 'Oil + Ash'];

export const artworks = [
  {
    id: 'covenant-in-gold',
    title: 'Covenant in Gold',
    artistId: 'izoduwa-precious',
    collectionId: 'believeingod',
    exhibitionIds: ['sanctuary-online-2026', 'private-viewing-room-2026'],
    category: 'Gold Leaf',
    medium: 'Acrylic, mineral pigment, gold leaf',
    year: '2026',
    scale: '120 × 160 cm',
    status: 'Available',
    priceNote: 'Price and availability on request',
    preview: 'ochre',
    shortDescription: 'A radiant meditation on protection, promise, and divine presence.',
    detail:
      'A ceremonial field of ochre and gold that frames belief as shelter. The work is designed for collectors seeking warmth, reverence, and a luminous spiritual anchor.',
    provenance: 'B.I.G Art Collections archive, 2026.',
    keywords: ['faith', 'gold', 'protection', 'spiritual abstraction', 'featured'],
    featured: true,
  },
  {
    id: 'psalm-of-the-ancestors',
    title: 'Psalm of the Ancestors',
    artistId: 'izoduwa-precious',
    collectionId: 'believeingod',
    exhibitionIds: ['memory-room-2026'],
    category: 'Textile',
    medium: 'Textile, charcoal, oil',
    year: '2025',
    scale: '140 × 180 cm',
    status: 'Available',
    priceNote: 'Price and availability on request',
    preview: 'ember',
    shortDescription: 'Earthen rhythm, inherited prayer, and memory composed as contemporary ritual.',
    detail:
      'Textile and charcoal become a remembered song. The surface evokes Edo earth, oral history, and the dignity of those whose names continue to guide the present.',
    provenance: 'BelieveinGOD Collection memory room edit, 2026.',
    keywords: ['ancestry', 'Edo', 'textile', 'memory'],
  },
  {
    id: 'believeingod-first-light',
    title: 'BelieveinGOD First Light',
    artistId: 'izoduwa-precious',
    collectionId: 'believeingod',
    exhibitionIds: ['sanctuary-online-2026'],
    category: 'Oil + Ash',
    medium: 'Oil, ash, metallic wash',
    year: '2025',
    scale: '90 × 130 cm',
    status: 'Private Collection',
    priceNote: 'Not currently available',
    preview: 'ivory',
    shortDescription: 'A work about surrendering darkness into the first visible light.',
    detail:
      "First Light holds a narrow opening in a field of ash and pearl. It is the collection's visual prayer for renewal, courage, and divine arrival.",
    provenance: 'Private BelieveinGOD Collection placement, 2025.',
    keywords: ['light', 'ash', 'renewal', 'prayer'],
  },
  {
    id: 'veil-before-dawn',
    title: 'Veil Before Dawn',
    artistId: 'izoduwa-precious',
    collectionId: 'believeingod',
    exhibitionIds: ['private-viewing-room-2026'],
    category: 'Mixed Media',
    medium: 'Charcoal, ash, acrylic',
    year: '2026',
    scale: '60 × 80 cm',
    status: 'Available',
    priceNote: 'Price and availability on request',
    preview: 'onyx',
    shortDescription: 'An intimate devotional work held between shadow, breath, and emerging light.',
    detail:
      'Veil Before Dawn keeps the scale intimate while preserving the collection language of restraint, shadow, and emerging light.',
    provenance: 'B.I.G Art Collections archive, 2026.',
    keywords: ['charcoal', 'ash', 'intimate scale', 'devotional'],
  },
];

export const exhibitions = [
  {
    id: 'sanctuary-online-2026',
    title: 'BelieveinGOD Sanctuary Online',
    date: '2026',
    status: 'Current digital exhibition',
    venue: 'B.I.G Art Collections virtual gallery',
    room: 'Invocation',
    description:
      'A cinematic online presentation staged for collectors, curators, and institutions. The room opens with gold, shadow, and a devotional sense of arrival.',
    artworkIds: ['covenant-in-gold', 'believeingod-first-light'],
  },
  {
    id: 'memory-room-2026',
    title: 'Room II: Memory',
    date: '2026',
    status: 'Curatorial edit',
    venue: 'Private viewing room',
    room: 'Memory',
    description:
      'A focused exhibition edit for Edo heritage, ancestral memory, textile rhythm, and the emotional weight of inherited names.',
    artworkIds: ['psalm-of-the-ancestors'],
  },
  {
    id: 'private-viewing-room-2026',
    title: 'Private Collector Viewing Room',
    date: '2026',
    status: 'By appointment',
    venue: 'Online / collector correspondence',
    room: 'Revelation',
    description:
      'A flexible exhibition management record for availability lists, collector previews, commission conversations, and institutional outreach.',
    artworkIds: ['covenant-in-gold', 'veil-before-dawn'],
  },
];
