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
// أيقونات السوشيال ميديا (مثال)
import { Quote } from "lucide-react";
import { MdRecommend } from "react-icons/md";
import logo from "../assets/Location.png";
import pricingImage from "../assets/pricing-image.png"; // Import image for pricing section
import sellImage from "../assets/sell-image.png"; // Import image for sell section
import infoCard1 from "../assets/infoCard1.png";
import infoCard2 from "../assets/infoCard2.png";
import infoCard3 from "../assets/infoCard3.png";
import Témoignage from "../assets/Témoignage.png";
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

// Composant Navbar
// function Navbar() {
//   return (
//     <nav className="navbar ">
//       <div className="navbar-brand">
//         <div className="logo-container">
//           <img src={logo} alt="Logo" className="logo-image" />
//           <h1 className="logo">
//             <span className="logo-red">Loca</span>
//             <span className="logo-green">Tech</span>
//           </h1>
//         </div>
//       </div>

//       <div className="navbar-links">
//         <a href="#accueil" className="nav-link">
//           <FaHome className="nav-icon" />
//           <span>Accueil</span>
//         </a>
//         <a href="#acheter" className="nav-link">
//           <FaShoppingCart className="nav-icon" />
//           <span>Acheter</span>
//         </a>
//         <a href="#louer" className="nav-link">
//           <FaKey className="nav-icon" />
//           <span>Louer</span>
//         </a>
//         <a href="#blog" className="nav-link">
//           <FaBlog className="nav-icon" />
//           <Link to="/blog" className="text-gray-800 hover:text-green-600">
//   <span>Blog</span>
// </Link>
//         </a>
//         <a href="#contact" className="nav-link">
//           <FaEnvelope className="nav-icon" />
//           <span>Contactez-nous</span>
//         </a>
//         <a href="#annonce" className="nav-link highlight-red">
//           <FaPlusCircle className="nav-icon" />
//           <span>Déposer une annonce</span>
//         </a>
//         <a href="#espace" className="nav-link border-red">
//           <FaUserCircle className="nav-icon" />
//           <span>Mon Espace</span>
//         </a>
//       </div>
//     </nav>
//   );
// }

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

// Composant Footer
// function Footer() {
//   return (
//     <footer className="main-footer">
//       <div className="footer-columns">
//         <div className="footer-column">
//           <h3>Découvrir</h3>
//           <ul>
//             <li>
//               <a href="#">Découvrez LocaTech</a>
//             </li>
//             <li>
//               <a href="#">Découvrez votre futur quartier</a>
//             </li>
//             <li>
//               <a href="#">Achetez et louez votre bien</a>
//             </li>
//             <li>
//               <a href="#">Actualités et conseils immobiliers</a>
//             </li>
//           </ul>
//         </div>
//         <div className="footer-column">
//           <h3>L'entreprise</h3>
//           <ul>
//             <li>
//               <a href="#">Nous contacter</a>
//             </li>
//             <li>
//               <a href="#">Besoin d'aide ?</a>
//             </li>
//             <li>
//               <a href="#">Votre avis nous intéresse</a>
//             </li>
//           </ul>
//         </div>
//         <div className="footer-column follow-us">
//           <h3>Retrouvez-nous sur :</h3>
//           <div className="social-icons">
//             <a href="#">
//               <FaFacebook size={20} />
//             </a>
//             <a href="#">
//               <FaTwitter size={20} />
//             </a>
//             <a href="#">
//               <FaInstagram size={20} />
//             </a>
//             <a href="#">
//               <FaLinkedin size={20} />
//             </a>
//             <a href="#">
//               <FaPhoneAlt size={20} />
//             </a>{" "}
//             {/* Téléphone */}
//             <a href="#">
//               <FaCcPaypal size={20} />
//             </a>{" "}
//             {/* PayPal */}
//             <a href="#">
//               <FaCcVisa size={20} />
//             </a>{" "}
//             {/* Carte de crédit (Visa) */}
//           </div>
//         </div>
//       </div>
//       <div className="footer-bottom">
//           <div className="logo-container">
//       <img src={logo} alt="LocaTech Logo" className="footer-logo" />
//       <span><span className="logo-red">Loca</span><span className="logo-green">Tech</span></span>
//     </div>

//         <p>&copy; LocaTech - 2025</p>
//       </div>
//     </footer>
//   );
// }

// Composant Accueil
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
      {/* <Navbar /> */}
      <div className="accueil-container">
        {/* Hero Section */}
      <div className="hero-section">
        <div className="overlay">
          <h1>
            Trouvez votre maison/<br /> appartement idéal en toute simplicité !
          </h1>
          <p>
            Découvrez des centaines d’annonces d’appartements et de maisons à
            vendre ou à louer partout au Maroc.
          </p>
          <button className="cta-button">Consulter</button>
        </div>
      </div>

      {/* Search Section */}
<div className="search-section">
  <select><option>Achat</option></select>
  <select><option>Ville</option></select>
  <select><option>Type</option></select>
  <input type="text" placeholder="Budget                        MAD" />
  <div className="button-group">
    <button className="search-btn">Rechercher</button>
    <button className="ai-btn">Prévoir des recommandations 🔮</button>
  </div>
</div>

        {/* Section 1 - Pricing */}
<div className="section">
  <div className="section-image">
    <img src={pricingImage} alt="Prix immobilier" />
  </div>
  <div className="section-content">
    <span className="tag">Restez informé !</span>
    <h2>Découvrez les prix de l'immobilier au Maroc</h2>
    <p>
      Découvrez les annonces de <span className="highlight">LocaTech</span> pour obtenir facilement des informations sur le marché de l’immobilier. 
      Découvrez le prix au mètre carré pour des adresses, des villes et des quartiers spécifiques. 
      Informez-vous et découvrez les prix dans la région de votre choix dès aujourd’hui !
    </p>
    <button className="btn-secondary">Découvrir les annonces →</button>
  </div>
</div>

{/* Divider */}
<hr className="section-divider" />

{/* Section 2 - Sell */}
<div className="section reverse">
  <div className="section-content">
    <span className="tag">100% gratuit</span>
    <h2>Vendez vous-même un bien immobilier sur <span className="highlight">LocaTech</span></h2>
    <ul>
      <li>✅ Présentez votre bien et ses caractéristiques</li>
      <li>✅ Définissez le prix de vente de votre maison ou appartement</li>
      <li>✅ Mettez en avant ce qui le rend unique</li>
    </ul>
    <button className="btn-secondary">Découvrir les annonces →</button>
  </div>
  <div className="section-image">
    <img src={sellImage} alt="Vente immobilière" />
  </div>
</div>


        {/* Info Cards */}
        <div className="info-cards-title">
          <h3>
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
        {/* Témoignage Section */}
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
                <span className="testimonial-source">@LocaTech</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section Actualités Immobilières (القسم الجديد) */}
        <ActualitesImmobilieres />

        {/* Footer (الفوتر الجديد) */}
        {/* <Footer /> */}
      </div>
    </div>
  );
}
