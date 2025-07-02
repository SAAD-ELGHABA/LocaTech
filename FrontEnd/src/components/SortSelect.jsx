// src/components/SortSelect.jsx
import React from "react";
import { ArrowDownWideNarrow } from "lucide-react";

function SortSelect({ sortOption, setSortOption }) {
  return (
    <div className="flex w-[60%] mx-auto lg:mx-1 lg:w-auto items-end space-x-2 border-l border-r border-gray-600 px-2 ">
      <ArrowDownWideNarrow className="cursor-pointer h-5  " />
      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        className="text-sm border-none w-full focus:outline-none lg:px-2 py-1 bg-transparent"
      >
        <option value="">Sort par</option>
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
  );
}

export default SortSelect;
