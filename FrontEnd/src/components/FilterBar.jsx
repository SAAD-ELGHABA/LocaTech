import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import ChatAI from "./ChatAI/ChatAI";
import { Funnel, Sparkles } from "lucide-react";
import axios from "axios";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useNavigate } from "react-router";

function FilterBar() {
  const searchBoxRef = useRef(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [budget, setBudget] = useState({ min: null, max: null });
  const [ville, setVille] = useState("");
  const [showChatAI, setShowChatAI] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const location = useLocation();

  const dispatch = useDispatch();
  const villes = useSelector((state) => state.VillesReducer);
  const filterBiensReducer = useSelector((state) => state.filterBiensReducer);
  const nav = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    const handleClickOutside = (event) => {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target)
      ) {
        // Add anything to close dropdowns if needed
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const budgetOptions = [
    { label: "Moins de 100.000", min: 0, max: 100000 },
    { label: "Entre 100.000 et 500.000", min: 100000, max: 500000 },
    { label: "Entre 500.000 et 1M", min: 500000, max: 1000000 },
    { label: "Entre 1M et 5M", min: 1000000, max: 5000000 },
    { label: "Entre 5M et 10M", min: 5000000, max: 10000000 },
    { label: "Plus de 10M", min: 10000000, max: null },
  ];

  const handleSearch = async () => {
    if (
      (location.pathname.startsWith("/") &&
        filterBiensReducer.typeAffaire === "acheter") ||
      filterBiensReducer.typeAffaire === "Acheter"
    ) {
      nav("/acheter");
    } else if (
      (location.pathname.startsWith("/") &&
        filterBiensReducer.typeAffaire === "louer") ||
      filterBiensReducer.typeAffaire === "Louer"
    ) {
      nav("/louer");
    }else{
      nav('/consulter-bien')
    }
    setIsloading(true);
    try {
      const response = await axios.post("/api/filterBiens", filterBiensReducer);
      if (response.status >= 200 && response.status <= 300) {
        console.log(response.data);
        dispatch({
          type: "ALLBIENS",
          payload: response.data.biens,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Erreur lors du filtrage.");
    } finally {
      setIsloading(false);
      // dispatch({
      //   type: "RESET_FILTER",
      // });
    }
  };

  const handleGoToAI = () => {
    setShowChatAI(true);
  };

  return (
    <div className="sticky top-24 z-[999] transition-all duration-300">
      <div
        ref={searchBoxRef}
        className={`w-5/6 mx-auto px-4 flex justify-center items-center mb-5 text-sm hover:bg-[#f5f3f4] rounded ${
          scrolled ? "bg-white shadow-xl" : "bg-transparent"
        }`}
      >
        <div className="p-5 rounded max-w-7xl flex flex-wrap md:flex-nowrap gap-1 justify-between items-center">
          {/* Type */}
          <select
            className="border-l border-gray-400 px-4 py-2 focus:outline-none w-full md:w-[150px]"
            value={filterBiensReducer.type}
            onChange={(e) => {
              dispatch({
                type: "SET_FILTER",
                payload: {
                  ...filterBiensReducer,
                  type: e.target.value,
                },
              });
            }}
          >
            <option value="" selected>
              Type
            </option>
            <option value="maison">Maison</option>
            <option value="appartement">Appartement</option>
            <option value="villa">Villa</option>
          </select>

          {/* Ville */}
          <select
            className="px-4 py-2 focus:outline-none border-l border-gray-400 w-full md:w-[150px]"
            value={filterBiensReducer.ville}
            onChange={(e) => {
              dispatch({
                type: "SET_FILTER",
                payload: {
                  ...filterBiensReducer,
                  ville: e.target.value,
                },
              });
            }}
          >
            <option value="">Sélectionner une ville</option>
            {villes.map((v) => (
              <option key={v.nom} value={v.nom}>
                {v.nom}
              </option>
            ))}
          </select>

          {/* Type d'affaire */}
          <select
            className="border-l border-gray-400 px-4 py-2 focus:outline-none w-full md:w-[150px]"
            value={filterBiensReducer.typeAffaire}
            onChange={(e) => {
              dispatch({
                type: "SET_FILTER",
                payload: {
                  ...filterBiensReducer,
                  typeAffaire: e.target.value, // ✅ correctly updates typeAffaire
                },
              });
            }}
          >
            <option value="">Type d'affaire</option>
            <option value="acheter">Acheter</option>
            <option value="louer">Louer</option>
          </select>

          {/* Budget */}
          <select
            className="border-l border-gray-400 px-4 py-2 focus:outline-none w-full md:w-[150px]"
            value={
              filterBiensReducer.budget
                ? JSON.stringify(filterBiensReducer.budget)
                : ""
            }
            onChange={(e) => {
              const value = e.target.value;
              const selectedBudget = value ? JSON.parse(value) : null;

              dispatch({
                type: "SET_FILTER",
                payload: {
                  ...filterBiensReducer,
                  budget: selectedBudget,
                },
              });
            }}
          >
            <option value="">Le budget</option>
            {budgetOptions.map((b, i) => (
              <option
                key={i}
                value={JSON.stringify({ min: b.min, max: b.max })}
              >
                {b.label}
              </option>
            ))}
          </select>

          {/* Filtrer */}
          <button
            onClick={handleSearch}
            className="border-[#F44336] border hover:bg-red-500 flex items-center space-x-2 text-[#F44336] px-4 py-1.5 cursor-pointer rounded-md w-full md:w-auto hover:text-white"
          >
            {isloading ? (
              <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
            ) : (
              <div className="flex items-center space-x-2">
                <Funnel className="w-4" />
                <span>Filtrer</span>
              </div>
            )}
          </button>

          {/* AI Reco */}
          <div className="p-[1px] rounded-md bg-gradient-to-r from-purple-500 via-blue-500 to-red-500 w-full sm:w-auto">
            <button
              onClick={handleGoToAI}
              className="flex items-center justify-center gap-2 bg-white cursor-pointer text-gray-800 px-4 py-2 rounded-md w-full sm:w-auto"
            >
              <Sparkles className="w-4 h-4 text-purple-500" />
              Prévoir des recommandations
            </button>
          </div>

          {/* Chat AI Popup */}
          {showChatAI && (
            <div className="fixed inset-0 z-50 backdrop-blur-xs bg-white/30 flex items-center justify-center px-4">
              <div className="bg-white w-full max-w-3xl p-6 rounded-xl shadow-2xl relative">
                <button
                  onClick={() => setShowChatAI(false)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
                >
                  ✕
                </button>
                <ChatAI
                  ville={ville}
                  selectedType={selectedType}
                  budget={budget}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FilterBar;
