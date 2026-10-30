/** Resolved media reference from getSiteSettings() */
export interface MediaReference {
	mediaId: string;
	alt?: string;
	url?: string;
}

export interface BlogSiteIdentitySettings {
	title?: string;
	tagline?: string;
	logo?: MediaReference;
	favicon?: MediaReference;
	social?: {
		github?: string;
	};
}

/** Header wordmark. Always lowercase, independent of the settings title casing. */
export const WORDMARK = "keveon";

const DEFAULT_SITE_TAGLINE = "建造工具与产品。各自独立，在这里汇成矩阵。";
export const CONTACT_EMAIL = "hello@keveon.com";
const DEFAULT_GITHUB = "https://github.com/keveon";

export function resolveBlogSiteIdentity(settings?: BlogSiteIdentitySettings) {
	const title = settings?.title?.trim();
	return {
		siteTitle: title || WORDMARK,
		wordmark: WORDMARK,
		siteTagline: settings?.tagline?.trim() || DEFAULT_SITE_TAGLINE,
		siteLogo: settings?.logo?.url ? settings.logo : null,
		email: CONTACT_EMAIL,
		github: settings?.social?.github?.trim() || DEFAULT_GITHUB,
	};
}
