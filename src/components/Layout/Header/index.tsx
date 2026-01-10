"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { headerData } from "./Navigation/menuData";
import Logo from "./Logo";
import HeaderLink from "./Navigation/HeaderLink";
import MobileHeaderLink from "./Navigation/MobileHeaderLink";
import OlimpiadalarDropdown from "./Navigation/OlimpiadalarDropdown";
import Signin from "@/components/Auth/SignIn";
import { Icon } from "@iconify/react";

const Header: React.FC = () => {
  const pathUrl = usePathname();

  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);

  const signInRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => setSticky(window.scrollY >= 80);

  const handleClickOutside = (event: MouseEvent) => {
    if (signInRef.current && !signInRef.current.contains(event.target as Node))
      setIsSignInOpen(false);

    if (
      mobileMenuRef.current &&
      !mobileMenuRef.current.contains(event.target as Node)
    )
      setNavbarOpen(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow =
      isSignInOpen || navbarOpen ? "hidden" : "";
  }, [isSignInOpen, navbarOpen]);

  return (
    <header
      className={`fixed top-0 z-40 w-full transition-all duration-300 bg-white ${
        sticky ? "shadow-lg" : ""
      }`}
    >
      {/* Top notice bar */}
      <div className="w-full bg-amber-50 border-b border-amber-200">
        <div className="container mx-auto max-w-screen-2xl px-4">
          <div className="flex items-center justify-center gap-2 py-2 text-xs sm:text-sm text-amber-800">
            <Icon icon="solar:warning-triangle-bold" className="text-base sm:text-lg" />
            <p className="font-medium text-center">
              Platforma test rejimida bepul ishlamoqda!
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-screen-2xl px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-6">
          {/* Logo */}
          <Logo />

          {/* Desktop Menu */}
          <nav className="hidden lg:flex flex-1 items-center justify-center gap-6 xl:gap-8 flex-nowrap">
            {headerData.map((item, index) => {
              if (item.label === "Olimpiadalar") {
                return <OlimpiadalarDropdown key={index} />;
              }
              return <HeaderLink key={index} item={item} />;
            })}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center gap-4 shrink-0">
            <a
              href="https://app.edux.center"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-primary text-primary px-5 py-2.5 rounded-full text-sm lg:text-base font-medium hover:bg-primary hover:text-white transition"
            >
              Kirish
            </a>
            <a
              href="https://t.me/eduxolimpbot"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-white px-5 py-2.5 rounded-full text-sm lg:text-base font-medium hover:bg-primary/90 transition flex items-center gap-2"
            >
              <Icon icon="mdi:telegram" className="text-lg" />
              Ro'yhatdan o'tish
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setNavbarOpen(true)}
            className="lg:hidden p-2 rounded-md bg-primary"
          >
            <Icon icon="mdi:menu" color="#fff" width="28" />
          </button>
        </div>
      </div>

      {/* Overlay */}
      {navbarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden"></div>
      )}

      {/* Mobile Sidebar */}
      <div
        ref={mobileMenuRef}
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-white shadow-lg transform transition-transform duration-300 lg:hidden ${
          navbarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b">
          <Logo />

          <button onClick={() => setNavbarOpen(false)}>
            <Icon icon="mdi:close" width="26" />
          </button>
        </div>

        <nav className="flex flex-col gap-4 p-5">
          {headerData.map((item, index) => (
            <MobileHeaderLink key={index} item={item} />
          ))}

          <a
            href="https://app.edux.center"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setNavbarOpen(false)}
            className="mt-4 border border-primary text-primary px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition text-center block"
          >
            Kirish
          </a>

          <a
            href="https://t.me/eduxolimpbot"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setNavbarOpen(false)}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition flex items-center justify-center gap-2"
          >
            <Icon icon="mdi:telegram" className="text-lg" />
            Ro'yhatdan o'tish
          </a>
        </nav>
      </div>

      {/* Sign In Modal */}
      {isSignInOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div
            ref={signInRef}
            className="relative w-full max-w-md bg-white rounded-xl p-8"
          >
            <button
              onClick={() => setIsSignInOpen(false)}
              className="absolute top-3 right-3"
            >
              <Icon icon="mdi:close" width="26" />
            </button>
            <Signin />
          </div>
        </div>
      )}

    </header>
  );
};

export default Header;
