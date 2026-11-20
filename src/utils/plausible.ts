declare global {
	interface Window {
		plausible?: {
			(...args: unknown[]): void;
			q?: IArguments[];
		};
	}
}

/**
 * Resolve the Plausible script URL from the Worker secret at request time.
 *
 * Do NOT use `import.meta.env` here: Vite inlines build-time env values into
 * the server bundle. The script URL is provided as a Worker secret
 * (`wrangler secret put PLAUSIBLE_SCRIPT_URL`) and read through the runtime
 * environment instead. On Node (astro dev outside workerd), fall back to
 * `process.env` so the same variable can be set in a local `.env` file.
 */
export async function getPlausibleScriptUrl(): Promise<string | null> {
	let value: string | undefined;

	try {
		// Static re-export wrapper, following the pattern EmDash uses for
		// Worker bindings; a direct dynamic import is not always resolved by
		// the Astro Cloudflare build.
		const { env } = await import("./plausible-env");
		value = env?.PLAUSIBLE_SCRIPT_URL;
	} catch {
		// Not running in a Worker (e.g. local Node tooling).
	}

	value ??= process.env.PLAUSIBLE_SCRIPT_URL;
	if (!value) return null;

	try {
		const url = new URL(value);
		if (url.protocol === "https:") return url.href;
	} catch {
		// Invalid URL — treat it as not configured.
	}

	return null;
}
