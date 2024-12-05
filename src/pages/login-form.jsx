import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../api/api";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    if (!email || !password) {
      setErrorMessage("Email dan Password harus diisi");
      setLoading(false);
      return;
    }

    try {
      const response = await loginUser({ email, password });
      const token = response.data.data.token;
      localStorage.setItem("token", token);
      toast.success(response.data.message);

      navigate("/after");
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-5">
      <div className="w-full max-w-sm lg:max-w-md p-6 sm:p-8 bg-black text-white rounded-lg shadow-lg">
        <div className="flex items-center justify-center mb-6 space-x-3">
          <img
            src="/image/Logo.png"
            alt="ItemTrack Logo"
            className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
          />
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
            ItemTrack
          </h1>
        </div>
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <div className="text-left">
            <label htmlFor="email" className="block text-sm mb-1">
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
          <div className="text-left">
            <label htmlFor="password" className="block text-sm mb-1">
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
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="showPassword"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                    className="mr-2"
                  />
                  <label htmlFor="showPassword" className="text-sm">
                    Tampilkan Password
                  </label>
                </div>

                <a
                  href="/send-otp"
                  className="text-sm text-blue-400 hover:underline"
                >
                  Lupa Password?
                </a>
              </div>
            </div>
          </div>

          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Memuat..." : "Masuk"}
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-xs sm:text-sm">
            Tidak punya akun?{" "}
            <a href="/register" className="text-blue-400 hover:underline">
              Daftar
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
