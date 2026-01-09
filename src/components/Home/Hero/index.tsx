"use client";
import Image from 'next/image';
import Link from 'next/link';
import { Icon } from "@iconify/react/dist/iconify.js";
import { getImagePrefix } from '@/utils/util';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from 'react';
import { studentsRankingData } from '@/app/api/statisticsData';
import { lessonsData } from '@/app/api/lessonsData';

// Get top 3 students
const top3Students = studentsRankingData
  .sort((a, b) => b.umumiy - a.umumiy)
  .slice(0, 3);

// Get 2 lessons for today's lessons
const todayLessons = lessonsData.slice(0, 2);

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: false,
        fade: true,
        cssEase: "linear",
        beforeChange: (current: number, next: number) => setCurrentSlide(next),
        customPaging: (i: number) => (
            <div className={`w-3 h-3 rounded-full transition-all duration-300 ${i === currentSlide ? 'bg-secondary' : 'bg-gray-300'}`} />
        ),
        appendDots: (dots: React.ReactNode) => (
            <div className="flex justify-center gap-2 mt-8">
                {dots}
            </div>
        )
    };

    return (
        <section id="home-section" className='bg-slateGray'>
            <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4 pt-20 pb-20">
                <Slider {...settings} className="hero-slider">
                    {/* Slide 1: Top 3 Students */}
                    <div className="px-2">
                        <div className='grid grid-cols-1 lg:grid-cols-12 space-x-1 items-center gap-8'>
                            <div className='col-span-6 flex flex-col gap-8'>
                                <div className='flex gap-2 mx-auto lg:mx-0 mb-4'>
                                    <Icon
                                        icon="solar:trophy-bold"
                                        className="text-secondary text-xl inline-block me-2"
                                    />
                                    <p className='text-secondary text-sm font-semibold text-center lg:text-start'>
                                        Top 3 o'quvchilar
                                    </p>
                                </div>
                                <h1 className='text-midnight_text text-4xl sm:text-5xl font-semibold pt-5 lg:pt-0 mb-4'>
                                    Eng yaxshi natijalar
                                </h1>
                                <div className="space-y-3 mb-4">
                                    {top3Students.map((student, index) => (
                                        <div key={student.id} className="flex items-center gap-3 bg-white/50 rounded-lg p-3 hover:bg-white transition-colors">
                                            <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                                                {index + 1}
                                            </div>
                                            <div className="flex-grow">
                                                <p className="font-semibold text-gray-900">{student.fullName}</p>
                                                <p className="text-sm text-gray-600">{student.district} • {student.schoolName}</p>
                                            </div>
                                            <div className="flex-shrink-0 text-right">
                                                <p className="font-bold text-primary text-lg">{student.umumiy}</p>
                                                <p className="text-xs text-gray-500">ball</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Link 
                                    href="/#statistics-section"
                                    className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                                >
                                    Barcha reytinglarni ko'rish
                                    <Icon icon="solar:arrow-right-bold" className="text-xl" />
                                </Link>
                                <div className="relative rounded-full pt-5 lg:pt-0">
                                    <input type="Email address" name="q" className="py-6 lg:py-8 pl-8 pr-20 text-lg w-full text-black rounded-full focus:outline-none shadow-input-shadow" placeholder="Qaysi olimpiadani qidiramiz?" autoComplete="off" />
                                    <button className="bg-secondary p-5 rounded-full absolute right-2 top-2 ">
                                        <Icon
                                            icon="solar:magnifer-linear"
                                            className="text-white text-4xl inline-block"
                                        />
                                    </button>
                                </div>
                                <div className='flex items-center justify-between pt-10 lg:pt-4'>
                                    <div className='flex gap-2'>
                                        <Image src={`${getImagePrefix()}images/banner/check-circle.svg`} alt="check-image" width={30} height={30} className='smallImage' />
                                        <p className='text-sm sm:text-lg font-normal text-black'>Moslashuvchan ta'lim</p>
                                    </div>
                                    <div className='flex gap-2'>
                                        <Image src={`${getImagePrefix()}images/banner/check-circle.svg`} alt="check-image" width={30} height={30} className='smallImage' />
                                        <p className='text-sm sm:text-lg font-normal text-black'>Olimpiadalar</p>
                                    </div>
                                    <div className='flex gap-2'>
                                        <Image src={`${getImagePrefix()}images/banner/check-circle.svg`} alt="check-image" width={30} height={30} className='smallImage' />
                                        <p className='text-sm sm:text-lg font-normal text-black'>Hamjamiyat</p>
                                    </div>
                                </div>
                            </div>
                            <div className='col-span-6 flex justify-center'>
                                <Image src={`${getImagePrefix()}images/banner/mahila.png`} alt="nothing" width={1000} height={805} />
                            </div>
                        </div>
                    </div>

                    {/* Slide 2: Today's Lessons */}
                    <div className="px-2">
                        <div className='grid grid-cols-1 lg:grid-cols-12 space-x-1 items-center gap-8'>
                            <div className='col-span-6 flex flex-col gap-8'>
                                <div className='flex gap-2 mx-auto lg:mx-0 mb-4'>
                                    <Icon
                                        icon="solar:calendar-bold"
                                        className="text-secondary text-xl inline-block me-2"
                                    />
                                    <p className='text-secondary text-sm font-semibold text-center lg:text-start'>
                                        Bugungi darslar
                                    </p>
                                </div>
                                <h1 className='text-midnight_text text-4xl sm:text-5xl font-semibold pt-5 lg:pt-0 mb-4'>
                                    Bugun o'rganing
                                </h1>
                                <div className="space-y-3 mb-4">
                                    {todayLessons.map((lesson) => (
                                        <Link 
                                            key={lesson.id}
                                            href="/lessons"
                                            className="flex items-center gap-3 bg-white/50 rounded-lg p-3 hover:bg-white transition-all group"
                                        >
                                            <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden">
                                                <Image
                                                    src={`${getImagePrefix()}${lesson.imgSrc}`}
                                                    alt={lesson.topic}
                                                    width={64}
                                                    height={64}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                                                />
                                            </div>
                                            <div className="flex-grow">
                                                <p className="font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-1">
                                                    {lesson.topic}
                                                </p>
                                                <p className="text-sm text-gray-600">{lesson.mentorName}</p>
                                            </div>
                                            <div className="flex-shrink-0">
                                                <Icon 
                                                    icon="solar:play-circle-bold" 
                                                    className="text-primary text-2xl group-hover:scale-110 transition-transform"
                                                />
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                                <Link 
                                    href="/lessons"
                                    className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                                >
                                    Barcha darslarni ko'rish
                                    <Icon icon="solar:arrow-right-bold" className="text-xl" />
                                </Link>
                                <div className="relative rounded-full pt-5 lg:pt-0">
                                    <input type="Email address" name="q" className="py-6 lg:py-8 pl-8 pr-20 text-lg w-full text-black rounded-full focus:outline-none shadow-input-shadow" placeholder="Qaysi olimpiadani qidiramiz?" autoComplete="off" />
                                    <button className="bg-secondary p-5 rounded-full absolute right-2 top-2 ">
                                        <Icon
                                            icon="solar:magnifer-linear"
                                            className="text-white text-4xl inline-block"
                                        />
                                    </button>
                                </div>
                                <div className='flex items-center justify-between pt-10 lg:pt-4'>
                                    <div className='flex gap-2'>
                                        <Image src={`${getImagePrefix()}images/banner/check-circle.svg`} alt="check-image" width={30} height={30} className='smallImage' />
                                        <p className='text-sm sm:text-lg font-normal text-black'>Moslashuvchan ta'lim</p>
                                    </div>
                                    <div className='flex gap-2'>
                                        <Image src={`${getImagePrefix()}images/banner/check-circle.svg`} alt="check-image" width={30} height={30} className='smallImage' />
                                        <p className='text-sm sm:text-lg font-normal text-black'>Olimpiadalar</p>
                                    </div>
                                    <div className='flex gap-2'>
                                        <Image src={`${getImagePrefix()}images/banner/check-circle.svg`} alt="check-image" width={30} height={30} className='smallImage' />
                                        <p className='text-sm sm:text-lg font-normal text-black'>Hamjamiyat</p>
                                    </div>
                                </div>
                            </div>
                            <div className='col-span-6 flex justify-center'>
                                <Image src={`${getImagePrefix()}images/banner/mahila.png`} alt="nothing" width={1000} height={805} />
                            </div>
                        </div>
                    </div>

                    {/* Slide 3: Motivational */}
                    <div className="px-2">
                        <div className='grid grid-cols-1 lg:grid-cols-12 space-x-1 items-center gap-8'>
                            <div className='col-span-6 flex flex-col gap-8'>
                                <div className='flex gap-2 mx-auto lg:mx-0 mb-4'>
                                    <Icon
                                        icon="solar:star-bold"
                                        className="text-secondary text-xl inline-block me-2"
                                    />
                                    <p className='text-secondary text-sm font-semibold text-center lg:text-start'>
                                        Muvaffaqiyat - bu tayyorgarlik va imkoniyat uchrashgan joy. Biz sizga tayyorgarlikni taqdim etamiz!
                                    </p>
                                </div>
                                <h1 className='text-midnight_text text-4xl sm:text-5xl font-semibold pt-5 lg:pt-0 mb-4'>
                                    O'z potensialingizni ochib bering va muvaffaqiyatga erishing.
                                </h1>
                                <h3 className='text-black/70 text-lg pt-5 lg:pt-0'>
                                    5000+ o'quvchi biz bilan o'qib, olimpiadalarda yuqori natijalarga erishmoqda.
                                </h3>
                                <div className="relative rounded-full pt-5 lg:pt-0">
                                    <input type="Email address" name="q" className="py-6 lg:py-8 pl-8 pr-20 text-lg w-full text-black rounded-full focus:outline-none shadow-input-shadow" placeholder="Qaysi olimpiadani qidiramiz?" autoComplete="off" />
                                    <button className="bg-secondary p-5 rounded-full absolute right-2 top-2 ">
                                        <Icon
                                            icon="solar:magnifer-linear"
                                            className="text-white text-4xl inline-block"
                                        />
                                    </button>
                                </div>
                                <div className='flex items-center justify-between pt-10 lg:pt-4'>
                                    <div className='flex gap-2'>
                                        <Image src={`${getImagePrefix()}images/banner/check-circle.svg`} alt="check-image" width={30} height={30} className='smallImage' />
                                        <p className='text-sm sm:text-lg font-normal text-black'>Moslashuvchan ta'lim</p>
                                    </div>
                                    <div className='flex gap-2'>
                                        <Image src={`${getImagePrefix()}images/banner/check-circle.svg`} alt="check-image" width={30} height={30} className='smallImage' />
                                        <p className='text-sm sm:text-lg font-normal text-black'>Olimpiadalar</p>
                                    </div>
                                    <div className='flex gap-2'>
                                        <Image src={`${getImagePrefix()}images/banner/check-circle.svg`} alt="check-image" width={30} height={30} className='smallImage' />
                                        <p className='text-sm sm:text-lg font-normal text-black'>Hamjamiyat</p>
                                    </div>
                                </div>
                            </div>
                            <div className='col-span-6 flex justify-center'>
                                <Image src={`${getImagePrefix()}images/banner/mahila.png`} alt="nothing" width={1000} height={805} />
                            </div>
                        </div>
                    </div>
                </Slider>
            </div>
        </section >
    )
}

export default Hero;
