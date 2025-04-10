import React from "react";
import { Link } from "react-router-dom";
import { FaPlusCircle, FaUserCircle } from "react-icons/fa";
import logo from "../assets/Location.png";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md py-5 px-6 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <img src={logo} alt="Logo" className="h-12 w-10 object-contain" />
        <Link to='/'>
        <h1 className="text-xl font-bold">
          <span className="text-red-500">Loca</span>
          <span className="text-green-500">Tech</span>
        </h1>
        </Link>
      </div>

      <div className="flex items-center space-x-6 text-sm font-medium">
        <Link to="/" className="text-black py-2">Accueil</Link>
        <a href="#acheter" className="text-black py-2">Acheter</a>
        <a href="#louer" className="text-black py-2">Louer</a>
        <Link to="/blog" className="text-black py-2">Blog</Link>
        <Link to="/contactUs" className="text-black py-2">Contactez-nous</Link>

        <Link to="/block" className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition text-sm flex items-center gap-2">
          <FaPlusCircle />
          <span>Déposer une annonce</span>
        </Link>

        <Link to="/login" className="border border-red-500 text-red-500 px-4 py-2 rounded-full hover:bg-red-100 transition text-sm flex items-center gap-2">
          <FaUserCircle />
          <span>Mon Espace</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
