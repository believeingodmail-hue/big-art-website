# B.I.G Art Collections Launch Checklist

Use this checklist before making the **B.I.G Art Collections** website public and after every major content release.

## 1. Pre-launch content review

- Confirm the homepage title, description, canonical URL, Open Graph image, and social copy in `index.html` still match the current launch positioning.
- Review artist, collection, artwork, and exhibition records in `src/content.ts` and mirror browser-runtime changes in `src/content.js` if the site is still served without a bundler.
- Confirm each public artwork has a title, artist, collection, exhibition, medium, year, scale, status, short description, detailed description, provenance note, and keyword set.
- Replace placeholder social links and the `studio@bigartcollections.com` address if the studio launches with different accounts or inboxes.

## 2. Local quality checks

Run these commands before publishing:

```bash
npm run typecheck
npm run audit:launch
npm run build
```

Then open `dist/index.html` with a local static server and inspect:

- Desktop navigation and mobile navigation.
- Artwork search, filters, detail dialog, and inquiry handoff.
- Collector inquiry validation for empty, invalid, and valid submissions.
- Newsletter validation for invalid and valid email addresses.
- 404 page recovery links at `/404.html`.

## 3. GitHub Pages publishing

1. Commit the launch-ready branch and push it to GitHub.
2. In the GitHub repository, go to **Settings → Pages**.
3. Under **Build and deployment**, choose **GitHub Actions** as the source.
4. Push to the `main` branch or run **Actions → Deploy static site to GitHub Pages → Run workflow**.
5. Wait for the deploy job to finish, then open the Pages URL from the workflow summary.
6. If using a custom domain, add the domain in **Settings → Pages**, configure DNS with your domain provider, and enforce HTTPS once GitHub verifies the certificate.

The workflow builds the static site into `dist/`, uploads that folder as the Pages artifact, and deploys it with the official GitHub Pages action.

## 4. SEO and indexing

- Verify these public files after deployment:
  - `https://bigartcollections.com/robots.txt`
  - `https://bigartcollections.com/sitemap.xml`
  - `https://bigartcollections.com/404.html`
- Submit `https://bigartcollections.com/sitemap.xml` in Google Search Console after the final domain is connected.
- Keep `robots.txt` updated if new public paths are added.
- Update `sitemap.xml` whenever new durable pages or public sections are added.
- Test social cards with platform preview tools after the live domain resolves.

## 5. Google Analytics placeholder

The site includes a safe placeholder ID (`G-XXXXXXXXXX`). Analytics will not load until you replace it.

To enable analytics:

1. Create or open the Google Analytics 4 property for B.I.G Art Collections.
2. Copy the measurement ID that starts with `G-`.
3. Replace `G-XXXXXXXXXX` in both the `google-analytics-id` meta tag and the `window.BIG_GA_MEASUREMENT_ID` assignment in `index.html`.
4. Redeploy and confirm page views appear in GA4 Realtime.

## 6. Image optimization strategy

The current launch uses lightweight CSS-generated artwork previews plus SVG brand assets. When real artwork photography is added:

- Export master images from the studio archive, then create web derivatives instead of uploading originals.
- Use AVIF first and WebP fallback for large artwork images; keep JPEG only as a compatibility fallback when needed.
- Target widths: `480`, `768`, `1200`, and `1600` pixels for artwork images; reserve `2400` pixels only for zoom/detail pages.
- Use `srcset` and `sizes` so mobile devices download smaller files.
- Add explicit `width` and `height` attributes to avoid layout shift.
- Use `loading="lazy"` for below-the-fold images and `decoding="async"` for gallery images.
- Keep the social sharing image at `1200 × 630` and under roughly 300 KB when converted to PNG/JPEG/WebP.
- Store optimized public assets in `public/` and document source/master files separately so originals are not accidentally shipped.

## 7. Accessibility maintenance

- Keep every interactive control keyboard accessible and visibly focusable.
- Keep form fields paired with labels, errors, and `aria-describedby` helper text.
- Re-test color contrast whenever brand colors are changed.
- Confirm artwork dialogs can be opened, read, closed, and returned from by keyboard.
- Respect reduced-motion behavior for new animations.
- Add descriptive alt text for future real artwork images; include title, medium/context, and visual essentials without over-describing.

## 8. Performance maintenance

- Keep the dependency-free static approach unless a CMS or image pipeline becomes necessary.
- Prefer SVG, CSS gradients, and optimized responsive images over large uncompressed media.
- Avoid adding render-blocking third-party scripts; defer or conditionally load analytics, pixels, embeds, and widgets.
- Run Lighthouse or PageSpeed Insights on the deployed site after each major visual change.
- Re-run `npm run audit:launch` after metadata, SEO, or deployment configuration changes.

## 9. Post-launch monitoring

- Confirm GitHub Actions deployments succeed after each push to `main`.
- Review Google Search Console indexing and coverage weekly for the first month.
- Check GA4 traffic and engagement reports after analytics is enabled.
- Test the contact workflow regularly and update inquiry copy as studio operations mature.
