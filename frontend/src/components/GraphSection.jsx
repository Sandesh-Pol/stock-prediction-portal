import React from "react";
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

const GlassCard = ({ children, id }) => (
  <div id={id} className="bg-gray-800 border border-gray-700 rounded-xl p-4 shadow">
    {children}
  </div>
);

export default function GraphSection({ data }) {
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

  return (
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
                <Tooltip contentStyle={{ backgroundColor: "#222", border: "none", color: "#fff" }} />
                <Legend />
                <Line type="monotone" dataKey="close" stroke="#60a5fa" dot={false} strokeWidth={2} name="Close Price" />
                <Line type="monotone" dataKey="ma100" stroke="#34d399" dot={false} strokeDasharray="4 2" strokeWidth={2} name="MA 100" />
                <Line type="monotone" dataKey="ma200" stroke="#fbbf24" dot={false} strokeDasharray="2 4" strokeWidth={2} name="MA 200" />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </GlassCard>

      {/* Prediction Chart */}
      <GlassCard id="prediction">
        <h2 className="text-xl font-semibold mb-4">Predicted vs Actual Prices</h2>
        <div className="w-full h-64 sm:h-80 md:h-96">
          {predictionData.length > 0 && (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={predictionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                <XAxis dataKey="date" tick={{ fill: "#ccc" }} />
                <YAxis tick={{ fill: "#ccc" }} />
                <Tooltip contentStyle={{ backgroundColor: "#222", border: "none", color: "#fff" }} />
                <Legend />
                <Line type="monotone" dataKey="predicted" stroke="#f472b6" dot={false} strokeWidth={2} name="Predicted" />
                <Line type="monotone" dataKey="actual" stroke="#60a5fa" dot={false} strokeWidth={2} name="Actual" />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </GlassCard>
    </div>
  );
}
