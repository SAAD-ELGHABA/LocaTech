import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaPlusCircle, FaUserCircle } from "react-icons/fa";
import logo from "../assets/Location.png";

const Navbar = ({ showSearchButton }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {  // L'endroit où le bouton apparaîtra
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Navbar */}
      <nav className="bg-white shadow-md py-5 px-6 flex justify-between items-center fixed w-full top-0 left-0 z-50">
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="h-12 w-10 object-contain" />
          <Link to="/">
            <h1 className="text-xl font-bold">
              <span className="text-red-500">LocaTech</span>
            </h1>
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link to="/" className="text-black py-2">Accueil</Link>
          <a href="#acheter" className="text-black py-2">Acheter</a>
          <a href="#louer" className="text-black py-2">Louer</a>
          <Link to="/blog" className="text-black py-2">Blog</Link>
          <Link to="/contactUs" className="text-black py-2">Contactez-nous</Link>

          {/* Affichage du bouton Rechercher seulement après scroll */}
          {isScrolled && (
            <button
              onClick={handleScrollTop}
              className="bg-[#F44336] text-white px-4 py-2 rounded-full cursor-pointer hover:bg-red-600 transition text-sm"
            >
              Rechercher
            </button>
          )}

          <Link to="/block" className="bg-[#F44336] text-white px-4 py-2 rounded-full hover:bg-red-600 transition text-sm flex items-center gap-2">
            <FaPlusCircle />
            <span>Déposer une annonce</span>
          </Link>

          <Link to="/login" className="border border-red-500 text-red-500 px-4 py-2 rounded-full hover:bg-red-100 transition text-sm flex items-center gap-2">
            <FaUserCircle />
            <span>Mon Espace</span>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
