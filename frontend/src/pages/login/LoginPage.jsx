import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import backgroundImage from "../../assets/image-login5.png";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (username, password) => {
    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error(`data yang anda masukkan salah`);
      }

      const data = await response.json();

      if (data.token && data.data?.role) {
        localStorage.setItem("username", username);
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.data.role);

        return {
          success: true,
          role: data.data.role,
          message: data.message,
        };
      } else {
        return {
          success: false,
          message: "Token atau role tidak ditemukan.",
        };
      }
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        message: error.message || "Terjadi kesalahan. Silakan coba lagi.",
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsError(false);

    const result = await handleLogin(username, password);

    if (result.success) {
      setMessage(result.message);
      setIsLoading(false);

      if (result.role === "admin") {
        navigate("/dashboard/admin");
      } else if (result.role === "manajer") {
        navigate("/dashboard/manajer");
      } else if (result.role === "kasir") {
        navigate("/dashboard/kasir");
      }
    } else {
      setIsError(true);
      setMessage(result.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="hidden lg:flex lg:w-2/5">
        <img
          src={backgroundImage}
          alt="Background"
          className="object-cover w-full h-full"
        />
      </div>

      <div className="flex items-center justify-center w-full lg:w-3/5 bg-white">
        <div className="w-full max-w-2xl p-6 space-y-4">
          <h1 className="text-3xl font-bold text-blue-600">Masuk ke Akun Anda</h1>
          <p className="text-gray-500">Masuk untuk mulai mencari menu favorit kalian</p>

          {isError && <p className="text-red-500">{message}</p>}

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Username"
                required
                autoComplete="username"
              />
            </div>

            <div className="relative">
              <input
                type={isPasswordVisible ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Password"
                required
                autoComplete="current-password"
              />
              {/* Improved icon styling */}
              <span
                className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                {isPasswordVisible ? (
                  <AiOutlineEyeInvisible size={24} className="text-gray-500 hover:text-indigo-600 transition-colors duration-300" />
                ) : (
                  <AiOutlineEye size={24} className="text-gray-500 hover:text-indigo-600 transition-colors duration-300" />
                )}
              </span>
            </div>

            <button
              type="submit"
              className={`w-full py-3 rounded-full text-white bg-indigo-600 hover:bg-indigo-700 transition-colors ${isLoading ? "cursor-not-allowed opacity-50" : ""}`}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Masuk"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;