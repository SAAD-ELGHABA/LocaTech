import React from "react";
import BienContainer from "./BienContainer";
import { MoveRight } from "lucide-react";

function RaccourciBiens({ biens, ville }) {
  return (
    <div className="w-5/6 mx-auto my-8">
      <h1 className="text-start text-xl font-bold mb-6 flex items-center space-x-2">
        <span>Biens à {ville}</span>
        <MoveRight/>
      </h1>
      <div className="grid grid-cols-3 gap-4">
        {biens
          .filter((bien) => bien.ville === ville)
          .slice(0, 6)
          .map((bien) => (
            <BienContainer key={bien.id} bien={bien} />
          ))}
      </div>
    </div>
  );
}

export default RaccourciBiens;
