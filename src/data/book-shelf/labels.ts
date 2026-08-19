export const labels = {
  "nav.goHome": "← 🛖",
  "nav.bookshelf": "Kệ sách",
  "nav.goBookshelf": "← Kệ sách",
  "chapter.label": "Chương",
  "chapter.empty": "Chương này vẫn chưa xuất bản.",
  "shelf.books": "sách",
  "shelf.chapters": "chương",
  "404.title": "Trang không tìm thấy",
  "404.description": "Trang bạn đang tìm kiếm không tồn tại.",
  "404.goBookshelf": "← Kệ sách",
} as const;

export type LabelKey = keyof typeof labels;

export function l(key: LabelKey): string {
  return labels[key];
}
