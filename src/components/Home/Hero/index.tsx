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

// Get one tahliliy lesson
const tahliliyLesson = lessonsData.find(lesson => lesson.type === 'tahliliy') || lessonsData[0];

// Get one amaliy lesson (from practical lessons)
const amaliyLesson = {
  id: 1,
  topic: "Titrlash jarayoni",
  mentorName: "Firdavs Sobirov",
  mentorTitle: "Kimyo eksperti",
  subject: "Kimyo",
  youtubeUrl: "https://youtu.be/xFleHlGV-00?si=p3RVmp81ceAhKo0S",
  youtubeId: "xFleHlGV-00",
  imgSrc: "images/courses/chemistry.jpg",
  difficulty: "Boshlang'ich"
};

// Get one podcast episode (latest)
const featuredPodcast = {
  id: 3,
  episodeNumber: 3,
  title: "EduX | 3-son — OLIMPIADACHILARNING O'ZLARI BILAN!",
  topic: "G'alaba ortidagi haqiqiy yo'l, real tajriba va samimiy hikoyalar",
  youtubeUrl: "https://www.youtube.com/watch?v=7MQyOQ7y0GI&feature=youtu.be",
  youtubeId: "7MQyOQ7y0GI",
  guests: ["Daler Rahimov", "Elbek Zohidjonov", "Elbek Uroqov"]
};

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 10000,
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
                    {/* Slide 0: Olympiad Announcements (IOAI 2026 + AKHU STEM) */}
                    <div className="px-2">
                        <div className='grid grid-cols-1 lg:grid-cols-12 space-x-1 items-center gap-8'>
                            <div className='col-span-6 flex flex-col gap-5'>
                                <div className='flex items-center gap-3 mx-auto lg:mx-0'>
                                    <span className="relative flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                    </span>
                                    <p className='text-red-500 text-sm font-bold text-center lg:text-start uppercase tracking-widest'>
                                        Olimpiadalar — 2026
                                    </p>
                                </div>
                                <h1 className='text-midnight_text text-3xl sm:text-5xl font-bold pt-2 lg:pt-0 leading-tight'>
                                    Xalqaro olimpiadalarda ishtirok eting!
                                </h1>
                                <p className='text-black/70 text-lg'>
                                    O&apos;zbekiston jamoasida o&apos;z o&apos;rningizni egallang — <span className="font-semibold text-secondary">IOAI</span> va <span className="font-semibold text-secondary">AKHU STEM</span> olimpiadalariga ro&apos;yxatdan o&apos;ting.
                                </p>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-primary/10">
                                        <div className="flex-shrink-0 w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center">
                                            <Icon icon="solar:brain-bold" className="text-primary text-lg" />
                                        </div>
                                        <div>
                                            <p className="text-gray-800 text-sm font-semibold">IOAI 2026 — Sun&apos;iy intellekt</p>
                                            <p className="text-gray-500 text-xs">8—10-sinf • 4 bosqichli saralash</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-primary/10">
                                        <div className="flex-shrink-0 w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center">
                                            <Icon icon="solar:cup-star-bold" className="text-primary text-lg" />
                                        </div>
                                        <div>
                                            <p className="text-gray-800 text-sm font-semibold">AKHU STEM — Matematika, Fizika, Dasturlash, Kiberxavfsizlik</p>
                                            <p className="text-gray-500 text-xs">10—11-sinf • 31-martga qadar ro&apos;yxatdan o&apos;ting</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-primary/10">
                                        <div className="flex-shrink-0 w-9 h-9 bg-green-500/10 rounded-full flex items-center justify-center">
                                            <Icon icon="solar:check-circle-bold" className="text-green-500 text-lg" />
                                        </div>
                                        <p className="text-gray-800 text-sm font-medium">Ishtirok etish — ixtiyoriy va bepul</p>
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                    <a
                                        href="https://t.me/eduxolimpbot"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 bg-secondary text-white font-semibold px-8 py-4 rounded-full hover:bg-primary transition-colors shadow-lg hover:shadow-xl"
                                    >
                                        <Icon icon="solar:pen-new-square-bold" className="text-xl" />
                                        Ro&apos;yxatdan o&apos;tish
                                    </a>
                                    <a
                                        href="https://youtu.be/kkeJPnYMnes?si=yKWDepokbGO_iWSQ"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 text-red-600 font-semibold px-8 py-4 rounded-full border-2 border-red-200 hover:border-red-400 hover:bg-red-50 transition-colors"
                                    >
                                        <Icon icon="solar:play-circle-bold" className="text-xl" />
                                        Videoni ko&apos;rish
                                    </a>
                                </div>
                                <div className='flex items-center justify-between pt-6 lg:pt-2'>
                                    <div className='flex gap-2'>
                                        <Image src={`${getImagePrefix()}images/banner/check-circle.svg`} alt="check-image" width={30} height={30} className='smallImage' />
                                        <p className='text-sm sm:text-lg font-normal text-black'>Sun&apos;iy intellekt</p>
                                    </div>
                                    <div className='flex gap-2'>
                                        <Image src={`${getImagePrefix()}images/banner/check-circle.svg`} alt="check-image" width={30} height={30} className='smallImage' />
                                        <p className='text-sm sm:text-lg font-normal text-black'>Xalqaro olimpiada</p>
                                    </div>
                                    <div className='flex gap-2'>
                                        <Image src={`${getImagePrefix()}images/banner/check-circle.svg`} alt="check-image" width={30} height={30} className='smallImage' />
                                        <p className='text-sm sm:text-lg font-normal text-black'>STEM fanlar</p>
                                    </div>
                                    <div className='flex gap-2'>
  <Image
    src={`${getImagePrefix()}images/banner/check-circle.svg`}
    alt="check-image"
    width={30}
    height={30}
    className='smallImage'
  />
  <p className='text-sm sm:text-lg font-normal text-black'>
    Dasturlash / Kiberxavfsizlik
  </p>
