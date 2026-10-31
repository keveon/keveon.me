import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import { d1, r2 } from "@emdash-cms/cloudflare";
import { defineConfig, fontProviders } from "astro/config";
import emdash from "emdash/astro";

export default defineConfig({
	output: "server",
	adapter: cloudflare(),
	image: {
		layout: "constrained",
		responsiveStyles: true,
	},
	// zh is unprefixed. en lives at /en/. Do not redirect from the `locale`
	// cookie or Accept-Language — the URL is the only locale signal, so caches
	// and search engines see a stable page per language.
	i18n: {
		defaultLocale: "zh",
		locales: ["zh", "en"],
		fallback: { en: "zh" },
		routing: {
			prefixDefaultLocale: false,
			redirectToDefaultLocale: false,
			fallbackType: "rewrite",
		},
	},
	integrations: [
		react(),
		emdash({
			database: d1({ binding: "DB", session: "auto", coalesce: true }),
			storage: r2({ binding: "MEDIA" }),
		}),
	],
	fonts: [
		{
			provider: fontProviders.google(),
			name: "DM Sans",
			cssVariable: "--font-body",
			weights: [400, 500, 600, 700],
			styles: ["normal"],
			subsets: ["latin"],
			fallbacks: ["Noto Sans SC", "PingFang SC", "sans-serif"],
		},
		{
			provider: fontProviders.google(),
			name: "Noto Sans SC",
			cssVariable: "--font-cjk",
			weights: [400, 500, 600, 700],
			styles: ["normal"],
			subsets: ["chinese-simplified"],
			fallbacks: ["sans-serif"],
		},
		{
			provider: fontProviders.google(),
			name: "JetBrains Mono",
			cssVariable: "--font-mono",
			weights: [400, 500],
			fallbacks: ["monospace"],
		},
	],
	devToolbar: { enabled: false },
});
