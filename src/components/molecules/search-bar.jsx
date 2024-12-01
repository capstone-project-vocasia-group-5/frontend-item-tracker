import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

export const SearchBar = () => {
  // State untuk data dropdown
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [zipCodes, setZipCodes] = useState([]);

  // State pilihan pengguna
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch data provinsi saat pertama kali render
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
    const provinceId = e.target.value;
    setSelectedProvince(provinceId);
    setSelectedCity("");
    setSelectedDistrict("");
    setPostalCode("");
    if (provinceId) fetchCities(provinceId);
  };

  const handleCityChange = (e) => {
    const cityId = e.target.value;
    setSelectedCity(cityId);
    setSelectedDistrict("");
    setPostalCode("");
    if (cityId) fetchDistricts(cityId);
  };

  const handleDistrictChange = (e) => {
    const districtId = e.target.value;
    setSelectedDistrict(districtId);
    if (districtId) fetchZipCodes(selectedCity, districtId);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log({
      searchQuery,
      selectedProvince,
      selectedCity,
      selectedDistrict,
      postalCode,
    });
  };

  return (
    <form
      onSubmit={handleSearch}
      className="md:max-w-2xl lg:max-w-4xl sm:max-w-xl max-w-sm mx-auto mt-10"
    >
      <div className="flex items-center space-x-2">
        {/* Filter Button */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Filter</Button>
          </PopoverTrigger>
          <PopoverContent className="w-full bg-white shadow-lg p-4 rounded-md">
            <div className="space-y-4">
              <div>
                <Label htmlFor="province">Provinsi</Label>
                <select
                  id="province"
                  value={selectedProvince}
                  onChange={handleProvinceChange}
                  className="block w-full mt-1 border rounded-md p-2  text-white"
                >
                  <option value="">Pilih Provinsi</option>
                  {provinces.map((prov) => (
                    <option key={prov.id} value={prov.id}>
                      {prov.text}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="city">Kota/Kabupaten</Label>
                <select
                  id="city"
                  value={selectedCity}
                  onChange={handleCityChange}
                  className="block w-full mt-1 border rounded-md p-2 text-white"
                >
                  <option value="">Pilih Kota/Kabupaten</option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.text}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="district">Kecamatan</Label>
                <select
                  id="district"
                  value={selectedDistrict}
                  onChange={handleDistrictChange}
                  className="block w-full mt-1 border rounded-md p-2 text-white"
                >
                  <option value="">Pilih Kecamatan</option>
                  {districts.map((district) => (
                    <option key={district.id} value={district.id}>
                      {district.text}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-3 items-center gap-2">
                <Label htmlFor="postalCode">Kode Pos</Label>
                <Input
                  id="postalCode"
                  value={postalCode}
                  placeholder="Masukkan Kode Pos"
                  className="col-span-2"
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* Search Bar */}
        <div className="relative w-full">
          <input
            type="search"
            id="search-bar"
            value={searchQuery}
            onChange={handleSearchChange}
            className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Cari item..."
            required
          />
          <button
            type="submit"
            className="absolute h-full top-0 right-0 p-2.5 text-white bg-primaryBlack rounded-r-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            <svg
              className="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </button>
        </div>
      </div>
    </form>
  );
};
