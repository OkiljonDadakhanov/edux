"use client";
import React from "react";
import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";

interface PodcastGuest {
  name: string;
  title: string;
  achievements: string[];
  link?: string;
}

interface PodcastEpisode {
  id: number;
  episodeNumber: number;
  title: string;
  description: string;
  guests: PodcastGuest[];
  youtubeUrl: string;
  youtubeId: string;
  hashtags: string[];
}

const podcastEpisodes: PodcastEpisode[] = [
  {
    id: 1,
    episodeNumber: 1,
    title: "EduX Podkast — 1-son",
    description: `⚡️ Ta'lim va real tajriba — endi barchasi bir joyda. 

"EduX" podkasti o'quvchi va o'qituvchilarga ilm-fanni chuqurroq o'rganish, strategiya tanlash hamda xalqaro maydonga chiqish uchun haqiqiy yo'l xaritasini taqdim etadi.`,
    guests: [
      {
        name: "Moxira Boltayeva",
        title: "Kimyo fanidan O'zbekiston terma jamoasi treneri",
        achievements: [
          "Trenerlar jamoasi a'zosi"
        ]
      }
    ],
    youtubeUrl: "https://youtu.be/Ms4NBU2W3WM?si=5N1GoNHiqudugs6I",
    youtubeId: "Ms4NBU2W3WM",
    hashtags: ["#EduX_podkast", "#EduX_podkast"]
  },
  {
    id: 2,
    episodeNumber: 2,
    title: "EduX Podkast — 2-son",
    description: `⚡️ EduX podkastining ikkinchi soni efirga uzatilmoqda va bu galgi mehmonlarimiz — o'z sohasida katta tajribaga ega, ilm va amaliyotni birlashtira olgan mutaxassislar.

Ushbu sonda biz:
✅ ilm o'rganishdagi asosiy muammolar,
✅ yuqori natijalarga erishishda fikrlash va psixologiya roli,
✅ olimpiada va hayotda g'alabaga olib boruvchi yondashuvlar

📌Bu shunchaki suhbat emas — bu bilim sari bir qadam!`,
    guests: [
      {
        name: "O'tkir Boltayev",
        title: "Matematika fanidan O'zbekiston terma jamoasi rahbari",
        achievements: [
          "2007-yilgi Xalqaro matematika olimpiadasi kumush medal sovrindori",
          "ko'p yillik tajribaga ega matematik",
          "xalqaro olimpiadalar ortidagi kuchli tizim va strategiyalar muallifi"
        ],
        link: "https://t.me/Fan_olimpiadalari_M/6703"
      },
      {
        name: "Akobr Abdullayev",
        title: "Psixologiya fanlari bo'yicha PhD",
        achievements: [
          "amaliy psixolog-konsultant",
          "korporativ trener va sport psixolog"
        ],
        link: "https://t.me/sportpsixologuz"
      }
    ],
    youtubeUrl: "https://youtu.be/2kKLI-wlSZo?si=dmmQei-5d4Yt65cq",
    youtubeId: "2kKLI-wlSZo",
    hashtags: ["#EduX_podkast", "#2_son"]
  },
  {
    id: 3,
    episodeNumber: 3,
    title: "EduX | 3-son — OLIMPIADACHILARNING O'ZLARI BILAN!",
    description: `⚡️G'alaba ortidagi haqiqiy yo'l, real tajriba va samimiy hikoyalar

Bu galgi mehmonlarimiz — ilmni o'rganibgina qolmay, uni amaliyotda qo'llab muvaffaqiyatga erishgan ZAMONAMIZ QAHRAMONLARI.

📌Bu shunchaki suhbat emas — bu bilim sari bir qadam!`,
    guests: [
      {
        name: "Daler Rahimov",
        title: "Olimpiadachi",
        achievements: [
          "Xalqaro kimyo olimpiadasida (IChO 2024 - 2025) ikki karra oltin medal sovrindori"
        ]
      },
      {
        name: "Elbek Zohidjonov",
        title: "Olimpiadachi",
        achievements: [
          "Xalqaro matematika olimpiadasida (IMO 2024-2025) ikki karra kumush medal sovrindori"
        ]
      },
      {
        name: "Elbek Uroqov",
        title: "Olimpiadachi",
        achievements: [
          "Xalqaro Fizika olimpiadasining bronza medal sohibi"
        ]
      }
    ],
    youtubeUrl: "https://www.youtube.com/watch?v=7MQyOQ7y0GI&feature=youtu.be",
    youtubeId: "7MQyOQ7y0GI",
    hashtags: ["#EduX_podkast", "#3_son"]
  }
];

const getYouTubeThumbnail = (videoId: string) => {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
};

