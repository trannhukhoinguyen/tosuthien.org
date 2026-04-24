import type { KoanTitle, Koan } from "@/types.ts";

/*
* Xutang ji 虛堂集 (Empty hall anthology)
* (虛堂集, Kidōshū): 6 quyển,
* san hành vào năm đầu (1295) niên hiệu Nguyên Trinh (元貞) nhà Nguyên.
* Nguyên văn: Lâm Tuyền Lão Nhân Bình Xướng Đơn Hà Thuần Thiền Sư Tụng Cổ Hư Đường Tập
* (林泉老人評唱丹霞淳禪師頌古虛堂集, Rinsenrōjinhyōshōtankajunzenjijukokidōshū).
* Đây là tập thâu 6 100 tắc tụng cổ của TS. Đan Hà Tử Thuần (丹霞子淳) nhà Tống để làm kim chỉ nam cho hàng hậu học biện đạo.
* Từ các bài tụng cổ được thâu 6 trong Đơn Hà Ngữ Lục (丹霞語錄),
* mỗi tắc có lời dạy chúng của Lâm Tuyền Lão Nhân (TS. Lâm Tuyền Tùng Luân - 林泉從倫),
* rồi được thêm vào trước ngữ cho cổ tắc do Đơn Hà nêu lên, kế đến thêm vào tụng cổ của Đơn Hà,
* cuối cùng có lời bình xướng của TS. Lâm Tuyền Tùng Luân (林泉從倫).
* https://www.rongmotamhon.net/xem-kinh_lam-tuyen-lao-nhon-binh_ddpmtdsc_muc-luc.html
* */

export const XutangjiTitles: KoanTitle[] = [

]

