import React, { useState } from "react";

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
<<<<<<< Updated upstream
                <tr>
                  <th className="p-4 text-center">Nama</th>
                  <th className="p-4 text-center">Nama Barang</th>
                  <th className="p-4 text-center">Deskripsi</th>
=======
                <tr className="">
                  <th className="p-4 text-center ">Gambar</th>
                  <th className="p-4 text-center">Nama Barang</th>
                  <th className="p-4 text-center">Kategori</th>
>>>>>>> Stashed changes
                  <th className="p-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-500 text-center">
                <tr>
<<<<<<< Updated upstream
                  <td className="p-4">Agus727382</td>
                  <td className="p-4">Kucing</td>
                  <td className="p-4">Itu Kucing saya mas</td>
                  <td className="p-4">
                    <div className="flex justify-center items-center space-x-2">
                      <button className="p-2 bg-gray-800 text-white rounded hover:bg-gray-600 flex items-center justify-center">
=======
                  <td className="p-4">
                    <div className="bg-gray-200 rounded p-2">
                      <img
                        src="https://s3-alpha-sig.figma.com/img/a3c4/d7a8/8ae3782c58628580e16637eaf8be662f?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Op3W5GV6R~OZ9wecvWsf8QBZWrEWNVXVSHDpgO9THUqsXfIO8sIEQG0HNiJZ7Jja09vrkj-vnKXmruTy1Ba8KYbOIpkNyQHscGBq3O32Yik36oc5WvFMoIgwPm4mW8ONq~ME2I4V2v8FonO6rmnnTSZgfu7d5h0Z53NuQJ-5YPXYnhqdtKDxIbJd6e55bhK4lhGu8To67LQE1elkmGTLZX0ouelD11GbB-Hk1b0SpNcHLPHJdusZZjuoz0DCnSTQXZBxfKWyA2mIKVMVHJ~482I8kghLCeyQCQ4Z1yGV5V15K~3wS0A6of4r5RJSiWVR4-p8fs6Qr0qW4WLMmAlYQQ__"
                        alt="Kucing"
                        className="h-13 w-12 object-cover rounded"
                      />
                    </div>
                  </td>
                  <td className="p-4">Kucing</td>
                  <td className="p-4">Binatang</td>
                  <td className="px-4 sm:px-15 py-4 space-x-2">
                    <div className="flex flex-wrap sm:flex-nowrap justify-center sm:justify-start gap-2">
                      <button className="p-1 bg-gray-800 text-white rounded hover:bg-gray-600 flex items-center justify-center">
>>>>>>> Stashed changes
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
<<<<<<< Updated upstream
                          className="w-5 h-5"
=======
                          className="size-5 sm:size-6"
>>>>>>> Stashed changes
                        >
                          <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                          <path
                            fillRule="evenodd"
                            d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
<<<<<<< Updated upstream
                      <button className="p-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center justify-center">
=======
                      <button className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center justify-center">
>>>>>>> Stashed changes
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
<<<<<<< Updated upstream
                          className="w-5 h-5"
=======
                          className="size-5 sm:size-6"
                        >
                          <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                          <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                        </svg>
                      </button>
                      <button className="p-1 bg-green-500 text-white rounded hover:bg-green-600 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="size-5 sm:size-6"
>>>>>>> Stashed changes
                        >
                          <path
                            fillRule="evenodd"
                            d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
<<<<<<< Updated upstream
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
=======
                      <button className="p-1 bg-red-500 text-white rounded hover:bg-red-600 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="size-5 sm:size-6"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                            clipRule="evenodd"
>>>>>>> Stashed changes
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
  );
};

<<<<<<< Updated upstream
export default ManagePengajuan;
=======
export default ManagePengajuan;
>>>>>>> Stashed changes
