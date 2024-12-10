import React from "react";

const Popup = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
        <button
          className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 z-50"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-4">Detail Item</h2>
        <div className="flex flex-col space-y-4">
          {/* Kontainer gambar */}
          <div className="flex justify-center items-center">
            <img
              src={item.images[0] || "default-image-url.png"}
              alt={item.name}
              className="w-[200px] h-[200px] object-cover rounded"
            />
          </div>
          <p>
            <strong>Nama:</strong> {item.name}
          </p>
          <p>
            <strong>Deskripsi:</strong> {item.description}
          </p>
          <p>
            <strong>Nomor Telepon:</strong> {item.phone_number}
          </p>
          <p>
            <strong>Alamat:</strong>{" "}
            {`${item.village}, ${item.subdistrict}, ${item.city}, ${item.province}, ${item.postal_code}`}
          </p>
          <p>
            <strong>Tipe:</strong> {item.type}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Popup;
