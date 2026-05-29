export type ArtworkStatus = 'Available' | 'Reserved' | 'Sold' | 'Private Collection';

export interface Artwork {
  id: string;
  title: string;
  artistId: string;
  collectionId: string;
  exhibitionIds: string[];
  category: string;
  medium: string;
  year: string;
  scale: string;
  status: ArtworkStatus;
  priceNote: string;
  preview: 'ochre' | 'onyx' | 'ember' | 'ivory';
  shortDescription: string;
  detail: string;
  provenance: string;
  keywords: string[];
  featured?: boolean;
}

export interface Collection {
  id: string;
  title: string;
  subtitle: string;
  years: string;
  status: string;
  description: string;
  principles: Array<{ title: string; note: string }>;
}

export interface Exhibition {
  id: string;
  title: string;
  date: string;
  status: string;
  venue: string;
  room: 'Invocation' | 'Memory' | 'Revelation';
  description: string;
  artworkIds: string[];
}

export interface ArtistProfile {
  id: string;
  name: string;
  role: string;
  bio: string[];
  focusAreas: string[];
  location: string;
}

export const artistProfiles: ArtistProfile[] = [
  {
    id: 'izoduwa-precious',
    name: 'Izoduwa Precious',
    role: 'Edo Heritage Artist / Founder of B.I.G Art Collections',
    location: 'Benin City, Edo State, Nigeria / Global collector viewing room',
    bio: [
      'Izoduwa Precious is an Edo heritage artist from Benin City, Nigeria, and the founder of B.I.G Art Collections. His practice is anchored in the BelieveinGOD Collection, a spiritually charged body of contemporary African art that considers faith, ancestral memory, silence, identity, and sacred storytelling as living materials.',
      'Working across mixed media, pigment, ash, textile, metallic leaf, and ceremonial abstraction, Precious treats the artwork as a site of encounter: a contemplative threshold where inherited Edo memory meets personal devotion and contemporary visual intelligence. His surfaces often appear quiet at first, then reveal marks that suggest prayer, oral history, spiritual discipline, and the dignity of names carried across generations.',
      'Through B.I.G Art Collections, Precious builds a museum-quality language for collectors, curators, galleries, and cultural institutions interested in African contemporary art with spiritual depth. The practice does not separate beauty from belief; it frames beauty as a form of witness, a vessel for cultural continuity, and a refined invitation to reflection.',
    ],
    focusAreas: ['Faith and sacred reflection', 'Edo ancestral memory', 'Contemporary African art', 'Identity and heritage', 'Silence as spiritual architecture'],
  },
];

export const collections: Collection[] = [
  {
    id: 'believeingod',
    title: 'BelieveinGOD Collection',
    subtitle: 'Dedicated Collection Page',
    years: '2025–2026',
    status: 'Global viewing room open',
    description:
      'The BelieveinGOD Collection is the foundation of B.I.G Art Collections: a devotional, intellectually serious body of contemporary African art by Izoduwa Precious. Rooted in Edo heritage and spiritual reflection, the collection presents faith as a visual structure, silence as a sacred space, and ancestral memory as a living force within the present. Each work is conceived for contemplative interiors, galleries, museums, private collections, and cultural institutions seeking art with presence, discipline, and enduring meaning.',
    principles: [
      { title: 'Faith', note: 'Belief rendered as structure, light, restraint, and testimony' },
      { title: 'Memory', note: 'Edo histories and ancestral presence held in layered material' },
      { title: 'Silence', note: 'Negative space shaped as reverence, listening, and spiritual pause' },
      { title: 'Identity', note: 'Heritage, selfhood, and sacred storytelling carried into contemporary form' },
    ],
  },
  {
    id: 'first-light-studies',
    title: 'First Light Studies',
    subtitle: 'Study Archive',
    years: '2025',
    status: 'Archive available by request',
    description:
      'A private study archive of ash, pearl, shadow, and gold that informed the earliest language of the BelieveinGOD Collection. These works remain available for curatorial context, process research, and selected collector conversations.',
    principles: [
      { title: 'Study', note: 'Material tests and prayer marks' },
      { title: 'Threshold', note: 'Small works for future large-format pieces' },
    ],
  },
];

export const artworkCategories = ['All', 'Gold Leaf', 'Mixed Media', 'Textile', 'Oil + Ash', 'Charcoal', 'Ceremonial Study'];

