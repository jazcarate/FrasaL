import { WorkerEntrypoint } from "cloudflare:workers";
import { translate, type TranslationChunk } from "./translation";

interface Env {
	ASSETS: Fetcher;
}

export default class extends WorkerEntrypoint<Env> {
	async fetch(request: Request) {
		const url = new URL(request.url);

		if (url.pathname === '/api/translate') {
			if (request.method !== 'POST') {
				return new Response('Method not allowed', { status: 405 });
			}
			try {
				const body = await request.json() as { text?: string };
				const { text } = body;
				if (!text || typeof text !== 'string') {
					return new Response('Missing or invalid text parameter', { status: 400 });
				}
				const result = translate(text);
				return new Response(JSON.stringify(result), {
					headers: { 'Content-Type': 'application/json' }
				});
			} catch (error) {
				return new Response('Invalid JSON', { status: 400 });
			}
		}

		if (url.pathname === '/') {
			const assetResponse = await this.env.ASSETS.fetch(request);
			const query = url.searchParams.get("q")

			let translations: TranslationChunk[] = [];
			let description = "Descubre qué quiso decir Julio.";

			if (query) {
				translations = translate(query);
				description = `'${query}' se traduce aproximadamente a '${translations.map(translation => translation.translated || translation.original).join("")}'.`;
			}

			return new HTMLRewriter()
				.on('meta[name="description"]', {
					element(element) {
						element.setAttribute("content", description);
					},
				})
				.on('meta[property="og:description"]', {
					element(element) {
						element.setAttribute("content", description);
					},
				})
				.on('body', {
					element(element) {
						element.append(`<script>window.__INITIAL_TRANSLATIONS__ = ${JSON.stringify(translations)};</script>`, { html: true });
					},
				})
				.transform(assetResponse);
		}

		return new Response('Not found', { status: 404 });
	}
}