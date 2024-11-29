import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Navbar } from "@/components/organisms/Navbar";
import { Footer } from "@/components/organisms/Footer";

const BuktiPengajuan = () => {
  const [files, setFiles] = useState([]);

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

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Header */}
      <header className="bg-black text-white">
        <Navbar />
      </header>

      {/* Content */}
      <main className="flex-1 container mx-auto py-10 px-4 overflow-y-auto">
        <h2 className="text-2xl font-semibold text-center mb-16">Upload Bukti Kepemilikan</h2>

        {/* Form Layout */}
        <div className="flex flex-col items-center gap-6 justify-center">
          {/* Box Image */}
          <div className="flex flex-wrap gap-6 justify-center">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="relative bg-gray-100 border-2 border-gray-300 flex items-center justify-center w-52 h-52 rounded-lg overflow-hidden cursor-pointer"
                onClick={() => document.getElementById(`fileInput-${index}`).click()}
                style={{
                  backgroundImage: files[index] ? `url(${files[index]})` : "none",
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
                {!files[index] && <p className="text-gray-500">Upload Bukti</p>}
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
          <Button className="bg-black text-white w-full sm:w-[910px] h-12">
            Kirim
          </Button>
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