export const artworks: Artwork[] = [
  {
    id: 'covenant-in-gold',
    title: 'Covenant in Gold',
    artistId: 'izoduwa-precious',
    collectionId: 'believeingod',
    exhibitionIds: ['sanctuary-online-2026', 'private-viewing-room-2026'],
    category: 'Gold Leaf',
    medium: 'Acrylic, mineral pigment, gold leaf, and archival ground on canvas',
    year: '2026',
    scale: '120 × 160 cm',
    status: 'Available',
    priceNote: 'Price and availability on request',
    preview: 'ochre',
    shortDescription: 'A radiant meditation on protection, promise, and divine presence.',
    detail:
      'Covenant in Gold establishes the BelieveinGOD Collection as a language of promise. A restrained field of ochre, shadow, and metallic illumination becomes an altar-like plane in which gold is not decorative but sacramental: a sign of protection, spiritual authority, and the unseen agreement between faith and endurance. The work invites slow viewing, asking the collector to encounter belief as both personal refuge and cultural inheritance.',
    provenance: 'B.I.G Art Collections studio archive, Benin City / global viewing room, 2026.',
    keywords: ['faith', 'gold', 'protection', 'spiritual abstraction', 'featured', 'sacred storytelling'],
    featured: true,
  },
  {
    id: 'anointed-silence',
    title: 'Anointed Silence',
    artistId: 'izoduwa-precious',
    collectionId: 'believeingod',
    exhibitionIds: ['sanctuary-online-2026'],
    category: 'Mixed Media',
    medium: 'Mixed media, black pigment, ash, oil glaze, and metallic wash on canvas',
    year: '2026',
    scale: '100 × 140 cm',
    status: 'Reserved',
    priceNote: 'Collector hold; inquiries welcome',
    preview: 'onyx',
    shortDescription: 'A quiet onyx field where restraint, breath, and sacred listening become form.',
    detail:
      'Anointed Silence considers silence not as absence but as spiritual architecture. Blackened pigment and ash create a meditative depth, while subtle metallic edges register like whispered blessings at the margin of visibility. The painting resists spectacle; it asks viewers to stand still, to listen, and to recognize the sacred density of quietness within contemporary life.',
    provenance: 'B.I.G Art Collections studio archive, 2026.',
    keywords: ['silence', 'black', 'minimalism', 'prayer', 'spiritual reflection'],
  },
  {
    id: 'psalm-of-the-ancestors',
    title: 'Psalm of the Ancestors',
    artistId: 'izoduwa-precious',
    collectionId: 'believeingod',
    exhibitionIds: ['memory-room-2026'],
    category: 'Textile',
    medium: 'Textile, charcoal, earth pigment, oil, and hand-applied acrylic on canvas',
    year: '2025',
    scale: '140 × 180 cm',
    status: 'Available',
    priceNote: 'Price and availability on request',
    preview: 'ember',
    shortDescription: 'Earthen rhythm, inherited prayer, and memory composed as contemporary ritual.',
    detail:
      'Psalm of the Ancestors carries Edo memory as rhythm rather than illustration. Textile and charcoal form a solemn surface that suggests ceremony, oral history, and the presence of those who continue to shape the living. The work functions like a visual psalm: an act of gratitude, mourning, reverence, and return, composed for institutions and collectors attentive to the spiritual intelligence of heritage.',
    provenance: 'First shown in the B.I.G Art Collections Memory room edit, 2026.',
    keywords: ['ancestry', 'Edo', 'textile', 'memory', 'heritage', 'Benin City'],
  },
  {
    id: 'threshold-of-mercy',
    title: 'Threshold of Mercy',
    artistId: 'izoduwa-precious',
    collectionId: 'believeingod',
    exhibitionIds: ['sanctuary-online-2026', 'private-viewing-room-2026'],
    category: 'Oil + Ash',
    medium: 'Oil, ash, acrylic, and translucent mineral wash on linen',
    year: '2026',
    scale: '110 × 150 cm',
    status: 'Available',
    priceNote: 'Price and availability on request',
    preview: 'ivory',
    shortDescription: 'A luminous passage where surrender, mercy, and renewal are held in suspension.',
    detail:
      'Threshold of Mercy presents light as a disciplined emergence from ash. The composition gathers pale mineral tones, softened darkness, and an almost architectural vertical opening to suggest the moment when prayer becomes passage. It is a work about forgiveness and continuation, balancing solemn material memory with the possibility of grace.',
    provenance: 'B.I.G Art Collections studio archive, 2026.',
    keywords: ['mercy', 'renewal', 'ash', 'light', 'spiritual reflection'],
  },
  {
    id: 'name-carried-by-water',
    title: 'Name Carried by Water',
    artistId: 'izoduwa-precious',
    collectionId: 'believeingod',
    exhibitionIds: ['memory-room-2026'],
    category: 'Charcoal',
    medium: 'Charcoal, indigo-toned acrylic, river-wash pigment, and graphite on cotton paper mounted to panel',
    year: '2025',
    scale: '76 × 112 cm',
    status: 'Private Collection',
    priceNote: 'Not currently available',
    preview: 'onyx',
    shortDescription: 'A contemplative work on naming, migration, inheritance, and spiritual continuity.',
    detail:
      'Name Carried by Water reflects on identity as something preserved through movement. The surface suggests a name spoken across distance: partly concealed, partly carried, never fully erased. Charcoal and wash create a field of quiet motion, connecting ancestral memory to contemporary questions of selfhood, belonging, and the sacred responsibility of remembrance.',
    provenance: 'Private collection placement, 2025.',
    keywords: ['identity', 'water', 'charcoal', 'ancestral memory', 'selfhood'],
  },
  {
    id: 'benin-prayer-wall',
    title: 'Benin Prayer Wall',
    artistId: 'izoduwa-precious',
    collectionId: 'believeingod',
    exhibitionIds: ['private-viewing-room-2026'],
    category: 'Ceremonial Study',
    medium: 'Acrylic, red earth, charcoal, gold dust, and incised mark-making on canvas',
    year: '2026',
    scale: '95 × 125 cm',
    status: 'Available',
    priceNote: 'Price and availability on request',
    preview: 'ember',
    shortDescription: 'A sacred surface of earth, inscription, and Edo-rooted contemplation.',
    detail:
      'Benin Prayer Wall honors the city of origin as both physical place and spiritual archive. Red earth, charcoal, and incised marks create a wall-like surface that feels touched by ritual time. The work speaks to the endurance of Edo heritage within contemporary African art, offering a restrained yet powerful meditation on land, lineage, worship, and cultural return.',
    provenance: 'B.I.G Art Collections studio archive, 2026.',
    keywords: ['Benin City', 'Edo heritage', 'red earth', 'prayer', 'ceremonial study'],
  },
];

