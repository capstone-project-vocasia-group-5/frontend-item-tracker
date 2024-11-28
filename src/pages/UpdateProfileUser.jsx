import React, { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { FaAt, FaEyeSlash, FaEye } from "react-icons/fa";

const UpdateProfileUser = () => {
  // State untuk mengatur tipe input password
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content */}
      <main className="flex-grow ">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Judul Halaman */}
          <h1 className="text-center text-2xl sm:text-3xl font-semibold mb-12">
            Update Profile
          </h1>

          {/* Form */}
          <form className="w-full max-w-lg mx-auto bg-black p-6 rounded-md shadow-md">
            {/* Full Name */}
            <div className="mb-4">
              <label className="block text-sm sm:text-base text-white font-medium mb-2 text-left">
                Full Name
              </label>
              <Input
                type="text"
                placeholder="Full Name"
                className="w-full border px-4 py-2 rounded-md bg-white"
              />
            </div>

            {/* Username */}
            <div className="mb-4 relative">
              <label className="block text-sm sm:text-base text-white font-medium mb-2 text-left">
                Username
              </label>
              <Input
                type="text"
                placeholder="Username"
                className="w-full border px-4 py-2 rounded-md pl-10 bg-white"
              />
              <FaAt className="absolute top-10 left-3 text-gray-500" />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm sm:text-base text-white font-medium mb-2 text-left">
                Email
              </label>
              <Input
                type="email"
                placeholder="Email"
                className="w-full border px-4 py-2 rounded-md bg-white"
              />
            </div>

            {/* Phone Number */}
            <div className="mb-4">
              <label className="block text-sm sm:text-base text-white font-medium mb-2 text-left">
                Phone Number
              </label>
              <Input
                type="text"
                placeholder="Phone Number"
                className="w-full border px-4 py-2 rounded-md bg-white"
              />
            </div>

            {/* Password */}
            <div className="mb-4 relative">
              <label className="block text-sm sm:text-base text-white font-medium mb-2 text-left">
                Password
              </label>
              <Input
                type={showPassword ? "text" : "password"} // Gunakan state untuk tipe input
                placeholder="Password"
                className="w-full border px-4 py-2 rounded-md pr-10 bg-white"
              />
              {/* Ikon mata untuk toggle */}
              {showPassword ? (
                <FaEye
                  className="absolute top-10 right-3 text-gray-500 cursor-pointer"
                  onClick={() => setShowPassword(false)} // Sembunyikan password
                />
              ) : (
                <FaEyeSlash
                  className="absolute top-10 right-3 text-gray-500 cursor-pointer"
                  onClick={() => setShowPassword(true)} // Tampilkan password
                />
              )}
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <Button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md font-medium hover:bg-blue-600 transition-colors"
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default UpdateProfileUser;
