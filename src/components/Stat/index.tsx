"use client";

import React from "react";
import Image from "next/image";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { getImagePrefix } from "@/utils/util";

interface StatItem {
  label: string;
  value: number;
  imgSrc?: string;
}

interface StatCategory {
  title: string;
  items: StatItem[];
}

const statsData: StatCategory[] = [
{
  title: "Top 10 eng ko'p ro'yhatdan o'tgan tumanlar",
  items: [
    { label: "Oltiariq (Andijon)", value: 320 },
    { label: "Urgut (Samarqand)", value: 300 },
    { label: "Qo‘rg‘ontepa (Farg‘ona)", value: 290 },
    { label: "Dehqonobod (Navoiy)", value: 280 },
    { label: "Shahrisabz (Qashqadaryo)", value: 260 },
    { label: "G‘uzor (Buxoro)", value: 250 },
    { label: "Kosonsoy (Namangan)", value: 240 },
    { label: "Termiz (Surxondaryo)", value: 220 },
    { label: "Zarafshon (Navoiy)", value: 200 },
    { label: "Xiva (Xorazm)", value: 180 },
  ],
},
  {
    title: "Top 10 eng ko'p ro'yhatdan o'tgan maktablar",
    items: [
      { label: "33-maktab", value: 120 },
      { label: "17-maktab", value: 110 },
      { label: "101-maktab", value: 100 },
      { label: "88-maktab", value: 95 },
      { label: "12-maktab", value: 90 },
      { label: "56-maktab", value: 85 },
      { label: "45-maktab", value: 80 },
      { label: "76-maktab", value: 75 },
      { label: "3-maktab", value: 70 },
      { label: "22-maktab", value: 65 },
    ],
  },
  {
    title: "Top 10 eng ko'p ro'yhatdan o'tgan odamlar (fanlar kesimida)",
    items: [
      { label: "Ali Xasanov (Matematika)", value: 95 },
      { label: "Laylo Rahimova (Fizika)", value: 92 },
      { label: "Jasur Omonov (Kimyo)", value: 90 },
      { label: "Nilufar Karimova (Biologiya)", value: 88 },
      { label: "Rustam Karimov (Matematika)", value: 85 },
      { label: "Diyorbek Tursunov (Fizika)", value: 82 },
      { label: "Shahlo To'raeva (Biologiya)", value: 80 },
      { label: "Azizbek Qodirov (Kimyo)", value: 78 },
      { label: "Malika Abdurahmonova (Matematika)", value: 75 },
      { label: "Sardor Rahmatov (Fizika)", value: 72 },
    ],
  },
  {
    title: "Top 10 eng faol ishtirokchilar",
    items: [
      { label: "Ali Xasanov", value: 150, imgSrc: "images/mentor/user1.png" },
      { label: "Laylo Rahimova", value: 140, imgSrc: "images/mentor/user2.png" },
      { label: "Jasur Omonov", value: 135, imgSrc: "images/mentor/user3.png" },
      { label: "Nilufar Karimova", value: 130, imgSrc: "images/mentor/user1.png" },
      { label: "Rustam Karimov", value: 125, imgSrc: "images/mentor/user2.png" },
      { label: "Diyorbek Tursunov", value: 120, imgSrc: "images/mentor/user3.png" },
      { label: "Shahlo To'raeva", value: 115, imgSrc: "images/mentor/user1.png" },
      { label: "Azizbek Qodirov", value: 110, imgSrc: "images/mentor/user2.png" },
      { label: "Malika Abdurahmonova", value: 105, imgSrc: "images/mentor/user3.png" },
      { label: "Sardor Rahmatov", value: 100, imgSrc: "images/mentor/user1.png" },
    ],
  },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d', '#ffc658', '#ff7c7c', '#a4de6c', '#d0ed57'];

const Statistics = () => {
  return (
    <section id="statistics-section" className="bg-white py-20">
      <div className="container mx-auto max-w-screen-xl px-4">
        {statsData.map((category, index) => (
          <div key={index} className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">{category.title}</h2>
            
            {/* Bar Chart */}
            <div className="bg-gray-50 rounded-xl p-6 shadow-lg mb-8">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={category.items} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="label" 
                    angle={-45} 
                    textAnchor="end" 
                    height={100}
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                  />
                  <Legend />
                  <Bar dataKey="value" fill="#3b82f6" name="Ro'yhatdan o'tganlar" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart */}
            <div className="bg-gray-50 rounded-xl p-6 shadow-lg mb-8">
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={category.items as any}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(props: any) => {
                      const { name, percent } = props;
                      return `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`;
                    }}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="label"
                  >
                    {category.items.map((entry, i) => (
                      <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Card Grid with Images (for participants only) */}
            {category.items[0].imgSrc && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {category.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="relative mb-3">
                      <Image
                        src={`${getImagePrefix()}${item.imgSrc}`}
                        alt={item.label}
                        width={80}
                        height={80}
                        className="rounded-full border-4 border-white shadow-lg"
                      />
                      <div className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-md">
                        {i + 1}
                      </div>
                    </div>
                    <p className="text-lg font-semibold text-gray-800 text-center">{item.label}</p>
                    <p className="text-2xl font-bold text-blue-600 mt-2">{item.value}</p>
                    <p className="text-xs text-gray-500 mt-1">faollik bali</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Statistics;