import yaml from "js-yaml";
import fs from "node:fs";
import path from "node:path";

export interface Stanza {
  slug: string;
  number: number;
  title: string;
}

export interface Part {
  title: string;
  stanzas: Stanza[];
}

export type Tag = string;
export type Category = string;

export interface Poem {
  slug: string;
  title: string;
  author: string;
  translator: string;
  publisher: string;
  category: Category;
  tags?: Tag[];
  cover?: string;
  source?: string;
  parts: Part[];
}

interface PoemYaml {
  title: string;
  author: string;
  translator?: string;
  publisher: string;
  category: string;
  tags?: Tag[];
  cover?: string;
  parts: Part[];
}

function loadPoems(): Poem[] {
  const poemsDir = path.join(process.cwd(), "src/content/poems");
  if (!fs.existsSync(poemsDir)) return [];

  const entries = fs.readdirSync(poemsDir, { withFileTypes: true });
  const result: Poem[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const yamlPath = path.join(poemsDir, entry.name, "poem.yaml");
    if (!fs.existsSync(yamlPath)) continue;

    const raw = fs.readFileSync(yamlPath, "utf-8");
    const data = yaml.load(raw) as PoemYaml;

    result.push({
      slug: entry.name,
      title: data.title,
      author: data.author,
      translator: data.translator ?? "",
      publisher: data.publisher,
      category: data.category,
      tags: data.tags,
      cover: data.cover,
      parts:
        data.parts.map((p) => ({
          title: p.title,
          stanzas:
            p.stanzas.map((s) => ({
              slug: s.slug,
              number: s.number,
              title: s.title,
            })) || [],
        })) || [],
    });
  }

  return result.sort((a, b) => a.title.localeCompare(b.title));
}

export const poems: Poem[] = loadPoems();

export const categories: { key: string; label: string }[] = [
  ...new Set(poems.map((p) => p.category)),
].map((key) => ({ key, label: key }));

export const tags: {
  key: string | undefined;
  label: string | undefined;
}[] = [...new Set(poems.map((p) => p.tags)?.flat())].map((key) => ({
  key,
  label: key,
}));

export function getPoem(slug: string): Poem {
  const poem = poems.find((p) => p.slug === slug);
  if (!poem) throw new Error(`Poem not found: ${slug}`);
  return poem;
}

export function getAllStanzas(poem: Poem) {
  return poem.parts.flatMap((p) => p.stanzas);
}
