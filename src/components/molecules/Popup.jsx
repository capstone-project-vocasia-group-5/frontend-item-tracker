import React, { useState } from "react";

const Popup = ({ item, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!item) return null;

  const handleNext = () => {
    if (currentIndex < item.images.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-sm sm:max-w-md relative">
        <button
          className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 z-50"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-lg sm:text-xl font-bold mb-4 text-center">Detail Item</h2>
        <div className="flex flex-col space-y-4">
          {/* Kontainer gambar dengan tombol Next dan Prev */}
          <div className="relative w-full h-[180px] sm:h-[240px] mx-auto">
            {/* Tombol Prev */}
            {currentIndex > 0 && (
              <button
                onClick={handlePrev}
                className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-gray-300 rounded-full p-2 hover:bg-gray-400"
              >
                ◀
              </button>
            )}
            {/* Gambar */}
            <img
              src={item.images[currentIndex] || "default-image-url.png"}
              alt={`${item.name || "Image"} ${currentIndex + 1}`}
              className="w-full h-full object-contain rounded"
            />
            {/* Tombol Next */}
            {currentIndex < item.images.length - 1 && (
              <button
                onClick={handleNext}
                className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-gray-300 rounded-full p-2 hover:bg-gray-400"
              >
                ▶
              </button>
            )}
          </div>
          <div className="text-sm sm:text-base space-y-2">
            <p>
              <strong>Nama:</strong> {item.name}
            </p>
            <p>
              <strong>Kategori:</strong> {item.categories.map((category) => category.name).join(", ")}
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
    </div>
  );
};

export default Popup;
