import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedKecamatan, setSelectedKecamatan] = useState("");
  const [postalCode, setPostalCode] = useState("");

  // Handle perubahan input
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleProvinceChange = (event) => {
    setSelectedProvince(event.target.value);
  };

  const handlePostalCodeChange = (event) => {
    setPostalCode(event.target.value);
  };
  const handleKecamatanChange = (event) => {
    setSelectedKecamatan(event.target.value);
  };

  // Fungsi pencarian
  const handleSearch = (e) => {
    e.preventDefault();
    console.log({
      searchQuery,
      selectedCity,
      selectedProvince,
      selectedKecamatan,
      postalCode,
    });
  };

  return (
    <form
      onSubmit={handleSearch}
      className="md:max-w-2xl lg:max-w-4xl sm:max-w-xl max-w-sm mx-auto mt-10"
    >
      <div className="flex items-center space-x-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex items-center">
              Filter
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="ml-2"
                viewBox="0 0 20 20"
              >
                <path d="M10 12.5l4.5-6h-9l4.5 6zm0 1l4.5-6h-9l4.5 6zM2 17h16v-2H2v2z" />
              </svg>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4 bg-white shadow-lg rounded-md">
            <div className="grid gap-4">
              <h4 className="text-lg font-semibold">Filter</h4>
              <div className="space-y-4">
                <div className="grid grid-cols-3 items-center gap-2">
                  <Label htmlFor="province">Province</Label>
                  <Input
                    id="province"
                    value={selectedProvince}
                    onChange={handleProvinceChange}
                    placeholder="Masukkan Provinsi"
                    className="col-span-2"
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={selectedCity}
                    onChange={handleCityChange}
                    placeholder="Masukkan Kota"
                    className="col-span-2"
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-2">
                  <Label htmlFor="Kecamatan">Kecamatan</Label>
                  <Input
                    id="Kecamatan"
                    value={selectedKecamatan}
                    onChange={handleKecamatanChange}
                    placeholder="Masukkan Kota"
                    className="col-span-2"
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-2">
                  <Label htmlFor="postalCode">Kode Pos</Label>
                  <Input
                    id="postalCode"
                    value={postalCode}
                    onChange={handlePostalCodeChange}
                    placeholder="Masukkan Kode Pos"
                    className="col-span-2"
                  />
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <div className="relative w-full">
          <input
            type="search"
            id="search-bar"
            value={searchQuery}
            onChange={handleSearchChange}
            className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Search items..."
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
