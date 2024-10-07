import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faSignInAlt,
  faSignOutAlt,
  faCaretDown,
  faPlus,
  faListAlt,
} from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="bg-white/30 backdrop-blur-lg shadow-md py-4 fixed top-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo v*/}
        <div
          to="/"
          className="text-2xl font-bold text-black flex items-center space-x-2 hover:text-white hover:text-opacity-90 transition-colors duration-300"
        >
          <FontAwesomeIcon icon={faUserCircle} className="text-3xl" />
          {user && <span>{user.username}</span>}
        </div>

        <Link to="/"
          className="text-2xl font-bold text-black flex items-center space-x-2 hover:text-white hover:text-opacity-90 transition-colors duration-300">
            Home
        </Link>

        {/* User Actions a*/}
        <div className="flex space-x-4 items-center">
          {user ? (
            <>
              {/* Dropdown Toggle n*/}
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="bg-transparent border border-white text-white px-4 py-2 rounded-md font-semibold hover:bg-black hover:border-black flex items-center transition-colors duration-300"
                >
                  Actions
                  <FontAwesomeIcon icon={faCaretDown} className="ml-2" />
                </button>

                {/* Dropdown Menu s*/}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white/80 backdrop-blur-lg border border-gray-200 rounded-lg shadow-lg z-20 py-2">
                    <Link
                      to="/create-event"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex items-center transition-all"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <FontAwesomeIcon icon={faPlus} className="mr-2" />
                      Create Event
                    </Link>
                    <Link
                      to="/my-events"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex items-center transition-all"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <FontAwesomeIcon icon={faListAlt} className="mr-2" />
                      My Events
                    </Link>
                  </div>
                )}
              </div>

              {/* Logout Button h*/}
              <button
                onClick={handleLogout}
                className="flex items-center bg-black text-white px-4 py-2 rounded-md font-semibold hover:text-opacity-90 transition-colors duration-300"
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="flex items-center bg-transparent text-white hover:bg-black  border border-white hover:border-black px-4 py-2 rounded-md font-semibold transition-all"
              >
                <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                Login
              </Link>
              <Link
                to="/register"
                className="flex items-center border border-black bg-black text-white px-4 py-2 rounded-md font-semibold hover:bg-transparent hover:border-white transition-colors duration-300"
              >
                <FontAwesomeIcon icon={faUserCircle} className="mr-2" />
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
