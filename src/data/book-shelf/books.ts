import yaml from "js-yaml";
import fs from "node:fs";
import path from "node:path";

export interface Chapter {
  slug: string;
  number: number;
  title: string;
}

export interface Part {
  title: string;
  chapters: Chapter[];
}

export type Tag = string;
export type Category = string;

export interface Book {
  slug: string;
  title: string;
  author: string;
  translator: string;
  publisher: string;
  category: Category;
  tags?: Tag[];
  cover?: string;
  source?: string;
  videoIds?: any;
  parts: Part[];
}

interface BookYaml {
  title: string;
  author: string;
  translator?: string;
  publisher: string;
  category: string;
  tags?: Tag[];
  cover?: string;
  videoIds?: any;
  parts: Part[];
}

function loadBooks(): Book[] {
  const booksDir = path.join(process.cwd(), "src/content/books");
  if (!fs.existsSync(booksDir)) return [];

  const entries = fs.readdirSync(booksDir, { withFileTypes: true });
  const result: Book[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const yamlPath = path.join(booksDir, entry.name, "book.yaml");
    if (!fs.existsSync(yamlPath)) continue;

    const raw = fs.readFileSync(yamlPath, "utf-8");
    const data = yaml.load(raw) as BookYaml;

    result.push({
      slug: entry.name,
      title: data.title,
      author: data.author,
      translator: data.translator ?? "",
      publisher: data.publisher,
      category: data.category,
      tags: data.tags,
      cover: data.cover,
      videoIds: data.videoIds ?? null,
      parts:
        data.parts.map((p) => ({
          title: p.title,
          chapters:
            p.chapters.map((ch) => ({
              slug: ch.slug,
              number: ch.number,
              title: ch.title,
            })) || [],
        })) || [],
    });
  }

  return result.sort((a, b) => a.title.localeCompare(b.title));
}

export const books: Book[] = loadBooks();

export const categories: { key: string; label: string }[] = [
  ...new Set(books.map((b) => b.category)),
].map((key) => ({ key, label: key }));

export const tags: {
  key: string | undefined;
  label: string | undefined;
}[] = [...new Set(books.map((b) => b.tags)?.flat())].map((key) => ({
  key,
  label: key,
}));

export function getBook(slug: string): Book {
  const book = books.find((b) => b.slug === slug);
  if (!book) throw new Error(`Book not found: ${slug}`);
  return book;
}

export function getAllChapters(book: Book) {
  return book.parts.flatMap((p) => p.chapters);
}
