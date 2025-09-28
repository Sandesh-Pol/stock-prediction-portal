import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import axiosInstance from "../axiosInstance";
import { AuthContext } from "../AuthProvider";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await axiosInstance.post("/api/v1/login/", { email, password });
      if (response.status === 200) {
        localStorage.setItem("accessToken", response.data.access);
        localStorage.setItem("refreshToken", response.data.refresh);

        setIsLoggedIn(true);
        setSuccess("Login successful!");
        setTimeout(() => navigate("/"), 1500);
      }
    } catch (err) {
      const message =
        err.response?.data?.email?.[0] ||
        err.response?.data?.password?.[0] ||
        err.response?.data?.non_field_errors?.[0] ||
        "Login failed. Please check your email and password.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 bg-gray-900">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <img src={logo} alt="Your Company" className="mx-auto h-12 w-auto" />
        <h2 className="mt-6 text-3xl font-extrabold text-white">
          Sign in to your account
        </h2>
        <p className="mt-2 text-sm text-gray-400">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-indigo-400 hover:text-indigo-300"
          >
            Create one
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        {success && (
          <div className="mb-4 rounded bg-green-600 p-3 text-white text-center shadow-lg">
            {success}
          </div>
        )}
        {error && (
          <div className="mb-4 rounded bg-red-600 p-3 text-white text-center shadow-lg">
            {error}
          </div>
        )}

        <div className="bg-gray-800 shadow-xl rounded-lg px-6 py-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-100">
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md bg-gray-700 px-3 py-2 text-white shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                placeholder="you@example.com"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-100">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-md bg-gray-700 px-3 py-2 text-white shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                placeholder="••••••••"
              />
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className={`flex w-full justify-center items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  loading ? "cursor-not-allowed opacity-50" : ""
                }`}
              >
                {loading ? (
                  <svg
                    className="h-5 w-5 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                ) : (
                  "Sign In"
                )}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-gray-800 px-2 text-gray-400">Or continue with</span>
            </div>
          </div>

          {/* Google Login */}
          <div className="mt-6">
            <button
              type="button"
              className="flex w-full items-center justify-center gap-x-3 rounded-md bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48">
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303..."
                />
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571..."
                />
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0..."
                />
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20..."
                />
              </svg>
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
