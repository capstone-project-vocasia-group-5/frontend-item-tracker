import React, { useEffect, useState, useRef } from "react";

const ManagePengajuan = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("");
  const actionMenuRef = useRef(null);

  const [actionMenuOpen, setActionMenuOpen] = useState(null);
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

  const pengajuanSaya = [
    {
      id: 1,
      nama: "Agus727382",
      barang: "Kucing",
      deskripsi: "Itu Kucing saya mas",
    },
    {
      id: 2,
      nama: "Budi123",
      barang: "Laptop",
      deskripsi: "Ini laptop saya kak",
    },
  ];

  const pengajuanOrangLain = [
    {
      id: 1,
      nama: "Andi456",
      barang: "Jam tangan",
      deskripsi: "Saya yang nemu kak",
    },
    {
      id: 2,
      nama: "Siti789",
      barang: "Handphone",
      deskripsi: "Ini hp saya sih mba",
    },
  ];

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  const handleFilterChange = (type) => {
    setFilter(type);
  };

  const getFilteredData = (data) => {
    return data.filter(
      (item) =>
        item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.barang.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const dataToDisplay =
    filter === "saya"
      ? getFilteredData(pengajuanSaya)
      : getFilteredData(pengajuanOrangLain);

  return (
    <div>
      <div className="min-h-screen flex flex-col">
        <div className="p-4">
          <header className="bg-white shadow-sm p-4 flex justify-between">
            <h1 className="text-xl font-bold">Manajemen Pengajuan Barang</h1>
          </header>
          <div className="bg-white shadow-md rounded-md overflow-hidden">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-lg mx-auto mt-10">
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
            <div className="px-4 sm:px-9 overflow-x-auto">
              <table className="w-full bg-white rounded-full">
                <thead className="bg-black text-white rounded-full">
                  <tr>
                    <th className="p-4 text-center">Nama</th>
                    <th className="p-4 text-center">Nama Barang</th>
                    <th className="p-4 text-center">Deskripsi</th>
                    <th className="p-4 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-500 text-center">
                  {dataToDisplay.map((item) => (
                    <tr key={item.id}>
                      <td className="p-4">{item.nama}</td>
                      <td className="p-4">{item.barang}</td>
                      <td className="p-4">{item.deskripsi}</td>
                      <td className="p-4">
                        <div className="flex justify-center items-center space-x-2">
                          {/* Tombol Aksi (Full view) */}
                          <div className="hidden sm:flex space-x-2">
                            {filter === "saya" ? (
                              <>
                                <button className="p-2 bg-gray-800 text-white rounded hover:bg-gray-600 flex items-center justify-center">
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
                                <button className="p-2 bg-red-500 text-white rounded hover:bg-red-600 flex items-center justify-center">
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
                              </>
                            ) : (
                              <>
                                <button className="p-2 bg-gray-800 text-white rounded hover:bg-gray-600 flex items-center justify-center">
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
                                <button className="p-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center justify-center">
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
                                <button className="p-2 bg-red-500 text-white rounded hover:bg-red-600 flex items-center justify-center">
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
                              </>
                            )}
                          </div>
                          {/* (Small view) */}
                          <div className="flex sm:hidden relative">
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
                                className="absolute top-12 right-0 bg-white border rounded-md shadow-lg z-50"
                                style={{ top: "-4rem" }}
                              >
                                <ul className="text-sm text-gray-700">
                                  {filter === "saya" ? (
                                    <>
                                      <li>
                                        <button
                                          className="block w-full px-4 py-2 hover:bg-gray-100 text-left"
                                          onClick={() =>
                                            console.log(
                                              `Lihat pengajuan ${item.id}`
                                            )
                                          }
                                        >
                                          Lihat Detail
                                        </button>
                                      </li>
                                      <li>
                                        <button
                                          className="block w-full px-4 py-2 hover:bg-gray-100 text-left"
                                          onClick={() =>
                                            console.log(
                                              `Batalkan pengajuan ${item.id}`
                                            )
                                          }
                                        >
                                          Hapus
                                        </button>
                                      </li>
                                    </>
                                  ) : (
                                    <>
                                      <li>
                                        <button
                                          className="block w-full px-4 py-2 hover:bg-gray-100 text-left"
                                          onClick={() =>
                                            console.log(
                                              `Lihat pengajuan ${item.id}`
                                            )
                                          }
                                        >
                                          Lihat Detail
                                        </button>
                                      </li>
                                      <li>
                                        <button
                                          className="block w-full px-4 py-2 hover:bg-gray-100 text-left"
                                          onClick={() =>
                                            console.log(
                                              `Setujui pengajuan ${item.id}`
                                            )
                                          }
                                        >
                                          Setujui
                                        </button>
                                      </li>
                                      <li>
                                        <button
                                          className="block w-full px-4 py-2 hover:bg-gray-100 text-left"
                                          onClick={() =>
                                            console.log(
                                              `Batalkan pengajuan ${item.id}`
                                            )
                                          }
                                        >
                                          Batalkan
                                        </button>
                                      </li>
                                    </>
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
    </div>
  );
};

export default ManagePengajuan;
