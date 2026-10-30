export type Locale = "zh" | "en";

export function asLocale(value: string | undefined | null): Locale {
	return value === "en" ? "en" : "zh";
}

const availability = {
	zh: {
		active: "在用",
		beta: "试用",
		preview: "看一看",
		retired: "收成",
	},
	en: {
		active: "Live",
		beta: "In trial",
		preview: "Have a look",
		retired: "Shelved",
	},
} as const;

export type Availability = keyof (typeof availability)["zh"];

const dictionary = {
	zh: {
		skip: "跳到正文",
		search: "搜索",
		searchLabel: "站内搜索",
		nav: "主导航",
		theme: "颜色",
		light: "浅色",
		dark: "深色",
		system: "跟随系统",
		language: "语言",
		homeDocumentTitle: "keveon — 建造中的作品",
		homeEyebrow: "keveon.com",
		homeTitle: "建造中的作品",
		homeLead: "每个产品都值得点进去看一眼。独立的卡片，独立的冲动。",
		featured: "精选 · Featured",
		works: "作品 · Works",
		now: "在做什么 · Now",
		aboutHeading: "关于",
		aboutBlurb:
			"keveon 做工具，也做一点自己的产品。邮件、AI、门户，还有生活里的小站，分开长，在这里碰头。",
		productsEyebrow: "Products",
		productsTitle: "作品",
		productsLead: "全部在这里。挑一个，点进去看一眼。",
		productsDocumentTitle: "作品",
		viewAll: "查看全部",
		open: "打开",
		look: "看看",
		backToWorks: "作品",
		features: "特性 · Features",
		otherWorks: "其他作品",
		status: "状态",
		domain: "域名",
		emptyWorksTitle: "还没有作品",
		emptyWorksText: "作品会排在这里。可以先在后台写一条。",
		emptyWorksAction: "新建作品",
		emptyPostsTitle: "还没有文章",
		emptyPostsText: "发出去的文章会出现在这里。",
		emptyPostsAction: "写一篇",
		noMorePosts: "没有更多了",
		endOfArchive: "已经到底了。",
		pastLast: "已经翻过最后一篇了。",
		firstPage: "第一页",
		nextPage: "下一页",
		pagination: "翻页",
		allPosts: "全部文章",
		postsEyebrow: "Notes",
		postsTitle: "文章",
		postsLead: "新的在前面。",
		postsDescription: "keveon 写过的东西。",
		readArticle: "阅读",
		untitled: "无题",
		tags: "标签",
		author: "作者",
		authors: "作者",
		published: "发布",
		readingTime: "阅读",
		discussion: "讨论",
		onThisPage: "本页目录",
		moreFrom: "更多",
		continueReading: "接着读",
		category: "分类",
		tag: "标签",
		nothingHere: "这里还是空的",
		backToStart: "回到开头",
		pageNotFound: "没有这一页",
		pageNotFoundCode: "404",
		pageNotFoundLead: "链接可能写错了，或者这页已经挪走。",
		goHome: "回首页",
		browsePosts: "看全部文章",
		searchTitle: "找点什么",
		searchDescription: "搜索文章和作品",
		searchPlaceholder: "搜索文章和作品",
		searchHintBefore: "会搜标题和正文。不知道从哪开始，可以先",
		searchHintLink: "看文章",
		searchHintAfter: "。",
		noResultsLead: "换个说法，或者少写几个字。",
		footerNote: "keveon.com — 名片、作品和文章。产品各自有自己的域名。",
		icp: "ICP / 备案占位",
		rss: "RSS",
		admin: "后台",
		and: "以及",
		resultFor: "的结果",
	},
	en: {
		skip: "Skip to content",
		search: "Search",
		searchLabel: "Site search",
		nav: "Main",
		theme: "Color theme",
		light: "Light",
		dark: "Dark",
		system: "System",
		language: "Language",
		homeDocumentTitle: "keveon — work in progress",
		homeEyebrow: "keveon.com",
		homeTitle: "Work in progress",
		homeLead: "Each product is worth opening. Its own card, and a reason to click.",
		featured: "Featured · 精选",
		works: "Work · 作品",
		now: "Now · 在做什么",
		aboutHeading: "About",
		aboutBlurb:
			"keveon builds tools, and the occasional product. Mail, AI, portals, and the small sites of ordinary life stay separate, and meet here.",
		productsEyebrow: "Products",
		productsTitle: "Work",
		productsLead: "Everything is here. Pick one and look inside.",
		productsDocumentTitle: "Work",
		viewAll: "View all",
		open: "Open",
		look: "Look",
		backToWorks: "Work",
		features: "Features · 特性",
		otherWorks: "Other work",
		status: "Status",
		domain: "Domain",
		emptyWorksTitle: "No work yet",
		emptyWorksText: "Pieces will line up here. The first one can be added in the admin.",
		emptyWorksAction: "New product",
		emptyPostsTitle: "No posts yet",
		emptyPostsText: "Published notes will show up here.",
		emptyPostsAction: "Write a post",
		noMorePosts: "Nothing further",
		endOfArchive: "That's the end of the list.",
		pastLast: "This page is past the last post.",
		firstPage: "First page",
		nextPage: "Next page",
		pagination: "Pagination",
		allPosts: "All posts",
		postsEyebrow: "Notes",
		postsTitle: "Notes",
		postsLead: "Newest first.",
		postsDescription: "Notes from keveon.",
		readArticle: "Read",
		untitled: "Untitled",
		tags: "Tags",
		author: "Author",
		authors: "Authors",
		published: "Published",
		readingTime: "Reading time",
		discussion: "Discussion",
		onThisPage: "On this page",
		moreFrom: "More",
		continueReading: "Continue reading",
		category: "Category",
		tag: "Tag",
		nothingHere: "Nothing here yet",
		backToStart: "Back to the start",
		pageNotFound: "This page isn't here",
		pageNotFoundCode: "404",
		pageNotFoundLead: "The link may be wrong, or the page has moved.",
		goHome: "Home",
		browsePosts: "All posts",
		searchTitle: "What are you looking for?",
		searchDescription: "Search notes and work",
		searchPlaceholder: "Search notes and work",
		searchHintBefore: "Searches titles and full text. If you're not sure where to start, ",
		searchHintLink: "browse the notes",
		searchHintAfter: ".",
		noResultsLead: "Try a different phrase, or fewer words.",
		footerNote: "keveon.com — a personal hub. Products live on their own domains.",
		icp: "ICP placeholder",
		rss: "RSS",
		admin: "Admin",
		and: "and",
		resultFor: "for",
	},
} as const;

