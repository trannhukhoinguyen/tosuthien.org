export const labels = {
  "nav.goHome": "← 🛖",
  "nav.koanNetwork": "Mạng lưới Công án",
  "nav.goKoanNetwork": "← Mạng lưới Công án",
  "record.label": "Tập Lục",
  "record.empty": "Tập Lục này vẫn chưa xuất bản.",
  "shelf.record": "tập lục",
  "shelf.koans": "công án",
  "404.title": "Công án không tìm thấy",
  "404.description": "Công án bạn đang tìm kiếm không tồn tại.",
  "404.goKoanNetwork": "← Mạng lưới Công án",
} as const;

export type LabelKey = keyof typeof labels;

export function l(key: LabelKey): string {
  return labels[key];
}
