"use client";
import { useState, useRef } from "react";
import Link from "next/link";

const subjects = [
  { id: 1, name: "Matematika", grades: ["7-sinf", "8-sinf", "9-sinf", "10-sinf", "11-sinf"] },
  { id: 2, name: "Fizika", grades: ["7-sinf", "8-sinf", "9-sinf", "10-sinf", "11-sinf"] },
  { id: 3, name: "Kimyo", grades: ["7-sinf", "8-sinf", "9-sinf", "10-sinf", "11-sinf"] },
  { id: 4, name: "Biologiya", grades: ["7-sinf", "8-sinf", "9-sinf", "10-sinf", "11-sinf"] },
];

const OlimpiadalarDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<number | null>(null);
  const closeTimeoutRef = useRef<number | null>(null);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = window.setTimeout(() => {
      setIsOpen(false);
      setSelectedSubject(null);
    }, 150);
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href="/#courses"
        className="flex items-center gap-2 px-3 py-2 text-sm lg:text-sm xl:text-base text-gray-700 hover:text-black hover:bg-gray-100 rounded-full transition-colors duration-200 whitespace-nowrap"
      >
        Olimpiadalar
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.3em"
          height="1.3em"
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="m7 10l5 5l5-5"
          />
        </svg>
      </Link>

      {isOpen && (
        <div className="absolute left-0 top-full mt-3 w-[600px] bg-white shadow-2xl rounded-lg z-50 animate-fade-slide">
          <div className="grid grid-cols-12 gap-0">
            {/* Subjects List */}
            <div className="col-span-5 border-r border-gray-200">
              <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50">
                <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wide">
                  Fanlar
                </h3>
              </div>
              <div className="py-2">
                {subjects.map((subject) => (
                  <button
                    key={subject.id}
                    onMouseEnter={() => setSelectedSubject(subject.id)}
                    className={`w-full text-left px-4 py-3 transition-all duration-200 flex items-center justify-between ${
                      selectedSubject === subject.id
                        ? "bg-blue-50 text-blue-700 font-medium"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span>{subject.name}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.2em"
                      height="1.2em"
                      viewBox="0 0 24 24"
                      className={`transition-transform ${
                        selectedSubject === subject.id ? "translate-x-1" : ""
                      }`}
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m9 5l7 7l-7 7"
                      />
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            {/* Grades List */}
            <div className="col-span-7">
              {selectedSubject ? (
                <>
                  <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50">
                    <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wide">
                      Sinflar
                    </h3>
                  </div>
                  <div className="p-4 grid grid-cols-2 gap-2">
                    {subjects
                      .find((s) => s.id === selectedSubject)
                      ?.grades.map((grade, idx) => (
                        <Link
                          key={idx}
                          href="/#courses"
                          className="px-4 py-3 text-center rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 font-medium text-gray-700"
                        >
                          {grade}
                        </Link>
                      ))}
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full p-8">
                  <div className="text-center text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="3em"
                      height="3em"
                      viewBox="0 0 24 24"
                      className="mx-auto mb-2 opacity-50"
                    >
                      <path
                        fill="currentColor"
                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"
                      />
                    </svg>
                    <p className="text-sm">Fanni tanlang</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OlimpiadalarDropdown;