export const exhibitions: Exhibition[] = [
  {
    id: 'sanctuary-online-2026',
    title: 'BelieveinGOD: Sanctuary Online',
    date: '2026',
    status: 'Current digital exhibition',
    venue: 'B.I.G Art Collections virtual gallery',
    room: 'Invocation',
    description:
      'A cinematic online exhibition introducing the BelieveinGOD Collection through gold, shadow, silence, and devotional scale. Conceived for collectors, curators, galleries, museums, and cultural institutions, the presentation frames faith as a contemporary African visual language.',
    artworkIds: ['covenant-in-gold', 'anointed-silence', 'threshold-of-mercy'],
  },
  {
    id: 'memory-room-2026',
    title: 'Room II: Ancestral Memory',
    date: '2026',
    status: 'Curatorial edit',
    venue: 'Private viewing room',
    room: 'Memory',
    description:
      'A focused exhibition edit for Edo heritage, ancestral memory, textile rhythm, identity, and the emotional weight of inherited names. The room positions memory as an active spiritual presence rather than a historical ornament.',
    artworkIds: ['psalm-of-the-ancestors', 'name-carried-by-water'],
  },
  {
    id: 'private-viewing-room-2026',
    title: 'BelieveinGOD: Private Collector Viewing Room',
    date: '2026',
    status: 'By appointment',
    venue: 'Online / collector correspondence',
    room: 'Revelation',
    description:
      'A tailored viewing-room format for acquisition conversations, institutional presentations, commission proposals, press previews, and curatorial research around the BelieveinGOD Collection.',
    artworkIds: ['covenant-in-gold', 'threshold-of-mercy', 'benin-prayer-wall'],
  },
];
