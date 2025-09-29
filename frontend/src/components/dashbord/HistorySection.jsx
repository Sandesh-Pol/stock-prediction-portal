import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function HistorySection() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("No access token found. Please login.");

      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_BASE_API}/api/v1/predict/history/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // ✅ attach access token
          },
        }
      );

      setHistory(res.data.results || []);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        alert("Token invalid or expired. Please login again.");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        navigate("/login");
      } else {
        alert(err.response?.data?.detail || "Failed to fetch history.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  if (loading)
    return <p className="text-center mt-10 text-gray-200">Loading history...</p>;

  if (!history.length)
    return <p className="text-center mt-10 text-gray-200">No history found</p>;

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 shadow">
      <h2 className="text-xl font-semibold mb-4 text-gray-100">Prediction History</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-gray-600">
            <tr className="text-gray-300">
              <th className="py-2 px-3">Ticker</th>
              <th className="py-2 px-3">Company</th>
              <th className="py-2 px-3">Date</th>
              <th className="py-2 px-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {history.map((row) => (
              <tr
                key={row.id}
                className="border-b border-gray-700 hover:bg-gray-700 transition-colors"
              >
                <td className="py-2 px-3 text-gray-100">{row.ticker}</td>
                <td className="py-2 px-3 text-gray-100">{row.company_name}</td>
                <td className="py-2 px-3 text-gray-100">
                  {new Date(row.created_at).toLocaleString()}
                </td>
                <td className="py-2 px-3">
                  <button
                    onClick={() => alert(`Viewing record ${row.id}`)}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded transition-colors"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
