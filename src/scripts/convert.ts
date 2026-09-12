import fs from "fs";
import path from "path";

const directoryPath = __dirname;
const allData: any[] = [];

// Đọc tất cả các file trong thư mục
const files = fs.readdirSync(directoryPath);

for (const file of files) {
  // Lọc ra các file có đuôi MasterDb.tsx
  if (file.includes("MasterDb.tsx")) {
    // Import động từng file
    const fileData = require(path.join(directoryPath, file)).default;
    if (Array.isArray(fileData)) {
      allData.push(...fileData);
    }
  }
}

// Sửa dòng lưu file thành:
const outputPath = path.join(__dirname, 'AllMastersDb.json');
fs.writeFileSync(outputPath, JSON.stringify(allData, null, 2), 'utf-8');
console.log(
  `Đã gộp ${allData.length} records vào ${outputPath}; run "npx tsx src/scripts/convert.ts"`,
);
