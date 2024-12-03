import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate(); // Hook navigasi

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
      const response = await fetch("https://api.sukisushi.works/api/v1/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login gagal");
      }

      // Berhasil login, arahkan ke halaman HomePageDefault
      alert("Login berhasil!");
      navigate("/homepage"); 
    } catch (error) {
      setErrorMessage(error.message);
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
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">ItemTrack</h1>
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
                {/* Checkbox Tampilkan Password */}
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

                {/* Hyperlink Lupa Password */}
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
