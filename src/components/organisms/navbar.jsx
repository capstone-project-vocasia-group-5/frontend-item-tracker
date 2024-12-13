import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LogoItemTracker from "../atoms/logo-item-tracker";
import Hamburger from "../molecules/hamburger";
import ButtonBulet from "../atoms/button-bulet";
import "./css/navbar.css";
import { useAuth } from "../../context/auth-context";
import { Link } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [isBeatLoaderVisible, setIsBeatLoaderVisible] = useState(true);

  const { user } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsBeatLoaderVisible(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

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
          ) : user && user.role === "user" ? (
            <div className="cursor-pointer hidden md:block">
              <Link to="/user">
                <Avatar>
                  <AvatarImage src={user.image_url} alt={user.name[0]} />
                  <AvatarFallback className="text-black">
                    {user.name[0]}
                  </AvatarFallback>
                </Avatar>
              </Link>
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
            <li>
              <Link
                to="/notification"
                className={`block py-1 px-3 rounded-full ${isActive(
                  "/notification"
                )}`}
              >
                Notifikasi
              </Link>
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
              <li className="block md:hidden bg-black rounded-full text-white">
                <Link to="/login" className={`block py-1 px-3 rounded-full`}>
                  Login
                </Link>
              </li>
            )}
            {user && (
              <li className="block md:hidden rounded-full text-white">
                <Link
                  to="/profile-side"
                  className={`block py-1 px-3 rounded-full ${isActive(
                    "/profil"
                  )}`}
                >
                  Profile
                </Link>
              </li>
            )}
            {user && (
              <li className="block md:hidden rounded-full text-white">
                <Link
                  to="/login"
                  className={`block py-1 px-3 rounded-full ${isActive(
                    "/login"
                  )}`}
                >
                  Keluar
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
