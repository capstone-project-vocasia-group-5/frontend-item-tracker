import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import hook navigasi

function SendOTP() {
  const navigate = useNavigate(); // Inisialisasi navigasi

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logika pengiriman OTP bisa ditambahkan di sini
    navigate("/verifikasi-otp"); // Arahkan ke halaman verifikasi OTP
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-5">
      {/* Card Container */}
      <div className="w-96 p-8 bg-black text-white rounded-lg shadow-lg">
        {/* Logo */}
        <div className="flex items-center justify-center mb-6 space-x-3">
          <img
            src="/image/Logo.png"
            alt="ItemTrack Logo"
            className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
          />
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">ItemTrack</h1>
        </div>

        {/* Form */}
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="text-left">
            <label htmlFor="email" className="block text-sm mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full bg-white mb-4 px-4 py-2 rounded-md border text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Kirim OTP
          </button>
        </form>

        {/* Footer */}
        <div className="text-left mt-4 text-center">
          <p className="text-sm">
            Kembali ke awal?{" "}
            <a href="/login" className="text-blue-400 hover:underline">
              Masuk
            </a>
          </p>
        </div>

        {/* Information */}
        <div className="text-center mt-8 mb-4">
          <p className="text-sm">
            Masukkan alamat email anda dan kami akan mengirimkan Kode OTP untuk melakukan
            verifikasi.
          </p>
        </div>
      </div>
    </div>
  );
}

export default SendOTP;
