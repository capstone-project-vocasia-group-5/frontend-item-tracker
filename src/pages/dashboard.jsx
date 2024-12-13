import { useSidebar } from "@/components/ui/sidebar";
import React, { useEffect, useState } from "react";
import { getTotalAmountDonations } from "../api/api";
import { getAllUsers, getAllItemsByAdmin, getAllCategories } from "../api/api";
import Preloader from "../components/templates/preloader/preloader";

function Dashboard() {
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const { setActiveMenu } = useSidebar();
  const [totalFoundItems, setTotalFoundItems] = useState(0);
  const [totalLostItems, setTotalLostItems] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [totalMatched, setTotalMatched] = useState(0);
  const [loading, setLoading] = useState(true);

  // SEMUA BARANG YANG DITEMUKAN
  useEffect(() => {
    const fetchTotalFoundItems = async () => {
      try {
        const response = await getAllItemsByAdmin();
        const foundItems =
          response.data?.data?.items?.filter((item) => item.type === "found") ||
          [];
        setTotalFoundItems(foundItems.length);
      } catch (error) {
        console.error("Failed to fetch items:", error.message);
      }
    };

    fetchTotalFoundItems();
  }, []);

  // SEMUA BARANG YANG SUDAH KEMBALI
  useEffect(() => {
    const fetchTotalMatched = async () => {
      try {
        const response = await getAllItemsByAdmin();
        const totalMatched =
          response.data?.data?.items?.filter(
            (item) => item.matched_status === "true"
          ) || [];
        setTotalMatched(totalMatched.length);
      } catch (error) {
        console.error("Failed to fetch items:", error.message);
      }
    };

    fetchTotalMatched();
  }, []);

  // SENUA BARANG YANG HILANG
  useEffect(() => {
    const fetchTotalLostItems = async () => {
      try {
        const response = await getAllItemsByAdmin();
        const lostItems =
          response.data?.data?.items?.filter((item) => item.type === "lost") ||
          [];
        setTotalLostItems(lostItems.length);
      } catch (error) {
        console.error("Failed to fetch items:", error.message);
      }
    };

    fetchTotalLostItems();
  }, []);

  // TOTAL DONASI
  useEffect(() => {
    const fetchTotalDonations = async () => {
      try {
        const response = await getTotalAmountDonations();
        const amount = response.data?.data?.totalAmount?.[0]?.totalAmount || 0;
        setTotalAmount(amount);
      } catch (error) {
        console.error("Error fetching total amount donations:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTotalDonations();
  }, []);

  //  TOTAL PENGGUNA
  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const response = await getAllUsers();
        const totalUsers = response.data?.data?.users?.length || 0;
        setTotalUsers(totalUsers);
      } catch (error) {
        console.error("Failed to fetch total users:", error.message);
      }
    };

    fetchTotalUsers();
  }, []);

  // TOTAL KATEGORI
  useEffect(() => {
    const fetchTotalCategories = async () => {
      try {
        const response = await getAllCategories();
        const totalCategories = response.data?.data?.categories?.length || 0;
        setTotalCategories(totalCategories);
      } catch (error) {
        console.error("Failed to fetch total Categories:", error.message);
      }
    };

    fetchTotalCategories();
  }, []);

  const handleCardClick = (menuTitle) => {
    setActiveMenu(menuTitle);
  };

  return (
    <div className="p-8">
      {loading && <Preloader />}
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card Semua Pengguna */}
        <div
          className="bg-black text-white rounded-md shadow-md cursor-pointer"
          onClick={() => handleCardClick("Manajemen Akun")}
        >
          <div className="p-6">
            {" "}
            <h2 className="text-4xl font-bold">
              {" "}
              {totalUsers.toLocaleString()}
            </h2>
            <p className="mt-2">Semua Pengguna</p>
          </div>

          <button className="w-full bg-[#1A1A1A] rounded-t-none bottom-0">
            Lihat Detail
          </button>
        </div>

        {/* Card Semua Barang Hilang */}
        <div
          className="bg-black text-white rounded-md shadow-md cursor-pointer"
          onClick={() => handleCardClick("Manajemen Barang Hilang")}
        >
          <div className="p-6">
            {" "}
            <h2 className="text-4xl font-bold">
              {" "}
              {totalLostItems.toLocaleString()}{" "}
            </h2>
            <p className="mt-2 ">Semua Barang Hilang</p>
          </div>

          <button className="w-full bg-[#1A1A1A] rounded-t-none bottom-0">
            Lihat Detail
          </button>
        </div>

        {/* Card Semua Penemuan Barang */}
        <div
          className="bg-black text-white rounded-md shadow-md cursor-pointer"
          onClick={() => handleCardClick("Manajemen Penemuan Barang")}
        >
          <div className="p-6">
            {" "}
            <h2 className="text-4xl font-bold">
              {totalFoundItems.toLocaleString()}
            </h2>
            <p className="mt-2">Semua Penemuan Barang</p>
          </div>

          <button className="w-full bg-[#1A1A1A] rounded-t-none bottom-0">
            Lihat Detail
          </button>
        </div>

        {/* Card Semua Kategori */}
        <div
          className="bg-black text-white  rounded-md shadow-md cursor-pointer"
          onClick={() => handleCardClick("Manajemen Kategori")}
        >
          <div className="p-6">
            {" "}
            <h2 className="text-4xl font-bold">
              {" "}
              {totalCategories.toLocaleString()}
            </h2>
            <p className="mt-2">Semua Kategori</p>
          </div>

          <button className="w-full bg-[#1A1A1A] rounded-t-none bottom-0">
            Lihat Detail
          </button>
        </div>

        {/* Card Semua Barang yang Telah Kembali */}
        <div
          className="bg-black text-white rounded-md shadow-md cursor-pointer"
          onClick={() => handleCardClick("Barang Telah Kembali")}
        >
          <div className="p-6">
            {" "}
            <h2 className="text-4xl font-bold">
              {" "}
              {totalMatched.toLocaleString()}
            </h2>
            <p className="mt-2">Semua Barang Yang Telah Kembali</p>
          </div>

          <button className="w-full bg-[#1A1A1A] rounded-t-none bottom-0">
            Lihat Detail
          </button>
        </div>

        {/* Card Jumlah Donasi */}

        <div
          className="bg-black text-white rounded-md shadow-md cursor-pointer"
          onClick={() => handleCardClick("Jumlah Donasi")}
        >
          <div className="p-6">
            <h2 className="text-4xl font-bold flex flex-wrap justify-center">
              {totalAmount.toLocaleString()}
            </h2>
            <p className="mt-2">Jumlah Donasi</p>
          </div>
          <button className="w-full bg-[#1A1A1A] rounded-t-none bottom-0">
            Lihat Detail{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
