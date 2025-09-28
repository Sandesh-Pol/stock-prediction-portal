import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Menu, PlusCircle, History, Home, UserCircle2 } from "lucide-react";
import APIDialog from "./APIDialog";

const GlassCard = ({ children }) => (
  <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 shadow">
    {children}
  </div>
);

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_BASE_API}/api/v1/predict/`
      );
      setData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading)
    return <p className="text-center mt-20 text-gray-200">Loading...</p>;
  if (!data)
    return <p className="text-center mt-20 text-gray-200">No data found</p>;

  const close_price = data.graphs?.close_price || [];
  const ma100 = data.graphs?.ma_100 || [];
  const ma200 = data.graphs?.ma_200 || [];
  const predLabels = data.prediction_graph?.labels || [];
  const predData = data.prediction_graph?.data || [];

  const priceData = close_price.map((val, i) => ({
    idx: i,
    close: val,
    ma100: ma100[i],
    ma200: ma200[i],
  }));

  const startIdx = close_price.length - predData.length;
  const predictionData = predData.map((predVal, i) => ({
    date: predLabels[i] || i,
    predicted: predVal,
    actual: close_price[startIdx + i],
  }));

  const handleGetStarted = () => {
    // Open the API dialog instead of navigating
    setIsDialogOpen(true);
  };

  const handleAPIResponse = async (response) => {
    console.log("API Response:", response);
    // refresh data after API submit
    await fetchData();
    setIsDialogOpen(false); // close dialog
  };

  return (
    <div className="h-screen w-screen bg-gray-900 text-gray-100 flex overflow-hidden">
      {/* Sidebar */}

      <div
        className={`fixed md:static top-0 left-0 h-full bg-gray-800 border-r border-gray-700 transform 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 transition-transform duration-300 w-64 z-50 flex flex-col`}
      >
        {/* mobile close */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700 md:hidden">
          <h2 className="text-lg font-bold">Menu</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-300 hover:text-white"
          >
            ✕
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {/* Navigation buttons */}
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
            Menu
          </h2>
          <button
            className="flex items-center gap-3 px-3 py-2 w-full rounded hover:bg-gray-700"
            onClick={() => navigate("/")}
          >
            <Home size={20} /> <span>Home</span>
          </button>
          <button
            className="flex items-center gap-3 px-3 py-2 w-full rounded hover:bg-gray-700"
            onClick={handleGetStarted}
          >
            <PlusCircle size={20} /> <span>Add Another</span>
          </button>
          <button
            className="flex items-center gap-3 px-3 py-2 w-full rounded hover:bg-gray-700"
            onClick={() =>
              document
                .getElementById("prediction")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <History size={20} /> <span>History</span>
          </button>
          

          {/* Metrics Section */}
          <div id="metrics" className="mt-8">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
              Metrics
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {Object.entries(data.metrics || {}).map(([key, value]) => (
                <GlassCard key={key}>
                  <h3 className="font-medium text-sm uppercase">{key}</h3>
                  <p className="text-lg font-bold mt-1">
                    {isNaN(value) ? value : Number(value).toFixed(2)}
                  </p>
                </GlassCard>
              ))}
            </div>
          </div>

          {/* Accessibility Section */}
          <div className="mt-8">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
              Accessibility
            </h2>
            <div className="flex flex-col gap-2">
              <button
                className="flex items-center gap-3 px-3 py-2 w-full rounded hover:bg-gray-700"
                onClick={() => alert("Settings Clicked")}
              >
                <UserCircle2 size={20} /> <span>Settings</span>
              </button>
              <button
                className="flex items-center gap-3 px-3 py-2 w-full rounded hover:bg-gray-700 text-red-400 hover:text-red-300"
                onClick={() => alert("Logout Clicked")}
              >
                ✕ <span>Logout</span>
              </button>
            </div>
          </div>
        </nav>

        <div className="p-2 border-t border-gray-700">
          <p className="text-sm text-gray-400">&copy; 2025 Dashboard</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header bar */}
        <div className="flex items-center justify-between bg-gray-800 px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden text-gray-300 hover:text-white"
            >
              <Menu size={28} />
            </button>
            <h1 className="text-xl font-bold">
              {data.company_name}
              {data.company && ` (${data.company})`}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">{data.username || "User"}</span>
            <UserCircle2 size={28} className="text-gray-300" />
          </div>
        </div>

        <main className="flex flex-col gap-6 p-6 h-[calc(100vh-64px)] min-h-0 overflow-y-scroll no-scrollbar scroll-smooth">
          <div className="flex flex-col gap-8">
            {/* Stock Price Chart */}
            <GlassCard id="stock">
              <h2 className="text-xl font-semibold mb-4">Stock Prices</h2>
              <div className="w-full h-64 sm:h-80 md:h-96">
                {priceData.length > 0 && (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={priceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                      <XAxis dataKey="idx" tick={{ fill: "#ccc" }} />
                      <YAxis tick={{ fill: "#ccc" }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#222",
                          border: "none",
                          color: "#fff",
                        }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="close"
                        stroke="#60a5fa"
                        dot={false}
                        strokeWidth={2}
                        name="Close Price"
                      />
                      <Line
                        type="monotone"
                        dataKey="ma100"
                        stroke="#34d399"
                        dot={false}
                        strokeDasharray="4 2"
                        strokeWidth={2}
                        name="MA 100"
                      />
                      <Line
                        type="monotone"
                        dataKey="ma200"
                        stroke="#fbbf24"
                        dot={false}
                        strokeDasharray="2 4"
                        strokeWidth={2}
                        name="MA 200"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>
            </GlassCard>

            {/* Prediction Chart */}
            <GlassCard id="prediction">
              <h2 className="text-xl font-semibold mb-4">
                Predicted vs Actual Prices
              </h2>
              <div className="w-full h-64 sm:h-80 md:h-96">
                {predictionData.length > 0 && (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={predictionData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                      <XAxis dataKey="date" tick={{ fill: "#ccc" }} />
                      <YAxis tick={{ fill: "#ccc" }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#222",
                          border: "none",
                          color: "#fff",
                        }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="predicted"
                        stroke="#f472b6"
                        dot={false}
                        strokeWidth={2}
                        name="Predicted"
                      />
                      <Line
                        type="monotone"
                        dataKey="actual"
                        stroke="#60a5fa"
                        dot={false}
                        strokeWidth={2}
                        name="Actual"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>
            </GlassCard>
          </div>
        </main>
      </div>
      {/* API Dialog */}
      <APIDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleAPIResponse}
        title="Stock Prediction API"
      />
    </div>
  );
}
