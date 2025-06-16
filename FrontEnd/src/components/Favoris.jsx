import { X } from "lucide-react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import BienContainer from "./BienContainer";

function Favoris({ setShowFavoris }) {
  const FavorisReducer = useSelector((state) => state.FavorisReducer);
  
  return (
    <div
      className="fixed inset-0 bg-[#161a1d93] h-screen w-full top-0 left-0 flex items-center justify-center z-50"
      style={{ zIndex: 1006 }}
      onClick={()=>{setShowFavoris(false)}}
    >
      <motion.section
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        onClick={(e)=>{e.stopPropagation()}}
        className="w-[90%] h-[90%] bg-white rounded shadow-3xl  overflow-auto relative"
      >
        <div className="flex justify-between items-center px-4 py-2 lg:py-4 shadow-md mb-4 sticky z-10 top-0 bg-white left-0 right-0">
          <h1 className="text-xl font-semibold">
            Mes Favoris ({FavorisReducer.length})
          </h1>
          <X
            className="h-6 cursor-pointer"
            onClick={() => setShowFavoris(false)}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-12 w-5/6 mx-auto ">
          {FavorisReducer.map((bien) => (
            <BienContainer bien={bien} />
          ))}
        </div>
      </motion.section>
    </div>
  );
}

export default Favoris;
