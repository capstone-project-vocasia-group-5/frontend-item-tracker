import "../App.css";
import React, { useState, useEffect } from "react";
import {
  getAllCategories,
  updateCategory,
  deleteCategory,
  createCategory,
} from "../api/api.js";
import { getAllItems } from "../api/api.js";
import { toast } from "sonner";

const ManageCategory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editName, setEditName] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        setCategories(response.data.data.categories);
        toast.success("Data berhasil diambil.");
      } catch (error) {
        toast.log("Error fetching categories: ", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await getAllItems();
        setItems(response.data.data.items);
      } catch (error) {
        toast.error("Error fetching items:", error);
      }
    };
    fetchItems();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for: ", searchQuery);
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return new Intl.DateTimeFormat("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  const handleEditClick = (category) => {
    setEditingCategory(category);
    setEditName(category.name);
  };

  const handleSaveEdit = async () => {
    try {
      await updateCategory(editingCategory.id, { name: editName });
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.id === editingCategory.id
            ? { ...category, name: editName }
            : category
        )
      );
      setEditingCategory(null);
    } catch (error) {
      toast.error("Error updating category:", error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await deleteCategory(categoryId);
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category.id !== categoryId)
      );
      toast.success("Kategori berhasil dihapus.");
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Terjadi kesalahan saat menghapus kategori.");
    }
  };

  const handleCreateCategory = async () => {
    if (newCategoryName.trim() === "") {
      toast.warning("Nama kategori tidak boleh kosong.");
      return;
    }

    try {
      const response = await createCategory({ name: newCategoryName });
      setCategories([...categories, response.data.data.category]);
      setNewCategoryName("");
      toast.success("Kategori berhasil dibuat.");
    } catch (error) {
      console.error("Error creating category:", error);
      toast.error("Terjadi kesalahan saat membuat kategori.");
    }
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
    <div className="min-h-screen flex flex-col">
      <div className="p-4">
        <header className="bg-white shadow-sm p-4 mb-6 flex justify-between">
          <h1 className="text-xl font-bold">Manajemen Kategori</h1>
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

          {/* Create Category Section */}
          <div className="p-5">
            <div className="flex space-x-4 justify-center">
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                className="p-2.5 border rounded-md w-full sm:w-1/2"
                placeholder="Nama kategori baru..."
              />
              <button
                onClick={handleCreateCategory}
                className="p-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Tambah Kategori
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto px-2 sm:px-6 md:px-9">
            <table className="w-full bg-white">
              <thead className="bg-black text-white rounded-t-lg">
                <tr>
                  <th className="px-4 py-4 text-center text-sm sm:px-8">
                    Nama Kategori
                  </th>
                  <th className="px-4 py-4 text-center text-sm sm:px-8">
                    Jumlah Barang
                  </th>
                  <th className="px-4 py-4 text-center text-sm sm:px-8">
                    Tanggal Dibuat
                  </th>
                  <th className="px-4 py-4 text-center text-sm sm:px-8">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-500 text-center">
                {filteredCategories.length > 0 ? (
                  filteredCategories.map((category) => (
                    <tr key={category.id}>
                      <td className="px-4 py-4 sm:px-8">{category.name}</td>
                      <td className="px-4 py-4 sm:px-8">
                        {
                          items.filter(
                            (item) => item.category_id === category.id
                          ).length
                        }
                      </td>

                      <td className="px-4 py-4 sm:px-8">
                        {formatDate(category.created_at)}
                      </td>
                      {/* Responsive Actions Column */}
                      <td className="px-4 py-4 sm:px-8 space-x-2 flex justify-center items-center">
                        {editingCategory?.id === category.id ? (
                          <>
                            <input
                              type="text"
                              value={editName}
                              onChange={(e) => setEditName(e.target.value)}
                              className="border p-1 rounded tex-sm w-24"
                            />
                            <button
                              onClick={handleSaveEdit}
                              className="p-1 bg-green-500 text-white rounded hover:bg-green-600"
                            >
                              Simpan
                            </button>
                            <button
                              onClick={() => setEditingCategory(null)}
                              className="p-1 bg-red-500 text-white rounded hover:bg-gray-600"
                            >
                              Batal
                            </button>
                          </>
                        ) : (
                          <>
                            {/* Large Screens */}
                            <div className="hidden sm:flex space-x-2">
                              <button
                                onClick={() => handleEditClick(category)}
                                className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="size-6"
                                >
                                  <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                  <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                                </svg>
                              </button>
                              <button
                                onClick={() =>
                                  handleDeleteCategory(category.id)
                                }
                                className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="size-6"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                                    clip-rule="evenodd"
                                  />
                                </svg>
                              </button>
                            </div>
                            {/* Small Screens */}
                            <div className="sm:hidden relative dropdown-container">
                              <button
                                className="p-2 bg-gray-800 text-white rounded-md hover:bg-gray-600"
                                onClick={() =>
                                  setActiveDropdown(
                                    activeDropdown === category.id
                                      ? null
                                      : category.id
                                  )
                                }
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
                              {activeDropdown === category.id && (
                                <div
                                  className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10"
                                  style={{ top: "-4rem" }}
                                >
                                  <button
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                    onClick={() => handleEditClick(category)}
                                  >
                                    Ubah
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleDeleteCategory(category.id)
                                    }
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                  >
                                    Hapus
                                  </button>
                                </div>
                              )}
                            </div>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-4 py-4 sm:px-8 text-center text-sm"
                    >
                      Tidak ada kategori ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageCategory;
