import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

function ValiderAffaire({
  affaireId,
  setSelectedAffaire,
  courtierId,
  clientId,
  accordId,
}) {
  const modalRef = useRef(null);
  const [height, setHeight] = useState(600);
  const [isResizing, setIsResizing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [affaireDetails, setAffaireDetails] = useState(null);
  const fetchAffaireDetails = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `/api/get-affaire/${courtierId}/${clientId}/${accordId}`
      );
      console.log(response.data);
      setAffaireDetails(response.data.affaire);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchAffaireDetails();
  }, []);
  const startResizing = (e) => {
    e.preventDefault();
    setIsResizing(true);
  };

  const stopResizing = () => {
    setIsResizing(false);
  };

  const resize = (e) => {
    if (!isResizing) return;
    const windowHeight = window.innerHeight;
    const newHeight = Math.min(windowHeight - e.clientY, windowHeight - 100);
    setHeight(newHeight);
  };

  React.useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [isResizing]);

  return (
    <AnimatePresence>
      {affaireId && (
        <div
          className="fixed inset-0 bg-[#161a1d93] h-screen w-full flex items-end justify-center"
          style={{ zIndex: 1006 }}
          onClick={() => setSelectedAffaire(null)}
        >
          <motion.div
            ref={modalRef}
            className="bg-white p-4 rounded-t-lg shadow-lg w-[99%] overflow-y-auto custom-scrollbar relative"
            style={{ height: `${height}px`, maxHeight: "99vh" }}
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 100, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 100, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="absolute top-0 left-0 w-full h-2 hover:bg-red-500 cursor-ns-resize"
              onMouseDown={startResizing}
              style={{ cursor: "ns-resize", zIndex: 10 }}
            />
            {isLoading ? (
              <div className="h-screen grid grid-cols-1 animate-pulse">
                <div className="bg-gray-300 h-16 w-1/4 rounded"></div>
                <div className="bg-gray-300 h-60 w-full rounded"></div>
                <div className="bg-gray-300 h-60 w-full rounded"></div>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Valider l'affaire {affaireId}
                </h3>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default ValiderAffaire;
