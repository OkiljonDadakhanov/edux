"use client";
import React, { useState } from "react";
import Image from "next/image";
import { getImagePrefix } from "@/utils/util";
import { Icon } from "@iconify/react/dist/iconify.js";

interface Mentor {
  name: string;
  imgSrc: string;
  subject: string;
}

// Mentor data based on actual files in public/images/mentors/
const mentorsBySubject: Record<string, Mentor[]> = {
  Matematika: [
    { name: "Abbos Muhammedov", imgSrc: "images/mentors/matematika/Abbos.webp", subject: "Matematika" },
    { name: "Abdulla Ismatov", imgSrc: "images/mentors/matematika/Abdulla.webp", subject: "Matematika" },
    { name: "Abdushukur Ahadov", imgSrc: "images/mentors/matematika/Abdushukur.webp", subject: "Matematika" },
  ],
  Informatika: [
    { name: "Davron Avlakulov", imgSrc: "images/mentors/informatika/Davron.webp", subject: "Informatika" },
    { name: "Mansurjon Kamolov", imgSrc: "images/mentors/informatika/Mansurjon.webp", subject: "Informatika" },
    { name: "Saidjalol Hasanov", imgSrc: "images/mentors/informatika/Saidjalol.webp", subject: "Informatika" },
  ],
  Biologiya: [
    { name: "Davul Qutlimuratov", imgSrc: "images/mentors/biologiya/Davul.webp", subject: "Biologiya" },
    { name: "Xumoyun Yusupov", imgSrc: "images/mentors/biologiya/xumoyun.webp", subject: "Biologiya" },
  ],
  Kimyo: [
    { name: "Firdavs Sobirov", imgSrc: "images/mentors/kimyo/Firdavs.webp", subject: "Kimyo" },
    { name: "Omadillo Zokirov", imgSrc: "images/mentors/kimyo/Omadillo.webp", subject: "Kimyo" },
    { name: "Shaxzod Qo'chqorov", imgSrc: "images/mentors/kimyo/Shaxzod.webp", subject: "Kimyo" },
  ],
  Fizika: [
    { name: "Azizbek Atoyev", imgSrc: "images/mentors/fizika/Azizbek.webp", subject: "Fizika" },
    { name: "Mardon Xolmatov", imgSrc: "images/mentors/fizika/Mardon.webp", subject: "Fizika" },
    { name: "Shirinbek Baratov", imgSrc: "images/mentors/fizika/Shirinbek.webp", subject: "Fizika" },
  ],
};

const subjects = ["Matematika", "Informatika", "Biologiya", "Kimyo", "Fizika"];

const Mentor = () => {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const displayedMentors = selectedSubject ? mentorsBySubject[selectedSubject] || [] : [];

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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 items-stretch">
                {displayedMentors.map((mentor, index) => (
                  <div
                    key={`${mentor.subject}-${mentor.name}-${index}`}
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 text-center group mentor-card flex flex-col h-full"
                    style={{
                      animationDelay: `${index * 100}ms`
                    }}
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
                    <div className="flex-grow flex flex-col justify-between min-h-[100px]">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors leading-tight">
                          {mentor.name}
                        </h3>
                        <h4 className="text-sm font-medium text-primary mb-3">
                          {mentor.subject} o'qituvchisi
                        </h4>
                      </div>
                      <div className="flex justify-center items-center gap-2 mt-auto">
                        <Icon
                          icon="solar:star-bold"
                          className="text-yellow-400 text-xl flex-shrink-0"
                        />
                        <span className="text-gray-600 font-semibold">4.9</span>
                      </div>
                    </div>
                  </div>
                ))}
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
