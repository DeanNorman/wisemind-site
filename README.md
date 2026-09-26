# WiseMind site

The website for [WiseMind](https://github.com/DeanNorman/wisemind-companion), a small, free companion for hard moments: grounding, DBT skills, South African helplines and Western Cape meetings, kept together on your phone. Coming soon to Android.

Live at [deannorman.github.io/wisemind-site](https://deannorman.github.io/wisemind-site/), published by GitHub Pages from `main`.

## What's here

- `index.html` is the whole page: markup, styles and scripts in one file.
- `assets/fonts` holds Inter and Source Serif 4, self-hosted under the SIL Open Font License (see `assets/fonts/LICENSE.md`).
- `assets/img` and `assets/screens` hold the photos and app screenshots, as WebP. Each screenshot also has `-400` and `-640` versions that phones load through `srcset` (and the mobile CSS for the lifted crops); regenerate them with `cwebp -q 80 -resize 400 0` / `-resize 640 0` when a screenshot changes.
- `assets/img/og-image.jpg` is the 1200 x 630 image people see when the link is shared.

## Writing for the page

- Honest, warm and plain, in the second person. It is a companion, not a product pitch, so no taglines.
- Every claim has to match the app. The app stores nothing about you, the meeting list is a dated copy of the public NA Western Cape list, and AA is a link to AA South Africa's own finder.
- Helpline numbers come from SADAG and should match the app's crisis button.
- Fellowship language such as "a room" is kept on purpose. People who know will recognise it.
- No em dashes.

## Preview locally

```bash
python3 -m http.server 4321
```

Then open http://localhost:4321.
