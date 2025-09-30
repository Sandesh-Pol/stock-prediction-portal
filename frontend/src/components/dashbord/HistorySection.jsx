import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosInstance";

export default function HistorySection({ onView }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState({ type: "", message: "" });
  const [deleteConfirmId, setDeleteConfirmId] = useState(null); // new state

  const navigate = useNavigate();

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/api/v1/predict/history/");
      setHistory(res.data.results || []);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        setFeedback({ type: "error", message: "Token invalid or expired. Please login again." });
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setFeedback({ type: "error", message: err.response?.data?.detail || "Failed to fetch history." });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/api/v1/predict/${id}/`);
      setHistory((prev) => prev.filter((row) => row.id !== id));
      setFeedback({ type: "success", message: "Record deleted successfully." });
      setDeleteConfirmId(null); // hide confirmation
    } catch (err) {
      console.error(err);
      setFeedback({ type: "error", message: err.response?.data?.detail || "Failed to delete record." });
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 shadow relative">
      <h2 className="text-xl font-semibold mb-4 text-gray-100">Prediction History</h2>

      {feedback.message && (
        <div
          className={`mb-4 px-4 py-2 rounded ${
            feedback.type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"
          }`}
        >
          {feedback.message}
        </div>
      )}

      {loading ? (
        <p className="text-center mt-10 text-gray-200">Loading history...</p>
      ) : !history.length ? (
        <p className="text-center mt-10 text-gray-200">No history found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-600">
              <tr className="text-gray-300">
                <th className="py-2 px-3">Ticker</th>
                <th className="py-2 px-3">Company</th>
                <th className="py-2 px-3">Date</th>
                <th className="py-2 px-3">Actions</th>
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
                  <td className="py-2 px-3 flex gap-2">
                    <button
                      onClick={() => onView(row.id)}
                      className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded transition-colors"
                    >
                      View
                    </button>

                    {deleteConfirmId === row.id ? (
                      <>
                        <button
                          onClick={() => handleDelete(row.id)}
                          className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded transition-colors"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(null)}
                          className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded transition-colors"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirmId(row.id)}
                        className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded transition-colors"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
