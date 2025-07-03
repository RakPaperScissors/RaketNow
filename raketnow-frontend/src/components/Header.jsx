import logo from "../assets/images/raketnow-blue-logo.png";
import {
  UserRound,
  Search,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
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
        {/* Logo */}
        <div className="flex items-center gap-6">
          <img
            src={logo}
            alt="raketNow"
            className="h-12 w-auto object-contain"
          />
        </div>

        {/* Desktop Navbarrr */}
        <ul className="hidden md:flex items-center gap-8 text-[1rem] font-medium text-blue-900 relative">
          <li className="relative">
            <button
              onClick={() => setDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-1 hover:text-orange-500"
            >
              Categories{" "}
              {isDropdownOpen ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
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

          <li>
            <NavLink to="/about" className="hover:text-orange-500">
              About Us
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/login"
              className="flex items-center gap-1 hover:text-orange-500"
            >
              <UserRound size={19} />
              Login
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/signup"
              className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
            >
              Sign Up
            </NavLink>
          </li>
        </ul>

        {/* MOBILE RESPONSIVENESS KINEME */}

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-blue-900"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Nav Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-6 pb-4 flex flex-col items-center">
          <ul className="flex flex-col gap-4 text-blue-900 font-medium">
            <li>
              <button
                onClick={() => setDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-1 hover:text-orange-500 w-full text-left"
              >
                Categories{" "}
                {isDropdownOpen ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </button>

              {isDropdownOpen && (
                <ul className="mt-2 bg-white border rounded-md shadow-sm">
                  {categories.map((category) => (
                    <li
                      key={category}
                      className="px-4 py-2 hover:bg-gray-100 text-sm"
                    >
                      {category}
                    </li>
                  ))}
                </ul>
              )}
            </li>

            <li>
              <NavLink to="/about" className="hover:text-orange-500">
                About Us
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/login"
                className="flex items-center gap-1 hover:text-orange-500"
              >
                <UserRound size={19} />
                Login
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/"
                className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 inline-block"
              >
                Sign Up
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

export default Header;
