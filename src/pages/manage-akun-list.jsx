import "../App.css";
import React, { useState, useEffect } from "react";
import { getAllUsers, deleteUser } from "../api/api";
import { toast } from "sonner";

const ManageAkunList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await getAllUsers();
        const users = response.data?.data?.users || [];
        setAccounts(users);
      } catch (error) {
        toast.error(`Gagal mengambil data pengguna: ${error.message}`);
        setAccounts([]);
      }
    };

    fetchAccounts();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredAccounts = Array.isArray(accounts)
    ? accounts.filter((account) => {
        const nama = account.name || "";
        const email = account.email || "";
        const noTelepon = account.phone_number || "";

        return (
          nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
          email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          noTelepon.includes(searchQuery)
        );
      })
    : [];

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      setAccounts((prevAccounts) =>
        prevAccounts.filter((account) => account.id !== userId)
      );
      toast.success("Pengguna berhasil dihapus.");
    } catch (error) {
      console.error("Gagal menghapus pengguna:", error);
      toast.error(
        `Terjadi kesalahan saat menghapus pengguna: ${error.message}`
      );
    }
  };

  return (
    <div>
      <div className="min-h-screen flex flex-col">
        <div className="p-4">
          <header className="bg-white shadow-sm p-4 mb-6 flex justify-between">
            <h1 className="text-xl font-bold">Manajemen Akun Pengguna</h1>
          </header>

          <div className="bg-white shadow-md rounded-md overflow-hidden">
            {/* Search Bar */}
            <form
              onSubmit={(e) => e.preventDefault()}
              className="max-w-lg mx-auto mt-10"
            >
              <div className="p-5">
                <div className="flex border rounded-md">
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-l-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search by name, email, or phone..."
                  />
                  <button
                    type="submit"
                    className="p-2.5 text-white bg-primaryBlack rounded-r-lg hover:bg-blue-700"
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
            <div className="w-full px-2 sm:px-6">
              {/* Desktop Table */}
              <table className="hidden sm:table w-full bg-white table-auto border-collapse">
                <thead className="bg-black text-white rounded-t-lg">
                  <tr>
                    <th className="px-4 py-4 text-center text-sm">Nama</th>
                    <th className="px-4 py-4 text-center text-sm">Email</th>
                    <th className="px-4 py-4 text-center text-sm">Role</th>
                    <th className="px-4 py-4 text-center text-sm">
                      No. Telepon
                    </th>
                    <th className="px-4 py-4 text-center text-sm">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-500 text-center">
                  {filteredAccounts.map((account) => (
                    <tr key={account.id}>
                      <td className="px-4 py-4">{account.name}</td>
                      <td className="px-4 py-4">{account.email}</td>
                      <td className="px-4 py-4">{account.role}</td>
                      <td className="px-4 py-4">{account.phone_number}</td>
                      <td className="px-4 py-4 flex justify-center space-x-2">
                        <button
                          onClick={() => handleDeleteUser(account.id)}
                          className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-6"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Mobile List */}
              <div className="sm:hidden">
                {filteredAccounts.map((account) => (
                  <div
                    key={account.id}
                    className="p-4 mb-4 border rounded-lg bg-gray-100"
                  >
                    <p>
                      <span className="font-bold">Nama:</span> {account.name}
                    </p>
                    <p>
                      <span className="font-bold">Email:</span> {account.email}
                    </p>
                    <p>
                      <span className="font-bold">Role:</span> {account.role}
                    </p>
                    <p>
                      <span className="font-bold">No. Telepon:</span>{" "}
                      {account.phone_number}
                    </p>
                    <div className="flex justify-center item-center mt-2">
                      <button
                        onClick={() => handleDeleteUser(account.id)}
                        className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="size-6"
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
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageAkunList;
