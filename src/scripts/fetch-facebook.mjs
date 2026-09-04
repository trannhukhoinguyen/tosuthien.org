// scripts/fetch-facebook.mjs
import Parser from 'rss-parser';
import fs from 'fs';
import path from 'path';

const parser = new Parser();
// 🔴 Thay URL RSS của bạn vào đây
const RSS_URL = 'https://rss.app/feeds/S5Iyec4KG0vj9N4K.xml'; 
const OUTPUT_DIR = path.join(process.cwd(), 'src/content/facebook');

// Đảm bảo thư mục lưu trữ tồn tại
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function syncFacebookPosts() {
  try {
    console.log('Đang tải dữ liệu từ RSS Facebook...');
    const feed = await parser.parseURL(RSS_URL);

    for (const item of feed.items) {
      // Tạo ID duy nhất cho bài viết dựa trên GUID hoặc Link
      const rawId = item.guid || item.link || item.pubDate;
      const postId = rawId.replace(/[^a-zA-Z0-9]/g, '_').slice(-20);
      const filePath = path.join(OUTPUT_DIR, `${postId}.md`);

      // Nếu bài viết đã tồn tại thì bỏ qua
      if (fs.existsSync(filePath)) {
        continue;
      }

      const title = (item.title || 'Bài viết Facebook mới')
        .replace(/"/g, '\\"')
        .replace(/\n/g, ' ');
      const pubDate = new Date(item.pubDate || Date.now()).toISOString();
      const link = item.link || '';
      const content = item.contentSnippet || item.content || '';

      // Định dạng file Markdown cho Astro Content Collections
      const fileContent = `---
title: "${title}"
pubDate: ${pubDate}
link: "${link}"
id: "${postId}"
---

${content}
`;

      fs.writeFileSync(filePath, fileContent, 'utf-8');
      console.log(`+ Đã tạo bài viết mới: ${postId}.md`);
    }

    console.log('Hoàn thành cập nhật bài viết!');
  } catch (error) {
    console.error('Lỗi khi cào dữ liệu Facebook:', error);
    process.exit(1);
  }
}

syncFacebookPosts();
