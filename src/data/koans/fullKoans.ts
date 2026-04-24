export interface KoanDetail {
    intro: string; // Thùy ngữ
    main: string;  // Chính văn (Tắc)
    verse: string; // Tụng cổ
}

export interface KoanEntry {
    id: string;
    title: string;
    sources: {
        [collection: string]: string; // Ví dụ: { "BichNhamLuc": "Tắc 1", "VoMonQuan": "Tắc 3" }
    };
    details: KoanDetail;
}

import BlueCliffRecord from "@/data/koans/full/BlueCliffRecord.tsx";
import CongRongLu from "@/data/koans/full/CongRongLu.tsx";
import GatelessGate from "@/data/koans/full/GatelessGate.tsx";
import Kongguji from "@/data/koans/full/Kongguji.tsx";
import IronFlute from "@/data/koans/full/IronFlute.tsx";


const fullKoans = [
    ...BlueCliffRecord,
    ...CongRongLu,
    ...GatelessGate,
    ...Kongguji,
    ...IronFlute,
];

export default fullKoans;
