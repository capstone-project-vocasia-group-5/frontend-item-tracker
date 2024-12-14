import React, { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import {
  getAllOwnItemsByUser,
  deleteItemByUser,
  updateItem,
  updateMatchedStatus,
} from "../api/api";
import UpdateModal from "../components/organisms/update-modal";
import Popup from "../components/molecules/Popup";
import { PaginationDisplay } from "../components/molecules/pagination.jsx";

const ManageLaporanUser = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const dropdownRefs = useRef({});

  const [selectedItem, setSelectedItem] = useState(null);
  const [popupType, setPopupType] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Set the number of items per page
  const totalItems = filteredData.length; // Total items based on filtered data

  const handleOpenPopup = (item, type) => {
    setSelectedItem(item);
    setPopupType(type);
  };

  const handleClosePopup = () => {
    setSelectedItem(null);
    setPopupType(null);
  };

  const fetchData = async () => {
    try {
      const response = await getAllOwnItemsByUser({ own: true });
      console.log("Fetched data:", response.data);
      setData(response.data.data.items);
      setFilteredData(response.data.data.items);
    } catch (error) {
      console.error("Error fetching items:", error);
      toast.error("Gagal mengambil data laporan.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteItem = async (id) => {
    const confirmDelete = window.confirm(
      "Apakah Anda yakin ingin menghapus item ini?"
    );
    if (!confirmDelete) return;

    try {
      await deleteItemByUser(id);
      setFilteredData((prevData) => prevData.filter((item) => item._id !== id));
      setData((prevData) => prevData.filter((item) => item._id !== id));
      toast.success("Item berhasil dihapus.");
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("Gagal menghapus item.");
    }
  };

  const handleUpdateItem = async (id, updatedData) => {
    try {
      await updateItem(id, updatedData);
      fetchData();
      handleClosePopup();
      toast.success("Item berhasil diperbarui.");
    } catch (error) {
      console.error("Error updating item:", error);
      toast.error("Gagal memperbarui item.");
    }
  };

  const handleMatchedStatus = async (id) => {
    console.log("Updating matched status for ID:", id);
    try {
      await updateMatchedStatus(id);
      fetchData();
      toast.success("Status item berhasil diperbarui.");
    } catch (error) {
      console.error(
        "Error updating matched status:",
        error.response ? error.response.data : error.message
      );
      toast.error("Gagal memperbarui status item.");
    }
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query === "") {
      setFilteredData(data);
    } else {
      const lowercasedQuery = query.toLowerCase();
      const filtered = data.filter((item) => {
        const itemName = item.name ? item.name.toLowerCase() : "";
        const itemCategories = item.categories || [];
        const categoryMatch = itemCategories.some(
          (category) =>
            category.name &&
            category.name.toLowerCase().includes(lowercasedQuery)
        );

        return itemName.includes(lowercasedQuery) || categoryMatch;
      });
      setFilteredData(filtered);
    }
    // Reset to the first page when search changes
    setCurrentPage(1);
  };

  const toggleDropdown = (itemId) => {
    setOpenDropdownId((prevId) => (prevId === itemId ? null : itemId));
  };

  const handleItemDetail = (item) => {
    handleOpenPopup(item, "detail");
  };

  const handleEditItem = (item) => {
    handleOpenPopup(item, "edit");
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        openDropdownId !== null &&
        dropdownRefs.current[openDropdownId] &&
        !dropdownRefs.current[openDropdownId].contains(event.target)
      ) {
        setOpenDropdownId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdownId]);

  // Calculate the current items to display based on pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="min-h-screen flex flex-col">
        <div className="p-4">
          <header className="bg-white shadow-sm p-4 flex justify-between">
            <h1 className="text-xl font-bold">Manajemen Laporan</h1>
          </header>

          <div className="bg-white shadow-md rounded-md overflow-hidden">
            {/* Search Bar */}
            <form className="max-w-lg mx-auto my-6 px-4">
              <div className="p-4">
                <div className="flex border rounded-md">
                  <input
                    type="search"
                    id="search-bar"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-l-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Cari Laporan..."
                    required
                  />
                  <button
                    type="button"
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

            {/* Table */}
            <div className="px-4 overflow-x-auto">
              <table className="w-full bg-white table-fixed rounded-md">
                <thead className="bg-black text-white">
                  <tr>
                    <th className="p-4 text-center ">Gambar</th>
                    <th className="p-4 text-center ">Nama Barang</th>
                    <th className="p-4 text-center hidden md:block">
                      Kategori
                    </th>
                    <th className="p-4 text-center ">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-500 text-center">
                  {currentItems.map((item) => (
                    <tr key={item._id}>
                      <td className="p-4">
                        <div className="flex justify-center items-center">
                          <div className="w-20 h-20 bg-gray-300 rounded flex justify-center items-center overflow-hidden">
                            <img
                              src={item.images[0]}
                              alt={item.name}
                              className="object-cover w-full h-full rounded"
                            />
                          </div>
                        </div>
                      </td>
                      <td className="p-4">{item.name}</td>
                      <td className="p-4 hidden my-8 md:block">
                        {item.categories.length > 0
                          ? item.categories
                              .map((category) => category.name)

                              .join(", ")
                          : "-"}
                      </td>
                      <td className="px-4 sm:px-15 py-4">
                        <div className="flex justify-center items-center space-x-2">
                          {isMobile ? (
                            <div className="sm:hidden relative">
                              <button
                                onClick={() => toggleDropdown(item._id)}
                                className="p-2 bg-gray-800 text-white rounded-md hover:bg-gray-600"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="size-6"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </button>

                              {openDropdownId === item._id && (
                                <div
                                  ref={(el) =>
                                    (dropdownRefs.current[item._id] = el)
                                  }
                                  className="absolute flex flex-col gap-1 right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10"
                                  style={{ top: "-4rem" }}
                                >
                                  <button
                                    onClick={() => handleItemDetail(item)}
                                    className="block w-full text-left px-4 py-2 bg-black hover:text-black text-white hover:bg-gray-100"
                                  >
                                    Lihat Detail
                                  </button>

                                  {!item.matched_status && (
                                    <>
                                      <button
                                        onClick={() => handleEditItem(item)}
                                        className="block w-full text-left px-4 py-2 bg-blue-500 hover:text-black text-white hover:bg-gray-100"
                                      >
                                        Edit
                                      </button>
                                      <button
                                        onClick={() =>
                                          handleMatchedStatus(item._id)
                                        }
                                        className="block w-full text-left px-4 bg-green-500 text-white hover:text-black py-2 hover:bg-gray-100"
                                      >
                                        Selesaikan Laporan
                                      </button>
                                    </>
                                  )}
                                  <button
                                    onClick={() => handleDeleteItem(item._id)}
                                    className="block w-full text-left px-4 py-2 bg-red-500 hover:text-black text-white hover:bg-gray-100"
                                  >
                                    Hapus
                                  </button>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="flex flex-wrap gap-2 justify-center items-center">
                              <button
                                onClick={() => handleItemDetail(item)}
                                className="p-2 bg-gray-800 text-white rounded hover:bg-gray-600 flex items-center justify-center"
                              >
                                <div
                                  class="flex items-center justify-center cursor-pointer rounded-md font-medium relative z-[9999999999] data-[tooltip]:after:content-[attr(data-tooltip)] data-[tooltip]:after:mt-2 data-[tooltip]:after:text-sm data-[tooltip]:after:invisible data-[tooltip]:after:scale-50 data-[tooltip]:after:origin-top data-[tooltip]:after:opacity-0 hover:data-[tooltip]:after:visible hover:data-[tooltip]:after:opacity-100 hover:data-[tooltip]:after:scale-100 data-[tooltip]:after:transition-all data-[tooltip]:after:absolute data-[tooltip]:after:bg-white data-[tooltip]:after:top-[calc(100%+4px)] data-[tooltip]:after:left-1/2 data-[tooltip]:after:-translate-x-1/2 data-[tooltip]:after:-z-[1] data-[tooltip]:after:px-2.5 data-[tooltip]:after:py-1 data-[tooltip]:after:min-h-fit data-[tooltip]:after:min-w-fit data-[tooltip]:after:rounded-md data-[tooltip]:after:drop-shadow data-[tooltip]:before:mt-2 data-[tooltip]:before:drop-shadow data-[tooltip]:after:text-center data-[tooltip]:after:text-zinc-800 data-[tooltip]:after:whitespace-nowrap data-[tooltip]:after:text-[10px] data-[tooltip]:before:invisible data-[tooltip]:before:opacity-0 hover:data-[tooltip]:before:visible hover:data-[tooltip]:before:opacity-100 data-[tooltip]:before:transition-all data-[tooltip]:before:bg-white data-[tooltip]:before:[clip-path:polygon(50%_0,0_100%,100%_100%)] data-[tooltip]:before:absolute data-[tooltip]:before:top-full data-[tooltip]:before:left-1/2 data-[tooltip]:before:-translate-x-1/2 data-[tooltip]:before:z-0 data-[tooltip]:before:w-3 data-[tooltip]:before:h-[4px]"
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

                              {!item.matched_status && (
                                <>
                                  <button
                                    onClick={() =>
                                      handleMatchedStatus(item._id)
                                    }
                                    className="p-2 bg-green-500 text-white rounded hover:bg-green-600  flex items-center justify-center"
                                  >
                                    <div
                                      class="flex items-center justify-center cursor-pointer rounded-md font-medium relative z-[9999999999] data-[tooltip]:after:content-[attr(data-tooltip)] data-[tooltip]:after:mt-2 data-[tooltip]:after:text-sm data-[tooltip]:after:invisible data-[tooltip]:after:scale-50 data-[tooltip]:after:origin-top data-[tooltip]:after:opacity-0 hover:data-[tooltip]:after:visible hover:data-[tooltip]:after:opacity-100 hover:data-[tooltip]:after:scale-100 data-[tooltip]:after:transition-all data-[tooltip]:after:absolute data-[tooltip]:after:bg-white data-[tooltip]:after:top-[calc(100%+4px)] data-[tooltip]:after:left-1/2 data-[tooltip]:after:-translate-x-1/2 data-[tooltip]:after:-z-[1] data-[tooltip]:after:px-2.5 data-[tooltip]:after:py-1 data-[tooltip]:after:min-h-fit data-[tooltip]:after:min-w-fit data-[tooltip]:after:rounded-md data-[tooltip]:after:drop-shadow data-[tooltip]:before:mt-2 data-[tooltip]:before:drop-shadow data-[tooltip]:after:text-center data-[tooltip]:after:text-zinc-800 data-[tooltip]:after:whitespace-nowrap data-[tooltip]:after:text-[10px] data-[tooltip]:before:invisible data-[tooltip]:before:opacity-0 hover:data-[tooltip]:before:visible hover:data-[tooltip]:before:opacity-100 data-[tooltip]:before:transition-all data-[tooltip]:before:bg-white data-[tooltip]:before:[clip-path:polygon(50%_0,0_100%,100%_100%)] data-[tooltip]:before:absolute data-[tooltip]:before:top-full data-[tooltip]:before:left-1/2 data-[tooltip]:before:-translate-x-1/2 data-[tooltip]:before:z-0 data-[tooltip]:before:w-3 data-[tooltip]:before:h-[4px]"
                                      data-tooltip="Selesaikan Laporan!"
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
                                    onClick={() => handleEditItem(item)}
                                    className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center justify-center"
                                  >
                                    <div
                                      class="flex items-center justify-center cursor-pointer rounded-md font-medium relative z-[9999999999] data-[tooltip]:after:content-[attr(data-tooltip)] data-[tooltip]:after:mt-2 data-[tooltip]:after:text-sm data-[tooltip]:after:invisible data-[tooltip]:after:scale-50 data-[tooltip]:after:origin-top data-[tooltip]:after:opacity-0 hover:data-[tooltip]:after:visible hover:data-[tooltip]:after:opacity-100 hover:data-[tooltip]:after:scale-100 data-[tooltip]:after:transition-all data-[tooltip]:after:absolute data-[tooltip]:after:bg-white data-[tooltip]:after:top-[calc(100%+4px)] data-[tooltip]:after:left-1/2 data-[tooltip]:after:-translate-x-1/2 data-[tooltip]:after:-z-[1] data-[tooltip]:after:px-2.5 data-[tooltip]:after:py-1 data-[tooltip]:after:min-h-fit data-[tooltip]:after:min-w-fit data-[tooltip]:after:rounded-md data-[tooltip]:after:drop-shadow data-[tooltip]:before:mt-2 data-[tooltip]:before:drop-shadow data-[tooltip]:after:text-center data-[tooltip]:after:text-zinc-800 data-[tooltip]:after:whitespace-nowrap data-[tooltip]:after:text-[10px] data-[tooltip]:before:invisible data-[tooltip]:before:opacity-0 hover:data-[tooltip]:before:visible hover:data-[tooltip]:before:opacity-100 data-[tooltip]:before:transition-all data-[tooltip]:before:bg-white data-[tooltip]:before:[clip-path:polygon(50%_0,0_100%,100%_100%)] data-[tooltip]:before:absolute data-[tooltip]:before:top-full data-[tooltip]:before:left-1/2 data-[tooltip]:before:-translate-x-1/2 data-[tooltip]:before:z-0 data-[tooltip]:before:w-3 data-[tooltip]:before:h-[4px]"
                                      data-tooltip="Edit"
                                    >
                                      {" "}
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-5 h-5"
                                      >
                                        <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                        <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                                      </svg>
                                    </div>
                                  </button>
                                </>
                              )}
                              <button
                                onClick={() => handleDeleteItem(item._id)}
                                className="p-2 bg-red-500 text-white rounded hover:bg-red-600 flex items-center justify-center"
                              >
                                <div
                                  class="flex items-center justify-center cursor-pointer rounded-md font-medium relative z-[9999999999] data-[tooltip]:after:content-[attr(data-tooltip)] data-[tooltip]:after:mt-2 data-[tooltip]:after:text-sm data-[tooltip]:after:invisible data-[tooltip]:after:scale-50 data-[tooltip]:after:origin-top data-[tooltip]:after:opacity-0 hover:data-[tooltip]:after:visible hover:data-[tooltip]:after:opacity-100 hover:data-[tooltip]:after:scale-100 data-[tooltip]:after:transition-all data-[tooltip]:after:absolute data-[tooltip]:after:bg-white data-[tooltip]:after:top-[calc(100%+4px)] data-[tooltip]:after:left-1/2 data-[tooltip]:after:-translate-x-1/2 data-[tooltip]:after:-z-[1] data-[tooltip]:after:px-2.5 data-[tooltip]:after:py-1 data-[tooltip]:after:min-h-fit data-[tooltip]:after:min-w-fit data-[tooltip]:after:rounded-md data-[tooltip]:after:drop-shadow data-[tooltip]:before:mt-2 data-[tooltip]:before:drop-shadow data-[tooltip]:after:text-center data-[tooltip]:after:text-zinc-800 data-[tooltip]:after:whitespace-nowrap data-[tooltip]:after:text-[10px] data-[tooltip]:before:invisible data-[tooltip]:before:opacity-0 hover:data-[tooltip]:before:visible hover:data-[tooltip]:before:opacity-100 data-[tooltip]:before:transition-all data-[tooltip]:before:bg-white data-[tooltip]:before:[clip-path:polygon(50%_0,0_100%,100%_100%)] data-[tooltip]:before:absolute data-[tooltip]:before:top-full data-[tooltip]:before:left-1/2 data-[tooltip]:before:-translate-x-1/2 data-[tooltip]:before:z-0 data-[tooltip]:before:w-3 data-[tooltip]:before:h-[4px]"
                                  data-tooltip="Hapus"
                                >
                                  <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M4 7H20"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M6 7V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V7"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </div>
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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

        {selectedItem && popupType === "edit" && (
          <UpdateModal
            item={selectedItem}
            onClose={handleClosePopup}
            onUpdate={handleUpdateItem}
          />
        )}
        {selectedItem && popupType === "detail" && (
          <Popup item={selectedItem} onClose={handleClosePopup} />
        )}
      </div>
    </div>
  );
};

export default ManageLaporanUser;