export type Copy = (typeof dictionary)["zh"];

export function t(locale: string | undefined | null): Copy {
	return dictionary[asLocale(locale)] as Copy;
}

export function availabilityLabel(
	locale: string | undefined | null,
	value: string | undefined | null,
): string {
	if (!value) return "";
	const labels = availability[asLocale(locale)];
	if (value in labels) return labels[value as Availability];
	return value;
}

export function readingMinutes(locale: string | undefined | null, minutes: number): string {
	return asLocale(locale) === "en" ? `${minutes} min` : `约 ${minutes} 分钟`;
}

export function resultCount(
	locale: string | undefined | null,
	count: number,
	hasMore: boolean,
): string {
	if (asLocale(locale) === "en") {
		if (hasMore) return `Top ${count}`;
		return count === 1 ? "1 result" : `${count} results`;
	}
	return hasMore ? `前 ${count} 条` : `${count} 条`;
}

export function noResultsTitle(locale: string | undefined | null, query: string): string {
	return asLocale(locale) === "en"
		? `No results for “${query}”`
		: `没有和「${query}」相关的结果`;
}

export function searchDocumentTitle(locale: string | undefined | null, query: string): string {
	if (!query) return t(locale).searchTitle;
	return asLocale(locale) === "en" ? `Search: ${query}` : `搜索：${query}`;
}

export function postsInLabel(locale: string | undefined | null, label: string): string {
	return asLocale(locale) === "en" ? `${label}` : label;
}

export function postsInLead(
	locale: string | undefined | null,
	label: string,
	description?: string | null,
): string {
	if (description) return description;
	return asLocale(locale) === "en"
		? `Notes filed under ${label}, newest first.`
		: `归在「${label}」里的文章，新的在前面。`;
}
