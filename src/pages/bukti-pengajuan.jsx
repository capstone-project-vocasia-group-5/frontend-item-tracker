import React, { useState, useCallback } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/organisms/navbar";
import { Footer } from "@/components/organisms/footer";
import { createClaims } from "../api/api";
import imageCompression from "browser-image-compression";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/organisms/back-button";

const FileUpload = React.memo(
  ({ file, index, onFileChange, onRemoveImage }) => {
    return (
      <div
        key={index}
        className="relative bg-gray-100 border-2 border-gray-300 flex items-center justify-center w-40 h-40 md:w-52 md:h-52 rounded-lg overflow-hidden cursor-pointer"
        onClick={() => document.getElementById(`fileInput-${index}`).click()}
        style={{
          backgroundImage: file ? `url(${URL.createObjectURL(file)})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <input
          type="file"
          id={`fileInput-${index}`}
          className="hidden"
          accept="image/*"
          onChange={(e) => onFileChange(e, index)}
        />
        {!file && <p className="text-gray-500">Upload Bukti</p>}

        {file && (
          <button
            className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white text-xs w-8 h-8 rounded-full flex items-center justify-center"
            onClick={(e) => onRemoveImage(index, e)}
          >
            X
          </button>
        )}
      </div>
    );
  }
);

const BuktiPengajuan = () => {
  const [files, setFiles] = useState([null, null, null, null]);
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState("");
  const [notificationType, setNotificationType] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleClickBack = () => {
    navigate(-1);
  };

  const handleFileChange = useCallback(async (event, index) => {
    const file = event.target.files[0];
    const maxFileSize = 10 * 1024 * 1024;

    if (file) {
      if (file.size > maxFileSize) {
        setNotification(`File ke-${index + 1} melebihi ukuran maksimum 5MB.`);
        setNotificationType("error");
        setTimeout(() => setNotification(""), 3000);
        return;
      }

      try {
        const options = {
          maxSizeMB: 2,
          maxWidthOrHeight: 1024,
          useWebWorker: true,
        };

        const compressedFile = await imageCompression(file, options);
        setFiles((prevFiles) => {
          const updatedFiles = [...prevFiles];
          updatedFiles[index] = compressedFile;
          return updatedFiles;
        });
      } catch (error) {
        setNotification("Terjadi kesalahan saat mengompresi gambar.");
        setNotificationType("error");
        setTimeout(() => setNotification(""), 3000);
      }
    }
  }, []);

  const handleRemoveImage = useCallback((index, event) => {
    event.stopPropagation();
    setFiles((prevFiles) => {
      const updatedFiles = [...prevFiles];
      updatedFiles[index] = null;
      return updatedFiles;
    });
  }, []);

  const handleSubmit = async () => {
    // Validasi minimal satu gambar terunggah
    if (!files.some((file) => file !== null)) {
      setNotification("Harap unggah minimal satu gambar.");
      setNotificationType("error");
      setTimeout(() => setNotification(""), 3000);
      return;
    }

    // Validasi deskripsi wajib diisi
    if (description.trim() === "") {
      setNotification("Deskripsi wajib diisi.");
      setNotificationType("error");
      setTimeout(() => setNotification(""), 3000);
      return;
    }

    const formData = new FormData();

    formData.append("item_id", id);
    formData.append("claim_text", description);

    files.forEach((file) => {
      if (file) {
        formData.append("images", file);
      }
    });

    setIsSubmitting(true);
    try {
      await createClaims(formData);
      setNotification("Bukti pengajuan berhasil diunggah!");
      setNotificationType("success");

      // Reset form setelah berhasil
      setFiles([null, null, null, null]);
      setDescription("");

      setIsModalOpen(true);
    } catch (error) {
      if (error.response) {
        setNotification(
          error.response.data.errors ||
            "Terjadi kesalahan saat mengunggah bukti pengajuan."
        );
      }
      setNotificationType("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setNotification(""), 3000);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </header>

      {/* Notifikasi */}
      {notification && (
        <div
          className={`fixed bottom-16 right-4 px-6 py-2 rounded-lg shadow-md z-50 ${
            notificationType === "success" ? "bg-green-500" : "bg-red-500"
          } text-white`}
        >
          {notification}
        </div>
      )}

      {/* Modal Konfirmasi */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80 text-center">
            <h2 className="text-lg font-bold mb-4">Pengajuan anda sedang dalam proses verifikasi, Silahkan tunggu</h2>
            <div className="align-item-center">
              <Button className="bg-black text-white w-24" onClick={handleBack}>
                Kembali
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <main className="flex-1 w-full max-w-screen-xl container mx-auto py-10 px-4 overflow-y-auto items-center mt-12 justify-center min-h-screen">
        <BackButton handleClickBack={handleClickBack} />
        <h1 className="text-2xl font-bold text-center mb-16">
          Upload Bukti Kepemilikan
        </h1>

        {/* Form Layout */}
        <div className="flex flex-col items-center justify-center">
          <div className="flex-wrap justify-center gap-6 grid grid-cols-2 md:grid-cols-4">
            {files.map((file, index) => (
              <FileUpload
                key={index}
                index={index}
                file={file}
                onFileChange={handleFileChange}
                onRemoveImage={handleRemoveImage}
              />
            ))}
          </div>
        </div>

        {/* Deskripsi */}
        <div className="mt-6 flex justify-center">
          <div className="text-left md:w-[910px] w-[340px]">
            <label
              htmlFor="description"
              className="block text-sm font-medium mb-2 ml-2"
            >
              Deskripsi
            </label>
            <Textarea
              id="description"
              placeholder="Masukkan deskripsi barang"
              className="w-full h-64 border-2 border-gray-300"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        {/* Kirim Button */}
        <div className="mt-6 flex justify-center">
          <Button
            className="bg-black text-white md:w-[910px] w-[340px] h-12"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Mengirim..." : "Kirim"}
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
