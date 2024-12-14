import React from "react";
import { Link, useNavigate } from "react-router-dom";

const PopupAvatar = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleAkun = () => {
    onLogout(); 
    navigate("/user"); 
  };

  const handleLogout = () => {
    onLogout(); 
    navigate("/"); 
  };

  return (
    <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
      <ul className="py-1 px-1">
        <button
            onClick={handleAkun} 
            className="w-full bg-white block px-4 py-2 text-sm font-medium text-black hover:bg-blue-500 hover:border-blue-500 hover:text-white transition border-2"
          >
            Akun
        </button>
        <hr className=" w-48 mx-auto border-slate-300" />
        <button
            onClick={handleLogout} 
            className="w-full bg-white block px-4 py-2 text-sm font-medium text-black hover:bg-red-500 hover:border-red-500 hover:text-white transition border-2"
          >
            Keluar
        </button>
      </ul>
    </div>
  );
};

export default PopupAvatar;
