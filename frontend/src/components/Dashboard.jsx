import React, { useEffect, useState } from "react";
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

// Card component for dashboard items
const GlassCard = ({ children }) => (
  <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow">
    {children}
  </div>
);

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
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
    fetchData();
  }, []);

  if (loading)
    return <p className="text-center mt-20 text-gray-200">Loading...</p>;
  if (!data)
    return <p className="text-center mt-20 text-gray-200">No data found</p>;

  // Defensive extraction
  const close_price = data.graphs?.close_price || [];
  const ma100 = data.graphs?.ma_100 || [];
  const ma200 = data.graphs?.ma_200 || [];
  const predLabels = data.prediction_graph?.labels || [];
  const predData = data.prediction_graph?.data || [];

  // Build first chart (close, ma100, ma200)
  const priceData = close_price.map((val, i) => ({
    idx: i,
    close: val,
    ma100: ma100[i],
    ma200: ma200[i],
  }));

  // Build second chart with predicted vs actual
  const startIdx = close_price.length - predData.length;
  const predictionData = predData.map((predVal, i) => ({
    date: predLabels[i] || i,
    predicted: predVal,
    actual: close_price[startIdx + i],
  }));

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col md:flex-row">


      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          {data.company_name}
          {data.company && ` (${data.company})`}
        </h1>

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

        {/* Metrics grid */}
        <div
          id="metrics"
          className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {Object.entries(data.metrics || {}).map(([key, value]) => (
            <GlassCard key={key}>
              <h3 className="font-medium text-lg uppercase">{key}</h3>
              <p className="text-2xl font-bold mt-2">
                {isNaN(value) ? value : Number(value).toFixed(2)}
              </p>
            </GlassCard>
          ))}
        </div>
      </main>
    </div>
  );
}
