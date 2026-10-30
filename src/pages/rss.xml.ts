import type { APIRoute } from "astro";
import { renderRss } from "../utils/rss-feed";

export const GET: APIRoute = (context) => renderRss(context, "zh");
