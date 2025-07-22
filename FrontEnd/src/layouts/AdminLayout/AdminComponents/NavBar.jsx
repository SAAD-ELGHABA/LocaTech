import React, { useState, useRef, useEffect } from "react";
import { Bell, ContactRound, LogOut, ShieldCheck } from "lucide-react";
import Logo from "../../../components/Logo";
import NotificationBell from "../../../components/NotificationBell";
import { useSelector } from "react-redux";
import logoUser from "../../../assets/logo-user.png";
import LogoutModal from "../../../components/LogoutModal";
function NavBar() {
  const user = useSelector((state) => state.userReducer.userInfo);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const imageRef = useRef(null);
  const dropdownRef = useRef(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

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
    <nav className="container w-[90%] mx-auto lg:w-full">
      <div className="flex justify-between items-center relative">
        <div className="flex items-center justify-center">
          <Logo />
        </div>
        <div className="flex items-center space-x-3">
          <NotificationBell />

          <div className="relative">
            <img
              ref={imageRef}
              src={user?.image || logoUser}
              alt="User avatar"
              className="h-6 w-6 rounded-full cursor-pointer"
              onClick={() => setDropdownOpen((prev) => !prev)}
            />
            {dropdownOpen && (
              <div
                ref={dropdownRef}
                className="absolute text-black right-0 mt-2 bg-white rounded-md shadow-lg pt-2 z-50 flex flex-col items-center min-w-66 text-center w-auto border border-gray-300"
              >
                <div className="flex items-center space-x-3 px-4 py-2">
                  <div>
                    <img
                      ref={imageRef}
                      src={user?.image || logoUser}
                      alt="User avatar"
                      className="h-16 w-16 rounded-full cursor-pointer"
                      onClick={() => setDropdownOpen((prev) => !prev)}
                    />
                  </div>
                  <div className="flex flex-col items-start text-xs">
                    <div className="text-gray-700 text-sm font-semibold">
                      {user?.nom} {user?.prenom}
                    </div>
                    <div className="text-gray-500 ">{user?.email}</div>
                    <div className="text-gray-500 ">(admin)</div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setIsLoggingOut(true);
                  }}
                  className="border-t border-gray-200 mt-4 w-full text-left  px-4 py-3 text-gray-800 hover:bg-gray-200 flex items-center justify-start space-x-2 cursor-pointer text-sm ps-12"
                >
                  <LogOut className="inline-block mr-2 h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}
            {isLoggingOut && (
              <LogoutModal
                isOpen={isLoggingOut}
                // onConfirm={handleLogOut}
                onCancel={() => setIsLoggingOut(false)}
              />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
