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

        {/* First Table: Combined Regions, Districts, Schools */}
        <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 mb-12">
          <CombinedRankingTable />
        </div>

        {/* Second Table: Students Ranking (Umumiy/Sinflar kesimida) */}
        <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 mb-12">
          <StudentsRankingTableByGrade />
        </div>

        {/* Third Table: Students Ranking (Umumiy/Fanlar kesimida) */}
        <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8">
          <StudentsRankingTableBySubject />
        </div>
      </div>
    </section>
  );
};

// Combined Ranking Table Component (Regions, Districts, Schools)
const CombinedRankingTable = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedSubject, setSelectedSubject] = useState("Barcha fanlar");
  const [selectedRegion, setSelectedRegion] = useState("Barcha viloyatlar");
  const [topCount, setTopCount] = useState<number | string>("Barcha");

  const tabs = [
    { 
      label: "Viloyatlar kesimida", 
      key: "regions",
      title: "Viloyatlar kesimida eng ko'p ro'yxatdan o'tgan o'quvchilar soni"
    },
    { 
      label: "Tumanlar kesimida", 
      key: "districts",
      title: "Tumanlar kesimida eng ko'p ro'yxatdan o'tgan o'quvchilar soni"
    },
    { 
      label: "Maktablar kesimida", 
      key: "schools",
      title: "Maktablar kesimida eng ko'p ro'yxatdan o'tgan o'quvchilar soni"
    }
  ];

  const filteredRegions = useMemo(() => {
    const sorted = [...regionsRankingData].sort((a, b) => {
      if (selectedSubject === "Barcha fanlar") {
        return b.umumiy - a.umumiy;
      }
      const subjectKey = selectedSubject.toLowerCase() as keyof RegionRanking;
      return (b[subjectKey] as number) - (a[subjectKey] as number);
    });
    if (topCount === "Barcha") return sorted;
    return sorted.slice(0, topCount as number);
  }, [selectedSubject, topCount]);

  const filteredDistricts = useMemo(() => {
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

  const filteredSchools = useMemo(() => {
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

  const showSubjectColumns = selectedSubject === "Barcha fanlar";
  const selectedSubjectKey = selectedSubject.toLowerCase() as string;

  return (
    <div>
      {/* Tab Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              activeTab === index
                ? "bg-primary text-white shadow-lg transform scale-105"
                : "bg-white text-gray-700 hover:bg-gray-100 shadow-md border border-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Title for Active Tab */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          {tabs[activeTab].title}
        </h3>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6 items-center">
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
        {(activeTab === 1 || activeTab === 2) && (
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

      <div className="overflow-x-auto">
        {activeTab === 0 && (
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-primary to-secondary text-white">
                <th className="px-6 py-4 text-left font-semibold">#</th>
                <th className="px-6 py-4 text-left font-semibold">Viloyat</th>
                {showSubjectColumns ? (
                  <>
                    <th className="px-6 py-4 text-center font-semibold">Matematika</th>
                    <th className="px-6 py-4 text-center font-semibold">Fizika</th>
                    <th className="px-6 py-4 text-center font-semibold">Kimyo</th>
                    <th className="px-6 py-4 text-center font-semibold">Biologiya</th>
                    <th className="px-6 py-4 text-center font-semibold">Informatika</th>
                    <th className="px-6 py-4 text-center font-semibold">Umumiy</th>
                  </>
                ) : (
                  <>
                    <th className="px-6 py-4 text-center font-semibold">{selectedSubject}</th>
                    <th className="px-6 py-4 text-center font-semibold">Umumiy</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {filteredRegions.map((item, index) => (
                <tr
                  key={index}
                  className={`border-b hover:bg-blue-50 transition-colors ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="px-6 py-4 font-bold text-primary">{index + 1}</td>
                  <td className="px-6 py-4 font-semibold text-gray-900">{item.region}</td>
                  {showSubjectColumns ? (
                    <>
                      <td className="px-6 py-4 text-center text-gray-700">{item.matematika}</td>
                      <td className="px-6 py-4 text-center text-gray-700">{item.fizika}</td>
                      <td className="px-6 py-4 text-center text-gray-700">{item.kimyo}</td>
                      <td className="px-6 py-4 text-center text-gray-700">{item.biologiya}</td>
                      <td className="px-6 py-4 text-center text-gray-700">{item.informatika}</td>
                      <td className="px-6 py-4 text-center font-bold text-primary">{item.umumiy}</td>
                    </>
                  ) : (
                    <>
                      <td className="px-6 py-4 text-center font-bold text-primary">
                        {item[selectedSubjectKey as keyof RegionRanking] as number}
                      </td>
                      <td className="px-6 py-4 text-center text-gray-700">{item.umumiy}</td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === 1 && (
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-primary to-secondary text-white">
                <th className="px-6 py-4 text-left font-semibold">#</th>
                <th className="px-6 py-4 text-left font-semibold">Tuman</th>
                <th className="px-6 py-4 text-left font-semibold">Viloyat</th>
                {showSubjectColumns ? (
                  <>
                    <th className="px-6 py-4 text-center font-semibold">Matematika</th>
                    <th className="px-6 py-4 text-center font-semibold">Fizika</th>
                    <th className="px-6 py-4 text-center font-semibold">Kimyo</th>
                    <th className="px-6 py-4 text-center font-semibold">Biologiya</th>
                    <th className="px-6 py-4 text-center font-semibold">Informatika</th>
                    <th className="px-6 py-4 text-center font-semibold">Umumiy</th>
                  </>
                ) : (
                  <>
                    <th className="px-6 py-4 text-center font-semibold">{selectedSubject}</th>
                    <th className="px-6 py-4 text-center font-semibold">Umumiy</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {filteredDistricts.map((item, index) => (
                <tr
                  key={index}
                  className={`border-b hover:bg-blue-50 transition-colors ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="px-6 py-4 font-bold text-primary">{index + 1}</td>
                  <td className="px-6 py-4 font-semibold text-gray-900">{item.district}</td>
                  <td className="px-6 py-4 text-gray-700">{item.region}</td>
                  {showSubjectColumns ? (
                    <>
                      <td className="px-6 py-4 text-center text-gray-700">{item.matematika}</td>
                      <td className="px-6 py-4 text-center text-gray-700">{item.fizika}</td>
                      <td className="px-6 py-4 text-center text-gray-700">{item.kimyo}</td>
                      <td className="px-6 py-4 text-center text-gray-700">{item.biologiya}</td>
                      <td className="px-6 py-4 text-center text-gray-700">{item.informatika}</td>
                      <td className="px-6 py-4 text-center font-bold text-primary">{item.umumiy}</td>
                    </>
                  ) : (
                    <>
                      <td className="px-6 py-4 text-center font-bold text-primary">
                        {item[selectedSubjectKey as keyof DistrictData] as number}
                      </td>
                      <td className="px-6 py-4 text-center text-gray-700">{item.umumiy}</td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === 2 && (
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-primary to-secondary text-white">
                <th className="px-6 py-4 text-left font-semibold">#</th>
                <th className="px-6 py-4 text-left font-semibold">Maktab nomi</th>
                <th className="px-6 py-4 text-left font-semibold">Tuman</th>
                <th className="px-6 py-4 text-left font-semibold">Viloyat</th>
                {showSubjectColumns ? (
                  <>
                    <th className="px-6 py-4 text-center font-semibold">O'quvchilar soni</th>
                    <th className="px-6 py-4 text-center font-semibold">Matematika</th>
                    <th className="px-6 py-4 text-center font-semibold">Fizika</th>
                    <th className="px-6 py-4 text-center font-semibold">Kimyo</th>
                    <th className="px-6 py-4 text-center font-semibold">Biologiya</th>
                    <th className="px-6 py-4 text-center font-semibold">Informatika</th>
                  </>
                ) : (
                  <>
                    <th className="px-6 py-4 text-center font-semibold">O'quvchilar soni</th>
                    <th className="px-6 py-4 text-center font-semibold">{selectedSubject}</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {filteredSchools.map((item, index) => (
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
                  {showSubjectColumns ? (
                    <>
                      <td className="px-6 py-4 text-center font-bold text-primary">{item.studentsCount}</td>
                      <td className="px-6 py-4 text-center text-gray-700">{item.matematika}</td>
                      <td className="px-6 py-4 text-center text-gray-700">{item.fizika}</td>
                      <td className="px-6 py-4 text-center text-gray-700">{item.kimyo}</td>
                      <td className="px-6 py-4 text-center text-gray-700">{item.biologiya}</td>
                      <td className="px-6 py-4 text-center text-gray-700">{item.informatika}</td>
                    </>
                  ) : (
                    <>
                      <td className="px-6 py-4 text-center font-bold text-primary">{item.studentsCount}</td>
                      <td className="px-6 py-4 text-center font-bold text-primary">
                        {item[selectedSubjectKey as keyof SchoolData] as number}
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

// Students Ranking Table by Grade (Second Table)
const StudentsRankingTableByGrade = () => {
  const [selectedFilter, setSelectedFilter] = useState("umumiy reyting");
  const [selectedGrade, setSelectedGrade] = useState("Barcha sinflar");
  const [selectedSubject, setSelectedSubject] = useState("Barcha fanlar");
  const [topCount, setTopCount] = useState<number | string>(10);

  const filteredData = useMemo(() => {
    let filtered = [...studentsRankingData];

    if (selectedGrade !== "Barcha sinflar") {
      filtered = filtered.filter((item) => item.grade === selectedGrade);
    }

    const sorted = filtered.sort((a, b) => {
      // If a specific subject is selected, sort by that subject's score
      if (selectedSubject !== "Barcha fanlar") {
        const subjectKey = selectedSubject.toLowerCase() as keyof StudentRanking;
        return (b[subjectKey] as number) - (a[subjectKey] as number);
      }
      // Otherwise, sort by umumiy
      return b.umumiy - a.umumiy;
    });

    if (topCount === "Barcha") return sorted;
    return sorted.slice(0, topCount as number);
  }, [selectedFilter, selectedGrade, selectedSubject, topCount]);

  const showSubjectColumns = selectedSubject === "Barcha fanlar";
  const selectedSubjectKey = selectedSubject.toLowerCase() as string;

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
          </select>
          {(selectedFilter === "umumiy reyting" || selectedFilter === "sinflar kesimida") && (
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
              {showSubjectColumns ? (
                <>
                  <th className="px-6 py-4 text-center font-semibold">Matematika</th>
                  <th className="px-6 py-4 text-center font-semibold">Fizika</th>
                  <th className="px-6 py-4 text-center font-semibold">Kimyo</th>
                  <th className="px-6 py-4 text-center font-semibold">Biologiya</th>
                  <th className="px-6 py-4 text-center font-semibold">Informatika</th>
                  <th className="px-6 py-4 text-center font-semibold">Umumiy reyting</th>
                </>
              ) : (
                <>
                  <th className="px-6 py-4 text-center font-semibold">{selectedSubject}</th>
                  <th className="px-6 py-4 text-center font-semibold">Umumiy reyting</th>
                </>
              )}
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
                {showSubjectColumns ? (
                  <>
                    <td className="px-6 py-4 text-center text-gray-700">{item.matematika}</td>
                    <td className="px-6 py-4 text-center text-gray-700">{item.fizika}</td>
                    <td className="px-6 py-4 text-center text-gray-700">{item.kimyo}</td>
                    <td className="px-6 py-4 text-center text-gray-700">{item.biologiya}</td>
                    <td className="px-6 py-4 text-center text-gray-700">{item.informatika}</td>
                    <td className="px-6 py-4 text-center font-bold text-primary">{item.umumiy}</td>
                  </>
                ) : (
                  <>
                    <td className="px-6 py-4 text-center font-bold text-primary">
                      {item[selectedSubjectKey as keyof StudentRanking] as number}
                    </td>
                    <td className="px-6 py-4 text-center font-bold text-primary">{item.umumiy}</td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Students Ranking Table by Subject (Third Table - Vice Versa)
const StudentsRankingTableBySubject = () => {
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

  const showSubjectColumns = selectedSubject === "Barcha fanlar";
  const selectedSubjectKey = selectedSubject.toLowerCase() as string;

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
            <option value="fanlar kesimida">Fanlar kesimida</option>
          </select>
          {(selectedFilter === "umumiy reyting" || selectedFilter === "fanlar kesimida") && (
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
              {showSubjectColumns ? (
                <>
                  <th className="px-6 py-4 text-center font-semibold">Matematika</th>
                  <th className="px-6 py-4 text-center font-semibold">Fizika</th>
                  <th className="px-6 py-4 text-center font-semibold">Kimyo</th>
                  <th className="px-6 py-4 text-center font-semibold">Biologiya</th>
                  <th className="px-6 py-4 text-center font-semibold">Informatika</th>
                  <th className="px-6 py-4 text-center font-semibold">Umumiy reyting</th>
                </>
              ) : (
                <>
                  <th className="px-6 py-4 text-center font-semibold">{selectedSubject}</th>
                  <th className="px-6 py-4 text-center font-semibold">Umumiy reyting</th>
                </>
              )}
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
                {showSubjectColumns ? (
                  <>
                    <td className="px-6 py-4 text-center text-gray-700">{item.matematika}</td>
                    <td className="px-6 py-4 text-center text-gray-700">{item.fizika}</td>
                    <td className="px-6 py-4 text-center text-gray-700">{item.kimyo}</td>
                    <td className="px-6 py-4 text-center text-gray-700">{item.biologiya}</td>
                    <td className="px-6 py-4 text-center text-gray-700">{item.informatika}</td>
                    <td className="px-6 py-4 text-center font-bold text-primary">{item.umumiy}</td>
                  </>
                ) : (
                  <>
                    <td className="px-6 py-4 text-center font-bold text-primary">
                      {item[selectedSubjectKey as keyof StudentRanking] as number}
                    </td>
                    <td className="px-6 py-4 text-center font-bold text-primary">{item.umumiy}</td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Statistics;
