import React from "react";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <div className="flex items-center shrink-0">
      <Link to="/">
        <img
        src={"/logo-locatech-v1.png"}
        alt="Logo"
        className="w-16 h-16 lg:h-20 lg:w-48 object-contain"
      />
      </Link>
    </div>
  );
}

export default Logo;
