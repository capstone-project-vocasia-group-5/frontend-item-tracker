import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import axios from "axios";
import BackButton from "../components/organisms/back-button";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Navbar } from "@/components/organisms/navbar";
import { Footer } from "@/components/organisms/footer";
import { getAllCategories, createReport } from "../api/api";
import { toast } from "sonner";
import Preloader from "../components/templates/preloader/preloader";

const reportTypes = [
  { value: "lost", label: "Kehilangan Barang" },
  { value: "found", label: "Penemuan Barang" },
];

const ReportPage = () => {
  const [files, setFiles] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("+62");
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [villages, setVillages] = useState([]);
  const [postalCode, setPostalCode] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedVillage, setSelectedVillage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [reportType, setReportType] = useState("");
  const [categories, setCategories] = useState([]);
  const [inputCategories, setInputCategories] = useState("");
  const [cityID, setCityID] = useState("");
  const [districtID, setDistrictID] = useState("");
  const [description, setDescription] = useState("");
  const [inputFiles, setInputFiles] = useState([]);

  const navigate = useNavigate();

  const handleClickUpload = async () => {
    setIsLoading(true);
    try {
      if (!name || !description || !inputFiles || !reportType) {
        toast.error("Semua kolom harus diisi");
        return;
      }

      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("type", reportType);
      formData.append("province", selectedProvince);
      formData.append("city", selectedCity);
      formData.append("subdistrict", selectedDistrict);
      formData.append("village", selectedVillage);
      formData.append("postal_code", postalCode);
      formData.append("phone_number", phoneNumber);
      formData.append("categories", inputCategories);

      inputFiles.forEach((file) => {
        formData.append("images", file);
      });

      const response = await createReport(formData);

      if (response.status === 201) {
        toast.success(response?.data?.message);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data?.errors || "Terjadi kesalahan");
      } else {
        toast.error("Terjadi kesalahan");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        setCategories(response.data.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files).filter((file) => {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("Ukuran file tidak boleh lebih dari 10 MB");
        return false;
      }
      return true;
    });

    if (files.length + newFiles.length > 5) {
      toast.error("Maksimal 5 gambar");
      return;
    }

    setInputFiles((prevFiles) => [...prevFiles, ...newFiles]);

    const newFileURLs = newFiles.map((file) => URL.createObjectURL(file));
    setFiles((prevFiles) => [...prevFiles, ...newFileURLs]);
    if (!selectedImage && newFileURLs.length > 0) {
      setSelectedImage(newFileURLs[0]);
    }

    if (!selectedImage && newFiles.length > 0) {
      setSelectedImage(URL.createObjectURL(newFiles[0]));
    }
  };

  const handleNextImage = () => {
    const currentIndex = files.indexOf(selectedImage);
    const nextIndex = (currentIndex + 1) % files.length;
    setSelectedImage(files[nextIndex]);
  };

  const handlePrevImage = () => {
    const currentIndex = files.indexOf(selectedImage);
    const prevIndex = (currentIndex - 1 + files.length) % files.length;
    setSelectedImage(files[prevIndex]);
  };

  const handleSelectImage = (image) => {
    setSelectedImage(image);
  };

  const handleRemoveImage = (image) => {
    setFiles((prevFiles) => {
      const updatedFiles = prevFiles.filter((file) => file !== image);
      if (selectedImage === image) {
        setSelectedImage(updatedFiles[0] || null);
      }
      return updatedFiles;
    });
  };

  const handlePhoneNumberChange = (event) => {
    const value = event.target.value;
    if (/^\+62\d*$/.test(value)) {
      setPhoneNumber(value);
    }
  };

  useEffect(() => {
    fetchProvinces();
  }, []);

  const fetchProvinces = async () => {
    try {
      const response = await axios.get(
        "https://alamat.thecloudalert.com/api/provinsi/get/"
      );
      setProvinces(response.data.result);
    } catch (error) {
      console.error("Error fetching provinces:", error);
    }
  };

  const fetchCities = async (provinceId) => {
    try {
      const response = await axios.get(
        `https://alamat.thecloudalert.com/api/kabkota/get/?d_provinsi_id=${provinceId}`
      );
      setCities(response.data.result);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const fetchDistricts = async (cityId) => {
    try {
      const response = await axios.get(
        `https://alamat.thecloudalert.com/api/kecamatan/get/?d_kabkota_id=${cityId}`
      );
      setDistricts(response.data.result);
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  };

  const fetchVillages = async (districtId) => {
    try {
      const response = await axios.get(
        `https://alamat.thecloudalert.com/api/kelurahan/get/?d_kecamatan_id=${districtId}`
      );
      setVillages(response.data.result);
    } catch (error) {
      console.error("Error fetching villages:", error);
    }
  };

  const fetchZipCodes = async (cityId, districtId) => {
    try {
      const response = await axios.get(
        `https://alamat.thecloudalert.com/api/kodepos/get/?d_kabkota_id=${cityId}&d_kecamatan_id=${districtId}`
      );

      if (response.data.result.length > 0) {
        setPostalCode(response.data.result[0].text);
      } else {
        setPostalCode("Belum tersedia");
      }
    } catch (error) {
      console.error("Error fetching zip codes:", error);
    }
  };

  const handleProvinceChange = (e) => {
    const provinceText = e.target.value;
    const provinceId =
      e.target.options[e.target.selectedIndex].getAttribute("data-id");
    setSelectedProvince(provinceText);
    setSelectedCity("");
    setSelectedDistrict("");
    setSelectedVillage("");
    setPostalCode("");
    if (provinceId) fetchCities(provinceId);
  };

  const handleCityChange = (e) => {
    const cityText = e.target.value;
    const cityId =
      e.target.options[e.target.selectedIndex].getAttribute("data-id");

    setCityID(cityId);
    setSelectedCity(cityText);
    setSelectedDistrict("");
    setSelectedVillage("");
    setPostalCode("");
    if (cityId) fetchDistricts(cityId);
  };

  const handleDistrictChange = (e) => {
    const districtText = e.target.value;
    const districtId =
      e.target.options[e.target.selectedIndex].getAttribute("data-id");
    setSelectedDistrict(districtText);
    setSelectedVillage("");
    setPostalCode("");
    setDistrictID(districtId);
    if (districtId) fetchVillages(districtId);
  };

  const handleVillageChange = (e) => {
    const villageText = e.target.value;
    setSelectedVillage(villageText);
    fetchZipCodes(cityID, districtID);
  };

  const handleClickBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col min-h-screen ">
      {isLoading && <Preloader />}
      <Navbar />

      {/* Content */}
      <main className="flex-1 container mx-auto w-full max-w-screen-xl min-h-screen p-4 mb-6 overflow-y-auto ">
        <div>
          <BackButton handleClickBack={handleClickBack} />
          <h2 className="text-2xl font-semibold text-center mb-16 ">
            Buat Laporan
          </h2>
        </div>
        {/* Form Layout */}
        <div className="flex flex-col md:flex-row items-center gap-6 justify-center">
          {/* Upload Foto */}
          <div className="flex flex-col items-center ">
            <div
              className="bg-gray-100 border-dashed border-2 border-gray-300 flex items-center justify-center h-[350px] w-[350px] sm:h-[500px] sm:w-[500px] rounded-lg relative"
              onClick={() => document.getElementById("fileInput").click()}
            >
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt="Uploaded"
                  className="object-cover w-full h-full rounded-lg"
                />
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
              {/* Icon Prev dan Next */}
              {files.length > 1 && (
                <>
                  {/* Tombol Prev */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrevImage();
                    }}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all duration-200 hover:bg-gray-800 hover:scale-110 hover:shadow-lg"
                  >
                    ←
                  </button>
                  {/* Tombol Next */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNextImage();
                    }}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all duration-200 hover:bg-gray-800 hover:scale-110 hover:shadow-lg"
                  >
                    →
                  </button>
                </>
              )}
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
                        selectedImage === file
                          ? "border-black"
                          : "border-gray-300"
                      }`}
                      onClick={() => handleSelectImage(file)}
                    />
                    {/* Icon Delete (x) */}
                    <button
                      className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white text-xs w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md"
                      onClick={() => handleRemoveImage(file)}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Form */}
          <div className="space-y-4 text-left w-full sm:w-[500px]">
            <div>
              <label
                htmlFor="itemName"
                className="block text-sm font-medium mb-2 ml-2"
              >
                Nama Barang
              </label>
              <Input
                id="itemName"
                placeholder="Masukkan nama barang"
                className="w-full h-12"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="text-left">
              <label
                htmlFor="category"
                className="block text-sm font-medium mb-2 ml-2"
              >
                Jenis Laporan
              </label>
              <Select onValueChange={(value) => setReportType(value)}>
                <SelectTrigger id="category" className="w-full h-12">
                  <SelectValue placeholder="Pilih Jenis Laporan" />
                </SelectTrigger>
                <SelectContent>
                  {reportTypes.map((reportType) => (
                    <SelectItem key={reportType.value} value={reportType.value}>
                      {reportType.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="text-left">
              <label
                htmlFor="category"
                className="block text-sm font-medium mb-2 ml-2"
              >
                Kategori
              </label>
              <Select onValueChange={(value) => setInputCategories(value)}>
                <SelectTrigger id="category" className="w-full h-12">
                  <SelectValue placeholder="Pilih kategori" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="text-left">
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium mb-2 ml-2"
              >
                Nomor Telepon
              </label>
              <Input
                id="phoneNumber"
                placeholder="Masukkan nomor telepon"
                className="w-full h-12"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              {/* Provinsi */}
              <div>
                <label
                  className="block text-sm font-medium mb-2 ml-2"
                  htmlFor="province"
                >
                  Provinsi
                </label>
                <select
                  id="province"
                  value={selectedProvince}
                  onChange={handleProvinceChange}
                  className="block w-full text-sm font-medium border rounded-md p-2 text-black bg-white"
                >
                  <option value="">Pilih Provinsi</option>
                  {provinces.map((prov) => (
                    <option key={prov.id} value={prov.text} data-id={prov.id}>
                      {prov.text}
                    </option>
                  ))}
                </select>
              </div>
              {/* Kota */}
              <div>
                <label
                  className="block text-sm font-medium mb-2 ml-2"
                  htmlFor="city"
                >
                  Kota/Kabupaten
                </label>
                <select
                  id="city"
                  value={selectedCity}
                  onChange={handleCityChange}
                  className="block w-full  text-sm font-medium mt-1 border rounded-md p-2 text-black bg-white"
                >
                  <option className="block text-sm  mb-2 ml-2" value="">
                    Pilih Kota/Kabupaten
                  </option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.text} data-id={city.id}>
                      {city.text}
                    </option>
                  ))}
                </select>
              </div>
              {/* Kecamatan */}
              <div>
                <label
                  className="block text-sm font-medium mb-2 ml-2"
                  htmlFor="district"
                >
                  Kecamatan
                </label>
                <select
                  id="district"
                  value={selectedDistrict}
                  onChange={handleDistrictChange}
                  className="block w-full text-sm font-medium  mt-1 border rounded-md p-2 text-black bg-white"
                >
                  <option value="">Pilih Kecamatan</option>
                  {districts.map((district) => (
                    <option
                      key={district.id}
                      value={district.text}
                      data-id={district.id}
                    >
                      {district.text}
                    </option>
                  ))}
                </select>
              </div>
              {/* Kelurahan */}
              <div>
                <label
                  className="block text-sm font-medium mb-2 ml-2"
                  htmlFor="district"
                >
                  Kelurahan
                </label>
                <select
                  id="district"
                  value={selectedVillage}
                  onChange={handleVillageChange}
                  className="block w-full text-sm font-medium mt-1 border rounded-md p-2 text-black bg-white"
                >
                  <option value="">Pilih Kelurahan</option>
                  {villages.map((village) => (
                    <option
                      key={village.id}
                      value={village.text}
                      data-id={village.id}
                    >
                      {village.text}
                    </option>
                  ))}
                </select>
              </div>
              {/* Kode Pos */}
              <div>
                <label className="block text-sm font-medium mb-2 ml-2">
                  Kode Pos
                </label>
                <Input
                  value={postalCode}
                  disabled
                  className="w-full h-12"
                  placeholder="Kode Pos"
                />
              </div>
            </div>
          </div>
        </div>
        {/* Deskripsi */}
        <div className="mt-6 flex justify-center">
          <div className="text-left w-full sm:w-[1025px]">
            <label
              htmlFor="description"
              className="block text-sm font-medium mb-2 ml-2"
            >
              Deskripsi
            </label>
            <Textarea
              id="description"
              placeholder="Masukkan deskripsi barang"
              className="w-full h-64"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        {/* Upload Button */}
        <div className="mt-6 flex justify-center">
          <Button
            onClick={handleClickUpload}
            className="bg-black text-white w-full sm:w-[1025px] h-12"
          >
            Upload
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

export default ReportPage;
