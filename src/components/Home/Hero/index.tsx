"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { getImagePrefix } from "@/utils/util";
import { lessonsData } from "@/app/api/lessonsData";

const TELEGRAM_BOT_URL = "https://t.me/eduxolimpbot";

interface ShowcaseItem {
  id: string;
  type: "lesson" | "podcast" | "amaliy";
  tabLabel: string;
  tabIcon: string;
  title: string;
  subtitle: string;
  mentorOrGuests: string;
  badge: string;
  badgeColor: string;
  imgSrc: string;
  isExternalImage?: boolean;
  youtubeId: string;
  youtubeUrl: string;
}

const showcaseItems: ShowcaseItem[] = [
  {
    id: "lesson",
    type: "lesson",
    tabLabel: "Tahliliy dars",
    tabIcon: "solar:chart-2-bold",
    title: lessonsData[0]?.topic || "Olimpiada masalalarini oson yechish usullari",
    subtitle: "Fan olimpiadalariga tayyorgarlik bo'yicha chuqur tahliliy video dars",
    mentorOrGuests: `${lessonsData[0]?.mentorName || "Abdushukur Axadov"} • ${lessonsData[0]?.mentorTitle || "Matematika eksperti"}`,
    badge: "Matematika",
    badgeColor: "bg-blue-600",
    imgSrc: lessonsData[0]?.imgSrc || "images/courses/math.jpg",
    youtubeId: lessonsData[0]?.youtubeId || "ZZS8hVWOREg",
    youtubeUrl: lessonsData[0]?.youtubeUrl || "https://youtu.be/ZZS8hVWOREg",
  },
  {
    id: "podcast",
    type: "podcast",
    tabLabel: "EduX Podkast",
    tabIcon: "solar:podcast-bold",
    title: "EduX | 3-son — Xalqaro olimpiada sovrindorlari bilan suhbat",
    subtitle: "G'alaba ortidagi mashaqqatli yo'l, xalqaro tajriba va strategiyalar",
    mentorOrGuests: "Daler Rahimov (IChO Oltin), Elbek Zohidjonov (IMO Kumush), Elbek Uroqov (IPhO Bronza)",
    badge: "3-son Podkast",
    badgeColor: "bg-purple-600",
    imgSrc: "https://img.youtube.com/vi/7MQyOQ7y0GI/maxresdefault.jpg",
    isExternalImage: true,
    youtubeId: "7MQyOQ7y0GI",
    youtubeUrl: "https://www.youtube.com/watch?v=7MQyOQ7y0GI",
  },
  {
    id: "amaliy",
    type: "amaliy",
    tabLabel: "Amaliy laboratoriya",
    tabIcon: "solar:test-tube-bold",
    title: "Titrlash jarayoni va kimyoviy laboratoriya amaliyoti",
    subtitle: "#Kimyo_barcha_uchun loyihasi doirasidagi amaliy laboratoriya ishlari",
    mentorOrGuests: "Firdavs Sobirov • Kimyo eksperti (IChO sovrindori)",
    badge: "Kimyo — Barchaga",
    badgeColor: "bg-emerald-600",
    imgSrc: "https://img.youtube.com/vi/xFleHlGV-00/maxresdefault.jpg",
    isExternalImage: true,
    youtubeId: "xFleHlGV-00",
    youtubeUrl: "https://youtu.be/xFleHlGV-00",
  },
];

const subjectPills = [
  { name: "Matematika", icon: "solar:calculator-bold" },
  { name: "Fizika", icon: "solar:atom-bold" },
  { name: "Kimyo", icon: "solar:test-tube-bold" },
  { name: "Biologiya", icon: "solar:leaf-bold" },
  { name: "Informatika", icon: "solar:code-bold" },
];

