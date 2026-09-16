"use client";

import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

const TELEGRAM_BOT_URL = "https://t.me/eduxolimpbot";
const FEEDBACK_EMAIL = "edux@olympcenter.uz";

interface SubjectItem {
  id: string;
  name: string;
  badge: string;
  testsCount: string;
  duration: string;
  icon: string;
  accentColor: {
    gradient: string;
    border: string;
    badgeBg: string;
    badgeText: string;
    buttonBg: string;
    buttonHover: string;
    glow: string;
  };
  description: string;
}

const subjects: SubjectItem[] = [
  {
    id: "math",
    name: "Matematika",
    badge: "Har kuni yangi test",
    testsCount: "30 ta test",
    duration: "60 daqiqa",
    icon: "solar:calculator-bold",
    accentColor: {
      gradient: "from-blue-600 via-indigo-600 to-primary",
      border: "border-blue-100 hover:border-primary/40",
      badgeBg: "bg-blue-50 text-primary border border-blue-200/60",
      badgeText: "text-blue-700",
      buttonBg: "bg-primary hover:bg-secondary",
      buttonHover: "hover:shadow-primary/25",
      glow: "from-primary/15 to-blue-500/10",
    },
    description: "Mantiqiy, chuqurlashtirilgan va olimpiada darajasidagi testlar to'plami.",
  },
  {
    id: "physics",
    name: "Fizika",
    badge: "Har kuni yangi test",
    testsCount: "30 ta test",
    duration: "60 daqiqa",
    icon: "solar:atom-bold",
    accentColor: {
      gradient: "from-indigo-600 via-purple-600 to-pink-600",
      border: "border-purple-100 hover:border-purple-400/40",
      badgeBg: "bg-purple-50 text-purple-700 border border-purple-200/60",
      badgeText: "text-purple-700",
      buttonBg: "bg-indigo-600 hover:bg-indigo-700",
      buttonHover: "hover:shadow-purple-500/25",
      glow: "from-purple-500/15 to-indigo-500/10",
    },
    description: "Nazariy va amaliy fikrlashni rivojlantiruvchi fizik masalalar.",
  },
];

