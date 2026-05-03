export interface Location {
  name: string;
  lat: number;
  lng: number;
  address: string;
}

export const vegetarianRestos: Location[] = [
  { name: "Quán Chay A", lat: 10.776, lng: 106.701, address: "Quận 1, TP.HCM" },
  { name: "Quán Chay B", lat: 10.782, lng: 106.685, address: "Quận 3, TP.HCM" },
  // Thêm các địa điểm khác ở đây
];
