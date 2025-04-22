import React from "react";
import logo from "../assets/Location.png";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <div className="flex items-center shrink-0">
      <Link to="/">
        <img
        src={"LocaTech.png"}
        alt="Logo"
        className="h-20 w-48 object-contain"
      />
      </Link>
    </div>
  );
}

export default Logo;
