import React, { useRef, useState, useEffect } from "react";
import { LoaderCircle, Quote } from "lucide-react";
import Navbar from "../components/Navbar";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";
import image3 from "../assets/image3.png";
import infoCard1 from "../assets/infoCard1.png";
import infoCard2 from "../assets/infoCard2.png";
import infoCard3 from "../assets/infoCard3.png";
import { Link } from "react-router-dom";
import "../index.css";
import { useSelector } from "react-redux";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FilterBar from "../components/FilterBar";
import BienContainer from "../components/BienContainer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import MostRatedBiens from "../components/MostRatedBiens";
import { motion } from "framer-motion";
import RaccourciBiens from "../components/RaccourciBiens";

const HeroSection = () => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="pt-20 lg:pt-40 flex flex-col justify-center bg-gradient-to-b from-red-200 via-white to-white"
  >
    <motion.div
      className="absolute top-0 left-0 w-24 h-24 bg-red-300 rounded-full opacity-20"
      animate={{
        x: [0, 200, 0],
        y: [0, 100, 0],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    <motion.div
      className="absolute top-40 right-0 w-32 h-32 bg-red-300 rounded-full opacity-20"
      animate={{
        x: [0, -200, 0],
        y: [0, -250, 0],
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    <div className="text-center">
      <h1
        className="text-transparent text-xl md:text-3xl font-bold mb-6 w-3/6 mx-auto"
        style={{ WebkitTextStroke: "1px #ef4444" }}
      >
        Trouvez votre maison/ appartement idéal en toute simplicité !
      </h1>
      <Link
        to="/consulter-bien"
        className="flex items-center mx-auto bg-red-500 w-48 justify-center py-2 rounded-3xl text-white hover:scale-105"
      >
        <div>Trouver votre bien</div>
        <FontAwesomeIcon icon={faChevronRight} />
      </Link>
    </div>
    <FilterBar />
  </motion.div>
);

const ImageCarousel = () => {
  const images = [image1, image2, image3];
  const Biens = useSelector((state) => state.BienReducer);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(
      () => setCurrentIndex((prev) => (prev + 1) % images.length),
      3000
    );
    return () => clearInterval(intervalId);
  }, [images.length]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="hidden lg:block relative h-64 md:h-80 lg:h-150"
    >
      <div className="w-full h-full relative overflow-hidden">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-fixed filter blur-[2px]"
          style={{ backgroundImage: `url(${images[currentIndex]})` }}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10 lg:mt-22 lg:w-5/6 mx-auto">
          {[...Biens]
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .slice(0, 3)
            .map((bien) => (
              <BienContainer key={bien.id} bien={bien} isRecent={true} />
            ))}
        </div>
        <div className="absolute lg:bottom-20 left-1/2 transform -translate-x-1/2">
          <Link
            to="/consulter-bien"
            className="bg-red-500 text-white w-48 justify-center rounded-2xl px-6 py-2.5 flex items-center"
          >
            <span>Voir Plus</span>
            <FontAwesomeIcon icon={faChevronRight} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default function Accueil() {
  const [submissionMessage, setSubmissionMessage] = useState("");
  const Biens = useSelector((state) => state.BienReducer);
  const [randomImage, setRandomImage] = useState([]);

  useEffect(() => {
    if (Biens.length > 0) {
      const randomBien1 = Biens[Math.floor(Math.random() * Biens.length)];
      const randomBien2 = Biens[Math.floor(Math.random() * Biens.length)];
      if (randomBien1.images?.length && randomBien2.images?.length) {
        const randomImg1 =
          randomBien1.images[
            Math.floor(Math.random() * randomBien1.images.length)
          ];
        const randomImg2 =
          randomBien2.images[
            Math.floor(Math.random() * randomBien2.images.length)
          ];
        setRandomImage([randomImg1, randomImg2]);
      }
    }
  }, [Biens]);

  const reviews = [
    {
      text: "Grâce à LocaTech, j’ai trouvé un appartement à Rabat en moins d’une semaine. Simple, rapide et efficace.",
      author: "Samira B.",
    },
    {
      text: "La plateforme est moderne et intuitive, j’ai pu comparer plusieurs biens très facilement.",
      author: "Anas M.",
    },
    {
      text: "J'ai pu trouver l'appartement idéal grâce à une recherche simple et des filtres efficaces.",
      author: "Khalid T.",
    },
    {
      text: "Le processus de vente est super fluide, et le support client est toujours disponible pour nous aider.",
      author: "Amina L.",
    },
    {
      text: "Une excellente plateforme pour acheter, vendre et louer des propriétés avec une interface simple.",
      author: "Mehdi R.",
    },
    {
      text: "LocaTech a facilité ma recherche d'appartement, je recommande vivement!",
      author: "Sofia H.",
    },
  ];

  return (
    <div className="accueil-page">
      <Navbar />

      {submissionMessage && (
        <div
          className="fixed top-[100px] left-1/2 transform -translate-x-1/2 text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-opacity duration-1000 opacity-100"
          style={{ maxWidth: "900px", opacity: submissionMessage ? 1 : 0 }}
        >
          {submissionMessage}
        </div>
      )}

      <HeroSection />
      <ImageCarousel />
      <MostRatedBiens />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className=" w-full flex justify-center"
      >
        <RaccourciBiens biens={Biens} ville={"Rabat"} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className=" w-full flex justify-center"
      >
        <RaccourciBiens biens={Biens} ville={"Marrakech"} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className=" w-full flex justify-center"
      >
        <RaccourciBiens biens={Biens} ville={"Casablanca"} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="section w-[90%] mx-auto"
      >
        <div className="section-image">
          {randomImage[0] ? (
            <img
              src={randomImage[0]}
              alt="Random Bien"
              className="w-full h-auto rounded-lg object-cover bg-center"
            />
          ) : (
            <div className="flex items-center justify-center h-full" />
          )}
        </div>
        <div className="section-content">
          <span className="tag mb-3">Restez informé !</span>
          <h1 className="text-2xl font-bold mb-5">
            Découvrez les prix de l'immobilier au Maroc
          </h1>
          <p className="mb-7 text-sm">
            Découvrez les annonces de{" "}
            <span className="highlight">LocaTech</span> pour obtenir facilement
            des informations sur le marché de l’immobilier. Découvrez le prix au
            mètre carré pour des adresses, des villes et des quartiers
            spécifiques. Informez-vous et découvrez les prix dans la région de
            votre choix dès aujourd’hui !
          </p>

          <Link to={"/acheter"} className="btn-secondary mb-7">
            Découvrir les annonces →
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="section reverse w-[90%] mx-auto"
      >
        <div className="section-content">
          <span className="tag mb-3">100% gratuit</span>
          <h1 className="text-2xl font-bold mb-5">
            Vendez vous-même un bien immobilier sur{" "}
            <span className="highlight">LocaTech</span>
          </h1>
          <ul className="space-y-2 mb-7 text-sm">
            <li> Présentez votre bien et ses caractéristiques</li>
            <li>Définissez le prix de vente de votre maison ou appartement</li>
            <li>Mettez en avant ce qui le rend unique</li>
          </ul>
          <Link to={"/louer"} className="btn-secondary mb-7">
            Découvrir les annonces →
          </Link>
        </div>
        <div className="section-image">
          {randomImage[1] ? (
            <img
              src={randomImage[1]}
              alt="Random Bien"
              className="w-full h-auto rounded-lg object-cover bg-center"
            />
          ) : (
            <div className="flex items-center justify-center h-full" />
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="lg:w-5/6 mx-4 lg:mx-auto my-12"
      >
        <div className="lg:w-5/6 mx-4 lg:mx-auto my-12">
          <h2 className=" text-xl font-bold mb-3 ">
            Ils ont vendu ou loué grâce à LocaTech
          </h2>
          <div className=" flex justify-start p-4 items-center">
            <div className="testimonial-image-container  w-full lg:max-w-[90%] relative ">
              <Swiper
                modules={[Autoplay, Pagination]}
                autoplay={{ delay: 3000 }}
                loop={true}
              >
                {Biens.filter((bien) => bien.images && bien.images.length > 0)
                  .slice(0, 10)
                  .map((bien, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={bien.images[0]}
                        alt={`Bien ${index}`}
                        className="h-[450px] w-full rounded-xl object-cover"
                      />
                    </SwiperSlide>
                  ))}
              </Swiper>
              <div className=" absolute left-[30%] lg:left-[60%] top-[50%] lg:top-[45%] z-20 -right-[5%] lg:-right-[30%] lg:max-w-[70%] bg-white p-3 lg:p-6 bg-opacity-80  rounded-xl shadow-xl ">
                <Quote
                  className="text-start quote-icon mb-2 text-red-500"
                  size={18}
                />
                <h3
                  className="font-semibold text-lg mb-2 "
                  style={{ lineHeight: `110%` }}
                >
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
      </motion.div>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="my-24 px-4 md:px-6"
      >
        <h2 className="text-xl font-semibold text-center text-gray-800 mb-10">
          💬 Ce que disent nos utilisateurs
        </h2>
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-3/4 mx-auto text-sm">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="bg-white rounded-xl p-6 shadow"
            >
              <p className="italic">"{review.text}"</p>
              <p className="text-right font-semibold mt-4 text-red-500">
                — {review.author}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
