import { readFile, access } from 'node:fs/promises';
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

console.log('Launch audit passed: deployment, SEO, social, icons, analytics placeholder, and checklist files are present.');
