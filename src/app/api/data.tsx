export const courseData: {
  heading: string;
  imgSrc: string;
  name: string;
  students: number;
  classes: number;
  price: number;
  rating: number;
}[] = [
  {
    heading: "Matematika: Algebra asoslari (4-sinf)",
    name: "Nodira Karimova",
    imgSrc: "images/courses/math.jpg",
    students: 150,
    classes: 12,
    price: 20,
    rating: 4.4,
  },
  {
    heading: "Fizika: Kuch va harakat (5-sinf)",
    name: "Nodira Karimova",
    imgSrc: "images/courses/fizika.jpeg",
    students: 130,
    classes: 12,
    price: 20,
    rating: 4.5,
  },
  {
    heading: "Biologiya: Hayvonlar dunyosi (6-sinf)",
    name: "Dilshod Qodirov",
    imgSrc: "images/courses/biology.jpg",
    students: 120,
    classes: 12,
    price: 20,
    rating: 5,
  },
  {
    heading: "Kimyo: Asosiy reaksiyalar (7-sinf)",
    name: "Jahongir Akramov",
    imgSrc: "images/courses/chemistry.jpg",
    students: 150,
    classes: 12,
    price: 20,
    rating: 5,
  },
  {
    heading: "Matematika: Geometriya (8-sinf)",
    name: "Nodira Karimova",
    imgSrc: "images/courses/math.jpg",
    students: 150,
    classes: 12,
    price: 20,
    rating: 5,
  },
  {
    heading: "Fizika: Elektr va magnit (9-sinf)",
    name: "Dilshod Qodirov",
    imgSrc: "images/courses/coursethree.png",
    students: 150,
    classes: 12,
    price: 20,
    rating: 4.2,
  },
  {
    heading: "Biologiya: O'simliklar dunyosi (10-sinf)",
    name: "Nodira Karimova",
    imgSrc: "images/courses/biology.jpg",
    students: 150,
    classes: 12,
    price: 20,
    rating: 4.7,
  },
  {
    heading: "Kimyo: Organik kimyo asoslari (11-sinf)",
    name: "Jahongir Akramov",
    imgSrc: "images/courses/chemistry.jpg",
    students: 150,
    classes: 12,
    price: 20,
    rating: 4.8,
  },
];

export const MentorData: { profession: string; name: string; imgSrc: string }[] = [
  { profession: "Matematika o'qituvchisi", name: "Shavkat Yusupov", imgSrc: "images/mentor/user3.png" },
  { profession: "Fizika o'qituvchisi", name: "Dilshod Qodirov", imgSrc: "images/mentor/user2.png" },
  { profession: "Biologiya o'qituvchisi", name: "Nodira Karimova", imgSrc: "images/mentor/user1.png" },
  { profession: "Kimyo o'qituvchisi", name: "Jahongir Akramov", imgSrc: "images/mentor/user3.png" },
  { profession: "Matematika o'qituvchisi", name: "Shavkat Yusupov", imgSrc: "images/mentor/user2.png" },
  { profession: "Fizika o'qituvchisi", name: "Dilshod Qodirov", imgSrc: "images/mentor/user1.png" },
];

export const TestimonialData: { profession: string; comment: string; imgSrc: string; name: string; rating: number }[] = [
  {
    name: "Ali Xasanov",
    profession: "O'quvchi, 10-sinf",
    comment: "Matematika bo'yicha kurs juda foydali bo'ldi, darslar tushunarli va interaktiv edi.",
    imgSrc: "images/testimonial/user.svg",
    rating: 5,
  },
  {
    name: "Laylo Rahimova",
    profession: "O'quvchi, 9-sinf",
    comment: "Fizika mavzulari sodda va qiziqarli tushuntirilgan. Har bir topshiriq amaliy edi.",
    imgSrc: "images/mentor/user2.png",
    rating: 5,
  },
  {
    name: "Jasur Omonov",
    profession: "O'quvchi, 11-sinf",
    comment: "Kimyo kursi ajoyib! Har bir mavzu misollar bilan tushuntirilgan.",
    imgSrc: "images/mentor/user3.png",
    rating: 5,
  },
  {
    name: "Nilufar Karimova",
    profession: "O'quvchi, 8-sinf",
    comment: "Biologiya darslari juda qiziqarli va interaktiv edi.",
    imgSrc: "images/mentor/user1.png",
    rating: 5,
  },
];
