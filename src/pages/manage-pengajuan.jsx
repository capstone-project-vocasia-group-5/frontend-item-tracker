import React, { useState } from "react";
import { Navbar } from "../components/organisms/navbar";
import Footer from "../components/organisms/footer";

const ManagePengajuan = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <div>
      <Navbar></Navbar>{" "}
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
                  {/* Input */}
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
                  <tr>
                    <td className="p-4">Agus727382</td>
                    <td className="p-4">Kucing</td>
                    <td className="p-4">Itu Kucing saya mas</td>
                    <td className="p-4">
                      <div className="flex justify-center items-center space-x-2">
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
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default ManagePengajuan;