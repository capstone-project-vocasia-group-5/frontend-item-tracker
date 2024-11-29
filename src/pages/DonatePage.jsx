import React, { useState } from "react";
import { Navbar } from "../components/organisms/Navbar.jsx";
import { Footer } from "../components/organisms/Footer.jsx";

const DonationForm = () => {
  const [amount, setAmount] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    console.log({ amount, isAnonymous });
  };

  return (
    <div>
      <Navbar></Navbar>{" "}
      <div className=" flex flex-col justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md absolute left-1/2 transform -translate-x-1/2">
          <div className="bg-black text-white p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-center mb-6">Donasi Yuk</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-semibold">
                  Masukkan Nominal Donasi
                </label>
                <div className="grid grid-cols-3 gap-2 text-black">
                  {[
                    { value: "10000", label: "😊 Rp10.000" },
                    { value: "25000", label: "😍 Rp25.000" },
                    { value: "50000", label: "🥰 Rp50.000" },
                  ].map(({ value, label }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setAmount(value)}
                      className={`w-full px-3 py-2 rounded-lg text-sm ${
                        amount === value
                          ? "bg-white ring-2 ring-blue-500"
                          : "bg-white hover:bg-gray-100"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label
                  htmlFor="customAmount"
                  className="block mb-2 text-sm font-semibold"
                >
                  Nominal donasi lainnya
                </label>
                <input
                  id="customAmount"
                  type="number"
                  placeholder="Rp 0"
                  min="10000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white text-black border border-gray-300 text-sm"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Minimal donasi sebesar Rp10.000
                </p>
              </div>

              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-semibold"
                >
                  Nama
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Masukkan Nama Akun Anda"
                  className="w-full px-3 py-2 rounded-lg bg-white text-black border border-gray-300 text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-semibold"
                >
                  Email (opsional)
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Masukkan Email Anda"
                  className="w-full px-3 py-2 rounded-lg bg-white text-black border border-gray-300 text-sm"
                />
              </div>

              <div className="flex items-center">
                <input
                  id="anonymous"
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={() => setIsAnonymous(!isAnonymous)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="anonymous" className="ml-2 text-xs">
                  Sembunyikan nama saya
                </label>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full py-3 bg-white text-black text-sm font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Lanjutkan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default DonationForm;
