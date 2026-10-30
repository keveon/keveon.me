/** Resolved media reference from getSiteSettings() */
export interface MediaReference {
	mediaId: string;
	alt?: string;
	url?: string;
}

export interface BlogSiteIdentitySettings {
	title?: string;
	tagline?: string;
	url?: string;
	logo?: MediaReference;
	favicon?: MediaReference;
	social?: {
		github?: string;
	};
}

const DEFAULT_SITE_TITLE = "Studio";

export function resolveBlogSiteIdentity(settings?: BlogSiteIdentitySettings) {
	const siteTitle = settings?.title?.trim() || DEFAULT_SITE_TITLE;
	const siteUrl = settings?.url?.trim() || "";
	return {
		siteTitle,
		/** Header wordmark. Comes from site settings, not a baked-in name. */
		wordmark: siteTitle,
		siteTagline: settings?.tagline?.trim() || "",
		siteLogo: settings?.logo?.url ? settings.logo : null,
		github: settings?.social?.github?.trim() || "",
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
