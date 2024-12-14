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
            className="block px-4 py-3 bg-white text-sm font-medium text-gray-800 hover:bg-green-300 hover:text-black transition rounded-lg"
          >
            Akun
          </Link>
        </li>
        <li>
          <button
            onClick={handleLogout} 
            className="w-full bg-white block px-4 py-2 text-sm font-medium text-black hover:bg-red-500 hover:border-red-500 hover:text-white transition border-2"
          >
            Keluar
          </button>
        </li>
      </ul>
    </div>
  );
};

export default PopupAvatar;
