import React, { useState } from "react";
import { Navbar } from "../components/organisms/navbar.jsx";
import { Footer } from "../components/organisms/footer.jsx";
import { toast } from "sonner";
import { donate } from "../api/api";
import BackButton from "../components/organisms/back-button.jsx";

const DonationForm = () => {
  const [amount, setAmount] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || !name || !email) {
      toast.error("Semua kolom harus diisi dengan benar");
      return;
    }

    setLoading(true);

    try {
      const response = await donate({
        name,
        email,
        amount,
        is_anonymous: isAnonymous,
      });

      const paymentUrl = response.data.data.paymentUrl;
      if (paymentUrl) {
        window.location.href = paymentUrl;
      } else {
        toast.error("Gagal mendapatkan URL pembayaran");
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data?.errors || "Terjadi kesalahan");
      } else if (error.request) {
        toast.error(
          "Permintaan tidak dapat dikirim. Cek koneksi internet Anda."
        );
      } else {
        toast.error("Terjadi kesalahan");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClickBack = () => {
    window.history.back();
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="flex flex-col justify-center items-center max-w-screen-md mx-auto px-4">
        <div className="w-full md:mt-6 mt-4 mb-10">
          <div className="">
            <BackButton handleClickBack={handleClickBack} />
            <h1 className="text-2xl font-bold text-center mb-6">
              Donasi Sekarang
            </h1>
          </div>
          <div className="bg-black w-full mx-auto text-white p-5 rounded-lg shadow-lg">
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
                  required
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-semibold"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Masukkan Email Anda"
                  className="w-full px-3 py-2 rounded-lg bg-white text-black border border-gray-300 text-sm"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
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
                  disabled={loading}
                  className={`w-full py-3 text-sm text-black font-semibold rounded-lg ${
                    loading ? "bg-gray-300" : "bg-white hover:bg-gray-100"
                  }`}
                >
                  {loading ? "Memproses..." : "Lanjutkan"}
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
