import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Biz haqimizda - EduX",
  description: "EduX - O'zbekistondagi eng nufuzli fan olimpiadalariga ishonchli tayyorgarlik platformasi",
};

const AboutPage = () => {
  return (
    <main className="pt-24">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-20">
        <div className="container mx-auto max-w-screen-xl px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              EduX
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8">
              Oʻzbekistondagi eng nufuzli fan olimpiadalariga ishonchli tayyorgarlik platformasi. 
              Bunda maqsad aniq, ta'lim sifatli, natija kafolatli!
            </p>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-blue-100">
              <p className="text-2xl md:text-3xl font-bold text-primary mb-4">
                EduX — bu shunchaki platforma emas.
              </p>
              <p className="text-xl md:text-2xl text-gray-800 font-semibold">
                Bu — bilim, raqobat va rivojlanishni birlashtirgan yagona muhit!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What EduX Offers */}
      <section className="py-20">
        <div className="container mx-auto max-w-screen-xl px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            EduX sizga quyidagilarni taqdim etadi:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border-l-4 border-primary shadow-md hover:shadow-xl transition-all">
              <Icon icon="solar:document-text-bold" className="text-4xl text-primary mb-4" />
              <p className="text-lg font-semibold text-gray-800">
                Real olimpiada formatidagi testlar
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-l-4 border-green-500 shadow-md hover:shadow-xl transition-all">
              <Icon icon="solar:graph-up-bold" className="text-4xl text-green-600 mb-4" />
              <p className="text-lg font-semibold text-gray-800">
                Har bir ishtirokdan so'ng batafsil tahlil va xatolar ustida ishlash
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-l-4 border-purple-500 shadow-md hover:shadow-xl transition-all">
              <Icon icon="solar:video-frame-play-vertical-bold" className="text-4xl text-purple-600 mb-4" />
              <p className="text-lg font-semibold text-gray-800">
                Bilimni chuqurlashtiruvchi onlayn tahliliy darslar
              </p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-xl border-l-4 border-orange-500 shadow-md hover:shadow-xl transition-all">
              <Icon icon="solar:trophy-bold" className="text-4xl text-orange-600 mb-4" />
              <p className="text-lg font-semibold text-gray-800">
                Qiziqarli viktorinalar va bilim bellashuvlari
              </p>
            </div>
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-6 rounded-xl border-l-4 border-cyan-500 shadow-md hover:shadow-xl transition-all">
              <Icon icon="solar:gift-bold" className="text-4xl text-cyan-600 mb-4" />
              <p className="text-lg font-semibold text-gray-800">
                Doimiy sovrinlar va bonuslar
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto max-w-screen-xl px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8">
                Endi bahona yo'q!
              </h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  Uyda o'tirgan holda ham olimpiadaga tayyorlanasiz, ishtirok etasiz va bilimingizni muntazam mustahkamlab borasiz. 
                  Har bir ishtirokchi olimpiada yakuni bo'yicha to'plagan foizdan kelib chiqqan holda ballarni qo'lga kiritishadi. 
                  Ballar doimiy jamlanib, Respublika bo'yicha reyting sistemasi shakllantiriladi. 
                  Ballaringizni ushbu reyting sistemasida doimiy kuzatib borishingiz mumkin.
                </p>
                <p className="font-semibold text-gray-900">
                  Yuqori ballarni jamlagan ishtirokchilar Fan olimpiadalari markazi va EduX loyihasining maxsus sertifikatlari bilan taqdirlanadi.
                </p>
                <p className="font-semibold text-primary text-xl">
                  Eng yuqori ball to'plagan ishtirokchilar esa Xalqaro olimpiadalarda ishtirok etuvchi Terma jamoa zahirasiga qabul qilinishi mumkin.
                </p>
                <p className="text-center text-2xl md:text-3xl font-bold text-gray-900 pt-6 border-t-2 border-gray-200">
                  EduX — bilim va yutuqlar maydoni.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto max-w-screen-xl px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              Bizning missiyamiz
            </h2>
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 md:p-12 shadow-lg border border-primary/20">
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  Har bir o'quvchini fan olimpiadalarida muvaffaqiyatga erishishi uchun zarur bo'lgan puxta bilim hamda amaliy ko'nikmalar bilan ta'minlashni maqsad qilganmiz. 
                  EduX platformasi orqali o'quvchilar professional va tajribali ustozlar rahbarligida ta'lim olib, 
                  o'z bilimlarini real topshiriqlar orqali sinovdan o'tkazish imkoniyatiga ega bo'ladilar.
                </p>
                <p>
                  EduX jamoasi malakali pedagoglar, shuningdek, zamonaviy texnologiyalarni chuqur biladigan dasturchilardan tashkil topgan. 
                  Biz ta'lim sifati va foydalanuvchi tajribasini doimiy ravishda oshirib borish, platformani takomillashtirish hamda 
                  yangi imkoniyatlar bilan boyitish ustida uzluksiz ish olib boramiz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 py-20">
        <div className="container mx-auto max-w-screen-xl px-4">
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold mb-6">Biz bilan bog'laning</h2>
            <p className="text-xl mb-8 opacity-90">
              Savollaringiz bormi? Biz har doim yordam berishga tayyormiz!
            </p>
            <div className="flex flex-wrap justify-center gap-8">
              <div className="flex items-center gap-3">
                <Icon icon="solar:phone-bold" className="text-3xl" />
                <span className="text-lg">+998 77 550 33 66</span>
              </div>
              <div className="flex items-center gap-3">
                <Icon icon="solar:letter-bold" className="text-3xl" />
                <span className="text-lg">eduxx@gmail.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Icon icon="solar:map-point-bold" className="text-3xl" />
                <span className="text-lg">Toshkent, Yunusobod tumani</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;

