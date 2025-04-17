import React from "react";
import { Link } from "react-router-dom";
import brocheDeLocalisation from "../assets/broche-de-localisation.gif";
import { Bath, Bed, LandPlot } from "lucide-react";

function BienContainer({bien}) {
  return (
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
            }).format(bien.budget)}{" "}
            MAD
          </span>
        </p>
      </div>
    </Link>
  );
}

export default BienContainer;
