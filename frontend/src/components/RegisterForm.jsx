import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import axiosInstance from "../axiosInstance";

export default function RegisterForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const payload = {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
    };

    try {
      const response = await axiosInstance.post("/api/v1/register/", payload);

      if (response.status === 201 || response.status === 200) {
        setSuccess("🎉 Registration successful!");
        setTimeout(() => navigate("/login"), 1500);
      }
    } catch (err) {
      console.error(err);
      const data = err.response?.data || {};
      const message =
        data.first_name?.[0] ||
        data.last_name?.[0] ||
        data.email?.[0] ||
        data.password?.[0] ||
        data.non_field_errors?.[0] ||
        "Registration failed. Please check your input.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950 px-6 py-12">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-gray-900/80 p-8 shadow-2xl backdrop-blur">
        {/* Logo */}
        <div className="text-center">
          <img src={logo} alt="Your Company" className="mx-auto h-12 w-auto" />
          <h2 className="mt-6 text-2xl font-bold tracking-tight text-white">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Join us today and explore 🚀
          </p>
        </div>

        {/* Alerts */}
        {success && (
          <div className="rounded bg-green-600/80 p-3 text-center text-sm text-white">
            {success}
          </div>
        )}
        {error && (
          <div className="rounded bg-red-600/80 p-3 text-center text-sm text-white">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            {/* First Name */}
            <input
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
              placeholder="First name"
            />
            {/* Last Name */}
            <input
              type="text"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
              placeholder="Last name"
            />
          </div>

          {/* Email */}
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
            placeholder="you@example.com"
          />

          {/* Password */}
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
            placeholder="••••••••"
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:cursor-not-allowed disabled:opacity-50"
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
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            ) : (
              "Register"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
