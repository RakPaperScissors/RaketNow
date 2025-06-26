import logo from '../assets/images/raketnow-blue-logo.png';

function Header() {
  return (
    <header className="shadow-md bg-white">
      <nav className="flex items-center justify-between px-6 py-3 max-w-screen-xl mx-auto">

        <div className="flex items-center gap-6">
            <img
                src={logo}
                alt="raketNow"
                className="h-8 w-auto object-contain"
            />

          {/* Search bar */}
            <div className="relative">
                <input
                    type="text"
                    placeholder="What service are you looking for today?"
                    className="pl-4 pr-12 py-2 rounded-md border border-gray-300 text-gray-700 text-sm placeholder:text-xs placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400 w-[300px]"
                />
                <button
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-xl text-gray-500 hover:text-orange-500 bg-transparent p-0"
                    aria-label="Search">
                    🔍
                </button>
            </div>
        </div>

        <ul className="flex items-center gap-6 text-sm font-medium text-blue-900">
            <li><a href="#">Categories</a></li>
            <li><a href="#">Become a Freelancer</a></li>
            <li><a href="#">Post a Job</a></li>
            <li><a href="#">About Us</a></li>
            <li className="flex items-center gap-1">
                <span>👤</span>
                <a href="#">Login</a>
            </li>
            <li>
                <a href="#" className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600">
                Sign Up
            </a>
            </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
