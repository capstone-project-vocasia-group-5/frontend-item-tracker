import React, { useState } from "react";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    if (!username || !fullname || !email || !phoneNumber || !password) {
      setErrorMessage("Harap mengisi data dengan lengkap.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("https://your-api-endpoint.com/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          fullname,
          email,
          phoneNumber: `+62${phoneNumber}`,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registrasi gagal.");
      }

      alert("Registrasi berhasil! Silakan masuk.");
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-96 p-8 bg-black text-white rounded-lg shadow-lg">
        {/* Logo */}
        <div className="flex items-center justify-center mb-6 space-x-3">
          <img
            src="/image/Logo.png"
            alt="ItemTrack Logo"
            className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
          />
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">ItemTrack</h1>
        </div>

        {/* Form */}
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          {/* Username Input */}
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

          {/* FullName Input */}
          <div>
            <label htmlFor="fullname" className="block text-sm mb-1 text-left">
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              className="w-full bg-white px-4 py-2 rounded-md border text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Full Name"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
          </div>

          {/* Email Input */}
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

          {/* No. Telephone Input */}
          <div>
            <label htmlFor="number" className="block text-sm mb-1 text-left">
              No. Telephone
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
                placeholder="No. Telephone"
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

          {/* Password Input */}
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
                  Show Password
                </label>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Mendaftar..." : "Daftar"}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-4">
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
