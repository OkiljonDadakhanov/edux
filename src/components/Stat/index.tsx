"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  studentsRankingData,
  regions,
  subjects,
  grades,
  topCounts,
  type StudentRanking,
  type RegionRanking,
  type DistrictData,
  type SchoolData
} from "@/app/api/statisticsData";
import {
  getTotalUsersCount,
  getUsersCountByRegion,
  getUsersCountByDistrict,
  getUsersCountByOrganization,
  type ApiRegionCount,
  type ApiDistrictCount,
  type ApiOrganizationCount
} from "@/services/statisticsApi";

const Statistics = () => {
  const [totalUsers, setTotalUsers] = useState<number | null>(null);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);

  useEffect(() => {
    const fetchTotalUsers = async () => {
      setIsLoadingUsers(true);
      try {
        const count = await getTotalUsersCount();
        setTotalUsers(count);
      } catch (error) {
        console.error('Failed to fetch total users:', error);
      } finally {
        setIsLoadingUsers(false);
      }
    };

    fetchTotalUsers();
  }, []);

  // Format number with spaces for thousands
  const formatNumber = (num: number | null) => {
    if (num === null) return '...';
    return num.toLocaleString('uz-UZ').replace(/,/g, ' ');
  };

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
                {isLoadingUsers ? (
                  <span className="text-sm font-semibold text-gray-500">Yuklanmoqda...</span>
                ) : (
                  <>
                    {formatNumber(totalUsers)} <span className="text-sm font-semibold text-gray-500"></span>
                  </>
                )}
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

  // API data states
  const [regionsData, setRegionsData] = useState<ApiRegionCount[]>([]);
  const [districtsData, setDistrictsData] = useState<ApiDistrictCount[]>([]);
  const [organizationsData, setOrganizationsData] = useState<ApiOrganizationCount[]>([]);
  const [isLoading, setIsLoading] = useState({ regions: false, districts: false, organizations: false });

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

  // Fetch regions data - always fetch so region filter works
  useEffect(() => {
    const fetchRegions = async () => {
      setIsLoading(prev => ({ ...prev, regions: true }));
      try {
        const size = activeTab === 0 
          ? (topCount === "Barcha" ? 100 : (typeof topCount === "number" ? topCount : 10))
          : 100; // Fetch all for filter dropdown
        const data = await getUsersCountByRegion(undefined, size);
        setRegionsData(data);
      } catch (error) {
        console.error('Failed to fetch regions data:', error);
      } finally {
        setIsLoading(prev => ({ ...prev, regions: false }));
      }
    };

    fetchRegions();
  }, [activeTab === 0 ? topCount : undefined]); // Only re-fetch when on regions tab and topCount changes

  // Fetch districts data
  useEffect(() => {
    const fetchDistricts = async () => {
      setIsLoading(prev => ({ ...prev, districts: true }));
      try {
        const size = topCount === "Barcha" ? 100 : (typeof topCount === "number" ? topCount : 10);
        // Find regionId from selectedRegion if not "Barcha viloyatlar"
        const regionId = selectedRegion !== "Barcha viloyatlar" 
          ? regionsData.find(r => r.regionName === selectedRegion)?.regionId 
          : undefined;
        const data = await getUsersCountByDistrict(regionId, undefined, size);
        setDistrictsData(data);
      } catch (error) {
        console.error('Failed to fetch districts data:', error);
      } finally {
        setIsLoading(prev => ({ ...prev, districts: false }));
      }
    };

    if (activeTab === 1) {
      fetchDistricts();
    }
  }, [activeTab, selectedRegion, topCount, regionsData]);

  // Fetch organizations data
  useEffect(() => {
    const fetchOrganizations = async () => {
      setIsLoading(prev => ({ ...prev, organizations: true }));
      try {
        const size = topCount === "Barcha" ? 100 : (typeof topCount === "number" ? topCount : 10);
        // Find regionId from selectedRegion if not "Barcha viloyatlar"
        const regionId = selectedRegion !== "Barcha viloyatlar" 
          ? regionsData.find(r => r.regionName === selectedRegion)?.regionId 
          : undefined;
        const data = await getUsersCountByOrganization(regionId, undefined, size);
        setOrganizationsData(data);
      } catch (error) {
        console.error('Failed to fetch organizations data:', error);
      } finally {
        setIsLoading(prev => ({ ...prev, organizations: false }));
      }
    };

    if (activeTab === 2) {
      fetchOrganizations();
    }
  }, [activeTab, selectedRegion, topCount, regionsData]);

  // Convert API data to display format
  const filteredRegions = useMemo(() => {
    const mapped: RegionRanking[] = regionsData.map(item => ({
      region: item.regionName,
      matematika: 0, // API doesn't provide subject breakdown
      fizika: 0,
      kimyo: 0,
      biologiya: 0,
      informatika: 0,
      umumiy: item.count
    }));

    const sorted = mapped.sort((a, b) => b.umumiy - a.umumiy);
    return sorted;
  }, [regionsData]);

  const filteredDistricts = useMemo(() => {
    let filtered = districtsData;
    
    if (selectedRegion !== "Barcha viloyatlar") {
      filtered = filtered.filter((item) => item.regionName === selectedRegion);
    }

    const mapped: DistrictData[] = filtered.map(item => ({
      district: item.districtName,
      region: item.regionName,
      matematika: 0, // API doesn't provide subject breakdown
      fizika: 0,
      kimyo: 0,
      biologiya: 0,
      informatika: 0,
      umumiy: item.count
    }));

    const sorted = mapped.sort((a, b) => b.umumiy - a.umumiy);
    return sorted;
  }, [districtsData, selectedRegion]);

  const filteredSchools = useMemo(() => {
    let filtered = organizationsData;
    
    if (selectedRegion !== "Barcha viloyatlar") {
      filtered = filtered.filter((item) => item.regionName === selectedRegion);
    }

    const mapped: SchoolData[] = filtered.map(item => ({
      schoolName: item.organizationName,
      district: item.districtName,
      region: item.regionName,
      studentsCount: item.count,
      matematika: 0, // API doesn't provide subject breakdown
      fizika: 0,
      kimyo: 0,
      biologiya: 0,
      informatika: 0
    }));

    const sorted = mapped.sort((a, b) => b.studentsCount - a.studentsCount);
    return sorted;
  }, [organizationsData, selectedRegion]);

  // Since API doesn't support subject breakdown, we only show total count
  // Subject filter is kept for UI consistency but doesn't affect API calls

  // Get unique regions from API data for dropdown
  const availableRegions = useMemo(() => {
    if (activeTab === 1 || activeTab === 2) {
      const regionNames = new Set<string>();
      if (activeTab === 1) {
        districtsData.forEach(item => regionNames.add(item.regionName));
      } else {
        organizationsData.forEach(item => regionNames.add(item.regionName));
      }
      // Fallback to static regions if no API data yet
      if (regionNames.size === 0) {
        return regions;
      }
      return Array.from(regionNames).sort();
    }
    return regions;
  }, [activeTab, districtsData, organizationsData]);

  const isLoadingData = isLoading.regions || isLoading.districts || isLoading.organizations;

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
        {/* Subject filter hidden since API doesn't support it */}
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none font-medium opacity-50 cursor-not-allowed"
          disabled
          title="API orqali faqat umumiy son ko'rsatiladi"
        >
          <option value="Barcha fanlar">Barcha fanlar (API)</option>
        </select>
        {(activeTab === 1 || activeTab === 2) && (
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none font-medium"
          >
            <option value="Barcha viloyatlar">Barcha viloyatlar</option>
            {availableRegions.map((region) => (
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
        {isLoadingData && (
          <div className="text-center py-12">
            <Icon icon="solar:refresh-bold" className="text-4xl text-primary animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Ma'lumotlar yuklanmoqda...</p>
          </div>
        )}
        
        {!isLoadingData && activeTab === 0 && (
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-primary to-secondary text-white">
                <th className="px-6 py-4 text-left font-semibold">#</th>
                <th className="px-6 py-4 text-left font-semibold">Viloyat</th>
                <th className="px-6 py-4 text-center font-semibold">Foydalanuvchilar soni</th>
              </tr>
            </thead>
            <tbody>
              {filteredRegions.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                    Ma'lumot topilmadi
                  </td>
                </tr>
              ) : (
                filteredRegions.map((item, index) => (
                  <tr
                    key={index}
                    className={`border-b hover:bg-blue-50 transition-colors ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="px-6 py-4 font-bold text-primary">{index + 1}</td>
                    <td className="px-6 py-4 font-semibold text-gray-900">{item.region}</td>
                    <td className="px-6 py-4 text-center font-bold text-primary">
                      {item.umumiy.toLocaleString('uz-UZ').replace(/,/g, ' ')}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}

        {!isLoadingData && activeTab === 1 && (
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-primary to-secondary text-white">
                <th className="px-6 py-4 text-left font-semibold">#</th>
                <th className="px-6 py-4 text-left font-semibold">Tuman</th>
                <th className="px-6 py-4 text-left font-semibold">Viloyat</th>
                <th className="px-6 py-4 text-center font-semibold">Foydalanuvchilar soni</th>
              </tr>
            </thead>
            <tbody>
              {filteredDistricts.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                    Ma'lumot topilmadi
                  </td>
                </tr>
              ) : (
                filteredDistricts.map((item, index) => (
                  <tr
                    key={index}
                    className={`border-b hover:bg-blue-50 transition-colors ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="px-6 py-4 font-bold text-primary">{index + 1}</td>
                    <td className="px-6 py-4 font-semibold text-gray-900">{item.district}</td>
                    <td className="px-6 py-4 text-gray-700">{item.region}</td>
                    <td className="px-6 py-4 text-center font-bold text-primary">
                      {item.umumiy.toLocaleString('uz-UZ').replace(/,/g, ' ')}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}

        {!isLoadingData && activeTab === 2 && (
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-primary to-secondary text-white">
                <th className="px-6 py-4 text-left font-semibold">#</th>
                <th className="px-6 py-4 text-left font-semibold">Maktab nomi</th>
                <th className="px-6 py-4 text-left font-semibold">Tuman</th>
                <th className="px-6 py-4 text-left font-semibold">Viloyat</th>
                <th className="px-6 py-4 text-center font-semibold">Foydalanuvchilar soni</th>
              </tr>
            </thead>
            <tbody>
              {filteredSchools.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    Ma'lumot topilmadi
                  </td>
                </tr>
              ) : (
                filteredSchools.map((item, index) => (
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
                    <td className="px-6 py-4 text-center font-bold text-primary">
                      {item.studentsCount.toLocaleString('uz-UZ').replace(/,/g, ' ')}
                    </td>
                  </tr>
                ))
              )}
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
