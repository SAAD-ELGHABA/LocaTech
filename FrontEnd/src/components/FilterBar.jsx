import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import ChatAI from "./ChatAI/ChatAI";
import { Funnel, RouteOff, Sparkles } from "lucide-react";
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
    } else {
      nav("/consulter-bien");
    }
    setIsloading(true);
    try {
      const response = await axios.post("/api/filterBiens", filterBiensReducer);
      if (response.status >= 200 && response.status <= 300) {
        if (response.data.biens.length === 0) {
          toast.error("Aucun bien trouvé avec ces critères.");
        } else {
          dispatch({
            type: "GET_FILTRED_BIENS",
            payload: response.data.biens,
          });
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Erreur lors du filtrage.");
    } finally {
      setIsloading(false);
    }
  };

  const handleGoToAI = () => {
    setShowChatAI(true);
  };
  const handleCloseAI = () => setShowChatAI(false);
  return (
    <div className=" transition-all duration-300">
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
            <option value="">Ville</option>
            {villes.map((v) => (
              <option key={v.nom} value={v.nom}>
                {v.nom}
              </option>
            ))}
          </select>
          {location.pathname.startsWith("/acheter") ||
            location.pathname.startsWith("/louer") ||
            (location.pathname.startsWith("/") && (
              <select
                className="border-l border-gray-400 px-4 py-2 focus:outline-none w-full md:w-[150px]"
                value={filterBiensReducer.typeAffaire}
                onChange={(e) => {
                  dispatch({
                    type: "SET_FILTER",
                    payload: {
                      ...filterBiensReducer,
                      typeAffaire: e.target.value,
                    },
                  });
                }}
              >
                <option value="">Type d'affaire</option>
                <option value="acheter">Achat</option>
                <option value="louer">Location</option>
              </select>
            ))}

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
            <option value="">Budget (MAD)</option>
            {budgetOptions.map((b, i) => (
              <option
                key={i}
                value={JSON.stringify({ min: b.min, max: b.max })}
              >
                {b.label}
              </option>
            ))}
          </select>
          <button
            className="flex items-center justify-center hover:border-gray-400 border rounded border-transparent px-2 py-2.5 cursor-pointer"
            onClick={async () => {
              const resetFilter = toast.loading(
                "Réinitialisation des filtres..."
              );
              try {
                dispatch({ type: "RESET_FILTER" });
                dispatch({ type: "RESET_FILTERED_BIENS" });

                toast.success("Filtres réinitialisés !");
              } catch (error) {
                toast.error(
                  error?.response?.data?.message ||
                    "Erreur lors de la réinitialisation."
                );
              } finally {
                toast.dismiss(resetFilter);
              }
            }}
          >
            <RouteOff className="h-4" />
          </button>
          <button
            onClick={handleSearch}
            className="border-[#F44336] border hover:bg-red-500 flex items-center space-x-2 text-[#F44336] px-4 py-2 cursor-pointer rounded-md w-full justify-center md:w-[100px] hover:text-white"
          >
            {isloading ? (
              <div className="flex items-center space-x-1">
                <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
              </div>
            ) : (
              <div className="flex items-center space-x-1">
                <Funnel className="h-4" />
                <span>Filtrer</span>
              </div>
            )}
          </button>

          <div className="p-[1px] rounded-md bg-gradient-to-r from-purple-500 via-blue-500 to-red-500 w-full sm:w-auto">
            <button
              onClick={handleGoToAI}
              className="flex items-center justify-center gap-2 bg-white cursor-pointer text-gray-800 px-4 py-2 rounded-md w-full sm:w-auto"
            >
              <Sparkles className="w-4 h-4 text-purple-500" />
              Prévoir des recommandations
            </button>
          </div>

          {showChatAI && (
            <div
              className="fixed inset-0 bg-[#161a1d93] h-screen w-full flex items-center justify-center"
              style={{ zIndex: 9999 }}
              onClick={() => setShowChatAI(false)}
            >
              <ChatAI onClose={handleCloseAI} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FilterBar;
