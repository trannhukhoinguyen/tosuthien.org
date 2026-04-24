export interface koanType {
  id: number;
  title: string;
  subTitle: string;
  description: string;
}
export const koanDescription = {
  bottom: {
    intro: 'Là một phương tiện tối trọng để đạt giác ngộ, phép quán công án đòi hỏi 3 yếu tố mà thiền sinh phải đạt được là:',
    body: [
      '1. ĐẠI TÍN ở đây được hiểu như là niềm tin tuyệt đối vào khả năng giác ngộ của chính mình',
      '2. 🤯 ĐẠI PHẤN CHÍ là sự tinh tiến, kiên trì dũng mãnh',
      '3. ĐẠI NGHI ĐOÀN ở đây không có nghĩa nghi ngờ bình thường mà chỉ trạng thái tập trung tư tưởng tuyệt đỉnh',
    ],
  },
  blockquote: {
    intro:
      'Các điểm mâu thuẫn trong công án có nhiệm vụ gia tăng Đại nghi đoàn này và Thiền sư Bạch Ẩn bảo rằng: "Đại nghi - Đại ngộ" (zh. 大疑大悟), nghĩa là càng nghi nhiều, càng ngộ sâu. ' +
      'Trong lời bình của công án đầu tiên của Vô môn quan, Thiền sư Vô Môn Huệ Khai viết như sau (Trần Tuấn Mẫn dịch):',
    body:
      'Hãy tận dụng ba trăm sáu mươi xương cốt, tám vạn bốn ngàn lỗ chân lông, vận dụng cả thân tâm trở thành một khối nghi, tham ngay chữ không, ngày đêm nghiền ngẫm. ' +
      'Bỏ hết những cái biết tệ hại trước kia, lâu ngày trở thành thuần thục, tự nhiên trong ngoài thành một khối, như kẻ câm nằm mộng chỉ một mình mình hay. ' +
      'Bỗng nhiên bộc phát 🧨💣💥, trời kinh đất chuyển, như đoạt được thanh đại đao của Quan Vũ, gặp Phật giết Phật, gặp Tổ giết Tổ, dửng dưng với bờ sinh tử, đạt đại tự tại, chu du trong lục đạo, tứ sinh.... ',
  }
};

const koanTypes: koanType[] = [
  {
    id: 1,
    title: "PHÁP THÂN CÔNG ÁN",
    subTitle: "zh. 法身公案, ja. hosshin kōan",
    description:
        "chỉ các loại công án có thể giúp đỡ thiền sinh chỉ một bước một vượt thế giới nhị nguyên, lần đầu chứng ngộ trực tiếp Pháp thân (sa. dharmakāya, ja. hosshin), Phật tính (sa. buddhatā, ja. busshō), theo Tâm kinh thì gọi là \"Sắc tức là Không\". " +
        "Rất nhiều công án trong các tập danh tiếng được xếp vào loại này mà nổi danh nhất có lẽ là công án thứ nhất của tập Vô môn quan với tên \"Con chó của Triệu Châu\" (Triệu Châu cẩu tử 趙州狗子)."
  },
  {
    id: 2,
    title: "CƠ QUAN CÔNG ÁN",
    subTitle: "zh. 機關公案, ja. kikan kōan",
    description:
        "Cơ quan ở đây có thể hiểu là bộ phận, dụng cụ): mục đích của các Pháp thân công án là thế giới bất phân biệt, nhưng thiền sinh chưa được dừng chân nơi đây. " +
        "Cơ quan công án hướng dẫn thiền sinh đến một bước nữa, phân biệt trong thế giới không phân biệt, ngộ được lý \"Không tức là Sắc\". " +
        "Được xếp vào loại này là công án 17 và 37 của Vô môn quan."
  },
  {
    id: 3,
    title: "NGÔN THUYÊN CÔNG ÁN",
    subTitle: "zh. 言詮公案, ja. gonsen kōan",
    description:
        "Chỉ những công án mà thiền sinh phải tham quán ý nghĩa tột cùng của ngôn ngữ mà chư vị tiền bối sử dụng hoằng hoá (ngôn thuyên nghĩa là ngôn ngữ giải thích kĩ càng, trọn vẹn). " +
        "Các vị Thiền sư sử dụng ngôn ngữ rất tài tình, đầy thi vị nhưng điểm đặc sắc nhất là các ngôn ngữ này không hề dừng bước chỉ trong khuôn khổ thẩm mĩ mà vượt qua cả nó, bao hàm ý nghĩa cùng tột, trực chỉ chân lý. " +
        "Đại diện cho loại công án này chính là Bích nham lục của Thiền sư Viên Ngộ. " +
        "Một số công án trong Vô môn quan cũng được xếp vào loại này (21, 24, 27, 30, 33, 34)."
  },
  {
    id: 4,
    title: "NAN THẤU CÔNG ÁN",
    subTitle: "zh. 難透公案, ja. nantō kōan",
    description:
        "Chỉ những công án rất khó (nan) lĩnh hội (thấu) vì những sự đối nghịch ngay trong trường hợp được trình bày. Các công án thuộc loại này giúp thiền sinh khinh an thấu rõ được sự vô ngại của sự vật, có thể nói theo giáo lý của Hoa nghiêm tông là Sự sự vô ngại (zh. 事事無礙). Chính sự chinh phục, thấu hiểu lý này là yếu tố của tâm tư khinh an, tự do tự tại mà các bậc giác ngộ thụ hưởng. " +
        "Thiền sư Bạch Ẩn Huệ Hạc thường nhắc đến tám công án thuộc loại này mà trong đó ba công án nằm trong tập Vô môn quan, đó là tắc 13, 35, 38. Công án 38 như sau: \"Ngũ Tổ Pháp Diễn hỏi chúng: Ví như con trâu đi qua khung cửa, đầu, sừng, bốn chân đều lọt, sao đuôi lại chẳng lọt được?\""
  },
  {
    id: 5,
    title: "NGŨ VỊ CÔNG ÁN",
    subTitle: "zh. 五位公案, ja. goi kōan",
    description:
        "Chỉ các công án cuối cùng mà thiền sinh phải vượt qua. " +
        "Các công án này có liên hệ trực tiếp với Ngũ vị quân thần (Động Sơn ngũ vị) của vị Khai tổ tông Tào Động là Thiền sư Động Sơn Lương Giới. " +
        "Kinh nghiệm giác ngộ của thiền sinh—đạt được qua bốn loại công án trước—được thử thách lần cuối."
  },
];

export default koanTypes;
