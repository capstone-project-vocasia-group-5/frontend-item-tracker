import React from "react";
import { Link, useNavigate } from "react-router-dom";

const PopupAvatar = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
      <ul className="py-1 px-1">
        <li>
          <Link
            to="/user"
            className="block font-extrabold text-start px-4 py-3 bg-white text-sm  text-gray-800 hover:bg-black hover:text-white transition rounded-lg"
          >
            Menu
          </Link>
        </li>
        {/* <hr className="mx-auto w-48 border-gray-300" /> */}
        <li>
          <button
            onClick={handleLogout}
            className="w-full bg-white text-start block px-4 py-2 text-sm font-medium text-black hover:bg-red-500 hover:border-red-500 hover:text-white transition border-2"
          >
            Keluar
          </button>
        </li>
      </ul>
    </div>
  );
};

export default PopupAvatar;
