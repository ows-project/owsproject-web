# OWS waitlist landing page

A lightweight Vite site with a responsive, conceptual OWS application preview. The preview is not a screenshot of the shipping Rust/GPUI application.

## Development

```sh
npm ci
npm run dev
```

Build with `npm run build`. Deploy the resulting `dist/` directory to a static host.

## Current limits

The waitlist input and button are **disabled in HTML**, including without JavaScript. The input has no name and the button is not a submit button. No email is transmitted or stored. Connect a mailing-list backend and agree on privacy/consent wording before enabling signups.

The demo is manual-only. There is no autoplay, background motion, or playback control.

Preview and Live use separate thumbnail grids, based on the native application's layout. Blue marks the preview selection; red marks the live slide. Selecting a preview does not change Live until Go Live is pressed. Changing Live does not overwrite the Preview selection. This remains an illustrative concept, not a full application emulator.

The centered hero shows only a cropped glimpse of the application. Explore the preview expands it and enables its controls; cropped controls are inert so keyboard focus cannot enter invisible content. The abstract sage background is static CSS, not a video download.

## SEO and launch

The static HTML includes a descriptive title and meta description, Open Graph and Twitter summary metadata, and WebSite/Organization JSON-LD. `public/robots.txt` allows crawling. Metadata describes the project without claiming a released app or a launch date.

Before production deployment, add the confirmed canonical URL, `og:url`, a sitemap containing that URL, and a hosted social preview image. No production domain is assumed here. Configure staging hosts with `X-Robots-Tag: noindex` rather than letting preview URLs compete with the production site. Search indexing and social previews still require verification on the deployed domain.
