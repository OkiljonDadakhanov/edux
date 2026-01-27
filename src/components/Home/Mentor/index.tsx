"use client";
import React, { useState } from "react";
import Image from "next/image";
import { getImagePrefix } from "@/utils/util";
import { Icon } from "@iconify/react/dist/iconify.js";

interface Achievement {
  text: string;
  type?: 'medal' | 'member' | 'teacher' | 'other';
  link?: string;
}

interface Mentor {
  name: string;
  imgSrc: string;
  subject: string;
  achievements: Achievement[];
}

// Mentor data based on actual files in public/images/mentors/
const mentorsBySubject: Record<string, Mentor[]> = {
  Matematika: [
    { 
      name: "Abbosbek Muhammedov", 
      imgSrc: "images/mentors/matematika/Abbos.webp", 
      subject: "Matematika",
      achievements: [
        { text: "Fan olimpiadalari markazining \"Fan kengashi a'zosi\"", type: 'member' },
        { text: "O'qituvchilar Respublika olimpiadasining sovrindori", type: 'other' },
        { text: "Mahalliy olimpiada gʻoliblarining ustozi", type: 'teacher' },
      ]
    },
    { 
      name: "Abdulla Ismatov", 
      imgSrc: "images/mentors/matematika/Abdulla.webp", 
      subject: "Matematika",
      achievements: [
        { text: "2020-yilgi Xalqaro Kavkaz matematika olimpiadasida kumush medal sohibi", type: 'medal' },
        { text: "Fan olimpiadalari markazining \"Fan kengashi a'zosi\"", type: 'member' },
        { text: "Matematika fanidan mahalliy olimpiadalar gʻoliblarining ustozi", type: 'teacher' },
      ]
    },
    { 
      name: "Abdushukur Axadov", 
      imgSrc: "images/mentors/matematika/Abdushukur.webp", 
      subject: "Matematika",
      achievements: [
        { text: "Matematika fanidan 2018-2019-yillardagi O'zbekiston terma jamoasi a'zosi", type: 'member' },
        { text: "2021-2022-yillarda talabalar oʻrtasida o'tkazilgan IMC olimpiadasi ikki karra oltin medal sovrindori", type: 'medal' },
      ]
    },
    { 
      name: "Nodirjon Mirzayev", 
      imgSrc: "images/mentors/matematika/Abdulla.webp", 
      subject: "Matematika",
      achievements: [
        { text: "Fan olimpiadalari markazining \"Fan kengashi a'zosi\"", type: 'member' },
        { text: "2019-yilda bo'lib o'tgan Asosiy olimpiadaning Respublika bosqichi sovrindori", type: 'other' },
        { text: "Matematika fanidan mahalliy olimpiadalar gʻoliblarining ustozi", type: 'teacher' },
      ]
    },
  ],
  Informatika: [
    { 
      name: "Davron Avlakulov", 
      imgSrc: "images/mentors/informatika/Davron.webp", 
      subject: "Informatika",
      achievements: [
        { text: "Fan olimpiadalari markazining \"Fan kengashi a'zosi\"", type: 'member' },
        { text: "O'qituvchilar Respublika olimpiadasining sovrindori", type: 'other' },
        { text: "Informatika fanidan xalqaro va mahalliy olimpiada gʻoliblarining ustozi", type: 'teacher' },
      ]
    },
    { 
      name: "Otabek Aralov", 
      imgSrc: "images/mentors/informatika/Mansurjon.webp", 
      subject: "Informatika",
      achievements: [
        { text: "Uzoq yillik samarali tajribaga ega pedagog", type: 'teacher' },
        { text: "O'qituvchilar Respublika olimpiadasining ishtirokchisi", type: 'other' },
        { text: "Informatika fanidan mahalliy olimpiada gʻoliblarining ustozi", type: 'teacher' },
      ]
    },
    { 
      name: "Mansurjon Kamolov", 
      imgSrc: "images/mentors/informatika/Mansurjon.webp", 
      subject: "Informatika",
      achievements: []
    },
    { 
      name: "Saidjalol Hasanov", 
      imgSrc: "images/mentors/informatika/Saidjalol.webp", 
      subject: "Informatika",
      achievements: []
    },
  ],
  Biologiya: [
    { 
      name: "Davul Qutlimuratov", 
      imgSrc: "images/mentors/biologiya/Davul.webp", 
      subject: "Biologiya",
      achievements: [
        { text: "Fan olimpiadalari markazining \"Fan kengashi a'zosi\"", type: 'member' },
        { text: "Biologiya fanidan mahalliy olimpiadalar gʻoliblarining ustozi", type: 'teacher' },
      ]
    },
    {
      name: "Humoyun Yusupov",
      imgSrc: "images/mentors/biologiya/xumoyun.webp",
      subject: "Biologiya",
      achievements: [
        { text: "Mahalliy olimpiada gʻoliblarining ustozi", type: 'teacher' },
        { text: "Biologiya fanidan bir qancha Xalqaro tanlovlar g'olibi", type: 'other' },
      ]
    },
    {
      name: "Otabek Jo'rayev",
      imgSrc: "images/mentors/biologiya/👤Otabek.HEIC",
      subject: "Biologiya",
      achievements: [
        { text: "Biologiya fani bo'yicha uzoq yillik tajribaga ega", type: 'teacher' },
        { text: "O'qituvchilar Respublika olimpiadasi sovrindori", type: 'other' },
        { text: "Mahalliy olimpiada gʻoliblarining ustozi", type: 'teacher' },
      ]
    },
  ],
  Kimyo: [
    { 
      name: "Firdavs Sobirov", 
      imgSrc: "images/mentors/kimyo/Firdavs.webp", 
      subject: "Kimyo",
      achievements: [
        { text: "2020-2021-yilgi Terma jamoa a'zosi", type: 'member' },
        { text: "2021-yilgi Xalqaro Mendeleyev olimpiadasida oltin medal", type: 'medal' },
        { text: "2020-yilgi Xalqaro kimyo olimpiadasida bronza medal sohibi", type: 'medal' },
        { text: "Amaliy laboratoriya loyihasi o'qituvchisi", type: 'teacher', link: "https://t.me/Fan_olimpiadalari_M/7089" },
      ]
    },
    { 
      name: "Omadillo Zokirov", 
      imgSrc: "images/mentors/kimyo/Omadillo.webp", 
      subject: "Kimyo",
      achievements: [
        { text: "Fan olimpiadalari markazining \"Fan kengashi a'zosi\"", type: 'member' },
        { text: "O'qituvchilar Respublika olimpiadasining sovrindori", type: 'other' },
        { text: "Mahalliy olimpiada gʻoliblarining ustozi", type: 'teacher' },
      ]
    },
    {
      name: "Shaxzod Qo'chqorov",
      imgSrc: "images/mentors/kimyo/Shaxzod.webp",
      subject: "Kimyo",
      achievements: []
    },
    {
      name: "Doniyor Tohirov",
      imgSrc: "images/mentors/kimyo/👤Doniyor.jpg",
      subject: "Kimyo",
      achievements: [
        { text: "Fan olimpiadalari markazining \"Fan kengashi a'zosi\"", type: 'member' },
        { text: "O'qituvchilar Respublika olimpiadasining ikki karra sovrindori", type: 'other' },
        { text: "Mahalliy olimpiada gʻoliblarining ustozi", type: 'teacher' },
      ]
    },
    {
      name: "Elbek Toshpulatov",
      imgSrc: "images/mentors/matematika/Elbek Toshpulatov.jpg",
      subject: "Kimyo",
      achievements: [
        { text: "Fan olimpiadalari markazining \"Fan kengashi a'zosi\"", type: 'member' },
        { text: "O'qituvchilar Respublika olimpiadasining sovrindori", type: 'other' },
        { text: "Mahalliy olimpiada gʻoliblarining ustozi", type: 'teacher' },
        { text: "Mintaqaviy xalqaro olimpiada gʻolibi", type: 'medal' },
      ]
    },
  ],
  Fizika: [
    { 
      name: "Azizbek Atoyev", 
      imgSrc: "images/mentors/fizika/Azizbek.webp", 
      subject: "Fizika",
      achievements: [
        { text: "Fan olimpiadalari markazining \"Fan kengashi a'zosi\"", type: 'member' },
        { text: "Fizika fanidan mahalliy olimpiadalar gʻoliblarining ustozi", type: 'teacher' },
      ]
    },
    { 
      name: "Mardon Xolmatov", 
      imgSrc: "images/mentors/fizika/Mardon.webp", 
      subject: "Fizika",
      achievements: []
    },
    { 
      name: "Shirinbek Baratov", 
      imgSrc: "images/mentors/fizika/Shirinbek.webp", 
      subject: "Fizika",
      achievements: [
        { text: "O'zbekiston Terma jamoasi treneri", type: 'teacher' },
        { text: "Fan olimpiadalari markazining \"Fan kengashi a'zosi\"", type: 'member' },
        { text: "O'qituvchilar Respublika olimpiadasining sovrindori", type: 'other' },
        { text: "Fizika fanidan mahalliy va xalqaro olimpiadalar gʻoliblarining ustozi", type: 'teacher' },
      ]
    },
  ],
};

