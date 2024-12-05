import React, { useState, useRef } from "react";

function VerifikasiOTP() {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return; // Hanya angka yang diperbolehkan
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Pindah fokus ke input berikutnya jika ada angka
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus(); // Pindah ke input sebelumnya
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Kode OTP: ${otp.join("")}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 pd-5">
      {/* Card Container */}
      <div className="w-96 p-8 bg-black text-white rounded-lg shadow-lg">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8 space-x-3">
          <img
            src="/image/Logo.png"
            alt="ItemTrack Logo"
            className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
          />
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">ItemTrack</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="text-center mb-4">
            <h2 className="text-lg font-semibold">Masukkan kode 6 digit</h2>
            <p className="text-sm text-gray-400">
              Kode Dikirim Ke irawanade142@gmail.com 
            </p>
          </div>

          {/* OTP Inputs */}
          <div className="flex space-x-2 justify-center">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputRefs.current[index] = el)}
                maxLength={1}
                className="w-12 h-12 text-center bg-white text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              />
            ))}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Verifikasi OTP
          </button>
        </form>

        {/* Footer */}
        <div className="text-left mt-4 text-center">
          <p className="text-sm">
            Belum mendapat pesan?{" "}
            <a href="/" className="text-blue-400 hover:underline">
              Kirim ulang kode
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default VerifikasiOTP;
