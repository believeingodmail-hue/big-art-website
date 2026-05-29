import { readFile, access } from 'node:fs/promises';
import { artworks, collections } from '../src/content.js';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const requiredFiles = [
  '.github/workflows/deploy-pages.yml',
  '404.html',
  'public/sitemap.xml',
  'public/robots.txt',
  'public/favicon.svg',
  'public/apple-touch-icon.svg',
  'public/mask-icon.svg',
  'public/site.webmanifest',
  'public/.nojekyll',
  'LAUNCH_CHECKLIST.md',
];

const requiredIndexSnippets = [
  'property="og:url"',
  'name="twitter:image"',
  'application/ld+json',
  'ExhibitionEvent',
  'VisualArtwork',
  'google-analytics-id',
  'rel="manifest"',
];

const indexHtml = await readFile(join(root, 'index.html'), 'utf8');
for (const file of requiredFiles) await access(join(root, file));
for (const snippet of requiredIndexSnippets) {
  if (!indexHtml.includes(snippet)) throw new Error(`Missing launch snippet: ${snippet}`);
}



const forbiddenText = [
  `studio${'@'}bigartcollections.com`,
  `Ancestral ${'Silence'}`,
  `Anointed ${'Silence'}`,
  `Covenant in ${'Bronze'}`,
  `Threshold of ${'Light'}`,
  `artist-${'portrait'}`,
];
const launchFiles = ['index.html', '404.html', 'LAUNCH_CHECKLIST.md', 'src/content.js', 'src/main.js', 'src/styles.css'];
for (const file of launchFiles) {
  const text = await readFile(join(root, file), 'utf8');
  for (const forbidden of forbiddenText) {
    if (text.includes(forbidden)) throw new Error(`Forbidden launch text found in ${file}: ${forbidden}`);
  }
}


const emailPattern = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g;
for (const file of launchFiles) {
  const text = await readFile(join(root, file), 'utf8');
  const emails = text.match(emailPattern) ?? [];
  for (const email of emails) {
    if (email !== 'connect@izoduwa.gallery') throw new Error(`Unexpected email address found in ${file}: ${email}`);
  }
}

if (!indexHtml.includes('connect@izoduwa.gallery')) throw new Error('Primary contact email is missing from index.html.');
if (collections.length !== 1 || collections[0].id !== 'believeingod') throw new Error('Only the BelieveinGOD Collection should be public at launch.');
for (const artwork of artworks) {
  if (artwork.collectionId !== 'believeingod') throw new Error(`Artwork is not assigned to BelieveinGOD Collection: ${artwork.title}`);
  if (artwork.title.includes('_')) throw new Error(`Artwork title contains an underscore: ${artwork.title}`);
}

console.log('Launch audit passed: deployment, SEO, social, icons, analytics placeholder, contact email, and BelieveinGOD artwork checks are present.');
