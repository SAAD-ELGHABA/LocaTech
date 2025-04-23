import { useState, useEffect } from "react";
import { Link, Links, useLocation } from "react-router-dom";
import apartmentImage from "../assets/apartment_morocco.png";
import houseImage from "../assets/house_morocco.png";
import villaImage from "../assets/villa_morocco.png";
import realEstateImage from "../assets/realEstate_morocco.png";
import { useSelector } from "react-redux";
import brocheDeLocalisation from "../assets/broche-de-localisation.gif";
import { Bath, Bed, LandPlot } from "lucide-react";
import BienContainer from "../components/BienContainer";
import FilterBar from "../components/FilterBar";

const getRandomPrice = (budgetString) => {
  const budget = String(budgetString).trim();
  if (budget.includes("et +"))
    return Math.floor(Math.random() * 1000000) + 5000000;

  const match = budget.match(/(\d[\d\s]*)\s*à\s*(\d[\d\s]*)/);
  if (!match) return 0;
  const min = parseInt(match[1].replace(/\s/g, ""), 10);
  const max = parseInt(match[2].replace(/\s/g, ""), 10);
  if (isNaN(min) || isNaN(max)) return 0;

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getImage = (type) => {
  switch (type?.toLowerCase()) {
    case "appartement":
      return apartmentImage;
    case "maison":
      return houseImage;
    case "villa":
      return villaImage;
    default:
      return realEstateImage;
  }
};

const Acheter = () => {
  const location = useLocation();
  const { ville, type, budget, action } = location.state || {};
  const [annonces, setAnnonces] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const annoncesParPage = 9;
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  useEffect(() => {
    if (ville && type && budget) {
      const newAnnonces = Array.from({ length: 60 }, (_, i) => ({
        id: i,
        image: getImage(type),
        title: `${type} à ${action} à ${ville}`,
        surface: Math.floor(Math.random() * 100) + 60,
        price: getRandomPrice(budget),
      }));
      setAnnonces(newAnnonces);
    }
  }, [ville, type, budget, action]);

  const totalPages = Math.ceil(annonces.length / annoncesParPage);
  const indexStart = (currentPage - 1) * annoncesParPage;
  const currentAnnonces = annonces.slice(
    indexStart,
    indexStart + annoncesParPage
  );
  const Biens = useSelector((state) => state.BienReducer);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  console.log(Biens);

  const Pagination = () => (
    <div className="flex justify-end items-center space-x-2 my-8">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 text-sm font-medium rounded ${
          currentPage === 1
            ? "text-gray-400 cursor-not-allowed"
            : "text-red-600 hover:text-red-800 cursor-pointer"
        }`}
      >
        « Précédent
      </button>
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => handlePageChange(i + 1)}
          className={`w-8 h-8 flex items-center justify-center rounded text-sm font-semibold border ${
            currentPage === i + 1
              ? "bg-black text-white"
              : "text-red-600 hover:bg-red-100"
          } cursor-pointer`}
        >
          {i + 1}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 text-sm font-medium rounded ${
          currentPage === totalPages
            ? "text-gray-400 cursor-not-allowed"
            : "text-red-600 hover:text-red-800 cursor-pointer"
        }`}
      >
        Suivant »
      </button>
    </div>
  );

  return (
    <div className="acheter-page pt-12 px-4 md:px-8 mt-25 bg-gray-50 min-h-screen">
      <FilterBar />

      {Biens.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-12 w-5/6 mx-auto">
          {Biens.filter(
            (b) => b.typeAffaire === "Louer" || b.typeAffaire === "louer"
          ).map((bien) => (
            <BienContainer bien={bien} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-10">
          Aucun bien trouvé pour les critères sélectionnés.
        </p>
      )}
    </div>
  );
};

export default Acheter;
