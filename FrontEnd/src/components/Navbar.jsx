import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaPlusCircle, FaUserCircle , FaSearch } from "react-icons/fa";
import logo from "../assets/Location.png";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHomepage = location.pathname === "/";

  return (
    <nav className="bg-white shadow-md py-4 px-4 md:px-6 fixed w-full top-0 left-0 z-50">
      <div className="w-full flex flex-col md:flex-row md:justify-between md:items-center gap-4">


        {/* Logo + Titre */}
        <div className="flex items-center gap-3 shrink-0">
          <Link to="/">
            <img src={logo} alt="Logo" className="h-12 w-10 object-contain" />
          </Link>
          <Link to="/">
            <h1 className="text-xl font-bold whitespace-nowrap">
              <span className="text-red-500">LocaTech</span>
            </h1>
          </Link>
        </div>

        {/* Les liens + boutons */}
        <div className="flex items-center gap-5 text-sm font-medium overflow-x-auto whitespace-nowrap">
          {/* <Link to="/" className="text-black">Accueil</Link> */}
          <Link to="/acheter" className="text-black">Acheter</Link>
          <Link to="/louer" className="text-black">Louer</Link>
          <Link to="/blog" className="text-black">Blog</Link>
          <Link to="/Apropos" className="text-black">A propos</Link>
          <Link to="/contactUs" className="text-black">Contactez-nous</Link>

          {isHomepage && isScrolled && (
            <button
              onClick={() =>
                document.getElementById("hero-section")?.scrollIntoView({ behavior: "smooth" })
              }
              className="bg-[#F44336] text-white px-4 py-2 rounded-full cursor-pointer hover:bg-red-600 transition flex items-center gap-2"
            >
              <FaSearch/>
              Rechercher
            </button>
          )}

          {!isHomepage && (
            <Link
              to="/"
              className="bg-[#F44336] text-white px-4 py-2 rounded-full cursor-pointer hover:bg-red-600 transition flex items-center gap-2"
            >
              <FaSearch/>
              Rechercher
            </Link>
          )}

          <Link
            to="/block"
            className="bg-[#F44336] text-white px-4 py-2 rounded-full hover:bg-red-600 transition flex items-center gap-2"
          >
            <FaPlusCircle />
            <span>Déposer une annonce</span>
          </Link>

          <Link
            to="/login"
            className="border border-red-500 text-red-500 px-4 py-2 rounded-full hover:bg-red-100 transition flex items-center gap-2"
          >
            <FaUserCircle />
            <span>Mon Espace</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
