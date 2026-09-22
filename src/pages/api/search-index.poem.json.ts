import type { APIRoute } from "astro";
import { poems, getAllStanzas } from "@/data/poetry/poems.ts";

export const GET: APIRoute = () => {
  const entries = poems.flatMap((poem) => [
    {
      type: "poem",
      title: poem.title,
      author: poem.author,
      url: `/poems/${poem.slug}`,
      category: poem.category,
    },
    ...getAllStanzas(poem).map((stanza) => ({
      type: "stanza",
      title: `${stanza.number}. ${stanza.title}`,
      author: poem.title,
      url: `/poems/${poem.slug}/${stanza.slug}`,
      category: poem.category,
    })),
  ]);

  return new Response(JSON.stringify(entries), {
    headers: { "Content-Type": "application/json" },
  });
};
