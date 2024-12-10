import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/organisms/navbar";
import { Footer } from "@/components/organisms/footer";

const BuktiPengajuan = () => {
  const [files, setFiles] = useState([null, null, null, null]); // Set default dengan null untuk 4 gambar

  const handleFileChange = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const newFileUrl = URL.createObjectURL(file);
      setFiles((prevFiles) => {
        const updatedFiles = [...prevFiles];
        updatedFiles[index] = newFileUrl;
        return updatedFiles;
      });
    }
  };

  const handleRemoveImage = (index, event) => {
    event.stopPropagation();
    setFiles((prevFiles) => {
      const updatedFiles = [...prevFiles];
      updatedFiles[index] = null; // Hapus gambar pada index yang sesuai
      return updatedFiles;
    });
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </header>

      {/* Content */}
      <main className="flex-1 container mx-auto py-10 px-4 overflow-y-auto mt-24">
        <h1 className="text-2xl font-bold text-center mb-16">Upload Bukti Kepemilikan</h1>
        {/* Form Layout */}
        <div className="flex flex-col items-center justify-center">
          {/* Box Image */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 grid grid-cols-2 md:grid-cols-4">
            {files.map((file, index) => (
              <div
                key={index}
                className="relative bg-gray-100 border-2 border-gray-300 flex items-center justify-center w-40 h-40 md:w-52 md:h-52 rounded-lg overflow-hidden cursor-pointer"
                onClick={() => document.getElementById(`fileInput-${index}`).click()}
                style={{
                  backgroundImage: file ? `url(${file})` : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <input
                  type="file"
                  id={`fileInput-${index}`}
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, index)}
                />
                {!file && <p className="text-gray-500">Upload Bukti</p>}

                {/* Icon Delete (X) */}
                {file && (
                  <button
                    className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white text-xs w-8 h-8 rounded-full flex items-center justify-center opacity-100 transition-opacity duration-200 shadow-md"
                    onClick={(e) => handleRemoveImage(index, e)}
                  >
                    X
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Deskripsi */}
        <div className="mt-6 flex justify-center">
          <div className="text-left w-full sm:w-[910px]">
            <label htmlFor="description" className="block text-sm font-medium mb-2 ml-2">
              Deskripsi
            </label>
            <Textarea id="description" placeholder="Masukkan deskripsi barang" className="w-full h-64" />
          </div>
        </div>

        {/* Kirim Button */}
        <div className="mt-6 flex justify-center">
          <Button className="bg-black text-white w-full sm:w-[910px] h-12">Kirim</Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white">
        <Footer />
      </footer>
    </div>
  );
};

export default BuktiPengajuan;