const Xutangji: Koan[] = [
 /* {
    id: 1,
    titleOfficial: "Thanh Nguyên giai cấp sâm học",
    title: "Không rơi giai cấp",
    group: 1,
    path: "vhc001-giai-cap-sam-hoc",
    description: "...",
  },
  {
    id: 2,
    titleOfficial: "Thạch Đầu Tào khê đối cơ",
    title: "Tào khê đối cơ",
    group: 1,
    path: "vhc002-tao-khe-doi-co",
    description: "...",
  },
  {
    id: 3,
    titleOfficial: "Dược Sơn toạ thứ thiền định",
    title: "Toạ thứ thiền định",
    group: 1,
    path: "vhc003-giai-cap-sam-hoc",
    description: "...",
  },
  {
    id: 4,
    titleOfficial: "Thuyền Tử Giáp Sơn chu tiếp",
    title: "",
    group: 1,
    path: "vhc004-",
    description: "...",
  },
  {
    id: 5,
    titleOfficial: "Bế thụ Đỗng Sơn sâm học",
    title: "",
    group: 1,
    path: "vhc005-",
    description: "...",
  },
  {
    id: 6,
    titleOfficial: "Sa di trụ am Vũ Tuyết",
    title: "",
    group: 1,
    path: "vhc006-",
    description: "...",
  },
  {
    id: 7,
    titleOfficial: "Đạo Ngô 5 phong đối cơ",
    title: "",
    group: 1,
    path: "vhc007-",
    description: "...",
  },
  {
    id: 8,
    titleOfficial: "Đỗng Sơn lang mạc tính danh",
    title: "",
    group: 1,
    path: "vhc008-",
    description: "...",
  },
  {
    id: 9,
    titleOfficial: "Vân Nham cân bình hương đăng",
    title: "",
    group: 1,
    path: "vhc009-",
    description: "...",
  },
  {
    id: 10,
    titleOfficial: "Nam toàn dị loại tỉnh phóng",
    title: "",
    group: 1,
    path: "vhc010-",
    description: "...",
  },
  {
    id: 11,
    titleOfficial: "Giáp Sơn thị cảnh nhân cảnh",
    title: "Không rơi giai cấp",
    group: 1,
    path: "vhc011-giai-cap-sam-hoc",
    description: "...",
  },
  {
    id: 12,
    titleOfficial: "Giáp Sơn bất hội môn hộ",
    title: "Tào khê đối cơ",
    group: 1,
    path: "vhc012-tao-khe-doi-co",
    description: "...",
  },
  {
    id: 13,
    titleOfficial: "Giáp Sơn thượng đường thị chúng",
    title: "Toạ thứ thiền định",
    group: 1,
    path: "vhc013-giai-cap-sam-hoc",
    description: "...",
  },
  {
    id: 14,
    titleOfficial: "Giáp Sơn bát trần Phật tổ",
    title: "",
    group: 1,
    path: "vhc014-",
    description: "...",
  },
  {
    id: 15,
    titleOfficial: "Thạch Sương xúc mục bình tích",
    title: "",
    group: 1,
    path: "vhc015-",
    description: "...",
  },
  {
    id: 16,
    titleOfficial: "Tiêm Nguyên trì thiêu thiên hoá",
    title: "",
    group: 1,
    path: "vhc016-",
    description: "...",
  },
  {
    id: 17,
    titleOfficial: "Đỗng Sơn sơ thu giải kết",
    title: "",
    group: 1,
    path: "vhc017-",
    description: "...",
  },
  {
    id: 18,
    titleOfficial: "Đỗng Sơn đại sự phục sức",
    title: "",
    group: 1,
    path: "vhc018-",
    description: "...",
  },
  {
    id: 19,
    titleOfficial: "Đỗng Sơn điểu đạo kiếu lộ",
    title: "",
    group: 2,
    path: "vhc019-",
    description: "...",
  },
  {
    id: 20,
    titleOfficial: "Thần Sơn quá kiếu kiếu lộ",
    title: "",
    group: 2,
    path: "vhc020-",
    description: "...",
  },
  {
    id: 21,
    titleOfficial: "Lạc Phố đào kim trân bảo",
    title: "",
    group: 2,
    path: "vhc021-dao-kim-tran-bao",
    description: "...",
  },
  {
    id: 22,
    titleOfficial: "Lạc Phố tổ ý tổ giáo",
    title: "",
    group: 2,
    path: "vhc022-to-y-to-giao",
    description: "...",
  },
  {
    id: 23,
    titleOfficial: "Lạc Phố cung dưỡng Phật tổ",
    title: "",
    group: 2,
    path: "vhc023-cung-duong",
    description: "...",
  },
  {
    id: 24,
    titleOfficial: "Cáp khê tướng khán tỉnh phóng",
    title: "",
    group: 2,
    path: "vhc024-tuong-khan-tinh-phong",
    description: "...",
  },
  {
    id: 25,
    titleOfficial: "Lạc Phố 1 hào phi tẩu",
    title: "",
    group: 2,
    path: "vhc025-",
    description: "...",
  },
  {
    id: 26,
    titleOfficial: "Lạc Phố Phật pháp vấn pháp",
    title: "",
    group: 2,
    path: "vhc026-",
    description: "...",
  },
  {
    id: 27,
    titleOfficial: "Lạc Phố quy hương tỉnh phóng",
    title: "",
    group: 2,
    path: "vhc027-",
    description: "...",
  },
  {
    id: 28,
    titleOfficial: "Lạc Phố tổ giáo tổ giáo",
    title: "",
    group: 2,
    path: "vhc028-",
    description: "...",
  },
  {
    id: 29,
    titleOfficial: "Thiều Sơn lễ bái lễ bái",
    title: "",
    group: 2,
    path: "vhc029-",
    description: "...",
  },
  {
    id: 30,
    titleOfficial: "Thiều Sơn gia phong gia phong",
    title: "",
    group: 2,
    path: "vhc030-",
    description: "...",
  },
  {
    id: 31,
    titleOfficial: "Hoàng Sơn mễ giá lương thực",
    title: "",
    group: 2,
    path: "vhc031-giai-cap-sam-hoc",
    description: "...",
  },
  {
    id: 32,
    titleOfficial: "Thượng Lam bản phân đối cơ",
    title: "",
    group: 2,
    path: "vhc032-tao-khe-doi-co",
    description: "...",
  },
  {
    id: 33,
    titleOfficial: "Tứ thiền nhập đán kiếu lộ",
    title: "",
    group: 2,
    path: "vhc033-giai-cap-sam-hoc",
    description: "...",
  },
  {
    id: 34,
    titleOfficial: "Hải Hồ hành đạo đại đạo",
    title: "",
    group: 3,
    path: "vhc034-",
    description: "...",
  },
  {
    id: 35,
    titleOfficial: "Thiên cái dục thất mộc dục",
    title: "",
    group: 3,
    path: "vhc035-",
    description: "...",
  },
  {
    id: 36,
    titleOfficial: "Cửu Phong hữu ngôn Phật tổ",
    title: "",
    group: 3,
    path: "vhc036-",
    description: "...",
  },
  {
    id: 37,
    titleOfficial: "Cửu Phong tướng truyền Phật tổ",
    title: "",
    group: 3,
    path: "vhc037-",
    description: "...",
  },
  {
    id: 38,
    titleOfficial: "Cửu Phong thị giả thiên hoá",
    title: "",
    group: 1,
    path: "vhc038-",
    description: "...",
  },
  {
    id: 39,
    titleOfficial: "Đại quang Đạt Ma Phật tổ",
    title: "",
    group: 3,
    path: "vhc039-",
    description: "...",
  },
  {
    id: 40,
    titleOfficial: "Cường đức thượng tòa ngưu lộc",
    title: "",
    group: 3,
    path: "vhc040-",
    description: "...",
  },
  {
    id: 41,
    titleOfficial: "Văn Thù tăng do chân tượng",
    title: "Không rơi giai cấp",
    group: 3,
    path: "vhc041-tang-do-chan-tuong",
    description: "...",
  },
  {
    id: 42,
    titleOfficial: "Phụng Tường thạch trụ nhân cảnh",
    title: "Tào khê đối cơ",
    group: 3,
    path: "vhc042-thach-tru-nhan-canh",
    description: "...",
  },
  {
    id: 43,
    titleOfficial: "Tăng vấn Tào Sơn tân chủ",
    title: "Toạ thứ thiền định",
    group: 3,
    path: "vhc043-",
    description: "...",
  },
  {
    id: 44,
    titleOfficial: "Tào từ Đỗng Sơn du Sơn",
    title: "",
    group: 3,
    path: "vhc044-",
    description: "...",
  },
  {
    id: 45,
    titleOfficial: "Thậm vật tống mộc thủ quý miêu khuyển",
    title: "",
    group: 3,
    path: "vhc045-",
    description: "...",
  },
  {
    id: 46,
    titleOfficial: "Khô mộc hoa khai hoa quả",
    title: "",
    group: 3,
    path: "vhc046-kho-moc-hoa-khai-hoa-qua",
    description: "...",
  },
  {
    id: 47,
    titleOfficial: "Thanh Lâm kính vãng thỏ xà",
    title: "",
    group: 3,
    path: "vhc047-",
    description: "...",
  },
  {
    id: 48,
    titleOfficial: "Thử xâm đằng phi tẩu",
    title: "",
    group: 3,
    path: "vhc008-",
    description: "...",
  },
  {
    id: 49,
    titleOfficial: "Vân Nham cân bình hương đăng",
    title: "",
    group: 3,
    path: "vhc049-",
    description: "...",
  },
  {
    id: 50,
    titleOfficial: "Nam toàn dị loại tỉnh phóng",
    title: "",
    group: 4,
    path: "vhc050-",
    description: "...",
  },
  {
    id: 51,
    titleOfficial: "Bạch thuỷ thanh sắc thị chúng",
    title: "",
    group: 4,
    path: "vhc051-giai-cap-sam-hoc",
    description: "...",
  },
  {
    id: 52,
    titleOfficial: "Bạch Mã pháp thân pháp thân",
    title: "",
    group: 4,
    path: "vhc052-tao-khe-doi-co",
    description: "...",
  },
  {
    id: 53,
    titleOfficial: "Cửu Phong cử nhất thị chúng",
    title: "",
    group: 4,
    path: "vhc053-",
    description: "...",
  },
  {
    id: 54,
    titleOfficial: "Thiên Đồng ưng dụng tâm nhãn",
    title: "",
    group: 4,
    path: "vhc054-",
    description: "...",
  },
  {
    id: 55,
    titleOfficial: "Thanh tịnh hành giả kinh giáo",
    title: "",
    group: 4,
    path: "vhc055-",
    description: "...",
  },
  {
    id: 56,
    titleOfficial: "Bắc Viện ngưu đầu Phật tổ",
    title: "",
    group: 4,
    path: "vhc056-",
    description: "...",
  },
  {
    id: 57,
    titleOfficial: "Thanh Phong đại sự đối cơ",
    title: "",
    group: 4,
    path: "vhc057-",
    description: "...",
  },
  {
    id: 58,
    titleOfficial: "Mộc bình nhất âu chu tiếp",
    title: "",
    group: 4,
    path: "vhc058-",
    description: "...",
  },
  {
    id: 59,
    titleOfficial: "Đồng toàn tướng truyền cốt đổng",
    title: "",
    group: 4,
    path: "vhc059-",
    description: "...",
  },
  {
    id: 60,
    titleOfficial: "Vấn bá nham thiền thiền định",
    title: "",
    group: 4,
    path: "vhc060-",
    description: "...",
  },
  {
    id: 61,
    titleOfficial: "Vấn bá đạo đại đạo",
    title: "Vấn bá đạo đại đạo",
    group: 4,
    path: "vhc061-van-ba-dao-dai-dao",
    description: "...",
  },
  {
    id: 62,
    titleOfficial: "Vấn bá nham giáo kinh giáo",
    title: "",
    group: 4,
    path: "vhc062-",
    description: "...",
  },
  {
    id: 63,
    titleOfficial: "Lặc Đàm đối đảo khí dụng",
    title: "Toạ thứ thiền định",
    group: 4,
    path: "vhc063-giai-cap-sam-hoc",
    description: "...",
  },
  {
    id: 64,
    titleOfficial: "Đồng An nhân sư Phật tổ",
    title: "",
    group: 4,
    path: "vhc064-",
    description: "...",
  },
  {
    id: 65,
    titleOfficial: "Cốc Sơn tổ ý tổ giáo",
    title: "",
    group: 4,
    path: "vhc065-",
    description: "...",
  },
  {
    id: 66,
    titleOfficial: "Bạch Vân thâm xứ đối cơ",
    title: "",
    group: 4,
    path: "vhc066-",
    description: "...",
  },
  {
    id: 67,
    titleOfficial: "Đại Lĩnh thanh tịnh trân bảo",
    title: "",
    group: 4,
    path: "vhc067-",
    description: "...",
  },
  {
    id: 68,
    titleOfficial: "Đồng An gia phong gia phong",
    title: "",
    group: 4,
    path: "vhc068-",
    description: "...",
  },
  {
    id: 69,
    titleOfficial: "Y kinh giải nghĩa kinh giáo",
    title: "",
    group: 5,
    path: "vhc069-",
    description: "...",
  },
  {
    id: 70,
    titleOfficial: "Vấn chư Phật sư Phật tổ",
    title: "",
    group: 5,
    path: "vhc070-",
    description: "...",
  },
  {
    id: 71,
    titleOfficial: "Cô phong độc tú điện đường",
    title: "",
    group: 5,
    path: "vhc071-",
    description: "...",
  },
  {
    id: 72,
    titleOfficial: "A dục gia phong gia phong",
    title: "",
    group: 5,
    path: "vhc072-",
    description: "...",
  },
  {
    id: 73,
    titleOfficial: "Bản lai phụ mẫu tỉnh phóng",
    title: "",
    group: 5,
    path: "vhc073-",
    description: "...",
  },
  {
    id: 74,
    titleOfficial: "Tây lai đích ý tổ giáo",
    title: "",
    group: 5,
    path: "vhc074-",
    description: "...",
  },
  {
    id: 75,
    titleOfficial: "A dục gia phong gia phong",
    title: "",
    group: 5,
    path: "vhc075-",
    description: "...",
  },
  {
    id: 76,
    titleOfficial: "Tiêm Nguyên trì thiêu thiên hoá",
    title: "",
    group: 5,
    path: "vhc076-",
    description: "...",
  },
  {
    id: 77,
    titleOfficial: "Phi tư lượng xứ đối cơ thất",
    title: "",
    group: 5,
    path: "vhc077-",
    description: "...",
  },
  {
    id: 78,
    titleOfficial: "Bạch mi sái nhiệt tuế thời",
    title: "",
    group: 5,
    path: "vhc078-",
    description: "...",
  },
  {
    id: 79,
    titleOfficial: "Thấu pháp thân cú pháp thân",
    title: "",
    group: 5,
    path: "vhc079-",
    description: "...",
  },
  {
    id: 80,
    titleOfficial: "Thạch Môn gia phong gia phong",
    title: "",
    group: 5,
    path: "vhc080-",
    description: "...",
  },
  {
    id: 81,
    titleOfficial: "Tịnh chúng liên hoa hoa quả",
    title: "Không rơi giai cấp",
    group: 6,
    path: "vhc081-giai-cap-sam-hoc",
    description: "...",
  },
  {
    id: 82,
    titleOfficial: "Đồng An nhị cơ đối cơ",
    title: "Tào khê đối cơ",
    group: 6,
    path: "vhc082-tao-khe-doi-co",
    description: "...",
  },
  {
    id: 83,
    titleOfficial: "Quảng Đức ngôn ngữ đối cơ",
    title: "",
    group: 6,
    path: "vhc083-ngon-ngu-doi-co",
    description: "...",
  },
  {
    id: 84,
    titleOfficial: "Quảng Đức 9 phụ kính phiến",
    title: "",
    group: 6,
    path: "vhc084-",
    description: "...",
  },
  {
    id: 85,
    titleOfficial: "Quảng Đức ba lang chu tiếp",
    title: "",
    group: 6,
    path: "vhc085-",
    description: "...",
  },
  {
    id: 86,
    titleOfficial: "Vân Quang tác ngưu ngưu lộc",
    title: "",
    group: 6,
    path: "vhc086-",
    description: "...",
  },
  {
    id: 87,
    titleOfficial: "Thái Nguyên số gia trai dục",
    title: "",
    group: 6,
    path: "vhc087-",
    description: "...",
  },
  {
    id: 88,
    titleOfficial: "Lương Sơn nhật dụng đối cơ",
    title: "",
    group: 6,
    path: "vhc088-",
    description: "...",
  },
  {
    id: 89,
    titleOfficial: "Lương Sơn tổ ý tổ giáo",
    title: "",
    group: 6,
    path: "vhc089-",
    description: "...",
  },
  {
    id: 90,
    titleOfficial: "Lương Sơn không kiếp pháp khí",
    title: "",
    group: 6,
    path: "vhc090-",
    description: "...",
  },
  {
    id: 91,
    titleOfficial: "Đại Dương thượng đường thị chúng",
    title: "",
    group: 6,
    path: "vhc091",
    description: "...",
  },
  {
    id: 92,
    titleOfficial: "Đại Dương gia phong gia phong",
    title: "Tào khê đối cơ",
    group: 6,
    path: "vhc092-tao-khe-doi-co",
    description: "...",
  },
  {
    id: 93,
    titleOfficial: "Đầu Tử tông phong pháp thuộc",
    title: "Toạ thứ thiền định",
    group: 6,
    path: "vhc093-giai-cap-sam-hoc",
    description: "...",
  },
  {
    id: 94,
    titleOfficial: "Đầu Tử thị chúng phi tẩu",
    title: "",
    group: 6,
    path: "vhc094-",
    description: "...",
  },
  {
    id: 95,
    titleOfficial: "Đầu Tử niêm hương đế vương",
    title: "",
    group: 6,
    path: "vhc095-",
    description: "...",
  },
  {
    id: 96,
    titleOfficial: "Thiên Ninh thùy gia pháp thuộc",
    title: "",
    group: 6,
    path: "vhc096-",
    description: "...",
  },
  {
    id: 97,
    titleOfficial: "Thiên Ninh dạ bán đối cơ",
    title: "",
    group: 6,
    path: "vhc097-",
    description: "...",
  },
  {
    id: 98,
    titleOfficial: "Thiên Ninh thượng đường pháp thân",
    title: "",
    group: 6,
    path: "vhc098-",
    description: "...",
  },
  {
    id: 99,
    titleOfficial: "Bảo Thọ thượng đường trượng lạp",
    title: "",
    group: 6,
    path: "vhc099-",
    description: "...",
  },
  {
    id: 100,
    titleOfficial: "Tam giới duy tâm thị chúng",
    title: "",
    group: 6,
    path: "vhc100-",
    description: "...",
  },*/
];

