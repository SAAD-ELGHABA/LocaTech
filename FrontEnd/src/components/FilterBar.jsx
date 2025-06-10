import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import ChatAI from "./ChatAI/ChatAI";
import { ChevronDown, Funnel, RouteOff, Sparkles } from "lucide-react";
import axios from "axios";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useNavigate } from "react-router";

function FilterBar() {
  const searchBoxRef = useRef(null);
  const [showChatAI, setShowChatAI] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState({
    type: false,
    ville: false,
    typeAffaire: false,
    budget: false,
  });

  const location = useLocation();
  const dispatch = useDispatch();
  const villes = useSelector((state) => state.VillesReducer);
  const filterBiensReducer = useSelector((state) => state.filterBiensReducer);
  const nav = useNavigate();

  const budgetOptions = [
    { label: "Moins de 100.000", min: 0, max: 100000 },
    { label: "Entre 100.000 et 500.000", min: 100000, max: 500000 },
    { label: "Entre 500.000 et 1M", min: 500000, max: 1000000 },
    { label: "Entre 1M et 5M", min: 1000000, max: 5000000 },
    { label: "Entre 5M et 10M", min: 5000000, max: 10000000 },
    { label: "Plus de 10M", min: 10000000, max: null },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    const handleClickOutside = (e) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(e.target)) {
        setDropdownOpen({
          type: false,
          ville: false,
          typeAffaire: false,
          budget: false,
        });
      }
    };
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleDropdown = (name) => {
    setDropdownOpen((prev) => ({ ...prev, [name]: !prev[name] }));
  };

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
          dispatch({ type: "GET_FILTRED_BIENS", payload: response.data.biens });
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Erreur lors du filtrage.");
    } finally {
      setIsloading(false);
    }
  };

  const handleReset = () => {
    const resetFilter = toast.loading("Réinitialisation des filtres...");
    try {
      dispatch({ type: "RESET_FILTER" });
      dispatch({ type: "RESET_FILTERED_BIENS" });
      toast.success("Filtres réinitialisés !");
      toast.dismiss(resetFilter);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Erreur lors de la réinitialisation."
      );
      toast.dismiss(resetFilter);
    } finally {
      toast.dismiss(resetFilter);
    }
  };

  const getLabel = (key) => {
    switch (key) {
      case "type":
        return filterBiensReducer.type || "Type";
      case "ville":
        return filterBiensReducer.ville || "Ville";
      case "typeAffaire":
        return filterBiensReducer.typeAffaire || "Type d'affaire";
      case "budget":
        return filterBiensReducer.budget
          ? budgetOptions.find(
              (b) =>
                b.min === filterBiensReducer.budget.min &&
                b.max === filterBiensReducer.budget.max
            )?.label
          : "Budget (MAD)";
      default:
        return "";
    }
  };

  const handleSelect = (key, value) => {
    dispatch({
      type: "SET_FILTER",
      payload: { ...filterBiensReducer, [key]: value },
    });
    setDropdownOpen({ ...dropdownOpen, [key]: false });
  };

  return (
    <div className="transition-all duration-300">
      <div
        ref={searchBoxRef}
        className={`w-5/6 mx-auto px-4 flex justify-center items-center mb-5 text-sm  rounded `}
      >
        <div className="p-5 rounded max-w-7xl flex flex-wrap md:flex-nowrap gap-2 justify-between items-center">
          <div className="relative w-full md:w-[150px]">
            <button
              onClick={() => toggleDropdown("type")}
              className={`w-full  px-4 py-2 text-left border border-gray-200 rounded-md  flex justify-between items-center 
                `}
            >
              <span>{getLabel("type")}</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            {dropdownOpen.type && (
              <ul className="absolute z-20 mt-1 w-full bg-white rounded shadow">
                {["maison", "appartement", "villa"].map((item) => (
                  <li
                    key={item}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSelect("type", item)}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="relative w-full md:w-[150px]">
            <button
              onClick={() => toggleDropdown("ville")}
              className="w-full border px-4 py-2 text-left  border-gray-200 rounded-md  flex justify-between items-center"
            >
              <span>{getLabel("ville")}</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            {dropdownOpen.ville && (
              <ul className="absolute z-20 mt-1 w-full bg-white  rounded shadow max-h-48 overflow-y-auto custom-scrollbar">
                {villes.map((v) => (
                  <li
                    key={v.nom}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSelect("ville", v.nom)}
                  >
                    {v.nom}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {(location.pathname.startsWith("/consulter-bien") ||
            location.pathname === "/") && (
            <div className="relative w-full md:w-[150px]">
              <button
                onClick={() => toggleDropdown("typeAffaire")}
                className="w-full border px-4 py-2 text-left border-gray-200 rounded-md  flex justify-between items-center"
              >
                <span>{getLabel("typeAffaire")}</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              {dropdownOpen.typeAffaire && (
                <ul className="absolute z-20 mt-1 w-full bg-white  rounded shadow custom-scrollbar">
                  {["acheter", "louer"].map((item) => (
                    <li
                      key={item}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleSelect("typeAffaire", item)}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          <div className="relative w-full md:w-[150px]">
            <button
              onClick={() => toggleDropdown("budget")}
              className="w-full border px-4 py-2 text-left border-gray-200 rounded-md  flex justify-between items-center"
            >
              <span>{getLabel("budget")}</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            {dropdownOpen.budget && (
              <ul className="absolute z-20 mt-1 w-full bg-white  rounded shadow max-h-48 overflow-y-auto custom-scrollbar">
                {budgetOptions.map((b, i) => (
                  <li
                    key={i}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() =>
                      handleSelect("budget", { min: b.min, max: b.max })
                    }
                  >
                    {b.label}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            onClick={handleReset}
            className="flex items-center justify-center hover:border-gray-400 border border-gray-500 rounded px-2 py-2.5 cursor-pointer"
          >
            <RouteOff className="h-4" />
          </button>

          <button
            onClick={handleSearch}
            className="border-[#F44336] border hover:bg-red-500 flex items-center space-x-2 text-[#F44336] px-4 py-2 cursor-pointer rounded-md w-full justify-center md:w-[100px] hover:text-white"
          >
            {isloading ? (
              <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
            ) : (
              <>
                <Funnel className="h-4" />
                <span>Filtrer</span>
              </>
            )}
          </button>

          <div className="p-[1px] rounded-md bg-gradient-to-r from-purple-500 via-blue-500 to-red-500 w-full sm:w-auto">
            <button
              onClick={() => setShowChatAI(true)}
              className="flex items-center justify-center gap-2 bg-white text-gray-800 px-4 py-2 rounded-md w-full sm:w-auto"
            >
              <Sparkles className="w-4 h-4 text-purple-500" />
              Prévoir des recommandations
            </button>
          </div>

          {showChatAI && (
            <div
              className="fixed inset-0 bg-[#161a1d93] h-screen w-full flex items-center justify-center z-[9999]"
              onClick={() => setShowChatAI(false)}
            >
              <ChatAI onClose={() => setShowChatAI(false)} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FilterBar;
