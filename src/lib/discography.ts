import type { CollectionEntry } from 'astro:content';

export type DiscographyEntry = CollectionEntry<'discography'>;

export interface ReleaseGroup {
  key: string;
  primary: DiscographyEntry;
  members: DiscographyEntry[];
}

function dateKey(entry: DiscographyEntry): string {
  return entry.data.releaseDate ?? '9999-99-99';
}

function groupKeyFor(entry: DiscographyEntry): string {
  return entry.data.releaseGroup ?? entry.id;
}

export function groupReleases(entries: DiscographyEntry[]): ReleaseGroup[] {
  const buckets = new Map<string, DiscographyEntry[]>();
  for (const entry of entries) {
    const key = groupKeyFor(entry);
    const list = buckets.get(key);
    if (list) list.push(entry);
    else buckets.set(key, [entry]);
  }
  const groups: ReleaseGroup[] = [];
  for (const [key, members] of buckets) {
    const sorted = members.toSorted((a, b) => dateKey(a).localeCompare(dateKey(b)));
    groups.push({ key, primary: sorted[0]!, members: sorted });
  }
  return groups.toSorted((a, b) =>
    dateKey(a.primary).localeCompare(dateKey(b.primary))
  );
}

export function findSiblings(
  all: DiscographyEntry[],
  entry: DiscographyEntry,
): DiscographyEntry[] {
  const key = groupKeyFor(entry);
  return all
    .filter((e) => e.id !== entry.id && groupKeyFor(e) === key)
    .toSorted((a, b) => dateKey(a).localeCompare(dateKey(b)));
}

export function isPrimary(
  all: DiscographyEntry[],
  entry: DiscographyEntry,
): boolean {
  const key = groupKeyFor(entry);
  const siblings = all
    .filter((e) => groupKeyFor(e) === key)
    .toSorted((a, b) => dateKey(a).localeCompare(dateKey(b)));
  return siblings[0]?.id === entry.id;
}
