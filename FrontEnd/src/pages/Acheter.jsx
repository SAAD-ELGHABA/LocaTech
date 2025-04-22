import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import brocheDeLocalisation from "../assets/broche-de-localisation.gif";
import { Bath, Bed, LandPlot } from "lucide-react";
import FilterBar from "../components/FilterBar";
import BienContainer from "../components/BienContainer";
const Acheter = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const Biens = useSelector((state) => state.BienReducer);

  return (
    <div className=" mt-25 bg-gray-50 min-h-screen">
      <FilterBar />
      {Biens.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-12 w-5/6 mx-auto">
          {Biens.filter(
            (b) => b.typeAffaire === "Acheter" || b.typeAffaire === "acheter"
          ).map((bien) => (
            <BienContainer bien={bien}/>
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
