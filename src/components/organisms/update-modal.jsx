import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAllCategories } from "../../api/api";

const UpdateModal = ({ item, onClose, onUpdate }) => {
  const [updatedData, setUpdatedData] = useState({
    name: "",
    description: "",
    type: "",
    province: "",
    city: "",
    subdistrict: "",
    village: "",
    postal_code: "",
    phone_number: "",
    categories: "",
  });
  const [categories, setCategories] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [villages, setVillages] = useState([]);
  const [postalCode, setPostalCode] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedVillage, setSelectedVillage] = useState("");
  const [cityID, setCityID] = useState(null);
  const [districtID, setDistrictID] = useState(null);

  useEffect(() => {
    fetchProvinces();
    if (item) {
      setSelectedProvince(item.province ?? "");
      setSelectedCity(item.city ?? "");
      setSelectedDistrict(item.subdistrict ?? "");
      setSelectedVillage(item.village ?? "");
      setPostalCode(item.postal_code ?? "");
      setUpdatedData({
        name: item.name ?? "",
        description: item.description ?? "",
        type: item.type ?? "",
        province: item.province ?? "",
        city: item.city ?? "",
        subdistrict: item.subdistrict ?? "",
        village: item.village ?? "",
        postal_code: item.postal_code ?? "",
        phone_number: item.phone_number ?? "",
        categories: item.categories ?? "",
      });
    }
  }, [item]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedFields = {};
    for (const key in updatedData) {
      if (updatedData[key] !== item[key]) {
        updatedFields[key] = updatedData[key];
      }
    }
    if (updatedFields.categories) {
      updatedFields.categories = Array.isArray(updatedFields.categories)
        ? updatedFields.categories.map((category) => category.toString())
        : [updatedFields.categories.toString()];
    }
    onUpdate(item._id, updatedFields);
    onClose();
  };

  useEffect(() => {
    fetchProvinces();
  }, []);

  const fetchProvinces = async () => {
    try {
      const response = await fetch(
        "https://alamat.thecloudalert.com/api/provinsi/get/"
      );
      const data = await response.json();
      setProvinces(data.result);
    } catch (error) {
      console.error("Error fetching provinces:", error);
    }
  };

  const fetchCities = async (provinceId) => {
    try {
      const response = await fetch(
        `https://alamat.thecloudalert.com/api/kabkota/get/?d_provinsi_id=${provinceId}`
      );
      const data = await response.json();
      setCities(data.result);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const fetchDistricts = async (cityId) => {
    try {
      const response = await fetch(
        `https://alamat.thecloudalert.com/api/kecamatan/get/?d_kabkota_id=${cityId}`
      );
      const data = await response.json();
      setDistricts(data.result);
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  };

  const fetchVillages = async (districtId) => {
    try {
      const response = await fetch(
        `https://alamat.thecloudalert.com/api/kelurahan/get/?d_kecamatan_id=${districtId}`
      );
      const data = await response.json();
      setVillages(data.result);
    } catch (error) {
      console.error("Error fetching villages:", error);
    }
  };

  const fetchZipCodes = async (cityId, districtId) => {
    try {
      const response = await fetch(
        `https://alamat.thecloudalert.com/api/kodepos/get/?d_kabkota_id=${cityId}&d_kecamatan_id=${districtId}`
      );
      const data = await response.json();
      const newPostalCode =
        data.result.length > 0 ? data.result[0].text : "Belum tersedia";
      setPostalCode(newPostalCode);
      setUpdatedData((prev) => ({ ...prev, postal_code: newPostalCode }));
    } catch (error) {
      console.error("Error fetching zip codes:", error);
    }
  };

  const handleProvinceChange = (e) => {
    const provinceText = e.target.value;
    const provinceId =
      e.target.options[e.target.selectedIndex].getAttribute("data-id");
    setSelectedProvince(provinceText);
    setUpdatedData((prev) => ({ ...prev, province: provinceText }));
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
    setUpdatedData((prev) => ({ ...prev, city: cityText }));
    setSelectedDistrict("");
    setSelectedVillage("");
    setPostalCode("");
    if (cityId) fetchDistricts(cityId);
  };

  const handleDistrictChange = (e) => {
    const districtText = e.target.value;
    const districtId =
      e.target.options[e.target.selectedIndex].getAttribute("data-id");
    setDistrictID(districtId);
    setSelectedDistrict(districtText);
    setUpdatedData((prev) => ({ ...prev, subdistrict: districtText }));
    setSelectedVillage("");
    setPostalCode("");
    if (districtId) fetchVillages(districtId);
  };

  const handleVillageChange = (e) => {
    const villageText = e.target.value;
    setSelectedVillage(villageText);
    setUpdatedData((prev) => ({ ...prev, village: villageText }));
    fetchZipCodes(cityID, districtID);
  };

  const handlePostalCodeChange = (e) => {
    const newPostalCode = e.target.value;
    setPostalCode(newPostalCode);
    setUpdatedData({
      ...updatedData,
      postal_code: newPostalCode,
    });
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

  return (
    <div className="min-h-screen fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
      <div className="bg-white rounded shadow-lg">
        <h2 className="text-xl font-bold my-4">Perbarui Item</h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white w-[90vw] md:w-[50vw] p-4 rounded-lg shadow-md text-left"
        >
          <div className="grid grid-cols-2 gap-2">
            {/* Add input fields here */}
            {/* Title */}
            <div className="mb-2">
              <label
                htmlFor="title"
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
                className="shadow bg-white appearance-none text-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            {/* Phone Number */}
            <div className="mb-2">
              <label
                htmlFor="phone_number"
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
                placeholder="Enter no handphone"
                type="text"
                className="shadow bg-white appearance-none text-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            {/* Category Select */}
            <div className="mb-2">
              <label
                htmlFor="category"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Kategori
              </label>
              <select
                value={updatedData.categories}
                onChange={(e) =>
                  setUpdatedData({ ...updatedData, categories: e.target.value })
                }
                className="shadow bg-white appearance-none text-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="" disabled>
                  Pilih kategori
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Province Select */}
            <div className="mb-2">
              <label
                htmlFor="province"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Provinsi
              </label>
              <select
                value={selectedProvince}
                onChange={handleProvinceChange}
                className="shadow bg-white appearance-none text-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="" disabled>
                  Pilih Provinsi
                </option>
                {provinces.map((province) => (
                  <option
                    key={province.id}
                    data-id={province.id}
                    value={province.text}
                  >
                    {province.text}
                  </option>
                ))}
              </select>
            </div>

            {/* City Select */}
            <div className="mb-2">
              <label
                htmlFor="city"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Kota
              </label>
              <select
                onChange={handleCityChange}
                value={selectedCity}
                className="shadow bg-white appearance-none text-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Pilih Kota/Kabupaten</option>
                {cities.map((city) => (
                  <option key={city.id} data-id={city.id} value={city.text}>
                    {city.text}
                  </option>
                ))}
              </select>
            </div>

            {/* Subdistrict Select */}
            <div className="mb-2">
              <label
                htmlFor="subdistrict"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Kecamatan
              </label>

              <select
                onChange={handleDistrictChange}
                value={selectedDistrict}
                className="shadow bg-white appearance-none text-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Pilih Kecamatan</option>
                {districts.map((district) => (
                  <option
                    key={district.id}
                    data-id={district.id}
                    value={district.text}
                  >
                    {district.text}
                  </option>
                ))}
              </select>
            </div>

            {/* Village Select */}
            <div className="mb-2">
              <label
                htmlFor="village"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Kelurahan
              </label>
              <select
                onChange={handleVillageChange}
                value={selectedVillage}
                className="shadow bg-white appearance-none text-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Pilih Kelurahan</option>
                {villages.map((village) => (
                  <option key={village.id} value={village.text}>
                    {village.text}
                  </option>
                ))}
              </select>
            </div>

            {/* Postal Code */}
            <div className="mb-2">
              <label
                htmlFor="postal_code"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Kode Pos
              </label>
              <input
                value={postalCode}
                onChange={handlePostalCodeChange}
                placeholder="Enter kode pos"
                type="text"
                className="shadow bg-white appearance-none text-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
          <div className="mb-2">
            <label
              htmlFor="content"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Deskripsi
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
              className="shadow bg-white appearance-none text-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
