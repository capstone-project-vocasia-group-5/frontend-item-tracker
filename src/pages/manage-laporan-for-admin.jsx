import "../App.css";
import React, { useState, useEffect, useRef } from "react";
import { getAllItemsByAdmin, deleteItemByAdmin } from "../api/api";
import { toast } from "sonner";
import { PaginationDisplay } from "../components/molecules/pagination.jsx";
import Popup from "../components/molecules/Popup";

const ManageLaporanAdmin = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const dropdownRefs = useRef({});
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalItems, setTotalItems] = useState(0);

  const limit = 10;

const onPageChange = (page) => {
  fetchData(page);
};

  useEffect(() => {
    const fetchItems = async (page = 1) => {
      try {
        const response = await getAllItemsByAdmin({page, limit: 10});
        setItems(response.data.data.items);
        setTotalItems(response.data.data.total_items);
      } catch (error) {
        toast.error("Error fetching data: ", error);
      }
    };
    fetchItems(currentPage);
  }, [currentPage]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredItems = items.filter(
    (item) =>
      item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e) => {
    e.preventDefault();
    toast.log("Searching for:", searchQuery);
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleDropdown = (id) => {
    setActiveDropdown((prevId) => (prevId === id ? null : id));
  };

  const handleDelete = async (id) => {
    try {
      await deleteItemByAdmin(id);
      toast.success("Item berhasil dihapus.");
      setItems((prevItems) => prevItems.filter((item) => item._id !== id));
    } catch (error) {
      toast.error("Gagal menghapus item. Silakan coba lagi.");
    }
  };

  const handleItemDetail = (item) => {
    setSelectedItem(item);
  };

  const handleClosePopup = () => {
    setSelectedItem(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <><div>
      <div className="min-h-screen w-full flex flex-col">
        <div className="p-4">
          <header className="bg-white shadow-sm p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">Manajemen Laporan</h1>
          </header>

          <div className="bg-white shadow-md rounded-md overflow-hidden mt-4">
            <form onSubmit={handleSearch} className="max-w-lg mx-auto mt-6">
              <div className="p-4">
                <div className="flex border rounded-md">
                  <input
                    type="search"
                    id="search-bar"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-l-lg border-r-0 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
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
            <div className="overflow-x-auto px-2">
              {isMobile ? (
                <div className="space-y-2">
                  {filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
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
                              onClick={() => handleItemDetail(item)}
                              className="p-2 bg-gray-800 text-white rounded hover:bg-gray-600 transition-colors flex items-center justify-center"
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
                              className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                              onClick={() => handleDelete(item._id)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="h-6 w-6"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 0 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
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
                      <th className="p-4 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredItems.length > 0 ? (
                      filteredItems.map((item) => (
                        <tr key={item._id} className="hover:bg-gray-50">
                          <td className="p-4">
                            <div className="flex justify-center items-center">
                              <div className="w-20 h-20 bg-gray-300 rounded overflow-hidden">
                                <img
                                  src={item.images?.[0] || "default-image-url"}
                                  alt={item.name || "Default Name"}
                                  className="object-cover w-full h-full"
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
                            <div className="flex justify-center space-x-2">
                              <button
                                onClick={() => handleItemDetail(item)}
                                className="p-2 bg-gray-800 text-white rounded hover:bg-gray-600 transition-colors flex items-center justify-center"
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
                                className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                                onClick={() => handleDelete(item._id)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="h-6 w-6"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 0 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
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
                          className="p-4 text-center text-gray-500"
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
      {/* Tampilkan Popup jika ada item yang dipilih */}
      {selectedItem && <Popup item={selectedItem} onClose={handleClosePopup} />}
    </div>
    <PaginationDisplay
        currentPage={currentPage}
        totalItems={totalItems}
        onPageChange={(page) => setCurrentPage(page)}
        limit={10}
      /></>
  );
};

export default ManageLaporanAdmin;