// src/pages/Login.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser, reset } from "../features/authSlice";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user || isSuccess) {
      if (user?.role === "admin") {
        navigate("/admin-dashboard");
      } else if (user?.role === "kasir") {
        navigate("/kasir-dashboard");
      } else if (user?.role === "manajer") {
        navigate("/manajer-dashboard");
      }
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ username, password }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Masuk</h1>
        {isError && <p className="text-red-500 text-sm text-center mb-4">{message}</p>}
        <p className="text-md text-center mb-4">Masuk untuk mulai mencari menu favorit kalian</p>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 focus:outline-none"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full ${isLoading ? "opacity-50" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Masuk"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
