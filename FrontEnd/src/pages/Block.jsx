import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Location.png";

const BlockedPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white">
      {/* Logo + Titre */}
      <div className="flex flex-col items-center space-y-2 mb-10">
        <div className="flex items-center space-x-2">
          <img src={logo} alt="LocaTech Logo" className="w-12 h-20" />
          <h1 className="text-4xl font-bold">
            <span className="text-green-500">Loca</span>
            <span className="text-red-500">Tech</span>
          </h1>
        </div>
      </div>

      {/* Message */}
      <p className="text-xl text-black font-medium">
        Vous avez été bloqué(e).
      </p>

      {/* Lien Créer un compte (Azbi) */}
      <Link
        to="/register"
        className="text-xs font-semibold hover:underline mt-6"
      >
        Créer un compte
      </Link>
    </div>
  );
};

export default BlockedPage;
