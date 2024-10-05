import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate dari react-router-dom
import { handleLogin } from "./ApiHandler"; // Import function handleLogin
import backgroundImage from "../../assets/image-login5.png";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Gunakan useNavigate untuk redirect

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsError(false);

    const result = await handleLogin(username, password);

    if (result.success) {
      setMessage(result.message);
      setIsLoading(false);

      // Redirect berdasarkan role pengguna
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
      {/* Gambar Latar Belakang */}
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
            <div>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Password"
                required
                autoComplete="current-password"
              />
            </div>
            <button
              type="submit"
              className={`w-full py-3 rounded-full text-white bg-indigo-600 hover:bg-indigo-700 transition-colors ${isLoading ? "cursor-not-allowed opacity-50" : ""
                }`}
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
