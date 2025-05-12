import { Bell, ContactRound, ShieldCheck } from "lucide-react";
import React from "react";
import Logo from "../../../components/Logo";
import NotificationBell from "../../../components/NotificationBell";

function NavBar() {
  return (
    <nav className="container mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center justify-center">
            <Logo />
          </div>
        </div>
        <div className=" flex items-center space-x-3">
          <NotificationBell/>
          <div className="flex items-center space-x-1 p-1 text-white">
            <ContactRound className="h-5" />
            <span>Assistant</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
