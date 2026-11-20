// Imports the Cloudflare Worker environment binding at runtime.
// Keep this in a dedicated module: the Astro/Cloudflare build resolves static
// `cloudflare:workers` imports reliably, but not dynamic ones.
export { env } from "cloudflare:workers";
