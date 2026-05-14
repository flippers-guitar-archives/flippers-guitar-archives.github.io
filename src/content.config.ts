import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const localized = z.object({
  ja: z.string(),
  en: z.string(),
});

const localizedOptional = z.object({
  ja: z.string().optional(),
  en: z.string().optional(),
});

const source = z.object({
  type: z.enum([
    'liner-notes',
    'official-release',
    'magazine',
    'book',
    'website',
    'interview',
    'other',
  ]),
  citation: z.string(),
  url: z.string().url().optional(),
  accessedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  note: z.string().optional(),
});

const credit = z.object({
  role: localized,
  name: z.string(),
});

const track = z.object({
  number: z.number().int().positive(),
  title: localized,
  duration: z.string().regex(/^\d+:\d{2}$/).optional(),
  credits: z.array(credit).optional(),
  notes: localizedOptional.optional(),
});

const discography = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/discography' }),
  schema: z.object({
    type: z.enum([
      'single',
      'album',
      'mini-album',
      'compilation',
      'box-set',
      'video',
      'participation',
      'production',
      'other',
    ]),
    title: localized,
    artist: z.string().default("Flipper's Guitar"),
    releaseGroup: z.string().optional(),
    releaseDate: z.string().regex(/^\d{4}(-\d{2}(-\d{2})?)?$/).optional(),
    catalogNumber: z.string().optional(),
    label: z.string().optional(),
    formats: z.array(z.enum([
      'cd', 'cd-single', 'lp', '7-inch', '12-inch', 'cassette', 'digital',
      'vhs', 'laserdisc', 'dvd', 'blu-ray',
      'other',
    ])).optional(),
    credits: z.array(credit).optional(),
    tracks: z.array(track).optional(),
    description: localizedOptional.optional(),
    sources: z.array(source).min(1),
    relatedPress: z.array(z.string()).optional(),
    relatedLive: z.array(z.string()).optional(),
    relatedHistory: z.array(z.string()).optional(),
  }),
});

const setlistItem = z.object({
  position: z.number().int().positive(),
  title: localized,
  reference: z.string().optional(),       // discography slug (将来 reference() 化)
  isCover: z.boolean().optional(),
  originalArtist: z.string().optional(),  // カバー時の原曲アーティスト
  encore: z.boolean().optional(),
  notes: localizedOptional.optional(),
});

const lineupMember = z.object({
  name: z.string(),
  role: localized,
  isSupport: z.boolean().optional(),
});

const live = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/live' }),
  schema: z.object({
    title: localized,
    date: z.string().regex(/^\d{4}(-\d{2}(-\d{2})?)?$/).optional(),
    venue: z.object({
      name: localized,
      city: localizedOptional.optional(),
      prefecture: z.string().optional(),
    }),
    tour: z.string().optional(),
    description: localizedOptional.optional(),
    setlist: z.array(setlistItem).optional(),
    lineup: z.array(lineupMember).optional(),
    host: z.string().optional(),               // FG が他アーティストの公演にゲスト出演した場合のホスト名
    withActs: z.array(z.string()).optional(),  // 同じ公演に出演した他アーティスト (対バン w/ / フェス出演者 / FG公演のゲスト)
    relatedMedia: z.array(z.string()).optional(),
    sources: z.array(source).min(1),
  }),
});

const media = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/media' }),
  schema: z.object({
    type: z.enum(['magazine', 'newspaper', 'tv', 'radio', 'book']),
    title: localized,                       // 掲載/放送タイトル (特集名・記事名・コーナー名 等)
    date: z.string().regex(/^\d{4}(-\d{2}(-\d{2})?)?$/).optional(),
    outlet: localized,                      // 媒体名 (雑誌名・新聞名・TV局・ラジオ局・出版社)
    program: localizedOptional.optional(),  // 番組名 (TV/ラジオ専用)
    issue: z.string().optional(),           // 号数 (例: "1990年7月号", "Vol.42")
    pages: z.string().optional(),           // ページ範囲 (例: "pp. 24-31")
    url: z.string().url().optional(),       // オンラインアーカイブ等のURL
    description: localizedOptional.optional(),
    relatedDiscography: z.array(z.string()).optional(),  // 関連リリース (新譜プロモ等)
    relatedLive: z.array(z.string()).optional(),         // 関連ライブ
    sources: z.array(source).min(1),
  }),
});

export const collections = { discography, live, media };
