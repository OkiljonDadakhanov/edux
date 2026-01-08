"use client";

import React, { useState, useMemo } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  regionsRankingData,
  districtsData,
  studentsRankingData,
  schoolsData,
  regions,
  subjects,
  grades,
  topCounts,
  type RegionRanking,
  type DistrictData,
  type StudentRanking,
  type SchoolData
} from "@/app/api/statisticsData";

const Statistics = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    "Viloyatlar reytingi",
    "Top tumanlar",
    "O'quvchilar reytingi",
    "Eng ko'p ro'yxatdan o'tgan maktablar"
  ];

  return (
    <section id="statistics-section" className="bg-gradient-to-br from-gray-50 to-blue-50 py-20">
      <div className="container mx-auto max-w-screen-xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Statistika va reytinglar
          </h2>
          <p className="text-lg text-gray-600">
            Barcha statistika ma'lumotlari va reytinglar
          </p>
        </div>

        {/* Summary Cards */}
        <div className="mb-8 flex justify-center">
          <div className="flex items-center gap-4 rounded-2xl bg-white shadow-md px-6 py-4 border border-blue-100">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-primary">
              <Icon icon="solar:users-group-rounded-bold" className="text-2xl" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                Foydalanuvchilar
              </p>
              <p className="text-2xl font-bold text-gray-900">
                5 345 <span className="text-sm font-semibold text-gray-500"></span>
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === index
                  ? "bg-primary text-white shadow-lg transform scale-105"
                  : "bg-white text-gray-700 hover:bg-gray-100 shadow-md"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8">
          {activeTab === 0 && <RegionsRankingTable />}
          {activeTab === 1 && <DistrictsRankingTable />}
          {activeTab === 2 && <StudentsRankingTable />}
          {activeTab === 3 && <SchoolsRankingTable />}
        </div>
      </div>
    </section>
  );
};

