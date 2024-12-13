import React, { useEffect, useState } from "react";

const UpdateModal = ({ item, onClose, onUpdate }) => {
  const [updatedData, setUpdatedData] = useState({
    name: "",
    description: "",
    images: [],
    type: "",
    province: "",
    city: "",
    subdistrict: "",
    village: "",
    postal_code: "",
    phone_number: "",
  });

  useEffect(() => {
    if (item) {
      setUpdatedData({
        name: item.name || "",
        description: item.description || "",
        images: item.images || [],
        type: item.type || "",
        province: item.province || "",
        city: item.city || "",
        subdistrict: item.subdistrict || "",
        village: item.village || "",
        postal_code: item.postal_code || "",
        phone_number: item.phone_number || "",
      });
    }
  }, [item]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdate(item._id, updatedData);
    onClose();
  };

  return (
    <div className="min-h-screen fixed inset-0 flex items-center justify-center bg-black bg-opacity-50  z-20">
      <div className="bg-white rounded shadow-lg">
        <h2 className="text-xl font-bold my-4">Perbarui Item</h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white w-[90vw] md:w-[50vw] p-4 rounded-lg shadow-md text-left"
        >
          <div className="grid grid-cols-2 gap-2">
            <div className="mb-2">
              <label
                for="title"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Title
              </label>
              <input
                value={updatedData.name}
                onChange={(e) =>
                  setUpdatedData({ ...updatedData, name: e.target.value })
                }
                placeholder="Enter title"
                type="text"
                className="shadow appearance-none text-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-2">
              <label
                for="title"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                No Handphone
              </label>
              <input
                value={updatedData.phone_number}
                onChange={(e) =>
                  setUpdatedData({
                    ...updatedData,
                    phone_number: e.target.value,
                  })
                }
                placeholder="Enter kelurahan"
                type="text"
                className="shadow appearance-none text-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="type"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Type
              </label>
              <select
                value={updatedData.type}
                onChange={(e) =>
                  setUpdatedData({ ...updatedData, type: e.target.value })
                }
                className="shadow appearance-none text-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="" disabled>
                  Select type
                </option>
                <option value="lost">Lost</option>
                <option value="found">Found</option>
              </select>
            </div>

            <div className="mb-2">
              <label
                for="title"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Provinsi
              </label>
              <input
                value={updatedData.province}
                onChange={(e) =>
                  setUpdatedData({ ...updatedData, province: e.target.value })
                }
                placeholder="Enter title"
                type="text"
                className="shadow appearance-none text-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-2">
              <label
                for="title"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Kota
              </label>
              <input
                value={updatedData.city}
                onChange={(e) =>
                  setUpdatedData({ ...updatedData, city: e.target.value })
                }
                placeholder="Enter title"
                type="text"
                className="shadow appearance-none text-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-2">
              <label
                for="title"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Kecamatan
              </label>
              <input
                value={updatedData.subdistrict}
                onChange={(e) =>
                  setUpdatedData({
                    ...updatedData,
                    subdistrict: e.target.value,
                  })
                }
                placeholder="Enter title"
                type="text"
                className="shadow appearance-none text-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-2">
              <label
                for="title"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Kelurahan
              </label>
              <input
                value={updatedData.village}
                onChange={(e) =>
                  setUpdatedData({ ...updatedData, village: e.target.value })
                }
                placeholder="Enter kelurahan"
                type="text"
                className="shadow appearance-none text-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-2">
              <label
                for="title"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Kode Pos
              </label>
              <input
                value={updatedData.postal_code}
                onChange={(e) =>
                  setUpdatedData({
                    ...updatedData,
                    postal_code: e.target.value,
                  })
                }
                placeholder="Enter kelurahan"
                type="text"
                className="shadow appearance-none text-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
          <div className="mb-2">
            <label
              for="content"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Content
            </label>
            <textarea
              value={updatedData.description}
              onChange={(e) =>
                setUpdatedData({
                  ...updatedData,
                  description: e.target.value,
                })
              }
              rows="3"
              placeholder="Enter your content"
              id="content"
              className="shadow appearance-none text-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            ></textarea>
          </div>
          <div className="flex items-center justify-end gap-4">
            <button
              type="submit"
              className="bg-blue-500 text-sm hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Perbarui
            </button>
            <button
              onClick={onClose}
              className="py-2 px-4 bg-gray-500 text-sm font-bold text-white rounded"
            >
              Tutup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateModal;
