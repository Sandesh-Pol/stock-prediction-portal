import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import MobileMenu from "./MobileMenu";
import logo from "../assets/logo.png";
import { AuthContext } from "../AuthProvider";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Marketplace", path: "/" },
    { name: "Company", path: "/company" },
  ];

  const handleAuthAction = () => {
    if (isLoggedIn) {
      // Log out
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setIsLoggedIn(false);
      navigate("/login");
    } else {
      navigate("/login");
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img src={logo} alt="Your Company" className="h-8 w-auto" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-200"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="w-6 h-6"
            >
              <path
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Desktop menu */}
        <div className="hidden lg:flex lg:gap-x-12">
          {isLoggedIn &&
            navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-sm font-semibold text-gray-900 dark:text-white"
              >
                {item.name}
              </Link>
            ))}
        </div>

        {/* Auth button */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <button
            onClick={handleAuthAction}
            className="text-sm font-semibold text-gray-900 dark:text-white"
          >
            {isLoggedIn ? "Log out" : "Log in"}{" "}
            <span aria-hidden="true">&rarr;</span>
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {isMenuOpen && <MobileMenu onClose={() => setIsMenuOpen(false)} />}
    </header>
  );
}
