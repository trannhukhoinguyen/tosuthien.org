import { config } from "../config.ts";
// ["blogs", "books", "interpretations", "sutras", "koans", "places", "practices", "masters", "speeches", "faqs", "precepts", "films"]

// derive type từ mảng config.collections
export type CollectionType = typeof config.collections[number];

export const ICONS_MAP: Record<CollectionType, Record<string, string>> = {
  eatery: {
    'Giới thiệu': '📍️️',
    'Chưa phân loại': '📍️',
    categorized: '🥗',
  },

  places: {
    'Giới thiệu': '📍',
    'Chưa phân loại': '📍',
    categorized: '🚩',
  },

  pagodas: {
    'Giới thiệu': '📍',
    'Chưa phân loại': '📍',
    categorized: '⛩️',
  },

  buddhas: {
    'Giới thiệu': '☀️',
    'Chưa phân loại': '☀️',
    categorized: '☀️',
  },

  bodhisattvas: {
    'Giới thiệu': '☀️',
    'Chưa phân loại': '☀️',
    categorized: '🪷',
  },

  masters: {
    'Giới thiệu': '💫',
    'Chưa phân loại': '💫',
    categorized: '🌟',
  },

  kings: {
    'Giới thiệu': '👑',
    'Chưa phân loại': '👑',
    categorized: '🤴',
  },

  faqs: {
    'Giới thiệu': '❓',
    'Chưa phân loại': '❓',
    categorized: '❓',
  },

  koans: {
    'Giới thiệu': '🪨',
    'Chưa phân loại': '🪨',
    categorized: '⚡️',
  },

  speeches: {
    'Giới thiệu': '💭',
    'Chưa phân loại': '💭',
    categorized: '💬',
  },

  teachings: {
    'Giới thiệu': '💭',
    'Chưa phân loại': '💭',
    categorized: '💬',
  },

  practices: {
    'Giới thiệu': '🎯',
    'Chưa phân loại': '🧩',
    categorized: '⏰',
  },

  blogs: {
    'Giới thiệu': '🪧',
    'Chưa phân loại': '📰',
    categorized: '📑',
  },

  symptoms: {
    'Giới thiệu': '‍🌀',
    'Chưa phân loại': '🌀',
    categorized: '🌀',
    'TRIỆU CHỨNG TỐT': '✅',
    'THIỀN BỆNH': '❌',
  },

  wordpress: {
    'Giới thiệu': '🌸',
    'Chưa phân loại': '🌻',
    categorized: '🌼',
  },

  sutras: {
    'Giới thiệu': '📚',
    'Chưa phân loại': '📚',
    categorized: '📒',
  },

  precepts: {
    'Giới thiệu': '📓',
    'Chưa phân loại': '📓',
    categorized: '📙',
  },

  interpretations: {
    'Giới thiệu': '📓',
    'Chưa phân loại': '📓',
    categorized: '📗',
  },

  books: {
    'Giới thiệu': '📓',
    'Chưa phân loại': '📓',
    categorized: '📘',
  },

  textBooks: {
    'Giới thiệu': '📓',
    'Chưa phân loại': '📓',
    categorized: '📕',
  },

  films: {
    'Giới thiệu': '🎬',
    'Chưa phân loại': '🎬',
    categorized: '🎥',
  },
};