// Regions Ranking Table Component
const RegionsRankingTable = () => {
  const [selectedSubject, setSelectedSubject] = useState("Barcha fanlar");

  const filteredData = useMemo(() => {
    const sorted = [...regionsRankingData].sort((a, b) => {
      if (selectedSubject === "Barcha fanlar") {
        return b.umumiy - a.umumiy;
      }
      const subjectKey = selectedSubject.toLowerCase() as keyof RegionRanking;
      return (b[subjectKey] as number) - (a[subjectKey] as number);
    });
    return sorted;
  }, [selectedSubject]);

  const getValue = (item: RegionRanking) => {
    if (selectedSubject === "Barcha fanlar") return item.umumiy;
    const subjectKey = selectedSubject.toLowerCase() as keyof RegionRanking;
    return item[subjectKey] as number;
  };

  return (
    <div>
      <div className="flex flex-wrap gap-4 mb-6 items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-900">Viloyatlar reytingi</h3>
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none font-medium"
        >
          {subjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-primary to-secondary text-white">
              <th className="px-6 py-4 text-left font-semibold">#</th>
              <th className="px-6 py-4 text-left font-semibold">Viloyat</th>
              <th className="px-6 py-4 text-center font-semibold">Matematika</th>
              <th className="px-6 py-4 text-center font-semibold">Fizika</th>
              <th className="px-6 py-4 text-center font-semibold">Kimyo</th>
              <th className="px-6 py-4 text-center font-semibold">Biologiya</th>
              <th className="px-6 py-4 text-center font-semibold">Informatika</th>
              <th className="px-6 py-4 text-center font-semibold">Umumiy</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr
                key={index}
                className={`border-b hover:bg-blue-50 transition-colors ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="px-6 py-4 font-bold text-primary">{index + 1}</td>
                <td className="px-6 py-4 font-semibold text-gray-900">{item.region}</td>
                <td className="px-6 py-4 text-center text-gray-700">{item.matematika}</td>
                <td className="px-6 py-4 text-center text-gray-700">{item.fizika}</td>
                <td className="px-6 py-4 text-center text-gray-700">{item.kimyo}</td>
                <td className="px-6 py-4 text-center text-gray-700">{item.biologiya}</td>
                <td className="px-6 py-4 text-center text-gray-700">{item.informatika}</td>
                <td className="px-6 py-4 text-center font-bold text-primary">{item.umumiy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Districts Ranking Table Component
const DistrictsRankingTable = () => {
  const [selectedSubject, setSelectedSubject] = useState("Barcha fanlar");
  const [selectedRegion, setSelectedRegion] = useState("Barcha viloyatlar");
  const [topCount, setTopCount] = useState<number | string>(10);

  const filteredData = useMemo(() => {
    let filtered = [...districtsData];

    if (selectedRegion !== "Barcha viloyatlar") {
      filtered = filtered.filter((item) => item.region === selectedRegion);
    }

    const sorted = filtered.sort((a, b) => {
      if (selectedSubject === "Barcha fanlar") {
        return b.umumiy - a.umumiy;
      }
      const subjectKey = selectedSubject.toLowerCase() as keyof DistrictData;
      return (b[subjectKey] as number) - (a[subjectKey] as number);
    });

    if (topCount === "Barcha") return sorted;
    return sorted.slice(0, topCount as number);
  }, [selectedSubject, selectedRegion, topCount]);

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Top tumanlar reytingi</h3>
        <div className="flex flex-wrap gap-4">
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none font-medium"
          >
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none font-medium"
          >
            <option value="Barcha viloyatlar">Barcha viloyatlar</option>
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
          <select
            value={topCount}
            onChange={(e) => setTopCount(e.target.value === "Barcha" ? "Barcha" : parseInt(e.target.value))}
            className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none font-medium"
          >
            {topCounts.map((count) => (
              <option key={count} value={count}>
                Top {count}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-primary to-secondary text-white">
              <th className="px-6 py-4 text-left font-semibold">#</th>
              <th className="px-6 py-4 text-left font-semibold">Tuman</th>
              <th className="px-6 py-4 text-left font-semibold">Viloyat</th>
              <th className="px-6 py-4 text-center font-semibold">Matematika</th>
              <th className="px-6 py-4 text-center font-semibold">Fizika</th>
              <th className="px-6 py-4 text-center font-semibold">Kimyo</th>
              <th className="px-6 py-4 text-center font-semibold">Biologiya</th>
              <th className="px-6 py-4 text-center font-semibold">Informatika</th>
              <th className="px-6 py-4 text-center font-semibold">Umumiy</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr
                key={index}
                className={`border-b hover:bg-blue-50 transition-colors ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="px-6 py-4 font-bold text-primary">{index + 1}</td>
                <td className="px-6 py-4 font-semibold text-gray-900">{item.district}</td>
                <td className="px-6 py-4 text-gray-700">{item.region}</td>
                <td className="px-6 py-4 text-center text-gray-700">{item.matematika}</td>
                <td className="px-6 py-4 text-center text-gray-700">{item.fizika}</td>
                <td className="px-6 py-4 text-center text-gray-700">{item.kimyo}</td>
                <td className="px-6 py-4 text-center text-gray-700">{item.biologiya}</td>
                <td className="px-6 py-4 text-center text-gray-700">{item.informatika}</td>
                <td className="px-6 py-4 text-center font-bold text-primary">{item.umumiy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Students Ranking Table Component
const StudentsRankingTable = () => {
  const [selectedFilter, setSelectedFilter] = useState("umumiy reyting");
  const [selectedSubject, setSelectedSubject] = useState("Barcha fanlar");
  const [selectedGrade, setSelectedGrade] = useState("Barcha sinflar");
  const [topCount, setTopCount] = useState<number | string>(10);

  const filteredData = useMemo(() => {
    let filtered = [...studentsRankingData];

    if (selectedGrade !== "Barcha sinflar") {
      filtered = filtered.filter((item) => item.grade === selectedGrade);
    }

    const sorted = filtered.sort((a, b) => {
      if (selectedFilter === "umumiy reyting") {
        return b.umumiy - a.umumiy;
      } else if (selectedFilter === "sinflar kesimida") {
        if (selectedGrade === "Barcha sinflar") {
          return b.umumiy - a.umumiy;
        }
        return b.umumiy - a.umumiy;
      } else if (selectedFilter === "fanlar kesimida") {
        if (selectedSubject === "Barcha fanlar") {
          return b.umumiy - a.umumiy;
        }
        const subjectKey = selectedSubject.toLowerCase() as keyof StudentRanking;
        return (b[subjectKey] as number) - (a[subjectKey] as number);
      }
      return b.umumiy - a.umumiy;
    });

    if (topCount === "Barcha") return sorted;
    return sorted.slice(0, topCount as number);
  }, [selectedFilter, selectedSubject, selectedGrade, topCount]);

  const getValue = (item: StudentRanking) => {
    if (selectedFilter === "umumiy reyting" || selectedFilter === "sinflar kesimida") {
      return item.umumiy;
    }
    if (selectedSubject === "Barcha fanlar") {
      return item.umumiy;
    }
    const subjectKey = selectedSubject.toLowerCase() as keyof StudentRanking;
    return item[subjectKey] as number;
  };

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">O'quvchilar reytingi</h3>
        <div className="flex flex-wrap gap-4">
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none font-medium"
          >
            <option value="umumiy reyting">Umumiy reyting</option>
            <option value="sinflar kesimida">Sinflar kesimida</option>
            <option value="fanlar kesimida">Fanlar kesimida</option>
          </select>
          {selectedFilter === "fanlar kesimida" && (
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none font-medium"
            >
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          )}
          {selectedFilter === "sinflar kesimida" && (
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none font-medium"
            >
              {grades.map((grade) => (
                <option key={grade} value={grade}>
                  {grade}
                </option>
              ))}
            </select>
          )}
          <select
            value={topCount}
            onChange={(e) => setTopCount(e.target.value === "Barcha" ? "Barcha" : parseInt(e.target.value))}
            className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none font-medium"
          >
            {topCounts.map((count) => (
              <option key={count} value={count}>
                Top {count}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-primary to-secondary text-white">
              <th className="px-6 py-4 text-left font-semibold">#</th>
              <th className="px-6 py-4 text-left font-semibold">To'liq ism</th>
              <th className="px-6 py-4 text-left font-semibold">Tuman</th>
              <th className="px-6 py-4 text-left font-semibold">Maktab nomi</th>
              <th className="px-6 py-4 text-center font-semibold">Sinf</th>
              <th className="px-6 py-4 text-center font-semibold">Matematika</th>
              <th className="px-6 py-4 text-center font-semibold">Fizika</th>
              <th className="px-6 py-4 text-center font-semibold">Kimyo</th>
              <th className="px-6 py-4 text-center font-semibold">Biologiya</th>
              <th className="px-6 py-4 text-center font-semibold">Informatika</th>
              <th className="px-6 py-4 text-center font-semibold">Umumiy reyting</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr
                key={item.id}
                className={`border-b hover:bg-blue-50 transition-colors ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="px-6 py-4 font-bold text-primary">{index + 1}</td>
                <td className="px-6 py-4 font-semibold text-gray-900">{item.fullName}</td>
                <td className="px-6 py-4 text-gray-700">{item.district}</td>
                <td className="px-6 py-4 text-gray-700">{item.schoolName}</td>
                <td className="px-6 py-4 text-center text-gray-700">{item.grade}</td>
                <td className="px-6 py-4 text-center text-gray-700">{item.matematika}</td>
                <td className="px-6 py-4 text-center text-gray-700">{item.fizika}</td>
                <td className="px-6 py-4 text-center text-gray-700">{item.kimyo}</td>
                <td className="px-6 py-4 text-center text-gray-700">{item.biologiya}</td>
                <td className="px-6 py-4 text-center text-gray-700">{item.informatika}</td>
                <td className="px-6 py-4 text-center font-bold text-primary">{item.umumiy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Schools Ranking Table Component
const SchoolsRankingTable = () => {
  const [selectedSubject, setSelectedSubject] = useState("Barcha fanlar");
  const [selectedRegion, setSelectedRegion] = useState("Barcha viloyatlar");
  const [topCount, setTopCount] = useState<number | string>(10);

  const filteredData = useMemo(() => {
    let filtered = [...schoolsData];

    if (selectedRegion !== "Barcha viloyatlar") {
      filtered = filtered.filter((item) => item.region === selectedRegion);
    }

    const sorted = filtered.sort((a, b) => {
      if (selectedSubject === "Barcha fanlar") {
        return b.studentsCount - a.studentsCount;
      }
      const subjectKey = selectedSubject.toLowerCase() as keyof SchoolData;
      return (b[subjectKey] as number) - (a[subjectKey] as number);
    });

    if (topCount === "Barcha") return sorted;
    return sorted.slice(0, topCount as number);
  }, [selectedSubject, selectedRegion, topCount]);

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Eng ko'p ro'yxatdan o'tgan maktablar</h3>
        <div className="flex flex-wrap gap-4">
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none font-medium"
          >
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none font-medium"
          >
            <option value="Barcha viloyatlar">Barcha viloyatlar</option>
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
          <select
            value={topCount}
            onChange={(e) => setTopCount(e.target.value === "Barcha" ? "Barcha" : parseInt(e.target.value))}
            className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none font-medium"
          >
            {topCounts.map((count) => (
              <option key={count} value={count}>
                Top {count}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-primary to-secondary text-white">
              <th className="px-6 py-4 text-left font-semibold">#</th>
              <th className="px-6 py-4 text-left font-semibold">Maktab nomi</th>
              <th className="px-6 py-4 text-left font-semibold">Tuman</th>
              <th className="px-6 py-4 text-left font-semibold">Viloyat</th>
              <th className="px-6 py-4 text-center font-semibold">O'quvchilar soni</th>
              <th className="px-6 py-4 text-center font-semibold">Matematika</th>
              <th className="px-6 py-4 text-center font-semibold">Fizika</th>
              <th className="px-6 py-4 text-center font-semibold">Kimyo</th>
              <th className="px-6 py-4 text-center font-semibold">Biologiya</th>
              <th className="px-6 py-4 text-center font-semibold">Informatika</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr
                key={index}
                className={`border-b hover:bg-blue-50 transition-colors ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="px-6 py-4 font-bold text-primary">{index + 1}</td>
                <td className="px-6 py-4 font-semibold text-gray-900">{item.schoolName}</td>
                <td className="px-6 py-4 text-gray-700">{item.district}</td>
                <td className="px-6 py-4 text-gray-700">{item.region}</td>
                <td className="px-6 py-4 text-center font-bold text-primary">{item.studentsCount}</td>
                <td className="px-6 py-4 text-center text-gray-700">{item.matematika}</td>
                <td className="px-6 py-4 text-center text-gray-700">{item.fizika}</td>
                <td className="px-6 py-4 text-center text-gray-700">{item.kimyo}</td>
                <td className="px-6 py-4 text-center text-gray-700">{item.biologiya}</td>
                <td className="px-6 py-4 text-center text-gray-700">{item.informatika}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Statistics;
