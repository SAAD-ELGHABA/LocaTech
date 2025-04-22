import { Bell, ShieldCheck } from "lucide-react";
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
        <div className="text-red-500 flex items-center space-x-3">
          <Bell className="w-5"/>
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