const subjects = ["Matematika", "Informatika", "Biologiya", "Kimyo", "Fizika"];

const Mentor = () => {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [expandedMentor, setExpandedMentor] = useState<string | null>(null);

  const displayedMentors = selectedSubject ? mentorsBySubject[selectedSubject] || [] : [];

  const toggleMentor = (mentorKey: string) => {
    setExpandedMentor(expandedMentor === mentorKey ? null : mentorKey);
  };

  const getAchievementIcon = (type?: string) => {
    switch (type) {
      case 'medal':
        return 'solar:medal-ribbons-star-bold';
      case 'member':
        return 'solar:users-group-two-rounded-bold';
      case 'teacher':
        return 'solar:user-check-rounded-bold';
      default:
        return 'solar:check-circle-bold';
    }
  };

  const getAchievementColor = (type?: string) => {
    switch (type) {
      case 'medal':
        return 'text-yellow-600 bg-yellow-50';
      case 'member':
        return 'text-blue-600 bg-blue-50';
      case 'teacher':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <section className="bg-deepSlate" id="mentor">
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4 py-20">
        <h2 className="text-midnight_text text-4xl lg:text-5xl font-semibold mb-4">
          Mentorlar bilan <br /> tanishing.
        </h2>
        <p className="text-gray-600 text-lg mb-8">
          Fanlar bo'yicha mentorlarimizni tanlang va ular bilan tanishib chiqing
        </p>

        {/* Subject Selection */}
        <div className="flex flex-wrap gap-4 mb-12">
          {subjects.map((subject) => (
            <button
              key={subject}
              onClick={() => setSelectedSubject(selectedSubject === subject ? null : subject)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                selectedSubject === subject
                  ? "bg-primary text-white shadow-lg transform scale-105"
                  : "bg-white text-gray-700 hover:bg-gray-100 shadow-md hover:shadow-lg"
              }`}
            >
              {subject}
              {selectedSubject === subject && (
                <Icon icon="solar:check-circle-bold" className="inline-block ml-2 text-xl" />
              )}
            </button>
          ))}
        </div>

        {/* Mentors Grid */}
        {selectedSubject ? (
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {selectedSubject} bo'yicha mentorlar
            </h3>
            {displayedMentors.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-start">
                {displayedMentors.map((mentor, index) => {
                  const mentorKey = `${mentor.subject}-${mentor.name}-${index}`;
                  const isExpanded = expandedMentor === mentorKey;
                  const hasAchievements = mentor.achievements && mentor.achievements.length > 0;

                  return (
                    <div
                      key={mentorKey}
                      className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 mentor-card flex flex-col overflow-hidden group ${
                        isExpanded ? 'ring-2 ring-primary' : ''
                      }`}
                      style={{
                        animationDelay: `${index * 100}ms`
                      }}
                    >
                      {/* Mentor Info Section */}
                      <div 
                        className={`p-6 text-center ${hasAchievements ? 'cursor-pointer' : ''} ${hasAchievements ? '' : 'pb-6'}`}
                        onClick={() => hasAchievements && toggleMentor(mentorKey)}
                      >
                        <div className="relative mb-4 flex-shrink-0">
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className="w-[150px] h-[150px] mx-auto relative">
                            <Image
                              src={`${getImagePrefix()}${mentor.imgSrc}`}
                              alt={mentor.name}
                              fill
                              className="rounded-full border-4 border-primary group-hover:border-secondary transition-all duration-300 group-hover:scale-105 object-cover"
                              sizes="150px"
                            />
                          </div>
                        </div>
                        <div className="flex-grow flex flex-col justify-between">
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors leading-tight">
                              {mentor.name}
                            </h3>
                            <h4 className="text-sm font-medium text-primary mb-3">
                              {mentor.subject} o'qituvchisi
                            </h4>
                          </div>
                          <div className="flex justify-center items-center gap-2 mb-3">
                            <Icon
                              icon="solar:star-bold"
                              className="text-yellow-400 text-xl flex-shrink-0"
                            />
                            <span className="text-gray-600 font-semibold">4.9</span>
                          </div>
                          {hasAchievements && (
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleMentor(mentorKey);
                              }}
                              className="mt-2 text-xs text-primary font-semibold hover:text-secondary transition-colors flex items-center justify-center gap-1 mx-auto"
                            >
                              {isExpanded ? (
                                <>
                                  <span>Yopish</span>
                                  <Icon icon="solar:alt-arrow-up-bold" className="text-sm" />
                                </>
                              ) : (
                                <>
                                  <span>Yutuqlarni ko'rish</span>
                                  <Icon icon="solar:alt-arrow-down-bold" className="text-sm" />
                                </>
                              )}
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Achievements Section */}
                      {hasAchievements && (
                        <div
                          className={`overflow-hidden transition-all duration-500 ease-in-out ${
                            isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                          }`}
                          style={{
                            transitionProperty: 'max-height, opacity',
                          }}
                        >
                          <div className="px-6 pb-6 pt-0 border-t border-gray-100">
                            <div className="space-y-3 mt-4">
                              {mentor.achievements.map((achievement, idx) => (
                                <div
                                  key={idx}
                                  className={`flex items-start gap-3 p-3 rounded-lg ${getAchievementColor(achievement.type)} transition-all hover:shadow-md`}
                                >
                                  <div className="flex-shrink-0 mt-0.5">
                                    <Icon
                                      icon={getAchievementIcon(achievement.type)}
                                      className="text-lg"
                                    />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    {achievement.link ? (
                                      <a
                                        href={achievement.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm font-medium leading-relaxed hover:underline flex items-center gap-2"
                                      >
                                        {achievement.text}
                                        <Icon icon="solar:link-bold" className="text-xs flex-shrink-0" />
                                      </a>
                                    ) : (
                                      <p className="text-sm font-medium leading-relaxed">
                                        {achievement.text}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
                <Icon
                  icon="solar:user-id-bold"
                  className="text-6xl text-gray-300 mx-auto mb-4"
                />
                <p className="text-lg text-gray-600">
                  Bu fan bo'yicha mentorlar hozircha mavjud emas
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
            <Icon
              icon="solar:book-bookmark-bold"
              className="text-6xl text-gray-300 mx-auto mb-4"
            />
            <p className="text-xl text-gray-600 font-medium">
              Fanlardan birini tanlang va mentorlar bilan tanishib chiqing
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Mentor;
