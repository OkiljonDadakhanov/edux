"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";
import { getImagePrefix } from "@/utils/util";
import { lessonsData, type Lesson } from "@/app/api/lessonsData";

const subjects = ["Barcha fanlar", "Matematika", "Fizika", "Biologiya", "Informatika", "Kimyo"];

export default function LessonsPage() {
  const [selectedSubject, setSelectedSubject] = useState("Barcha fanlar");
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  // Filter lessons by subject and type (only tahliliy)
  const filteredLessons = lessonsData
    .filter(lesson => lesson.type === 'tahliliy' || !lesson.type) // Show tahliliy or lessons without type
    .filter(lesson => selectedSubject === "Barcha fanlar" || lesson.subject === selectedSubject);

  const getYouTubeEmbedUrl = (videoId: string) => {
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <main className="pt-24 min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto max-w-screen-2xl px-4 py-12">
        {/* Project Description - At the top */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border-l-4 border-primary shadow-lg">
            <div className="flex items-start gap-4 mb-4">
              <Icon icon="solar:lightning-bold" className="text-3xl text-primary flex-shrink-0" />
              <h3 className="text-2xl font-bold text-gray-900">
                YANGI LOYIHA: KIMYO FANI — BARCHA UCHUN!
              </h3>
            </div>
            <p className="text-gray-700 mb-6 text-lg">
              Fan olimpiadalari markazi tomonidan yangi "Kimyo fani - BARCHA UCHUN!" loyihasi start berilmoqda!
            </p>
            <p className="text-gray-700 font-semibold mb-4 text-lg">
              Ushbu loyiha orqali SIZ quyidagilarni o'rganasiz:
            </p>
            <ul className="space-y-3 text-gray-700 mb-6">
              <li className="flex items-center gap-3">
                <Icon icon="solar:user-check-rounded-bold" className="text-green-600 text-xl flex-shrink-0" />
                <span className="text-base">Eng sodda tajribalar</span>
              </li>
              <li className="flex items-center gap-3">
                <Icon icon="solar:test-tube-bold" className="text-green-600 text-xl flex-shrink-0" />
                <span className="text-base">Murakkab laboratoriyalar</span>
              </li>
              <li className="flex items-center gap-3">
                <Icon icon="solar:verified-check-bold" className="text-red-600 text-xl flex-shrink-0" />
                <span className="text-base">hammasini — to'g'ridan-to'g'ri onlayn tarzda o'rganasiz!</span>
              </li>
            </ul>
            <div className="mt-6 pt-6 border-t border-primary/20">
              <p className="text-gray-700 mb-3 flex items-center gap-2">
                <Icon icon="solar:verified-check-bold" className="text-green-600 text-lg" />
                <span>Loyiha doirasidagi amaliy mashg'ulotlar har seshanba kuni Fan olimpiadalari markazining rasmiy sahifalarida yoritib boriladi.</span>
              </p>
              <p className="text-primary font-bold text-xl flex items-center gap-2">
                <Icon icon="solar:close-circle-bold" className="text-lg" />
                <span>Endi bahona yo'q — bilim olish imkoniyati hammaga ochiq!</span>
              </p>
            </div>
          </div>
        </div>

        {/* Header */}
        <div id="tahliliy" className="text-center mb-12 scroll-mt-24">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Tahliliy darslar
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Fan olimpiadalariga puxta tayyorgarlik ko'rish maqsadida malakali ekspertlar ishtirokidagi jonli va tahliliy darslar
          </p>
        </div>

        {/* Subject Filter */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          {subjects.map((subject) => (
            <button
              key={subject}
              onClick={() => setSelectedSubject(subject)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                selectedSubject === subject
                  ? "bg-primary text-white shadow-lg transform scale-105"
                  : "bg-white text-gray-700 hover:bg-gray-100 shadow-md"
              }`}
            >
              {subject}
            </button>
          ))}
        </div>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredLessons.map((lesson) => (
            <div
              key={lesson.id}
              onClick={() => setSelectedLesson(lesson)}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden group"
            >
              {/* Thumbnail */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={`${getImagePrefix()}${lesson.imgSrc}`}
                  alt={lesson.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-primary/90 backdrop-blur-sm rounded-lg px-3 py-2">
                    <p className="text-white font-semibold text-sm">{lesson.subject}</p>
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-red-600 rounded-full p-3 group-hover:scale-110 transition-transform">
                  <Icon icon="solar:play-circle-bold" className="text-white text-2xl" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                  {lesson.topic}
                </h3>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon icon="solar:user-bold" className="text-primary text-lg" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{lesson.mentorName}</p>
                    <p className="text-xs text-gray-600">{lesson.mentorTitle}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Icon icon="solar:clock-circle-bold" className="text-primary" />
                  <span>Tahliliy dars</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Video Modal */}
        {selectedLesson && (
          <div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedLesson(null)}
          >
            <div
              className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Video Player */}
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  src={getYouTubeEmbedUrl(selectedLesson.youtubeId)}
                  title={selectedLesson.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full rounded-t-2xl"
                />
              </div>

              {/* Video Info */}
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold mb-3">
                      {selectedLesson.subject}
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                      {selectedLesson.topic}
                    </h2>
                    <p className="text-gray-600 mb-6">
                      {selectedLesson.description}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedLesson(null)}
                    className="ml-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <Icon icon="solar:close-circle-bold" className="text-gray-600 text-3xl" />
                  </button>
                </div>

                {/* Mentor Info */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon icon="solar:user-bold" className="text-white text-2xl" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {selectedLesson.mentorName}
                      </h3>
                      <p className="text-primary font-semibold mb-3">
                        {selectedLesson.mentorTitle}
                      </p>
                      <ul className="space-y-2">
                        {selectedLesson.mentorAchievements.map((achievement, index) => (
                          <li key={index} className="flex items-start gap-2 text-gray-700">
                            <Icon icon="solar:verified-check-bold" className="text-green-600 text-lg flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* YouTube Link */}
                <a
                  href={selectedLesson.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  <Icon icon="solar:youtube-bold" className="text-2xl" />
                  YouTube'da ko'rish
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Amaliy darslar Section */}
        <AmaliyDarslar />
      </div>
    </main>
  );
}

// Amaliy darslar component
interface PracticalLesson {
  id: number;
  title: string;
  topic: string;
  difficulty: string;
  type: 'amaliy' | 'tahliliy';
  youtubeUrl: string;
  youtubeId: string;
  description?: string;
  projectLink?: string;
}

const practicalLessons: PracticalLesson[] = [
  {
    id: 1,
    title: "Kimyo fani - BARCHA UCHUN!",
    topic: "Titrlash jarayoni",
    difficulty: "Boshlang'ich",
    type: 'amaliy',
    youtubeUrl: "https://youtu.be/xFleHlGV-00?si=p3RVmp81ceAhKo0S",
    youtubeId: "xFleHlGV-00",
    projectLink: "https://t.me/Fan_olimpiadalari_M/7412"
  },
  {
    id: 2,
    title: "Kimyo fani - BARCHA UCHUN!",
    topic: "Kimyoviy laboratoriya jihozlari bilan tanishish",
    difficulty: "Boshlang'ich",
    type: 'tahliliy',
    youtubeUrl: "https://youtu.be/DFrgW_ZYAes?si=Cfegs6fSxm4UvvUI",
    youtubeId: "DFrgW_ZYAes",
    projectLink: "https://t.me/Fan_olimpiadalari_M/7412"
  },
  {
    id: 3,
    title: "Kimyo fani - BARCHA UCHUN!",
    topic: "Reaksiya davomida hosil boʻladigan choʻkmani ajratib olish",
    difficulty: "Boshlang'ich",
    type: 'amaliy',
    youtubeUrl: "https://youtu.be/okjtFVbSUn0?si=JJZmycbhcAwvouQn",
    youtubeId: "okjtFVbSUn0",
    projectLink: "https://t.me/Fan_olimpiadalari_M/7412"
  },
  {
    id: 4,
    title: "Kimyo fani - BARCHA UCHUN!",
    topic: "Kimyoviy reaksiyalarning o'rin olish, almashinish va parchalanish bosqichlari",
    difficulty: "Boshlang'ich",
    type: 'tahliliy',
    youtubeUrl: "https://youtu.be/sjZuj-wK9zA?si=RItYzs9FvvnxHRhQ",
    youtubeId: "sjZuj-wK9zA",
    projectLink: "https://t.me/Fan_olimpiadalari_M/7412"
  },
  {
    id: 5,
    title: "Kimyo fani - BARCHA UCHUN!",
    topic: "Texnik natriy xloridni filtrlash",
    difficulty: "Boshlang'ich",
    type: 'tahliliy',
    youtubeUrl: "https://youtu.be/_Yhot-Ev8Vc?si=R2ChsHOpoAml_ljg",
    youtubeId: "_Yhot-Ev8Vc",
    projectLink: "https://t.me/Fan_olimpiadalari_M/7412"
  },
  {
    id: 6,
    title: "Kimyo fani - BARCHA UCHUN!",
    topic: "Kimyoviy reaksiyalarning borish shartlari",
    difficulty: "Boshlang'ich",
    type: 'amaliy',
    youtubeUrl: "https://youtu.be/JgSwcNwokeA?si=ji01dwRvzm9iKqWS",
    youtubeId: "JgSwcNwokeA",
    projectLink: "https://t.me/Fan_olimpiadalari_M/7412"
  },
  {
    id: 7,
    title: "Kimyo fani - BARCHA UCHUN!",
    topic: "Moddalarni tashqi koʻrinishiga koʻra aniqlash",
    difficulty: "Boshlang'ich",
    type: 'amaliy',
    youtubeUrl: "https://youtu.be/4oDe-WQzqPg?si=IswdA3QyaB80B73_",
    youtubeId: "4oDe-WQzqPg",
    projectLink: "https://t.me/Fan_olimpiadalari_M/7412"
  }
];

const AmaliyDarslar = () => {
  const getYouTubeThumbnail = (videoId: string) => {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  };

  // Filter only amaliy lessons
  const filteredLessons = practicalLessons.filter(lesson => lesson.type === 'amaliy');

  return (
    <section id="amaliy" className="mt-20 mb-12 scroll-mt-24">
      <div className="text-center mb-12">
        <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
          #Kimyo_barcha_uchun
        </div>
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          Amaliy darslar
        </h2>
      </div>



      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {filteredLessons.map((lesson) => (
          <div
            key={lesson.id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group"
          >
            {/* Thumbnail */}
            <a
              href={lesson.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative block h-48 overflow-hidden"
            >
              <Image
                src={getYouTubeThumbnail(lesson.youtubeId)}
                alt={lesson.topic}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-primary/90 backdrop-blur-sm rounded-lg px-3 py-2">
                  <p className="text-white font-semibold text-sm">Kimyo</p>
                </div>
              </div>
              <div className="absolute top-4 right-4 bg-red-600 rounded-full p-3 group-hover:scale-110 transition-transform">
                <Icon icon="solar:play-circle-bold" className="text-white text-2xl" />
              </div>
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  lesson.type === 'amaliy' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-blue-500 text-white'
                }`}>
                  {lesson.type === 'amaliy' ? 'Amaliy lab' : 'Tahliliy'}
                </span>
              </div>
            </a>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded">
                  {lesson.difficulty}
                </span>
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Icon icon="solar:calendar-bold" className="text-xs" />
                  Mavzu
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                {lesson.topic}
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                <Icon icon="solar:user-bold" className="text-primary" />
                <span>Firdavs Sobirov</span>
              </div>
              <a
                href={lesson.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors text-sm"
              >
                <Icon icon="solar:youtube-bold" className="text-lg" />
                Tomosha qiling
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
