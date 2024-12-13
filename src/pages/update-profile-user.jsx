import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaEyeSlash, FaEye, FaUser } from "react-icons/fa";
import { getUser, updateUsers } from "../api/api";
import { toast } from "sonner";

const UpdateProfileUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    phone_number: "",
    images: null,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleGet = async () => {
    setLoading(true);
    try {
      const response = await getUser();
      if (response.data && response.data.success) {
        const user = response.data.data.user;
        setFormData({
          name: user.name,
          username: user.username,
          email: user.email,
          password: "",
          phone_number: user.phone_number,
          images: null,
        });
        setProfileImage(user.image_url);
      } else {
        throw new Error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Gagal mengambil data pengguna.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Menghapus karakter non-digit
    const phoneNumber = formData.phone_number.replace(/\D/g, "");
    console.log("Nomor telepon yang akan dikirim:", phoneNumber); // Log nomor telepon
    console.log("Panjang nomor telepon:", phoneNumber.length); // Log panjang nomor telepon

    // Coba kirim nomor telepon tanpa angka nol di depan
    const formattedPhoneNumber = phoneNumber.startsWith("0")
      ? phoneNumber.slice(1)
      : phoneNumber;

    if (formattedPhoneNumber.length < 8 || formattedPhoneNumber.length > 13) {
      toast.error("Nomor telepon harus memiliki 8 hingga 13 digit.");
      setLoading(false);
      return; // Hentikan eksekusi jika validasi gagal
    }

    const dataToSend = new FormData();
    dataToSend.append("name", formData.name);
    dataToSend.append("username", formData.username);
    dataToSend.append("email", formData.email);
    if (formData.password) {
      dataToSend.append("password", formData.password);
    }
    dataToSend.append("phone_number", formattedPhoneNumber); // Menggunakan nomor telepon yang sudah diformat
    if (formData.images) {
      dataToSend.append("images", formData.images); // Kirim file gambar baru
    }

    try {
      const response = await updateUsers(dataToSend); // Pastikan Anda memanggil API dengan benar
      if (response.data && response.data.success) {
        toast.success("Profil berhasil diperbarui!");
        setMessage("Profil berhasil diperbarui!");
        setProfileImage(response.data.data.user.image_url); // Update gambar profil
      } else {
        throw new Error("Gagal memperbarui profil");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      if (error.response) {
        console.error("Response data:", error.response.data); // Log data respons
        toast.error(
          `Gagal memperbarui profil: ${
            error.response.data.message || "Kesalahan tidak diketahui."
          }`
        );
      } else {
        toast.error("Gagal memperbarui profil.");
      }
      setMessage("Gagal memperbarui profil.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGet(); // Memanggil fungsi untuk mendapatkan data pengguna saat komponen dimuat
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Ambil file pertama yang dipilih

    if (file) {
      // Periksa ukuran file
      if (file.size > 10 * 1024 * 1024) {
        toast.error("Ukuran file tidak boleh lebih dari 10 MB");
        return;
      }
      const fileURL = URL.createObjectURL(file);
      setProfileImage(fileURL);
      setFormData((prev) => ({
        ...prev,
        images: file,
      }));
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <form
            onSubmit={handleUpdate}
            className="w-full max-w-lg mx-auto bg-black p-6 rounded-md shadow-md"
          >
            <h1 className="text-2xl sm:text-3xl font-semibold text-white mt-4 mb-8">
              Update Profile
            </h1>
            {/* Icon Foto Profile */}
            <div className="relative inline-block mb-4">
              <label htmlFor="profileImage" className="cursor-pointer relative">
                <div className="w-24 h-24 rounded-full mx-auto border-2 border-white flex items-center justify-center bg-black transition-colors duration-300 hover:bg-gray-700">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <FaUser className="text-white text-5xl" />
                  )}
                </div>
              </label>
              <input
                type="file"
                id="profileImage"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            {/* Full Name */}
            <div className="mb-4 mt-4">
              <label className="block text-sm sm:text-base text-white font-medium mb-2 text-left">
                Full Name
              </label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
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
                name="username"
                value={formData.username}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    username: e.target.value,
                  })
                }
                placeholder="Username"
                className="w-full border px-4 py-2 rounded-md bg-white"
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm sm:text-base text-white font-medium mb-2 text-left">
                Email
              </label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
                placeholder="Email"
                className="w-full border px-4 py-2 rounded-md bg-white"
              />
            </div>

            {/* Phone Number */}
            <div className="mb-4">
              <label className="block text-sm sm:text-base text-white font-medium mb-2 text-left">
                Phone Number
              </label>
              <div className="flex items-center">
                <Input
                  type="tel"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      phone_number: e.target.value,
                    })
                  }
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
              <label className="block text-sm sm:text-base text-white font-medium mb-2 text-left">
                Password
              </label>
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password: e.target.value,
                  })
                }
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
              <p
                className={`text-center mt-4 ${
                  message.includes("berhasil")
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {message}
              </p>
            )}
          </form>
        </div>
      </main>
    </div>
  );
};

export default UpdateProfileUser;
