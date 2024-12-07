import "../App.css";
import React, { useState, useEffect, useRef } from "react";

const ManageLaporanAdmin = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const dropdownRefs = useRef({});

  const sampleData = [
    {
      id: 1,
      nama: "Kucing",
      kategori: "Binatang",
      gambar:
        "https://s3-alpha-sig.figma.com/img/a3c4/d7a8/8ae3782c58628580e16637eaf8be662f?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Op3W5GV6R~OZ9wecvWsf8QBZWrEWNVXVSHDpgO9THUqsXfIO8sIEQG0HNiJZ7Jja09vrkj-vnKXmruTy1Ba8KYbOIpkNyQHscGBq3O32Yik36oc5WvFMoIgwPm4mW8ONq~ME2I4V2v8FonO6rmnnTSZgfu7d5h0Z53NuQJ-5YPXYnhqdtKDxIbJd6e55bhK4lhGu8To67LQE1elkmGTLZX0ouelD11GbB-Hk1b0SpNcHLPHJdusZZjuoz0DCnSTQXZBxfKWyA2mIKVMVHJ~482I8kghLCeyQCQ4Z1yGV5V15K~3wS0A6of4r5RJSiWVR4-p8fs6Qr0qW4WLMmAlYQQ__",
    },
    {
      id: 2,
      nama: "Anjing",
      kategori: "Binatang",
      gambar: "https://example.com/anjing.jpg",
    },
    {
      id: 3,
      nama: "Earphone",
      kategori: "Elektronik",
      gambar: "https://example.com/Earphone.jpg",
    },
  ];

  useEffect(() => {
    setItems(sampleData);
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredItems = items.filter(
    (item) =>
      item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.kategori.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
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
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

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

  return (
    <div>
      <div className="min-h-screen flex flex-col">
        <div className="p-4">
          <header className="bg-white shadow-sm p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">Manajemen Laporan</h1>
          </header>

          <div className="bg-white shadow-md rounded-md overflow-hidden mt-4">
            {/* Search Bar */}
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

            {/* Table */}
            <div className="px-4 sm:px-6 overflow-x-auto">
              <table className="w-full bg-white">
                <thead className="bg-black text-white">
                  <tr>
                    <th className="p-3 text-center">Gambar</th>
                    <th className="p-3 text-center">Nama Barang</th>
                    <th className="p-3 text-center">Kategori</th>
                    <th className="p-3 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredItems.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="p-4">
                        <div className="flex justify-center items-center">
                          <div className="w-20 h-20 bg-gray-300 rounded flex justify-center items-center overflow-hidden">
                            <img
                              src={item.gambar}
                              alt={item.nama}
                              className="object-cover w-full h-full rounded"
                            />
                          </div>
                        </div>
                      </td>
                      <td className="p-3 text-center">{item.nama}</td>
                      <td className="p-3 text-center">{item.kategori}</td>
                      <td className="px-4 sm:px-15 py-4">
                        <div className="flex justify-center items-center space-x-2">
                          {/* Tombol untuk layar besar */}
                          <div className="hidden sm:flex space-x-2">
                            <button className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="h-6 w-6"
                              >
                                <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                              </svg>
                            </button>
                            <button className="p-1 bg-red-500 text-white rounded hover:bg-red-600">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="h-6 w-6"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                        {/* Dropdown untuk layar kecil */}
                        <div className="sm:hidden relative flex justify-center items-center">
                          <button
                            className="p-2 bg-gray-800 text-white rounded-md hover:bg-gray-600"
                            onClick={() => toggleDropdown(item.id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="h-6 w-6"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                          {openDropdownId === item.id && (
                            <div
                              ref={(el) => (dropdownRefs.current[item.id] = el)}
                              className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10"
                              style={{ top: "-4rm" }}
                            >
                              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                                Edit
                              </button>
                              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                                Hapus
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
      </div>
    </div>
  );
};

export default ManageLaporanAdmin;
