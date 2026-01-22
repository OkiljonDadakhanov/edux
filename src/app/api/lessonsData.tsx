export interface Lesson {
  id: number;
  subject: string;
  title: string;
  mentorName: string;
  mentorTitle: string;
  mentorAchievements: string[];
  topic: string;
  youtubeUrl: string;
  youtubeId: string;
  imgSrc: string;
  description: string;
  type?: 'tahliliy' | 'amaliy'; // Optional type field
}

// Extract YouTube ID from URL
const getYouTubeId = (url: string): string => {
  // Handle youtu.be format
  if (url.includes('youtu.be/')) {
    const match = url.match(/youtu\.be\/([^?&#]+)/);
    return match ? match[1] : '';
  }
  // Handle youtube.com format
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtube\.com\/embed\/)([^&\n?#]+)/);
  return match ? match[1] : '';
};

export const lessonsData: Lesson[] = [
  {
    id: 1,
    subject: "Matematika",
    title: "Olimpiada masalalarini tenglama tuzmasdan oson yechish usullari",
    mentorName: "Abdushukur Axadov",
    mentorTitle: "Matematika eksperti",
    mentorAchievements: [
      "Matematika fanidan 2018-2019-yillardagi O'zbekiston terma jamoasi a'zosi",
      "2021-2022-yillarda talabalar oʻrtasida o'tkazilgan IMC olimpiadasi ikki karra oltin medal sovrindori"
    ],
    topic: "Olimpiada masalalarini tenglama tuzmasdan oson yechish usullari",
    youtubeUrl: "https://youtu.be/ZZS8hVWOREg?si=sWKC-8HVzPrZuLmS",
    youtubeId: getYouTubeId("https://youtu.be/ZZS8hVWOREg?si=sWKC-8HVzPrZuLmS"),
    imgSrc: "images/courses/math.jpg",
    description: "EduX loyihasi doirasida fan olimpiadalariga puxta tayyorgarlik ko'rish maqsadida malakali ekspertlar ishtirokidagi jonli, chuqur va tahliliy darslarga start berildi.",
    type: 'tahliliy'
  },
  {
    id: 2,
    subject: "Fizika",
    title: "O'lchashdagi xatoliklar: Absolut va nisbiy xatoliklar",
    mentorName: "Azizbek Atoyev",
    mentorTitle: "Fizika eksperti",
    mentorAchievements: [
      "Fan olimpiadalari markazining \"Fan kengashi a'zosi\"",
      "Fizika fanidan mahalliy olimpiadalar gʻoliblarining ustozi"
    ],
    topic: "O'lchashdagi xatoliklar: Absolut va nisbiy xatoliklar",
    youtubeUrl: "https://youtu.be/eGu3fdVTb6Y?si=J74hw1ZYUyI3MD8A",
    youtubeId: getYouTubeId("https://youtu.be/eGu3fdVTb6Y?si=J74hw1ZYUyI3MD8A"),
    imgSrc: "images/courses/fizika.jpeg",
    description: "EduX loyihasi doirasida fan olimpiadalariga puxta tayyorgarlik ko'rish maqsadida malakali ekspertlar ishtirokidagi jonli va tahliliy darslar oʻtkazilmoqda.",
    type: 'tahliliy'
  },
  {
    id: 3,
    subject: "Biologiya",
    title: "Eukariot hujayralarning tuzilishi va sitoplazmatik membrana funksiyasi",
    mentorName: "Davul Qutlimuratov",
    mentorTitle: "Biologiya eksperti",
    mentorAchievements: [
      "Fan olimpiadalari markazining \"Fan kengashi a'zosi\"",
      "Biologiya fanidan mahalliy olimpiadalar gʻoliblarining ustozi"
    ],
    topic: "Eukariot hujayralarning tuzilishi va sitoplazmatik membrana funksiyasi",
    youtubeUrl: "https://youtu.be/LpcBnSVPew8?si=dh4dTXafyJ-1sKpX",
    youtubeId: getYouTubeId("https://youtu.be/LpcBnSVPew8?si=dh4dTXafyJ-1sKpX"),
    imgSrc: "images/courses/biology.jpg",
    description: "EduX loyihasi doirasida fan olimpiadalariga puxta tayyorgarlik ko'rish maqsadida malakali ekspertlar ishtirokidagi jonli va tahliliy darslar oʻtkazilmoqda.",
    type: 'tahliliy'
  },
  {
    id: 4,
    subject: "Informatika",
    title: "Dinamik dasturlash va rekursiya",
    mentorName: "Davron Avlakulov",
    mentorTitle: "Informatika eksperti",
    mentorAchievements: [
      "Fan olimpiadalari markazining \"Fan kengashi a'zosi\"",
      "O'qituvchilar Respublika olimpiadasining sovrindori",
      "Informatika fanidan xalqaro va mahalliy olimpiada gʻoliblarining ustozi"
    ],
    topic: "Dinamik dasturlash va rekursiya",
    youtubeUrl: "https://youtu.be/h7MD2U25qMc?si=aj36Lgwvl-WiH9oI",
    youtubeId: getYouTubeId("https://youtu.be/h7MD2U25qMc?si=aj36Lgwvl-WiH9oI"),
    imgSrc: "images/courses/coursethree.png",
    description: "EduX loyihasi doirasida navbatdagi tahliliy dars informatika va axborot texnologiyalari fanidan bo'lib, ekspert sifatida Davron Avlakulov ishtirokida tashkil etiladi.",
    type: 'tahliliy'
  },
  {
    id: 5,
    subject: "Kimyo",
    title: "Oksidlanish-Qaytarilish reaksiyalari",
    mentorName: "Firdavs Sobirov",
    mentorTitle: "Kimyo eksperti",
    mentorAchievements: [
      "2020-2021-yilgi Terma jamoa a'zosi",
      "2021-yilgi Xalqaro Mendeleyev olimpiadasida oltin medal",
      "2020-yilgi Xalqaro kimyo olimpiadasida bronza medal sohibi",
      "Amaliy laboratoriya loyihasi o'qituvchisi"
    ],
    topic: "Oksidlanish-Qaytarilish reaksiyalari",
    youtubeUrl: "https://youtu.be/ppIb6nVj4Fs?si=pWJo6xz9wg6XYZzf",
    youtubeId: getYouTubeId("https://youtu.be/ppIb6nVj4Fs?si=pWJo6xz9wg6XYZzf"),
    imgSrc: "images/courses/chemistry.jpg",
    description: "EduX loyihasi doirasida navbatdagi tahliliy dars kimyo fanidan bo'lib, ekspert sifatida Firdavs Sobirov ishtirokida tashkil etiladi.",
    type: 'tahliliy'
  }
];

