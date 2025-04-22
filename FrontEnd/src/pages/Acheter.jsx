import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import brocheDeLocalisation from "../assets/broche-de-localisation.gif";
import { Bath, Bed, LandPlot } from "lucide-react";
import FilterBar from "../components/FilterBar";
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
            <Link
              to={`/details-bien-client/${bien.id}`}
              key={bien.id}
              className="relative bg-white rounded shadow overflow-hidden transition-transform duration-300 hover:scale-105"
            >
              <img
                src={bien.images[0]}
                alt="bien images"
                className="w-full h-48 object-cover"
              />
              <div className="p-3 space-y-1 text-sm">
                <h2 className="text-lg font-semibold text-left text-gray-800">
                  {bien.title.length > 25 ? (
                    <div>{bien.title.substring(0, 25)}+...</div>
                  ) : (
                    bien.title
                  )}
                </h2>
                <p className="text-gray-600 text-left flex items-center space-x-2">
                  <strong>
                    <img
                      src={brocheDeLocalisation}
                      alt="localisation"
                      className="h-5"
                    />
                  </strong>
                  <span>{bien.ville}</span>
                </p>
                <div className="text-gray-600 flex text-sm items-center justify-between">
                  <p className=" flex items-center space-x-1.5">
                    <LandPlot className=" w-4" />
                    <span>{bien.superficier} m²</span>
                  </p>
                  <p className="flex items-center space-x-1.5">
                    <span>{bien.chambres}</span>
                    <Bed className=" w-4" />
                  </p>
                  <p className="flex items-center space-x-1.5">
                    <span>{bien.salles_de_bain}</span>
                    <Bath className=" w-4" />
                  </p>
                </div>
                <p className="text-gray-600 text-left">
                  <span className="text-[#f56565] font-bold text-sm">
                    {new Intl.NumberFormat("de-DE", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(bien.budget)}
                    {"  "}MAD
                  </span>
                </p>
              </div>
            </Link>
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
