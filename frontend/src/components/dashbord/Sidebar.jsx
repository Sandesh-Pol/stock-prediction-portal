import React from "react";
import {
  Home,
  PlusCircle,
  History,
  UserCircle2,
  LineChart,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  handleGetStarted,
  setActiveSection,
}) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear JWT tokens
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    // Optional: clear any user-related data
    localStorage.removeItem("user");

    // Redirect to login
    navigate("/login");
  };

  return (
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
          onClick={() => setActiveSection("history")}
        >
          <History size={20} /> <span>History</span>
        </button>
        <button
          className="flex items-center gap-3 px-3 py-2 w-full rounded hover:bg-gray-700"
          onClick={() => setActiveSection("graphs")}
        >
          <LineChart size={20} />
          <span>Graphs</span>
        </button>
        <button
          className="flex items-center gap-3 px-3 py-2 w-full rounded hover:bg-gray-700"
          onClick={() => alert("Settings Clicked")}
        >
          <UserCircle2 size={20} /> <span>Settings</span>
        </button>
        <button
          className="flex items-center gap-3 px-3 py-2 w-full rounded hover:bg-gray-700 text-red-400 hover:text-red-300"
          onClick={handleLogout}
        >
          ✕ <span>Logout</span>
        </button>
      </nav>

      <div className="p-2 border-t border-gray-700">
        <p className="text-sm text-gray-400">&copy; 2025 Dashboard</p>
      </div>
    </div>
  );
}
