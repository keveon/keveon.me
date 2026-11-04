import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import { d1, kvCache, r2, sandbox } from "@emdash-cms/cloudflare";
import { cloudflareEmail } from "@emdash-cms/cloudflare/plugins";
import { defineConfig, fontProviders } from "astro/config";
import emdash from "emdash/astro";
import { github } from "emdash/auth/providers/github";

// astro.config.mjs is loaded by plain Node import(), which does not read .env.
// Load it explicitly so MAIL_FROM_* / STORAGE_PUBLIC_URL resolve at build time.
try {
  process.loadEnvFile();
} catch {
  // .env is optional (e.g. CI) — values may also come from the real environment.
}

export default defineConfig({
  output: "server",
  adapter: cloudflare(),
  image: {
    layout: "constrained",
    responsiveStyles: true,
  },
  // Astro's default "prefix-other-locales" routing: zh is unprefixed, en
  // lives at /en/. Do NOT switch to prefixDefaultLocale or "prefix-always" —
  // that puts /_emdash/admin behind a locale prefix and breaks the admin.
  // Do not redirect from the `locale` cookie or Accept-Language: the URL is
  // the only locale signal, so caches and search engines see a stable page
  // per language.
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
      authProviders: [github()],
      database: d1({ binding: "DB", session: "auto", coalesce: true }),
      storage: r2({
        binding: "MEDIA",
        publicUrl: process.env.STORAGE_PUBLIC_URL,
      }),
      objectCache: kvCache({ binding: "CACHE" }),
      sandboxRunner: sandbox(),
      plugins: [
        cloudflareEmail({
          from: {
            name: process.env.MAIL_FROM_NAME,
            email: process.env.MAIL_FROM_EMAIL,
          },
          replyTo: process.env.MAIL_REPLY_TO,
        }),
      ],
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
