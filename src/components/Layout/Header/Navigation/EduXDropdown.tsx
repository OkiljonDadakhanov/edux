"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";

const videoDarslarSubItems = [
  {
    id: 1,
    name: "Tahliliy darslar",
    href: "/lessons#tahliliy",
    icon: "solar:chart-2-bold",
    description: "Chuqur tahliliy video darslar"
  },
  {
    id: 2,
    name: "Amaliy labaratoriya",
    href: "/lessons#amaliy",
    icon: "solar:test-tube-bold",
    description: "Amaliy mashg'ulotlar va laboratoriya ishlari"
  },
];

const eduxItems = [
  {
    id: 1,
    name: "Namuna savollari",
    href: "/sample-questions",
    icon: "solar:document-text-bold",
    description: "Olimpiada savollariga o'xshash namuna savollari",
    hasSubmenu: false
  },
  {
    id: 2,
    name: "Video darslar",
    href: "/lessons",
    icon: "solar:video-frame-play-vertical-bold",
    description: "Tahliliy va chuqur video darslar",
    hasSubmenu: true
  },
  {
    id: 3,
    name: "Mentorlar jamoasi",
    href: "/#mentor",
    icon: "solar:users-group-two-rounded-bold",
    description: "Malakali mentorlar bilan tanishing",
    hasSubmenu: false
  },
  {
    id: 4,
    name: "Podkast",
    href: "/podcast",
    icon: "solar:podcast-bold",
    description: "Ta'lim va real tajriba — barchasi bir joyda",
    hasSubmenu: false
  },
];

const EduXDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVideoSubmenuOpen, setIsVideoSubmenuOpen] = useState(false);
  const closeTimeoutRef = useRef<number | null>(null);
  const videoSubmenuTimeoutRef = useRef<number | null>(null);

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
      setIsVideoSubmenuOpen(false);
    }, 150);
  };

  const handleVideoMouseEnter = () => {
    if (videoSubmenuTimeoutRef.current) {
      window.clearTimeout(videoSubmenuTimeoutRef.current);
      videoSubmenuTimeoutRef.current = null;
    }
    setIsVideoSubmenuOpen(true);
  };

  const handleVideoMouseLeave = () => {
    videoSubmenuTimeoutRef.current = window.setTimeout(() => {
      setIsVideoSubmenuOpen(false);
    }, 150);
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-center gap-1.5 px-4 py-2.5 text-sm xl:text-base font-medium text-gray-700 hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200 whitespace-nowrap cursor-pointer">
        EduX
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
      </div>

      {isOpen && (
        <div className="absolute left-0 top-full mt-3 w-80 bg-white shadow-2xl rounded-lg z-50 animate-fade-slide py-4">
          <div className="px-2">
            {eduxItems.map((item) => (
              item.hasSubmenu ? (
                <div
                  key={item.id}
                  className="relative"
                  onMouseEnter={handleVideoMouseEnter}
                  onMouseLeave={handleVideoMouseLeave}
                >
                  <div className="flex items-start gap-4 px-4 py-4 rounded-lg text-gray-700 hover:bg-primary/5 hover:text-primary transition-all duration-200 group cursor-pointer">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center transition-colors">
                      <Icon icon={item.icon} className="text-xl text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">
                        {item.name}
                      </div>
                      <div className="text-xs text-gray-500 line-clamp-1">
                        {item.description}
                      </div>
                    </div>
                    <Icon
                      icon="solar:alt-arrow-right-bold"
                      className="text-lg text-gray-400 group-hover:text-primary transition-all flex-shrink-0"
                    />
                  </div>

                  {isVideoSubmenuOpen && (
                    <div className="absolute left-full top-0 ml-2 w-72 bg-white shadow-2xl rounded-lg z-50 animate-fade-slide py-3">
                      <div className="px-2">
                        {videoDarslarSubItems.map((subItem) => (
                          <Link
                            key={subItem.id}
                            href={subItem.href}
                            className="flex items-start gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-primary/5 hover:text-primary transition-all duration-200 group"
                          >
                            <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center transition-colors">
                              <Icon icon={subItem.icon} className="text-lg text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-sm mb-0.5 group-hover:text-primary transition-colors">
                                {subItem.name}
                              </div>
                              <div className="text-xs text-gray-500 line-clamp-1">
                                {subItem.description}
                              </div>
                            </div>
                            <Icon
                              icon="solar:arrow-right-bold"
                              className="text-base text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0"
                            />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.id}
                  href={item.href}
                  className="flex items-start gap-4 px-4 py-4 rounded-lg text-gray-700 hover:bg-primary/5 hover:text-primary transition-all duration-200 group"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center transition-colors">
                    <Icon icon={item.icon} className="text-xl text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">
                      {item.name}
                    </div>
                    <div className="text-xs text-gray-500 line-clamp-1">
                      {item.description}
                    </div>
                  </div>
                  <Icon
                    icon="solar:arrow-right-bold"
                    className="text-lg text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0"
                  />
                </Link>
              )
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EduXDropdown;
