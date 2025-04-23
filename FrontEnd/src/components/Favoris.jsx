import { X } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import BienContainer from "./BienContainer";



function Favoris({ setShowFavoris }) {
  const Biens = useSelector((state) => state.BienReducer);
  const FavorisReducer = useSelector((state) => state.FavorisReducer);

  // Filter Biens to only include those in FavorisReducer
  const favoriteBiens = Biens.filter((bien) =>
    FavorisReducer.includes(bien.id)
  );
  
  

  return (
    <div
      className="fixed inset-0 bg-[#161a1d93] h-screen w-full top-0 left-0 flex items-center justify-center z-50"
      style={{ zIndex: 1002 }}
    >
      <motion.section
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-[90%] h-[90%] bg-white rounded shadow-3xl py-4 overflow-auto"
      >
        <div className="flex justify-between items-center mx-8 mb-4">
          <h1 className="text-xl font-semibold">Mes Favoris ({favoriteBiens.length})</h1>
          <X
            className="h-6 cursor-pointer"
            onClick={() => setShowFavoris(false)}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-12 w-5/6 mx-auto">
          {favoriteBiens.map((bien) => (
            <BienContainer bien={bien} />
          ))}
        </div>
      </motion.section>
    </div>
  );
}

export default Favoris;
