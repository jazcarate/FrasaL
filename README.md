# FrasaL

## Development

A single JS and HTML with [Alpine.js](https://alpinejs.dev/).

To get Server Side Rendering (mostly on the `meta:description` head tag), the HTML is "enhanced" with a Cloudflare worker

### Cloudflare Worker

To setup the cloudflare worker infrastructure, you'll need [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/). Simplest way is to do it via `npx wrangler dev`.

### Deploy

Push to `main` and let GitHub Action take care of it.