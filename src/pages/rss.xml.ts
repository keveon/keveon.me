import type { APIRoute } from "astro";
import { renderRss } from "../utils/rss-feed";

// Astro's i18n routing gives /rss.xml the zh locale and /en/rss.xml the en one.
export const GET: APIRoute = (context) => renderRss(context);
