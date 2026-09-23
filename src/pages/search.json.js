import { globMapLazy, collections } from "@/utils/getMarkdownContent";

export async function GET() {
    const searchData = [];

    // ✅ Lặp qua tất cả collection (blogs, books, sutras, v.v.)
    for (const [name, type] of Object.entries(collections)) {
        const files = globMapLazy[name];

        for (const path in files) {
            const post = await files[path]();
            const url = `${name}/${path
                .replace(/^.*[\\/]/, "")
                .replace(/\.(md|mdx)$/, "")}`;

            searchData.push({
                title: post.frontmatter?.title || "Untitled",
                url,
                type, // ✅ thêm collection type (blog, book, sutra, ...)
                date: post.frontmatter?.date || new Date().toISOString(),
                excerpt:
                    post.frontmatter?.excerpt ||
                    post.frontmatter?.description ||
                    "",
                categories: post.frontmatter?.categories || [],
                tags: post.frontmatter?.tags || [],
            });
        }
    }

    // ✅ Sort theo date mới nhất
    searchData.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return new Response(JSON.stringify(searchData), {
        headers: {
            "Content-Type": "application/json",
        },
    });
}
