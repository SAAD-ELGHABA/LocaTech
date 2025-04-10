import React, { useEffect } from "react";
import {
  FaHome,
  FaCity,
  FaSearch,
  FaMoneyBillWave,
  FaMapMarkerAlt,
  FaShoppingCart,
  FaKey,
  FaBlog,
  FaEnvelope,
  FaPlusCircle,
  FaUserCircle,
  FaChartLine,
  FaTag,
  FaBuilding,
  FaSchool,
  FaBus,
  FaStore,
} from "react-icons/fa";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaPhoneAlt,
  FaCcPaypal,
  FaCcVisa,
} from "react-icons/fa";
import { Sparkles } from 'lucide-react';
import { Quote } from "lucide-react";
import { MdRecommend } from "react-icons/md";
import logo from "../assets/Location.png";
import pricingImage from "../assets/pricing-image.png"; 
import sellImage from "../assets/sell-image.png"; 
import infoCard1 from "../assets/infoCard1.png";
import infoCard2 from "../assets/infoCard2.png";
import infoCard3 from "../assets/infoCard3.png";
import Témoignage from "../assets/Témoignage.png";
import appartement from "../assets/appartement.png";
import Rabat from "../assets/rabat.png";
import Marrakech from "../assets/marrakech.png";
import Tanger from "../assets/tanger.png";
import Meknes from "../assets/meknes.png";
import Essaouira from "../assets/essaouira.png";
import Ifrane from "../assets/ifrane.png";
import Casablanca from "../assets/casablanca.png";
import Agadir from "../assets/agadir.png";

import "../index.css";
import { Link } from "react-router-dom";


