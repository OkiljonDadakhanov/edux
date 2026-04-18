"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  regions,
  grades,
  topCounts,
  type RegionRanking,
  type DistrictData,
  type SchoolData
} from "@/app/api/statisticsData";
import {
  getTotalUsersCount,
  getUsersCountByRegion,
  getUsersCountByDistrict,
  getUsersCountByOrganization,
  getTopPerformersReport,
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

        {/* O‘quvchilar reytingi — API */}
        <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 mb-12">
          <StudentsRankingApiSection />
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

const REPORT_FIXED_COLUMNS = ["#", "To'liq ism", "Tuman", "Maktab nomi", "Sinf"];

function gradeToApiQuery(gradeLabel: string): number | undefined {
  if (gradeLabel === "Barcha sinflar") return undefined;
  const m = gradeLabel.match(/^(\d{1,2})-sinf$/);
  return m ? parseInt(m[1], 10) : undefined;
}

function orderedReportColumns(row: Record<string, unknown>): string[] {
  const keys = Object.keys(row);
  const out: string[] = [];
  for (const k of REPORT_FIXED_COLUMNS) {
    if (keys.includes(k)) out.push(k);
  }
  const jami = "Jami";
  const rest = keys
    .filter((k) => !REPORT_FIXED_COLUMNS.includes(k) && k !== jami)
    .sort((a, b) => a.localeCompare(b, "uz"));
  out.push(...rest);
  if (keys.includes(jami)) out.push(jami);
  return out;
}

function formatReportCell(value: unknown): string {
  if (value === null || value === undefined) return "—";
  if (typeof value === "number") return String(value);
  return String(value);
}

/** O‘quvchilar reytingi — GET /api/Stats/GetTopPerformersReport */
const StudentsRankingApiSection = () => {
  const [selectedGrade, setSelectedGrade] = useState("Barcha sinflar");
  const [topCount, setTopCount] = useState<number | string>(10);
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const grade = gradeToApiQuery(selectedGrade);
        const size =
          topCount === "Barcha" ? 100 : typeof topCount === "number" ? topCount : 10;
        const data = await getTopPerformersReport({ grade, size });
        if (cancelled) return;
        const list = data as Record<string, unknown>[];
        setRows(list);
        setColumns(list[0] ? orderedReportColumns(list[0]) : []);
      } catch {
        if (!cancelled) setError("Ma'lumotlarni yuklashda xatolik yuz berdi.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [selectedGrade, topCount]);

  const isFixedLeftColumn = (key: string) => REPORT_FIXED_COLUMNS.includes(key);

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">O&apos;quvchilar reytingi</h3>
        <p className="text-sm text-gray-600 mb-4 max-w-3xl">
          Reyting ma&apos;lumotlari serverdan keladi (olimpiada va bosqichlar bo&apos;yicha ustunlar dinamik ko&apos;rinadi).
        </p>
        <div className="flex flex-wrap gap-4">
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
            onChange={(e) =>
              setTopCount(e.target.value === "Barcha" ? "Barcha" : parseInt(e.target.value, 10))
            }
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

      {error && (
        <p className="mb-4 text-sm font-medium text-red-600" role="alert">
          {error}
        </p>
      )}

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px]">
          <thead>
            <tr className="bg-gradient-to-r from-primary to-secondary text-white">
              {columns.map((col) => (
                <th
                  key={col}
                  title={col}
                  className={`px-4 py-3 text-xs sm:text-sm font-semibold whitespace-normal max-w-[14rem] ${
                    isFixedLeftColumn(col) ? "text-left" : "text-center"
                  }`}
                >
                  {col === "Jami" ? "Jami (umumiy)" : col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={Math.max(columns.length, 1)}
                  className="px-6 py-10 text-center text-gray-600"
                >
                  Yuklanmoqda...
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td
                  colSpan={Math.max(columns.length, 1)}
                  className="px-6 py-10 text-center text-gray-600"
                >
                  Ma&apos;lumot topilmadi.
                </td>
              </tr>
            ) : (
              rows.map((row, rowIndex) => (
                <tr
                  key={`${String(row["To'liq ism"] ?? rowIndex)}-${rowIndex}`}
                  className={`border-b hover:bg-blue-50 transition-colors ${
                    rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  {columns.map((col) => {
                    const raw = row[col];
                    const align = isFixedLeftColumn(col) ? "text-left" : "text-center";
                    return (
                      <td
                        key={col}
                        className={`px-4 py-3 text-xs sm:text-sm text-gray-800 ${align} ${
                          col === "Jami" ? "font-bold text-primary" : ""
                        }`}
                      >
                        {formatReportCell(raw)}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Statistics;