</div>

                                </div>
                            </div>
                            <div className='col-span-6 flex justify-center'>
                                <div className="relative w-full max-w-md flex flex-col gap-4">
                                    {/* IOAI 2026 Card */}
                                    <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                                        <Image
                                            src={`${getImagePrefix()}images/AI.jpg`}
                                            alt="IOAI 2026 — Xalqaro sun'iy intellekt olimpiadasi"
                                            width={600}
                                            height={400}
                                            className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/20 to-transparent"></div>
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-red-500 text-white shadow-lg">
                                                YANGI
                                            </span>
                                        </div>
                                        <a
                                            href="https://youtu.be/kkeJPnYMnes?si=yKWDepokbGO_iWSQ"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="absolute inset-0 flex items-center justify-center"
                                        >
                                            <div className="bg-red-600 rounded-full p-4 hover:scale-110 transition-transform shadow-2xl">
                                                <Icon icon="solar:play-bold" className="text-white text-2xl" />
                                            </div>
                                        </a>
                                        <div className="absolute bottom-0 left-0 right-0 p-4">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Icon icon="solar:brain-bold" className="text-white text-xl" />
                                                <span className="text-white font-bold text-sm">IOAI 2026</span>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-sm text-white border border-white/30">
                                                    8—10 sinf
                                                </span>
                                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/80 backdrop-blur-sm text-white">
                                                    Ro&apos;yxat ochiq
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* AKHU STEM Card */}
                                    <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                                        <Image
                                            src={`${getImagePrefix()}STEM.png`}
                                            alt="AKHU STEM Olimpiadasi — 2026"
                                            width={600}
                                            height={400}
                                            className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/20 to-transparent"></div>
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-yellow-500 text-white shadow-lg">
                                                KUTILMOQDA
                                            </span>
                                        </div>
                                        <div className="absolute bottom-0 left-0 right-0 p-4">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Icon icon="solar:cup-star-bold" className="text-white text-xl" />
                                                <span className="text-white font-bold text-sm">AKHU STEM 2026</span>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-sm text-white border border-white/30">
                                                    10—11 sinf
                                                </span>
                                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-500/80 backdrop-blur-sm text-white">
                                                    Tez orada ochiladi
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <a
                                        href="https://t.me/eduxolimpbot"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full inline-flex items-center justify-center gap-2 bg-primary text-white font-semibold py-3.5 rounded-2xl hover:bg-secondary transition-colors shadow-md hover:shadow-lg text-sm"
                                    >
                                        <Icon icon="solar:arrow-right-bold" className="text-lg" />
                                        Hoziroq ro&apos;yxatdan o&apos;ting
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

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
                                        <p className='text-sm sm:text-lg font-normal text-black'>Tahliliy darslar</p>
                                    </div>
                                    <div className='flex gap-2'>
                                        <Image src={`${getImagePrefix()}images/banner/check-circle.svg`} alt="check-image" width={30} height={30} className='smallImage' />
                                        <p className='text-sm sm:text-lg font-normal text-black'>Online olimpiadalar</p>
                                    </div>
                                    <div className='flex gap-2'>
                                        <Image src={`${getImagePrefix()}images/banner/check-circle.svg`} alt="check-image" width={30} height={30} className='smallImage' />
                                        <p className='text-sm sm:text-lg font-normal text-black'>Real keyslar asosida podkastlar</p>
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
                                        <p className='text-sm sm:text-lg font-normal text-black'>Tahliliy darslar</p>
                                    </div>
                                    <div className='flex gap-2'>
                                        <Image src={`${getImagePrefix()}images/banner/check-circle.svg`} alt="check-image" width={30} height={30} className='smallImage' />
                                        <p className='text-sm sm:text-lg font-normal text-black'>Online olimpiadalar</p>
                                    </div>
                                    <div className='flex gap-2'>
                                        <Image src={`${getImagePrefix()}images/banner/check-circle.svg`} alt="check-image" width={30} height={30} className='smallImage' />
                                        <p className='text-sm sm:text-lg font-normal text-black'>Real keyslar asosida podkastlar</p>
                                    </div>
                                </div>
                            </div>
                            <div className='col-span-6 flex justify-center'>
                                <Image src={`${getImagePrefix()}images/banner/mahila.png`} alt="nothing" width={1000} height={805} />
                            </div>
                        </div>
                    </div>

                    {/* Slide 3: Podcast */}
                    <div className="px-2">
                        <div className='grid grid-cols-1 lg:grid-cols-12 space-x-1 items-center gap-8'>
                            <div className='col-span-6 flex flex-col gap-8'>
                                <div className='flex gap-2 mx-auto lg:mx-0 mb-4'>
                                    <Icon
                                        icon="solar:podcast-bold"
                                        className="text-secondary text-xl inline-block me-2"
                                    />
                                    <p className='text-secondary text-sm font-semibold text-center lg:text-start'>
                                        Podkast
                                    </p>
                                </div>
                                <h1 className='text-midnight_text text-4xl sm:text-5xl font-semibold pt-5 lg:pt-0 mb-4'>
                                    {featuredPodcast.title}
                                </h1>
                                <p className='text-black/70 text-lg mb-4'>
                                    {featuredPodcast.topic}
                                </p>
                                <div className="space-y-2 mb-4">
                                    <p className="text-sm font-semibold text-gray-700">Mehmonlar:</p>
                                    {featuredPodcast.guests.map((guest, idx) => (
                                        <div key={idx} className="flex items-center gap-2 text-gray-600">
                                            <Icon icon="solar:user-bold" className="text-primary text-sm" />
                                            <span className="text-sm">{guest}</span>
                                        </div>
                                    ))}
                                </div>
                                <Link 
                                    href="/podcast"
                                    className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                                >
                                    Podkastni tomosha qiling
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
                                        <p className='text-sm sm:text-lg font-normal text-black'>Tahliliy darslar</p>
                                    </div>
                                    <div className='flex gap-2'>
                                        <Image src={`${getImagePrefix()}images/banner/check-circle.svg`} alt="check-image" width={30} height={30} className='smallImage' />
                                        <p className='text-sm sm:text-lg font-normal text-black'>Online olimpiadalar</p>
                                    </div>
                                    <div className='flex gap-2'>
                                        <Image src={`${getImagePrefix()}images/banner/check-circle.svg`} alt="check-image" width={30} height={30} className='smallImage' />
                                        <p className='text-sm sm:text-lg font-normal text-black'>Real keyslar asosida podkastlar</p>
                                    </div>
                                </div>
                            </div>
                            <div className='col-span-6 flex justify-center'>
                                <div className="relative w-full max-w-md">
                                    <div className="relative" style={{ paddingBottom: '56.25%' }}>
                                        <Image
                                            src={`https://img.youtube.com/vi/${featuredPodcast.youtubeId}/maxresdefault.jpg`}
                                            alt={featuredPodcast.title}
                                            fill
                                            className="object-cover rounded-2xl"
                                        />
                                        <div className="absolute inset-0 bg-black/30 rounded-2xl"></div>
                                        <a
                                            href={featuredPodcast.youtubeUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="absolute inset-0 flex items-center justify-center group"
                                        >
                                            <div className="bg-red-600 rounded-full p-6 group-hover:scale-110 transition-transform shadow-2xl">
                                                <Icon icon="solar:play-circle-bold" className="text-white text-5xl" />
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Slide 4: Tahliliy Dars */}
                    <div className="px-2">
                        <div className='grid grid-cols-1 lg:grid-cols-12 space-x-1 items-center gap-8'>
                            <div className='col-span-6 flex flex-col gap-8'>
                                <div className='flex gap-2 mx-auto lg:mx-0 mb-4'>
                                    <Icon
                                        icon="solar:chart-2-bold"
                                        className="text-secondary text-xl inline-block me-2"
                                    />
                                    <p className='text-secondary text-sm font-semibold text-center lg:text-start'>
                                        Tahliliy dars
                                    </p>
                                </div>
                                <h1 className='text-midnight_text text-4xl sm:text-5xl font-semibold pt-5 lg:pt-0 mb-4'>
                                    {tahliliyLesson.topic}
                                </h1>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                        <Icon icon="solar:user-bold" className="text-primary text-xl" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">{tahliliyLesson.mentorName}</p>
                                        <p className="text-sm text-gray-600">{tahliliyLesson.mentorTitle}</p>
                                    </div>
                                </div>
                                <p className='text-black/70 text-lg mb-4'>
                                    {tahliliyLesson.description}
                                </p>
                                <Link 
                                    href="/lessons#tahliliy"
                                    className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                                >
                                    Barcha tahliliy darslarni ko'rish
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
                                        <p className='text-sm sm:text-lg font-normal text-black'>Tahliliy darslar</p>
                                    </div>
                                    <div className='flex gap-2'>
                                        <Image src={`${getImagePrefix()}images/banner/check-circle.svg`} alt="check-image" width={30} height={30} className='smallImage' />
                                        <p className='text-sm sm:text-lg font-normal text-black'>Online olimpiadalar</p>
                                    </div>
                                    <div className='flex gap-2'>
                                        <Image src={`${getImagePrefix()}images/banner/check-circle.svg`} alt="check-image" width={30} height={30} className='smallImage' />
                                        <p className='text-sm sm:text-lg font-normal text-black'>Real keyslar asosida podkastlar</p>
                                    </div>
                                </div>
                            </div>
                            <div className='col-span-6 flex justify-center'>
                                <div className="relative w-full max-w-md">
                                    <div className="relative h-64 rounded-2xl overflow-hidden">
                                        <Image
                                            src={`${getImagePrefix()}${tahliliyLesson.imgSrc}`}
                                            alt={tahliliyLesson.topic}
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <div className="bg-primary/90 backdrop-blur-sm rounded-lg px-3 py-2">
                                                <p className="text-white font-semibold text-sm">{tahliliyLesson.subject}</p>
                                            </div>
                                        </div>
                                        <a
                                            href={tahliliyLesson.youtubeUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="absolute top-4 right-4 bg-red-600 rounded-full p-4 hover:scale-110 transition-transform"
                                        >
                                            <Icon icon="solar:play-circle-bold" className="text-white text-3xl" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Slide 5: Amaliy Dars */}
                    <div className="px-2">
                        <div className='grid grid-cols-1 lg:grid-cols-12 space-x-1 items-center gap-8'>
                            <div className='col-span-6 flex flex-col gap-8'>
                                <div className='flex gap-2 mx-auto lg:mx-0 mb-4'>
                                    <Icon
                                        icon="solar:test-tube-bold"
                                        className="text-secondary text-xl inline-block me-2"
                                    />
                                    <p className='text-secondary text-sm font-semibold text-center lg:text-start'>
                                        Amaliy dars
                                    </p>
                                </div>
                                <h1 className='text-midnight_text text-4xl sm:text-5xl font-semibold pt-5 lg:pt-0 mb-4'>
                                    {amaliyLesson.topic}
                                </h1>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                        <Icon icon="solar:user-bold" className="text-primary text-xl" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">{amaliyLesson.mentorName}</p>
                                        <p className="text-sm text-gray-600">{amaliyLesson.mentorTitle}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded">
                                        {amaliyLesson.difficulty}
                                    </span>
                                    <span className="text-xs text-gray-500 flex items-center gap-1">
                                        <Icon icon="solar:calendar-bold" className="text-xs" />
                                        Mavzu
                                    </span>
                                </div>
                                <p className='text-black/70 text-lg mb-4'>
                                    Kimyo fani - BARCHA UCHUN! loyihasi doirasidagi amaliy laboratoriya darsi
                                </p>
                                <Link 
                                    href="/lessons#amaliy"
                                    className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                                >
                                    Barcha amaliy darslarni ko'rish
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
                                        <p className='text-sm sm:text-lg font-normal text-black'>Tahliliy darslar</p>
                                    </div>
                                    <div className='flex gap-2'>
                                        <Image src={`${getImagePrefix()}images/banner/check-circle.svg`} alt="check-image" width={30} height={30} className='smallImage' />
                                        <p className='text-sm sm:text-lg font-normal text-black'>Online olimpiadalar</p>
                                    </div>
                                    <div className='flex gap-2'>
                                        <Image src={`${getImagePrefix()}images/banner/check-circle.svg`} alt="check-image" width={30} height={30} className='smallImage' />
                                        <p className='text-sm sm:text-lg font-normal text-black'>Real keyslar asosida podkastlar</p>
                                    </div>
                                </div>
                            </div>
                            <div className='col-span-6 flex justify-center'>
                                <div className="relative w-full max-w-md">
                                    <div className="relative" style={{ paddingBottom: '56.25%' }}>
                                        <Image
                                            src={`https://img.youtube.com/vi/${amaliyLesson.youtubeId}/maxresdefault.jpg`}
                                            alt={amaliyLesson.topic}
                                            fill
                                            className="object-cover rounded-2xl"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl"></div>
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <div className="bg-primary/90 backdrop-blur-sm rounded-lg px-3 py-2">
                                                <p className="text-white font-semibold text-sm">{amaliyLesson.subject}</p>
                                            </div>
                                        </div>
                                        <a
                                            href={amaliyLesson.youtubeUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="absolute top-4 right-4 bg-red-600 rounded-full p-4 hover:scale-110 transition-transform"
                                        >
                                            <Icon icon="solar:play-circle-bold" className="text-white text-3xl" />
                                        </a>
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500 text-white">
                                                Amaliy lab
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Slider>
            </div>
        </section >
    )
}

export default Hero;
