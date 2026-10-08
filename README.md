# OWS waitlist landing page

A lightweight Vite site with a responsive, conceptual OWS application preview. The preview is not a screenshot of the shipping Rust/GPUI application.

## Development

```sh
npm ci
npm run dev
```

Build with `npm run build`. Deploy the resulting `dist/` directory to a static host.

## Cloudflare Workers deployment

The checked-in `wrangler.jsonc` deploys `dist/` as static assets for the
`owsproject-web` Worker. No Cloudflare Vite plugin or Worker script is needed.
Keep these Workers Builds settings:

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`

Validate packaging without publishing with `npm run build && npx wrangler deploy --dry-run`.
The default static asset routing serves the separate waitlist result pages;
do not enable the single-page-application fallback for this multi-page site.

## Waitlist result routes

- `/waitlist/success/`: signup confirmation and a link home.
- `/waitlist/error/`: failed signup and a link back to the form.

Both are static HTML pages that share `src/style.css` and work without JavaScript. Vite builds each route into its own directory with an `index.html`; configure the static host to serve directory index files rather than rewriting these routes to the landing page. Result pages are marked `noindex`.

With JavaScript, the form sends a URL-encoded POST to the backend and navigates to the success route for a successful HTTP response, or the error route for a failed response or network error. The submit button is disabled while the request is pending to prevent duplicate submissions. The deployed frontend origin must be in the backend's CORS allowlist.

Without JavaScript, the browser submits directly to the backend. To show these result pages in that fallback, the backend must respond with `303 See Other` and a `Location` header pointing to the appropriate route on the deployed frontend domain. No redirect form fields are added because the endpoint's supported redirect configuration is not known.

## Current limits

The waitlist form submits the required email field via POST to `https://waitinglist.owsproject.com/f/waiting-list`, including without JavaScript. The mailing-list backend handles storage; the frontend handles navigation to the result pages when JavaScript is available.

The demo is manual-only. There is no autoplay, background motion, or playback control.

Preview and Live use separate thumbnail grids, based on the native application's layout. Blue marks the preview selection; red marks the live slide. Selecting a preview does not change Live until Go Live is pressed. Changing Live does not overwrite the Preview selection. This remains an illustrative concept, not a full application emulator.

The centered hero shows only a cropped glimpse of the application. Explore the preview expands it and enables its controls; cropped controls are inert so keyboard focus cannot enter invisible content. The abstract sage background is static CSS, not a video download.

## SEO and launch

The static HTML includes a descriptive title and meta description, Open Graph and Twitter summary metadata, and WebSite/Organization JSON-LD. `public/robots.txt` allows crawling. Metadata describes the project without claiming a released app or a launch date.

Before production deployment, add the confirmed canonical URL, `og:url`, a sitemap containing that URL, and a hosted social preview image. No production domain is assumed here. Configure staging hosts with `X-Robots-Tag: noindex` rather than letting preview URLs compete with the production site. Search indexing and social previews still require verification on the deployed domain.
