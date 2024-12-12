import React, { useState, useEffect, useRef } from "react";

const VerifikasiLaporan = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const dropdownRefs = useRef({});

  const [dataLaporan, setDataLaporan] = useState([
    {
      id: 1,
      gambar:
        "https://s3-alpha-sig.figma.com/img/a3c4/d7a8/8ae3782c58628580e16637eaf8be662f?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Op3W5GV6R~OZ9wecvWsf8QBZWrEWNVXVSHDpgO9THUqsXfIO8sIEQG0HNiJZ7Jja09vrkj-vnKXmruTy1Ba8KYbOIpkNyQHscGBq3O32Yik36oc5WvFMoIgwPm4mW8ONq~ME2I4V2v8FonO6rmnnTSZgfu7d5h0Z53NuQJ-5YPXYnhqdtKDxIbJd6e55bhK4lhGu8To67LQE1elkmGTLZX0ouelD11GbB-Hk1b0SpNcHLPHJdusZZjuoz0DCnSTQXZBxfKWyA2mIKVMVHJ~482I8kghLCeyQCQ4Z1yGV5V15K~3wS0A6of4r5RJSiWVR4-p8fs6Qr0qW4WLMmAlYQQ__",
      namaBarang: "Kucing",
      kategori: "Binatang",
    },
    {
      id: 2,
      gambar: "https://via.placeholder.com/64",
      namaBarang: "Laptop",
      kategori: "Elektronik",
    },
    {
      id: 3,
      gambar: "https://via.placeholder.com/64",
      namaBarang: "Sepeda",
      kategori: "Kendaraan",
    },
    {
      id: 4,
      gambar: "https://via.placeholder.com/64",
      namaBarang: "Anjing",
      kategori: "Binatang",
    },
  ]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  const filteredData = dataLaporan.filter(
    (item) =>
      item.namaBarang.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.kategori.toLowerCase().includes(searchQuery.toLowerCase())
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
            <div className="overflow-x-auto px-4">
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
                  {filteredData.length > 0 ? (
                    filteredData.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="p-4 text-center">
                          <img
                            src={item.gambar}
                            alt={item.namaBarang}
                            className="object-cover w-16 h-16 rounded"
                          />
                        </td>
                        <td className="p-4 text-center">{item.namaBarang}</td>
                        <td className="p-4 text-center">{item.kategori}</td>
                        <td className="p-4 text-center">
                          {isMobile ? (
                            <div className="relative">
                              <button
                                onClick={() => toggleDropdown(item.id)}
                                className="p-2 bg-gray-800 text-white rounded-md hover:bg-gray-600"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="w-6 h-6"
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
                                  ref={(el) =>
                                    (dropdownRefs.current[item.id] = el)
                                  }
                                  className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10"
                                  style={{ top: "-4rem" }}
                                >
                                  <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                                    Lihat Detail
                                  </button>
                                  <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                                    Terima
                                  </button>
                                  <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                                    Tolak
                                  </button>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="flex justify-center flex-wrap space-x-2 sm:space-x-3">
                              <button
                                className="
                            p-2 
                            bg-gray-800 
                            text-white 
                            rounded 
                            hover:bg-gray-600 
                            transition-colors
                            flex 
                            items-center 
                            justify-center
                          "
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
                                className="
                            p-2 
                            bg-green-500 
                            text-white 
                            rounded 
                            hover:bg-green-600 
                            transition-colors
                            flex 
                            items-center 
                            justify-center
                          "
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
                                className="
                            p-2 
                            bg-red-500 
                            text-white 
                            rounded 
                            hover:bg-red-600 
                            transition-colors
                            flex 
                            items-center 
                            justify-center
                          "
                                aria-label="Tolak"
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
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="p-3 text-center text-gray-500">
                        Tidak ada data ditemukan
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifikasiLaporan;