const Hero: React.FC = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"lesson" | "podcast" | "amaliy">("lesson");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeVideo, setActiveVideo] = useState<{
    isOpen: boolean;
    videoId: string;
    title: string;
  } | null>(null);

  const currentShowcase = showcaseItems.find((item) => item.id === activeTab) || showcaseItems[0];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/lessons?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/lessons");
    }
  };

  return (
    <section id="home-section" className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-slateGray">
      {/* Background Decorative Gradient Blobs */}
      <div className="pointer-events-none absolute -top-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 -right-40 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* LEFT COLUMN: Core Value Proposition & Actions */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-white/90 border border-primary/20 rounded-full shadow-sm w-fit">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary"></span>
              </span>
              <span className="text-xs sm:text-sm font-semibold text-gray-800">
                Fan olimpiadalari markazi bilan hamkorlikdagi rasmiy platforma
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-midnight_text text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight leading-[1.15]">
              Ilm-fan olimpiadalariga{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-indigo-600 to-secondary">
                ishonchli tayyorgarlik
              </span>{" "}
              va rivojlanish muhiti
            </h1>

            {/* Sub-headline */}
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-2xl">
              Matematika, fizika, kimyo, biologiya va informatika fanlaridan ekspertlar boshchiligidagi tahliliy darslar, amaliy laboratoriyalar, real podkastlar hamda shaffof reyting tizimi.
            </p>

            {/* Action Buttons (CTAs) */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
              {/* Primary Telegram Registration CTA */}
              <a
                href={TELEGRAM_BOT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 rounded-full bg-secondary px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-secondary/25 hover:bg-secondary/90 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Icon icon="mdi:telegram" className="text-2xl" />
                <span>Olimpiadaga ro'yxatdan o'tish</span>
              </a>

              {/* Secondary Lessons Link */}
              <Link
                href="/lessons"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-primary/30 bg-white px-6 py-3.5 text-base font-semibold text-primary hover:border-primary hover:bg-primary/5 transition-all"
              >
                <span>Darslarni ko'rish</span>
                <Icon icon="solar:arrow-right-bold" className="text-lg" />
              </Link>

              {/* App Portal Direct Link */}
              <a
                href="https://app.edux.center"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-primary transition-colors px-2 py-1"
              >
                <span>Platformaga kirish</span>
                <Icon icon="solar:arrow-right-up-linear" className="text-base" />
              </a>
            </div>

            {/* Topic Search Box */}
            <div className="pt-2">
              <form onSubmit={handleSearchSubmit} className="relative w-full max-w-xl">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Qaysi mavzuni o'rganamiz? (masalan: Titrlash, Algebra...)"
                  className="w-full rounded-full bg-white border border-gray-200 py-4 pl-6 pr-14 text-sm sm:text-base text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all"
                />
                <button
                  type="submit"
                  aria-label="Qidirish"
                  className="absolute right-2 top-2 h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white hover:bg-secondary transition-colors"
                >
                  <Icon icon="solar:magnifer-linear" className="text-xl" />
                </button>
              </form>

              {/* Quick Subject Filter Pills */}
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <span className="text-xs font-semibold text-gray-500">Tezkor fanlar:</span>
                {subjectPills.map((subj) => (
                  <Link
                    key={subj.name}
                    href={`/lessons`}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-primary hover:text-white text-gray-700 text-xs font-medium rounded-full border border-gray-200 shadow-2xs transition-all"
                  >
                    <Icon icon={subj.icon} className="text-xs" />
                    <span>{subj.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Trust Points */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-200/80">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 text-green-700">
                  <Icon icon="solar:check-circle-bold" className="text-lg" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-gray-800">Tahliliy darslar</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-primary">
                  <Icon icon="solar:test-tube-bold" className="text-lg" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-gray-800">Amaliy laboratoriya</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 text-purple-700">
                  <Icon icon="solar:cup-star-bold" className="text-lg" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-gray-800">Respublika reytingi</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Showcase Card */}
          <div className="lg:col-span-5 relative">
            {/* Top Floating Badge */}
            <div className="hidden sm:flex absolute -top-5 -right-2 z-20 items-center gap-3 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-blue-100">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-xl shadow-md">
                <Icon icon="solar:medal-ribbons-star-bold" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">Xalqaro olimpiadalar</p>
                <p className="text-[11px] text-gray-500">Terma jamoa saralashlari</p>
              </div>
            </div>

            {/* Showcase Main Container */}
            <div className="bg-white rounded-3xl p-5 shadow-2xl border border-gray-100 relative">
              {/* Tab Switcher */}
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-gray-100/90 rounded-2xl mb-4">
                {showcaseItems.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.type)}
                      className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-bold transition-all ${
                        isActive
                          ? "bg-white text-primary shadow-sm"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      <Icon icon={item.tabIcon} className="text-base flex-shrink-0" />
                      <span className="truncate">{item.tabLabel}</span>
                    </button>
                  );
                })}
              </div>

              {/* Active Card Preview */}
              <div className="relative group overflow-hidden rounded-2xl aspect-[16/10] bg-gray-900">
                <Image
                  src={
                    currentShowcase.isExternalImage
                      ? currentShowcase.imgSrc
                      : `${getImagePrefix()}${currentShowcase.imgSrc}`
                  }
                  alt={currentShowcase.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  sizes="(max-width: 768px) 100vw, 500px"
                  priority
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                {/* Badge Tag */}
                <div className="absolute top-3 left-3 z-10">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold text-white shadow-md ${currentShowcase.badgeColor}`}>
                    {currentShowcase.badge}
                  </span>
                </div>

                {/* Play Button Trigger */}
                <button
                  onClick={() =>
                    setActiveVideo({
                      isOpen: true,
                      videoId: currentShowcase.youtubeId,
                      title: currentShowcase.title,
                    })
                  }
                  aria-label="Videoni tomosha qilish"
                  className="absolute inset-0 flex items-center justify-center z-10 group/btn"
                >
                  <div className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center shadow-2xl group-hover/btn:scale-110 group-hover/btn:bg-red-700 transition-transform">
                    <Icon icon="solar:play-circle-bold" className="text-3xl ml-0.5" />
                  </div>
                </button>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-3 left-3 right-3 z-10 text-white">
                  <p className="text-xs font-semibold text-gray-200 line-clamp-1 mb-1">
                    {currentShowcase.mentorOrGuests}
                  </p>
                  <h3 className="text-sm sm:text-base font-bold text-white leading-snug line-clamp-2">
                    {currentShowcase.title}
                  </h3>
                </div>
              </div>

              {/* Card Meta & Bottom Controls */}
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                <div className="flex-1 pr-3">
                  <p className="text-xs text-gray-500 line-clamp-1">
                    {currentShowcase.subtitle}
                  </p>
                </div>
                <button
                  onClick={() =>
                    setActiveVideo({
                      isOpen: true,
                      videoId: currentShowcase.youtubeId,
                      title: currentShowcase.title,
                    })
                  }
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-secondary whitespace-nowrap"
                >
                  <span>Ko'rish</span>
                  <Icon icon="solar:arrow-right-bold" className="text-sm" />
                </button>
              </div>
            </div>

            {/* Bottom Floating Badge */}
            <div className="hidden sm:flex absolute -bottom-5 -left-4 z-20 items-center gap-3 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-blue-100">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xl shadow-md">
                <Icon icon="solar:ranking-bold" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">Respublika Reytingi</p>
                <p className="text-[11px] text-gray-500">Shaffof monitoring tizimi</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Video Modal */}
      {activeVideo && activeVideo.isOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-xs"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-900 text-sm sm:text-base line-clamp-1 pr-4">
                {activeVideo.title}
              </h3>
              <button
                onClick={() => setActiveVideo(null)}
                aria-label="Yopish"
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
              >
                <Icon icon="solar:close-circle-bold" className="text-xl" />
              </button>
            </div>

            {/* Video Player */}
            <div className="relative w-full aspect-video bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo.videoId}?autoplay=1`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
