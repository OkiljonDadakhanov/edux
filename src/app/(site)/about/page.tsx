import React from "react";
import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";
import { getImagePrefix } from "@/utils/util";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Biz haqimizda - EduX",
  description: "EduX - O'zbekistondagi eng yaxshi olimpiadalarga tayyorgarlik platformasi haqida ma'lumot",
};

const AboutPage = () => {
  return (
    <main className="pt-24">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-20">
        <div className="container mx-auto max-w-screen-xl px-4">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Biz haqimizda
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              EduX - O'zbekistondagi eng yaxshi olimpiadalarga tayyorgarlik platformasi. 
              Biz o'quvchilarga yuqori sifatli ta'lim berish va ularning bilimlarini rivojlantirishga yordam beramiz.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto max-w-screen-xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Bizning missiyamiz</h2>
              <p className="text-lg text-gray-600 mb-4">
                Biz har bir o'quvchiga olimpiadalarda muvaffaqiyatga erishish uchun zarur bo'lgan bilim va ko'nikmalarni 
                taqdim etishni maqsad qilganmiz. Platformamiz orqali o'quvchilar professional ustozlar rahbarligida 
                o'qishlari va o'z bilimlarini sinab ko'rishlari mumkin.
              </p>
              <p className="text-lg text-gray-600">
                EduX jamoasi tajribali pedagog va dasturchilardan iborat bo'lib, biz doimiy ravishda platformani 
                takomillashtirish va yangi xususiyatlarni qo'shish ustida ishlaymiz.
              </p>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <Image 
                src={`${getImagePrefix()}images/banner/about.jpg`}
                alt="Bizning jamoa"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto max-w-screen-xl px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Nima uchun aynan EduX?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Icon icon="solar:book-bold" className="text-blue-600 text-3xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Sifatli ta'lim</h3>
              <p className="text-gray-600">
                Tajribali ustozlar tomonidan tayyorlangan darslar va o'quv materiallari orqali 
                o'quvchilar yuqori sifatli ta'lim olishadi.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Icon icon="solar:graph-up-bold" className="text-green-600 text-3xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">O'sish va taraqqiyot</h3>
              <p className="text-gray-600">
                O'quvchilar reytingi tizimi orqali o'z o'sishlarini kuzatib borishlari va 
                boshqa o'quvchilar bilan raqobatlashishlari mumkin.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Icon icon="solar:users-group-rounded-bold" className="text-purple-600 text-3xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Hamjamiyat</h3>
              <p className="text-gray-600">
                O'quvchilar bir-birlari bilan fikr almashishlari va tajriba ulashishlari 
                uchun qulay muhit yaratilgan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto max-w-screen-xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-2">5000+</div>
              <div className="text-gray-600 text-lg">Faol o'quvchilar</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-green-600 mb-2">50+</div>
              <div className="text-gray-600 text-lg">Professional ustozlar</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-purple-600 mb-2">1000+</div>
              <div className="text-gray-600 text-lg">Video darslar</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-orange-600 mb-2">95%</div>
              <div className="text-gray-600 text-lg">Mamnun o'quvchilar</div>
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

