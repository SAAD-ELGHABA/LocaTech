// components/Footer.jsx
import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaPhoneAlt,
  FaCcPaypal,
  FaCcVisa,
} from "react-icons/fa";
import "../index.css";
import logo from "../assets/Location.png"; // Assure-toi que le chemin vers le logo est correct

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-columns">
        <div className="footer-column">
          <h3>Découvrir</h3>
          <ul>
            <li><a href="#">Découvrez LocaTech</a></li>
            <li><a href="#">Découvrez votre futur quartier</a></li>
            <li><a href="#">Achetez et louez votre bien</a></li>
            <li><a href="#">Actualités et conseils immobiliers</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>L'entreprise</h3>
          <ul>
            <li><a href="#">Nous contacter</a></li>
            <li><a href="#">Besoin d'aide ?</a></li>
            <li><a href="#">Votre avis nous intéresse</a></li>
          </ul>
        </div>

        <div className="footer-column follow-us">
          <h3>Retrouvez-nous sur :</h3>
          <div className="social-icons">
            <a href="#"><FaFacebook size={20} /></a>
            <a href="#"><FaTwitter size={20} /></a>
            <a href="#"><FaInstagram size={20} /></a>
            <a href="#"><FaLinkedin size={20} /></a>
            <a href="#"><FaPhoneAlt size={20} /></a>
            <a href="#"><FaCcPaypal size={20} /></a>
            <a href="#"><FaCcVisa size={20} /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="logo-container">
          <img src={logo} alt="LocaTech Logo" className="footer-logo" />
          <span>
            <span className="logo-red">Loca</span>
            <span className="logo-green">Tech</span>
          </span>
        </div>
        <p>&copy; LocaTech - 2025</p>
      </div>
    </footer>
  );
};

export default Footer;
