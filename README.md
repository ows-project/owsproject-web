# OWS waitlist landing page

A lightweight Vite site with a responsive, conceptual OWS application preview. The preview is not a screenshot of the shipping Rust/GPUI application.

## Development

```sh
npm ci
npm run dev
```

Build with `npm run build`. Deploy the resulting `dist/` directory to a static host.

## Waitlist result routes

- `/waitlist/success/`: signup confirmation and a link home.
- `/waitlist/error/`: failed signup and a link back to the form.

Both are static HTML pages that share `src/style.css` and work without JavaScript. Vite builds each route into its own directory with an `index.html`; configure the static host to serve directory index files rather than rewriting these routes to the landing page. Result pages are marked `noindex`.

The backend must redirect browser submissions with `303 See Other` and a `Location` header pointing to the appropriate route on the deployed frontend domain. These pages do not change the backend's current JSON response or origin allowlist. No redirect form fields are added because the endpoint's supported redirect configuration is not known.

## Current limits

The waitlist form submits the required email field via POST to `https://waitinglist.owsproject.com/f/waiting-list`, including without JavaScript. The mailing-list backend handles storage and the response after submission.

The demo is manual-only. There is no autoplay, background motion, or playback control.

Preview and Live use separate thumbnail grids, based on the native application's layout. Blue marks the preview selection; red marks the live slide. Selecting a preview does not change Live until Go Live is pressed. Changing Live does not overwrite the Preview selection. This remains an illustrative concept, not a full application emulator.

The centered hero shows only a cropped glimpse of the application. Explore the preview expands it and enables its controls; cropped controls are inert so keyboard focus cannot enter invisible content. The abstract sage background is static CSS, not a video download.

## SEO and launch

The static HTML includes a descriptive title and meta description, Open Graph and Twitter summary metadata, and WebSite/Organization JSON-LD. `public/robots.txt` allows crawling. Metadata describes the project without claiming a released app or a launch date.

Before production deployment, add the confirmed canonical URL, `og:url`, a sitemap containing that URL, and a hosted social preview image. No production domain is assumed here. Configure staging hosts with `X-Robots-Tag: noindex` rather than letting preview URLs compete with the production site. Search indexing and social previews still require verification on the deployed domain.
