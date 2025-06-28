import logo from "../assets/images/raketnow-blue-logo.png";
import { UserRound } from "lucide-react";
import { Search } from "lucide-react";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="shadow-md bg-white">
      <nav className="flex items-center justify-between px-6 py-4 max-w-screen-xl mx-auto">
        <div className="flex items-center gap-6">
          <img
            src={logo}
            alt="raketNow"
            className="h-12 w-auto object-contain"
          />

          {/* Search bar*/}
          <div className="relative w-[310px]">
            <input
              type="text"
              placeholder="What service are you looking for today?"
              className="pl-3 pr-10 py-2 rounded-md border border-gray-300 text-gray-500 text-sm placeholder:text-xs placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-400 w-full"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
              <Search size={20} />
            </div>
          </div>
        </div>

        {/* Removed some links sa navbar kasi parang walang sense yang dalawa ahsdjhjasda */}

        <ul className="flex items-center gap-8 text-[1rem] font-medium text-blue-900">
          <li>
            <NavLink to="/">Categories</NavLink>
          </li>

          <li>
            <NavLink to="about">About Us</NavLink>
          </li>

          <li>
            <NavLink to="login" className="flex items-center gap-1">
              <UserRound size={19} />
              Login
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/"
              className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
            >
              Sign Up
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
