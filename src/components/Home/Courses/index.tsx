"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";
import { lessonsData } from "@/app/api/lessonsData";
import { getImagePrefix } from "@/utils/util";

const Courses = () => {
    // Show only first 3 lessons on homepage
    const featuredLessons = lessonsData.slice(0, 3);

    return (
        <section id="courses">
            <div className='container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4'>
                <div className="sm:flex justify-between items-center mb-12">
                    <h2 className="text-midnight_text text-4xl lg:text-5xl font-semibold mb-5 sm:mb-0">
                        Tahliliy darslar
                    </h2>
                    <Link 
                        href={'/lessons'} 
                        className="text-primary text-lg font-medium hover:tracking-widest duration-500 inline-flex items-center gap-2"
                    >
                        Barcha darslarni ko'rish
                        <Icon icon="solar:arrow-right-bold" className="text-xl" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredLessons.map((lesson) => (
                        <Link
                            key={lesson.id}
                            href="/lessons"
                            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group"
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
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Courses;
