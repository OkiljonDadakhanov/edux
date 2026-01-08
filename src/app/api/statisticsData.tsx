// All 14 regions of Uzbekistan
export const regions = [
  "Andijon viloyati",
  "Buxoro viloyati",
  "Farg'ona viloyati",
  "Jizzax viloyati",
  "Qashqadaryo viloyati",
  "Navoiy viloyati",
  "Namangan viloyati",
  "Samarqand viloyati",
  "Surxondaryo viloyati",
  "Sirdaryo viloyati",
  "Toshkent viloyati",
  "Xorazm viloyati",
  "Qoraqalpog'iston Respublikasi",
  "Toshkent shahri"
];

export const subjects = [
  "Barcha fanlar",
  "Matematika",
  "Fizika",
  "Kimyo",
  "Biologiya",
  "Informatika",
  "Ona tili",
  "Tarix"
];

export const grades = [
  "Barcha sinflar",
  "4-sinf",
  "5-sinf",
  "6-sinf",
  "7-sinf",
  "8-sinf",
  "9-sinf",
  "10-sinf",
  "11-sinf"
];

export const topCounts = [10, 20, 50, 100, "Barcha"];

// Regions ranking data
export interface RegionRanking {
  region: string;
  matematika: number;
  fizika: number;
  kimyo: number;
  biologiya: number;
  informatika: number;
  umumiy: number;
}

export const regionsRankingData: RegionRanking[] = [
  { region: "Toshkent shahri", matematika: 1250, fizika: 980, kimyo: 750, biologiya: 650, informatika: 1100, umumiy: 4730 },
  { region: "Toshkent viloyati", matematika: 980, fizika: 850, kimyo: 680, biologiya: 590, informatika: 920, umumiy: 4020 },
  { region: "Samarqand viloyati", matematika: 850, fizika: 720, kimyo: 580, biologiya: 520, informatika: 780, umumiy: 3450 },
  { region: "Andijon viloyati", matematika: 820, fizika: 700, kimyo: 560, biologiya: 500, informatika: 750, umumiy: 3330 },
  { region: "Farg'ona viloyati", matematika: 780, fizika: 680, kimyo: 540, biologiya: 480, informatika: 720, umumiy: 3200 },
  { region: "Namangan viloyati", matematika: 750, fizika: 650, kimyo: 520, biologiya: 460, informatika: 690, umumiy: 3070 },
  { region: "Qashqadaryo viloyati", matematika: 720, fizika: 620, kimyo: 500, biologiya: 440, informatika: 660, umumiy: 2940 },
  { region: "Surxondaryo viloyati", matematika: 680, fizika: 590, kimyo: 480, biologiya: 420, informatika: 630, umumiy: 2800 },
  { region: "Buxoro viloyati", matematika: 650, fizika: 560, kimyo: 460, biologiya: 400, informatika: 600, umumiy: 2670 },
  { region: "Navoiy viloyati", matematika: 620, fizika: 540, kimyo: 440, biologiya: 380, informatika: 570, umumiy: 2550 },
  { region: "Xorazm viloyati", matematika: 600, fizika: 520, kimyo: 420, biologiya: 360, informatika: 550, umumiy: 2450 },
  { region: "Jizzax viloyati", matematika: 580, fizika: 500, kimyo: 400, biologiya: 340, informatika: 530, umumiy: 2350 },
  { region: "Sirdaryo viloyati", matematika: 550, fizika: 480, kimyo: 380, biologiya: 320, informatika: 500, umumiy: 2230 },
  { region: "Qoraqalpog'iston Respublikasi", matematika: 520, fizika: 450, kimyo: 360, biologiya: 300, informatika: 470, umumiy: 2100 }
];

// Districts data
export interface DistrictData {
  district: string;
  region: string;
  matematika: number;
  fizika: number;
  kimyo: number;
  biologiya: number;
  informatika: number;
  umumiy: number;
}