const HeroSection = () => {
  return (
    <div className="relative h-[70vh] bg-emerald-30 text-green-800 flex flex-col justify-center items-center">
      
      {/* Texte */}
      <div className="text-center">
        <h1 className="text-red-500 text-xl md:text-3xl font-bold mb-4 leading-snug">
          Trouvez votre maison/<br /> appartement idéal en toute simplicité !
        </h1>
        <button className="bg-[#F44336] hover:bg-red-700 text-white font-semibold px-5 py-2 mt-4 rounded-full text-sm cursor-pointer transition-all duration-300">
           Consulter
        </button>
      </div>

      {/* Search Bar */}
      <div className="absolute -bottom-10 w-full px-4 flex justify-center items-center">
        <div className="bg-white p-6 rounded-xl border border-gray-400 shadow-lg flex flex-wrap items-center justify-between gap-4 w-[90%] max-w-5xl">
          
          <select className="border border-gray-300 p-2 rounded-md">
            <option>Achat</option>
          </select>
          
          <select className="border border-gray-300 p-2 rounded-md">
            <option>Ville</option>
          </select>
          
          <select className="border border-gray-300 p-2 rounded-md">
            <option>Type</option>
          </select>
          
          <input type="text" placeholder="Budget                   MAD" className="border border-gray-300 p-2 rounded-md" />
          
          <div className="flex gap-2">
            <button className="bg-[#F44336] hover:bg-red-700 text-white px-4 py-2 rounded-md">
              Rechercher
            </button>

            {/* Bouton AI avec border dégradé */}
            <div className="p-[1px] rounded-md bg-gradient-to-r from-purple-500 via-blue-500 to-red-500">
              <button className="flex items-center gap-2 bg-white text-gray-800 px-4 py-2 rounded-md">
                <Sparkles className="w-4 h-4 text-purple-500" />
                Prévoir des recommandations
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

function ActualitesImmobilieres() {
  const villes = [
    {
      nom: "RABAT",
      description:
        "Un moment clé ! Trouvez le quartier idéal avec toutes les statistiques, photos et détails pour une installation sereine.",
      image: "./assets/ville_rabat.jpg",
    },
    {
      nom: "MARRAKECH",
      description:
        "Un moment clé ! Trouvez le quartier idéal avec toutes les statistiques, photos et détails pour une installation sereine.",
      image: "./assets/ville_marrakech.jpg",
    },
    {
      nom: "TANGER",
      description:
        "Un moment clé ! Trouvez le quartier idéal avec toutes les statistiques, photos et détails pour une installation sereine.",
      image: "./assets/ville_tanger.jpg",
    },
    {
      nom: "AGADIR",
      description:
        "Un moment clé ! Trouvez le quartier idéal avec toutes les statistiques, photos et détails pour une installation sereine.",
      image: "./assets/ville_agadir.jpg",
    },
    {
      nom: "ESSAOUIRA",
      description:
        "Un moment clé ! Trouvez le quartier idéal avec toutes les statistiques, photos et détails pour une installation sereine.",
      image: "./assets/ville_essaouira.jpg",
    },
    {
      nom: "IFRANE",
      description:
        "Un moment clé ! Trouvez le quartier idéal avec toutes les statistiques, photos et détails pour une installation sereine.",
      image: "./assets/ville_ifrane.jpg",
    },
    {
      nom: "CASABLANCA",
      description:
        "Un moment clé ! Trouvez le quartier idéal avec toutes les statistiques, photos et détails pour une installation sereine.",
      image: "./assets/ville_casablanca.jpg",
    },
    {
      nom: "MEKNES",
      description:
        "Un moment clé ! Trouvez le quartier idéal avec toutes les statistiques, photos et détails pour une installation sereine.",
      image: "./assets/ville_meknes.jpg",
    },
  ];

  return (
    <div className="actualites-section">
      <h2 className="actualites-title">Actualités immobilières</h2>
      <div className="underline"></div>
      <div className="cards-grid">
        <div className="actualite-card">
          <img src={Rabat} alt="Rabat" />
          <p>
            <b>Rabat,</b> capitale du Maroc, offre un mélange unique d’histoire
            et de modernité avec ses jardins, ses plages et ses monuments
            historiques.
          </p>
        </div>
        <div className="actualite-card">
          <img src={Marrakech} alt="Marrakech" />
          <p>
            <b> Marrakech,</b> est connue pour son architecture fascinante, ses
            souks animés et son ambiance chaleureuse qui attire les
            investisseurs et les visiteurs.
          </p>
        </div>
        <div className="actualite-card">
          <img src={Tanger} alt="Tanger" />
          <p>
            <b>Tanger,</b> port stratégique entre l’Europe et l’Afrique, séduit
            par son mélange de cultures et son emplacement unique en bord de
            mer.
          </p>
        </div>
        <div className="actualite-card">
          <img src={Meknes} alt="Meknes" />
          <p>
            <b>Meknes,</b> une ancienne capitale impériale, est célèbre pour ses
            monuments historiques et son ambiance calme, idéale pour les
            résidents à la recherche de tranquillité.
          </p>
        </div>
        <div className="actualite-card">
          <img src={Essaouira} alt="Essaouira" />
          <p>
            <b>Essaouira,</b> ville côtière, séduit par ses plages, ses ruelles
            pittoresques et sa médina classée au patrimoine mondial de l’UNESCO.
          </p>
        </div>
        <div className="actualite-card">
          <img src={Ifrane} alt="Ifrane" />
          <p>
            <b>Ifrane,</b> surnommée la "Suisse du Maroc", offre un cadre
            naturel avec ses forêts, ses lacs et son climat frais, idéale pour
            les amoureux de la nature.
          </p>
        </div>
        <div className="actualite-card">
          <img src={Casablanca} alt="Casablanca" />
          <p>
            <b>Casablanca,</b> la plus grande ville du Maroc, est un centre
            économique dynamique avec ses plages, ses commerces et ses
            restaurants de qualité.
          </p>
        </div>
        <div className="actualite-card">
          <img src={Agadir} alt="Agadir" />
          <p>
            <b>Agadir,</b> station balnéaire par excellence, offre un climat
            agréable toute l'année, des plages magnifiques et des
            infrastructures modernes.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Accueil() {
  useEffect(() => {
    const elements = document.querySelectorAll(".fade-in-element");
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, 300 + index * 100);
    });
  }, []);

  return (
    <div className="accueil-page">
      
      <div className="accueil-container">
        
      <HeroSection />

    

        
      <div className="section">
  <div className="section-image">
    <img src={pricingImage} alt="Prix immobilier" />
  </div>
  <div className="section-content">
    <span className="tag mb-3">Restez informé !</span>
    <h1 className="text-2xl font-bold mb-5">Découvrez les prix de l'immobilier au Maroc</h1>
    <p className="mb-7">
      Découvrez les annonces de <span className="highlight">LocaTech</span> pour obtenir facilement des informations sur le marché de l’immobilier.
      Découvrez le prix au mètre carré pour des adresses, des villes et des quartiers spécifiques.
      Informez-vous et découvrez les prix dans la région de votre choix dès aujourd’hui !
    </p>
    <button className="btn-secondary mb-7">Découvrir les annonces →</button>
  </div>
</div>

<hr className="section-divider bg-white border-t-2 my-6" />

<div className="section reverse">
  <div className="section-content">
    <span className="tag mb-3">100% gratuit</span>
    <h1 className="text-2xl font-bold mb-5">Vendez vous-même un bien immobilier sur <span className="highlight">LocaTech</span></h1>
    <ul className="space-y-2 mb-7">
      <li>✅ Présentez votre bien et ses caractéristiques</li>
      <li>✅ Définissez le prix de vente de votre maison ou appartement</li>
      <li>✅ Mettez en avant ce qui le rend unique</li>
    </ul>
    <button className="btn-secondary mb-7">Découvrir les annonces →</button>
  </div>
  <div className="section-image">
    <img src={sellImage} alt="Vente immobilière" />
  </div>
</div>




        
        <div className="info-cards-title">
          <h3 className="text-red-500">
            Trouvez votre futur logement, que ce soit pour acheter et louer
          </h3>
        </div>
        <div className="info-cards">
          <div className="card">
            <img src={infoCard1} alt="Quartiers" />
            <p>
              Explorez les critères intéressants à prendre en compte selon votre
              mode de vie, les écoles, et les axes de circulation.
            </p>
          </div>
          <div className="card">
            <img src={infoCard2} alt="Choix quartier" />
            <p>
              En trouvant le quartier idéal, vous accédez à une meilleure
              qualité de vie et une valorisation durable.
            </p>
          </div>
          <div className="card">
            <img src={infoCard3} alt="Conseils logement" />
            <p>
              Localisation, transports, écoles et commerces : trouvez les
              quartiers qui répondent à vos critères.
            </p>
          </div>
        </div>
        
        <div className="testimonial-section">
          <h2 className="testimonial-title ">
            Ils ont vendu ou loué grâce à LocaTech
          </h2>
          <div className="testimonial-content">
            <div className="testimonial-image-container">
              <img
                src={Témoignage}
                alt="Riad marocain"
                className="testimonial-image"
              />
              <div className="testimonial-card">
                <Quote className="quote-icon" size={32} />
                <h3>
                  Le Marché Immobilier au Maroc : Diversité et Opportunités
                </h3>
                <p>
                  Le marché immobilier au Maroc offre une large gamme de maisons
                  pour tous les budgets, allant des villas luxueuses aux
                  appartements modernes en ville. Les grandes villes comme
                  Casablanca et Marrakech attirent les investisseurs, tandis que
                  les régions rurales proposent des maisons traditionnelles dans
                  des cadres pittoresques.
                </p>
                <span className="testimonial-source text-red-500">@LocaTech</span>
              </div>
            </div>
          </div>
        </div>

        {/* <ActualitesImmobilieres /> */}

      </div>
    </div>
  );
}
