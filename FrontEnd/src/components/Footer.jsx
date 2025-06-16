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
  FaRegCreditCard,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/Location.png";
import "../index.css"; // katsayb styles dial .main-footer etc.
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="main-footer px-6 py-10 text-sm">
      <div className="footer-columns grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="footer-column">
          <h3 className="text-lg font-semibold mb-4">Découvrir</h3>
          <ul className="space-y-2 ">
            <li><a href="#" className="hover:underline">Découvrez LocaTech</a></li>
            <li><a href="#" className="hover:underline">Découvrez votre futur quartier</a></li>
            <li><a href="#" className="hover:underline">Achetez et louez votre bien</a></li>
            <li><a href="#" className="hover:underline">Actualités et conseils immobiliers</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3 className="text-lg font-semibold mb-4">L'entreprise</h3>
          <ul className="space-y-2">
            <li><Link to="/contactUs" className="hover:underline">Nous contacter</Link></li>
            <li><a href="#" className="hover:underline">Besoin d'aide ?</a></li>
            <li><a href="#" className="hover:underline">Votre avis nous intéresse</a></li>
          </ul>
        </div>

        <div className="footer-column follow-us">
          <h3 className="text-lg font-semibold mb-4">Retrouvez-nous sur :</h3>
          <div className="social-icons flex flex-wrap gap-3 text-sm">
            <a href="#"><FaFacebook  /></a>
            <a href="#"><FaTwitter  /></a>
            <a href="#"><FaInstagram  /></a>
            <a href="#"><FaLinkedin  /></a>
            <a href="#"><FaPhoneAlt  /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom mt-10 border-t border-gray-300 pt-6 flex flex-col md:flex-row items-center justify-between">
        <div className="logo-container flex items-center gap-2">
        <Link to="/">
          <Logo/>          
          </Link>
        </div>
        <p className="mt-4 md:mt-0">&copy; LocaTech - 2025</p>
      </div>
    </footer>
  );
};

export default Footer;
