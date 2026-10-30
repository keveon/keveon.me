import type { APIContext } from "astro";
import { getEmDashCollection, getSiteSettings } from "emdash";
import { asLocale } from "../i18n/ui";
import { dateLocale } from "./locale";
import { contentSlug, localeHref } from "./routing";
import { resolveBlogSiteIdentity } from "./site-identity";

export async function renderRss(context: APIContext, localeInput?: string) {
	const locale = asLocale(localeInput ?? (context.url.pathname.startsWith("/en") ? "en" : "zh"));
	const origin = context.url.origin;
	const { siteTitle, siteTagline } = resolveBlogSiteIdentity(await getSiteSettings());
	const { entries: posts } = await getEmDashCollection("posts", {
		locale,
		orderBy: { published_at: "desc" },
		limit: 20,
	});

	const items = posts
		.map((post) => {
			if (!post.data.publishedAt) return null;
			const postUrl = new URL(
				localeHref(locale, `/posts/${contentSlug(post)}`),
				origin,
			).href;
			return `    <item>
      <title>${escapeXml(post.data.title || (locale === "en" ? "Untitled" : "无题"))}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${post.data.publishedAt.toUTCString()}</pubDate>
      <description>${escapeXml(post.data.excerpt || "")}</description>
    </item>`;
		})
		.filter(Boolean)
		.join("\n");

	const self = new URL(localeHref(locale, "/rss.xml"), origin).href;
	const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteTitle)}</title>
    <description>${escapeXml(siteTagline)}</description>
    <link>${origin}</link>
    <atom:link href="${self}" rel="self" type="application/rss+xml"/>
    <language>${dateLocale(locale)}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

	return new Response(rss, {
		headers: {
			"Content-Type": "application/rss+xml; charset=utf-8",
			"Cache-Control": "public, max-age=3600",
		},
	});
}

function escapeXml(str: string): string {
	return str
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&apos;");
}
