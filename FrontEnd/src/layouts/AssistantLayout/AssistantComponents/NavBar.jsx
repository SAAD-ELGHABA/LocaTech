import React, { useState, useRef, useEffect } from "react";
import { Bell, ContactRound, LogOut, ShieldCheck } from "lucide-react";
import Logo from "../../../components/Logo";
import NotificationBell from "../../../components/NotificationBell";
import { useSelector } from "react-redux";

function NavBar() {
  const user = useSelector((state) => state.userReducer.userInfo);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const imageRef = useRef(null);
  const dropdownRef = useRef(null);
  
  // Detect clicks outside dropdown/image
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        imageRef.current &&
        !imageRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="container mx-auto">
      <div className="flex justify-between items-center relative">
        <div className="flex items-center justify-center">
          <Logo />
        </div>
        <div className="flex items-center space-x-3">
          <NotificationBell />

          <div className="relative">
            <img
              ref={imageRef}
              src={user?.image}
              alt="User avatar"
              className="h-6 w-6 rounded-full cursor-pointer"
              onClick={() => setDropdownOpen((prev) => !prev)}
            />
            {dropdownOpen && (
              <div
                ref={dropdownRef}
                className="absolute text-black right-0 mt-2 bg-white rounded-md shadow-lg py-2 z-50 flex flex-col items-center min-w-60 text-center w-auto border border-gray-300"
              >
                <div>
                  <img
                    ref={imageRef}
                    src={user?.image}
                    alt="User avatar"
                    className="h-16 w-16 rounded-full cursor-pointer"
                    onClick={() => setDropdownOpen((prev) => !prev)}
                  />
                </div>
                <div className="text-gray-700 text-lg font-semibold">
                  {user?.nom}
                </div>
                <div className="text-gray-700 text-lg font-semibold">
                  {user?.prenom}
                </div>
                <div className="text-gray-500 text-sm">{user?.email}</div>
                <button
                  onClick={() => {
                    // Insert logout logic here
                  }}
                  className="border-t border-gray-300 mt-4 w-full text-left  px-4 py-2 text-gray-800 hover:bg-gray-200 flex items-center justify-center space-x-2"
                >
                  <LogOut className="inline-block mr-2 h-5 w-5" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
