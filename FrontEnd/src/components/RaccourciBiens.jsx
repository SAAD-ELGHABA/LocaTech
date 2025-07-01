import React from "react";
import BienContainer from "./BienContainer";
import { MoveRight } from "lucide-react";

function RaccourciBiens({ biens, ville }) {
  return biens.length === 0 ? (
    <div className="w-[85%] lg:w-[95%] mx-auto my-8 animate-pulse">
      <div className="h-20 bg-gray-300 w-1/4"></div>
      <div className="grid lg:grid-cols-4 gap-4 mt-4">
        <div className="h-50 bg-gray-300"></div>
        <div className="h-50 bg-gray-300"></div>
        <div className="h-50 bg-gray-300"></div>
        <div className="h-50 bg-gray-300"></div>
        <div className="h-50 bg-gray-300"></div>
        <div className="h-50 bg-gray-300"></div>
      </div>
    </div>
  ) : (
    <div className="w-[85%] lg:w-[95%] mx-auto my-8">
      <h1 className="text-start text-xl font-bold mb-6 flex items-center space-x-2">
        <span>Biens à {ville}</span>
        <MoveRight />
      </h1>
      <div className="grid lg:grid-cols-4 gap-4">
        {biens
          .filter((bien) => bien.ville === ville)
          .slice(0, 8)
          .map((bien) => (
            <BienContainer key={bien.id} bien={bien} />
          ))}
      </div>
    </div>
  );
}

export default RaccourciBiens;
