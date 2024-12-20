import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { registerUser } from "../api/api";
import LogoItemTracker from "../components/atoms/logo-item-tracker.jsx";
import TermsAndServicesCard from "../components/organisms/terms-and-services";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const navigate = useNavigate();

  const isFormValid = () => {
    return username && fullname && email && phoneNumber && password;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    if (!username || !fullname || !email || !phoneNumber || !password) {
      setErrorMessage("Harap mengisi data dengan lengkap.");
      setLoading(false);
      return;
    }

    if (!termsAccepted) {
      setErrorMessage("Anda harus menyetujui syarat dan ketentuan.");
      setLoading(false);
      return;
    }

    try {
      const response = await registerUser({
        username,
        name: fullname,
        email,
        phone_number: "+62" + phoneNumber,
        password,
      });

      localStorage.setItem("email", email);
      toast.success(response.data.message);

      navigate("/send-otp");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data?.errors);
      } else {
        toast.error("Terjadi kesalahan");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-5">
      <div className="w-full max-w-xl p-8 bg-black text-white rounded-lg shadow-lg">
        <div className="flex items-center justify-center mb-6 space-x-3">
          <img
            src="/image/logo-3-white.svg"
            alt="ItemTrack Logo"
            className="w-10 h-10 sm:w-8 sm:h-8 object-contain"
          />
          <LogoItemTracker className={`text-3xl`} />
        </div>

        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          {/* Input Fields */}
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm mb-1 text-left">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full bg-white px-4 py-2 rounded-md border text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* FullName */}
          <div>
            <label htmlFor="fullname" className="block text-sm mb-1 text-left">
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              className="w-full bg-white px-4 py-2 rounded-md border text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nama Lengkap"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm mb-1 text-left">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full bg-white px-4 py-2 rounded-md border text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="number" className="block text-sm mb-1 text-left">
              Nomor Telpon
            </label>
            <div className="flex items-center">
              <span className="bg-white text-black px-4 py-2 rounded-l-md border border-r-0">
                +62
              </span>
              <input
                type="tel"
                id="number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full bg-white px-2 py-2 rounded-r-md border text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="No. Telpon"
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
          <div>
            <label htmlFor="password" className="block text-sm mb-1 text-left">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full bg-white px-4 py-2 rounded-md border text-black focus:outline-none focus:ring-2 focus:ring-blue-500 mb-1"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  id="showPassword"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                  className="mr-2"
                />
                <label htmlFor="showPassword" className="text-sm">
                  Perlihatkan Password
                </label>
              </div>
            </div>
          </div>

          {/* Terms and Services Card */}
          {isFormValid() && password.length >= 6 && (
            <div style={{ marginTop: "20px" }}>
              <TermsAndServicesCard />
            </div>
          )}

          {/* Checkbox */}
          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="terms" className="text-sm">
              Saya menyetujui Syarat dan Ketentuan
            </label>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Mendaftar..." : "Daftar"}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm">
            Sudah punya akun?{" "}
            <a href="/login" className="text-blue-400 hover:underline">
              Masuk
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