export const districtsData: DistrictData[] = [
  { district: "Yunusobod tumani", region: "Toshkent shahri", matematika: 320, fizika: 280, kimyo: 220, biologiya: 190, informatika: 300, umumiy: 1310 },
  { district: "Chilonzor tumani", region: "Toshkent shahri", matematika: 300, fizika: 260, kimyo: 200, biologiya: 180, informatika: 280, umumiy: 1220 },
  { district: "Mirzo Ulug'bek tumani", region: "Toshkent shahri", matematika: 280, fizika: 240, kimyo: 190, biologiya: 170, informatika: 260, umumiy: 1140 },
  { district: "Olmazor tumani", region: "Toshkent shahri", matematika: 270, fizika: 230, kimyo: 180, biologiya: 160, informatika: 250, umumiy: 1090 },
  { district: "Shayxontohur tumani", region: "Toshkent shahri", matematika: 260, fizika: 220, kimyo: 170, biologiya: 150, informatika: 240, umumiy: 1040 },
  { district: "Oltiariq tumani", region: "Andijon viloyati", matematika: 250, fizika: 210, kimyo: 160, biologiya: 140, informatika: 230, umumiy: 990 },
  { district: "Urgut tumani", region: "Samarqand viloyati", matematika: 240, fizika: 200, kimyo: 150, biologiya: 130, informatika: 220, umumiy: 940 },
  { district: "Qo'rg'ontepa tumani", region: "Farg'ona viloyati", matematika: 230, fizika: 190, kimyo: 140, biologiya: 120, informatika: 210, umumiy: 890 },
  { district: "Dehqonobod tumani", region: "Navoiy viloyati", matematika: 220, fizika: 180, kimyo: 130, biologiya: 110, informatika: 200, umumiy: 840 },
  { district: "Shahrisabz tumani", region: "Qashqadaryo viloyati", matematika: 210, fizika: 170, kimyo: 120, biologiya: 100, informatika: 190, umumiy: 790 },
  { district: "G'uzor tumani", region: "Buxoro viloyati", matematika: 200, fizika: 160, kimyo: 110, biologiya: 90, informatika: 180, umumiy: 740 },
  { district: "Kosonsoy tumani", region: "Namangan viloyati", matematika: 190, fizika: 150, kimyo: 100, biologiya: 80, informatika: 170, umumiy: 690 },
  { district: "Termiz tumani", region: "Surxondaryo viloyati", matematika: 180, fizika: 140, kimyo: 90, biologiya: 70, informatika: 160, umumiy: 640 },
  { district: "Zarafshon shahri", region: "Navoiy viloyati", matematika: 170, fizika: 130, kimyo: 80, biologiya: 60, informatika: 150, umumiy: 590 },
  { district: "Xiva shahri", region: "Xorazm viloyati", matematika: 160, fizika: 120, kimyo: 70, biologiya: 50, informatika: 140, umumiy: 540 }
];

// Students ranking data
export interface StudentRanking {
  id: number;
  fullName: string;
  district: string;
  schoolName: string;
  grade: string;
  matematika: number;
  fizika: number;
  kimyo: number;
  biologiya: number;
  informatika: number;
  umumiy: number;
}