export default Xutangji;

/*
* quyển I
1 Thanh Nguyên giai cấp sâm học
2 Thạch Đầu Tào khê đối cơ
3 Dược Sơn toạ thứ thiền định
4 Thuyền Tử Giáp Sơn chu tiếp
5 Bế thụ Đỗng Sơn sâm học
6 Sa di trụ am vũ tuyết
7 Đạo Ngô 5 phong đối cơ
8 Đỗng Sơn lang mạc tính danh
9 Vân Nham cân bình hương đăng
10 Nam toàn dị loại tỉnh phóng
11 Giáp Sơn thị cảnh nhân cảnh
12 Giáp Sơn bất hội môn hộ
13 Giáp Sơn thượng đường thị chúng
14 Giáp Sơn bát trần Phật tổ
15 Thạch Sương xúc mục bình tích
16 Tiêm Nguyên trì thiêu thiên hoá
17 Đỗng Sơn sơ thu giải kết
18 Đỗng Sơn đại sự phục sức
*
quyển II
19 Đỗng Sơn điểu đạo kiếu lộ
20 Thần Sơn quá kiếu kiếu lộ
21 Lạc Phố đào kim trân bảo
22 Lạc Phố tổ ý tổ giáo
23 Lạc Phố cung dưỡng Phật tổ
24 Cáp khê tướng khán tỉnh phóng
25 Lạc Phố 1 hào phi tẩu
26 Lạc Phố Phật pháp vấn pháp
27 Lạc Phố quy hương tỉnh phóng
28 Lạc Phố tổ giáo tổ giáo
29 Thiều Sơn lễ bái lễ bái
30 Thiều Sơn gia phong gia phong
31 Hoàng Sơn mễ giá lương thực
32 Thượng Lam bản phân đối cơ
33 Tứ thiền nhập đán kiếu lộ
*
quyển III
34 Hải Hồ hành đạo đại đạo
35 Thiên cái dục thất mộc dục
36 Cửu Phong hữu ngôn Phật tổ
37 Cửu Phong tướng truyền Phật tổ
38 Cửu Phong thị giả thiên hoá
39 Đại quang Đạt Ma Phật tổ
40 Cường đức thượng tòa ngưu lộc
41 Văn Thù tăng do chân tượng
42 Phụng Tường thạch trụ nhân cảnh
43 Tăng vấn Tào Sơn tân chủ
44 Tào từ Đỗng Sơn du Sơn
45 Thậm vật tống mộc thủ quý miêu khuyển
46 Khô mộc hoa khai hoa quả
47 Sơ Sơn thọ đáp đáp miếu
48 Vân Cư thượng đường thị chúng
49 Thanh Lâm kính vãng thỏ xà
*
quyển IV
52 Thử xâm đằng phi tẩu
51 Bạch thuỷ thanh sắc thị chúng
52 Bạch Mã pháp thân pháp thân
53 Cửu Phong cử nhất thị chúng
54 Thiên Đồng ưng dụng tâm nhãn
55 Thanh tịnh hành giả kinh giáo
56 Bắc Viện ngưu đầu Phật tổ
57 Thanh Phong đại sự đối cơ
58 Mộc bình nhất âu chu tiếp
59 Đồng toàn tướng truyền cốt đổng
60 Vấn bá nham thiền thiền định
61 Vấn bá đạo đại đạo
62 Vấn bá nham giáo kinh giáo
63 Lặc Đàm đối đảo khí dụng
64 Đồng An nhân sư Phật tổ
65 Cốc Sơn tổ ý tổ giáo
66 Bạch Vân thâm xứ đối cơ
67 Đại Lĩnh thanh tịnh trân bảo
68 Đồng An gia phong gia phong
*
quyển V
69 Y kinh giải nghĩa kinh giáo
70 Vấn chư Phật sư Phật tổ
71 Cô phong độc tú điện đường
72 Vấn bản lai tâm tâm nhãn
73 Bản lai phụ mẫu tỉnh phóng
74 Tây lai đích ý tổ giáo
75 A dục gia phong gia phong
76 Tứ hải yến thanh đối cơ
77 Phi tư lượng xứ đối cơ thất
78 Bạch mi sái nhiệt tuế thời
79 Thấu pháp thân cú pháp thân
80 Thạch Môn gia phong gia phong
*
quyển VI
81 Tịnh chúng liên hoa hoa quả
82 Đồng An nhị cơ đối cơ
83 Quảng Đức ngôn ngữ đối cơ
84 Quảng Đức 9 phụ kính phiến
85 Quảng Đức ba lang chu tiếp
86 Vân Quang tác ngưu ngưu lộc
87 Thái Nguyên số gia trai dục
88 Lương Sơn nhật dụng đối cơ
89 Lương Sơn tổ ý tổ giáo
90 Lương Sơn không kiếp pháp khí
91 Đại Dương thượng đường thị chúng
92 Đại Dương gia phong gia phong
93 Đầu Tử tông phong pháp thuộc
94 Đầu Tử thị chúng phi tẩu
95 Đầu Tử niêm hương đế vương
96 Thiên Ninh thùy gia pháp thuộc
97 Thiên Ninh dạ bán đối cơ
98 Thiên Ninh thượng đường pháp thân
99 Bảo Thọ thượng đường trượng lạp
100 Tam giới duy tâm thị chúng
* */
