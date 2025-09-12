import React from "react";
import logo from "../assets/logo.png"; // Your logo here
import {
  BellIcon,
  HomeIcon,
  UsersIcon,
  FolderIcon,
  CalendarIcon,
  DocumentIcon,
  ChartPieIcon,
  CogIcon,
} from "@heroicons/react/24/outline";

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-900 text-gray-200">
      {/* Sidebar */}
      <div className="w-64 bg-indigo-800 flex flex-col">
        <div className="h-16 flex items-center justify-center border-b border-indigo-600">
          <img src={logo} alt="Logo" className="h-10" />
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <NavItem icon={HomeIcon} text="Dashboard" />
          <NavItem icon={UsersIcon} text="Team" />
          <NavItem icon={FolderIcon} text="Projects" />
          <NavItem icon={CalendarIcon} text="Calendar" />
          <NavItem icon={DocumentIcon} text="Documents" />
          <NavItem icon={ChartPieIcon} text="Reports" />

          <div className="mt-6 border-t border-indigo-600 pt-4">
            <h4 className="px-2 text-xs text-indigo-200 uppercase">
              Your teams
            </h4>
            <div className="mt-2 space-y-1">
              <TeamItem initials="H" name="Heroicons" />
              <TeamItem initials="T" name="Tailwind Labs" />
              <TeamItem initials="W" name="Workcation" />
            </div>
          </div>
        </nav>
        <div className="p-4 border-t border-indigo-600">
          <NavItem icon={CogIcon} text="Settings" />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <div className="h-16 bg-gray-800 flex items-center justify-between px-4 border-b border-gray-700">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="bg-gray-700 text-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded hover:bg-gray-700">
              <BellIcon className="h-6 w-6" />
            </button>
            <div className="flex items-center space-x-2 cursor-pointer">
              <img
                src="https://i.pravatar.cc/40"
                alt="User"
                className="h-8 w-8 rounded-full"
              />
              <span>Tom Cook</span>
            </div>
          </div>
        </div>

        {/* Content area */}
        <div className="flex-1 p-6 bg-gray-900">
          <div className="w-full h-full border-2 border-gray-700 border-dashed rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}

function NavItem({ icon: Icon, text }) {
  return (
    <button className="flex items-center space-x-2 w-full px-2 py-2 rounded hover:bg-indigo-600">
      <Icon className="h-5 w-5" />
      <span>{text}</span>
    </button>
  );
}

function TeamItem({ initials, name }) {
  return (
    <button className="flex items-center space-x-2 w-full px-2 py-2 rounded hover:bg-indigo-600">
      <div className="h-6 w-6 bg-indigo-500 text-white flex items-center justify-center rounded-full text-xs">
        {initials}
      </div>
      <span>{name}</span>
    </button>
  );
}
