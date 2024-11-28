import React, { useState } from "react";
import { Navbar } from "@/components/organisms/Navbar";
import { Footer } from "@/components/organisms/Footer";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { FaAt, FaEyeSlash, FaEye, FaUserCircle } from "react-icons/fa";

const UpdateProfileUser = () => {
  // State untuk form
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  // State untuk status loading dan pesan error/sukses
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(file); // Simpan file asli
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Buat FormData untuk mengirim file dan data form
      const formDataToSend = new FormData();
      formDataToSend.append("fullName", formData.fullName);
      formDataToSend.append("username", formData.username);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phoneNumber", formData.phoneNumber);
      formDataToSend.append("password", formData.password);
      if (profileImage) {
        formDataToSend.append("profileImage", profileImage);
      }

      // Kirim ke endpoint API
      const response = await fetch("https://api.example.com/user/profile", {
        method: "POST", // Ganti ke "PUT" jika diperlukan
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const result = await response.json();
      setMessage("Profile updated successfully!");
    } catch (error) {
      setMessage(error.message || "An error occurred while updating profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg mx-auto bg-black p-6 rounded-md shadow-md"
          >
            <h1 className="text-2xl sm:text-3xl font-semibold text-white mt-4 mb-8">Update Profile</h1>
            {/* Icon Foto Profile */}
            <div className="relative inline-block">
              <label htmlFor="profileImage" className="cursor-pointer relative">
                <div className="w-24 h-24 rounded-full mx-auto border-2 border-white flex items-center justify-center bg-black transition-colors duration-300 hover:bg-gray-700">
                  {profileImage ? (
                    <img
                      src={URL.createObjectURL(profileImage)}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <FaUserCircle className="text-white text-5xl" />
                  )}
                </div>
              </label>
              <input
                id="profileImage"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>


            {/* Full Name */}
            <div className="mb-4 mt-4">
              <label className="block text-sm sm:text-base text-white font-medium mb-2 text-left">Full Name</label>
              <Input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Full Name"
                className="w-full border px-4 py-2 rounded-md bg-white"
              />
            </div>

            {/* Username */}
            <div className="mb-4 relative">
              <label className="block text-sm sm:text-base text-white font-medium mb-2 text-left">Username</label>
              <Input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Username"
                className="w-full border px-4 py-2 rounded-md bg-white"
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm sm:text-base text-white font-medium mb-2 text-left">Email</label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="w-full border px-4 py-2 rounded-md bg-white"
              />
            </div>

            {/* Phone Number */}
            <div className="mb-4">
              <label className="block text-sm sm:text-base text-white font-medium mb-2 text-left">Phone Number</label>
              <div className="flex items-center">
                <Input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Phone Number"
                  className="w-full border px-4 py-2 rounded-r-md bg-white"
                  pattern="[0-9]*"
                  inputMode="numeric"
                  onKeyPress={(e) => {
                    if (!/[0-9]/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                />
              </div>
            </div>


            {/* Password */}
            <div className="mb-4 relative">
              <label className="block text-sm sm:text-base text-white font-medium mb-2 text-left">Password</label>
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                className="w-full border px-4 py-2 rounded-md pr-10 bg-white"
              />
              {showPassword ? (
                <FaEye
                  className="absolute top-10 right-3 text-gray-500 cursor-pointer"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <FaEyeSlash
                  className="absolute top-10 right-3 text-gray-500 cursor-pointer"
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>

            {/* Submit Button */}
            <div className="mt-10 mb-4">
              <Button
                type="submit"
                disabled={loading}
                className={`w-full py-2 rounded-md font-medium transition-colors ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                {loading ? "Submitting..." : "Submit"}
              </Button>
            </div>
            {message && (
              <p className={`text-center mt-4 ${message.includes("success") ? "text-green-500" : "text-red-500"}`}>
                {message}
              </p>
            )}
          </form>
        </div>
      </main>

      {/* Footer */}
      <div className="mt-16">
        <Footer />
      </div>
    </div>
  );
};

export default UpdateProfileUser;
