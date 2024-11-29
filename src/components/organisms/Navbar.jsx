import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="https://s3-alpha-sig.figma.com/img/7244/2569/3c21baf51f584cca614cb242c632a483?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=fx62FutnSfy0Dt0y~1qovptM1O5~qVnn6JQwvmDVor-GbXkYNPtJRsQGM1tN2IuUenEsbsxx8vgSifwL27rACpszWlg-yE9gcOUHY-XKWvdcc6R8j6YBBgLiRvw3Ht2-fQct~ciJfLi7I3d5WOn-UAyCy7HoSI0~O3GOo-UGBaUgqDxTY6y2y3qBsauy6EGdkH8aqG~K7G3qw9WtVMh4heGgR7pdNArYHVlfwE8f-i7u3PuX~ySFYKyyjnWnkAoYQnSYeyGWsuHbGC0Aj1c4tlaYPKgJRDhN2pOHrbxU3-j1-c6FkWv4POY4YO7Ezbc3KktiJYRjmAUztI9zMu2IMA__"
            className="h-12"
            alt="Logo"
          />
          <span className="text-black self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            ItemTrack
          </span>
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
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-full md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
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
                className={`block py-1 px-3 rounded-full ${isActive("/")}`}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/notifikasi"
                className={`block py-1 px-3 rounded-full ${isActive(
                  "/notifikasi"
                )}`}
              >
                Notifikasi
              </a>
            </li>
            <li>
              <a
                href="/lost"
                className={`block py-1 px-3 rounded-full ${isActive("/lost")}`}
              >
                Lost
              </a>
            </li>
            <li>
              <a
                href="/found"
                className={`block py-1 px-3 rounded-full ${isActive("/found")}`}
              >
                Found
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
