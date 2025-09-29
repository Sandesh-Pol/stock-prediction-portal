import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const APIDialog = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    ticker: "AAPL",
    company_name: "Apple",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); 
  const navigate = useNavigate();

  // Helper to get JWT header
  const getAuthHeader = () => {
    const token = localStorage.getItem("accessToken");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_API}/api/v1/predict/`,
        formData,
        { 
          headers: { 
            "Content-Type": "application/json",
            ...getAuthHeader()
          } 
        }
      );

      setSuccess("Prediction saved successfully!");
      setTimeout(() => {
        onClose();
        navigate("/dashboard"); // optional redirect
      }, 1500);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.detail || 
        err.response?.data?.error || 
        "Failed to fetch data. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className="relative w-full max-w-md rounded-2xl bg-white dark:bg-gray-800 p-8 shadow-2xl ring-1 ring-gray-200 dark:ring-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Ticker Symbol
            </label>
            <input
              type="text"
              name="ticker"
              value={formData.ticker}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Company Name
            </label>
            <input
              type="text"
              name="company_name"
              value={formData.company_name}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              required
            />
          </div>

          {error && <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/40 p-2 rounded-md">{error}</div>}
          {success && <div className="text-sm text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/40 p-2 rounded-md">{success}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-indigo-500 dark:hover:bg-indigo-400 transition-colors flex items-center justify-center"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v2a6 6 0 00-6 6H4z"></path>
                </svg>
                Loading...
              </>
            ) : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default APIDialog;
