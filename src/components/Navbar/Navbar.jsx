import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import img1 from "../../../public/logi.jfif";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfileMenu = () => setIsProfileOpen(!isProfileOpen);

  return (
    <nav className="sticky top-0 z-50 bg-base-100 shadow-sm w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <img
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg"
            src={img1}
            alt="NextHire Logo"
          />
          <span className="font-bold text-xl sm:text-2xl md:text-3xl text-blue-600">
            NextHire
          </span>
        </Link>

        <button
          className="md:hidden text-2xl focus:outline-none"
          onClick={toggleMenu}
        >
          ☰
        </button>

        <ul
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:flex gap-4 lg:gap-6 items-center text-base sm:text-lg font-medium transition-all duration-300 ease-in-out bg-base-100 md:bg-transparent absolute md:static top-16 left-0 w-full md:w-auto md:shadow-none shadow-md md:p-0 p-4`}
        >
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-blue-500 font-semibold" : "hover:text-blue-400"
              }
            >
              Home
            </NavLink>
          </li>

          {user && (
            <>
              <li>
                <NavLink to="/add-job" className="hover:text-blue-400">
                  Add Job
                </NavLink>
              </li>
              <li>
                <NavLink to="/my-posted-jobs" className="hover:text-blue-400">
                  My Posted Jobs
                </NavLink>
              </li>
              <li>
                <NavLink to="/my-bids" className="hover:text-blue-400">
                  My Bids
                </NavLink>
              </li>
              <li>
                <NavLink to="/bid-requests" className="hover:text-blue-400">
                  Bid Requests
                </NavLink>
              </li>
            </>
          )}

          {!user && (
            <li>
              <NavLink
                to="/login"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Login
              </NavLink>
            </li>
          )}
        </ul>

        {user && (
          <div className="relative">
            <button
              onClick={toggleProfileMenu}
              className="btn btn-ghost btn-circle avatar"
              title={user?.displayName}
            >
              <img
                referrerPolicy='no-referrer'
                src={user?.photoURL || ""}
                alt="Profile"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-blue-500"
              />
            </button>
            {isProfileOpen && (
              <ul className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md p-2">
                <li>
                  <button
                    onClick={logOut}
                    className="w-full text-center py-2 bg-gray-100 hover:bg-blue-500 hover:text-white rounded-md"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
