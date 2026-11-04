/** Site locales. Extend this table + astro.config i18n.locales + dictionary when adding a language. */
export const LOCALES = [
	{ code: "zh", nativeLabel: "中文" },
	{ code: "en", nativeLabel: "English" },
] as const;

export type Locale = (typeof LOCALES)[number]["code"];

const codes = new Set<string>(LOCALES.map((locale) => locale.code));

export function asLocale(value: string | undefined | null): Locale {
	return value && codes.has(value) ? (value as Locale) : "zh";
}

export function localeNativeLabel(value: string | undefined | null): string {
	const code = asLocale(value);
	return LOCALES.find((locale) => locale.code === code)?.nativeLabel ?? code;
}
