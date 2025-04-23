import { Bell, ContactRound, ShieldCheck } from "lucide-react";
import React from "react";
import logo from "../../../assets/Location.png";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="container mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center justify-center">
            <Link to={"/"} className="flex items-center">
              <img src={logo} alt="LocaTech Logo" className="w-6 h-11" />
              <h1 className="text-xl font-bold">
                <span className="text-red-500">LocaTech</span>
              </h1>
            </Link>
          </div>
        </div>
        <div className="text-white flex items-end space-x-3">
          <Bell className="w-5" />
          <div className="flex items-center space-x-1">
            <ContactRound className="h-5" />
            <span>Assistant</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
