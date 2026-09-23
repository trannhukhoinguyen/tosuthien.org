import { getCollection } from "astro:content";
import type { APIRoute } from "astro";
import { getEnlightenerUrl } from "@/utils/enlighteners.ts";

export const prerender = true;

export const GET: APIRoute = async () => {
  const enlighteners = await getCollection("enlighteners");

  const normalized = enlighteners.map((enlightener) => ({
    url: getEnlightenerUrl(enlightener),
    title: enlightener.data.title,
    excerpt:
      enlightener.data.description ||
      `Learn more about ${enlightener.data.title}.`,
    category: enlightener.data.category || "General",
  }));

  const body = {
    generatedAt: new Date().toISOString(),
    popular: normalized.slice(0, 8).map((item) => item.title),
    enlighteners: normalized,
  };

  return new Response(JSON.stringify(body), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=600",
    },
  });
};
