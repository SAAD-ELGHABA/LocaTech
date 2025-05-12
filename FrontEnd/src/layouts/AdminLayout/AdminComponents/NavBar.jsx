import { Bell, ShieldCheck } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import Logo from "../../../components/Logo";

function NavBar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const bellRef = useRef(null);

  // Hide on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (bellRef.current && !bellRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="container mx-auto relative">
      <div className="flex justify-between items-center">
        <div className="flex items-center justify-center">
          <Logo />
        </div>
        <div
          className="text-white flex items-center space-x-3 relative"
          ref={bellRef}
        >
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="cursor-pointer hover:bg-gray-700 p-2 rounded-full"
          >
            <Bell className="w-5  " />
          </button>
          {showNotifications && (
            <div className="absolute right-0 top-8 bg-white text-black rounded shadow-md w-64 z-50 h-64 overflow-hidden">
              <ul className="p-2 text-sm">
                <li className="py-2 border-b">Nouvelle agence ajoutée</li>
                <li className="py-2 border-b">Un courtier a été approuvé</li>
                <li className="py-2">Mise à jour système disponible</li>
              </ul>
            </div>
          )}
          <div className="flex items-center space-x-1">
            <ShieldCheck className="h-5" />
            <span>Admin</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
