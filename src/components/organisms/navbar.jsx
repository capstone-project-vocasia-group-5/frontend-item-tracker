import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LogoItemTracker from "../atoms/logo-item-tracker";
import Hamburger from "../molecules/hamburger";
import ButtonBulet from "../atoms/button-bulet";
import "./css/navbar.css";
import { useAuth } from "../../context/auth-context";
import { Link } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import { useNotif } from "../../context/notif-context";
import PopupAvatar from "./pop-up-avatar";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const popupRef = useRef(null); // Tambahkan useRef untuk popup
  const navigate = useNavigate();
  const location = useLocation();
  const [isBeatLoaderVisible, setIsBeatLoaderVisible] = useState(true);

  const { user, logout } = useAuth();
  const { totalNotif } = useNotif();

  const handleClickLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsBeatLoaderVisible(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Fungsi untuk menangani klik di luar popup
  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setIsPopupOpen(false); // Tutup popup
    }
  };

  useEffect(() => {
    if (isPopupOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPopupOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
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
        <div className="flex md:order-2 justify-end space-x-3 md:space-x-0 rtl:space-x-reverse w-[130px]">
          {isBeatLoaderVisible ? (
            <div className="cursor-pointer hidden md:block">
              <Link to="/user">
                <Avatar>
                  <AvatarFallback className="text-black">
                    <BeatLoader size={6} color="#000000" />
                  </AvatarFallback>
                </Avatar>
              </Link>
            </div>
          ) : user ? (
            <div className="relative hidden md:block" ref={popupRef}>
              <Link onClick={togglePopup} className="cursor-pointer">
                <Avatar>
                  <AvatarImage src={user?.image_url} alt={user?.name[0]} />
                  <AvatarFallback className="text-black bg-white">
                    {user?.name[0]}
                  </AvatarFallback>
                </Avatar>
              </Link>
              {isPopupOpen && <PopupAvatar onLogout={handleLogout} />}
            </div>
          ) : (
            <div className="hidden md:block">
              <ButtonBulet isOnClick={() => navigate("/login")} />
            </div>
          )}

          <Hamburger isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
        </div>
        <div
          className={`items-center sticky w-full md:flex md:w-auto md:order-1 ${
            isMenuOpen ? "block" : "hidden"
          }`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-primaryGrey dark:border-gray-700">
            <li>
              <Link
                to="/"
                className={`block py-1 px-2 rounded-full ${isActive("/")}`}
              >
                Beranda
              </Link>
            </li>
            <li className="relative">
              <Link
                to="/notification"
                className={`block py-1 px-3 rounded-full ${isActive(
                  "/notification"
                )}`}
              >
                Notifikasi
              </Link>
              {totalNotif > 0 && user?.role === "user" && (
                <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalNotif > 99 ? "99+" : totalNotif}
                </span>
              )}
            </li>
            <li>
              <Link
                to="/lost"
                className={`block py-1 px-2 rounded-full ${isActive("/lost")}`}
              >
                Kehilangan
              </Link>
            </li>
            <li>
              <Link
                to="/found"
                className={`block py-1 px-2 rounded-full ${isActive("/found")}`}
              >
                Penemuan
              </Link>
            </li>

            {!user && (
              <>
                <li className="block mt-2 md:hidden bg-black rounded-full text-white">
                  <Link to="/login" className={`block py-1 px-3 rounded-full`}>
                    <span className="text-white ">Masuk</span>
                  </Link>
                </li>
                <li className="block mt-2 md:hidden bg-black rounded-full text-white">
                  <Link
                    to="/register"
                    className={`block py-1 px-3 rounded-full`}
                  >
                    <span className="text-white ">Daftar</span>
                  </Link>
                </li>
              </>
            )}
            {user && (
              <li className="block md:hidden rounded-full text-white">
                <Link
                  to="/user"
                  className={`block py-1 px-3 rounded-full ${isActive(
                    "/user"
                  )}`}
                >
                  Menu
                </Link>
              </li>
            )}
            {user && (
              <li
                onClick={handleClickLogout}
                className="block mt-2 md:hidden py-1  cursor-pointer bg-red-600 rounded-full text-white"
              >
                <span className="text-white ">Keluar</span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
