import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const TODAY = () => new Date();

const blogs = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/blogs" }),
  schema: z.object({
    type: z.string().default("blogs"),
    schemaType: z.string().default("Article"),
    title: z.string().default("Bài nghiên cứu"),
    description: z.string().optional(),
    date: z.coerce.date().default(TODAY),
    excerpt: z.string().optional(),
    categories: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
  }),
});

const symptoms = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/symptoms" }),
  schema: z.object({
    type: z.string().default("symptoms"),
    schemaType: z.string().default("Article"),
    title: z.string().default("Triệu chứng"),
    description: z.string().optional(),
    date: z.coerce.date().default(TODAY),
    excerpt: z.string().optional(),
    categories: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
  }),
});

const wordpress = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/wordpress" }),
  schema: z.object({
    type: z.string().default("wordpress"),
    schemaType: z.string().default("Article"),
    title: z.string().default("Duy Lực Thiền"),
    description: z.string().optional(),
    date: z.coerce.date().default(TODAY),
    excerpt: z.string().optional(),
    categories: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
  }),
});

const places = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/blogs" }),
  schema: z.object({
    type: z.string().default("places"),
    schemaType: z.string().default("Article"),
    title: z.string().default("Địa điểm"),
    description: z.string().optional(),
    excerpt: z.string().optional(),
    categories: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
  }),
});

const pagodas = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/pagodas" }),
  schema: z.object({
    type: z.string().default("places"),
    schemaType: z.string().default("Article"),
    title: z.string().default("Thiền đường"),
    description: z.string().optional(),
    excerpt: z.string().optional(),
    categories: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
  }),
});

const books = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/books" }),
  schema: z.object({
    type: z.string().default("books"),
    schemaType: z.string().default("Books"),
    title: z.string().default("Sách"),
    description: z.string().optional(),
    date: z.coerce.date().default(TODAY),
    excerpt: z.string().optional(),
    categories: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
  }),
});

const koans = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/koans" }),
  schema: z.object({
    type: z.string().default("koans"),
    schemaType: z.string().default("Article"),
    title: z.string().default("Công án"),
    description: z.string().optional(),
    date: z.coerce.date().default(TODAY),
    excerpt: z.string().optional(),
    categories: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
  }),
});

const sutras = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/sutras" }),
  schema: z.object({
    type: z.string().default("sutras"),
    schemaType: z.string().default("Article"),
    title: z.string().default("Kinh"),
    description: z.string().optional(),
    date: z.coerce.date().default(TODAY),
    excerpt: z.string().optional(),
    categories: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
  }),
});

const interpretations = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/content/interpretations",
  }),
  schema: z.object({
    type: z.string().default("interpretations"),
    schemaType: z.string().default("Article"),
    title: z.string().default("Luận"),
    description: z.string().optional(),
    date: z.coerce.date().default(TODAY),
    excerpt: z.string().optional(),
    categories: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    image: z.string().optional().default("/images/backgrounds/unknown-zen-master-on-moon.jpg"),
  }),
});

const practices = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/content/practices",
  }),
  schema: z.object({
    type: z.string().default("practices"),
    schemaType: z.string().default("Article"),
    title: z.string().default("Thực hành"),
    description: z.string().optional(),
    date: z.coerce.date().default(TODAY),
    excerpt: z.string().optional(),
    categories: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
  }),
});

const speeches = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/content/speeches",
  }),
  schema: z.object({
    type: z.string().default("speeches"),
    schemaType: z.string().default("Article"),
    title: z.string().default("Ngữ lục"),
    description: z.string().optional(),
    date: z.coerce.date().default(TODAY),
    excerpt: z.string().optional(),
    categories: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
  }),
});

/*const teachings = defineCollection({
  loader: glob({
    pattern: "**!/[^_]*.{md,mdx}",
    base: "./src/content/teachings",
  }),
  schema: z.object({
    type: z.string().default("teachings"),
    schemaType: z.string().default("Article"),
    title: z.string().default("Cổ Tôn Túc Ngữ lục"),
    description: z.string().optional(),
    date: z.coerce.date().default(TODAY),
    excerpt: z.string().optional(),
    categories: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
  }),
});*/

const masters = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/masters" }),
  schema: z.object({
    type: z.string().default("masters"),
    schemaType: z.string().default("Person"),
    title: z.string().default("Thiền sư"),
    description: z.string().optional(),
    date: z.coerce.date().default(TODAY),
    excerpt: z.string().optional(),
    categories: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    image: z.union([z.string(), z.object({}).passthrough()]).optional().default("/images/unknown-zen-master.jpg"),
  }),
});

const faqs = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/faqs" }),
  schema: z.object({
    type: z.string().default("faqs"),
    schemaType: z.string().default("FAQPage"),
    title: z.string().default("Hỏi đáp"),
    description: z.string().optional(),
    date: z.coerce.date().default(TODAY),
    excerpt: z.string().optional(),
    categories: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
  }),
});

const health = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/health" }),
  schema: z.object({
    type: z.string().default("health"),
    schemaType: z.string().default("Article"),
    title: z.string().default("Hỏi đáp"),
    description: z.string().optional(),
    date: z.coerce.date().default(TODAY),
    excerpt: z.string().optional(),
    categories: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
  }),
});

const precepts = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/precepts" }),
  schema: z.object({
    type: z.string().default("precepts"),
    schemaType: z.string().default("Article"),
    title: z.string().default("Luật"),
    description: z.string().optional(),
    date: z.coerce.date().default(TODAY),
    excerpt: z.string().optional(),
    categories: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
  }),
});

const films = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/films" }),
  schema: z.object({
    type: z.string().default("films"),
    schemaType: z.string().default("Video"),
    title: z.string().default("Phim Phật Giáo"),
    description: z.string().optional(),
    date: z.coerce.date().default(TODAY),
    excerpt: z.string().optional(),
    categories: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
  }),
});

/*const gallery = defineCollection({
  loader: glob({ pattern: "**!/[^_]*.{md,mdx}", base: "./src/content/gallery" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      cover: image(),
    }),
});*/

export const collections = {
  blogs,
  symptoms,
  wordpress,

  places,
  pagodas,
  books,
  sutras,
  interpretations,
  practices,
  masters,
  speeches,
  koans,
  // teachings,
  faqs,
  health,
  precepts,
  films,

  // gallery,
};
