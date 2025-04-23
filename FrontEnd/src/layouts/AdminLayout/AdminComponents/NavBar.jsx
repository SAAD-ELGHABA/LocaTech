import { Bell, ShieldCheck } from "lucide-react";
import React from "react";
import logo from "../../../assets/Location.png";
import { Link } from "react-router-dom";
import Logo from "../../../components/Logo";

function NavBar() {
  return (
    <nav className="container mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center justify-center">
            <Logo/>
          </div>
        </div>
        <div className="text-white flex items-center space-x-3">
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
