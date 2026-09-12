export const labels = {
  "nav.goHome": "← 🛖",
  "nav.poemStorage": "Kho thơ",
  "nav.goPoemStorage": "← Kho thơ",
  "stanza.label": "Đoạn",
  "stanza.empty": "Đoạn này vẫn chưa xuất bản.",
  "storage.poems": "thơ",
  "storage.stanzas": "đoạn",
  "404.title": "Trang không tìm thấy",
  "404.description": "Trang bạn đang tìm kiếm không tồn tại.",
  "404.goPoemstorage": "← Kho sách",
} as const;

export type LabelKey = keyof typeof labels;

export function l(key: LabelKey): string {
  return labels[key];
}
