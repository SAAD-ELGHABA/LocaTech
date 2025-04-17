import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import brocheDeLocalisation from "../assets/broche-de-localisation.gif";
import FilterBar from "../components/FilterBar";
import {
  ArrowDownWideNarrow,
  Ban,
  Bath,
  Bed,
  BedDouble,
  LandPlot,
} from "lucide-react";

function ConsulterBiens() {
  const Biens = useSelector((state) => state.BienReducer);
  const sortedBiens = [...Biens].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  const recentBienIds = sortedBiens.slice(0, 10).map((b) => b.id);
  const [sortList, setSortList] = useState(false);
  return (
    <div className="my-32">
      <FilterBar />
      <div className="mb-8 mx-32 flex justify-between items-center">
        <h1 className="text-xl">
          Biens :<span className="font-semibold">{Biens.length}</span>
        </h1>
        <div>
          <ArrowDownWideNarrow className="cursor-pointer" />
          <div></div>
        </div>
      </div>
      {Biens.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-12 w-5/6 mx-auto">
          {sortedBiens.map((bien) => (
            <Link
              to={`/details-bien-client/${bien.id}`}
              key={bien.id}
              className="relative bg-white rounded shadow overflow-hidden transition-transform duration-300 hover:scale-105"
            >
              {recentBienIds.includes(bien.id) && (
                <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded z-10">
                  Récente
                </span>
              )}

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
                    }).format(bien.budget)}{" "}
                    MAD
                  </span>
                </p>
              </div>
            </Link>
          ))}
        </div> // ✅ closing tag correctly placed now
      ) : (
        <div className="h-96 flex flex-col space-y-2 items-center justify-center  w-[100%] mx-auto">
          <Ban />
          <span>aucune Biens trouvé</span>
        </div>
      )}
    </div>
  );
}

export default ConsulterBiens;
