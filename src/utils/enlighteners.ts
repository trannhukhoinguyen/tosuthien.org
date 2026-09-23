import { getCollection, type CollectionEntry } from 'astro:content';

/**
 * Get all articles sorted by order and title.
 */
export async function getAllEnlighteners() {
    const enlighteners = await getCollection('enlighteners');
    return enlighteners.sort((a: CollectionEntry<'enlighteners'>, b: CollectionEntry<'enlighteners'>) => {
        if (a.data.order !== b.data.order) {
            return a.data?.order - b.data?.order;
        }
        return a.data.title.localeCompare(b.data.title);
    });
}

/**
 * Get articles grouped by category.
 */
export async function getEnlightenersByCategory() {
    const allEnlighteners = await getAllEnlighteners();
    const categories: Record<string, CollectionEntry<'enlighteners'>[]> = {};

    allEnlighteners.forEach((enlightener: CollectionEntry<'enlighteners'>) => {
        const category = enlightener.data.category || 'Uncategorized';
        if (!categories[category]) {
            categories[category] = [];
        }
        categories[category].push(enlightener);
    });

    return categories;
}

/**
 * Get the list of all unique categories.
 */
export async function getCategories() {
    const enlighteners = await getCollection('enlighteners');
    const categories = new Set(enlighteners.map((enlightener: CollectionEntry<'enlighteners'>) => enlightener.data.category).filter(Boolean));
    return Array.from(categories).sort();
}

/**
 * Get the navigation structure for the enlightenerumentation.
 */
export async function getEnlightenersNav() {
    const categories = await getEnlightenersByCategory();
    return Object.keys(categories).sort().map(category => ({
        name: category,
        items: categories[category]
    }));
}

/**
 * Convert a collection entry id into a route slug (without file extension).
 */
export function getEnlightenerSlug(enlightener: Pick<CollectionEntry<'enlighteners'>, 'id'>): string {
    return enlightener.id.replace(/\.(md|mdx)$/i, '');
}

/**
 * Build the enlighteners URL for a collection entry.
 */
export function getEnlightenerUrl(enlightener: Pick<CollectionEntry<'enlighteners'>, 'id'>): string {
    return `/enlighteners/${getEnlightenerSlug(enlightener)}`;
}
