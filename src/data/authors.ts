export interface composition {
  title?: string;
  link?: string;
  pdf?: string;
}
export interface author {
  id: number;
  name: string;
  bio: string;
  avatar?: string;
  references?: string[];
  compositions: composition[],
  lectures?: string[],
  youtubeIds?: string[],
}

const authors: author[] = [
    {
      id: 1,
      name: "Tăng Phụng Nghi",
      bio: "Tự Thuấn Trưng / Thuấn Vi, hiệu Kim Giản, quê ở Hành Châu (Hành Dương, Hồ Nam), đậu Tiến Sĩ đời Vạn Lịch - nhà Minh. " +
          "Ông làm quan đến Lễ bộ lang trung, thông minh hiếu học, chuộng lí học của Lục tượng sơn. " +
          "Sau khi thôi làm quan, ông về làng mở trường giảng học, học trò rất đông. " +
          "Ông từng tình cờ gặp 1 vị tăng, 2 bên tranh luận, trải 3 ngày ông mới chịu khuất phục, " +
          "Từ đó, ông kính tin Phật pháp, giữ giới, ăn chay, nghiên cứu kinh luận, gắng sức tham cứu. " +
          "Một hôm, ông thấy mặt trăng lặn, mặt trời mọc, hoát nhiên tỉnh ngộ/đại ngộ, " +
          "tự thấy những nghi ngại tiêu sạch, được ý chân thật của 2 nhà (Phật, Nho). " +
          "Sau đó, ông viết sách lập thuyết để lưu truyền. " +
          "Ông soạn bộ Tam Tông Thông gồm: Thủ Lăng Nghiêm Kinh Tông Thông, Lăng Già Tông Thông và Kim Cang Kinh Tông Thông. " +
          "[X. Hành châu phủ chí] ",
      avatar: "",
      references: [
        "https://blog.phapthihoi.org/tu-dien-phat-giao/tang-phung-nghi/",
      ],
      compositions: [
        {
          title: "KIM CANG KINH TÔNG THÔNG",
          link: "https://thuvienhoasen.org/images/file/Rj70qp1G0QgQACoQ/kim-cang-tong-thong-thich-nhuan-chau-dich.pdf",
        },
        {
          title: "THỦ LĂNG NGHIÊM KINH TÔNG THÔNG",
          link: "https://thuvienhoasen.org/images/file/0Xx2rJ1G0QgQADJh/kinh-thu-lang-nghiem-tong-thong-nhan-te-thien-su-dich.pdf",
        },
        {
          title: "KINH LĂNG GIÀ TÔNG THÔNG",
          link: "https://youtube.com/playlist?list=PL7J89UzxhHJJrqPlRf0O2_VpYOMVShw3s&si=k0KgLg_keesaXKK-",
        },
      ],
    },
    {
      id: 2,
      name: "Thích Duy Lực",
      bio: "",
      avatar: "",
      references: [
        "https://tosuthien.com/",
        "https://duylucthien.wordpress.com/about/",
        "/pdfs/thien-su-Thich-Duy-Luc.pdf",
        "https://thuvienhoasen.org/author/post/792/1/thich-duy-luc",
        "https://ph.tinhtong.vn/Home/MP3?p=MP3*-+T+Duy+Luc",
        "https://tosuthien.net/",
        "https://tosuthien.info/",
        "https://apps.apple.com/ai/app/tosuthien/id1660073789",
        "https://www.mixcloud.com/tosuthien/",
        "https://tosuthien.blogspot.com/",
        "http://tuvien.com/to_su_thien/",
      ],
      compositions: [
        {
          title: "ĐƯỜNG LỐI THỰC HÀNH THAM TỒ SƯ THIỀN",
          link: "https://phapthihoi.org/kinh/Ebooks/Thien-Tong/Hoc-Thien/Duong-Loi-Thuc-Hanh-Tham-To-Su-Thien-HT-Duy-Luc.pdf",
        },
        {
          title: "KINH LĂNG GIÀ",
          link: "http://tosuthien.info/kinh_sach_storage/kinh%20lang%20gia.pdf",
        },
        {
          title: "KINH LĂNG NGHIÊM",
          link: "http://tosuthien.info/kinh_sach_storage/kinh%20lang%20nghiem.pdf",
        },
      ],
      lectures: [
        "https://thamtosuthien.net/videos/chua-phan-loai/thay-duy-luc-day-tham-thoai-dau-phu-de-anh-ngu-quan-thoai-18.html)",
      ],
      youtubeIds: [
        "DLS2VpXg3N8", // "DLS2VpXg3N8?html5=1&autoplay=0&controls=0&showinfo=0&rel=0&modestbranding=0&playsinline=1)",
      ],
    },
    {
      id: 3,
      name: "Sùng Sơn Hạnh Nguyện",
      bio: "",
      avatar: "",
      references: [
        "https://quangduc.com/author/about/5738/thien-su-sung-son",
        "https://quangduc.com/author/post/5738/1/thien-su-sung-son",
      ],
      compositions: [
        {
          title: "Mười Cổng (Ten Gates)",
          link: "https://thuvienhoasen.org/a15684/muoi-cong-ten-gates",
          pdf: "http://thuvienhoasen.org/images/upload/PDF_Books/MuoiCong-ThichGiacNguyen.pdf",
        },
        {
          title: "Rơi Tro Trên Thân Phật",
          link: "https://thuvienhoasen.org/a15638/roi-tro-tren-than-phat",
          pdf: "https://nigioikhatsi.net/kinhsach-pdf/RoiTroTrenThanPhat_SungSon.pdf",
        },
        {
          title: "Thế Giới Nhất Hoa",
          link: "https://thuvienhoasen.org/a15639/the-gioi-nhat-hoa",
          pdf: "https://nigioikhatsi.net/kinhsach-pdf/TheGioiNhatHoa_ThienSuSungSon.pdf",
        },
        {
          title: "Thiền Tông Chỉ Nam",
          link: "https://thuvienhoasen.org/a19008/thien-tong-chi-nam",
          pdf: "http://quangduc.com/images/file/wzeRjnWj0QgQAK5C/thien-tong-chi-nam.pdf",
        },
        {
          title: "Xương Hư Không",
          link: "https://thuvienhoasen.org/a19012/xuong-hu-khong",
        },
        {
          title: "Muốn Tỏ Ngộ Là Một Sai Lầm Lớn",
          link: "https://thuvienhoasen.org/a21860/muon-to-ngo-la-mot-sai-lam-lon",
        },
        {
          title: "Chỉ Không Biết",
          link: "https://quangduc.com/a34841/chi-khong-biet",
          pdf: "https://quangduc.com/images/file/YuQD5FgQ0QgQACwj/chi-khong-biet-ts-sung-son-thich-giac-nguyen.pdf",
        },
      ],
    },
    {
      id: 4,
      name: "Tuệ Sỹ",
      bio: "Thích Nguyên Chứng",
      avatar: "",
      references: [
        "",
      ],
      compositions: [
        {
          title: "",
          link: "",
          pdf: "",
        },
        {
          title: "",
          link: "",
          pdf: "",
        },
      ],
    },
    {
      id: 5,
      name: "DAISETZ TEITARO SUZUKI",
      bio: "",
      avatar: "",
      references: [
        "",
      ],
      compositions: [
        {
          title: "",
          link: "",
          pdf: "",
        },
        {
          title: "",
          link: "",
          pdf: "",
        },
      ],
    },
];

export default authors;
