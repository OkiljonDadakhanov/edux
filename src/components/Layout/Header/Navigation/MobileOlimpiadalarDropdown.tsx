"use client";
import { useState } from "react";
import Link from "next/link";

const subjects = [
  { id: 1, name: "Matematika", grades: ["4-sinf", "5-sinf", "6-sinf", "7-sinf", "8-sinf", "9-sinf", "10-sinf", "11-sinf"] },
  { id: 2, name: "Fizika", grades: ["7-sinf", "8-sinf", "9-sinf", "10-sinf", "11-sinf"] },
  { id: 3, name: "Kimyo", grades: ["7-sinf", "8-sinf", "9-sinf", "10-sinf", "11-sinf"] },
  { id: 4, name: "Biologiya", grades: ["7-sinf", "8-sinf", "9-sinf", "10-sinf", "11-sinf"] },
];

const MobileOlimpiadalarDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSubject, setExpandedSubject] = useState<number | null>(null);

  return (
    <div className="w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-2 text-muted focus:outline-none"
      >
        Olimpiadalar
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.5em"
          height="1.5em"
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
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
      </button>

      {isOpen && (
        <div className="pl-2 pb-1">
          {subjects.map((subject) => (
            <div key={subject.id}>
              <button
                onClick={() =>
                  setExpandedSubject(
                    expandedSubject === subject.id ? null : subject.id
                  )
                }
                className="flex items-center justify-between w-full py-2 px-2 text-sm text-gray-600 hover:text-primary rounded-md transition-colors"
              >
                {subject.name}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.2em"
                  height="1.2em"
                  className={`transition-transform duration-200 ${
                    expandedSubject === subject.id ? "rotate-180" : ""
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
              </button>

              {expandedSubject === subject.id && (
                <div className="pl-4 pb-1 grid grid-cols-2 gap-1">
                  {subject.grades.map((grade, idx) => (
                    <Link
                      key={idx}
                      href="/#courses"
                      className="py-1.5 px-2 text-xs text-gray-500 hover:text-primary text-center rounded border border-gray-100 hover:border-primary/30 transition-colors"
                    >
                      {grade}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileOlimpiadalarDropdown;
