export type Locale = 'ja' | 'en';

export const locales = ['ja', 'en'] as const satisfies readonly Locale[];

export const ui = {
  ja: {
    siteTitle: "The Flipper's Guitar Archives",
    discography: 'ディスコグラフィ',
    releaseDate: 'リリース日',
    catalogNumber: '規格番号',
    label: 'レーベル',
    format: '形態',
    artist: 'アーティスト',
    tracks: '収録曲',
    credits: 'クレジット',
    sources: '出典',
    description: '解説',
    backToList: '一覧に戻る',
    switchLang: 'English',
    accessedAt: '参照日',
    entryCount: (n: number) => `${n}件`,
    releases: 'リリース',
    releaseCount: (n: number) => `${n}件のリリース`,
    otherReleases: 'この作品の他のリリース',
    primaryRelease: '原盤',
    reissue: '再発',
    live: 'ライブ',
    venue: '会場',
    tour: 'ツアー',
    setlist: 'セットリスト',
    lineup: 'メンバー',
    guestAt: 'ゲスト出演',
    withActs: '共演',
    encore: 'アンコール',
    cover: 'カバー',
    originalBy: '原曲',
    support: 'サポート',
    noSetlist: 'セットリスト未確認',
    media: 'メディア',
    outlet: '媒体',
    program: '番組',
    issue: '号',
    pages: 'ページ',
    showSources: '出典を表示',
    hideSources: '出典を隠す',
  },
  en: {
    siteTitle: "The Flipper's Guitar Archives",
    discography: 'Discography',
    releaseDate: 'Released',
    catalogNumber: 'Catalog #',
    label: 'Label',
    format: 'Format',
    artist: 'Artist',
    tracks: 'Tracks',
    credits: 'Credits',
    sources: 'Sources',
    description: 'About',
    backToList: 'Back to list',
    switchLang: '日本語',
    accessedAt: 'accessed',
    entryCount: (n: number) => `${n} ${n === 1 ? 'entry' : 'entries'}`,
    releases: 'Releases',
    releaseCount: (n: number) => `${n} ${n === 1 ? 'release' : 'releases'}`,
    otherReleases: 'Other releases of this work',
    primaryRelease: 'Original',
    reissue: 'Reissue',
    live: 'Live',
    venue: 'Venue',
    tour: 'Tour',
    setlist: 'Setlist',
    lineup: 'Lineup',
    guestAt: 'Guest at',
    withActs: 'With',
    encore: 'Encore',
    cover: 'cover',
    originalBy: 'orig.',
    support: 'support',
    noSetlist: 'Setlist not confirmed',
    media: 'Media',
    outlet: 'Outlet',
    program: 'Program',
    issue: 'Issue',
    pages: 'Pages',
    showSources: 'Show sources',
    hideSources: 'Hide sources',
  },
} as const;

export const typeLabels = {
  ja: {
    'single': 'シングル',
    'album': 'アルバム',
    'mini-album': 'ミニアルバム',
    'compilation': 'コンピレーション',
    'box-set': 'ボックスセット',
    'video': '映像作品',
    'participation': '参加作品',
    'production': 'プロデュース作品',
    'other': 'その他',
  },
  en: {
    'single': 'Single',
    'album': 'Album',
    'mini-album': 'Mini Album',
    'compilation': 'Compilation',
    'box-set': 'Box Set',
    'video': 'Video',
    'participation': 'Participation',
    'production': 'Production',
    'other': 'Other',
  },
} as const;

export const formatLabels = {
  ja: {
    'cd': 'CD',
    'cd-single': 'CDシングル',
    'lp': 'LP',
    '7-inch': '7インチ',
    '12-inch': '12インチ',
    'cassette': 'カセット',
    'digital': 'デジタル配信',
    'vhs': 'VHS',
    'laserdisc': 'レーザーディスク',
    'dvd': 'DVD',
    'blu-ray': 'Blu-ray',
    'other': 'その他',
  },
  en: {
    'cd': 'CD',
    'cd-single': 'CD Single',
    'lp': 'LP',
    '7-inch': '7"',
    '12-inch': '12"',
    'cassette': 'Cassette',
    'digital': 'Digital',
    'vhs': 'VHS',
    'laserdisc': 'LaserDisc',
    'dvd': 'DVD',
    'blu-ray': 'Blu-ray',
    'other': 'Other',
  },
} as const;

export const mediaTypeLabels = {
  ja: {
    'magazine': '雑誌',
    'newspaper': '新聞',
    'tv': 'TV',
    'radio': 'ラジオ',
    'book': '書籍',
  },
  en: {
    'magazine': 'Magazine',
    'newspaper': 'Newspaper',
    'tv': 'TV',
    'radio': 'Radio',
    'book': 'Book',
  },
} as const;

export const sourceTypeLabels = {
  ja: {
    'liner-notes': 'ライナー',
    'official-release': '公式',
    'magazine': '雑誌',
    'book': '書籍',
    'website': 'Web',
    'interview': 'インタビュー',
    'other': 'その他',
  },
  en: {
    'liner-notes': 'Liner',
    'official-release': 'Official',
    'magazine': 'Magazine',
    'book': 'Book',
    'website': 'Web',
    'interview': 'Interview',
    'other': 'Other',
  },
} as const;

export function pickLocalized(s: { ja: string; en: string }, lang: Locale): string {
  return s[lang];
}

export function pickLocalizedOptional(
  s: { ja?: string; en?: string } | undefined,
  lang: Locale,
): string | undefined {
  if (!s) return undefined;
  return s[lang] ?? s[lang === 'ja' ? 'en' : 'ja'];
}

export function localePath(lang: Locale, path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return lang === 'ja' ? normalized : `/en${normalized === '/' ? '' : normalized}`;
}

export function stripLocalePrefix(pathname: string): string {
  if (pathname.startsWith('/en/')) return pathname.slice(3);
  if (pathname === '/en') return '/';
  return pathname;
}
