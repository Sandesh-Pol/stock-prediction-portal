import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, UserCircle2 } from "lucide-react";
import Sidebar from "./Sidebar";
import GraphSection from "./GraphSection";
import HistorySection from "./HistorySection";
import APIDialog from "../APIDialog";
import axiosInstance from "../../axiosInstance";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("graphs");

  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/api/v1/predict/"); // <-- axiosInstance handles token
      setData(res.data);
      console.log(res.data);
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

  const handleGetStarted = () => setIsDialogOpen(true);

  const handleAPIResponse = async () => {
    await fetchData();
    setIsDialogOpen(false);
  };

  const handleViewPrediction = async (id) => {
    try {
      const res = await axiosInstance.get(`/api/v1/predict/${id}/`);
      setData(res.data); // this updates GraphSection
      setActiveSection("graphs"); // switch to graph view
    } catch (err) {
      console.error(err);
      alert("Failed to load prediction details.");
    }
  };

  return (
    <div className="h-screen w-screen bg-gray-900 text-gray-100 flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        navigate={navigate}
        handleGetStarted={handleGetStarted}
        setActiveSection={setActiveSection}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between bg-gray-800 px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden text-gray-300 hover:text-white"
            >
              <Menu size={28} />
            </button>
            <h1 className="text-xl font-bold">
              {data.company_name} {data.company && ` (${data.company})`}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">{data.first_name || "User"}</span>
            <UserCircle2 size={28} className="text-gray-300" />
          </div>
        </div>

        <main className="flex flex-col gap-6 p-6 h-[calc(100vh-64px)] overflow-y-scroll no-scrollbar scroll-smooth">
          {activeSection === "graphs" ? (
            <GraphSection data={data} />
          ) : (
            <HistorySection onView={handleViewPrediction} />
          )}
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
