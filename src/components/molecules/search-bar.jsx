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
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [villages, setVillages] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedVillage, setSelectedVillage] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [open, setOpen] = useState(false);

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
    const provinceId = e.target.value;
    setSelectedProvince(provinceId);
    setSelectedCity("");
    setSelectedDistrict("");
    setSelectedVillage("");
    setPostalCode("");
    if (provinceId) fetchCities(provinceId);
  };

  const handleCityChange = (e) => {
    const cityId = e.target.value;
    setSelectedCity(cityId);
    setSelectedDistrict("");
    setSelectedVillage("");
    setPostalCode("");
    if (cityId) fetchDistricts(cityId);
  };

  const handleDistrictChange = (e) => {
    const districtId = e.target.value;
    setSelectedDistrict(districtId);
    setSelectedVillage("");
    setPostalCode("");
    if (districtId) fetchVillages(districtId);
  };

  const handleVillageChange = (e) => {
    const districtId = selectedDistrict;
    const cityId = selectedCity;
    setSelectedVillage(e.target.value);
    fetchZipCodes(cityId, districtId);
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
      selectedVillage,
      postalCode,
    });
    setOpen(false);
  };

  return (
    <form onSubmit={handleSearch} className="w-full p-4">
      <div className="flex items-center space-x-2 ">
        {/* Filter Button */}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline">
              Filter{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-sliders-horizontal"
              >
                <line x1="21" x2="14" y1="4" y2="4" />
                <line x1="10" x2="3" y1="4" y2="4" />
                <line x1="21" x2="12" y1="12" y2="12" />
                <line x1="8" x2="3" y1="12" y2="12" />
                <line x1="21" x2="16" y1="20" y2="20" />
                <line x1="12" x2="3" y1="20" y2="20" />
                <line x1="14" x2="14" y1="2" y2="6" />
                <line x1="8" x2="8" y1="10" y2="14" />
                <line x1="16" x2="16" y1="18" y2="22" />
              </svg>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full bg-white shadow-lg p-4 rounded-md">
            <div className="space-y-4">
              <div>
                <Label htmlFor="province">Provinsi</Label>
                <select
                  id="province"
                  value={selectedProvince}
                  onChange={handleProvinceChange}
                  className="block w-full mt-1 border rounded-md p-2 text-white"
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
              <div>
                <Label htmlFor="village">Kelurahan</Label>
                <select
                  id="village"
                  value={selectedVillage}
                  onChange={handleVillageChange}
                  className="block w-full mt-1 border rounded-md p-2 text-white"
                >
                  <option value="">Pilih Kecamatan</option>
                  {villages.map((village) => (
                    <option key={village.id} value={village.id}>
                      {village.text}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-3 items-center gap-2">
                <Label htmlFor="postalCode">Kode Pos</Label>
                <Input
                  id="postalCode"
                  value={postalCode}
                  disabled
                  placeholder="Kode Pos"
                  className="col-span-2"
                />
              </div>

              {/* Buttons */}
              <div className="flex items-center space-x-2 mt-4 justify-end">
                {/* Reset Button */}
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedProvince("");
                    setSelectedCity("");
                    setSelectedDistrict("");
                    setPostalCode("");
                    setSearchQuery("");
                  }}
                >
                  Reset
                </Button>

                {/* Terapkan Button */}
                <Button
                  onClick={handleSearch}
                  className="bg-primaryBlack text-white hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
                >
                  Terapkan
                </Button>
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
            className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-black"
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
