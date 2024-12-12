import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@nextui-org/react";
import "./css/search-bar.css";

export const SearchBar = ({ onSearch, onReset }) => {
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
  const [cityID, setCityID] = useState("");
  const [districtID, setDistrictID] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [open, setOpen] = useState(false);

  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  useEffect(() => {
    fetchProvinces();
  }, []);

  const handleReset = () => {
    setSelectedProvince("");
    setSelectedCity("");
    setSelectedDistrict("");
    setSelectedVillage("");
    setPostalCode("");
    setSearchQuery("");
    onReset();
  };

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

  const debouncedSearch = useCallback(
    debounce((query) => {
      const searchData = {
        search: query,
      };

      // Kirim data pencarian
      onSearch(searchData);
    }, 500), // 500ms jeda setelah mengetik
    []
  );

  // Update state dan panggil debounced search
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    const searchData = {
      province: selectedProvince,
      city: selectedCity,
      district: selectedDistrict,
      village: selectedVillage,
      postal_code: postalCode,
      search: searchQuery,
    };

    onSearch(searchData);
    setOpen(false);
  };

  return (
    <form onSubmit={handleSearch} className="w-full p-4">
      <div className="flex items-center space-x-2 ">
        {/* Filter Button */}

        {/* Search Bar */}
        <div className="relative w-full">
          <div className="search"></div>
          <div id="poda">
            <div className="glow"></div>
            <div className="darkBorderBg"></div>
            <div className="darkBorderBg"></div>
            <div className="darkBorderBg"></div>

            <div className="white"></div>

            <div className="borderr"></div>

            <div id="main">
              <input
                placeholder="Search..."
                type="text"
                name="text"
                className="input"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <div id="input-mask"></div>
              <div id="pink-mask"></div>
              <div className="filterBorder"></div>
              <Popover open={open} onOpenChange={setOpen}>
                {" "}
                <div id="filter-icon">
                  <PopoverTrigger className="bg-black">
                    <svg
                      preserveAspectRatio="none"
                      height="27"
                      width="27"
                      viewBox="4.8 4.56 14.832 15.408"
                      fill="none"
                      stroke="#fff"
                    >
                      <path
                        d="M8.16 6.65002H15.83C16.47 6.65002 16.99 7.17002 16.99 7.81002V9.09002C16.99 9.56002 16.7 10.14 16.41 10.43L13.91 12.64C13.56 12.93 13.33 13.51 13.33 13.98V16.48C13.33 16.83 13.1 17.29 12.81 17.47L12 17.98C11.24 18.45 10.2 17.92 10.2 16.99V13.91C10.2 13.5 9.97 12.98 9.73 12.69L7.52 10.36C7.23 10.08 7 9.55002 7 9.20002V7.87002C7 7.17002 7.52 6.65002 8.16 6.65002Z"
                        strokeWidth="1"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </PopoverTrigger>
                </div>
                <PopoverContent className="w-full shadow-lg p-4 rounded-md">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="province">Provinsi</Label>
                      <select
                        id="province"
                        value={selectedProvince}
                        onChange={handleProvinceChange}
                        className="block w-full mt-1 border rounded-md p-2 text-white bg-gray-900"
                      >
                        <option value="test">Pilih Provinsi</option>
                        {provinces.map((prov) => (
                          <option
                            key={prov.id}
                            value={prov.text}
                            data-id={prov.id}
                          >
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
                        className="block w-full mt-1 border rounded-md p-2 text-white bg-gray-500"
                      >
                        <option value="">Pilih Kota/Kabupaten</option>
                        {cities.map((city) => (
                          <option
                            key={city.id}
                            value={city.text}
                            data-id={city.id}
                          >
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
                        className="block w-full mt-1 border rounded-md p-2 text-white bg-gray-500"
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
                    <div>
                      <Label htmlFor="village">Kelurahan</Label>
                      <select
                        id="village"
                        value={selectedVillage}
                        onChange={handleVillageChange}
                        className="block w-full mt-1 border rounded-md p-2 text-white bg-gray-500"
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
                      <Button variant="outline" onClick={handleReset}>
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

              <div id="search-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  height="24"
                  fill="none"
                  className="feather feather-search"
                >
                  <circle stroke="url(#search)" r="8" cy="11" cx="11"></circle>
                  <line
                    stroke="url(#searchl)"
                    y2="16.65"
                    y1="22"
                    x2="16.65"
                    x1="22"
                  ></line>
                  <defs>
                    <linearGradient gradientTransform="rotate(50)" id="search">
                      <stop stopColor="#f8e7f8" offset="0%"></stop>
                      <stop stopColor="#b6a9b7" offset="50%"></stop>
                    </linearGradient>
                    <linearGradient id="searchl">
                      <stop stopColor="#b6a9b7" offset="0%"></stop>
                      <stop stopColor="#837484" offset="50%"></stop>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
