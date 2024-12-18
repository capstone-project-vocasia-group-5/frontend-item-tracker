import React, { useEffect, useState, useRef } from "react";
import {
  getAllClaimsByUser,
  approveClaimByUser,
  rejectClaimByUser,
  deleteClaimByUser,
} from "../api/api";
import { toast } from "sonner";
import Popup from "../components/molecules/Popup";
import Preloader from "../components/templates/preloader/preloader";
import { useAuth } from "../context/auth-context";
import { PaginationDisplay } from "../components/molecules/pagination.jsx";

const ManagePengajuan = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const actionMenuRef = useRef(null);
  const [pengajuanSaya, setPengajuanSaya] = useState([]);
  const [pengajuanOrangLain, setPengajuanOrangLain] = useState([]);
  const [selectedClaim, setSelectedClaim] = useState(null);
  const { user } = useAuth();
  const [actionMenuOpen, setActionMenuOpen] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [currentClaimId, setCurrentClaimId] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Set the number of items per page

  const openModal = (claimId) => {
    setCurrentClaimId(claimId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setReason("");
    setCurrentClaimId(null);
    setIsModalOpen(false);
  };

  const handleRejectClaim = async () => {
    if (!reason) {
      toast.error("Alasan penolakan harus diisi!");
      return;
    }

    try {
      const response = await rejectClaimByUser(currentClaimId, {
        messages: reason,
      });
      if (response.status === 200) {
        toast.success(response?.data?.data?.message || "Pengajuan ditolak");
        closeModal();
        fetchClaims();
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data?.errors || "Terjadi kesalahan");
      } else {
        toast.error("Terjadi kesalahan");
      }
    }
  };

  const handleDelete = (id) => {
    try {
      deleteClaimByUser(id);
      toast.success("Pengajuan berhasil dihapus");
      fetchClaims();
    } catch (error) {
      toast.error("Gagal menghapus pengajuan");
    }
  };

  const handleClickHubungi = (phone_number) => {
    if (phone_number) {
      const url = `https://wa.me/${phone_number}`;
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      toast.error("Nomor telepon tidak tersedia");
    }
  };

  const handleApproveClaim = async (claimId) => {
    try {
      const response = await approveClaimByUser(claimId);
      toast.success(response?.data?.data?.message || "Pengajuan disetujui");
      fetchClaims();
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data?.errors || "Terjadi kesalahan");
      } else {
        toast.error("Terjadi kesalahan");
      }
    }
  };

  const handleClickDetail = (claim) => {
    setSelectedClaim(claim);
  };

  const handleClosePopup = () => {
    setSelectedClaim(null);
  };

  const fetchClaims = async () => {
    try {
      const response = await getAllClaimsByUser();
      const claims = response.data.data.claims;
      setPengajuanSaya(claims.filter((claim) => claim.user_id.id === user?.id));
      setPengajuanOrangLain(
        claims.filter((claim) => claim.user_id.id !== user?.id)
      );
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching claims:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClaims();
  }, []);

  const toggleActionMenu = (id) => {
    setActionMenuOpen((prev) => (prev === id ? null : id));
  };

  const closeActionMenu = () => {
    setActionMenuOpen(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        actionMenuRef.current &&
        !actionMenuRef.current.contains(event.target)
      ) {
        closeActionMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (type) => {
    setFilter(type);
  };
  // Filtered data based on the selected filter
  const getFilteredData = (data) => {
    return data.filter(
      (item) =>
        item?.user_id?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item?.item_id?.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const dataToDisplay =
    filter === "saya"
      ? getFilteredData(pengajuanSaya)
      : getFilteredData(pengajuanOrangLain);

  // Calculate total items based on filtered data
  const totalItems = dataToDisplay.length;

  // Calculate the current items to display based on pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dataToDisplay.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      {isLoading && <Preloader />}
      <div className="min-h-screen flex flex-col">
        <div className="md:p-4">
          <header className="bg-white shadow-sm p-4 justify-between text-left">
            <h1 className="text-xl font-bold my-3">
              Manajemen Pengajuan Barang
            </h1>
            <p className="text-gray-400">
              Pantau pengajuan Anda terhadap barang hilang, serta lihat
              pengajuan orang lain terhadap barang temuan yang telah Anda
              laporkan.
            </p>
          </header>
          <div className="bg-white shadow-md rounded-md overflow-hidden min-h-screen">
            {/* Search Bar */}
            <form className="max-w-lg mx-auto">
              <div className="p-5">
                <div className="flex border rounded-md">
                  <input
                    type="search"
                    id="search-bar"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-l-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search items..."
                    required
                  />
                  <button
                    type="submit"
                    className="p-2.5 text-white bg-primaryBlack rounded-r-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
                  >
                    <svg
                      className="w-4 h-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </form>

            {/* Filter by Pengajuan */}
            <div className="flex justify-between p-4">
              <label className="relative inline-block h-8 w-14 cursor-pointer rounded-full bg-gray-500 transition [-webkit-tap-highlight-color:_transparent]">
                <input
                  className="peer sr-only"
                  type="checkbox"
                  checked={filter === "lain"}
                  onChange={() =>
                    handleFilterChange(filter === "saya" ? "lain" : "saya")
                  }
                />
                <span className="absolute inset-y-0 start-0 m-1 size-6 rounded-full bg-gray-700 ring-[6px] ring-inset ring-white transition-all peer-checked:start-8 peer-checked:w-2 peer-checked:bg-black peer-checked:ring-transparent"></span>
              </label>
              <span className="ml-2 text-lg">
                {filter === "saya" ? "Pengajuan Saya" : "Pengajuan Orang Lain"}
              </span>
            </div>

            {/* Table */}
            <div className="px-4 md:px-9 overflow-hidden min-h-screen">
              <table className="w-full bg-white rounded-full">
                <thead className="bg-black text-white rounded-full">
                  <tr>
                    <th className="p-4 text-center">Nama</th>
                    <th className="p-4  text-center">Nama Barang</th>
                    <th className="p-4 hidden md:block text-center">Status</th>
                    <th className="p-4 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-500 text-center">
                  {dataToDisplay.map((item) => (
                    <tr key={item.id}>
                      <td className="p-4">
                        {item?.user_id?.name
                          ? item.user_id.name
                          : item?.to_user?.id?.name}
                      </td>
                      <td className="p-4 ">{item?.item_id?.name}</td>
                      <td className="p-4 hidden md:block ">
                        {item?.is_approved === null ? (
                          <span className="text-yellow-500">Menunggu</span>
                        ) : item?.is_approved ? (
                          <span className="text-green-500">Disetujui</span>
                        ) : (
                          <span className="text-red-500">Ditolak</span>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex justify-center items-center space-x-2">
                          {/* Tombol Aksi (Full view) */}
                          <div className="hidden md:flex space-x-2">
                            {filter === "saya" ? (
                              <>
                                <button
                                  onClick={() => handleClickDetail(item)}
                                  className="p-2 bg-gray-800 text-white rounded hover:bg-gray-600 flex items-center justify-center"
                                >
                                  <div
                                    className="flex items-center justify-center cursor-pointer rounded-md font-medium relative z-[9999999999] data-[tooltip]:after:content-[attr(data-tooltip)] data-[tooltip]:after:mr-2 data-[tooltip]:after:text-sm data-[tooltip]:after:invisible data-[tooltip]:after:scale-50 data-[tooltip]:after:origin-right data-[tooltip]:after:opacity-0 hover:data-[tooltip]:after:visible hover:data-[tooltip]:after:opacity-100 hover:data-[tooltip]:after:scale-100 data-[tooltip]:after:transition-all data-[tooltip]:after:absolute data-[tooltip]:after:bg-white data-[tooltip]:after:top-1/2 data-[tooltip]:after:right-[calc(100%+4px)] data-[tooltip]:after:-translate-y-1/2 data-[tooltip]:after:-z-[1] data-[tooltip]:after:px-2.5 data-[tooltip]:after:py-1 data-[tooltip]:after:min-h-fit data-[tooltip]:after:min-w-fit data-[tooltip]:after:rounded-md data-[tooltip]:after:drop-shadow data-[tooltip]:before:mr-2 data-[tooltip]:before:drop-shadow data-[tooltip]:after:text-center data-[tooltip]:after:text-zinc-800 data-[tooltip]:after:whitespace-nowrap data-[tooltip]:after:text-[10px] data-[tooltip]:before:invisible data-[tooltip]:before:opacity-0 hover:data-[tooltip]:before:visible hover:data-[tooltip]:before:opacity-100 data-[tooltip]:before:transition-all data-[tooltip]:before:bg-white data-[tooltip]:before:[clip-path:polygon(100%_50%,0_0,0_100%)] data-[tooltip]:before:absolute data-[tooltip]:before:top-1/2 data-[tooltip]:before:right-full data-[tooltip]:before:-translate-y-1/2 data-[tooltip]:before:z-0 data-[tooltip]:before:w-[4px] data-[tooltip]:before:h-3"
                                    data-tooltip="Lihat Detail"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                      fill="currentColor"
                                      className="w-5 h-5"
                                    >
                                      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                      <path
                                        fillRule="evenodd"
                                        d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  </div>
                                </button>
                                {item.is_approved === null && (
                                  <button
                                    onClick={() => handleDelete(item.id)}
                                    className="p-2 bg-red-500 text-white rounded hover:bg-red-600 flex items-center justify-center"
                                  >
                                    <div
                                      className="flex items-center justify-center cursor-pointer rounded-md font-medium relative z-[9999999999] data-[tooltip]:after:content-[attr(data-tooltip)] data-[tooltip]:after:ml-2 data-[tooltip]:after:text-sm data-[tooltip]:after:invisible data-[tooltip]:after:scale-50 data-[tooltip]:after:origin-left data-[tooltip]:after:opacity-0 hover:data-[tooltip]:after:visible hover:data-[tooltip]:after:opacity-100 hover:data-[tooltip]:after:scale-100 data-[tooltip]:after:transition-all data-[tooltip]:after:absolute data-[tooltip]:after:bg-white data-[tooltip]:after:top-1/2 data-[tooltip]:after:left-[calc(100%+4px)] data-[tooltip]:after:-translate-y-1/2 data-[tooltip]:after:-z-[1] data-[tooltip]:after:px-2.5 data-[tooltip]:after:py-1 data-[tooltip]:after:min-h-fit data-[tooltip]:after:min-w-fit data-[tooltip]:after:rounded-md data-[tooltip]:after:drop-shadow data-[tooltip]:before:ml-2 data-[tooltip]:before:drop-shadow data-[tooltip]:after:text-center data-[tooltip]:after:text-zinc-800 data-[tooltip]:after:whitespace-nowrap data-[tooltip]:after:text-[10px] data-[tooltip]:before:invisible data-[tooltip]:before:opacity-0 hover:data-[tooltip]:before:visible hover:data-[tooltip]:before:opacity-100 data-[tooltip]:before:transition-all data-[tooltip]:before:bg-white data-[tooltip]:before:[clip-path:polygon(0_50%,100%_0,100%_100%)] data-[tooltip]:before:absolute data-[tooltip]:before:top-1/2 data-[tooltip]:before:left-full data-[tooltip]:before:-translate-y-1/2 data-[tooltip]:before:z-0 data-[tooltip]:before:w-[4px] data-[tooltip]:before:h-3"
                                      data-tooltip="Hapus"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-5 h-5"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                    </div>
                                  </button>
                                )}
                              </>
                            ) : item.is_approved === true ? (
                              <>
                                <button
                                  onClick={() => handleClickDetail(item)}
                                  className="p-2 bg-gray-800 text-white rounded hover:bg-gray-600 flex items-center justify-center"
                                >
                                  <div
                                    className="flex items-center justify-center cursor-pointer rounded-md font-medium relative z-[9999999999] data-[tooltip]:after:content-[attr(data-tooltip)] data-[tooltip]:after:ml-2 data-[tooltip]:after:text-sm data-[tooltip]:after:invisible data-[tooltip]:after:scale-50 data-[tooltip]:after:origin-left data-[tooltip]:after:opacity-0 hover:data-[tooltip]:after:visible hover:data-[tooltip]:after:opacity-100 hover:data-[tooltip]:after:scale-100 data-[tooltip]:after:transition-all data-[tooltip]:after:absolute data-[tooltip]:after:bg-white data-[tooltip]:after:top-1/2 data-[tooltip]:after:left-[calc(100%+4px)] data-[tooltip]:after:-translate-y-1/2 data-[tooltip]:after:-z-[1] data-[tooltip]:after:px-2.5 data-[tooltip]:after:py-1 data-[tooltip]:after:min-h-fit data-[tooltip]:after:min-w-fit data-[tooltip]:after:rounded-md data-[tooltip]:after:drop-shadow data-[tooltip]:before:ml-2 data-[tooltip]:before:drop-shadow data-[tooltip]:after:text-center data-[tooltip]:after:text-zinc-800 data-[tooltip]:after:whitespace-nowrap data-[tooltip]:after:text-[10px] data-[tooltip]:before:invisible data-[tooltip]:before:opacity-0 hover:data-[tooltip]:before:visible hover:data-[tooltip]:before:opacity-100 data-[tooltip]:before:transition-all data-[tooltip]:before:bg-white data-[tooltip]:before:[clip-path:polygon(0_50%,100%_0,100%_100%)] data-[tooltip]:before:absolute data-[tooltip]:before:top-1/2 data-[tooltip]:before:left-full data-[tooltip]:before:-translate-y-1/2 data-[tooltip]:before:z-0 data-[tooltip]:before:w-[4px] data-[tooltip]:before:h-3"
                                    data-tooltip="Lihat Detail"
                                  >
                                    {" "}
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                      fill="currentColor"
                                      className="w-5 h-5"
                                    >
                                      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                      <path
                                        fillRule="evenodd"
                                        d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  </div>
                                </button>
                                <button
                                  onClick={() =>
                                    handleClickHubungi(
                                      item.user_id.phone_number
                                    )
                                  }
                                  className="p-2 bg-green-500 text-white rounded hover:bg-green-400 flex items-center justify-center"
                                >
                                  <div
                                    className="flex items-center justify-center cursor-pointer rounded-md font-medium relative z-[9999999999] data-[tooltip]:after:content-[attr(data-tooltip)] data-[tooltip]:after:mt-2 data-[tooltip]:after:text-sm data-[tooltip]:after:invisible data-[tooltip]:after:scale-50 data-[tooltip]:after:origin-top data-[tooltip]:after:opacity-0 hover:data-[tooltip]:after:visible hover:data-[tooltip]:after:opacity-100 hover:data-[tooltip]:after:scale-100 data-[tooltip]:after:transition-all data-[tooltip]:after:absolute data-[tooltip]:after:bg-white data-[tooltip]:after:top-[calc(100%+4px)] data-[tooltip]:after:left-1/2 data-[tooltip]:after:-translate-x-1/2 data-[tooltip]:after:-z-[1] data-[tooltip]:after:px-2.5 data-[tooltip]:after:py-1 data-[tooltip]:after:min-h-fit data-[tooltip]:after:min-w-fit data-[tooltip]:after:rounded-md data-[tooltip]:after:drop-shadow data-[tooltip]:before:mt-2 data-[tooltip]:before:drop-shadow data-[tooltip]:after:text-center data-[tooltip]:after:text-zinc-800 data-[tooltip]:after:whitespace-nowrap data-[tooltip]:after:text-[10px] data-[tooltip]:before:invisible data-[tooltip]:before:opacity-0 hover:data-[tooltip]:before:visible hover:data-[tooltip]:before:opacity-100 data-[tooltip]:before:transition-all data-[tooltip]:before:bg-white data-[tooltip]:before:[clip-path:polygon(50%_0,0_100%,100%_100%)] data-[tooltip]:before:absolute data-[tooltip]:before:top-full data-[tooltip]:before:left-1/2 data-[tooltip]:before:-translate-x-1/2 data-[tooltip]:before:z-0 data-[tooltip]:before:w-3 data-[tooltip]:before:h-[4px]"
                                    data-tooltip="Hubungi"
                                  >
                                    {" "}
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                      fill="currentColor"
                                      className="w-5 h-5"
                                    >
                                      <path
                                        d="M6.014 8.00613C6.12827 7.1024 7.30277 5.87414 8.23488 6.01043L8.23339 6.00894C9.14051 6.18132 9.85859 7.74261 10.2635 8.44465C10.5504 8.95402 10.3641 9.4701 10.0965 9.68787C9.7355 9.97883 9.17099 10.3803 9.28943 10.7834C9.5 11.5 12 14 13.2296 14.7107C13.695 14.9797 14.0325 14.2702 14.3207 13.9067C14.5301 13.6271 15.0466 13.46 15.5548 13.736C16.3138 14.178 17.0288 14.6917 17.69 15.27C18.0202 15.546 18.0977 15.9539 17.8689 16.385C17.4659 17.1443 16.3003 18.1456 15.4542 17.9421C13.9764 17.5868 8 15.27 6.08033 8.55801C5.97237 8.24048 5.99955 8.12044 6.014 8.00613Z"
                                        fill="#ffffff"
                                      />
                                      <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M12 23C10.7764 23 10.0994 22.8687 9 22.5L6.89443 23.5528C5.56462 24.2177 4 23.2507 4 21.7639V19.5C1.84655 17.492 1 15.1767 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23ZM6 18.6303L5.36395 18.0372C3.69087 16.4772 3 14.7331 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C11.0143 21 10.552 20.911 9.63595 20.6038L8.84847 20.3397L6 21.7639V18.6303Z"
                                        fill="#ffffff"
                                      />
                                    </svg>
                                  </div>
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  onClick={() => handleClickDetail(item)}
                                  className="p-2 bg-gray-800 text-white rounded hover:bg-gray-600 flex items-center justify-center"
                                >
                                  <div
                                    className="flex items-center justify-center cursor-pointer rounded-md font-medium relative z-[9999999999] data-[tooltip]:after:content-[attr(data-tooltip)] data-[tooltip]:after:mt-2 data-[tooltip]:after:text-sm data-[tooltip]:after:invisible data-[tooltip]:after:scale-50 data-[tooltip]:after:origin-top data-[tooltip]:after:opacity-0 hover:data-[tooltip]:after:visible hover:data-[tooltip]:after:opacity-100 hover:data-[tooltip]:after:scale-100 data-[tooltip]:after:transition-all data-[tooltip]:after:absolute data-[tooltip]:after:bg-white data-[tooltip]:after:top-[calc(100%+4px)] data-[tooltip]:after:left-1/2 data-[tooltip]:after:-translate-x-1/2 data-[tooltip]:after:-z-[1] data-[tooltip]:after:px-2.5 data-[tooltip]:after:py-1 data-[tooltip]:after:min-h-fit data-[tooltip]:after:min-w-fit data-[tooltip]:after:rounded-md data-[tooltip]:after:drop-shadow data-[tooltip]:before:mt-2 data-[tooltip]:before:drop-shadow data-[tooltip]:after:text-center data-[tooltip]:after:text-zinc-800 data-[tooltip]:after:whitespace-nowrap data-[tooltip]:after:text-[10px] data-[tooltip]:before:invisible data-[tooltip]:before:opacity-0 hover:data-[tooltip]:before:visible hover:data-[tooltip]:before:opacity-100 data-[tooltip]:before:transition-all data-[tooltip]:before:bg-white data-[tooltip]:before:[clip-path:polygon(50%_0,0_100%,100%_100%)] data-[tooltip]:before:absolute data-[tooltip]:before:top-full data-[tooltip]:before:left-1/2 data-[tooltip]:before:-translate-x-1/2 data-[tooltip]:before:z-0 data-[tooltip]:before:w-3 data-[tooltip]:before:h-[4px]"
                                    data-tooltip="Lihat Detail"
                                  >
                                    {" "}
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                      fill="currentColor"
                                      className="w-5 h-5"
                                    >
                                      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                      <path
                                        fillRule="evenodd"
                                        d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  </div>
                                </button>
                                {item.is_approved === null && (
                                  <>
                                    <button
                                      onClick={() =>
                                        handleApproveClaim(item.id)
                                      }
                                      className="p-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center justify-center"
                                    >
                                      <div
                                        className="flex items-center justify-center cursor-pointer rounded-md font-medium relative z-[9999999999] data-[tooltip]:after:content-[attr(data-tooltip)] data-[tooltip]:after:mt-2 data-[tooltip]:after:text-sm data-[tooltip]:after:invisible data-[tooltip]:after:scale-50 data-[tooltip]:after:origin-top data-[tooltip]:after:opacity-0 hover:data-[tooltip]:after:visible hover:data-[tooltip]:after:opacity-100 hover:data-[tooltip]:after:scale-100 data-[tooltip]:after:transition-all data-[tooltip]:after:absolute data-[tooltip]:after:bg-white data-[tooltip]:after:top-[calc(100%+4px)] data-[tooltip]:after:left-1/2 data-[tooltip]:after:-translate-x-1/2 data-[tooltip]:after:-z-[1] data-[tooltip]:after:px-2.5 data-[tooltip]:after:py-1 data-[tooltip]:after:min-h-fit data-[tooltip]:after:min-w-fit data-[tooltip]:after:rounded-md data-[tooltip]:after:drop-shadow data-[tooltip]:before:mt-2 data-[tooltip]:before:drop-shadow data-[tooltip]:after:text-center data-[tooltip]:after:text-zinc-800 data-[tooltip]:after:whitespace-nowrap data-[tooltip]:after:text-[10px] data-[tooltip]:before:invisible data-[tooltip]:before:opacity-0 hover:data-[tooltip]:before:visible hover:data-[tooltip]:before:opacity-100 data-[tooltip]:before:transition-all data-[tooltip]:before:bg-white data-[tooltip]:before:[clip-path:polygon(50%_0,0_100%,100%_100%)] data-[tooltip]:before:absolute data-[tooltip]:before:top-full data-[tooltip]:before:left-1/2 data-[tooltip]:before:-translate-x-1/2 data-[tooltip]:before:z-0 data-[tooltip]:before:w-3 data-[tooltip]:before:h-[4px]"
                                        data-tooltip="Setujui Pengajuan"
                                      >
                                        {" "}
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 24 24"
                                          fill="currentColor"
                                          className="w-5 h-5"
                                        >
                                          <path
                                            fillRule="evenodd"
                                            d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
                                            clipRule="evenodd"
                                          />
                                        </svg>
                                      </div>
                                    </button>
                                    <button
                                      onClick={() => openModal(item.id)}
                                      className="p-2 bg-red-500 text-white rounded hover:bg-red-600 flex items-center justify-center"
                                    >
                                      <div
                                        className="flex items-center justify-center cursor-pointer rounded-md font-medium relative z-[9999999999] data-[tooltip]:after:content-[attr(data-tooltip)] data-[tooltip]:after:mt-2 data-[tooltip]:after:text-sm data-[tooltip]:after:invisible data-[tooltip]:after:scale-50 data-[tooltip]:after:origin-top data-[tooltip]:after:opacity-0 hover:data-[tooltip]:after:visible hover:data-[tooltip]:after:opacity-100 hover:data-[tooltip]:after:scale-100 data-[tooltip]:after:transition-all data-[tooltip]:after:absolute data-[tooltip]:after:bg-white data-[tooltip]:after:top-[calc(100%+4px)] data-[tooltip]:after:left-1/2 data-[tooltip]:after:-translate-x-1/2 data-[tooltip]:after:-z-[1] data-[tooltip]:after:px-2.5 data-[tooltip]:after:py-1 data-[tooltip]:after:min-h-fit data-[tooltip]:after:min-w-fit data-[tooltip]:after:rounded-md data-[tooltip]:after:drop-shadow data-[tooltip]:before:mt-2 data-[tooltip]:before:drop-shadow data-[tooltip]:after:text-center data-[tooltip]:after:text-zinc-800 data-[tooltip]:after:whitespace-nowrap data-[tooltip]:after:text-[10px] data-[tooltip]:before:invisible data-[tooltip]:before:opacity-0 hover:data-[tooltip]:before:visible hover:data-[tooltip]:before:opacity-100 data-[tooltip]:before:transition-all data-[tooltip]:before:bg-white data-[tooltip]:before:[clip-path:polygon(50%_0,0_100%,100%_100%)] data-[tooltip]:before:absolute data-[tooltip]:before:top-full data-[tooltip]:before:left-1/2 data-[tooltip]:before:-translate-x-1/2 data-[tooltip]:before:z-0 data-[tooltip]:before:w-3 data-[tooltip]:before:h-[4px]"
                                        data-tooltip="Tolak Pengajuan"
                                      >
                                        {" "}
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 24 24"
                                          fill="currentColor"
                                          className="w-5 h-5"
                                        >
                                          <path
                                            fillRule="evenodd"
                                            d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                                            clipRule="evenodd"
                                          />
                                        </svg>
                                      </div>
                                    </button>
                                  </>
                                )}
                              </>
                            )}
                          </div>
                          {/* (Small view) */}
                          <div className="flex md:hidden relative">
                            <button
                              className="p-2 bg-gray-800 text-white rounded-md hover:bg-gray-600 flex items-center justify-center"
                              onClick={() => toggleActionMenu(item.id)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-5 h-5"
                              >
                                <path d="M12 6.75a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 11.25a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15.75a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                              </svg>
                            </button>
                            {actionMenuOpen === item.id && (
                              <div
                                ref={actionMenuRef}
                                className="absolute top-12 right-0 bg-white border rounded-md shadow-lg"
                                style={{ top: "-4rem" }}
                              >
                                <ul className="text-sm text-white">
                                  {filter === "saya" ? (
                                    <div className="flex flex-col gap-1">
                                      <button
                                        className="block w-full px-4 py-2 hover:bg-gray-100 hover:text-black text-left bg-gray-800"
                                        onClick={() => handleClickDetail(item)}
                                      >
                                        Lihat
                                      </button>
                                      {item.is_approved === null && (
                                        <button
                                          className="block w-full px-4 bg-red-500 py-2 hover:bg-gray-100 hover:text-black text-left"
                                          onClick={() => handleDelete(item.id)}
                                        >
                                          Hapus
                                        </button>
                                      )}
                                    </div>
                                  ) : (
                                    <div className="flex flex-col gap-1 p-1 rounded-lg w-uto">
                                      <li>
                                        <button
                                          className="block w-full px-4 py-2 hover:bg-gray-100 hover:text-black text-left bg-gray-800"
                                          onClick={() =>
                                            handleClickDetail(item)
                                          }
                                        >
                                          Lihat Detail
                                        </button>
                                      </li>
                                      {item.is_approved === null && (
                                        <>
                                          <li>
                                            <button
                                              className="block w-full px-4 py-2 bg-green-500 hover:bg-gray-100 hover:text-black text-left"
                                              onClick={() =>
                                                handleApproveClaim(item.id)
                                              }
                                            >
                                              Setujui
                                            </button>
                                          </li>
                                          <li>
                                            <button
                                              className="block w-full px-4 py-2 bg-red-500 hover:bg-gray-100 hover:text-black text-left"
                                              onClick={() =>
                                                handleRejectClaim(item.id)
                                              }
                                            >
                                              Batalkan
                                            </button>
                                          </li>
                                        </>
                                      )}
                                      {item.is_approved === true && (
                                        <button
                                          className="block w-full px-4 bg-green-500 py-2 hover:bg-gray-100 hover:text-black text-left"
                                          onClick={() =>
                                            handleClickHubungi(
                                              item.user_id.phone_number
                                            )
                                          }
                                        >
                                          Hubungi
                                        </button>
                                      )}
                                    </div>
                                  )}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <PaginationDisplay
        currentPage={currentPage}
        totalItems={totalItems}
        onPageChange={handlePageChange}
        limit={itemsPerPage}
        className="mt-6"
      />

      {selectedClaim && (
        <Popup
          title="Detail Pengajuan"
          item={{
            images: selectedClaim.images,
            name: selectedClaim.item_id.name,
            description: selectedClaim.claim_text,
            status: true,
            reason: selectedClaim.messages,
            is_approved: selectedClaim.is_approved,
            phone_number: null,
            village: null,
            subdistrict: null,
            city: null,
            province: null,
            postal_code: null,
            type: null,
          }}
          onClose={handleClosePopup}
        />
      )}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h2 className="text-xl font-semibold mb-4">
              Masukkan Alasan Penolakan
            </h2>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Tulis alasan penolakan..."
              rows={4}
              className="w-full border bg-white border-gray-300 rounded p-2"
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={closeModal}
                className="mr-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Batal
              </button>
              <button
                onClick={handleRejectClaim}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Tolak
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePengajuan;
