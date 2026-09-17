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

export const bookDictionary = {
  "ĐẠI THỪA KHỞI TÍN LUẬN TRỰC GIẢI": "大乘起信论直解",
  "VÔ NIỆM VIÊN THÔNG YẾU QUYẾT": "无念圆通要决",
  "KIM CANG KINH TÔNG THÔNG": "金刚经宗通",
  "LĂNG GIÀ KINH TÔNG THÔNG": "楞伽经宗通",
  "LĂNG NGHIÊM KINH TÔNG THÔNG": "楞严经宗通",
  "THIỀN TÔNG QUYẾT NGHI TẬP": "禅宗决疑集",
};
