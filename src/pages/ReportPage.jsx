import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Navbar } from "@/components/organisms/Navbar";
import { Footer } from "@/components/organisms/Footer";

const ReportPage = () => {
  const [files, setFiles] = useState([]); // State untuk menyimpan gambar
  const [selectedImage, setSelectedImage] = useState(null); // Gambar utama yang dipilih

  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files).map((file) => URL.createObjectURL(file));
    setFiles((prevFiles) => [...prevFiles, ...newFiles]); // Tambahkan gambar baru
    if (!selectedImage && newFiles.length > 0) {
      setSelectedImage(newFiles[0]); // Set gambar utama jika belum ada
    }
  };

  const handleSelectImage = (image) => {
    setSelectedImage(image); // Ganti gambar utama
  };

  const handleRemoveImage = (image) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file !== image));
    if (selectedImage === image) {
      setSelectedImage(files[0] || null); // Set gambar utama ke gambar pertama atau null jika kosong
    }
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Header */}
      <header className="bg-black text-white">
        <Navbar />
      </header>

      {/* Content */}
      <main className="flex-1 container mx-auto py-10 px-4 overflow-y-auto mt-20">
        <h2 className="text-2xl font-semibold text-center mb-16">Laporan Kehilangan Barang</h2>

        {/* Form Layout */}
        <div className="flex flex-col md:flex-row items-center gap-6 justify-center">
          {/* Upload Foto */}
          <div className="flex flex-col items-center">
            <div
              className="bg-gray-100 border-dashed border-2 border-gray-300 flex items-center justify-center w-full sm:w-96 h-96 rounded-lg cursor-pointer"
              onClick={() => document.getElementById("fileInput").click()}
            >
              {selectedImage ? (
                <img src={selectedImage} alt="Uploaded" className="object-cover w-full h-full rounded-lg" />
              ) : (
                <p className="text-gray-500">Klik untuk upload foto barang</p>
              )}
              <input
                type="file"
                id="fileInput"
                className="hidden"
                multiple
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>

            {/* Thumbnail Preview */}
            {files.length > 0 && (
              <div className="mt-4 flex gap-2 overflow-x-auto">
                {files.map((file, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={file}
                      alt={`Thumbnail ${index}`}
                      className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                        selectedImage === file ? "border-black" : "border-gray-300"
                      }`}
                      onClick={() => handleSelectImage(file)}
                    />
                    {/* Icon Trash */}
                    <button
                      className="absolute top-1 right-1 p-1 bg-white text-gray-600 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleRemoveImage(file)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Form */}
          <div className="space-y-4 text-left w-full sm:w-[500px]">
            <div>
              <label htmlFor="itemName" className="block text-sm font-medium mb-2 ml-2">Nama Barang</label>
              <Input id="itemName" placeholder="Masukkan nama barang" className="w-full h-12" />
            </div>

            <div className="text-left">
              <label htmlFor="category" className="block text-sm font-medium mb-2 ml-2">Kategori</label>
              <Select>
                <SelectTrigger id="category" className="w-full h-12">
                  <SelectValue placeholder="Pilih kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="elektronik">Elektronik</SelectItem>
                  <SelectItem value="pakaian">Pakaian</SelectItem>
                  <SelectItem value="lainnya">Lainnya</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="text-left">
              <label htmlFor="phoneNumber" className="block text-sm font-medium mb-2 ml-2">Nomor Telepon</label>
              <Input id="phoneNumber" placeholder="Masukkan nomor telepon" className="w-full h-12" />
            </div>

            <div className="text-left">
              <label htmlFor="location" className="block text-sm font-medium mb-2 ml-2">Lokasi</label>
              <Select>
                <SelectTrigger id="location" className="w-full h-12">
                  <SelectValue placeholder="Pilih lokasi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="jakarta">Jakarta</SelectItem>
                  <SelectItem value="bandung">Bandung</SelectItem>
                  <SelectItem value="surabaya">Surabaya</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Deskripsi */}
        <div className="mt-6 flex justify-center">
          <div className="text-left w-full sm:w-[910px]">
            <label htmlFor="description" className="block text-sm font-medium mb-2 ml-2">Deskripsi</label>
            <Textarea id="description" placeholder="Masukkan deskripsi barang" className="w-full h-64" />
          </div>
        </div>

        {/* Upload Button */}
        <div className="mt-6 flex justify-center">
          <Button className="bg-black text-white w-full sm:w-[910px] h-12">Upload</Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white">
        <Footer />
      </footer>
    </div>
  );
};

export default ReportPage;
