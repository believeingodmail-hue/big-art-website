# B.I.G Art Collections Website

A professional static TypeScript website foundation for **B.I.G Art Collections** and the **BelieveinGOD Collection**.

## Features

- Luxury dark editorial homepage
- Data-managed artwork, collection, exhibition, artist, gallery, and contact sections
- Artwork detail pages through a reusable collector dialog
- Searchable and category-filtered artwork archive
- Featured artwork presentation driven by content records
- Collector inquiry and newsletter signup forms
- Responsive navigation and mobile-first layout refinements
- Smooth CSS animations and lightweight SVG brand assets
- SEO metadata, Open Graph tags, canonical URL, sitemap, robots.txt, and structured data setup
- GitHub Pages deployment workflow, 404 page, manifest, favicon, and launch audit checks
- Contact form validation with accessible field-level errors
- Performance and accessibility hardening for public launch
- Fast dependency-free static build structure

## Content management

Primary content lives in `src/content.ts` for typed editing and `src/content.js` for the browser runtime. To add new inventory without redesigning the site:

1. Add an artwork object to `artworks` with a unique `id`, `collectionId`, `category`, `medium`, `year`, `scale`, `status`, `preview`, descriptions, and keywords.
2. Add or update a collection record in `collections` when a new body of work launches.
3. Add or update an exhibition record in `exhibitions`, linking artworks with `artworkIds`.
4. Add new category names to `artworkCategories` so the filter bar exposes them.
5. Update `artistProfiles` when the artist biography, location, or focus areas change.

The front-end automatically renders collection cards, exhibition cards, search results, category pills, featured artwork, timeline entries, and artwork detail content from those records.

## Commands

```bash
npm run dev
npm run typecheck
npm run build
npm run audit:launch
```

## Launch operations

See `LAUNCH_CHECKLIST.md` for GitHub Pages publishing steps, analytics activation, SEO indexing, image optimization guidance, and ongoing performance/accessibility maintenance.
