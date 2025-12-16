"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { headerData } from "../Header/Navigation/menuData";
import Logo from "./Logo";
import HeaderLink from "../Header/Navigation/HeaderLink";
import MobileHeaderLink from "../Header/Navigation/MobileHeaderLink";
import OlimpiadalarDropdown from "../Header/Navigation/OlimpiadalarDropdown";
import Signin from "@/components/Auth/SignIn";
import { Icon } from "@iconify/react";

const Header: React.FC = () => {
  const pathUrl = usePathname();

  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const signInRef = useRef<HTMLDivElement>(null);
  const signUpRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => setSticky(window.scrollY >= 80);

  const handleClickOutside = (event: MouseEvent) => {
    if (signInRef.current && !signInRef.current.contains(event.target as Node))
      setIsSignInOpen(false);

    if (signUpRef.current && !signUpRef.current.contains(event.target as Node))
      setIsSignUpOpen(false);

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
      isSignInOpen || isSignUpOpen || navbarOpen ? "hidden" : "";
  }, [isSignInOpen, isSignUpOpen, navbarOpen]);

  return (
    <header
      className={`fixed top-0 z-40 w-full transition-all duration-300 bg-white ${
        sticky ? "shadow-lg py-4" : "py-6"
      }`}
    >
      <div className="container mx-auto max-w-screen-xl px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center gap-10">
            {headerData.map((item, index) => {
              if (item.label === "Olimpiadalar") {
                return <OlimpiadalarDropdown key={index} />;
              }
              return <HeaderLink key={index} item={item} />;
            })}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center gap-5">
            <button
              onClick={() => setIsSignInOpen(true)}
              className="bg-primary text-white px-6 py-3 rounded-full text-base font-medium hover:bg-primary/20 hover:text-primary transition"
            >
              Kirish
            </button>

        
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

          <button
            onClick={() => {
              setIsSignInOpen(true);
              setNavbarOpen(false);
            }}
            className="mt-4 border border-primary text-primary px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition"
          >
            Kirish
          </button>

          <button
            onClick={() => {
              setIsSignUpOpen(true);
              setNavbarOpen(false);
            }}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition"
          >
            Ro'yxatdan o'tish
          </button>
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

      {/* Sign Up Modal */}
      {isSignUpOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div
            ref={signUpRef}
            className="relative w-full max-w-md bg-white rounded-xl p-8"
          >
            <button
              onClick={() => setIsSignUpOpen(false)}
              className="absolute top-3 right-3"
            >
              <Icon icon="mdi:close" width="26" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
