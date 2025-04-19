import React, { useState } from "react";
import { useSelector } from "react-redux";
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
import BienContainer from "../components/BienContainer";

function ConsulterBiens() {
  const [sortOption, setSortOption] = useState("date");

  const Biens = useSelector((state) => state.BienReducer);
  const filtredBiensReducer = useSelector((state) => state.filtredBiensReducer);

  // Use filtered biens if available, otherwise use all biens
  const biensToRender =
    filtredBiensReducer.length > 0 ? filtredBiensReducer : Biens;

  // Sort the chosen list
  const sortedBiensToRender = [...biensToRender].sort((a, b) => {
    switch (sortOption) {
      case "title-asc":
        return a.title.localeCompare(b.title);
      case "title-desc":
        return b.title.localeCompare(a.title);
      case "price-asc":
        return a.budget - b.budget;
      case "price-desc":
        return b.budget - a.budget;
      case "date":
      default:
        return new Date(b.created_at) - new Date(a.created_at);
    }
  });

  const recentBienIds = sortedBiensToRender.slice(0, 10).map((b) => b.id);

  return (
    <div className="my-32">
      <FilterBar />
      <div className="mb-8 mx-32 flex justify-between items-center">
        <h1 className="text-xl">
          Biens : <span className="font-semibold">{biensToRender.length}</span>
        </h1>
        <div className="flex items-end space-x-2 border-l border-r border-gray-600 px-2">
          <ArrowDownWideNarrow className="cursor-pointer h-5" />
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="text-sm border-none focus:outline-none px-2 py-1 bg-transparent"
          >
            <option className="px-2 py-1" value="date">
              Par Date
            </option>
            <option className="px-2 py-1" value="title-asc">
              Par titre (A-Z)
            </option>
            <option className="px-2 py-1" value="title-desc">
              Par titre (Z-A)
            </option>
            <option className="px-2 py-1" value="price-asc">
              Par prix (croissant)
            </option>
            <option className="px-2 py-1" value="price-desc">
              Par prix (décroissant)
            </option>
          </select>
        </div>
      </div>

      {sortedBiensToRender.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-12 w-5/6 mx-auto">
          {sortedBiensToRender.map((bien) => (
            <BienContainer
              key={bien.id}
              bien={bien}
              isRecent={recentBienIds.includes(bien.id)}
            />
          ))}
        </div>
      ) : (
        <div className="h-96 flex flex-col space-y-2 items-center justify-center w-[100%] mx-auto">
          <Ban />
          <span>Aucun bien trouvé</span>
        </div>
      )}
    </div>
  );
}

export default ConsulterBiens;
