"use client";
import { useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";

const videoDarslarSubItems = [
  {
    id: 1,
    name: "Tahliliy darslar",
    href: "/lessons#tahliliy",
    icon: "solar:chart-2-bold",
  },
  {
    id: 2,
    name: "Amaliy labaratoriya",
    href: "/lessons#amaliy",
    icon: "solar:test-tube-bold",
  },
];

const eduxItems = [
  { id: 1, name: "Namuna savollari", href: "/sample-questions", icon: "solar:document-text-bold", hasSubmenu: false },
  { id: 2, name: "Video darslar", href: "/lessons", icon: "solar:video-frame-play-vertical-bold", hasSubmenu: true },
  { id: 3, name: "Bizning jamoa", href: "/#team", icon: "solar:users-group-rounded-bold", hasSubmenu: false },
  { id: 4, name: "Mentorlar jamoasi", href: "/#mentor", icon: "solar:users-group-two-rounded-bold", hasSubmenu: false },
  { id: 5, name: "Podkast", href: "/podcast", icon: "solar:podcast-bold", hasSubmenu: false },
];

const MobileEduXDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [videoSubOpen, setVideoSubOpen] = useState(false);

  return (
    <div className="w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-2 text-muted focus:outline-none"
      >
        EduX
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
          {eduxItems.map((item) =>
            item.hasSubmenu ? (
              <div key={item.id}>
                <button
                  onClick={() => setVideoSubOpen(!videoSubOpen)}
                  className="flex items-center gap-3 w-full py-2 px-2 text-sm text-gray-600 hover:text-primary rounded-md transition-colors"
                >
                  <Icon icon={item.icon} className="text-lg text-primary flex-shrink-0" />
                  <span className="flex-1 text-left">{item.name}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.2em"
                    height="1.2em"
                    className={`transition-transform duration-200 ${videoSubOpen ? "rotate-180" : ""}`}
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

                {videoSubOpen && (
                  <div className="pl-8 pb-1">
                    {videoDarslarSubItems.map((subItem) => (
                      <Link
                        key={subItem.id}
                        href={subItem.href}
                        className="flex items-center gap-2 py-2 px-2 text-sm text-gray-500 hover:text-primary rounded-md transition-colors"
                      >
                        <Icon icon={subItem.icon} className="text-base text-primary flex-shrink-0" />
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.id}
                href={item.href}
                className="flex items-center gap-3 py-2 px-2 text-sm text-gray-600 hover:text-primary rounded-md transition-colors"
              >
                <Icon icon={item.icon} className="text-lg text-primary flex-shrink-0" />
                {item.name}
              </Link>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default MobileEduXDropdown;
