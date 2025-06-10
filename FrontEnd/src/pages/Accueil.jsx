import React, { useRef, useState, useEffect } from "react";
import { LoaderCircle, Quote } from "lucide-react";
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
    <div className="pt-40 space-y-10 flex flex-col justify-center bg-gradient-to-r from-red-100 via-white to-red-100">
      <div className="text-center ">
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
          <div>Trouver votre bien</div>
          <FontAwesomeIcon icon={faChevronRight} />
        </Link>
      </div>

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
  const images = [image1, image2, image3];
  const Biens = useSelector((state) => state.BienReducer);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="relative h-64 md:h-80 lg:h-150">
      {" "}
      <div className="w-full h-full relative overflow-hidden">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-fixed filter blur-[2px] transition-all duration-1000"
          style={{
            backgroundImage: `url(${images[currentIndex]})`,
            transition: "opacity 1s ease-in-out",
            willChange: "opacity",
          }}
        />

        <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 w-full  rounded p-8 flex flex-col md:flex-row gap-6 z-10 ">
          {Biens?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-12 w-5/6 mx-auto">
              {[...Biens]
                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                .slice(0, 3)
                .map((bien) => (
                  <BienContainer key={bien.id} bien={bien} isRecent={true} />
                ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-[10vh] w-full">
              <LoaderCircle className="animate-spin h-12 w-12 text-red-500" />
            </div>
          )}
        </div>
        <div className="z-10 absolute bottom-20 left-1/2 transform -translate-x-1/2">
          <Link
            to={"/consulter-bien"}
            className="bg-red-500 text-white w-48 justify-center rounded-2xl px-6 py-2.5 text-sm flex items-center space-x-2"
          >
            <span>Voir Plus</span>
            <FontAwesomeIcon icon={faChevronRight} />
          </Link>
        </div>
      </div>
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
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import MostRatedBiens from "../components/MostRatedBiens";
export default function Accueil() {
  const [submissionMessage, setSubmissionMessage] = useState("");

  useEffect(() => {
    const message = localStorage.getItem("submissionMessage");
    if (message) {
      setSubmissionMessage(message);
      localStorage.removeItem("submissionMessage");
    }
  }, []);

  useEffect(() => {
    if (submissionMessage) {
      const timer = setTimeout(() => {
        setSubmissionMessage("");
      }, 1000);

      return () => clearTimeout(timer);
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
  const Biens = useSelector((state) => state.BienReducer);
  const [randomImage, setRandomImage] = useState([]);
  useEffect(() => {
    if (Biens.length > 0) {
      const randomBien1 = Biens[Math.floor(Math.random() * Biens.length)];
      const randomBien2 = Biens[Math.floor(Math.random() * Biens.length)];

      if (
        randomBien1.images &&
        randomBien2.images &&
        randomBien1.images.length > 0 &&
        randomBien2.images.length > 0
      ) {
        const randomImg1 =
          randomBien1.images[
            Math.floor(Math.random() * randomBien1.images.length)
          ];
        const randomImg2 =
          randomBien1.images[
            Math.floor(Math.random() * randomBien1.images.length)
          ];
        setRandomImage([randomImg1, randomImg2]);
      }
    }
  }, [Biens]);
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const biensWithImages = shuffleArray(
    Biens.filter((bien) => bien.images && bien.images.length > 0)
  ).slice(0, 10);

  return (
    <div className="accueil-page">
      <Navbar showSearchButton={showNavbarSearch} />

      <div className="accueil-container">
        {submissionMessage && (
          <div
            className="fixed top-[100px] left-1/2 transform -translate-x-1/2 text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-opacity duration-1000 opacity-100"
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
        <div>
          <MostRatedBiens />
        </div>
        <div className="section w-[90%] mx-auto ">
          <div className="section-image">
            {randomImage ? (
              <img
                src={randomImage[0]}
                alt="Random Bien"
                className="w-full h-auto rounded-lg object-cover"
              />
            ) : (
              <p>Loading image...</p>
            )}
          </div>
          <div className="section-content ">
            <span className="tag mb-3">Restez informé !</span>
            <h1 className="text-2xl font-bold mb-5">
              Découvrez les prix de l'immobilier au Maroc
            </h1>
            <p className="mb-7 text-sm">
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

        <hr className="border-t border-gray-300 w-3/10 mx-auto" />

        <div className="section reverse w-[90%] mx-auto">
          <div className="section-content">
            <span className="tag mb-3">100% gratuit</span>
            <h1 className="text-2xl font-bold mb-5">
              Vendez vous-même un bien immobilier sur{" "}
              <span className="highlight">LocaTech</span>
            </h1>
            <ul className="space-y-2 mb-7 text-sm">
              <li> Présentez votre bien et ses caractéristiques</li>
              <li>
                Définissez le prix de vente de votre maison ou appartement
              </li>
              <li> Mettez en avant ce qui le rend unique</li>
            </ul>
            <Link to={"/louer"} className="btn-secondary mb-7">
              Découvrir les annonces →
            </Link>
          </div>
          <div className="section-image">
            {randomImage ? (
              <img
                src={randomImage[1]}
                alt="Random Bien"
                className="w-full h-auto rounded-lg object-cover"
              />
            ) : (
              <p>Loading image...</p>
            )}
          </div>
        </div>

        <div className="w-4/5 mx-auto">
          <h2 className="text-start text-xl font-bold mb-6 ">
            Trouvez votre futur logement, que ce soit pour acheter et louer
          </h2>
          <div className="grid grid-cols-3  gap-4">
            <div className=" rounded-xl bg-white pb-2 flex flex-col gap-3">
              <img src={infoCard1} alt="Quartiers " className="rounded-t-2xl" />
              <p className="p-1 text-sm ms-2">
                Explorez les critères intéressants à prendre en compte selon
                votre mode de vie, les écoles, et les axes de circulation.
              </p>
            </div>
            <div className="rounded-xl bg-white pb-2 flex flex-col gap-3">
              <img
                src={infoCard2}
                alt="Choix quartier"
                className="rounded-t-2xl "
              />
              <p className="p-1 text-sm ms-2">
                En trouvant le quartier idéal, vous accédez à une meilleure
                qualité de vie et une valorisation durable.
              </p>
            </div>
            <div className="rounded-xl bg-white pb-2 flex flex-col gap-3">
              <img
                src={infoCard3}
                alt="Conseils logement"
                className="rounded-t-2xl"
              />
              <p className="p-1 text-sm ms-2">
                Localisation, transports, écoles et commerces : trouvez les
                quartiers qui répondent à vos critères.
              </p>
            </div>
          </div>
        </div>
        <div className="w-5/6 mx-auto my-12">
          <h2 className=" text-xl font-bold mb-3 ">
            Ils ont vendu ou loué grâce à LocaTech
          </h2>
          <div className=" flex justify-start p-4 items-center">
            <div className="testimonial-image-container  max-w-[70%] relative ">
              <Swiper
                modules={[Autoplay, Pagination]}
                autoplay={{ delay: 3000 }}
                loop={true}
              >
                {biensWithImages.map((bien, index) => {
                  const image = bien.images[0];
                  return (
                    <SwiperSlide key={index}>
                      <img
                        src={image}
                        alt={`Bien ${index}`}
                        className="h-[450px] w-full rounded-xl relative object-cover"
                      />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
              <div className=" absolute top-[45%] z-20 -right-[30%] max-w-[70%] bg-white p-6 bg-opacity-80  rounded-xl shadow-xl ">
                <Quote
                  className="text-start quote-icon mb-2 text-red-500"
                  size={18}
                />
                <h3 className="font-bold text-lg mb-2">
                  Le Marché Immobilier au Maroc : Diversité et Opportunités
                </h3>
                <p className="text-sm">
                  Le marché immobilier au Maroc offre une large gamme de maisons
                  pour tous les budgets, allant des villas luxueuses aux
                  appartements modernes.
                </p>
                <span className="testimonial-source text-red-500 text-sm mt-2 block">
                  @LocaTech
                </span>
              </div>
            </div>
          </div>
        </div>

        <section className="mb-24 px-4 md:px-6">
          <h2 className="text-xl font-semibold text-center text-gray-800 mb-10">
            💬 Ce que disent nos utilisateurs
          </h2>
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-3/4 mx-auto text-sm">
            <div className="bg-white   rounded-xl p-6 shadow">
              <p className="italic">
                "Grâce à LocaTech, j’ai trouvé un appartement à Rabat en moins
                d’une semaine. Simple, rapide et efficace."
              </p>
              <p className="text-right font-semibold mt-4 text-red-500">
                — Samira B.
              </p>
            </div>
            <div className="bg-white  rounded-xl p-6 shadow">
              <p className="italic">
                "La plateforme est moderne et intuitive, j’ai pu comparer
                plusieurs biens très facilement."
              </p>
              <p className="text-right font-semibold mt-4 text-red-500">
                — Anas M.
              </p>
            </div>
            <div className="bg-white  rounded-xl p-6 shadow">
              <p className="italic">
                "J'ai pu trouver l'appartement idéal grâce à une recherche
                simple et des filtres efficaces."
              </p>
              <p className="text-right font-semibold mt-4 text-red-500">
                — Khalid T.
              </p>
            </div>
            <div className="bg-white  rounded-xl p-6 shadow">
              <p className="italic">
                "Le processus de vente est super fluide, et le support client
                est toujours disponible pour nous aider."
              </p>
              <p className="text-right font-semibold mt-4 text-red-500">
                — Amina L.
              </p>
            </div>
            <div className="bg-white border  border-gray-200 rounded-xl p-6 shadow">
              <p className="italic">
                "Une excellente plateforme pour acheter, vendre et louer des
                propriétés avec une interface simple."
              </p>
              <p className="text-right font-semibold mt-4 text-red-500">
                — Mehdi R.
              </p>
            </div>
            <div className="bg-white  rounded-xl p-6 shadow">
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