export const studentsRankingData: StudentRanking[] = [
  { id: 1, fullName: "Ali Xasanov", district: "Yunusobod tumani", schoolName: "33-maktab", grade: "10-sinf", matematika: 98, fizika: 95, kimyo: 92, biologiya: 90, informatika: 99, umumiy: 474 },
  { id: 2, fullName: "Laylo Rahimova", district: "Chilonzor tumani", schoolName: "17-maktab", grade: "9-sinf", matematika: 96, fizika: 98, kimyo: 94, biologiya: 91, informatika: 97, umumiy: 476 },
  { id: 3, fullName: "Jasur Omonov", district: "Mirzo Ulug'bek tumani", schoolName: "101-maktab", grade: "11-sinf", matematika: 94, fizika: 93, kimyo: 98, biologiya: 95, informatika: 96, umumiy: 476 },
  { id: 4, fullName: "Nilufar Karimova", district: "Olmazor tumani", schoolName: "88-maktab", grade: "8-sinf", matematika: 92, fizika: 90, kimyo: 91, biologiya: 98, informatika: 94, umumiy: 467 },
  { id: 5, fullName: "Rustam Karimov", district: "Shayxontohur tumani", schoolName: "12-maktab", grade: "10-sinf", matematika: 99, fizika: 97, kimyo: 95, biologiya: 93, informatika: 98, umumiy: 482 },
  { id: 6, fullName: "Diyorbek Tursunov", district: "Oltiariq tumani", schoolName: "56-maktab", grade: "9-sinf", matematika: 95, fizika: 99, kimyo: 97, biologiya: 94, informatika: 95, umumiy: 480 },
  { id: 7, fullName: "Shahlo To'raeva", district: "Urgut tumani", schoolName: "45-maktab", grade: "11-sinf", matematika: 93, fizika: 92, kimyo: 94, biologiya: 99, informatika: 93, umumiy: 471 },
  { id: 8, fullName: "Azizbek Qodirov", district: "Qo'rg'ontepa tumani", schoolName: "76-maktab", grade: "10-sinf", matematika: 91, fizika: 89, kimyo: 99, biologiya: 96, informatika: 92, umumiy: 467 },
  { id: 9, fullName: "Malika Abdurahmonova", district: "Dehqonobod tumani", schoolName: "3-maktab", grade: "9-sinf", matematika: 97, fizika: 96, kimyo: 93, biologiya: 91, informatika: 97, umumiy: 474 },
  { id: 10, fullName: "Sardor Rahmatov", district: "Shahrisabz tumani", schoolName: "22-maktab", grade: "8-sinf", matematika: 90, fizika: 98, kimyo: 96, biologiya: 93, informatika: 91, umumiy: 468 },
  { id: 11, fullName: "Dilshod Xamidov", district: "G'uzor tumani", schoolName: "15-maktab", grade: "11-sinf", matematika: 98, fizika: 95, kimyo: 97, biologiya: 94, informatika: 99, umumiy: 483 },
  { id: 12, fullName: "Gulnoza Yusupova", district: "Kosonsoy tumani", schoolName: "28-maktab", grade: "10-sinf", matematika: 96, fizika: 94, kimyo: 92, biologiya: 98, informatika: 95, umumiy: 475 },
  { id: 13, fullName: "Bobur Toshmatov", district: "Termiz tumani", schoolName: "41-maktab", grade: "9-sinf", matematika: 94, fizika: 97, kimyo: 99, biologiya: 95, informatika: 96, umumiy: 481 },
  { id: 14, fullName: "Madina Karimova", district: "Zarafshon shahri", schoolName: "7-maktab", grade: "8-sinf", matematika: 92, fizika: 91, kimyo: 90, biologiya: 97, informatika: 94, umumiy: 464 },
  { id: 15, fullName: "Javohir Ismoilov", district: "Xiva shahri", schoolName: "19-maktab", grade: "11-sinf", matematika: 99, fizika: 98, kimyo: 96, biologiya: 94, informatika: 100, umumiy: 487 }
];

// Schools data
export interface SchoolData {
  schoolName: string;
  district: string;
  region: string;
  studentsCount: number;
  matematika: number;
  fizika: number;
  kimyo: number;
  biologiya: number;
  informatika: number;
}

export const schoolsData: SchoolData[] = [
  { schoolName: "33-maktab", district: "Yunusobod tumani", region: "Toshkent shahri", studentsCount: 320, matematika: 120, fizika: 95, kimyo: 70, biologiya: 60, informatika: 110 },
  { schoolName: "17-maktab", district: "Chilonzor tumani", region: "Toshkent shahri", studentsCount: 310, matematika: 115, fizika: 90, kimyo: 68, biologiya: 58, informatika: 105 },
  { schoolName: "101-maktab", district: "Mirzo Ulug'bek tumani", region: "Toshkent shahri", studentsCount: 300, matematika: 110, fizika: 85, kimyo: 65, biologiya: 55, informatika: 100 },
  { schoolName: "88-maktab", district: "Olmazor tumani", region: "Toshkent shahri", studentsCount: 290, matematika: 105, fizika: 80, kimyo: 62, biologiya: 52, informatika: 95 },
  { schoolName: "12-maktab", district: "Shayxontohur tumani", region: "Toshkent shahri", studentsCount: 280, matematika: 100, fizika: 75, kimyo: 60, biologiya: 50, informatika: 90 },
  { schoolName: "56-maktab", district: "Oltiariq tumani", region: "Andijon viloyati", studentsCount: 270, matematika: 95, fizika: 70, kimyo: 58, biologiya: 48, informatika: 85 },
  { schoolName: "45-maktab", district: "Urgut tumani", region: "Samarqand viloyati", studentsCount: 260, matematika: 90, fizika: 65, kimyo: 55, biologiya: 45, informatika: 80 },
  { schoolName: "76-maktab", district: "Qo'rg'ontepa tumani", region: "Farg'ona viloyati", studentsCount: 250, matematika: 85, fizika: 60, kimyo: 52, biologiya: 42, informatika: 75 },
  { schoolName: "3-maktab", district: "Dehqonobod tumani", region: "Navoiy viloyati", studentsCount: 240, matematika: 80, fizika: 55, kimyo: 50, biologiya: 40, informatika: 70 },
  { schoolName: "22-maktab", district: "Shahrisabz tumani", region: "Qashqadaryo viloyati", studentsCount: 230, matematika: 75, fizika: 50, kimyo: 48, biologiya: 38, informatika: 65 }
];

