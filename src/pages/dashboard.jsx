import { useSidebar } from "@/components/ui/sidebar";
import React, { useEffect, useState } from "react";
import { getTotalAmountDonations } from "../api/api";

function Dashboard() {
  const [totalAmount, setTotalAmount] = useState(0);
  const [error, setError] = useState(null);
  const { setActiveMenu } = useSidebar();

  const handleCardClick = (menuTitle) => {
    setActiveMenu(menuTitle);
  };

  useEffect(() => {
    const fetchTotalDonations = async () => {
      try {
        const response = await getTotalAmountDonations();
        const total = response.data.data.totalAmount.totalAmount || 0;
        setTotalAmount(total);
      } catch (error) {
        console.error("Error fetching total donations:", error);
        setError(error.message || "Error fetching total donations");
      } finally {
      }
    };

    fetchTotalDonations();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 gap-6">
        {/* Card Semua Pengguna */}
        <div
          className="bg-black text-white rounded-md shadow-md cursor-pointer"
          onClick={() => handleCardClick("Manajemen Akun")}
        >
          <div className="p-6">
            {" "}
            <h2 className="text-4xl font-bold">100</h2>
            <p className="mt-2">Semua Pengguna</p>
          </div>

          <button className="w-full rounded-t-none">Lihat Detail</button>
        </div>

        {/* Card Semua Barang Hilang */}
        <div
          className="bg-black text-white rounded-md shadow-md cursor-pointer"
          onClick={() => handleCardClick("Manajemen Barang Hilang")}
        >
          <div className="p-6">
            {" "}
            <h2 className="text-4xl font-bold">100</h2>
            <p className="mt-2">Semua Barang Hilang</p>
          </div>

          <button className="w-full rounded-t-none">Lihat Detail</button>
        </div>

        {/* Card Semua Penemuan Barang */}
        <div
          className="bg-black text-white rounded-md shadow-md cursor-pointer"
          onClick={() => handleCardClick("Manajemen Penemuan Barang")}
        >
          <div className="p-6">
            {" "}
            <h2 className="text-4xl font-bold">100</h2>
            <p className="mt-2">Semua Penemuan Barang</p>
          </div>

          <button className="w-full rounded-t-none">Lihat Detail</button>
        </div>

        {/* Card Semua Kategori */}
        <div
          className="bg-black text-white  rounded-md shadow-md cursor-pointer"
          onClick={() => handleCardClick("Manajemen Kategori")}
        >
          <div className="p-6">
            {" "}
            <h2 className="text-4xl font-bold">100</h2>
            <p className="mt-2">Semua Kategori</p>
          </div>

          <button className="w-full rounded-t-none">Lihat Detail</button>
        </div>

        {/* Card Semua Barang yang Telah Kembali */}
        <div
          className="bg-black text-white rounded-md shadow-md cursor-pointer"
          onClick={() => handleCardClick("Barang Telah Kembali")}
        >
          <div className="p-6">
            {" "}
            <h2 className="text-4xl font-bold">100</h2>
            <p className="mt-2">Semua Barang Yang Telah Kembali</p>
          </div>

          <button className="w-full rounded-t-none">Lihat Detail</button>
        </div>

        {/* Card Jumlah Donasi */}

        <div
          className="bg-black text-white rounded-md shadow-md cursor-pointer"
          onClick={() => handleCardClick("Jumlah Donasi")}
        >
          <div className="p-6">
            <h2 className="text-4xl font-bold">{totalAmount}</h2>
            <p className="mt-2">Jumlah Donasi</p>
          </div>
          <button className="w-full rounded-t-none">Lihat Detail </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
