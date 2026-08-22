import yaml from "js-yaml";
import fs from "node:fs";
import path from "node:path";

export interface Koan {
  slug: string;
  number: number;
  title: string;
  tag?: Tag;
}

export interface Part {
  title: string;
  koans?: Koan[];
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
  source?: string;
  videoIds?: any;
  parts?: Part[];
}

interface RecordYaml {
  title: string;
  author: string;
  translator?: string;
  publisher: string;
  category: string;
  cover?: string;
  videoIds?: any;
  parts?: Part[];
}

export interface KoanFile {
  filePath: string;
  extension: "md" | "mdx";
  content: string;
}

// Hàm tìm và trả về đường dẫn file .md hoặc .mdx
export function getKoanFilePath(
  recordSlug: string,
  koanSlug: string,
): { filePath: string; extension: "md" | "mdx" } | null {
  const baseDir = path.join(process.cwd(), "src/content/koans", recordSlug);

  const mdxPath = path.join(baseDir, `${koanSlug}.mdx`);
  if (fs.existsSync(mdxPath)) {
    return { filePath: mdxPath, extension: "mdx" };
  }

  const mdPath = path.join(baseDir, `${koanSlug}.md`);
  if (fs.existsSync(mdPath)) {
    return { filePath: mdPath, extension: "md" };
  }

  return null;
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
      parts:
        data?.parts?.map((p) => ({
          title: p.title,
          koans:
            p.koans?.map((k) => ({
              slug: k.slug,
              number: k.number,
              title: k.title,
              tag: k?.tag,
            })) || [],
        })) || [],
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
  if (!record) throw new Error(`Record not found: ${slug}`);
  return record;
}

export function getAllKoans(record: Record) {
  return record.parts?.flatMap((p) => p.koans);
}