export default function PodcastPage() {

  return (
    <main className="pt-24 min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto max-w-screen-2xl px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12 mt-10">
          <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
            #EduX Podkast
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            EduX Podkast
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            "EduX" podkasti — ilk sonini tomosha qiling! Ta'lim va real tajriba — endi barchasi bir joyda.
          </p>
          <p className="text-base text-gray-700 max-w-3xl mx-auto mt-4">
            "EduX" podkasti o'quvchi va o'qituvchilarga ilm-fanni chuqurroq o'rganish, strategiya tanlash hamda xalqaro maydonga chiqish uchun haqiqiy yo'l xaritasini taqdim etadi.
          </p>
        </div>

        {/* Episodes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {podcastEpisodes.map((episode) => (
            <div
              key={episode.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group"
            >
              {/* Episode Header */}
              <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold opacity-90">#{episode.episodeNumber}-son</span>
                  <Icon icon="solar:podcast-bold" className="text-3xl opacity-80" />
                </div>
                <h3 className="text-2xl font-bold mb-2">
                  {episode.title}
                </h3>
                <div className="flex flex-wrap gap-2 mt-3">
                  {episode.hashtags.map((tag, idx) => (
                    <span key={idx} className="text-xs bg-white/20 backdrop-blur-sm px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Episode Content */}
              <div className="p-6">
                {/* YouTube Thumbnail Preview */}
                {episode.youtubeId ? (
                  <a
                    href={episode.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative w-full mb-6 rounded-xl overflow-hidden cursor-pointer group/thumb block"
                  >
                    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                      <Image
                        src={getYouTubeThumbnail(episode.youtubeId)}
                        alt={episode.title}
                        fill
                        className="object-cover group-hover/thumb:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover/thumb:bg-black/20 transition-colors"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-red-600 rounded-full p-4 group-hover/thumb:scale-110 transition-transform shadow-2xl">
                          <Icon icon="solar:play-circle-bold" className="text-white text-5xl" />
                        </div>
                      </div>
                    </div>
                  </a>
                ) : (
                  <div className="relative w-full mb-6 rounded-xl overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10" style={{ paddingBottom: '56.25%' }}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center p-6">
                        <Icon icon="solar:podcast-bold" className="text-6xl text-primary/50 mx-auto mb-4" />
                        <p className="text-gray-600 font-medium">Tez orada efirga uzatiladi</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Description */}
                <div className="mb-6">
                  <p className="text-gray-700 whitespace-pre-line text-sm leading-relaxed">
                    {episode.description}
                  </p>
                </div>

                {/* Guests */}
                <div className="space-y-4 mb-6">
                  <h4 className="font-bold text-gray-900 text-lg">Mehmonlar:</h4>
                  {episode.guests.map((guest, idx) => (
                    <div key={idx} className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border-l-4 border-primary">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                          <Icon icon="solar:user-bold" className="text-white text-xl" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
                            {guest.name}
                            {guest.link && (
                              <a
                                href={guest.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="text-primary hover:text-secondary"
                              >
                                <Icon icon="solar:link-bold" className="text-sm" />
                              </a>
                            )}
                          </h5>
                          <p className="text-primary font-semibold text-sm mb-2">
                            {guest.title}
                          </p>
                          <ul className="space-y-1">
                            {guest.achievements.map((achievement, aIdx) => (
                              <li key={aIdx} className="flex items-start gap-2 text-gray-700 text-sm">
                                <Icon icon="solar:verified-check-bold" className="text-green-600 text-base flex-shrink-0 mt-0.5" />
                                <span>{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Watch Button */}
                {episode.youtubeId ? (
                  <a
                    href={episode.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors group/btn"
                  >
                    <Icon icon="solar:youtube-bold" className="text-2xl" />
                    YouTube'da tomosha qiling
                    <Icon icon="solar:arrow-right-bold" className="text-lg group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                ) : (
                  <div className="w-full inline-flex items-center justify-center gap-2 bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold cursor-not-allowed opacity-60">
                    <Icon icon="solar:clock-circle-bold" className="text-2xl" />
                    Tez orada mavjud bo'ladi
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Social Media Links */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Kuzatib boring</h3>
            <p className="text-gray-600 mb-6">Bizni ijtimoiy tarmoqlarda kuzatib boring va yangiliklar haqida xabardor bo'ling</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://t.me/eduxolimpbot"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
              >
                <Icon icon="mdi:telegram" className="text-2xl" />
                Telegram
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-colors"
              >
                <Icon icon="mdi:instagram" className="text-2xl" />
                Instagram
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition-colors"
              >
                <Icon icon="mdi:facebook" className="text-2xl" />
                Facebook
              </a>
              <a
                href="https://www.youtube.com/@edux"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                <Icon icon="mdi:youtube" className="text-2xl" />
                YouTube
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
