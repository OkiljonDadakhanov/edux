"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { headerData } from "./Navigation/menuData";
import Logo from "./Logo";
import HeaderLink from "./Navigation/HeaderLink";
import MobileHeaderLink from "./Navigation/MobileHeaderLink";
import EduXDropdown from "./Navigation/EduXDropdown";
import MobileEduXDropdown from "./Navigation/MobileEduXDropdown";
import Signin from "@/components/Auth/SignIn";
import { Icon } from "@iconify/react";

const TELEGRAM_BOT_URL = "https://t.me/eduxolimpbot";

const RegisterCTA = () => (
    <a
        href={TELEGRAM_BOT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-white transition hover:bg-secondary/90"
    >
        <Icon icon="mdi:telegram" className="text-lg" />
        Ro'yxatdan o'tish
    </a>
);
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
      className={`fixed top-0 z-40 w-full transition-all duration-300 bg-white border-b border-gray-100 ${
        sticky ? "shadow-md" : "shadow-sm"
      }`}
    >
      <div className="container mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo - Left Side */}
          <div className="flex-shrink-0 flex items-center">
            <Logo />
          </div>

          {/* Desktop Menu - Center */}
          <nav className="hidden lg:flex items-center justify-center flex-1 px-8">
            <div className="flex items-center gap-1 xl:gap-2">
              {headerData.map((item, index) => {
                if (item.label === "EduX") {
                  return <EduXDropdown key={index} />;
                }
                return <HeaderLink key={index} item={item} />;
              })}
            </div>
          </nav>
          

          {/* Desktop Auth Buttons - Right Side */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
          <div className="flex flex-wrap items-center gap-4 pt-1">
                                    <RegisterCTA />
                                </div>
            <a
              href="https://app.edux.center"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-primary text-primary px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-primary hover:text-white transition-all duration-200 whitespace-nowrap shadow-sm hover:shadow-md"
            >
              Kirish
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setNavbarOpen(true)}
            className="lg:hidden p-2.5 rounded-lg bg-primary hover:bg-primary/90 transition-colors flex-shrink-0"
            aria-label="Open menu"
          >
            <Icon icon="mdi:menu" color="#fff" width="24" height="24" />
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
          {headerData.map((item, index) => {
            if (item.label === "EduX") {
              return <MobileEduXDropdown key={index} />;
            }
            return <MobileHeaderLink key={index} item={item} />;
          })}
            <div className="flex flex-wrap items-center gap-4 pt-1">
                                    <RegisterCTA />
                                </div>

          <a
            href="https://app.edux.center"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setNavbarOpen(false)}
            className="mt-4 border border-primary text-primary px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition text-center block"
          >
            Kirish
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
