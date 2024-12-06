import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LogoItemTracker from "../atoms/logo-item-tracker";
import "./css/navbar.css";
export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) =>
    location.pathname === path
      ? "text-blue-700 bg-gray-100"
      : "text-primaryGrey hover:bg-gray-100";

  return (
    <nav className="bg-white dark:bg-primaryBlack sticky w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center  rtl:space-x-reverse">
          <img src="/image/logo-3.svg" className="h-10" alt="Logo" />
          <LogoItemTracker className="text-black ml-3" />
        </a>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {isLoggedIn ? (
            <div className="lg:mr-4 md:mr-4">
              <Avatar onClick={() => navigate("/updateprofile")}>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              type="button"
              className="text-white bg-primaryBlack hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Login
            </button>
          )}
          <div
            className="nav_bar"
            aria-controls="navbar-sticky"
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}
          >
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3_h"></div>
            <div className="bar4"></div>
          </div>
        </div>
        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
            isMenuOpen ? "block" : "hidden"
          }`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-primaryGrey dark:border-gray-700">
            <li>
              <a
                href="/"
                className={`block py-1 px-2 rounded-full ${isActive("/")}`}
              >
                Beranda
              </a>
            </li>
            <li>
              <a
                href="/notification"
                className={`block py-1 px-3 rounded-full ${isActive(
                  "/notification"
                )}`}
              >
                Notifikasi
              </a>
            </li>
            <li>
              <a
                href="/lost"
                className={`block py-1 px-2 rounded-full ${isActive("/lost")}`}
              >
                Kehilangan
              </a>
            </li>
            <li>
              <a
                href="/found"
                className={`block py-1 px-2 rounded-full ${isActive("/found")}`}
              >
                Penemuan
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
