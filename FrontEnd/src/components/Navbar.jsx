// components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaShoppingCart,
  FaKey,
  FaBlog,
  FaEnvelope,
  FaPlusCircle,
  FaUserCircle,
} from "react-icons/fa";
import "../index.css";
import logo from "../assets/Location.png"; // vérifie que le chemin vers le logo est correct

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo-image" />
          <h1 className="logo">
            <span className="logo-red">Loca</span>
            <span className="logo-green">Tech</span>
          </h1>
        </div>
      </div>

      <div className="navbar-links">
        <Link to="/" className="nav-link">
          <FaHome className="nav-icon" />
          <span>Accueil</span>
        </Link>

        <a href="#acheter" className="nav-link">
          <FaShoppingCart className="nav-icon" />
          <span>Acheter</span>
        </a>

        <a href="#louer" className="nav-link">
          <FaKey className="nav-icon" />
          <span>Louer</span>
        </a>

        <Link to="/blog" className="nav-link">
          <FaBlog className="nav-icon" />
          <span>Blog</span>
        </Link>

        <Link to="/contactUs" className="nav-link">
          <FaEnvelope className="nav-icon" />
          <span>Contactez-nous</span>
        </Link>

        <a href="#annonce" className="nav-link highlight-red">
          <FaPlusCircle className="nav-icon" />
          <span>Déposer une annonce</span>
        </a>

        <Link to="/login" className="nav-link border-red">
          <FaUserCircle className="nav-icon" />
          <span>Mon Espace</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
