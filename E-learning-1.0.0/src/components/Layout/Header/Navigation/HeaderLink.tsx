"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { HeaderItem } from "../../../../types/menu";
import { usePathname } from "next/navigation";

const HeaderLink: React.FC<{ item: HeaderItem }> = ({ item }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const path = usePathname();
  const [isActive, setIsActive] = useState(false);
  const [activeHash, setActiveHash] = useState("");

  // Track hash changes
  useEffect(() => {
    const handleHashChange = () => {
      setActiveHash(window.location.hash);
    };

    setActiveHash(window.location.hash);
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Active state
  useEffect(() => {
    // Check if it's home page
    if (item.href === "/" && path === "/" && !activeHash) {
      setIsActive(true);
      return;
    }

    // Check if it's a hash link
    if (item.href.includes("#")) {
      const hashPart = item.href.split("#")[1];
      if (hashPart && activeHash === `#${hashPart}`) {
        setIsActive(true);
        return;
      }
    }

    // Check if path matches
    if (path !== "/" && item.href === path) {
      setIsActive(true);
      return;
    }

    // Check submenu
    if (item.submenu && item.submenu.some((subItem) => {
      if (subItem.href.includes("#")) {
        const hashPart = subItem.href.split("#")[1];
        return hashPart && activeHash === `#${hashPart}`;
      }
      return path === subItem.href;
    })) {
      setIsActive(true);
      return;
    }

    setIsActive(false);
  }, [path, activeHash, item.href, item.submenu]);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => item.submenu && setSubmenuOpen(true)}
      onMouseLeave={() => setSubmenuOpen(false)}
    >
      {/* MAIN LINK */}
      <Link
        href={item.href}
        className={`flex items-center gap-1 text-lg relative transition-colors duration-200 ${
          isActive
            ? "text-black after:absolute after:w-8 after:h-1 after:bg-primary after:rounded-full after:-bottom-1"
            : "text-gray-600 hover:text-black"
        }`}
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
          {item.submenu.map((subItem, index) => {
            const isSubItemActive = path === subItem.href;
            return (
              <Link
                key={index}
                href={subItem.href}
                className={`
                  block px-4 py-3 text-sm rounded-md 
                  transition-all duration-200
                  ${
                    isSubItemActive
                      ? "bg-primary text-white"
                      : "text-gray-700 dark:text-white hover:bg-primary hover:text-white"
                  }
                `}
              >
                {subItem.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HeaderLink;
