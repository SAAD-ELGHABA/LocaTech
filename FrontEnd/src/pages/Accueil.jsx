import React, { useRef, useState, useEffect } from "react";
import { Quote } from "lucide-react";
import Navbar from "../components/Navbar";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";
import image3 from "../assets/image3.png";
import pricingImage from "../assets/pricing-image.png";
import sellImage from "../assets/sell-image.png";
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
import { Link } from "react-router-dom";
import "../index.css";
import { useSelector } from "react-redux";

const HeroSection = () => {

  return (
    <div
      className="pt-40 space-y-10 flex flex-col justify-center"
      style={{
        background: `
      linear-gradient(
        to right,
        rgba(229, 56, 59, 0.2) 0%,
        #fb2c360a 25%,
        #fb2c360a 75%,
        rgba(229, 56, 59, 0.2) 100%
      )
    `,
      }}
    >
      {/* Texte */}
      <div className="text-center">
        <h1
          className="text-transparent text-xl md:text-3xl font-bold mb-6 leading-snug w-3/6 mx-auto"
          style={{
            WebkitTextStroke: "1px #ef4444",
          }}
        >
          Trouvez votre maison/ appartement idéal en toute simplicité !
        </h1>

        <Link
          to={"/consulter-bien"}
          className="flex items-center mx-auto bg-red-500 w-48 justify-center py-2 rounded-3xl space-x-2 text-sm text-white hover:scale-105"
        >
          <div>
            Trouver votre bien
          </div>
          <FontAwesomeIcon icon={faChevronRight} />
        </Link>
      </div>

      {/* Search Bar */}
      <div>
        <FilterBar />
      </div>
    </div>
  );
};
import brocheDeLocalisation from "../assets/broche-de-localisation.gif";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FilterBar from "../components/FilterBar";
import BienContainer from "../components/BienContainer";