const DailyDemoOlymp: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<{
    hours: string;
    minutes: string;
    seconds: string;
  }>({
    hours: "23",
    minutes: "59",
    seconds: "59",
  });

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const endOfDay = new Date(now);
      endOfDay.setHours(23, 59, 59, 999);

      let diff = endOfDay.getTime() - now.getTime();
      if (diff < 0) diff = 0;

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      });
    };

    calculateTimeRemaining();
    const timer = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="demo-olimpiada" className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-gradient-to-b from-slateGray/70 via-white to-slateGray/40">
      {/* Background Decorative Lighting */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -right-24 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

      <div className="container mx-auto max-w-screen-xl px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          {/* Top Pill / Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 shadow-xs">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <Icon icon="solar:fire-bold" className="text-base text-amber-500" />
            <span>Kunlik Demo Olimpiadalar</span>
          </div>

          {/* Main Title */}
          <h2 className="text-midnight_text text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-4">
            EduX bilan bilimingizni charxlang —{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-indigo-600 to-secondary">
              hoziroq sinab ko&apos;ring
            </span>
          </h2>

          <p className="text-gray-600 text-base sm:text-lg mb-6">
            O&apos;z bilimingizni har kuni sinovdan o&apos;tkazing, muntazamlikni saqlang va olimpiadalarga tayyorgarlik darajangizni oshiring.
          </p>

          {/* 3 Key Highlights Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200/90 shadow-sm text-xs sm:text-sm font-semibold text-gray-800">
              <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                <Icon icon="solar:document-text-bold" className="text-sm" />
              </div>
              <span>30 ta test</span>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200/90 shadow-sm text-xs sm:text-sm font-semibold text-gray-800">
              <div className="w-6 h-6 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
                <Icon icon="solar:clock-circle-bold" className="text-sm" />
              </div>
              <span>60 daqiqa</span>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200/90 shadow-sm text-xs sm:text-sm font-semibold text-gray-800">
              <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Icon icon="solar:diploma-verified-bold" className="text-sm" />
              </div>
              <span>Sertifikat</span>
            </div>
          </div>
        </div>

        {/* 2 Main Cards: Matematika & Fizika */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto mb-12">
          {subjects.map((item) => (
            <div
              key={item.id}
              className={`group relative bg-white rounded-3xl p-6 sm:p-8 shadow-xl border ${item.accentColor.border} transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden`}
            >
              {/* Subtle top-right glow */}
              <div
                className={`pointer-events-none absolute -top-24 -right-24 w-60 h-60 bg-gradient-to-bl ${item.accentColor.glow} rounded-full blur-2xl transition-all duration-500 group-hover:scale-125`}
              />

              {/* Card Header */}
              <div>
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.accentColor.gradient} text-white flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform`}
                    >
                      <Icon icon={item.icon} className="text-3xl" />
                    </div>
                    <div>
                      <span className={`inline-block text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${item.accentColor.badgeBg} mb-1`}>
                        {item.badge}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 capitalize">
                        {item.name}
                      </h3>
                    </div>
                  </div>

                  <span className="flex h-3 w-3 relative mt-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                </div>

                {/* Test Specs Pill Row */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-gray-50/90 border border-gray-100">
                    <div className="w-8 h-8 rounded-xl bg-white shadow-xs flex items-center justify-center text-primary">
                      <Icon icon="solar:document-text-bold" className="text-base" />
                    </div>
                    <div>
                      <p className="text-[11px] text-gray-400 font-medium leading-none mb-1">Savollar</p>
                      <p className="text-sm font-bold text-gray-900">{item.testsCount}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-gray-50/90 border border-gray-100">
                    <div className="w-8 h-8 rounded-xl bg-white shadow-xs flex items-center justify-center text-amber-500">
                      <Icon icon="solar:stopwatch-bold" className="text-base" />
                    </div>
                    <div>
                      <p className="text-[11px] text-gray-400 font-medium leading-none mb-1">Ajratilgan vaqt</p>
                      <p className="text-sm font-bold text-gray-900">{item.duration}</p>
                    </div>
                  </div>
                </div>

                {/* Countdown Timer Block */}
                <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-gray-900 to-midnight_text text-white shadow-md relative overflow-hidden">
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-300">
                      <Icon icon="solar:clock-circle-bold" className="text-base text-amber-400 animate-pulse" />
                      <span>Bugungi sinov yakunlanishiga:</span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
                      Jonli
                    </span>
                  </div>

                  {/* Digital Clock Display */}
                  <div className="flex items-center justify-center gap-2 sm:gap-3 font-mono py-1">
                    <div className="flex flex-col items-center">
                      <div className="bg-white/10 backdrop-blur-md rounded-xl px-3 sm:px-4 py-2 text-xl sm:text-2xl font-black tracking-wider text-white border border-white/10 shadow-inner">
                        {timeLeft.hours}
                      </div>
                      <span className="text-[10px] uppercase font-sans tracking-wider text-gray-400 mt-1">
                        Soat
                      </span>
                    </div>

                    <span className="text-2xl font-bold text-amber-400 pb-4 animate-pulse">:</span>

                    <div className="flex flex-col items-center">
                      <div className="bg-white/10 backdrop-blur-md rounded-xl px-3 sm:px-4 py-2 text-xl sm:text-2xl font-black tracking-wider text-white border border-white/10 shadow-inner">
                        {timeLeft.minutes}
                      </div>
                      <span className="text-[10px] uppercase font-sans tracking-wider text-gray-400 mt-1">
                        Daqiqa
                      </span>
                    </div>

                    <span className="text-2xl font-bold text-amber-400 pb-4 animate-pulse">:</span>

                    <div className="flex flex-col items-center">
                      <div className="bg-white/10 backdrop-blur-md rounded-xl px-3 sm:px-4 py-2 text-xl sm:text-2xl font-black tracking-wider text-amber-400 border border-amber-400/30 shadow-inner">
                        {timeLeft.seconds}
                      </div>
                      <span className="text-[10px] uppercase font-sans tracking-wider text-gray-400 mt-1">
                        Soniya
                      </span>
                    </div>
                  </div>
                </div>

                {/* Streak / Challenge Motivation Banner */}
                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/80 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Icon icon="solar:fire-bold" className="text-2xl animate-bounce" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 leading-snug">
                      Kunlik chellenjni saqlab qoling
                    </p>
                    <p className="text-xs text-gray-600">
                      Har kuni test yechib, o&apos;z o&apos;rningizni mustahkamlang
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Action Button */}
              <div>
                <a
                  href={TELEGRAM_BOT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl text-white font-bold text-base shadow-lg transition-all duration-300 ${item.accentColor.buttonBg} ${item.accentColor.buttonHover} hover:scale-[1.02] active:scale-[0.98]`}
                >
                  <Icon icon="mdi:telegram" className="text-2xl" />
                  <span>Ishtirok etish</span>
                  <Icon icon="solar:arrow-right-bold" className="text-lg group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Disclaimer Banner */}
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-5 sm:p-6 rounded-2xl bg-blue-50/80 border border-blue-200/70 shadow-sm text-center sm:text-left">
            <div className="w-11 h-11 rounded-2xl bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
              <Icon icon="solar:info-circle-bold" className="text-2xl" />
            </div>
            <div className="flex-1">
              <p className="text-sm sm:text-base font-semibold text-gray-900 mb-1">
                Olimpiadalar DEMO versiyada o&apos;tkazilmoqda.
              </p>
              <p className="text-xs sm:text-sm text-gray-600">
                Savollar haqida talab va takliflar uchun:{" "}
                <a
                  href={`mailto:${FEEDBACK_EMAIL}`}
                  className="inline-flex items-center gap-1 font-bold text-primary hover:text-secondary underline underline-offset-2 transition-colors"
                >
                  <Icon icon="solar:letter-bold" className="text-sm" />
                  <span>{FEEDBACK_EMAIL}</span>
                </a>
              </p>
            </div>
            <div className="flex-shrink-0 pt-1 sm:pt-0">
              <a
                href={TELEGRAM_BOT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-gray-100 border border-blue-200 text-primary text-xs font-bold transition-all shadow-2xs"
              >
                <Icon icon="mdi:telegram" className="text-base text-blue-500" />
                <span>@eduxolimpbot</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DailyDemoOlymp;
