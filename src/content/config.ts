import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const TODAY = () => new Date();
export const GALLERY_PATH = "src/content/galleries";
export const DOCS_PATH = "src/content/docs";
export const POETRY_PATH = "src/content/poetry";
export const MASTER_IMAGE_DEFAULT_PATH = "/images/unknown-zen-master.jpg";
export const OTHER_IMAGE_DEFAULT_PATH = "/images/zen/gate-3.jpg";

const buddhas = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/buddhas" }),
  schema: z.object({
    type: z.string().default("buddhas"),
    schemaType: z.string().default("Person"),
    title: z.string().default("Phật"),
    description: z.string().optional(),
    date: z.coerce.date().default(TODAY),
    excerpt: z.string().optional(),
    categories: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
  }),
});

const bodhisattvas = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/bodhisattvas" }),
  schema: z.object({
    type: z.string().default("bodhisattvas"),
    schemaType: z.string().default("Person"),
    title: z.string().default("Bồ tát"),
    description: z.string().optional(),
    date: z.coerce.date().default(TODAY),
    excerpt: z.string().optional(),
    categories: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
  }),
});

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
    image: z.union([z.string(), z.object({}).passthrough()]).optional().default(MASTER_IMAGE_DEFAULT_PATH),
  }),
});

const layman = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/layman" }),
  schema: z.object({
    type: z.string().default("layman"),
    schemaType: z.string().default("Person"),
    title: z.string().default("Cư sĩ"),
    description: z.string().optional(),
    date: z.coerce.date().default(TODAY),
    excerpt: z.string().optional(),
    categories: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    image: z.union([z.string(), z.object({}).passthrough()]).optional().default(MASTER_IMAGE_DEFAULT_PATH),
  }),
});

const kings = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/kings" }),
  schema: z.object({
    type: z.string().default("kings"),
    schemaType: z.string().default("Person"),
    title: z.string().default("Vua"),
    description: z.string().optional(),
    date: z.coerce.date().default(TODAY),
    excerpt: z.string().optional(),
    categories: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    image: z.union([z.string(), z.object({}).passthrough()]).optional().default(MASTER_IMAGE_DEFAULT_PATH),
  }),
});

const eatery = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/eatery" }),
  schema: z.object({
    type: z.string().default("eatery"),
    schemaType: z.string().default("Place"),
    title: z.string().default("Quán ăn Chay"),
    description: z.string().optional(),
    excerpt: z.string().optional(),
    categories: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
  }),
});

const places = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/places" }),
  schema: z.object({
    type: z.string().default("places"),
    schemaType: z.string().default("Place"),
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
    type: z.string().default("pagodas"),
    schemaType: z.string().default("Place"),
    title: z.string().default("Thiền đường"),
    description: z.string().optional(),
    excerpt: z.string().optional(),
    categories: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
  }),
});

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

/*const books = defineCollection({
  loader: glob({ pattern: "**!/[^_]*.{md,mdx}", base: "./src/content/books" }),
  schema: z.object({
    type: z.string().default("books"),
    schemaType: z.string().default("Book"),
    title: z.string().default("Sách"),
    description: z.string().optional(),
    date: z.coerce.date().default(TODAY),
    excerpt: z.string().optional(),
    categories: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
  }),
});*/

const textBooks = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/textBooks" }),
  schema: z.object({
    type: z.string().default("textBooks"),
    schemaType: z.string().default("Book"),
    title: z.string().default("Sách Giáo khoa"),
    description: z.string().optional(),
    date: z.coerce.date().default(TODAY),
    excerpt: z.string().optional(),
    categories: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
  }),
});

/*const koans = defineCollection({
  loader: glob({ pattern: "**!/[^_]*.{md,mdx}", base: "./src/content/koans" }),
  schema: z.object({
    type: z.string().default("koans"),
    schemaType: z.string().default("CreativeWork"),
    title: z.string().default("Công án"),
    description: z.string().optional(),
    date: z.coerce.date().default(TODAY),
    excerpt: z.string().optional(),
    categories: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
  }),
});*/

const sutras = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/sutras" }),
  schema: z.object({
    type: z.string().default("sutras"),
    schemaType: z.string().default("CreativeWork"),
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
    schemaType: z.string().default("CreativeWork"),
    title: z.string().default("Luận"),
    description: z.string().optional(),
    date: z.coerce.date().default(TODAY),
    excerpt: z.string().optional(),
    categories: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    image: z.string().optional().default(OTHER_IMAGE_DEFAULT_PATH),
  }),
});

const practices = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/content/practices",
  }),
  schema: z.object({
    type: z.string().default("practices"),
    schemaType: z.string().default("CreativeWork"),
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
    schemaType: z.string().default("CreativeWork"),
    title: z.string().default("Bài Giảng Khai Thị"),
    description: z.string().optional(),
    date: z.coerce.date().default(TODAY),
    excerpt: z.string().optional(),
    categories: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
  }),
});

const teachings = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/content/teachings",
  }),
  schema: z.object({
    type: z.string().default("teachings"),
    schemaType: z.string().default("CreativeWork"),
    title: z.string().default("Đối Đáp Căn Cơ"),
    description: z.string().optional(),
    date: z.coerce.date().default(TODAY),
    excerpt: z.string().optional(),
    categories: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
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
    title: z.string().default("Sức khỏe"),
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

const poetry = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: `./${POETRY_PATH}` }),
  schema: z.object({
    type: z.string().default("poetry"),
    schemaType: z.string().default("Article"),
    title: z.string().default("Thơ Phật Giáo"),
    description: z.string().optional(),
    author: z.string().optional(),
    date: z.coerce.date().default(TODAY),
    categories: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    image: z.string().optional().default(OTHER_IMAGE_DEFAULT_PATH),
  }),
});

const galleries = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: `./${GALLERY_PATH}` }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      draft: z.boolean().optional(),
      cover: image().optional(),
      tags: z.array(z.string()).default([]),
    }),
});

const docs = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: `./${DOCS_PATH}` }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    order: z.number().default(0),
    publishedDate: z.coerce.date().optional(),
    lastUpdated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    featuredImage: z.string().optional(),
    author: z.string().optional(),
    tableOfContents: z.boolean().default(true),
  }),
});

export const collections = {
  buddhas,
  bodhisattvas,
  masters,
  layman,
  kings,

  blogs,
  symptoms,
  wordpress,

  eatery,
  places,
  pagodas,

  // books,
  textBooks,

  sutras,
  interpretations,
  practices,

  speeches,
  teachings,

  // koans,
  faqs,
  health,
  precepts,
  films,
  poetry,

  galleries,

  docs,
};