const ImageCarousel = () => {
  const images = [
    image1, // Imported image
    image2, // Imported image
    image3, // Imported image
  ];
  const Biens = useSelector((state) => state.BienReducer);

  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically change the image every 3 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // 3000ms = 3 seconds

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="relative h-64 md:h-80 lg:h-150">
      {" "}
      <div className="w-full h-full relative overflow-hidden">
        {/* Blurred background overlay */}
        <div className="absolute inset-0 backdrop-blur-xs z-0" />

        {/* Background Image */}
        <img
          src={images[currentIndex]}
          alt={`carousel-slide-${currentIndex}`}
          className="w-full h-full object-cover absolute inset-0 z-[-1]"
        />

        <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 w-full  rounded p-8 flex flex-col md:flex-row gap-6 z-10 ">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-12 w-5/6 mx-auto">
            {Biens &&
              [...Biens]
                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) // newest first
                .slice(0, 3)
                .map((bien) => <BienContainer key={bien.id} bien={bien}  isRecent={true}/>)}
          </div>
        </div>
        <div className="z-10 absolute bottom-20 left-1/2 transform -translate-x-1/2">
          <Link
            to={"/consulter-bien"}
            className="bg-red-500 text-white rounded-2xl px-6 py-2.5 text-sm flex items-center space-x-2"
          >
            <span>Voir Plus</span>
            <FontAwesomeIcon icon={faChevronRight} />
          </Link>
        </div>
      </div>
      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full bg-white opacity-60 cursor-pointer transition-opacity ${
              currentIndex === index ? "opacity-100" : ""
            }`}
          />
        ))}
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
  const [submissionMessage, setSubmissionMessage] = useState("");

  useEffect(() => {
    // جلب الرسالة من localStorage
    const message = localStorage.getItem("submissionMessage");
    if (message) {
      setSubmissionMessage(message);
      localStorage.removeItem("submissionMessage"); // باش تبان غير مرة وحدة
    }
  }, []);

  useEffect(() => {
    if (submissionMessage) {
      const timer = setTimeout(() => {
        setSubmissionMessage(""); // يختفي بعد 1 ثانية
      }, 1000); // 1 ثانية (1000 مللي ثانية)

      return () => clearTimeout(timer); // تنظيف التايمر إذا تغيرت الرسالة
    }
  }, [submissionMessage]);

  const carouselRef = useRef(null);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowButton(
          entry.isIntersecting || window.scrollY > entry.boundingClientRect.top
        );
      },
      {
        threshold: 0.1,
      }
    );

    if (carouselRef.current) {
      observer.observe(carouselRef.current);
    }

    return () => {
      if (carouselRef.current) {
        observer.unobserve(carouselRef.current);
      }
    };
  }, []);

  {
    showButton && (
      <div className="fixed bottom-4 right-4 z-50">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition">
          Rechercher
        </button>
      </div>
    );
  }

  const [showNavbarSearch, setShowNavbarSearch] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.querySelector(".section");
      if (section) {
        const rect = section.getBoundingClientRect();
        setShowNavbarSearch(rect.top < 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
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
      <Navbar showSearchButton={showNavbarSearch} />

      <div className="accueil-container">
        {submissionMessage && (
          <div
            className="fixed top-[100px] left-1/2 transform -translate-x-1/2 bg-[#03a9f4] text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-opacity duration-1000 opacity-100"
            style={{
              width: "auto",
              maxWidth: "900px",
              opacity: submissionMessage ? 1 : 0,
            }}
          >
            {submissionMessage}
          </div>
        )}

        <div id="hero-section">
          <HeroSection />
        </div>

        <div ref={carouselRef}>
          <ImageCarousel />
        </div>

        <div className="section">
          <div className="section-image">
            <img src={pricingImage} alt="Prix immobilier" />
          </div>
          <div className="section-content">
            <span className="tag mb-3">Restez informé !</span>
            <h1 className="text-2xl font-bold mb-5">
              Découvrez les prix de l'immobilier au Maroc
            </h1>
            <p className="mb-7">
              Découvrez les annonces de{" "}
              <span className="highlight">LocaTech</span> pour obtenir
              facilement des informations sur le marché de l’immobilier.
              Découvrez le prix au mètre carré pour des adresses, des villes et
              des quartiers spécifiques. Informez-vous et découvrez les prix
              dans la région de votre choix dès aujourd’hui !
            </p>

            <Link to={"/acheter"} className="btn-secondary mb-7">
              Découvrir les annonces →
            </Link>
          </div>
        </div>

        <hr className="bg-white border-0 border-t border-gray-300 my-12 w-3/10 mx-auto border-t-2 my-6" />

        <div className="section reverse">
          <div className="section-content">
            <span className="tag mb-3">100% gratuit</span>
            <h1 className="text-2xl font-bold mb-5">
              Vendez vous-même un bien immobilier sur{" "}
              <span className="highlight">LocaTech</span>
            </h1>
            <ul className="space-y-2 mb-7">
              <li>✅ Présentez votre bien et ses caractéristiques</li>
              <li>
                ✅ Définissez le prix de vente de votre maison ou appartement
              </li>
              <li>✅ Mettez en avant ce qui le rend unique</li>
            </ul>
            <Link to={"/louer"} className="btn-secondary mb-7">
              Découvrir les annonces →
            </Link>
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
                <span className="testimonial-source text-red-500">
                  @LocaTech
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* <ActualitesImmobilieres /> */}

        {/* 💬 TÉMOIGNAGES */}
        <section className="mb-24 px-4 md:px-6">
          <h2 className="text-xl font-semibold text-center text-gray-800 mb-10">
            💬 Ce que disent nos utilisateurs
          </h2>
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-3/4 mx-auto text-sm">
            {/* Testimonial 1 */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow">
              <p className="italic">
                "Grâce à LocaTech, j’ai trouvé un appartement à Rabat en moins
                d’une semaine. Simple, rapide et efficace."
              </p>
              <p className="text-right font-semibold mt-4 text-red-500">
                — Samira B.
              </p>
            </div>
            {/* Testimonial 2 */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow">
              <p className="italic">
                "La plateforme est moderne et intuitive, j’ai pu comparer
                plusieurs biens très facilement."
              </p>
              <p className="text-right font-semibold mt-4 text-red-500">
                — Anas M.
              </p>
            </div>
            {/* Testimonial 3 */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow">
              <p className="italic">
                "J'ai pu trouver l'appartement idéal grâce à une recherche
                simple et des filtres efficaces."
              </p>
              <p className="text-right font-semibold mt-4 text-red-500">
                — Khalid T.
              </p>
            </div>
            {/* Testimonial 4 */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow">
              <p className="italic">
                "Le processus de vente est super fluide, et le support client
                est toujours disponible pour nous aider."
              </p>
              <p className="text-right font-semibold mt-4 text-red-500">
                — Amina L.
              </p>
            </div>
            {/* Testimonial 5 */}
            <div className="bg-white border  border-gray-200 rounded-xl p-6 shadow">
              <p className="italic">
                "Une excellente plateforme pour acheter, vendre et louer des
                propriétés avec une interface simple."
              </p>
              <p className="text-right font-semibold mt-4 text-red-500">
                — Mehdi R.
              </p>
            </div>
            {/* Testimonial 6 */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow">
              <p className="italic">
                "LocaTech a facilité ma recherche d'appartement, je recommande
                vivement!"
              </p>
              <p className="text-right font-semibold mt-4 text-red-500">
                — Sofia H.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
