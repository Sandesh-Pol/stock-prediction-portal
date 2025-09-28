import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { AuthContext } from "../AuthProvider";

export default function MobileMenu({ onClose }) {
  const { isLoggedIn } = useContext(AuthContext);

  const navItems = [
    { name: "Dashboard", path: "/" },
    { name: "Features", path: "/features" },
    { name: "Marketplace", path: "/marketplace" },
    { name: "Company", path: "/company" },
  ];

  return (
    <dialog open className="backdrop:bg-transparent lg:hidden">
      <div className="fixed inset-0 focus:outline-none">
        <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 dark:bg-gray-900 dark:sm:ring-gray-100/10">
          {/* Header */}
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5" onClick={onClose}>
              <span className="sr-only">Your Company</span>
              <img src={logo} alt="Your Company" className="mx-auto h-10 w-auto" />
            </Link>
            <button
              type="button"
              onClick={onClose}
              className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-200"
            >
              <span className="sr-only">Close menu</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
                className="w-6 h-6"
              >
                <path
                  d="M6 18 18 6M6 6l12 12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Nav */}
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10 dark:divide-white/10">
              <div className="space-y-2 py-6">
                {isLoggedIn &&
                  navItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={onClose}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5"
                    >
                      {item.name}
                    </Link>
                  ))}
              </div>
              <div className="py-6">
                <Link
                  to={isLoggedIn ? "/logout" : "/login"}
                  onClick={onClose}
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5"
                >
                  {isLoggedIn ? "Log out" : "Log in"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}
