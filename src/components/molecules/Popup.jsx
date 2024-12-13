import React, { useState } from "react";

const Popup = ({ title, item, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!item) return null;

  const images =
    item?.images?.length > 0 ? item.images : ["default-image-url.png"];

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
        <button
          className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 z-50"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4"> {title}</h2>
        <div className="flex flex-col space-y-4">
          {/* Kontainer gambar dengan navigasi */}
          <div className="relative flex justify-center items-center w-full h-[200px]">
            <img
              src={images[currentImageIndex]}
              alt={`Image ${currentImageIndex + 1}`}
              className="w-[200px] h-[200px] object-cover rounded"
            />
            <button
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
              onClick={handlePrev}
            >
              ◀
            </button>
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
              onClick={handleNext}
            >
              ▶
            </button>
          </div>
          <p className="text-sm text-gray-600 text-center">
            {currentImageIndex + 1} / {images.length}
          </p>
          <p>
            <strong>Nama:</strong> {item.name}
          </p>
          <p>
            <strong>Deskripsi:</strong> {item.description}
          </p>
          <p className={item.status ? "" : "hidden"}>
            <strong>Status:</strong>{" "}
            {item.is_approved === true
              ? "Disetujui"
              : item.is_approved === false
              ? "Ditolak"
              : "Belum Disetujui"}
          </p>
          <p className={item.phone_number ? "" : "hidden"}>
            <strong>Nomor Telepon:</strong> {item.phone_number}
          </p>
          <p className={item.village ? "" : "hidden"}>
            <strong>Alamat:</strong>{" "}
            {`${item.village}, ${item.subdistrict}, ${item.city}, ${item.province}, ${item.postal_code}`}
          </p>
          <p className={item.type ? "" : "hidden"}>
            <strong>Tipe:</strong> {item.type}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Popup;
