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

  const filteredLessons = selectedSubject === "Barcha fanlar"
    ? lessonsData
    : lessonsData.filter(lesson => lesson.subject === selectedSubject);

  const getYouTubeEmbedUrl = (videoId: string) => {
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <main className="pt-24 min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto max-w-screen-2xl px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12 mt-10">
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
      </div>
    </main>
  );
}

