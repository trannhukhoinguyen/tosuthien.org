import type { APIRoute } from "astro";
import AllMasterDb from "@/data/masters/AllMasterDb.tsx";

export const GET: APIRoute = async () => {

  return new Response(JSON.stringify(AllMasterDb, null, 2), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
