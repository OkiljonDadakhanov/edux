"use client";
import { useState } from "react";
import Link from "next/link";
import { HeaderItem } from "../../../../types/menu";

const HeaderLink: React.FC<{ item: HeaderItem }> = ({ item }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => item.submenu && setSubmenuOpen(true)}
      onMouseLeave={() => setSubmenuOpen(false)}
    >
      {/* MAIN LINK */}
      <Link
        href={item.href}
        className="flex items-center gap-1.5 px-4 py-2.5 text-sm xl:text-base font-medium text-gray-700 hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200 whitespace-nowrap"
      >
        {item.label}

        {item.submenu && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.3em"
            height="1.3em"
            className={`transition-transform duration-300 ${
              submenuOpen ? "rotate-180" : ""
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
        )}
      </Link>

      {/* SUBMENU */}
      {submenuOpen && item.submenu && (
        <div
          className="
            absolute left-0 top-full mt-3 
            w-56 bg-white dark:bg-darklight shadow-lg rounded-lg 
            py-2 z-50
            animate-fade-slide
          "
        >
          {item.submenu.map((subItem, index) => (
            <Link
              key={index}
              href={subItem.href}
              className="block px-4 py-3 text-sm rounded-md text-gray-700 dark:text-white hover:bg-primary hover:text-white transition-all duration-200"
            >
              {subItem.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default HeaderLink;
