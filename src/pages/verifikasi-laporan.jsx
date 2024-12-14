import React, { useState, useEffect, useRef } from "react";
import {
  getAllItemsByAdmin,
  rejectItemByAdmin,
  approveItemByAdmin,
} from "../api/api";
import { toast } from "sonner";
import { PaginationDisplay } from "../components/molecules/pagination.jsx";
import Popup from "../components/molecules/Popup";
import Preloader from "../components/templates/preloader/preloader.jsx";

const VerifikasiLaporan = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openRejectPopup, setOpenRejectPopup] = useState(false);
  const [rejectMessage, setRejectMessage] = useState("");
  const dropdownRefs = useRef({});
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await getAllItemsByAdmin({ approved: false });
        setItems(response.data.data.items);
        setTotalItems(response.data.data.total_items);
      } catch (error) {
        toast.error("Error fetching data: ", error);
      } finally {
        setLoading(false); 
      }
    };
    fetchItems();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const filteredData = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleDropdown = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const handleDetail = (item) => {
    setSelectedItem(item);
    setOpenDropdownId(item._id);
  };

  const handleClosePopup = () => {
    setSelectedItem(null);
  };

  const handleOpenRejectPopup = (item) => {
    setSelectedItem(item);
    setOpenRejectPopup(true);
  };

  const handleCloseRejectPopup = () => {
    setOpenRejectPopup(false);
    setRejectMessage(""); 
  };

  const handleApprove = async (itemId) => {
    try {
      const response = await approveItemByAdmin(itemId);
      if (response?.status === 200) {
        const updatedItems = items.filter((item) => item._id !== itemId);
        setItems(updatedItems);
        toast.success("Laporan berhasil disetujui.");
      } else {
        toast.error("Gagal menyetujui laporan.");
      }
    } catch (error) {
      console.error("Error while approving item:", error);
      toast.error("Terjadi kesalahan saat menyetujui laporan.");
    }
  };

  const handleReject = async () => {
    if (!rejectMessage.trim()) {
      toast.error("Pesan penolakan diperlukan.");
      return;
    }

    try {
      const response = await rejectItemByAdmin(selectedItem._id, {
        messages: rejectMessage,
      });
      if (response?.status === 200) {
        const updatedItems = items.filter(
          (item) => item._id !== selectedItem._id
        );
        setItems(updatedItems);
        toast.success("Laporan berhasil ditolak.");
        setOpenRejectPopup(false);
      } else {
        toast.error("Gagal menolak laporan.");
      }
    } catch (error) {
      console.error("Error while rejecting item:", error);
      if (error.response && error.response.data && error.response.data.errors) {
        toast.error(`Error: ${error.response.data.errors}`);
      } else {
        toast.error("Terjadi kesalahan saat menolak laporan.");
      }
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        openDropdownId !== null &&
        !dropdownRefs.current[openDropdownId]?.contains(event.target)
      ) {
        setOpenDropdownId(null);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [openDropdownId]);

  return (
    <>
      {loading && <Preloader />}
      <div>
        <div className="min-h-screen w-full flex flex-col">
          <div className="p-4">
            <header className="bg-white shadow-sm p-4 flex justify-between">
              <h1 className="text-xl font-bold">Verifikasi Laporan</h1>
            </header>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              {/* Search Bar */}
              <form
                onSubmit={handleSearch}
                className="max-w-xl mx-auto my-6 px-4"
              >
                <div className="flex border rounded-md">
                  <input
                    type="search"
                    id="search-bar"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="flex-grow p-2.5 text-sm text-gray-900 bg-gray-50 rounded-l-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Cari laporan (nama atau kategori)..."
                    required
                  />
                  <button
                    type="submit"
                    className="p-2.5 text-white bg-black rounded-r-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
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
              </form>

              {/* Responsive Table */}
              <div className="overflow-x-auto px-2">
                {isMobile ? (
                  <div className="space-y-2">
                    {filteredData.length > 0 ? (
                      filteredData.map((item) => (
                        <div
                          key={item._id}
                          className="bg-white border border-gray-300 rounded-md p-1 shadow-sm"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <div className="w-16 h-16 bg-gray-200 rounded-md overflow-hidden">
                                <img
                                  src={item.images?.[0] || "default-image-url"}
                                  alt={item.name || "Default Name"}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <h3 className="text-lg font-semibold">
                                  {item.name}
                                </h3>
                                <p className="text-sm text-gray-500">
                                  {item.categories
                                    .map((category) => category.name)
                                    .join(", ")}
                                </p>
                              </div>
                            </div>
                            <div className="flex space-x-1">
                              <button
                                onClick={() => handleDetail(item)}
                                className="p-2 bg-gray-800 text-white rounded hover:bg-gray-600 transition-colorsflex items-center justify-center"
                                aria-label="Lihat Detail"
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
                              </button>
                              <button
                                onClick={() => handleApprove(item._id)}
                                className="p-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colorsflex items-center justify-center"
                                aria-label="Terima"
                              >
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
                              </button>
                              <button
                                onClick={(e) => handleOpenRejectPopup(item)}
                                className="p-2 bg-red-500 text-white rounded hover:bg-red-600 flex items-center justify-center"
                              >
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
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-gray-500">
                        Tidak ada data ditemukan
                      </p>
                    )}
                  </div>
                ) : (
                  <table className="w-full border-collapse">
                    <thead className="bg-black text-white">
                      <tr>
                        <th className="p-4 text-center">Gambar</th>
                        <th className="p-4 text-center">Nama Barang</th>
                        <th className="p-4 text-center">Kategori</th>
                        <th className="p-4 text-center">Status</th>
                        <th className="p-4 text-center">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredData.length > 0 ? (
                        filteredData.map((item) => (
                          <tr key={item._id} className="hover:bg-gray-50">
                            <td className="p-4">
                              <div className="flex justify-center items-center">
                                <div className="w-20 h-20 bg-gray-300 rounded flex justify-center items-center overflow-hidden">
                                  <img
                                    src={
                                      item.images?.[0] || "default-image-url"
                                    }
                                    alt={item.name || "Default Name"}
                                    className="object-cover w-full h-full rounded"
                                  />
                                </div>
                              </div>
                            </td>
                            <td className="p-4 text-center">{item.name}</td>
                            <td className="p-4 text-center">
                              {item.categories
                                .map((category) => category.name)
                                .join(", ")}
                            </td>
                            <td className="p-4 text-center">
                              {item.approved ? "Terima" : "Tolak"}
                            </td>
                            <td className="p-4 text-center">
                              <div className="flex justify-center flex-wrap space-x-2 sm:space-x-3">
                                <button
                                  onClick={() => handleDetail(item)}
                                  className="p-2 bg-gray-800 text-white rounded hover:bg-gray-600 transition-colorsflex items-center justify-center"
                                  aria-label="Lihat Detail"
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
                                </button>
                                <button
                                  onClick={() => handleApprove(item._id)}
                                  className="p-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colorsflex items-center justify-center"
                                  aria-label="Terima"
                                >
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
                                </button>
                                <button
                                  onClick={(e) => handleOpenRejectPopup(item)}
                                  className="p-2 bg-red-500 text-white rounded hover:bg-red-600 flex items-center justify-center"
                                >
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
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="4"
                            className="p-3 text-center text-gray-500"
                          >
                            Tidak ada data ditemukan
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Popup for detail */}
        {selectedItem && openDropdownId === selectedItem._id && (
          <Popup item={selectedItem} onClose={handleClosePopup} />
        )}

        {/* Reject Popup */}
        {openRejectPopup && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-bold mb-4">Alasan Penolakan</h2>
              <textarea
                value={rejectMessage}
                onChange={(e) => setRejectMessage(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-4 h-32"
                placeholder="Masukkan alasan penolakan"
              ></textarea>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={handleCloseRejectPopup}
                  className="px-4 py-2 bg-gray-300 text-black rounded"
                >
                  Batal
                </button>
                <button
                  onClick={handleReject}
                  className="px-4 py-2 bg-red-500 text-white rounded"
                >
                  Tolak
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <PaginationDisplay
        currentPage={currentPage}
        totalItems={totalItems}
        onPageChange={handlePageChange}
        limit={10}
      />
    </>
  );
};

export default VerifikasiLaporan;
