import type { SiteSettings } from "emdash";

/** Resolved media reference from getSiteSettings() */
export interface MediaReference {
	mediaId: string;
	alt?: string;
	url?: string;
}

/** Keys stored under Settings → Social. Values are handles, or full URLs. */
export type SocialNetwork = keyof NonNullable<SiteSettings["social"]>;

export interface SocialLink {
	network: SocialNetwork;
	label: string;
	href: string;
}

export interface BlogSiteIdentitySettings {
	title?: string;
	tagline?: string;
	url?: string;
	logo?: MediaReference;
	favicon?: MediaReference;
	social?: SiteSettings["social"];
}

const DEFAULT_SITE_TITLE = "Studio";

/** Fixed footer order. Labels stay short; the CMS field name is `network`. */
const SOCIAL_NETWORKS: ReadonlyArray<{ network: SocialNetwork; label: string }> = [
	{ network: "twitter", label: "X" },
	{ network: "github", label: "GitHub" },
	{ network: "facebook", label: "Facebook" },
	{ network: "instagram", label: "Instagram" },
	{ network: "linkedin", label: "LinkedIn" },
	{ network: "youtube", label: "YouTube" },
];

/** http(s) URLs and protocol-relative URLs are already absolute. */
const ABSOLUTE_URL = /^(?:https?:)?\/\//i;
const LEADING_AT = /^@+/;
/** YouTube channel ids are `UC` plus 22 id characters, with no leading @. */
const YOUTUBE_CHANNEL_ID = /^UC[\w-]{22}$/;

/**
 * Turn a Settings → Social value into a profile URL.
 * Handles (`studio`, `@studio`) are expanded. Full URLs are returned unchanged.
 */
export function socialProfileUrl(network: SocialNetwork, value: string): string | null {
	const raw = value.trim();
	if (!raw) return null;
	if (ABSOLUTE_URL.test(raw)) return raw;

	const handle = raw.replace(LEADING_AT, "");
	if (!handle) return null;
	const path = encodeURIComponent(handle);

	switch (network) {
		case "twitter":
			return `https://x.com/${path}`;
		case "github":
			return `https://github.com/${path}`;
		case "facebook":
			return `https://www.facebook.com/${path}`;
		case "instagram":
			return `https://www.instagram.com/${path}`;
		case "linkedin":
			return `https://www.linkedin.com/in/${path}`;
		case "youtube":
			return !raw.startsWith("@") && YOUTUBE_CHANNEL_ID.test(handle)
				? `https://www.youtube.com/channel/${path}`
				: `https://www.youtube.com/@${path}`;
	}
}

/** Every non-empty social field, as `{ network, label, href }`. */
export function resolveSocialLinks(social: SiteSettings["social"] | undefined): SocialLink[] {
	if (!social) return [];
	const links: SocialLink[] = [];
	for (const { network, label } of SOCIAL_NETWORKS) {
		const value = social[network];
		if (!value) continue;
		const href = socialProfileUrl(network, value);
		if (href) links.push({ network, label, href });
	}
	return links;
}

export function resolveBlogSiteIdentity(settings?: BlogSiteIdentitySettings) {
	const siteTitle = settings?.title?.trim() || DEFAULT_SITE_TITLE;
	const siteUrl = settings?.url?.trim() || "";
	return {
		siteTitle,
		/** Header wordmark. Comes from site settings, not a baked-in name. */
		wordmark: siteTitle,
		siteTagline: settings?.tagline?.trim() || "",
		siteLogo: settings?.logo?.url ? settings.logo : null,
		socialLinks: resolveSocialLinks(settings?.social),
		siteUrl,
	};
}

/** Uppercase label above the homepage title: the public host, or the site title. */
export function siteEyebrow(identity: { siteTitle: string; siteUrl: string }): string {
	if (!identity.siteUrl) return identity.siteTitle;
	try {
		return new URL(identity.siteUrl).host;
	} catch {
		return identity.siteTitle;
	}
}
