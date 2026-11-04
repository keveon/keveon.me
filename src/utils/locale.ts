import { asLocale } from "../i18n/ui";

/**
 * BCP 47 tag for date formatting. Chinese is the default locale of the site.
 */
export function dateLocale(locale: string | undefined | null): string {
	return asLocale(locale) === "en" ? "en-US" : "zh-CN";
}

/** @deprecated Prefer dateLocale(Astro.currentLocale). Kept for callers that have no request locale. */
export function getSiteLocale(): string {
	return "zh-CN";
}

/** Formats a date in the active locale. */
export function formatDate(
	date: Date,
	month: "long" | "short",
	locale?: string | null,
): string {
	return date.toLocaleDateString(dateLocale(locale), {
		year: "numeric",
		month,
		day: "numeric",
	});
}
