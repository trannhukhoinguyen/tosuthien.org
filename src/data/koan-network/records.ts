import yaml from "js-yaml";
import fs from "node:fs";
import path from "node:path";

export interface Koan {
  slug: string;
  number: number;
  title: string;
  tag: Tag;
}

export interface Part {
  title: string;
  koans: Koan[];
}

export type Tag = string;
export type Category = string;

export interface Record {
  slug: string;
  title: string;
  author: string;
  translator: string;
  publisher: string;
  category: Category;
  cover?: string;
  videoIds?: any;
  parts: Part[];
}

interface RecordYaml {
  title: string;
  author: string;
  translator?: string;
  publisher: string;
  category: string;
  cover?: string;
  videoIds?: any;
  parts: {
    title: string;
    koans: {
      slug: string;
      number: number;
      title: string;
    }[];
  }[];
}

function loadRecords(): Record[] {
  const recordsDir = path.join(process.cwd(), "src/content/koans");
  if (!fs.existsSync(recordsDir)) return [];

  const entries = fs.readdirSync(recordsDir, { withFileTypes: true });
  const result: Record[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const yamlPath = path.join(recordsDir, entry.name, "record.yaml");
    if (!fs.existsSync(yamlPath)) continue;

    const raw = fs.readFileSync(yamlPath, "utf-8");
    const data = yaml.load(raw) as RecordYaml;

    result.push({
      slug: entry.name,
      title: data.title,
      author: data.author,
      translator: data.translator ?? "",
      publisher: data.publisher,
      category: data.category,
      cover: data.cover,
      videoIds: data.videoIds ?? null,
      parts: data.parts.map((p) => ({
        title: p.title,
        koans: p.koans.map((ch) => ({
          slug: ch.slug,
          number: ch.number,
          title: ch.title,
        })),
      })),
    });
  }

  return result.sort((a, b) => a.title.localeCompare(b.title));
}

export const records: Record[] = loadRecords();

export const categories: { key: string; label: string }[] = [
  ...new Set(records.map((b) => b.category)),
].map((key) => ({ key, label: key }));

export function getRecord(slug: string): Record {
  const record = records.find((b) => b.slug === slug);
  if (!record) throw new Error(`Book not found: ${slug}`);
  return record;
}

export function getAllKoans(record: Record) {
  return record.parts.flatMap((p) => p.koans);
}
