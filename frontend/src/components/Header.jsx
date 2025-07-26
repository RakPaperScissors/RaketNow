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
    "Business & Professional Service",
    "Automotive Services",
    "Moving & Delivery Services",
  ];

  return (
    <header className="shadow-md bg-white">
      <nav className="max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* logo and nav Links */}
        <div className="flex items-center gap-10">
          <NavLink to="/">
            <img
              src={logo}
              alt="raketNow"
              className="h-8 md:h-10 w-auto object-contain"
            />
          </NavLink>

          {/* DESKTOP VIEW */}
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

              <div
                className={`absolute top-full left-0 mt-2 w-64 bg-white shadow-md rounded-md z-10 transform transition-all duration-300 ease-in-out origin-top ${
                  isDropdownOpen
                    ? "opacity-100 scale-y-100"
                    : "opacity-0 scale-y-0 pointer-events-none"
                }`}
              >
                <ul>
                  {categories.map((category) => (
                    <li
                      key={category}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                    >
                      {category}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>

        {/* sign in & login */}
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

        {/* hamburger deets */}
        <button
          className="md:hidden text-blue-900"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* MOBILE VIEW */}
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

              <div
                className={`transition-all duration-300 ease-in-out transform origin-top w-full ${
                  isDropdownOpen
                    ? "scale-y-100 opacity-100 h-auto"
                    : "scale-y-0 opacity-0 h-0 overflow-hidden"
                } bg-white border rounded-md shadow-sm mt-2`}
              >
                <ul>
                  {categories.map((category) => (
                    <li
                      key={category}
                      className="px-4 py-2 hover:bg-gray-100 text-sm text-center"
                    >
                      {category}
                    </li>
                  ))}
                </ul>
              </div>
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
