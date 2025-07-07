import logo from "../assets/images/raketnow-blue-logo.png";
import {
  UserRound,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useState } from "react";

function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const categories = [
    "Maintenance & Repair",
    "Tech & Electronics",
    "Personal & Home Care",
    "Events & Entertainment",
    "Food & Beverage",
    "Education & Tutoring",
    "Graphic & Digital Design",
  ];

  return (
    <header className="shadow-md bg-white">
      <nav className="max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left Section: Logo and Nav Links */}
        <div className="flex items-center gap-10">
          <NavLink to="/">
            <img
              src={logo}
              alt="raketNow"
              className="h-8 md:h-10 w-auto object-contain"
            />
          </NavLink>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-900">
            <li>
              <NavLink to="/" className="hover:text-orange-500">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="hover:text-orange-500">
                About
              </NavLink>
            </li>
            <li className="relative">
              <button
                onClick={() => setDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-1 hover:text-orange-500"
              >
                Categories{" "}
                {isDropdownOpen ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </button>

              {isDropdownOpen && (
                <ul className="absolute top-full left-0 mt-2 w-64 bg-white shadow-md rounded-md z-10">
                  {categories.map((category) => (
                    <li
                      key={category}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                    >
                      {category}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>
        </div>

        {/* Right Section: Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <NavLink
            to="/login"
            className="flex items-center gap-1 bg-gray-100 text-gray-800 text-sm px-3 py-1.5 rounded-md hover:bg-gray-200"
          >
            Log in <ArrowRight size={16} />
          </NavLink>
          <NavLink
            to="/signup"
            className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm hover:bg-orange-600"
          >
            Get Started
          </NavLink>
        </div>

        {/* Hamburger For Mobile */}
        <button
          className="md:hidden text-blue-900"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-6 pb-4 flex flex-col items-center">
          <ul className="flex flex-col gap-4 text-blue-900 font-medium text-sm items-center">
            <li>
              <NavLink to="/" className="hover:text-orange-500">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="hover:text-orange-500">
                About
              </NavLink>
            </li>
            <li>
              <button
                onClick={() => setDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-1 hover:text-orange-500"
              >
                Categories{" "}
                {isDropdownOpen ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </button>

              {isDropdownOpen && (
                <ul className="mt-2 bg-white border rounded-md shadow-sm w-full">
                  {categories.map((category) => (
                    <li
                      key={category}
                      className="px-4 py-2 hover:bg-gray-100 text-sm text-center"
                    >
                      {category}
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li>
              <NavLink
                to="/login"
                className="flex items-center gap-1 bg-gray-100 text-gray-800 text-sm px-3 py-1.5 rounded-md hover:bg-gray-200"
              >
                Log in <ArrowRight size={16} />
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/signup"
                className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
              >
                Get Started
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

export default Header;
