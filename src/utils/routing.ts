import { getRelativeLocaleUrl } from "astro:i18n";
import { asLocale, type Locale } from "../i18n/ui";

const EXTERNAL = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;

/** Drop a leading /en prefix so the path can be re-localized. */
export function stripLocale(pathname: string): string {
	const stripped = pathname.replace(/^\/en(?=\/|$)/, "");
	if (!stripped || stripped === "/") return "/";
	return stripped.startsWith("/") ? stripped : `/${stripped}`;
}

/**
 * Prefix an on-site path for the locale. mailto, tel, and absolute URLs pass through.
 * The default locale stays unprefixed. This does not read cookies or Accept-Language.
 */
export function localeHref(locale: string | undefined | null, href: string): string {
	if (!href || EXTERNAL.test(href) || href.startsWith("#")) return href;
	const lang = asLocale(locale);
	const hashIndex = href.indexOf("#");
	const hash = hashIndex >= 0 ? href.slice(hashIndex) : "";
	const beforeHash = hashIndex >= 0 ? href.slice(0, hashIndex) : href;
	const queryIndex = beforeHash.indexOf("?");
	const query = queryIndex >= 0 ? beforeHash.slice(queryIndex) : "";
	const path = queryIndex >= 0 ? beforeHash.slice(0, queryIndex) : beforeHash;
	const bare = stripLocale(path.startsWith("/") ? path : `/${path}`);
	const localized =
		bare === "/"
			? getRelativeLocaleUrl(lang, "/")
			: getRelativeLocaleUrl(lang, bare.replace(/^\//, ""));
	return `${normalizeLocalePath(lang, localized)}${query}${hash}`;
}

function normalizeLocalePath(locale: Locale, path: string): string {
	if (!path || path === "/") return locale === "en" ? "/en/" : "/";
	if (locale === "en" && (path === "/en" || path === "/en/")) return "/en/";
	// Astro's locale helper adds a trailing slash. File routes such as rss.xml 404 with one.
	return path.replace(/\/+$/, "") || "/";
}

export function notFoundPath(locale: string | undefined | null): string {
	return asLocale(locale) === "en" ? "/en/404" : "/404";
}

export function entryPath(
	locale: string | undefined | null,
	collection: "posts" | "pages" | "products" | "tag" | "category",
	slug: string,
): string {
	const root =
		collection === "posts"
			? `/posts/${slug}`
			: collection === "pages"
				? `/pages/${slug}`
				: collection === "products"
					? `/products/${slug}`
					: collection === "tag"
						? `/tag/${slug}`
						: `/category/${slug}`;
	return localeHref(locale, root);
}

export function contentSlug(entry: { id: string; data: { slug?: string | null } }): string {
	if (entry.data.slug) return entry.data.slug;
	return entry.id.replace(/^en\//, "");
}

export function absoluteUrl(origin: string, path: string): string {
	return new URL(path, origin).href;
}

export function hostOf(value: string | undefined | null): string {
	if (!value) return "";
	try {
		return new URL(value).host;
	} catch {
		return value.replace(/^https?:\/\//, "");
	}
}
